<script setup lang="ts">
import Example1 from '../examples/color-picker-panel/Example1.vue'
import Example1Source from '../examples/color-picker-panel/Example1.vue?raw'
import Example2 from '../examples/color-picker-panel/Example2.vue'
import Example2Source from '../examples/color-picker-panel/Example2.vue?raw'
</script>
# 颜色选择器面板 ColorPickerPanel

用于展示颜色预览，支持色域拖拽、主色系拖动、预设色和颜色值输入。透明色统一使用 `transparent`。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 自定义色板

通过 `colors` 控制面板预设色板，也可以使用外观属性调整边框和背景。`colors` 可包含 `transparent` 作为透明预设；色域和主色系拖动会继续输出标准十六进制颜色值。

<XDocDemo title="自定义色板" :code="Example2Source">
  <Example2 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前颜色值 | `string` | `'#1264f4'` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `colors` | 预设色板，可包含 `transparent` | `string[]` | `() => ['#1264f4', '#10b981', '#f59e0b', '#ef4444', '#7c3aed', '#0891b2', 'transparent']` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

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

### ColorPickerPanelProps

```ts
export interface ColorPickerPanelProps extends ElementStyleProps {
  fontSize?: number
  modelValue?: string
  colors?: string[]
}
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
