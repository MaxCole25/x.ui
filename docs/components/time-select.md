# 时间选择 TimeSelect

用于从固定时间段中选择时间。

## 基础用法

```vue
<XTimeSelect v-model="time" start="09:00" end="18:00" :step-minutes="30" />
```

## 输入框与弹窗

时间选择的输入框复用 `XBaseInput`，点击输入框会通过可拖动的 `XDialog` 打开自定义时间选择界面，不使用浏览器原生 `select`。

时间面板参考 `XDateTimePicker` 的时间选择样式，但只展示由 `start`、`end` 和 `stepMinutes` 生成的固定时间列表。滚动列表会自动吸附到最近选项，也可以点击选项直接选择，点击“确定”后提交 `HH:mm` 格式的值。

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前时间 | `string` | - |
| start | 起始时间 | `string` | `09:00` |
| end | 结束时间 | `string` | `18:00` |
| stepMinutes | 步进分钟 | `number` | `30` |
| placeholder | 占位文本 | `string` | `请选择时间` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| size | 输入框尺寸 | `'sm' \| 'md' \| 'lg'` | - |
| status | 输入框状态 | `'default' \| 'success' \| 'warning' \| 'error'` | `default` |
| textAlign | 文本对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |
| prefix | 前缀文本，会显示在默认时间图标后 | `string` | - |
| suffix | 后缀文本 | `string` | - |
| showActiveBorder | 是否显示激活边框 | `boolean` | `true` |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 时间值更新时触发 | `(value: string)` |
| input | 输入、清空或确认选择时触发 | `(value: string)` |
| change | 输入内容变化或确认选择时触发 | `(value: string)` |
| clear | 点击清除按钮时触发 | - |
| focus | 聚焦时触发 | `(event: FocusEvent)` |
| blur | 失焦时触发 | `(event: FocusEvent)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 输入框前缀内容，未传入时显示默认时间图标 |
| suffix | 输入框后缀内容 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XTimeSelect / `TimeSelectProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | — |
| `activeBorderColor` | 激活状态边框颜色 | `string` | — |
| `color` | 主题色或文字颜色 | `string` | — |
| `clearIconColor` | clear图标颜色 | `string` | — |
| `clearIconSize` | 公开属性，详见类型定义 | `string \| number` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | — |
| `disabledTextColor` | 禁用文字颜色 | `string` | — |
| `fontFamily` | 字体族 | `string` | — |
| `fontSize` | 字号，数字按 px 处理 | `string \| number` | — |
| `height` | 高度，数字按 px 处理 | `string \| number` | — |
| `autoHeight` | 是否自动高度 | `boolean` | — |
| `padding` | 内边距 | `string \| number` | — |
| `radius` | 圆角，数字按 px 处理 | `string` | — |
| `background` | 输入区域背景色 | `string` | — |
| `name` | 原生 name 属性 | `string` | — |
| `id` | 原生 id 属性 | `string` | — |
| `maxlength` | 最大输入长度 | `number` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `panelBackgroundColor` | 面板背景色 | `string` | — |
| `panelTextColor` | 面板文字颜色 | `string` | — |
| `panelMutedTextColor` | 面板弱化文字颜色 | `string` | — |
| `panelBorderColor` | 面板边框颜色 | `string` | — |
| `panelHeaderTextColor` | 面板头部文字颜色 | `string` | — |
| `panelShadow` | 公开属性，详见类型定义 | `string` | — |
| `panelCloseIconColor` | 面板关闭图标颜色 | `string` | — |
| `panelCloseIconHoverColor` | 面板关闭图标悬浮颜色 | `string` | — |
| `timePanelBackgroundColor` | 时间面板背景色 | `string` | — |
| `timePanelBorderColor` | 时间面板边框颜色 | `string` | — |
| `timeColumnLabelColor` | 时间列标签颜色 | `string` | — |
| `timeOptionTextColor` | 时间选项文字颜色 | `string` | — |
| `timeOptionHoverTextColor` | 时间选项悬浮文字颜色 | `string` | — |
| `timeOptionActiveTextColor` | 时间选项激活文字颜色 | `string` | — |
| `timeOptionActiveBackgroundColor` | 时间选项激活背景色 | `string` | — |
| `timeOptionSelectionBackgroundColor` | 时间选项选中背景色 | `string` | — |
| `timeOptionSelectionBorderColor` | 时间选项选中边框颜色 | `string` | — |
| `timeColumnMaskTopColor` | 时间列遮罩顶部颜色 | `string` | — |
| `timeColumnMaskMiddleColor` | 时间列遮罩中部颜色 | `string` | — |
| `timeColumnMaskBottomColor` | 时间列遮罩底部颜色 | `string` | — |
| `panelPrimaryButtonBackgroundColor` | 面板主要按钮背景色 | `string` | — |
| `panelPrimaryButtonTextColor` | 面板主要按钮文字颜色 | `string` | — |
| `panelPrimaryButtonHoverBackgroundColor` | 面板主要按钮悬浮背景色 | `string` | — |
| `panelSecondaryButtonBackgroundColor` | 面板次要按钮背景色 | `string` | — |
| `panelSecondaryButtonTextColor` | 面板次要按钮文字颜色 | `string` | — |
| `panelSecondaryButtonBorderColor` | 面板次要按钮边框颜色 | `string` | — |
| `panelSecondaryButtonHoverBackgroundColor` | 面板次要按钮悬浮背景色 | `string` | — |
| `panelSecondaryButtonHoverTextColor` | 面板次要按钮悬浮文字颜色 | `string` | — |
| `panelSecondaryButtonHoverBorderColor` | 面板次要按钮悬浮边框颜色 | `string` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
