<script setup lang="ts">
import { ref } from 'vue'

const active = ref('overview')
const items = ref([
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
])

const tabsBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const active = ref('overview')
const items = ref([
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
])
<\/script>

<XTabs v-model="active" :items="items" closable>
  <template #pane="{ item }">
    当前页签：{{ item.label }}
  </template>
</XTabs>`

const tabsVariantCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const active = ref('overview')
const items = ref([
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
])
<\/script>

<XTabs v-model="active" :items="items" variant="line" />
<XTabs v-model="active" :items="items" variant="card" />
<XTabs v-model="active" :items="items" variant="border-card" />`

const tabsEditableCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const active = ref('overview')
const items = ref([
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
])

function createTab() {
  const nextIndex = items.value.length + 1
  const name = 'tab-' + nextIndex
  items.value.push({ name, label: '页签 ' + nextIndex, closable: true })
  active.value = name
}

function removeTab(name: string) {
  const index = items.value.findIndex((item) => item.name === name)
  if (index === -1) return
  items.value.splice(index, 1)
  if (active.value === name) {
    active.value = items.value[index - 1]?.name ?? items.value[0]?.name ?? ''
  }
}
<\/script>

<XTabs
  v-model="active"
  :items="items"
  addable
  closable
  @tab-add="createTab"
  @tab-remove="removeTab"
/>`

const tabsDraggableCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const active = ref('overview')
const items = ref([
  { name: 'overview', label: '总览', locked: true },
  { name: 'members', label: '成员', closable: true },
  { name: 'settings', label: '设置', disabled: true }
])

function moveTab(payload: { source: string; target: string; position: 'before' | 'after' }) {
  const sourceIndex = items.value.findIndex((item) => item.name === payload.source)
  const targetIndex = items.value.findIndex((item) => item.name === payload.target)
  if (sourceIndex === -1 || targetIndex === -1) return
  const [source] = items.value.splice(sourceIndex, 1)
  const insertIndex = payload.position === 'before' ? targetIndex : targetIndex + 1
  items.value.splice(insertIndex > sourceIndex ? insertIndex - 1 : insertIndex, 0, source)
}
<\/script>

<XTabs
  v-model="active"
  :items="items"
  draggable
  @reorder="moveTab"
/>`
</script>
# 标签页 Tabs

`XTabs` 是用于多页签内容切换的容器组件，支持关闭、新增、拖拽排序、懒渲染、右键菜单、四向布局和自定义标签内容。

## 基础用法

<XDocDemo title="基础用法" :code="tabsBasicCode">
  <ClientOnly>
    <XTabs v-model="active" :items="items" closable />
  </ClientOnly>
</XDocDemo>

## 页签类型

<XDocDemo title="页签类型" :code="tabsVariantCode">
  <ClientOnly>
    <div class="x-demo-column">
      <XTabs v-model="active" :items="items" variant="line" />
      <XTabs v-model="active" :items="items" variant="card" />
      <XTabs v-model="active" :items="items" variant="border-card" />
    </div>
  </ClientOnly>
</XDocDemo>

`variant=""` 与 `variant="line"` 都会使用线条页签。`card` 为默认卡片页签，`border-card` 会给整体容器增加边框并弱化内容区内边框，适合需要完整外框的页面模块。

## 新增与关闭

<XDocDemo title="新增与关闭" :code="tabsEditableCode">
  <ClientOnly>
    <XTabs
      v-model="active"
      :items="items"
      addable
      closable
    />
  </ClientOnly>
</XDocDemo>

## 拖拽排序

<XDocDemo title="拖拽排序" :code="tabsDraggableCode">
  <ClientOnly>
    <XTabs
      v-model="active"
      :items="items"
      draggable
    />
  </ClientOnly>
</XDocDemo>

