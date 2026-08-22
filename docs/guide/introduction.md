# ShitEngine

> 写好游戏，而不是写框架。

ShitEngine 是一个基于 **C++20** 的轻量级 2D 游戏引擎。它不依赖 Unity、Unreal、Godot 或任何庞然大物，只踩在 SDL3 的肩膀上从零搭起。场景管理、渲染管线、音频系统、事件总线……游戏需要的基础设施全给你焊好了，你直接往里填玩法就行。

## 为什么要用它？

**因为写游戏不该从造轮子开始。**

很多"轻量级引擎"其实还是一大坨——你既要摸它的编辑器，又要啃它的运行时，两边还得能对上。ShitEngine 把引擎与编辑器**打包成一体**：场景树里的对象、检查器里的字段、资源窗口里的资产，就是引擎运行时同一套数据（`.scene` 文件）——所见即所得，没有两套世界。

**因为像素风游戏值得被认真对待。**

那些"随手拖个 sprite"的方案，在像素风下要么图糊了，要么位置抖了。ShitEngine 固定逻辑分辨率 + 最近邻缩放 + 每帧像素对齐，像素画怎么画出来的，游戏里就是什么样。

**因为编辑器本身就是玩法现场。**

打开 `Editor.exe`：场景树建对象、检查器改字段、视口拖 Gizmo，**搭场景零代码**；玩法逻辑写在 `Scripts/Behaviors.h` 的行为脚本里，`Ctrl+B` 热重载进编辑器，▶ 直接播放调试，■ 停止回滚。搭完直接[导出可运行的游戏包](/guide/editor)。详见[可视化编辑器](/guide/editor)。

**因为想啃源码也啃得动。**

如果有一天你想真正理解引擎在做什么——全部子系统收进 `EngineContext`，纹理/字体/音频由统一的 `Resource` 基类与缓存管理（带资产根解析），源码即文档，没有黑盒，没有魔法。

## 核心架构

引擎由三个东西组成，搞懂它们你就搞懂了 ShitEngine：

### 🧱 GameObject — 空壳子

游戏世界里的一个"东西"。可以是一只史莱姆、一盏路灯、或者一个看不见的触发器。GameObject 本身什么都不干——它只是一个会挂组件的架子。

```cpp
// 只能通过 Scene 创建
auto* player = scene->createGameObject("player");
```

::: tip
在编辑器里你不需要写这行——场景树右键「新建 → 精灵/相机/…」即可。上面的代码是引擎的运作模型，行为脚本里增删对象时你还会遇到它。
:::

### 🧩 Component — 积木块

给 GameObject 镶上组件，它才有了血肉：

- `TransformComponent` — 你在哪、多大、转了多少度
- `SpriteRenderer` — 你长什么样、画什么纹理
- `CameraComponent` — 从哪个角度观察世界
- `AnimationComponent` — 让 sprite 动起来
- `Animator` — 参数驱动的动画状态机（状态/转换/float·bool·trigger）
- `Tilemap` — 瓦片地图（网格刷图、.scene 序列化）
- `Behavior` — 你自己的游戏逻辑——继承它，重写 `onUpdate`
- `UITransform` / `UIImage` / `UIText` — UI 控件三件套
- `UIButton` — 可交互按钮
- `UITextBox` / `UITextArea` — 文本输入（含 IME 中文）
- `RigidBody2D` / `BoxCollider2D` / `CircleCollider2D` — 刚体和碰撞体
- `Joint2D` — Box2D 关节（距离/铰链/焊接/滑动）
- `AudioSource` — 挂载即播放的场景音频
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

ShitEngine 内置了一套**编译期反射系统**，通过 libClang 解析源码生成注册代码，调 `TypeRegistry::Get("TransformComponent")` 就能拿到所有字段的元信息——类型名、大小、偏移、编辑器显示名和数值范围。这是编辑器属性面板与 `.scene` 序列化的地基：行为脚本加 `SHIT_REFLECT` 标记后，字段就能在检查器里编辑、随场景落盘。

## 核心系统一览

