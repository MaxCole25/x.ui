# 公开接口命名规范

本规范用于约束 xl.ui 后续新增或修改组件时的公开接口命名，包括 Props、事件、插槽、公开类型和 `expose` 方法。xl.ui 尚未进入生产依赖，当前按 pre-1.0 策略治理公开接口：旧命名 Props 不保留兼容别名，不添加 `@deprecated` fallback；新增或修改公开接口时直接按本规范命名。

## 基础属性

公共属性优先复用下列命名，避免为同一语义新增并行名称。

| 场景 | 推荐命名 | 说明 |
| --- | --- | --- |
| 双向绑定值 | `modelValue` | 对应事件固定为 `update:modelValue`。 |
| 组件规格 | `size` | 只表达 `sm`、`md`、`lg` 视觉规格。 |
| 禁用 | `disabled` | 禁止用户操作。 |
| 只读 | `readonly` | 可查看但不可编辑，统一使用全小写。 |
| 加载 | `loading` | 表示组件或局部内容正在加载。 |
| 可清空 | `clearable` | 允许用户清空当前值。 |
| 占位文本 | `placeholder` | 输入类组件统一使用。 |
| 原生属性透传 | `id`、`name`、`maxlength` | 语义与原生表单属性一致时才使用裸名称。 |

`value`、`label` 只用于选项、节点、表单项等明确数据结构字段；组件主绑定值不要新增 `value`，应使用 `modelValue`。

## 尺寸属性

- `size` 只用于预设规格，默认选项为 `sm`、`md`、`lg`。
- 数值尺寸使用 `width`、`height`、`minWidth`、`minHeight`、`maxWidth`、`maxHeight`。
- 撑满父容器使用 `fullWidth`、`fullHeight`；局部内容撑满使用 `contentFullHeight`、`panelFullHeight` 这类对象前缀。
- 内容自适应使用 `autoWidth`、`autoHeight`。
- 不再新增 `fillHeight`、`contentFillHeight`、`stretch` 这类并行尺寸开关。
- 当组件同时提供 `size` 与高度、字号、圆角、padding 等外观属性时，必须遵守仓库已有尺寸优先级规则。

## 样式属性

颜色属性统一使用完整语义，避免缩写和裸词。

| 场景 | 推荐命名 | 不再新增 |
| --- | --- | --- |
| 通用背景色 | `backgroundColor` | `background` |
| 输入区域背景色 | `inputBackgroundColor` | `background` |
| 头像背景色 | `avatarBackgroundColor` | `color` 表达头像背景 |
| 局部背景色 | `headerBackgroundColor`、`itemHoverBackgroundColor` | `headerBgColor`、`itemHoverBgColor` |
| 文字色 | `textColor`、`activeTextColor` | `color` 表达文字色 |
| 主题色、强调色 | `accentColor` | `color` 表达主题或强调 |
| 选中色 | `checkedColor`、`selectedColor` | `color` 表达选中状态 |
| 边框色 | `borderColor`、`activeBorderColor` | `border` 表达颜色 |
| 图标色 | `iconColor`、`activeIconColor` | 只有图标组件可使用裸 `color` |
| 柔和色、弱文本色 | `softColor`、`mutedTextColor` | 缺少对象前缀的 `mutedColor` |

圆角属性按作用范围命名：

- 整个组件容器圆角统一用 `radius`。
- 局部圆角用 `partRadius`，例如 `itemRadius`、`panelDayRadius`、`topbarRadius`。
- 公开属性不要再用 `borderRadius` 表达整体组件圆角。

边框与阴影属性：

- 边框宽度用 `borderWidth`，边框色用 `borderColor`。
- 局部边框使用 `headerBorderColor`、`controlBorderColor` 这类对象前缀。
- 阴影使用 `shadow` 或 `partShadow`，不要用 `boxShadow` 作为公开 Props 名。

## 布尔属性

布尔属性必须让名称能直接读出开关含义。

| 场景 | 推荐命名 | 说明 |
| --- | --- | --- |
| 是否展示 | `showXxx` | 例如 `showHeader`、`showClose`。 |
| 是否隐藏 | `hideXxx` | 只在默认展示且需要反向开关时使用，避免大量新增。 |
| 是否启用功能 | `enableXxx` | 例如 `enableSmsLogin`。 |
| 是否允许操作 | `allowXxx` | 例如 `allowDrag`、`allowDrop`。 |
| 判断回调 | `canXxx` | 只用于函数谓词，例如 `canDeleteNodeById`。 |
| 能力状态 | `disabled`、`readonly`、`loading` | 不加 `is` 前缀。 |

公开 Props 不新增 `isDisabled`、`isLoading`、`visibleFlag` 这类状态式命名；CSS 状态类继续使用 `is-disabled`、`is-loading`。

## 浮层属性

跨容器显示、Teleport 到 `body`、`position: fixed` 或承担遮罩/全局反馈职责的组件，必须同时遵守统一层级规范和下列命名规则。

