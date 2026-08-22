---
title: 反射系统
lang: zh_CN
---

# 反射系统

ShitEngine 提供一套基于 **libClang** 的编译期反射系统。开发者只需在类/结构体上添加宏标记，ReflectionScanner 工具自动解析源码并生成注册代码。

## 概述

反射系统的核心由两部分构成：

| 阶段 | 组件 | 作用 |
|---|---|---|
| **构建时** | `ReflectionScanner`（基于 libClang C API） | 解析被宏标记的头文件，生成 `.gen.h` 注册代码 |
| **运行时** | `TypeRegistry` | 全局单例，存储所有已注册类型的元信息，支持名称和 `type_index` 查询 |

## 快速示例

```cpp
// BlackList 模式：反射全部字段，SHIT_META(Disable) 标记的除外
class SHIT_API SHIT_REFLECT(BlackList) Player : public Component {
    SHIT_REFLECT_BODY(Player)
public:
    SHIT_META(({.displayName = "HP", .range = {0, 9999}}))
    int m_hp = 100;

    float m_speed = 5.0f;  // 默认反射

    SHIT_META(Disable)
    int m_internalId = 0;  // 被排除
};
```

## 宏 API

### SHIT_REFLECT(Mode)

标记需要反射的类/结构体。放在 `class`/`struct` 关键字之后、类名之前。

```cpp
class SHIT_API SHIT_REFLECT(BlackList) MyComponent : Component {
    SHIT_REFLECT_BODY(MyComponent)
```

**模式：**

| 模式 | 含义 |
|------|------|
| `BlackList` | 反射全部字段，`SHIT_META(Disable)` 标记的除外（opt-out，推荐引擎组件用） |
| `WhiteList` | 仅反射 `SHIT_META(Enable)` 标记的字段（opt-in，推荐用户脚本用） |

向后兼容：`Fields` ≈ `BlackList`，`WhiteListFields` ≈ `WhiteList`。

### SHIT_REFLECT_BODY(Type)

放在类体内，展开为 `friend bool Register_Type();`。授予生成的注册代码访问 private/protected 成员的权限（通过成员指针取 offset，ABI 安全）。

```cpp
class SHIT_API SHIT_REFLECT(BlackList) MyComponent : Component {
    SHIT_REFLECT_BODY(MyComponent)  // ← 必须有
```

### SHIT_META

字段级别的标记，放在字段声明上方。

| 写法 | 作用 |
|------|------|
| `SHIT_META(Enable)` | 在 `WhiteList` 模式下显式启用该字段的反射 |
| `SHIT_META(Disable)` | 在 `BlackList` 模式下显式排除该字段 |
| `SHIT_META(({...}))` | 结构化元数据（编辑器属性面板显示用） |

### SHIT_ENUM(Type)

标记枚举类型为反射类型，放在 `enum`/`enum class` 关键字之后。

```cpp
enum class SHIT_ENUM(MoveMode) MoveMode {
    Walk, Run, Sprint
};
```

Scanner 自动提取枚举常量名称与数值，生成 `.Value("Walk", 0)` 等注册代码。

### 编译器兼容性

`__attribute__((annotate))` 是 Clang 的扩展属性，libClang 解析器（定义 `__clang__`）能识别。对 GCC/MSVC 编译器，该属性退化为空，不影响编译结果。

## 结构化元数据

`SHIT_META(({...}))` 使用 C++20 designated initializer 语法，为编辑器提供字段属性显示信息：

```cpp
SHIT_META(({
    .displayName = "生命值",    // 属性面板显示名
    .tooltip     = "当前 HP",   // 悬停提示
    .range       = {0, 9999},  // 数值范围
    .step        = 1.0,        // 步长
    .unit        = "HP",       // 显示单位
    .category    = "Stats",    // 属性分组
    .readOnly    = false       // 是否只读
}))
```

双括号语法：外层 `()` 保护内部逗号不被预处理器拆分，内层 `{...}` 是 `FieldMeta` 结构体的初始化器。

运行时对应的结构体：

```cpp
struct RangeMeta {
    float min = 0.0f;
    float max = 0.0f;
};

struct FieldMeta {
    std::string displayName;   // 属性面板显示名（空 = 用字段名）
    std::string tooltip;       // 悬停提示
    RangeMeta   range;         // 数值范围（min==max 表示不限制）
    float       step = 0.0f;   // 步长（0 表示默认）
    std::string category;      // 属性分组
    bool        readOnly = false;
    std::string unit;          // 显示单位（如 "px"、"m/s"）
};

struct FieldInfo {
    std::string name;
    size_t      offset = 0;
    size_t      size   = 0;
    std::string typeName;
    std::vector<FieldMeta> meta;  // ← 编辑器元数据
};
```

