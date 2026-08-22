---
title: 手册总览
lang: zh_CN
---

# 手册总览

> 按顺序读完「入门」三篇即可上手；本手册是按主题查阅的参考书，不必从头读到尾。

## 推荐阅读顺序

::: tip 第一次接触 ShitEngine？
1. [引擎概览](/guide/introduction) —— 引擎的组成与设计思想（10 分钟）
2. [快速开始](/guide/quick_start) —— 装好 SDK，拖出一个可运行场景（15 分钟）
3. [教程：第一个游戏](/guide/tutorial) —— 平台跳跃 + 金币收集完整实战（60 分钟）
4. 之后遇到具体主题再查下面的手册分册
:::

## 手册分册

| 分册 | 内容 | 什么时候查 |
|------|------|-----------|
| [可视化编辑器](/guide/editor) | 项目系统、场景树 / 检查器 / 视口 / Gizmo、播放调试、导出、全部快捷键 | 用编辑器的任何时刻 |
| [游戏对象与组件](/guide/game-objects) | GameObject 模型、启用/标签、内置组件表、生命周期、Behavior 写法、Prefab 与 ComponentRef | 写脚本前通读一遍 |
| [场景与系统](/guide/scene) | `.scene` 格式、加载切换、自定义 System、场景系统面板 | 组织关卡结构时 |
| [反射系统](/guide/reflection) | 反射宏全解、字段元数据、TypeRegistry 运行时 API、序列化载体模式 | 让自定义组件进编辑器时 |
| [渲染与相机](/guide/rendering) | 逻辑分辨率、精灵与图集、相机缩放与分屏 | 画面相关的一切 |
| [物理系统](/guide/physics) | 刚体 / 碰撞体 / 关节、碰撞回调、自愈注册 | 做玩法交互时 |
| [输入系统](/guide/input) | 三态查询、动作/轴映射、鼠标与滚轮 | 读玩家操作时 |
| [逐帧动画](/guide/animation) | AnimationClip、Animator 状态机、编辑器双窗口 | 角色动起来 |
| [音频系统](/guide/audio) | 轨道组分层增益、AudioSource 场景组件 | 加声音时 |
| [UI 系统](/guide/ui) | UITransform 锚点、Canvas / 控件、文本输入 | 做菜单和 HUD 时 |
| [事件系统](/guide/events) | EventBus 缓冲队列、订阅退订、回调安全性 | 模块间解耦通信 |
| [配置系统](/guide/config) | 双配置文件、输入映射格式、资产根与相对路径解析 | 改参数、管资源路径时 |

## API 文档

全部公有类与方法的签名级参考在 [API 参考（Doxygen）](/api/)——本手册讲"怎么用"，API 站查"有哪些重载"。
