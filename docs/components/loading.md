<script setup lang="ts">
import Example1 from '../examples/loading/Example1.vue'
import Example1Source from '../examples/loading/Example1.vue?raw'
import Example2 from '../examples/loading/Example2.vue'
import Example2Source from '../examples/loading/Example2.vue?raw'
import Example3 from '../examples/loading/Example3.vue'
import Example3Source from '../examples/loading/Example3.vue?raw'
</script>
# Loading 加载

`XLoading` 参考 Element Plus 的 `v-loading`，提供组件、指令和服务三种使用方式。

## 使用示例

### 指令用法

全量安装 `@x-soft88/x-ui` 后可直接使用 `v-loading`：

<XDocDemo title="指令用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 组件用法

<XDocDemo title="组件用法" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 服务用法

<XDocDemo title="服务用法" :code="Example3Source" language="ts">
  <Example3 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 是否显示，仅组件模式使用 | `boolean` | `false` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `text` | 加载文字 | `string` | `''` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fullscreen` | 是否全屏 | `boolean` | `false` | — |
| `spinnerSize` | 加载图标长度 | `number \| string` | `32` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `—` | px |
| `backgroundColor` | 遮罩背景色 | `string` | `'rgba(255, 255, 255, 0.76)'` | — |
| `textColor` | 文字色 | `string` | `'#1264f4'` | — |
| `spinnerColor` | 加载图标色 | `string` | `'#1264f4'` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `zIndex` | 层级 | `number` | `2100` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `lock` | 是否锁定滚动，预留接口 | `boolean` | `false` | — |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### LoadingProps

```ts
export interface LoadingProps {
  fontSize?: number
  modelValue?: boolean
  text?: string
  fullscreen?: boolean
  lock?: boolean
  backgroundColor?: string
  textColor?: string
  spinnerColor?: string
  spinnerSize?: number | string
  zIndex?: number
}
```

### LoadingOptions

```ts
export interface LoadingOptions extends Omit<LoadingProps, 'modelValue'> {
  target?: HTMLElement | string
}
```

### LoadingInstance

```ts
export interface LoadingInstance {
  close: () => void
}
```

## 验收说明

- 检查局部容器 `v-loading` 是否覆盖在当前容器内。
- 检查服务调用是否自动全屏，并可通过 `close()` 关闭。
- 检查背景色、文字色、图标色和图标大小是否生效。