## 运行时 API

### TypeRegistry

```cpp
// 初始化内置类型（int、float、std::string 等），在 Game::Init() 中自动调用
TypeRegistry::InitBuiltinTypes();

// 查询
const TypeInfo* t = TypeRegistry::Get("Player");        // 按名称（string_view）
const TypeInfo* t = TypeRegistry::Get<Player>();         // 按 type_index（模板）
size_t count      = TypeRegistry::Count();               // 注册总数
TypeRegistry::ForEach([](const TypeInfo& info) { ... }); // 遍历

// 反注册（插件卸载时使用）
TypeRegistry::UnregisterType("MyPluginType");

// 注册所有类型后解析基类引用（消除 SIOF）
TypeRegistry::ResolveBases();
```

手动注册（当没有运行 Scanner 或在运行时构造类型时）：

```cpp
Shit::ReflectType("Player", sizeof(Player))
    .Base(TypeRegistry::Get("Component"))
    .Field("m_hp",    &Player::m_hp,    "int")
    .Field("m_speed", &Player::m_speed, "float")
    .Meta(FieldMeta{.displayName = "HP", .range = {0, 9999}})
    .Factory<Player>()
    .Register<Player>();
```

### TypeInfo

```cpp
struct EnumValue {
    std::string name;      // 枚举项名称
    int64_t     value;     // 枚举项数值
};

struct TypeInfo {
    std::string  name;
    size_t       size = 0;
    const TypeInfo* baseType;
    std::string  baseTypeName;         // 延迟解析的基类名（消除 SIOF）
    std::vector<FieldInfo> fields;
    std::vector<EnumValue> enumValues; // 枚举常量列表
    std::type_index typeIndex;
    std::function<void*(void*)> factory;

    void* Create(void* memory = nullptr) const;  // 工厂创建
};
```

### 字段运行时读写

```cpp
void*  ptr = field.GetFieldPtr(obj);            // 字段指针
void   field.GetValue(obj, outBuffer);          // 拷贝到缓冲区
void   field.SetValue(obj, value);              // 从缓冲区写入
void*  instance = typeInfo.Create(nullptr);     // 堆构造
void*  instance = typeInfo.Create(&buffer);     // placement new
```

## 枚举反射

```cpp
// 定义
enum class SHIT_ENUM(MoveMode) MoveMode {
    Walk, Run, Sprint
};

// 生成的注册代码
Shit::ReflectType("MoveMode", sizeof(MoveMode))
    .Value("Walk", 0)
    .Value("Run", 1)
    .Value("Sprint", 2)
    .Register<MoveMode>();  // 无 Factory（枚举不可 new）

// 运行时查询
const TypeInfo* ti = TypeRegistry::Get("MoveMode");
for (auto& v : ti->enumValues)
    // v.name, v.value
```

## 引擎内置反射组件

引擎核心组件已使用 `SHIT_REFLECT(BlackList)` 标记：

