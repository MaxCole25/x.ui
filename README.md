# Soft88 X.UI

A Vue 3 + TypeScript UI component library for building business interfaces with components, props, layouts and shared themes, minimizing handwritten CSS.

X.UI 优先通过组件、Props、布局系统与统一主题组合业务界面，尽可能减少手写 CSS。布局能力包括 Brick、Grid、Flow 和 Layout；主题提供 regular、dark、light。能力不足时可以补充必要的 CSS，具体支持情况以各组件文档与类型声明为准。

- [文档网站](https://maxcole25.github.io/x.ui/)（部署目标，实际状态以 Actions 为准）
- [组件文档](https://maxcole25.github.io/x.ui/components/button.html)
- [AI 使用指南](https://maxcole25.github.io/x.ui/guide/ai-usage.html)
- [文档部署与维护](docs/guide/docs-maintenance.md)
- [机器可读索引](https://maxcole25.github.io/x.ui/llms.txt) · [完整文档](https://maxcole25.github.io/x.ui/llms-full.txt)

## 安装

```bash
pnpm add @x-soft88/x-ui
```

当前 `publishConfig.access` 为 `restricted`，需要包已发布且具有对应访问权限；本次不发布 npm 新版本。也可克隆仓库后按[本地联调](docs/guide/getting-started.md#本地联调)构建与 link。

Vue peer 范围为 `^3.5.0`，图表 peer 为 ECharts `^5.0.0`。开发 TypeScript 范围为 `^5.8.3`，当前锁定 TypeScript 5.9.3、Vue 3.5.38；这不代表已验证所有 TypeScript 版本。发布产物为 ESM、CSS 和类型声明。

## 最小使用示例

`main.ts`：

```ts
import { createApp } from 'vue'
import XUi from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

import App from './App.vue'

createApp(App).use(XUi).mount('#app')
```

`App.vue`：

```vue
<script setup lang="ts">
import { XButton } from '@x-soft88/x-ui'
</script>

<template>
  <XButton>确认</XButton>
</template>
```

## AI 编程工具

请先阅读 [AI 使用指南](docs/guide/ai-usage.md)，按文档选择组件与 Props，优先布局和主题能力，不编造 API，不额外引入重复 UI 库。不确定时核对 `src/index.ts`、组件 `src/types.ts` 或安装包的 `dist/index.d.ts`。

仓库已有一个通用 Agent Skills 结构的 [x-ui-component-library Skill](.codex/skills/x-ui-component-library/SKILL.md)，涵盖组件库开发和业务页面组合。支持该结构的工具可按其自身安装方式使用；例如在支持仓库 `.codex/skills` 的 Codex 中使用此仓库并显式指定 `$x-ui-component-library`，或把整个技能目录复制到业务项目 `.codex/skills/`。复制到业务项目后，先按 Skill 的业务接入流程读取在线文档与安装包类型，不把组件库维护命令用于业务项目。更新时同步整个目录及 references。并非所有 AI 产品都会自动读取 Skill，也可以直接提供指南、组件文档和类型。

## 开发与验证

沿用 CI 的 Node 22 和 pnpm 10.10.0（`packageManager` 已固定）；本地其它 Node 版本需自行验证。

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck:lib
pnpm typecheck:docs
pnpm test
pnpm build
pnpm docs:coverage
pnpm docs:build
pnpm docs:verify
```

已有 API 同步命令为 `pnpm api:inventory`、`pnpm api:inventory:check`、`pnpm docs:api`。LLM 文档随文档构建自动生成，不手工编辑产物。`main` 推送和手动触发可发布 Pages，首次需管理员将 Pages Source 设为 GitHub Actions，详见[维护指南](docs/guide/docs-maintenance.md)。
