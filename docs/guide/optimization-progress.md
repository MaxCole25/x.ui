# 项目优化进度

## 基线与约束

2026-10-08 开始时 Git 工作区干净，根目录 AGENTS.md 为唯一仓库指令。已读取组件库技能、工作流及接口命名规范。遵循 happy path，不新增或修改测试用例，不提交、推送、发布或部署；生成产物和临时消费样例保持忽略状态。

## 已完成修改

| 项目 | 确认问题与最终方案 | 状态 |
| --- | --- | --- |
| 模态与子浮层 | 捕获阶段 Esc 抢先关闭模态框；改为冒泡阶段，尊重内部控件已处理事件。用 provide/inject 将子浮层关联到最近的模态框，共享工具处理焦点循环与恢复；非 Teleport 浮层不重复加入焦点顺序。 | 已完成 |
| Select | 键盘原本仅使用 displayOptions，插槽选项无法导航。统一当前可见选项的键盘、激活及滚动顺序；props 在前，插槽按实际 DOM 顺序在后；加载期间仍保留已选文本。注册按独立标识更新，支持禁用跳过、多选切换及清空。 | 已完成 |
| 可访问性 | 每个 Select/Option 使用 Vue useId，补齐 listbox、aria-controls、aria-activedescendant 和激活 class，避免多个实例标识冲突。 | 已完成 |
| 富文本保存 | 每个实例全局监听保存快捷键；改为实例容器内冒泡监听。只在 canSave=true、readonly=false 时处理；内层无重复快捷键监听。 | 已完成 |
| Story 值与默认 | 清空字符串保留显式空字符串；每个属性有独立“使用默认”。0、false、空数组和空对象与未覆盖状态区分；无效 JSON 保留上次有效值并提示。 | 已完成 |
| Story 颜色 | 未设置颜色明确标为使用组件默认；不显示伪造的白色 picker。文本框保留 CSS 字符串，六位十六进制值提供 picker，其它值通过“启用拾色”显式进入颜色选择。 | 已完成 |
| 插槽预览 | 使用公开 h / withDirectives 重建预览，保留原插槽参数及作用域样式标识；移除 shapeFlag、patchFlag、dynamicChildren 等内部字段写入。 | 已完成 |
| 验收场景 | Button、Dialog、Select、RichTextEditor 清理无效状态；原有外观接口加入纯插槽/混合导航、嵌套抽屉、Teleport 输入和双编辑器。保留四区、四列 180px、父元素尺寸与撑满控制。 | 已完成 |
| 检查与入口 | prepublishOnly 改为 pnpm check；现有 CI 已使用 pnpm check。该入口覆盖命名、清单、三类类型、已有测试和三类构建，无递归调用。根入口复用组件入口导出，490 项公开导出比较无增删，插件、服务和指令注册保留。 | 已完成 |
| 接口维护 | Props 审计明确实际范围，91 个 Props 接口、2032 次有效属性、666 个唯一名称，规则零命中不等同全部 API 合规。本次不改变既有事件、插槽或 expose；新增标识与归属工具属于内部实现。 | 已完成 |
| 历史别名 | XlTable 和 XlTable* 类型保留给已有消费方，新接口继续使用 XTable / Table*，禁止扩散旧别名。 | 按要求保留 |
| 格式检查 | 对齐 EditorConfig 的 UTF-8、LF、末尾换行及尾空格，覆盖源码、文档、脚本、已有测试、CI 和根配置；Markdown 尾空格、TS 字符串及 Vue 模板文本保留，使用 AST 定位避免误判。 | 已完成，历史格式未全绿 |

## 按需引入实测

使用临时最小 Vue 应用，直接通过包名 exports 消费 dist，无源码 alias。Vite 5 生产模式压缩；以下是所有生成 JS（含异步 chunk）的合计，包含 Vue 和所用组件运行时，单位为十进制 KB。gzip 使用 Node gzipSync；不包含 HTML，CSS 单列说明。图表最终样例调用 registerXChartAnalyticsModules 并渲染柱状图。

| 消费场景 | JS KB | gzip KB |
| --- | ---: | ---: |
| 根入口，仅 XButton | 65.6 | 26.1 |
| 根入口，XChart + 模块注册 | 2229.7 | 706.3 |
| 根入口，XRichTextEditor | 743.8 | 238.4 |
| button 子路径 | 65.6 | 26.1 |
| chart 子路径 + 模块注册 | 587.4 | 201.5 |
| rich-text-editor 子路径 | 743.8 | 238.4 |

初始单入口、仅导入 XButton 时，主 JS 为 1552.2 KB，另有 XLSX 异步 chunk 429.5 KB，全部 JS 合计 1981.7 KB（gzip 623.1 KB）。模块证据确认按钮消费带入了 ECharts 和无关重组件，因此增加 button、chart、rich-text-editor 三个独立构建和类型入口，保留 dist/x-ui.js、dist/index.d.ts、dist/style.css。

多入口后，仅 XButton 的根入口和子路径消费均只需按钮及公共尺寸/样式工具，没有 ECharts、编辑器或 XLSX。图表子路径只含图表组件与 ECharts；根入口连同图表注册函数仍会保留编辑器公共 chunk 和 XLSX，因此建议图表消费使用 chart 子路径。编辑器入口含 Tiptap/ProseMirror/lowlight 等编辑器代码，未带入图表或 XLSX。模块证据来自 Rollup 输出中的 dist chunk 及 ECharts 模块；编辑器依赖在库构建时已经合入公共 chunk，消费侧不会再显示独立 Tiptap 源模块。

