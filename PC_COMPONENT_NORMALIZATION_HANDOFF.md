# PC 组件库规范化：阶段交接记录

更新时间：2026-10-08。项目：`D:\UGit\x-ui`。

**状态：2026-10-08 阶段修复推进至第二十八批；整体规范化尚未完成。最新全量测试467通过、11失败，完整浏览器与最终产物消费未完成，不能视为可发布状态。**

上一轮因额度不足暂停；本轮已按实际源码与差异核实并接手。未执行提交、推送、发布、安装依赖或启动子代理。

## 2026-10-08 第二十八批实际进展：Form 继承与可操作 Story

- Form移除无样式作用的x-form--数字字号类；shared-7.css移除small/default/large未使用标签规则，保留固定32px控制高度/14px字号兜底和原级联顺序。公开接口、事件和context继承未改。
- Form Story模型/必填规则/fontSize/disabled进入initialProps，姓名prop=input、技术栈prop=select并与公共模型绑定；移除独立sample及大量无关字段/旧样式。validate、validateField、resetFields、clearValidate、scrollToField有真实字段场景，恢复默认重建模型。docs同步继承及方法验收。
- 两项既有场景迁为数字fontSize10/18，检查实际继承并保留disabled、标签width/布局及for/id关联。顶部标签旧CSS选择器不匹配当前left/right排除条件，更新查询后仍检查min-height0；没有删除/降低断言。原11/33用例81/149expect数量不变，.tmp-batch28-review.json。修改前 .tmp-batch28-before.json。
- 首轮Story模板内联对象类型的v-model报TS1005，已改脚本命名SceneModel并按InputProps/SelectProps公开绑定类型定义字段；复跑Story类型/构建通过。首轮全量466通过12失败中的Form仍失败是旧CSS选择器查询，已修正并复跑全量。
- 最终lint、API、命名、库/docs/Story类型、三套构建通过；全量478项467通过11失败，无未处理错误，按两项用例重命名映射核对新增失败0、减少2。最终 .tmp-batch28-effective-validation.json / .tmp-batch28-final-validation.json / .tmp-batch28-final-tests.json / .tmp-batch28-final-failure-comparison.json，初次 .tmp-batch28-validation.json；日志 .tmp-batch28[-final]-<name>.log。
- 浏览器完整Form方法、JSON模型编辑、插槽替换与恢复默认仍未验收；最近第二十七批browser sandbox失败，未重复同一无新价值尝试。构建warning和最终打包消费待处理；整体目标未完成。
- 剩余11失败为Layout两项、ScrollingText一项、Table六项、主题两项。已核对下一批Layout源码/docs一致：topbar/content/footer背景白、sidebar #263d6f，topbarTextColor/contentTextColor当前名称；边框属性名为partBorderColor但值包含完整CSS border字符串，需要核对命名/说明与Story实际效果，不凭Color后缀猜控件。然后继续其它公开Props/docs/Story、浮层焦点/Esc、复杂组件合理拆分与最终消费。

## 2026-10-08 第二十七批实际进展：Avatar 图片源重试

- Avatar src变化时复位failed，旧图片加载失败后换为新地址可以重新进入img加载分支。只增加src watcher/import，公开接口、声明默认值、事件和原回退顺序未改；.tmp-batch27-review.json 确认其它源码不变。没有新增测试或依赖。
- docs和Story补无效图片地址→有效地址、清空src、alt/name和恢复默认验收提示，修改前 .tmp-batch27-before.json。
- lint、API、命名、库/docs/Story类型及三套构建通过；全量478项仍465通过13失败，无未处理错误，失败名单新增/减少均0。汇总 .tmp-batch27-validation.json、报告 .tmp-batch27-tests.json、比较 .tmp-batch27-failure-comparison.json，日志 .tmp-batch27-<name>.log。
- 本批现有用例没有覆盖图片重试；浏览器尝试getState再次node_repl kernel exited unexpectedly，diagnostics为Windows sandbox helper_unknown_error/setup refresh had errors，未能操作UI。重试、切图、回退的实际浏览器流程仍未验收，不能用检查/构建通过代替。构建warning保留，最终打包消费仍待重验。
- 本批源码/docs/Story修改完成相关静态、既有测试与构建验证，没有未运行检查的代码修改；整体目标未完成。
- 下一批Form已有证据：当前fontSize数字，经context给Input/Select/FormItem；旧用例仍传size=sm/lg并断言档位类、12px字号fallback和30px高度fallback，而实际CSS已为14px/32px。Form根仍生成x-form--数字字号；shared-7.css保留small/default/large的未使用档位标签规则。应按实际继承与独立布局修正既有场景及清理无效规则，同步docs/Story后验证。之后Layout、Table/主题、ScrollingText既有失败、全部公开接口交互、浮层焦点/Esc、复杂组件拆分及最终消费继续完成。

## 2026-10-08 第二十六批实际进展：Avatar 实际尺寸与 Story

- 发现真实一致性缺陷：默认头像CSS30px，而默认图标和iconFull按32px计算。Avatar将resolvedAvatarSize映射到实际宽高变量，CSS兜底32px；字号兜底接全局body变量14px。删除未使用usesExplicitSize，字体仍不改变头像宽高。未改公开类型/属性声明默认值/事件。
- Avatar Story所有原外观字段进入initialProps，补avatarSize32场景初值；此前未绑定的iconVariant/iconFull/iconColor/fontSize/avatarBackgroundColor现由公共面板传入，恢复默认重建实例，清理无用私有reactive和旧样式。docs补实际宽高、数字/字符串长度及图标56%/撑满说明。
- 既有两项头像场景迁为默认图标18px、显式avatarSize38+iconFull图标38px，原75用例305expect不变，.tmp-batch26-review.json；没有新增/删除测试。修改前 .tmp-batch26-before.json。
- 正式API/文档/命名刷新完成；.tmp-batch26-generation-review.json 证明契约除说明外不变，刷新未改其它文档，人工章节保留。
- lint、API、命名、库/docs/Story类型与三套构建通过；全量478项465通过13失败，无未处理错误，新增失败0、减少2。汇总 .tmp-batch26-validation.json、报告 .tmp-batch26-tests.json、比较 .tmp-batch26-failure-comparison.json，日志 .tmp-batch26-<name>.log。Story仍87stories/87variants，构建warning保留。
- 现有用例没有测量浏览器实际像素；独立尺寸、图标撑满、Story颜色及恢复默认仍待浏览器实测。最终打包消费未重验；整体未完成。
- 下一批明确源码线索：Avatar failed仅被img error置true，切换props.src未复位，旧错误后新图片不会进入img分支，需要修复并同步验收。Form继承仍用旧size=sm；Form源码还生成数字字号类x-form--14，需核对与旧CSS档位规则的实际关系。剩余13失败及其它公开Props/docs/Story、模态焦点/Esc、复杂组件拆分和最终消费继续处理，不扩大本批未验证范围。

## 2026-10-08 第二十五批实际进展：元素控件字号既有规格

- 仅迁移 elements.test.ts 六项既有场景：Text不再有md类；Select/Cascader使用fontSize10、高度32且没有sm类；Autocomplete显式字号30与高度99独立，选项padding0 8px；日期/日期时间输入验证数字字号18传入BaseInput。
- 保留原只读、状态、原生type/name/id、清空、前后缀、日期值规范化和事件断言；75用例305 expect数量不变，.tmp-batch25-review.json 逐项记录，修改前 .tmp-batch25-before.json。未新增/删除用例、恢复接口或改生产源码。
- lint通过；全量478项：463通过15失败，无未处理错误；新增失败0、减少6。报告 .tmp-batch25-tests.json、比较 .tmp-batch25-failure-comparison.json、汇总 .tmp-batch25-validation.json。
- 生产/docs/Story未改，不重复类型/构建；最近三套类型及docs/Story构建第二十四批通过，库构建第二十三批通过。原104失败中89已通过，分类数量按逐项审计生成。
- 剩余15失败为Avatar两项、Form继承两项、Layout两项、ScrollingText一项、Table六项、主题两项。下一批已读线索：Avatar独立avatarSize，默认32对应图标round(32*0.56)=18，iconFull随实际头像尺寸；Layout当前topbarTextColor/contentTextColor而旧用例仍用topbarColor/contentColor。Avatar文档avatarSize说明仍泛泛，需要同步完善实际尺寸含义并核对Story。未修改这些待办。
- 整体目标未完成：剩余失败、公开属性/完整docs与Story交互、浮层焦点/Esc、合理拆分及最终产物消费继续处理，浏览器仍受环境限制，未把构建/页面首屏当全部交互通过。

## 2026-10-08 第二十四批实际进展：DataTableSettings Story 独立场景

- 新增 _story/createDataTableSettingsScene.ts，将原示例 tables/columns/settings/dataSources 原样移入每次创建的场景。适配器读写返回/保存数据副本；保存仅影响当前闭包。场景返回 adapter 与 saveButtonText，Story 通过 createInitialProps 接入公共属性、恢复默认和重挂载。
- 清理旧 computed/ref、无入口加载延时/失败开关、未显示的 lastEvent 及未使用控制区样式；五类公开事件保留公共 apiEvents 日志。Story仍单一外观接口，公开组件和示例数据不变。docs同步内存保存、切换和恢复默认验收。差异 .tmp-batch24-review.json，修改前 .tmp-batch24-before.json。
- 适配器诊断读取实际返回值：保存后修改调用方数组或读取副本，保存值仍为“本场景保存”；其它场景及重建后仍为“合同编号”，旧适配器后续保存不影响重建数据，适配器实例不同。记录 .tmp-batch24-scene-diagnostic.json。不是浏览器交互验证、没有新增测试用例。
- 初次 Story 类型失败：Props 接口缺少 Record 索引签名，通用 apiProps 无法推断必填 adapter。已用推断对象+satisfies Props 校验，并显式绑定来自同一 apiProps 的 adapter 类型；没有放宽公共接口。修复后 lint、Story类型和Story构建复跑通过（87 stories/87 variants）。
- 最终有效八项：lint、API、命名、库/docs/Story类型、docs/Story构建全部通过；汇总 .tmp-batch24-effective-validation.json。初次记录 .tmp-batch24-validation.json，修复后 .tmp-batch24-final-validation.json / .tmp-batch24-final-<name>.log。生产组件和测试未改，库构建/全量测试沿用第二十三批：457通过21失败，无未处理错误；未重复无关检查。
- 浏览器仍未恢复，Story完整保存、切表、恢复默认、事件和方法 UI尚未实测；构建warning保留，不宣称交互全部通过。下一批继续剩余21失败（Autocomplete等旧字号前提），其它Story实际场景/公开接口、复杂组件拆分、浮层焦点/Esc和最终消费仍待完成。整体目标未完成，本批没有未做相关静态/构建验证的修改。

