import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'x.ui',
  description: 'Vue 3 UI 组件库',
  lang: 'zh-CN',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '组件测试', link: '/guide/testing' }
        ]
      },
      {
        text: '组件',
        items: [
          { text: '按钮 Button', link: '/components/button' },
          { text: '弹窗 Dialog', link: '/components/dialog' },
          { text: '布局 Layout', link: '/components/layout' },
          { text: '菜单 NavMenu', link: '/components/nav-menu' },
          { text: '树目录 Tree', link: '/components/tree' },
          { text: '标签页 Tabs', link: '/components/tabs' },
          { text: '表格 Table', link: '/components/table' },
          { text: '登录 Login', link: '/components/login' },
          { text: '富文本 RichTextEditor', link: '/components/rich-text-editor' },
          { text: 'JSON编辑器 JsonEditor', link: '/components/json-editor' }
        ]
      }
    ],
    socialLinks: []
  },
  vite: {
    resolve: {
      alias: {
        'x.ui': '/src/index.ts'
      }
    }
  }
})
