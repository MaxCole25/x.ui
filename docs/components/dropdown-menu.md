# 下拉菜单容器 DropdownMenu

配合 `XDropdown` 使用，提供菜单列表容器。

## 基础用法

```vue
<XDropdownMenu width="180px" max-height="180px">
  <XDropdownItem>编辑</XDropdownItem>
  <XDropdownItem divided>删除</XDropdownItem>
</XDropdownMenu>
```

## Props

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

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项内容 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XDropdownMenu / `DropdownMenuProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