## 2026-10-08 第二十三批实际进展：DataTableSettings 颜色实际效果

- 发现并修复真实实现缺陷：顶部数据表和五类行内 Select 使用未声明 dropdown-background-color，颜色没有传入当前 Select 的 popperBackgroundColor。六处改用 popper-background-color，DataTableSettings 自身公开属性、回退链和其它源码保持不变。
- 既有颜色用例将内部 Select 断言键迁为当前名称，原8用例30 expect不变；.tmp-batch23-review.json 确认六处绑定之外源码不变。docs 补面板颜色及回退链验收，Story 原外观接口加操作提示。
- lint、API、命名审计、库/docs/Story 类型与三套构建通过；全量478项：457通过、21失败，无未处理错误，新增失败0、减少1。报告 .tmp-batch23-tests.json、比较 .tmp-batch23-failure-comparison.json、汇总 .tmp-batch23-validation.json，修改前 .tmp-batch23-before.json。
- 现有用例只验证顶部Select属性传递，六处面板视觉及回退链实际交互尚需浏览器验收，不能据构建标为通过。浏览器仍受第二十一批 sandbox错误限制，本批未重复无新诊断价值的尝试；构建setup导出、eval和体积warning仍记录在日志。
- 下一批已定位 DataTableSettings Story：settingsByTable为可变共享保存数据，adapter和saveButtonText在initialProps外；loadingDelay/failLoading/failSaving各仅声明及读取没有控件入口，lastEvent有回调赋值但未显示。证据 .tmp-batch23-next-story-audit.json。应改成createInitialProps场景工厂并清理无效私有状态，保留公共事件日志和公开接口。
- 原104项中83已通过、14待定位；剩余21失败、全部Props/docs/Story交互、浮层焦点/Esc、复杂组件拆分和最终产物消费仍需完成。本批所有修改已完成相关验证，整体目标未完成。

## 2026-10-08 第二十二批实际进展：表单字号与独立布局既有规格

- form-controls 既有三项场景移除旧 size，按真实源码/AGENTS 断言 Text 显式fontSize=30、height=60、padding=20、radius=20；InputNumber 字号24/高度32/圆角12；Switch buttonSize=12、字号30、胶囊圆角；RadioButton 字号30/height=60优先buttonSize52/圆角20，字号不注入内边距覆盖。
- Switch 既有CSS场景检查默认24px、轨道高度变量、拇指减4px和宽高比2:1，保留颜色断言。没有恢复 sm/lg 类、改生产实现、新增或删除用例。原33用例149 expect 数量不变，.tmp-batch22-review.json 逐项审阅。
- lint通过；全量478项：456通过、22失败，无未处理错误；新增失败0、减少3。报告 .tmp-batch22-tests.json、比较 .tmp-batch22-failure-comparison.json、汇总 .tmp-batch22-validation.json，修改前 .tmp-batch22-before.json。
- 本批仅改既有测试及记录，源码类型与三套构建沿用第二十一批通过；不重复无源码改动构建。原104失败中82已通过、15仍待定位。
- 已核实待清理线索：Switch style.css 前段默认20px被后段24px覆盖，当前有效值符合规范；没有自行重排级联。下一批 DataTableSettings/Autocomplete 旧属性/字号场景继续定位，之后公开属性/文档/Story交互、复杂组件合理拆分、浮层焦点/Esc及最终消费仍需完成。浏览器受环境错误限制，未标交互通过。

## 2026-10-08 第二十一批实际进展：选择器定位监听生命周期

- Select / Autocomplete / Cascader 的打开、teleported、teleportTo 变化合并为定位监听 watch；onCleanup 使等待中的回调失效并移除监听。nextTick 后复查活动状态、打开状态、Teleport 与实际节点，再计算定位并注册监听。配置变化清空旧坐标；Cascader 现同时跟踪 teleported 变化。
- 保留 Select 关闭时 activeOptionIndex=-1。定位计算、公开事件和其它异步/远程逻辑未改；.tmp-batch21-review.json 对修改前快照证明 watch 外源码不变，API 清单检查通过。
- 三份 docs 补快速切换、滚动/缩放、卸载清理及恢复默认验收项，三份 Story 在原单一外观接口加提示；没有新增接口或测试用例。修改前 .tmp-batch21-before.json。
- lint、API、命名审计、库/docs/Story 类型、库/docs/Story 构建全部通过；现有全量 478 项仍 453 通过、25 失败，无未处理错误，失败名单新增/减少均 0。汇总 .tmp-batch21-validation.json、比较 .tmp-batch21-failure-comparison.json、报告 .tmp-batch21-tests.json，日志 .tmp-batch21-<name>.log。
- 库产物 style.css 6,877.78kB、x-ui.js 1,785.25kB；docs 大块 warning 和 Histoire setupVue3/setupVanilla 虚拟导出 warning 仍存在，未忽略。最新打包消费仍待重验。
- 浏览器工具本批再次 node_repl kernel exited unexpectedly，diagnostics 为 windows sandbox helper_unknown_error/setup refresh had errors，未能操作 UI；快速切换竞态和其它实际交互仍待浏览器确认，现有测试不覆盖本次竞态，不以检查通过宣称全部交互通过。
- 本批源码/文档/Story 修改已完成相关静态、测试和构建验证。整体目标仍未完成：25 项既有失败、所有 Props/示例/Story 能力验收、模态浮层焦点/Esc、复杂组件合理拆分和最终消费验证继续处理。已审阅 useModal，混合模态内 Teleport 浮层 Tab 导航需浏览器核实，不据静态阅读标记通过。

## 2026-10-08 第二十批实际进展：Tree / Tabs 当前接口

- Tree 旧 mutedColor 迁为当前 mutedTextColor，颜色变量和参数断言不变。旧 lg 场景改为 fontSize=18，检查字号 18px、图标 20px、固定行高 36px 和没有旧 lg 类。
- Tabs 默认字号断言按 AGENTS/源码改为 14px；原 lg/sm 场景改为数字 18/10，检查实际标签字号及固定 30px 高度、140px 最小宽度、8px 水平内边距。
- 两文件 17/26 个用例与 64/85 个 expect 调用数量保持不变；.tmp-batch20-review.json 记录逐项迁移。没有新增/删除用例、恢复旧接口或修改生产组件。
- lint 通过；全量 478 项：453 通过、25 失败，无未处理错误；新增失败 0、减少 4。报告 .tmp-batch20-tests.json、比较 .tmp-batch20-failure-comparison.json、汇总 .tmp-batch20-validation.json，修改前 .tmp-batch20-before.json。
- 本批没有生产/docs/Story 修改，不重复类型或构建；最近类型/docs/Story 构建第十八批通过、库构建第十二批通过。审计原 104 项中 79 已通过、17 待定位。
- 已审阅下一批源码：Select / Autocomplete / Cascader 打开回调等待 nextTick 后注册定位监听，没有失效回调取消；teleported/teleportTo 的等待回调同样需要核对卸载取消。下一批先修复并同步文档/Story 验收，完成相关验证后再处理剩余测试、Props、交互、复杂组件拆分和最终产物消费。浏览器仍待恢复，整体目标未完成。

## 2026-10-08 第十九批实际进展：Brick 与富文本既有场景

- BrickItem 旧 size 迁为 itemSize，主轴尺寸、width、height 三项断言保留；Brick 文字颜色断言按实际 --x-brick-text 更新，CSS color 使用该变量并由子项继承。
- 富文本既有颜色输入场景按当前两个 color-menu 更新选择器，点击文字/高亮按钮后分别检查输入；保留三项断言。颜色实际应用、浏览器焦点等未因此标记通过。
- 两文件原 23/15 个用例与 70/39 个 expect 调用数量保持不变；.tmp-batch19-review.json 列出两处断言选择器/变量名差异；未新增/删除用例、恢复旧接口或修改生产组件。
- lint 通过；全量 478 项：449 通过、29 失败，无未处理错误；新增失败 0、减少 3。报告 .tmp-batch19-tests.json、比较 .tmp-batch19-failure-comparison.json、汇总 .tmp-batch19-validation.json，修改前 .tmp-batch19-before.json。
- 本批只改既有测试及审计/交接记录，不重复源码类型或构建。最近类型/docs/Story 构建为第十八批通过，库构建第十二批通过；最终消费和完整浏览器验收仍未完成。
- 失败审计原 104 项中 75 已通过、21 待定位；下一步继续 Tree/布局/字号/主题等真实接口与剩余失败定位，再完成 Props、docs、Story、浮层、拆分及最终产物验收。没有未运行验证的本批测试修改，整体目标尚未完成。

## 2026-10-08 第十八批实际进展：API 说明作用域

- 新增 scripts/component-api-docs.mjs，以组件、接口种类和名称读取说明；API 提取与文档刷新共用，避免父子组件同名属性或插槽说明串用。保留已有人工 Props 表说明。
- 对照 BrickItem、FlowItem、GridItem 的自身样式映射及 FormItem 的禁用/加载/规则实现，修正对应说明；生成差异仅 Brick、Flow、Form、Grid 四页。87 个组件的契约（类型、默认值、单位、事件和方法）未变，API 之外人工章节未变，二次刷新无差异。证据 .tmp-batch18-review.json。
- lint、API 清单、命名审计、库/docs/Story 类型、docs/Story 构建八项通过；.tmp-batch18-validation.json。生产组件和测试未修改，未重复库构建或全量测试；最后全量仍第十七批 446 通过、32 失败、无未处理错误。
- 浏览器交互与最终产物消费仍待验证；未将整体目标标记完成。

## 2026-10-08 第十七批实际进展：字号旧规格迁移

