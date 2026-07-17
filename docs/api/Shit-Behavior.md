---
title: "Behavior"
description: "行为基类 —— 用于编写自定义游戏逻辑"
kind: class
namespace: Shit
header: "Behavior.h"
---


# Behavior

```cpp
#include <Behavior.h>
```

```cpp
class Behavior
```

Defined in ShitEngine/Component/Behavior.h:18

> **Inherits:** [`Component`](Shit-Component.md#component)
> **Subclassed by:** [`AnimationComponent`](Shit-AnimationComponent.md#animationcomponent)

行为基类 —— 用于编写自定义游戏逻辑

继承自 Component，扩展出 onStart / onUpdate 两个阶段： onCreate → onAttach → onStart → (每帧)onUpdate → onDetach → onDestroy

onStart 在首次 update 前执行一次，适用于缓存指针。 onUpdate 每帧执行，适用于输入、移动、碰撞检测等。

挂载后由 [BehaviorSystem](Shit-BehaviorSystem.md#behaviorsystem) 自动驱动，无需手动调用。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`GameObject`](#gameobject) | `friend` | Declared here |
| [`Behavior`](#behavior-1) | `function` | Declared here |
| [`onCreate`](#oncreate) | `function` | Declared here |
| [`onAttach`](#onattach-1) | `function` | Declared here |
| [`onStart`](#onstart-1) | `function` | Declared here |
| [`onUpdate`](#onupdate-1) | `function` | Declared here |
| [`onDetach`](#ondetach) | `function` | Declared here |
| [`onDestroy`](#ondestroy-1) | `function` | Declared here |
| [`isStarted`](#isstarted) | `function` | Declared here |
| [`setStarted`](#setstarted) | `function` | Declared here |
| [`m_isStarted`](#m_isstarted) | `variable` | Declared here |
| [`GameObject`](Shit-Component.md#gameobject-1) | `friend` | Inherited from [`Component`](Shit-Component.md#component) |
| [`Component`](Shit-Component.md#component-1) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`onCreate`](Shit-Component.md#oncreate-1) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`onAttach`](Shit-Component.md#onattach-3) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`onDetach`](Shit-Component.md#ondetach-1) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`onDestroy`](Shit-Component.md#ondestroy-3) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`Component`](Shit-Component.md#component-2) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`Component`](Shit-Component.md#component-3) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`getOwner`](Shit-Component.md#getowner) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`isRegistered`](Shit-Component.md#isregistered) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`m_owner`](Shit-Component.md#m_owner) | `variable` | Inherited from [`Component`](Shit-Component.md#component) |
| [`m_isRegistered`](Shit-Component.md#m_isregistered) | `variable` | Inherited from [`Component`](Shit-Component.md#component) |
| [`setOwner`](Shit-Component.md#setowner) | `function` | Inherited from [`Component`](Shit-Component.md#component) |

## Inherited from [`Component`](Shit-Component.md#component)

| Kind | Name | Description |
|------|------|-------------|
| `friend` | [`GameObject`](Shit-Component.md#gameobject-1)  |  |
| `function` | [`Component`](Shit-Component.md#component-1)  |  |
| `function` | [`onCreate`](Shit-Component.md#oncreate-1) `virtual` `inline` |  |
| `function` | [`onAttach`](Shit-Component.md#onattach-3) `virtual` `inline` |  |
| `function` | [`onDetach`](Shit-Component.md#ondetach-1) `virtual` `inline` |  |
| `function` | [`onDestroy`](Shit-Component.md#ondestroy-3) `virtual` `inline` |  |
| `function` | [`Component`](Shit-Component.md#component-2)  | Deleted constructor. |
| `function` | [`Component`](Shit-Component.md#component-3)  | Deleted constructor. |
| `function` | [`getOwner`](Shit-Component.md#getowner) `const` `inline` |  |
| `function` | [`isRegistered`](Shit-Component.md#isregistered) `const` `inline` |  |
| `variable` | [`m_owner`](Shit-Component.md#m_owner)  |  |
| `variable` | [`m_isRegistered`](Shit-Component.md#m_isregistered)  |  |
| `function` | [`setOwner`](Shit-Component.md#setowner) `inline` |  |

## Friends

| Name | Description |
|------|-------------|
| [`GameObject`](#gameobject)  |  |

---

### GameObject

```cpp
friend class GameObject
```

Defined in ShitEngine/Component/Behavior.h:19

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Behavior`](#behavior-1)  | Defaulted constructor. |
| `void` | [`onCreate`](#oncreate) `virtual` `override` |  |
| `void` | [`onAttach`](#onattach-1) `virtual` `override` |  |
| `void` | [`onStart`](#onstart-1) `virtual` | 首次 update 前执行一次 |
| `void` | [`onUpdate`](#onupdate-1) `virtual` | 每帧执行 |
| `void` | [`onDetach`](#ondetach) `virtual` `override` |  |
| `void` | [`onDestroy`](#ondestroy-1) `virtual` `override` |  |
| `bool` | [`isStarted`](#isstarted) `const` `inline` | onStart 是否已执行过 |
| `void` | [`setStarted`](#setstarted) `inline` |  |

---

### Behavior

```cpp
Behavior() = default
```

Defined in ShitEngine/Component/Behavior.h:21

Defaulted constructor.

---

### onCreate

`virtual` `override`

```cpp
virtual void onCreate() override
```

Defined in ShitEngine/Component/Behavior.h:25

#### Reimplements

- [`onCreate`](Shit-Component.md#oncreate-1)

---

### onAttach

`virtual` `override`

```cpp
virtual void onAttach() override
```

Defined in ShitEngine/Component/Behavior.h:26

#### Reimplements

- [`onAttach`](Shit-Component.md#onattach-3)

---

### onStart

`virtual`

```cpp
virtual void onStart()
```

Defined in ShitEngine/Component/Behavior.h:27

首次 update 前执行一次

#### Reimplemented by

- [`onStart`](Shit-AnimationComponent.md#onstart)

---

### onUpdate

`virtual`

```cpp
virtual void onUpdate()
```

Defined in ShitEngine/Component/Behavior.h:28

每帧执行

#### Reimplemented by

- [`onUpdate`](Shit-AnimationComponent.md#onupdate)

---

### onDetach

`virtual` `override`

```cpp
virtual void onDetach() override
```

Defined in ShitEngine/Component/Behavior.h:29

#### Reimplements

- [`onDetach`](Shit-Component.md#ondetach-1)

---

### onDestroy

`virtual` `override`

```cpp
virtual void onDestroy() override
```

Defined in ShitEngine/Component/Behavior.h:30

#### Reimplements

- [`onDestroy`](Shit-Component.md#ondestroy-3)

---

### isStarted

`const` `inline`

```cpp
inline bool isStarted() const
```

Defined in ShitEngine/Component/Behavior.h:32

onStart 是否已执行过

---

### setStarted

`inline`

```cpp
inline void setStarted(bool isStarted)
```

Defined in ShitEngine/Component/Behavior.h:33

## Protected Attributes

| Return | Name | Description |
|--------|------|-------------|
| `bool` | [`m_isStarted`](#m_isstarted)  |  |

---

### m_isStarted

```cpp
bool m_isStarted = false
```

Defined in ShitEngine/Component/Behavior.h:36

