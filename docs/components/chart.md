<script setup lang="ts">
import { computed, ref } from 'vue'
import { use, registerTheme } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsCoreOption } from 'echarts/core'

use([LineChart, GridComponent, TooltipComponent, CanvasRenderer])

registerTheme('x-doc-chart-dark', {
  backgroundColor: '#0b1726',
  textStyle: { color: '#eef4fb' }
})

const chartReadyText = ref('等待图表初始化')

const chartOption = computed<EChartsCoreOption>(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: 32, right: 24, top: 24, bottom: 32, containLabel: true },
  xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', smooth: true, data: [12, 24, 18, 32] }]
}))

const chartDarkOption = computed<EChartsCoreOption>(() => ({
  tooltip: { trigger: 'axis' },
  grid: { left: 32, right: 24, top: 24, bottom: 32, containLabel: true },
  xAxis: { type: 'category', data: ['周一', '周二', '周三'] },
  yAxis: { type: 'value' },
  series: [{ type: 'line', data: [8, 18, 14] }]
}))

const chartBasicCode = `<XChart :option="option" height="260px" />`

const chartEventsCode = `<XChart
  :option="option"
  :events="{ click: handleClick }"
  @ready="chart = $event"
/>`

const chartLoadingCode = `<XChart
  :option="option"
  loading
  :loading-options="{ text: '加载中' }"
  :autoresize="{ throttle: 80 }"
/>`

const chartThemeCode = `<XChart :option="option" theme="x-dashboard-dark" background-color="#0b1726" />`

const chartExposeCode = `const chartRef = ref<ChartExpose>()
chartRef.value?.setOption(option, { notMerge: true })
chartRef.value?.resize()`
</script>

# 图表 Chart

`XChart` 是 x.ui 的基础图表容器组件，用于把 ECharts 5 安全接入 Vue 3 生命周期。它只处理初始化、销毁、尺寸变化、加载态、事件绑定和实例暴露，不封装折线图、柱状图、饼图等业务图表类型。

业务层仍然直接编写 ECharts 原生 `option`，并按需注册自己需要的图表、组件和渲染器。

## 基础用法

<XDocDemo title="基础用法" :code="chartBasicCode">
  <ClientOnly>
    <XChart :option="chartOption" height="260px" />
  </ClientOnly>
</XDocDemo>

## 事件绑定

通过 `events` 可以绑定任意 ECharts 事件。事件名称、查询条件和回调函数都保持 ECharts 原生语义。

<XDocDemo title="事件绑定" :code="chartEventsCode">
  <ClientOnly>
    <div class="x-demo-column">
      <XChart
        :option="chartOption"
        height="240px"
        :events="{ click: () => { chartReadyText = '已接收到 click 事件' } }"
        @ready="chartReadyText = '图表已初始化'"
      />
      <p class="x-demo-label">{{ chartReadyText }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 自动缩放和加载态

`autoresize` 默认开启，父容器尺寸变化时会调用 `resize`。如果页面里图表很多，可以设置节流时间。

<XDocDemo title="自动缩放和加载态" :code="chartLoadingCode">
  <ClientOnly>
    <XChart
      :option="chartOption"
      loading
      :loading-options="{ text: '加载中' }"
      :autoresize="{ throttle: 80 }"
      height="220px"
    />
  </ClientOnly>
</XDocDemo>

## 主题接入

`XChart` 不会把 x.ui CSS 变量自动转换成 ECharts option。业务侧可以使用 ECharts 原生 `registerTheme` 注册主题，再通过 `theme` 传入主题名或主题对象。

<XDocDemo title="主题接入" :code="chartThemeCode">
  <ClientOnly>
    <XChart
      :option="chartDarkOption"
      theme="x-doc-chart-dark"
      background-color="#0b1726"
      height="220px"
    />
  </ClientOnly>
</XDocDemo>

## 实例方法

组件通过 `ref` 暴露常用 ECharts 实例能力，适合在业务交互中主动更新图表。

<XDocDemo title="实例方法" :code="chartExposeCode">
  <ClientOnly>
    <XChart :option="chartOption" height="220px" />
  </ClientOnly>
</XDocDemo>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| option | ECharts 原生配置项 | `EChartsCoreOption` | - |
| theme | ECharts 主题名或主题对象 | `string \| object` | - |
| initOptions | `echarts.init` 第三个参数 | `EChartsInitOpts` | - |
| setOptionOptions | 自动更新 option 时传给 `setOption` 的参数 | `SetOptionOpts` | - |
| autoresize | 是否自动跟随容器尺寸变化，支持节流配置 | `boolean \| { throttle?: number }` | `true` |
| loading | 是否显示 ECharts 加载态 | `boolean` | `false` |
| loadingOptions | 加载态配置 | `Record<string, unknown>` | - |
| events | 任意 ECharts 事件绑定 | `ChartEvents` | - |
| width | 图表容器宽度，数字会转为 px | `number \| string` | `'100%'` |
| height | 图表容器高度，数字会转为 px | `number \| string` | `320` |
| minHeight | 图表容器最小高度，数字会转为 px | `number \| string` | `240` |
| borderWidth | 容器边框宽度，数字会转为 px | `number \| string` | - |
| borderColor | 容器边框颜色 | `string` | - |
| backgroundColor | 容器背景色 | `string` | - |
| textColor | 容器文字颜色 | `string` | - |

## Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| ready | ECharts 实例创建完成后触发 | `ECharts` |
| rendered | 转发 ECharts `rendered` 事件 | `unknown` |
| finished | 转发 ECharts `finished` 事件 | `unknown` |

## Exposes

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| getInstance | 获取当前 ECharts 实例 | `() => ECharts \| undefined` |
| setOption | 调用实例 `setOption` | `(option, options?) => void` |
| resize | 调用实例 `resize` | `(options?) => void` |
| dispatchAction | 调用实例 `dispatchAction` | `(payload) => void` |
| clear | 清空图表 | `() => void` |
| showLoading | 显示加载态 | `(type?, options?) => void` |
| hideLoading | 隐藏加载态 | `() => void` |
| dispose | 销毁实例 | `() => void` |

## 手动验收建议

- 检查 `<XChart :option="option" />` 是否可以在固定高度和默认高度下正常渲染。
- 切换 `loading`，确认 ECharts 加载态显示和隐藏正常。
- 调整父容器宽高，确认开启 `autoresize` 后图表会重新计算尺寸。
- 通过 `events` 绑定 click 或 mouseover，确认事件可以触发业务回调。
- 切换 `theme` 或 `initOptions` 引用，确认图表会重建并应用当前 option。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XChart / `ChartProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
