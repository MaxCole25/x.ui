<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2026-06-03')
const festivalDate = ref('2026-10-01')

const datePickerPanelBasicCode = `<XDatePickerPanel v-model="date" />`

const datePickerPanelFestivalCode = `<XDatePickerPanel
  v-model="date"
  :year="2026"
  :month="10"
/>`
</script>

# 日期选择器面板 DatePickerPanel

用于展示月份日期网格并选择日期。

## 基础用法

<XDocDemo title="基础用法" :code="datePickerPanelBasicCode">
  <div class="x-demo-column" style="max-width: 360px">
    <XDatePickerPanel v-model="date" />
    <p class="x-demo-label">当前日期：{{ date || '暂无' }}</p>
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前日期 | `string` | - |
| year | 展示年份 | `number` | 当前年份 |
| month | 展示月份 | `number` | 当前月份 |
| showChinaFestivals | 是否显示内置中国传统节日和二十四节气 | `boolean` | `true` |
| festivals | 自定义日期标记映射，键为 `YYYY-MM-DD` | `Record<string, { name: string; type: 'festival' \| 'solar-term' \| 'custom' }>` | - |

## 传统日期显示

面板默认显示中国传统日期信息，包括春节、元宵、端午、中秋、重阳等农历节日，以及小寒、大寒、立春、雨水、惊蛰、春分、清明、谷雨、立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至二十四节气。面板不显示每年变化的法定放假和调休上班安排。

<XDocDemo title="传统日期显示" :code="datePickerPanelFestivalCode">
  <div class="x-demo-column" style="max-width: 360px">
    <XDatePickerPanel
      v-model="festivalDate"
      :year="2026"
      :month="10"
    />
    <p class="x-demo-label">当前日期：{{ festivalDate || '暂无' }}</p>
  </div>
</XDocDemo>

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XDatePickerPanel / `DatePickerPanelProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |
| `panelBackgroundColor` | 面板背景色 | `string` | — |
| `panelTextColor` | 面板文字颜色 | `string` | — |
| `panelMutedTextColor` | 面板弱化文字颜色 | `string` | — |
| `panelBorderColor` | 面板边框颜色 | `string` | — |
| `panelHeaderTextColor` | 面板头部文字颜色 | `string` | — |
| `panelShadow` | 公开属性，详见类型定义 | `string` | — |
| `panelCloseIconColor` | 面板关闭图标颜色 | `string` | — |
| `panelCloseIconHoverColor` | 面板关闭图标悬浮颜色 | `string` | — |
| `panelWeekTextColor` | 面板Week文字颜色 | `string` | — |
| `panelDayTextColor` | 面板日期文字颜色 | `string` | — |
| `panelDayHoverBackgroundColor` | 面板日期悬浮背景色 | `string` | — |
| `panelDayHoverTextColor` | 面板日期悬浮文字颜色 | `string` | — |
| `panelDayActiveBackgroundColor` | 面板日期激活背景色 | `string` | — |
| `panelDayActiveTextColor` | 面板日期激活文字颜色 | `string` | — |
| `panelDayDisabledTextColor` | 面板日期禁用文字颜色 | `string` | — |
| `panelDayRadius` | 面板日期圆角 | `string \| number` | — |
| `festivalBackgroundColor` | 节日背景色 | `string` | — |
| `festivalTextColor` | 节日文字颜色 | `string` | — |
| `festivalBadgeBackgroundColor` | 节日徽标背景色 | `string` | — |
| `festivalBadgeTextColor` | 节日徽标文字颜色 | `string` | — |
| `solarTermBackgroundColor` | 节气背景色 | `string` | — |
| `solarTermTextColor` | 节气文字颜色 | `string` | — |
| `solarTermBadgeBackgroundColor` | 节气徽标背景色 | `string` | — |
| `solarTermBadgeTextColor` | 节气徽标文字颜色 | `string` | — |
| `customFestivalBackgroundColor` | 自定义节日背景色 | `string` | — |
| `customFestivalTextColor` | 自定义节日文字颜色 | `string` | — |
| `customFestivalBadgeBackgroundColor` | 自定义节日徽标背景色 | `string` | — |
| `customFestivalBadgeTextColor` | 自定义节日徽标文字颜色 | `string` | — |
| `panelDayMarkedHoverBackgroundColor` | 面板标记日期悬浮背景色 | `string` | — |
| `panelDayMarkedHoverTextColor` | 面板标记日期悬浮文字颜色 | `string` | — |
| `panelDayMarkedActiveBackgroundColor` | 面板标记日期激活背景色 | `string` | — |
| `panelDayMarkedActiveTextColor` | 面板标记日期激活文字颜色 | `string` | — |
| `panelDayMarkedBadgeHoverBackgroundColor` | 面板标记日期徽标悬浮背景色 | `string` | — |
| `panelDayMarkedBadgeHoverTextColor` | 面板标记日期徽标悬浮文字颜色 | `string` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
