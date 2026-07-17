import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ShitEngine",
  description: "基于 C++20 的轻量级 2D 游戏引擎",

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    logo: '/logo.png',

    nav: [
      { text: '主页', link: '/' },
      { text: '入门', link: '/guide/introduction' },
      { text: '手册', link: '/guide/scene' },
      { text: 'API 参考', link: '/api/api' }
    ],

    sidebar: [
      {
        text: '入门',
        items: [
          { text: '引擎概览', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/quick_start' },
          { text: '教程：第一个游戏', link: '/guide/tutorial' }
        ]
      },
      {
        text: '手册',
        items: [
          { text: '游戏对象与组件', link: '/guide/game-objects' },
          { text: '场景与系统', link: '/guide/scene' },
          { text: '渲染与相机', link: '/guide/rendering' },
          { text: '输入系统', link: '/guide/input' },
          { text: '逐帧动画', link: '/guide/animation' },
          { text: '音频系统', link: '/guide/audio' },
          { text: '事件系统', link: '/guide/events' },
          { text: '配置系统', link: '/guide/config' }
        ]
      },
      {
        text: 'API 参考',
        items: [
          { text: '概览', link: '/api/api' },
          { text: 'Game — 引擎入口', link: '/api/Shit-Game' },
          { text: 'Window — 窗口管理', link: '/api/Shit-Window' },
          { text: 'Time — 时间与帧率', link: '/api/Shit-Time' },
          { text: 'Config — 配置系统', link: '/api/Shit-Config' },
          { text: 'Component — 组件基类', link: '/api/Shit-Component' },
          { text: 'Behavior — 自定义脚本', link: '/api/Shit-Behavior' },
          { text: 'TransformComponent — 变换', link: '/api/Shit-TransformComponent' },
          { text: 'SpriteRenderer — 精灵渲染', link: '/api/Shit-SpriteRenderer' },
          { text: 'CameraComponent — 相机', link: '/api/Shit-CameraComponent' },
          { text: 'AnimationComponent — 动画', link: '/api/Shit-AnimationComponent' },
          { text: 'GameObject — 游戏对象', link: '/api/Shit-GameObject' },
          { text: 'Prefab — 预制体', link: '/api/Shit-Prefab' },
          { text: 'Scene — 场景', link: '/api/Shit-Scene' },
          { text: 'SceneManager — 场景栈', link: '/api/Shit-SceneManager' },
          { text: 'System — 自定义系统', link: '/api/Shit-System' },
          { text: 'Renderer — 渲染器', link: '/api/Shit-Renderer' },
          { text: 'Sprite / SpriteSheet / Animation', link: '/api/Shit-Sprite' },
          { text: 'AudioPlayer — 音频播放', link: '/api/Shit-AudioPlayer' },
          { text: 'AudioTrack — 轨道控制', link: '/api/Shit-AudioTrack' },
          { text: 'EventBus — 事件总线', link: '/api/Shit-EventBus' },
          { text: 'Input — 输入系统', link: '/api/Shit-Input' },
          { text: 'ResourceManager — 资源缓存', link: '/api/Shit-ResourceManager' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ShitTeam' }
    ],

    footer: {
      copyright: `Copyright © 2024-${new Date().getFullYear()} ShitTeam. All rights reserved.`
    },

    editLink: {
      pattern: 'https://github.com/ShitTeam/ShitEngine/edit/main/docs/:path'
    }
  }
})
