<script setup lang="ts">
import Example1 from '../examples/gantt/Example1.vue'
import Example1Source from '../examples/gantt/Example1.vue?raw'
</script>

# 甘特图 Gantt

`XGantt` 展示项目任务树及可编辑时间轴，支持日、周、月视图，里程碑、进度、依赖线、虚拟滚动及工作日自动排程。工具栏的“设置”提供工作日历、排程与只读配置。资源排程尚未提供界面。

## 使用示例

拖动任务主体移动日期，拖动两侧调整起止日期，拖动下方菱形调整进度。按 Esc 取消。双击任务可通过事件打开业务编辑表单。

<XDocDemo title="项目计划与异步保存" :code="Example1Source">
  <Example1 />
</XDocDemo>

从 `@x-soft88/x-ui` 导入 `XGantt`，并在应用入口导入 `@x-soft88/x-ui/style.css`。使用 `v-model:tasks` 接收编辑结果。

## 数据模型与日期语义

### GanttTask

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id | `string \| number` | 必填，唯一且稳定。数字 1 与字符串 '1' 是不同 ID |
| parentId | `string \| number` | 可选，引用父任务，支持多级树 |
| title | `string` | 必填，任务名称 |
| start / end | `string` | 必填，严格的 `YYYY-MM-DD` 日期 |
| progress | `number` | 0～100，默认 0，非法值按 0 处理，越界值截断 |
| workdayDuration | `number` | 可选，普通任务为正整数工作日工期，里程碑为 0；首次排程按原日历推导并通过 tasks 输出 |
| taskType | `'task' \| 'summary' \| 'milestone'` | 默认普通任务；汇总任务手动传入日期和进度，不可拖动；里程碑绘制在 start，零工期 |
| barColor | `string` | 自定义任务条颜色，默认主题强调色 |
| readonly | `boolean` | 任务级只读，外部仍可更新 |
| data | `Record<string, unknown>` | 自定义业务字段，例如负责人、设备或订单号 |

日级计划的开始、结束日期均包含：10 月 10 日至 12 日为三天，同日普通任务为一天。内核用民用日期序号和半开区间计算坐标，不依赖本地 24 小时毫秒差，因此夏令时不会改变日级工期。展示不对日期做时区转换。小时级时间戳、混合日期时间、时间区间时区转换留待后续阶段。

手动模式允许跨周末拖动；自动模式保持工作日工期并按工作日历调整结束日期。休息日在时间轴中保留真实宽度，不压缩隐藏。拖动可超出显示范围，保存后自动范围重新适配数据；显式指定的范围继续保持，超出范围的任务会被裁切。

非法日期及反向日期任务不渲染；重复 ID 保留首条；缺失父级按根任务显示；循环层级断开一条关系。通过 `data-error` 通知业务，组件不会修改传入的数据。

### GanttColumn

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| key / title | `string` | 字段名与标题，必填；第一列承担树形缩进 |
| width / minWidth | `number` | px，默认宽 120、最小宽 60 |
| align | `'left' \| 'center' \| 'right'` | 默认左对齐 |
| visible / resizable | `boolean` | 默认显示、允许调整 |
| formatter | `(task: GanttTask) => string` | 自定义格式化，优先于默认字段读取 |

字段先读取任务标准字段，再读取 `data`。`duration` 自动显示含首尾日期的天数，`progress` 自动显示百分比。列总宽超过左侧宽度时，底部滑动条用于独立横向浏览表格列。

### GanttDependency

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| id / from / to | `GanttId` | 唯一依赖 ID、源任务 ID、目标任务 ID |
| dependencyType | `'FS' \| 'SS' \| 'FF' \| 'SF'` | 默认 FS，决定依赖线连接起点或终点 |
| lag / lagUnit | `number` / `'day'` | 有符号整数工作日偏移，默认 0；自动排程执行约束 |

依赖在独立数组中管理，移动任务后自动更新连线。折叠隐藏任务的关联线也隐藏。展示时过滤并报告无效依赖；自动排程遇到无效引用、自环、循环或汇总任务依赖时整体拒绝。尚不提供鼠标创建、删除依赖。

`GanttResource`（id、name、capacity、data）和 `GanttAssignment`（id、taskId、resourceId、start、end、quantity）是资源扩展类型，当前不作为 Props，也不代表已实现资源视图。

## 属性

