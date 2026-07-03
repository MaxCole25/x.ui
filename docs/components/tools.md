<script setup lang="ts">
import { ref } from 'vue'

const action = ref('')

const toolsBasicItems = [
  {
    key: 'print',
    type: 'button',
    name: '打印',
    showName: false,
    icon: 'printer',
    badgeValue: 12,
    badgeMax: 99,
    onClick: () => {
      action.value = '打印'
    }
  },
  {
    key: 'print-more',
    type: 'split-dropdown',
    children: [
      { key: 'preview', name: '打印预览', command: 'preview' },
      { key: 'export', name: '导出 PDF', command: 'export' }
    ]
  },
  { type: 'separator' },
  {
    key: 'query',
    type: 'dropdown',
    name: '查询条件',
    showName: false,
    icon: 'search',
    badgeDot: true,
    badgeStatus: 'warning',
    disabled: true,
    children: [
      { key: 'today', name: '今日条件', command: 'today' },
      { key: 'advanced', name: '高级查询', command: 'advanced' }
    ]
  },
  { type: 'separator' },
  {
    key: 'refresh',
    type: 'button',
    name: '刷新',
    icon: 'refresh',
    onClick: () => {
      action.value = '刷新'
    }
  },
  {
    key: 'settings',
    type: 'split-dropdown',
    name: '设置',
    showName: false,
    icon: 'settings-3',
    badgeValue: 128,
    badgeMax: 99,
    children: [
      { key: 'column', name: '列设置', command: 'column' },
      { key: 'density', name: '密度设置', command: 'density' }
    ],
    onClick: () => {
      action.value = '设置'
    }
  },
  { type: 'separator' },
  {
    key: 'help',
    type: 'split-dropdown',
    name: '帮助',
    icon: 'question',
    children: [
      { key: 'docs', name: '查看文档', command: 'docs' },
      { key: 'about', name: '关于系统', command: 'about', divided: true }
    ]
  },
  {
    key: 'close',
    type: 'button',
    name: '关闭',
    icon: 'close-circle',
    onClick: () => {
      action.value = '关闭'
    }
  }
]

const toolsBasicCode = `<script setup lang="ts">
import { ref } from 'vue'

const action = ref('')

const toolsBasicItems = [
  {
    key: 'print',
    type: 'button',
    name: '打印',
    showName: false,
    icon: 'printer',
    badgeValue: 12,
    badgeMax: 99,
    onClick: () => { action.value = '打印' }
  },
  {
    key: 'print-more',
    type: 'split-dropdown',
    children: [
      { key: 'preview', name: '打印预览', command: 'preview' },
      { key: 'export', name: '导出 PDF', command: 'export' }
    ]
  },
  { type: 'separator' },
  {
    key: 'query',
    type: 'dropdown',
    name: '查询条件',
    showName: false,
    icon: 'search',
    badgeDot: true,
    badgeStatus: 'warning',
    disabled: true,
    children: [
      { key: 'today', name: '今日条件', command: 'today' },
      { key: 'advanced', name: '高级查询', command: 'advanced' }
    ]
  },
  { type: 'separator' },
  {
    key: 'refresh',
    type: 'button',
    name: '刷新',
    icon: 'refresh',
    onClick: () => { action.value = '刷新' }
  },
  {
    key: 'settings',
    type: 'split-dropdown',
    name: '设置',
    showName: false,
    icon: 'settings-3',
    badgeValue: 128,
    badgeMax: 99,
    children: [
      { key: 'column', name: '列设置', command: 'column' },
      { key: 'density', name: '密度设置', command: 'density' }
    ],
    onClick: () => { action.value = '设置' }
  },
  { type: 'separator' },
  {
    key: 'help',
    type: 'split-dropdown',
    name: '帮助',
    icon: 'question',
    children: [
      { key: 'docs', name: '查看文档', command: 'docs' },
      { key: 'about', name: '关于系统', command: 'about', divided: true }
    ]
  },
  {
    key: 'close',
    type: 'button',
    name: '关闭',
    icon: 'close-circle',
    onClick: () => { action.value = '关闭' }
  }
]
<\/script>

<XTools
  :items="toolsBasicItems"
  @click="(item) => { action = String(item.name ?? item.key) }"
  @command="(command) => { action = String(command) }"
/>
<p>当前动作：{{ action }}</p>`
</script>

