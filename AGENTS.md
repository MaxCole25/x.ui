# x.ui Agent 开发指南

本仓库是 Vue 3 UI 组件库 `x.ui`。第三方 AI、Codex 5.3 或其它代码代理在本仓库中开发组件时，必须优先遵循本文档。

## 项目目标

构建一套可复用、可文档化、可手动验收、可自动化测试、可被第三方 Vue 3 项目本地联调的 UI 组件库。

当前约定：

- 使用 Vue 3 单文件组件和 TypeScript。
- 使用 Vite library mode 打包组件库。
- 使用 VitePress 编写中文正式文档。
- 使用 Histoire 查看组件运行效果，手动测试功能和样式。
- 使用 Vitest 和 Vue Test Utils 编写自动化组件测试。
- 使用 `pnpm link` 或 `npm link` 支持第三方 Vue 3 项目本地调用与联调。

## 技术栈

- 包管理器：`pnpm`
- 前端框架：`vue`
- 构建工具：`vite`
- 类型声明：`vite-plugin-dts`、`vue-tsc`
- 文档站：`vitepress`
- 组件实验台：`histoire`
- 自动化测试：`vitest`、`@vue/test-utils`、`jsdom`

## 编码与中文乱码防护

本项目包含大量中文文档、中文 story 文案和中文测试文案。所有代理必须保护中文内容不被写成乱码。

- 所有源码、文档、配置文件统一使用 `UTF-8` 编码。
- 读取中文文件时显式指定 UTF-8，例如 PowerShell 使用 `Get-Content <file> -Raw -Encoding UTF8`。
- 写入中文文件时显式指定 UTF-8，例如 PowerShell 使用 `Set-Content <file> -Encoding UTF8`。
- 手工编辑文件时优先使用 `apply_patch`，避免使用默认编码不明确的 shell 重定向写中文文件。
- 不要使用 Windows PowerShell 5 的默认 `Set-Content`、`Out-File`、`>`、`>>` 来写入中文内容，除非显式指定 UTF-8。
- 不要把已经正常的中文内容转成 GBK、ANSI、UTF-16 或带乱码的文本。
- 如果终端显示中文乱码，不要立刻判断文件已损坏；先用显式 UTF-8 读取确认文件内容。
- 如果发现文档中出现 `鎸夐挳`、`涓昏`、`鐢ㄤ簬` 这类疑似乱码，必须停下来用 UTF-8 重新读取并修复对应文件。
- Markdown、Vue、TS、CSS、YAML 文件都按 UTF-8 处理。

推荐检查命令：

```powershell
Get-Content docs\components\button.md -Raw -Encoding UTF8
Get-Content .codex\skills\x-ui-component-library\SKILL.md -Raw -Encoding UTF8
```

## 常用命令

在仓库根目录执行：

```bash
pnpm install
pnpm dev
pnpm story
pnpm test
pnpm test:coverage
pnpm build
pnpm docs:build
pnpm story:build
```

用途：

- `pnpm dev`：启动 VitePress 中文文档站。
- `pnpm story`：启动 Histoire 组件实验台，用于手动验收组件功能和样式。
- `pnpm test`：运行自动化组件测试。
- `pnpm build`：构建组件库发布产物。
- `pnpm docs:build`：验证中文文档可构建。
- `pnpm story:build`：验证 Histoire 手动验收页面可构建。

## 组件开发约定

每新增一个公开组件，都应创建或更新：

```text
src/components/<component>/src/<Component>.vue
src/components/<component>/src/types.ts
src/components/<component>/index.ts
src/components/index.ts
src/index.ts
src/components/<component>/<Component>.story.vue
docs/components/<component>.md
tests/<component>.test.ts
docs/.vitepress/config.ts
```

命名规则：

- 组件目录使用小写英文，例如 `button`、`input`、`dialog`。
- Vue 组件文件使用 PascalCase，例如 `Button.vue`、`Input.vue`。
- 对外组件名必须带 `X` 前缀，例如 `XButton`、`XInput`、`XDialog`。
- 组件内部使用 `defineOptions({ name: 'XComponent' })` 固定组件名。

## 组件导出规则

每个组件目录的 `index.ts` 必须导出：

- 命名组件，例如 `XButton`。
- 默认组件。
- 公开 Props、事件、插槽相关类型。
- 单组件安装函数 `install(app)`。

根入口 `src/index.ts` 必须：

- 导入所有公开组件。
- 导出所有公开组件和公开类型。
- 通过默认插件批量注册所有组件。
- 只在根入口统一导入一次 `src/styles/index.css`。

## 样式规则

- 全局设计变量放在 `src/styles/index.css`。
- 组件 class 使用 `x-` 前缀，例如 `x-button`。
- 修饰类使用 `x-button--solid`、`x-button--lg` 这类形式。
- 状态类使用 `is-loading`、`is-disabled` 这类形式。
- 样式应兼顾桌面和移动端，不要让长文本溢出或遮挡。
- 不要在开发单个组件时引入无关主题或大范围重构。

## 文档规则

`docs/` 下所有文档必须使用中文。

VitePress 用于面向使用者的正式文档：

- 组件用途。
- 基础用法。
- Props、Events、Slots 表格。
- 常见示例。
- 必要的手动验收建议。

Histoire 用于面向开发者的组件运行效果检查：

- 常见状态。
- 边界状态。
- 可交互控件。
- 事件触发验证。
- 长文本和响应式检查。

## 自动化测试规则

自动化测试关注行为，不做像素级视觉断言。

优先覆盖：

- 默认插槽和具名插槽渲染。
- Props 是否生效。
- class 或原生属性是否正确。
- 事件是否正确触发。
- `disabled`、`loading`、`readonly` 等状态。
- `v-model` 行为。
- 关键键盘交互和可访问性行为。

组件改动至少运行：

```bash
pnpm test
pnpm build
pnpm docs:build
pnpm story:build
```

仅修改中文文档时，至少运行：

```bash
pnpm docs:build
```

## 第三方 Vue 3 项目本地联调

在组件库项目中执行：

```bash
pnpm build
pnpm link --global
pnpm build:watch
```

在第三方 Vue 3 项目中执行：

```bash
pnpm link --global x.ui
pnpm dev
```

第三方项目中使用：

```ts
import { createApp } from 'vue'
import XUi from 'x.ui'
import 'x.ui/style.css'

createApp(App).use(XUi).mount('#app')
```

按需使用：

```vue
<script setup lang="ts">
import { XButton } from 'x.ui'
import 'x.ui/style.css'
</script>

<template>
  <XButton>确认</XButton>
</template>
```

如果第三方项目出现两份 Vue 导致的异常，在第三方项目 `vite.config.ts` 中加入：

```ts
resolve: {
  dedupe: ['vue']
}
```

## 第三方 Agent 注意事项

- 不要把本项目替换成其它 UI 库脚手架。
- 不要移除 VitePress、Histoire、Vitest，除非用户明确要求。
- 不要破坏 `package.json` 中的导出路径：`dist/x-ui.js`、`dist/x-ui.umd.cjs`、`dist/index.d.ts`、`dist/style.css`。
- Vue 必须保持为 `peerDependencies`。
- 不要提交或依赖生成目录，例如 `dist`、`docs/.vitepress/dist`、`.histoire`。
- 修改中文文件后，必须用 UTF-8 重新读取关键文件，确认没有乱码。
