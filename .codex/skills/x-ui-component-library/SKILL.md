---
name: x-ui-component-library
description: 在 x.ui Vue 3 组件库中开发、文档化、手动验收、自动化测试、构建和本地 link 联调组件。适用于新增或修改 Vue 3 UI 组件、创建 Histoire 组件运行效果页面、编写中文 VitePress 文档、添加 Vitest 组件测试、验证组件库发布构建，或指导第三方 Vue 3 项目通过 npm link / pnpm link 调用并联调 x.ui。
---

# x.ui 组件库开发技能

在 `x.ui` 仓库中开发组件时使用本技能。

## 必读顺序

1. 先阅读仓库根目录的 `AGENTS.md`。
2. 再按需阅读 `references/component-workflow.md`。
3. 参考现有组件 `src/components/basic-components/button` 的结构。
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

## 组件分类目录约束

所有公开组件必须放在 `src/components` 下的分类目录中，不允许新增散落在 `src/components/<component>` 一级的公开组件目录。分类目录固定为：

| 目录 | 中文分类 |
| --- | --- |
| `basic-components` | 基础组件 |
| `form-components` | Form 组件 |
| `display-components` | 展示组件 |
| `navigation-components` | 导航组件 |
| `feedback-components` | 反馈组件 |
| `other-components` | 其它组件 |

- 新增或移动组件时，组件源码目录必须使用 `src/components/<category>/<component>/`。
- 不属于基础、Form、展示、导航、反馈五类的组件，统一放入 `src/components/other-components/`。
- `docs/.vitepress/config.ts` 中的组件侧边栏必须按上述六个中文分类分组。
- Histoire 的 `<Story title="...">` 必须以对应中文分类作为第一级路径，例如 `基础组件/Button 按钮`、`Form 组件/Input 输入框`。
- `src/components/index.ts`、`src/index.ts`、测试、文档组件、Histoire story 中的导入路径必须同步到分类目录。

## Histoire 外观接口规范

组件 story 中的交互菜单只保留一个 `外观接口` 变体。除 `XPageBuilder` 外，每个组件都必须把调试入口收敛到该变体中，避免同时出现“基础用法”“状态与边界”“交互调试”等其它 Variant。

- `外观接口` 必须展示当前组件所有公开的属性、接口、类型、事件；组件新增或调整这些公开能力时，必须同步更新该变体中的对应调试项。
- `外观接口` 的控制区必须竖向排列 `属性`、`接口`、`类型`、`事件` 四块区域，每块左上角用标题标明区域类型。
- `属性`、`接口`、`类型`、`事件` 每块区域内部都按四列排列，每列固定 `180px` 宽，标签放在交互框左侧。
- 每列中的文字标签和输入框都必须使用紧凑宽度，避免相邻列互相挤压；标签过长时允许省略显示，输入框、下拉框、颜色框要限制在当前 `180px` 列内。
- 组件名称包含 `group`（不区分大小写）时，预览区至少展示三个当前组件实例，方便组测试。
- 组件或组件组外部必须套一个父 `div`，父元素固定 `padding: 10px`，并让内部组件或组件组水平居中、垂直居中显示。
- 外观接口必须提供父元素宽度和父元素高度两个数字输入框；输入值用于控制父元素 `div` 的 `width` 和 `height`。
- 外观接口必须提供“父元素撑满宽度”和“父元素撑满高度”两个复选框；勾选后分别让父元素 `div` 的 `width` 或 `height` 使用 `100%`。
- 后缀带“色”字的属性使用颜色拾取框；带“长度”“高度”“字号”“圆角”的属性使用数字输入框。
- `绑定值`、`占位文本`、`前缀`、`后缀`、`id`、`name`、`内边距` 使用文本输入框。
- `字体`、`对齐`、`尺寸` 使用下拉选择框。
- `自动高度`、`自动宽度`、`显示激活边框`、`禁用`、`只读`、`可清空`、`隐藏清除按钮` 使用复选框。

## 尺寸选项强制约定

组件提供 `size` 属性时，必须优先使用 `sm`、`md`、`lg` 三档，并按下表统一尺寸。除非用户明确要求特例，不要为单个组件另行定义同名尺寸含义。

组件属性中同时提供 `size` 与高度、字体大小、圆角、padding 等外观属性时，一旦设置了 `size`，这些属性必须自动失效，由 `size` 统一接管对应样式；`size` 不影响宽度和字体族，避免同一组件出现多套尺寸来源互相覆盖。

| 尺寸 | 高度 | 字体 | padding | 圆角 |
| --- | --- | --- | --- | --- |
| sm | `22px` | `10px` | `0 4px` | `4px` |
| md | `30px` | `12px` | `0 8px` | `6px` |
| lg | `38px` | `14px` | `0 10px` | `8px` |

## 标准流程

1. 创建组件目录：`src/components/<category>/<component>/`。
2. 编写组件 SFC：`src/components/<category>/<component>/src/<Component>.vue`。
3. 编写公开类型：`src/components/<category>/<component>/src/types.ts`。
4. 编写组件导出：`src/components/<category>/<component>/index.ts`。
5. 更新 `src/components/index.ts` 和 `src/index.ts`。
6. 编写 Histoire story：`src/components/<category>/<component>/<Component>.story.vue`。
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
