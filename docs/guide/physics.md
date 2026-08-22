---
title: 物理系统
lang: zh_CN
---

# 物理系统

> 基于 Box2D 3.1.1 的刚体物理引擎，原生支持像素单位。

ShitEngine 集成了 [Box2D 3.1.1](https://box2d.org/)（C 语言重写版），提供完整的 2D 刚体物理模拟。通过 `b2SetLengthUnitsPerMeter(32)`（默认 32 像素 = 1 米），**所有坐标与尺寸以像素为单位**，无需手动换算。

## 启用物理

`PhysicsSystem2D` 是可选的系统，但**自愈注册**——首个 `RigidBody2D` 挂载时自动 `registerSystem<PhysicsSystem2D>()`，无需手动注册：

```cpp
// 手动显式注册（可选；不注册会在第一个刚体挂载时自动拉起）
scene->registerSystem<Shit::PhysicsSystem2D>();
```

物理系统同样兼容"先加组件、后注册系统"（系统注册时重扫未注册组件）；`.scene` 组件顺序不定（Transform 晚于刚体反序列化）时，`update()` 每帧补建已注册未建体的刚体，物理 API 调用前也自愈建体——`onStart` 里调物理 API 不会落空。

## 核心组件

| 组件 | 作用 |
|---|---|
| `RigidBody2D` | 刚体（Static / Kinematic / Dynamic） |
| `BoxCollider2D` | 盒子碰撞体（像素尺寸） |
| `CircleCollider2D` | 圆形碰撞体（像素半径） |
| `Joint2D` | 关节：连接本对象刚体与另一刚体（Distance / Revolute / Weld / Prismatic） |

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

物理不需要任何初始化代码——场景里出现第一个 `RigidBody2D` 时，物理系统会**自动注册并创建物理世界**（自愈机制，数据驱动场景无需手动配置）。

在编辑器中搭建：给地面挂 `RigidBody2D`（Static）+ `BoxCollider2D`，给掉落物挂 `RigidBody2D`（Dynamic）+ `BoxCollider2D` + `SpriteRenderer`，保存为 `.scene` 即可。对应的 `.scene` 数据长这样：

```json
{
  "version": 2,
  "objects": [
    {
      "name": "Ground",
      "parent": -1,
      "data": [{
        "type": "TransformComponent",
        "fields": { "m_positionX": 400, "m_positionY": 680 }
      }, {
        "type": "RigidBody2D",
        "fields": {}
      }, {
        "type": "BoxCollider2D",
        "fields": { "m_sizeW": 750, "m_sizeH": 30 }
      }]
    },
    {
      "name": "Box",
      "parent": -1,
      "data": [{
        "type": "TransformComponent",
        "fields": { "m_positionX": 400, "m_positionY": 100 }
      }, {
        "type": "RigidBody2D",
        "fields": { "m_bodyType": 1 }
      }, {
        "type": "BoxCollider2D",
        "fields": { "m_sizeW": 64, "m_sizeH": 64 }
      }]
    }
  ]
}
```

加载与运行：

```cpp
#include <ShitEngine.h>

int main() {
    Shit::Game::Init();
    Shit::SceneManager::LoadSceneFromFile("Scenes/PhysicsTest.scene");
    Shit::Game::Run();
    Shit::Game::Destroy();
}
```

> 编辑器工作流下这些都在可视化界面完成——右键新建对象、检查器加组件调参数，保存即得 `.scene`；运行直接点 ▶。

## 关节（Joint2D）

`Joint2D` 组件把本对象刚体（bodyA）与 `connectedBody` 引用刚体（bodyB）用 Box2D 约束连接。必须挂在一个已挂 `RigidBody2D` 的 GameObject 上：

```cpp
auto* joint = go->addComponent<Shit::Joint2D>();
joint->setType(Shit::JointType::Revolute);   // 铰链
joint->setConnectedBody(otherBody);           // 或反射字段在检查器里拖拽赋值
joint->setAnchor({400, 100});                // 世界锚点（像素）
```

`JointType` 反射枚举四种：

| 类型 | 行为 | 主要参数 |
|---|---|---|
| `Distance` | 距离关节：保持两锚点间距离，可做**弹簧** | `Length` / `Spring`（Hertz + Damping Ratio） |
| `Revolute` | 铰链：两刚体绕锚点相对旋转（门/轮子） | `Motor`（速度 + 最大扭矩）/ `Limit`（角度上下限） |
| `Weld` | 焊接：把两刚体刚性连在一起（软体） | — |
| `Prismatic` | 滑动：沿局部轴相对滑动（活塞/滑轨） | `AxisAngle` / 滑动上下限 / 电机力 |

- 目标刚体未就绪时**每帧补建**（自愈，同刚体语义）；字段改动 / 类型切换经 `rebuildJoint` 销毁重建
- `connectedBody` 是 `ComponentRef<RigidBody2D>` 引用字段——检查器拖拽赋引用、序列化存 UUID、目标销毁自动失效，`.scene` 可完整保存/加载关节
- 编辑器「碰撞体」调试开关会同时绘制关节青色连接线 + 锚点圆点

完整示例见 `Examples/scenes/JointTest.scene`。

## 碰撞回调

物理步进后按**接触对**驱动接触双方的 `Behavior` 回调（仅已启动行为）：

```cpp
class BallDemo : public Shit::Behavior {
    SHIT_REFLECT_BODY(BallDemo)
    void onCollisionEnter(Shit::GameObject* other) override {
        Shit::ST_INFO("开始接触: {}", other->getName());
    }
    void onCollisionStay(Shit::GameObject* other) override {
        // 每帧一次
    }
    void onCollisionExit(Shit::GameObject* other) override {
        Shit::ST_INFO("结束接触: {}", other->getName());
    }
};
```

- 用 Box2D Begin/End 接触事件驱动：新接触 → `Enter`（每对象对一次）、持续 → `Stay`（每帧）、结束 → `Exit`；接触重建/休眠唤醒不重复 Enter
- 回调内可安全销毁对象 / 移除组件（播放态延时删除 + 派发前逐对校验 + 逐轮重扫）
- 刚体 / 碰撞体销毁时自动清理接触集合

## 底层 API 访问

各组件通过 getter 方法暴露底层 Box2D 句柄的拆解字段，用于高级操作：

- `RigidBody2D::getBodyIndex()` / `getBodyWorld0()` / `getBodyGeneration()` → 可重构为 `b2BodyId`
- `PhysicsSystem2D` 的 `m_worldIndex` / `m_worldGeneration` 可通过 `friend` 类访问

若需要 Box2D 原生 API（关节、射线检测、传感器等），在 `.cpp` 中包含 `<box2d/box2d.h>` 并用拆解字段重构 ID。

## 已内置的进阶能力

| 功能 | 说明 |
|---|---|
| 关节（Joint） | `Joint2D` 组件：Distance / Revolute / Weld / Prismatic，见上文 |
| 碰撞事件 | `Behavior::onCollisionEnter/Stay/Exit`，见上文 |
| debug draw | 编辑器视口「碰撞体」开关绘制碰撞体轮廓 + 关节连线 |
| 传感器 / 碰撞分组 | 需要 Box2D 原生 API：在 `.cpp` 中包含 `<box2d/box2d.h>`，用 `getBodyIndex()` 等拆解字段重构 `b2BodyId` |