### 数据与状态

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| tasks | `GanttTask[]` | `[]` | 任务数组，支持 v-model:tasks |
| dependencies | `GanttDependency[]` | `[]` | 独立依赖数据 |
| columns | `GanttColumn[]` | 名称、开始、结束 | 自定义表格列 |
| selectedTaskId | `GanttId \| null` | 内部管理 | 支持 v-model:selectedTaskId |
| expandedTaskIds | `GanttId[]` | 初始全部展开 | 支持 v-model:expandedTaskIds，未传入时内部管理 |
| readonly / disabled | `boolean` | `false` | 只读阻止编辑；禁用同时阻止选择和界面操作 |
| canEditTask | `(task, action) => boolean` | — | 对移动、起止调整、进度修改分别控制权限 |
| beforeTaskChange | `(change) => boolean \| void \| Promise<boolean \| void>` | — | 提交前异步业务回调，false 或异常拒绝变更 |
| beforeScheduleChange | `(change: GanttScheduleChangePayload) => boolean \| void \| Promise<boolean \| void>` | — | 自动排程批量保存入口，false 或异常整体拒绝任务和设置变更 |

### 时间与日历

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| view | `'day' \| 'week' \| 'month'` | `'day'` | 支持 v-model:view |
| zoom | `number` | `1` | 缩放倍率，实际限制 0.25～4，支持 v-model:zoom |
| startDate / endDate | `string` | 自动范围 | 首尾包含的日期，可单独指定；未指定范围在任务前后留白 |
| weekStartsOn | `number` | `1` | 周起始日，0～6，0 为周日 |
| locale | `string` | `'zh-CN'` | Intl 日期表头语言，如 en-US |
| calendar | `{ weekendDays?: number[]; holidays?: string[]; workingDates?: string[] }` | 周六日休息 | 工作日期覆盖节假日与周末标记，日期格式同任务 |
| enableAutoSchedule | `boolean` | `false` | 开启工作日及依赖自动排程，支持 v-model:enableAutoSchedule |
| scheduleStartDate | `string` | 初始最早任务日期，无任务时为今天 | 项目起始日期，与时间轴 startDate 独立，支持 v-model:scheduleStartDate |

### 布局与外观

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| height | `number \| string` | `520` | 整体高度，数字为 px，字符串支持 100% |
| rowHeight | `number` | `40` | 行高 px，至少 28，左右统一使用 |
| tableWidth | `number` | `450` | 左侧宽度 px，至少 160，支持 v-model:tableWidth |
| fontSize | `number` | `14` | 字号 px，与行高独立 |
| radius | `number` | `6` | 整体圆角 px |
| accentColor | `string` | `--x-color-primary` | 强调色，示例采用 #0b806a |
| showToolbar / showFooter | `boolean` | `true` | 工具栏与统计信息 |
| showSettings | `boolean` | `true` | 默认工具栏显示设置按钮；自定义工具栏通过 openSettings 打开 |
| showToday / showWeekends | `boolean` | `true` | 今天线和非工作日背景 |
| showProgress / showDependencies | `boolean` | `true` | 进度与依赖展示 |

明暗主题复用组件库 `--x-color-surface`、`--x-color-text`、`--x-color-border` 等变量。可覆盖 `--x-gantt-accent` 定制局部强调色。

`calendar`、`readonly`、`enableAutoSchedule`、`scheduleStartDate`、`showToday`、`showWeekends`、`showProgress`、`showDependencies` 未传入时内部管理；传入时是受控属性，请配合对应 `v-model` 或 `update:*` 事件接收面板修改。组件不会写入浏览器存储，持久化由业务处理。

## 设置与自动排程

点击齿轮图标“设置”打开模态面板，按排程、工作日历、编辑与显示分组。每周休息可选择无固定休息日、单休、双休或自定义；单休默认周日，可改为其他星期。工具栏的适配、全部展开、全部折叠、设置使用图标显示，悬停可查看操作名称，键盘与读屏名称保持完整。

