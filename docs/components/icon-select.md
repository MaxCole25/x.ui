<script setup lang="ts">
import type { IconSelectIconInfo } from '../../src/components/form-components/icon-select'
import Example1 from '../examples/icon-select/Example1.vue'
import Example1Source from '../examples/icon-select/Example1.vue?raw'
import Example2 from '../examples/icon-select/Example2.vue'
import Example2Source from '../examples/icon-select/Example2.vue?raw'
import Example3 from '../examples/icon-select/Example3.vue'
import Example3Source from '../examples/icon-select/Example3.vue?raw'
</script>
# 图标选择面板 IconSelect

`XIconSelect` 用于从 @x-soft88/x-ui 内置 Remix Icon 图标集中选择图标。组件包含固定分类器和图标选择显示区，单击图标用于预览，双击图标才会提交选择并返回可直接传给 `XIcon` 的图标信息。

## 使用示例

### 基础用法

通过 `v-model` 绑定图标名称。图标显示区会在图标较多时出现竖向滚动条，外层面板和分类器不会产生横向滚动。

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 双击返回图标信息

双击图标时会更新 `modelValue`，同时触发 `change` 和 `dblclick` 事件。返回对象包含 `name`、`className`、`category` 和 `variant`。

<XDocDemo title="双击返回图标信息" :code="Example2Source">
  <Example2 />
</XDocDemo>

### 外观尺寸

`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。

<XDocDemo title="外观尺寸" :code="Example3Source">
  <Example3 />
</XDocDemo>

### 内置分类

分类器固定提供 `全部`、`系统`、`箭头`、`用户`、`文件`、`媒体`、`编辑`、`设备`、`地图`、`品牌`、`其它`。组件会根据图标名称关键词自动归类，无法命中的图标归入 `其它`。

### 类型

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

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 当前选中的图标名称，可直接传给 `XIcon` | `string` | `—` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placeholder` | 未选择时的提示文本 | `string` | `'双击选择图标'` | — |
| `emptyText` | 当前分类为空时的提示文本 | `string` | `'暂无图标'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `panelHeight` | 图标选择主体高度，数字按 px 处理 | `number \| string` | `320` | 数字为 px；字符串使用 CSS 单位 |
| `iconSize` | 图标字号，数字按 px 处理 | `number \| string` | `undefined` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `iconColor` | 普通图标颜色 | `string` | `'#334155'` | — |
| `selectedIconColor` | 选中图标颜色 | `string` | `'#1264f4'` | — |
| `accentColor` | 激活分类、选中边框等主题色 | `string` | `'#1264f4'` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `readonly` | 是否只读，只读时可预览但不能双击提交 | `boolean` | `false` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 双击图标提交后触发 | `[value: string]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `change` | 双击图标提交后触发，返回绑定值和完整图标信息 | `[value: string, icon: IconSelectIconInfo]` |
| `dblclick` | 双击图标提交后触发 | `[icon: IconSelectIconInfo]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `select` | 单击图标预览时触发，不更新绑定值 | `[icon: IconSelectIconInfo]` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### IconSelectCategoryName

```ts
export type IconSelectCategoryName =
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
```

### IconSelectIconInfo

```ts
export interface IconSelectIconInfo {
  name: string
  className: string
  category: IconSelectCategoryName
  variant: 'line' | 'fill' | 'plain'
}
```

### IconSelectProps

```ts
export interface IconSelectProps {
  modelValue?: string
  fontSize?: number
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  emptyText?: string
  iconColor?: string
  selectedIconColor?: string
  accentColor?: string
  panelHeight?: number | string
  iconSize?: number | string
}
```

## 验收说明

- 切换每个分类，确认图标数量和显示内容跟随分类变化。
- 单击图标，确认只更新面板预览和 `select` 事件，不更新绑定值。
- 双击图标，确认 `v-model`、`change` 和 `dblclick` 都返回当前图标信息。
- 把 `panel-height` 调小，确认只有图标显示区出现竖向滚动条。
- 开启 `disabled` 和 `readonly`，确认禁用态不能操作，只读态不能提交新选择。

