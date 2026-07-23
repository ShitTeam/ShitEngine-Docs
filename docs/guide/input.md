---
title: 输入系统
lang: zh_CN
---

# 输入系统

> 玩家的意图，靠键盘和鼠标传递进来。

ShitEngine 的输入系统基于 SDL3 事件，提供**两层 API**：

| 层次 | 使用方法 |
|---|---|
| **底层键鼠** | `Input::IsKeyDown(KeyCode::Space)`——直接绑定物理按键 |
| **动作/轴映射** | `Input::IsActionDown("Jump")`——通过 settings.json 配置 |

动作映射让你把「玩法语义」（跳跃、攻击、移动）和物理按键解耦。换键位只需改配置文件，不动游戏代码。

所有 API 均为静态方法，直接调用即可。

---

## 动作映射（Action / Axis）

> 推荐方式。写游戏逻辑时只关心"跳跃"这个动作，不关心它绑了什么键。

### 配置文件

`settings.json` 的 `inputMappings` 段：

```json
{
  "inputMappings": {
    "actions": {
      "Jump":   ["Space"],
      "Attack": ["J", "E"],
      "Sprint": ["LeftShift"],
      "Interact": ["F"]
    },
    "axes": {
      "Horizontal": { "negative": ["A"], "positive": ["D"] },
      "Vertical":   { "negative": ["S"], "positive": ["W"] }
    }
  }
}
```

- **键名**使用 SDL 官方 scancode 名（`Space` / `A` / `Left Shift`），也接受无空格别名（`LeftShift` → 自动处理）
- **鼠标**用 `MouseButton.Left` / `Right` / `Middle` / `XButton1` / `XButton2`
- **多键**：一个动作可绑多个键，任一触发即生效（如 `Attack: ["J", "E"]`）

### 动作查询

```cpp
// 三态检测（同一动作的多个绑定键任一触发即返回 true）
Input::IsActionDown("Jump");      // 刚按下（仅一帧）
Input::IsActionPressed("Sprint"); // 持续按住
Input::IsActionReleased("Jump");  // 松开（仅一帧）

// 轴值（键盘：-1 / 0 / 1）
float h = Input::GetAxis("Horizontal");
float v = Input::GetAxis("Vertical");
```

轴同时按正负两边则抵消为 0（左右同时按 = 原地不动）。

### 动作 vs 底层

| 场景 | 推荐 |
|---|---|
| 跳跃、攻击、交互 | `IsActionDown("Jump")` |
| 移动 | `GetAxis("Horizontal")` |
| 仅调试用（如截图 F12） | `IsKeyDown(KeyCode::F12)` |

---

## 键盘输入（底层）

### 三态模型

```cpp
// 刚按下瞬间（仅那一帧为 true）
Shit::Input::IsKeyDown(Shit::KeyCode::Space);

// 持续按住（每帧都为 true，直到松开）
Shit::Input::IsKeyPressed(Shit::KeyCode::W);

// 松开瞬间（松手那一帧为 true）
Shit::Input::IsKeyReleased(Shit::KeyCode::Escape);
```

::: warning 命名提醒
ShitEngine 中 `IsKeyDown` = 按下瞬间，`IsKeyPressed` = 持续按住。这跟 Unity/Godot 的命名习惯相反，但这是引擎的既有约定。
:::

**常见搭配**：

| 场景 | 用哪个 | 为什么 |
|---|---|---|
| 移动 | `IsKeyPressed` | 按住持续移动，松手停 |
| 跳跃 | `IsKeyDown` | 只跳一次，不连跳 |
| 暂停切换 | `IsKeyDown` | 按一次切换，防重复触发 |
| 蓄力技能 | `IsKeyPressed` + 计时器 | 按住时间越长越强 |

### 移动示例（轴映射写法）

```cpp
void Player::onUpdate() {
    float speed = 200.0f;
    // 优先读轴映射（settings.json 中的 Horizontal/Vertical）
    float h = Input::GetAxis("Horizontal");
    float v = Input::GetAxis("Vertical");
    pos.x += h * speed * Time::GetDeltaTime();
    pos.y -= v * speed * Time::GetDeltaTime();
    transform->setPosition(pos);
}
```

### KeyCode

键码基于 SDL3 扫描码，对应物理键盘位置（与键盘布局无关）：

```cpp
// 字母键
Shit::KeyCode::A ... Shit::KeyCode::Z

// 数字键（顶排）
Shit::KeyCode::Num1 ... Shit::KeyCode::Num0

// 方向键
Shit::KeyCode::Up / Down / Left / Right

// 功能键
Shit::KeyCode::F1 ... Shit::KeyCode::F24

// 修饰键
Shit::KeyCode::LCtrl / LShift / LAlt / LGui
Shit::KeyCode::RCtrl / RShift / RAlt / RGui

// 常用
Shit::KeyCode::Space / Escape / Return / Tab / Backspace / Delete
```

---

## 鼠标输入

鼠标按键同样支持三态：

```cpp
Shit::Input::IsMouseButtonDown(Shit::MouseButton::Left);
Shit::Input::IsMouseButtonPressed(Shit::MouseButton::Right);
Shit::Input::IsMouseButtonReleased(Shit::MouseButton::Middle);
```

在配置文件中用 `MouseButton.Left` 等字符串绑定。

### MouseButton

```cpp
Shit::MouseButton::Left      // 左键
Shit::MouseButton::Right     // 右键
Shit::MouseButton::Middle    // 中键（滚轮按下）
Shit::MouseButton::XButton1  // 侧键 1
Shit::MouseButton::XButton2  // 侧键 2
```

### 鼠标位置

```cpp
Shit::Vector2 mousePos = Shit::Input::GetMousePosition();
```

配合 `CameraComponent::screenToWorld` 可以把屏幕坐标转换成世界坐标：

```cpp
auto* cam = camera->getComponent<Shit::CameraComponent>();
Shit::Vector2 worldPos = cam->screenToWorld(Shit::Input::GetMousePosition());
```

### 滚轮

```cpp
Shit::Vector2 scroll = Shit::Input::GetMouseScroll();
// scroll.x = 水平滚动，scroll.y = 垂直滚动
```

### 点击检测示例

```cpp
void Clickable::onUpdate() {
    if (Shit::Input::IsMouseButtonDown(Shit::MouseButton::Left)) {
        Shit::Vector2 mouse = Shit::Input::GetMousePosition();
        SDL_FRect bounds = getOwner()->getComponent<SpriteRenderer>()->getGlobalBounds();

        if (mouse.x >= bounds.x && mouse.x <= bounds.x + bounds.w &&
            mouse.y >= bounds.y && mouse.y <= bounds.y + bounds.h) {
            // 点中了
            EventBus::Emit(ClickEvent{getOwner()});
        }
    }
}
```

---

## 更新时机

输入系统的初始化和每帧更新由 `Game::run()` 自动处理，你不需要手动调用：

```
Game::Init()
  → Config::Init()           加载 settings.json
  → Input::InitMappings()    预编译 inputMappings 绑定

每帧：
  PollEvent → SceneManager::Update → Input::Update（帧末翻页） → Present
```

- `Input::Update` 在 `SceneManager::Update` **之后**调用——Behavior 的 `onUpdate` 里能读到准确的 Down/Pressed/Released
- `InitMappings` 在 Config 加载之后、SDL 初始化之后调用，保证配置就绪
