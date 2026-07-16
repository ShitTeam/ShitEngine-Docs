---
title: 音频系统
lang: zh_CN
---

# 音频系统

> BGM 循环不停、音效给反馈。没有声音的游戏是没有灵魂的。

ShitEngine 的音频系统支持 WAV、OGG、MP3、FLAC 等常见格式。不需要你管编解码，给它文件路径就行。

## 初始化

`Game::Init()` 里已经帮你调好了，不用你碰。

万一你声卡坏了 / 服务器没音频 / 测试环境不支持，`Game::Init()` 不会崩，只会打一行 Warning 然后继续运行。

## 轨道组

音乐和音效分开控制——这几乎是所有游戏的需求。ShitEngine 用轨道组（TrackGroup）来分类：

```cpp
// 创建两个组
AudioPlayer::CreateTrackGroup("music");
AudioPlayer::CreateTrackGroup("sfx");

// 不创建也会有一个 "default" 组兜底
```

分组的精髓在于音量独立：

```cpp
AudioPlayer::GetTrackGroup("music")->setVolume(0.5f);  // 音乐小一点
AudioPlayer::GetTrackGroup("sfx")->setVolume(1.0f);    // 音效拉满
```

## 播放音频

```cpp
// 在 "sfx" 组里播音效
auto* track = AudioPlayer::Play("sounds/explosion.wav", "sfx");
track->setVolume(0.8f);
```

不指定组名就默认扔进 "default"：

```cpp
AudioPlayer::Play("music/bgm.ogg", "music");
```

## 控制播放

`AudioTrack` 提供了完整的播放控制功能：

```cpp
auto* track = AudioPlayer::Play("sounds/loop.wav", "sfx");

track->pause();          // 暂停
track->resume();         // 恢复
track->stop();           // 停止

track->setVolume(0.5f);  // 轨道自己的音量系数

// 循环播放
track->setLooping(-1);   // 无限循环
track->setLooping(3);    // 循环 3 次
track->setLooping(0);    // 不循环（默认）

// 状态查询
bool playing = track->isPlaying();
bool paused  = track->isPaused();
bool done    = track->isFinished();
```

## 全局控制

一键控全场：

```cpp
AudioPlayer::SetMasterVolume(0.8f);   // 主音量
AudioPlayer::GetMasterVolume();        // 查看

AudioPlayer::PauseAll();              // 全部暂停
AudioPlayer::ResumeAll();             // 全部恢复
AudioPlayer::StopAll();               // 全部停止
```

## 音量层级

**最终音量 = 主音量 × 组音量 × 轨道音量**

```
例：主音量 0.8, music 组 0.5, BGM 轨道 1.0
  → 实际听到的 = 0.8 × 0.5 × 1.0 = 0.4
```

你调主音量不影响各轨道的比例，调轨道音量不影响其他轨道。分层清晰，想动哪层动哪层。

## 批量控制轨道组

组里的所有轨道可以统一操作：

```cpp
auto* group = AudioPlayer::GetTrackGroup("sfx");
group->pauseAll();       // 暂停所有音效
group->resumeAll();      // 恢复
group->stopAll();        // 停止
group->setVolume(0.3f);  // 批量调音量
```

## 缓存机制

音频文件由 `ResourceManager` 统一管理。第一次播的时候从磁盘加载，后续直接从缓存返回——不会重复读文件：

```cpp
// 第一次加载，磁盘 I/O
AudioPlayer::Play("bgm.ogg", "music");

// 第二次直接走缓存，零延迟
AudioPlayer::Play("bgm.ogg", "music");
```

## 清理机制

已播完的 track 会在每帧 `AudioPlayer::Update()` 时自动清理，同时从其所属组中注销，不会留下悬空指针。你不需要手动管理内存。

## 完整示例

```cpp
// 初始化（自动完成，Game::Init 里已包含）
Game::Init();

// 建两个组
AudioPlayer::CreateTrackGroup("bgm");
AudioPlayer::CreateTrackGroup("effects");

// 播 BGM
auto* bgm = AudioPlayer::Play("music/theme.ogg", "bgm");
bgm->setLooping(-1);       // 无限循环
bgm->setVolume(0.6f);

// 播音效（播完自动清理）
AudioPlayer::Play("sfx/jump.wav", "effects");

// 每帧自动调用 AudioPlayer::Update() 清理播完的 track
// Game::run() 中已包含
```
