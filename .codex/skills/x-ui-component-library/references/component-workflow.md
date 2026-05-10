# x.ui 组件开发工作流

## 新增组件文件结构

新增公开组件时创建：

```text
src/components/<component>/src/<Component>.vue
src/components/<component>/src/types.ts
src/components/<component>/index.ts
src/components/<component>/<Component>.story.vue
docs/components/<component>.md
tests/<component>.test.ts
```

同时更新：

```text
src/components/index.ts
src/index.ts
docs/.vitepress/config.ts
```

## 中文编码防护

所有中文文件必须使用 UTF-8。尤其注意这些文件：

```text
AGENTS.md
.codex/skills/x-ui-component-library/SKILL.md
.codex/skills/x-ui-component-library/references/component-workflow.md
docs/**/*.md
src/**/*.story.vue
tests/**/*.test.ts
```

PowerShell 推荐读取方式：

```powershell
Get-Content docs\components\button.md -Raw -Encoding UTF8
```

PowerShell 推荐写入方式：

```powershell
Set-Content docs\components\button.md -Value $content -Encoding UTF8
```

更推荐使用 `apply_patch` 修改中文文件。不要用默认编码不明确的重定向写中文：

```powershell
# 不推荐
"> docs\components\button.md"
">> docs\components\button.md"
Out-File docs\components\button.md
```

如果看到以下内容，通常说明中文已经乱码：

```text
鎸夐挳
涓昏
鐢ㄤ簬
绂佺敤
```

遇到乱码时，先用 UTF-8 读取原文件确认，再修复为正常中文。

## 组件 SFC 模板

```vue
<script setup lang="ts">
import type { ComponentProps } from './types'

defineOptions({
  name: 'XComponent'
})

const props = withDefaults(defineProps<ComponentProps>(), {
  disabled: false
})
</script>

<template>
  <div class="x-component">
    <slot />
  </div>
</template>
```

## 组件 index.ts 模板

```ts
import type { App } from 'vue'
import Component from './src/Component.vue'

export const XComponent = Component

export type { ComponentProps } from './src/types'

XComponent.install = (app: App) => {
  app.component(XComponent.name!, XComponent)
}

export default XComponent
```

## 根入口导出模板

```ts
import type { App, Plugin } from 'vue'
import { XButton } from './components/button'
import { XComponent } from './components/component'
import './styles/index.css'

export { XButton, XComponent }
export type { ButtonProps } from './components/button'
export type { ComponentProps } from './components/component'

const components = [XButton, XComponent]

const XUi: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component)
    })
  }
}

export default XUi
```

## Histoire story 要求

Histoire 用于手动验收组件运行后的功能和样式。每个 story 至少包含：

- 一个可交互验收区域。
- 常见类型或变体。
- 禁用、加载、错误等状态，按组件实际能力选择。
- 长文本、空内容或边界内容。
- 可点击或可输入组件需要事件计数或状态反馈。

story 内导入组件库样式：

```ts
import '../../styles/index.css'
```

当前参考模板：

```text
src/components/button/Button.story.vue
```

## 中文 VitePress 文档要求

每个组件页面包含：

- 中文标题，例如 `# 按钮 Button`。
- 中文简介。
- 基础用法示例。
- Props、Events、Slots 表格，按组件实际能力添加。
- 必要时添加手动验收建议。

新增页面后更新：

```text
docs/.vitepress/config.ts
```

## Vitest 测试模板

测试组件行为，不做像素级视觉断言：

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XComponent } from '../src'

describe('XComponent', () => {
  it('渲染默认插槽内容', () => {
    const wrapper = mount(XComponent, {
      slots: {
        default: '内容'
      }
    })

    expect(wrapper.text()).toContain('内容')
  })
})
```

建议覆盖：

- 插槽渲染。
- Props 生效。
- class 或原生属性。
- 事件触发。
- `disabled`、`loading`、`readonly` 状态。
- `v-model` 行为。

## 手动验收命令

```bash
pnpm story
pnpm dev
```

打开：

```text
http://localhost:6006
http://localhost:5173
```

优先在 Histoire 中检查组件状态和交互，再到 VitePress 中检查正式文档。

## 第三方 Vue 3 项目联调

组件库项目：

```bash
pnpm build
pnpm link --global
pnpm build:watch
```

第三方项目：

```bash
pnpm link --global x.ui
pnpm dev
```

第三方项目使用：

```ts
import { createApp } from 'vue'
import XUi from 'x.ui'
import 'x.ui/style.css'

createApp(App).use(XUi).mount('#app')
```

如果 link 后出现两份 Vue，第三方项目增加：

```ts
resolve: {
  dedupe: ['vue']
}
```

## 最终验证

运行：

```bash
pnpm test
pnpm build
pnpm docs:build
pnpm story:build
```

说明剩余 warning。Histoire 0.17 在 `story:build` 时可能输出非阻塞的内部 Rollup warning，只要命令成功退出，不视为失败。
