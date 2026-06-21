<script setup lang="ts">
const messageServiceCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-column" style="max-width: 360px">
    <XMessageComponent message="这是一条消息" status="info" :duration="0" />
    <XMessageComponent message="保存成功" status="success" show-close :duration="0" />
    <XMessageComponent message="提交失败" status="error" show-close :duration="0" />
  </div>`

const messageComponentCode = `\x3Cscript setup lang="ts">
<\/script>

<XMessageComponent message="固定展示的消息" status="info" show-close />`
</script>

# Message 消息提示

`XMessage` 参考 Element Plus 的 `ElMessage` 设计，适合展示轻量的全局反馈。组件库同时提供服务调用和 `XMessageComponent` 直接渲染两种方式。

## 基础用法

<XDocDemo title="基础用法" :code="messageServiceCode" language="ts">
  <div class="x-demo-column" style="max-width: 360px">
    <XMessageComponent message="这是一条消息" status="info" :duration="0" />
    <XMessageComponent message="保存成功" status="success" show-close :duration="0" />
    <XMessageComponent message="提交失败" status="error" show-close :duration="0" />
  </div>
</XDocDemo>

## 组件渲染

<XDocDemo title="组件渲染" :code="messageComponentCode">
  <XMessageComponent message="固定展示的消息" status="info" show-close />
</XDocDemo>

## Props / Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 消息内容 | `string` | `''` |
| status | 消息状态 | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` |
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

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XMessage / `MessageProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | 原生 id 属性 | `string` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
