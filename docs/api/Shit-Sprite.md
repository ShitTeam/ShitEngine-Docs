---
title: "Sprite"
description: "精灵数据，描述\"画什么\""
kind: class
namespace: Shit
header: "Sprite.h"
---


# Sprite

```cpp
#include <Sprite.h>
```

```cpp
class Sprite
```

Defined in ShitEngine/Render/Sprite.h:14

精灵数据，描述"画什么"

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`Sprite`](#sprite-1) | `function` | Declared here |
| [`Sprite`](#sprite-2) | `function` | Declared here |
| [`getTexturePath`](#gettexturepath) | `function` | Declared here |
| [`getSourceRect`](#getsourcerect) | `function` | Declared here |
| [`isFlipped`](#isflipped) | `function` | Declared here |
| [`setTexturePath`](#settexturepath) | `function` | Declared here |
| [`setSourceRect`](#setsourcerect) | `function` | Declared here |
| [`setFlipped`](#setflipped) | `function` | Declared here |
| [`setFrame`](#setframe) | `function` | Declared here |
| [`m_texturePath`](#m_texturepath) | `variable` | Declared here |
| [`m_sourceRect`](#m_sourcerect) | `variable` | Declared here |
| [`m_isFlipped`](#m_isflipped) | `variable` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Sprite`](#sprite-1)  |  |
|  | [`Sprite`](#sprite-2) `inline` |  |
| `const std::string &` | [`getTexturePath`](#gettexturepath) `const` `inline` |  |
| `const std::optional< SDL_FRect > &` | [`getSourceRect`](#getsourcerect) `const` `inline` |  |
| `bool` | [`isFlipped`](#isflipped) `const` `inline` |  |
| `void` | [`setTexturePath`](#settexturepath) `inline` |  |
| `void` | [`setSourceRect`](#setsourcerect) `inline` |  |
| `void` | [`setFlipped`](#setflipped) `inline` |  |
| `void` | [`setFrame`](#setframe)  | 从 [SpriteSheet](Shit-SpriteSheet.md#spritesheet) 中取第 frameIndex 帧作为源矩形 |

---

### Sprite

```cpp
Sprite()
```

Defined in ShitEngine/Render/Sprite.h:16

---

### Sprite

`inline`

```cpp
inline Sprite(const std::string & texturePath, const std::optional< SDL_FRect > & sourceRect = std::nullopt, bool flipped = false)
```

Defined in ShitEngine/Render/Sprite.h:17

---

### getTexturePath

`const` `inline`

```cpp
inline const std::string & getTexturePath() const
```

Defined in ShitEngine/Render/Sprite.h:21

---

### getSourceRect

`const` `inline`

```cpp
inline const std::optional< SDL_FRect > & getSourceRect() const
```

Defined in ShitEngine/Render/Sprite.h:22

---

### isFlipped

`const` `inline`

```cpp
inline bool isFlipped() const
```

Defined in ShitEngine/Render/Sprite.h:23

---

### setTexturePath

`inline`

```cpp
inline void setTexturePath(const std::string & texturePath)
```

Defined in ShitEngine/Render/Sprite.h:25

---

### setSourceRect

`inline`

```cpp
inline void setSourceRect(const std::optional< SDL_FRect > & rect)
```

Defined in ShitEngine/Render/Sprite.h:26

---

### setFlipped

`inline`

```cpp
inline void setFlipped(bool flipped)
```

Defined in ShitEngine/Render/Sprite.h:27

---

### setFrame

```cpp
void setFrame(const SpriteSheet & sheet, int frameIndex)
```

Defined in ShitEngine/Render/Sprite.h:30

从 [SpriteSheet](Shit-SpriteSheet.md#spritesheet) 中取第 frameIndex 帧作为源矩形

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::string` | [`m_texturePath`](#m_texturepath)  |  |
| `std::optional< SDL_FRect >` | [`m_sourceRect`](#m_sourcerect)  |  |
| `bool` | [`m_isFlipped`](#m_isflipped)  |  |

---

### m_texturePath

```cpp
std::string m_texturePath
```

Defined in ShitEngine/Render/Sprite.h:33

---

### m_sourceRect

```cpp
std::optional< SDL_FRect > m_sourceRect
```

Defined in ShitEngine/Render/Sprite.h:34

---

### m_isFlipped

```cpp
bool m_isFlipped = false
```

Defined in ShitEngine/Render/Sprite.h:35

