---
name: x-ui-component-library
description: 在 x.ui Vue 3 组件库中开发、文档化、手动验收、自动化测试、构建和本地 link 联调组件。适用于新增或修改 Vue 3 UI 组件、创建 Histoire 组件运行效果页面、编写中文 VitePress 文档、添加 Vitest 组件测试、验证组件库发布构建，或指导第三方 Vue 3 项目通过 npm link / pnpm link 调用并联调 x.ui。
---

# x.ui 组件库开发技能

在 `x.ui` 仓库中开发组件时使用本技能。

## 必读顺序

1. 先阅读仓库根目录的 `AGENTS.md`。
2. 再按需阅读 `references/component-workflow.md`。
3. 参考现有组件 `src/components/button` 的结构。
4. 完成源码、导出、中文文档、Histoire story、Vitest 测试。
5. 运行验证命令。

## 中文与编码要求

本仓库的文档、story 文案、测试文案大量使用中文。开发过程中必须避免中文乱码。

- 所有文件按 UTF-8 读取和写入。
- PowerShell 读取中文文件时使用 `Get-Content <file> -Raw -Encoding UTF8`。
- PowerShell 写中文文件时使用 `Set-Content <file> -Encoding UTF8`。
- 优先使用 `apply_patch` 修改中文文件。
- 不要用默认编码不明确的 `>`、`>>`、`Out-File` 写入中文。
- 终端显示乱码时，先用 UTF-8 重新读取确认，不要误判文件内容。
- 如果看到 `鎸夐挳`、`涓昏`、`鐢ㄤ簬` 等文本，按乱码处理并修复。

## 默认开发方式

- 使用 Vue 3 SFC 和 `<script setup lang="ts">`。
- 对外组件使用 `X` 前缀，例如 `XButton`。
- 使用 `defineOptions({ name: 'XComponent' })` 固定组件名。
- 在组件目录内维护公开类型，例如 `src/types.ts`。
- `docs/` 下文档必须是中文。
- 使用 Histoire 手动验收组件运行效果。
- 使用 VitePress 编写正式中文文档。
- 使用 Vitest 和 Vue Test Utils 验证组件行为。
- Vue 必须保持为 peer dependency。

## 标准流程

1. 创建组件目录：`src/components/<component>/`。
2. 编写组件 SFC：`src/components/<component>/src/<Component>.vue`。
3. 编写公开类型：`src/components/<component>/src/types.ts`。
4. 编写组件导出：`src/components/<component>/index.ts`。
5. 更新 `src/components/index.ts` 和 `src/index.ts`。
6. 编写 Histoire story：`src/components/<component>/<Component>.story.vue`。
7. 编写中文 VitePress 文档：`docs/components/<component>.md`。
8. 更新 `docs/.vitepress/config.ts` 导航或侧边栏。
9. 编写测试：`tests/<component>.test.ts`。
10. 运行验证命令。

## 验证命令

组件改动后运行：

```bash
pnpm test
pnpm build
pnpm docs:build
pnpm story:build
```

手动查看组件运行效果：

```bash
pnpm story
```

启动中文文档站：

```bash
pnpm dev
```

## 本地 link 联调

组件库项目：

```bash
pnpm build
pnpm link --global
pnpm build:watch
```

第三方 Vue 3 项目：

```bash
pnpm link --global x.ui
pnpm dev
```

如果第三方项目出现两份 Vue 的问题，在第三方项目 Vite 配置中加入：

```ts
resolve: {
  dedupe: ['vue']
}
```
