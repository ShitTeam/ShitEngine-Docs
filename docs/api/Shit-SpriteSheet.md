---
title: "SpriteSheet"
description: "精灵图集（sprite-sheet）网格切割器"
kind: class
namespace: Shit
header: "SpriteSheet.h"
---


# SpriteSheet

```cpp
#include <SpriteSheet.h>
```

```cpp
class SpriteSheet
```

Defined in ShitEngine/Render/SpriteSheet.h:22

精灵图集（sprite-sheet）网格切割器

把一张按“rows 行 × cols 列”规则排列的大图，按帧索引切出每一帧的源矩形 (SDL_FRect)。 可选 margin（图集四周留白）与 spacing（帧间间隔），单位为像素。

典型用法： [Shit::SpriteSheet](#spritesheet) sheet(4, 8, 32, 32); // 4行8列，每帧32×32 SDL_FRect f = sheet.getFrameRect(5); // 全局第5帧 std::vector<int> walk{0,1,2,3,4,5}; animComp->play("walk", &sheet, walk, 0.1f, true);

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`SpriteSheet`](#spritesheet-1) | `function` | Declared here |
| [`SpriteSheet`](#spritesheet-2) | `function` | Declared here |
| [`SpriteSheet`](#spritesheet-3) | `function` | Declared here |
| [`getFrameRect`](#getframerect) | `function` | Declared here |
| [`getFrameRect`](#getframerect-1) | `function` | Declared here |
| [`getRows`](#getrows) | `function` | Declared here |
| [`getCols`](#getcols) | `function` | Declared here |
| [`getFrameWidth`](#getframewidth) | `function` | Declared here |
| [`getFrameHeight`](#getframeheight) | `function` | Declared here |
| [`getMargin`](#getmargin) | `function` | Declared here |
| [`getSpacing`](#getspacing) | `function` | Declared here |
| [`getFrameCount`](#getframecount-1) | `function` | Declared here |
| [`setRows`](#setrows) | `function` | Declared here |
| [`setCols`](#setcols) | `function` | Declared here |
| [`setFrameWidth`](#setframewidth) | `function` | Declared here |
| [`setFrameHeight`](#setframeheight) | `function` | Declared here |
| [`setMargin`](#setmargin) | `function` | Declared here |
| [`setSpacing`](#setspacing) | `function` | Declared here |
| [`m_rows`](#m_rows) | `variable` | Declared here |
| [`m_cols`](#m_cols) | `variable` | Declared here |
| [`m_frameWidth`](#m_framewidth) | `variable` | Declared here |
| [`m_frameHeight`](#m_frameheight) | `variable` | Declared here |
| [`m_margin`](#m_margin) | `variable` | Declared here |
| [`m_spacing`](#m_spacing) | `variable` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`SpriteSheet`](#spritesheet-1)  | 构造网格切割参数 |
|  | [`SpriteSheet`](#spritesheet-2)  | Defaulted constructor. |
|  | [`SpriteSheet`](#spritesheet-3) `noexcept` | Defaulted constructor. |
| `SDL_FRect` | [`getFrameRect`](#getframerect) `const` | 全局帧索引（0..rows*cols-1）对应的源矩形 |
| `SDL_FRect` | [`getFrameRect`](#getframerect-1) `const` | 指定行列（0 基）对应的源矩形 |
| `int` | [`getRows`](#getrows) `const` `inline` |  |
| `int` | [`getCols`](#getcols) `const` `inline` |  |
| `float` | [`getFrameWidth`](#getframewidth) `const` `inline` |  |
| `float` | [`getFrameHeight`](#getframeheight) `const` `inline` |  |
| `float` | [`getMargin`](#getmargin) `const` `inline` |  |
| `float` | [`getSpacing`](#getspacing) `const` `inline` |  |
| `int` | [`getFrameCount`](#getframecount-1) `const` `inline` |  |
| `void` | [`setRows`](#setrows) `inline` |  |
| `void` | [`setCols`](#setcols) `inline` |  |
| `void` | [`setFrameWidth`](#setframewidth) `inline` |  |
| `void` | [`setFrameHeight`](#setframeheight) `inline` |  |
| `void` | [`setMargin`](#setmargin) `inline` |  |
| `void` | [`setSpacing`](#setspacing) `inline` |  |

---

### SpriteSheet

```cpp
SpriteSheet(int rows, int cols, float frameWidth, float frameHeight, float margin = 0.0f, float spacing = 0.0f)
```

Defined in ShitEngine/Render/SpriteSheet.h:33

构造网格切割参数

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `rows` | `int` | 行数 |
| `cols` | `int` | 列数 |
| `frameWidth` | `float` | 单帧宽（像素） |
| `frameHeight` | `float` | 单帧高（像素） |
| `margin` | `float` | 图集左上角留白（像素，默认 0） |
| `spacing` | `float` | 帧与帧之间的间隔（像素，默认 0） |

---

### SpriteSheet

```cpp
SpriteSheet(const SpriteSheet &) = default
```

Defined in ShitEngine/Render/SpriteSheet.h:38

Defaulted constructor.

---

### SpriteSheet

`noexcept`

```cpp
SpriteSheet(SpriteSheet &&) noexcept = default
```

Defined in ShitEngine/Render/SpriteSheet.h:40

Defaulted constructor.

---

### getFrameRect

`const`

```cpp
SDL_FRect getFrameRect(int frameIndex) const
```

Defined in ShitEngine/Render/SpriteSheet.h:44

全局帧索引（0..rows*cols-1）对应的源矩形

---

### getFrameRect

`const`

```cpp
SDL_FRect getFrameRect(int row, int col) const
```

Defined in ShitEngine/Render/SpriteSheet.h:47

指定行列（0 基）对应的源矩形

---

### getRows

`const` `inline`

```cpp
inline int getRows() const
```

Defined in ShitEngine/Render/SpriteSheet.h:49

---

### getCols

`const` `inline`

```cpp
inline int getCols() const
```

Defined in ShitEngine/Render/SpriteSheet.h:50

---

### getFrameWidth

`const` `inline`

```cpp
inline float getFrameWidth() const
```

Defined in ShitEngine/Render/SpriteSheet.h:51

---

### getFrameHeight

`const` `inline`

```cpp
inline float getFrameHeight() const
```

Defined in ShitEngine/Render/SpriteSheet.h:52

---

### getMargin

`const` `inline`

```cpp
inline float getMargin() const
```

Defined in ShitEngine/Render/SpriteSheet.h:53

---

### getSpacing

`const` `inline`

```cpp
inline float getSpacing() const
```

Defined in ShitEngine/Render/SpriteSheet.h:54

---

### getFrameCount

`const` `inline`

```cpp
inline int getFrameCount() const
```

Defined in ShitEngine/Render/SpriteSheet.h:55

---

### setRows

`inline`

```cpp
inline void setRows(int rows)
```

Defined in ShitEngine/Render/SpriteSheet.h:57

---

### setCols

`inline`

```cpp
inline void setCols(int cols)
```

Defined in ShitEngine/Render/SpriteSheet.h:58

---

### setFrameWidth

`inline`

```cpp
inline void setFrameWidth(float width)
```

Defined in ShitEngine/Render/SpriteSheet.h:59

---

### setFrameHeight

`inline`

```cpp
inline void setFrameHeight(float height)
```

Defined in ShitEngine/Render/SpriteSheet.h:60

---

### setMargin

`inline`

```cpp
inline void setMargin(float margin)
```

Defined in ShitEngine/Render/SpriteSheet.h:61

---

### setSpacing

`inline`

```cpp
inline void setSpacing(float spacing)
```

Defined in ShitEngine/Render/SpriteSheet.h:62

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `int` | [`m_rows`](#m_rows)  |  |
| `int` | [`m_cols`](#m_cols)  |  |
| `float` | [`m_frameWidth`](#m_framewidth)  |  |
| `float` | [`m_frameHeight`](#m_frameheight)  |  |
| `float` | [`m_margin`](#m_margin)  |  |
| `float` | [`m_spacing`](#m_spacing)  |  |

---

### m_rows

```cpp
int m_rows = 0
```

Defined in ShitEngine/Render/SpriteSheet.h:65

---

### m_cols

```cpp
int m_cols = 0
```

Defined in ShitEngine/Render/SpriteSheet.h:66

---

### m_frameWidth

```cpp
float m_frameWidth = 0.0f
```

Defined in ShitEngine/Render/SpriteSheet.h:67

---

### m_frameHeight

```cpp
float m_frameHeight = 0.0f
```

Defined in ShitEngine/Render/SpriteSheet.h:68

---

### m_margin

```cpp
float m_margin = 0.0f
```

Defined in ShitEngine/Render/SpriteSheet.h:69

---

### m_spacing

```cpp
float m_spacing = 0.0f
```

Defined in ShitEngine/Render/SpriteSheet.h:70

