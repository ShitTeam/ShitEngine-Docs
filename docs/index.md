---
layout: home
title: "ShitEngine: 轻量级 C++ 2D 游戏引擎"

hero:
  name: "ShitEngine"
  text: "轻量级 C++ 2D 游戏引擎"
  tagline: 基于 C++20 与 SDL3 的组件化 2D 游戏引擎 + Qt 可视化编辑器，提供场景管理、多相机渲染、反射序列化、Box2D 物理与开箱即用的游戏基础设施
  image:
    src: /logo.png
    alt: ShitEngine Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quick_start
    - theme: alt
      text: 可视化编辑器
      link: /guide/editor

features:
  - title: 可视化编辑器
    details: 进程内嵌 Qt 编辑器——场景树、属性检查器、双视口、Gizmo、撤销/重做、Unity 式播放态与游戏导出，场景零代码搭建。
  - title: 组件化架构
    details: GameObject 对象挂载 Component，System 统一驱动生命周期。逻辑与渲染分离，职责清晰。
  - title: 数据驱动场景
    details: 场景只来自 .scene 文件，反射序列化字段随场景落盘。编辑器、Runtime、关卡切换共用同一加载器。
  - title: 编译期反射
    details: 基于 libClang 的标注扫描，自动生成类型注册代码。组件引用字段存 UUID 序列化，跨编辑会话稳定且永不悬垂。
  - title: 动画状态机
    details: Animator 组件以参数驱动状态转换（float/bool/trigger），剪辑可序列化为 .anim 资产；编辑器提供状态机图与帧动画时间轴。
  - title: 2D 物理
    details: Box2D 封装：刚体、碰撞体、关节（距离/铰链/焊接/滑动），碰撞回调直达 Behavior，像素单位无需换算。
---
