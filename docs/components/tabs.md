# 标签页 Tabs

`XTabs` 是用于多页签内容切换的容器组件，支持关闭、新增、拖拽排序、懒渲染、右键菜单、四向布局和自定义标签内容。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XTabs, type TabItem, type TabName } from 'x.ui'

const active = ref<TabName>('overview')
const items: TabItem[] = [
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
]
</script>

<template>
  <XTabs v-model="active" :items="items" closable>
    <template #pane="{ item }">
      当前页签：{{ item.label }}
    </template>
  </XTabs>
</template>
```

## 新增与关闭

```vue
<XTabs
  v-model="active"
  :items="items"
  addable
  closable
  @tab-add="createTab"
  @tab-remove="removeTab"
/>
```

## 拖拽排序

```vue
<XTabs
  v-model="active"
  :items="items"
  draggable
  @reorder="moveTab"
/>
```

`reorder` 会返回 `{ source, target, position }`，业务侧根据这个结果调整 `items` 顺序。

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前激活页签值 | `TabName` | `undefined` |
| items | 页签列表 | `TabItem[]` | `[]` |
| type | 页签类型 | `'' \| 'line' \| 'card' \| 'border-card'` | `'card'` |
| size | 标签尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| tabPosition | 页签位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| labelDirection | 标签文字方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| stretch | 是否拉伸页签 | `boolean` | `false` |
| closable | 是否默认允许关闭 | `boolean` | `false` |
| addable | 是否显示新增按钮 | `boolean` | `false` |
| editable | 是否进入编辑态，效果同新增按钮 | `boolean` | `false` |
| lazy | 是否默认懒渲染内容面板 | `boolean` | `false` |
| showAvatar | 是否显示头像信息 | `boolean` | `true` |
| showCloseIcon | 是否显示关闭入口 | `boolean` | `true` |
| showRefreshIcon | 是否默认允许刷新 | `boolean` | `false` |
| draggable | 是否默认允许拖拽排序 | `boolean` | `false` |
| activeTabBgColor | 激活页签背景色 | `string` | `'#0B4A52'` |
| activeTabTextColor | 激活页签文字色 | `string` | `'#7FD6F6'` |
| tabBgColor | 普通页签背景色 | `string` | `'transparent'` |
| tabTextColor | 普通页签文字色 | `string` | `'#6B7C93'` |
| tabFontSize | 标签文字大小（支持数字像素或 CSS 长度） | `number \| string` | `undefined` |
| tabMinWidth | 单个页签最小宽度（支持数字像素或 CSS 长度） | `number \| string` | `undefined` |
| borderRadius | 页签整体圆角（支持数字像素或 CSS 长度） | `number \| string` | `4` |
| tabBorder | 单个标签头边框（不包含贴近内容页的一侧） | `string` | `'1px solid var(--x-color-border)'` |
| contentBorder | 内容页边框 | `string` | `'1px solid var(--x-color-border)'` |
| contentBackgroundColor | 内容页背景色 | `string` | `'#fff'` |
| contextMenuBackgroundColor | 右键菜单背景色 | `string` | `'#fff'` |
| contextMenuTextColor | 右键菜单文字色 | `string` | `'var(--x-color-text)'` |
| beforeLeave | 切换前守卫，返回 `false` 阻止切换 | `(next, prev) => boolean \| Promise<boolean>` | `undefined` |

默认尺寸为中尺寸 `md`，也可以通过 `size="lg"` 或 `size="sm"` 调整标签高度、最小宽度、内边距、文字和图标尺寸。若只需要调整标签文字大小，可使用 `tab-font-size` 覆盖尺寸预设中的字号；若只需要调整单个页签最小宽度，可使用 `tab-min-width` 覆盖尺寸预设中的宽度。`label-direction="vertical"` 可让标签文字上下排列，适合配合 `tab-position="left"` 或 `tab-position="right"` 做侧向标签栏。默认圆角为 `4px`，可通过 `border-radius="8px"` 或 `:border-radius="8"` 调整。`XTabs` 最外层和页签头容器不显示外侧边框，单个标签头边框可通过 `tab-border` 调整，内容页边框可通过 `content-border` 调整，内容页背景色可通过 `content-background-color` 调整，右键菜单可通过 `context-menu-background-color` 和 `context-menu-text-color` 调整背景与文字颜色。标签头不会绘制贴近内容页的一侧边框，内容页保留完整边框；激活标签会向内容页方向溢出 `2px`，用自身背景覆盖交界处边框，避免标签和内容之间出现重叠线。图标颜色跟随当前页签文字颜色：激活态为 `#7FD6F6`，未激活态为 `#6B7C93`。

## TabItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| name | 页签唯一值 | `TabName` |
| label | 页签显示文本 | `string` |
| icon | 文本图标或 Vue 组件 | `string \| Component` |
| avatarUrl | 头像图片地址 | `string` |
| avatarText | 头像文本 | `string` |
| disabled | 是否禁用 | `boolean` |
| locked | 是否锁定。锁定后不可关闭、不可刷新、不可作为拖拽源或拖拽目标，并显示锁图标 | `boolean` |
| closable | 是否覆盖全局关闭设置 | `boolean` |
| refreshable | 是否覆盖全局刷新设置 | `boolean` |
| draggable | 是否覆盖全局拖拽设置 | `boolean` |
| lazy | 是否覆盖全局懒渲染设置 | `boolean` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 激活页签变化 | `(name: TabName)` |
| change | 激活页签变化 | `(name: TabName)` |
| tab-click | 点击页签 | `(pane: TabsPaneContext, event: Event)` |
| tab-remove | 请求关闭页签 | `(name: TabName)` |
| tab-add | 请求新增页签 | `()` |
| edit | 新增或删除编辑事件 | `(targetName, action)` |
| tab-refresh | 请求刷新单个页签 | `(name: TabName)` |
| tab-refresh-all | 请求刷新全部页签 | `()` |
| tab-close-others | 请求关闭除当前右键目标外的其它可关闭、未锁定页签 | `({ targetName, names })` |
| tab-close-all | 请求关闭全部可关闭、未锁定页签 | `({ names })` |
| reorder | 拖拽排序 | `({ source, target, position })` |

## Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | `items` 为空时的默认内容 | - |
| pane | 统一内容面板 | `{ item }` |
| pane-[name] | 指定页签内容面板 | `{ item }` |
| label | 自定义页签标题 | `{ item, active, locked }` |

## 手动验收建议

- 切换普通、禁用和懒渲染页签，确认内容显示和事件触发正确。
- 开启关闭、新增、拖拽排序后，确认业务侧更新 `items` 后界面同步。
- 为系统首页等固定页签设置 `locked: true`，确认关闭、拖拽、刷新和锁图标都遵循锁定语义。
- 使用右键菜单锁定、解锁、刷新、关闭其它和关闭全部，确认锁定页签不会被关闭或刷新。
- 分别检查 `top`、`bottom`、`left`、`right` 方向，确认长文本不会溢出遮挡。
