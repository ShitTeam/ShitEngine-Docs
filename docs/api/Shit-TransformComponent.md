---
title: "TransformComponent"
description: "变换组件，决定 [GameObject](Shit-GameObject.md#gameobject-2) 的位置 / 缩放 / 旋转"
kind: class
namespace: Shit
header: "TransformComponent.h"
---


# TransformComponent

```cpp
#include <TransformComponent.h>
```

```cpp
class TransformComponent
```

Defined in ShitEngine/Component/TransformComponent.h:14

> **Inherits:** [`Component`](Shit-Component.md#component)

变换组件，决定 [GameObject](Shit-GameObject.md#gameobject-2) 的位置 / 缩放 / 旋转

每个 [GameObject](Shit-GameObject.md#gameobject-2) 默认不含 TransformComponent，需手动 addComponent。 位置单位为世界坐标，旋转单位为度。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`GameObject`](#gameobject-7) | `friend` | Declared here |
| [`TransformComponent`](#transformcomponent-1) | `function` | Declared here |
| [`getPosition`](#getposition-1) | `function` | Declared here |
| [`setPosition`](#setposition) | `function` | Declared here |
| [`getScale`](#getscale) | `function` | Declared here |
| [`setScale`](#setscale) | `function` | Declared here |
| [`getRotation`](#getrotation) | `function` | Declared here |
| [`setRotation`](#setrotation) | `function` | Declared here |
| [`m_position`](#m_position) | `variable` | Declared here |
| [`m_scale`](#m_scale) | `variable` | Declared here |
| [`m_rotation`](#m_rotation) | `variable` | Declared here |
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
| [`GameObject`](#gameobject-7)  |  |

---

### GameObject

```cpp
friend class GameObject
```

Defined in ShitEngine/Component/TransformComponent.h:15

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`TransformComponent`](#transformcomponent-1) `explicit` |  |
| `const Vector2 &` | [`getPosition`](#getposition-1) `const` `inline` |  |
| `void` | [`setPosition`](#setposition) `inline` |  |
| `const Vector2 &` | [`getScale`](#getscale) `const` `inline` |  |
| `void` | [`setScale`](#setscale) `inline` |  |
| `float` | [`getRotation`](#getrotation) `const` `inline` |  |
| `void` | [`setRotation`](#setrotation) `inline` |  |

---

### TransformComponent

`explicit`

```cpp
explicit TransformComponent()
```

Defined in ShitEngine/Component/TransformComponent.h:17

---

### getPosition

`const` `inline`

```cpp
inline const Vector2 & getPosition() const
```

Defined in ShitEngine/Component/TransformComponent.h:21

---

### setPosition

`inline`

```cpp
inline void setPosition(const Vector2 & position)
```

Defined in ShitEngine/Component/TransformComponent.h:22

---

### getScale

`const` `inline`

```cpp
inline const Vector2 & getScale() const
```

Defined in ShitEngine/Component/TransformComponent.h:24

---

### setScale

`inline`

```cpp
inline void setScale(const Vector2 & scale)
```

Defined in ShitEngine/Component/TransformComponent.h:25

---

### getRotation

`const` `inline`

```cpp
inline float getRotation() const
```

Defined in ShitEngine/Component/TransformComponent.h:27

---

### setRotation

`inline`

```cpp
inline void setRotation(float rotation)
```

Defined in ShitEngine/Component/TransformComponent.h:28

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `Vector2` | [`m_position`](#m_position)  | 位置（世界坐标） |
| `Vector2` | [`m_scale`](#m_scale)  | 缩放系数 |
| `float` | [`m_rotation`](#m_rotation)  | 旋转角度（度） |

---

### m_position

```cpp
Vector2 m_position { 0.0f, 0.0f }
```

Defined in ShitEngine/Component/TransformComponent.h:31

位置（世界坐标）

---

### m_scale

```cpp
Vector2 m_scale { 1.0f, 1.0f }
```

Defined in ShitEngine/Component/TransformComponent.h:32

缩放系数

---

### m_rotation

```cpp
float m_rotation = 0.0f
```

Defined in ShitEngine/Component/TransformComponent.h:33

旋转角度（度）

