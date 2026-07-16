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

每种组件**只能挂一个**（一个对象不会有两份 Transform）。`addComponent<T>()` 如果已存在就返回已有的。

### ⚙️ System — 车间流水线

组件是积木块，System 是那条流水线。`BehaviorSystem` 每帧对所有 Behavior 调 `onUpdate`，`RenderSystem` 排好序后逐个渲染。System 有优先级，数值小的先执行。

```
优先级 0:  BehaviorSystem  →  跑游戏逻辑
优先级 100: RenderSystem    →  画画面
```

你完全可以写自己的 System 插到中间——物理、寻路、AI，随你。

## 核心系统一览

| 系统 | 干的事 |
|---|---|
| **Game** | 引擎总开关：Init / Run / Destroy |
| **Window** | 窗口管理，别让它关了就行 |
| **Renderer** | 逻辑分辨率、缩放、绘制 API 封装 |
| **Time** | 告诉你上一帧花了多久（DeltaTime） |
| **Input** | 键盘鼠标 Down / Pressed / Released 三态检测 |
| **Config** | `settings.json` 读配置，没有就默认 |
| **ResourceManager** | 纹理/音频/字体自动缓存，不重复加载 |
| **AudioPlayer** | 分层音频：master × group × track |
| **EventBus** | 类型安全的事件通信，不锁不崩 |
| **SceneManager** | 场景栈，推拉替换全延迟执行 |

## 链接

- [GitHub](https://github.com/ShitTeam)
- 许可证：Apache License 2.0