- 依据 AGENTS、docs/guide/typography.md 和固定布局 metrics，迁移 Button 默认字号/高度、Dialog、Message/MessageBox、Card/Tooltip/Drawer 五项既有字号场景。fontSize 使用数字，控件高度 32px 不随字号改变，原 padding/radius 独立断言保留；Button 默认明确没有旧 md 档位。
- 保留四文件用例数/expect 调用数，仅改已核实的旧 props、名称与相关数值；详细迁移对照 .tmp-batch17-review.json。未新增/删除用例、恢复旧接口或修改生产实现。
- lint 通过；全量 478 项：446 通过、32 失败，无未处理错误；新增失败 0、减少 5。报告 .tmp-batch17-tests.json，比较 .tmp-batch17-failure-comparison.json，汇总 .tmp-batch17-validation.json，日志 .tmp-batch17-<name>.log，修改前 .tmp-batch17-before.json。
- 生产/docs/Story 未修改，无需重复构建；最后源码三套类型/构建仍为第十二批通过。审计原 104 项中 72 已通过，待定位 24 项。
- 已读源码线索：BrickItem.size 实际已迁为 itemSize（其它 minSize/maxSize 仍保留），Brick.textColor 用 --x-brick-text 且 CSS 继承；RichTextEditor 的颜色输入存在于点击后显示的 textColor/highlight 菜单中。下一批据当前交互修正这些既有场景，不恢复旧常驻结构。
- 继续其它字号/布局/主题、复杂组件、全部 Props/Story/docs、浮层焦点/Esc、最终消费与浏览器验收。整体目标未完成，无未做运行验证的本批测试修改。

## 2026-10-08 第十六批实际进展：既有属性名迁移

- 对照 Autocomplete/Select 的 types.ts、withDefaults 和 CSS 映射，将两份既有用例中的 7 个旧属性键迁为 popperMaxHeight/popperMaxWidth/popperBackgroundColor。CSS 变量名称不变，参数值不变，不恢复旧别名。
- 两文件 TypeScript AST 对比原用例名称和所有 expect 调用原文相同；.tmp-batch16-review.json。没有新增、删除用例或降低断言。
- lint 通过；全量 478 项：441 通过、37 失败，无未处理错误。新增失败 0、减少 4；.tmp-batch16-validation.json / .tmp-batch16-tests.json / .tmp-batch16-failure-comparison.json / .tmp-batch16-<name>.log；修改前 .tmp-batch16-before.json。
- 生产/docs/Story 未修改，不重复构建；最后源码三套类型与三套构建仍为第十二批通过。失败审计保留初始 104 项，其中 67 项已通过。
- 下一批按已确认 fontSize 数字 px、布局独立规则迁移 Button/Dialog/反馈组件旧字号场景，保留全部高度/圆角/内边距断言。继续定位其它 Props/主题/复杂组件与浏览器及产物验收。

## 2026-10-08 第十五批实际进展：查询场景前提

- FileDisk 原默认视图用例按源码/HEAD/docs 的 grid 更新名称与唯一视图选择器，仍检查默认行为；其余 8 项 tbody 操作场景显式 viewMode=list。既有双视图缩略图覆盖保留。
- 6 项 Cascader 原 wrapper 查询场景显式 teleported=false；原指定目标用例仍通过。两项 Dropdown wrapper 场景同样明确 teleported=false，保留 command 和 placement 断言。没有改默认 Teleport。
- .tmp-batch15-review.json 对 4 个文件核查用例数和 expect 调用数，除默认视图的命名/选择器外断言原文不变。不新增/删除用例，不降低行为或事件检查。
- 第一阶段全量 435 通过、43 失败；同类 Dropdown 前提补齐后最终 478 项：437 通过、41 失败，无未处理错误；新增失败 0、减少 17。lint 最终通过。生产/docs/Story 没有修改，不重复构建，最后源码类型与三套构建仍为第十二批通过。
- .tmp-batch15-final-validation.json / .tmp-batch15-final-<name>.log / .tmp-batch15-final-tests.json / .tmp-batch15-final-failure-comparison.json；修改前 .tmp-batch15-before.json。未提交/发布/安装依赖/派发代理。
- 失败审计保留最初 104 项，63 已通过、41 仍失败；待定位 30 项。下一批对照真实类型修正过期 popper 属性用例，再逐项处理字号/布局/主题规格和 RichTextEditor 颜色能力；仍需全部 Props/Story/docs、浮层焦点/Esc、合理拆分、消费与浏览器验收。

## 2026-10-08 第十四批实际进展：测试隔离

- Vitest setupFiles 使用已安装 Vue Test Utils 的 enableAutoUnmount(afterEach)，断言失败后也卸载组件。没有新增测试用例；日志未出现重复卸载错误/警告。
- Table 每项用例重新复制两条初始数据，避免先前 auto 添加/编辑污染后续输入。四项验证事件提交的行操作/只读 valueGetter 流程显式 editableDataStrategy=emit；其余场景保留默认 auto。生产组件未改。
- .tmp-batch14-review.json 核实 Table 原 89 个用例名称与 321 个 expect 调用原文未变，不删减/降低断言。docs/guide/testing.md 同步隔离机制，UTF-8。
- 最终 lint 通过、docs 构建通过；全量 478 项：420 通过、58 失败，无未处理错误。与第十三批新增失败 0、减少 27；原 Table undefined.map 错误已随用例隔离消失，没有给生产 data 加兜底。
- 同时原 Dialog/Drawer 颜色、MessageBox 确认、Select zIndex、Dropdown teleported/zIndex/内部点击以及 Table 20 项恢复通过。失败审计保留初始 104 项，46 项已修复、58 项仍失败，现有 32 项待定位。
- .tmp-batch14-validation.json / .tmp-batch14-<name>.log / .tmp-batch14-tests.json / .tmp-batch14-failure-comparison.json；修改前 .tmp-batch14-before.json。生产类型/库/Story 构建最后仍为第十二批通过，本批未重跑无修改检查。未安装依赖、提交、发布或派发代理。
- 下一批修正 9 项 FileDisk 既有列表用例显式 viewMode=list、6 项 Cascader 原局部查询场景显式 teleported=false，保留原行为断言与另有默认/指定目标覆盖；继续尺寸/命名/主题规格、真实 Props/浮层缺陷及最终消费和浏览器验收。整体目标尚未完成。

## 2026-10-08 第十三批实际进展：既有 CSS 读取修复

- 新增 tests/_utils/readCssSource.ts 作为读取辅助函数，按入口本地 import 展开 CSS，保留依赖 import 声明；本地导入缺失抛错，外部字体资源由消费验收核查。没有新增测试用例。
- 9 个既有测试文件的 root CSS 读取点统一使用 helper，Table.vue 源文件读取保持原样。TypeScript AST 比较各文件 it 名称和所有 expect 调用原文完全相同；.tmp-batch13-review.json。未删除失败用例、降低断言、改组件样式或恢复接口。
- 初次 8 文件全量 389 通过、89 失败；发现 Form 同类读取点后修正，最终全量 478 项：393 通过、85 失败、1 项 Table undefined.map 未处理错误。相比第十二批新增失败 0、原失败减少 19；完整名称 .tmp-batch13-final-failure-comparison.json。
- lint 最终通过。生产组件/docs/Story 没有修改，未重复相关类型或构建；最后生产类型/三套构建仍为第十二批通过。本批测试逻辑由全量运行验证。汇总 .tmp-batch13-validation.json；日志 .tmp-batch13-final-<name>.log；报告 .tmp-batch13-final-tests.json；修改前 .tmp-batch13-before.json。
- PC_COMPONENT_FAILURE_AUDIT.md 保留最初 104 项，其中 19 项标记已修复通过，其余 85 项仍失败，现有 36 项待定位。当前规格冲突和共享输入/DOM 污染未据此标记通过。外部字体和浏览器真实表现尚未验收。
- 下一步修正已证实的 Teleport 既有用例查询前提、对照当前规范调整过期的尺寸/命名断言且保留断言强度；定位剩余真实缺陷。继续浮层焦点/Esc、全部 Props/Story/docs、合理拆分和最新产物消费，目标未完成。

## 2026-10-08 第十二批实际进展：浮层清理

- useFloatingPosition 的异步 watch 注册 onCleanup，切换、关闭或停止时取消 pending nextTick 回调并断开 observer/滚动/resize 监听；等待结束后确认活动状态与触发/浮层节点，避免卸载后重注册及覆盖旧 observer。
- Popover 切为容器内显示时不再应用旧视口坐标；公共定位状态在重新配置时清空。没有改公开接口、事件签名或触发策略。
- Tooltip/Popover Story 的内容进入 initialProps；移除 Tooltip 未绑定配置和旧样式。Popover 显式导入 XButton（Histoire 未配置全局注册），避免未解析触发按钮。docs 补滚动/内容变化、teleported 切换和监听清理验收项。
- lint、API 清单、命名审计、库/docs/Story 类型及三套构建通过；全量 478 项仍为 374 通过、104 失败、1 项 Table 未处理错误；与第九批失败完整名称新增/减少均为 0。测试文件尚未修改。
- .tmp-batch12-validation.json / .tmp-batch12-<name>.log / .tmp-batch12-tests.json / .tmp-batch12-failure-comparison.json；修改前 .tmp-batch12-before.json。无新增测试、依赖、提交、发布或子代理。
- 浏览器尝试两次均 trusted Node process exited unexpectedly/kernel reset，未实际操作。竞态修复的浏览器卸载/快速切换、坐标翻转和恢复仍未验收；没有以静态检查替代。
- 另核实 6 项 Cascader 失败为 wrapper 查询默认 body Teleport 节点，审计待定位由 48 降为 42。已有指定目标用例通过；叶路径、远程选择等具体操作不能因此标为通过。
- 下一批修正已确认的 13 项 CSS 读取范围：只修改既有测试读取 helper，保留所有用例/断言，实际展开本地导入链，不恢复源码布局或旧接口；仍有 42 项待定位以及全部浏览器/产物目标。

## 2026-10-08 第十一批实际进展：失败定位

