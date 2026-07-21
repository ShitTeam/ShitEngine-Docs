---
title: UI 系统
lang: zh_CN
---

# UI 系统

> 一套 retained-mode 的屏幕空间 UI 系统，参考 Unity uGUI 的锚点定位，但不引入 Canvas Scaler 的复杂度。

## 总览

ShitEngine 内置了一套与游戏世界**分离**的 UI 渲染管线。所有 UI 控件都是 Component，挂在 GameObject 上，由 `UIRenderSystem` 统一驱动。设计目标：按钮、文字、图片、输入框——够用、好用、不折腾。

UI 系统在游戏世界**之上**叠加绘制，走独立的渲染通道，不受相机/视口/空间坐标影响。

```
游戏世界（RenderSystem）
   ↓ 每帧先画
UI（UIRenderSystem，优先级 200）
   ↓ 叠加画在游戏世界之上
Renderer::Present()
```

### 什么时候用它

- HUD：血条、分数、子弹计数
- 菜单：主菜单、暂停菜单、设置面板
- 交互元素：按钮、开关、文字标签
- 文本输入：登录框、聊天栏、搜索框

这套系统**不**适合：
- 世界空间中的 UI（比如 NPC 头顶的名字）——请用 `SpriteRenderer` 的精灵
- 复杂的富文本排版或窗体布局——后续扩展

---

## 核心思路

UI 元素是一些绑定到屏幕坐标的 Rect，按 **Z-Index** 堆叠排列。你的工作就是回答三个问题：

1. **在哪** → `UITransform`（锚点 + 偏移 + 尺寸）
2. **画什么** → `UIImage` / `UIText`
3. **能不能点 / 能不能输入** → `UIButton` / `UITextBox`

一个典型的 UI 元素长这样：

```cpp
auto* go = scene->createGameObject("Button");
go->setParent(canvasGO);                    // 父级层级（影响锚点定位）
go->addComponent<Shit::UITransform>(...);   // 位置、尺寸
go->addComponent<Shit::UIImage>(...);       // 显示图片
go->addComponent<Shit::UIButton>();         // 可交互
```

---

## UITransform — 定位与尺寸

`UITransform` 和游戏世界的 `TransformComponent` 不同，它只描述**屏幕空间**的矩形。

### 锚点（Anchor）

锚点是个巧妙的设计：定位相对于**父级矩形**的某个点，而不是绝对坐标。父级矩形的查找路径是：沿 GameObject 父链找最近的 `UITransform` → 若没有，用 `UICanvas` 的屏幕矩形。

属性 | 类型 | 说明
---|---|---
`anchorMin` | `(0,0)` ~ `(1,1)` | 锚点矩形**左上**角（归一化，相对父级）————SDL 的 Y 轴向下，(0,0) 是父级左上角
`anchorMax` | `(0,0)` ~ `(1,1)` | 锚点矩形**右下**角（归一化，相对父级）————(1,1) 是父级右下角
`pivot` | `(0,0)` ~ `(1,1)` | 轴心（归一化，相对自身），默认 `(0.5, 0.5)` 居中
`anchoredPosition` | `(float, float)` | 相对锚点中心的偏移（像素）
`width / height` | `float` | 自身尺寸

**当 `anchorMin == anchorMax`**：元素不拉伸，尺寸由 `width/height` 决定，`anchoredPosition` 相对这个锚点偏移。

**当 `anchorMin != anchorMax`**：元素沿该轴**拉伸**填充父级区间，`width/height` 在该轴被忽略。

#### 常见锚点模式

