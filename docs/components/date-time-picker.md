<script setup lang="ts">
import Example1 from '../examples/date-time-picker/Example1.vue'
import Example1Source from '../examples/date-time-picker/Example1.vue?raw'
import Example2 from '../examples/date-time-picker/Example2.vue'
import Example2Source from '../examples/date-time-picker/Example2.vue?raw'
</script>
# 日期时间选择器 DateTimePicker

用于选择日期和时间。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 输入框与弹窗

日期时间选择器的输入框直接复用 `XBaseInput`，点击输入框会通过可拖动的 `XDialog` 打开自定义日期时间选择界面，不使用浏览器原生 `datetime-local` 选择器。

日期部分复用 `XDatePickerPanel`，默认显示中国传统节日和二十四节气；时间部分放在日历右侧，参考 Vant TimePicker 的滚轮选择体验，提供小时、分钟两列竖向数字选择器。拖动滚动列会自动吸附到最近选项，也可以点击数字直接选择，点击“确定”后统一提交 `YYYY-MM-DD HH:mm` 格式的值。

<XDocDemo title="输入框与弹窗" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前日期时间 | `string` | `''` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placeholder` | 占位文本 | `string` | `'请选择日期时间'` | — |
| `prefix` | 前缀文本，会显示在默认日期时间图标后 | `string` | `—` | — |
| `suffix` | 后缀文本 | `string` | `—` | — |
| `name` | 原生 name 属性 | `string` | `—` | — |
| `id` | 原生 id 属性 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `clearIconSize` | 公开属性，详见类型定义 | `number \| string` | `—` | — |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `—` | — |
| `height` | 高度，数字按 px 处理 | `number \| string` | `—` | — |
| `autoHeight` | 是否自动高度 | `boolean` | `—` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | `true` | — |
| `accentColor` | 主题色，未设置激活边框色时作为激活边框色 | `string` | `—` | — |
| `activeBorderColor` | 激活状态边框颜色 | `string` | `—` | — |
| `clearIconColor` | clear图标颜色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用文字颜色 | `string` | `—` | — |
| `fontFamily` | 字体族 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `padding` | 内边距 | `number \| string` | `—` | — |
| `radius` | 圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `textAlign` | 文本对齐方式 | `BaseInputTextAlign` | `'center'` | — |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `—` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `backgroundColor` | 背景色，优先级低于 `inputBackgroundColor` | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |
| `panelBackgroundColor` | 面板背景色 | `string` | `—` | — |
| `panelTextColor` | 面板文字颜色 | `string` | `—` | — |
| `panelMutedTextColor` | 面板弱化文字颜色 | `string` | `—` | — |
| `panelBorderColor` | 面板边框颜色 | `string` | `—` | — |
| `panelHeaderTextColor` | 面板头部文字颜色 | `string` | `—` | — |
| `panelShadow` | 公开属性，详见类型定义 | `string` | `—` | — |
| `panelCloseIconColor` | 面板关闭图标颜色 | `string` | `—` | — |
| `panelCloseIconHoverColor` | 面板关闭图标悬浮颜色 | `string` | `—` | — |
| `panelToolBackgroundColor` | 面板工具栏背景色 | `string` | `—` | — |
| `panelToolTextColor` | 面板工具栏文字颜色 | `string` | `—` | — |
| `panelToolBorderColor` | 面板工具栏边框颜色 | `string` | `—` | — |
| `panelToolHoverBackgroundColor` | 面板工具栏悬浮背景色 | `string` | `—` | — |
| `panelToolHoverTextColor` | 面板工具栏悬浮文字颜色 | `string` | `—` | — |
| `panelToolHoverBorderColor` | 面板工具栏悬浮边框颜色 | `string` | `—` | — |
| `panelCurrentTextColor` | 面板当前文字颜色 | `string` | `—` | — |
| `panelWeekTextColor` | 面板Week文字颜色 | `string` | `—` | — |
| `panelDayTextColor` | 面板日期文字颜色 | `string` | `—` | — |
| `panelDayHoverBackgroundColor` | 面板日期悬浮背景色 | `string` | `—` | — |
| `panelDayHoverTextColor` | 面板日期悬浮文字颜色 | `string` | `—` | — |
| `panelDayActiveBackgroundColor` | 面板日期激活背景色 | `string` | `—` | — |
| `panelDayActiveTextColor` | 面板日期激活文字颜色 | `string` | `—` | — |
| `panelDayDisabledTextColor` | 面板日期禁用文字颜色 | `string` | `—` | — |
| `panelDayRadius` | 面板日期圆角 | `number \| string` | `—` | — |
| `festivalBackgroundColor` | 节日背景色 | `string` | `—` | — |
| `festivalTextColor` | 节日文字颜色 | `string` | `—` | — |
| `festivalBadgeBackgroundColor` | 节日徽标背景色 | `string` | `—` | — |
| `festivalBadgeTextColor` | 节日徽标文字颜色 | `string` | `—` | — |
| `solarTermBackgroundColor` | 节气背景色 | `string` | `—` | — |
| `solarTermTextColor` | 节气文字颜色 | `string` | `—` | — |
| `solarTermBadgeBackgroundColor` | 节气徽标背景色 | `string` | `—` | — |
| `solarTermBadgeTextColor` | 节气徽标文字颜色 | `string` | `—` | — |
| `customFestivalBackgroundColor` | 自定义节日背景色 | `string` | `—` | — |
| `customFestivalTextColor` | 自定义节日文字颜色 | `string` | `—` | — |
| `customFestivalBadgeBackgroundColor` | 自定义节日徽标背景色 | `string` | `—` | — |
| `customFestivalBadgeTextColor` | 自定义节日徽标文字颜色 | `string` | `—` | — |
| `panelDayMarkedHoverBackgroundColor` | 面板标记日期悬浮背景色 | `string` | `—` | — |
| `panelDayMarkedHoverTextColor` | 面板标记日期悬浮文字颜色 | `string` | `—` | — |
| `panelDayMarkedActiveBackgroundColor` | 面板标记日期激活背景色 | `string` | `—` | — |
| `panelDayMarkedActiveTextColor` | 面板标记日期激活文字颜色 | `string` | `—` | — |
| `panelDayMarkedBadgeHoverBackgroundColor` | 面板标记日期徽标悬浮背景色 | `string` | `—` | — |
| `panelDayMarkedBadgeHoverTextColor` | 面板标记日期徽标悬浮文字颜色 | `string` | `—` | — |
| `panelPrimaryButtonBackgroundColor` | 面板主要按钮背景色 | `string` | `—` | — |
| `panelPrimaryButtonTextColor` | 面板主要按钮文字颜色 | `string` | `—` | — |
| `panelPrimaryButtonHoverBackgroundColor` | 面板主要按钮悬浮背景色 | `string` | `—` | — |
| `panelSecondaryButtonBackgroundColor` | 面板次要按钮背景色 | `string` | `—` | — |
| `panelSecondaryButtonTextColor` | 面板次要按钮文字颜色 | `string` | `—` | — |
| `panelSecondaryButtonBorderColor` | 面板次要按钮边框颜色 | `string` | `—` | — |
| `panelSecondaryButtonHoverBackgroundColor` | 面板次要按钮悬浮背景色 | `string` | `—` | — |
| `panelSecondaryButtonHoverTextColor` | 面板次要按钮悬浮文字颜色 | `string` | `—` | — |
| `panelSecondaryButtonHoverBorderColor` | 面板次要按钮悬浮边框颜色 | `string` | `—` | — |
| `timePanelBackgroundColor` | 时间面板背景色 | `string` | `—` | — |
| `timePanelBorderColor` | 时间面板边框颜色 | `string` | `—` | — |
| `timeColumnLabelColor` | 时间列标签颜色 | `string` | `—` | — |
| `timeOptionTextColor` | 时间选项文字颜色 | `string` | `—` | — |
| `timeOptionHoverTextColor` | 时间选项悬浮文字颜色 | `string` | `—` | — |
| `timeOptionActiveTextColor` | 时间选项激活文字颜色 | `string` | `—` | — |
| `timeOptionActiveBackgroundColor` | 时间选项激活背景色 | `string` | `—` | — |
| `timeOptionSelectionBackgroundColor` | 时间选项选中背景色 | `string` | `—` | — |
| `timeOptionSelectionBorderColor` | 时间选项选中边框颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showChinaFestivals` | 是否显示内置中国传统节日和二十四节气 | `boolean` | `true` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | `—` | — |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读 | `boolean` | `false` | — |
| `clearable` | 是否可清空 | `boolean` | `false` | — |
| `status` | 输入框状态 | `BaseInputStatus` | `'default'` | — |
| `hideClearButton` | 是否隐藏清除按钮 | `boolean` | `false` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `timeColumnMaskTopColor` | 时间列遮罩顶部颜色 | `string` | `—` | — |
| `timeColumnMaskMiddleColor` | 时间列遮罩中部颜色 | `string` | `—` | — |
| `timeColumnMaskBottomColor` | 时间列遮罩底部颜色 | `string` | `—` | — |
| `teleported` | 是否将选择弹窗挂载到 `teleportTo` | `boolean` | `true` | — |
| `teleportTo` | 选择弹窗挂载目标 | `string` | `'body'` | — |
| `zIndex` | 选择弹窗层级 | `number` | `1900` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `festivals` | 自定义日期标记映射，键为 `YYYY-MM-DD` | `Record<string, DatePickerFestivalItem>` | `—` | — |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | `—` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | `—` | — |
| `maxlength` | 最大输入长度 | `number` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 日期时间值更新时触发 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `input` | 输入或确认选择时触发 | `[value: string]` |
| `change` | 输入内容变化或确认选择时触发 | `[value: string]` |
| `clear` | 点击清除按钮时触发 | `[]` |
| `focus` | 聚焦时触发 | `[event: FocusEvent]` |
| `blur` | 失焦时触发 | `[event: FocusEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `prefix` | 前缀文本，会显示在默认日期时间图标后 | `无作用域参数` |
| `suffix` | 后缀文本 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DateTimePickerProps

```ts
export interface DateTimePickerProps extends Omit<InputProps, 'modelValue' | 'type' | 'inputOffsetY' | 'prefixOffsetY' | 'suffixOffsetY'>, PickerDateTimePopupThemeProps, OverlayProps {
  modelValue?: string
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