- 从 84 项待定位开始核查，新增 36 项具体归因证据，现剩 48 项待定位。只更新失败审计和交接记录，没有生产/Story/docs 源码或测试改动；不重复没有新诊断价值的全量检查和构建。
- Table 18 项既有用例独立进程运行：14 项通过（每次 1 通过、88 跳过），4 项仍失败。14 项均使用 describe 共享 data，之前 auto 添加/编辑原地更新输入，导致组合场景行数/内容不再为初始两行。4 项添加行断言在操作后 [...data, 新行] 重复计算已原地加入的新行；当前源码、HEAD 与文档都保留默认 auto，未为断言修改策略。
- CSS 13 项：逐条要求的文本均可在入口本地 import 链找到；原用例只读 index.css，查询范围未包含拆分规则。包括 BaseInput 焦点、Icon、Layout、NavMenu 子菜单、Tooltip/Drawer/层级/Divider、Tabs 与主题路由。外部 remixicon 资源另待消费验收；文本证据不代表浏览器级联已通过。
- 另 5 项当前规格断言冲突：Switch sm/lg 轨道档位已移除；亮色主题主色 #586085、Table header #d0d7e3、选区 #dff7ee 和控件 hover fallback #d6e6ff 等，与测试旧常量不同。完整本地导入链也没有旧常量，未归为导入遗漏或强行改现有主题。
- 证据 .tmp-batch11-table-isolated.json / .tmp-batch11-table-<line>.log/.json 和 .tmp-batch11-css-chain.json；PC_COMPONENT_FAILURE_AUDIT.md 同步全部 104 项状态与具体线索。测试文件差异仍为 0。
- 全量最后为第九批 478 项：374 通过、104 失败、1 项 Table 未处理错误；本批隔离通过没有替代该结果。源码静态/构建最后为第十批通过，浏览器初始化错误仍阻碍验收。整体目标未完成。
- 下一步定位剩余 48 项，重点 Cascader/Autocomplete Teleport 查询、旧字号/命名断言与当前行为；继续 Props/Story、浮层、docs 与最终消费，不遗漏真实缺陷。

## 2026-10-08 第十批实际进展

- FileDisk Story 使用新的私有 createFileDiskScene 工厂；每次初始化/恢复新建 adapter、目录存储和 ID 序列，路径、视图、标题和权限进入公共面板状态。取消独立 v-model 和私有权限控制，以及没有显示的 latestEvent/selectedCount 和旧样式。
- 公共 ApiPlayground 增加 createInitialProps 场景入口，initialValues 每次调用工厂再复制返回值；恢复沿用原有重新挂载、事件/插槽/方法输入与父容器重置流程。旧上传回调只持有旧目录存储，不会改新场景。
- 文件夹、图片、文件列表和适配器操作保留；工厂满足 FileDiskProps。下载仍为内存模拟，Story 与 docs 明确只核对 download 事件参数，不产生真实下载。docs/guide/testing.md 同步工厂恢复机制。
- lint、API 清单、命名审计、docs/Story 类型检查及构建 7 项全部通过。Story 87 页、87 变体；测试文件未改动。本批生产组件未变，未重复全量测试/库构建。最新全量仍为第九批 478 项：374 通过、104 失败、1 项 Table 未处理错误。
- 汇总 .tmp-batch10-validation.json，日志 .tmp-batch10-<name>.log，修改前 .tmp-batch10-before.json。UTF-8 重新读取正常。无新增测试/安装依赖/提交/发布/子代理。
- 本批没有未做类型或构建检查的实质修改。浏览器仍受第九批初始化错误阻碍，FileDisk 上传途中恢复、目录操作后恢复和公共事件日志尚未实际点击验收。
- 下一步继续失败审计中的 84 项，先核查当前样式导入链和 Table/表单行为；再推进其余 Story 场景、浮层、全部 docs 示例与最终产物消费。第一至十批是阶段进展，整体规范化仍未完成。

## 2026-10-08 第九批实际进展

- Table 增加 CSS 长度测量：挂载、可视区 resize、列配置、actionsWidth/fontSize/style 更新后，使用继承表格样式的临时探针读取 width/minWidth/actionsWidth 的像素值。百分比参照正文可视宽度；测量后立即移除探针，普通滚动只同步滚动状态。
- 列轨道、辅助列宽与冻结偏移、拖拽下限和自动适合宽度共用测量结果。保留最后未冻结列填充策略；没有改公开类型、恢复旧接口或给必填 data 加兜底。
- Table Story 两列使用 rem/calc() 最小宽度，docs 同步测量依据及 minWidth 约束。无新增测试、依赖、提交、发布或子代理。
- 最终 lint、API 清单、命名审计、库/docs/Story 类型检查及三套构建通过。已有全量 478 项：374 通过、104 失败、1 项未处理错误。与第八批完整失败名称比较新增/减少均为 0，错误仍为 Table.vue:142 的 undefined.map。测试文件未改动。
- 汇总 .tmp-batch9-validation.json，日志 .tmp-batch9-<name>.log，测试 .tmp-batch9-tests.json，比较 .tmp-batch9-failure-comparison.json，修改前 .tmp-batch9-before.json。末次探针盒模型隔离修改后 lint 另行通过，随后库/docs/Story 构建通过。
- 浏览器再次初始化失败：sandbox helper_unknown_error/setup refresh。CSS 长度视觉效果、窗口缩放后的偏移、拖拽下限仍未浏览器验收，不能据静态通过认定交互正确。最终产物也尚未再次打包消费。
- 下一批处理 FileDisk Story 每次恢复新建 adapter 与存储闭包，然后继续 84 项待定位、其余属性/Story、浮层、docs 和最终产物消费。整体目标尚未完成。

## 2026-10-08 第八批实际进展

本批处理 Table 内部列布局职责和 Story 受控状态，并继续失败定位。整体目标仍在进行中，没有提交/发布/安装依赖/新增测试。

### 实现与同步

- 将 ResolvedColumn、轨道分配、固定偏移、基础列宽和 px 解析移入已有 columnLayout.ts；Table.vue 保留响应式状态、DOM 测量、列设置操作和交互。新模块通过显式布局参数接收可视宽度、冻结相关辅助列与操作列信息，不读取组件私有 refs。
- .tmp-batch8-review.json 对搬移代码归一参数和上下文后比较，relocationEquivalent=true；API 元数据与修改前逐字相同，没有公开契约变化。保留最后未冻结列填充规则；本次没有修改列宽分配业务策略。
- Table Story 把四条初始数据、列定义、行/单元格选择、列设置和原先绑定的配置交给公共 initialProps。移除面板之外的分页切片和数据更新处理，组件 update 事件直接回写公共状态；恢复会重新克隆原始行和列。
- 保留分类/数值编辑插槽。操作列明确开启，查看使用原生 details 显示当前行，允许编辑按钮设置公共 editable；不再写入未展示的私有事件文本。
- Story 的 data/columns 通过显式绑定满足必填类型。公共面板清空必填属性时提示并保留上一有效预览值；没有给生产 Table.data 加 undefined 兜底。docs/guide/testing.md 同步规则。
- Table 文档补充当前填充策略，明确未冻结（fixed=none）与设置固定像素宽度是不同概念，拖拽使用另存基础列宽。

### 验证

- lint、API 清单、命名审计、build/docs/story 三套类型检查，以及库/docs/Story 构建通过；首次抽取漏标辅助参数类型、首次 Story 缺必填绑定的错误已修正并复验。
- Table 既有 89 项：63 通过、26 失败、1 项未处理错误。与第五批 Table 失败完整名称比较，新增/减少均为 0。
- 生产代码变更后运行已有全量测试：478 项，374 通过、104 失败，另有同一项 Table undefined.map 未处理错误（搬移后 Table.vue:138）。.tmp-batch8-failure-comparison.json 新增失败 0、减少失败 0。测试文件未改动，未降低断言或恢复旧 API。
- 最终列宽文字说明后重新构建 docs，通过。汇总 .tmp-batch8-validation.json；各项日志 .tmp-batch8-<name>.log；测试报告 .tmp-batch8-tests.json / .tmp-batch8-table-tests.json；修改前 .tmp-batch8-before.json / .tmp-batch8-panel-before.vue。
- 本批无未完成类型/构建验证的实质修改；浏览器无法初始化，Table Story 编辑、选择、列设置恢复、details 查看仍未真实浏览器验收。新的库产物尚未再次打包消费，最后消费验证仍为第五批。

### 失败定位与新增缺陷

- PC_COMPONENT_FAILURE_AUDIT.md 的两项列宽断言已定位为旧分配规则：当前源码与原有 HEAD 使用相同的最后未冻结列/全部冻结时最后列填充，测试期待只填 minWidth 列或平均分配。没有修改业务策略迎合断言。
- 现在 20 项有具体归因证据，84 项仍待定位；这不表示任一组合测试已经通过。
- 新发现真实限制：getColumnMinWidth 当前仅转换 px/纯数字；公开类型和文档允许的 rem、%、calc() 等会回退到 40px。该限制与上述两项断言不是同一原因，尚未修复。下一批应保持现填充策略，补齐 CSS 长度实际效果并验证。
- 下一步还包括 FileDisk adapter 私有场景恢复（单纯克隆回调无法重置闭包中的文件存储）、其余 Story/默认值、完整 CSS 导入链、浮层交互、docs 示例运行/复制和图标资源/消费警告。不得把环境限制或已通过构建作为最终验收。

## 2026-10-08 第七批实际进展

对应已确认目标的失败定位和单个 Story 场景/文档同步。没有生产组件改动或测试修改，整体目标仍在进行中。

### Story 与文档

- Autocomplete 的 modelValue/inputValue/options 和原有场景配置迁入公共 initialProps；两个独立 v-model 不再覆盖面板值。移除已过滤的父容器私有字段及未使用样式，初值 satisfies AutocompleteProps；提供按关键词匹配城市的 remoteMethod。
- Cascader 的 modelValue/options 与配置迁入 initialProps，提供省市远程回调。原场景 teleportTo 为空字符串，默认 teleported=true 时没有有效挂载目标，现改为源码默认的 body；radius 用等价数字 6，初值 satisfies CascaderProps。
- ScrollingText 使用 initialProps 管理方向、宽高、速度与字号；原先声明但没有绑定的布局初值现在实际进入预览与控件。移除未使用的旧控制样式。插槽文本保留并可通过公共插槽入口替换。
- docs/guide/testing.md 列出五个已接入 initialProps 的场景；ScrollingText 文档依据当前源码和 keyframes 明确单份文本从容器外进入/移出后循环，不承诺复制插槽形成无缝效果。
- lint、清单、命名审计、docs/story 类型、docs/Story 构建共 7 项全部通过。汇总 .tmp-batch7-validation.json；各项 .tmp-batch7-<name>.log；修改前快照 .tmp-batch7-before.json。生产源码未变，未重复库构建/全量测试。
- 本批无未做类型/构建检查的实质修改。浏览器仍无法初始化，三个场景真实点击、远程切换、初值恢复和滚动动画未浏览器验收。

### 失败定位证据