```cpp
// 居中（锚点在屏幕正中，不拉伸）
tf->setAnchorMin({0.5f, 0.5f});
tf->setAnchorMax({0.5f, 0.5f});
tf->setAnchoredPosition({0.0f, 0.0f});  // 精确居中
tf->setAnchoredPosition({0.0f, 50.0f}); // 屏幕正中偏下 50 像素

// 左上角（锚点在左上，不拉伸）
tf->setAnchorMin({0.0f, 0.0f});
tf->setAnchorMax({0.0f, 0.0f});
tf->setAnchoredPosition({10.0f, 10.0f}); // 左上角偏移 (10, 10)

// 左侧拉伸面板（从左边到 1/4 宽度，全高）
tf->setAnchorMin({0.0f, 0.0f});
tf->setAnchorMax({0.25f, 1.0f});

// 底部分隔栏（锚在底部，占满宽度）
tf->setAnchorMin({0.0f, 0.0f});
tf->setAnchorMax({1.0f, 0.1f});
```

### 父子层级

`UITransform` 的父级矩形通过 **GameObject 的父子关系** 查找：

```cpp
// Canvas 是根
auto* canvas = scene->createGameObject("Canvas");
canvas->addComponent<Shit::UITransform>(0, 0, Renderer::GetLogicalWidth(), Renderer::GetLogicalHeight());
canvas->addComponent<Shit::UICanvas>();

auto* btn = scene->createGameObject("Button");
btn->setParent(canvas);  // 按钮的 UITransform 会以 Canvas 的矩形为父级
```

最多能穿透多少层？不限制。每帧沿父链自动查找，不需要你维护任何引用。

### 计算原理

```
屏幕矩形 = (锚点中点 + anchoredPosition - pivot × 尺寸, 尺寸)
```

拉伸轴的 `尺寸` = 锚点区间在父级矩形中的跨度；非拉伸轴用 `width/height`。

---

## UICanvas — UI 层级根

`UICanvas` 是 UI 树的根节点。挂在作为 UI 父级的 GameObject 上。它的 `getScreenRect()` 返回渲染器的逻辑分辨率矩形（ScreenSpaceOverlay 模式）。

```cpp
auto* canvas = scene->createGameObject("Canvas");
canvas->addComponent<Shit::UITransform>(...);  // 尺寸通常填逻辑分辨率
canvas->addComponent<Shit::UICanvas>();
```

`UICanvas` 有一个 `sortOrder` 属性用于多 Canvas 排序（当前只记录，后续多 Canvas 扩展时生效）。

---

## UIImage — 显示图片

在屏幕矩形内绘制一张 `Sprite`。支持颜色叠加（ColorMod），这是 UIButton 状态变色的基础。

```cpp
auto* image = go->addComponent<Shit::UIImage>("textures/ui/button.png");
image->setColor({120, 180, 255, 255});  // 调成蓝色调
```

支持 `setSourceRect`（精灵图集裁剪）和 `setFlipped`（水平翻转），和游戏世界的 `SpriteRenderer` 一样。

---

## UIText — 文字渲染

使用 **SDL_ttf** 渲染文字。纹理缓存机制：`setText`、`setFontSize`、`setColor` 时标记 dirty，下次渲染重建纹理。

```cpp
auto* text = go->addComponent<Shit::UIText>("Hello World", "fonts/arial.ttf", 24);
text->setColor({255, 255, 255, 255});
```

### 纹理缓存

每次调用 `setText()` 或 `setFontSize()`、`setColor()` 都会**置 dirty**，下一帧调用 `TTF_RenderText_Blended` → `SDL_CreateTextureFromSurface` 重建。避免高频重建，性能可控。

### 对齐

```cpp
text->setAnchor(Shit::UIText::TextAnchor::Center);  // 居中（默认）
text->setAnchor(Shit::UIText::TextAnchor::Left);     // 左对齐
text->setAnchor(Shit::UIText::TextAnchor::Right);    // 右对齐
```

对齐是相对 `UITransform` 的屏幕矩形的水平方向，垂直永远居中。

### 动态更新

```cpp
text->setText("Score: " + std::to_string(score));
// → 自动置 dirty，下一帧纹理重建，画面更新
```

---

## UIButton — 可交互按钮

