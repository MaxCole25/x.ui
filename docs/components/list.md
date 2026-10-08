<script setup lang="ts">
import Example1 from '../examples/list/Example1.vue'
import Example1Source from '../examples/list/Example1.vue?raw'
import Example2 from '../examples/list/Example2.vue'
import Example2Source from '../examples/list/Example2.vue?raw'
import Example3 from '../examples/list/Example3.vue'
import Example3Source from '../examples/list/Example3.vue?raw'
import Example4 from '../examples/list/Example4.vue'
import Example4Source from '../examples/list/Example4.vue?raw'
import Example5 from '../examples/list/Example5.vue'
import Example5Source from '../examples/list/Example5.vue?raw'
</script>
# 列表 List

`XList` 用于展示可点击选择的信息块列表，适合消息入口、任务队列、业务对象摘要和需要在列表中选中某一项的场景。

## 使用示例

### 基础用法

默认使用整行信息列表：内边距为 `12px 16px`、图标区域为 `36px`，标题与说明之间留有间距，条目之间默认保留 `8px` 间距。基础使用无需编写样式，调整条目间距可使用 `:item-gap="12"`。选中态使用浅底色和左侧细标记，说明与状态保持清晰的文字层次。

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 插槽替换

可以通过局部插槽替换标题、说明、图标和右侧内容，也可以使用 `item` 插槽接管整项结构。

<XDocDemo title="插槽替换" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 无边框列表

默认条目占满整行，图标、标题说明和右侧状态保持统一对齐。设置 `:bordered="false"` 可以去掉列表外边框与行分隔线，适合放入已有边框的卡片或面板。

<XDocDemo title="无边框列表" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 滚动加载更多

组件只在滚动接近底部时触发 `load-more`，数据请求、追加、加载中和完成状态由父组件维护。

<XDocDemo title="滚动加载更多" :code="Example4Source">
  <Example4 />
</XDocDemo>

### 拖拽排序

开启 `draggable` 后，信息块可以拖拽到其它信息块前后。组件不会直接改写 `items`，拖拽完成时会触发 `item-reorder`，业务侧使用事件中的 `items` 更新数据源顺序。

<XDocDemo title="拖拽排序" :code="Example5Source">
  <Example5 />
</XDocDemo>

### 类型

#### ListItem

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

