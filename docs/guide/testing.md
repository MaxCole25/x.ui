# 组件测试

@x-soft88/x-ui 的组件测试分两类：一种是自动化测试，另一种是文档站里的手动预览测试。

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
src/components/basic-components/button/Button.story.vue
src/components/form-components/input/Input.story.vue
src/components/feedback-components/dialog/Dialog.story.vue
```

### 外观接口控制区

每个 Story 使用一个“外观接口”变体。布尔属性及其类型别名使用复选框，真实的字符串枚举使用下拉框，数字属性使用数字输入框；只接受字符串的长度属性仍使用文本输入框，避免传入组件不支持的数字。

同时支持数字与字符串的属性可切换输入方式：数值模式传入 number，字符串模式传入 string。对于已核实按 px 转换的长度，数字切换为字符串时附加 px；字符串中的 %、calc() 等表达式保持原样。无法转换为数字的字符串会显示提示并保留当前预览，清空输入则撤销可选属性覆盖；必填属性会显示提示并保留预览中的有效值，数组或对象可输入有效 JSON 表示空内容。恢复默认同时清理输入方式。

数组、对象等结构化属性使用 JSON 输入。组件触发 update 事件后，控制区同步显示新的绑定值；无效 JSON 会显示错误并保留上一有效值。函数与含方法的适配器由具体场景提供，签名在类型区域查看。

属性按功能分组，接口区域分别展示插槽与实例方法；类型按属性配置、事件参数、插槽契约、实例回调和组件数据分组，事件区域按功能分组并共用日志。各分组内使用四列紧凑布局。类型条目还标明包主入口是否导出；关联类型用于理解契约，不可直接按名称从包名导入。

场景可通过公共面板的 `initialProps` 提供初值，让预览与控件使用同一份状态。Select、Tabs、Autocomplete、Cascader、ScrollingText、Table 已使用此入口；Tabs 的新增、关闭和排序也更新这份状态。Table 的数据、行/单元格选择和列设置由面板统一管理，编辑后可恢复原始数据；编辑插槽与操作列随预览重新挂载。函数预设仍由场景提供。FileDisk 使用 `createInitialProps` 工厂，在首次预览和每次恢复时重建 adapter、目录存储和 ID 序列；上一轮上传回调只持有旧存储，不会写入新场景。

“恢复默认”清除控制区覆盖、插槽替换、方法参数和事件日志，并重置父容器宽高及撑满设置；使用 `initialProps` 的场景会重新复制原始数据，恢复初始绑定值与列表。其它 Story 仍需逐项核查自身场景状态，不能以构建成功代替交互验收。

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
- 在 1024、1280、1440px 的 PC 视口下检查长文本、滚动、浮层遮挡与键盘操作。

## 自动化测试

@x-soft88/x-ui 使用 Vitest 和 Vue Test Utils 编写自动化测试。

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
`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。
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
src/components/form-components/input/src/Input.vue
src/components/form-components/input/src/types.ts
src/components/form-components/input/index.ts
tests/input.test.ts
docs/components/input.md
```

现有自动化用例结束后由 Vue Test Utils 自动卸载组件，即使断言失败也会释放浮层与监听。Table 用例各自复制初始数据；验证事件提交结果的场景显式使用 `editableDataStrategy="emit"`，其它场景仍按默认策略运行。
