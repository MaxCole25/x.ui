<script setup lang="ts">
import Example1 from '../examples/color-picker/Example1.vue'
import Example1Source from '../examples/color-picker/Example1.vue?raw'
import Example2 from '../examples/color-picker/Example2.vue'
import Example2Source from '../examples/color-picker/Example2.vue?raw'
import Example3 from '../examples/color-picker/Example3.vue'
import Example3Source from '../examples/color-picker/Example3.vue?raw'
</script>
# 颜色选择器 ColorPicker

用于选择和展示当前颜色，内置颜色选择器面板。
触发器中的色值支持手动输入修改，透明色统一使用 `transparent`。点击色块统一弹出组件库的 `XColorPickerPanel`，默认仅显示色块和色值，点击色块或使用键盘 Enter / 空格后打开面板，点击外部关闭。需要常驻面板时可显式设置 `panel-mode="inline"`。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 禁用状态

禁用后色块和颜色输入都不可交互。

<XDocDemo title="禁用状态" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 触发器尺寸

默认使用弹出模式，点击色值输入框只会编辑文本，不会打开面板。`width` 和 `padding` 用于调整触发器区域。弹出面板会根据浏览器边缘自动避让，靠近底部时会优先向上显示。

<XDocDemo title="触发器尺寸" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 透明色

颜色面板默认提供透明预设，选择后 `modelValue` 为 `transparent`。透明色块会用棋盘格显示，便于和白色区分。

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前颜色值 | `string` | `'#1264f4'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 触发器宽度，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | `true` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `padding` | 触发器内边距，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `hideInlinePanel` | 是否隐藏常驻内联颜色面板，隐藏后点击色块弹出面板 | `boolean` | `false` | — |
| `showValue` | 是否显示并允许手动输入当前色值 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `panelMode` | 面板展示模式，默认点击色块弹出；inline 为常驻面板 | `ColorPickerPanelMode` | `'popover'` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | update:modelValue 事件 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | change 事件 | `[value: string]` |
| `focus` | focus 事件 | `[event: FocusEvent]` |

## 插槽

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `panel` | panel 插槽 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ColorPickerProps

```ts
export interface ColorPickerProps extends ElementStyleProps {
  showActiveBorder?: boolean
  fontSize?: number
  modelValue?: string
  disabled?: boolean
  panelMode?: ColorPickerPanelMode
  hideInlinePanel?: boolean
  showValue?: boolean
  width?: number | string
  padding?: number | string
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### ColorPickerPanelMode

```ts
export type ColorPickerPanelMode = 'inline' | 'popover'
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
