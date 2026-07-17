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

`init()` 帮你注册了俩默认系统：`BehaviorSystem`（跑脚本）和 `RenderSystem`（画画面）。你要有自己的系统，就在这里注册。

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

## 场景栈

SceneManager 用栈管场景。任何时候**只有栈顶的场景在活跃**——想象一盘叠叠乐：

```cpp
// 压入主菜单
Shit::SceneManager::PushScene(std::move(menuScene));
// ↕ 现在是菜单

// 玩家点击"开始游戏"：直接替换
Shit::SceneManager::ReplaceScene(std::move(gameScene));
// ↕ 现在是游戏

// 按暂停：压入暂停菜单
Shit::SceneManager::PushScene(std::move(pauseScene));
// ↕ 暂停菜单
// ↩ 游戏在下面等着

// 恢复：弹走暂停菜单
Shit::SceneManager::PopScene();
// ↕ 游戏回来了

// 清空所有
Shit::SceneManager::ClearScene();
```

### 实际场景

**主菜单 → 游戏中**：

```cpp
auto menu = std::make_unique<MenuScene>("menu");
// 画 UI，等点击……
Shit::SceneManager::PushScene(std::move(menu));
Shit::Game::Run();

// 玩家点了"开始"：
Shit::SceneManager::ReplaceScene(std::make_unique<GameScene>("game"));
```

**暂停时叠一层 UI**：

```cpp
// 游戏中按 ESC：
Shit::SceneManager::PushScene(std::make_unique<PauseScene>("pause"));

// 恢复：
Shit::SceneManager::PopScene();
```

这套机制让你轻松实现"主菜单→游戏→暂停"等流程，切换时下面被压住的场景不会销毁，回来时状态全在。

## 系统（System）

系统按优先级每帧统一更新。数字越小越先跑：

```cpp
scene->registerSystem<BehaviorSystem>();   // 默认已注册，优先级 0
scene->registerSystem<RenderSystem>();      // 默认已注册，优先级 100
scene->registerSystem<MyCustomSystem>(50);  // 插在中间
```

顺序是：BehaviorSystem（0）→ 你的系统（50）→ RenderSystem（100）。逻辑先跑、渲染在后，天经地义。

### 写一个自己的系统

继承 `System`，重写 `update` 和 `destroy`：

```cpp
class PhysicsSystem : public Shit::System {
    using Shit::System::System;

    void update() override {
        // 每帧遍历场景对象，更新物理
        // PhysicsComponent 是你自己定义的组件，引擎不内置物理系统
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
scene->addGameObject(std::move(obj));    // 排入待添加队列
scene->removeGameObject(objPtr);         // 标记为待销毁（按指针）
scene->removeGameObjectByName("enemy");  // 标记为待销毁（按名字）
scene->unregisterSystem<RenderSystem>();  // 排入待移除队列
```

这些操作不会立即生效，但在 `Scene::update()` 结尾会被统一处理。对你透明，对迭代器安全。

## 查询系统

已注册的系统可以随时查询：

```cpp
auto* behaviorSys = scene->getSystem<Shit::BehaviorSystem>();
bool has = scene->hasSystem<Shit::RenderSystem>();
```
