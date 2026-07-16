---
title: 场景管理
lang: zh_CN
---

# 场景管理

场景（Scene）管理游戏世界中所有的对象，提供了清晰的生命周期和切换机制。

## 场景生命周期

一个场景从创建到销毁会经历这些阶段：

```
创建 → init → update(每帧) → destroy → 销毁
```

创建场景并初始化：

```cpp
auto scene = std::make_unique<Shit::Scene>("level1");
scene->init();
```

`init()` 会注册两个默认系统：`BehaviorSystem` 和 `RenderSystem`。你可以在场景的生命周期中添加自定义逻辑，通过继承 `Scene` 并重写相关方法：

```cpp
class MyScene : public Shit::Scene {
    using Shit::Scene::Scene;

    void init() override {
        Shit::Scene::init();  // 别忘了调父类
        // 自己的初始化逻辑
    }
};
```

## 场景栈

SceneManager 用栈的形式管理场景。任何时候只有**栈顶**的场景处于活跃状态：

```cpp
// 压入场景（压入后自动设为当前场景）
Shit::SceneManager::PushScene(std::move(scene1));
Shit::SceneManager::PushScene(std::move(scene2));  // scene2 为当前

// 弹出当前场景，返回上一场景
Shit::SceneManager::PopScene();

// 替换所有场景
Shit::SceneManager::ReplaceScene(std::move(newScene));

// 清空场景栈
Shit::SceneManager::ClearScene();
```

### 实际应用

**主菜单 → 游戏场景**：

```cpp
auto menu = std::make_unique<MenuScene>("menu");
// 创建 UI 等...
Shit::SceneManager::PushScene(std::move(menu));
Shit::Game::Run();

// 玩家点击开始游戏后：
Shit::SceneManager::ReplaceScene(std::make_unique<GameScene>("game"));
```

**暂停时叠加 UI 场景**：

```cpp
// 游戏场景上压入暂停菜单
Shit::SceneManager::PushScene(std::make_unique<PauseScene>("pause"));

// 恢复时弹走
Shit::SceneManager::PopScene();
```

## 系统（System）

系统负责更新同类组件。每个场景有自己的系统列表，用优先级控制执行顺序：

```cpp
scene->registerSystem<BehaviorSystem>();   // 默认已注册
scene->registerSystem<RenderSystem>();      // 默认已注册
scene->registerSystem<MyCustomSystem>(50);  // 优先级 50
```

优先级越小越先执行。`BehaviorSystem` 默认优先级 0，`RenderSystem` 默认优先级 100，所以行为逻辑在渲染之前执行。

### 自定义系统

继承 `System` 重写 `update` 和 `destroy`：

```cpp
class PhysicsSystem : public Shit::System {
    using Shit::System::System;

    void update() override {
        // 每帧调用
        auto& objects = getScene()->getGameObjects();
        for (auto& obj : objects) {
            auto* physics = obj->getComponent<PhysicsComponent>();
            if (physics) physics->tick();
        }
    }

    void destroy() override {
        // 场景销毁时调用
    }
};
```

## 延迟操作

场景和场景管理器的操作会在帧末统一处理，避免在迭代过程中修改容器导致崩溃：

```cpp
// 这些操作是安全的，不会立即生效
scene->addGameObject(std::move(obj));   // 排入待添加队列
scene->removeGameObject(objPtr);        // 标记为待销毁
scene->unregisterSystem<RenderSystem>(); // 排入待移除队列
```

所有操作在 `Scene::update()` 结尾统一处理，对调用者透明。
