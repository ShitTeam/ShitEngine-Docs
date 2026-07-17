---
title: "AudioTrack"
kind: class
namespace: Shit
header: "AudioTrack.h"
---


# AudioTrack

```cpp
#include <AudioTrack.h>
```

```cpp
class AudioTrack
```

Defined in ShitEngine/Audio/AudioTrack.h:10

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`AudioPlayer`](#audioplayer-4) | `friend` | Declared here |
| [`AudioTrackGroup`](#audiotrackgroup) | `friend` | Declared here |
| [`AudioTrack`](#audiotrack-1) | `function` | Declared here |
| [`AudioTrack`](#audiotrack-2) | `function` | Declared here |
| [`pause`](#pause-1) | `function` | Declared here |
| [`resume`](#resume-1) | `function` | Declared here |
| [`stop`](#stop-1) | `function` | Declared here |
| [`setVolume`](#setvolume) | `function` | Declared here |
| [`getVolume`](#getvolume) | `function` | Declared here |
| [`setLooping`](#setlooping) | `function` | Declared here |
| [`getLooping`](#getlooping) | `function` | Declared here |
| [`isPlaying`](#isplaying-1) | `function` | Declared here |
| [`isPaused`](#ispaused-1) | `function` | Declared here |
| [`isFinished`](#isfinished) | `function` | Declared here |
| [`m_handle`](#m_handle) | `variable` | Declared here |
| [`m_gain`](#m_gain) | `variable` | Declared here |
| [`m_loops`](#m_loops) | `variable` | Declared here |
| [`m_group`](#m_group) | `variable` | Declared here |
| [`m_started`](#m_started) | `variable` | Declared here |
| [`m_paused`](#m_paused) | `variable` | Declared here |
| [`AudioTrack`](#audiotrack-3) | `function` | Declared here |
| [`AudioTrack`](#audiotrack-4) | `function` | Declared here |

## Friends

| Name | Description |
|------|-------------|
| [`AudioPlayer`](#audioplayer-4)  |  |
| [`AudioTrackGroup`](#audiotrackgroup)  |  |

---

### AudioPlayer

```cpp
friend class AudioPlayer
```

Defined in ShitEngine/Audio/AudioTrack.h:31

---

### AudioTrackGroup

```cpp
friend class AudioTrackGroup
```

Defined in ShitEngine/Audio/AudioTrack.h:32

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`AudioTrack`](#audiotrack-1)  | Deleted constructor. |
|  | [`AudioTrack`](#audiotrack-2) `noexcept` |  |
| `void` | [`pause`](#pause-1)  |  |
| `void` | [`resume`](#resume-1)  |  |
| `void` | [`stop`](#stop-1)  |  |
| `void` | [`setVolume`](#setvolume)  |  |
| `float` | [`getVolume`](#getvolume) `const` |  |
| `void` | [`setLooping`](#setlooping)  |  |
| `int` | [`getLooping`](#getlooping) `const` `inline` |  |
| `bool` | [`isPlaying`](#isplaying-1) `const` |  |
| `bool` | [`isPaused`](#ispaused-1) `const` |  |
| `bool` | [`isFinished`](#isfinished) `const` |  |

---

### AudioTrack

```cpp
AudioTrack(const AudioTrack &) = delete
```

Defined in ShitEngine/Audio/AudioTrack.h:12

Deleted constructor.

---

### AudioTrack

`noexcept`

```cpp
AudioTrack(AudioTrack &&) noexcept
```

Defined in ShitEngine/Audio/AudioTrack.h:14

---

### pause

```cpp
void pause()
```

Defined in ShitEngine/Audio/AudioTrack.h:18

---

### resume

```cpp
void resume()
```

Defined in ShitEngine/Audio/AudioTrack.h:19

---

### stop

```cpp
void stop()
```

Defined in ShitEngine/Audio/AudioTrack.h:20

---

### setVolume

```cpp
void setVolume(float gain)
```

Defined in ShitEngine/Audio/AudioTrack.h:21

---

### getVolume

`const`

```cpp
float getVolume() const
```

Defined in ShitEngine/Audio/AudioTrack.h:22

---

### setLooping

```cpp
void setLooping(int loopCount)
```

Defined in ShitEngine/Audio/AudioTrack.h:23

---

### getLooping

`const` `inline`

```cpp
inline int getLooping() const
```

Defined in ShitEngine/Audio/AudioTrack.h:24

---

### isPlaying

`const`

```cpp
bool isPlaying() const
```

Defined in ShitEngine/Audio/AudioTrack.h:26

---

### isPaused

`const`

```cpp
bool isPaused() const
```

Defined in ShitEngine/Audio/AudioTrack.h:27

---

### isFinished

`const`

```cpp
bool isFinished() const
```

Defined in ShitEngine/Audio/AudioTrack.h:28

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `MIX_Track *` | [`m_handle`](#m_handle)  |  |
| `float` | [`m_gain`](#m_gain)  |  |
| `int` | [`m_loops`](#m_loops)  |  |
| `AudioTrackGroup *` | [`m_group`](#m_group)  |  |
| `bool` | [`m_started`](#m_started)  |  |
| `bool` | [`m_paused`](#m_paused)  |  |

---

### m_handle

```cpp
MIX_Track * m_handle = nullptr
```

Defined in ShitEngine/Audio/AudioTrack.h:36

---

### m_gain

```cpp
float m_gain = 1.0f
```

Defined in ShitEngine/Audio/AudioTrack.h:37

---

### m_loops

```cpp
int m_loops = 0
```

Defined in ShitEngine/Audio/AudioTrack.h:38

---

### m_group

```cpp
AudioTrackGroup * m_group = nullptr
```

Defined in ShitEngine/Audio/AudioTrack.h:39

---

### m_started

```cpp
bool m_started = false
```

Defined in ShitEngine/Audio/AudioTrack.h:40

---

### m_paused

```cpp
bool m_paused = false
```

Defined in ShitEngine/Audio/AudioTrack.h:41

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`AudioTrack`](#audiotrack-3)  | Defaulted constructor. |
|  | [`AudioTrack`](#audiotrack-4) `explicit` |  |

---

### AudioTrack

```cpp
AudioTrack() = default
```

Defined in ShitEngine/Audio/AudioTrack.h:33

Defaulted constructor.

---

### AudioTrack

`explicit`

```cpp
explicit AudioTrack(MIX_Track * handle)
```

Defined in ShitEngine/Audio/AudioTrack.h:34

