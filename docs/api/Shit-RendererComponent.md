---
title: "RendererComponent"
description: "渲染组件基类"
kind: class
namespace: Shit
header: "RendererComponent.h"
---


# RendererComponent

```cpp
#include <RendererComponent.h>
```

```cpp
class RendererComponent
```

Defined in ShitEngine/Component/RendererComponent.h:18

> **Inherits:** [`Component`](Shit-Component.md#component)
> **Subclassed by:** [`SpriteRenderer`](Shit-SpriteRenderer.md#spriterenderer)

渲染组件基类

所有可渲染的组件（SpriteRenderer 等）须继承此类并重写 onRender。 由 [RenderSystem](Shit-RenderSystem.md#rendersystem) 每帧按 Z-Index 排序后统一调用。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`RendererComponent`](#renderercomponent-1) | `function` | Declared here |
| [`onAttach`](#onattach-4) | `function` | Declared here |
| [`onDetach`](#ondetach-2) | `function` | Declared here |
| [`onRender`](#onrender) | `function` | Declared here |
| [`onDestroy`](#ondestroy-4) | `function` | Declared here |
| [`getZIndex`](#getzindex) | `function` | Declared here |
| [`isVisible`](#isvisible) | `function` | Declared here |
| [`getGlobalBounds`](#getglobalbounds) | `function` | Declared here |
| [`setZIndex`](#setzindex) | `function` | Declared here |
| [`setVisible`](#setvisible) | `function` | Declared here |
| [`m_zIndex`](#m_zindex) | `variable` | Declared here |
| [`m_isVisible`](#m_isvisible) | `variable` | Declared here |
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
|  | [`RendererComponent`](#renderercomponent-1)  |  |
| `void` | [`onAttach`](#onattach-4) `virtual` `override` |  |
| `void` | [`onDetach`](#ondetach-2) `virtual` `override` |  |
| `void` | [`onRender`](#onrender) `virtual` `const` | 纯虚：子类实现绘制逻辑 |
| `void` | [`onDestroy`](#ondestroy-4) `virtual` `override` |  |
| `int` | [`getZIndex`](#getzindex) `const` `inline` | 渲染层级，值越大越靠上 |
| `bool` | [`isVisible`](#isvisible) `const` `inline` | 是否可见 |
| `SDL_FRect` | [`getGlobalBounds`](#getglobalbounds) `virtual` | 世界坐标下的轴对齐包围盒 |
| `void` | [`setZIndex`](#setzindex) `inline` |  |
| `void` | [`setVisible`](#setvisible) `inline` |  |

---

### RendererComponent

```cpp
RendererComponent()
```

Defined in ShitEngine/Component/RendererComponent.h:20

---

### onAttach

`virtual` `override`

```cpp
virtual void onAttach() override
```

Defined in ShitEngine/Component/RendererComponent.h:23

#### Reimplements

- [`onAttach`](Shit-Component.md#onattach-3)

---

### onDetach

`virtual` `override`

```cpp
virtual void onDetach() override
```

Defined in ShitEngine/Component/RendererComponent.h:24

#### Reimplements

- [`onDetach`](Shit-Component.md#ondetach-1)

---

### onRender

`virtual` `const`

```cpp
virtual void onRender(SDL_Renderer * renderer, const CameraComponent * camera) const
```

Defined in ShitEngine/Component/RendererComponent.h:25

纯虚：子类实现绘制逻辑

#### Reimplemented by

- [`onRender`](Shit-SpriteRenderer.md#onrender-1)

---

### onDestroy

`virtual` `override`

```cpp
virtual void onDestroy() override
```

Defined in ShitEngine/Component/RendererComponent.h:26

#### Reimplements

- [`onDestroy`](Shit-Component.md#ondestroy-3)

---

### getZIndex

`const` `inline`

```cpp
inline int getZIndex() const
```

Defined in ShitEngine/Component/RendererComponent.h:29

渲染层级，值越大越靠上

---

### isVisible

`const` `inline`

```cpp
inline bool isVisible() const
```

Defined in ShitEngine/Component/RendererComponent.h:30

是否可见

---

### getGlobalBounds

`virtual`

```cpp
virtual SDL_FRect getGlobalBounds()
```

Defined in ShitEngine/Component/RendererComponent.h:31

世界坐标下的轴对齐包围盒

#### Reimplemented by

- [`getGlobalBounds`](Shit-SpriteRenderer.md#getglobalbounds-1)

---

### setZIndex

`inline`

```cpp
inline void setZIndex(int zIndex)
```

Defined in ShitEngine/Component/RendererComponent.h:33

---

### setVisible

`inline`

```cpp
inline void setVisible(bool isVisible)
```

Defined in ShitEngine/Component/RendererComponent.h:34

## Protected Attributes

| Return | Name | Description |
|--------|------|-------------|
| `int` | [`m_zIndex`](#m_zindex)  | 渲染顺序（值越大越靠上） |
| `bool` | [`m_isVisible`](#m_isvisible)  | 是否参与渲染 |

---

### m_zIndex

```cpp
int m_zIndex = 0
```

Defined in ShitEngine/Component/RendererComponent.h:37

渲染顺序（值越大越靠上）

---

### m_isVisible

```cpp
bool m_isVisible = true
```

Defined in ShitEngine/Component/RendererComponent.h:38

是否参与渲染

