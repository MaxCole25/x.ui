<script setup lang="ts">
import { ref } from 'vue'
const command = ref('')
import Example1 from '../examples/user-status/Example1.vue'
import Example1Source from '../examples/user-status/Example1.vue?raw'
import Example2 from '../examples/user-status/Example2.vue'
import Example2Source from '../examples/user-status/Example2.vue?raw'
</script>
# 用户状态 UserStatus

用于后台页头、顶部工具栏等位置展示当前用户头像、名称、副标题，并承载个人中心、设置、退出等用户菜单。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

### 未登录状态

<XDocDemo title="未登录状态" :code="Example2Source">
  <Example2 />
</XDocDemo>

### UserStatusMenuItem

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 菜单文本 | `string` | 必填 |
| command | 菜单命令值，未传时使用 `text` | `unknown` | `text` |
| icon | 菜单图标名称 | `string` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| divided | 是否显示上分割线 | `boolean` | `false` |
| active | 是否激活 | `boolean` | `false` |

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 是否显示菜单；未传入时由组件内部控制 | `boolean` | `undefined` | — |
| `items` | 用户菜单项 | `UserStatusMenuItem[]` | `() => []` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `name` | 用户名 | `string` | `''` | — |
| `description` | 第二行说明文本，例如登录时间或当前时间 | `string` | `''` | — |
| `avatarIcon` | 无图片时显示的头像图标 | `string` | `'user'` | — |
| `trigger` | 菜单触发方式 | `DropdownTrigger` | `'click'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `avatarIconFull` | 是否让图标撑满头像区域 | `boolean` | `false` | — |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `avatarIconColor` | 无图片时显示的头像图标色 | `string` | `'#cdded7'` | — |
| `avatarBackgroundColor` | 头像背景色 | `string` | `'#dff7ee'` | — |
| `hoverBackgroundColor` | 鼠标悬停背景色 | `string` | `undefined` | — |
| `openBackgroundColor` | 展开状态背景色 | `string` | `undefined` | — |
| `fontSize` | 字号，数字单位 px，不影响高度、内边距和圆角 | `number` | `14` | px |
| `borderWidth` | 触发区边框宽度 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `borderColor` | 触发区边框色 | `string` | `—` | — |
| `radius` | 整体圆角，数字按 px 处理 | `number \| string` | `—` | 数字为 px；字符串使用 CSS 单位 |
| `backgroundColor` | 触发区背景色 | `string` | `—` | — |
| `textColor` | 触发区文字色 | `string` | `—` | — |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `hideOnClick` | 点击菜单项后是否隐藏 | `boolean` | `true` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placement` | 菜单弹出位置 | `DropdownPlacement` | `'bottom-end'` | — |
| `teleported` | 是否将弹层挂载到 `teleportTo` | `boolean` | `false` | — |
| `teleportTo` | 弹层挂载目标 | `string` | `'body'` | — |
| `zIndex` | 弹层层级 | `number` | `2000` | — |

### 组件专有功能

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `loggedIn` | 是否已登录，为 `false` 时显示 `登录 注册` | `boolean` | `true` | — |
| `avatarSrc` | 头像图片地址 | `string` | `''` | — |
| `avatarAlt` | 头像替代文本 | `string` | `''` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | update:modelValue 事件 | `[visible: boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `visible-change` | 菜单显示状态变化时触发 | `[visible: boolean]` |
| `show` | show 事件 | `[]` |
| `hide` | hide 事件 | `[]` |
| `login-click` | 未登录态点击“登录”时触发 | `[event: MouseEvent]` |
| `register-click` | 未登录态点击“注册”时触发 | `[event: MouseEvent]` |

### 组件专有功能

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `command` | 菜单命令值，未传时使用 `text` | `[command: unknown, item: UserStatusMenuItem]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `name` | 用户名 | `无作用域参数` |
| `description` | 第二行说明文本，例如登录时间或当前时间 | `无作用域参数` |

### 组件专有功能

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `avatar` | 替换头像区域 | `无作用域参数` |
| `menu` | 完全替换菜单内容，插槽参数为 `{ items, size }` | `items: UserStatusMenuItem[]; fontSize: number \| undefined` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### UserStatusMenuItem

```ts
export interface UserStatusMenuItem {
  text: string
  command?: unknown
  icon?: string
  disabled?: boolean
  divided?: boolean
  active?: boolean
}
```

### UserStatusProps

```ts
export interface UserStatusProps extends ElementStyleProps {
  modelValue?: boolean
  loggedIn?: boolean
  name?: string
  description?: string
  avatarSrc?: string
  avatarAlt?: string
  avatarIcon?: string
  avatarIconColor?: string
  avatarBackgroundColor?: string
  avatarIconFull?: boolean
  hoverBackgroundColor?: string
  openBackgroundColor?: string
  items?: UserStatusMenuItem[]
  fontSize?: number
  trigger?: DropdownTrigger
  placement?: DropdownPlacement
  disabled?: boolean
  hideOnClick?: boolean
  teleported?: boolean
  teleportTo?: string
  zIndex?: number
}
```

## 验收说明

`fontSize` 使用数字，单位 px，只控制文字大小；常规控件默认高度为 32px，可通过 `height` 独立调整。字号不会改变内边距或圆角，容器和表格保留各自的布局规则。
2. 切换 `hover` 与 `click` 触发方式，确认菜单显示和 `visible-change` 事件正常。
3. 关闭 `loggedIn`，确认只显示 `登录 注册`，且不会出现头像或菜单。
4. 设置长用户名和长说明文本，确认触发区文本省略且不挤压菜单箭头。