#### ListItemReorderPayload

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

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前选中项值，支持 `v-model` | `ListItemValue` | `—` | — |
| `items` | 按本次拖拽结果计算出的新数组 | `ListItem[]` | `() => []` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `finishedText` | 加载完成文案 | `string` | `'没有更多了'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `height` | 列表高度，设置后列表自身滚动 | `ListSizeValue` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `maxHeight` | 列表最大高度，设置后列表自身滚动 | `ListSizeValue` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `enableEqualItemHeight` | 是否让所有信息块按最高内容统一高度，默认按内容自适应 | `boolean` | `false` | — |
| `itemGap` | 条目之间的间距，无需额外编写 CSS | `ListSizeValue` | `8` | 数字为 px；字符串使用 CSS 单位 |
| `loadOffset` | 距离底部多少像素内触发 `load-more` | `number` | `80` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `bordered` | 是否显示列表外边框与行分隔线 | `boolean` | `true` | — |
| `itemRadius` | 条目圆角 | `ListSizeValue` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `padding` | 信息块内部内边距 | `ListSizeValue` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `titleFontSize` | 标题字号 | `ListSizeValue` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `titleTextColor` | 标题颜色 | `string` | `—` | — |
| `descriptionFontSize` | 描述字号 | `ListSizeValue` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `descriptionTextColor` | 描述颜色 | `string` | `—` | — |
| `iconFontSize` | 图标字号 | `ListSizeValue` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `iconTextColor` | 图标颜色 | `string` | `—` | — |
| `extraFontSize` | 右侧内容字号 | `ListSizeValue` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `extraTextColor` | 右侧内容颜色 | `string` | `—` | — |
| `activeBackgroundColor` | 选中背景色 | `string` | `—` | — |
| `activeBorderColor` | 选中项左侧标记颜色 | `string` | `—` | — |
| `activeTextColor` | 选中文字色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用当前项 | `boolean` | `false` | — |
| `hoverable` | 是否显示悬停反馈 | `boolean` | `true` | — |
| `loading` | 是否正在加载更多 | `boolean` | `false` | — |
| `loadingText` | 加载中文案 | `string` | `'加载中'` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `draggable` | 是否允许当前项作为拖拽源，优先级高于列表级 `draggable` | `boolean` | `false` | — |
| `finished` | 是否已加载完成 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 选中值变化 | `[value: ListItemValue]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 选中项变化，返回 `(value, item)` | `[value: ListItemValue, item: ListItem]` |
| `item-click` | 点击可用项时触发，返回 `{ item, index, active, disabled, event }` | `[payload: ListItemClickPayload]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `item-reorder` | 拖拽排序完成时触发，返回 `ListItemReorderPayload`，业务侧应使用 `items` 更新数据源 | `[payload: ListItemReorderPayload]` |
| `load-more` | 滚动接近底部且非加载中、非完成时触发 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `icon` | 文本图标 | `无作用域参数` |
| `title` | 标题 | `无作用域参数` |
| `description` | 说明 | `无作用域参数` |

### 状态与交互

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `loading` | 是否正在加载更多 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `item` | 被拖拽的信息块 | `无作用域参数` |
| `extra` | 右侧内容 | `无作用域参数` |
| `action` | 自定义右侧操作区 | `无作用域参数` |
| `finished` | 是否已加载完成 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### ListItemValue

```ts
export type ListItemValue = string | number
```

### ListFontSize

```ts
export type ListFontSize = number
```

### ListReorderPosition

```ts
export type ListReorderPosition = 'before' | 'after'
```

### ListItem

```ts
export interface ListItem {
  value: ListItemValue
  title?: string
  description?: string
  icon?: string
  avatar?: string
  extra?: string | number
  disabled?: boolean
  draggable?: boolean
}
```

### ListItemSlotProps

```ts
export interface ListItemSlotProps {
  item: ListItem
  index: number
  active: boolean
  disabled: boolean
}
```

### ListItemClickPayload

```ts
export interface ListItemClickPayload extends ListItemSlotProps {
  event: MouseEvent
}
```

### ListItemReorderPayload

```ts
export interface ListItemReorderPayload {
  item: ListItem
  targetItem: ListItem
  fromIndex: number
  toIndex: number
  sourceValue: ListItemValue
  targetValue: ListItemValue
  position: ListReorderPosition
  items: ListItem[]
}
```

### ListProps

```ts
export interface ListProps {
  modelValue?: ListItemValue
  items?: ListItem[]
  disabled?: boolean
  draggable?: boolean
  fontSize?: number
  height?: ListSizeValue
  maxHeight?: ListSizeValue
  bordered?: boolean
  hoverable?: boolean
  enableEqualItemHeight?: boolean
  itemGap?: ListSizeValue
  itemRadius?: ListSizeValue
  padding?: ListSizeValue
  titleFontSize?: ListSizeValue
  titleTextColor?: string
  descriptionFontSize?: ListSizeValue
  descriptionTextColor?: string
  iconFontSize?: ListSizeValue
  iconTextColor?: string
  extraFontSize?: ListSizeValue
  extraTextColor?: string
  activeBackgroundColor?: string
  activeBorderColor?: string
  activeTextColor?: string
  loading?: boolean
  loadingText?: string
  finished?: boolean
  finishedText?: string
  loadOffset?: number
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### ListSizeValue

```ts
export type ListSizeValue = string | number
```

## 验收说明

1. 点击可用项，确认选中态和 `v-model` 同步变化。
2. 点击禁用项，确认不会触发选择。
3. 切换局部插槽和整项插槽，确认内容可以替换且布局不溢出。
4. 检查无图标、无右侧状态、长说明和长状态文字时布局仍正常，条目统一占满整行；选中项应显示浅色背景与左侧细标记。
5. 设置 `height` 后滚动到底部，确认只在非 `loading`、非 `finished` 时触发 `load-more`。
6. 开启 `enableEqualItemHeight`，确认所有信息块高度统一，右侧 `extra` 内容保持横向右对齐。
7. 开启 `draggable` 后拖动信息块到其它项前后，确认插入线、`item-reorder` 事件和业务侧更新后的顺序正确；禁用项不能被拖起，但可以作为落点。