检测鼠标点击、响应状态变化、触发回调。采用 **ColorTint** 视觉反馈——通过改写同 GameObject 上 `UIImage` 的 `color` 实现状态过渡。

### 状态机

```
Normal ↔ Highlighted（悬停）→ Pressed（按下）→ 释放触发 onClick
                                        ↓
               释放时在按钮外 → 回到 Normal
               释放时在按钮内 → Highlighted + onClick
```

### 完整用法

```cpp
auto* btn = scene->createGameObject("StartButton");
btn->setParent(canvas);
btn->addComponent<Shit::UITransform>(0.0f, 0.0f, 240.0f, 64.0f);

auto* image = btn->addComponent<Shit::UIImage>("button.png");
auto* button = btn->addComponent<Shit::UIButton>();

// 自定义状态颜色
Shit::UIButton::ColorBlock colors;
colors.normalColor      = {120, 180, 255, 255};  // 正常蓝
colors.highlightedColor = {200, 230, 255, 255};  // 悬停亮蓝
colors.pressedColor     = { 80, 130, 200, 255};  // 按下深蓝
colors.disabledColor    = {128, 128, 128, 128};  // 灰色不可用
button->setColors(colors);

button->setOnClick([]() {
    Shit::ST_INFO("按钮被点击！");
});
```

### 交互控制

```cpp
button->setInteractable(false);  // 禁用（变为灰色）
button->setInteractable(true);   // 启用
```

---

## UITextInput 系列 — 文本输入

引擎内置了一套完整的文本输入控件体系，支持 IME（中文输入法）、光标、选区、占位符：

```
UITextInput（抽象基类）
  ├── UITextBox（单行输入框）
  └── UITextArea（多行输入区域）
```

### UITextBox — 单行输入框

```cpp
auto* go = scene->createGameObject("Input");
go->setParent(canvas);
go->addComponent<Shit::UITransform>(0.0f, 0.0f, 400.0f, 48.0f);
go->addComponent<Shit::UIImage>("input_bg.png");    // 背景图（可选）

auto* input = go->addComponent<Shit::UITextBox>();
input->setFontPath("fonts/NotoSansSC-Regular.ttf"); // 建议使用中文字体
input->setFontSize(22.0f);
input->setPlaceholder("Type here...");               // 占位符（空文本且未聚焦时显示）
input->setTextColor({30, 30, 30, 255});              // 文字颜色
input->setPlaceholderColor({140, 140, 140, 255});   // 占位符颜色
input->setCharacterLimit(20);                        // 最大字符数（0=不限）
```

#### 输入方式

- **文字键**：通过 SDL 的 `SDL_EVENT_TEXT_INPUT` 接收 UTF-8 文本（支持英文、中文、标点等所有 Unicode 字符）
- **方向键**：`←` `→` 逐字移动光标，`Home` `End` 跳到行首/行尾
- **Shift+方向键**：扩展选区
- **退格/删除**：`Backspace` 删除光标前字符，`Delete` 删除光标后字符
- **选区替换**：有选区时打字/粘贴会用新内容替换选区
- **Esc**：释放输入焦点

#### IME 中文输入

系统在聚焦时自动调用 `SDL_StartTextInput()` 激活 IME，组合阶段的未提交文字会以**灰色 + 下划线**的形式在光标位置显示。提交后自动插入已提交文本。

### UITextArea — 多行输入区域

```cpp
auto* area = scene->createGameObject("TextArea");
area->setParent(canvas);
area->addComponent<Shit::UITransform>(0.0f, 0.0f, 400.0f, 200.0f);

auto* input = area->addComponent<Shit::UITextArea>();
input->setFontPath("fonts/NotoSansSC-Regular.ttf");
input->setFontSize(18.0f);
```

多行模式额外支持：

- **回车**：插入换行符 `\n`，文本按行拆分渲染
- **上/下方向键**：按逻辑行（`\n` 分割）移动光标，尽量保持列位置
- **选区跨行**：选区可以跨越多个行

#### 视觉呈现

