---
title: "System"
description: "[System](#system) 基类"
kind: class
namespace: Shit
header: "System.h"
---


# System

```cpp
#include <System.h>
```

```cpp
class System
```

Defined in ShitEngine/System/System.h:15

> **Subclassed by:** [`BehaviorSystem`](Shit-BehaviorSystem.md#behaviorsystem), [`RenderSystem`](Shit-RenderSystem.md#rendersystem)

[System](#system) 基类

所有自定义系统必须继承此类并实现 [update()](#update-9) 与 [destroy()](#destroy-9)。 系统按 priority 值排序，小值先执行。 通过 [Scene::registerSystem<T>()](Shit-Scene.md#registersystem) 注册到场景。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`System`](#system-1) | `function` | Declared here |
| [`init`](#init-12) | `function` | Declared here |
| [`update`](#update-9) | `function` | Declared here |
| [`destroy`](#destroy-9) | `function` | Declared here |
| [`getScene`](#getscene-1) | `function` | Declared here |
| [`setScene`](#setscene-1) | `function` | Declared here |
| [`getPriority`](#getpriority-1) | `function` | Declared here |
| [`setPriority`](#setpriority-1) | `function` | Declared here |
| [`m_priority`](#m_priority-1) | `variable` | Declared here |
| [`m_scene`](#m_scene-1) | `variable` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`System`](#system-1)  |  |
| `void` | [`init`](#init-12) `virtual` | 初始化 |
| `void` | [`update`](#update-9) `virtual` | 每帧更新（纯虚） |
| `void` | [`destroy`](#destroy-9) `virtual` | 销毁（纯虚） |
| `Scene *` | [`getScene`](#getscene-1) `const` `inline` |  |
| `void` | [`setScene`](#setscene-1) `inline` |  |
| `int` | [`getPriority`](#getpriority-1) `const` `inline` |  |
| `void` | [`setPriority`](#setpriority-1) `inline` |  |

---

### System

```cpp
System(int priority = 0)
```

Defined in ShitEngine/System/System.h:17

---

### init

`virtual`

```cpp
virtual void init()
```

Defined in ShitEngine/System/System.h:20

初始化

---

### update

`virtual`

```cpp
virtual void update()
```

Defined in ShitEngine/System/System.h:21

每帧更新（纯虚）

#### Reimplemented by

- [`update`](Shit-BehaviorSystem.md#update-2)
- [`update`](Shit-RenderSystem.md#update-5)

---

### destroy

`virtual`

```cpp
virtual void destroy()
```

Defined in ShitEngine/System/System.h:22

销毁（纯虚）

#### Reimplemented by

- [`destroy`](Shit-BehaviorSystem.md#destroy-2)
- [`destroy`](Shit-RenderSystem.md#destroy-5)

---

### getScene

`const` `inline`

```cpp
inline Scene * getScene() const
```

Defined in ShitEngine/System/System.h:25

---

### setScene

`inline`

```cpp
inline void setScene(Scene * scene)
```

Defined in ShitEngine/System/System.h:26

---

### getPriority

`const` `inline`

```cpp
inline int getPriority() const
```

Defined in ShitEngine/System/System.h:28

---

### setPriority

`inline`

```cpp
inline void setPriority(int priority)
```

Defined in ShitEngine/System/System.h:29

## Protected Attributes

| Return | Name | Description |
|--------|------|-------------|
| `int` | [`m_priority`](#m_priority-1)  | 优先级（小值先执行） |
| `Scene *` | [`m_scene`](#m_scene-1)  | 所属场景 |

---

### m_priority

```cpp
int m_priority
```

Defined in ShitEngine/System/System.h:32

优先级（小值先执行）

---

### m_scene

```cpp
Scene * m_scene = nullptr
```

Defined in ShitEngine/System/System.h:33

所属场景

