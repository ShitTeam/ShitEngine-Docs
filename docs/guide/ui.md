---
title: UI 系统
lang: zh_CN
---

# UI 系统

> 一套 retained-mode 的屏幕空间 UI 系统，参考 Unity uGUI 的锚点定位，但不引入 Canvas Scaler 的复杂度。

## 总览

ShitEngine 内置了一套与游戏世界**分离**的 UI 渲染管线。所有 UI 控件都是 Component，挂在 GameObject 上，由 `UIRenderSystem` 统一驱动。设计目标：按钮、文字、图片——够用、好用、不折腾。

UI 系统在游戏世界**之上**叠加绘制，走独立的渲染通道，不受相机/视口/空间坐标影响。

```
游戏世界（RenderSystem）
   ↓ 每帧先画
UI（UIRenderSystem，优先级 200）
   ↓ 叠加画在游戏世界之上
Presenter::Present()
```

### 什么时候用它

- HUD：血条、分数、子弹计数
- 菜单：主菜单、暂停菜单、设置面板
- 交互元素：按钮、开关、文字标签

这套系统**不**适合：
- 世界空间中的 UI（比如 NPC 头顶的名字）——请用 `SpriteRenderer` 的精灵
- 复杂的富文本排版或窗体布局——后续扩展

---

## 核心思路

UI 元素是一些绑定到屏幕坐标的 Rect，按 **Z-Index** 堆叠排列。你的工作就是回答三个问题：

1. **在哪** → `UITransform`（锚点 + 偏移 + 尺寸）
2. **画什么** → `UIImage` / `UIText`
3. **能不能点** → `UIButton`

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
`anchorMin` | `(0,0)` ~ `(1,1)` | 锚点矩形左下角（归一化，相对父级）
`anchorMax` | `(0,0)` ~ `(1,1)` | 锚点矩形右上角（归一化，相对父级）
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
// → 设置锚点、偏移、尺寸

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

### 事件驱动的交互

`UIRenderSystem` 每帧遍历 UI 元素做 **Raycasting**：

1. 从最上层（zIndex 最大）向下遍历
2. 取第一个包含鼠标位置的可见元素
3. 如果它有 `UIButton`，触发 enter/exit/down/up 事件
4. 鼠标释放且在按钮内 → 调用 `onClick`

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
4. 渲染：
   a. 恢复全屏裁剪和视口（RenderSystem 可能留下了相机剪裁）
   b. 按 zIndex 从下到上逐个调用 onRender
```

### 自动注册

所有 `UIRendererComponent` 的 `onAttach` / `onDetach` **自动**向 `UIRenderSystem` 注册 / 注销。你不需要手动管理列表。

---

## 完整示例

这是一个完整的 UI 场景——Canvas + 标题 + 可点击按钮 + 动态计数：

```cpp
#include <ShitEngine.h>

int main() {
    Shit::Game::Init();

    auto scene = std::make_unique<Shit::Scene>("MainMenu");
    scene->init();  // 自动注册 BehaviorSystem + RenderSystem + UIRenderSystem

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
    Shit::UIText* hintText = nullptr;
    {
        auto* btn = scene->createGameObject("StartBtn");
        btn->setParent(canvas);
        auto* bt = btn->addComponent<Shit::UITransform>(0.0f, 30.0f, 200.0f, 60.0f);
        bt->setAnchorMin({0.5f, 0.5f});
        bt->setAnchorMax({0.5f, 0.5f});

        btn->addComponent<Shit::UIImage>("textures/button.png");
        auto* button = btn->addComponent<Shit::UIButton>();
        button->setOnClick([&hintText]() {
            static int count = 0;
            Shit::ST_INFO("点击次数: {}", ++count);
            if (hintText) hintText->setText("点击了 " + std::to_string(count) + " 次");
        });
    }

    Shit::SceneManager::PushScene(std::move(scene));
    Shit::Game::Run();
    Shit::Game::Destroy();
    return 0;
}
```

---

## 样式定制

| 控件 | 可视化调整 | 实现方式 |
|---|---|---|
| UIImage | 图片 + 叠加色 | `setColor` → `SDL_SetTextureColorMod` |
| UIText | 文字内容、字号、颜色、对齐 | 重建纹理 |
| UIButton | 状态颜色、点击回调 | `ColorBlock` → `applyCurrentColor` 改写 UIImage.color |

---

## 与旧式 DrawSprite 对比

渲染系统里还有一个 `Renderer::DrawSprite()` 静态方法，能在屏幕坐标直接画精灵。它和 UI 系统的区别：

| | UI 系统 | DrawSprite |
|---|---|---|
| 定位 | UITransform（锚点 + 父子层级） | 绝对坐标 |
| 生命周期 | Component，自动管理 | 手工每帧调用 |
| 交互 | UIButton 自动做 Raycasting | 无 |
| 排序 | zIndex 系统自动排序 | 调用顺序决定遮挡 |
| 使用场景 | 按钮、文字、面板 | 血条、图标等「画一次就好」的 HUD |

---

## 架构一览

```
GameObject
  ├─ UITransform        屏幕空间定位（锚点 + 轴心 + 尺寸）
  ├─ UIRendererComponent UI 渲染基类（自动注册到 UIRenderSystem）
  │   ├─ UIImage         图片显示
  │   ├─ UIText          文字显示
  │   └─ UIButton        可交互按钮（ColorTint 状态过渡）
  └─ UICanvas           UI 树根节点
```

**System** | 驱动 | 优先级
---|---|---
BehaviorSystem | Behavior onStart/onUpdate | 0
RenderSystem | 游戏世界渲染（相机 + 精灵） | 100
**UIRenderSystem** | **UI 控件绘制 + Raycasting 交互** | **200**

## 完整生命周期

```
GameObject.onSetParent → 自动更新 UITransform 父级
Component.onCreate → onAttach（注册到 UIRenderSystem）
 → 每帧: UIRenderSystem::update（排序 → Raycasting → 渲染）
 → onDetach（从 UIRenderSystem 注销）→ onDestroy（清理纹理缓存）
```
