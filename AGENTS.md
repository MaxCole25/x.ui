# x.ui Agent 开发指南

本仓库是 Vue 3 UI 组件库 `x.ui`。第三方 AI、Codex 5.3 或其它代码代理在本仓库中开发组件时，必须优先遵循本文档。

> 中文备注：本文档已同步仓库内 `.codex/skills/x-ui-component-library/SKILL.md` 的关键约束，作为所有 Agent 在 x.ui 仓库内开发、文档化、测试和联调组件时的统一入口。

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
pnpm api:naming:audit:check
pnpm build
pnpm docs:build
pnpm story:build
```

用途：

- `pnpm dev`：启动 VitePress 中文文档站。
- `pnpm story`：启动 Histoire 组件实验台，用于手动验收组件功能和样式。
- `pnpm test`：运行自动化组件测试。
- `pnpm api:naming:audit:check`：检查公开属性命名是否保持 legacy/review 命中数为 0。
- `pnpm build`：构建组件库发布产物。
- `pnpm docs:build`：验证中文文档可构建。
- `pnpm story:build`：验证 Histoire 手动验收页面可构建。

## 组件开发约定

每新增一个公开组件，都应创建或更新：

```text
src/components/<category>/<component>/src/<Component>.vue
src/components/<category>/<component>/src/types.ts
src/components/<category>/<component>/index.ts
src/components/index.ts
src/index.ts
src/components/<category>/<component>/<Component>.story.vue
docs/components/<component>.md
tests/<component>.test.ts
docs/.vitepress/config.ts
```

> 中文备注：公开组件必须放入固定分类目录，避免继续新增 `src/components/<component>` 这种一级散落目录。

命名规则：

- 组件目录使用小写英文，例如 `button`、`input`、`dialog`。
- Vue 组件文件使用 PascalCase，例如 `Button.vue`、`Input.vue`。
- 对外组件名必须带 `X` 前缀，例如 `XButton`、`XInput`、`XDialog`。
- 组件内部使用 `defineOptions({ name: 'XComponent' })` 固定组件名。

## 公开接口命名规则

新增或修改公开 Props、事件、插槽、类型和 `expose` 方法时，必须优先遵守 `docs/guide/api-naming.md`。

- 基础属性统一使用 `modelValue`、`size`、`disabled`、`readonly`、`loading`、`clearable`。
- 颜色属性统一使用 `xxxColor`、`xxxTextColor`、`xxxBackgroundColor`、`xxxBorderColor`，主题色用 `accentColor`，选中色用 `checkedColor`，头像背景用 `avatarBackgroundColor`，不要新增 `BgColor` 缩写或裸 `background` / `color`。
- 整体圆角使用 `radius`，局部圆角使用 `partRadius`，不要为整体圆角新增 `borderRadius`。
- 布尔属性按语义使用 `showXxx`、`hideXxx`、`enableXxx`、`allowXxx`、`canXxx`。
- 新增浮层属性优先使用 `teleported`、`teleportTo`、`zIndex`，不要新增 `appendToBody`、`dropdownZIndex`、`popperZIndex` 这类并行命名。
- 视觉形态属性优先使用 `variant`，反馈状态属性优先使用 `status`；原生输入 `type` 可保留，其它场景不要新增裸 `type`。
- `color`、`background`、`value`、`label` 这类裸语义属性必须谨慎新增，语义不够明确时加业务前缀。

x.ui 当前按 pre-1.0 策略治理公开接口：新增或修改公开 Props 时直接使用规范新名称，不新增旧命名别名、兼容 fallback 或 `@deprecated` Props；除非用户明确要求兼容迁移。

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

> 中文备注：该分类规则优先级高于旧文档中的示例路径；如果旧组件仍在迁移中，修改时应顺手对齐分类路径。

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

> 中文备注：Histoire 是组件人工验收入口，后续新增或修改组件时，优先维护 `外观接口` 的完整性，而不是新增零散演示变体。

## 尺寸选项强制约定

组件提供 `size` 属性时，必须优先使用 `sm`、`md`、`lg` 三档，并按下表统一尺寸。除非用户明确要求特例，不要为单个组件另行定义同名尺寸含义。

组件属性中同时提供 `size` 与高度、字体大小、圆角、padding 等外观属性时，一旦设置了 `size`，这些属性必须自动失效，由 `size` 统一接管对应样式；`size` 不影响宽度和字体族，避免同一组件出现多套尺寸来源互相覆盖。

| 尺寸 | 高度 | 字体 | padding | 圆角 |
| --- | --- | --- | --- | --- |
| `sm` | `22px` | `10px` | `0 4px` | `4px` |
| `md` | `30px` | `12px` | `0 8px` | `6px` |
| `lg` | `38px` | `14px` | `0 10px` | `8px` |

### 尺寸特例

以下组件已被业务确认需要保留特殊尺寸规则，修改相关组件时必须优先遵守：

- `XTabs`：`size` 只接管内部高度变量、字号、图标尺寸等，不接管标签外层框高度、标签内边距和默认最小宽度；`sm`、`md`、`lg` 三档 `.x-tabs__item-frame` 高度都固定为 `30px`，标签内边距都固定使用 md 规格 `0 8px`，默认最小宽度都固定使用 md 规格 `140px`。业务若需要特殊宽度，应通过 `tabMinWidth` 显式覆盖。
- `XSwitch`：`size` 接管字号，但轨道视觉宽高按统一尺寸高度的 `80%` 渲染，即 `sm` 为 `17.6px` 高、`md` 为 `24px` 高、`lg` 为 `30.4px` 高；轨道宽度保持高度的 2 倍，因此宽度也同步缩小 20%。`size` 不接管圆角，开关轨道必须始终保持左右半圆的胶囊边线，默认使用 `999px` 圆角，不随 `sm`、`md`、`lg` 变化为 `4px`、`6px`、`8px`。
- `XDialog`：`size` 只接管弹窗字号和关闭按钮尺寸，不接管弹窗圆角，也不接管头部、正文、底部 padding；弹窗空间节奏必须使用稳定默认值或 `--x-dialog-header-padding`、`--x-dialog-body-padding`、`--x-dialog-footer-padding` 覆盖，圆角使用稳定默认值或 `--x-dialog-radius` 覆盖，避免表单弹窗因 `sm/md/lg` 变得拥挤。
- `XDrawer`、`XMessage`、`XMessageBox`、`XTooltip`、`XCard`：`size` 不接管容器 padding 和 radius。`XDrawer` 的 `size` 只接管字号和关闭按钮尺寸；`XMessage` 的 `size` 只接管字号和最小高度；`XMessageBox` 的 `size` 只接管字号和按钮高度；`XTooltip`、`XCard` 的 `size` 只接管字号。容器留白与圆角必须使用稳定默认值、显式 props 或对应 CSS 变量覆盖。

> 中文备注：统一尺寸规则用于减少组件之间的视觉偏差；已列出的特例是业务确认结果，不能在常规重构中抹平。

## 浮层层级强制约定

所有跨容器显示、Teleport 到 `body`、使用 `position: fixed` 或承担遮罩/全局反馈职责的浮层，都必须接入统一层级规范，不允许在单个组件里随意写死 `z-index`。

- 统一层级数值维护在 `src/components/_utils/zIndex.ts` 的 `overlayZIndex`，全局 CSS 变量维护在 `src/styles/index.css` 的 `--x-z-index-*`。
- 默认层级顺序固定为：`drawer: 1800`、`dialog: 1900`、`popper/tooltip: 2000`、`loading: 2100`、`message: 2200`、`messageBox: 2300`。
- Select、Dropdown、Tooltip、右键菜单、折叠菜单、编辑器菜单等普通弹层统一使用 `overlayZIndex.popper` 或 `--x-z-index-popper`；这类弹层必须能覆盖 Dialog/Drawer 遮罩，避免弹窗内下拉框被遮罩盖住。
- Dialog、Drawer、Loading、Message、MessageBox 等反馈浮层的默认 `zIndex` 必须从 `overlayZIndex` 读取，并通过对应 CSS 变量作为样式兜底。
- 新增或修改浮层组件时，必须同步更新 Props 默认值、CSS 变量、story 控制项、中文文档和 Vitest 测试；测试至少覆盖默认层级和 CSS 变量 fallback。
- 除组件内部很小的局部堆叠（例如表格固定列、按钮内图标）外，不要使用 `9999`、`10000` 这类魔法层级。

> 中文备注：该规则用于防止弹窗、抽屉、下拉、消息提示之间互相遮挡；涉及浮层时必须同时看 props、CSS 变量、story、文档和测试。

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
pnpm api:naming:audit:check
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
