# 反射系统

ShitEngine 提供一套基于 **libClang** 的编译期反射系统。开发者只需在类/结构体上添加宏标记，ReflectionScanner 工具自动解析源码并生成注册代码。

## 概述

反射系统的核心由两部分构成：

| 阶段 | 组件 | 作用 |
|---|---|---|
| **构建时** | `ReflectionScanner`（基于 libClang C API） | 解析被宏标记的头文件，生成 `.gen.h` 注册代码 |
| **运行时** | `TypeRegistry` | 全局单例，存储所有已注册类型的元信息，支持名称和 `type_index` 查询 |

## 宏 API

### SHIT_CLASS / SHIT_STRUCT

标记需要反射的类型。宏展开为带 `__attribute__((annotate))` 的属性声明，替换类名位置。libClang 在 AST 中通过 `CXCursor_AnnotateAttr` 读取该注解。

**宏只展开为 annotate 属性 + 类型名**，不包含 `class`/`struct` 关键字。你需要自己书写关键字和 `SHIT_API`：

```cpp
// Fields 模式：反射所有字段
class SHIT_API SHIT_CLASS(Player, Fields) : public Component {
    SHIT_REFLECT(Player)  // 授权成员指针访问 private
public:
    int hp;
    float speed;
};

// WhiteListFields 模式：仅反射被 SHIT_META 标记的字段
struct SHIT_STRUCT(PlayerConfig, WhiteListFields) {
    SHIT_REFLECT(PlayerConfig)

    SHIT_META()
    float volume = 1.0f;  // 会被反射

    int cacheVersion = 0;  // 不会被反射
};
```

- **Mode**: `Fields`（反射所有字段）| `WhiteListFields`（只反射带 `SHIT_META` 的字段）
- **`SHIT_REFLECT(Type)`**: 放在类体内，展开为 `friend bool Register_Type();`。授予生成的注册代码访问 private/protected 成员的权限（通过成员指针取 offset，ABI 安全，不依赖 libClang 的数值偏移量）

### SHIT_META

白名单模式下标记需要反射的字段。展开为 `__attribute__((annotate("shit-meta:Enable")))`，参数嵌入到注解字符串内，后续可扩展为 `SHIT_META(Disable)`、`SHIT_META(EditorOnly)` 等。

```cpp
SHIT_META()
float health;
```

### 编译器兼容性

`__attribute__((annotate))` 是 Clang 的扩展属性，libClang 解析器（定义 `__clang__`）能识别。对 GCC/MSVC 编译器，该属性退化为空，不影响编译结果。

## 运行时 API

### TypeRegistry

```cpp
// 初始化内置类型（int、float、std::string 等），在 Game::Init() 中自动调用
TypeRegistry::InitBuiltinTypes();

// 查询
const TypeInfo* t = TypeRegistry::Get("Player");           // 按名称（string_view）
const TypeInfo* t = TypeRegistry::Get<Player>();            // 按 type_index（模板）
size_t count      = TypeRegistry::Count();                  // 注册总数
TypeRegistry::ForEach([](const TypeInfo& info) { ... });    // 遍历
```

手动注册（当没有运行 Scanner 或在运行时构造类型时）：

```cpp
Shit::ReflectType("Player", sizeof(Player))
    .Base(TypeRegistry::Get("Component"))
    .Field("m_hp",    offsetof(Player, m_hp),    sizeof(int),   "int")
    .Field("m_speed", offsetof(Player, m_speed), sizeof(float), "float")
    .Register<Player>();
```

`Field()` 提供三组重载：

| 重载 | 说明 |
|---|---|
| `Field(name, offset, size, typeName)` | 数值偏移方式（无 friend 授权要求） |
| `Field(name, &T::member)` | 成员指针方式，自动推导偏移+大小+类型名（ABI 安全，需 `SHIT_REFLECT` 授权） |
| `Field(name, &T::member, typeName)` | 成员指针方式，显式指定类型名字符串 |

`Base()` 同样有两种形式：

```cpp
// 通过基类指针
.Base(TypeRegistry::Get("Component"))

// 通过模板参数自动查找（需基类已在 TypeRegistry 中注册）
.Base<Component>()
```

### TypeInfo / FieldInfo

```cpp
struct FieldInfo {
    std::string name;      // 字段名
    size_t      offset;    // 内存偏移
    size_t      size;      // 类型大小
    std::string typeName;  // 类型名
};

struct TypeInfo {
    std::string  name;         // 类型名
    size_t       size;         // sizeof(T)
    const TypeInfo* baseType;  // 基类（若有）
    std::vector<FieldInfo> fields;
    std::type_index typeIndex;                   // 用于 Get<T>() 模板查询
    std::function<void*(void*)> factory;          // 工厂函数（P1-2）
};
```

