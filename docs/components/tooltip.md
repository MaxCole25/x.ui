# 文字提示 Tooltip

用于在元素悬停、点击或聚焦时展示简短说明。

## 基础用法

```vue
<XTooltip content="保存当前配置">
  <XButton>保存</XButton>
</XTooltip>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 受控显示状态 | `boolean` | - |
| content | 提示内容 | `string` | - |
| size | 尺寸规格，仅影响字号，不影响内边距与圆角 | `sm \| md \| lg` | `md` |
| placement | 出现位置 | `top \| bottom \| left \| right` | `top` |
| trigger | 触发方式 | `hover \| click \| focus` | `hover` |
| disabled | 是否禁用 | `boolean` | `false` |
| showArrow | 是否显示箭头 | `boolean` | `true` |
| openDelay | 打开延迟，毫秒 | `number` | `0` |
| closeDelay | 关闭延迟，毫秒 | `number` | `80` |
| teleported | 是否将提示弹层挂载到 `teleportTo`，用于避免被表格、Tabs、滚动容器等父级裁剪 | `boolean` | `true` |
| teleportTo | 提示弹层挂载目标 | `string` | `body` |
| zIndex | 提示弹层层级 | `number \| string` | `2000` |
| backgroundColor | 提示弹层背景色，会写入 `--x-element-bg`，优先级高于主题变量 | `string` | - |
| textColor | 提示弹层文字色，会写入 `--x-element-text`，优先级高于主题变量 | `string` | - |
| borderColor | 提示弹层边框色，会写入 `--x-element-border-color`，优先级高于主题变量 | `string` | - |
| borderWidth | 提示弹层边框宽度，数字按 px 处理，会写入 `--x-element-border-width` | `number \| string` | - |

## 自定义外观

Tooltip 支持两种外观定制方式：单个实例可以通过 `backgroundColor`、`textColor`、`borderColor`、`borderWidth` 覆盖；全局主题可以通过 CSS 变量调整默认值。

```vue
<XTooltip
  content="自定义提示"
  background-color="#12243a"
  text-color="#eef4fb"
  border-color="#203247"
  border-width="1px"
>
  <XButton>查看提示</XButton>
</XTooltip>
```

```css
:root {
  --x-tooltip-bg: #1f2937;
  --x-tooltip-text: #ffffff;
  --x-tooltip-border-color: transparent;
  --x-tooltip-border-width: 0;
  --x-tooltip-z-index: 2000;
}

:root.dark {
  --x-tooltip-bg: #12243a;
  --x-tooltip-text: #eef4fb;
  --x-tooltip-border-color: #203247;
  --x-tooltip-border-width: 1px;
}
```

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 显示状态变化 |
| show | 显示时触发 |
| hide | 隐藏时触发 |
