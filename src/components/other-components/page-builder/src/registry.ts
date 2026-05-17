import type { PageBuilderWidgetCategory, PageBuilderWidgetDefinition } from './types'
import { XButton } from '../../../basic-components/button'
import { XCheckbox } from '../../../form-components/checkbox'
import { XDialog } from '../../../feedback-components/dialog'
import { XFileDisk } from '../../file-disk'
import { XForm } from '../../../form-components/form'
import { XInput } from '../../../form-components/input'
import { XJsonEditor } from '../../json-editor'
import { XLayout } from '../../../basic-components/layout'
import { XLogin } from '../../login'
import { XNavMenu } from '../../../navigation-components/nav-menu'
import { XRadio } from '../../../form-components/radio'
import { XRichTextEditor } from '../../rich-text-editor'
import { XSelect } from '../../../form-components/select'
import { XSwitch } from '../../../form-components/switch'
import { XTable } from '../../../display-components/table'
import { XTabs } from '../../../navigation-components/tabs'
import { XTree } from '../../../display-components/tree'

export const pageBuilderCategoryLabels: Record<PageBuilderWidgetCategory, string> = {
  layout: '布局容器',
  basic: '基础组件',
  form: '表单组件',
  data: '数据展示',
  business: '业务组件',
  feedback: '反馈组件',
  fields: '字段'
}

