<script setup lang="ts">
import { defineClientComponent } from 'vitepress'
const Example1 = defineClientComponent(() => import('../examples/chart/Example1.vue'))
import Example1Source from '../examples/chart/Example1.vue?raw'
const Example2 = defineClientComponent(() => import('../examples/chart/Example2.vue'))
import Example2Source from '../examples/chart/Example2.vue?raw'
const Example3 = defineClientComponent(() => import('../examples/chart/Example3.vue'))
import Example3Source from '../examples/chart/Example3.vue?raw'
const Example4 = defineClientComponent(() => import('../examples/chart/Example4.vue'))
import Example4Source from '../examples/chart/Example4.vue?raw'
</script>
# 图表 Chart

`XChart` 是 @x-soft88/x-ui 的基础图表容器组件，用于把 ECharts 5 安全接入 Vue 3 生命周期。它只处理初始化、销毁、尺寸变化、加载态、事件绑定和实例暴露，不封装折线图、柱状图、饼图等业务图表类型。

业务层仍然直接编写 ECharts 原生 `option`，并按需注册自己需要的图表、组件和渲染器。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 事件绑定

通过 `events` 可以绑定任意 ECharts 事件。事件名称、查询条件和回调函数都保持 ECharts 原生语义。

<XDocDemo title="事件绑定" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 自动缩放和加载态

`autoresize` 默认开启，父容器尺寸变化时会调用 `resize`。如果页面里图表很多，可以设置节流时间。

<XDocDemo title="自动缩放和加载态" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 主题接入

`XChart` 不会把 @x-soft88/x-ui CSS 变量自动转换成 ECharts option。业务侧可以使用 ECharts 原生 `registerTheme` 注册主题，再通过 `theme` 传入主题名或主题对象。

<XDocDemo title="主题接入" :code="Example4Source">
  <Example4 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `autoresize` | 是否自动跟随容器尺寸变化，支持节流配置 | `ChartAutoresize` | `true` | — |
| `width` | 图表容器宽度，数字会转为 px | `number \| string` | `'100%'` | 数字为 px；字符串使用 CSS 单位 |
| `height` | 图表容器高度，数字会转为 px | `number \| string` | `320` | 数字为 px；字符串使用 CSS 单位 |
| `minHeight` | 图表容器最小高度，数字会转为 px | `number \| string` | `240` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `borderWidth` | 容器边框宽度，数字会转为 px | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 容器边框颜色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 容器背景色 | `string` | `—` | — |
| `textColor` | 容器文字颜色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `loading` | 是否显示 ECharts 加载态 | `boolean` | `false` | — |
| `loadingOptions` | 加载态配置 | `ChartLoadingOptions` | `—` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `option` | ECharts 原生配置项 | `EChartsCoreOption` | `—` | — |
| `theme` | ECharts 主题名或主题对象 | `ChartTheme` | `—` | — |
| `initOptions` | `echarts.init` 第三个参数 | `EChartsInitOpts` | `—` | — |
| `setOptionOptions` | 自动更新 option 时传给 `setOption` 的参数 | `SetOptionOpts` | `—` | — |
| `events` | 任意 ECharts 事件绑定 | `ChartEvents` | `—` | — |

## 事件

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `ready` | ECharts 实例创建完成后触发 | `[instance: ECharts]` |
| `rendered` | 转发 ECharts `rendered` 事件 | `[params: unknown]` |
| `finished` | 转发 ECharts `finished` 事件 | `[params: unknown]` |

## 实例方法

### 布局与尺寸

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `resize` | 调用实例 `resize` | `(options?: ResizeOpts) => void` |

### 状态与交互

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `clear` | 清空图表 | `() => void` |
| `showLoading` | 显示加载态 | `(type?: string, options?: ChartLoadingOptions) => void` |
| `hideLoading` | 隐藏加载态 | `() => void` |

### 组件专有功能

| 方法名 | 说明 | 签名 |
| --- | --- | --- |
| `getInstance` | 获取当前 ECharts 实例 | `() => ECharts \| undefined` |
| `setOption` | 调用实例 `setOption` | `(option: EChartsCoreOption, options?: SetOptionOpts) => void` |
| `dispatchAction` | 调用实例 `dispatchAction` | `(payload: Payload) => void` |
| `dispose` | 销毁实例 | `() => void` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ChartTheme

```ts
export type ChartTheme = string | object
```

### ChartAutoresize

```ts
export type ChartAutoresize = boolean | { throttle?: number }
```

### ChartEventHandler

```ts
export type ChartEventHandler = (...args: unknown[]) => void
```

### ChartEventBinding

```ts
export interface ChartEventBinding {
  query?: string | object
  handler: ChartEventHandler
}
```

### ChartEvents

```ts
export type ChartEvents = Record<string, ChartEventHandler | ChartEventBinding>
```

### ChartLoadingOptions

```ts
export type ChartLoadingOptions = Record<string, unknown>
```

### ChartProps

```ts
export interface ChartProps extends ElementStyleProps {
  option?: EChartsCoreOption
  theme?: ChartTheme
  initOptions?: EChartsInitOpts
  setOptionOptions?: SetOptionOpts
  autoresize?: ChartAutoresize
  loading?: boolean
  loadingOptions?: ChartLoadingOptions
  events?: ChartEvents
  width?: number | string
  height?: number | string
  minHeight?: number | string
}
```

### ChartExpose

```ts
export interface ChartExpose {
  getInstance: () => ECharts | undefined
  setOption: (option: EChartsCoreOption, options?: SetOptionOpts) => void
  resize: (options?: ResizeOpts) => void
  dispatchAction: (payload: Payload) => void
  clear: () => void
  showLoading: (type?: string, options?: ChartLoadingOptions) => void
  hideLoading: () => void
  dispose: () => void
}
```

## 验收说明

- 检查 `<XChart :option="option" />` 是否可以在固定高度和默认高度下正常渲染。
- 切换 `loading`，确认 ECharts 加载态显示和隐藏正常。
- 调整父容器宽高，确认开启 `autoresize` 后图表会重新计算尺寸。
- 通过 `events` 绑定 click 或 mouseover，确认事件可以触发业务回调。
- 切换 `theme` 或 `initOptions` 引用，确认图表会重建并应用当前 option。
