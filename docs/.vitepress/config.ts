import { defineConfig } from 'vitepress'
import { exampleImports } from './example-imports'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const siteUrl = 'https://maxcole25.github.io/x.ui/'

export default defineConfig({
  title: 'Soft88 X.UI',
  description: 'Vue 3 + TypeScript UI Component Library',
  base: '/x.ui/',
  lang: 'zh-CN',
  sitemap: { hostname: siteUrl },
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/x.ui/logo.svg' }],
    ['meta', { name: 'keywords', content: 'Soft88 X.UI、Vue 3、TypeScript、UI Components、Vue Component Library、免 CSS 开发、企业级前端组件库' }],
    ['meta', { property: 'og:site_name', content: 'Soft88 X.UI' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: siteUrl + 'logo.svg' }]
  ],
  transformPageData(pageData) {
    if (pageData.relativePath === '404.md') return
    if (!pageData.frontmatter.description) {
      const source = readFileSync(resolve('docs', pageData.relativePath), 'utf8')
        .replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
      const paragraph = source.split(/\r?\n\s*\r?\n/).find(part => {
        const text = part.trim()
        return text && !/^(?:#|<|\||```|~~~)/.test(text)
      })
      pageData.description = pageData.frontmatter.description = paragraph
        ? paragraph.replace(/[`*]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\s+/g, ' ').trim().slice(0, 180)
        : `${pageData.title}：Soft88 X.UI 的使用方法、API 与 Vue 3 TypeScript 示例。`
    }
  },
  transformHead({ pageData }) {
    if (pageData.relativePath === '404.md') return [['meta', { name: 'robots', content: 'noindex' }]]
    const url = siteUrl + pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '.html')
    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: pageData.title && pageData.title !== 'Soft88 X.UI' ? `${pageData.title} | Soft88 X.UI` : 'Soft88 X.UI' }],
      ['meta', { property: 'og:description', content: pageData.description }]
    ]
  },
  buildEnd() {
    execFileSync(process.execPath, ['scripts/docs-assets.mjs'], { stdio: 'inherit' })
  },
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button' },
      { text: '图标', link: '/components/icon' }
    ],
    sidebar: [
      {
        text: '指南',
        collapsed: true,
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: 'AI 使用指南', link: '/guide/ai-usage' },
          { text: '文档部署与维护', link: '/guide/docs-maintenance' },
          { text: '国际化', link: '/guide/i18n' },
          { text: '主题基础色', link: '/guide/theme' },
          { text: '字体与控件高度', link: '/guide/typography' },
          { text: '接口命名规范', link: '/guide/api-naming' },
          { text: '接口命名审计', link: '/guide/api-naming-audit' },
          { text: '组件测试', link: '/guide/testing' },
          { text: '优化进度', link: '/guide/optimization-progress' }
        ]
      },

          {
            text: '基础组件',
            collapsed: true,
            items: [
              { text: '按钮 Button', link: '/components/button' },
              { text: '按钮组 ButtonGroup', link: '/components/button-group' },
              { text: '基础输入框 BaseInput', link: '/components/base-input' },
              { text: '砖格 Brick', link: '/components/brick' },
              { text: '可拖拽分栏 Splitter', link: '/components/splitter' },
              { text: '卡片 Card', link: '/components/card' },
              { text: '分组容器 GroupContainer', link: '/components/group-container' },
              { text: '分割线 Divider', link: '/components/divider' },
              { text: '流式布局 Flow', link: '/components/flow' },
              { text: '宫格 Grid', link: '/components/grid' },
              { text: '图标 Icon', link: '/components/icon' },
              { text: '布局 Layout', link: '/components/layout' },
              { text: '滚动条 Scrollbar', link: '/components/scrollbar' },
              { text: '文本 Text', link: '/components/text' }
            ]
          },
          {
            text: 'Form 组件',
            collapsed: true,
            items: [
              { text: '输入框 Input', link: '/components/input' },
              { text: '多行输入框 Textarea', link: '/components/textarea' },
              { text: '上传 Upload', link: '/components/upload' },
              { text: '自动补全 Autocomplete', link: '/components/autocomplete' },
              { text: '级联选择 Cascader', link: '/components/cascader' },
              { text: '多选框 Checkbox', link: '/components/checkbox' },
              { text: '颜色选择器面板 ColorPickerPanel', link: '/components/color-picker-panel' },
              { text: '颜色选择器 ColorPicker', link: '/components/color-picker' },
              { text: '日期选择器面板 DatePickerPanel', link: '/components/date-picker-panel' },
              { text: '日期选择器 DatePicker', link: '/components/date-picker' },
              { text: '日期时间选择器 DateTimePicker', link: '/components/date-time-picker' },
              { text: '图标选择面板 IconSelect', link: '/components/icon-select' },
              { text: '数字输入框 InputNumber', link: '/components/input-number' },
              { text: '单选框 Radio', link: '/components/radio' },
              { text: '单选按钮 RadioButton', link: '/components/radio-button' },
              { text: '选择器 Select', link: '/components/select' },
              { text: '滑块 Slider', link: '/components/slider' },
              { text: '开关 Switch', link: '/components/switch' },
              { text: '表单 Form', link: '/components/form' },
              { text: '时间选择器 TimePicker', link: '/components/time-picker' },
              { text: '时间选择 TimeSelect', link: '/components/time-select' }
            ]
          },
          {
            text: '展示组件',
            collapsed: true,
            items: [
              { text: '头像 Avatar', link: '/components/avatar' },
              { text: '聊天消息 Chat', link: '/components/chat' },
              { text: '通讯录 ContactList', link: '/components/contact-list' },
              { text: '会话列表 ConversationList', link: '/components/conversation-list' },
              { text: '图表 Chart', link: '/components/chart' },
              { text: '甘特图 Gantt', link: '/components/gantt' },
              { text: '空状态 Empty', link: '/components/empty' },
              { text: '徽标 Badge', link: '/components/badge' },
              { text: '折叠面板 Collapse', link: '/components/collapse' },
              { text: '描述列表 Descriptions', link: '/components/descriptions' },
              { text: '列表 List', link: '/components/list' },
              { text: '进度条 Progress', link: '/components/progress' },
              { text: '骨架屏 Skeleton', link: '/components/skeleton' },
              { text: '统计数值 Statistic', link: '/components/statistic' },
              { text: '滚动文字 ScrollingText', link: '/components/scrolling-text' },
              { text: '表格 Table', link: '/components/table' },
              { text: '标签 Tag', link: '/components/tag' },
              { text: '树目录 Tree', link: '/components/tree' },
              { text: '树表 TreeTable', link: '/components/tree-table' }
            ]
          },
          {
            text: '导航组件',
            collapsed: true,
            items: [
              { text: '下拉菜单 Dropdown', link: '/components/dropdown' },
              { text: '下拉菜单容器 DropdownMenu', link: '/components/dropdown-menu' },
              { text: '下拉菜单项 DropdownItem', link: '/components/dropdown-item' },
              { text: '悬浮按钮组 FloatButtonGroup', link: '/components/float-button-group' },
              { text: '工具栏 Tools', link: '/components/tools' },
              { text: '用户状态 UserStatus', link: '/components/user-status' },
              { text: '面包屑 Breadcrumb', link: '/components/breadcrumb' },
              { text: '分页 Pagination', link: '/components/pagination' },
              { text: '步骤条 Steps', link: '/components/steps' },
              { text: '菜单 NavMenu', link: '/components/nav-menu' },
              { text: '标签页 Tabs', link: '/components/tabs' }
            ]
          },
          {
            text: '反馈组件',
            collapsed: true,
            items: [
              { text: '弹窗 Dialog', link: '/components/dialog' },
              { text: '抽屉 Drawer', link: '/components/drawer' },
              { text: '提示 Alert', link: '/components/alert' },
              { text: '通知 Notification', link: '/components/notification' },
              { text: '气泡卡片 Popover', link: '/components/popover' },
              { text: '气泡确认 Popconfirm', link: '/components/popconfirm' },
              { text: '加载 Loading', link: '/components/loading' },
              { text: '消息提示 Message', link: '/components/message' },
              { text: '消息弹框 MessageBox', link: '/components/message-box' },
              { text: '文字提示 Tooltip', link: '/components/tooltip' }
            ]
          },
          {
            text: '其它组件',
            collapsed: true,
            items: [
              { text: '内部通讯 Messenger', link: '/components/messenger' },
              { text: '文件磁盘 FileDisk', link: '/components/file-disk' },
              { text: '数据表设置 DataTableSettings', link: '/components/data-table-settings' },
              { text: '表格列设置 TableColumnSettings', link: '/components/table-column-settings' },
              { text: 'JSON编辑器 JsonEditor', link: '/components/json-editor' },
              { text: '登录 Login', link: '/components/login' },
              { text: '登录页 LoginPage', link: '/components/login-page' },
              { text: '注册 Register', link: '/components/register' },
              { text: '富文本 RichTextEditor', link: '/components/rich-text-editor' }
            ]
          }
    ],
    search: { provider: 'local' },
    outline: { level: [2, 3], label: '本页目录' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/MaxCole25/x.ui' }]
  },
  vite: {
    plugins: [exampleImports()],
    resolve: {
      alias: {
        '@x-soft88/x-ui': '/src/index.ts'
      }
    }
  }
})