| 组件 | 禁用字段（SHIT_META(Disable)） | 编辑器可见字段 |
|------|------|------|
| `Component` | — | `m_owner`, `m_isRegistered` (readOnly) |
| `Behavior` | — | `m_isStarted` (readOnly) |
| `TransformComponent` | — | `m_position`, `m_scale`, `m_rotation` |
| `CameraComponent` | — | `m_worldSize`, `m_zoom`, `m_priority`, `m_viewportRatio` |
| `RendererComponent` | — | `m_zIndex`, `m_isVisible` |
| `SpriteRenderer` | — | `m_sprite` (readOnly) |
| `AnimationComponent` | `m_animations`, `m_currentAnimation` | `m_currentAnimationName`, `m_currentTime`, `m_isPlaying`, `m_isPaused` (readOnly) |
| `RigidBody2D` | `m_bodyIndex`, `m_bodyWorld0`, `m_bodyGeneration`, `m_bodyValid` | `m_type`, `m_gravityScale`, `m_linearDamping`, `m_fixedRotation` |
| `BoxCollider2D` | `m_shapeIndex`, `m_shapeWorld0`, `m_shapeGeneration`, `m_shapeValid` | `m_size`, `m_density`, `m_friction`, `m_restitution` |
| `CircleCollider2D` | `m_shapeIndex`, `m_shapeWorld0`, `m_shapeGeneration`, `m_shapeValid` | `m_radius`, `m_density`, `m_friction`, `m_restitution` |
| `UITransform` | — | `m_anchorMin`, `m_anchorMax`, `m_pivot`, `m_anchoredPosition`, `m_width`, `m_height`, `m_zIndex` |
| `UICanvas` | — | `m_sortOrder` |
| `UIRendererComponent` | — | `m_zIndex`, `m_isVisible` |
| `UIImage` | — | `m_sprite` (readOnly), `m_color` |
| `UIText` | `m_cachedTexture`, `m_isDirty` | `m_text`, `m_fontPath`, `m_fontSize`, `m_color`, `m_anchor` |
| `UIButton` | `m_state`, `m_isPointerInside`, `m_isPressed`, `m_colors`, `m_onClick` | `m_interactable` |
| `UITextInput` | `m_isFocused`, `m_isMultiline`, `m_fontHeight`, `m_isDirty`, `m_cursor`, `m_selectionAnchor`, `m_preedit`, `m_preeditStart`, `m_preeditLength` | `m_text`, `m_placeholder`, `m_fontPath`, `m_fontSize`, `m_textColor`, `m_placeholderColor`, `m_cursorColor`, `m_selectionColor` |
| `UITextArea` | `m_scrollY` | — |
| `UITextBox` | — | `m_characterLimit` |
| `Tilemap` | `m_tiles`（运行时网格） | `m_texturePath`, `m_tileWidth/Height`, `m_gridWidth/Height`, `m_tileWorldSize`, `m_gridData` |
| `Animator` | 状态/参数/转换容器、当前状态、`m_dataGeneration` | `m_animatorData`（状态机 JSON 载体）、`m_currentStateDisplay`（readOnly） |
| `AnimationComponent` | 运行时动画表 | `m_clipsData`（剪辑 JSON 载体）、只读展示字段 |
| `Joint2D` | `m_jointIndex/World0/Generation`、`m_jointValid` | `m_type`, `m_connectedBody`（引用字段）, `m_anchor`, 各关节参数 |
| `AudioSource` | `m_track`（运行时句柄） | `m_audioPath`, `m_loop`, `m_volume`, `m_playOnStart` |

## 反射任意类（不限于 Component）

扫描器**不限制基类**——任何标了 `SHIT_REFLECT` 的类都会被注册（有默认构造即生成工厂）。`System` 基类已反射，`System` 派生类加反射标记后就能被编辑器「添加系统」菜单收集、在检查器里编辑字段、随 `.scene` 序列化：

| 系统 | 禁用字段（SHIT_META(Disable)） | 编辑器可见字段 |
|------|------|------|
| `System`（基类） | `m_priority`, `m_scene` | —（WhiteList 无字段） |
| `BehaviorSystem` / `RenderSystem` / `UIRenderSystem` | — | —（WhiteList 无字段，默认三系统） |
| `PhysicsSystem2D` | `m_bodies`/`m_joints`/`m_activeContacts`/`m_accumulator`/`m_worldIndex`/`m_worldGeneration`/`m_initialized` | `m_gravity`（Vector2）, `m_pixelsPerMeter`（float） |

