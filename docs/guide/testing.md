# 组件测试

x.ui 的组件测试分两类：一种是自动化测试，另一种是文档站里的手动预览测试。

## Histoire 手动预览测试

启动组件实验台：

```bash
pnpm story
```

构建组件实验台：

```bash
pnpm story:build
```

Histoire 适合查看每个组件运行后的真实效果。每个组件都可以提供一个 `*.story.vue` 文件，把常见状态、边界状态和交互操作集中放在一起。

推荐结构：

```text
src/components/button/Button.story.vue
src/components/input/Input.story.vue
src/components/dialog/Dialog.story.vue
```

## VitePress 文档预览

启动文档站：

```bash
pnpm dev
```

打开组件页面，例如：

```text
http://localhost:5173/components/button.html
```

在组件页面中，你可以查看组件说明、API 和基础示例。正式文档面向使用者，Histoire 更偏开发者手动验收。

建议检查这些内容：

- 默认状态是否符合设计预期。
- 不同 Props 组合下样式是否正确。
- hover、focus、disabled、loading 等状态是否自然。
- 点击、输入、选择等交互是否触发正确行为。
- 移动端宽度下是否换行、溢出或遮挡。

## 自动化测试

x.ui 使用 Vitest 和 Vue Test Utils 编写自动化测试。

运行全部测试：

```bash
pnpm test
```

开发时监听测试：

```bash
pnpm test:watch
```

查看覆盖率：

```bash
pnpm test:coverage
```

## 自动化测试什么

组件测试建议优先覆盖这些内容：

- 渲染内容是否正确，例如默认插槽、具名插槽、空状态。
- Props 是否生效，例如 `variant`、`size`、`disabled`、`loading`。
- 事件是否正确触发，例如 `click`、`update:modelValue`、`change`。
- 状态是否符合预期，例如禁用态不可点击、加载态显示图标。
- 可访问性是否基本可靠，例如原生属性、`aria-*`、键盘交互。

## 示例

`XButton` 的测试位于 `tests/button.test.ts`：

```ts
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XButton } from '../src'

describe('XButton', () => {
  it('渲染插槽内容', () => {
    const wrapper = mount(XButton, {
      slots: {
        default: '创建'
      }
    })

    expect(wrapper.text()).toContain('创建')
  })
})
```

新增组件时，建议按这个结构添加测试：

```text
src/components/input/src/Input.vue
src/components/input/src/types.ts
src/components/input/index.ts
tests/input.test.ts
docs/components/input.md
```
