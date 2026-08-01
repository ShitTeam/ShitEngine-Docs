---
title: 从零搭一个游戏
lang: zh_CN
---

# 从零搭一个游戏

> 十分钟，从空文件夹到一个会动会响的游戏。

## 你需要什么

- **C++20 编译器** — GCC 10+、Clang 11+、MSVC 2019+
- **CMake 3.20+**
- **ShitEngine SDK** — 见下方"获取 ShitEngine SDK"

## 一、搭项目骨架

### 获取 ShitEngine SDK

从 **GitHub Actions 产物**或 **GitHub Release** 下载对应平台的预编译包解压，即得 SDK。

**GitHub Actions 产物** — 每个提交都会自动构建并上传引擎包。去 [Actions 页面](https://github.com/ShitTeam/ShitEngine/actions/workflows/build.yml) 点开最新一次的绿色运行，在页面底部找到 Artifacts：

| 产物名 | 平台 | 编译器 | 格式 |
|---|---|---|---|
| `ShitEngine-windows-mingw` | Windows | MinGW | zip |
| `ShitEngine-windows-msvc` | Windows | MSVC | zip |
| `ShitEngine-linux` | Linux | GCC | tar.gz |
| `ShitEngine-macos` | macOS | Clang | tar.gz |

**GitHub Release** — 当引擎发布正式版本时，可以在 [Releases 页面](https://github.com/ShitTeam/ShitEngine/releases) 下载对应平台的压缩包。目前还没正式发布第一个版本。<!-- 有 Release 后删掉这句 -->

解压得到 SDK 结构：

```
ShitEngine/
├── bin/          # ShitEngine.dll + 第三方 DLL
├── lib/          # 导入库 + ShitEngineConfig.cmake
└── include/      # 头文件
```

> **Linux 用户**：运行前需设置动态库路径：
> ```bash
> export LD_LIBRARY_PATH=/path/to/ShitEngine/lib:$LD_LIBRARY_PATH
> ```

新建一个文件夹，里面放两个文件：

```
MyGame/
├── CMakeLists.txt
└── main.cpp
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

`ShitEngineConfig.cmake` 会按 `CMAKE_BUILD_TYPE` 自动选择 Debug（`-d` 后缀）或 Release 导入库，第三方动态库随包自带。

### 从源码构建（可选）

如果你克隆了 ShitEngine 源码（比如想贡献代码），可以直接用 `add_subdirectory` 引用源码：

```cmake
add_subdirectory("path/to/ShitEngine" "${CMAKE_BINARY_DIR}/ShitEngine_Build")
target_link_libraries(MyGame PRIVATE ShitEngine::ShitEngine)
```

### main.cpp

引擎的启停代码是固定模板，先把它写上：

```cpp
#include <ShitEngine.h>

int main() {
    if (Shit::Game::Init()) {
        Shit::Game::Run();
    }
    Shit::Game::Destroy();
}
```

编译运行试试：

```bash
cmake -B build -G Ninja
cmake --build build
./build/MyGame
```

应该弹出一个黑窗口。恭喜，你的游戏已经跑起来了。

## 二、创建场景

场景是游戏世界的容器。所有游戏对象都在场景里活着：

```cpp
auto scene = std::make_unique<Shit::Scene>("my game");
scene->init();  // 注册了 BehaviorSystem + RenderSystem + UIRenderSystem
```

先别把场景塞进引擎——等我们把东西放进去再说。

## 三、放一个玩家进去

场景里的每个"东西"都是一个 **GameObject**。它本身是空的，挂上组件才有功能。

GameObject 只能通过 `scene->createGameObject()` 创建：

```cpp
// 创建玩家
auto* player = scene->createGameObject("player");

// 挂上位置组件
player->addComponent<Shit::TransformComponent>();

// 挂上渲染组件，给它一张图
auto* sprite = player->addComponent<Shit::SpriteRenderer>();
sprite->setTexturePath("textures/player.png");
```

这套"空壳子插积木"的玩法叫**组件化架构**。每个组件管一件事：

| 组件 | 管什么 |
|---|---|
| `TransformComponent` | 位置、缩放、旋转 |
| `SpriteRenderer` | 画什么纹理、怎么画 |
| `CameraComponent` | 从哪看世界 |
| `AnimationComponent` | 逐帧动画 |
| `Behavior` | 你的游戏脚本 |

每种组件一个对象只能挂一个，重复 add 不会报错，直接返回已有的。

## 四、让他动起来（Behavior）

玩家的运动逻辑用 **Behavior** 来写。继承它，重写 `onStart()` 和 `onUpdate()`：

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

然后把 Behavior 挂到玩家身上：

```cpp
player->addComponent<Player>();
```

BehaviorSystem 每帧会自动找到这个组件并调用它的 `onUpdate`。不需要你手动管理。

::: warning 命名提醒
ShitEngine 中 `IsKeyPressed` = 持续按住（适合移动），`IsKeyDown` = 按下瞬间（适合跳跃）。这和 Unity/Godot 相反，注意区分。详见[输入系统](/guide/input)。
:::

::: info 生命周期小结
`onCreate → onAttach → onStart → onUpdate(每帧) → onDetach → onDestroy`
:::

## 五、加个相机

没有相机，什么都看不到。相机决定你能看到多大范围的世界：

```cpp
auto* camera = scene->createGameObject("camera");
camera->addComponent<Shit::TransformComponent>();
camera->addComponent<Shit::CameraComponent>()->setZoom(5.0f);
```

相机的 TransformComponent 决定它的位置，CameraComponent 决定它怎么看。

## 六、开跑

把场景交给 SceneManager，跑起来：

```cpp
Shit::SceneManager::LoadScene(std::move(scene));
Shit::Game::Run();
```

### 完整的 main.cpp

```cpp
#include <ShitEngine.h>

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
        camera->addComponent<Shit::CameraComponent>()->setZoom(5.0f);

        Shit::SceneManager::LoadScene(std::move(scene));
        Shit::Game::Run();
    }
    Shit::Game::Destroy();
}
```

编译──你现在应该能看到一个玩家在屏幕上了。按 WASD 他会动。

## 七、加个音效

连声音都没有，算什么游戏。加一行就播 BGM：

```cpp
// 在 onStart 里
auto* bgm = Shit::AudioPlayer::Play("audio/bgm.mp3", "bgm");
bgm->setLooping(-1);  // 无限循环
```

`Play` 第二个参数是轨道组名，不传则默认归入 `"default"` 组。返回 `AudioTrack*`，可以用来控制暂停、恢复、音量。

音量分三级：**主音量 × 组音量 × 轨道音量**。默认全 1.0，改哪层都行。

## 八、试试动画

如果你的角色用了精灵图集（sprite-sheet），一行就能定义动画：

```cpp
auto* anim = player->addComponent<Shit::AnimationComponent>();
Shit::SpriteSheet sheet(4, 8, 32, 32);  // 4行8列，每帧32x32