- 新增 PC_COMPONENT_FAILURE_AUDIT.md，为第五批的全部 104 个失败逐项列出位置、状态、证据及待查线索；潜在未声明 Props 只是线索，未自动当作归因。机器记录 .tmp-failure-audit.json。
- 目前 18 项有具体定位：旧查询前提 9、旧接口断言 3、旧行为断言 1、共享 DOM 污染 3、共享输入污染 2；86 项仍待定位，不能归为历史问题或标记通过。
- Drawer 关闭、MessageBox 服务确认、Select zIndex 在独立进程运行原有用例分别通过。前面的旧 size / 旧背景断言失败跳过 unmount，后续 document.body 的首个匹配节点属于遗留实例，导致关闭事件、确认 Promise、层级断言污染。
- Select 旧背景和最大宽度用例隔离仍失败：传入的 dropdownBackgroundColor / dropdownMaxWidth 已不在公开契约中，当前为 popperBackgroundColor / popperMaxWidth。没有恢复旧名称、别名或默认内联变量。
- FileDisk 当前源码、原有 HEAD、文档均为 viewMode=grid；9 项失败在未传 list 时查询 tbody 或列表表头。明确指定 grid/list 的缩略图既有用例隔离通过。这只证明旧查询前提，不代表下载、重命名、框选等业务全验收。
- ScrollingText 当前源码与 HEAD 都仅渲染一份内容，旧用例要求两份节点；没有为该断言恢复重复插槽。
- 隔离汇总 .tmp-diagnose-isolated.json，各项 .tmp-diagnose-<name>.log；Table 共享 data 的两项隔离诊断沿用第二批记录。全量最后结果保持第五批 374 通过、104 失败和 1 项 Table 未处理错误，不宣称全量通过。

### 下一步与目标边界

1. 从审计表的 86 项待定位继续核查当前契约下的真实实现缺陷，尤其 Table 选择/编辑/宽度计算、样式导入链和表单默认效果；不要先恢复旧接口。
2. 继续迁移其它 Story 的场景数据，重点处理 FileDisk adapter 私有状态、Table 动态数据、模态场景和恢复默认。
3. 按已确认六项目标继续浮层交互、合理拆分、docs 示例运行/复制、图标资源及产物警告核查。整体完成需实际证据，浏览器限制未解除前相关验收保持未完成。

## 2026-10-08 第六批实际进展

对应用户确认的第一项：Story 数字/字符串输入和公开类型识别。生产组件与公开导出未改动。

- 公共面板的 number | string 属性新增输入方式切换。现有字符串初值自动使用文本框；数字初值使用数字框，未覆盖的 width/height/radius 仍使用数字框。数字属性和纯字符串属性保持原类型控件。
- 已核实单位为数字 px / 字符串 CSS 的属性，模式转换可在数字与 px 字符串之间转换；%/calc() 等无法转成数字时提示并保留原预览。清空输入撤销覆盖；update 回写及恢复默认清理对应模式和旧输入文本。
- 提取器根据 src/index.ts 的真实 TypeScript 导出符号标记 exported：470 个类型条目中 418 个可从主入口导入、52 个为关联定义。没有提升内部上下文为公开出口或删除相关定义。
- docs 与 Story 类型区域区分公开类型/关联类型；组件文档保留全部定义，关联类型明确说明不可按名称直接从包名导入。docs/guide/testing.md 同步输入方式和导出状态操作说明。
- 根文件加入 TypeScript 程序后，Autocomplete 的两个方法、DataTableSettings 的 getRows 推断签名显示了 src/index 源码引用。对已核实根导出的类型改为 import("@x-soft88/x-ui") 引用；只改变显示路径，不改变签名语义。
- 生成审阅 .tmp-batch6-review.json：对显示路径归一后原契约相同，470 个定义完整保留，非 API 人工内容变化 0；再次刷新 docs 差异 0。
- lint、API 清单、命名审计、build/docs/story 类型检查、docs / Story 构建共 8 项通过；最终路径修正后复验受影响项目，全部退出码为 0。汇总 .tmp-batch6-validation.json；日志 .tmp-batch6-<name>.log；修改前快照 .tmp-batch6-before.json。
- 生产组件未修改，未重复库构建与全量测试。最后全量仍为第五批 374 通过、104 失败、1 项 Table 未处理错误；测试源文件未改动。
- 浏览器入口本轮重试仍在初始化时 sandbox helper_unknown_error/setup refresh 退出。数字/字符串切换、布局和恢复行为未做真实浏览器验收，不能标记交互通过。
- 本批没有未验证的实质修改。下一步继续逐项定位失败，并核查各 Story 场景状态/默认效果；其余确认的浮层、拆分及产物运行效果目标仍保持进行中。

## 2026-10-08 第五批实际进展

本批验证真实打包产物消费，并修复根入口实际遗漏。没有安装依赖、发布、提交或新增测试用例。

### 发现与修复

- 将现有 dist 用 npm pack --ignore-scripts 打包，在工作区忽略目录解包为 node_modules/@x-soft88/x-ui。消费项目不继承仓库 tsconfig 的源码 paths，也不为包名设置 Vite alias；直接使用打包内容和工作区已安装的 Vue/Vite 依赖。
- 修复前消费类型检查报 TS2614：SwitchEmits/SwitchValue 不在根入口公开声明中。运行时发现默认插件遗漏 XBadge、XCollapse、XDescriptions、XProgress、XSkeleton、XStatistic、XAlert、XNotification、XPopconfirm、XPopover、XUpload、XBreadcrumb、XPagination、XSteps 共 14 个组件。
- src/index.ts 的组件列表补齐上述组件，其中 Notification 使用 XNotificationComponent 注册；XNotification 命名服务和 $notification 保持现有语义。
- 根入口通过 export type * from './components' 复用已有组件入口的公开类型，不再另手写一份遗漏清单；保留所有既有显式导出。源码和打包声明分别对照组件 barrel，遗漏名称均为 0。没有把只在内部 types.ts 中导出的上下文类型强行加入公开入口。
- docs/guide/getting-started.md 同步 Notification 模板组件/服务区别、Switch 公开类型及单组件安装示例。当前 Story 不通过全局插件挂载，未新增变体；已有全部 Story 继续通过类型检查和构建。
- 上方第一批记录原先声称根入口已有 SwitchEmits/Value 不准确，现已纠正；不能从单组件出口或交接记录推断根包声明可消费。

### 最后验证

- 本批生产入口变更后完整运行已有检查。lint、API 清单、命名审计、build/docs/story 类型检查、库构建、docs 构建及 Story 构建均通过。
- 全量测试 478 项：374 通过、104 失败，另有 1 项 Table undefined.map 未处理错误。按完整用例名称与原 .tmp-final-tests.json 比较，新增失败 0、减少失败 0；不能据此把全部失败归类为历史问题，仍需逐项定位。
- 汇总 .tmp-batch5-validation.json；已有测试报告 .tmp-batch5-tests.json；失败对比 .tmp-batch5-failure-comparison.json；各项日志 .tmp-batch5-<name>.log。测试文件未改动，没有降低断言、恢复旧接口或修改错误兜底。
- 用新 dist 再次打包到独立 .tmp-consumer-fresh，公开类型检查、Node 导入与注册、Vue 3 消费项目 Vite 构建三项退出码均为 0。87 个公开组件命名导出及全局注册无遗漏；Switch 单组件安装成功。Login/Register radius 的数字/字符串类型和 Switch change 元组类型在消费 SFC 中通过校验。
- 消费项目按仓库现有设置使用 strict:true、skipLibCheck:true。仅证明该配置下的消费类型与构建，不代表其它 TS 配置或交互全部通过。
- 包包含 7 个文件；保留 dist/x-ui.js、dist/index.d.ts、dist/style.css 及 remixicon.css 的原有出口，仅 ES 模块，无 CJS。消费构建同时验证 style.css 和 remixicon.css 的包名导入。
- 消费汇总 .tmp-consumer-fresh-validation.json；pack 文件清单 .tmp-consumer-fresh/pack.json；出口审阅 .tmp-batch5-packed-review.json。修复前汇总 .tmp-consumer-before-validation.json 保留，初始目录 .tmp-consumer 仍是旧产物，不应复用来判断新结果。
- 消费 Vite 构建仍报告较大分块、CSS 约 6.88 MB，以及 data URL 使用 new URL(..., import.meta.url) 的运行时解析警告；未抑制警告或调阈值。浏览器不可用，图标、弹层等真实运行效果未验收。

### 当前边界与下一步

- 第四、五批没有尚未完成类型/构建检查的实质修改；全量测试与浏览器交互仍未通过，项目整体不能标记完成或可发布。
- 下一批优先补充 number | string 长度的 CSS 字符串调试入口、继续逐个核查 Story 外部场景数据恢复及 Props 默认效果。不要重跑未改动的整套检查。
- 根组件入口与根包出口已对齐，但 API 清单目前收集各 types.ts 的导出声明；其中一些未被组件 index.ts 导出的内部上下文仍需核查，不能将所有类型面板条目视为可从包名导入的公开类型。
- 浏览器环境恢复后验收 Select/Tabs/公共面板及图标资源；随后处理浮层焦点/Esc/滚动锁/定位监听、Table/FileDisk 拆分和剩余测试失败。字体/图标体积与消费警告也需后续定位。

## 2026-10-08 第四批实际进展

本批处理公共 Story 的场景恢复与接口分组，只迁移 Select、Tabs 两个场景，没有改变生产组件行为。

### 修改与审阅

- ApiPlayground 新增内部 initialProps 入口，预览和属性面板共用复制后的场景数据；恢复默认重新复制初值，同时清理控制覆盖、插槽替换、方法参数、事件日志、实例和父容器设置。数组、普通对象与 Date 被复制，函数预设保留。
- Select 保留原有场景配置、四个选项及无参数 remoteMethod，将 modelValue/options/remoteMethod 一并交给公共面板。移除独立 v-model 和已不用的样式；radius 从等价的 6px 字符串改为数字 6。初值通过 satisfies SelectProps 校验。
- Tabs 的初始页签、选中值和原先生效的配置交给公共面板；新增、关闭、排序更新同一份 items/modelValue。新增名称避免与现有名称重复。可选 items 清空后按空列表处理；原先未绑定的配置和未展示的私有事件日志被移除，公共日志记录全部公开事件。
- 对照 Tabs 实现，批量关闭会逐个发 tab-remove，场景无需再次处理聚合事件；没有修改关闭业务语义。新增和关闭仍由场景处理，生产组件保持受控接口。
- 87 组件的 286 个事件、155 个插槽、56 个方法、470 个类型新增分组；SlotProps 优先归入插槽契约。生成前后剔除新增 group 字段比较，其余契约完全一致。
- 接口、类型、事件区域按分组使用四列 180px 布局；docs/guide/testing.md 同步场景初值、恢复和分组说明。刷新组件 API 文档无差异，人工说明保留。

