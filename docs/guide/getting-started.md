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
import XUi from 'xl.ui'
import 'xl.ui/style.css'

createApp(App).use(XUi).mount('#app')
```

按需使用单个组件：

```vue
<script setup lang="ts">
import { XButton } from 'xl.ui'
import 'xl.ui/style.css'
</script>

<template>
  <XButton>提交</XButton>
</template>
```

## 使用方式

xl.ui 统一使用完整入口 `xl.ui`。业务项目不需要在轻量入口、复杂组件子入口之间做选择；所有公开组件都从主入口获取，样式统一从 `xl.ui/style.css` 引入。

### 全局注册

全局注册会把当前组件库中的公开组件注册到 Vue app，适合业务项目统一接入。

```ts
import XUi from 'xl.ui'
import 'xl.ui/style.css'

app.use(XUi)
```

### 命名导入

```vue
<script setup lang="ts">
import { XText } from 'xl.ui'
import 'xl.ui/style.css'
</script>

<template>
  <XText>正文内容</XText>
</template>
```

命名导入适合在不使用全局注册时单独引用组件。入口仍然是 `xl.ui`，不再提供 `xl.ui/core`、`xl.ui/table`、`xl.ui/rich-text-editor` 这类子入口。

## 本地联调

本地联调其它 Vue 3 项目时，可以先在组件库目录执行：

```bash
pnpm build
pnpm link --global
pnpm build:watch
```

然后在业务项目目录执行：

```bash
pnpm link --global xl.ui
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
