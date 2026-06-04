<script setup lang="ts">
import { ref } from 'vue'

const date = ref('2026-06-03')
const deliveryDate = ref('2026-05-06')
const markedDate = ref('2026-05-06')
const customFestivals = {
  '2026-05-06': { name: '纪念日', type: 'custom' as const }
}

const datePickerBasicCode = `<XDatePicker v-model="date" />`

const datePickerInputCode = `<XDatePicker
  v-model="date"
  size="lg"
  clearable
  prefix="交付日期"
  active-border-color="#1264f4"
/>`

const datePickerFestivalCode = `<XDatePicker
  v-model="date"
  :festivals="{
    '2026-05-06': { name: '纪念日', type: 'custom' }
  }"
/>`
</script>

# 日期选择器 DatePicker

用于选择日期。

## 基础用法

<XDocDemo title="基础用法" :code="datePickerBasicCode">
  <ClientOnly>
    <div class="x-demo-column">
      <div style="width: 240px">
        <XDatePicker v-model="date" />
      </div>
      <p class="x-demo-label">当前日期：{{ date || '暂无' }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 输入框能力

日期选择器的输入框直接复用 `XBaseInput`，因此支持尺寸、状态、前后缀、清空、只读、禁用、颜色、字体、内边距、圆角等输入框公开属性。点击输入框会通过 `XDialog` 打开组件库自定义日期面板，不使用浏览器原生 `date` 选择界面。前缀默认通过 `prefix` 插槽渲染日历图标。

日期面板默认显示中国传统日期信息，包括春节、元宵、端午、中秋、重阳等农历节日，以及小寒、大寒、立春、雨水、惊蛰、春分、清明、谷雨、立夏、小满、芒种、夏至、小暑、大暑、立秋、处暑、白露、秋分、寒露、霜降、立冬、小雪、大雪、冬至二十四节气。它不显示每年变化的法定放假和调休上班安排。

<XDocDemo title="输入框能力" :code="datePickerInputCode">
  <ClientOnly>
    <div class="x-demo-column">
      <div style="width: 320px">
        <XDatePicker
          v-model="deliveryDate"
          size="lg"
          clearable
          prefix="交付日期"
          active-border-color="#1264f4"
        />
      </div>
      <p class="x-demo-label">当前日期：{{ deliveryDate || '暂无' }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 自定义日期标记

<XDocDemo title="自定义日期标记" :code="datePickerFestivalCode">
  <ClientOnly>
    <div class="x-demo-column">
      <div style="width: 260px">
        <XDatePicker
          v-model="markedDate"
          :festivals="customFestivals"
        />
      </div>
      <p class="x-demo-label">当前日期：{{ markedDate || '暂无' }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前日期 | `string` | - |
| placeholder | 占位文本 | `string` | `请选择日期` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| size | 输入框尺寸 | `'sm' \| 'md' \| 'lg'` | - |
| status | 输入框状态 | `'default' \| 'success' \| 'warning' \| 'error'` | `default` |
| prefix | 前缀文本，会显示在默认日历图标后 | `string` | - |
| suffix | 后缀文本 | `string` | - |
| accentColor | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | - |
| activeBorderColor | 激活边框色 | `string` | - |
| clearIconColor | 清除图标颜色 | `string` | - |
| clearIconSize | 清除图标尺寸 | `number \| string` | - |
| disabledBackgroundColor | 禁用背景色 | `string` | - |
| disabledTextColor | 禁用文字色 | `string` | - |
| fontFamily | 字体 | `string` | - |
| fontSize | 字号 | `number \| string` | - |
| height | 高度 | `number \| string` | - |
| autoHeight | 是否自动高度 | `boolean` | `false` |
| padding | 内边距 | `number \| string` | - |
| radius | 圆角 | `string` | - |
| textAlign | 文本对齐 | `'left' \| 'center' \| 'right'` | `'center'` |
| inputBackgroundColor | 输入区域背景色，优先级高于 `backgroundColor` | `string` | - |
| name | 原生 name 属性 | `string` | - |
| id | 原生 id 属性 | `string` | - |
| maxlength | 最大长度 | `number` | - |
| borderWidth | 共享边框宽度 | `number \| string` | - |
| borderColor | 共享边框颜色 | `string` | - |
| backgroundColor | 共享背景色，优先级低于 `inputBackgroundColor` | `string` | - |
| textColor | 共享文字色 | `string` | - |
| showChinaFestivals | 是否显示内置中国传统节日和二十四节气 | `boolean` | `true` |
| festivals | 自定义日期标记映射，键为 `YYYY-MM-DD` | `Record<string, { name: string; type: 'festival' \| 'solar-term' \| 'custom' }>` | - |
| showActiveBorder | 是否显示激活边框 | `boolean` | `true` |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 日期值更新时触发 | `(value: string)` |
| input | 输入时触发 | `(value: string)` |
| change | 输入内容变化或在日期面板中选择日期时触发 | `(value: string)` |
| clear | 点击清除按钮时触发 | - |
| focus | 聚焦时触发 | `(event: FocusEvent)` |
| blur | 失焦时触发 | `(event: FocusEvent)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 输入框前缀内容，未传入时显示默认日历图标 |
| suffix | 输入框后缀内容 |

## 手动验收建议

- 点击输入框应弹出日期选择弹窗，弹窗内可以切换上个月、下个月并选择日期。
- 弹窗内应显示中国传统节日和二十四节气，不显示法定放假或调休上班信息。
- 选择日期后应更新 `v-model`，同时关闭弹窗。
- 设置 `disabled` 或 `readonly` 后，点击输入框不应打开弹窗。
- 传入 `prefix` 插槽后，应替换默认日历图标。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XDatePicker / `DatePickerProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | — |
| `panelBackgroundColor` | 面板背景色 | `string` | — |
| `panelTextColor` | 面板文字颜色 | `string` | — |
| `panelMutedTextColor` | 面板弱化文字颜色 | `string` | — |
| `panelBorderColor` | 面板边框颜色 | `string` | — |
| `panelHeaderTextColor` | 面板头部文字颜色 | `string` | — |
| `panelShadow` | 公开属性，详见类型定义 | `string` | — |
| `panelCloseIconColor` | 面板关闭图标颜色 | `string` | — |
| `panelCloseIconHoverColor` | 面板关闭图标悬浮颜色 | `string` | — |
| `panelToolBackgroundColor` | 面板工具栏背景色 | `string` | — |
| `panelToolTextColor` | 面板工具栏文字颜色 | `string` | — |
| `panelToolBorderColor` | 面板工具栏边框颜色 | `string` | — |
| `panelToolHoverBackgroundColor` | 面板工具栏悬浮背景色 | `string` | — |
| `panelToolHoverTextColor` | 面板工具栏悬浮文字颜色 | `string` | — |
| `panelToolHoverBorderColor` | 面板工具栏悬浮边框颜色 | `string` | — |
| `panelCurrentTextColor` | 面板当前文字颜色 | `string` | — |
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