### 验证与限制

- lint、API 清单、命名审计以及 build/docs/story 三套类型检查通过；docs / Story 构建通过，最终 Story 仍为 87 stories / 87 variants。
- 最终类型分组修正后复验 lint、清单、Story 类型和 Story 构建，退出码全部为 0。汇总 .tmp-batch4-validation.json；生成审阅 .tmp-batch4-review.json；文档审阅 .tmp-batch4-doc-review.json；修改前快照 .tmp-batch4-before.json。
- 本批没有生产源码改动，未重复全量测试或库构建；测试目录没有改动，最后全量仍为 374 通过、104 失败及 1 项未处理错误。
- 浏览器入口仍在初始化时发生 sandbox helper_unknown_error/setup refresh 错误，Select/Tabs 的实际点击、事件日志和恢复操作未浏览器验收，不能标记交互通过。构建警告保留。
- 没有未做类型/构建检查的本批实质修改。只完成两个场景的状态迁移，其余 Story 的外部初值仍待核查；number | string 长度的 CSS 字符串输入、浮层交互、复杂组件拆分及产物消费验证仍未完成。

### 下一步

1. 验证当前 ES-only 打包产物可通过包名、原有导出路径和公开类型被第三方 Vue 3 项目消费，不安装依赖或发布。
2. 继续提供 number | string 长度的 CSS 字符串调试入口，对照实现补充默认效果；逐个迁移其它 Story 的场景状态。
3. 浏览器恢复后完成真实交互验收，随后核查浮层焦点/Esc/滚动锁/监听清理、Table/FileDisk 拆分和余下测试失败。

## 2026-10-08 第三批实际进展

本批只处理公共 Story 的类型控件与输入同步，不改变生产组件契约或行为。

### 修改范围

- component-api-values.mjs 根据 TypeScript 解析后的真实类型生成 controlType/options。布尔别名为复选框、数字别名为数字控件、真实字符串字面量联合为枚举；不会扫描接口定义中的任意引号来猜选项。
- 数组、元组和混合绑定值保留 JSON 输入；纯字符串长度（例如 Login.width）不再强行传入数字。纯函数和含可调用成员的对象保留场景提供入口。
- 联合类型共有的内建 valueOf 等方法不会再把 Radio/Checkbox/Select 的普通绑定值误判为 adapter。Switch.activeValue/inactiveValue 的 SwitchValue 均解析为 boolean。
- ApiPlayground 的结构化值通过 JSON 格式化显示，update 事件回写清除对应旧输入文本及错误，使控制区跟随新的绑定值；无效 JSON 仍保留上一有效预览值。
- docs/guide/testing.md 同步外观接口操作说明和 PC 验收视口，不增加移动端能力，不新增测试用例。
- 比较生成前后 API 的 type/default/defaultNote/unit/description/required 以及事件/插槽/方法/类型列表，变化为 0；仅新增控件元数据。组件文档无实质变化。

### 验证记录

- lint、API 清单同步、命名审计及 build/docs/story 三套类型检查已通过。
- docs / Story 构建通过，8 项相关检查的退出码全部为 0；构建警告保留。没有未验证的本批实质修改，但仍未进行浏览器交互验收。
- 日志 .tmp-batch3-<name>.log，汇总 .tmp-batch3-validation.json；生成前快照 .tmp-batch3-before.json。
- 本批未修改生产组件，未重复全量测试或库构建。第一批全量失败与第二批 Table 诊断结果保留。
- 浏览器环境仍未恢复，真实复选框/JSON 更新/恢复默认行为没有浏览器验收，不能标记交互通过。

### 下一步

1. 浏览器恢复后验证本批控件选择和事件回写；继续检查单个 Story 的场景初值、动态插槽、实例捕获和 callback/adapter 预设。
2. 补齐事件/方法/类型区域功能分组，以及未设置时的默认效果说明、模板/组件转发处的单位来源；number | string 长度控件仍需进一步提供 CSS 字符串调试能力。
3. 对照源码逐项核实 Props 的实际效果与可选样式；继续浮层焦点/Esc/定位清理、复杂组件拆分和打包产物消费。
4. 保留全部测试失败；不要用缺省 data 兜底或业务策略回退掩盖第二批已定位的共享输入问题。当前没有新生产组件类型错误。

## 2026-10-08 第二批实际进展

本批范围是默认值/单位生成的可信来源及公共 Story 的默认说明、预览容器恢复。生产组件行为没有在本批改变。

### 本批修改与审阅

- component-api.mjs 移除按属性名将 fontSize 改为 14、布尔属性改为 false 的推断，也不再将显式 undefined 改成未设置。102 项声明默认值按源码修正；不是把这些组件的实际显示统一改为 undefined。
- withDefaults 未显式配置的属性记为 —；显式 undefined 保留。文档默认值列说明这一区别，避免把父级继承、CSS fallback 与声明默认值混为一谈。
- 层级值通过 TypeScript 检查器读取实际 overlayZIndex 常量，不再在脚本复制一份数字。
- 新增 scripts/component-api-values.mjs：单位来自脚本中的 toCssSize、createFontStyle/getComponentMetrics、明确 px 模板字符串及定时器参数，类型别名通过检查器解析。fontSize 遵循仓库明确的 number/px 契约。
- 单位推导忽略条件判断和乘除转换，避免将 Textarea 的 maxRows 行数误标为 px；Text.lineHeight 明确为行高倍数，ScrollingText.speed 明确为 px/s。最终 324 项单位有来源；不能据此声称所有公开属性的单位已完成核查。
- 对照源码人工补充 Button、BaseInput、Switch 的字号继承/固定尺寸/圆角及 Tooltip 内部显示状态说明（defaultNote）。这里只涵盖已核实的少量回退契约，后续继续补充其它组件。
- update-api-docs.mjs 不再从旧表格回填默认值，也不再按名称猜单位。79 个文档刷新，非表格人工内容和人工表格说明均比较为无丢失；保留生成前末尾格式，最终二次刷新差异为 0。
- ApiPlayground 显示 defaultNote 和单位提示，恢复默认额外重置父容器宽高、撑满设置和旧实例引用；切换布尔绑定状态从声明默认值开始。

### 本批验证

- lint、API 清单同步、公开命名审计均通过，legacy/review 为 0。
- build/docs/story 三套类型检查通过。
- docs 构建通过；Story 构建通过（87 stories / 87 variants）；构建警告保留，没有调整警告阈值。
- 汇总 .tmp-batch2-validation.json，各项退出码为 0；各项日志 .tmp-batch2-<name>.log。
- 本批未改生产组件源码，未无目的重跑库构建和全量测试；全量测试最后结果仍为第一批的 374 通过、104 失败及 1 项未处理错误，不标记全量通过。
- 默认值/单位生成前快照 .tmp-batch2-before.json；人工说明审阅 .tmp-batch2-doc-review.json；最终文档稳定性快照 .tmp-batch2-stable-docs.json。
- 浏览器连接重试仍因 sandbox setup refresh 错误退出，父容器恢复及控制提示仅做静态/构建验证，实际交互未验收。

### Table 失败的新增诊断（没有修改源码或测试）

- 组合运行已有 marks dirty cells、resets dirty changes、copies selected cell text 三例：1 通过、2 失败、86 跳过，另有 1 项未处理错误。日志 .tmp-table-shared-input.log、报告 .tmp-table-shared-input.json。
- 撤销和复制分别在独立进程单独运行：各 1 通过、88 跳过，无该未处理错误；日志 .tmp-table-isolated-reset.log / .tmp-table-isolated-copy.log。
- tests/table.test.ts 的 describe 共用 data 数组；前面的脏数据用例使 auto 策略原地修改该数组，把名称写成控制台。
- 后续撤销用例再次输入相同值；Table.vue 的 Object.is(value, oldValue) 分支跳过提交，首个 update:data 事件不存在。测试仍在 table.test.ts:1333 把 draftRows（undefined）传回 data，Table.vue:148 随后读取 map 报错。复制用例也受到已经变成控制台的共享值影响。
- 该路径可解释这组三例的失败与未处理错误，不能泛化到全部 104 项失败。没有给必填 data 添加兜底、没有恢复旧尺寸接口、没有改 auto/mutate 业务语义、没有修改测试或削弱断言。

### 下一批与仍未验证

- 继续对照实际 computed/CSS/父级上下文补充未设置时的回退；当前单位模块不完整处理模板表达式、组件转发或任意自定义转换，未提取时保持 —，不猜测。
- 单个 Story 仍有自定义初值、callback/adapter 预设等待核实；公共面板的 JSON 值展示、更新事件后的输入同步、类型别名控制选择及其它接口分组需继续处理。
- 浏览器恢复后验收父容器恢复、Switch 事件日志/圆角，以及动态插槽、新增子组件 Story、模态和浮层；现阶段不能声称交互通过。
- 继续核查其余测试失败，随后按剩余顺序进行 Table/FileDisk 拆分与产物消费验证。当前没有本批未做类型/构建检查的实质修改。

## 2026-10-08 第一批实际进展

下方旧交接内容保留用于追溯；其中暂停时的错误和验证结果不代表本轮状态。

### 本批修改

- 实际复现 Login/Register 两处 TS2769。保留 radius 的 number | string 类型，以 toCssSize(props.radius) ?? '18px' 完成 CSS 变量转换，依据两组件已有默认值，不使用类型断言。
- component-api.mjs 的外部事件成员名称、类型及调用签名参数改为使用节点自身 getText()，不再传 Vue 虚拟 SourceFile。
- Switch 已核对源码：先发 update:modelValue，再发 change；两者参数均为 [value: SwitchValue]，SwitchValue 为 boolean；禁用时不发事件。单组件入口导出 SwitchEmits/Props/Value；根入口当时遗漏 SwitchEmits/Value，于第五批打包消费核查中发现并修复。
- Switch Story 去除自定义的初始选中值及旧控制代码，使用 ApiPlayground 统一处理绑定值、事件日志与恢复默认；没有增加测试用例。
- 刷新 87 个组件 API 清单、15 个受圆角类型变更影响的组件文档和命名报告；核对生成前后非空内容，未删除人工说明、示例、样式变量及验收内容。仅 Switch 新增两个事件表项。
- Switch 文档修正实际默认轨道高度 24px、height 优先于 buttonSize、Form 字号继承、胶囊圆角及事件触发顺序说明。
- update-api-docs.mjs 修复验收说明/样式说明的空行累积，避免仅换行或文件末尾空白导致重写。精确移除初次刷新给 15 个文档新增的末尾空行，保留原有格式；最终再次刷新文档，差异为 0。