系统字段被编辑器/反序列化写入后触发 `System::onFieldChanged(fieldName)`（类似组件的 `onFieldChanged`）——在其中把变更同步到运行时状态（如 `PhysicsSystem2D` 把重力写回 Box2D 世界）。自定义系统示例见[场景管理 · 写一个自己的系统](/guide/scene#写一个自己的系统)。

## 序列化注意事项

引擎的序列化（Prefab / `.scene` / 检查器）基于反射字段，有几个约定：

- **引用字段**：`ComponentRef<T>`（存目标组件 UUID，懒解析、永不悬垂）被扫描器自动识别为引用字段（`FieldInfo::refType`），检查器渲染为拖拽引用控件、序列化存 UUID。见[游戏对象与组件](/guide/game-objects)
- **可变长度容器**：反射不支持 `std::vector` 等动态容器字段（按 offset+size+memcpy 处理固定 POD）。惯用法是"**序列化载体字符串**"——容器字段标 `SHIT_META(Disable)`（运行时高效存储），另配一个反射 `std::string` 字段作持久化载体（如 Tilemap 的 `m_gridData`、Animator 的 `m_animatorData`、AnimationComponent 的 `m_clipsData`），`onAfterDeserialize` / `onFieldChanged` 双向同步
- **`readOnly` 陷阱**：标 `readOnly` 的字段会被 Prefab 序列化**跳过**——需要落盘的数据即使不该在编辑器编辑，也不能标 `readOnly`（改用 `SHIT_META(Disable)` 排除或用只读展示字段）
- 修改带反射宏的头文件后需重新生成 `.gen.h`（`BUILD_TOOLS=ON` 构建时自动，否则 `cmake --build . --target run-reflectionscanner`）

## 编译期校验（Static Assertions）

从 v1.3 开始，`ReflectionScanner` 会在生成的 `.gen.h` 中注入 `static_assert` 语句，在编译时验证反射数据与 C++ 结构体布局的一致性：

```cpp
static_assert(sizeof(UITextInput) == 216,
    "UITextInput: size mismatch - regenerate reflection data");
static_assert(offsetof(UITextInput, m_text) == 32,
    "UITextInput::m_text: offset mismatch - regenerate reflection data");
```

如果你修改了结构体字段（增/删/重排）但忘记重新运行 Scanner，编译会直接报错并指出哪个字段偏移不匹配。

> **注意**：对包含 `glm::vec2`（`Vector2`）等外部库类型的结构体，libClang 无法准确计算字段偏移，Scanner 会自动跳过这些类型的 `static_assert` 生成。运行时成员指针路径不受影响。|

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

### CMake 集成

```cmake
if(BUILD_TOOLS)
    setup_reflection_scan(engine
        "${CMAKE_CURRENT_SOURCE_DIR}/include/ShitEngine"
        "${CMAKE_CURRENT_SOURCE_DIR}/generated/reflection"
        "${CMAKE_CURRENT_SOURCE_DIR}/include"
    )
endif()
```

该命令会创建 `reflect-${scope}`（增量）和 `run-reflectionscanner-${scope}`（强制重扫）两个 CMake 目标：

```bash
cmake --build . --target reflect-engine                # Engine 增量扫描
cmake --build . --target run-reflectionscanner-engine   # Engine 强制重扫
```

### 运行时注册

```cpp
// Game::init() 中
TypeRegistry::InitBuiltinTypes();   // 注册 int、float 等内置类型
RegisterAllReflectedTypes();        // 注册 Scanner 扫描到的所有类型（末尾自动调用 ResolveBases）
```

`RegisterAllReflectedTypes()` 由 `ReflectionRegisterAll.h`（Scanner 自动生成）提供。

## 架构说明

### 构建时流程

```
头文件 (SHIT_REFLECT + SHIT_REFLECT_BODY)
    │
    ▼
ReflectionScanner (libClang C API)
    │
    ├─ AST 遍历 → 发现 __attribute__((annotate)) 标记
    ├─ 解析类/结构体/枚举 → 字段、基类、枚举常量
    └─ 检测 SHIT_REFLECT_BODY(friend) → 决定成员指针/数值回退
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
 ├─ m_typeStorage (deque<TypeInfo>, 地址稳定)
 ├─ m_nameMap (name → TypeInfo*)
 └─ m_typeIndexMap (type_index → TypeInfo*)
```

`std::deque` 保证元素地址稳定，不因后续插入而失效，缓存局部性优于 `std::list`。

### 生成的 .gen.h 结构

以 `TransformComponent` 为例：

```cpp
namespace Shit {
inline bool Register_TransformComponent() {
    Shit::ReflectType("TransformComponent", sizeof(TransformComponent))
        .Base("Component")
        .Field("m_position", &Shit::TransformComponent::m_position, "Vector2")
        .Meta(FieldMeta{.displayName = "Position"})
        .Field("m_scale", &Shit::TransformComponent::m_scale, "Vector2")
        .Meta(FieldMeta{.displayName = "Scale", .range = {0, 10}, .step = 0.1})
        .Field("m_rotation", &Shit::TransformComponent::m_rotation, "float")
        .Meta(FieldMeta{.displayName = "Rotation", .range = {-360, 360}})
        .Factory<TransformComponent>()
        .Register<TransformComponent>();
    return true;
}
} // namespace Shit
```

### SIOF 处理

基类引用采用延迟解析策略：生成的 `.gen.h` 中 `.Base("Component")` 只记录基类名称字符串，在 `Register<T>()` 时尝试立即解析。所有类型注册完成后，`RegisterAllReflectedTypes()` 末尾自动调用 `TypeRegistry::ResolveBases()` 统一解析未链接的基类引用，彻底消除静态初始化顺序脆弱性。

## 限制

- **Scanner 工具链要求**: 需要安装 LLVM/libClang 并与项目的 MinGW/GCC 编译器版本兼容
- **匿名命名空间不支持**: 扫描器会跳过匿名命名空间中的类型
- **命名空间剥离**: 基类名会剥离命名空间前缀（`Shit::Component` → `Component`）

## 参考

- 本系统设计参考了 [Piccolo](https://github.com/BoomingTech/Piccolo) 引擎的 meta_parser 反射方案
- 使用了 libClang C API 的 `CXCursor_AnnotateAttr` 实现 AST 注解检测
