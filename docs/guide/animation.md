---
title: 逐帧动画
lang: zh_CN
---

# 逐帧动画

> 角色动起来，世界才有生命。

ShitEngine 的逐帧动画系统让你用**精灵图集（sprite-sheet）** + **帧索引数组**来定义动画。不需要编辑器，几行代码搞定一套动作。

## SpriteSheet — 切图工具

把一张按行列排列的大图切成单帧。比如一张 4 行 8 列、每帧 32×32 的角色图集：

```cpp
// 参数：行数，列数，每帧宽，每帧高，留白（可选，默认 0），间距（可选，默认 0）
Shit::SpriteSheet sheet(4, 8, 32, 32);
```

内部自动计算每个全局帧索引的源矩形位置。

```cpp
// 取第 5 帧的源矩形
SDL_FRect frame5 = sheet.getFrameRect(5);   // 全局索引

// 按行列取
SDL_FRect frame = sheet.getFrameRect(1, 3); // 第 1 行第 3 列
```

也支持带留白和间距的图集：

```cpp
// 图集四周有 2px 空白，帧与帧之间隔 1px
Shit::SpriteSheet sheet(4, 8, 32, 32, 2.0f, 1.0f);
```

## Animation — 一段动画

`Animation` 管理一组帧、每帧时长和是否循环。一般你不需要直接操作它——`AnimationComponent` 会帮你管。

```cpp
// 每帧 0.1 秒，循环播放
auto walk = std::make_unique<Shit::Animation>(0.1f, true);

// 添加帧
walk->addFrame(sheet.getFrameRect(0));
walk->addFrame(sheet.getFrameRect(1));
walk->addFrame(sheet.getFrameRect(2));

// 或一次加一组
walk->addFrames({ sheet.getFrameRect(0), sheet.getFrameRect(1), sheet.getFrameRect(2) });

// 属性
walk->setDuration(0.08f);   // 改每帧时长
walk->setLoop(false);        // 取消循环
bool loop = walk->isLooping();
float dur = walk->getDuration();
```

## AnimationComponent — 动画组件

最快的用法——一行定义、一行播放：

```cpp
#include <ShitEngine.h>

auto* sprite = go->addComponent<Shit::SpriteRenderer>();
sprite->setTexturePath("textures/player.png");

auto* anim = go->addComponent<Shit::AnimationComponent>();

Shit::SpriteSheet sheet(4, 8, 32, 32);

// ── 用帧索引数组直接定义并播放 ──
// 参数：名字，图集，帧序列，每帧时长，是否循环
anim->play("walk",   sheet, {0, 1, 2, 3, 4, 5},    0.1f,  true);
anim->play("jump",   sheet, {24, 25, 26},            0.08f, false);
anim->play("attack", sheet, {16, 17, 19, 20, 23},   0.06f, false);
```

帧索引可以不连续、可以跳帧——`{16, 17, 19, 20, 23}` 完全合法。

播放控制：

```cpp
anim->play("walk");     // 切到行走动画
anim->stop();           // 停在当前帧，恢复整图
anim->pause();          // 暂停
anim->resume();         // 继续

// 查询
bool playing = anim->isPlaying();
bool paused  = anim->isPaused();
std::string current = anim->getCurrentAnimationName();
```

## 生命周期

`AnimationComponent` 继承自 `Behavior`，由 `BehaviorSystem` 每帧自动驱动：

```
onCreate → onAttach → onStart → onUpdate(每帧推进时间+回写源矩形) → onDetach → onDestroy
```

你不需要手动每帧调用任何东西。往 GameObject 上一挂，它自己跑。

## 工作原理

1. `play()` 时，`SpriteSheet::getFrameRect(idx)` 把帧索引转成 `SDL_FRect`
2. 每帧 `onUpdate()` 累加 `Time::GetDeltaTime()` 推进播放时间
3. `Animation::getFrame(elapsedTime)` 算出当前帧的 `SDL_FRect`
4. 通过 `applyCurrentFrame()` 把源矩形回写到 `SpriteRenderer::setSourceRect()`
5. 渲染时 `SpriteRenderer::onRender()` 用这个源矩形切图渲染

### 非循环动画自动结束

播完最后一帧后自动停止并停在那帧。`m_isPlaying` 变为 false，不会自动切回整图。

### 手动停止

```cpp
anim->stop();
```

恢复 `SpriteRenderer` 为整图渲染（清除源矩形）。

## 完整示例

```cpp
// 在 Behavior::onStart() 里
auto* sprite = getOwner()->getComponent<Shit::SpriteRenderer>();
sprite->setTexturePath("textures/hero.png");

auto* anim = getOwner()->addComponent<Shit::AnimationComponent>();
Shit::SpriteSheet sheet(4, 8, 32, 32);

anim->play("idle",  sheet, {0, 1, 2, 3}, 0.15f, true);
anim->play("run",   sheet, {4, 5, 6, 7}, 0.1f,  true);
anim->play("jump",  sheet, {8, 9, 10},    0.08f, false);

anim->play("idle");

// 在 onUpdate() 里根据输入切换动画
void onUpdate() override {
    if (Shit::Input::IsKeyPressed(Shit::KeyCode::W))
        anim->play("run");
    else
        anim->play("idle");
}
```
