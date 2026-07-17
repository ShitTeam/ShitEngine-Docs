---
title: "CameraComponent"
description: "相机组件，定义\"从哪个角度观察世界\""
kind: class
namespace: Shit
header: "CameraComponent.h"
---


# CameraComponent

```cpp
#include <CameraComponent.h>
```

```cpp
class CameraComponent
```

Defined in ShitEngine/Component/CameraComponent.h:15

> **Inherits:** [`Component`](Shit-Component.md#component)

相机组件，定义"从哪个角度观察世界"

相机的位置由同 [GameObject](Shit-GameObject.md#gameobject-2) 上的 [TransformComponent](Shit-TransformComponent.md#transformcomponent) 决定。 m_worldSize 决定能看到的世界范围，m_viewportRatio 决定渲染到屏幕的哪个区域。 支持多相机分屏渲染（按 priority 排序）。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`CameraComponent`](#cameracomponent-1) | `function` | Declared here |
| [`onAttach`](#onattach-2) | `function` | Declared here |
| [`onDestroy`](#ondestroy-2) | `function` | Declared here |
| [`worldToScreen`](#worldtoscreen) | `function` | Declared here |
| [`screenToWorld`](#screentoworld) | `function` | Declared here |
| [`getPosition`](#getposition) | `function` | Declared here |
| [`getSize`](#getsize) | `function` | Declared here |
| [`getZoom`](#getzoom) | `function` | Declared here |
| [`getPriority`](#getpriority) | `function` | Declared here |
| [`getPixelPerUnit`](#getpixelperunit) | `function` | Declared here |
| [`setSize`](#setsize) | `function` | Declared here |
| [`setZoom`](#setzoom) | `function` | Declared here |
| [`setPriority`](#setpriority) | `function` | Declared here |
| [`getViewportRatio`](#getviewportratio) | `function` | Declared here |
| [`setViewportRatio`](#setviewportratio) | `function` | Declared here |
| [`m_worldSize`](#m_worldsize) | `variable` | Declared here |
| [`m_zoom`](#m_zoom) | `variable` | Declared here |
| [`m_priority`](#m_priority) | `variable` | Declared here |
| [`m_viewportRatio`](#m_viewportratio) | `variable` | Declared here |
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

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`CameraComponent`](#cameracomponent-1)  |  |
| `void` | [`onAttach`](#onattach-2) `virtual` `override` |  |
| `void` | [`onDestroy`](#ondestroy-2) `virtual` `override` |  |
| `Vector2` | [`worldToScreen`](#worldtoscreen) `const` | 世界坐标 → 屏幕像素坐标 |
| `Vector2` | [`screenToWorld`](#screentoworld) `const` | 屏幕像素坐标 → 世界坐标 |
| `Vector2` | [`getPosition`](#getposition) `const` | 相机中心位置（从 [TransformComponent](Shit-TransformComponent.md#transformcomponent) 同步读取） |
| `Vector2` | [`getSize`](#getsize) `const` `inline` | 视口世界大小 |
| `float` | [`getZoom`](#getzoom) `const` `inline` | 缩放系数 |
| `int` | [`getPriority`](#getpriority) `const` `inline` | 渲染优先级（小值先画） |
| `float` | [`getPixelPerUnit`](#getpixelperunit) `const` | 每逻辑单位对应的像素数 |
| `void` | [`setSize`](#setsize) `inline` |  |
| `void` | [`setZoom`](#setzoom) `inline` |  |
| `void` | [`setPriority`](#setpriority) `inline` |  |
| `const SDL_FRect &` | [`getViewportRatio`](#getviewportratio) `const` `inline` | 视口比例 (0~1) |
| `void` | [`setViewportRatio`](#setviewportratio) `inline` | 设置视口比例 |

---

### CameraComponent

```cpp
CameraComponent()
```

Defined in ShitEngine/Component/CameraComponent.h:17

---

### onAttach

`virtual` `override`

```cpp
virtual void onAttach() override
```

Defined in ShitEngine/Component/CameraComponent.h:19

#### Reimplements

- [`onAttach`](Shit-Component.md#onattach-3)

---

### onDestroy

`virtual` `override`

```cpp
virtual void onDestroy() override
```

Defined in ShitEngine/Component/CameraComponent.h:20

#### Reimplements

- [`onDestroy`](Shit-Component.md#ondestroy-3)

---

### worldToScreen

`const`

```cpp
Vector2 worldToScreen(const Vector2 & worldPosition) const
```

Defined in ShitEngine/Component/CameraComponent.h:23

世界坐标 → 屏幕像素坐标

---

### screenToWorld

`const`

```cpp
Vector2 screenToWorld(const Vector2 & screenPosition) const
```

Defined in ShitEngine/Component/CameraComponent.h:24

屏幕像素坐标 → 世界坐标

---

### getPosition

`const`

```cpp
Vector2 getPosition() const
```

Defined in ShitEngine/Component/CameraComponent.h:26

相机中心位置（从 [TransformComponent](Shit-TransformComponent.md#transformcomponent) 同步读取）

---

### getSize

`const` `inline`

```cpp
inline Vector2 getSize() const
```

Defined in ShitEngine/Component/CameraComponent.h:27

视口世界大小

---

### getZoom

`const` `inline`

```cpp
inline float getZoom() const
```

Defined in ShitEngine/Component/CameraComponent.h:28

缩放系数

---

### getPriority

`const` `inline`

```cpp
inline int getPriority() const
```

Defined in ShitEngine/Component/CameraComponent.h:29

渲染优先级（小值先画）

---

### getPixelPerUnit

`const`

```cpp
float getPixelPerUnit() const
```

Defined in ShitEngine/Component/CameraComponent.h:30

每逻辑单位对应的像素数

---

### setSize

`inline`

```cpp
inline void setSize(const Vector2 & worldSize)
```

Defined in ShitEngine/Component/CameraComponent.h:32

---

### setZoom

`inline`

```cpp
inline void setZoom(float zoom)
```

Defined in ShitEngine/Component/CameraComponent.h:33

---

### setPriority

`inline`

```cpp
inline void setPriority(int priority)
```

Defined in ShitEngine/Component/CameraComponent.h:34

---

### getViewportRatio

`const` `inline`

```cpp
inline const SDL_FRect & getViewportRatio() const
```

Defined in ShitEngine/Component/CameraComponent.h:36

视口比例 (0~1)

---

### setViewportRatio

`inline`

```cpp
inline void setViewportRatio(const SDL_FRect & ratio)
```

Defined in ShitEngine/Component/CameraComponent.h:37

设置视口比例

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `Vector2` | [`m_worldSize`](#m_worldsize)  | 看到的世界范围（世界单位） |
| `float` | [`m_zoom`](#m_zoom)  |  |
| `int` | [`m_priority`](#m_priority)  |  |
| `SDL_FRect` | [`m_viewportRatio`](#m_viewportratio)  | 相对于逻辑分辨率的裁剪区域 (0~1) |

---

### m_worldSize

```cpp
Vector2 m_worldSize { 1280.0f, 720.0f }
```

Defined in ShitEngine/Component/CameraComponent.h:40

看到的世界范围（世界单位）

---

### m_zoom

```cpp
float m_zoom = 1.0f
```

Defined in ShitEngine/Component/CameraComponent.h:41

---

### m_priority

```cpp
int m_priority = 0
```

Defined in ShitEngine/Component/CameraComponent.h:42

---

### m_viewportRatio

```cpp
SDL_FRect m_viewportRatio { 0.0f, 0.0f, 1.0f, 1.0f }
```

Defined in ShitEngine/Component/CameraComponent.h:43

相对于逻辑分辨率的裁剪区域 (0~1)

