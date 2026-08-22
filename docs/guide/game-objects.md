---
title: 游戏对象与组件
lang: zh_CN
---

# 游戏对象与组件

> 一个 GameObject 是空架子，插上 Component 才有血肉。

这是 ShitEngine 最核心的设计模式——**组件化架构**。理解它就理解了引擎的一半。

---

## GameObject — 游戏世界的"东西"

游戏世界里的每一个物体都是一个 **GameObject**：玩家、敌人、路灯、触发器、相机……全部是 GameObject。

但 GameObject 本身**什么都不做**。它只是一个容器，负责挂载和管理组件。

```cpp
// GameObject 只能通过 Scene 创建
auto* player = scene->createGameObject("player");
```

每个 GameObject 有：

| 属性 | 说明 |
|---|---|
| `name` | 名字，方便查找和调试 |
| `tag` | 标签，用于分类（如 "enemy"、"player"） |
| `scene` | 所属场景，由 Scene 自动管理 |
| `components` | 挂载的组件集合，按 type 索引 |

### 标签（Tag）

标签用于快速分类和批量筛选游戏对象，**随 `.scene` 文件保存**（编辑器检查器的 Tag 行可直接编辑）：

```cpp
auto* enemy = scene->createGameObject("goblin");
enemy->setTag("enemy");
enemy->getTag();  // → "enemy"
```

### 启用 / 禁用（Active）

每个 GameObject 有启用标志，**失活的对象不渲染、不更新行为脚本、不参与 UI 与物理**：

```cpp
go->isActive();              // 自身启用标志
go->isActiveInHierarchy();   // 最终生效状态：自身与所有祖先都启用（父失活子随失活）
go->setActive(false);        // 失活；重新启用后 Behavior 的 onStart 会补跑
```

编辑器中在检查器顶部的「启用 ✓」勾选框切换，场景树里失活对象灰显。典型用途：暂时下线某个机关、对象池里待命的对象。

### 销毁游戏对象

```cpp
go->destroy();           // 标记为待销毁，帧末统一清理
go->isNeedDestroy();     // 是否已被标记
```

---

## Component — 功能的积木块

组件是附着在 GameObject 上的功能模块。一个空的 GameObject 加上各种组件，才有了血肉。

### 内置组件

| 组件 | 功能 |
|---|---|
| **TransformComponent** | 位置 (x, y)、缩放、旋转 |
| **SpriteRenderer** | 渲染精灵纹理，支持源矩形裁剪与水平翻转 |
| **CameraComponent** | 定义视口与缩放，控制视角 |
| **AnimationComponent** | 逐帧动画驱动，基于 SpriteSheet 自动回写源矩形 |
| **Animator** | 动画状态机：状态 + 转换 + float/bool/trigger 参数驱动 |
| **Tilemap** | 瓦片地图：网格铺排瓦片集纹理，随 .scene 序列化 |
| **Behavior** | 供你继承写自定义脚本 |
| **RigidBody2D** | 2D 物理刚体（Static / Kinematic / Dynamic） |
| **BoxCollider2D** | 矩形碰撞体（像素尺寸） |
| **CircleCollider2D** | 圆形碰撞体（像素半径） |
| **Joint2D** | 2D 关节（Distance / Revolute / Weld / Prismatic），连接两个刚体 |
| **AudioSource** | 场景音频播放（挂载即播，可序列化） |
| **UITransform** | UI 屏幕空间定位（锚点 + 轴心 + 尺寸） |
| **UIImage** | UI 图片显示控件，支持颜色叠加 |
| **UIText** | UI 文字显示控件（SDL_ttf 渲染） |
| **UIButton** | UI 交互按钮（ColorTint 状态过渡 + onClick 回调） |
| **UITextInput** | 文本输入基类（IME、光标、选区） |
| **UITextBox** | 单行输入框（字符限制、占位符） |
| **UITextArea** | 多行输入区域（换行、跨行选区） |
| **UICanvas** | UI 层级根节点 |

### 添加和获取组件

