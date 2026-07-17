---
title: "Input"
description: "输入管理类（单例）"
kind: class
namespace: Shit
header: "Input.h"
---


# Input

```cpp
#include <Input.h>
```

```cpp
class Input
```

Defined in ShitEngine/Input/Input.h:21

输入管理类（单例）

提供键盘鼠标的三态检测（Down / Pressed / Released）和鼠标位置查询。 所有 API 均为静态方法。

命名提醒： IsKeyDown = 刚按下（瞬间） IsKeyPressed = 持续按住（每帧 true 直至松开） IsKeyReleased= 松开（瞬间）

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`isKeyDown`](#iskeydown) | `function` | Declared here |
| [`isKeyPressed`](#iskeypressed) | `function` | Declared here |
| [`isKeyReleased`](#iskeyreleased) | `function` | Declared here |
| [`isMouseButtonDown`](#ismousebuttondown) | `function` | Declared here |
| [`isMouseButtonPressed`](#ismousebuttonpressed) | `function` | Declared here |
| [`isMouseButtonReleased`](#ismousebuttonreleased) | `function` | Declared here |
| [`getMousePosition`](#getmouseposition) | `function` | Declared here |
| [`update`](#update-3) | `function` | Declared here |
| [`handleEvent`](#handleevent) | `function` | Declared here |
| [`GetInstance`](#getinstance-4) | `function` | Declared here |
| [`IsKeyDown`](#iskeydown-1) | `function` | Declared here |
| [`IsKeyPressed`](#iskeypressed-1) | `function` | Declared here |
| [`IsKeyReleased`](#iskeyreleased-1) | `function` | Declared here |
| [`IsMouseButtonDown`](#ismousebuttondown-1) | `function` | Declared here |
| [`IsMouseButtonPressed`](#ismousebuttonpressed-1) | `function` | Declared here |
| [`IsMouseButtonReleased`](#ismousebuttonreleased-1) | `function` | Declared here |
| [`HandleEvent`](#handleevent-1) | `function` | Declared here |
| [`Update`](#update-4) | `function` | Declared here |
| [`GetMousePosition`](#getmouseposition-1) | `function` | Declared here |
| [`m_currentKeys`](#m_currentkeys) | `variable` | Declared here |
| [`m_previousKeys`](#m_previouskeys) | `variable` | Declared here |
| [`m_currentMouseButtons`](#m_currentmousebuttons) | `variable` | Declared here |
| [`m_previousMouseButtons`](#m_previousmousebuttons) | `variable` | Declared here |
| [`m_mouseScroll`](#m_mousescroll) | `variable` | Declared here |
| [`Input`](#input-1) | `function` | Declared here |
| [`Input`](#input-2) | `function` | Declared here |
| [`Input`](#input-3) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
| `bool` | [`isKeyDown`](#iskeydown)  | 按键刚按下（仅一帧为 true） |
| `bool` | [`isKeyPressed`](#iskeypressed)  | 按键被持续按住 |
| `bool` | [`isKeyReleased`](#iskeyreleased)  | 按键刚松开 |
| `bool` | [`isMouseButtonDown`](#ismousebuttondown)  | 鼠标按键刚按下 |
| `bool` | [`isMouseButtonPressed`](#ismousebuttonpressed)  | 鼠标按键持续按住 |
| `bool` | [`isMouseButtonReleased`](#ismousebuttonreleased)  | 鼠标按键刚松开 |
| `Vector2` | [`getMousePosition`](#getmouseposition)  | 鼠标当前位置 |
| `void` | [`update`](#update-3)  | 帧末更新，把当前帧状态移入上一帧 |
| `void` | [`handleEvent`](#handleevent)  | 处理 SDL 输入事件 |

---

### isKeyDown

```cpp
bool isKeyDown(const KeyCode code)
```

Defined in ShitEngine/Input/Input.h:23

按键刚按下（仅一帧为 true）

---

### isKeyPressed

```cpp
bool isKeyPressed(const KeyCode code)
```

Defined in ShitEngine/Input/Input.h:24

按键被持续按住

---

### isKeyReleased

```cpp
bool isKeyReleased(const KeyCode code)
```

Defined in ShitEngine/Input/Input.h:25

按键刚松开

---

### isMouseButtonDown

```cpp
bool isMouseButtonDown(const MouseButton code)
```

Defined in ShitEngine/Input/Input.h:27

鼠标按键刚按下

---

### isMouseButtonPressed

```cpp
bool isMouseButtonPressed(const MouseButton code)
```

Defined in ShitEngine/Input/Input.h:28

鼠标按键持续按住

---

### isMouseButtonReleased

```cpp
bool isMouseButtonReleased(const MouseButton code)
```

Defined in ShitEngine/Input/Input.h:29

鼠标按键刚松开

---

### getMousePosition

```cpp
Vector2 getMousePosition()
```

Defined in ShitEngine/Input/Input.h:30

鼠标当前位置

---

### update

```cpp
void update()
```

Defined in ShitEngine/Input/Input.h:32

帧末更新，把当前帧状态移入上一帧

---

### handleEvent

```cpp
void handleEvent(const SDL_Event & event)
```

Defined in ShitEngine/Input/Input.h:34

处理 SDL 输入事件

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `Input &` | [`GetInstance`](#getinstance-4) `static` |  |
| `bool` | [`IsKeyDown`](#iskeydown-1) `static` `inline` |  |
| `bool` | [`IsKeyPressed`](#iskeypressed-1) `static` `inline` |  |
| `bool` | [`IsKeyReleased`](#iskeyreleased-1) `static` `inline` |  |
| `bool` | [`IsMouseButtonDown`](#ismousebuttondown-1) `static` `inline` |  |
| `bool` | [`IsMouseButtonPressed`](#ismousebuttonpressed-1) `static` `inline` |  |
| `bool` | [`IsMouseButtonReleased`](#ismousebuttonreleased-1) `static` `inline` |  |
| `void` | [`HandleEvent`](#handleevent-1) `static` `inline` |  |
| `void` | [`Update`](#update-4) `static` `inline` |  |
| `Vector2` | [`GetMousePosition`](#getmouseposition-1) `static` `inline` |  |

---

### GetInstance

`static`

```cpp
static Input & GetInstance()
```

Defined in ShitEngine/Input/Input.h:37

---

### IsKeyDown

`static` `inline`

```cpp
static inline bool IsKeyDown(const KeyCode code)
```

Defined in ShitEngine/Input/Input.h:38

---

### IsKeyPressed

`static` `inline`

```cpp
static inline bool IsKeyPressed(const KeyCode code)
```

Defined in ShitEngine/Input/Input.h:39

---

### IsKeyReleased

`static` `inline`

```cpp
static inline bool IsKeyReleased(const KeyCode code)
```

Defined in ShitEngine/Input/Input.h:40

---

### IsMouseButtonDown

`static` `inline`

```cpp
static inline bool IsMouseButtonDown(const MouseButton code)
```

Defined in ShitEngine/Input/Input.h:41

---

### IsMouseButtonPressed

`static` `inline`

```cpp
static inline bool IsMouseButtonPressed(const MouseButton code)
```

Defined in ShitEngine/Input/Input.h:42

---

### IsMouseButtonReleased

`static` `inline`

```cpp
static inline bool IsMouseButtonReleased(const MouseButton code)
```

Defined in ShitEngine/Input/Input.h:43

---

### HandleEvent

`static` `inline`

```cpp
static inline void HandleEvent(const SDL_Event & event)
```

Defined in ShitEngine/Input/Input.h:44

---

### Update

`static` `inline`

```cpp
static inline void Update()
```

Defined in ShitEngine/Input/Input.h:45

---

### GetMousePosition

`static` `inline`

```cpp
static inline Vector2 GetMousePosition()
```

Defined in ShitEngine/Input/Input.h:46

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::array< bool, static_cast< int >(KeyCode::Count)>` | [`m_currentKeys`](#m_currentkeys)  |  |
| `std::array< bool, static_cast< int >(KeyCode::Count)>` | [`m_previousKeys`](#m_previouskeys)  |  |
| `std::array< bool, static_cast< int >(MouseButton::Count)>` | [`m_currentMouseButtons`](#m_currentmousebuttons)  |  |
| `std::array< bool, static_cast< int >(MouseButton::Count)>` | [`m_previousMouseButtons`](#m_previousmousebuttons)  |  |
| `Vector2` | [`m_mouseScroll`](#m_mousescroll)  |  |

---

### m_currentKeys

```cpp
std::array< bool, static_cast< int >(KeyCode::Count)> m_currentKeys
```

Defined in ShitEngine/Input/Input.h:49

---

### m_previousKeys

```cpp
std::array< bool, static_cast< int >(KeyCode::Count)> m_previousKeys
```

Defined in ShitEngine/Input/Input.h:50

---

### m_currentMouseButtons

```cpp
std::array< bool, static_cast< int >(MouseButton::Count)> m_currentMouseButtons
```

Defined in ShitEngine/Input/Input.h:53

---

### m_previousMouseButtons

```cpp
std::array< bool, static_cast< int >(MouseButton::Count)> m_previousMouseButtons
```

Defined in ShitEngine/Input/Input.h:54

---

### m_mouseScroll

```cpp
Vector2 m_mouseScroll
```

Defined in ShitEngine/Input/Input.h:57

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Input`](#input-1)  |  |
|  | [`Input`](#input-2)  | Deleted constructor. |
|  | [`Input`](#input-3)  | Deleted constructor. |

---

### Input

```cpp
Input()
```

Defined in ShitEngine/Input/Input.h:59

---

### Input

```cpp
Input(const Input &) = delete
```

Defined in ShitEngine/Input/Input.h:62

Deleted constructor.

---

### Input

```cpp
Input(Input &&) = delete
```

Defined in ShitEngine/Input/Input.h:64

Deleted constructor.

