---
title: 渲染与相机
lang: zh_CN
---

# 渲染与相机

ShitEngine 的渲染管线围绕三个核心概念：**精灵（Sprite）**、**相机（Camera）** 和 **渲染器（Renderer）**。

## 逻辑分辨率

引擎默认使用 1280×720 的逻辑分辨率。你的所有坐标都基于这个空间，渲染器会自动缩放适配实际窗口，黑边填充多余区域。

```cpp
// Renderer::init() 中自动设置

```

这意味着无论窗口是 1024×768 还是 1920×1080，你写的 `setPosition({640, 360})` 始终指向屏幕正中央。

## 精灵渲染

### SpriteRenderer

最常用的渲染组件。挂到 GameObject 上，设置纹理即可显示：

```cpp
auto* sprite = go->addComponent<Shit::SpriteRenderer>();
sprite->setTexturePath("textures/player.png");
```

纹理由 `ResourceManager` 自动缓存，同一纹理多次加载不会重复分配资源。

### Sprite 数据

`Sprite` 是一个数据类，描述"画什么"。它包含纹理路径、裁剪区域和翻转标志：

```cpp
Shit::Sprite sprite("player.png", {0, 0, 32, 32});  // 裁剪第 32×32 区域
sprite.setFlipped(true);  // 水平翻转
```

## 相机

相机决定你从哪个角度观察世界。

### 基本用法

```cpp
auto camera = std::make_unique<Shit::GameObject>("camera");
camera->addComponent<Shit::TransformComponent>();
camera->addComponent<Shit::CameraComponent>();
```

相机的**位置**由 TransformComponent 决定，**看到的范围**由 CameraComponent 的 `worldSize` 控制：

```cpp
auto* cam = camera->getComponent<Shit::CameraComponent>();
cam->setSize({ 320, 180 });  // 看到的世界大小（逻辑分辨率单位）
cam->setZoom(1.0f);
```

相机默认以 1280×720 的世界范围展示在屏幕上。

### 坐标转换

相机提供了两个坐标转换方法：

```cpp
// 世界坐标 → 屏幕坐标（像素）
Vector2 screenPos = camera->worldToScreen(worldPosition);

// 屏幕坐标 → 世界坐标
Vector2 worldPos = camera->screenToWorld(screenPosition);
```

这些方法在实现点击拾取、拖拽等交互时非常有用。

### 多相机分屏

这是 ShitEngine 的特色功能。多个相机可以共享同一个场景，各自渲染不同的部分：

```cpp
// 玩家 1 视口（左半屏）
auto* p1cam = p1->getComponent<Shit::CameraComponent>();
p1cam->setViewportRatio({0.0f, 0.0f, 0.5f, 1.0f});  // {x, y, w, h} ∈ [0, 1]
p1cam->setSize({200, 200});

// 玩家 2 视口（右半屏）
auto* p2cam = p2->getComponent<Shit::CameraComponent>();
p2cam->setViewportRatio({0.5f, 0.0f, 0.5f, 1.0f});
p2cam->setSize({200, 200});
```

`setViewportRatio` 的参数是 0~1 的比例值，相对于逻辑分辨率。四个分量分别对应：视口左上角 X、视口左上角 Y、视口宽度、视口高度。

**应用场景**：

| 场景 | 实现 |
|---|---|
| 分屏合作 | 两台相机各占一半屏幕 |
| 小地图 | 右下角开一个小视口 |
| 画中画 | 相机嵌套相机 |
| 镜像/反射 | 翻转相机内容 |

### 相机的优先级

多个相机渲染时，优先级低的先渲染。通过 `setPriority` 控制：

```cpp
cam->setPriority(0);   // 先渲染（底层）
cam->setPriority(10);  // 后渲染（盖在上面，适合 UI 相机）
```

### 裁剪

超出相机视野范围的精灵不会被渲染，这叫**视锥体裁剪**。引擎自动处理，不需要你操心。精灵的世界坐标包围盒超出相机可见区域就会被跳过。

## 系统执行顺序

每帧的渲染流程：

```
1. Renderer::ClearScreen()          — 清屏
2. 按优先级排序相机
3. 按 Z-Index 排序 SpriteRenderer
4. 对每个相机：
   a. 设置视口
   b. 计算裁剪区域（Letterbox 纯画面区域）
   c. 对每个可见精灵调用 onRender()
5. Renderer::Present()              — 显示结果
```

Z-Index 控制精灵的遮挡关系，值越小越靠下（越先绘制）：

```cpp
sprite->getComponent<Shit::SpriteRenderer>()->setZIndex(10);
```
