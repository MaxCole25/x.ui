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

## VitePress 文档示例渲染规则

在 `docs/` 中实现类似 Element Plus 的“真实组件预览 + 源码展示”时，必须注意以下规则：

- VitePress 1.x 自定义主题入口必须放在 `docs/.vitepress/theme/index.ts`，不要放在 `docs/.vitepress/theme.ts`。后者不会被 VitePress 作为主题入口读取，导致 `enhanceApp` 中注册的组件不生效，Markdown 中的 `<XButton>` 只会表现为未解析标签或普通文字。
- 文档主题中不要直接 `app.use(XUi)` 或从 `src/index.ts` 整包注册组件库。整包入口会拉入所有组件及第三方依赖，VitePress SSR 阶段可能因为外部依赖 CSS（例如 `vue-grid-layout-v3/dist/index.css`）报 `Unknown file extension ".css"`。
- 文档站需要展示组件示例时，优先按需从组件目录导入并注册当前文档需要的组件，例如 `src/components/basic-components/button`、`src/components/basic-components/icon`；全局样式可在主题入口单独导入 `src/styles/index.css`。
- 新增文档 Demo 容器时，优先放在 `docs/.vitepress/components/`，并在 `docs/.vitepress/theme/index.ts` 中注册，Markdown 页面中再直接使用。
- 文档示例必须支持源码显示/隐藏，默认隐藏源码，避免代码过多导致页面过长；除非用户明确要求展示教学源码，不要默认展开源码。
- 文档示例的预览区应优先展示真实组件运行效果，源码只作为辅助信息放在折叠区域；不要再用“预览一份、代码块一份”的长页面写法。
- 按钮类组件示例不要默认铺满整行。`XButton` 默认宽度为 `120px`；只有展示块级操作、表单底部主按钮或明确说明撑满父容器时，才显式传入 `width="100%"`。
- 仅运行 `pnpm docs:build` 只能证明构建通过，不能完全证明页面中组件已真实渲染。新增或调整文档示例后，必须启动 `pnpm dev` 或 `pnpm exec vitepress dev docs`，用浏览器或 Headless Chrome 截图确认示例区域出现真实组件样式，而不是只出现源码文本或未解析标签。

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

## Histoire 外观接口规范

组件 story 中的交互菜单只保留一个 `外观接口` 变体。每个组件都必须把调试入口收敛到该变体中，避免同时出现“基础用法”“状态与边界”“交互调试”等其它 Variant。

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

### 尺寸特例

以下组件已被业务确认需要保留特殊尺寸规则，修改相关组件时必须优先遵守：

- `XTabs`：`size` 只接管内部高度变量、字号、图标尺寸等，不接管标签外层框高度、标签内边距和默认最小宽度；`sm`、`md`、`lg` 三档 `.x-tabs__item-frame` 高度都固定为 `30px`，标签内边距都固定使用 md 规格 `0 8px`，默认最小宽度都固定使用 md 规格 `140px`。业务若需要特殊宽度，应通过 `tabMinWidth` 显式覆盖。
- `XSwitch`：`size` 接管字号，但轨道视觉宽高按统一尺寸高度的 `80%` 渲染，即 `sm` 为 `17.6px` 高、`md` 为 `24px` 高、`lg` 为 `30.4px` 高；轨道宽度保持高度的 2 倍，因此宽度也同步缩小 20%。`size` 不接管圆角，开关轨道必须始终保持左右半圆的胶囊边线，默认使用 `999px` 圆角，不随 `sm`、`md`、`lg` 变化为 `4px`、`6px`、`8px`。
- `XDialog`：`size` 只接管弹窗字号和关闭按钮尺寸，不接管弹窗圆角，也不接管头部、正文、底部 padding；弹窗空间节奏必须使用稳定默认值或 `--x-dialog-header-padding`、`--x-dialog-body-padding`、`--x-dialog-footer-padding` 覆盖，圆角使用稳定默认值或 `--x-dialog-radius` 覆盖，避免表单弹窗因 `sm/md/lg` 变得拥挤。
- `XDrawer`、`XMessage`、`XMessageBox`、`XTooltip`、`XCard`：`size` 不接管容器 padding 和 radius。`XDrawer` 的 `size` 只接管字号和关闭按钮尺寸；`XMessage` 的 `size` 只接管字号和最小高度；`XMessageBox` 的 `size` 只接管字号和按钮高度；`XTooltip`、`XCard` 的 `size` 只接管字号。容器留白与圆角必须使用稳定默认值、显式 props 或对应 CSS 变量覆盖。

## 浮层层级强制约定

所有跨容器显示、Teleport 到 `body`、使用 `position: fixed` 或承担遮罩/全局反馈职责的浮层，都必须接入统一层级规范，不允许在单个组件里随意写死 `z-index`。

- 统一层级数值维护在 `src/components/_utils/zIndex.ts` 的 `overlayZIndex`，全局 CSS 变量维护在 `src/styles/index.css` 的 `--x-z-index-*`。
- 默认层级顺序固定为：`drawer: 1800`、`dialog: 1900`、`popper/tooltip: 2000`、`loading: 2100`、`message: 2200`、`messageBox: 2300`。
- Select、Dropdown、Tooltip、右键菜单、折叠菜单、编辑器菜单等普通弹层统一使用 `overlayZIndex.popper` 或 `--x-z-index-popper`；这类弹层必须能覆盖 Dialog/Drawer 遮罩，避免弹窗内下拉框被遮罩盖住。
- Dialog、Drawer、Loading、Message、MessageBox 等反馈浮层的默认 `zIndex` 必须从 `overlayZIndex` 读取，并通过对应 CSS 变量作为样式兜底。
- 新增或修改浮层组件时，必须同步更新 Props 默认值、CSS 变量、story 控制项、中文文档和 Vitest 测试；测试至少覆盖默认层级和 CSS 变量 fallback。
- 除组件内部很小的局部堆叠（例如表格固定列、按钮内图标）外，不要使用 `9999`、`10000` 这类魔法层级。

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
pnpm api:naming:audit:check
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
