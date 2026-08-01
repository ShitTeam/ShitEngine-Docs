---
title: 快速开始
lang: zh_CN
---

# 快速开始

> 从零到"窗口亮了"只需要两分钟。开始吧。

## 环境要求

- **C++20 编译器** — GCC 10+、Clang 11+、MSVC 2019+
- **CMake 3.20+**
- **Ninja**（推荐）

## 创建项目

新建一个文件夹，里面放两个文件：

```
MyGame/
├── CMakeLists.txt
└── main.cpp
```

### 安装 ShitEngine SDK

从 [GitHub Release](https://github.com/ShitTeam/ShitEngine/releases) 下载对应平台的预编译包并解压，即得 **ShitEngine SDK**：

```
ShitEngine/
├── bin/          # ShitEngine.dll (Release) + ShitEngine-d.dll (Debug) + 第三方 DLL
├── lib/          # 导入库 + ShitEngineConfig.cmake
└── include/      # 头文件
```

### CMakeLists.txt

通过 `find_package` 引用 SDK：

```cmake
cmake_minimum_required(VERSION 3.20)
project(MyGame)

find_package(ShitEngine REQUIRED
    PATHS /path/to/ShitEngine/lib/cmake
    NO_DEFAULT_PATH)

add_executable(MyGame main.cpp)
target_link_libraries(MyGame PRIVATE ShitEngine::ShitEngine)
```

`ShitEngineConfig.cmake` 会按 `CMAKE_BUILD_TYPE` 自动选择 Debug（`-d` 后缀）或 Release 导入库。预编译包自带 SDL3、spdlog、glm 等第三方动态库，无需额外安装。

### main.cpp

最小起手式：

```cpp
#include <ShitEngine.h>

int main() {
    if (Shit::Game::Init()) {
        Shit::Game::Run();
    }
    Shit::Game::Destroy();
    return 0;
}
```

### 编译运行

```bash
cmake -B build -G Ninja
cmake --build build
./build/MyGame
```

弹出一个黑窗口。恭喜，你上路了。

## 放点东西进去

窗口太无聊了。加个场景、加个玩家、加个相机——你需要的三件套：

### 1. 创建场景

场景是世界的容器，管理所有对象和系统：

```cpp
auto scene = std::make_unique<Shit::Scene>("my game");
scene->init();  // 注册 BehaviorSystem + RenderSystem + UIRenderSystem
```

### 2. 创建游戏对象

::: tip
GameObject 只能通过 `scene->createGameObject()` 创建，不能直接 `new`。
:::

```cpp
auto* player = scene->createGameObject("player");

// 挂上组件才有功能
player->addComponent<Shit::TransformComponent>();
player->addComponent<Shit::SpriteRenderer>();

// 给个皮肤
player->getComponent<Shit::SpriteRenderer>()
    ->setTexturePath("textures/player.png");
```

### 3. 让画面跑起来

```cpp
Shit::SceneManager::LoadScene(std::move(scene));
Shit::Game::Run();
```

现在你有一个带着纹理的玩家出现在屏幕上了。虽然他还不会动。

## 让他动起来

继承 `Behavior` 来写你自己的游戏逻辑：

```cpp
class Player : public Shit::Behavior {
    Shit::TransformComponent* transform = nullptr;
    float speed = 200.0f;

    void onStart() override {
        transform = getOwner()->getComponent<Shit::TransformComponent>();
    }

    void onUpdate() override {
        Shit::Vector2 pos = transform->getPosition();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::W)) pos.y -= speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::S)) pos.y += speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::A)) pos.x -= speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::D)) pos.x += speed * Shit::Time::GetDeltaTime();
        transform->setPosition(pos);
    }
};
```

挂到玩家身上：

```cpp
player->addComponent<Player>();
```

::: tip
`IsKeyPressed` 检测的是**持续按住**，适合移动。如果是跳跃这类单次触发，用 `IsKeyDown`。详见[输入系统](/guide/input)。
:::

## 再加个相机

没有相机就什么都看不到。相机决定你从哪个角度观察世界：

```cpp
auto* camera = scene->createGameObject("camera");
camera->addComponent<Shit::TransformComponent>();
camera->addComponent<Shit::CameraComponent>()->setZoom(5.0f);
```

## 完整的可运行例子

```cpp
#include <ShitEngine.h>

class Player : public Shit::Behavior {
    Shit::TransformComponent* transform;
    float speed = 200.0f;

    void onStart() override {
        transform = getOwner()->getComponent<Shit::TransformComponent>();
    }

    void onUpdate() override {
        Shit::Vector2 pos = transform->getPosition();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::W)) pos.y -= speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::S)) pos.y += speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::A)) pos.x -= speed * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::D)) pos.x += speed * Shit::Time::GetDeltaTime();
        transform->setPosition(pos);
    }
};

int main() {
    if (Shit::Game::Init()) {
        auto scene = std::make_unique<Shit::Scene>("demo");
        scene->init();

        auto* player = scene->createGameObject("player");
        player->addComponent<Shit::TransformComponent>();
        player->addComponent<Shit::SpriteRenderer>()->setTexturePath("player.png");
        player->addComponent<Player>();

        auto* camera = scene->createGameObject("camera");
        camera->addComponent<Shit::TransformComponent>();
        camera->addComponent<Shit::CameraComponent>();

        Shit::SceneManager::LoadScene(std::move(scene));
        Shit::Game::Run();
    }
    Shit::Game::Destroy();
}
```

## 下一步

你已经能跑会动了。继续深入了解：

- [引擎核心架构](/guide/introduction)
- [游戏对象与组件](/guide/game-objects) — 组件生命周期、Behavior、Prefab
- [场景管理](/guide/scene) — 多场景切换、叠加菜单
- [渲染与相机](/guide/rendering) — 多相机分屏、UI 层级
- [输入系统](/guide/input) — 键盘鼠标三态检测
- [逐帧动画](/guide/animation) — 让 sprite 动得更花哨
- [事件系统](/guide/events) — 模块间通信不耦合
- [音频系统](/guide/audio) — 音效和背景音乐
- [配置系统](/guide/config) — settings.json、逻辑分辨率