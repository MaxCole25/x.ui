import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'x.ui',
  description: 'Vue 3 UI 组件库',
  lang: 'zh-CN',
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
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '主题基础色', link: '/guide/theme' },
          { text: '组件测试', link: '/guide/testing' }
        ]
      },
      {
        text: '组件',
        items: [
          {
            text: '基础组件',
            items: [
              { text: '按钮 Button', link: '/components/button' },
              { text: '按钮组 ButtonGroup', link: '/components/button-group' },
              { text: '基础输入框 BaseInput', link: '/components/base-input' },
              { text: '砖格 Brick', link: '/components/brick' },
              { text: '卡片 Card', link: '/components/card' },
              { text: '分割线 Divider', link: '/components/divider' },
              { text: '宫格 Grid', link: '/components/grid' },
              { text: '图标 Icon', link: '/components/icon' },
              { text: '布局 Layout', link: '/components/layout' },
              { text: '滚动条 Scrollbar', link: '/components/scrollbar' },
              { text: '文本 Text', link: '/components/text' }
            ]
          },
          {
            text: 'Form 组件',
            items: [
              { text: '输入框 Input', link: '/components/input' },
              { text: '自动补全 Autocomplete', link: '/components/autocomplete' },
              { text: '级联选择 Cascader', link: '/components/cascader' },
              { text: '多选框 Checkbox', link: '/components/checkbox' },
              { text: '颜色选择器面板 ColorPickerPanel', link: '/components/color-picker-panel' },
              { text: '颜色选择器 ColorPicker', link: '/components/color-picker' },
              { text: '日期选择器面板 DatePickerPanel', link: '/components/date-picker-panel' },
              { text: '日期选择器 DatePicker', link: '/components/date-picker' },
              { text: '日期时间选择器 DateTimePicker', link: '/components/date-time-picker' },
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
            items: [
              { text: '头像 Avatar', link: '/components/avatar' },
              { text: '图表 Chart', link: '/components/chart' },
              { text: '空状态 Empty', link: '/components/empty' },
              { text: '表格 Table', link: '/components/table' },
              { text: '标签 Tag', link: '/components/tag' },
              { text: '树目录 Tree', link: '/components/tree' }
            ]
          },
          {
            text: '导航组件',
            items: [
              { text: '下拉菜单 Dropdown', link: '/components/dropdown' },
              { text: '下拉菜单容器 DropdownMenu', link: '/components/dropdown-menu' },
              { text: '下拉菜单项 DropdownItem', link: '/components/dropdown-item' },
              { text: '菜单 NavMenu', link: '/components/nav-menu' },
              { text: '标签页 Tabs', link: '/components/tabs' }
            ]
          },
          {
            text: '反馈组件',
            items: [
              { text: '弹窗 Dialog', link: '/components/dialog' },
              { text: '抽屉 Drawer', link: '/components/drawer' },
              { text: '加载 Loading', link: '/components/loading' },
              { text: '消息提示 Message', link: '/components/message' },
              { text: '消息弹框 MessageBox', link: '/components/message-box' },
              { text: '文字提示 Tooltip', link: '/components/tooltip' }
            ]
          },
          {
            text: '其它组件',
            items: [
              { text: '文件磁盘 FileDisk', link: '/components/file-disk' },
              { text: '数据表设置 DataTableSettings', link: '/components/data-table-settings' },
              { text: 'JSON编辑器 JsonEditor', link: '/components/json-editor' },
              { text: '登录 Login', link: '/components/login' },
              { text: '页面构建器 PageBuilder', link: '/components/page-builder' },
              { text: '富文本 RichTextEditor', link: '/components/rich-text-editor' }
            ]
          }
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