export const pageBuilderWidgets = [
  {
    type: 'container',
    component: 'PageBuilderContainer',
    category: 'layout',
    label: '容器',
    description: '来自 PageBuilder 的唯一内置容器组件，可继续承载 x.ui 组件。',
    previewIcon: 'ri-layout-grid-line',
    acceptsChildren: true,
    defaultLayout: { x: 0, y: 0, w: 6, h: 4 },
    defaultProps: {
      title: '内容容器',
      columns: 2,
      gap: 0,
      padding: 0,
      background: '#ffffff',
      borderColor: '#d8e2ec'
    }
  },
  {
    type: 'x-button',
    component: 'XButton',
    category: 'basic',
    label: '按钮 Button',
    description: 'x.ui 操作按钮。',
    previewIcon: 'ri-rectangle-line',
    renderer: XButton,
    defaultLayout: { x: 0, y: 0, w: 3, h: 1 },
    defaultProps: { variant: 'solid', size: 'md' },
    defaultSlots: { default: '确认' }
  },
  {
    type: 'x-input',
    component: 'XInput',
    category: 'form',
    label: '输入框 Input',
    description: 'x.ui 单行输入框。',
    previewIcon: 'ri-input-field',
    renderer: XInput,
    defaultLayout: { x: 0, y: 0, w: 4, h: 1 },
    defaultProps: { modelValue: '', placeholder: '请输入内容', clearable: true, size: 'md' }
  },
  {
    type: 'x-select',
    component: 'XSelect',
    category: 'form',
    label: '下拉框 Select',
    description: 'x.ui 下拉选择器。',
    previewIcon: 'ri-list-check-2',
    renderer: XSelect,
    defaultLayout: { x: 0, y: 0, w: 4, h: 1 },
    defaultProps: {
      modelValue: 'enabled',
      placeholder: '请选择',
      size: 'md',
      options: [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' }
      ]
    }
  },
  {
    type: 'x-checkbox',
    component: 'XCheckbox',
    category: 'form',
    label: '多选框 Checkbox',
    description: 'x.ui 多选控制。',
    previewIcon: 'ri-checkbox-line',
    renderer: XCheckbox,
    defaultLayout: { x: 0, y: 0, w: 3, h: 1 },
    defaultProps: { modelValue: true, label: '启用选项', value: true, size: 'md' }
  },
  {
    type: 'x-radio',
    component: 'XRadio',
    category: 'form',
    label: '单选框 Radio',
    description: 'x.ui 单选控制。',
    previewIcon: 'ri-radio-button-line',
    renderer: XRadio,
    defaultLayout: { x: 0, y: 0, w: 3, h: 1 },
    defaultProps: { modelValue: 'default', value: 'default', label: '默认项', size: 'md' }
  },
  {
    type: 'x-switch',
    component: 'XSwitch',
    category: 'form',
    label: '开关 Switch',
    description: 'x.ui 开关控制。',
    previewIcon: 'ri-toggle-line',
    renderer: XSwitch,
    defaultLayout: { x: 0, y: 0, w: 3, h: 1 },
    defaultProps: { modelValue: true, activeText: '开', inactiveText: '关', size: 'md' }
  },
  {
    type: 'x-form',
    component: 'XForm',
    category: 'form',
    label: '表单 Form',
    description: 'x.ui 表单容器预览。',
    previewIcon: 'ri-survey-line',
    renderer: XForm,
    defaultLayout: { x: 0, y: 0, w: 5, h: 3 },
    defaultProps: { labelPosition: 'left', labelWidth: '88px', size: 'md' },
    defaultSlots: { default: '表单内容区域' }
  },
  {
    type: 'x-tabs',
    component: 'XTabs',
    category: 'data',
    label: '标签页 Tabs',
    description: 'x.ui 标签页。',
    previewIcon: 'ri-layout-top-line',
    renderer: XTabs,
    defaultLayout: { x: 0, y: 0, w: 6, h: 3 },
    defaultProps: {
      modelValue: 'overview',
      showAvatar: false,
      items: [
        { name: 'overview', label: '概览' },
        { name: 'detail', label: '明细' }
      ]
    },
    defaultSlots: { default: '标签页内容' }
  },
  {
    type: 'x-table',
    component: 'XTable',
    category: 'data',
    label: '表格 Table',
    description: 'x.ui 表格。',
    previewIcon: 'ri-table-line',
    renderer: XTable,
    defaultLayout: { x: 0, y: 0, w: 8, h: 4 },
    defaultProps: {
      data: [
        { id: 1, name: '需求评审', status: '进行中' },
        { id: 2, name: '组件联调', status: '待开始' }
      ],
      columns: [
        { key: 'name', label: '名称' },
        { key: 'status', label: '状态' }
      ]
    }
  },
  {
    type: 'x-tree',
    component: 'XTree',
    category: 'data',
    label: '树目录 Tree',
    description: 'x.ui 树目录。',
    previewIcon: 'ri-node-tree',
    renderer: XTree,
    defaultLayout: { x: 0, y: 0, w: 4, h: 4 },
    defaultProps: {
      treeData: [
        {
          id: 'root',
          label: '根节点',
          type: 'group',
          children: [{ id: 'child', label: '子节点', type: 'document' }]
        }
      ]
    }
  },
  {
    type: 'x-nav-menu',
    component: 'XNavMenu',
    category: 'data',
    label: '菜单 NavMenu',
    description: 'x.ui 导航菜单。',
    previewIcon: 'ri-menu-line',
    renderer: XNavMenu,
    defaultLayout: { x: 0, y: 0, w: 4, h: 4 },
    defaultProps: {
      activeKey: 'dashboard',
      items: [
        { key: 'dashboard', label: '工作台', icon: 'ri-dashboard-line' },
        { key: 'settings', label: '系统设置', icon: 'ri-settings-3-line' }
      ]
    }
  },
  {
    type: 'x-layout',
    component: 'XLayout',
    category: 'layout',
    label: '布局 Layout',
    description: 'x.ui 应用布局。',
    previewIcon: 'ri-layout-2-line',
    renderer: XLayout,
    defaultLayout: { x: 0, y: 0, w: 8, h: 5 },
    defaultProps: { mode: 'top-sidebar', gap: 4, sidebarWidth: 120, topbarHeight: 42, footerHeight: 28 },
    defaultSlots: { default: '内容区' }
  },
  {
    type: 'x-dialog',
    component: 'XDialog',
    category: 'feedback',
    label: '弹窗 Dialog',
    description: 'x.ui 弹窗配置，画布中以静态摘要呈现。',
    previewIcon: 'ri-window-line',
    renderer: XDialog,
    defaultLayout: { x: 0, y: 0, w: 4, h: 2 },
    defaultProps: { modelValue: false, title: '弹窗标题', width: 420 },
    defaultSlots: { default: '弹窗内容' }
  },
  {
    type: 'x-json-editor',
    component: 'XJsonEditor',
    category: 'business',
    label: 'JSON编辑器 JsonEditor',
    description: 'x.ui JSON 编辑器。',
    previewIcon: 'ri-code-box-line',
    renderer: XJsonEditor,
    defaultLayout: { x: 0, y: 0, w: 6, h: 4 },
    defaultProps: { modelValue: '{\n  "enabled": true\n}', title: 'JSON 数据对象', resizable: false }
  },
  {
    type: 'x-login',
    component: 'XLogin',
    category: 'business',
    label: '登录 Login',
    description: 'x.ui 登录表单。',
    previewIcon: 'ri-login-box-line',
    renderer: XLogin,
    defaultLayout: { x: 0, y: 0, w: 5, h: 5 },
    defaultProps: { title: '欢迎登录', description: '页面构建器预览', username: 'admin', showRegister: false }
  },
  {
    type: 'x-file-disk',
    component: 'XFileDisk',
    category: 'business',
    label: '文件磁盘 FileDisk',
    description: 'x.ui 文件管理面板。',
    previewIcon: 'ri-folder-3-line',
    renderer: XFileDisk,
    defaultLayout: { x: 0, y: 0, w: 7, h: 5 },
    defaultProps: {
      title: '附件管理',
      showPath: false,
      entries: [
        { id: 'doc', name: '产品方案.docx', type: 'file', size: 24576 },
        { id: 'folder', name: '设计素材', type: 'folder' }
      ]
    }
  },
  {
    type: 'x-rich-text-editor',
    component: 'XRichTextEditor',
    category: 'business',
    label: '富文本 RichTextEditor',
    description: 'x.ui 富文本编辑器。',
    previewIcon: 'ri-edit-box-line',
    renderer: XRichTextEditor,
    defaultLayout: { x: 0, y: 0, w: 7, h: 5 },
    defaultProps: {
      fallbackHtml: '<p>这里是富文本内容。</p>',
      showToolbar: true,
      minHeight: 180
    }
  }
] satisfies PageBuilderWidgetDefinition[]

export function getPageBuilderWidget(type: string) {
  return pageBuilderWidgets.find((widget) => widget.type === type)
}

export function isPageBuilderContainer(type: string) {
  return Boolean(getPageBuilderWidget(type)?.acceptsChildren)
}
