# PC 组件库失败审计

更新时间：2026-10-08。基于第二十八批全量报告：478 项，467 通过、11 失败，无未处理错误。下表保留最初 104 项，其中 93 项已通过。

本表记录定位及修复证据。保留既有用例和断言强度，不新增用例、不恢复旧接口；已按证据修正 CSS 读取与测试隔离。待定位不等于历史问题，隔离通过不替代组合或浏览器验收。

## 当前分布

- 已修复：当前接口/菜单场景：3 项
- 已修复：字号规格迁移：19 项
- 已修复：内部颜色绑定：1 项
- 已修复：测试隔离/策略：27 项
- 已修复：头像尺寸一致性：2 项
- 已修复：属性名迁移：5 项
- 已修复：查询场景前提：17 项
- 已修复：CSS 读取范围：19 项
- 待定位：4 项
- 旧行为断言：1 项
- 当前规格断言冲突：4 项
- 旧列宽规则断言：2 项

## 核查证据

- 第二十七批图片失败状态复位后，现有全量仍465通过13失败、无未处理错误，失败名单不变；该报告不覆盖浏览器图片重试。证据 .tmp-batch27-tests.json / .tmp-batch27-failure-comparison.json。

- 第二十一批定位监听生命周期修复后全量仍 453 通过、25 失败，无未处理错误，失败名单不变；.tmp-batch21-tests.json / .tmp-batch21-failure-comparison.json。

- 最新 .tmp-batch14-tests.json / .tmp-batch14-tests.log：420 通过、58 失败、无未处理错误；新增失败 0，修复 27 项。原用例和断言保持不变，四项事件提交场景显式 emit。

- 最新全量 .tmp-batch13-final-tests.json / .tmp-batch13-final-tests.log；修复 19 项、新增失败 0。读取差异 .tmp-batch13-review.json 逐文件确认用例与断言未变。

- 原始报告：.tmp-batch5-tests.json；与原始全量失败名称对比 .tmp-batch5-failure-comparison.json。
- 隔离运行已有用例：.tmp-diagnose-isolated.json / .tmp-diagnose-<name>.log；没有修改测试参数。Drawer、MessageBox、Select zIndex 单独通过，Select 旧背景和旧最大宽度断言仍失败。
- FileDisk 原有 HEAD 和当前 withDefaults 都是 viewMode=grid。tests/file-disk.test.ts 的九项失败依赖未指定 list 时出现 tbody；明确指定 grid/list 的缩略图用例通过。这里只定位查询前提，不代表九项业务操作全部验证。
- Table 共享输入诊断保留在交接文档第二批，日志 .tmp-table-shared-input.log / .tmp-table-isolated-reset.log / .tmp-table-isolated-copy.log。
- 当前 CSS 已拆到组件 style.css 和 src/styles/shared-*.css；只读取 src/styles/index.css 的文本断言需要逐项对照完整导入链，尚未据此统一归类。

- 第十一批 Table 18 项独立进程运行：14 通过、4 失败，逐项 .tmp-batch11-table-isolated.json 与日志；独立通过未替代组合结果。
- 第十一批 CSS 本地导入链逐项字符串定位：.tmp-batch11-css-chain.json。只追踪本地导入，remixicon 外部资源独立待查。

## 逐项记录

