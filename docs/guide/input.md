---
title: 输入系统
lang: zh_CN
---

# 输入系统

> 玩家的意图，靠键盘和鼠标传递进来。

ShitEngine 的输入系统基于 SDL3 事件，提供**三态检测**和鼠标位置查询。

所有 API 均为静态方法，直接调用即可，不需要实例化。

---

## 键盘输入

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

### 移动示例

```cpp
void Player::onUpdate() {
    float speed = 200.0f;
    Shit::Vector2 pos = transform->getPosition();

    if (Shit::Input::IsKeyPressed(Shit::KeyCode::W)) pos.y -= speed * Time::GetDeltaTime();
    if (Shit::Input::IsKeyPressed(Shit::KeyCode::S)) pos.y += speed * Time::GetDeltaTime();
    if (Shit::Input::IsKeyPressed(Shit::KeyCode::A)) pos.x -= speed * Time::GetDeltaTime();
    if (Shit::Input::IsKeyPressed(Shit::KeyCode::D)) pos.x += speed * Time::GetDeltaTime();

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
Shit::Input::IsMouseButtonDown(Shit::MouseButton::Left);    // 刚按下
Shit::Input::IsMouseButtonPressed(Shit::MouseButton::Right); // 持续按住
Shit::Input::IsMouseButtonReleased(Shit::MouseButton::Middle); // 松开
```

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

`Input::Update()` 由 `Game::run()` 在每帧开头自动调用。它负责把"当前帧"状态移到"上一帧"，保证三态检测正确。

如果你重写 `Game::run()`，记得在帧首调用：

```cpp
void MyGame::run() {
    while (Window::IsOpen()) {
        Window::HandleEvent();
        Input::Update();   // ← 必须在帧首
        // ... 其余逻辑
    }
}
```
