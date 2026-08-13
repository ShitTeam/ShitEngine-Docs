---
title: 场景管理
lang: zh_CN
---

# 场景管理

> 场景就是你的游戏世界——所有东西都在里面活着、动着。

## 生命周期

一个场景从生到死会经历这些阶段：

```
创建 → init → update(每帧) → destroy → 销毁
```

出生：

```cpp
auto scene = std::make_unique<Shit::Scene>("level1");
scene->init();
```

`init()` 帮你注册了三个默认系统：`BehaviorSystem`（跑脚本）、`RenderSystem`（画游戏世界）、`UIRenderSystem`（画 UI）。你要有自己的系统，就在这里注册。

> **💡 v1.3+**：`scene->init()` 现在是**可选**的。`SceneManager` 在 `LoadScene` 时若检测到场景还没有任何系统，会自动调用 `init()`——忘记调也不会得到空场景。`init()` 本身幂等，手动调用 + 自动调用不会重复注册系统。自定义 `init()` 覆写仍需调用父类 `Shit::Scene::init()` 以获得默认系统。

如果你想在场景初始化时做点自己的事，继承它就行：

```cpp
class MyScene : public Shit::Scene {
    using Shit::Scene::Scene;

    void init() override {
        Shit::Scene::init();  // 别忘了先调父类，否则没有系统跑
        // 加载地图、生成敌人、播放 BGM……
    }
};
```

> **💡 v1.3+ 组件与系统解耦**：组件不再查询"哪个系统驱动我"。`Behavior`、`RendererComponent`、`RigidBody2D` 等组件挂载时通过 `Scene` 广播给所有系统，由系统用 `dynamic_cast` 认领自己关心的类型。因此**先加组件、后注册系统也能正确挂接**——系统注册时会重扫场景中未注册的组件。新增自定义系统时覆写 `System::onComponentAttached`/`onComponentDetached` 即可认领对应组件。

## 场景文件（.scene）— 场景的事实标准

> 场景**只来自 `.scene` 文件**：编辑器保存、Runtime 启动、关卡切换共用同一加载器 `SceneSerializer`（反射 + JSON，v2 层级格式），编辑结果与运行结果完全一致。

`.scene` 格式与 Prefab 同构：根对象 + 按 `parent` 下标引用的层级 + 每对象一组反射序列化的组件字段。

```json
{
  "version": 2,
  "objects": [
    { "name": "Main Camera", "parent": -1, "data": [
        { "type": "CameraComponent", "fields": { "m_worldSize": [1280, 720], "m_zoom": 1.0 } },
        { "type": "TransformComponent", "fields": { "m_position": [640, 360] } }
    ] },
    { "name": "player", "parent": -1, "data": [
        { "type": "SpriteRenderer", "fields": { "m_texturePath": "resource/player.png" } }
    ] }
  ]
}
```

- **加载**：`SceneManager::LoadSceneFromFile(path)` 从 `.scene` 加载并替换当前场景（Runtime 启动 / 关卡切换统一入口）；`config.json` 顶层 `"scene"` 字段指定启动场景，缺省空场景 + 默认相机
- **序列化 API**：`SceneSerializer::toJson(Scene*)` / `fromJson(json, scene)` / `toJson(GameObject*)`（存单个对象含子树 → `.prefab` 资产），编辑器与导出游戏共用
- **组件钩子**：加载时逐组件调 `onAfterDeserialize()`（重建绕过 setter 的内部状态）与 `onFieldChanged()`；加载后无已启用相机则自动补 `game_camera`
- **可序列化字段**：只有 `SHIT_REFLECT` 标记的组件、反射字段会落盘；跨对象引用用 `ComponentRef<T>`（存 UUID）；可变长数据用反射字符串载体（如 Tilemap 网格、Animator 状态机）

## 场景管理

SceneManager 持有**当前活跃场景**（单一场景模型，与 Unity/Godot 一致）。切换场景即销毁旧的、加载新的：

