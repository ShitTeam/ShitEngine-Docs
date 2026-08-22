import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "ShitEngine",
  description: "基于 C++20 的轻量级 2D 游戏引擎",

  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/logo.png' }]
  ],

  themeConfig: {
    logo: '/logo.png',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },

    nav: [
      { text: '主页', link: '/' },
      { text: '入门', link: '/guide/introduction' },
      { text: '手册', link: '/guide/index' },
      { text: 'API 参考', link: '/api/' }
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
          { text: '手册总览', link: '/guide/index' },
          { text: '可视化编辑器', link: '/guide/editor' },
          { text: '游戏对象与组件', link: '/guide/game-objects' },
          { text: '场景与系统', link: '/guide/scene' },
          { text: 'UI 系统', link: '/guide/ui' },
          { text: '反射系统', link: '/guide/reflection' },
          { text: '渲染与相机', link: '/guide/rendering' },
          { text: '物理系统', link: '/guide/physics' },
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
          { text: 'Doxygen 文档', link: '/api/' }
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
      pattern: 'https://github.com/ShitTeam/ShitEngine-Docs/edit/main/docs/:path'
    }
  }
})
