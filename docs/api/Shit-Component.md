---
title: "Component"
description: "组件基类"
kind: class
namespace: Shit
header: "Component.h"
---


# Component

```cpp
#include <Component.h>
```

```cpp
class Component
```

Defined in ShitEngine/Component/Component.h:18

> **Subclassed by:** [`Behavior`](Shit-Behavior.md#behavior), [`CameraComponent`](Shit-CameraComponent.md#cameracomponent), [`RendererComponent`](Shit-RendererComponent.md#renderercomponent), [`TransformComponent`](Shit-TransformComponent.md#transformcomponent)

组件基类

所有组件必须继承此类。

生命周期（按调用顺序）： onCreate — 组件刚被构造、已绑定 owner，尚未挂载到场景 onAttach — 组件所属 [GameObject](Shit-GameObject.md#gameobject-2) 进入活动场景时 onDetach — 组件即将从场景中移除时（在 onDestroy 前调用） onDestroy — 组件被销毁时

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`GameObject`](#gameobject-1) | `friend` | Declared here |
| [`Component`](#component-1) | `function` | Declared here |
| [`onCreate`](#oncreate-1) | `function` | Declared here |
| [`onAttach`](#onattach-3) | `function` | Declared here |
| [`onDetach`](#ondetach-1) | `function` | Declared here |
| [`onDestroy`](#ondestroy-3) | `function` | Declared here |
| [`Component`](#component-2) | `function` | Declared here |
| [`Component`](#component-3) | `function` | Declared here |
| [`getOwner`](#getowner) | `function` | Declared here |
| [`isRegistered`](#isregistered) | `function` | Declared here |
| [`m_owner`](#m_owner) | `variable` | Declared here |
| [`m_isRegistered`](#m_isregistered) | `variable` | Declared here |
| [`setOwner`](#setowner) | `function` | Declared here |

## Friends

| Name | Description |
|------|-------------|
| [`GameObject`](#gameobject-1)  |  |

---

### GameObject

```cpp
friend class GameObject
```

Defined in ShitEngine/Component/Component.h:19

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Component`](#component-1)  |  |
| `void` | [`onCreate`](#oncreate-1) `virtual` `inline` |  |
| `void` | [`onAttach`](#onattach-3) `virtual` `inline` |  |
| `void` | [`onDetach`](#ondetach-1) `virtual` `inline` |  |
| `void` | [`onDestroy`](#ondestroy-3) `virtual` `inline` |  |
|  | [`Component`](#component-2)  | Deleted constructor. |
|  | [`Component`](#component-3)  | Deleted constructor. |
| `GameObject *` | [`getOwner`](#getowner) `const` `inline` |  |
| `bool` | [`isRegistered`](#isregistered) `const` `inline` |  |

---

### Component

```cpp
Component()
```

Defined in ShitEngine/Component/Component.h:22

---

### onCreate

`virtual` `inline`

```cpp
virtual inline void onCreate()
```

Defined in ShitEngine/Component/Component.h:25

#### Reimplemented by

- [`onCreate`](Shit-Behavior.md#oncreate)

---

### onAttach

`virtual` `inline`

```cpp
virtual inline void onAttach()
```

Defined in ShitEngine/Component/Component.h:26

#### Reimplemented by

- [`onAttach`](Shit-AnimationComponent.md#onattach)
- [`onAttach`](Shit-Behavior.md#onattach-1)
- [`onAttach`](Shit-CameraComponent.md#onattach-2)
- [`onAttach`](Shit-RendererComponent.md#onattach-4)

---

### onDetach

`virtual` `inline`

```cpp
virtual inline void onDetach()
```

Defined in ShitEngine/Component/Component.h:27

#### Reimplemented by

- [`onDetach`](Shit-Behavior.md#ondetach)
- [`onDetach`](Shit-RendererComponent.md#ondetach-2)

---

### onDestroy

`virtual` `inline`

```cpp
virtual inline void onDestroy()
```

Defined in ShitEngine/Component/Component.h:28

#### Reimplemented by

- [`onDestroy`](Shit-AnimationComponent.md#ondestroy)
- [`onDestroy`](Shit-Behavior.md#ondestroy-1)
- [`onDestroy`](Shit-CameraComponent.md#ondestroy-2)
- [`onDestroy`](Shit-RendererComponent.md#ondestroy-4)

---

### Component

```cpp
Component(const Component &) = delete
```

Defined in ShitEngine/Component/Component.h:31

Deleted constructor.

---

### Component

```cpp
Component(Component &&) = delete
```

Defined in ShitEngine/Component/Component.h:33

Deleted constructor.

---

### getOwner

`const` `inline`

```cpp
inline GameObject * getOwner() const
```

Defined in ShitEngine/Component/Component.h:36

---

### isRegistered

`const` `inline`

```cpp
inline bool isRegistered() const
```

Defined in ShitEngine/Component/Component.h:37

## Protected Attributes

| Return | Name | Description |
|--------|------|-------------|
| `GameObject *` | [`m_owner`](#m_owner)  |  |
| `bool` | [`m_isRegistered`](#m_isregistered)  |  |

---

### m_owner

```cpp
GameObject * m_owner = nullptr
```

Defined in ShitEngine/Component/Component.h:44

---

### m_isRegistered

```cpp
bool m_isRegistered = false
```

Defined in ShitEngine/Component/Component.h:45

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
| `void` | [`setOwner`](#setowner) `inline` |  |

---

### setOwner

`inline`

```cpp
inline void setOwner(GameObject * owner)
```

Defined in ShitEngine/Component/Component.h:41