// 用帧索引数组定义"跑"的动画
anim->play("run", sheet, {0, 1, 2, 3, 4, 5}, 0.1f, true);
anim->play("run");  // 切换播放
```

`AnimationComponent` 继承自 Behavior，会自动被驱动。你不需要在 onUpdate 里写任何动画代码。

## 九、收到事件

模块之间不想互相认识？用 EventBus 喊话：

```cpp
// 1. 定义事件
struct ScoreEvent : public Shit::Event { int points; };

// 2. 订阅
uint64_t token = Shit::EventBus::Subscribe<ScoreEvent>(
    [](const ScoreEvent& e) {
        // 更新 UI、播音效……
    }
);

// 3. 发送
EventBus::Emit(ScoreEvent{100});

// 4. 退订（销毁前一定要做）
EventBus::Unsubscribe<ScoreEvent>(token);
```

事件不会立即触发，而是排队等待 `ProcessEvents` 统一派发。引擎在主循环中已调用 `SceneManager::Update`，无需手动处理。

## 继续深入

到这里你已经能用 ShitEngine 写出一个完整的可玩游戏了。每个子系统想深入了解，看下面：

| 模块 | 去这里 |
|---|---|
| GameObject、组件生命周期、Behavior、Prefab | [游戏对象与组件](/guide/game-objects) |
| 场景切换（LoadScene）、自定义 System | [场景管理](/guide/scene) |
| 多相机分屏、渲染流程、UI 直接绘制 | [渲染与相机](/guide/rendering) |
| 键盘鼠标三态检测、鼠标位置 | [输入系统](/guide/input) |
| SpriteSheet、动画生命周期 | [逐帧动画](/guide/animation) |
| 轨道组、全局控制、缓存机制 | [音频系统](/guide/audio) |
| EventBus 完整 API、回调安全性 | [事件系统](/guide/events) |
| settings.json、逻辑分辨率、帧率 | [配置系统](/guide/config) |