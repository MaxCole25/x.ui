<script setup lang="ts">
const basicCode = `<XGroupContainer title="基础设置">
  <XInput placeholder="请输入名称" />
</XGroupContainer>`

const positionsCode = `<XGroupContainer title="顶部居中" title-position="top-center">
  分组内容
</XGroupContainer>

<XGroupContainer title="底部右侧" title-position="bottom-right">
  分组内容
</XGroupContainer>`

const slotCode = `<XGroupContainer title-position="top-left">
  <template #title>
    <span>高级设置</span>
    <XTag size="sm">可选</XTag>
  </template>
  分组内容
</XGroupContainer>`
</script>

# 分组容器 GroupContainer

用于将同一分类下的表单或页面内容放在带标题外框中。标题覆盖在边线上，适合“基础设置”“高级设置”等内容分区。

`XGroupContainer` 负责语义分组和外框样式；需要卡片头部、底部或阴影时，请使用 `XCard`。

## 基础用法

<XDocDemo title="基础用法" :code="basicCode">
  <XGroupContainer title="基础设置">
    <XInput placeholder="请输入名称" />
  </XGroupContainer>
</XDocDemo>

## 标题位置

通过 `titlePosition` 设置标题在外框上的位置，支持顶部和底部的左、中、右六个位置。

<XDocDemo title="标题位置" :code="positionsCode">
  <div style="display: grid; gap: 24px">
    <XGroupContainer title="顶部居中" title-position="top-center">分组内容</XGroupContainer>
    <XGroupContainer title="底部右侧" title-position="bottom-right">分组内容</XGroupContainer>
  </div>
</XDocDemo>

## 自定义标题

`title` 插槽优先于 `title` 属性，可组合图标、标签或操作按钮。

<XDocDemo title="自定义标题" :code="slotCode">
  <XGroupContainer title-position="top-left">
    <template #title><span style="display: inline-flex; gap: 8px; align-items: center">高级设置 <XTag size="sm">可选</XTag></span></template>
    分组内容
  </XGroupContainer>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题文本 | `string` | — |
| `titlePosition` | 标题位置 | `top-left \| top-center \| top-right \| bottom-left \| bottom-center \| bottom-right` | `top-left` |
| `width` | 容器宽度 | `number \| string` | `100%` |
| `height` | 容器高度 | `number \| string` | — |
| `padding` | 内容区内边距 | `number \| string` | `16px` |
| `radius` | 外框圆角 | `number \| string` | `6px` |
| `borderWidth` | 边框粗细 | `number \| string` | `1px` |
| `borderColor` | 边框色 | `string` | 主题边框色 |
| `borderStyle` | 边框样式 | `solid \| dashed \| dotted \| double` | `solid` |
| `backgroundColor` | 容器背景色 | `string` | 主题背景色 |
| `textColor` | 内容文字色 | `string` | 主题文字色 |
| `titleTextColor` | 标题文字色 | `string` | 跟随内容文字色 |
| `titleBackgroundColor` | 标题背景色 | `string` | 跟随容器背景色 |
| `titlePadding` | 标题内边距 | `number \| string` | `0 8px` |
| `titleFontSize` | 标题字号 | `number \| string` | `14px` |

## Slots

| 名称 | 说明 |
| --- | --- |
| `default` | 分组内容 |
| `title` | 自定义标题，优先于 `title` 属性 |