“法定节假日”提供中国大陆 2025、2026 年的选项，可选择元旦、春节、清明、劳动、端午、中秋、国庆或全年假期（2025 年国庆与中秋合并）。选择后将公布的放假调休区间及对应补班日期加入草稿，去重并保留已有自定义日期；点击“应用”才生效。年份默认匹配项目起始日期，不在内置范围时默认显示 2026 年，不推算其他年度。其他年份可由业务传入或手动维护。日期依据 [2025 年官方通知](https://www.forestry.gov.cn/c/www/szxx/594663.jhtml)及 [2026 年官方通知](https://www.beijing.gov.cn/zhengce/zhengcefagui/202511/t20251104_4258873.html)，可在面板直接打开对应来源。

节假日和补班日期仍支持手动添加、删除。补班日期优先于节假日和周休；选择预设不覆盖已有的自定义补班规则。法定节假日选择复用 `calendar` 和 `update:calendar`，无需增加公开属性，Histoire 的外观接口可直接打开设置验收。

“应用”才提交草稿，“取消”、关闭和 Esc 丢弃草稿。只读时禁止任务编辑和排程，仍可滚动、定位及调整显示；取消只读后应用可以恢复编辑。批量保存中禁止再次应用或关闭设置。

自动排程默认关闭。开启后，应用排程或日历设置、编辑任务日期、点击“重新排程”都会计算任务日期。外部更新 tasks、dependencies 或设置只刷新图表，不自动执行保存。程序可调用 `reschedule()` 主动排程，该方法在手动模式也可执行一次排程，不改变自动开关。

- 普通任务首次按原日历统计含首尾的工作日工期，至少一天；`workdayDuration` 随任务输出。切换日历和移动任务保留工期，调整起止日期重新计算工期。里程碑零工期。
- 原开始日期与项目起始日期中较晚者为下限，休息日顺延；依赖按拓扑顺序处理，多前置取最晚约束。
- FS：前置结束后的下一工作日开始；SS：不早于前置开始；FF：结束不早于前置结束；SF：结束不早于前置开始。lag 按工作日计算，可正可负。里程碑的开始和结束为同一日期点。
- `taskType: 'summary'` 的父任务日期自下而上汇总并覆盖全部后代，进度仍由业务维护。普通任务即使带子任务也保留自己的工期。依赖仅连接普通任务和里程碑。
- 任务级只读或 `canEditTask(task, 'move')` 返回 false 的任务保持日期固定。如果无法满足依赖、项目起点或父任务汇总约束，整个排程拒绝并提示冲突任务。

自动模式的日期编辑只调用 `beforeScheduleChange`，不逐条调用 `beforeTaskChange`。手动模式和进度编辑仍使用单任务回调。批量参数包含 `previousTasks`、建议 `tasks`、日期变化列表 `changes`、`previousSettings`、建议 `settings` 和 `reason`（settings、edit、reschedule）。业务在回调中一次保存任务及设置，通过后组件发出 `update:tasks`、相关设置的 `update:*` 与 `schedule-change`；拒绝或异常发出 `schedule-reject`，原任务和已应用设置保持不变。若日期没有变化，不调用批量保存回调，但仍输出首次推导的工期。

保存期间任务、依赖、设置或编辑权限发生变化时，旧结果拒绝提交，避免覆盖较新数据。失败时面板保留草稿以便重试。非法排程数据通过 `schedule-reject.issues` 报告，未生成建议结果时 `change` 为空。

## 编辑与保存

组件不会修改 Props。拖动时只更新临时预览，移动超过 4px 后才开始编辑，日期按一天吸附。手动模式或进度编辑松开时调用 `beforeTaskChange`，通过后才发出 `update:tasks` 和唯一的业务提交事件 `task-change`。业务只在一个位置执行保存，推荐在 `beforeTaskChange` 中等待 HTTP 请求，再通过 v-model 接收结果。自动模式的日期编辑使用上节的批量保存流程。

`GanttChangePayload` 包含 `task` 建议值、`previous` 原始值和 `action`（move、resize-start、resize-end、progress）。异步期间显示保存状态并阻止再次编辑；失败恢复外部数据，并发出 `task-reject`。如果保存过程中外部已更改同任务的日期或进度，本次提交也拒绝，避免覆盖较新数据。Esc 可取消预览及待处理的组件提交，但不会中断业务方已经发出的 HTTP 请求。

外部直接更新 tasks 会刷新显示；外部拒绝更新 v-model 时，组件恢复原数据。手动模式的汇总任务由业务维护；自动排程会汇总日期并联动依赖任务。

## 事件

| 事件 | 参数 | 说明 |
| --- | --- | --- |
| update:tasks | `GanttTask[]` | 编辑通过后的不可变新数组 |
| update:view / update:zoom | `GanttView` / `number` | 工具栏或程序方法切换 |
| update:selectedTaskId / task-select | `GanttId \| null` | 选择变化，点击时间轴空白清除 |
| update:expandedTaskIds | `GanttId[]` | 展开状态变化 |
| update:tableWidth | `number` | 调整分栏结束 |
| update:calendar | `GanttCalendar` | 应用工作日历 |
| update:readonly / update:enableAutoSchedule | `boolean` | 应用只读或自动排程开关 |
| update:scheduleStartDate | `string` | 应用项目起始日期 |
| update:showToday / update:showWeekends / update:showProgress / update:showDependencies | `boolean` | 应用显示选项 |
| schedule-change | `GanttScheduleChangePayload` | 批量排程通过，仅触发一次 |
| schedule-reject | `GanttScheduleRejectPayload` | issues 为冲突或保存错误，change 为可选建议结果 |
| task-click / task-dblclick | `task, source` | source 为 table 或 bar；拖动后抑制 click |
| task-change / task-reject | `GanttChangePayload` | 编辑提交成功或拒绝，不在拖动中重复提交 |
| zoom-change | `number` | 缩放变化 |
| range-change | `GanttRange` | 可见日期范围变化，适合外部分页或加载 |
| column-resize | `column, width` | 列宽调整结束 |
| data-error | `GanttIssue[]` | 输入数据问题 |

## 插槽

| 插槽 | 参数 | 说明 |
| --- | --- | --- |
| toolbar | `{ view, zoom, fitToTasks, openSettings }` | 替换工具栏并提供设置入口 |
| cell | `{ task, column, value }` | 自定义表格单元格 |
| task | `{ task, selected }` | 自定义任务条内容，定位与编辑由组件管理 |
| milestone | `{ task, selected }` | 自定义里程碑内容 |
| empty | — | 自定义空状态 |
| footer | `{ count, range }` | 自定义底部统计 |

默认悬停提示采用原生 title。任务条是可聚焦的按钮角色，Enter/Space 选择，树展开按钮提供 aria-expanded。键盘移动任务、复杂网格导航、自定义浮层提示与右键菜单尚未提供。

## 实例方法

挂载后通过组件 ref 调用。日期参数为 YYYY-MM-DD，ID 与数据类型保持一致。

| 方法 | 参数 / 返回 | 说明 |
| --- | --- | --- |
| scrollToDate | `(date: string) => void` | 在范围内居中定位；超出范围时定位到最近边界 |
| scrollToTask | `(id: GanttId) => void` | 展开祖先、滚动并选择任务 |
| selectTask | `(id: GanttId \| null) => void` | 设置或清除选择 |
| setRange | `(start: string, end: string) => void` | 设置内部显示范围，覆盖自动范围及日期 Props |
| fitToTasks | `() => void` | 清除内部范围覆盖并调整缩放，显式日期 Props 仍有效 |
| zoomIn / zoomOut | `() => void` | 按 1.25 倍放大或缩小，保持时间中心 |
| expandAll / collapseAll | `() => void` | 展开全部或折叠全部 |
| refresh | `() => void` | 重新测量容器尺寸 |
| getVisibleRange | `() => GanttRange` | 首尾包含的当前可见日期范围 |
| cancelEdit | `() => void` | 取消当前编辑和组件提交 |
| openSettings | `() => void` | 打开设置面板，禁用或保存中不执行 |
| reschedule | `() => Promise<boolean>` | 执行一次批量排程，成功返回 true；只读、禁用、保存中或拒绝返回 false |

## 架构与性能验收

- `core.ts` 独立计算日期序号、双向坐标、树索引、可见树行、刻度和依赖校验，无 Vue/DOM 依赖，未来可供资源时间轴复用。
- 单个滚动容器控制左右纵向位置，固定行高；左侧列头与日期表头固定，左表在横向滚动中保持可见。
- 纵向只渲染当前可见行及缓冲区，日期刻度与非工作日标记按横向视口生成；任务条按横向可见性过滤，依赖只渲染与纵向视口相交的关系。
- 无新增运行时依赖；使用现有 XButton、XEmpty 和统一 ApiPlayground。

在 Histoire 的唯一“外观接口”中切换 20、100、1,000、10,000 任务数据，以及日期边界和空数据。属性、接口、类型、事件均复用统一面板，包含父元素宽高控制。可通过事件日志观察提交次数，通过接口按钮调用定位方法。

手动验收应包括：左右滚动对齐、折叠后任务与依赖隐藏、拖动和左右调整、Esc 取消、进度修改、只读、保存失败、列宽与分栏调整、日周月切换、今天和任务定位、明暗主题。性能检查在浏览器 Performance 面板记录滚动与拖动，核对可见行数量、脚本耗时和长任务；10,000 行数据只用于可执行验收，不据此承诺 60 FPS。

后续阶段：小时/季度/年刻度、依赖创建删除、基线、多选、撤销重做、资源行与容量及关键路径。遵循本次要求未新增或修改测试用例。
