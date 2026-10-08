<script setup lang="ts">
import { ref } from 'vue'
const command = ref('')
import Example1 from '../examples/dropdown/Example1.vue'
import Example1Source from '../examples/dropdown/Example1.vue?raw'
import Example2 from '../examples/dropdown/Example2.vue'
import Example2Source from '../examples/dropdown/Example2.vue?raw'
import Example3 from '../examples/dropdown/Example3.vue'
import Example3Source from '../examples/dropdown/Example3.vue?raw'
</script>
# 下拉菜单 Dropdown

用于承载命令菜单、更多操作和页面构建器中的动作入口。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 组件组成

当前公开入口提供 `XDropdown`，弹层内容通过 `dropdown` 插槽传入。菜单容器和菜单项可以直接使用业务侧的 HTML 或项目内按钮组件组织。

| 组件 | 职责 |
| --- | --- |
| `XDropdown` | 控制触发方式、弹层位置、Teleport、显示隐藏和 `command` 事件。 |
| `dropdown` 插槽内容 | 承载菜单列表、命令按钮、说明文本或自定义业务面板。 |

### XDropdown

#### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | `hover \| click` | `hover` |
| placement | 弹出位置 | `bottom-start \| bottom \| bottom-end \| top-start \| top \| top-end \| left-start \| left \| left-end \| right-start \| right \| right-end` | `bottom-start` |
| fontSize | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` |
| disabled | 是否禁用 | `boolean` | `false` |
| hideOnClick | 点击菜单项后是否隐藏 | `boolean` | `true` |
| showArrow | 是否显示箭头 | `boolean` | `true` |
| modelValue | 是否显示菜单；未传入时由组件内部控制 | `boolean` | — |
| teleported | 是否将弹层挂载到 `teleportTo`，用于避免被父级裁剪 | `boolean` | `true` |
| teleportTo | 弹层挂载目标 | `string` | `body` |
| offset | 弹层偏移长度 | `number \| string` | `6` |
| popperWidth | 弹层宽度 | `number \| string` | `max-content` |
| zIndex | 弹层层级 | `number` | `2000` |
| radius | 弹层圆角 | `number \| string` | `6px` |
| shadow | 弹层阴影 | `string` | 内置阴影 |
| hoverBackgroundColor | 菜单项悬浮背景色 | `string` | 主色浅色 |
| hoverTextColor | 菜单项悬浮文字色 | `string` | 主色 |
| activeBackgroundColor | 菜单项激活背景色 | `string` | 主色 |
| activeTextColor | 菜单项激活文字色 | `string` | `#fff` |
| borderWidth | 边框宽度 | `number \| string` | `1px` |
| borderColor | 边框色 | `string` | `#e4e7ed` |
| backgroundColor | 背景色 | `string` | `#fff` |
| textColor | 文字色 | `string` | `#606266` |

#### Events

| 名称 | 说明 |
| --- | --- |
| command | 菜单项命令触发 |
| visible-change | 显示状态变化 |

#### Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发器内容 |
| dropdown | 弹层内容，通常放置菜单列表或业务面板 |

### 自定义菜单容器

#### 基础用法

<XDocDemo title="菜单容器" :code="Example2Source">
  <Example2 />
</XDocDemo>

#### 可控制能力

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| popperWidth | 弹层宽度 | `number \| string` | `max-content` |
| radius | 弹层圆角 | `number \| string` | `6px` |
| shadow | 弹层阴影 | `string` | 内置阴影 |
| borderWidth | 弹层边框宽度 | `number \| string` | `1px` |
| borderColor | 弹层边框色 | `string` | `#e4e7ed` |
| backgroundColor | 弹层背景色 | `string` | `#fff` |
| textColor | 弹层文字色 | `string` | `#606266` |

#### Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项内容 |

### 自定义菜单项

#### 基础用法

<XDocDemo title="菜单项" :code="Example3Source">
  <Example3 />
</XDocDemo>

#### 菜单项建议

1. 菜单项建议使用 `button type="button"`，避免嵌套在表单中时触发表单提交。
2. 点击菜单项后需要关闭弹层时，保持 `hideOnClick` 默认值；需要连续操作时可设置 `:hide-on-click="false"`。
3. 危险操作、禁用状态、图标和分割线可以在插槽内容中按业务设计系统自行实现。

#### Events

| 名称 | 说明 |
| --- | --- |
| click | 点击可用菜单项时触发 |

#### Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项文本或自定义内容 |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 是否显示菜单；未传入时由组件内部控制 | `boolean` | `undefined` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `trigger` | 触发方式 | `DropdownTrigger` | `'hover'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `offset` | 弹层偏移长度 | `number \| string` | `6` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `radius` | 弹层圆角 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `shadow` | 弹层阴影 | `string` | `—` | — |
| `hoverBackgroundColor` | 菜单项悬浮背景色 | `string` | `—` | — |
| `hoverTextColor` | 菜单项悬浮文字色 | `string` | `—` | — |
| `activeBackgroundColor` | 菜单项激活背景色 | `string` | `—` | — |
| `activeTextColor` | 菜单项激活文字色 | `string` | `—` | — |
| `borderWidth` | 边框宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 边框色 | `string` | `—` | — |
| `backgroundColor` | 背景色 | `string` | `—` | — |
| `textColor` | 文字色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `hideOnClick` | 点击菜单项后是否隐藏 | `boolean` | `true` | — |
| `showArrow` | 是否显示箭头 | `boolean` | `true` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placement` | 弹出位置 | `DropdownPlacement` | `'bottom-start'` | — |
| `teleported` | 是否将弹层挂载到 `teleportTo`，用于避免被父级裁剪 | `boolean` | `true` | — |
| `teleportTo` | 弹层挂载目标 | `string` | `'body'` | — |
| `popperWidth` | 弹层宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `zIndex` | 弹层层级 | `number` | `2000` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | update:modelValue 事件 | `[visible: boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `visible-change` | 显示状态变化 | `[visible: boolean]` |
| `show` | show 事件 | `[]` |
| `hide` | hide 事件 | `[]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `command` | 菜单项命令触发 | `[command: unknown]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 触发器内容 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `dropdown` | 弹层内容，通常放置菜单列表或业务面板 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### DropdownTrigger

```ts
export type DropdownTrigger = 'hover' | 'click'
```

### DropdownPlacement

```ts
export type DropdownPlacement =
  | 'bottom-start'
  | 'bottom'
  | 'bottom-end'
  | 'top-start'
  | 'top'
  | 'top-end'
  | 'left-start'
  | 'left'
  | 'left-end'
  | 'right-start'
  | 'right'
  | 'right-end'
```

### DropdownProps

```ts
export interface DropdownProps extends ElementStyleProps {
  modelValue?: boolean
  trigger?: DropdownTrigger
  placement?: DropdownPlacement
  fontSize?: number
  disabled?: boolean
  hideOnClick?: boolean
  showArrow?: boolean
  teleported?: boolean
  teleportTo?: string
  offset?: number | string
  popperWidth?: number | string
  zIndex?: number
  radius?: number | string
  shadow?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  activeBackgroundColor?: string
  activeTextColor?: string
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### DropdownFontSize

```ts
export type DropdownFontSize = number
```

## 验收说明

- 调整各功能分组中的属性，核对实际显示与默认值。
- 操作示例并查看绑定值及事件反馈；检查鼠标、键盘和长文本显示。
