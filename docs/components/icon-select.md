<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IconSelectIconInfo } from '../../src/components/form-components/icon-select'

const basicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const iconName = ref('home-line')
<\/script>

<XIconSelect v-model="iconName" />`

const eventCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'
import type { IconSelectIconInfo } from 'x.ui'

const iconName = ref('')
const selectedIcon = ref<IconSelectIconInfo | null>(null)

const handleChange = (value: string, icon: IconSelectIconInfo) => {
  selectedIcon.value = icon
}
<\/script>

<XIconSelect v-model="iconName" @change="handleChange" />`

const appearanceCode = `\x3Cscript setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  iconName: 'settings-3-line',
  iconColor: '#334155',
  selectedIconColor: '#1264f4',
  accentColor: '#1264f4'
})
<\/script>

<XIconSelect
  v-model="state.iconName"
  size="lg"
  :panel-height="360"
  :icon-size="24"
  :icon-color="state.iconColor"
  :selected-icon-color="state.selectedIconColor"
  :accent-color="state.accentColor"
/>`

const iconName = ref('home-line')
const eventIconName = ref('')
const selectedIcon = ref<IconSelectIconInfo | null>(null)
const appearanceState = reactive({
  iconName: 'settings-3-line',
  iconColor: '#334155',
  selectedIconColor: '#1264f4',
  accentColor: '#1264f4'
})

const handleChange = (_value: string, icon: IconSelectIconInfo) => {
  selectedIcon.value = icon
}
</script>

# 图标选择面板 IconSelect

`XIconSelect` 用于从 x.ui 内置 Remix Icon 图标集中选择图标。组件包含固定分类器和图标选择显示区，单击图标用于预览，双击图标才会提交选择并返回可直接传给 `XIcon` 的图标信息。

## 基础用法

通过 `v-model` 绑定图标名称。图标显示区会在图标较多时出现竖向滚动条，外层面板和分类器不会产生横向滚动。

<XDocDemo title="基础用法" :code="basicCode">
  <XIconSelect v-model="iconName" />
</XDocDemo>

## 双击返回图标信息

双击图标时会更新 `modelValue`，同时触发 `change` 和 `dblclick` 事件。返回对象包含 `name`、`className`、`category` 和 `variant`。

<XDocDemo title="双击返回图标信息" :code="eventCode">
  <div class="x-icon-select-doc-stack">
    <XIconSelect v-model="eventIconName" @change="handleChange" />
    <div class="x-icon-select-doc-result">
      <span>当前值：{{ eventIconName || '暂无选择' }}</span>
      <span>返回信息：{{ selectedIcon ? `${selectedIcon.name} / ${selectedIcon.className} / ${selectedIcon.category} / ${selectedIcon.variant}` : '暂无返回' }}</span>
    </div>
  </div>
</XDocDemo>

## 外观尺寸

可以通过 `size`、`panel-height`、`icon-size` 和颜色属性调整面板外观。`panel-height` 控制图标显示区所在主体区域高度。

<XDocDemo title="外观尺寸" :code="appearanceCode">
  <XIconSelect
    v-model="appearanceState.iconName"
    size="lg"
    :panel-height="360"
    :icon-size="24"
    :icon-color="appearanceState.iconColor"
    :selected-icon-color="appearanceState.selectedIconColor"
    :accent-color="appearanceState.accentColor"
  />
</XDocDemo>

## 内置分类

分类器固定提供 `全部`、`系统`、`箭头`、`用户`、`文件`、`媒体`、`编辑`、`设备`、`地图`、`品牌`、`其它`。组件会根据图标名称关键词自动归类，无法命中的图标归入 `其它`。

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 当前选中的图标名称，可直接传给 `XIcon` | `string` | - |
| `size` | 组件尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `readonly` | 是否只读，只读时可预览但不能双击提交 | `boolean` | `false` |
| `placeholder` | 未选择时的提示文本 | `string` | `'双击选择图标'` |
| `emptyText` | 当前分类为空时的提示文本 | `string` | `'暂无图标'` |
| `iconColor` | 普通图标颜色 | `string` | `'#334155'` |
| `selectedIconColor` | 选中图标颜色 | `string` | `'#1264f4'` |
| `accentColor` | 激活分类、选中边框等主题色 | `string` | `'#1264f4'` |
| `panelHeight` | 图标选择主体高度，数字按 px 处理 | `number \| string` | `320` |
| `iconSize` | 图标字号，数字按 px 处理 | `number \| string` | - |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| `update:modelValue` | 双击图标提交后触发 | `(value: string)` |
| `change` | 双击图标提交后触发，返回绑定值和完整图标信息 | `(value: string, icon: IconSelectIconInfo)` |
| `select` | 单击图标预览时触发，不更新绑定值 | `(icon: IconSelectIconInfo)` |
| `dblclick` | 双击图标提交后触发 | `(icon: IconSelectIconInfo)` |

## 类型

```ts
type IconSelectCategoryName =
  | '全部'
  | '系统'
  | '箭头'
  | '用户'
  | '文件'
  | '媒体'
  | '编辑'
  | '设备'
  | '地图'
  | '品牌'
  | '其它'

interface IconSelectIconInfo {
  name: string
  className: string
  category: IconSelectCategoryName
  variant: 'line' | 'fill' | 'plain'
}
```

## 手动验收建议

- 切换每个分类，确认图标数量和显示内容跟随分类变化。
- 单击图标，确认只更新面板预览和 `select` 事件，不更新绑定值。
- 双击图标，确认 `v-model`、`change` 和 `dblclick` 都返回当前图标信息。
- 把 `panel-height` 调小，确认只有图标显示区出现竖向滚动条。
- 开启 `disabled` 和 `readonly`，确认禁用态不能操作，只读态不能提交新选择。

<style scoped>
.x-icon-select-doc-stack {
  display: grid;
  gap: 12px;
}

.x-icon-select-doc-result {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  display: grid;
  gap: 6px;
  padding: 12px;
}
</style>
