---
title: 教程：做第一个游戏
lang: zh_CN
---

# 教程：用编辑器做第一个游戏

> 二十分钟，从空项目到导出一个小游戏：一个能左右移动、跳跃的方块，踩上地面、捡金币、计分、播音效。

会用到：可视化搭场景、行为脚本（C++）、输入映射、物理碰撞回调、`ComponentRef` 引用、音频——覆盖编辑器工作流的完整一环。

## 你需要什么

- **ShitEngine SDK**（含 `Editor.exe`）
- **C++ 编译器**：Visual Studio Build Tools 或 MinGW + CMake（编辑器会自己探测，写行为脚本时才需要）

## 一、新建项目

菜单「文件 → 新建项目…」：项目名 `CoinGame`，位置随意，勾选创建脚本工程。打开后你应该看到场景树（空）、视口、检查器、底部「资源 | 日志」。

## 二、搭出世界

设计一个简单关卡：地面 + 一枚金币 + 玩家方块 + 相机。

### 1. 地面

1. 准备一张地面图片（或 32×32 的纯色贴图）放进项目的 `Assets/`
2. 资源窗口选到 `Assets/`，把图片**拖进场景视口**——地面精灵出现在光标处
3. 场景树选中它（`F2` 重命名）改成 `Ground`，检查器 `Transform` 里把位置调到 `y ≈ 300`，缩放拉长（如 `scale = (6, 1)`）
4. 给它挂物理：场景树右键「添加组件 → RigidBody2D」（静态，默认），再添加 `BoxCollider2D`——碰撞体尺寸默认对应精灵

### 2. 玩家方块

再拖入一张图片（用同一张也行），重命名 `Player`，位置放到 `(0, -60)`，缩放 `(1, 1)`：

1. 检查器 Add Component → `RigidBody2D` → 类型改为 **Dynamic**（受重力下落）
2. `BoxCollider2D` 添加碰撞体；把 `RigidBody2D` 的 `Fixed Rotation` 打开（防翻倒）
3. Add Component → `TransformComponent` 已有；把 `Player` 的 Transform 缩放调小一点（如 `(0.5, 0.5)`）

### 3. 相机

场景树右键「新建 → 相机」，位置 `(0, 0)`。没有相机时播放会自动补一个，但有个自己的相机更可控（相机缩放 = 你看世界的倍率，随意调）。

### 4. 保存

`Ctrl+S` 存成 `Scenes/Game.scene`。

## 三、让玩家动起来（第一个行为脚本）

游戏逻辑写在 `Scripts/Behaviors.h`。菜单「编辑 → 打开代码…」（`Ctrl+Shift+O`）用你选的 IDE 打开项目，编辑这个文件：

```cpp
class SHIT_REFLECT(BlackList) PlayerController : public Shit::Behavior {
    SHIT_REFLECT_BODY(PlayerController)
public:
    void onStart() override {
        m_transform = getOwner()->getComponent<Shit::TransformComponent>();
        m_body      = getOwner()->getComponent<Shit::RigidBody2D>();
    }

    void onUpdate() override {
        if (!m_body) return;

        // 左右移动：直接设定水平速度（保留当前竖直速度，重力照常）
        const float h = Shit::Input::GetAxis("Horizontal");
        Shit::Vector2 v = m_body->getLinearVelocity();
        m_body->setLinearVelocity({ h * m_moveSpeed, v.y });

        // 跳跃：仅在着地时触发
        if (Shit::Input::IsActionDown("Jump") && m_grounded)
            m_body->applyImpulse({ 0.0f, -m_jumpImpulse });
    }

    // 碰撞回调：落地 / 离地
    void onCollisionEnter(Shit::GameObject* other) override {
        if (other->getTag() == "ground") m_grounded = true;
    }
    void onCollisionExit(Shit::GameObject* other) override {
        if (other->getTag() == "ground") m_grounded = false;
    }

private:
    SHIT_META(Disable)
    Shit::TransformComponent* m_transform = nullptr;
    SHIT_META(Disable)
    Shit::RigidBody2D* m_body = nullptr;
    SHIT_META(Disable)
    bool m_grounded = false;

    float m_moveSpeed   = 240.0f;   // 反射字段，检查器可微调
    float m_jumpImpulse = 420.0f;
};
```

别急着编译——脚本里用了 `ground` 标签，得先给地面打上。

## 四、给地面打标签（顺便演示 Tag）

在同一文件里加一个微型行为：

```cpp
class SHIT_REFLECT(BlackList) Ground : public Shit::Behavior {
    SHIT_REFLECT_BODY(Ground)
public:
    void onStart() override { getOwner()->setTag("ground"); }
};
```

