---
title: "Time"
description: "时间管理类"
kind: class
namespace: Shit
header: "Time.h"
---


# Time

```cpp
#include <Time.h>
```

```cpp
class Time
```

Defined in ShitEngine/Core/Time.h:13

时间管理类

提供帧间时间差、总运行时间和帧率控制。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`Game`](#game-4) | `friend` | Declared here |
| [`Time`](#time-1) | `function` | Declared here |
| [`Time`](#time-2) | `function` | Declared here |
| [`GetInstance`](#getinstance-8) | `function` | Declared here |
| [`Init`](#init-13) | `function` | Declared here |
| [`Update`](#update-10) | `function` | Declared here |
| [`GetDeltaTime`](#getdeltatime) | `function` | Declared here |
| [`GetTotalTime`](#gettotaltime) | `function` | Declared here |
| [`GetTargetFPS`](#gettargetfps) | `function` | Declared here |
| [`SetTargetFPS`](#settargetfps) | `function` | Declared here |
| [`m_deltaTime`](#m_deltatime) | `variable` | Declared here |
| [`m_totalTime`](#m_totaltime) | `variable` | Declared here |
| [`m_lastTime`](#m_lasttime) | `variable` | Declared here |
| [`m_currentTime`](#m_currenttime-1) | `variable` | Declared here |
| [`m_targetFPS`](#m_targetfps) | `variable` | Declared here |
| [`Time`](#time-3) | `function` | Declared here |
| [`init`](#init-14) | `function` | Declared here |
| [`update`](#update-11) | `function` | Declared here |

## Friends

| Name | Description |
|------|-------------|
| [`Game`](#game-4)  |  |

---

### Game

```cpp
friend class Game
```

Defined in ShitEngine/Core/Time.h:14

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Time`](#time-1)  | Deleted constructor. |
|  | [`Time`](#time-2)  | Deleted constructor. |

---

### Time

```cpp
Time(const Time &) = delete
```

Defined in ShitEngine/Core/Time.h:16

Deleted constructor.

---

### Time

```cpp
Time(Time &&) = delete
```

Defined in ShitEngine/Core/Time.h:18

Deleted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `Time &` | [`GetInstance`](#getinstance-8) `static` |  |
| `void` | [`Init`](#init-13) `static` `inline` | 初始化计时器 |
| `void` | [`Update`](#update-10) `static` `inline` | 每帧调用，更新 m_deltaTime |
| `float` | [`GetDeltaTime`](#getdeltatime) `static` `inline` | 上一帧耗时（秒） |
| `double` | [`GetTotalTime`](#gettotaltime) `static` `inline` | 引擎启动至今的总时长（秒） |
| `unsigned int` | [`GetTargetFPS`](#gettargetfps) `static` `inline` | 目标帧率上限 |
| `void` | [`SetTargetFPS`](#settargetfps) `static` `inline` | 设帧率上限 |

---

### GetInstance

`static`

```cpp
static Time & GetInstance()
```

Defined in ShitEngine/Core/Time.h:22

---

### Init

`static` `inline`

```cpp
static inline void Init()
```

Defined in ShitEngine/Core/Time.h:23

初始化计时器

---

### Update

`static` `inline`

```cpp
static inline void Update()
```

Defined in ShitEngine/Core/Time.h:24

每帧调用，更新 m_deltaTime

---

### GetDeltaTime

`static` `inline`

```cpp
static inline float GetDeltaTime()
```

Defined in ShitEngine/Core/Time.h:25

上一帧耗时（秒）

---

### GetTotalTime

`static` `inline`

```cpp
static inline double GetTotalTime()
```

Defined in ShitEngine/Core/Time.h:26

引擎启动至今的总时长（秒）

---

### GetTargetFPS

`static` `inline`

```cpp
static inline unsigned int GetTargetFPS()
```

Defined in ShitEngine/Core/Time.h:27

目标帧率上限

---

### SetTargetFPS

`static` `inline`

```cpp
static inline void SetTargetFPS(unsigned int fps)
```

Defined in ShitEngine/Core/Time.h:28

设帧率上限

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `float` | [`m_deltaTime`](#m_deltatime)  |  |
| `double` | [`m_totalTime`](#m_totaltime)  |  |
| `Uint64` | [`m_lastTime`](#m_lasttime)  |  |
| `Uint64` | [`m_currentTime`](#m_currenttime-1)  |  |
| `unsigned int` | [`m_targetFPS`](#m_targetfps)  |  |

---

### m_deltaTime

```cpp
float m_deltaTime = 0.0f
```

Defined in ShitEngine/Core/Time.h:37

---

### m_totalTime

```cpp
double m_totalTime = 0.0f
```

Defined in ShitEngine/Core/Time.h:38

---

### m_lastTime

```cpp
Uint64 m_lastTime
```

Defined in ShitEngine/Core/Time.h:39

---

### m_currentTime

```cpp
Uint64 m_currentTime
```

Defined in ShitEngine/Core/Time.h:40

---

### m_targetFPS

```cpp
unsigned int m_targetFPS = 144
```

Defined in ShitEngine/Core/Time.h:41

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Time`](#time-3)  |  |
| `void` | [`init`](#init-14)  |  |
| `void` | [`update`](#update-11)  |  |

---

### Time

```cpp
Time()
```

Defined in ShitEngine/Core/Time.h:31

---

### init

```cpp
void init()
```

Defined in ShitEngine/Core/Time.h:34

---

### update

```cpp
void update()
```

Defined in ShitEngine/Core/Time.h:35

