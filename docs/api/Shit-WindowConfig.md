---
title: "WindowConfig"
description: "窗口配置"
kind: struct
namespace: Shit
header: "Config.h"
---


# WindowConfig

```cpp
#include <Config.h>
```

```cpp
struct WindowConfig
```

Defined in ShitEngine/Core/Config.h:16

窗口配置

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`title`](#title) | `variable` | Declared here |
| [`width`](#width) | `variable` | Declared here |
| [`height`](#height) | `variable` | Declared here |
| [`targetFPS`](#targetfps) | `variable` | Declared here |

## Public Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::string` | [`title`](#title)  | 窗口标题 |
| `unsigned int` | [`width`](#width)  | 逻辑分辨率宽度 |
| `unsigned int` | [`height`](#height)  | 逻辑分辨率高度 |
| `unsigned int` | [`targetFPS`](#targetfps)  | 帧率上限 |

---

### title

```cpp
std::string title = "Example"
```

Defined in ShitEngine/Core/Config.h:17

窗口标题

---

### width

```cpp
unsigned int width = 1280
```

Defined in ShitEngine/Core/Config.h:18

逻辑分辨率宽度

---

### height

```cpp
unsigned int height = 720
```

Defined in ShitEngine/Core/Config.h:19

逻辑分辨率高度

---

### targetFPS

```cpp
unsigned int targetFPS = 144
```

Defined in ShitEngine/Core/Config.h:20

帧率上限

