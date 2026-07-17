---
title: "AudioPlayer"
kind: class
namespace: Shit
header: "AudioPlayer.h"
---


# AudioPlayer

```cpp
#include <AudioPlayer.h>
```

```cpp
class AudioPlayer
```

Defined in ShitEngine/Audio/AudioPlayer.h:34

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`AudioPlayer`](#audioplayer-1) | `function` | Declared here |
| [`AudioPlayer`](#audioplayer-2) | `function` | Declared here |
| [`Init`](#init) | `function` | Declared here |
| [`Destroy`](#destroy) | `function` | Declared here |
| [`Update`](#update) | `function` | Declared here |
| [`CreateTrackGroup`](#createtrackgroup) | `function` | Declared here |
| [`GetTrackGroup`](#gettrackgroup) | `function` | Declared here |
| [`Play`](#play-2) | `function` | Declared here |
| [`SetMasterVolume`](#setmastervolume) | `function` | Declared here |
| [`GetMasterVolume`](#getmastervolume) | `function` | Declared here |
| [`PauseAll`](#pauseall) | `function` | Declared here |
| [`ResumeAll`](#resumeall) | `function` | Declared here |
| [`StopAll`](#stopall) | `function` | Declared here |
| [`ApplyTrackGain`](#applytrackgain) | `function` | Declared here |
| [`GetInstance`](#getinstance) | `function` | Declared here |
| [`m_mixer`](#m_mixer-1) | `variable` | Declared here |
| [`m_isInited`](#m_isinited) | `variable` | Declared here |
| [`m_masterGain`](#m_mastergain) | `variable` | Declared here |
| [`m_groups`](#m_groups) | `variable` | Declared here |
| [`m_tracks`](#m_tracks) | `variable` | Declared here |
| [`AudioPlayer`](#audioplayer-3) | `function` | Declared here |
| [`init`](#init-1) | `function` | Declared here |
| [`destroy`](#destroy-1) | `function` | Declared here |
| [`update`](#update-1) | `function` | Declared here |
| [`createTrackGroup`](#createtrackgroup-1) | `function` | Declared here |
| [`getTrackGroup`](#gettrackgroup-1) | `function` | Declared here |
| [`play`](#play-3) | `function` | Declared here |
| [`setMasterVolume`](#setmastervolume-1) | `function` | Declared here |
| [`pauseAll`](#pauseall-1) | `function` | Declared here |
| [`resumeAll`](#resumeall-1) | `function` | Declared here |
| [`stopAll`](#stopall-1) | `function` | Declared here |
| [`applyTrackGain`](#applytrackgain-1) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`AudioPlayer`](#audioplayer-1)  | Deleted constructor. |
|  | [`AudioPlayer`](#audioplayer-2)  | Deleted constructor. |

---

### AudioPlayer

```cpp
AudioPlayer(const AudioPlayer &) = delete
```

Defined in ShitEngine/Audio/AudioPlayer.h:60

Deleted constructor.

---

### AudioPlayer

```cpp
AudioPlayer(AudioPlayer &&) = delete
```

Defined in ShitEngine/Audio/AudioPlayer.h:62

Deleted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `bool` | [`Init`](#init) `static` `inline` |  |
| `void` | [`Destroy`](#destroy) `static` `inline` |  |
| `void` | [`Update`](#update) `static` `inline` |  |
| `AudioTrackGroup *` | [`CreateTrackGroup`](#createtrackgroup) `static` `inline` |  |
| `AudioTrackGroup *` | [`GetTrackGroup`](#gettrackgroup) `static` `inline` |  |
| `AudioTrack *` | [`Play`](#play-2) `static` `inline` |  |
| `void` | [`SetMasterVolume`](#setmastervolume) `static` `inline` |  |
| `float` | [`GetMasterVolume`](#getmastervolume) `static` `inline` |  |
| `void` | [`PauseAll`](#pauseall) `static` `inline` |  |
| `void` | [`ResumeAll`](#resumeall) `static` `inline` |  |
| `void` | [`StopAll`](#stopall) `static` `inline` |  |
| `void` | [`ApplyTrackGain`](#applytrackgain) `static` `inline` |  |
| `AudioPlayer &` | [`GetInstance`](#getinstance) `static` |  |

---

### Init

`static` `inline`

```cpp
static inline bool Init()
```

Defined in ShitEngine/Audio/AudioPlayer.h:36

---

### Destroy

`static` `inline`

```cpp
static inline void Destroy()
```

Defined in ShitEngine/Audio/AudioPlayer.h:37

---

### Update

`static` `inline`

```cpp
static inline void Update()
```

Defined in ShitEngine/Audio/AudioPlayer.h:38

---

### CreateTrackGroup

`static` `inline`

```cpp
static inline AudioTrackGroup * CreateTrackGroup(const std::string & name)
```

Defined in ShitEngine/Audio/AudioPlayer.h:39

---

### GetTrackGroup

`static` `inline`

```cpp
static inline AudioTrackGroup * GetTrackGroup(const std::string & name)
```

Defined in ShitEngine/Audio/AudioPlayer.h:42

---

### Play

`static` `inline`

```cpp
static inline AudioTrack * Play(const std::string & filePath, const std::string & group = "default")
```

Defined in ShitEngine/Audio/AudioPlayer.h:45

---

### SetMasterVolume

`static` `inline`

```cpp
static inline void SetMasterVolume(float gain)
```

Defined in ShitEngine/Audio/AudioPlayer.h:49

---

### GetMasterVolume

`static` `inline`

```cpp
static inline float GetMasterVolume()
```

Defined in ShitEngine/Audio/AudioPlayer.h:50

---

### PauseAll

`static` `inline`

```cpp
static inline void PauseAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:51

---

### ResumeAll

`static` `inline`

```cpp
static inline void ResumeAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:52

---

### StopAll

`static` `inline`

```cpp
static inline void StopAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:53

---

### ApplyTrackGain

`static` `inline`

```cpp
static inline void ApplyTrackGain(AudioTrack * track, const AudioTrackGroup * group)
```

Defined in ShitEngine/Audio/AudioPlayer.h:54

---

### GetInstance

`static`

```cpp
static AudioPlayer & GetInstance()
```

Defined in ShitEngine/Audio/AudioPlayer.h:58

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `struct MIX_Mixer *` | [`m_mixer`](#m_mixer-1)  |  |
| `bool` | [`m_isInited`](#m_isinited)  |  |
| `float` | [`m_masterGain`](#m_mastergain)  |  |
| `std::unordered_map< std::string, std::unique_ptr< AudioTrackGroup > >` | [`m_groups`](#m_groups)  |  |
| `std::vector< std::unique_ptr< AudioTrack > >` | [`m_tracks`](#m_tracks)  |  |

---

### m_mixer

```cpp
struct MIX_Mixer * m_mixer = nullptr
```

Defined in ShitEngine/Audio/AudioPlayer.h:81

---

### m_isInited

```cpp
bool m_isInited = false
```

Defined in ShitEngine/Audio/AudioPlayer.h:82

---

### m_masterGain

```cpp
float m_masterGain = 1.0f
```

Defined in ShitEngine/Audio/AudioPlayer.h:83

---

### m_groups

```cpp
std::unordered_map< std::string, std::unique_ptr< AudioTrackGroup > > m_groups
```

Defined in ShitEngine/Audio/AudioPlayer.h:84

---

### m_tracks

```cpp
std::vector< std::unique_ptr< AudioTrack > > m_tracks
```

Defined in ShitEngine/Audio/AudioPlayer.h:85

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`AudioPlayer`](#audioplayer-3)  | Defaulted constructor. |
| `bool` | [`init`](#init-1)  |  |
| `void` | [`destroy`](#destroy-1)  |  |
| `void` | [`update`](#update-1)  |  |
| `AudioTrackGroup *` | [`createTrackGroup`](#createtrackgroup-1)  |  |
| `AudioTrackGroup *` | [`getTrackGroup`](#gettrackgroup-1)  |  |
| `AudioTrack *` | [`play`](#play-3)  |  |
| `void` | [`setMasterVolume`](#setmastervolume-1)  |  |
| `void` | [`pauseAll`](#pauseall-1)  |  |
| `void` | [`resumeAll`](#resumeall-1)  |  |
| `void` | [`stopAll`](#stopall-1)  |  |
| `void` | [`applyTrackGain`](#applytrackgain-1)  |  |

---

### AudioPlayer

```cpp
AudioPlayer() = default
```

Defined in ShitEngine/Audio/AudioPlayer.h:66

Defaulted constructor.

---

### init

```cpp
bool init()
```

Defined in ShitEngine/Audio/AudioPlayer.h:69

---

### destroy

```cpp
void destroy()
```

Defined in ShitEngine/Audio/AudioPlayer.h:70

---

### update

```cpp
void update()
```

Defined in ShitEngine/Audio/AudioPlayer.h:71

---

### createTrackGroup

```cpp
AudioTrackGroup * createTrackGroup(const std::string & name)
```

Defined in ShitEngine/Audio/AudioPlayer.h:72

---

### getTrackGroup

```cpp
AudioTrackGroup * getTrackGroup(const std::string & name)
```

Defined in ShitEngine/Audio/AudioPlayer.h:73

---

### play

```cpp
AudioTrack * play(const std::string & filePath, AudioTrackGroup * group, int loopCount = 0)
```

Defined in ShitEngine/Audio/AudioPlayer.h:74

---

### setMasterVolume

```cpp
void setMasterVolume(float gain)
```

Defined in ShitEngine/Audio/AudioPlayer.h:75

---

### pauseAll

```cpp
void pauseAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:76

---

### resumeAll

```cpp
void resumeAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:77

---

### stopAll

```cpp
void stopAll()
```

Defined in ShitEngine/Audio/AudioPlayer.h:78

---

### applyTrackGain

```cpp
void applyTrackGain(AudioTrack * track, const AudioTrackGroup * group)
```

Defined in ShitEngine/Audio/AudioPlayer.h:79

