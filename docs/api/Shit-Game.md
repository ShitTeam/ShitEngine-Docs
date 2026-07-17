---
title: "Game"
description: "引擎主控类"
kind: class
namespace: Shit
header: "Game.h"
---


# Game

```cpp
#include <Game.h>
```

```cpp
class Game
```

Defined in ShitEngine/Core/Game.h:16

引擎主控类

管理引擎的初始化、主循环与销毁。 所有静态方法内聚为单例调用。

使用方式： [Game::Init()](#init-5); [Game::Run()](#run-1); [Game::Destroy()](#destroy-3);

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`Game`](#game-1) | `function` | Declared here |
| [`init`](#init-4) | `function` | Declared here |
| [`run`](#run) | `function` | Declared here |
| [`Game`](#game-2) | `function` | Declared here |
| [`Game`](#game-3) | `function` | Declared here |
| [`GetInstance`](#getinstance-3) | `function` | Declared here |
| [`Init`](#init-5) | `function` | Declared here |
| [`Run`](#run-1) | `function` | Declared here |
| [`Destroy`](#destroy-3) | `function` | Declared here |
| [`IsRunning`](#isrunning) | `function` | Declared here |
| [`m_isRunning`](#m_isrunning) | `variable` | Declared here |
| [`m_isInited`](#m_isinited-1) | `variable` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Game`](#game-1)  |  |
| `bool` | [`init`](#init-4)  | 初始化引擎所有子系统 |
| `void` | [`run`](#run)  | 启动主循环（阻塞直至窗口关闭） |
|  | [`Game`](#game-2)  | Deleted constructor. |
|  | [`Game`](#game-3)  | Deleted constructor. |

---

### Game

```cpp
Game()
```

Defined in ShitEngine/Core/Game.h:18

---

### init

```cpp
bool init()
```

Defined in ShitEngine/Core/Game.h:21

初始化引擎所有子系统

---

### run

```cpp
void run()
```

Defined in ShitEngine/Core/Game.h:22

启动主循环（阻塞直至窗口关闭）

---

### Game

```cpp
Game(const Game &) = delete
```

Defined in ShitEngine/Core/Game.h:31

Deleted constructor.

---

### Game

```cpp
Game(Game &&) = delete
```

Defined in ShitEngine/Core/Game.h:33

Deleted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `Game &` | [`GetInstance`](#getinstance-3) `static` |  |
| `bool` | [`Init`](#init-5) `static` `inline` |  |
| `void` | [`Run`](#run-1) `static` `inline` |  |
| `void` | [`Destroy`](#destroy-3) `static` | 反初始化，按依赖逆序清理子系统 |
| `bool` | [`IsRunning`](#isrunning) `static` `inline` | 主循环是否仍在运行 |

---

### GetInstance

`static`

```cpp
static Game & GetInstance()
```

Defined in ShitEngine/Core/Game.h:25

---

### Init

`static` `inline`

```cpp
static inline bool Init()
```

Defined in ShitEngine/Core/Game.h:26

---

### Run

`static` `inline`

```cpp
static inline void Run()
```

Defined in ShitEngine/Core/Game.h:27

---

### Destroy

`static`

```cpp
static void Destroy()
```

Defined in ShitEngine/Core/Game.h:28

反初始化，按依赖逆序清理子系统

---

### IsRunning

`static` `inline`

```cpp
static inline bool IsRunning()
```

Defined in ShitEngine/Core/Game.h:29

主循环是否仍在运行

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `bool` | [`m_isRunning`](#m_isrunning)  |  |
| `bool` | [`m_isInited`](#m_isinited-1)  |  |

---

### m_isRunning

```cpp
bool m_isRunning = false
```

Defined in ShitEngine/Core/Game.h:37

---

### m_isInited

```cpp
bool m_isInited = false
```

Defined in ShitEngine/Core/Game.h:38