field 支持运行时读写：

```cpp
void*  ptr = field.GetFieldPtr(obj);            // 字段指针
void   field.GetValue(obj, outBuffer);          // 拷贝到缓冲区
void   field.SetValue(obj, value);              // 从缓冲区写入
void*  instance = typeInfo.Create(nullptr);     // 堆构造
void*  instance = typeInfo.Create(&buffer);     // placement new 到指定内存
```

### 成员指针绑定（P1-3）

通过 `SHIT_REFLECT(Type)` 获得 friend 授权后，注册代码可使用成员指针自动推导偏移量和类型大小，无需手动填写 `offsetof` / `sizeof`：

```cpp
// Scanner 生成的注册代码（hasReflect=true 时）
Shit::ReflectType("Player", sizeof(Player))
    .Field("m_hp", &Player::m_hp, "int")
    .Field("m_speed", &Player::m_speed, "float")
    .Register<Player>();
```

底层通过 `memberOffset<T, M>(M T::*member)` 函数计算偏移量，ABI 安全。

### Demangle

`DemangleTypeName(const char* mangled)` 是 `namespace Shit` 下的 free 函数，用于将 `typeid(T).name()` 返回的 ABI mangled 名还原为可读名称。GCC/MinGW 下使用 `abi::__cxa_demangle`，MSVC 下直接返回原名。

### 工厂创建（P1-2）

TypeInfo 支持通过 `Factory<T>()` 注册工厂函数，调用 `typeInfo.Create()` 构造类型实例：

```cpp
Shit::ReflectType("Player", sizeof(Player))
    .Factory<Player>()          // 注册无参构造工厂
    .Register<Player>();

// 使用
void* instance = TypeRegistry::Get("Player")->Create();
// 或 placement new 到指定内存
char buffer[sizeof(Player)];
void* instance = TypeRegistry::Get("Player")->Create(buffer);
```

## 构建集成

### 运行 Scanner

```bash
ReflectionScanner \
    --input Engine/include/ShitEngine/Component \
    --output Engine/generated/reflection \
    --include Engine/include \
    --include <glm_source_dir> \
    --include <sdl3_source_dir>/include \
    --include-root Engine/include
```

参数说明：

| 参数 | 说明 |
|---|---|
| `--input` | 源码目录（递归扫描 `.h`/`.hpp`/`.hxx` 文件） |
| `--output` | 生成 `.gen.h` 的输出目录 |
| `--include` | 附加 `-I` include 路径（可重复） |
| `--system-include` | 附加 `-isystem` 系统头文件路径（可重复） |
| `--include-root` | 从 `sourceFile` 路径中移除的前缀，默认 input 的父目录 |
| `--resource-dir` | libClang resource 目录（含 builtin headers） |

> 说明：第三方库的 include 路径（glm、SDL3）由 CMake FetchContent 决定，CMake 集成（见下节）会自动传入。

### CMake 集成

项目使用 `setup_reflection_scan()` 函数配置 Scanner 调用。该函数由 `Tools/ReflectionScanner/ReflectionScanSetup.cmake` 定义，**须在第三方依赖配置完成后调用**，以便传入 glm 和 SDL3 的 include 路径：

```cmake
# Engine/CMakeLists.txt 中（依赖配置后）
if(BUILD_TOOLS)
    FetchContent_GetProperties(glm)
    FetchContent_GetProperties(SDL3)
    set(_ENGINE_REFLECT_INCS "")
    if(glm_SOURCE_DIR)
        list(APPEND _ENGINE_REFLECT_INCS "${glm_SOURCE_DIR}")
    endif()
    if(SDL3_SOURCE_DIR)
        list(APPEND _ENGINE_REFLECT_INCS "${SDL3_SOURCE_DIR}/include")
    endif()
    setup_reflection_scan(engine
        "${CMAKE_CURRENT_SOURCE_DIR}/include/ShitEngine"
        "${CMAKE_CURRENT_SOURCE_DIR}/generated/reflection"
        "${CMAKE_CURRENT_SOURCE_DIR}/include"
        ${_ENGINE_REFLECT_INCS}
    )
endif()
```

该命令会创建 `reflect-${scope}`（增量）和 `run-reflectionscanner-${scope}`（强制重扫）两个 CMake 目标：

```bash
cmake --build . --target reflect-engine                    # Engine 增量扫描
cmake --build . --target run-reflectionscanner-engine       # Engine 强制重扫
cmake --build . --target reflect-examples                   # Examples 增量扫描
cmake --build . --target run-reflectionscanner-examples     # Examples 强制重扫
```