### 本批验证

- 格式/语法/UTF-8 检查通过（0 问题）；脚本最终修改后另行复验通过。
- build/docs/story 三套类型检查通过。
- API 清单同步检查通过；公开命名审计通过：89 个 Props 接口，651 个唯一属性名，legacy 0、review 0。
- 已有测试：478 项，374 通过、104 失败，另有 1 项未处理错误。与 .tmp-final-tests.json 按完整失败用例名称对比，新增/减少失败均为 0。这仅说明失败集合未变，不证明这些失败都属于旧规格问题。
- Login 的 8 项已有测试通过；Switch 的切换绑定、默认/自定义标签、内部标签及外观变量已有检查通过。旧尺寸规格和直接读取入口 CSS 文本的失败保留，未改测试。
- 未处理错误：Table.vue:148 的 props.data.map 收到 undefined；日志指向 table.test.ts 的剪贴板场景，具体输入来源/行为原因尚未确认。
- 组件库构建通过：x-ui.js 1,783.33 kB（gzip 447.48 kB）；style.css 6,877.78 kB（gzip 2,247.96 kB），xlsx 块 675.64 kB（gzip 170.66 kB）。
- docs 构建通过，保留大 chunk 警告。
- Story 构建通过；保留 Histoire setupVue3/setupVanilla virtual 模块导出警告及 flexsearch eval 警告。统一 check 返回 1，仅已有测试这一项未通过。
- 额外 git diff --check 未通过：当前完整工作区仍有组件 Story/源码行尾空白及文档末尾空行；未做批量格式回退或清理。此项不在 scripts/check.mjs 的通过项内。
- 总检查日志：.tmp-batch1-check.log；失败对比：.tmp-batch1-failure-comparison.json；生成前快照：.tmp-batch1-before.json。

### 环境限制、未验证内容与下一步

- 默认终端无法初始化（setup refresh had errors）；本批改用经过自动审批的终端执行。apply_patch 因仓库路径 reparse point 无法写入，使用 Node 显式 UTF-8 小范围修改并复核。
- 浏览器工具两次因同一 sandbox 初始化错误退出；没有绕过浏览器工具。Switch Story 的实际点击日志、恢复默认以及数字圆角的浏览器表现仍未验收，不将构建通过视为交互通过。
- 本批源码、文档、Story 均完成类型检查，未遗留本批未做静态检查的源码修改；上述浏览器验收仍待完成。
- 下一批先处理生成器的默认值/单位来源：当前 fontSize=14、布尔值=false 等仍包含名称推断，不能据此宣称所有默认值真实。应逐组件对照 withDefaults、computed、上下文继承及 CSS fallback；仅 number 字号的单位说明也需修正。
- 待浏览器环境恢复后补验 Switch Story 和圆角效果，再按下文剩余顺序推进 Story 完整性、浮层、复杂组件拆分及打包产物消费。Table 未处理错误与 104 项失败仍需独立定位。

## 继续时先读

1. 阅读仓库 `AGENTS.md` 和 `.codex/skills/x-ui-component-library/SKILL.md`，再阅读本文。
2. 保留工作区所有现有修改。开始本轮前已有约 294 个改动文件；暂停时 `git status --short` 为 557 行。不能将全部差异都视为本轮新增，不能 reset、clean 或批量覆盖。
3. 仅做 PC；使用 happy path；**不新增测试用例**。本轮没有修改测试断言，也没有删除失败测试。继续运行已有测试和必要检查。
4. ES-only 发布，保留 `dist/x-ui.js`、`dist/index.d.ts`、`dist/style.css` 和图标样式入口；不加 UMD、不改必需 peer dependencies、不拆包。
5. 中文文件显式 UTF-8 读写，优先 apply_patch。没有授权创建子代理；不要自行派发。
6. 下文的“通过”只对应当时版本。其后还发生了源码、元数据、文档和 Story 修改，必须重新检查。

## 上一轮暂停时的未收尾问题（第一批已修复，见上方最新记录）

### 1. Login / Register 类型检查失败

最后正在统一 `radius` 为 `number | string`，将 CSS 变量赋值改成 `toCssSize(props.radius)`。

当前 `node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.build.json` 报错：

- `src/components/other-components/login/src/Login.vue:105`
- `src/components/other-components/register/src/Register.vue:113`

两处 `computed<Record<string, string>>` 的圆角值变为 `string | undefined`，与声明不兼容。两组件已有默认圆角 `18px`；应依据实际默认值修正类型或转换结果，不能用无依据的类型断言掩盖。

完整日志在 `.tmp-radius-types.log`。这是明确由最后一批改动引入的错误，**先修复再推进**。

本次圆角修改还涉及 BaseInput、Text、Switch、Checkbox、Form 的类型和 CSS 映射；需要回归验证数字圆角确实生效，Story 不再传入不支持的值。

### 2. API 提取脚本的跨文件节点读取问题

`scripts/component-api.mjs` 刚增加 `defineEmits<SwitchEmits>()` 的接口成员解析，但尚未收尾：

- 读取来自 `types.ts` 的成员时仍使用 `member.name.getText(sf)`、`member.type.getText(sf)`；`sf` 是 Vue 虚拟脚本，不能用于其它源文件节点。
- 应使用节点自己的 `getText()` / `getSourceFile()`；同样核对参数 `p.getText(sf)`。
- 修复后检查 Switch 的 `update:modelValue`、`change` 和参数类型，不要生成乱码签名。

圆角类型、Dialog 标题关联及 Switch 事件处理之后，元数据和文档尚未全部刷新。建议顺序：

```powershell
node scripts/component-api.mjs
node scripts/update-api-docs.mjs
node scripts/component-api.mjs
node scripts/component-api.mjs --check
node scripts/audit-api-naming.mjs --write
node scripts/audit-api-naming.mjs --check --max-legacy=0 --max-review=0
```

刷新前审阅脚本；刷新后检查文档是否保留示例章节、人工说明和正确分组。API 清单会补充读取文档中的中文说明，因此在文档更新后再刷新一次清单。

### 3. 最新修改还未全量验证

最近新增/修改但未完整验收：

- 8 个子组件 Story，磁盘上 Story 总数应为 87。
- 文档主题移除整批全局组件注册，只注册文档辅助组件。
- Chart、RichTextEditor 文档示例改用 VitePress `defineClientComponent`。
- 单组件入口共享 `ComponentWithInstall` 类型。
- Dialog/Drawer/MessageBox 的 `aria-labelledby` 与标题 ID。
- Dialog 窗口 resize 约束和拖动后缩放边界。
- Table 对 `update:data` 监听器的读取修复。
- 圆角数值类型和映射。
- API 生成器、统一检查命令的新版本。

## 已完成的主要改动

### 公共 API 与浮层

- 新增 `src/components/_utils/useModal.ts`：共享模态堆栈、背景滚动锁、Esc 顶层关闭、Tab 焦点限制、打开焦点进入与关闭焦点恢复。
- Dialog、Drawer、MessageBox 接入 `closeOnEsc`（默认 true）和模态管理。
- Dialog 几何属性改为数值像素；限制尺寸和位置在桌面视口中。最近又补了窗口缩放监听、拖动后缩放限制，待重新验证。
- 新增 `useFloatingPosition.ts`，Popover、Tooltip 共用定位、边界翻转、滚动/resize/ResizeObserver 更新与清理。
- `showActiveBorder` 从无差别公共样式接口移除，保留在有激活语义的输入类接口。
- `createElementStyleVars` 增加圆角实际样式映射，Dialog/Drawer 补相应变量。
- 最新 Table 修复：已声明事件的监听器不会保留在 `$attrs`，改为读取当前实例 VNode props，避免受控 `update:data` 被误判为需要原地修改。

### 文档与导航

- 左侧变为“指南”及固定六大类，移除多余组件包裹层；分类可折叠、初始收起，VitePress 展开当前类别；原 URL 保留。
- 本地搜索已配置；页内目录显示二、三级标题。
- 组件页属性、事件、插槽、方法按功能分组；补公开类型、样式变量和验收说明，移除末尾自动追加的未分类属性区。
- Props 表已增加单位列。各页增加“使用示例”层级。仍需人工审阅分类、默认值和类型说明，生成器不能替代逐项确认。
- 原有约 237 个示例提取到 `docs/examples/<component>/ExampleN.vue`；新增 Dialog 嵌套示例 `Nested.vue`。
- 预览与 `?raw` 源码使用同一个 SFC，示例显式导入包名与样式入口；独立状态；源码默认折叠、支持复制。
- `docs/.vitepress/example-imports.ts` 将示例包导入映射到源码组件入口。
- 已修复多处示例数据/类型/事件问题，包括 Tree、Form、日期节日、自定义适配器、列表、TableColumnSettings、JSON 字符串等。
- 浏览器发现并修复了 Flow 图标数据形状问题，以及 Chart 示例缺少模块注册导致的运行错误；Chart 仍需最终浏览器复验。
- 文档主题刚移除全量组件注册，必须重新逐页确认无未解析组件。
- Markdown 页脚本中无用示例状态已做依赖清理；注意不要重跑旧的迁移脚本造成覆盖。

### Story

- 原 79 个 Story 都收敛为一个“外观接口”变体，使用 `src/components/_story/ApiPlayground.vue`。
- 公共面板含属性、接口、类型、事件；属性按功能分组，四列 180px，标签省略并提供完整提示。
- 提供父容器宽高/撑满控制、padding 10px、居中、恢复默认、JSON 参数、方法调用和事件日志。
- 名称含 group 的场景展示至少 3 个实例。
- 浮层切换入口移入预览父容器，保留 Teleport。
- 插槽替换最初没有刷新，已修复 Fragment 遍历、VNode children 标记和文本 VNode 返回；按钮替换与事件日志已在浏览器验证。
- 新增动态插槽的实际名称输入，尚需实测 Table/Tabs 动态插槽。
- 新增独立子组件 Story：BrickItem、FlowItem、GridItem、SplitPane、FormItem、Option、HorizontalMenu、VerticalMenu。已有父组件包裹的场景还需验证插槽、实例捕获与属性效果。
- 清理了多处旧控制面板导入与无用脚本声明；部分旧样式和示例自定义默认值还需清理。

