# 公开属性命名审计

本报告由 `pnpm api:naming:audit:write` 生成，用于记录当前公开组件 Props 的命名治理状态。报告只统计 `src/components/**/src/types.ts` 中导出的组件 `*Props`，并排除 `XlTableProps` 兼容别名，避免重复计算 `TableProps`。

pre-1.0 阶段不保留旧命名兼容，`legacy` 和 `review` 命中数都必须保持为 0。新增组件和新增公开属性应优先遵守 [公开接口命名规范](/guide/api-naming)。

生成日期：2026-06-01

## 汇总

| 项 | 数量 |
| --- | --- |
| 公开组件 Props 接口 | 56 |
| 有效 Props 出现次数 | 1466 |
| 唯一 Props 名称 | 516 |
| 直接声明唯一字段 | 454 |
| 命中审计规则次数 | 0 |
| legacy 命中次数 | 0 |
| review 命中次数 | 0 |

## 规则命中

| 规则 | 级别 | 属性名数 | 出现次数 | 接口数 | 建议 |
| --- | --- | --- | --- | --- | --- |
| 裸 background 属性 | legacy | 0 | 0 | 0 | 通用色值使用 backgroundColor；输入区域使用 inputBackgroundColor；复杂背景使用带业务前缀的明确名称。 |
| BgColor 缩写 | legacy | 0 | 0 | 0 | 使用完整的 BackgroundColor 后缀，例如 activeBackgroundColor。 |
| BorderRadius 圆角命名 | legacy | 0 | 0 | 0 | 整体圆角使用 radius，局部圆角使用 partRadius，例如 topbarRadius。 |
| appendToBody 浮层开关 | legacy | 0 | 0 | 0 | 新增浮层统一使用 teleported 和 teleportTo。 |
| 组件特定 z-index 命名 | legacy | 0 | 0 | 0 | 新增浮层优先使用 zIndex，并从 overlayZIndex 读取默认值。 |
| 填充尺寸开关 | legacy | 0 | 0 | 0 | 撑满父容器优先使用 fullHeight，局部内容撑满使用 contentFullHeight，页签拉伸使用 tabStretch。 |
| 裸 color 属性 | legacy | 0 | 0 | 0 | 图标组件外不要新增裸 color；主题色使用 accentColor，选中色使用 checkedColor，头像背景使用 avatarBackgroundColor，文字色使用 textColor。 |
| 裸 type 视觉/状态属性 | legacy | 0 | 0 | 0 | 视觉形态使用 variant，反馈状态使用 status；原生输入 type 可保留。 |
| 泛化裸词 | review | 0 | 0 | 0 | 新增时先确认上下文足够明确；不明确时加业务前缀或改用更具体名称。 |

## 属性明细

| 规则 | 级别 | 属性 | 出现次数 | 接口 | 声明位置 |
| --- | --- | --- | --- | --- | --- |
