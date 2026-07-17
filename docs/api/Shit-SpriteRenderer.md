---
title: "SpriteRenderer"
description: "精灵组件"
kind: class
namespace: Shit
header: "SpriteRenderer.h"
---


# SpriteRenderer

```cpp
#include <SpriteRenderer.h>
```

```cpp
class SpriteRenderer
```

Defined in ShitEngine/Component/SpriteRenderer.h:22

> **Inherits:** [`RendererComponent`](Shit-RendererComponent.md#renderercomponent)

精灵组件

内部持有 [Sprite](Shit-Sprite.md#sprite) 对象描述"画什么"。 整图渲染时 sourceRect 留空；用于 sprite-sheet 逐帧动画时， 由 [AnimationComponent](Shit-AnimationComponent.md#animationcomponent) 把当前帧的 SDL_FRect 写回 setSourceRect。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`GameObject`](#gameobject-6) | `friend` | Declared here |
| [`SpriteRenderer`](#spriterenderer-1) | `function` | Declared here |
| [`onRender`](#onrender-1) | `function` | Declared here |
| [`setTexturePath`](#settexturepath-1) | `function` | Declared here |
| [`getTexturePath`](#gettexturepath-1) | `function` | Declared here |
| [`setSourceRect`](#setsourcerect-1) | `function` | Declared here |
| [`getSourceRect`](#getsourcerect-1) | `function` | Declared here |
| [`setFlipped`](#setflipped-1) | `function` | Declared here |
| [`isFlipped`](#isflipped-1) | `function` | Declared here |
| [`getGlobalBounds`](#getglobalbounds-1) | `function` | Declared here |
| [`m_sprite`](#m_sprite) | `variable` | Declared here |
| [`RendererComponent`](Shit-RendererComponent.md#renderercomponent-1) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`onAttach`](Shit-RendererComponent.md#onattach-4) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`onDetach`](Shit-RendererComponent.md#ondetach-2) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`onRender`](Shit-RendererComponent.md#onrender) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`onDestroy`](Shit-RendererComponent.md#ondestroy-4) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`getZIndex`](Shit-RendererComponent.md#getzindex) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`isVisible`](Shit-RendererComponent.md#isvisible) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`getGlobalBounds`](Shit-RendererComponent.md#getglobalbounds) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`setZIndex`](Shit-RendererComponent.md#setzindex) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`setVisible`](Shit-RendererComponent.md#setvisible) | `function` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`m_zIndex`](Shit-RendererComponent.md#m_zindex) | `variable` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
| [`m_isVisible`](Shit-RendererComponent.md#m_isvisible) | `variable` | Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent) |
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

## Inherited from [`RendererComponent`](Shit-RendererComponent.md#renderercomponent)

| Kind | Name | Description |
|------|------|-------------|
| `function` | [`RendererComponent`](Shit-RendererComponent.md#renderercomponent-1)  |  |
| `function` | [`onAttach`](Shit-RendererComponent.md#onattach-4) `virtual` `override` |  |
| `function` | [`onDetach`](Shit-RendererComponent.md#ondetach-2) `virtual` `override` |  |
| `function` | [`onRender`](Shit-RendererComponent.md#onrender) `virtual` `const` | 纯虚：子类实现绘制逻辑 |
| `function` | [`onDestroy`](Shit-RendererComponent.md#ondestroy-4) `virtual` `override` |  |
| `function` | [`getZIndex`](Shit-RendererComponent.md#getzindex) `const` `inline` | 渲染层级，值越大越靠上 |
| `function` | [`isVisible`](Shit-RendererComponent.md#isvisible) `const` `inline` | 是否可见 |
| `function` | [`getGlobalBounds`](Shit-RendererComponent.md#getglobalbounds) `virtual` | 世界坐标下的轴对齐包围盒 |
| `function` | [`setZIndex`](Shit-RendererComponent.md#setzindex) `inline` |  |
| `function` | [`setVisible`](Shit-RendererComponent.md#setvisible) `inline` |  |
| `variable` | [`m_zIndex`](Shit-RendererComponent.md#m_zindex)  | 渲染顺序（值越大越靠上） |
| `variable` | [`m_isVisible`](Shit-RendererComponent.md#m_isvisible)  | 是否参与渲染 |

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
| [`GameObject`](#gameobject-6)  |  |

---

### GameObject

```cpp
friend class GameObject
```

Defined in ShitEngine/Component/SpriteRenderer.h:23

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`SpriteRenderer`](#spriterenderer-1)  | Defaulted constructor. |
| `void` | [`onRender`](#onrender-1) `virtual` `const` `override` | 纯虚：子类实现绘制逻辑 |
| `void` | [`setTexturePath`](#settexturepath-1)  |  |
| `const std::string &` | [`getTexturePath`](#gettexturepath-1) `const` `inline` |  |
| `void` | [`setSourceRect`](#setsourcerect-1) `inline` |  |
| `const std::optional< SDL_FRect > &` | [`getSourceRect`](#getsourcerect-1) `const` `inline` |  |
| `void` | [`setFlipped`](#setflipped-1) `inline` |  |
| `bool` | [`isFlipped`](#isflipped-1) `const` `inline` |  |
| `SDL_FRect` | [`getGlobalBounds`](#getglobalbounds-1) `virtual` `override` | 世界坐标下的轴对齐包围盒 |

---

### SpriteRenderer

```cpp
SpriteRenderer() = default
```

Defined in ShitEngine/Component/SpriteRenderer.h:25

Defaulted constructor.

---

### onRender

`virtual` `const` `override`

```cpp
virtual void onRender(SDL_Renderer * renderer, const CameraComponent * camera) const override
```

Defined in ShitEngine/Component/SpriteRenderer.h:28

纯虚：子类实现绘制逻辑

#### Reimplements

- [`onRender`](Shit-RendererComponent.md#onrender)

---

### setTexturePath

```cpp
void setTexturePath(const std::string & texturePath)
```

Defined in ShitEngine/Component/SpriteRenderer.h:31

---

### getTexturePath

`const` `inline`

```cpp
inline const std::string & getTexturePath() const
```

Defined in ShitEngine/Component/SpriteRenderer.h:32

---

### setSourceRect

`inline`

```cpp
inline void setSourceRect(const std::optional< SDL_FRect > & sourceRect)
```

Defined in ShitEngine/Component/SpriteRenderer.h:34

---

### getSourceRect

`const` `inline`

```cpp
inline const std::optional< SDL_FRect > & getSourceRect() const
```

Defined in ShitEngine/Component/SpriteRenderer.h:35

---

### setFlipped

`inline`

```cpp
inline void setFlipped(bool flipped)
```

Defined in ShitEngine/Component/SpriteRenderer.h:37

---

### isFlipped

`const` `inline`

```cpp
inline bool isFlipped() const
```

Defined in ShitEngine/Component/SpriteRenderer.h:38

---

### getGlobalBounds

`virtual` `override`

```cpp
virtual SDL_FRect getGlobalBounds() override
```

Defined in ShitEngine/Component/SpriteRenderer.h:40

世界坐标下的轴对齐包围盒

#### Reimplements

- [`getGlobalBounds`](Shit-RendererComponent.md#getglobalbounds)

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `Sprite` | [`m_sprite`](#m_sprite)  |  |

---

### m_sprite

```cpp
Sprite m_sprite
```

Defined in ShitEngine/Component/SpriteRenderer.h:42