### 内部模块与样式

- Table 提取 `columnLayout.ts`、`cellEditing.ts`、`summary.ts`、`excel.ts` 的独立函数。
  **这还不是全部状态逻辑的拆分**：列配置、编辑状态及汇总的较多 computed/操作仍在 Table.vue，需要继续合理提取。
- FileDisk 提取 `paths.ts`、`theme.ts`、`useFileSelection.ts`、`useFileContextMenu.ts`、`useFileUploadTasks.ts`；上传延时清理已补。
  **文件适配器操作等仍在主组件中**，需继续整理。
- Login/Register 共用 `_shared/useImageCaptcha.ts` 和 `auth-layout.css`。这部分仅抽了验证码及重复布局，仍需审阅剩余重复布局。
- 全局 CSS 按原连续顺序拆到组件目录样式及 `src/styles/shared-N.css`；`src/styles/index.css` 保持统一入口、按原次序 import，并保留设计变量。
  拆分产生较多片段；不要任意重排 import，否则影响原级联。需要进一步检查组织质量和样式运行效果。
- 全量语义排版变量治理尚未完成。

### 工程

- ES-only 与类型入口已统一；AGENTS、组件技能、使用指南中相关发布约定已调整。
- 新增 build/docs/story 三套类型检查配置，声明构建排除 Story、文档。
- Histoire 使用 `scripts/histoire.mjs`，不再用 Windows 专属 `set ...&&`。
- 新增 `.editorconfig`、`.gitattributes`、基础语法/编码检查脚本、CI。
- `.gitignore` 忽略 `.pnpm-store/`，去掉所有 PNG/SVG 的笼统忽略。
- 新增 `scripts/check.mjs`，所有检查都会执行，最后汇总退出码；测试失败也不会阻止后续构建执行。
- `package.json` 增加 lint、API 清单/文档刷新、独立类型检查和统一 check 命令。
- `ComponentWithInstall` 类型统一多数单组件安装入口；仍需检查特殊服务组件与所有根导出。

## 检查记录：不能当作最终全量通过

### 构建及静态检查

较早版本均已成功：组件库构建、文档构建、Story 构建；库/docs/story 类型检查；基础 lint；公开命名审计零 legacy、零 review。

最后一次成功构建时的体积基线：

| 产物 | 原始大小 | gzip |
| --- | --- | --- |
| `dist/style.css` | 6,877.78 kB | 2,247.96 kB |
| `dist/x-ui.js` | 1,782.31 kB | 447.22 kB |
| xlsx 动态块 | 675.64 kB | 170.66 kB |

CSS 体积很大，与图标字体资源有关；本轮不自行拆包或改发布依赖。最新代码尚未重新构建。

关键日志：

- `.tmp-final-build.log`、`.tmp-final-docs.log`、`.tmp-final-story.log`
- `.tmp-final-story-types.log`、`.tmp-final-docs-types.log`、`.tmp-lint.log`
- `.tmp-radius-types.log`：**当前明确失败**

Histoire 构建出现其自身 virtual setup 导出相关 warning，之前构建仍完成；应记录并判断，不能宣称零 warning。

### 已有测试

- 较早两次：478 项，393 通过、85 失败，并出现未处理错误。
- CSS 拆分后的最近一次：**478 项，374 通过、104 失败**。
- 结果：`.tmp-final-tests.json`；日志：`.tmp-final-tests.log`。
- 比较发现新增的 19 个失败均涉及旧测试直接读取 `src/styles/index.css` 的原始文本，拆分后选择器在 import 文件中。**没有修改测试去掩盖这些失败，也没有将它们标记为通过。**
- 原 85 个失败包含旧 `sm/md/lg`/旧字号高度/旧主题颜色断言、FileDisk 默认视图假设，以及 Table 数据交互等；不能笼统声称全部属于历史问题。
- Table 测试在同一 describe 中复用 data 数组，当前 auto/mutate 行为会影响后续用例。`resets dirty changes to original cell values` 单独运行通过（1 通过、88 跳过），全量运行失败；记录在 `.tmp-table-focused.log`。需要进一步确认隔离问题和业务行为，不能通过回退用户既有语义来迎合测试。
- 不新增测试，不删除失败测试，不降低断言。若要更新旧测试的源码读取路径/过时规格，必须保留原检查强度，并严格遵守用户“不写测试用例”的约束；不确定时先记录，不擅自改。

### 浏览器已验证

- 首轮访问了 79 个组件文档页面，检查实际渲染；IconSelect 慢加载后另行确认。
- Button 操作计数与源码折叠已检查。
- Dialog 单层打开、Esc 关闭、背景滚动锁与焦点恢复已检查。
- Dialog 嵌套场景已验证：子层禁止 Esc 时两层均保留；允许后 Esc 仅关子层，父层仍锁滚动，焦点回到打开子层按钮；再关父层后解锁并恢复外部按钮焦点。
- Story 按原 79 个页面首轮访问并对慢加载页复查；大部分显示预览与公共调试面板。
- **Chart Story 在自动等待中仍超时，尚未完成最终确认**；未据此认定源代码错误。最后浏览器导航停在 Chart Story，尚未读取加载完成后的状态。
- Button Story 点击日志、插槽替换已验证；部分早期日志来自已修复的插槽错误，不应混同最新问题。
- 未完成全部 238 个示例的主操作、87 个 Story 的所有属性/方法/插槽验证；不能把“首屏能显示”当成全部交互通过。

## 剩余实施与验收顺序

1. 修复上述 Login/Register 类型错误和 API 生成器跨文件 getText 错误，刷新 API、文档和命名报告。
2. 检查生成器质量：Props 默认值与单位不能凭名称猜测；事件触发时机要完整；作用域插槽契约需与实现核对；方法应区分可调用函数与暴露状态；重复类型/表格去重。
3. 对照源码继续检查全部公开 Props 是否实际生效，清除重复声明、无效说明、未用导入。特别检查圆角、可选样式默认值、字号与高度独立。
4. 完成 Story 四区域内部的功能分类：当前属性已分组，事件/方法/类型区域仍有进一步整理空间。核对 callback/adapter 预设是否真实可操作，不能只有泛泛说明。
5. 验证新增 8 个子组件 Story、动态插槽名称输入、方法捕获、服务式 Message/MessageBox/Notification 的调试入口、恢复默认和独立状态。
6. 继续提取 Table 状态/列配置/汇总/Excel 操作和 FileDisk 文件操作，保持业务结果与事件顺序；审阅 Login/Register 共享布局与语义排版。
7. 重新构建并逐页检查移除文档全局注册后的页面，特别是 Chart/RichTextEditor 的客户端加载和所有复制示例的完整导入。
8. 补足示例主要操作与观察反馈；文档侧边栏折叠、本地搜索、页内锚点、源码默认折叠、复制内容、示例独立状态都需最终确认。
9. 在 1024、1280、1440px 桌面视口检查布局、长文本、滚动、浮层遮挡、鼠标/键盘；复验最近增加的标题关联和 Dialog viewport 限制。
10. 验证 Tooltip/Popover 的定位翻转、内容变化、滚动监听清理，以及混合 Dialog/Drawer/MessageBox 的嵌套层级、焦点和滚动锁。
11. 用最终打包产物建立独立 Vue 3 消费样例，验证按名导入、`app.use(XUi)`、单组件安装、CSS、类型；抽查直接复制的文档 SFC。**这项还没做，不可声称通过。**
12. 完整运行统一检查，整理未通过项和人工验收覆盖清单，明确环境限制与真实缺陷。现有测试失败不能省略。

## 本地命令与环境说明

PowerShell。此前 pnpm/Corepack shim 有签名/联网相关问题，因此直接用已安装的本地 Node CLI，不要求联网重装。

```powershell
node scripts/check.mjs

# 可分别执行，便于诊断：
node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.build.json
node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.docs.json
node node_modules/vue-tsc/bin/vue-tsc.js --noEmit -p tsconfig.story.json
node node_modules/vitest/vitest.mjs run
node node_modules/vite/bin/vite.js build
node node_modules/vitepress/bin/vitepress.js build docs
node scripts/histoire.mjs build
```

验收开发服务此前为：

- 文档：`http://127.0.0.1:5173/`，启动命令 `node node_modules/vitepress/bin/vitepress.js dev docs --host 127.0.0.1 --port 5173`。
- Story：`http://localhost:6006/`，用 localhost；该环境 127.0.0.1:6006 不通。命令 `node scripts/histoire.mjs dev --host 127.0.0.1 --port 6006`。
- 服务是否仍存活，下次先确认；不要重复占端口。
- UI 验收使用 `mcp__cua_repl`；不要通过 shell 启动 Playwright 等替代浏览器控制。跨轮浏览器句柄可能过期，先恢复工具文档和枚举可用标签。

## 临时文件与继续时的注意点

- `.tmp-*` 在 gitignore 中，是本轮迁移脚本和诊断输出；不要误当发布内容。
- 多数迁移脚本**不是幂等**，不要重跑 `.tmp-stories.mjs`、`.tmp-docs.mjs`、`.tmp-normalize.mjs`、`.tmp-styles.mjs` 等旧脚本。
- 正式维护脚本是 `scripts/component-api.mjs`、`scripts/component-api-slots.mjs`、`scripts/update-api-docs.mjs`、`scripts/check.mjs`、`scripts/lint.mjs`、`scripts/histoire.mjs`。
- `scripts/component-api-slots.mjs` 是模板作用域的人工契约补充，新增/修改插槽必须同步，并核对其公开类型名称。
- 当前更改规模较大，逐批审阅 diff。不能为缩小差异恢复用户已有修改，也不能声称完整计划已经完成。

## 下次可直接发送

> 请读取 `PC_COMPONENT_NORMALIZATION_HANDOFF.md`，继续完成 PC 组件库规范化计划。保留当前工作区改动，不做移动端，不新增测试用例。先修复交接文档记录的类型错误和 API 生成器问题，再按剩余顺序继续，并如实报告验收结果。