| 用例位置 | 用例 | 状态 | 证据 / 下一步线索 |
| --- | --- | --- | --- |
| tests/brick.test.ts:126 | XBrick lets size override width or height on the main axis | 已修复：当前接口/菜单场景 | BrickItem 当前声明 itemSize 且主轴计算优先采用它；保留固定尺寸、width、height 三项断言，仅迁移旧属性及用例名称。 第十九批全量通过，.tmp-batch19-review.json / .tmp-batch19-tests.json。 |
| tests/brick.test.ts:265 | XBrick passes brick text color style variables to items | 已修复：当前接口/菜单场景 | Brick 当前映射 --x-brick-text，CSS color 使用该变量并由子项继承；保留原颜色值，修正变量名。 第十九批全量通过，.tmp-batch19-review.json / .tmp-batch19-tests.json。 |
| tests/button.test.ts:40 | XButton uses md visual dimensions by default | 已修复：字号规格迁移 | 第十七批按 AGENTS/typography：fontSize 数字 px、高度默认 32px 且内边距/圆角独立；保留用例与断言数量并更新旧预设场景。全量通过，.tmp-batch17-review.json / .tmp-batch17-tests.json。 |
| tests/data-table-settings.test.ts:106 | XDataTableSettings exposes theme color props for the shell, table, controls and save button | 已修复：内部颜色绑定 | 真实实现缺陷：DataTableSettings 六处内置 Select 错用 dropdown-background-color，改接当前 popperBackgroundColor；自身公开 dropdownBackgroundColor 及回退链保持。既有内部接口断言迁移，8用例30 expect不变；第二十三批全量通过，.tmp-batch23-review.json / .tmp-batch23-tests.json。面板实际颜色尚待浏览器验收。 |
| tests/dialog.test.ts:98 | XDialog keeps dialog shell spacing and radius independent from size preset | 已修复：字号规格迁移 | 第十七批按 AGENTS/typography：fontSize 数字 px、高度默认 32px 且内边距/圆角独立；保留用例与断言数量并更新旧预设场景。全量通过，.tmp-batch17-review.json / .tmp-batch17-tests.json。 |
| tests/dialog.test.ts:115 | XDialog exposes color style variables for dialog shell | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/elements.test.ts:41 | 元素组件 renders text style classes | 已修复：字号规格迁移 | 第二十五批对照 AGENTS 和输入 metrics：fontSize 为数字且高度独立，常规高度32px；Autocomplete显式height99/fontSize30及固定选项padding0 8px；保留只读、原生属性、状态、清空和事件断言。75用例305 expect不变，.tmp-batch25-review.json / .tmp-batch25-tests.json。 |
| tests/elements.test.ts:148 | 元素组件 renders XIcon inside avatar from icon props | 已修复：头像尺寸一致性 | 第二十六批实际默认头像CSS30px与图标计算32px不一致，改将resolvedAvatarSize映射到宽高变量并使CSS兜底32px；默认图标round(32*0.56)=18，iconFull既有场景通过avatarSize38检查38px。75用例305expect不变，.tmp-batch26-review.json / .tmp-batch26-tests.json；浏览器视觉未验收。 |
| tests/elements.test.ts:163 | 元素组件 fills avatar icon size from avatar dimensions | 已修复：头像尺寸一致性 | 第二十六批实际默认头像CSS30px与图标计算32px不一致，改将resolvedAvatarSize映射到宽高变量并使CSS兜底32px；默认图标round(32*0.56)=18，iconFull既有场景通过avatarSize38检查38px。75用例305expect不变，.tmp-batch26-review.json / .tmp-batch26-tests.json；浏览器视觉未验收。 |
| tests/elements.test.ts:399 | 元素组件 exposes select input-like appearance and readonly interfaces | 已修复：字号规格迁移 | 第二十五批对照 AGENTS 和输入 metrics：fontSize 为数字且高度独立，常规高度32px；Autocomplete显式height99/fontSize30及固定选项padding0 8px；保留只读、原生属性、状态、清空和事件断言。75用例305 expect不变，.tmp-batch25-review.json / .tmp-batch25-tests.json。 |
| tests/elements.test.ts:569 | 元素组件 limits autocomplete visible options to 50 and exposes dropdown max size | 已修复：属性名迁移 | 第十六批使用 types.ts 声明的 popperMaxHeight/popperMaxWidth/popperBackgroundColor，保留参数值、用例名称和所有断言原文，全量通过；.tmp-batch16-review.json / .tmp-batch16-tests.json。未恢复别名。 |
| tests/elements.test.ts:590 | 元素组件 teleports autocomplete dropdown to body by default and updates its position | 已修复：属性名迁移 | 第十六批使用 types.ts 声明的 popperMaxHeight/popperMaxWidth/popperBackgroundColor，保留参数值、用例名称和所有断言原文，全量通过；.tmp-batch16-review.json / .tmp-batch16-tests.json。未恢复别名。 |
| tests/elements.test.ts:961 | 元素组件 can display option values instead of labels for autocomplete, select and cascader | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/elements.test.ts:1031 | 元素组件 uses autocomplete size before explicit height and font size | 已修复：字号规格迁移 | 第二十五批对照 AGENTS 和输入 metrics：fontSize 为数字且高度独立，常规高度32px；Autocomplete显式height99/fontSize30及固定选项padding0 8px；保留只读、原生属性、状态、清空和事件断言。75用例305 expect不变，.tmp-batch25-review.json / .tmp-batch25-tests.json。 |
| tests/elements.test.ts:1107 | 元素组件 delegates date picker input behavior to XInput with suffix slot icon | 已修复：字号规格迁移 | 第二十五批对照 AGENTS 和输入 metrics：fontSize 为数字且高度独立，常规高度32px；Autocomplete显式height99/fontSize30及固定选项padding0 8px；保留只读、原生属性、状态、清空和事件断言。75用例305 expect不变，.tmp-batch25-review.json / .tmp-batch25-tests.json。 |
| tests/elements.test.ts:1194 | 元素组件 delegates date time picker input behavior to XInput | 已修复：字号规格迁移 | 第二十五批对照 AGENTS 和输入 metrics：fontSize 为数字且高度独立，常规高度32px；Autocomplete显式height99/fontSize30及固定选项padding0 8px；保留只读、原生属性、状态、清空和事件断言。75用例305 expect不变，.tmp-batch25-review.json / .tmp-batch25-tests.json。 |
| tests/elements.test.ts:1294 | 元素组件 selects cascader leaf path | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/elements.test.ts:1314 | 元素组件 loads cascader columns from server-side request and maps key-value fields | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/elements.test.ts:1350 | 元素组件 exposes cascader input-like appearance and readonly interfaces | 已修复：字号规格迁移 | 第二十五批对照 AGENTS 和输入 metrics：fontSize 为数字且高度独立，常规高度32px；Autocomplete显式height99/fontSize30及固定选项padding0 8px；保留只读、原生属性、状态、清空和事件断言。75用例305 expect不变，.tmp-batch25-review.json / .tmp-batch25-tests.json。 |
| tests/elements.test.ts:1396 | 元素组件 clears cascader value and supports selecting parent nodes | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/elements.test.ts:1636 | 元素组件 shows cascader empty state | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/elements.test.ts:1645 | 元素组件 opens cascader panel without changing empty state behavior | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/feedback.test.ts:45 | feedback components keeps message size from owning padding and radius | 已修复：字号规格迁移 | 第十七批按 AGENTS/typography：fontSize 数字 px、高度默认 32px 且内边距/圆角独立；保留用例与断言数量并更新旧预设场景。全量通过，.tmp-batch17-review.json / .tmp-batch17-tests.json。 |
| tests/feedback.test.ts:110 | feedback components keeps message box size from owning padding and radius | 已修复：字号规格迁移 | 第十七批按 AGENTS/typography：fontSize 数字 px、高度默认 32px 且内边距/圆角独立；保留用例与断言数量并更新旧预设场景。全量通过，.tmp-batch17-review.json / .tmp-batch17-tests.json。 |
| tests/feedback.test.ts:130 | feedback components resolves message box service when confirmed | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/feedback.test.ts:165 | feedback components supports dropdown command and expanded placement | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:19 | XFileDisk renders entries and fills with list view by default | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:32 | XFileDisk opens a folder on double click and emits path changes | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:46 | XFileDisk downloads a single selected file directly | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:62 | XFileDisk uses archive download for multiple selected items | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:192 | XFileDisk refreshes after paste | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:302 | XFileDisk shows disabled and enabled context menu actions based on selection | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:346 | XFileDisk renames a single selected item from context menu inline editor | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:391 | XFileDisk opens fullscreen image preview and supports wheel zoom and image dragging | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/file-disk.test.ts:416 | XFileDisk selects entries by dragging a selection box in the file area | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/form-controls.test.ts:93 | form controls keeps XBaseInput native input outline hidden when focused | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/form-controls.test.ts:191 | form controls teleports XSelect dropdown to body by default | 已修复：属性名迁移 | 第十六批使用 types.ts 声明的 popperMaxHeight/popperMaxWidth/popperBackgroundColor，保留参数值、用例名称和所有断言原文，全量通过；.tmp-batch16-review.json / .tmp-batch16-tests.json。未恢复别名。 |
| tests/form-controls.test.ts:234 | form controls uses XSelect zIndex for the dropdown layer | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/form-controls.test.ts:302 | form controls expands XSelect teleported dropdown only up to the max width for long options | 已修复：属性名迁移 | 第十六批使用 types.ts 声明的 popperMaxHeight/popperMaxWidth/popperBackgroundColor，保留参数值、用例名称和所有断言原文，全量通过；.tmp-batch16-review.json / .tmp-batch16-tests.json。未恢复别名。 |
| tests/form-controls.test.ts:470 | form controls lets explicit size own visual dimensions for text, number input and switch | 已修复：字号规格迁移 | 第二十二批按实际接口移除旧 size：显式 fontSize、height、padding、radius 生效且独立；Switch buttonSize 控制轨道、默认24px及2:1宽高比，RadioButton 显式height优先于buttonSize且不产生字号内边距覆盖。保留33用例149 expect，逐项 .tmp-batch22-review.json；全量通过 .tmp-batch22-tests.json。 |
| tests/form-controls.test.ts:526 | form controls keeps switch size visual dimensions at 80 percent of the standard height | 已修复：字号规格迁移 | 第二十二批按实际接口移除旧 size：显式 fontSize、height、padding、radius 生效且独立；Switch buttonSize 控制轨道、默认24px及2:1宽高比，RadioButton 显式height优先于buttonSize且不产生字号内边距覆盖。保留33用例149 expect，逐项 .tmp-batch22-review.json；全量通过 .tmp-batch22-tests.json。 |
| tests/form-controls.test.ts:673 | form controls lets explicit radio button size own visual dimensions | 已修复：字号规格迁移 | 第二十二批按实际接口移除旧 size：显式 fontSize、height、padding、radius 生效且独立；Switch buttonSize 控制轨道、默认24px及2:1宽高比，RadioButton 显式height优先于buttonSize且不产生字号内边距覆盖。保留33用例149 expect，逐项 .tmp-batch22-review.json；全量通过 .tmp-batch22-tests.json。 |
| tests/form-controls.test.ts:720 | form controls provides form size and disabled state to children | 已修复：字号规格迁移 | 第二十八批传数字fontSize10/18，验证Form、Input、Select与标签实际继承，保留disabled和for/id关联；CSS字号/高度兜底14/32，顶部标签使用当前带left/right排除条件选择器且保留min-height0。原11/33用例81/149expect不变；.tmp-batch28-review.json / .tmp-batch28-final-tests.json。 |
| tests/form.test.ts:57 | form passes size, disabled and label settings through provide and inject | 已修复：字号规格迁移 | 第二十八批传数字fontSize10/18，验证Form、Input、Select与标签实际继承，保留disabled和for/id关联；CSS字号/高度兜底14/32，顶部标签使用当前带left/right排除条件选择器且保留min-height0。原11/33用例81/149expect不变；.tmp-batch28-review.json / .tmp-batch28-final-tests.json。 |
| tests/form.test.ts:98 | form maps XForm height prop to the public CSS variable with auto default | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/form.test.ts:158 | form keeps align center as vertical alignment without shrinking the field width model | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/form.test.ts:252 | form keeps content fill height class opt-in and preserves form item structure | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/form.test.ts:301 | form maps form item theme props to public CSS variables | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/icon.test.ts:110 | XIcon includes remix icon font styles from the main stylesheet | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/layout.test.ts:23 | XLayout uses documented defaults when props are omitted | 待定位 | 尚未获得足够的具体归因证据 |
| tests/layout.test.ts:79 | XLayout provides viewport min-height fallback for fill height layout | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/layout.test.ts:87 | XLayout sets documented region padding for shell slot regions | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/layout.test.ts:101 | XLayout renders footerBorder on the footer top edge | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/layout.test.ts:111 | XLayout applies custom region colors, edge borders and heights | 待定位 | 传入未声明属性（仅线索，尚非失败归因）：XLayout.topbarColor、XLayout.topbarBorder、XLayout.sidebarBorder、XLayout.contentColor、XLayout.footerBorder |
| tests/nav-menu.test.ts:354 | XNavMenu falls back to activeTextColor for teleported submenu active text color | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/overlay-elements.test.ts:132 | new element components keeps XTooltip theme variable fallback chains in CSS | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/overlay-elements.test.ts:148 | new element components keeps size from owning card, tooltip and drawer shell spacing or radius | 已修复：字号规格迁移 | 第十七批按 AGENTS/typography：fontSize 数字 px、高度默认 32px 且内边距/圆角独立；保留用例与断言数量并更新旧预设场景。全量通过，.tmp-batch17-review.json / .tmp-batch17-tests.json。 |
| tests/overlay-elements.test.ts:202 | new element components keeps overlay layer tokens ordered and used by shared poppers | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/overlay-elements.test.ts:222 | new element components renders XDivider slot text and direction class | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/overlay-elements.test.ts:257 | new element components emits drawer model update when close button is clicked | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/overlay-elements.test.ts:274 | new element components applies XDrawer theme color variables from props | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/overlay-elements.test.ts:321 | new element components keeps XDrawer theme variable fallback chains in CSS | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/overlay-elements.test.ts:334 | new element components emits dropdown command from dropdown item | 已修复：查询场景前提 | 第十五批显式 list/teleported=false 后，全量通过原行为/事件断言；FileDisk 默认用例按已核实 grid 更新名称与唯一视图选择器。无新增用例，.tmp-batch15-review.json / .tmp-batch15-final-tests.json。 |
| tests/overlay-elements.test.ts:354 | new element components uses XDropdown teleported and zIndex props | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/overlay-elements.test.ts:425 | new element components keeps click-trigger dropdown open when pointerdown happens inside a teleported popper | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/rich-text-editor.test.ts:153 | XRichTextEditor anchors color inputs on toolbar color buttons | 已修复：当前接口/菜单场景 | EditorToolbar 当前两个 color-menu；点击文字/高亮菜单后输入才出现。保留两菜单数量及两个输入 class 断言，增加点击前提。 第十九批全量通过，.tmp-batch19-review.json / .tmp-batch19-tests.json。 |
| tests/scrolling-text.test.ts:7 | XScrollingText renders duplicated default slot content for continuous scrolling | 旧行为断言 | 当前源码与 HEAD 均为单份插槽，动画从容器外进入并移出后循环；测试要求两份节点。 |
| tests/table.test.ts:334 | XTable lets rowHeight override size row height without resizing controls | 待定位 | 传入未声明属性（仅线索，尚非失败归因）：XTable.size |
| tests/table.test.ts:364 | XTable treats empty rowHeight strings as omitted values | 待定位 | 传入未声明属性（仅线索，尚非失败归因）：XTable.size |
| tests/table.test.ts:421 | XTable keeps selected cell colors configurable through props and external CSS variables | 当前规格断言冲突 | 当前亮色选区 #dff7ee，测试要求 rgb(59 130 246 / 12%) 和旧 text fallback；属性/样式映射与旧主题常量断言应分开判断。 证据 .tmp-batch11-css-chain.json（主题完整项另对照原测试与 root），未标记既有测试通过。 |
| tests/table.test.ts:485 | XTable routes toolbar controls through theme CSS variables | 当前规格断言冲突 | 当前亮色 control-hover-bg fallback #d6e6ff，旧断言 #e0ecff 在完整导入链也不存在；不是导入遗漏。 证据 .tmp-batch11-css-chain.json（主题完整项另对照原测试与 root），未标记既有测试通过。 |
| tests/table.test.ts:732 | XTable distributes remaining container width to minWidth columns | 旧列宽规则断言 | 当前源码和 HEAD 均将剩余 224px 填入最后一个未冻结数据列 count；实际轨道为 160/120/320，测试期待 name 列填充为 384/120/96。第八批搬移算法等价，失败集合未变化。 |
| tests/table.test.ts:770 | XTable resolves mixed width minWidth and widthRatio columns before calculating fixed offsets | 旧列宽规则断言 | 四列全部冻结时，现规则将剩余空间填入最后一列 owner；测试期待两个 minWidth 列平均分配。当前源码与 HEAD 一致，第八批布局搬移等价；未恢复旧分配策略。 |
| tests/table.test.ts:1101 | XTable adds and inserts empty rows from the context menu | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1157 | XTable adds and inserts empty rows with keyboard shortcuts | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1215 | XTable shows editable row toolbar buttons for appending and deleting selected rows | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1316 | XTable resets dirty changes to original cell values | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1344 | XTable copies selected cell text from the context menu and keyboard shortcut | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1372 | XTable pastes clipboard text into selected cells from the context menu and keyboard shortcut | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1430 | XTable exports raw and formatted Excel data from the context menu | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1466 | XTable exports computed valueGetter values in raw and formatted Excel modes | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1507 | XTable exports summary rows in raw and formatted Excel modes | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1596 | XTable keeps valueGetter columns readonly during edit paste append and import flows | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1687 | XTable renders selection column and emits selected row keys | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1709 | XTable selects all visible rows from the header checkbox without external row key binding | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1815 | XTable edits cell content with XBaseInput after double click when editable | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1845 | XTable supports custom column editor slots while committing edited values | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:1963 | XTable commits editing and moves selected cell with tab from the editor | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:2003 | XTable does not flash cell selection when another cell ends editing | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:2126 | XTable moves selected cell to the next column first row with enter at column bottom | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:2246 | XTable uses the latest internal cell selection when enter is pressed rapidly | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:2274 | XTable supports cell selection mode while keeping row selection column available | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/table.test.ts:2454 | XTable emits reordered rows when a row is dragged after another row | 已修复：测试隔离/策略 | 第十四批自动卸载，Table 独立初值及四项事件场景显式 emit 后，全量通过此原用例。未删除用例或修改断言原文，未改生产策略；.tmp-batch14-review.json / .tmp-batch14-tests.json。 |
| tests/tabs.test.ts:20 | XTabs uses documented default visual variables | 已修复：字号规格迁移 | 依据 AGENTS 和实际 metrics：Tree 行高固定 36px、字号数字 px、图标字号加 2px；Tabs 默认字号 14px，改变字号时标签高度 30px、最小宽度 140px、水平内边距 8px 不变。保留用例数和断言数。 第二十批全量通过，.tmp-batch20-review.json / .tmp-batch20-tests.json。 |
| tests/tabs.test.ts:57 | XTabs supports lg and sm tab sizes | 已修复：字号规格迁移 | 依据 AGENTS 和实际 metrics：Tree 行高固定 36px、字号数字 px、图标字号加 2px；Tabs 默认字号 14px，改变字号时标签高度 30px、最小宽度 140px、水平内边距 8px 不变。保留用例数和断言数。 第二十批全量通过，.tmp-batch20-review.json / .tmp-batch20-tests.json。 |
| tests/tabs.test.ts:133 | XTabs keeps visual styles for every tab type | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/tabs.test.ts:142 | XTabs keeps horizontal tab item frames at the md height for every size | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/tabs.test.ts:151 | XTabs keeps horizontal scroll buttons from changing the tab row height | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/tabs.test.ts:158 | XTabs keeps the tab head background transparent while tab items use tab background variable | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/theme-colors.test.ts:7 | 主题基础色 defines public base color tokens for business overrides | 当前规格断言冲突 | 当前 root 主色 #586085 等与 docs/guide/theme.md 一致，测试期待 #1264f4 等旧常量，完整导入链也无这些旧值。未改现有主题。 证据 .tmp-batch11-css-chain.json（主题完整项另对照原测试与 root），未标记既有测试通过。 |
| tests/theme-colors.test.ts:42 | 主题基础色 defines complete XTable theme tokens for light and dark themes | 当前规格断言冲突 | 亮色 Table header 当前 #d0d7e3 等直接主题值，测试期待 surface-soft 链及旧 fallback；命中的是 root 主题定义，不能归为 CSS 拆分问题。 证据 .tmp-batch11-css-chain.json（主题完整项另对照原测试与 root），未标记既有测试通过。 |
| tests/theme-colors.test.ts:98 | 主题基础色 routes representative component defaults through base color tokens | 已修复：CSS 读取范围 | 第十三批改用本地导入链读取 helper，原用例名称与全部断言原文未变；最终全量通过该用例。证据 .tmp-batch13-review.json / .tmp-batch13-final-tests.json；不是删除或降低断言。 |
| tests/tree.test.ts:170 | XTree exposes color props as css variables | 已修复：属性名迁移 | Tree 声明 mutedTextColor 并映射到原 --x-tree-muted-color，参数值及断言原文保留。 第二十批全量通过，.tmp-batch20-review.json / .tmp-batch20-tests.json。 |
| tests/tree.test.ts:207 | XTree maps size prop to tree css variables | 已修复：字号规格迁移 | 依据 AGENTS 和实际 metrics：Tree 行高固定 36px、字号数字 px、图标字号加 2px；Tabs 默认字号 14px，改变字号时标签高度 30px、最小宽度 140px、水平内边距 8px 不变。保留用例数和断言数。 第二十批全量通过，.tmp-batch20-review.json / .tmp-batch20-tests.json。 |

## 下一步

1. 从待定位项中先检查真实的当前 Props、样式导入链、浮层局部查询及事件行为；没有证据不修改实现。
2. 按组件独立运行必要的已有用例，避免前一个断言失败留下的 DOM、计时器和数据污染下一例。
3. 逐步修复符合现公开契约的实现缺陷；旧断言和测试共享状态保留失败记录，不用兼容接口或缺省数据兜底掩盖。

## 新发现的实现限制

- TableColumn.minWidth 的 CSS 字符串此前只转换 px/纯数字。第九批已实现浏览器测量并共用到布局、拖拽、自动适合宽度及操作列偏移；静态检查和构建通过，但浏览器初始化失败，实际 CSS 长度与偏移仍待验收。此限制与两项旧分配规则断言无关，既有失败集合没有变化。
