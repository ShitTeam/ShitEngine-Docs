---
title: "ResourceManager"
description: "资源管理器（单例）"
kind: class
namespace: Shit
header: "ResourceManager.h"
---


# ResourceManager

```cpp
#include <ResourceManager.h>
```

```cpp
class ResourceManager
```

Defined in ShitEngine/Resource/ResourceManager.h:23

资源管理器（单例）

统一门面类，封装纹理、音频、字体的加载与缓存。 同路径资源只加载一次，后续请求从缓存返回。 在 [Game::Init()](Shit-Game.md#init-5) 中自动初始化。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`ResourceManager`](#resourcemanager-3) | `function` | Declared here |
| [`ResourceManager`](#resourcemanager-4) | `function` | Declared here |
| [`ResourceManager`](#resourcemanager-5) | `function` | Declared here |
| [`GetInstance`](#getinstance-6) | `function` | Declared here |
| [`Init`](#init-9) | `function` | Declared here |
| [`LoadTexture`](#loadtexture) | `function` | Declared here |
| [`GetTexture`](#gettexture) | `function` | Declared here |
| [`UnloadTexture`](#unloadtexture) | `function` | Declared here |
| [`ClearTexture`](#cleartexture) | `function` | Declared here |
| [`LoadAudio`](#loadaudio-1) | `function` | Declared here |
| [`GetAudio`](#getaudio-1) | `function` | Declared here |
| [`UnloadAudio`](#unloadaudio-1) | `function` | Declared here |
| [`ClearAudio`](#clearaudio-1) | `function` | Declared here |
| [`LoadFont`](#loadfont-1) | `function` | Declared here |
| [`GetFont`](#getfont-1) | `function` | Declared here |
| [`UnloadFont`](#unloadfont-1) | `function` | Declared here |
| [`ClearFont`](#clearfont-1) | `function` | Declared here |
| [`SetAudioMixer`](#setaudiomixer) | `function` | Declared here |
| [`m_textureManager`](#m_texturemanager) | `variable` | Declared here |
| [`m_audioManager`](#m_audiomanager) | `variable` | Declared here |
| [`m_fontManager`](#m_fontmanager) | `variable` | Declared here |
| [`clear`](#clear-2) | `function` | Declared here |
| [`init`](#init-10) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`ResourceManager`](#resourcemanager-3)  |  |
|  | [`ResourceManager`](#resourcemanager-4)  | Deleted constructor. |
|  | [`ResourceManager`](#resourcemanager-5)  | Deleted constructor. |

---

### ResourceManager

```cpp
ResourceManager()
```

Defined in ShitEngine/Resource/ResourceManager.h:25

---

### ResourceManager

```cpp
ResourceManager(const ResourceManager &) = delete
```

Defined in ShitEngine/Resource/ResourceManager.h:28

Deleted constructor.

---

### ResourceManager

```cpp
ResourceManager(ResourceManager &&) = delete
```

Defined in ShitEngine/Resource/ResourceManager.h:30

Deleted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `ResourceManager &` | [`GetInstance`](#getinstance-6) `static` |  |
| `void` | [`Init`](#init-9) `static` `inline` |  |
| `SDL_Texture *` | [`LoadTexture`](#loadtexture) `static` `inline` |  |
| `SDL_Texture *` | [`GetTexture`](#gettexture) `static` `inline` |  |
| `void` | [`UnloadTexture`](#unloadtexture) `static` `inline` |  |
| `void` | [`ClearTexture`](#cleartexture) `static` `inline` |  |
| `MIX_Audio *` | [`LoadAudio`](#loadaudio-1) `static` `inline` |  |
| `MIX_Audio *` | [`GetAudio`](#getaudio-1) `static` `inline` |  |
| `void` | [`UnloadAudio`](#unloadaudio-1) `static` `inline` |  |
| `void` | [`ClearAudio`](#clearaudio-1) `static` `inline` |  |
| `TTF_Font *` | [`LoadFont`](#loadfont-1) `static` `inline` |  |
| `TTF_Font *` | [`GetFont`](#getfont-1) `static` `inline` |  |
| `void` | [`UnloadFont`](#unloadfont-1) `static` `inline` |  |
| `void` | [`ClearFont`](#clearfont-1) `static` `inline` |  |
| `void` | [`SetAudioMixer`](#setaudiomixer) `static` `inline` |  |

---

### GetInstance

`static`

```cpp
static ResourceManager & GetInstance()
```

Defined in ShitEngine/Resource/ResourceManager.h:34

---

### Init

`static` `inline`

```cpp
static inline void Init()
```

Defined in ShitEngine/Resource/ResourceManager.h:35

---

### LoadTexture

`static` `inline`

```cpp
static inline SDL_Texture * LoadTexture(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:38

---

### GetTexture

`static` `inline`

```cpp
static inline SDL_Texture * GetTexture(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:39

---

### UnloadTexture

`static` `inline`

```cpp
static inline void UnloadTexture(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:40

---

### ClearTexture

`static` `inline`

```cpp
static inline void ClearTexture()
```

Defined in ShitEngine/Resource/ResourceManager.h:41

---

### LoadAudio

`static` `inline`

```cpp
static inline MIX_Audio * LoadAudio(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:44

---

### GetAudio

`static` `inline`

```cpp
static inline MIX_Audio * GetAudio(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:45

---

### UnloadAudio

`static` `inline`

```cpp
static inline void UnloadAudio(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:46

---

### ClearAudio

`static` `inline`

```cpp
static inline void ClearAudio()
```

Defined in ShitEngine/Resource/ResourceManager.h:47

---

### LoadFont

`static` `inline`

```cpp
static inline TTF_Font * LoadFont(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:50

---

### GetFont

`static` `inline`

```cpp
static inline TTF_Font * GetFont(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:51

---

### UnloadFont

`static` `inline`

```cpp
static inline void UnloadFont(const std::string & filePath)
```

Defined in ShitEngine/Resource/ResourceManager.h:52

---

### ClearFont

`static` `inline`

```cpp
static inline void ClearFont()
```

Defined in ShitEngine/Resource/ResourceManager.h:53

---

### SetAudioMixer

`static` `inline`

```cpp
static inline void SetAudioMixer(struct MIX_Mixer * mixer)
```

Defined in ShitEngine/Resource/ResourceManager.h:56

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::unique_ptr< TextureManager >` | [`m_textureManager`](#m_texturemanager)  |  |
| `std::unique_ptr< AudioManager >` | [`m_audioManager`](#m_audiomanager)  |  |
| `std::unique_ptr< FontManager >` | [`m_fontManager`](#m_fontmanager)  |  |

---

### m_textureManager

```cpp
std::unique_ptr< TextureManager > m_textureManager
```

Defined in ShitEngine/Resource/ResourceManager.h:62

---

### m_audioManager

```cpp
std::unique_ptr< AudioManager > m_audioManager
```

Defined in ShitEngine/Resource/ResourceManager.h:63

---

### m_fontManager

```cpp
std::unique_ptr< FontManager > m_fontManager
```

Defined in ShitEngine/Resource/ResourceManager.h:64

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
| `void` | [`clear`](#clear-2)  |  |
| `void` | [`init`](#init-10)  |  |

---

### clear

```cpp
void clear()
```

Defined in ShitEngine/Resource/ResourceManager.h:59

---

### init

```cpp
void init()
```

Defined in ShitEngine/Resource/ResourceManager.h:60

