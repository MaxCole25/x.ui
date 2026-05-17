# 下拉菜单容器 DropdownMenu

配合 `XDropdown` 使用，提供菜单列表容器。

## 基础用法

```vue
<XDropdownMenu max-height="180px">
  <XDropdownItem>编辑</XDropdownItem>
  <XDropdownItem divided>删除</XDropdownItem>
</XDropdownMenu>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
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
