---
title: "Animation"
description: "逐帧动画数据"
kind: class
namespace: Shit
header: "Animation.h"
---


# Animation

```cpp
#include <Animation.h>
```

```cpp
class Animation
```

Defined in ShitEngine/Render/Animation.h:16

逐帧动画数据

存储一组帧矩形（SDL_FRect）及每帧持续时间。 getFrame(elapsedTime) 根据当前播放时间返回对应帧。 通常由 [AnimationComponent](Shit-AnimationComponent.md#animationcomponent) 自动管理，不直接使用。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`Animation`](#animation-1) | `function` | Declared here |
| [`addFrame`](#addframe) | `function` | Declared here |
| [`addFrames`](#addframes) | `function` | Declared here |
| [`getFrame`](#getframe) | `function` | Declared here |
| [`setLoop`](#setloop) | `function` | Declared here |
| [`setDuration`](#setduration) | `function` | Declared here |
| [`isLooping`](#islooping) | `function` | Declared here |
| [`getDuration`](#getduration) | `function` | Declared here |
| [`getFrameCount`](#getframecount) | `function` | Declared here |
| [`m_frames`](#m_frames) | `variable` | Declared here |
| [`m_duration`](#m_duration) | `variable` | Declared here |
| [`m_loop`](#m_loop) | `variable` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Animation`](#animation-1)  |  |
| `void` | [`addFrame`](#addframe)  | 添加单帧 |
| `void` | [`addFrames`](#addframes)  | 批量添加帧 |
| `SDL_FRect` | [`getFrame`](#getframe) `const` | 根据已播放时间返回当前帧的源矩形 |
| `void` | [`setLoop`](#setloop) `inline` |  |
| `void` | [`setDuration`](#setduration) `inline` |  |
| `bool` | [`isLooping`](#islooping) `const` `inline` |  |
| `float` | [`getDuration`](#getduration) `const` `inline` |  |
| `int` | [`getFrameCount`](#getframecount) `const` `inline` |  |

---

### Animation

```cpp
Animation(float duration = 0.1f, bool loop = true)
```

Defined in ShitEngine/Render/Animation.h:18

---

### addFrame

```cpp
void addFrame(const SDL_FRect & frame)
```

Defined in ShitEngine/Render/Animation.h:21

添加单帧

---

### addFrames

```cpp
void addFrames(const std::vector< SDL_FRect > & frames)
```

Defined in ShitEngine/Render/Animation.h:22

批量添加帧

---

### getFrame

`const`

```cpp
SDL_FRect getFrame(float elapsedTime) const
```

Defined in ShitEngine/Render/Animation.h:24

根据已播放时间返回当前帧的源矩形

---

### setLoop

`inline`

```cpp
inline void setLoop(bool loop)
```

Defined in ShitEngine/Render/Animation.h:27

---

### setDuration

`inline`

```cpp
inline void setDuration(float duration)
```

Defined in ShitEngine/Render/Animation.h:28

---

### isLooping

`const` `inline`

```cpp
inline bool isLooping() const
```

Defined in ShitEngine/Render/Animation.h:30

---

### getDuration

`const` `inline`

```cpp
inline float getDuration() const
```

Defined in ShitEngine/Render/Animation.h:31

---

### getFrameCount

`const` `inline`

```cpp
inline int getFrameCount() const
```

Defined in ShitEngine/Render/Animation.h:32

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::vector< SDL_FRect >` | [`m_frames`](#m_frames)  |  |
| `float` | [`m_duration`](#m_duration)  |  |
| `bool` | [`m_loop`](#m_loop)  |  |

---

### m_frames

```cpp
std::vector< SDL_FRect > m_frames
```

Defined in ShitEngine/Render/Animation.h:35

---

### m_duration

```cpp
float m_duration
```

Defined in ShitEngine/Render/Animation.h:36

---

### m_loop

```cpp
bool m_loop = true
```

Defined in ShitEngine/Render/Animation.h:37

