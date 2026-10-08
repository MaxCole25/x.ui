<script setup lang="ts">
import Example1 from '../examples/date-picker-panel/Example1.vue'
import Example1Source from '../examples/date-picker-panel/Example1.vue?raw'
import Example2 from '../examples/date-picker-panel/Example2.vue'
import Example2Source from '../examples/date-picker-panel/Example2.vue?raw'
</script>
# 日期选择器面板 DatePickerPanel

用于展示月份日期网格并选择日期。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 传统日期显示

面板默认显示中国传统日期信息，包括春节、元宵、端午、中秋、重阳等农历节日，以及小寒、大寒、立春、雨水、惊蛰、春分、清明、谷雨、立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至二十四节气。面板不显示每年变化的法定放假和调休上班安排。

<XDocDemo title="传统日期显示" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前日期 | `string` | `''` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |
| `panelBackgroundColor` | 面板背景色 | `string` | `—` | — |
| `panelTextColor` | 面板文字颜色 | `string` | `—` | — |
| `panelMutedTextColor` | 面板弱化文字颜色 | `string` | `—` | — |
| `panelBorderColor` | 面板边框颜色 | `string` | `—` | — |
| `panelHeaderTextColor` | 面板头部文字颜色 | `string` | `—` | — |
| `panelShadow` | 公开属性，详见类型定义 | `string` | `—` | — |
| `panelCloseIconColor` | 面板关闭图标颜色 | `string` | `—` | — |
| `panelCloseIconHoverColor` | 面板关闭图标悬浮颜色 | `string` | `—` | — |
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

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showChinaFestivals` | 是否显示内置中国传统节日和二十四节气 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `year` | 展示年份 | `number` | `—` | — |
| `month` | 展示月份 | `number` | `—` | — |
| `festivals` | 自定义日期标记映射，键为 `YYYY-MM-DD` | `Record<string, DatePickerFestivalItem>` | `—` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | update:modelValue 事件 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | change 事件 | `[value: string]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DatePickerFestivalType

```ts
export type DatePickerFestivalType = 'festival' | 'solar-term' | 'custom'
```

### DatePickerFestivalItem

```ts
export interface DatePickerFestivalItem {
  name: string
  type: DatePickerFestivalType
}
```

### DatePickerPanelProps

```ts
export interface DatePickerPanelProps extends ElementStyleProps, PickerPanelThemeProps, PickerCalendarThemeProps {
  fontSize?: number
  modelValue?: string
  year?: number
  month?: number
  showChinaFestivals?: boolean
  festivals?: Record<string, DatePickerFestivalItem>
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
