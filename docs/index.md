---
layout: home
title: "ShitEngine: 轻量级 C++ 2D 游戏引擎"

hero:
  name: "ShitEngine"
  text: "轻量级 C++ 2D 游戏引擎"
  tagline: 基于 C++20 与 SDL3，提供组件化架构、多相机渲染管线与开箱即用的游戏基础设施
  image:
    src: /logo.png
    alt: ShitEngine Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/quick_start
    - theme: alt
      text: 了解更多
      link: /guide/introduction

features:
  - title: 组件化架构
    details: GameObject 对象挂载 Component，System 统一驱动生命周期。逻辑与渲染分离，职责清晰。
  - title: 多相机渲染管线
    details: 支持分屏、比例视口、Z-Index 排序与 Letterbox 等比缩放。一套场景多视角自由组合。
  - title: 内置 UI 系统
    details: Retained-Mode 屏幕空间 UI，锚点定位、按钮、文字、输入框，支持中文 IME。独立渲染通道叠加画面。
  - title: 编译期反射
    details: 基于 libClang 的标注扫描，自动生成类型注册代码。运行时按名称或 type_index 查询字段与基类元信息。
  - title: 分层音频系统
    details: AudioPlayer 驱动 Track / TrackGroup 两级管理，增益层设计为 master × group × track。
  - title: 类型安全事件总线
    details: 缓冲队列模式，回调内可安全订阅与派发。消除递归触发与迭代器失效风险。
---
