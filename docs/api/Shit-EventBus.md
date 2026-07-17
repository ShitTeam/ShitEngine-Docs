---
title: "EventBus"
description: "事件总线，缓冲队列模式"
kind: class
namespace: Shit
header: "EventBus.h"
---


# EventBus

```cpp
#include <EventBus.h>
```

```cpp
class EventBus
```

Defined in ShitEngine/Event/EventBus.h:30

事件总线，缓冲队列模式

所有事件先入队，在游戏循环的统一时刻（ProcessEvents）派发。 避免递归触发、迭代器失效等问题。

使用示例： struct CollisionEvent : public [Shit::Event](Shit-Event.md#event) { class GameObject* a; class GameObject* b; };

uint64_t id = [Shit::EventBus::Subscribe<CollisionEvent>](#subscribe)( [](const CollisionEvent& e) { /* handle *\/ });

[Shit::EventBus::Emit](#emit)(CollisionEvent{nullptr, nullptr}); // 游戏循环结束时： [Shit::EventBus::ProcessEvents()](#processevents); Shit::EventBus::Unsubscribe<CollisionEvent>(id);

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`EventBus`](#eventbus-1) | `function` | Declared here |
| [`EventBus`](#eventbus-2) | `function` | Declared here |
| [`Subscribe`](#subscribe) | `function` | Declared here |
| [`Unsubscribe`](#unsubscribe) | `function` | Declared here |
| [`Emit`](#emit) | `function` | Declared here |
| [`ProcessEvents`](#processevents) | `function` | Declared here |
| [`Clear`](#clear) | `function` | Declared here |
| [`ClearAll`](#clearall) | `function` | Declared here |
| [`GetInstance`](#getinstance-2) | `function` | Declared here |
| [`HandlerID`](#handlerid) | `typedef` | Declared here |
| [`m_listeners`](#m_listeners) | `variable` | Declared here |
| [`m_eventQueue`](#m_eventqueue) | `variable` | Declared here |
| [`m_mutex`](#m_mutex) | `variable` | Declared here |
| [`m_nextID`](#m_nextid) | `variable` | Declared here |
| [`EventBus`](#eventbus-3) | `function` | Declared here |
| [`subscribe`](#subscribe-1) | `function` | Declared here |
| [`unsubscribe`](#unsubscribe-1) | `function` | Declared here |
| [`emit`](#emit-1) | `function` | Declared here |
| [`processEvents`](#processevents-1) | `function` | Declared here |
| [`clear`](#clear-1) | `function` | Declared here |
| [`clearAll`](#clearall-1) | `function` | Declared here |

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`EventBus`](#eventbus-1)  | Deleted constructor. |
|  | [`EventBus`](#eventbus-2)  | Deleted constructor. |

---

### EventBus

```cpp
EventBus(const EventBus &) = delete
```

Defined in ShitEngine/Event/EventBus.h:65

Deleted constructor.

---

### EventBus

```cpp
EventBus(EventBus &&) = delete
```

Defined in ShitEngine/Event/EventBus.h:67

Deleted constructor.

## Public Static Methods

| Return | Name | Description |
|--------|------|-------------|
| `HandlerID` | [`Subscribe`](#subscribe) `static` `inline` |  |
| `void` | [`Unsubscribe`](#unsubscribe) `static` `inline` |  |
| `void` | [`Emit`](#emit) `static` `inline` |  |
| `void` | [`ProcessEvents`](#processevents) `static` `inline` |  |
| `void` | [`Clear`](#clear) `static` `inline` |  |
| `void` | [`ClearAll`](#clearall) `static` `inline` |  |
| `EventBus &` | [`GetInstance`](#getinstance-2) `static` |  |

---

### Subscribe

`static` `inline`

```cpp
template<typename EventType> static inline HandlerID Subscribe(std::function< void(const EventType &)> callback)
```

Defined in ShitEngine/Event/EventBus.h:35

---

### Unsubscribe

`static` `inline`

```cpp
template<typename EventType> static inline void Unsubscribe(HandlerID id)
```

Defined in ShitEngine/Event/EventBus.h:41

---

### Emit

`static` `inline`

```cpp
template<typename EventType> static inline void Emit(const EventType & event)
```

Defined in ShitEngine/Event/EventBus.h:46

---

### ProcessEvents

`static` `inline`

```cpp
static inline void ProcessEvents()
```

Defined in ShitEngine/Event/EventBus.h:50

---

### Clear

`static` `inline`

```cpp
template<typename EventType> static inline void Clear()
```

Defined in ShitEngine/Event/EventBus.h:55

---

### ClearAll

`static` `inline`

```cpp
static inline void ClearAll()
```

Defined in ShitEngine/Event/EventBus.h:59

---

### GetInstance

`static`

```cpp
static EventBus & GetInstance()
```

Defined in ShitEngine/Event/EventBus.h:63

## Public Types

| Name | Description |
|------|-------------|
| [`HandlerID`](#handlerid)  |  |

---

### HandlerID

```cpp
using HandlerID = uint64_t
```

Defined in ShitEngine/Event/EventBus.h:32

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::unordered_map< std::type_index, std::vector< ListenerEntry > >` | [`m_listeners`](#m_listeners)  |  |
| `std::queue< std::shared_ptr< Event > >` | [`m_eventQueue`](#m_eventqueue)  |  |
| `std::mutex` | [`m_mutex`](#m_mutex)  |  |
| `HandlerID` | [`m_nextID`](#m_nextid)  |  |

---

### m_listeners

```cpp
std::unordered_map< std::type_index, std::vector< ListenerEntry > > m_listeners
```

Defined in ShitEngine/Event/EventBus.h:119

---

### m_eventQueue

```cpp
std::queue< std::shared_ptr< Event > > m_eventQueue
```

Defined in ShitEngine/Event/EventBus.h:120

---

### m_mutex

```cpp
std::mutex m_mutex
```

Defined in ShitEngine/Event/EventBus.h:121

---

### m_nextID

```cpp
HandlerID m_nextID = 0
```

Defined in ShitEngine/Event/EventBus.h:122

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`EventBus`](#eventbus-3)  | Defaulted constructor. |
| `HandlerID` | [`subscribe`](#subscribe-1) `inline` |  |
| `void` | [`unsubscribe`](#unsubscribe-1) `inline` |  |
| `void` | [`emit`](#emit-1) `inline` |  |
| `void` | [`processEvents`](#processevents-1)  |  |
| `void` | [`clear`](#clear-1) `inline` |  |
| `void` | [`clearAll`](#clearall-1)  |  |

---

### EventBus

```cpp
EventBus() = default
```

Defined in ShitEngine/Event/EventBus.h:71

Defaulted constructor.

---

### subscribe

`inline`

```cpp
template<typename EventType> inline HandlerID subscribe(std::function< void(const EventType &)> callback)
```

Defined in ShitEngine/Event/EventBus.h:80

---

### unsubscribe

`inline`

```cpp
template<typename EventType> inline void unsubscribe(HandlerID id)
```

Defined in ShitEngine/Event/EventBus.h:93

---

### emit

`inline`

```cpp
template<typename EventType> inline void emit(const EventType & event)
```

Defined in ShitEngine/Event/EventBus.h:104

---

### processEvents

```cpp
void processEvents()
```

Defined in ShitEngine/Event/EventBus.h:109

---

### clear

`inline`

```cpp
template<typename EventType> inline void clear()
```

Defined in ShitEngine/Event/EventBus.h:112

---

### clearAll

```cpp
void clearAll()
```

Defined in ShitEngine/Event/EventBus.h:117

