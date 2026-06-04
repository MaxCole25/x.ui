<script setup lang="ts">
import { ref } from 'vue'

const dateTime = ref('2026-06-03 09:30')
const deliveryDateTime = ref('2026-06-03 18:00')

const dateTimePickerBasicCode = `<XDateTimePicker v-model="dateTime" />`

const dateTimePickerInputCode = `<XDateTimePicker
  v-model="dateTime"
  size="lg"
  clearable
  prefix="交付时间"
/>`
</script>

# 日期时间选择器 DateTimePicker

用于选择日期和时间。

## 基础用法

<XDocDemo title="基础用法" :code="dateTimePickerBasicCode">
  <ClientOnly>
    <div class="x-demo-column">
      <div style="width: 260px">
        <XDateTimePicker v-model="dateTime" />
      </div>
      <p class="x-demo-label">当前日期时间：{{ dateTime || '暂无' }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 输入框与弹窗

日期时间选择器的输入框直接复用 `XBaseInput`，点击输入框会通过可拖动的 `XDialog` 打开自定义日期时间选择界面，不使用浏览器原生 `datetime-local` 选择器。

日期部分复用 `XDatePickerPanel`，默认显示中国传统节日和二十四节气；时间部分放在日历右侧，参考 Vant TimePicker 的滚轮选择体验，提供小时、分钟两列竖向数字选择器。拖动滚动列会自动吸附到最近选项，也可以点击数字直接选择，点击“确定”后统一提交 `YYYY-MM-DD HH:mm` 格式的值。

<XDocDemo title="输入框与弹窗" :code="dateTimePickerInputCode">
  <ClientOnly>
    <div class="x-demo-column">
      <div style="width: 320px">
        <XDateTimePicker
          v-model="deliveryDateTime"
          size="lg"
          clearable
          prefix="交付时间"
        />
      </div>
      <p class="x-demo-label">当前日期时间：{{ deliveryDateTime || '暂无' }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前日期时间 | `string` | - |
| placeholder | 占位文本 | `string` | `请选择日期时间` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| hideClearButton | 是否隐藏清除按钮 | `boolean` | `false` |
| size | 输入框尺寸 | `'sm' \| 'md' \| 'lg'` | - |
| status | 输入框状态 | `'default' \| 'success' \| 'warning' \| 'error'` | `default` |
| textAlign | 文本对齐方式 | `'left' \| 'center' \| 'right'` | `'center'` |
| prefix | 前缀文本，会显示在默认日期时间图标后 | `string` | - |
| suffix | 后缀文本 | `string` | - |
| showChinaFestivals | 是否显示内置中国传统节日和二十四节气 | `boolean` | `true` |
| festivals | 自定义日期标记映射，键为 `YYYY-MM-DD` | `Record<string, { name: string; type: 'festival' \| 'solar-term' \| 'custom' }>` | - |
| showActiveBorder | 是否显示激活边框 | `boolean` | `true` |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 日期时间值更新时触发 | `(value: string)` |
| input | 输入或确认选择时触发 | `(value: string)` |
| change | 输入内容变化或确认选择时触发 | `(value: string)` |
| clear | 点击清除按钮时触发 | - |
| focus | 聚焦时触发 | `(event: FocusEvent)` |
| blur | 失焦时触发 | `(event: FocusEvent)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| prefix | 输入框前缀内容，未传入时显示默认日期时间图标 |
| suffix | 输入框后缀内容 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XDateTimePicker / `DateTimePickerProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `formatter` | 显示值格式化函数 | `BaseInputFormatter` | — |
| `parser` | 输入值解析函数 | `BaseInputParser` | — |
| `formatOnBlur` | 是否在失焦时格式化显示值 | `boolean` | — |
| `activeBorderColor` | 激活状态边框颜色 | `string` | — |
| `accentColor` | 主题色，未设置激活边框色时作为激活边框色 | `string` | — |
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
| `inputBackgroundColor` | 输入区域背景色，优先级高于 `backgroundColor` | `string` | — |
| `name` | 原生 name 属性 | `string` | — |
| `id` | 原生 id 属性 | `string` | — |
| `maxlength` | 最大输入长度 | `number` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色，优先级低于 `inputBackgroundColor` | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
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

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
