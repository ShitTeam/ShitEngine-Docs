---
title: 音频系统
lang: zh_CN
---

# 音频系统

ShitEngine 的音频系统支持常见的音频格式（WAV、OGG、MP3、FLAC 等）。

## 初始化

音频在 `Game::Init()` 阶段自动初始化，不需要你手动调用。

## 轨道组

轨道组（TrackGroup）用来分类管理音频。典型的场景是音乐和音效分开控制：

```cpp
// 这两个组不是必须的，不创建也会使用 "default" 组
AudioPlayer::CreateTrackGroup("music");
AudioPlayer::CreateTrackGroup("sfx");
```

分组的好处是你可以独立控制每组的音量：

```cpp
AudioPlayer::GetTrackGroup("music")->setVolume(0.5f);
AudioPlayer::GetTrackGroup("sfx")->setVolume(1.0f);
```

## 播放音频

```cpp
// 在 "sfx" 组播放，返回 AudioTrack* 用于后续控制
auto* sfx = AudioPlayer::Play("sounds/explosion.wav", "sfx");
sfx->setVolume(0.8f);
```

不指定组名就用 "default"：

```cpp
AudioPlayer::Play("music/bgm.ogg", "music");
```

## 控制播放

`AudioTrack` 提供基本的播放控制：

```cpp
auto* track = AudioPlayer::Play("sounds/loop.wav", "sfx");

track->pause();         // 暂停
track->resume();        // 恢复
track->stop();          // 停止
track->setVolume(0.5f); // 音量 0.0 ~ 1.0

// 循环
track->setLooping(-1);  // 无限循环
track->setLooping(3);   // 循环 3 次
track->setLooping(0);   // 不循环（默认）

// 状态查询
bool playing = track->isPlaying();
bool paused  = track->isPaused();
bool done    = track->isFinished();
```

## 全局控制

```cpp
AudioPlayer::SetMasterVolume(0.8f);   // 主音量
AudioPlayer::GetMasterVolume();        // 获取主音量

AudioPlayer::PauseAll();              // 暂停所有
AudioPlayer::ResumeAll();             // 恢复所有
AudioPlayer::StopAll();               // 停止所有
```

音量层级：`最终音量 = 主音量 × 组音量 × 轨道音量`

## 批量控制

轨道组可以统一控制组内所有音轨：

```cpp
auto* group = AudioPlayer::GetTrackGroup("sfx");
group->pauseAll();
group->resumeAll();
group->stopAll();
group->setVolume(0.3f);  // 调低所有音效音量
```

## 缓存机制

音频文件由 `ResourceManager` 统一管理。第一次加载时从文件读取，后续直接从缓存返回，不会重复加载。

```cpp
// 第一次 Play 会加载文件
AudioPlayer::Play("bgm.ogg", "music");

// 再次播放同一文件直接走缓存
AudioPlayer::Play("bgm.ogg", "music");
```

## 完整示例

```cpp
// 初始化（自动完成）
// Game::Init() 中已经包含 AudioPlayer::Init()

// 创建组
AudioPlayer::CreateTrackGroup("bgm");
AudioPlayer::CreateTrackGroup("effects");

// 播放音乐（无线循环）
auto* bgm = AudioPlayer::Play("music/theme.ogg", "bgm");
bgm->setLooping(-1);
bgm->setVolume(0.6f);

// 播放音效（一次）
AudioPlayer::Play("sfx/jump.wav", "effects");

// 每帧调用 AudioPlayer::Update() 清理已结束的 Track
// Game::run() 中已包含
```