# 工具栏 Tools

用于组织页面顶部的轻量操作入口，适合后台列表、报表、编辑器等场景。

## 基础用法

<XDocDemo title="基础用法" :code="toolsBasicCode">
  <ClientOnly>
    <div class="x-demo-column" style="width: 460px">
      <XTools
        :items="toolsBasicItems"
        @click="(item) => { action = String(item.name ?? item.key) }"
        @command="(command) => { action = String(command) }"
      />
      <p class="x-demo-label">当前动作：{{ action }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 工具项类型

| 类型 | 说明 |
| --- | --- |
| `button` | 普通工具按钮，点击执行 `onClick` 并触发 `click` 事件。 |
| `dropdown` | 整个按钮点击打开下拉菜单，不执行主按钮方法。 |
| `split-dropdown` | 主按钮区域执行 `onClick`，右侧箭头打开下拉菜单。 |
| `separator` | 渲染竖向分隔线，用于分隔工具分组。 |

## 图标与角标

工具项设置 `showName: false` 后，按钮只显示图标，`name` 仍会作为按钮的 `title` 和无障碍名称使用。角标能力复用 `XBadge` 的语义，支持数字、最大值、圆点、状态和自定义颜色。角标只显示在顶层工具项图标上，不影响下拉菜单项文字。

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 工具项列表 | `ToolsItem[]` | `[]` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| disabled | 是否禁用整组工具栏 | `boolean` | `false` |
| teleported | 下拉菜单是否挂载到外部 | `boolean` | `false` |
| teleportTo | 下拉菜单挂载目标 | `string` | `body` |
| zIndex | 下拉菜单层级 | `number \| string` | `2000` |
| placement | 下拉菜单弹出位置 | `DropdownPlacement` | `bottom-start` |
| popperWidth | 下拉菜单宽度 | `number \| string` | `148` |

## ToolsItem

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| type | 工具项类型 | `button \| dropdown \| split-dropdown \| separator` |
| key | 工具项唯一标识 | `string \| number` |
| name | 工具项名称 | `string` |
| showName | 是否显示工具项名称，设为 `false` 时只显示图标 | `boolean` |
| icon | 图标名称，使用 `XIcon` 的图标命名 | `string` |
| disabled | 是否禁用当前项 | `boolean` |
| badgeValue | 角标内容 | `string \| number` |
| badgeMax | 数字角标最大值，超过后显示为 `max+` | `number` |
| badgeDot | 是否显示圆点角标 | `boolean` |
| badgeHidden | 是否隐藏角标 | `boolean` |
| badgeStatus | 角标状态 | `primary \| success \| warning \| danger \| info` |
| badgeShowZero | 角标值为 `0` 时是否显示 | `boolean` |
| badgeAccentColor | 角标主题色 | `string` |
| badgeBackgroundColor | 角标背景色 | `string` |
| badgeTextColor | 角标文字色 | `string` |
| badgeBorderColor | 角标边框色 | `string` |
| children | 下拉菜单项 | `ToolsMenuItem[]` |
| onClick | 主按钮点击方法 | `(item, event) => void` |
| onCommand | 下拉命令方法 | `(command, item, menuItem) => void` |

## ToolsMenuItem

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| key | 菜单项标识 | `string \| number` |
| name | 菜单项名称 | `string` |
| command | 命令值，未传时使用 `key` 或 `name` | `unknown` |
| icon | 菜单项图标 | `string` |
| disabled | 是否禁用 | `boolean` |
| divided | 是否显示上分割线 | `boolean` |
| active | 是否激活 | `boolean` |

## Events

| 名称 | 说明 |
| --- | --- |
| click | 工具按钮主动作点击时触发。 |
| command | 下拉菜单项点击时触发。 |
| visible-change | 某个下拉项显示状态变化时触发。 |

## Slots

| 名称 | 说明 |
| --- | --- |
| item | 自定义单个工具项内容。 |
| icon | 自定义工具项图标。 |
| dropdown-item | 自定义下拉菜单项内容。 |
