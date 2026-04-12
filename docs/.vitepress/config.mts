import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ShitEngine",
  description: "一个 C++ 2D游戏引擎",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '教程', link: '/guide/introduction' }
    ],

    sidebar: [
      {
        text: '教程',
        items: [
          { text: '了解更多', link: '/guide/introduction' },
          { text: '快速开始', link: '/guide/quick_start' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ShitTeam' }
    ]
  }
})
