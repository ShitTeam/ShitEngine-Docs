---
title: 快速开始
lang: zh_CN
---

# 快速开始

让我们从零创建一个使用 ShitEngine 的项目。

## 环境要求

- **C++20 编译器** — GCC 10+、Clang 11+、MSVC 2019+
- **CMake 3.20+**
- **Ninja**（推荐，用着舒服）

## 创建项目

创建一个新文件夹，里面放两个文件：

```
MyGame/
├── CMakeLists.txt
└── main.cpp
```

### CMakeLists.txt

用 FetchContent 拉取 ShitEngine，所有依赖自动下载，不用你装任何东西：

```cmake
cmake_minimum_required(VERSION 3.20)
project(MyGame)

include(FetchContent)
FetchContent_Declare(
    ShitEngine
    GIT_REPOSITORY https://github.com/ShitTeam/ShitEngine.git
    GIT_TAG main
    GIT_SHALLOW TRUE
)
FetchContent_MakeAvailable(ShitEngine)

add_executable(MyGame main.cpp)
target_link_libraries(MyGame PRIVATE ShitEngine)
```

### main.cpp

一个最小的启动代码：

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

你会看到一个空白的窗口。现在我们来往里面装东西。

## 创建场景

场景（Scene）是游戏世界的容器，管理所有游戏对象（GameObject）和系统（System）。

```cpp
auto scene = std::make_unique<Shit::Scene>("my game");
scene->init();  // 注册默认系统（BehaviorSystem + RenderSystem）
```

## 添加游戏对象

场景里需要有东西。GameObject 本身是空的，给它挂上组件才有功能：

```cpp
// 创建一个玩家对象
auto* player = new Shit::GameObject("player");

// 挂载组件
player->addComponent<Shit::TransformComponent>();
player->addComponent<Shit::SpriteRenderer>();

// 设置纹理
player->getComponent<Shit::SpriteRenderer>()
    ->setTexturePath("textures/player.png");

// 交给场景管理
scene->addGameObject(std::unique_ptr<Shit::GameObject>(player));
```

把场景交给场景管理器，就能开始运行了：

```cpp
Shit::SceneManager::PushScene(std::move(scene));
Shit::Game::Run();
```

## 让玩家动起来

光有画面不够，需要交互。继承 `Behavior` 来添加自定义逻辑：

```cpp
class Player : public Shit::Behavior {
    Shit::TransformComponent* transform = nullptr;
    float speed = 200.0f;

    void onStart() override {
        // 缓存组件指针，避免每帧查找
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

然后挂到玩家对象上：

```cpp
player->addComponent<Player>();
```

## 添加相机

相机定义你能看到的世界范围。没有相机，什么也看不到：

```cpp
auto* cameraObj = new Shit::GameObject("camera");
cameraObj->addComponent<Shit::TransformComponent>();
cameraObj->addComponent<Shit::CameraComponent>();
scene->addGameObject(std::unique_ptr<Shit::GameObject>(cameraObj));
```

## 完整的例子

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

        // 玩家
        auto player = std::make_unique<Shit::GameObject>("player");
        player->addComponent<Shit::TransformComponent>();
        player->getComponent<Shit::SpriteRenderer>()->setTexturePath("player.png");
        player->addComponent<Player>();
        scene->addGameObject(std::move(player));

        // 相机
        auto camera = std::make_unique<Shit::GameObject>("camera");
        camera->addComponent<Shit::TransformComponent>();
        camera->addComponent<Shit::CameraComponent>();
        scene->addGameObject(std::move(camera));

        Shit::SceneManager::PushScene(std::move(scene));
        Shit::Game::Run();
    }
    Shit::Game::Destroy();
}
```

## 下一步

现在你有了一个能跑会动的游戏雏形。接下来可以了解：

- [了解更多](/guide/introduction) — 引擎核心概念
- **场景管理** — 多场景切换、场景栈
- **多相机分屏** — 小地图、分屏合作
- **事件系统** — 组件间通信
- **音频系统** — 播放音效和背景音乐
