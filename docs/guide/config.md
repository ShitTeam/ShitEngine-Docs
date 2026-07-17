---
title: 配置系统
lang: zh_CN
---

# 配置系统

> 不改代码就能改游戏参数——这就是配置系统的意义。

ShitEngine 使用一个 JSON 文件来管理项目和窗口配置。没有配置文件时，引擎会用默认值正常运行。

---

## settings.json

在项目根目录下创建 `settings.json`：

```json
{
  "project": {
    "name": "My Game"
  },
  "window": {
    "title": "My Game - ShitEngine",
    "width": 1920,
    "height": 1080,
    "targetFPS": 60
  }
}
```

`Config::Init()` 在 `Game::Init()` 中自动调用。如果找不到 `settings.json`，所有字段使用默认值。

---

## 配置字段

### ProjectConfig

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `name` | string | `"Example"` | 项目名称 |

### WindowConfig

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | string | `"Example"` | 窗口标题 |
| `width` | uint | `1280` | 逻辑分辨率宽度 |
| `height` | uint | `720` | 逻辑分辨率高度 |
| `targetFPS` | uint | `144` | 帧率上限 |

---

## 在代码中读取配置

```cpp
// 项目名称
std::string name = Config::GetProjectConfig().name;

// 窗口参数
auto& win = Config::GetWindowConfig();
unsigned int fps = win.targetFPS;       // → 144
unsigned int w = win.width;             // → 1280
std::string title = win.title;          // → "Example"
```

---

## 修改帧率

最常用的操作——改帧率上限：

```json
{
  "window": {
    "targetFPS": 60
  }
}
```

也可以在代码中动态修改：

```cpp
Time::SetTargetFPS(60);
unsigned int current = Time::GetTargetFPS();
```

::: info
`targetFPS` 控制的是上限，实际帧率还取决于系统负载和渲染耗时。
:::

---

## 逻辑分辨率与窗口大小

`WindowConfig::width/height` 设置的是**逻辑分辨率**（Renderer 的坐标空间），不是实际窗口像素大小。

实际窗口会自动按比例缩放，多出的部分用黑边（Letterbox）填满。

```json
{
  "window": {
    "width": 640,
    "height": 480
  }
}
```

这意味着你的游戏代码永远在 640×480 的坐标空间里写——窗口怎么拖拽、怎么缩放都不影响。

---

## 无配置文件运行

`settings.json` 是可选的。没有它，引擎用所有默认值正常启动——这也是为什么 Quick Start 里不需要你创建这个文件。
