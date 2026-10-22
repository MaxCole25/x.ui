---
description: 指导 AI 使用 Soft88 X.UI 的真实组件、Props、布局与主题组合 Vue 3 TypeScript 业务页面，尽可能减少手写 CSS。
---

# AI 使用指南

Soft88 X.UI 是 Vue 3 + TypeScript UI 组件库，包名为 `@x-soft88/x-ui`。核心理念是通过组件、Props、布局系统和统一主题构建业务界面，尽可能不手写 CSS。这是优先策略，不代表组件已经覆盖所有设计需求。

## 生成页面前

1. 先在组件导航或站内搜索中找到能力相符的组件。布局优先查看 [Brick](../components/brick.md)、[Grid](../components/grid.md)、[Flow](../components/flow.md) 和 [Layout](../components/layout.md)。
2. 阅读目标组件的属性、事件、插槽、实例方法和公开类型；核对默认值与示例。不要把其它 UI 库的 API 套到 X.UI 上。
3. 本地源码以 `src/components/<category>/<component>/src/types.ts` 和组件实现为准，核对 `src/components/index.ts`、`src/index.ts` 的实际导出。安装包以 `dist/index.d.ts` 和关联声明为准。
4. 先用公开 Props 控制宽高、间距、排版和颜色，再组合布局组件。查阅 [主题](./theme.md) 和 [字号规范](./typography.md)，优先使用主题默认值。
5. 不编造组件、Props、事件或未来功能。某个关联类型未公开导出时，不得从包名导入它。能力不足时说明缺口，只补充必要的自定义 CSS，不额外引入另一套 UI 库。
6. 在业务项目运行实际的类型检查和构建命令，核对绑定类型、事件参数与组件导出。本仓库使用 `pnpm typecheck:docs` 检查示例。

## 安装和入口

```bash
pnpm add @x-soft88/x-ui
```

当前仓库配置 `publishConfig.access: restricted`；安装需要包已发布且账号具备访问权限。没有权限时，参照[快速开始的本地联调](./getting-started.md#本地联调)使用源码构建和 link。不要把该命令理解为包已公开发布的保证。

在 Vue 3 的 `main.ts` 中引入统一样式并挂载应用：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import '@x-soft88/x-ui/style.css'

// 可选：regular（默认）、dark 或 light，设置在 html 上以覆盖 Teleport 浮层。
document.documentElement.dataset.theme = 'regular'
createApp(App).mount('#app')
```

## 无自定义 CSS 的查询页面

以下预览和可复制源码来自同一个 Vue 文件。`XFlow.itemWidth` 决定自动换行的最小列宽；这是一种可用的响应式组合，不代表所有组件均支持断点 Props。更复杂的适配需查对应组件文档并在目标设备验收。

<script setup lang="ts">
import AiExample from '../examples/ai/Example1.vue'
import AiExampleSource from '../examples/ai/Example1.vue?raw'
</script>

<XDocDemo title="查询面板：布局、输入、按钮和结果反馈" :code="AiExampleSource">
  <AiExample />
</XDocDemo>

## 机器可读入口

- [精简索引](https://maxcole25.github.io/x.ui/llms.txt)：项目、安装、规范和所有公开文档索引。
- [完整文档](https://maxcole25.github.io/x.ui/llms-full.txt)：聚合公开 Markdown、API 表和示例源码，每次文档构建重新生成。
- [仓库 Skill](https://github.com/MaxCole25/x.ui/tree/main/.codex/skills/x-ui-component-library)：开发组件库或在业务项目使用 X.UI 时按场景读取。

`llms.txt` 是便于工具读取的文本入口，不保证所有 AI 产品自动发现、读取或训练收录。允许 GPTBot 抓取也不等于保证训练收录。使用其它 AI 工具时，可主动提供本指南、组件文档和类型声明。
