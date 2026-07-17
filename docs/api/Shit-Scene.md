---
title: "Scene"
description: "场景类"
kind: class
namespace: Shit
header: "Scene.h"
---


# Scene

```cpp
#include <Scene.h>
```

```cpp
class Scene
```

Defined in ShitEngine/Scene/Scene.h:34

场景类

场景是游戏世界的容器，管理所有 GameObject、System 的生命周期。 通过 [SceneManager](Shit-SceneManager.md#scenemanager) 的栈机制实现场景切换（主菜单→游戏→暂停）。

使用方式： auto scene = std::make_unique<Scene>("level1"); scene->[init()](#init-11); // 注册默认 [BehaviorSystem](Shit-BehaviorSystem.md#behaviorsystem) + [RenderSystem](Shit-RenderSystem.md#rendersystem) auto* player = scene->createGameObject("player"); SceneManager::PushScene(std::move(scene));

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`Scene`](#scene-2) | `function` | Declared here |
| [`Scene`](#scene-3) | `function` | Declared here |
| [`Scene`](#scene-4) | `function` | Declared here |
| [`init`](#init-11) | `function` | Declared here |
| [`update`](#update-6) | `function` | Declared here |
| [`destroy`](#destroy-6) | `function` | Declared here |
| [`addGameObject`](#addgameobject) | `function` | Declared here |
| [`createGameObject`](#creategameobject) | `function` | Declared here |
| [`instantiate`](#instantiate) | `function` | Declared here |
| [`removeGameObject`](#removegameobject) | `function` | Declared here |
| [`removeGameObjectByName`](#removegameobjectbyname) | `function` | Declared here |
| [`registerSystem`](#registersystem) | `function` | Declared here |
| [`unregisterSystem`](#unregistersystem) | `function` | Declared here |
| [`getSystem`](#getsystem) | `function` | Declared here |
| [`hasSystem`](#hassystem) | `function` | Declared here |
| [`getName`](#getname-2) | `function` | Declared here |
| [`getGameObjects`](#getgameobjects) | `function` | Declared here |
| [`setName`](#setname-1) | `function` | Declared here |
| [`m_name`](#m_name-2) | `variable` | Declared here |
| [`m_gameObjects`](#m_gameobjects) | `variable` | Declared here |
| [`m_pendingAdditions`](#m_pendingadditions) | `variable` | Declared here |
| [`m_systemsMap`](#m_systemsmap) | `variable` | Declared here |
| [`m_systems`](#m_systems) | `variable` | Declared here |
| [`m_pendingRemoveSystems`](#m_pendingremovesystems) | `variable` | Declared here |
| [`m_isSystemsNeedSort`](#m_issystemsneedsort) | `variable` | Declared here |
| [`processPendingAdditions`](#processpendingadditions) | `function` | Declared here |
| [`processPendingRemoveSystems`](#processpendingremovesystems) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Scene`](#scene-2) `explicit` |  |
|  | [`Scene`](#scene-3)  | Deleted constructor. |
|  | [`Scene`](#scene-4)  | Deleted constructor. |
| `void` | [`init`](#init-11) `virtual` | 注册默认系统（BehaviorSystem + RenderSystem） |
| `void` | [`update`](#update-6)  | 更新所有 [System](Shit-System.md#system) + 处理延迟操作 |
| `void` | [`destroy`](#destroy-6) `virtual` | 销毁所有对象与系统 |
| `void` | [`addGameObject`](#addgameobject)  | 延迟添加 GameObject（帧末生效） |
| `GameObject *` | [`createGameObject`](#creategameobject)  | 创建并添加 [GameObject](Shit-GameObject.md#gameobject-2) |
| `GameObject *` | [`instantiate`](#instantiate)  | 从预制体实例化 |
| `void` | [`removeGameObject`](#removegameobject)  | 按指针标记销毁 |
| `void` | [`removeGameObjectByName`](#removegameobjectbyname)  | 按名称标记销毁 |
| `T *` | [`registerSystem`](#registersystem) `inline` |  |
| `void` | [`unregisterSystem`](#unregistersystem) `inline` |  |
| `T *` | [`getSystem`](#getsystem) `inline` |  |
| `bool` | [`hasSystem`](#hassystem) `inline` |  |
| `const std::string &` | [`getName`](#getname-2) `const` `inline` |  |
| `std::vector< std::unique_ptr< GameObject > > &` | [`getGameObjects`](#getgameobjects) `inline` |  |
| `void` | [`setName`](#setname-1) `inline` |  |

---

### Scene

`explicit`

```cpp
explicit Scene(const std::string & name)
```

Defined in ShitEngine/Scene/Scene.h:36

---

### Scene

```cpp
Scene(const Scene &) = delete
```

Defined in ShitEngine/Scene/Scene.h:40

Deleted constructor.

---

### Scene

```cpp
Scene(Scene &&) = delete
```

Defined in ShitEngine/Scene/Scene.h:42

Deleted constructor.

---

### init

`virtual`

```cpp
virtual void init()
```

Defined in ShitEngine/Scene/Scene.h:45

注册默认系统（BehaviorSystem + RenderSystem）

---

### update

```cpp
void update()
```

Defined in ShitEngine/Scene/Scene.h:46

更新所有 [System](Shit-System.md#system) + 处理延迟操作

---

### destroy

`virtual`

```cpp
virtual void destroy()
```

Defined in ShitEngine/Scene/Scene.h:47

销毁所有对象与系统

---

### addGameObject

```cpp
void addGameObject(std::unique_ptr< GameObject > && gameObject)
```

Defined in ShitEngine/Scene/Scene.h:49

延迟添加 GameObject（帧末生效）

---

### createGameObject

```cpp
GameObject * createGameObject(const std::string & name)
```

Defined in ShitEngine/Scene/Scene.h:50

创建并添加 [GameObject](Shit-GameObject.md#gameobject-2)

---

### instantiate

```cpp
GameObject * instantiate(const Prefab & prefab, const std::string & name = "")
```

Defined in ShitEngine/Scene/Scene.h:51

从预制体实例化

---

### removeGameObject

```cpp
void removeGameObject(GameObject * gameObject)
```

Defined in ShitEngine/Scene/Scene.h:52

按指针标记销毁

---

### removeGameObjectByName

```cpp
void removeGameObjectByName(const std::string & name)
```

Defined in ShitEngine/Scene/Scene.h:53

按名称标记销毁

---

### registerSystem

`inline`

```cpp
template<typename T> inline T * registerSystem()
```

Defined in ShitEngine/Scene/Scene.h:56

---

### unregisterSystem

`inline`

```cpp
template<typename T> inline void unregisterSystem()
```

Defined in ShitEngine/Scene/Scene.h:81

---

### getSystem

`inline`

```cpp
template<typename T> inline T * getSystem()
```

Defined in ShitEngine/Scene/Scene.h:88

---

### hasSystem

`inline`

```cpp
template<typename T> inline bool hasSystem()
```

Defined in ShitEngine/Scene/Scene.h:99

---

### getName

`const` `inline`

```cpp
inline const std::string & getName() const
```

Defined in ShitEngine/Scene/Scene.h:106

---

### getGameObjects

`inline`

```cpp
inline std::vector< std::unique_ptr< GameObject > > & getGameObjects()
```

Defined in ShitEngine/Scene/Scene.h:107

---

### setName

`inline`

```cpp
inline void setName(const std::string & name)
```

Defined in ShitEngine/Scene/Scene.h:109

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::string` | [`m_name`](#m_name-2)  |  |
| `std::vector< std::unique_ptr< GameObject > >` | [`m_gameObjects`](#m_gameobjects)  |  |
| `std::vector< std::unique_ptr< GameObject > >` | [`m_pendingAdditions`](#m_pendingadditions)  |  |
| `std::unordered_map< std::type_index, std::unique_ptr< System > >` | [`m_systemsMap`](#m_systemsmap)  |  |
| `std::vector< System * >` | [`m_systems`](#m_systems)  |  |
| `std::vector< std::type_index >` | [`m_pendingRemoveSystems`](#m_pendingremovesystems)  |  |
| `bool` | [`m_isSystemsNeedSort`](#m_issystemsneedsort)  |  |

---

### m_name

```cpp
std::string m_name
```

Defined in ShitEngine/Scene/Scene.h:114

---

### m_gameObjects

```cpp
std::vector< std::unique_ptr< GameObject > > m_gameObjects
```

Defined in ShitEngine/Scene/Scene.h:115

---

### m_pendingAdditions

```cpp
std::vector< std::unique_ptr< GameObject > > m_pendingAdditions
```

Defined in ShitEngine/Scene/Scene.h:116

---

### m_systemsMap

```cpp
std::unordered_map< std::type_index, std::unique_ptr< System > > m_systemsMap
```

Defined in ShitEngine/Scene/Scene.h:118

---

### m_systems

```cpp
std::vector< System * > m_systems
```

Defined in ShitEngine/Scene/Scene.h:119

---

### m_pendingRemoveSystems

```cpp
std::vector< std::type_index > m_pendingRemoveSystems
```

Defined in ShitEngine/Scene/Scene.h:120

---

### m_isSystemsNeedSort

```cpp
bool m_isSystemsNeedSort = false
```

Defined in ShitEngine/Scene/Scene.h:121

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
| `void` | [`processPendingAdditions`](#processpendingadditions)  |  |
| `void` | [`processPendingRemoveSystems`](#processpendingremovesystems)  |  |

---

### processPendingAdditions

```cpp
void processPendingAdditions()
```

Defined in ShitEngine/Scene/Scene.h:111

---

### processPendingRemoveSystems

```cpp
void processPendingRemoveSystems()
```

Defined in ShitEngine/Scene/Scene.h:112

