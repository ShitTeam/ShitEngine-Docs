---
title: "RenderSystem"
description: "渲染系统"
kind: class
namespace: Shit
header: "RenderSystem.h"
---


# RenderSystem

```cpp
#include <RenderSystem.h>
```

```cpp
class RenderSystem
```

Defined in ShitEngine/Render/RenderSystem.h:18

> **Inherits:** [`System`](Shit-System.md#system)

渲染系统

每帧按优先级排序相机 → 按 Z-Index 排序渲染器 → 逐个相机裁剪渲染。 [RendererComponent](Shit-RendererComponent.md#renderercomponent) 的 onAttach / onDetach 自动调用 register / unregister。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`RenderSystem`](#rendersystem-1) | `function` | Declared here |
| [`update`](#update-5) | `function` | Declared here |
| [`destroy`](#destroy-5) | `function` | Declared here |
| [`registerRenderer`](#registerrenderer) | `function` | Declared here |
| [`unregisterRenderer`](#unregisterrenderer) | `function` | Declared here |
| [`registerCamera`](#registercamera) | `function` | Declared here |
| [`unregisterCamera`](#unregistercamera) | `function` | Declared here |
| [`m_renderer`](#m_renderer-1) | `variable` | Declared here |
| [`m_renderers`](#m_renderers) | `variable` | Declared here |
| [`m_isRenderersNeedSort`](#m_isrenderersneedsort) | `variable` | Declared here |
| [`m_cameras`](#m_cameras) | `variable` | Declared here |
| [`m_isCamerasNeedSort`](#m_iscamerasneedsort) | `variable` | Declared here |
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
|  | [`RenderSystem`](#rendersystem-1)  |  |
| `void` | [`update`](#update-5) `virtual` `override` | 每帧更新（纯虚） |
| `void` | [`destroy`](#destroy-5) `virtual` `override` | 销毁（纯虚） |
| `void` | [`registerRenderer`](#registerrenderer)  | 注册渲染组件 |
| `void` | [`unregisterRenderer`](#unregisterrenderer)  | 注销渲染组件 |
| `void` | [`registerCamera`](#registercamera)  | 注册相机 |
| `void` | [`unregisterCamera`](#unregistercamera)  | 注销相机 |

---

### RenderSystem

```cpp
RenderSystem(int priority = 100)
```

Defined in ShitEngine/Render/RenderSystem.h:20

---

### update

`virtual` `override`

```cpp
virtual void update() override
```

Defined in ShitEngine/Render/RenderSystem.h:23

每帧更新（纯虚）

#### Reimplements

- [`update`](Shit-System.md#update-9)

---

### destroy

`virtual` `override`

```cpp
virtual void destroy() override
```

Defined in ShitEngine/Render/RenderSystem.h:24

销毁（纯虚）

#### Reimplements

- [`destroy`](Shit-System.md#destroy-9)

---

### registerRenderer

```cpp
void registerRenderer(RendererComponent * renderer)
```

Defined in ShitEngine/Render/RenderSystem.h:26

注册渲染组件

---

### unregisterRenderer

```cpp
void unregisterRenderer(RendererComponent * renderer)
```

Defined in ShitEngine/Render/RenderSystem.h:27

注销渲染组件

---

### registerCamera

```cpp
void registerCamera(CameraComponent * camera)
```

Defined in ShitEngine/Render/RenderSystem.h:28

注册相机

---

### unregisterCamera

```cpp
void unregisterCamera(CameraComponent * camera)
```

Defined in ShitEngine/Render/RenderSystem.h:29

注销相机

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `SDL_Renderer *` | [`m_renderer`](#m_renderer-1)  |  |
| `std::vector< RendererComponent * >` | [`m_renderers`](#m_renderers)  |  |
| `bool` | [`m_isRenderersNeedSort`](#m_isrenderersneedsort)  |  |
| `std::vector< CameraComponent * >` | [`m_cameras`](#m_cameras)  |  |
| `bool` | [`m_isCamerasNeedSort`](#m_iscamerasneedsort)  |  |

---

### m_renderer

```cpp
SDL_Renderer * m_renderer = nullptr
```

Defined in ShitEngine/Render/RenderSystem.h:32

---

### m_renderers

```cpp
std::vector< RendererComponent * > m_renderers
```

Defined in ShitEngine/Render/RenderSystem.h:34

---

### m_isRenderersNeedSort

```cpp
bool m_isRenderersNeedSort = false
```

Defined in ShitEngine/Render/RenderSystem.h:35

---

### m_cameras

```cpp
std::vector< CameraComponent * > m_cameras
```

Defined in ShitEngine/Render/RenderSystem.h:37

---

### m_isCamerasNeedSort

```cpp
bool m_isCamerasNeedSort = false
```

Defined in ShitEngine/Render/RenderSystem.h:38

