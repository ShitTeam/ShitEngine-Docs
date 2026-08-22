---
title: 快速开始
lang: zh_CN
---

# 快速开始

> 从零到"窗口亮了"只需要两分钟。开始吧。

ShitEngine 的唯一使用方式是**可视化编辑器**：搭场景、写行为脚本、调试、导出全流程在编辑器内完成，不需要手写 `main.cpp` 或 CMake。

## 环境要求

- **ShitEngine SDK**（含 `Editor.exe`），从 [GitHub Release](https://github.com/ShitTeam/ShitEngine/releases) 下载对应平台预编译包
- **C++ 编译器**（写行为脚本时需要，编辑器自动探测）：Visual Studio Build Tools（MSVC）或 MinGW + CMake
- 无需手动安装 SDL3 / spdlog 等任何第三方依赖——随包自带

## 一、启动编辑器

解压 SDK，双击 `bin/Editor.exe`。首次启动进入空会话（无项目）。

## 二、新建项目

菜单「文件 → 新建项目…」：

![编辑器主界面：左侧场景树，中央场景视口，右侧属性检查器，底部资源与日志面板](/images/editor-main.png)

1. 填**项目名**与**保存位置**（如 `D:/MyGame`）
2. 指定 **SDK 目录**（指向你刚解压的 SDK 根目录）
3. 勾选创建 C++ 脚本工程（含 `Scripts/` 骨架），确认

项目结构：

```
MyGame/
├── config.json          # 项目配置（sdkDir / scene / inputMappings）
├── Scenes/              # .scene 场景
├── Assets/              # 图片 / 音频 / .anim / .prefab
├── Scripts/             # 行为脚本 C++ 工程（Behaviors.h）
└── bin/                 # 脚本编译产物 DLL
```

## 三、搭一个场景

编辑器主窗口中央是**场景视口**，左侧**场景树**、右侧**属性检查器**、底部**资源窗口**（资源 | 日志）。

1. 资源窗口左侧文件夹树选到 `Assets/`，把图片文件放进该目录（或用系统资源管理器拷贝进去）
2. 把图片从资源窗口**拖进场景视口** → 光标处生成一个精灵对象
3. 场景树选中它，右侧检查器改 `Transform` 的位置 / 缩放；选中后按 `W` 或用视口 Gizmo 拖动
4. 场景树右键「新建 → 相机」加一个相机（或直接播放——场景无相机时会自动补一个）

## 四、运行看看

点工具栏 **▶ 运行**。运行视口里你的精灵出现了——这就是游戏的真容。按 **■ 停止** 回到编辑状态（运行期的改动自动回滚，什么都不丢）。

::: tip
运行视口接收键盘/鼠标输入（引擎会收到 `SDL_Event`），WASD 这类按键控制直接在播放里生效。
:::

## 五、写第一个行为脚本（让东西动起来）

场景树里的对象现在还不会动。游戏逻辑写在 `Scripts/Behaviors.h`（C++ 插件）：

1. 点「构建脚本」（`Ctrl+B`）前，先打开 `Scripts/Behaviors.h`——编辑器菜单「编辑 → 打开代码…」（`Ctrl+Shift+O`）会用所选 IDE 打开项目，或直接在任何编辑器里改这个文件
2. 加一个类：

```cpp
class SHIT_REFLECT(BlackList) Mover : public Shit::Behavior {
    SHIT_REFLECT_BODY(Mover)
public:
    void onStart() override {
        m_transform = getOwner()->getComponent<Shit::TransformComponent>();
    }

    void onUpdate() override {
        if (!m_transform) return;
        Shit::Vector2 pos = m_transform->getPosition();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::A)) pos.x -= 200.0f * Shit::Time::GetDeltaTime();
        if (Shit::Input::IsKeyPressed(Shit::KeyCode::D)) pos.x += 200.0f * Shit::Time::GetDeltaTime();
        m_transform->setPosition(pos);
    }

private:
    SHIT_META(Disable)
    Shit::TransformComponent* m_transform = nullptr;
};
```

3. 回编辑器按 **`Ctrl+B`** 构建（自动探测编译器与生成器，成功后热重载 DLL，编辑器现场不清空）
4. 场景树选中对象 → 检查器底部 **「Add Component」** → 选 `Mover`（若列表没有要先 Ctrl+B 成功——新类型需要构建后才注册）
5. 再点 **▶ 运行**，用 A/D 移动你的对象

::: tip
`IsKeyPressed` = 持续按住（适合移动）；`IsKeyDown` = 按下瞬间（适合跳跃）。详见[输入系统](/guide/input)。
:::

## 六、保存与导出

- **保存场景**：`Ctrl+S`（存到 `Scenes/`）；关闭编辑器前若有未保存改动会提示
- **导出游戏**：菜单「文件 → 导出游戏…」→ 选一个输出目录 → 得到**绿色免安装包**（`MyGame.exe` + 引擎/SDL 运行库 + 脚本 DLL + 场景与资源），拷到任何 Windows 机器双击即玩

## 下一步

- [可视化编辑器](/guide/editor) — 编辑器全部功能详解（Gizmo / 撤销重做 / 播放态 / 瓦片刷图 / 动画窗口 / 项目设置…）
- [教程：做第一个游戏](/guide/tutorial) — 从空项目到可玩小游戏
- [游戏对象与组件](/guide/game-objects) — 组件生命周期、Behavior、Prefab
- [场景管理](/guide/scene) — 场景文件 .scene、切换与序列化
- [动画系统](/guide/animation) — Animator 状态机 / 帧动画
- [物理系统](/guide/physics) — 刚体、碰撞回调、关节
- [渲染与相机](/guide/rendering) — 多相机分屏、精灵与 UI
- [输入系统](/guide/input) / [音频系统](/guide/audio) / [事件系统](/guide/events) / [配置系统](/guide/config)