```cpp
// 添加（重复添加返回已有的，不会报错）
auto* transform = go->addComponent<Shit::TransformComponent>();
auto* sprite = go->addComponent<Shit::SpriteRenderer>();

// 获取
auto* transform = go->getComponent<Shit::TransformComponent>();

// 检查
bool hasSprite = go->hasComponent<Shit::SpriteRenderer>();

// 移除
go->removeComponent<Shit::SpriteRenderer>();
```

每种组件每个 GameObject 只能挂一个。`addComponent<TransformComponent>()` 如果已存在就直接返回已有的。

### 源矩形与精灵图集

`SpriteRenderer` 支持可选源矩形，用于精灵图集（sprite-sheet）的局部渲染：

```cpp
sprite->setSourceRect({0.0f, 0.0f, 32.0f, 32.0f});  // 只裁剪 32x32 区域
sprite->setSourceRect(std::nullopt);                   // 恢复整图渲染
```

也可以直接从 SpriteSheet 取帧：

```cpp
Shit::SpriteSheet sheet(4, 8, 32, 32);
sprite->setSourceRect(sheet.getFrameRect(5));  // AnimationComponent 也走这个接口
```

翻转渲染：

```cpp
sprite->setFlipped(true);   // 水平翻转
sprite->isFlipped();        // → true
```

---

## 组件生命周期

每个组件都有一组虚函数，按固定顺序调用：

```
onCreate → onAttach → (运行中…) → onDetach → onDestroy
```

| 阶段 | 触发时机 | 干什么 |
|---|---|---|
| `onCreate` | `addComponent` 时，有 owner、尚未挂场景 | 轻量初始化，访问 owner |
| `onAttach` | GameObject 进入场景时 | **注册到 System**，获取系统资源 |
| `onDetach` | 组件被移除时（在 onDestroy 前） | **从 System 注销**，清理场景级资源 |
| `onDestroy` | 组件销毁时 | 最终清理 |

### 典型流程

```cpp
// 1. 创建组件
go->addComponent<MyComponent>();
//    → 构造函数 → setOwner(this) → onCreate()

// 2. 此时如果 go 已经在场景中：
//    → onAttach() 立即执行，注册到 System

// 3. 如果 go 还没进场景：
//    等 go->setScene(scene) 时 → 遍历所有组件 → 对未注册的调 onAttach()

// 4. 移除组件时
go->removeComponent<MyComponent>();
//    → onDetach() → 从 System 注销
//    → onDestroy() → 最终清理
//    → 从组件列表中移除
```

这就是为什么你可以安全地在 GameObject 创建后再添加到场景——组件会在正确时机自动完成注册。

---

## Behavior — 写你自己的游戏逻辑

`Behavior` 是组件体系中最重要的一个——它是让你写自定义脚本的地方。它继承自 `Component`，额外加了两个阶段：

```
onCreate → onAttach → onStart → onUpdate(每帧) → onDetach → onDestroy
```

| 阶段 | 说明 |
|---|---|
| `onStart` | 第一次 update 前执行一次。适合缓存指针、初始化状态 |
| `onUpdate` | **每帧执行**。适合输入处理、位置更新、碰撞检测 |

### 写一个 Behavior

```cpp
class Player : public Shit::Behavior {
    Shit::TransformComponent* transform = nullptr;
    float speed = 200.0f;

    void onStart() override {
        transform = getOwner()->getComponent<Shit::TransformComponent>();
    }

    void onUpdate() override {
        Shit::Vector2 pos = transform->getPosition();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::W)) pos.y -= speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::S)) pos.y += speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::A)) pos.x -= speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::D)) pos.x += speed * Shit::Time::GetDeltaTime();
        transform->setPosition(pos);
    }
};
```

::: warning 命名提醒
ShitEngine 中 `IsKeyPressed` = 持续按住（适合移动），`IsKeyDown` = 按下瞬间（适合跳跃）。这和 Unity/Godot 相反，详见[输入系统](/guide/input)。
:::

挂到 GameObject 上之后，BehaviorSystem 每帧会自动驱动它。

```cpp
player->addComponent<Player>();
```

### 自动注册

`Behavior` 的 `onAttach` 自动将它注册到 `BehaviorSystem`，`onDetach` 自动注销。同样 `UIRendererComponent` 子类（UIImage/UIText/UIButton/UITextInput）会自动向 `UIRenderSystem` 注册/注销。这一切对你透明。

