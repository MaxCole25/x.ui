<script setup lang="ts">
import { ref } from 'vue'

const current = ref('audit')
const alignCurrent = ref('notice-1')
const lazyCurrent = ref('order')
const dragCurrent = ref('audit')
const loading = ref(false)
const finished = ref(false)
const loadCount = ref(0)
const listItems = [
  { value: 'audit', title: '审核中心', description: '12 条待处理审批，包含合同和付款申请。', icon: '审', extra: '待办 12' },
  { value: 'order', title: '订单同步', description: '最近同步于 09:30，队列运行正常。', icon: '单', extra: '正常' },
  { value: 'risk', title: '风险提醒', description: '命中 3 条高优先级策略，建议尽快复核。', icon: '险', extra: '高' },
  { value: 'archive', title: '归档记录', description: '当前账号暂无归档权限。', icon: '档', extra: '禁用', disabled: true }
]
const lazyItems = ref([...listItems])
const dragItems = ref([...listItems])
const alignedItems = [
  { value: 'notice-1', title: '系统通知', description: '你的申请已经进入复核流程，请留意后续状态变化。', icon: '通', extra: '09:12', align: 'start' },
  { value: 'notice-2', title: '处理记录', description: '已提交补充材料，等待业务方确认。', icon: '记', extra: '09:18', align: 'end' },
  { value: 'notice-3', title: '风险提醒', description: '当前对象命中高优先级策略，需要补充说明后继续流转。', icon: '险', extra: '09:24', align: 'start' },
  { value: 'notice-4', title: '操作完成', description: '复核结果已同步到当前列表。', icon: '完', extra: '09:30', align: 'end' }
]

function loadMore() {
  if (loading.value || finished.value) return
  loading.value = true
  window.setTimeout(() => {
    loadCount.value += 1
    lazyItems.value = [
      ...lazyItems.value,
      { value: `more-${loadCount.value}`, title: `追加信息 ${loadCount.value}`, description: '父组件请求完成后追加到 items。', icon: '新', extra: '新增' }
    ]
    loading.value = false
    finished.value = loadCount.value >= 3
  }, 600)
}

function handleItemReorder(payload) {
  dragItems.value = payload.items
}

const basicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const current = ref('audit')
const items = [
  { value: 'audit', title: '审核中心', description: '12 条待处理审批。', icon: '审', extra: '待办 12' },
  { value: 'order', title: '订单同步', description: '队列运行正常。', icon: '单', extra: '正常' }
]
<\/script>

<XList v-model="current" :items="items" />`

const slotCode = `<XList v-model="current" :items="listItems">
  <template #extra="{ item, active }">
    <span :style="{ color: active ? '#0284c7' : '#64748b' }">{{ item.extra }}</span>
  </template>
</XList>`

const alignCode = `<XList
  v-model="alignCurrent"
  :items="alignedItems"
  item-content-max-width="72%"
/>

<XList
  v-model="alignCurrent"
  :items="alignedItems"
  item-content-width-mode="equal"
  item-content-max-width="72%"
/>`

const lazyCode = `<XList
  v-model="lazyCurrent"
  :items="lazyItems"
  height="220px"
  :loading="loading"
  :finished="finished"
  @load-more="loadMore"
/>`

const draggableCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const current = ref('audit')
const items = ref([
  { value: 'audit', title: '审核中心', description: '12 条待处理审批。', icon: '审', extra: '待办 12' },
  { value: 'order', title: '订单同步', description: '队列运行正常。', icon: '单', extra: '正常' },
  { value: 'risk', title: '风险提醒', description: '命中 3 条高优先级策略。', icon: '险', extra: '高' }
])

function handleItemReorder(payload) {
  items.value = payload.items
}
<\/script>

<XList
  v-model="current"
  draggable
  :items="items"
  @item-reorder="handleItemReorder"
/>`
</script>

# 列表 List

`XList` 用于展示可点击选择的信息块列表，适合消息入口、任务队列、业务对象摘要和需要在列表中选中某一项的场景。

## 基础用法

<XDocDemo title="基础用法" :code="basicCode">
  <XList v-model="current" :items="listItems" />
</XDocDemo>

## 插槽替换

可以通过局部插槽替换标题、说明、图标和右侧内容，也可以使用 `item` 插槽接管整项结构。

<XDocDemo title="插槽替换" :code="slotCode">
  <XList v-model="current" :items="listItems">
    <template #extra="{ item, active }">
      <span :style="{ color: active ? '#0284c7' : '#64748b', fontWeight: active ? 700 : 400 }">{{ item.extra }}</span>
    </template>
  </XList>
</XDocDemo>

## 内容块对齐

条目按钮仍然占满整行，`align` 只影响按钮内部的内容块。可以通过单条 `item.align` 控制靠左、靠右或铺满；`itemContentWidthMode` 默认为 `auto`，内容块按内容自适应，设置为 `equal` 后左右信息块使用统一宽度。

<XDocDemo title="内容块对齐" :code="alignCode">
  <div style="display: grid; gap: 14px; width: 100%;">
    <XList
      v-model="alignCurrent"
      :items="alignedItems"
      item-content-max-width="72%"
    />
    <XList
      v-model="alignCurrent"
      :items="alignedItems"
      item-content-width-mode="equal"
      item-content-max-width="72%"
    />
  </div>
