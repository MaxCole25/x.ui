# 快速开始

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
import XUi from 'x.ui'
import 'x.ui/style.css'

createApp(App).use(XUi).mount('#app')
```

按需使用单个组件：

```vue
<script setup lang="ts">
import { XButton } from 'x.ui'
import 'x.ui/style.css'
</script>

<template>
  <XButton>提交</XButton>
</template>
```

## 入口选择

x.ui 当前提供多个入口。业务项目选择入口时，必须先确认是否需要跨 app 复用组件，以及是否接受手动局部导入复杂组件。

### 完整入口 `x.ui`

`x.ui` 是完整组件库入口，会注册当前组件库中的公开组件，并配合全局样式使用。对于 AiDoc 这类存在 `shared-web` / `official-web` 多前端复用业务组件的场景，推荐宿主 app 统一使用完整入口，避免 shared 组件模板中使用了某个 x.ui 组件，但宿主没有全局注册导致运行时不渲染。

```ts
import XUi from 'x.ui'
import 'x.ui/style.css'

app.use(XUi)
```

### 轻量入口 `x.ui/core`

`x.ui/core` 是轻量基础入口，只注册 core 白名单组件，不等于完整 x.ui 组件库。使用 `x.ui/core` 时，模板中如果出现非 core 组件，构建阶段不一定能明显暴露问题，运行时可能出现组件不渲染。

当前 core 白名单组件包括：

`XAvatar`、`XBaseInput`、`XButton`、`XButtonGroup`、`XBrick`、`XBrickItem`、`XCheckbox`、`XDateTimePicker`、`XDialog`、`XDropdown`、`XDropdownItem`、`XDropdownMenu`、`XEmpty`、`XForm`、`XFormItem`、`XGrid`、`XGridItem`、`XIcon`、`XInput`、`XLogin`、`XMessage`、`XOption`、`XSelect`、`XSwitch`、`XTabs`、`XTooltip`、`XTree`。

`XTable`、`XRichTextEditor` 等复杂组件不在 core 白名单内。如果宿主 app 坚持使用 `x.ui/core`，跨 app 复用的 shared 业务组件必须对非 core 组件进行局部导入。

### 复杂组件子入口

`x.ui/table` 和 `x.ui/rich-text-editor` 是复杂组件子入口，适合在使用 `x.ui/core` 的轻量 app 中按需局部导入。

```vue
<script setup lang="ts">
import { XTable } from 'x.ui/table'
import 'x.ui/style.css'
</script>

<template>
  <XTable :columns="columns" :data="rows" />
</template>
```

如果业务组件会在多个 app 之间复用，优先选择完整入口 `x.ui`。只有在明确控制包体积、依赖范围，并且团队能持续遵守“非 core 组件必须局部导入”的约束时，才建议使用 `x.ui/core`。

## 本地联调

本地联调其它 Vue 3 项目时，可以先在组件库目录执行：

```bash
pnpm build
pnpm link --global
pnpm build:watch
```

然后在业务项目目录执行：

```bash
pnpm link --global x.ui
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