### 运行时注册

在引擎启动时调用生成的注册函数：

```cpp
// Game::init() 中
TypeRegistry::InitBuiltinTypes();   // 注册 int、float 等内置类型
RegisterAllReflectedTypes();        // 注册 Scanner 扫描到的所有类型
```

`RegisterAllReflectedTypes()` 由 `ReflectionRegisterAll.h`（Scanner 自动生成）提供，该文件 include 了各模块的 `.gen.h` 并调用内部的注册函数。

### 构建目录与 Include 路径

自动生成的 `.gen.h` 文件位于各模块的 `generated/reflection/` 目录下，已通过 CMake 的 `target_include_directories` 加入 include 路径：

```cmake
target_include_directories(ShitEngine PRIVATE
    $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/generated>)
```

## 架构说明

### 构建时流程

```
头文件 (SHIT_CLASS + SHIT_REFLECT)
    │
    ▼
ReflectionScanner (libClang C API)
    │
    ├─ 读取 __attribute__((annotate)) → 发现反射类型
    ├─ AST 遍历 → 提取类名、基类、字段、命名空间
    └─ 检测 SHIT_REFLECT(friend) → 决定成员指针/数值回退
    │
    ▼
Generator → .gen.h + ReflectionRegisterAll.h
    │
    ▼
引擎编译时 include + 链接 → 运行时注册
```

### 运行时数据结构

```
TypeRegistry (单例)
 ├─ m_typeStorage (list<TypeInfo>, 地址稳定)
 ├─ m_nameMap (name → TypeInfo*)
 └─ m_typeIndexMap (type_index → TypeInfo*)
```

`std::list` 保证元素地址稳定，不因后续插入而失效。

### 生成的 .gen.h 结构

以 `TransformComponent` 为例，Scanner 生成的 `TransformComponent.gen.h`：

```cpp
#pragma once

#include <ShitEngine/Component/TransformComponent.h>
#include <ShitEngine/Reflection/TypeRegistry.h>

namespace Shit {
inline bool Register_TransformComponent() {
    const auto* base = Shit::TypeRegistry::Get("Component");
    Shit::ReflectType("TransformComponent", sizeof(TransformComponent))
        .Base(base)
        .Field("m_position",
            &Shit::TransformComponent::m_position, "Vector2")
        .Field("m_scale",
            &Shit::TransformComponent::m_scale, "Vector2")
        .Field("m_rotation",
            &Shit::TransformComponent::m_rotation, "float")
        .Register<TransformComponent>();
    return true;
}
} // namespace Shit
```

`ReflectionRegisterAll.h` 统一包含所有 `.gen.h` 并调用其注册函数：

```cpp
#include "CameraComponent.gen.h"
#include "Component.gen.h"
#include "RendererComponent.gen.h"
#include "TransformComponent.gen.h"

inline void RegisterAllReflectedTypes() {
    Shit::Register_CameraComponent();
    Shit::Register_Component();
    Shit::Register_RendererComponent();
    Shit::Register_TransformComponent();
}
```

## 引擎内置组件的反射标记

引擎核心组件已使用反射宏标记，可通过 `TypeRegistry` 查询：

| 组件 | 标记方式 |
|---|---|
| `Component` | `class SHIT_CLASS(Component, Fields) : ...` |
| `TransformComponent` | `class SHIT_API SHIT_CLASS(TransformComponent, Fields) : public Component` |
| `RendererComponent` | `class SHIT_API SHIT_CLASS(RendererComponent, Fields) : public Component` |
| `CameraComponent` | `class SHIT_API SHIT_CLASS(CameraComponent, Fields) : public Component` |

## 限制

- **Scanner 工具链要求**: 需要安装 LLVM/libClang 并与项目的 MinGW/GCC 编译器版本兼容。全部头文件解析失败时会自动报告并阻断构建
- **枚举不反射**: 当前仅支持 class/struct 标记的反射，enum 不在范围内（与 Piccolo 一致）
- **匿名命名空间不支持**: 若将反射类型放在匿名命名空间中，扫描器将跳过注册（`Get<T>()` 模板查询也会因匿名命名空间的内部链接而导致 type_index 冲突）
- **命名空间剥离**: 基类名从 Scanner 输出时会剥离命名空间前缀（`Shit::Component` → `Component`），要求基类以简短的名字在 TypeRegistry 中注册

## 参考

- 本系统设计参考了 [Piccolo](https://github.com/BoomingTech/Piccolo) 引擎的 meta_parser 反射方案
- 使用了 libClang C API 的 `CXCursor_AnnotateAttr` 实现 AST 注解检测
