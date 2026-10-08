<script setup lang="ts">
import Example1 from '../examples/progress/Example1.vue'
import Example1Source from '../examples/progress/Example1.vue?raw'
</script>
# 进度条 Progress

用于展示任务、上传和流程完成度，支持线形和环形两种形态。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `textInside` | 是否将进度文字放在进度条内部 | `boolean` | `false` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `strokeWidth` | 线宽 | `number` | `8` | — |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `'100%'` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `variant` | 形态 | `ProgressVariant` | `'line'` | — |
| `fontSize` | 字号，单位 px；不改变控件高度、内边距或圆角 | `number` | `14` | px |
| `accentColor` | 主题强调色 | `string` | `—` | — |
| `trackColor` | 轨道背景色 | `string` | `—` | — |
| `textColor` | 文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `status` | 状态 | `ProgressStatus` | `'primary'` | — |
| `showText` | 是否显示文本 | `boolean` | `true` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `percentage` | 当前百分比 | `number` | `0` | — |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 默认内容或自定义内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ProgressProps

```ts
export interface ProgressProps {
  percentage?: number
  status?: ProgressStatus
  variant?: ProgressVariant
  fontSize?: number
  strokeWidth?: number
  showText?: boolean
  textInside?: boolean
  accentColor?: string
  trackColor?: string
  textColor?: string
  width?: number | string
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### ProgressStatus

```ts
export type ProgressStatus = 'primary' | 'success' | 'warning' | 'danger'
```

### ProgressVariant

```ts
export type ProgressVariant = 'line' | 'circle'
```

## 验收说明

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
