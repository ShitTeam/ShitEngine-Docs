---
title: 渲染与相机
lang: zh_CN
---

# 渲染与相机

> 你能看到游戏世界，全靠这哥俩。

## 逻辑分辨率

ShitEngine 默认用 **1280×720** 作为逻辑坐标空间。你写代码时永远在这个"理想屏幕"上思考，渲染器会自动适配到真实窗口，多出的部分用黑边填满（Letterbox）。

逻辑分辨率可以通过 `settings.json` 修改：

```json
{
  "window": {
    "title": "My Game",
    "width": 1920,
    "height": 1080,
    "targetFPS": 60
  }
}
```

```cpp
// 也可以在代码中查询当前逻辑分辨率
float w = Renderer::GetLogicalWidth();   // → 1280.0
float h = Renderer::GetLogicalHeight();  // → 720.0
```

## 精灵渲染

### SpriteRenderer — 最简单的画图方式

把 `SpriteRenderer` 挂到 GameObject 上，告诉它纹理路径，它帮你画出来：

```cpp
auto* sprite = go->addComponent<Shit::SpriteRenderer>();
sprite->setTexturePath("textures/player.png");
```

纹理由 `ResourceManager` 自动缓存。同一个 png 加载一百次也只占一份内存。

### 源矩形裁剪

精灵图集（sprite-sheet）的用法——不画整张图，只画其中一小块：

```cpp
// 只裁剪纹理中 (0, 0, 32, 32) 的区域
sprite->setSourceRect({0.0f, 0.0f, 32.0f, 32.0f});

// 清空恢复整图
sprite->setSourceRect(std::nullopt);
```

这个接口是 `AnimationComponent` 在背后调用的——你不需要手动管理它。

### Sprite 数据类

`Sprite` 是一个纯数据容器，描述"画什么"：

```cpp
Shit::Sprite sprite("player.png", {0, 0, 32, 32});
sprite.setFlipped(true);

// 从 SpriteSheet 快速取帧
Shit::SpriteSheet sheet(4, 8, 32, 32);
sprite.setFrame(sheet, 5);  // 等价于 setSourceRect(sheet.getFrameRect(5))
```

### 显示与隐藏

`RendererComponent` 支持运行时隐藏，不渲染但保留组件状态：

```cpp
sprite->setVisible(false);  // 隐藏
sprite->isVisible();       // → false
```

### 包围盒

获取精灵在世界坐标系下的轴对齐包围盒（AABB），可用于碰撞检测或裁剪：

```cpp
SDL_FRect bounds = sprite->getGlobalBounds();
// → { x, y, width * scaleX, height * scaleY }
```

## 相机

相机决定你能看到什么。没有相机等于闭着眼睛玩游戏。

### 基本用法

```cpp
auto* camera = scene->createGameObject("camera");
camera->addComponent<Shit::TransformComponent>();
camera->addComponent<Shit::CameraComponent>();
```

相机的**位置**由 TransformComponent 决定，**视口尺寸**由 CameraComponent 控制：

```cpp
auto* cam = camera->getComponent<Shit::CameraComponent>();
cam->setZoom(5.0f);          // 放大，像素风游戏必备
cam->setSize({ 320, 180 });  // 世界大小（逻辑分辨率单位）
```

### 坐标转换

```cpp
// 世界坐标 → 屏幕像素
Vector2 screenPos = camera->worldToScreen(worldPos);

// 屏幕像素 → 世界坐标
Vector2 worldPos = camera->screenToWorld(screenPos);
```

做点击检测、拖拽交互的时候特别好用。

### 像素单位比（PixelPerUnit）

`CameraComponent` 暴露了 `getPixelPerUnit()`，表示一个逻辑单位对应多少像素：

```cpp
float ppu = camera->getPixelPerUnit();
// SpriteRenderer 渲染时自动用这个值缩放精灵
```

`setZoom()` 改变的是视口大小，`getPixelPerUnit()` 会随之变化，从而自动缩放所有精灵。

### 多相机分屏

这是 ShitEngine 的特色。多个相机可以共享同一个场景，各画各的：

```cpp
// 玩家 1 视口：左半边
auto* p1cam = p1->getComponent<Shit::CameraComponent>();
p1cam->setViewportRatio({0.0f, 0.0f, 0.5f, 1.0f});

// 玩家 2 视口：右半边
auto* p2cam = p2->getComponent<Shit::CameraComponent>();
p2cam->setViewportRatio({0.5f, 0.0f, 0.5f, 1.0f});
```

**真实用途**：

| 要干嘛 | 怎么搞 |
|---|---|
| 分屏合作 | 两台相机各占一半 |
| 小地图 | 右下角一个小视口 |
| 画中画 | 两相机嵌套 |
| 子弹镜 | 相机跟子弹走 |

### 优先级

多个相机渲染时，优先级低的先画（在底层）。

```cpp
cam->setPriority(0);   // 背景层
cam->setPriority(10);  // UI 层，盖在上面
```

### 裁剪

超出相机视野范围的精灵不会被渲染——这是视锥体裁剪，引擎自动做，你不需要写一行代码。

## 渲染流程

每帧的铁打流程：

```
1. ClearScreen()         — 清屏
2. 排序相机（按优先级）
3. 排序精灵（按 Z-Index）
4. 对每个相机：
   a. 设置视口
   b. 计算裁剪区域
   c. 逐个渲染可见精灵
5. Present()             — 显示结果
```

Z-Index 控制谁盖在谁上面：

```cpp
sprite->setZIndex(10);  // 值越大越靠上
```

## 直接绘制（UI 场景）

除了挂载 `SpriteRenderer`，也可以直接在屏幕上画精灵——适合 UI 元素（血条、分数、图标）：

```cpp
// 在屏幕坐标 (100, 50) 画一个 200×40 的 UI 元素
Shit::Sprite uiSprite("ui/healthbar.png");
Renderer::DrawSprite(uiSprite, {100.0f, 50.0f}, {200.0f, 40.0f});
```

`DrawSprite` 是静态方法，不依赖 GameObject/Camera 体系，直接在屏幕像素坐标上绘制。

