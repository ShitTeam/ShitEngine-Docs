---
title: API 参考
lang: zh_CN
---

# API 参考

> ShitEngine 所有公有类和方法的 API 文档，由 Doxygen 从源码头文件自动生成。

---

## 核心（Core）

| 类 | 描述 | 头文件 |
|---|---|---|
| [Game](Shit-Game) | 引擎总开关：Init / Run / Destroy | `Game.h` |
| [Window](Shit-Window) | 窗口管理与事件分发 | `Window.h` |
| [Time](Shit-Time) | DeltaTime 与帧率控制 | `Time.h` |
| [Config](Shit-Config) | settings.json 配置读取 | `Config.h` |
| [ProjectConfig](Shit-ProjectConfig) | 项目名称配置 | `Config.h` |
| [WindowConfig](Shit-WindowConfig) | 窗口标题/尺寸/帧率配置 | `Config.h` |

## 组件（Component）

| 类 | 描述 | 头文件 |
|---|---|---|
| [Component](Shit-Component) | 组件基类，定义生命周期 | `Component.h` |
| [Behavior](Shit-Behavior) | 自定义脚本基类 | `Behavior.h` |
| [TransformComponent](Shit-TransformComponent) | 位置/缩放/旋转 | `TransformComponent.h` |
| [RendererComponent](Shit-RendererComponent) | 渲染组件基类 | `RendererComponent.h` |
| [SpriteRenderer](Shit-SpriteRenderer) | 精灵渲染组件 | `SpriteRenderer.h` |
| [CameraComponent](Shit-CameraComponent) | 相机视口与坐标转换 | `CameraComponent.h` |
| [AnimationComponent](Shit-AnimationComponent) | 逐帧动画驱动 | `AnimationComponent.h` |

## 游戏对象（GameObject）

| 类 | 描述 | 头文件 |
|---|---|---|
| [GameObject](Shit-GameObject) | 游戏对象容器 | `GameObject.h` |
| [Prefab](Shit-Prefab) | 预制体模板 | `Prefab.h` |

## 场景与系统（Scene & System）

| 类 | 描述 | 头文件 |
|---|---|---|
| [Scene](Shit-Scene) | 场景管理器 | `Scene.h` |
| [SceneManager](Shit-SceneManager) | 场景栈操作 | `SceneManager.h` |
| [System](Shit-System) | 自定义系统基类 | `System.h` |
| [BehaviorSystem](Shit-BehaviorSystem) | 驱动 Behavior 的 onUpdate | `BehaviorSystem.h` |
| [RenderSystem](Shit-RenderSystem) | 驱动渲染管线 | `RenderSystem.h` |

## 渲染（Render）

| 类 | 描述 | 头文件 |
|---|---|---|
| [Renderer](Shit-Renderer) | SDL3 渲染封装 | `Renderer.h` |
| [Sprite](Shit-Sprite) | 精灵数据容器 | `Sprite.h` |
| [SpriteSheet](Shit-SpriteSheet) | 精灵图集网格切割 | `SpriteSheet.h` |
| [Animation](Shit-Animation) | 帧动画数据 | `Animation.h` |

## 音频（Audio）

| 类 | 描述 | 头文件 |
|---|---|---|
| [AudioPlayer](Shit-AudioPlayer) | 音频播放器（单例） | `AudioPlayer.h` |
| [AudioTrack](Shit-AudioTrack) | 单条音频轨道的控制句柄 | `AudioTrack.h` |
| [AudioTrackGroup](Shit-AudioTrackGroup) | 轨道分组批量控制 | `AudioPlayer.h` |

## 事件（Event）

| 类 | 描述 | 头文件 |
|---|---|---|
| [Event](Shit-Event) | 事件基类 | `Event.h` |
| [EventBus](Shit-EventBus) | 类型安全事件总线 | `EventBus.h` |

## 输入（Input）

| 类 | 描述 | 头文件 |
|---|---|---|
| [Input](Shit-Input) | 键盘鼠标三态检测 | `Input.h` |

## 资源管理（Resource）

| 类 | 描述 | 头文件 |
|---|---|---|
| [ResourceManager](Shit-ResourceManager) | 纹理/音频/字体自动缓存 | `ResourceManager.h` |