---

## Prefab — 预制体

当你需要重复生成相同配置的游戏对象时，用 **Prefab** 定义模板。

Prefab 是**数据驱动**的——通过反射捕获现有 GameObject 的组件字段，可序列化为 JSON，实例化时用反射工厂重建：

```cpp
// ① 捕获：把场景中已配置好的对象存成预制体
auto enemyPrefab = Shit::Prefab::Capture(enemyGO);

// ② 批量实例化：反射工厂重建组件，字段值保持一致
auto* e1 = enemyPrefab.instantiate(scene, "enemy_1");
auto* e2 = enemyPrefab.instantiate(scene, "enemy_2");

// 序列化 / 反序列化（可落盘成 .prefab 资产）
std::string jsonStr = enemyPrefab.toJson().dump();
auto prefab2 = Shit::Prefab::FromJson(nlohmann::json::parse(jsonStr));
```

- 捕获全部反射组件（跳过 `SHIT_META(Disable)` 运行时状态与不可序列化类型）
- `Vector2` / `Color` / 数值 / 字符串 / 枚举 均可序列化
- 实例化后自动确保有 `TransformComponent`
- 组件有跨编辑会话稳定的 **UUID**（随 `.scene` 落盘）；`ComponentRef<T>` 引用字段存 UUID 懒解析

### .prefab 资产与编辑器

编辑器场景树右键「存为预置…」把选中对象**含子树**存为 `.prefab` 文件（格式与 `.scene` 同构）；资源窗口双击 / 拖入视口即实例化（重名自动去重后缀、拖入落点定位、自动选中）。你的插件 DLL 里用 `SHIT_REFLECT` 标记的行为组件同样可进预制体。

## 组件引用（ComponentRef）— 跨对象引用字段

`ComponentRef<T>` 是**可序列化的组件引用**：字段只存目标组件的持久 UUID，`get()` 时经当前场景的 uuid 索引懒解析。目标组件被移除/对象销毁后返回 `nullptr`——**永不悬垂**（与 `WeakComponentRef` 会话期弱引用互补）。

```cpp
class Coin : public Shit::Behavior {
    SHIT_REFLECT_BODY(Coin)
public:
    // 扫描器自动识别为"引用字段"：编辑器渲染为拖拽引用控件、序列化存 UUID
    SHIT_META(({.displayName = "计数文本"}))
    Shit::ComponentRef<Shit::UIText> coinText;

    void onUpdate() override {
        if (auto t = coinText.get())       // 目标销毁后自动失效，判空即可
            t->setText("金币: " + std::to_string(m_count));
    }
private:
    SHIT_META(Disable)
    int m_count = 0;
};
```

- 编辑器里组件标题栏可拖拽赋值，也可从**场景树拖对象**进引用控件（自动挑第一个类型可赋值的组件，沿反射基类链校验）
- 引用仅限同一场景（UUID 索引挂在 Scene 上），跨场景解析为 null；运行时实例化不恢复记录 ID，防复制实例串线

## 反序列化钩子（onAfterDeserialize）

反射直写字段会"绕过" setter——需要重建内部状态的组件可实现 `onAfterDeserialize()`（`SceneSerializer` 加载/撤销恢复时逐组件调用）与 `onFieldChanged(fieldName)`（检查器直写后回调）。典型用法：把反射字符串载体解析进运行时容器（如 `Tilemap::m_gridData` → 网格、`Animator::m_animatorData` → 状态机、`AnimationComponent::m_clipsData` → 剪辑表）。

---

## System 驱动

| System | 驱动什么 | 优先级 |
|---|---|---|
| BehaviorSystem | 所有 Behavior 的 onStart/onUpdate | 0 |
| PhysicsSystem2D | 2D 物理刚体模拟（可选，按需注册） | 50 |
| RenderSystem | 所有 RendererComponent 的 onRender | 100 |
| UIRenderSystem | 所有 UIRendererComponent 的 onRender + Raycasting + 聚焦 | 200 |

优先级数字越小越先执行。你可以在场景中注册自定义 System 插在中间。