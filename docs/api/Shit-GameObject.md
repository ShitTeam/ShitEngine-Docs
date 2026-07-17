---
title: "GameObject"
description: "游戏物体类"
kind: class
namespace: Shit
header: "GameObject.h"
---


# GameObject

```cpp
#include <GameObject.h>
```

```cpp
class GameObject
```

Defined in ShitEngine/GameObject/GameObject.h:22

游戏物体类

构造函数私有，只能通过 [Scene::createGameObject](Shit-Scene.md#creategameobject) 或 [Scene::instantiate](Shit-Scene.md#instantiate) 创建。

## List of all members

| Name | Kind | Owner |
|------|------|-------|
| [`Scene`](#scene) | `friend` | Declared here |
| [`GameObject`](#gameobject-3) | `function` | Declared here |
| [`GameObject`](#gameobject-4) | `function` | Declared here |
| [`destroy`](#destroy-4) | `function` | Declared here |
| [`getName`](#getname-1) | `function` | Declared here |
| [`getTag`](#gettag) | `function` | Declared here |
| [`getScene`](#getscene) | `function` | Declared here |
| [`isNeedDestroy`](#isneeddestroy) | `function` | Declared here |
| [`setName`](#setname) | `function` | Declared here |
| [`setTag`](#settag) | `function` | Declared here |
| [`setScene`](#setscene) | `function` | Declared here |
| [`setNeedDestroy`](#setneeddestroy) | `function` | Declared here |
| [`getComponents`](#getcomponents) | `function` | Declared here |
| [`getComponent`](#getcomponent) | `function` | Declared here |
| [`hasComponent`](#hascomponent) | `function` | Declared here |
| [`removeComponent`](#removecomponent) | `function` | Declared here |
| [`m_name`](#m_name-1) | `variable` | Declared here |
| [`m_tag`](#m_tag) | `variable` | Declared here |
| [`m_scene`](#m_scene) | `variable` | Declared here |
| [`m_components`](#m_components) | `variable` | Declared here |
| [`m_needDestroy`](#m_needdestroy) | `variable` | Declared here |
| [`GameObject`](#gameobject-5) | `function` | Declared here |
| [`clean`](#clean) | `function` | Declared here |

## Friends

| Name | Description |
|------|-------------|
| [`Scene`](#scene)  |  |

---

### Scene

```cpp
friend class Scene
```

Defined in ShitEngine/GameObject/GameObject.h:23

## Public Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`GameObject`](#gameobject-3)  | Deleted constructor. |
|  | [`GameObject`](#gameobject-4)  | Deleted constructor. |
| `void` | [`destroy`](#destroy-4)  | 标记为待销毁（帧末由 [Scene](Shit-Scene.md#scene-1) 统一清理） |
| `const std::string &` | [`getName`](#getname-1) `const` `inline` |  |
| `const std::string &` | [`getTag`](#gettag) `const` `inline` |  |
| `Scene *` | [`getScene`](#getscene) `const` `inline` |  |
| `bool` | [`isNeedDestroy`](#isneeddestroy) `const` `inline` |  |
| `void` | [`setName`](#setname) `inline` |  |
| `void` | [`setTag`](#settag) `inline` | 设置标签（用于分类，如 "enemy"、"player"） |
| `void` | [`setScene`](#setscene)  | 设置所属场景（同时触发未注册组件的 onAttach） |
| `void` | [`setNeedDestroy`](#setneeddestroy) `inline` |  |
| `std::unordered_map< std::type_index, std::unique_ptr< Component > > &` | [`getComponents`](#getcomponents) `inline` | 获取全部组件（按 type_index 索引） |
| `T *` | [`getComponent`](#getcomponent) `inline` | 获取组件 |
| `bool` | [`hasComponent`](#hascomponent) `inline` | 检查是否存在某个组件 |
| `void` | [`removeComponent`](#removecomponent) `inline` | 移除某个组件 |

---

### GameObject

```cpp
GameObject(const GameObject &) = delete
```

Defined in ShitEngine/GameObject/GameObject.h:31

Deleted constructor.

---

### GameObject

```cpp
GameObject(GameObject &&) = delete
```

Defined in ShitEngine/GameObject/GameObject.h:33

Deleted constructor.

---

### destroy

```cpp
void destroy()
```

Defined in ShitEngine/GameObject/GameObject.h:36

标记为待销毁（帧末由 [Scene](Shit-Scene.md#scene-1) 统一清理）

---

### getName

`const` `inline`

```cpp
inline const std::string & getName() const
```

Defined in ShitEngine/GameObject/GameObject.h:39

---

### getTag

`const` `inline`

```cpp
inline const std::string & getTag() const
```

Defined in ShitEngine/GameObject/GameObject.h:40

---

### getScene

`const` `inline`

```cpp
inline Scene * getScene() const
```

Defined in ShitEngine/GameObject/GameObject.h:41

---

### isNeedDestroy

`const` `inline`

```cpp
inline bool isNeedDestroy() const
```

Defined in ShitEngine/GameObject/GameObject.h:42

---

### setName

`inline`

```cpp
inline void setName(const std::string & name)
```

Defined in ShitEngine/GameObject/GameObject.h:44

---

### setTag

`inline`

```cpp
inline void setTag(const std::string & tag)
```

Defined in ShitEngine/GameObject/GameObject.h:45

设置标签（用于分类，如 "enemy"、"player"）

---

### setScene

```cpp
void setScene(Scene * scene)
```

Defined in ShitEngine/GameObject/GameObject.h:46

设置所属场景（同时触发未注册组件的 onAttach）

---

### setNeedDestroy

`inline`

```cpp
inline void setNeedDestroy(bool needDestroy)
```

Defined in ShitEngine/GameObject/GameObject.h:47

---

### getComponents

`inline`

```cpp
inline std::unordered_map< std::type_index, std::unique_ptr< Component > > & getComponents()
```

Defined in ShitEngine/GameObject/GameObject.h:48

获取全部组件（按 type_index 索引）

---

### getComponent

`inline`

```cpp
template<typename T> inline T * getComponent()
```

Defined in ShitEngine/GameObject/GameObject.h:89

获取组件

```
       @brief 添加组件
       @tparam T 组件类型（须继承 Component）
       @tparam ...Args 构造参数类型
       @param ...args 传递给组件构造函数
       @return 组件指针（若已存在则返回已有的）

    T* addComponent(Args&&... args) {
        static_assert(std::is_base_of_v<Component, T>, "添加的组件必须继承自 Component！");

        auto type_index = std::type_index(typeid(T));

        if (hasComponent<T>()) { // 是否已经存在
            return getComponent<T>();
        }
```

创建组件 auto new_component = std::make_unique<T>(std::forward`<Args>`(args)...); T* new_component_ptr = new_component.get(); new_component->setOwner(this); new_component->onCreate(); // onCreate：轻量初始化

若已挂载场景则立即执行 onAttach（注册到 System） if (m_scene) { new_component->onAttach(); }

m_components[type_index] = std::unique_ptr`<Component>`(new_component.release()); ST_CORE_TRACE("GameObject : {} 已添加 组件 {}", m_name, typeid(T).name());

return new_component_ptr; }

/** 
#### Returns
组件裸指针

---

### hasComponent

`inline`

```cpp
template<typename T> inline bool hasComponent()
```

Defined in ShitEngine/GameObject/GameObject.h:105

检查是否存在某个组件

#### Returns
是否存在组件

---

### removeComponent

`inline`

```cpp
template<typename T> inline void removeComponent()
```

Defined in ShitEngine/GameObject/GameObject.h:118

移除某个组件

生命周期调用顺序：onDetach → onDestroy

## Private Attributes

| Return | Name | Description |
|--------|------|-------------|
| `std::string` | [`m_name`](#m_name-1)  |  |
| `std::string` | [`m_tag`](#m_tag)  |  |
| `Scene *` | [`m_scene`](#m_scene)  |  |
| `std::unordered_map< std::type_index, std::unique_ptr< Component > >` | [`m_components`](#m_components)  |  |
| `bool` | [`m_needDestroy`](#m_needdestroy)  |  |

---

### m_name

```cpp
std::string m_name
```

Defined in ShitEngine/GameObject/GameObject.h:132

---

### m_tag

```cpp
std::string m_tag
```

Defined in ShitEngine/GameObject/GameObject.h:133

---

### m_scene

```cpp
Scene * m_scene = nullptr
```

Defined in ShitEngine/GameObject/GameObject.h:134

---

### m_components

```cpp
std::unordered_map< std::type_index, std::unique_ptr< Component > > m_components
```

Defined in ShitEngine/GameObject/GameObject.h:135

---

### m_needDestroy

```cpp
bool m_needDestroy = false
```

Defined in ShitEngine/GameObject/GameObject.h:136

## Private Methods

| Return | Name | Description |
|--------|------|-------------|
|  | [`GameObject`](#gameobject-5)  |  |
| `void` | [`clean`](#clean)  |  |

---

### GameObject

```cpp
GameObject(const std::string & name)
```

Defined in ShitEngine/GameObject/GameObject.h:25

---

### clean

```cpp
void clean()
```

Defined in ShitEngine/GameObject/GameObject.h:130