| 系统 | 干的事 |
|---|---|
| **Game** | 引擎总开关：Init / Run / Destroy |
| **Window** | 窗口管理，别让它关了就行 |
| **Renderer** | 逻辑分辨率、缩放、渲染 API 封装 |
| **Time** | 告诉你上一帧花了多久（DeltaTime）|
| **Input** | 键盘鼠标 Down / Pressed / Released 三态 + 动作轴映射 |
| **Config** | `config.json` / `settings.json` 读配置，没有就默认 |
| **ResourceManager** | 纹理/音频/字体自动缓存，不重复加载 |
| **AudioPlayer** | 分层音频：master × group × track |
| **EventBus** | 事件缓冲区，统一时刻派发 |
| **SceneManager** | 单一当前场景 + LoadSceneFromFile 切换（唯一公开入口）|
| **SceneSerializer** | `.scene` 文件的事实标准：反射 + JSON 序列化，编辑/运行/切关共用 |
| **PluginManager** | 插件 DLL 加载/卸载与反射类型注册（Runtime 与编辑器共用）|
| **EngineContext** | 持有全部子系统实例的容器，支持多实例（编辑器预览/测试）|
| **ReflectionSystem** | 编译期解析 AST，运行时查询类型信息 |
| **PhysicsSystem2D** | Box2D 封装：刚体、碰撞形状、关节、碰撞回调 |

### 🧰 EngineContext — 多实例引擎

从 v1.3 起，引擎不再是"进程内只能有一个"。全部子系统（窗口、输入、渲染器、场景管理、事件总线……）被收进 `EngineContext` 容器，静态 API 转发到当前上下文：

```cpp
// 单实例（默认）——常规用法
Shit::Game::Init();
Shit::Game::Run();
Shit::Game::Destroy();

// 多实例（编辑器进程内预览 / 单元测试 / 引擎深度集成）
Shit::EngineContext preview;                 // 开一个独立的引擎实例
Shit::EngineContext::setCurrent(&preview);
Shit::Game::Init();                          // 初始化 preview 的子系统
// ... 运行预览 ...
Shit::Game::Destroy();
Shit::EngineContext::setCurrent(&editorCtx); // 切回编辑器上下文
```

每个 `EngineContext` 拥有独立的窗口、输入状态、场景与资源缓存，互不干扰。`Log` 保持全局（日志天然进程级）。编辑器正是借此**进程内嵌**引擎预览：你不需要理解这段代码也能用编辑器——这是引擎深度集成（或以后写自己的工具）时的入口。

## 版本历史

| 版本 | 亮点 |
|------|------|
| v1.1 | 基础架构：Game/Scene/Component/System、SDL3 渲染管线、输入、音频、配置 |
| v1.2 | UI 系统：UITransform、UIImage/IUText、UIButton、UITextBox/UITextArea；物理系统（Box2D）；DLL 插件架构 |
| v1.3 | 反射系统：SHIT_REFLECT/SHIT_ENUM、设计化的元数据、WhiteList/BlackList、static_assert 编译检查；SDL3 迁移 |
| v1.4.0 | 可视化编辑器（项目系统/播放态/导出）、组件 UUID + ComponentRef 引用、Prefab/.scene 数据驱动、Tilemap 瓦片地图、Joint2D 关节、Animator 状态机 + Animator 窗口、帧动画 Animation 窗口、Unity 风格资源窗口 |
| v1.4.1 | 反射扩展 SHIT_METHOD / SHIT_PROPERTY（getter/setter 属性）、Shit::Rect、14 项引擎级 BUG 修复 |
| v1.4.2 | 引擎 Resource 基类与统一资源缓存 + 资产根解析；GameObject 启用语义（isActiveInHierarchy 随父链级联）与 tag 序列化；属性面板「组件/系统」双页 Tab 与对象属性区；路径字段拖拽填充 / 浏览选择 / 相对项目根存储；编辑器便捷操作批次（F 聚焦、Ctrl+D 复制、Ctrl+P 暂停、单步、站内过滤等）|

## 链接

- [GitHub](https://github.com/ShitTeam)
- [API 参考 (Doxygen)](https://engine.shitteam.top/api/)
- 许可协议：Apache License 2.0