```cpp
// 加载主菜单
Shit::SceneManager::LoadScene(std::move(menuScene));

// 玩家点击"开始游戏"：切换场景（旧场景销毁）
Shit::SceneManager::LoadScene(std::move(gameScene));
```

`LoadScene` 同帧生效，会自动 `init()` 未初始化的场景。

> **⚠️ update 期间的 LoadScene 延迟生效**：若在场景 update 的某帧内（如 `Behavior::onUpdate`、按钮回调里）调用 `LoadScene`，切换会**推迟到本帧 update 结束后**才执行——防止当前场景在更新中途自毁导致 use-after-free。行为上仍是"同帧完成"，只是不中断正在执行的更新循环。

### 暂停

暂停不是场景操作——用全局暂停标志冻结游戏逻辑，UI 叠层照常响应：

```cpp
// 游戏中按 ESC：暂停
Shit::Game::SetPaused(true);

// 打开一个 Canvas 当暂停菜单（UI 独立于游戏渲染，叠在游戏之上）

// 恢复
Shit::Game::SetPaused(false);
```

暂停时：
- **`BehaviorSystem`** 冻结 `onUpdate`（`onStart` 仍执行）
- **`PhysicsSystem2D`** 冻结物理步进
- **`RenderSystem` / `UIRenderSystem`** 照常——画面冻结在暂停瞬间，UI 菜单可交互

### 实际场景

**主菜单 → 游戏中 → 暂停 → 恢复**：

```cpp
auto menu = std::make_unique<MenuScene>("menu");
SceneManager::LoadScene(std::move(menu));
Game::Run();

// 玩家点了"开始"：
SceneManager::LoadScene(std::make_unique<GameScene>("game"));

// 游戏中按 ESC：
Game::SetPaused(true);                     // 冻结游戏
// 显示暂停菜单 Canvas（UIRenderSystem 绘制在游戏之上）

// 恢复：
Game::SetPaused(false);                    // 游戏继续
```

## 系统（System）

系统按优先级每帧统一更新。优先级由 System 构造函数的参数决定，数字越小越先跑：

```cpp
scene->registerSystem<BehaviorSystem>();   // 默认注册，优先级 0
scene->registerSystem<RenderSystem>();      // 默认注册，优先级 100
scene->registerSystem<UIRenderSystem>();    // 默认注册，优先级 200
scene->registerSystem<MyCustomSystem>();     // 你自己的系统
```

顺序是：BehaviorSystem（0）→ 你的系统 → RenderSystem（100）→ UIRenderSystem（200）。逻辑先跑、游戏世界渲染、UI 叠在最上面。

### 写一个自己的系统

继承 `System`，重写 `update` 和 `destroy`：

```cpp
class PhysicsSystem : public Shit::System {
    using Shit::System::System;

    void update() override {
        // 每帧遍历场景对象，更新物理
        for (auto& obj : getScene()->getGameObjects()) {
            auto* physics = obj->getComponent<PhysicsComponent>();
            if (physics) physics->tick();
        }
    }

    void destroy() override {
        // 清理资源
    }
};
```

## 延迟操作

不要在迭代过程中增删对象——会崩。ShitEngine 把操作推迟到帧末统一处理：

```cpp
scene->addGameObject(std::move(obj));       // 排入待添加队列
scene->removeGameObject(objPtr);            // 标记为待销毁（按指针）
scene->removeGameObjectByName("enemy");     // 按名字标记为待销毁
scene->unregisterSystem<T>();               // 排入待移除队列
```

这些操作不会立即生效，但在 `Scene::update()` 结尾会被统一处理。对你透明，对迭代器安全。

## 查询系统

已注册的系统可以随时查询：

```cpp
auto* behaviorSys = scene->getSystem<Shit::BehaviorSystem>();
bool has = scene->hasSystem<Shit::RenderSystem>();
```