# 下拉菜单 Dropdown

用于承载命令菜单、更多操作和页面构建器中的动作入口。

## 基础用法

```vue
<XDropdown @command="handleCommand">
  <XButton>更多</XButton>
  <template #dropdown>
    <XDropdownMenu>
      <XDropdownItem command="edit">编辑</XDropdownItem>
      <XDropdownItem command="delete" divided>删除</XDropdownItem>
    </XDropdownMenu>
  </template>
</XDropdown>
```

## 组件组成

`XDropdown`、`XDropdownMenu` 和 `XDropdownItem` 是一组配套组件，文档统一放在本页：

| 组件 | 职责 |
| --- | --- |
| `XDropdown` | 控制触发方式、弹层位置、Teleport、显示隐藏和 `command` 事件。 |
| `XDropdownMenu` | 提供菜单列表容器，控制菜单宽度、高度、边框、背景和内边距。 |
| `XDropdownItem` | 表示单个菜单命令项，支持命令值、禁用、分割线、图标和激活态。 |

## XDropdown

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | `hover \| click` | `hover` |
| placement | 弹出位置 | `bottom-start \| bottom \| bottom-end \| top-start \| top \| top-end \| left-start \| left \| left-end \| right-start \| right \| right-end` | `bottom-start` |
| size | 菜单尺寸 | `sm \| md \| lg` | `md` |
| disabled | 是否禁用 | `boolean` | `false` |
| hideOnClick | 点击菜单项后是否隐藏 | `boolean` | `true` |
| showArrow | 是否显示箭头 | `boolean` | `true` |
| teleported | 是否将弹层挂载到 `teleportTo`，用于避免被父级裁剪 | `boolean` | `false` |
| teleportTo | 弹层挂载目标 | `string` | `body` |
| offset | 弹层偏移长度 | `number \| string` | `6` |
| popperWidth | 弹层宽度 | `number \| string` | `max-content` |
| zIndex | 弹层层级 | `number \| string` | `2000` |
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

### Events

| 名称 | 说明 |
| --- | --- |
| command | 菜单项命令触发 |
| visible-change | 显示状态变化 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 触发器内容 |
| dropdown | 弹层内容，通常放置 `XDropdownMenu` |

## XDropdownMenu

### 基础用法

```vue
<XDropdownMenu width="180px" max-height="180px">
  <XDropdownItem>编辑</XDropdownItem>
  <XDropdownItem divided>删除</XDropdownItem>
</XDropdownMenu>
```

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 弹窗宽度 | `number \| string` | `max-content` |
| maxHeight | 最大高度 | `number \| string` | `260px` |
| minWidth | 最小宽度 | `number \| string` | `136px` |
| padding | 内边距 | `number \| string` | `6px` |
| radius | 圆角 | `number \| string` | `6px` |
| shadow | 阴影 | `string` | 内置阴影 |
| borderWidth | 边框宽度 | `number \| string` | `1px` |
| borderColor | 边框色 | `string` | `#e4e7ed` |
| backgroundColor | 背景色 | `string` | `#fff` |
| textColor | 文字色 | `string` | `#606266` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项内容 |

## XDropdownItem

### 基础用法

```vue
<XDropdownItem command="copy" icon="ri-file-copy-line">复制</XDropdownItem>
<XDropdownItem command="remove" divided>删除</XDropdownItem>
```

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| command | 命令值 | `unknown` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| divided | 是否显示上分割线 | `boolean` | `false` |
| icon | 图标 class 名 | `string` | - |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| active | 是否激活 | `boolean` | `false` |
| height | 高度 | `number \| string` | 尺寸值 |
| padding | 内边距 | `string` | 尺寸值 |
| radius | 圆角 | `number \| string` | `4px` |
| hoverBackgroundColor | 悬浮背景色 | `string` | 主色浅色 |
| hoverTextColor | 悬浮文字色 | `string` | 主色 |
| activeBackgroundColor | 激活背景色 | `string` | 主色 |
| activeTextColor | 激活文字色 | `string` | `#fff` |
| dividedColor | 分割线颜色 | `string` | `#edf1f7` |
| borderWidth | 边框宽度 | `number \| string` | `0` |
| borderColor | 边框色 | `string` | `transparent` |
| backgroundColor | 背景色 | `string` | `transparent` |
| textColor | 文字色 | `string` | `#606266` |

### Events

| 名称 | 说明 |
| --- | --- |
| click | 点击可用菜单项时触发 |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项文本或自定义内容 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XDropdown / `DropdownProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

### XDropdownMenu / `DropdownMenuProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

### XDropdownItem / `DropdownItemProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