`reorder` 会返回 `{ source, target, position }`，业务侧根据这个结果调整 `items` 顺序。

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前激活页签值 | `TabName` | `undefined` |
| items | 页签列表 | `TabItem[]` | `[]` |
| variant | 页签视觉形态 | `'' \| 'line' \| 'card' \| 'border-card'` | `'card'` |
| size | 标签尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| tabPosition | 页签位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` |
| labelDirection | 标签文字方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| tabStretch | 是否拉伸页签 | `boolean` | `false` |
| closable | 是否默认允许关闭 | `boolean` | `false` |
| addable | 是否显示新增按钮 | `boolean` | `false` |
| editable | 是否进入编辑态，效果同新增按钮 | `boolean` | `false` |
| lazy | 是否默认懒渲染内容面板 | `boolean` | `false` |
| showAvatar | 是否显示头像信息 | `boolean` | `true` |
| showCloseIcon | 是否显示关闭入口 | `boolean` | `true` |
| showRefreshIcon | 是否默认允许刷新 | `boolean` | `false` |
| showContextMenu | 是否启用页签右键菜单 | `boolean` | `true` |
| draggable | 是否默认允许拖拽排序 | `boolean` | `false` |
| activeTabTextColor | 激活页签文字色 | `string` | `'var(--x-color-primary)'` |
| tabBackgroundColor | 普通页签背景色，不影响透明的标签头容器 | `string` | `'transparent'` |
| tabTextColor | 普通页签文字色 | `string` | `'var(--x-color-text-muted)'` |
| tabFontSize | 标签文字大小（支持数字像素或 CSS 长度） | `number \| string` | `undefined` |
| tabMinWidth | 单个页签最小宽度（支持数字像素或 CSS 长度） | `number \| string` | `undefined` |
| radius | 页签整体圆角（支持数字像素或 CSS 长度） | `number \| string` | `4` |
| border | 标签头和内容页边框 | `string` | `'1px solid var(--x-color-border)'` |
| contentBackgroundColor | 内容页和激活页签背景色 | `string` | `'var(--x-color-surface)'` |
| contextMenuBackgroundColor | 右键菜单背景色 | `string` | `'var(--x-color-surface)'` |
| contextMenuTextColor | 右键菜单文字色 | `string` | `'var(--x-color-text)'` |
| fullHeight | 是否填满父容器高度 | `boolean` | `false` |
| beforeLeave | 切换前守卫，返回 `false` 阻止切换 | `(next, prev) => boolean \| Promise<boolean>` | `undefined` |

默认尺寸为中尺寸 `md`，也可以通过 `size="lg"` 或 `size="sm"` 调整标签内部高度变量、文字和图标尺寸。三档内部高度变量和字号遵循统一尺寸预设：`sm` 为 `22px / 10px`，`md` 为 `30px / 12px`，`lg` 为 `38px / 14px`。`XTabs` 是尺寸特例：`.x-tabs__item-frame` 高度、标签内边距和默认最小宽度不随 `size` 切换，外层框高度始终保持 `30px`，标签内边距和默认最小宽度始终保持 md 规格 `0 8px / 140px`，避免页签在不同 UI 尺寸下整体高度和左右留白跳变。若只需要调整标签文字大小，可使用 `tab-font-size` 覆盖尺寸预设中的字号；若只需要调整单个页签最小宽度，可使用 `tab-min-width` 覆盖默认最小宽度。`label-direction="vertical"` 可让标签文字上下排列，适合配合 `tab-position="left"` 或 `tab-position="right"` 做侧向标签栏。默认圆角为 `4px`，可通过 `radius="8px"` 或 `:radius="8"` 调整。`XTabs` 最外层和页签头容器不显示外侧边框，页签头容器背景固定透明，普通页签背景色通过 `tab-background-color` 调整；标签和内容页边框统一通过 `border` 调整，内容页和激活页签背景色统一通过 `content-background-color` 调整。右键菜单默认启用，可通过 `show-context-menu="false"` 关闭，也可通过 `context-menu-background-color` 和 `context-menu-text-color` 调整背景与文字颜色。标签头不会绘制贴近内容页的一侧边框，内容页保留完整边框；激活标签会向内容页方向溢出 `2px`，用与内容页一致的背景覆盖交界处边框，避免标签和内容之间出现重叠线。图标颜色跟随当前页签文字颜色：激活态默认使用 `var(--x-color-primary)`，未激活态默认使用 `var(--x-color-text-muted)`，业务项目可通过主题基础色统一覆盖。

## TabItem

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| name | 页签唯一值 | `TabName` |
| label | 页签显示文本 | `string` |
| icon | 文本图标或 Vue 组件 | `string \| Component` |
| avatarUrl | 头像图片地址 | `string` |
| avatarText | 头像文本 | `string` |
| disabled | 是否禁用 | `boolean` |
| locked | 是否锁定。锁定后不可关闭、不可刷新、不可作为拖拽源或拖拽目标，并显示锁图标 | `boolean` |
| closable | 是否覆盖全局关闭设置 | `boolean` |
| refreshable | 是否覆盖全局刷新设置 | `boolean` |
| draggable | 是否覆盖全局拖拽设置 | `boolean` |
| lazy | 是否覆盖全局懒渲染设置 | `boolean` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 激活页签变化 | `(name: TabName)` |
| change | 激活页签变化 | `(name: TabName)` |
| tab-click | 点击页签 | `(pane: TabsPaneContext, event: Event)` |
| tab-remove | 请求关闭页签 | `(name: TabName)` |
| tab-add | 请求新增页签 | `()` |
| edit | 新增或删除编辑事件 | `(targetName, action)` |
| tab-refresh | 请求刷新单个页签 | `(name: TabName)` |
| tab-refresh-all | 请求刷新全部页签 | `()` |
| tab-close-others | 请求关闭除当前右键目标外的其它可关闭、未锁定页签 | `({ targetName, names })` |
| tab-close-all | 请求关闭全部可关闭、未锁定页签 | `({ names })` |
| reorder | 拖拽排序 | `({ source, target, position })` |

## Slots

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| default | `items` 为空时的默认内容 | - |
| pane | 统一内容面板 | `{ item }` |
| pane-[name] | 指定页签内容面板 | `{ item }` |
| label | 自定义页签标题 | `{ item, active, locked }` |

## 手动验收建议

- 切换普通、禁用和懒渲染页签，确认内容显示和事件触发正确。
- 开启关闭、新增、拖拽排序后，确认业务侧更新 `items` 后界面同步。
- 为系统首页等固定页签设置 `locked: true`，确认关闭、拖拽、刷新和锁图标都遵循锁定语义。
- 使用右键菜单锁定、解锁、刷新、关闭其它和关闭全部，确认锁定页签不会被关闭或刷新。
- 分别检查 `top`、`bottom`、`left`、`right` 方向，确认长文本不会溢出遮挡。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XTabs / `TabsProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `tabGap` | 公开属性，详见类型定义 | `string \| number` | — |
| `padding` | 内容区域内边距，支持 CSS 四边写法 | `string \| number` | — |
| `verticalWidth` | vertical宽度 | `string \| number` | — |
| `verticalLabelMinHeight` | vertical标签Min高度 | `string \| number` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
