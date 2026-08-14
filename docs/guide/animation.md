---
title: 动画系统
lang: zh_CN
---

# 动画系统

> 角色动起来，世界才有生命。

ShitEngine 提供**两代**动画方案：

| 方案 | 适用场景 | 说明 |
|---|---|---|
| **`AnimationComponent`** | 简单播放几个固定剪辑 | 用帧索引数组定义并播放，一行代码一套动作 |
| **`Animator`**（推荐） | 需要按玩法状态切换动画 | 状态机：状态 + 转换 + float/bool/trigger 参数驱动，状态引用 `.anim` 资产文件，运行时从文件加载 |

两者都基于 **`AnimationClip`**（精灵表 + 帧序列数据）与 `SpriteSheet`（切图工具）。先从工具说起。

## SpriteSheet — 切图工具

把一张按行列排列的大图切成单帧。比如一张 4 行 8 列、每帧 32x32 的角色图集：

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

## AnimationClip — 可序列化的剪辑

`AnimationClip` 描述"从某张精灵表纹理按网格切出的帧序列 + 播放参数"，可作为编辑器/运行时数据，也可序列化为 **`.anim` 资产文件**：

```cpp
Shit::AnimationClip clip{
    .name        = "run",
    .texturePath = "resource/anim_sheet.png",
    .rows = 2, .cols = 2,           // 网格行数 / 列数
    .frameWidth = 32.0f, .frameHeight = 32.0f,
    .duration = 0.12f,              // 统一每帧时长（秒）
    .loop = true,
    .frames = {0, 1, 2, 3},         // 全局帧索引序列（SpriteSheet 语义，可跳帧）
};

clip.toJson();                      // → JSON，可落盘为 .anim 资产
clip.fromJson(json);                // ← 反向解析
```

- `margin` / `spacing`：图集四周留白与帧间距（默认 0）
- **每帧独立时长**（P29）：可选 `frameDurations` 数组，长度与 `frames` 相同时逐帧生效，否则回退到统一 `duration`——编辑器 Dope Sheet 时间轴就是编辑这个字段

## AnimationComponent — 经典逐帧动画

最快的用法——一行定义、一行播放：

```cpp
auto* anim = go->addComponent<Shit::AnimationComponent>();

Shit::SpriteSheet sheet(4, 8, 32, 32);

// 用帧索引数组直接定义并播放
anim->play("walk",   sheet, {0, 1, 2, 3, 4, 5},    0.1f,  true);
anim->play("jump",   sheet, {24, 25, 26},            0.08f, false);
```

帧索引可以不连续——`{16, 17, 19, 20, 23}` 完全合法。

播放控制：

```cpp
anim->play("walk");     // 切到行走动画
anim->stop();           // 停在当前帧
anim->pause();          // 暂停
anim->resume();         // 继续

// 查询
bool playing = anim->isPlaying();
bool paused  = anim->isPaused();
std::string current = anim->getCurrentAnimationName();
```

`AnimationComponent` 已升级为**可序列化多剪辑版**：剪辑以 `m_clipsData`（JSON 载体）随 `.scene` 落盘，编辑器通过 `addClip / setClip / removeClip / setDefaultClip` 管理，`onStart` 自动播放默认剪辑。运行时仍可用 `play(name, sheet, frames, ...)` 动态播放。

## Animator — 参数驱动的状态机（推荐）

`Animator` 继承 `Behavior`，由参数驱动在状态间切换。典型玩法：**idle / run / jump** 依 `speed`（float）、`grounded`（bool）、`jump`（trigger）三个参数流转。

### 概念

```
状态（State）     持有 AnimationClip，是"在播什么动画"
转换（Transition） 从某状态到某状态，条件引用参数，全满足才切换
参数（Parameter）  float / bool / trigger —— 玩法代码只管 set，状态机决定切到哪
```

- 转换可用 `from = -1` 表示**任意状态**（如"任何时候按跳跃键就跳"）
- trigger 求值后自动消耗（不会重复触发）
- 同一状态可挂多条转换，按序求值，先满足者获胜

### 代码搭建

```cpp
auto* animator = go->addComponent<Shit::Animator>();

// ① 参数
animator->addParam("speed",    Shit::AnimatorParamType::Float);    // 移动速度
animator->addParam("grounded", Shit::AnimatorParamType::Bool);     // 是否着地
animator->addParam("jump",     Shit::AnimatorParamType::Trigger);  // 跳跃触发器

// ② 创建剪辑并保存为 .anim 资产（状态只引用资产文件，不内嵌数据）
//    实际项目在编辑器中用 Animation 窗口创建 .anim 文件，无需手写代码
Shit::AnimationClip idleClip{
    .name = "idle", .texturePath = "resource/anim_sheet.png",
    .rows = 2, .cols = 2, .frameWidth = 32.0f, .frameHeight = 32.0f,
    .duration = 0.4f, .loop = true, .frames = {0},
};
Shit::AnimationClip runClip{
    .name = "run", .texturePath = "resource/anim_sheet.png",
    .rows = 2, .cols = 2, .frameWidth = 32.0f, .frameHeight = 32.0f,
    .duration = 0.12f, .loop = true, .frames = {0, 1, 2, 3},
};
// 保存到 .anim 文件（运行时从文件加载）
{ std::ofstream("Assets/idle.anim") << idleClip.toJson().dump(2); }
{ std::ofstream("Assets/run.anim")  << runClip.toJson().dump(2);  }

// ③ 状态（第一个状态自动成为入口状态）
int idle = animator->addState("idle");
int run  = animator->addState("run");
animator->setState(idle, Shit::AnimatorState{.name = "idle", .assetPath = "Assets/idle.anim", .isEntry = true});
animator->setState(run,  Shit::AnimatorState{.name = "run",  .assetPath = "Assets/run.anim"});

// ④ 转换：idle → run（speed > 0.1）；run → idle（speed < 0.1）
int t1 = animator->addTransition(idle, run);
animator->setTransition(t1, Shit::AnimatorTransition{
    .fromState = idle, .toState = run,
    .conditions = {{ "speed", Shit::AnimatorConditionType::FloatGt, 0.1f, false }},
});
int t2 = animator->addTransition(run, idle);
animator->setTransition(t2, Shit::AnimatorTransition{
    .fromState = run, .toState = idle,
    .conditions = {{ "speed", Shit::AnimatorConditionType::FloatLt, 0.1f, false }},
});

// ⑤ 任意状态 → jump（trigger 一触即跳）
int tj = animator->addTransition(-1, jump);
animator->setTransition(tj, Shit::AnimatorTransition{
    .fromState = -1, .toState = jump,
    .conditions = {{ "jump", Shit::AnimatorConditionType::Trigger, 0.0f, false }},
});
```

