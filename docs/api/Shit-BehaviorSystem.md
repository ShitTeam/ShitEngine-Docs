---
title: "BehaviorSystem"
description: "[Behavior](Shit-Behavior.md#behavior) 驱动系统"
kind: class
namespace: Shit
header: "BehaviorSystem.h"
---


# BehaviorSystem

```cpp
#include <BehaviorSystem.h>
```

```cpp
class BehaviorSystem
```

Defined in ShitEngine/System/BehaviorSystem.h:13

> **Inherits:** [`System`](Shit-System.md#system)

[Behavior](Shit-Behavior.md#behavior) 驱动系统

每帧遍历已注册的 [Behavior](Shit-Behavior.md#behavior) 组件，驱动其 onStart / onUpdate。 [Behavior](Shit-Behavior.md#behavior) 的 onAttach / onDetach 会自动调用 register / unregister。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`BehaviorSystem`](#behaviorsystem-1) | `function` | Declared here |
| [`update`](#update-2) | `function` | Declared here |
| [`destroy`](#destroy-2) | `function` | Declared here |
| [`registerBehavior`](#registerbehavior) | `function` | Declared here |
| [`unregisterBehavior`](#unregisterbehavior) | `function` | Declared here |
| [`m_behaviors`](#m_behaviors) | `variable` | Declared here |
| [`m_pendingBehaviors`](#m_pendingbehaviors) | `variable` | Declared here |
| [`System`](Shit-System.md#system-1) | `function` | Inherited from [`System`](Shit-System.md#system) |
| [`init`](Shit-System.md#init-12) | `function` | Inherited from [`System`](Shit-System.md#system) |
| [`update`](Shit-System.md#update-9) | `function` | Inherited from [`System`](Shit-System.md#system) |
| [`destroy`](Shit-System.md#destroy-9) | `function` | Inherited from [`System`](Shit-System.md#system) |
| [`getScene`](Shit-System.md#getscene-1) | `function` | Inherited from [`System`](Shit-System.md#system) |
| [`setScene`](Shit-System.md#setscene-1) | `function` | Inherited from [`System`](Shit-System.md#system) |
| [`getPriority`](Shit-System.md#getpriority-1) | `function` | Inherited from [`System`](Shit-System.md#system) |
| [`setPriority`](Shit-System.md#setpriority-1) | `function` | Inherited from [`System`](Shit-System.md#system) |
| [`m_priority`](Shit-System.md#m_priority-1) | `variable` | Inherited from [`System`](Shit-System.md#system) |
| [`m_scene`](Shit-System.md#m_scene-1) | `variable` | Inherited from [`System`](Shit-System.md#system) |

## Inherited from [`System`](Shit-System.md#system)

| Kind | Name | Description |
|------|------|-------------|
| `function` | [`System`](Shit-System.md#system-1)  |  |
| `function` | [`init`](Shit-System.md#init-12) `virtual` | 初始化 |
| `function` | [`update`](Shit-System.md#update-9) `virtual` | 每帧更新（纯虚） |
| `function` | [`destroy`](Shit-System.md#destroy-9) `virtual` | 销毁（纯虚） |
| `function` | [`getScene`](Shit-System.md#getscene-1) `const` `inline` |  |
| `function` | [`setScene`](Shit-System.md#setscene-1) `inline` |  |
| `function` | [`getPriority`](Shit-System.md#getpriority-1) `const` `inline` |  |
| `function` | [`setPriority`](Shit-System.md#setpriority-1) `inline` |  |
| `variable` | [`m_priority`](Shit-System.md#m_priority-1)  | 优先级（小值先执行） |
| `variable` | [`m_scene`](Shit-System.md#m_scene-1)  | 所属场景 |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`BehaviorSystem`](#behaviorsystem-1)  |  |
| `void` | [`update`](#update-2) `virtual` `override` | 每帧更新（纯虚） |
| `void` | [`destroy`](#destroy-2) `virtual` `override` | 销毁（纯虚） |
| `void` | [`registerBehavior`](#registerbehavior)  | 注册 Behavior（onAttach 时自动调用） |
| `void` | [`unregisterBehavior`](#unregisterbehavior)  | 注销 Behavior（onDetach 时自动调用） |

---

### BehaviorSystem

```cpp
BehaviorSystem(int priority = 0)
```

Defined in ShitEngine/System/BehaviorSystem.h:15

---

### update

`virtual` `override`

```cpp
virtual void update() override
```

Defined in ShitEngine/System/BehaviorSystem.h:18

每帧更新（纯虚）

#### Reimplements

- [`update`](Shit-System.md#update-9)

---

### destroy

`virtual` `override`

```cpp
virtual void destroy() override
```

Defined in ShitEngine/System/BehaviorSystem.h:19

销毁（纯虚）

#### Reimplements

- [`destroy`](Shit-System.md#destroy-9)

---

### registerBehavior

```cpp
void registerBehavior(Behavior * behavior)
```

Defined in ShitEngine/System/BehaviorSystem.h:21

注册 Behavior（onAttach 时自动调用）

---

### unregisterBehavior

```cpp
void unregisterBehavior(Behavior * behavior)
```

Defined in ShitEngine/System/BehaviorSystem.h:22

注销 Behavior（onDetach 时自动调用）

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::vector< Behavior * >` | [`m_behaviors`](#m_behaviors)  |  |
| `std::vector< Behavior * >` | [`m_pendingBehaviors`](#m_pendingbehaviors)  |  |

---

### m_behaviors

```cpp
std::vector< Behavior * > m_behaviors
```

Defined in ShitEngine/System/BehaviorSystem.h:25

---

### m_pendingBehaviors

```cpp
std::vector< Behavior * > m_pendingBehaviors
```

Defined in ShitEngine/System/BehaviorSystem.h:26