| 场景 | 推荐命名 | 不再使用 |
| --- | --- | --- |
| 是否 Teleport | `teleported` | `appendToBody` |
| Teleport 目标 | `teleportTo` | 无 |
| 浮层层级 | `zIndex` | `dropdownZIndex`、`popperZIndex` |
| 浮层最大宽度 | `popperMaxWidth` 或业务前缀 | 避免每个组件自造名称 |
| 浮层背景色 | `popperBackgroundColor` 或业务前缀 | `dropdownBackgroundColor` 仅限旧下拉语义 |

新增普通弹层默认使用 `overlayZIndex.popper` 或 `--x-z-index-popper`；反馈浮层默认层级必须从 `overlayZIndex` 读取。

普通弹层的尺寸与背景统一使用 `popperWidth`、`popperMaxWidth`、`popperMaxHeight`、`popperBackgroundColor`。可受控的显示或展开状态统一使用可选 `modelValue` 与 `update:modelValue`；未传入时由组件管理状态，初始值使用 `defaultModelValue`。

## 类型、事件和插槽

- 公开 Props 接口统一命名为 `ComponentProps`，例如 `ButtonProps`、`DatePickerProps`。
- 公开选项类型按语义命名，例如 `SelectOption`、`TreeNodeData`，不要导出泛化的 `Item`、`Data`。
- 枚举联合类型使用 `ComponentField`，例如 `ButtonVariant`、`MessageType`。
- 事件载荷类型使用 `ComponentEventPayload` 或 `ComponentActionPayload`，例如 `TableAppendRowPayload`。
- `v-model` 事件固定为 `update:modelValue`，其它事件优先使用清晰动词或动词短语，例如 `change`、`clear`、`row-click`、`column-resize`。
- 插槽命名优先使用语义名，例如 `default`、`header`、`footer`、`prefix`、`suffix`、`empty`、`action`。
- `expose` 方法使用动词开头，例如 `focus`、`blur`、`validate`、`resetFields`、`scrollTo`。
- 组件对外提供事件、插槽或 expose 时，应分别导出 `ComponentEmits`、`ComponentSlots`、`ComponentExpose` 类型，并让实现直接引用该类型。

## 避免裸语义属性

以下属性不是禁用词，但新增公开接口时必须先确认上下文足够明确。

| 属性 | 风险 | 推荐处理 |
| --- | --- | --- |
| `type` | 各组件含义不同 | 原生输入类型可保留；视觉形态用 `variant`，反馈状态用 `status`，业务类型加前缀。 |
| `color` | 可能是文字、图标、主题或强调色 | 使用 `textColor`、`iconColor`、`accentColor` 等更明确名称。 |
| `background` | 可能是色值、图片、渐变或 CSS 简写 | 通用色值用 `backgroundColor`，输入区域用 `inputBackgroundColor`，复杂背景用业务前缀。 |
| `value` | 容易和 `modelValue` 冲突 | 主绑定值用 `modelValue`，选项值才用 `value`。 |
| `label` | 容易和表单项、选项、节点文本混淆 | 数据结构中可保留；组件显示文案用 `title`、`description` 或业务前缀。 |
| `items` / `options` | 列表语义容易重叠 | 选项选择类用 `options`，导航或结构化条目用 `items`。 |

## 当前审计摘要

截至最近一次 `pnpm api:naming:audit:write`，仓库公开组件 Props 接口统计如下：

| 项 | 数量 |
| --- | ---: |
| 公开组件 Props 接口 | 56 |
| 有效 Props 出现次数 | 1466 |
| 唯一 Props 名称 | 516 |
| 直接声明唯一字段 | 454 |
| 命中审计规则次数 | 0 |
| legacy 命中次数 | 0 |
| review 命中次数 | 0 |

本轮已完成以下命名族清理，后续新增或修改公开属性必须继续保持命中数为 0：

- 背景命名：统一使用 `backgroundColor`、`inputBackgroundColor`、`activeBackgroundColor`、`tabBackgroundColor` 等完整名称。
- 圆角命名：整体圆角统一使用 `radius`，局部圆角使用 `topbarRadius`、`itemRadius` 等对象前缀。
- 浮层命名：统一使用 `teleported`、`teleportTo`、`zIndex`。
- 尺寸填充命名：统一使用 `fullHeight`、`contentFullHeight`、`tabStretch`。
- 颜色命名：主题色使用 `accentColor`，选中色使用 `checkedColor`，头像背景使用 `avatarBackgroundColor`；`XIcon.color` 作为图标颜色惯例保留。
- 泛化词：视觉形态使用 `variant`，反馈状态使用 `status`；原生输入 `type`、选项/表单项中的 `value`、`label` 可按行业惯例保留。

## 审计脚本

仓库提供可复跑的命名审计脚本，用于检查公开组件 Props 是否命中 legacy 或待复核命名：

```bash
pnpm api:naming:audit
pnpm api:naming:audit:write
pnpm api:naming:audit:check
```

- `pnpm api:naming:audit`：在终端输出汇总。
- `pnpm api:naming:audit:write`：重新生成 `docs/guide/api-naming-audit.md`。
- `pnpm api:naming:audit:check`：检查 `legacy` 与 `review` 命中数是否都保持为 0。
- 审计报告是回归门禁；新增组件和新增公开属性不得增加新的命中项。