```
┌─────────────────────────────────────┐
│ 在这里输入...       [占位符]         │
│                                      │
│ Hello World█        [光标闪烁]       │
│ ─────────           [选区高亮]       │
│                      [ime组合下划线] │
│ Hello World                          │
└─────────────────────────────────────┘
```

光标每 500ms 闪烁一次，IME 组合阶段渲染灰色预编辑文字并在下方画下划线。

### 聚焦管理

文本输入控件的聚焦由 `TextInputGate`（进程级单例）和 `UIRenderSystem` 协同管理：

```
点击输入框       → UIRenderSystem 检测命中 → TextInputGate.requestFocus()
  → SDL_StartTextInput(window) → 开始接收 TEXT_INPUT 事件
  → 光标闪烁，键盘输入有效

点击空白区域     → UIRenderSystem 检测未命中 → TextInputGate.clearFocus()
  → SDL_StopTextInput(window) → 停止接收文本事件
  → 输入框失焦，光标消失

点击按钮等控件   → 不夺走输入框焦点（可同时保持输入状态）
```

聚焦管理不对 UIButton 等非输入控件造成影响。

### 字符数限制

`UITextBox` 支持通过 `setCharacterLimit(n)` 限制输入字符数：

```cpp
input->setCharacterLimit(16);  // 最多输入 16 个 UTF-8 字符
```

超出限制时新字符被静默拒绝，删除或选区替换后才允许继续输入。`limit = 0` 表示不限制。

### 注意事项

- **字体**：显示中文需要加载支持 CJK 字形的字体（如 NotoSansSC、SourceHanSans 等），默认的 Roboto 不含中文字形。
- **字体缓存**：所有 UIText / UITextInput 系列共用 `ResourceManager::GetFont(path, size)` 缓存，同路径+字号只加载一次。
- **输入框默认不自绘背景**：背景由同 GameObject 上的 `UIImage` 提供（与按钮一致），你也可通过 `setTextColor` 自行设色。

---

## UIRenderSystem — 排序、命中检测、渲染

`UIRenderSystem` 是一个系统（System），优先级 **200**，在 `RenderSystem`（100）之后执行。不需要手动创建——`scene->init()` 会自动注册。

### 每帧流程

```
1. 按 zIndex 排序 m_uiRenderers
2. 输入 Raycasting：
   a. 从上到下遍历所有可见控件
   b. 第一个命中鼠标位置的 → 记录为 hovered
3. 按钮状态更新：
   a. 遍历所有含 UIButton 的 GameObject
   b. 如果命中 → onPointerEnter/onPointerDown/onPointerUp
   c. 如果没命中 → onPointerExit
4. 输入框聚焦管理：
   a. 如果鼠标按下且命中输入框 → TextInputGate.requestFocus
   b. 如果鼠标按下且未命中任何 UI → TextInputGate.clearFocus
5. 渲染：
   a. 恢复全屏裁剪和视口（RenderSystem 可能留下了相机剪裁）
   b. 按 zIndex 从下到上逐个调用 onRender
```

### 自动注册

所有 `UIRendererComponent` 的 `onAttach` / `onDetach` **自动**向 `UIRenderSystem` 注册 / 注销。你不需要手动管理列表。

---

## 完整示例

这是一个完整的 UI 场景——Canvas + 标题 + 可点击按钮 + 输入框：

