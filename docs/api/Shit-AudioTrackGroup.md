---
title: "AudioTrackGroup"
kind: class
namespace: Shit
header: "AudioPlayer.h"
---


# AudioTrackGroup

```cpp
#include <AudioPlayer.h>
```

```cpp
class AudioTrackGroup
```

Defined in ShitEngine/Audio/AudioPlayer.h:11

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`AudioPlayer`](#audioplayer-5) | `friend` | Declared here |
| [`AudioTrack`](#audiotrack-5) | `friend` | Declared here |
| [`pauseAll`](#pauseall-2) | `function` | Declared here |
| [`resumeAll`](#resumeall-2) | `function` | Declared here |
| [`stopAll`](#stopall-2) | `function` | Declared here |
| [`setVolume`](#setvolume-1) | `function` | Declared here |
| [`getVolume`](#getvolume-1) | `function` | Declared here |
| [`getName`](#getname) | `function` | Declared here |
| [`m_name`](#m_name) | `variable` | Declared here |
| [`m_gain`](#m_gain-1) | `variable` | Declared here |
| [`m_tracks`](#m_tracks-1) | `variable` | Declared here |
| [`AudioTrackGroup`](#audiotrackgroup-2) | `function` | Declared here |
| [`registerTrack`](#registertrack) | `function` | Declared here |
| [`unregisterTrack`](#unregistertrack) | `function` | Declared here |

## Friends

| Name | Description |
|------|-------------|
| [`AudioPlayer`](#audioplayer-5)  |  |
| [`AudioTrack`](#audiotrack-5)  |  |

---

### AudioPlayer

```cpp
friend class AudioPlayer
```

Defined in ShitEngine/Audio/AudioPlayer.h:23

---

### AudioTrack

```cpp
friend class AudioTrack
```

Defined in ShitEngine/Audio/AudioPlayer.h:24

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
| `void` | [`pauseAll`](#pauseall-2)  |  |
| `void` | [`resumeAll`](#resumeall-2)  |  |
| `void` | [`stopAll`](#stopall-2)  |  |
| `void` | [`setVolume`](#setvolume-1)  |  |
| `float` | [`getVolume`](#getvolume-1) `const` `inline` |  |
| `const std::string &` | [`getName`](#getname) `const` `inline` |  |

---

### pauseAll

```cpp
void pauseAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:15

---

### resumeAll

```cpp
void resumeAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:16

---

### stopAll

```cpp
void stopAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:17

---

### setVolume

```cpp
void setVolume(float gain)
```

Defined in ShitEngine/Audio/AudioPlayer.h:18

---

### getVolume

`const` `inline`

```cpp
inline float getVolume() const
```

Defined in ShitEngine/Audio/AudioPlayer.h:19

---

### getName

`const` `inline`

```cpp
inline const std::string & getName() const
```

Defined in ShitEngine/Audio/AudioPlayer.h:20

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::string` | [`m_name`](#m_name)  |  |
| `float` | [`m_gain`](#m_gain-1)  |  |
| `std::vector< AudioTrack * >` | [`m_tracks`](#m_tracks-1)  |  |

---

### m_name

```cpp
std::string m_name
```

Defined in ShitEngine/Audio/AudioPlayer.h:29

---

### m_gain

```cpp
float m_gain = 1.0f
```

Defined in ShitEngine/Audio/AudioPlayer.h:30

---

### m_tracks

```cpp
std::vector< AudioTrack * > m_tracks
```

Defined in ShitEngine/Audio/AudioPlayer.h:31

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`AudioTrackGroup`](#audiotrackgroup-2) `inline` |  |
| `void` | [`registerTrack`](#registertrack)  |  |
| `void` | [`unregisterTrack`](#unregistertrack)  |  |

---

### AudioTrackGroup

`inline`

```cpp
inline AudioTrackGroup(const std::string & name)
```

Defined in ShitEngine/Audio/AudioPlayer.h:25

---

### registerTrack

```cpp
void registerTrack(AudioTrack * track)
```

Defined in ShitEngine/Audio/AudioPlayer.h:26

---

### unregisterTrack

```cpp
void unregisterTrack(AudioTrack * track)
```

Defined in ShitEngine/Audio/AudioPlayer.h:27

