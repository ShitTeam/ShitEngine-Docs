---
title: "SceneManager"
description: "场景管理器（单例）"
kind: class
namespace: Shit
header: "SceneManager.h"
---


# SceneManager

```cpp
#include <SceneManager.h>
```

```cpp
class SceneManager
```

Defined in ShitEngine/Scene/SceneManager.h:19

场景管理器（单例）

使用栈结构管理场景生命周期。任何时候只有栈顶场景处于活跃状态。 所有操作延迟到 [Update()](#update-7) 时执行，保证迭代安全。

用法： SceneManager::PushScene(std::move(myScene)); SceneManager::ReplaceScene(std::move(gameScene)); [SceneManager::PopScene()](#popscene); [SceneManager::ClearScene()](#clearscene);

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`SceneManager`](#scenemanager-1) | `function` | Declared here |
| [`SceneManager`](#scenemanager-2) | `function` | Declared here |
| [`GetInstance`](#getinstance-7) | `function` | Declared here |
| [`Update`](#update-7) | `function` | Declared here |
| [`Destroy`](#destroy-7) | `function` | Declared here |
| [`PushScene`](#pushscene) | `function` | Declared here |
| [`PopScene`](#popscene) | `function` | Declared here |
| [`ClearScene`](#clearscene) | `function` | Declared here |
| [`ReplaceScene`](#replacescene) | `function` | Declared here |
| [`m_sceneStack`](#m_scenestack) | `variable` | Declared here |
| [`m_pendingActions`](#m_pendingactions) | `variable` | Declared here |
| [`SceneManager`](#scenemanager-3) | `function` | Declared here |
| [`pushScene`](#pushscene-1) | `function` | Declared here |
| [`popScene`](#popscene-1) | `function` | Declared here |
| [`clearScene`](#clearscene-1) | `function` | Declared here |
| [`replaceScene`](#replacescene-1) | `function` | Declared here |
| [`update`](#update-8) | `function` | Declared here |
| [`destroy`](#destroy-8) | `function` | Declared here |
| [`processPendingActions`](#processpendingactions) | `function` | Declared here |
| [`processPushScene`](#processpushscene) | `function` | Declared here |
| [`processPopScene`](#processpopscene) | `function` | Declared here |
| [`processClearScene`](#processclearscene) | `function` | Declared here |
| [`processReplaceScene`](#processreplacescene) | `function` | Declared here |
| [`getCurrentScene`](#getcurrentscene) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`SceneManager`](#scenemanager-1)  | Deleted constructor. |
|  | [`SceneManager`](#scenemanager-2)  | Deleted constructor. |

---

### SceneManager

```cpp
SceneManager(const SceneManager &) = delete
```

Defined in ShitEngine/Scene/SceneManager.h:23

Deleted constructor.

---

### SceneManager

```cpp
SceneManager(SceneManager &&) = delete
```

Defined in ShitEngine/Scene/SceneManager.h:25

Deleted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `SceneManager &` | [`GetInstance`](#getinstance-7) `static` |  |
| `void` | [`Update`](#update-7) `static` `inline` | 更新当前场景 |
| `void` | [`Destroy`](#destroy-7) `static` `inline` | 销毁所有场景 |
| `void` | [`PushScene`](#pushscene) `static` `inline` | 压入新场景（下个帧循环生效） |
| `void` | [`PopScene`](#popscene) `static` `inline` | 弹出栈顶场景（下个帧循环生效） |
| `void` | [`ClearScene`](#clearscene) `static` `inline` | 清空场景栈 |
| `void` | [`ReplaceScene`](#replacescene) `static` `inline` | 替换栈顶场景 |

---

### GetInstance

`static`

```cpp
static SceneManager & GetInstance()
```

Defined in ShitEngine/Scene/SceneManager.h:29

---

### Update

`static` `inline`

```cpp
static inline void Update()
```

Defined in ShitEngine/Scene/SceneManager.h:30

更新当前场景

---

### Destroy

`static` `inline`

```cpp
static inline void Destroy()
```

Defined in ShitEngine/Scene/SceneManager.h:31

销毁所有场景

---

### PushScene

`static` `inline`

```cpp
static inline void PushScene(std::unique_ptr< Scene > && scene)
```

Defined in ShitEngine/Scene/SceneManager.h:32

压入新场景（下个帧循环生效）

---

### PopScene

`static` `inline`

```cpp
static inline void PopScene()
```

Defined in ShitEngine/Scene/SceneManager.h:33

弹出栈顶场景（下个帧循环生效）

---

### ClearScene

`static` `inline`

```cpp
static inline void ClearScene()
```

Defined in ShitEngine/Scene/SceneManager.h:34

清空场景栈

---

### ReplaceScene

`static` `inline`

```cpp
static inline void ReplaceScene(std::unique_ptr< Scene > && scene)
```

Defined in ShitEngine/Scene/SceneManager.h:35

替换栈顶场景

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::vector< std::unique_ptr< Scene > >` | [`m_sceneStack`](#m_scenestack)  |  |
| `std::vector< PendingAction >` | [`m_pendingActions`](#m_pendingactions)  |  |

---

### m_sceneStack

```cpp
std::vector< std::unique_ptr< Scene > > m_sceneStack
```

Defined in ShitEngine/Scene/SceneManager.h:63

---

### m_pendingActions

```cpp
std::vector< PendingAction > m_pendingActions
```

Defined in ShitEngine/Scene/SceneManager.h:64

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`SceneManager`](#scenemanager-3) `explicit` |  |
| `void` | [`pushScene`](#pushscene-1)  |  |
| `void` | [`popScene`](#popscene-1)  |  |
| `void` | [`clearScene`](#clearscene-1)  |  |
| `void` | [`replaceScene`](#replacescene-1)  |  |
| `void` | [`update`](#update-8)  |  |
| `void` | [`destroy`](#destroy-8)  |  |
| `void` | [`processPendingActions`](#processpendingactions)  |  |
| `void` | [`processPushScene`](#processpushscene)  |  |
| `void` | [`processPopScene`](#processpopscene)  |  |
| `void` | [`processClearScene`](#processclearscene)  |  |
| `void` | [`processReplaceScene`](#processreplacescene)  |  |
| `Scene *` | [`getCurrentScene`](#getcurrentscene) `const` |  |

---

### SceneManager

`explicit`

```cpp
explicit SceneManager()
```

Defined in ShitEngine/Scene/SceneManager.h:38

---

### pushScene

```cpp
void pushScene(std::unique_ptr< Scene > && scene)
```

Defined in ShitEngine/Scene/SceneManager.h:41

---

### popScene

```cpp
void popScene()
```

Defined in ShitEngine/Scene/SceneManager.h:42

---

### clearScene

```cpp
void clearScene()
```

Defined in ShitEngine/Scene/SceneManager.h:43

---

### replaceScene

```cpp
void replaceScene(std::unique_ptr< Scene > && scene)
```

Defined in ShitEngine/Scene/SceneManager.h:44

---

### update

```cpp
void update()
```

Defined in ShitEngine/Scene/SceneManager.h:46

---

### destroy

```cpp
void destroy()
```

Defined in ShitEngine/Scene/SceneManager.h:47

---

### processPendingActions

```cpp
void processPendingActions()
```

Defined in ShitEngine/Scene/SceneManager.h:49

---

### processPushScene

```cpp
void processPushScene(std::unique_ptr< Scene > && scene)
```

Defined in ShitEngine/Scene/SceneManager.h:50

---

### processPopScene

```cpp
void processPopScene()
```

Defined in ShitEngine/Scene/SceneManager.h:51

---

### processClearScene

```cpp
void processClearScene()
```

Defined in ShitEngine/Scene/SceneManager.h:52

---

### processReplaceScene

```cpp
void processReplaceScene(std::unique_ptr< Scene > && scene)
```

Defined in ShitEngine/Scene/SceneManager.h:53

---

### getCurrentScene

`const`

```cpp
Scene * getCurrentScene() const
```

Defined in ShitEngine/Scene/SceneManager.h:55