```cpp
#include <ShitEngine.h>

int main() {
    Shit::Game::Init();

    auto scene = std::make_unique<Shit::Scene>("MainMenu");
    scene->init();

    // ── Canvas ──
    auto* canvas = scene->createGameObject("Canvas");
    canvas->addComponent<Shit::UITransform>(0.0f, 0.0f,
        static_cast<float>(Shit::Renderer::GetLogicalWidth()),
        static_cast<float>(Shit::Renderer::GetLogicalHeight()));
    canvas->addComponent<Shit::UICanvas>();

    // ── 标题 ──
    auto* title = scene->createGameObject("Title");
    title->setParent(canvas);
    auto* tf = title->addComponent<Shit::UITransform>(0.0f, 0.0f, 320.0f, 60.0f);
    tf->setAnchorMin({0.5f, 0.8f});
    tf->setAnchorMax({0.5f, 0.8f});
    title->addComponent<Shit::UIText>("ShitEngine", "fonts/main.ttf", 36)
         ->setColor({255, 255, 255, 255});

    // ── 按钮 ──
    {
        auto* btn = scene->createGameObject("StartBtn");
        btn->setParent(canvas);
        auto* bt = btn->addComponent<Shit::UITransform>(0.0f, 30.0f, 200.0f, 60.0f);
        bt->setAnchorMin({0.5f, 0.5f});
        bt->setAnchorMax({0.5f, 0.5f});

        btn->addComponent<Shit::UIImage>("textures/button.png");
        auto* button = btn->addComponent<Shit::UIButton>();
        button->setOnClick([]() { Shit::ST_INFO("Button clicked!"); });
    }

    // ── 输入框 ──
    {
        auto* inputGO = scene->createGameObject("InputBox");
        inputGO->setParent(canvas);
        auto* itf = inputGO->addComponent<Shit::UITransform>(0.0f, -80.0f, 400.0f, 48.0f);
        itf->setAnchorMin({0.5f, 0.5f});
        itf->setAnchorMax({0.5f, 0.5f});

        inputGO->addComponent<Shit::UIImage>("textures/input_bg.png");
        auto* input = inputGO->addComponent<Shit::UITextBox>();
        input->setFontPath("fonts/NotoSansSC-Regular.ttf");
        input->setPlaceholder("Type here...");
    }

    Shit::SceneManager::PushScene(std::move(scene));
    Shit::Game::Run();
    Shit::Game::Destroy();
    return 0;
}
```

---

## 与旧式 DrawSprite 对比

渲染系统里还有一个 `Renderer::DrawSprite()` 静态方法，能在屏幕坐标直接画精灵。它和 UI 系统的区别：

| | UI 系统 | DrawSprite |
|---|---|---|
| 定位 | UITransform（锚点 + 父子层级） | 绝对坐标 |
| 生命周期 | Component，自动管理 | 手工每帧调用 |
| 交互 | UIButton/UITextBox 自动做 Raycasting | 无 |
| 排序 | zIndex 系统自动排序 | 调用顺序决定遮挡 |
| 使用场景 | 按钮、文字、输入框、面板 | 血条、图标等「画一次就好」的 HUD |

---

## 架构一览

```
GameObject
  ├─ UITransform            屏幕空间定位（锚点 + 轴心 + 尺寸）
  ├─ UIRendererComponent    UI 渲染基类（自动注册到 UIRenderSystem）
  │   ├─ UIImage             图片显示
  │   ├─ UIText              文字显示
  │   ├─ UIButton            可交互按钮（ColorTint 状态过渡）
  │   └─ UITextInput         文本输入基类
  │       ├─ UITextBox       单行输入框（含光标/选区/IME/字符限制）
  │       └─ UITextArea      多行输入区域（换行/行移动）
  └─ UICanvas               UI 树根节点
```

**System** | 驱动 | 优先级
---|---|---
BehaviorSystem | Behavior onStart/onUpdate | 0
RenderSystem | 游戏世界渲染（相机 + 精灵） | 100
**UIRenderSystem** | **UI 控件绘制 + Raycasting 交互 + 输入框聚焦** | **200**

## 完整生命周期

```
GameObject.onSetParent → 自动更新 UITransform 父级
Component.onCreate → onAttach（注册到 UIRenderSystem）
 → 每帧: UIRenderSystem::update（排序 → Raycasting → 聚焦 → 渲染）
 → onDetach（从 UIRenderSystem 注销）
 → onDestroy（清理纹理缓存 + TextInputGate 解绑）
```
