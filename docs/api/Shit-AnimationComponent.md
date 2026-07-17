---
title: "AnimationComponent"
description: "动画组件"
kind: class
namespace: Shit
header: "AnimationComponent.h"
---


# AnimationComponent

```cpp
#include <AnimationComponent.h>
```

```cpp
class AnimationComponent
```

Defined in ShitEngine/Component/AnimationComponent.h:31

> **Inherits:** [`Behavior`](Shit-Behavior.md#behavior)

动画组件

继承 Behavior，由 [BehaviorSystem](Shit-BehaviorSystem.md#behaviorsystem) 每帧调用 onUpdate 推进当前动画时间， 并把当前帧的源矩形 (SDL_FRect) 回写到同 [GameObject](Shit-GameObject.md#gameobject-2) 上的 SpriteRenderer。

典型用法（三点式 sprite-sheet）： [Shit::SpriteSheet](Shit-SpriteSheet.md#spritesheet) sheet(4, 8, 32, 32); // 4行8列，每帧32×32 auto* anim = go->addComponent`<AnimationComponent>`(); anim->play("walk", sheet, {0,1,2,3,4,5}, 0.1f, true); // 全局帧索引数组

或手工添加已构造好的 Animation： anim->addAnimation("walk", std::move(walkAnim)); anim->play("walk");

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`AnimationComponent`](#animationcomponent-1) | `function` | Declared here |
| [`onAttach`](#onattach) | `function` | Declared here |
| [`onStart`](#onstart) | `function` | Declared here |
| [`onUpdate`](#onupdate) | `function` | Declared here |
| [`onDestroy`](#ondestroy) | `function` | Declared here |
| [`addAnimation`](#addanimation) | `function` | Declared here |
| [`play`](#play) | `function` | Declared here |
| [`stop`](#stop) | `function` | Declared here |
| [`pause`](#pause) | `function` | Declared here |
| [`resume`](#resume) | `function` | Declared here |
| [`play`](#play-1) | `function` | Declared here |
| [`isPlaying`](#isplaying) | `function` | Declared here |
| [`isPaused`](#ispaused) | `function` | Declared here |
| [`getCurrentAnimationName`](#getcurrentanimationname) | `function` | Declared here |
| [`m_animations`](#m_animations) | `variable` | Declared here |
| [`m_currentAnimation`](#m_currentanimation) | `variable` | Declared here |
| [`m_currentAnimationName`](#m_currentanimationname) | `variable` | Declared here |
| [`m_currentTime`](#m_currenttime) | `variable` | Declared here |
| [`m_isPlaying`](#m_isplaying) | `variable` | Declared here |
| [`m_isPaused`](#m_ispaused) | `variable` | Declared here |
| [`applyCurrentFrame`](#applycurrentframe) | `function` | Declared here |
| [`GameObject`](Shit-Behavior.md#gameobject) | `friend` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`Behavior`](Shit-Behavior.md#behavior-1) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`onCreate`](Shit-Behavior.md#oncreate) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`onAttach`](Shit-Behavior.md#onattach-1) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`onStart`](Shit-Behavior.md#onstart-1) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`onUpdate`](Shit-Behavior.md#onupdate-1) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`onDetach`](Shit-Behavior.md#ondetach) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`onDestroy`](Shit-Behavior.md#ondestroy-1) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`isStarted`](Shit-Behavior.md#isstarted) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`setStarted`](Shit-Behavior.md#setstarted) | `function` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`m_isStarted`](Shit-Behavior.md#m_isstarted) | `variable` | Inherited from [`Behavior`](Shit-Behavior.md#behavior) |
| [`GameObject`](Shit-Component.md#gameobject-1) | `friend` | Inherited from [`Component`](Shit-Component.md#component) |
| [`Component`](Shit-Component.md#component-1) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`onCreate`](Shit-Component.md#oncreate-1) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`onAttach`](Shit-Component.md#onattach-3) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`onDetach`](Shit-Component.md#ondetach-1) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`onDestroy`](Shit-Component.md#ondestroy-3) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`Component`](Shit-Component.md#component-2) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`Component`](Shit-Component.md#component-3) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`getOwner`](Shit-Component.md#getowner) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`isRegistered`](Shit-Component.md#isregistered) | `function` | Inherited from [`Component`](Shit-Component.md#component) |
| [`m_owner`](Shit-Component.md#m_owner) | `variable` | Inherited from [`Component`](Shit-Component.md#component) |
| [`m_isRegistered`](Shit-Component.md#m_isregistered) | `variable` | Inherited from [`Component`](Shit-Component.md#component) |
| [`setOwner`](Shit-Component.md#setowner) | `function` | Inherited from [`Component`](Shit-Component.md#component) |

## Inherited from [`Behavior`](Shit-Behavior.md#behavior)

| Kind | Name | Description |
|------|------|-------------|
| `friend` | [`GameObject`](Shit-Behavior.md#gameobject)  |  |
| `function` | [`Behavior`](Shit-Behavior.md#behavior-1)  | Defaulted constructor. |
| `function` | [`onCreate`](Shit-Behavior.md#oncreate) `virtual` `override` |  |
| `function` | [`onAttach`](Shit-Behavior.md#onattach-1) `virtual` `override` |  |
| `function` | [`onStart`](Shit-Behavior.md#onstart-1) `virtual` | 首次 update 前执行一次 |
| `function` | [`onUpdate`](Shit-Behavior.md#onupdate-1) `virtual` | 每帧执行 |
| `function` | [`onDetach`](Shit-Behavior.md#ondetach) `virtual` `override` |  |
| `function` | [`onDestroy`](Shit-Behavior.md#ondestroy-1) `virtual` `override` |  |
| `function` | [`isStarted`](Shit-Behavior.md#isstarted) `const` `inline` | onStart 是否已执行过 |
| `function` | [`setStarted`](Shit-Behavior.md#setstarted) `inline` |  |
| `variable` | [`m_isStarted`](Shit-Behavior.md#m_isstarted)  |  |

## Inherited from [`Component`](Shit-Component.md#component)

| Kind | Name | Description |
|------|------|-------------|
| `friend` | [`GameObject`](Shit-Component.md#gameobject-1)  |  |
| `function` | [`Component`](Shit-Component.md#component-1)  |  |
| `function` | [`onCreate`](Shit-Component.md#oncreate-1) `virtual` `inline` |  |
| `function` | [`onAttach`](Shit-Component.md#onattach-3) `virtual` `inline` |  |
| `function` | [`onDetach`](Shit-Component.md#ondetach-1) `virtual` `inline` |  |
| `function` | [`onDestroy`](Shit-Component.md#ondestroy-3) `virtual` `inline` |  |
| `function` | [`Component`](Shit-Component.md#component-2)  | Deleted constructor. |
| `function` | [`Component`](Shit-Component.md#component-3)  | Deleted constructor. |
| `function` | [`getOwner`](Shit-Component.md#getowner) `const` `inline` |  |
| `function` | [`isRegistered`](Shit-Component.md#isregistered) `const` `inline` |  |
| `variable` | [`m_owner`](Shit-Component.md#m_owner)  |  |
| `variable` | [`m_isRegistered`](Shit-Component.md#m_isregistered)  |  |
| `function` | [`setOwner`](Shit-Component.md#setowner) `inline` |  |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`AnimationComponent`](#animationcomponent-1)  |  |
| `void` | [`onAttach`](#onattach) `virtual` `override` |  |
| `void` | [`onStart`](#onstart) `virtual` `override` | 首次 update 前执行一次 |
| `void` | [`onUpdate`](#onupdate) `virtual` `override` | 每帧执行 |
| `void` | [`onDestroy`](#ondestroy) `virtual` `override` |  |
| `void` | [`addAnimation`](#addanimation)  |  |
| `void` | [`play`](#play)  |  |
| `void` | [`stop`](#stop)  |  |
| `void` | [`pause`](#pause)  |  |
| `void` | [`resume`](#resume)  |  |
| `void` | [`play`](#play-1)  | 用数字帧索引直接设置并播放一段动画 |
| `bool` | [`isPlaying`](#isplaying) `const` `inline` |  |
| `bool` | [`isPaused`](#ispaused) `const` `inline` |  |
| `const std::string &` | [`getCurrentAnimationName`](#getcurrentanimationname) `const` `inline` |  |

---

### AnimationComponent

```cpp
AnimationComponent()
```

Defined in ShitEngine/Component/AnimationComponent.h:33

---

### onAttach

`virtual` `override`

```cpp
virtual void onAttach() override
```

Defined in ShitEngine/Component/AnimationComponent.h:37

#### Reimplements

- [`onAttach`](Shit-Component.md#onattach-3)

---

### onStart

`virtual` `override`

```cpp
virtual void onStart() override
```

Defined in ShitEngine/Component/AnimationComponent.h:38

首次 update 前执行一次

#### Reimplements

- [`onStart`](Shit-Behavior.md#onstart-1)

---

### onUpdate

`virtual` `override`

```cpp
virtual void onUpdate() override
```

Defined in ShitEngine/Component/AnimationComponent.h:39

每帧执行

#### Reimplements

- [`onUpdate`](Shit-Behavior.md#onupdate-1)

---

### onDestroy

`virtual` `override`

```cpp
virtual void onDestroy() override
```

Defined in ShitEngine/Component/AnimationComponent.h:40

#### Reimplements

- [`onDestroy`](Shit-Component.md#ondestroy-3)

---

### addAnimation

```cpp
void addAnimation(const std::string & name, std::unique_ptr< Animation > animation)
```

Defined in ShitEngine/Component/AnimationComponent.h:43

---

### play

```cpp
void play(const std::string & name)
```

Defined in ShitEngine/Component/AnimationComponent.h:45

---

### stop

```cpp
void stop()
```

Defined in ShitEngine/Component/AnimationComponent.h:46

---

### pause

```cpp
void pause()
```

Defined in ShitEngine/Component/AnimationComponent.h:47

---

### resume

```cpp
void resume()
```

Defined in ShitEngine/Component/AnimationComponent.h:48

---

### play

```cpp
void play(const std::string & name, const SpriteSheet & sheet, const std::vector< int > & frames, float duration = 0.1f, bool loop = true)
```

Defined in ShitEngine/Component/AnimationComponent.h:62

用数字帧索引直接设置并播放一段动画

按 frames 中的索引从 sheet 切出条帧，构造一个 [Animation](Shit-Animation.md#animation) 并以 name 登记/覆盖后播放。 若 name 已存在则替换。

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `const std::string &` | 动画名（用作登记与 play 索引） |
| `sheet` | `const [SpriteSheet](Shit-SpriteSheet.md#spritesheet) &` | 精灵图集，提供行列网格切割 |
| `frames` | `const std::vector< int > &` | 想要播放的全局帧索引序列（如 {0,1,2,3,5,8}，可不连续） |
| `duration` | `float` | 每帧持续时间（秒） |
| `loop` | `bool` | 是否循环 |

---

### isPlaying

`const` `inline`

```cpp
inline bool isPlaying() const
```

Defined in ShitEngine/Component/AnimationComponent.h:66

---

### isPaused

`const` `inline`

```cpp
inline bool isPaused() const
```

Defined in ShitEngine/Component/AnimationComponent.h:67

---

### getCurrentAnimationName

`const` `inline`

```cpp
inline const std::string & getCurrentAnimationName() const
```

Defined in ShitEngine/Component/AnimationComponent.h:68

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::unordered_map< std::string, std::unique_ptr< Animation > >` | [`m_animations`](#m_animations)  |  |
| `Animation *` | [`m_currentAnimation`](#m_currentanimation)  |  |
| `std::string` | [`m_currentAnimationName`](#m_currentanimationname)  |  |
| `float` | [`m_currentTime`](#m_currenttime)  |  |
| `bool` | [`m_isPlaying`](#m_isplaying)  |  |
| `bool` | [`m_isPaused`](#m_ispaused)  |  |

---

### m_animations

```cpp
std::unordered_map< std::string, std::unique_ptr< Animation > > m_animations
```

Defined in ShitEngine/Component/AnimationComponent.h:74

---

### m_currentAnimation

```cpp
Animation * m_currentAnimation = nullptr
```

Defined in ShitEngine/Component/AnimationComponent.h:75

---

### m_currentAnimationName

```cpp
std::string m_currentAnimationName
```

Defined in ShitEngine/Component/AnimationComponent.h:76

---

### m_currentTime

```cpp
float m_currentTime = 0.0f
```

Defined in ShitEngine/Component/AnimationComponent.h:77

---

### m_isPlaying

```cpp
bool m_isPlaying = false
```

Defined in ShitEngine/Component/AnimationComponent.h:79

---

### m_isPaused

```cpp
bool m_isPaused = false
```

Defined in ShitEngine/Component/AnimationComponent.h:80

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
| `void` | [`applyCurrentFrame`](#applycurrentframe)  |  |

---

### applyCurrentFrame

```cpp
void applyCurrentFrame()
```

Defined in ShitEngine/Component/AnimationComponent.h:72

