<script setup lang="ts">
import { ref } from 'vue'

const action = ref('')
const expanded = ref(false)

const menuModeItems = [
  { key: 'help', label: '查看帮助', icon: 'question', backgroundColor: '#16a34a' },
  { key: 'feedback', label: '提交反馈', icon: 'feedback', backgroundColor: '#2563eb' },
  { key: 'top', label: '返回顶部', icon: 'arrow-up', backgroundColor: '#64748b' }
]

const directModeItems = [
  { key: 'service', label: '联系客服', icon: 'customer-service-2', backgroundColor: '#f97316' },
  { key: 'help', label: '查看帮助', icon: 'question', backgroundColor: '#16a34a' },
  { key: 'top', label: '返回顶部', icon: 'arrow-up', backgroundColor: '#f97316' }
]

const menuCode = `<script setup lang="ts">
import { ref } from 'vue'

const expanded = ref(false)
const action = ref('')
const menuModeItems = [
  { key: 'help', label: '查看帮助', icon: 'question' },
  { key: 'feedback', label: '提交反馈', icon: 'feedback' },
  { key: 'top', label: '返回顶部', icon: 'arrow-up' }
]
<\/script>

<XFloatButtonGroup
  v-model="expanded"
  :items="menuModeItems"
  mode="menu"
  position="absolute"
  :right="32"
  :bottom="32"
  @item-click="(item) => { action = item.label }"
/>`

const directCode = `<XFloatButtonGroup
  :items="directModeItems"
  mode="direct"
  direction="horizontal"
  position="absolute"
  :left="32"
  :bottom="32"
/>`
</script>

# 悬浮按钮组 FloatButtonGroup

用于页面固定的悬浮图标入口，适合客服、帮助、返回顶部、快捷操作等场景。按钮本体只显示图标，说明文字通过 Tooltip 展示。默认使用 `fixed` 固定在视口，也可以设置 `position="absolute"` 放在局部容器内。

`menu` 模式中主按钮本身就是展开和关闭入口，默认使用客服图标；弹出的菜单项建议放帮助、反馈、返回顶部等次级操作，避免重复出现同一个入口图标。

## 点击菜单

<XDocDemo title="点击菜单" :code="menuCode">
  <ClientOnly>
    <div class="x-demo-column" style="height: 220px; position: relative">
      <XFloatButtonGroup
        v-model="expanded"
        :items="menuModeItems"
        mode="menu"
        position="absolute"
        :right="32"
        :bottom="32"
        @item-click="(item) => { action = item.label }"
      />
      <p class="x-demo-label">当前动作：{{ action || '未点击' }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 直接显示

<XDocDemo title="直接显示" :code="directCode">
  <ClientOnly>
    <div class="x-demo-column" style="height: 220px; position: relative">
      <XFloatButtonGroup
        :items="directModeItems"
        mode="direct"
        direction="horizontal"
        position="absolute"
        :left="32"
        :bottom="32"
      />
    </div>
  </ClientOnly>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 按钮项数组 | `FloatButtonGroupItem[]` | `[]` |
| mode | 显示状态，点击菜单或直接显示 | `menu \| direct` | `menu` |
| modelValue | 菜单展开状态，仅 `menu` 模式使用 | `boolean` | `undefined` |
| defaultExpanded | 非受控默认展开状态 | `boolean` | `false` |
| direction | 菜单按钮排列方向 | `horizontal \| vertical` | `vertical` |
| placement | 固定位置 | `top-left \| top-right \| bottom-left \| bottom-right` | `bottom-right` |
| position | 定位方式 | `fixed \| absolute` | `fixed` |
| offsetX | 距离左右边缘的偏移 | `number \| string` | `24` |
| offsetY | 距离上下边缘的偏移 | `number \| string` | `24` |
| top | 自定义上方坐标，优先于 `placement` 推导 | `number \| string` | `undefined` |
| right | 自定义右侧坐标，优先于 `placement` 推导 | `number \| string` | `undefined` |
| bottom | 自定义下方坐标，优先于 `placement` 推导 | `number \| string` | `undefined` |
| left | 自定义左侧坐标，优先于 `placement` 推导 | `number \| string` | `undefined` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| zIndex | 层级 | `number \| string` | `2000` |
| triggerIcon | 主按钮默认图标 | `string` | `customer-service-2` |
| closeIcon | 兼容保留字段，默认渲染不再使用 | `string` | `close` |
| triggerLabel | 主按钮提示文字 | `string` | `快捷菜单` |
| tooltipPlacement | Tooltip 位置，不传时自动判断 | `top \| bottom \| left \| right` | `undefined` |
| showTooltip | 是否显示 Tooltip | `boolean` | `true` |

## 定位说明

未设置 `top`、`right`、`bottom`、`left` 时，组件会根据 `placement`、`offsetX`、`offsetY` 计算位置。传入任意自定义坐标后，对应方向会覆盖 `placement` 推导出的坐标；例如 `position="absolute"` 配合 `right="32"`、`bottom="32"` 可以把按钮组固定在局部容器右下角。

## FloatButtonGroupItem

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string \| number` |
| label | 按钮说明，用于 Tooltip 和无障碍文本 | `string` |
| icon | 图标名称，使用 `XIcon` 的图标命名 | `string` |
| disabled | 是否禁用 | `boolean` |
| backgroundColor | 按钮背景色 | `string` |
| textColor | 图标颜色 | `string` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 菜单展开状态变化时触发。 |
| item-click | 点击菜单按钮时触发。 |
| trigger-click | 点击主按钮时触发。 |

## Slots

| 名称 | 说明 |
| --- | --- |
| item | 自定义按钮图标内容。 |
| trigger | 自定义 `menu` 模式主按钮内容。 |
