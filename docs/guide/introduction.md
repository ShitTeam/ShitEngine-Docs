# ShitEngine

ShitEngine 是一个基于 **C++20** 的轻量级 2D 游戏引擎。

它从零开始设计，采用面向对象的组件化架构（Component + System），不依赖任何大型框架。引擎内置了完整的生命周期管理、场景栈、多相机渲染管线、资源缓存和输入系统，让你可以直接开始写游戏逻辑，而不必从窗口和渲染轮子搭起。

## 为什么用 ShitEngine？

- **即用型游戏框架** — 场景栈、组件生命周期、多相机渲染、输入、资源缓存开箱即用
- **像素级渲染品质** — 逻辑分辨率 + 最近邻缩放 + 像素对齐，像素风在任何分辨率下都不模糊
- **现代 C++ 零配置** — CMake FetchContent 自动拉取全部依赖，零配置即构即用

## 核心架构

引擎围绕三个核心概念组织：

**GameObject** — 游戏世界中的实体，作为组件的容器。本身不包含逻辑，通过挂载不同的组件获得行为。

**Component** — 功能的积木块。`TransformComponent` 控制位置和缩放，`SpriteRenderer` 绘制精灵，`CameraComponent` 定义视角。用户继承 `Behavior` 重写 `onUpdate` 即可添加自定义逻辑。

**System** — 管理同类组件的更新。`BehaviorSystem` 遍历所有 Behavior 执行脚本，`RenderSystem` 按相机和 Z 序排序后渲染。System 有优先级控制执行顺序。

## 核心系统

| 系统 | 职责 |
|---|---|
| Game | 引擎入口，初始化和主循环 |
| Window | 窗口管理 |
| Renderer | 逻辑分辨率、缩放模式、绘制 API 封装 |
| Time | DeltaTime / TotalTime 计算 |
| Input | 键盘和鼠标的 Down/Pressed/Released 三态检测 |
| Config | JSON 配置文件读取 |
| ResourceManager | 纹理等资源的自动缓存 |
| SceneManager | 场景栈管理，支持延迟推入/弹出/替换 |
| Scene | 管理 GameObject 和 System 的生命周期 |

## 链接

- 源代码：[GitHub - ShitTeam](https://github.com/ShitTeam)
- 许可证：Apache License 2.0