条件类型：`FloatGt` / `FloatLt` / `FloatEq`（比较 threshold）、`Bool`（比较 boolValue）、`Trigger`（已触发）。

### 玩法驱动

写一个 `Behavior` 在 `onUpdate` 里**只设置参数**，不碰状态：

```cpp
class SHIT_REFLECT(BlackList) PlayerAnimatorController : public Shit::Behavior {
    SHIT_REFLECT_BODY(PlayerAnimatorController)
    void onStart() override {
        m_animator = getOwner()->getComponent<Shit::Animator>();
    }
    void onUpdate() override {
        if (!m_animator) return;
        m_animator->setFloat("speed", Shit::Input::GetAxis("Horizontal"));
        m_animator->setBool("grounded", true);
        if (Shit::Input::IsActionDown("Jump"))
            m_animator->setTrigger("jump");
    }
private:
    SHIT_META(Disable)
    Shit::Animator* m_animator = nullptr;
};
```

运行时 `onUpdate` 每帧：推进当前状态的剪辑 → 把当前帧源矩形回写到同对象的 `SpriteRenderer` → 求值转换（满足即切状态并重启动画）。完整示例见 `Examples/scenes/AnimatorTest.scene` 与 Examples 源码 `PlayerAnimatorController`。

### 序列化与 .anim 资产

- **随场景落盘**：状态/参数/转换以反射字符串载体 `m_animatorData`（JSON）随 `.scene` 持久化；编辑器里的节点坐标（`graphX/graphY`）也保存，重开布局不丢
- **状态引用资产**：`AnimatorState.assetPath` 指向 `.anim` 文件（相对 CWD），状态剪辑**只来自 `.anim` 资产**，不内嵌数据。运行时 `parseData` 从文件加载到内存缓存，多个状态/项目可复用同一份 `.anim` 文件
- **`.anim` 资产**：`AnimationClip::toJson` 生成的独立文件（见上方 `run.anim`），资源窗口双击在 Animation 窗口中编辑；**运行时从文件读取**（场景加载时一次性加载，非每帧读盘）
- **旧场景兼容**：从旧版 `.scene`（含内嵌 clip）加载的状态仍可正常播放，保存后自动剥离内嵌数据（需先设置 `assetPath`，否则编辑器不提供内嵌编辑）

## 编辑器动画工具

- **Animator 窗口**（「窗口 → Animator」，检查器 Animator 入口按钮）：Unity 风格状态机图——拖动节点重排、右键勾连创建转换（空白引出 = 任意状态）、入口状态黄色标记、Any State 虚线节点、滚轮缩放；左侧参数面板、底部选中状态/转换属性
- **Animation 窗口**（「窗口 → Animation」，检查器 AnimationComponent 入口按钮）：编辑独立 `.anim` 资产——精灵表面板网格点选帧追加进时间轴、中央 **Dope Sheet**（拖块排序、拉右缘调逐帧时长、双击移除、播放预览）

详见[可视化编辑器](/guide/editor)。

## Animation — 运行时数据类

> 一般你不需要直接操作它——`AnimationComponent` / `Animator` 会帮你管。

```cpp
// 每帧 0.1 秒，循环播放
auto walk = std::make_unique<Shit::Animation>(0.1f, true);

// 添加帧
walk->addFrame(sheet.getFrameRect(0));
walk->addFrames({ sheet.getFrameRect(0), sheet.getFrameRect(1), sheet.getFrameRect(2) });

// 属性
walk->setDuration(0.08f);   // 改每帧时长（有 frameDurations 时逐帧生效）
walk->setLoop(false);        // 取消循环
bool loop = walk->isLooping();
float dur = walk->getDuration();
float total = walk->getTotalDuration();  // 总时长（逐帧用 frameDurations 求和）
```

## 生命周期

`AnimationComponent` 与 `Animator` 都继承自 `Behavior`，由 `BehaviorSystem` 每帧自动驱动：

```
onCreate → onAttach → onStart → onUpdate(每帧推进时间+回写源矩形) → onDetach → onDestroy
```

你不需要手动每帧调用任何东西。往 GameObject 上一挂，它自己跑。非循环动画播放完最后一帧后自动停止并停在那帧上。

## 工作原理

1. `play()` 时利用 `SpriteSheet::getFrameRect(idx)` 把帧索引转成 `SDL_FRect`
2. 每帧 `onUpdate()` 累加 `Time::GetDeltaTime()` 推进播放时间
3. `Animation::getFrame(elapsedTime)` 算出当前帧的 `SDL_FRect`（支持逐帧独立时长定位）
4. 通过 `applyCurrentFrame()` 把源矩形回写到 `SpriteRenderer::setSourceRect()`
5. 渲染时 `SpriteRenderer::onRender()` 用这个源矩形切图渲染