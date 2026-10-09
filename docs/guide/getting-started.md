# 快速开始

本组件库面向 PC 端 Vue 3 项目，仅发布 ES 模块。JavaScript 入口为 `dist/x-ui.js`，类型入口为 `dist/index.d.ts`，统一样式入口为 `dist/style.css`。

左侧组件分类可以折叠；进入组件页面会展开所属分类。使用顶部搜索定位组件，使用右侧“本页目录”定位属性、事件、插槽和方法的功能分组。示例默认收起源码，展开后可复制完整 Vue 单文件组件。

文档示例使用组件默认外观和公开属性，布局通过 `XBrick`、`XGrid` 等组件完成，不需要复制额外的 CSS。示例中的 `@x-soft88/x-ui/style.css` 是组件库统一样式入口，项目仍需引入。

安装依赖：

```bash
pnpm install
```

启动文档站：

```bash
pnpm dev
```

构建组件库：

```bash
pnpm build
```

全量注册组件：

```ts
import { createApp } from 'vue'
import XUi from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

createApp(App).use(XUi).mount('#app')
```

按需使用单个组件：

```vue
<script setup lang="ts">
import { XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XButton>提交</XButton>
</template>
```

## 使用方式

@x-soft88/x-ui 统一使用完整入口 `@x-soft88/x-ui`。业务项目不需要在轻量入口、复杂组件子入口之间做选择；所有公开组件都从主入口获取，样式统一从 `@x-soft88/x-ui/style.css` 引入。

### 全局注册

全局注册会把当前组件库中的公开组件注册到 Vue app，适合业务项目统一接入。Notification 的模板组件注册为 `XNotification`；`XNotification` 命名导入仍为通知服务，`XNotificationComponent` 用于直接引用模板组件。

```ts
import XUi from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

app.use(XUi)
```

### 命名导入

```vue
<script setup lang="ts">
import { XText } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XText>正文内容</XText>
</template>
```

命名导入适合在不使用全局注册时单独引用组件。入口仍然是 `@x-soft88/x-ui`，不再提供 `@x-soft88/x-ui/core`、`@x-soft88/x-ui/table`、`@x-soft88/x-ui/rich-text-editor` 这类子入口。

### 公开类型与单组件安装

组件入口公开的类型也可以从主入口导入，例如：

```ts
import { XSwitch } from '@x-soft88/x-ui'
import type { SwitchEmits, SwitchProps, SwitchValue } from '@x-soft88/x-ui'

const initialValue: SwitchValue = false
const switchProps: SwitchProps = { modelValue: initialValue, height: 24 }
const onChange = (...[value]: SwitchEmits['change']) => console.log(value)

// 已创建 Vue app 时，可单独全局安装 Switch。
app.use(XSwitch)
```

## 本地联调

本地联调其它 Vue 3 项目时，可以先在组件库目录执行：

```bash
pnpm build
pnpm link --global
pnpm build:watch
```

然后在业务项目目录执行：

```bash
pnpm link --global @x-soft88/x-ui
pnpm dev
```

`pnpm build:watch` 会监听组件库源码变化并持续更新 `dist` 产物，建议联调期间保持运行。

### 修改组件后的刷新流程

修改组件源码后，如果业务项目中没有看到最新效果，通常是 Vite 依赖预构建缓存还在使用旧产物。推荐按下面顺序处理：

1. 确认组件库目录的 `pnpm build:watch` 正在运行，或手动执行一次 `pnpm build`。
2. 停止业务项目当前的 dev 服务。
3. 在业务项目目录重新启动，并强制刷新 Vite 依赖缓存：

```bash
pnpm dev -- --force
```

如果仍然出现旧样式、旧类型或旧组件逻辑，可以删除业务项目中的 Vite 缓存后再启动：

```bash
Remove-Item -Recurse -Force node_modules\.vite
pnpm dev -- --force
```

如果业务项目出现两份 Vue 导致的异常，在业务项目 `vite.config.ts` 中加入：

```ts
export default defineConfig({
  resolve: {
    dedupe: ['vue']
  }
})
```


## 重组件隔离与子路径引入

根入口、默认插件和 `@x-soft88/x-ui/style.css` 保持可用。只使用单个按钮、图表或富文本时，也可以直接从对应子路径导入，避免消费入口与其它组件耦合：

```ts
import { XButton, type ButtonProps } from '@x-soft88/x-ui/button'
import { XChart, registerXChartAnalyticsModules, type ChartProps } from '@x-soft88/x-ui/chart'
import { XRichTextEditor, type RichTextEditorProps } from '@x-soft88/x-ui/rich-text-editor'
import '@x-soft88/x-ui/style.css'
```

子路径同时提供默认组件和公开类型，图表继续使用现有 ECharts peer dependency。多入口构建改善了根入口按需消费：只导入 XButton 不再带入图表、编辑器和 XLSX。全量样式路径保持不变，仍包含组件库全部样式及字体资源；此轮没有拆分样式或扩大 peer dependencies。

表格组件统一使用 `XTable`，公开类型使用 `Table*`，不提供旧命名别名。
