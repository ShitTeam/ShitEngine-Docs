# ShitEngine

> 写好游戏，而不是写框架。

ShitEngine 是一个基于 **C++20** 的轻量级 2D 游戏引擎。它不依赖 Unity、Unreal、Godot 或任何庞然大物，只踩在 SDL3 的肩膀上从零搭起。场景栈、渲染管线、音频系统、事件总线……游戏需要的基础设施全给你焊好了，你直接往里填玩法就行。

## 为什么要用它？

**因为你不想每次写游戏都从 CreateWindow 开始。**

很多"轻量级引擎"实际上还是一大坨——你既依赖它，又不理解它。ShitEngine 的体量让你轻松读完整个源码。想改哪里改哪里，没有黑盒，没有魔法。

**因为像素风游戏值得被认真对待。**

那些 "随手用 Unity 拖个 sprite" 的方案，在像素风下要么图糊了，要么位置抖了。ShitEngine 固定逻辑分辨率 + 最近邻缩放 + 每帧像素对齐，像素画怎么画出来的，游戏里就是什么样。

**因为 CMake FetchContent 只需要一行。**

```cmake
FetchContent_MakeAvailable(ShitEngine)
```

所有依赖自动下载，不用装任何 SDK。你的队友 pull 完代码，cmake 一跑，编译，跑。不需要开会对齐环境。

## 核心架构

引擎由三个东西组成，搞懂它们你就搞懂了 ShitEngine：

### 🧱 GameObject — 空壳子

游戏世界里的一个"东西"。可以是一只史莱姆、一盏路灯、或者一个看不见的触发器。GameObject 本身什么都不干——它只是一个会挂组件的架子。

```cpp
// 只能通过 Scene 创建
auto* player = scene->createGameObject("player");
```

### 🧩 Component — 积木块

给 GameObject 镶上组件，它才有了血肉：

- `TransformComponent` — 你在哪、多大、转了多少度
- `SpriteRenderer` — 你长什么样、画什么纹理
- `CameraComponent` — 从哪个角度观察世界
- `AnimationComponent` — 让 sprite 动起来
- `Behavior` — 你自己的游戏逻辑——继承它，重写 `onUpdate`
- `UITransform` / `UIImage` / `UIText` — UI 控件三件套
- `UIButton` — 可交互按钮
- `UITextBox` / `UITextArea` — 文本输入（含 IME 中文）
- `RigidBody2D` / `BoxCollider2D` / `CircleCollider2D` — 刚体和碰撞体
- 所有组件通过 `addComponent<T>()` 按类型索引，每种一个实例

### ⚙️ System — 车间流水线

组件是积木块，System 是那条流水线。`BehaviorSystem` 每帧对所有 Behavior 调 `onUpdate`，`RenderSystem` 排好序后逐个渲染。System 有优先级，数值小的先执行。

```
优先级 0:   BehaviorSystem   →  跑游戏逻辑
优先级 50:  PhysicsSystem2D  →  跑物理模拟
优先级 100: RenderSystem     →  画游戏世界
优先级 200: UIRenderSystem   →  画 UI
```

你完全可以写自己的 System 插到中间——物理、寻路、AI，随你。

### 🔍 Reflection — 窥探组件内幕

ShitEngine 内置了一套**编译期反射系统**，通过 libClang 解析源码生成注册代码，调 `TypeRegistry::Get("TransformComponent")` 就能拿到所有字段的元信息——类型名、大小、偏移、编辑器显示名和数值范围。这是未来引擎编辑器的基础。

## 核心系统一览

| 系统 | 干的事 |
|---|---|
| **Game** | 引擎总开关：Init / Run / Destroy |
| **Window** | 窗口管理，别让它关了就行 |
| **Renderer** | 逻辑分辨率、缩放、渲染 API 封装 |
| **Time** | 告诉你上一帧花了多久（DeltaTime）|
| **Input** | 键盘鼠标 Down / Pressed / Released 三态 + 动作轴映射 |
| **Config** | `settings.json` 读配置，没有就默认 |
| **ResourceManager** | 纹理/音频/字体自动缓存，不重复加载 |
| **AudioPlayer** | 分层音频：master × group × track |
| **EventBus** | 事件缓冲区，统一时刻派发 |
| **SceneManager** | 场景栈，推拉替换 |
| **EngineContext** | 持有全部子系统实例的容器，支持多实例（编辑器预览/测试）|
| **ReflectionSystem** | 编译期解析 AST，运行时查询类型信息 |
| **PhysicsSystem2D** | Box2D 封装：刚体、碰撞形状、积分器 |

### 🧰 EngineContext — 多实例引擎

从 v1.3 起，引擎不再是"进程内只能有一个"。全部子系统（窗口、输入、渲染器、场景栈、事件总线……）被收进 `EngineContext` 容器，静态 API 转发到当前上下文：

```cpp
// 单实例（默认）—— 用法与之前完全一致
Shit::Game::Init();
Shit::Game::Run();
Shit::Game::Destroy();

// 多实例（编辑器进程内预览 / 单元测试）
Shit::EngineContext preview;                 // 开一个独立的引擎实例
Shit::EngineContext::setCurrent(&preview);
Shit::Game::Init();                          // 初始化 preview 的子系统
// ... 运行预览 ...
Shit::Game::Destroy();
Shit::EngineContext::setCurrent(&editorCtx); // 切回编辑器上下文
```

每个 `EngineContext` 拥有独立的窗口、输入状态、场景栈与资源缓存，互不干扰。`Log` 保持全局（日志天然进程级）。

## 版本历史

| 版本 | 亮点 |
|------|------|
| v1.1 | 基础架构：Game/Scene/Component/System、SDL3 渲染管线、输入、音频、配置 |
| v1.2 | UI 系统：UITransform、UIImage/IUText、UIButton、UITextBox/UITextArea；物理系统（Box2D）；DLL 插件架构 |
| v1.3 | 反射系统：SHIT_REFLECT/SHIT_ENUM、设计化的元数据、WhiteList/BlackList、static_assert 编译检查；SDL3 迁移 |

## 链接

- [GitHub](https://github.com/ShitTeam)
- [API 参考 (Doxygen)](https://engine.shitteam.top/api/)
- 许可协议：Apache License 2.0