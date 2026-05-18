# Message 消息提示

`XMessage` 参考 Element Plus 的 `ElMessage` 设计，适合展示轻量的全局反馈。组件库同时提供服务调用和 `XMessageComponent` 直接渲染两种方式。

## 基础用法

```ts
import { XMessage } from 'x.ui'

XMessage('这是一条消息')
XMessage.success({ message: '保存成功', showClose: true })
XMessage.error({ message: '提交失败', duration: 5000 })
```

## 组件渲染

```vue
<script setup lang="ts">
import { XMessageComponent } from 'x.ui'
</script>

<template>
  <XMessageComponent message="固定展示的消息" type="info" show-close />
</template>
```

## Props / Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息内容 | `string` | `''` |
| type | 消息类型 | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` |
| size | 尺寸规格，仅影响字号和最小高度，不影响内边距与圆角 | `sm \| md \| lg` | `md` |
| duration | 自动关闭时间，`0` 表示不自动关闭 | `number` | `3000` |
| showClose | 是否显示关闭按钮 | `boolean` | `false` |
| plain | 是否朴素背景 | `boolean` | `false` |
| round | 是否圆角胶囊形态 | `boolean` | `false` |
| center | 内容是否居中 | `boolean` | `false` |
| placement | 弹出位置 | `'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'` | `'top'` |
| offset | 距离边缘的偏移长度 | `number` | `20` |
| zIndex | 层级 | `number` | `2200` |
| icon | 自定义图标 class | `string` | 类型图标 |
| backgroundColor | 背景色 | `string` | 类型色 |
| textColor | 文字色 | `string` | 类型色 |
| borderColor | 边框色 | `string` | 类型色 |
| closeColor | 关闭按钮色 | `string` | `currentColor` |
| iconColor | 图标色 | `string` | `currentColor` |
| width | 宽度 | `number \| string` | `auto` |
| minWidth | 最小宽度 | `number \| string` | `280px` |
| maxWidth | 最大宽度 | `number \| string` | `calc(100vw - 32px)` |
| padding | 内边距 | `string` | `10px 14px` |
| radius | 圆角 | `number \| string` | `8px` |
| shadow | 阴影 | `string` | 内置阴影 |

## Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| close | 关闭时触发 | `-` |

## 手动验收建议

- 检查四种类型、六个位置、自动关闭和手动关闭。
- 检查长文本是否自动换行，不应撑破视口。
- 检查自定义背景色、文字色、边框色、图标色是否生效。
