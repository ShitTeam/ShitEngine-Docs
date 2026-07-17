---
title: "Prefab"
description: "预制体，可重复生成相同配置的 [GameObject](Shit-GameObject.md#gameobject-2)"
kind: class
namespace: Shit
header: "Prefab.h"
---


# Prefab

```cpp
#include <Prefab.h>
```

```cpp
class Prefab
```

Defined in ShitEngine/GameObject/Prefab.h:21

预制体，可重复生成相同配置的 [GameObject](Shit-GameObject.md#gameobject-2)

用法： auto enemyPrefab = [Shit::Prefab::Build](#build)([]([Shit::GameObject](Shit-GameObject.md#gameobject-2)* go) { go->addComponent<Shit::TransformComponent>(); go->addComponent<Shit::SpriteRenderer>()->setTexturePath("enemy.png"); });

// 在场景中实例化 auto* enemy = scene->instantiate(enemyPrefab);

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`apply`](#apply) | `function` | Declared here |
| [`Build`](#build) | `function` | Declared here |
| [`Builder`](#builder) | `typedef` | Declared here |
| [`m_builder`](#m_builder) | `variable` | Declared here |
| [`Prefab`](#prefab-1) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
| `void` | [`apply`](#apply) `const` `inline` |  |

---

### apply

`const` `inline`

```cpp
inline void apply(GameObject * go) const
```

Defined in ShitEngine/GameObject/Prefab.h:31

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `Prefab` | [`Build`](#build) `static` `inline` |  |

---

### Build

`static` `inline`

```cpp
static inline Prefab Build(Builder builder)
```

Defined in ShitEngine/GameObject/Prefab.h:25

## Public Types

| Name | Description |
|------|-------------|
| [`Builder`](#builder)  |  |

---

### Builder

```cpp
using Builder = std::function< void(GameObject *)>
```

Defined in ShitEngine/GameObject/Prefab.h:23

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `Builder` | [`m_builder`](#m_builder)  |  |

---

### m_builder

```cpp
Builder m_builder
```

Defined in ShitEngine/GameObject/Prefab.h:37

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`Prefab`](#prefab-1)  | Defaulted constructor. |

---

### Prefab

```cpp
Prefab() = default
```

Defined in ShitEngine/GameObject/Prefab.h:36

Defaulted constructor.

