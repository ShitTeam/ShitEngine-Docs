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

> 场景**只从 `.scene` 文件加载**——下面会看到，`SceneManager::LoadSceneFromFile` 是加载场景的唯一入口。

出生：

```cpp
Shit::SceneManager::LoadSceneFromFile("Scenes/level1.scene");
```

`LoadSceneFromFile` 内部会创建 `Scene` 对象、调用 `init()` 注册三个默认系统（`BehaviorSystem`、`RenderSystem`、`UIRenderSystem`），然后从文件反序列化所有对象和组件。

如果你想在场景初始化时做点自己的事，可以继承 `Scene` 覆写 `init()`，但需要注册自定义类型并让 `SceneManager` 使用它——通常不必要，直接用 `.scene` 文件数据驱动即可：

```cpp
// 自定义场景类（高级用法，多数项目不需要）
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
  ],
  "systems": [
    { "type": "PhysicsSystem2D", "fields": { "m_gravity": [0, 500], "m_pixelsPerMeter": 32.0 } }
  ]
}
```

- **加载**：`SceneManager::LoadSceneFromFile(path)` 从 `.scene` 加载并替换当前场景（Runtime 启动 / 关卡切换统一入口）；`config.json` 顶层 `"scene"` 字段指定启动场景，缺省空场景 + 默认相机
- **序列化 API**：`SceneSerializer::toJson(Scene*)` / `fromJson(json, scene)` / `toJson(GameObject*)`（存单个对象含子树 → `.prefab` 资产），编辑器与导出游戏共用
- **组件钩子**：加载时逐组件调 `onAfterDeserialize()`（重建绕过 setter 的内部状态）与 `onFieldChanged()`；加载后无已启用相机则自动补 `game_camera`
- **可序列化字段**：只有 `SHIT_REFLECT` 标记的组件、反射字段会落盘；跨对象引用用 `ComponentRef<T>`（存 UUID）；可变长数据用反射字符串载体（如 Tilemap 网格、Animator 状态机）
- **系统（可选 `"systems"` 数组）**：非默认系统以 `{"type", "fields"}` 落盘（字段复用反射序列化）；加载/撤销/切关时按"默认三系统 ∪ 文件列表"同步——停用多余的非默认系统、注册缺失的并恢复字段。旧 v2 文件无该字段则跳过，完全向后兼容

## 场景管理

SceneManager 持有**当前活跃场景**（单一场景模型，与 Unity/Godot 一致）。切换场景即销毁旧的、加载新的：

```cpp
// 加载主菜单
Shit::SceneManager::LoadSceneFromFile("Scenes/menu.scene");

// 玩家点击"开始游戏"：切换场景（旧场景销毁）
Shit::SceneManager::LoadSceneFromFile("Scenes/game.scene");
```

`LoadSceneFromFile` 同帧生效，内部自动创建 Scene 对象、调用 `init()` 注册默认系统。

> **⚠️ 加载场景延迟生效**：若在场景 update 的某帧内（如 `Behavior::onUpdate`、按钮回调里）调用 `LoadSceneFromFile`，切换会**推迟到本帧 update 结束后**才执行——防止当前场景在更新中途自毁导致 use-after-free。行为上仍是"同帧完成"，只是不中断正在执行的更新循环。

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
SceneManager::LoadSceneFromFile("Scenes/menu.scene");
Game::Run();

// 玩家点了"开始"：
SceneManager::LoadSceneFromFile("Scenes/game.scene");

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

除模板注册外，引擎还提供**按类型名**的管理 API（编辑器运行时使用）：

```cpp
scene->registerSystem("MyCustomSystem");         // 走反射 Factory 创建 + init 补扫
scene->hasSystem("MyCustomSystem");
scene->getSystem("MyCustomSystem");
scene->unregisterSystem("MyCustomSystem");        // 延迟移除（帧末生效）
scene->setSystemPriority("MyCustomSystem", 40);   // 调整优先级
scene->getRegisteredSystemTypeNames();            // 列出全部已注册系统
```

### 场景系统

编辑器不需要把系统写在代码里——检查器**未选中对象时**显示「场景系统」面板：

- **添加/移除**：从「添加系统」菜单任选（列表来自反射注册的 `System` 派生类型，含插件自定义系统），已注册的置灰
- **优先级**：每系统一行 `QSpinBox` 直接改，随 `.scene` 保存
- **字段编辑**：允许反射系统暴露字段（如 `PhysicsSystem2D` 的 `m_gravity`、`m_pixelsPerMeter`），点击系统名展开编辑，修改即时生效并入撤销栈
- **持久化**：非默认系统随 `.scene` 以 `"systems": [{"type": "...", "fields": {...}}]` 落盘，运行时/导出包按文件恢复——**自定义系统零注册代码进游戏**

详见[编辑器手册 · 属性检查器](/guide/editor#属性检查器)。

### 写一个自己的系统

继承 `System`，重写纯虚的 `update` 和 `destroy`；想让编辑器能添加它并编辑字段，加上反射标记（`System` 基类已反射，任意 `System` 派生类只要标记即可被收集）：

```cpp
class SHIT_API SHIT_REFLECT(BlackList) MyCustomSystem : public Shit::System {
    SHIT_REFLECT_BODY(MyCustomSystem)
public:
    MyCustomSystem(int priority = 40);   // 需要默认构造（反射工厂）

    void update() override { /* 每帧逻辑 */ }
    void destroy() override { /* 清理 */ }

    // 反射字段被编辑器直写后回调（把变更同步到运行时状态）
    void onFieldChanged(const std::string& fieldName) override { /* ... */ }

private:
    SHIT_META(({.displayName = "Update Interval", .range = {0.01f, 1.0f}}))
    float m_interval = 0.1f;
};
```

- `System` 反射字段的**即时生效**靠覆写 `onFieldChanged(fieldName)`（字段被检查器/反序列化写入后触发）
- 自定义系统写在插件 `Scripts/` 里同样适用——`Ctrl+B` 构建后出现在「添加系统」菜单，随场景保存/恢复

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