回到编辑器按 **`Ctrl+B`** 构建（首次会配置脚本工程：自动探测 VS / MinGW，可能要几十秒，看左下角日志）。成功后两种 `Add Component` 都会出现在检查器/右键菜单里：

- 给 `Ground` 添加 → `Ground`
- 给 `Player` 添加 → `PlayerController`

::: warning
`Ctrl+B` 成功后再点 Add Component——新类型要等反射注册完成后才能实例化。
:::

## 五、播放调试

点 **▶ 运行**。玩家从天上掉下来落在平台上：

- **A / D**（或 ←/→，映射见下）左右移动
- **空格** 跳跃——注意空格只在落地后触发，空中再按无效（`m_grounded` 控制）

按键映射来自项目模板默认值；想改键：「文件 → 项目设置… → 输入页」，点键名进入「按下任意键」捕获。`Horizontal` 轴与 `Jump` 动作改完即存即生效。

**■ 停止**：运行期的一切改动（位置、速度、甚至被删的对象）都会回滚到运行前快照——放心折腾。

## 六、金币：碰撞 + 计分 + 音效

放一枚金币：拖入一张金币图 → 重命名 `Coin` → 放在 `(100, -40)`：

1. Add Component → `RigidBody2D`（**Kinematic**，不受重力、不会被推走）、`CircleCollider2D`（半径约 12）
2. 加一个 UI 文本：场景树右键「新建 → 文本」（自动挂到 Canvas 下），把它放到屏幕左上角，文字改成 `金币: 0`
3. 给 `Coin` 加行为 `CoinPickup`，并把它的**计分文本引用字段**（`ComponentRef<UIText>`）用检查器拖拽赋给那个文本对象：

```cpp
class SHIT_REFLECT(BlackList) CoinPickup : public Shit::Behavior {
    SHIT_REFLECT_BODY(CoinPickup)
public:
    void onStart() override {
        m_ui = m_scoreText.get();   // ComponentRef → 实际组件（目标销毁自动失效）
    }

    void onCollisionEnter(Shit::GameObject* other) override {
        if (other->getTag() != "player") return;   // 只有玩家碰到才收
        m_total += 1;
        if (m_ui) m_ui->setText("金币: " + std::to_string(m_total));
        Shit::AudioPlayer::Play("Assets/coin.wav", "sfx");
        getOwner()->destroy();                      // 金币消失（帧末清理）
    }

private:
    SHIT_META(({.displayName = "计分文本", .tooltip = "拖一个 UIText 进来"}))
    Shit::ComponentRef<Shit::UIText> m_scoreText;

    SHIT_META(Disable)
    Shit::UIText* m_ui = nullptr;
    SHIT_META(Disable)
    int m_total = 0;
};
```

4. 别忘了给玩家打 `player` 标签（再写一个三行行为，或复制 `Ground` 改改名字——标签是运行时字符串，怎么实现都行）；放一段 `coin.wav` 到 `Assets/`

再次 `Ctrl+B` → **▶ 运行** → 走过去一碰金币：音效响起、计数 +1、金币消失。

::: info 这一节背后
碰撞回调由物理系统按接触对驱动（`onCollisionEnter/Stay/Exit`），回调里**可以安全销毁对象**（走延时删除）；`ComponentRef<UIText>` 只存 UUID、检查器可拖拽赋值、序列化进 `.scene`。都记在手册里。
:::

## 七、启动场景与导出

1. 「文件 → 项目设置… → 通用 → 启动场景」选 `Scenes/Game.scene`——这样打开项目/导出运行都会直接进你的游戏
2. 多放几枚金币（选中 `Coin` 按 `Ctrl+C / Ctrl+V` 复制粘贴，拖到不同位置），`Ctrl+S` 保存
3. 「文件 → 导出游戏…」→ 输出目录 → 得到 `CoinGame.exe`

把导出目录整个拷到另一台 Windows 机器上双击 `CoinGame.exe`——你的第一个游戏发布出去了。

## 继续深入

| 话题 | 去这里 |
|---|---|
| 编辑器全部功能（Gizmo / 撤销重做 / 播放态 / 动画窗口 / 瓦片刷图…） | [可视化编辑器](/guide/editor) |
| 组件生命周期、Prefab、`ComponentRef` | [游戏对象与组件](/guide/game-objects) |
| 场景文件 .scene 与序列化 | [场景管理](/guide/scene) |
| Animator 状态机 / `.anim` 资产 | [动画系统](/guide/animation) |
| 关节、碰撞回调、物理自愈 | [物理系统](/guide/physics) |
| 动作/轴映射与按键捕获 | [输入系统](/guide/input) |
| 分层音频 / 事件总线 | [音频系统](/guide/audio) · [事件系统](/guide/events) |