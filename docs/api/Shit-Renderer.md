---
title: "Renderer"
description: "渲染器，封装 SDL3 绘制 API"
kind: class
namespace: Shit
header: "Renderer.h"
---


# Renderer

```cpp
#include <Renderer.h>
```

```cpp
class Renderer
```

Defined in ShitEngine/Render/Renderer.h:21

渲染器，封装 SDL3 绘制 API

管理逻辑分辨率、清屏、精灵绘制（UI 用）以及 Present。 默认逻辑分辨率 1280×720，通过 settings.json 中的 window.width/height 配置。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`Renderer`](#renderer-1) | `function` | Declared here |
| [`Renderer`](#renderer-2) | `function` | Declared here |
| [`GetInstance`](#getinstance-5) | `function` | Declared here |
| [`Init`](#init-7) | `function` | Declared here |
| [`ClearScreen`](#clearscreen) | `function` | Declared here |
| [`Present`](#present) | `function` | Declared here |
| [`GetRenderer`](#getrenderer) | `function` | Declared here |
| [`GetLogicalWidth`](#getlogicalwidth) | `function` | Declared here |
| [`GetLogicalHeight`](#getlogicalheight) | `function` | Declared here |
| [`DrawSprite`](#drawsprite) | `function` | Declared here |
| [`m_renderer`](#m_renderer) | `variable` | Declared here |
| [`m_logicalWidth`](#m_logicalwidth) | `variable` | Declared here |
| [`m_logicalHeight`](#m_logicalheight) | `variable` | Declared here |
| [`Renderer`](#renderer-3) | `function` | Declared here |
| [`init`](#init-8) | `function` | Declared here |
| [`clearScreen`](#clearscreen-1) | `function` | Declared here |
| [`present`](#present-1) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Renderer`](#renderer-1)  | Deleted constructor. |
|  | [`Renderer`](#renderer-2)  | Defaulted constructor. |

---

### Renderer

```cpp
Renderer(const Renderer &) = delete
```

Defined in ShitEngine/Render/Renderer.h:23

Deleted constructor.

---

### Renderer

```cpp
Renderer(Renderer &&) = default
```

Defined in ShitEngine/Render/Renderer.h:25

Defaulted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `Renderer &` | [`GetInstance`](#getinstance-5) `static` |  |
| `bool` | [`Init`](#init-7) `static` `inline` | 初始化渲染器 |
| `void` | [`ClearScreen`](#clearscreen) `static` `inline` | 清屏（每帧开头调用） |
| `void` | [`Present`](#present) `static` `inline` | 交换缓冲区（每帧末尾调用） |
| `SDL_Renderer *` | [`GetRenderer`](#getrenderer) `static` `inline` | 获取原生 SDL_Renderer |
| `int` | [`GetLogicalWidth`](#getlogicalwidth) `static` `inline` | 逻辑分辨率宽度 |
| `int` | [`GetLogicalHeight`](#getlogicalheight) `static` `inline` | 逻辑分辨率高度 |
| `void` | [`DrawSprite`](#drawsprite) `static` | 在屏幕坐标直接绘制精灵（UI 场景用） |

---

### GetInstance

`static`

```cpp
static Renderer & GetInstance()
```

Defined in ShitEngine/Render/Renderer.h:29

---

### Init

`static` `inline`

```cpp
static inline bool Init()
```

Defined in ShitEngine/Render/Renderer.h:30

初始化渲染器

---

### ClearScreen

`static` `inline`

```cpp
static inline void ClearScreen()
```

Defined in ShitEngine/Render/Renderer.h:31

清屏（每帧开头调用）

---

### Present

`static` `inline`

```cpp
static inline void Present()
```

Defined in ShitEngine/Render/Renderer.h:32

交换缓冲区（每帧末尾调用）

---

### GetRenderer

`static` `inline`

```cpp
static inline SDL_Renderer * GetRenderer()
```

Defined in ShitEngine/Render/Renderer.h:33

获取原生 SDL_Renderer

---

### GetLogicalWidth

`static` `inline`

```cpp
static inline int GetLogicalWidth()
```

Defined in ShitEngine/Render/Renderer.h:35

逻辑分辨率宽度

---

### GetLogicalHeight

`static` `inline`

```cpp
static inline int GetLogicalHeight()
```

Defined in ShitEngine/Render/Renderer.h:36

逻辑分辨率高度

---

### DrawSprite

`static`

```cpp
static void DrawSprite(const Sprite & sprite, const Vector2 & position, const std::optional< Vector2 > & size = std::nullopt)
```

Defined in ShitEngine/Render/Renderer.h:44

在屏幕坐标直接绘制精灵（UI 场景用）

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `sprite` | `const [Sprite](Shit-Sprite.md#sprite) &` | 精灵数据 |
| `position` | `const [Vector2](Shit.md#vector2) &` | 屏幕坐标左上角 |
| `size` | `const std::optional< [Vector2](Shit.md#vector2) > &` | 可选目标尺寸，留空用纹理原始尺寸 |

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::unique_ptr< SDL_Renderer, SDLRendererDeleter >` | [`m_renderer`](#m_renderer)  |  |
| `int` | [`m_logicalWidth`](#m_logicalwidth)  |  |
| `int` | [`m_logicalHeight`](#m_logicalheight)  |  |

---

### m_renderer

```cpp
std::unique_ptr< SDL_Renderer, SDLRendererDeleter > m_renderer
```

Defined in ShitEngine/Render/Renderer.h:60

---

### m_logicalWidth

```cpp
int m_logicalWidth = 1280
```

Defined in ShitEngine/Render/Renderer.h:61

---

### m_logicalHeight

```cpp
int m_logicalHeight = 720
```

Defined in ShitEngine/Render/Renderer.h:62

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Renderer`](#renderer-3)  | Defaulted constructor. |
| `bool` | [`init`](#init-8)  |  |
| `void` | [`clearScreen`](#clearscreen-1)  |  |
| `void` | [`present`](#present-1)  |  |

---

### Renderer

```cpp
Renderer() = default
```

Defined in ShitEngine/Render/Renderer.h:47

Defaulted constructor.

---

### init

```cpp
bool init()
```

Defined in ShitEngine/Render/Renderer.h:50

---

### clearScreen

```cpp
void clearScreen()
```

Defined in ShitEngine/Render/Renderer.h:51

---

### present

```cpp
void present()
```

Defined in ShitEngine/Render/Renderer.h:52

