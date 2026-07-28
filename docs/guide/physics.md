---
title: 物理系统
lang: zh_CN
---

# 物理系统

> 基于 Box2D 3.1.1 的刚体物理引擎，原生支持像素单位。

ShitEngine 集成了 [Box2D 3.1.1](https://box2d.org/)（C 语言重写版），提供完整的 2D 刚体物理模拟。通过 `b2SetLengthUnitsPerMeter(32)`（默认 32 像素 = 1 米），**所有坐标与尺寸以像素为单位**，无需手动换算。

## 启用物理

`PhysicsSystem2D` 是可选的系统，不会在 `Scene::init()` 中自动注册。按需添加：

```cpp
scene->registerSystem<Shit::PhysicsSystem2D>();
```

注册后系统自动拥有 `b2World`，每帧步进并同步 Transform。

## 核心组件

| 组件 | 作用 |
|---|---|
| `RigidBody2D` | 刚体（Static / Kinematic / Dynamic） |
| `BoxCollider2D` | 盒子碰撞体（像素尺寸） |
| `CircleCollider2D` | 圆形碰撞体（像素半径） |

### 生命周期

```
1. addComponent<RigidBody2D>()
2. onAttach → 从 TransformComponent 读取位置 → b2CreateBody
3. addComponent<BoxCollider2D>(size) 或 CircleCollider2D(radius)
4. onAttach → 查找同 GameObject 的 RigidBody2D → b2CreatePolygonShape
```

> **💡 提示**：碰撞体的尺寸/半径也可以在构造后随时修改——`setSize` / `setRadius` / `setDensity` / `setFriction` / `setRestitution` 均会实时同步到 Box2D 物理形状。

## 用法示例

### 静态地面 + 墙壁

```cpp
// 地面
auto* ground = scene->createGameObject("Ground");
ground->addComponent<Shit::TransformComponent>()->setPosition({400, 680});
ground->addComponent<Shit::RigidBody2D>();                       // static 默认
ground->addComponent<Shit::BoxCollider2D>(Shit::Vector2{750, 30}); // 750x30 像素

// 墙壁
auto* wall = scene->createGameObject("Wall");
wall->addComponent<Shit::TransformComponent>()->setPosition({25, 300});
wall->addComponent<Shit::RigidBody2D>();
wall->addComponent<Shit::BoxCollider2D>(Shit::Vector2{30, 600});
```

### 动态盒子（受重力下落）

```cpp
auto* box = scene->createGameObject("Box");
box->addComponent<Shit::TransformComponent>()->setPosition({400, 100});
auto* body = box->addComponent<Shit::RigidBody2D>();
body->setBodyType(Shit::RigidBody2D::Type::Dynamic);   // 关键！
box->addComponent<Shit::BoxCollider2D>(Shit::Vector2{64, 64});
```

### 弹跳球

```cpp
auto* ball = scene->createGameObject("Ball");
ball->addComponent<Shit::TransformComponent>()->setPosition({400, 50});
auto* body = ball->addComponent<Shit::RigidBody2D>();
body->setBodyType(Shit::RigidBody2D::Type::Dynamic);
auto* circle = ball->addComponent<Shit::CircleCollider2D>(24.0f);  // 半径 24 像素
```

## 刚体类型

| 类型 | 值 | 说明 |
|---|---|---|
| `Static` | 0 | 不受力，不可移动（默认） |
| `Kinematic` | 1 | 用户控制位置，可推动 Dynamic |
| `Dynamic` | 2 | 受重力/力/碰撞影响 |

## 配置物理世界

```cpp
auto* physics = scene->getSystem<Shit::PhysicsSystem2D>();

physics->setGravity({0.0f, 500.0f});      // 像素/秒²（默认 320）
physics->setPixelsPerMeter(32.0f);        // 默认 32
```

> `setPixelsPerMeter` 指定多少个像素等于 1 米。Box2D 内部用这个值调整各种物理阈值（如线性容差、恢复速度阈值）。默认 32 对像素风游戏很友好：一个 32×32 的角色 ≈ 1 米。
>
> ⚠️ `setPixelsPerMeter` 在 `init()` 之后改不会立即生效，需在下次场景重建时生效。

## 力的接口

RigidBody2D 提供常用的力/冲量/速度控制：

```cpp
body->applyForce({0, -1000});              // 持续抬升力（用于跳跃）
body->applyForceToCenter({0, -1000});      // 等价
body->applyImpulse({0, -500});             // 瞬时冲量
body->setLinearVelocity({100, 0});         // 直接设速度
Vector2 vel = body->getLinearVelocity();   // 读取速度
```

力的单位是**像素·质量/秒²**。密度越大需要越大的力才能推动。

## 属性控制

```cpp
body->setGravityScale(0.0f);               // 不受重力（用于飞行道具）
body->setLinearDamping(5.0f);              // 线性阻尼（空气阻力）
body->setFixedRotation(true);              // 防止旋转（角色用）
```

## 物理循环时机

```
BehaviorSystem::update()   (priority   0)  → 用户力的代码
PhysicsSystem2D::update()  (priority  50)  → b2World_Step + 同步 Transform
RenderSystem::update()     (priority 100)  → 用更新后的位置渲染
UIRenderSystem::update()   (priority 200)  → UI 叠加
```

用户的力/速度控制代码先执行，然后物理步进，最后渲染。这样物理驱动的移动每帧都正确反映在画面上。

## 完整示例

```cpp
#include <ShitEngine/Physics/PhysicsSystem2D.h>
#include <ShitEngine/Physics/RigidBody2D.h>
#include <ShitEngine/Physics/BoxCollider2D.h>
#include <ShitEngine/Physics/CircleCollider2D.h>
#include <ShitEngine/Component/TransformComponent.h>
#include <ShitEngine/Component/CameraComponent.h>
#include <ShitEngine/Component/SpriteRenderer.h>

auto scene = std::make_unique<Shit::Scene>("PhysicsTest");
scene->init();
scene->registerSystem<Shit::PhysicsSystem2D>();

// 相机
auto* cam = scene->createGameObject("Camera");
cam->addComponent<Shit::TransformComponent>()->setPosition({400, 350});
cam->addComponent<Shit::CameraComponent>();

// 地面
auto* ground = scene->createGameObject("Ground");
ground->addComponent<Shit::TransformComponent>()->setPosition({400, 680});
ground->addComponent<Shit::RigidBody2D>();
ground->addComponent<Shit::BoxCollider2D>(Shit::Vector2{750, 30});

// 掉落的盒子
auto* box = scene->createGameObject("Box");
box->addComponent<Shit::TransformComponent>()->setPosition({400, 100});
box->addComponent<Shit::RigidBody2D>()->setBodyType(Shit::RigidBody2D::Type::Dynamic);
box->addComponent<Shit::BoxCollider2D>(Shit::Vector2{64, 64});
auto* sr = box->addComponent<Shit::SpriteRenderer>();
sr->setTexturePath("resource/box.png");
```

## 底层 API 访问

各组件通过 getter 方法暴露底层 Box2D 句柄的拆解字段，用于高级操作：

- `RigidBody2D::getBodyIndex()` / `getBodyWorld0()` / `getBodyGeneration()` → 可重构为 `b2BodyId`
- `PhysicsSystem2D` 的 `m_worldIndex` / `m_worldGeneration` 可通过 `friend` 类访问

若需要 Box2D 原生 API（关节、射线检测、传感器等），在 `.cpp` 中包含 `<box2d/box2d.h>` 并用拆解字段重构 ID。

## 进阶（v1 范围外）

| 功能 | 说明 |
|---|---|
| 关节（Joint） | 距离/旋转/马达关节 → 自行调 Box2D API |
| 碰撞事件 | `b2World_GetContactEvents()` → v2 内置 |
| 碰撞分组 | `b2Filter` → v2 暴露 |
| debug draw | `b2World_Draw()` → v2 集成 |
