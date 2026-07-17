---
title: "Config"
description: "配置管理类"
kind: class
namespace: Shit
header: "Config.h"
---


# Config

```cpp
#include <Config.h>
```

```cpp
class Config
```

Defined in ShitEngine/Core/Config.h:29

配置管理类

从 settings.json 读取配置，若无配置文件则全字段使用默认值。 在 [Game::Init()](Shit-Game.md#init-5) 中自动调用 [Init()](#init-3)。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`init`](#init-2) | `function` | Declared here |
| [`loadFromJson`](#loadfromjson) | `function` | Declared here |
| [`Config`](#config-1) | `function` | Declared here |
| [`Config`](#config-2) | `function` | Declared here |
| [`GetInstance`](#getinstance-1) | `function` | Declared here |
| [`Init`](#init-3) | `function` | Declared here |
| [`GetProjectConfig`](#getprojectconfig) | `function` | Declared here |
| [`GetWindowConfig`](#getwindowconfig) | `function` | Declared here |
| [`m_projectConfig`](#m_projectconfig) | `variable` | Declared here |
| [`m_windowConfig`](#m_windowconfig) | `variable` | Declared here |
| [`Config`](#config-3) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
| `bool` | [`init`](#init-2)  | 加载 settings.json |
| `void` | [`loadFromJson`](#loadfromjson)  | 从 JSON 对象加载配置 |
|  | [`Config`](#config-1)  | Deleted constructor. |
|  | [`Config`](#config-2)  | Deleted constructor. |

---

### init

```cpp
bool init()
```

Defined in ShitEngine/Core/Config.h:31

加载 settings.json

---

### loadFromJson

```cpp
void loadFromJson(const Json & j)
```

Defined in ShitEngine/Core/Config.h:32

从 JSON 对象加载配置

---

### Config

```cpp
Config(const Config &) = delete
```

Defined in ShitEngine/Core/Config.h:40

Deleted constructor.

---

### Config

```cpp
Config(Config &&) = delete
```

Defined in ShitEngine/Core/Config.h:42

Deleted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `Config &` | [`GetInstance`](#getinstance-1) `static` |  |
| `bool` | [`Init`](#init-3) `static` `inline` |  |
| `const ProjectConfig &` | [`GetProjectConfig`](#getprojectconfig) `static` `inline` | 项目配置 |
| `const WindowConfig &` | [`GetWindowConfig`](#getwindowconfig) `static` `inline` | 窗口配置 |

---

### GetInstance

`static`

```cpp
static Config & GetInstance()
```

Defined in ShitEngine/Core/Config.h:35

---

### Init

`static` `inline`

```cpp
static inline bool Init()
```

Defined in ShitEngine/Core/Config.h:36

---

### GetProjectConfig

`static` `inline`

```cpp
static inline const ProjectConfig & GetProjectConfig()
```

Defined in ShitEngine/Core/Config.h:37

项目配置

---

### GetWindowConfig

`static` `inline`

```cpp
static inline const WindowConfig & GetWindowConfig()
```

Defined in ShitEngine/Core/Config.h:38

窗口配置

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `ProjectConfig` | [`m_projectConfig`](#m_projectconfig)  |  |
| `WindowConfig` | [`m_windowConfig`](#m_windowconfig)  |  |

---

### m_projectConfig

```cpp
ProjectConfig m_projectConfig
```

Defined in ShitEngine/Core/Config.h:49

---

### m_windowConfig

```cpp
WindowConfig m_windowConfig
```

Defined in ShitEngine/Core/Config.h:50

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Config`](#config-3)  | Defaulted constructor. |

---

### Config

```cpp
Config() = default
```

Defined in ShitEngine/Core/Config.h:46

Defaulted constructor.