所有场景显式导入原 style.css，消费 CSS 均为 6889976 字节（6889.98 KB，gzip 2253.13 KB），含全量组件样式与内嵌字体。保留该路径及统一样式策略，没有机械 external 全部依赖、扩大 peer dependencies 或进一步拆分 CSS；CSS/字体体积仍是后续独立优化项。

三个子路径均通过真实消费页面确认按钮、图表 canvas、编辑器以及样式可运行；根入口、子路径公开类型和既有 XlTable 类型通过临时消费 tsc 检查。

## 工程验证

已完整执行 pnpm check：

| 项目 | 结果 |
| --- | --- |
| 格式与语法 | 失败：未改动历史文件中 507 个含 CRLF/混合换行，10 个有尾空格。未发现本次文件的语法或编码问题。 |
| api:naming:audit:check | 通过，legacy/review 为 0；仅代表 Props 审计范围。 |
| api:inventory:check | 通过，88 个组件清单已同步。 |
| 三类类型检查 | 库、文档、Story 均通过。 |
| 已有测试 | 26 个文件、478 个测试通过；后续局部修改重跑相关已有测试，66 项、模态相关 37 项及最终 Select 相关 33 项通过。 |
| 组件库构建 | 通过，原入口、三个子路径及声明生成成功。 |
| docs:build | 通过，最终文档更新后构建确认。 |
| story:build | 通过，88 个 Story、88 个外观接口变体。后续相关修改重建通过。 |
| git diff --check | 通过，测试目录无修改。 |

历史格式问题不进行全仓格式化，按任务范围独立记录。仓库 core.autocrlf=true，现有 .gitattributes 已声明主要文本 eol=lf；抽查文件的 Git 索引为 LF，而当前工作区为混合换行。格式门禁按实际工作区内容报错，没有扩大忽略范围或降低标准。尾空格示例包括 ButtonGroup.story.vue、Layout.story.vue、Loading.story.vue、ColorPicker.story.vue、DatePickerPanel.story.vue；其它历史文件同类问题仍保留。

已有测试会输出 jsdom 未实现 Canvas getContext 的提示，测试仍全部通过；构建存在体积及 Histoire 内部依赖警告，退出状态成功。pnpm check 因格式项返回非零，不能称为全部通过。

## 浏览器验收

内置浏览器运行时连续失败后，使用本机已有 headless Chrome + Playwright 操作本地 Histoire/VitePress 与消费产物；临时操作脚本没有加入测试目录或发布内容。

- 通过：弹窗内第一次 Esc 关闭 Select，第二次关闭弹窗；closeOnEsc=false 下内部下拉仍能关闭。
- 通过：嵌套抽屉只关闭最上层，焦点恢复到打开按钮；关闭一层保留 hidden 滚动锁，最后一层关闭恢复原 overflow。
- 通过：Teleport 到 body 的输入获得焦点后下拉保持显示，Tab 从浮层末端回到所属弹窗的关闭按钮。
- 通过：加载期间已选文本保持显示；文档页 14 个 Select 的 listbox 标识互不冲突，aria-controls 均关联有效。
- 通过：纯 XOption 方向键、禁用跳过、Enter；混合顺序与激活一致；多选 Enter 切换、清空。
- 通过：两个编辑器依次按 Ctrl+S，每次只增加一次 save-doc；工具栏按钮可保存；其它控件焦点不保存且不阻止默认；readonly/canSave=false 不保存。Windows 上验收 Ctrl 分支，Cmd 分支共用同一处理逻辑。
- 通过：Story 空占位字符串、属性默认恢复、场景恢复、CSS 变量颜色不改写、未覆盖颜色无伪造 picker。
- 通过：动态插槽文本替换、关闭、重开及恢复；表格作用域插槽获得实际 row 参数，动态 editor-category 替换实际渲染。
- 通过：Select scoped Story 宽度保持 360px；VitePress 按钮、Select、弹窗示例按钮、编辑器均渲染真实组件，无未解析标签。
- 通过：消费产物三个子路径可导入、样式可用、图表实际生成 canvas，类型检查成功。

## 保留项与交付范围

本轮必需实现与行为验收已完成。未改动历史文件的格式问题和全量 CSS/字体体积按约束保留；全量 pnpm check 尚未全绿。没有新增测试、删除测试或改断言，也没有创建新聊天或使用子代理。优化实施阶段未提交、推送、发布或部署；2026-10-09 根据用户后续明确授权，将本轮修改提交并同步到 main，不涉及发布或部署。

## main 同步说明（2026-10-09）

本次提交汇总全部优化代码和中文文档：

- 修复弹窗和抽屉的 Esc 顺序、最上层关闭、焦点恢复、滚动锁及 Teleport 子浮层归属。
- 修复 Select 纯插槽与混合选项的键盘导航、禁用跳过、多选切换、激活标识、滚动定位和加载期间选中文本。
- 隔离富文本编辑器保存快捷键，保留只读、保存开关与按钮行为。
- 修复 Story 空字符串、默认恢复、颜色覆盖和动态/作用域插槽预览，完善人工验收场景。
- 收敛根入口导出，发布前复用完整检查，说明 Props 审计范围，完善格式门禁。
- 增加 button、chart、rich-text-editor 子路径及类型，记录消费构建体积和验证结果。

验证沿用上文结果：已有测试、类型、API 审计与清单、三类构建和浏览器验收通过；全量 pnpm check 因未改动历史文件的换行与尾空格问题返回非零。保留现有别名、全量样式路径与历史格式问题，不包含生成目录、临时样例或新增测试。
