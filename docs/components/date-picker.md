<script setup lang="ts">
import Example1 from '../examples/date-picker/Example1.vue'
import Example1Source from '../examples/date-picker/Example1.vue?raw'
import Example2 from '../examples/date-picker/Example2.vue'
import Example2Source from '../examples/date-picker/Example2.vue?raw'
import Example3 from '../examples/date-picker/Example3.vue'
import Example3Source from '../examples/date-picker/Example3.vue?raw'
</script>
# 日期选择器 DatePicker

用于选择日期。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 输入框能力

日期选择器的输入框直接复用 `XBaseInput`，因此支持尺寸、状态、前后缀、清空、只读、禁用、颜色、字体、内边距、圆角等输入框公开属性。点击输入框会通过 `XDialog` 打开组件库自定义日期面板，不使用浏览器原生 `date` 选择界面。前缀默认通过 `prefix` 插槽渲染日历图标。

日期面板默认显示中国传统日期信息，包括春节、元宵、端午、中秋、重阳等农历节日，以及小寒、大寒、立春、雨水、惊蛰、春分、清明、谷雨、立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至二十四节气。它不显示每年变化的法定放假和调休上班安排。

<XDocDemo title="输入框能力" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 自定义日期标记

<XDocDemo title="自定义日期标记" :code="Example3Source">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前日期 | `string` | `''` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placeholder` | 占位文本 | `string` | `'请选择日期'` | — |
| `prefix` | 前缀文本，会显示在默认日历图标后 | `string` | `—` | — |
| `suffix` | 后缀文本 | `string` | `—` | — |
| `name` | 原生 name 属性 | `string` | `—` | — |
| `id` | 原生 id 属性 | `string` | `—` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `clearIconSize` | 清除图标尺寸 | `number \| string` | `—` | — |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `—` | — |
| `height` | 高度 | `number \| string` | `—` | — |
| `autoHeight` | 是否自动高度 | `boolean` | `—` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | `true` | — |
| `accentColor` | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | `—` | — |
| `activeBorderColor` | 激活边框色 | `string` | `—` | — |
| `clearIconColor` | 清除图标颜色 | `string` | `—` | — |
| `disabledBackgroundColor` | 禁用背景色 | `string` | `—` | — |
| `disabledTextColor` | 禁用文字色 | `string` | `—` | — |
| `fontFamily` | 字体 | `string` | `—` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `padding` | 内边距 | `number \| string` | `—` | — |
| `radius` | 圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `textAlign` | 文本对齐 | `BaseInputTextAlign` | `'center'` | — |
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `—` | — |
| `borderWidth` | 共享边框宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 共享边框颜色 | `string` | `—` | — |
| `backgroundColor` | 共享背景色，优先级低于 `inputBackgroundColor` | `string` | `—` | — |
| `textColor` | 共享文字色 | `string` | `—` | — |
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
| `teleported` | 是否将选择弹窗挂载到 `teleportTo` | `boolean` | `true` | — |
| `teleportTo` | 选择弹窗挂载目标 | `string` | `'body'` | — |
| `zIndex` | 选择弹窗层级 | `number` | `1900` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `festivals` | 自定义日期标记映射，键为 `YYYY-MM-DD` | `Record<string, DatePickerFestivalItem>` | `—` | — |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | `—` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | `—` | — |
| `maxlength` | 最大长度 | `number` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 日期值更新时触发 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `input` | 输入时触发 | `[value: string]` |
| `change` | 输入内容变化或在日期面板中选择日期时触发 | `[value: string]` |
| `clear` | 点击清除按钮时触发 | `[]` |
| `focus` | 聚焦时触发 | `[event: FocusEvent]` |
| `blur` | 失焦时触发 | `[event: FocusEvent]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `prefix` | 前缀文本，会显示在默认日历图标后 | `无作用域参数` |
| `suffix` | 后缀文本 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DatePickerProps

```ts
export interface DatePickerProps extends Omit<InputProps, 'modelValue' | 'type'>, PickerPopupThemeProps, OverlayProps {
  modelValue?: string
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
```

## 验收说明

- 点击输入框应弹出日期选择弹窗，弹窗内可以切换上个月、下个月并选择日期。
- 弹窗内应显示中国传统节日和二十四节气，不显示法定放假或调休上班信息。
- 选择日期后应更新 `v-model`，同时关闭弹窗。
- 设置 `disabled` 或 `readonly` 后，点击输入框不应打开弹窗。
- 传入 `prefix` 插槽后，应替换默认日历图标。
