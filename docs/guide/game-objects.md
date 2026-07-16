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

---

## Component — 功能的积木块

组件是附着在 GameObject 上的功能模块。一个空的 GameObject 加上各种组件，才有了血肉。

### 内置组件

| 组件 | 功能 |
|---|---|
| **TransformComponent** | 位置 (x, y)、缩放、旋转 |
| **SpriteRenderer** | 渲染精灵纹理，支持源矩形裁剪 |
| **CameraComponent** | 定义视口，控制视角 |
| **AnimationComponent** | 逐帧动画驱动 |
| **Behavior** | 供你继承写自定义脚本 |

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
sprite->setSourceRect({0.0f, 0.0f, 32.0f, 32.0f});  // 只裁剪 32×32 区域
sprite->setSourceRect(std::nullopt);                   // 恢复整图渲染
```

这个接口通常由 `AnimationComponent` 自动管理，你不需要手动调用。

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
| `onDetach` | 组件被移除时（在 onDestroy 前） | **从 System 注销**，清理场景级别资源 |
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

`Behavior` 是组件体系中最重要的一个——它是让你写自定义脚本的地方。`Behavior` 继承自 `Component`，在 `onCreate/onAttach/onDetach/onDestroy` 的基础上加了两个额外阶段：

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

挂到 GameObject 上之后，BehaviorSystem 每帧会自动驱动它。不需要你手动调用。

```cpp
player->addComponent<Player>();
```

### 系统注册

`Behavior` 的 `onAttach` 会自动将它注册到 `BehaviorSystem`，`onDetach` 自动注销。同样，`RendererComponent` 的 `onAttach` / `onDetach` 自动与 `RenderSystem` 注册/注销。这一切对你透明。

---

## Prefab — 预制体

当你需要重复生成相同配置的游戏对象时，用 **Prefab** 定义模板：

```cpp
// 定义模板
auto enemyPrefab = Shit::Prefab::Build([](Shit::GameObject* go) {
    go->addComponent<Shit::TransformComponent>();
    go->addComponent<Shit::SpriteRenderer>()->setTexturePath("enemy.png");
});

// 批量实例化
auto* e1 = scene->instantiate(enemyPrefab, "enemy_1");
auto* e2 = scene->instantiate(enemyPrefab, "enemy_2");
auto* e3 = scene->instantiate(enemyPrefab, "enemy_3");
```

Prefab 的 Builder 接收一个 `GameObject*`，你在回调里给这个对象挂组件、设属性。每次 `instantiate` 都执行同一套配置。

---

## 架构一览

```
GameObject           挂载 → Component（多种）
  ├─ TransformComponent    位置/缩放/旋转
  ├─ SpriteRenderer        精灵纹理渲染
  ├─ Behavior              用户自定义脚本
  │   ├─ onStart()         首次更新前
  │   ├─ onUpdate()        每帧执行
  │   └─ AnimationComponent 逐帧动画
  └─ CameraComponent       视口、缩放
```

**System 驱动**：

| System | 驱动什么 | 优先级 |
|---|---|---|
| BehaviorSystem | 所有 Behavior 的 onStart/onUpdate | 0 |
| RenderSystem | 所有 RendererComponent 的 onRender | 100 |

优先级数字越小越先执行。你可以在场景中注册自定义 System 插在中间。