</XDocDemo>

## 滚动加载更多

组件只在滚动接近底部时触发 `load-more`，数据请求、追加、加载中和完成状态由父组件维护。

<XDocDemo title="滚动加载更多" :code="lazyCode">
  <XList
    v-model="lazyCurrent"
    :items="lazyItems"
    height="220px"
    :loading="loading"
    :finished="finished"
    @load-more="loadMore"
  />
</XDocDemo>

## 拖拽排序

开启 `draggable` 后，信息块可以拖拽到其它信息块前后。组件不会直接改写 `items`，拖拽完成时会触发 `item-reorder`，业务侧使用事件中的 `items` 更新数据源顺序。

<XDocDemo title="拖拽排序" :code="draggableCode">
  <XList
    v-model="dragCurrent"
    draggable
    :items="dragItems"
    @item-reorder="handleItemReorder"
  />
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前选中项值，支持 `v-model` | `ListItemValue` | - |
| items | 信息块列表 | `ListItem[]` | `[]` |
| disabled | 是否整体禁用 | `boolean` | `false` |
| draggable | 是否允许信息块拖拽排序 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| height | 列表高度，设置后列表自身滚动 | `number \| string` | - |
| maxHeight | 列表最大高度，设置后列表自身滚动 | `number \| string` | - |
| bordered | 是否显示条目边框 | `boolean` | `true` |
| hoverable | 是否显示悬停反馈 | `boolean` | `true` |
| enableEqualItemHeight | 是否让所有信息块按最高内容统一高度，默认按内容自适应 | `boolean` | `false` |
| itemAlign | 默认条目内容块对齐方式，单条 `item.align` 优先级更高 | `start \| end \| stretch` | `stretch` |
| itemContentWidthMode | 条目内容块宽度模式，`auto` 按内容自适应，`equal` 使用统一宽度 | `auto \| equal` | `auto` |
| itemContentWidth | 条目内容块宽度 | `number \| string` | - |
| itemContentMaxWidth | 条目内容块最大宽度 | `number \| string` | - |
| itemRadius | 条目圆角 | `number \| string` | 按尺寸 |
| activeBackgroundColor | 选中背景色 | `string` | - |
| activeBorderColor | 选中边框色 | `string` | - |
| activeTextColor | 选中文字色 | `string` | - |
| loading | 是否正在加载更多 | `boolean` | `false` |
| loadingText | 加载中文案 | `string` | `加载中` |
| finished | 是否已加载完成 | `boolean` | `false` |
| finishedText | 加载完成文案 | `string` | `没有更多了` |
| loadOffset | 距离底部多少像素内触发 `load-more` | `number` | `80` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 选中值变化 |
| change | 选中项变化，返回 `(value, item)` |
| item-click | 点击可用项时触发，返回 `{ item, index, active, disabled, event }` |
| item-reorder | 拖拽排序完成时触发，返回 `ListItemReorderPayload`，业务侧应使用 `items` 更新数据源 |
| load-more | 滚动接近底部且非加载中、非完成时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| item | 接管整项内容，参数 `{ item, index, active, disabled }` |
| icon | 自定义图标或头像区域 |
| title | 自定义标题 |
| description | 自定义说明 |
| extra | 自定义右侧内容，默认右对齐并横向显示 |
| action | 自定义右侧操作区 |
| loading | 自定义加载中提示 |
| finished | 自定义加载完成提示 |

## 类型

### ListItem

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| value | 选中值 | `string \| number` |
| title | 标题 | `string` |
| description | 说明 | `string` |
| icon | 文本图标 | `string` |
| avatar | 头像图片地址 | `string` |
| extra | 右侧内容 | `string \| number` |
| disabled | 是否禁用当前项 | `boolean` |
| draggable | 是否允许当前项作为拖拽源，优先级高于列表级 `draggable` | `boolean` |
| align | 当前条目内容块对齐方式，优先级高于 `itemAlign` | `start \| end \| stretch` |

### ListItemReorderPayload

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| item | 被拖拽的信息块 | `ListItem` |
| targetItem | 放置目标信息块 | `ListItem` |
| fromIndex | 原始索引 | `number` |
| toIndex | 建议插入后的索引 | `number` |
| sourceValue | 被拖拽项值 | `ListItemValue` |
| targetValue | 目标项值 | `ListItemValue` |
| position | 放置在目标项之前或之后 | `before \| after` |
| items | 按本次拖拽结果计算出的新数组 | `ListItem[]` |

## 手动验收建议

1. 点击可用项，确认选中态和 `v-model` 同步变化。
2. 点击禁用项，确认不会触发选择。
3. 切换局部插槽和整项插槽，确认内容可以替换且布局不溢出。
4. 设置 `item.align`、`itemContentWidthMode` 和 `itemContentMaxWidth`，确认内容块左右对齐时按钮点击区域仍占满整行，且可在自适应宽度与统一宽度之间切换。
5. 设置 `height` 后滚动到底部，确认只在非 `loading`、非 `finished` 时触发 `load-more`。
6. 开启 `enableEqualItemHeight`，确认所有信息块高度统一，右侧 `extra` 内容保持横向右对齐。
7. 开启 `draggable` 后拖动信息块到其它项前后，确认插入线、`item-reorder` 事件和业务侧更新后的顺序正确；禁用项不能被拖起，但可以作为落点。
