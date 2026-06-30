<script setup lang="ts">
import { ref } from 'vue'

const action = ref('')

const toolsItems = [
  {
    key: 'print',
    type: 'button',
    name: '打印',
    icon: 'printer',
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
    icon: 'search',
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
    icon: 'settings-3',
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

const toolsItems = [
  { key: 'print', type: 'button', name: '打印', icon: 'printer', onClick: () => { action.value = '打印' } },
  {
    key: 'settings',
    type: 'split-dropdown',
    name: '设置',
    icon: 'settings-3',
    children: [
      { key: 'column', name: '列设置', command: 'column' },
      { key: 'density', name: '密度设置', command: 'density' }
    ],
    onClick: () => { action.value = '设置' }
  }
]
<\/script>

<XTools
  :items="toolsItems"
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
        :items="toolsItems"
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
| icon | 图标名称，使用 `XIcon` 的图标命名 | `string` |
| disabled | 是否禁用当前项 | `boolean` |
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
