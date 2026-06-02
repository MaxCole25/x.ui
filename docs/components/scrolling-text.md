# 滚动文字 ScrollingText

用于公告、状态提示或短文本信息的连续滚动展示。组件默认 `padding` 为 `0`，只提供显示方向、文字流向、速度和字体颜色相关外观接口。

## 基础用法

```vue
<XScrollingText width="280px">
  系统公告：今日 18:00 将进行例行维护。
</XScrollingText>
```

## 竖向滚动

```vue
<XScrollingText display-direction="vertical" flow-direction="up" height="96px">
  任务已提交，正在等待处理。
</XScrollingText>
```

## 自定义外观和速度

```vue
<XScrollingText
  display-direction="horizontal"
  flow-direction="right"
  width="320px"
  :speed="60"
  font-family="Arial, sans-serif"
  font-size="14px"
  text-color="#ffffff"
  background-color="#1264f4"
>
  x.ui 支持滚动速度、字体样式、字体大小、字体颜色和背景色配置。
</XScrollingText>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| displayDirection | 显示方向 | `horizontal \| vertical` | `horizontal` |
| flowDirection | 文字流向；横向只生效 `left/right`，竖向只生效 `up/down` | `left \| right \| up \| down` | 横向为 `left`，竖向为 `up` |
| width | 横向滚动时的组件宽度，数字按 px 处理 | `string \| number` | `100%` |
| height | 竖向滚动时的组件高度，数字按 px 处理 | `string \| number` | `120px` |
| speed | 滚动速度，单位为 px/s | `number` | `40` |
| fontFamily | 字体样式 | `string` | `var(--x-font-family)` |
| fontSize | 字体大小，数字按 px 处理 | `string \| number` | `12px` |
| textColor | 字体颜色 | `string` | `var(--x-color-text)` |
| backgroundColor | 背景色 | `string` | `transparent` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 滚动显示的文字内容 |

## Events

暂无公开事件。

## 手动验收建议

- 横向时切换 `left`、`right`，确认只出现宽度控制且文字连续滚动。
- 竖向时切换 `up`、`down`，确认只出现高度控制且文字连续滚动。
- 调整 `speed`，确认数值越大滚动越快。
- 检查字体样式、字体大小、字体颜色和背景色是否即时生效，并确认组件自身没有额外 padding。
