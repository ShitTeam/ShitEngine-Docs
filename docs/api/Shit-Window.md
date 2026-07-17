---
title: "Window"
description: "窗口管理类"
kind: class
namespace: Shit
header: "Window.h"
---


# Window

```cpp
#include <Window.h>
```

```cpp
class Window
```

Defined in ShitEngine/Core/Window.h:14

窗口管理类

封装 SDL_Window 的生命周期，提供窗口事件处理与状态查询。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`Window`](#window-1) | `function` | Declared here |
| [`Window`](#window-2) | `function` | Declared here |
| [`Window`](#window-3) | `function` | Declared here |
| [`GetInstance`](#getinstance-9) | `function` | Declared here |
| [`Init`](#init-15) | `function` | Declared here |
| [`GetWindow`](#getwindow) | `function` | Declared here |
| [`HandleEvent`](#handleevent-2) | `function` | Declared here |
| [`IsOpen`](#isopen) | `function` | Declared here |
| [`Close`](#close) | `function` | Declared here |
| [`Destroy`](#destroy-10) | `function` | Declared here |
| [`m_window`](#m_window) | `variable` | Declared here |
| [`m_isOpen`](#m_isopen) | `variable` | Declared here |
| [`init`](#init-16) | `function` | Declared here |
| [`handleEvent`](#handleevent-3) | `function` | Declared here |
| [`isOpen`](#isopen-1) | `function` | Declared here |
| [`close`](#close-1) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Window`](#window-1)  | Defaulted constructor. |
|  | [`Window`](#window-2)  | Deleted constructor. |
|  | [`Window`](#window-3)  | Deleted constructor. |

---

### Window

```cpp
Window() = default
```

Defined in ShitEngine/Core/Window.h:16

Defaulted constructor.

---

### Window

```cpp
Window(const Window &) = delete
```

Defined in ShitEngine/Core/Window.h:28

Deleted constructor.

---

### Window

```cpp
Window(Window &&) = delete
```

Defined in ShitEngine/Core/Window.h:30

Deleted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `Window &` | [`GetInstance`](#getinstance-9) `static` | 获取单例 |
| `bool` | [`Init`](#init-15) `static` `inline` | 初始化窗口 |
| `SDL_Window *` | [`GetWindow`](#getwindow) `static` `inline` | 获取原生 SDL_Window 指针 |
| `void` | [`HandleEvent`](#handleevent-2) `static` `inline` | 分发窗口事件给子系统 |
| `bool` | [`IsOpen`](#isopen) `static` `inline` | 窗口是否仍然打开 |
| `void` | [`Close`](#close) `static` `inline` | 关闭窗口 |
| `void` | [`Destroy`](#destroy-10) `static` | 销毁窗口及资源 |

---

### GetInstance

`static`

```cpp
static Window & GetInstance()
```

Defined in ShitEngine/Core/Window.h:20

获取单例

---

### Init

`static` `inline`

```cpp
static inline bool Init()
```

Defined in ShitEngine/Core/Window.h:21

初始化窗口

---

### GetWindow

`static` `inline`

```cpp
static inline SDL_Window * GetWindow()
```

Defined in ShitEngine/Core/Window.h:22

获取原生 SDL_Window 指针

---

### HandleEvent

`static` `inline`

```cpp
static inline void HandleEvent(const SDL_Event & event)
```

Defined in ShitEngine/Core/Window.h:23

分发窗口事件给子系统

---

### IsOpen

`static` `inline`

```cpp
static inline bool IsOpen()
```

Defined in ShitEngine/Core/Window.h:24

窗口是否仍然打开

---

### Close

`static` `inline`

```cpp
static inline void Close()
```

Defined in ShitEngine/Core/Window.h:25

关闭窗口

---

### Destroy

`static`

```cpp
static void Destroy()
```

Defined in ShitEngine/Core/Window.h:26

销毁窗口及资源

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::unique_ptr< SDL_Window, SDLWindowDeleter >` | [`m_window`](#m_window)  |  |
| `bool` | [`m_isOpen`](#m_isopen)  |  |

---

### m_window

```cpp
std::unique_ptr< SDL_Window, SDLWindowDeleter > m_window
```

Defined in ShitEngine/Core/Window.h:45

---

### m_isOpen

```cpp
bool m_isOpen = false
```

Defined in ShitEngine/Core/Window.h:46

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
| `bool` | [`init`](#init-16)  |  |
| `void` | [`handleEvent`](#handleevent-3)  |  |
| `bool` | [`isOpen`](#isopen-1) `inline` |  |
| `void` | [`close`](#close-1)  |  |

---

### init

```cpp
bool init()
```

Defined in ShitEngine/Core/Window.h:34

---

### handleEvent

```cpp
void handleEvent(const SDL_Event & event)
```

Defined in ShitEngine/Core/Window.h:35

---

### isOpen

`inline`

```cpp
inline bool isOpen()
```

Defined in ShitEngine/Core/Window.h:36

---

### close

```cpp
void close()
```

Defined in ShitEngine/Core/Window.h:37

