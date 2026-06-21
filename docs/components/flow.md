<script setup lang="ts">
const icons = ['check', 'clock', 'close']

const flowBasicCode = `\x3Cscript setup lang="ts">
const icons = ['check', 'clock', 'close']
<\/script>

<XFlow :items="icons.slice(0, 20)" item-key="id" item-width="72px" :gap="8">
    <template #default="{ item }">
      <div class="flow-demo-icon">
        <XIcon :name="item.name" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </XFlow>`

const flowLazyCode = `\x3Cscript setup lang="ts">
const icons = ['check', 'clock', 'close']
<\/script>

<XFlow
    :items="icons"
    item-key="id"
    item-width="72px"
    height="260px"
    :gap="8"
    :lazy="true"
    :initial-count="80"
    :load-count="40"
  >
    <template #default="{ item }">
      <div class="flow-demo-icon">
        <XIcon :name="item.name" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </XFlow>`

const flowThemeCode = `\x3Cscript setup lang="ts">
const icons = ['check', 'clock', 'close']
<\/script>

<XFlow
    :items="icons.slice(0, 12)"
    item-key="id"
    item-width="88px"
    :gap="10"
    padding="12px"
    background-color="#f8fafc"
    border-color="#d8e2e8"
    :border-width="1"
    radius="8px"
    item-background-color="#ffffff"
    item-border-color="#cbd5e1"
    :item-border-width="1"
    item-radius="6px"
    item-padding="10px"
  >
    <template #default="{ item }">
      <div class="flow-demo-icon">
        <XIcon :name="item.name" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </XFlow>`
</script>

# 流式布局 Flow

`XFlow` 用于按元素最小宽度自动换行，适合图标库、工具入口、卡片选择器和其它数量较多的轻量元素列表。

和 `XGrid` 的固定列数不同，`XFlow` 通过 `itemWidth` 控制每列最小宽度，容器变宽或变窄时会自动增减列数。大量图标场景建议使用 `items` 数据驱动模式，并开启 `lazy` 增量渲染。

## 基础用法

<XDocDemo title="基础用法" :code="flowBasicCode">
  <XFlow :items="icons.slice(0, 20)" item-key="id" item-width="72px" :gap="8">
    <template #default="{ item }">
      <div class="flow-demo-icon">
        <XIcon :name="item.name" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </XFlow>
</XDocDemo>

## 增量渲染

开启 `lazy` 后，组件会先渲染 `initialCount` 条数据，滚动接近底部时再按 `loadCount` 追加。它不是完整虚拟滚动，但对大量图标这类轻量节点更简单稳定。

<XDocDemo title="大量图标增量渲染" :code="flowLazyCode">
  <XFlow
    :items="icons"
    item-key="id"
    item-width="72px"
    height="260px"
    :gap="8"
    :lazy="true"
    :initial-count="80"
    :load-count="40"
  >
    <template #default="{ item }">
      <div class="flow-demo-icon">
        <XIcon :name="item.name" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </XFlow>
</XDocDemo>

## 主题外观

容器和子项都提供配色、边框、圆角、内边距接口，便于在业务主题中统一覆盖。

<XDocDemo title="主题外观" :code="flowThemeCode">
  <XFlow
    :items="icons.slice(0, 12)"
    item-key="id"
    item-width="88px"
    :gap="10"
    padding="12px"
    background-color="#f8fafc"
    border-color="#d8e2e8"
    :border-width="1"
    radius="8px"
    item-background-color="#ffffff"
    item-border-color="#cbd5e1"
    :item-border-width="1"
    item-radius="6px"
    item-padding="10px"
  >
    <template #default="{ item }">
      <div class="flow-demo-icon">
        <XIcon :name="item.name" />
        <span>{{ item.label }}</span>
      </div>
    </template>
  </XFlow>
</XDocDemo>

## Flow Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 数据驱动列表；传入后默认插槽会收到 `item` 和 `index` | `unknown[]` | - |
| itemKey | 子项 key；支持字段名或函数 | `string \| number \| ((item, index) => string \| number)` | - |
| itemWidth | 流式列最小宽度 | `number \| string` | `'72px'` |
| gap | 横竖统一间距，数字按 px 处理 | `number \| string` | - |
| rowGap | 竖向间距，优先级高于 `gap` | `number \| string` | - |
| columnGap | 横向间距，优先级高于 `gap` | `number \| string` | - |
| width | 容器宽度 | `number \| string` | `100%` |
| height | 容器高度 | `number \| string` | - |
| minWidth | 容器最小宽度 | `number \| string` | `0` |
| minHeight | 容器最小高度 | `number \| string` | `0` |
| padding | 容器内边距 | `number \| string` | - |
| justifyItems | 子项默认水平对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` |
| alignItems | 子项默认垂直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'center'` |
| backgroundColor | 容器背景色 | `string` | - |
| textColor | 容器文字色 | `string` | - |
| borderColor | 容器边框颜色 | `string` | - |
| borderWidth | 容器边框粗细 | `number \| string` | - |
| borderStyle | 容器边框样式 | `string` | `'solid'` |
| radius | 容器圆角 | `number \| string` | - |
| itemBackgroundColor | 子项默认背景色 | `string` | - |
| itemTextColor | 子项默认文字色 | `string` | - |
| itemBorderColor | 子项默认边框颜色 | `string` | - |
| itemBorderWidth | 子项默认边框粗细 | `number \| string` | - |
| itemBorderStyle | 子项默认边框样式 | `string` | `'solid'` |
| itemRadius | 子项默认圆角 | `number \| string` | - |
| itemPadding | 子项默认内边距 | `number \| string` | - |
| itemOverflow | 子项默认溢出方式 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | `'auto'` |
| lazy | 是否开启增量渲染 | `boolean` | `false` |
| initialCount | 开启增量渲染时的初始渲染数量 | `number` | `120` |
| loadCount | 每次追加渲染数量 | `number` | `80` |

## FlowItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 子项宽度 | `number \| string` | - |
| height | 子项高度 | `number \| string` | - |
| minWidth | 子项最小宽度 | `number \| string` | `0` |
| minHeight | 子项最小高度 | `number \| string` | `0` |
| padding | 子项内边距 | `number \| string` | - |
| justifySelf | 当前子项水平对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| alignSelf | 当前子项垂直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| backgroundColor | 子项背景色 | `string` | - |
| textColor | 子项文字色 | `string` | - |
| borderColor | 子项边框颜色 | `string` | - |
| borderWidth | 子项边框粗细 | `number \| string` | - |
| borderStyle | 子项边框样式 | `string` | - |
| radius | 子项圆角 | `number \| string` | - |
| overflow | 子项溢出方式 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | - |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 数据驱动模式下接收 `{ item, index }`；非数据模式下放置普通内容或 `XFlowItem` |

## 手动验收建议

1. 调整 `itemWidth` 和浏览器宽度，确认列数会自动变化。
2. 开启 `lazy` 并滚动到底部，确认图标会分批追加渲染。
3. 设置容器和子项的背景、边框、圆角、内边距，确认主题外观接口生效。

<style scoped>
.flow-demo-icon {
  align-items: center;
  display: grid;
  gap: 6px;
  justify-items: center;
  min-width: 0;
  padding: 8px 4px;
}

.flow-demo-icon :deep(.x-icon) {
  font-size: 22px;
}

.flow-demo-icon span {
  color: #64748b;
  font-size: 12px;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
