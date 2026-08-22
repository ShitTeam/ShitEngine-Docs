---
title: 配置系统
lang: zh_CN
---

# 配置系统

> 不改代码就能改游戏参数——这就是配置系统的意义。

ShitEngine 使用 JSON 文件管理项目、窗口和输入映射配置。没有配置文件时，引擎会用默认值正常运行。

引擎读取两个文件（均位于可执行文件同目录），**`config.json` 的 `inputMappings` 会覆盖 `settings.json`**：

| 文件 | 内容 | 谁生成 |
|---|---|---|
| `settings.json` | 窗口 / 项目 / 输入映射（可选，缺失用默认值） | 手写 |
| `config.json` | `scene`（启动场景）、`plugins`（插件 DLL）、`engine.sdkDir`、`inputMappings` | 编辑器「项目设置」/ 导出游戏自动生成 |

---

## 编辑器项目 config.json

编辑器「文件 → 项目设置…」把项目名、SDK 目录、启动场景、输入映射写入项目的 `config.json`；「导出游戏」也会自动生成一份（scene / plugins / inputMappings）。Runtime 启动时读 `config.json` 顶层 `"scene"` 字段 → `SceneManager::LoadSceneFromFile`，`inputMappings` 与 `settings.json` 同构合并（编程者手写 `settings.json` 时可以直接用下面的 `inputMappings` 段）。

---

## settings.json

在**可执行文件同目录**创建 `settings.json`（导出的游戏包内即 exe 旁；编辑器直接运行 SDK 时为 `bin/` 目录）：

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
  },
  "inputMappings": {
    "actions": {
      "Jump":   ["Space"],
      "Attack": ["J", "E"]
    },
    "axes": {
      "Horizontal": { "negative": ["A"], "positive": ["D"] },
      "Vertical":   { "negative": ["S"], "positive": ["W"] }
    }
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

```cpp
std::string name = Config::GetProjectConfig().name;
```

### WindowConfig

| 字段 | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `title` | string | `"Example"` | 窗口标题 |
| `width` | unsigned int | `1280` | 逻辑分辨率宽度 |
| `height` | unsigned int | `720` | 逻辑分辨率高度 |
| `targetFPS` | unsigned int | `144` | 帧率上限 |

```cpp
auto& win = Config::GetWindowConfig();
unsigned int fps = win.targetFPS;   // → 144
int w = win.width;                  // → 1280
std::string title = win.title;      // → "Example"
```

### InputMappings（输入映射）

| 字段 | 类型 | 说明 |
|---|---|---|
| `actions` | object | 动作名 → 绑定键列表，如 `"Jump": ["Space"]` |
| `axes` | object | 轴名 → `{ negative: [...], positive: [...] }` |

键名使用 SDL 官方 scancode 名。也接受无空格别名（`LeftShift` → `Left Shift`）。鼠标用 `MouseButton.Left`/`Right`/`Middle`/`XButton1`/`XButton2`。

详见 [输入系统](/guide/input)。

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

这意味着你的游戏代码永远在 640x480 的坐标空间里写——窗口怎么拖拽全都没影响。

---

## 无配置文件运行

`settings.json` 是可选的。没有它，引擎用所有默认值正常启动——这也是为什么 Quick Start 里不需要你创建这个文件。

---

## 资产路径与资产根

组件里的资源路径（纹理 / 字体 / 音频）支持两种写法，加载时自动解析：

- **绝对路径**：原样使用；
- **相对路径**：先按**资产根**（asset root）解析——命中即用；未命中回退到进程工作目录，再回退 exe 旁的 `resource/`、`assets/`、`Assets/` 目录。

编辑器打开项目时会把资产根设为**项目根目录**，因此项目内相对路径（如 `Assets/hero.png`）在编辑器与运行视图里都能直接加载。编辑器写入的路径字段（拖拽填充、浏览选择、视口拖入建精灵）统一保存为**相对项目根**的形式；手写的旧场景若存的是绝对路径也照常兼容。导出游戏时会自动归一化资源路径为包内相对路径。

代码侧对应 `ResourceManager::SetAssetRoot()` / `ResolveAssetPath()`（详见 [API 文档](/api/)）。