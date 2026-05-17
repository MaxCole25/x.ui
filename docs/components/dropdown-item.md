# 下拉菜单项 DropdownItem

用于表示单个下拉命令项，支持禁用、分割线和图标类名。

## 基础用法

```vue
<XDropdownItem command="copy" icon="ri-file-copy-line">复制</XDropdownItem>
<XDropdownItem command="remove" divided>删除</XDropdownItem>
```

## Props

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

## Events

| 名称 | 说明 |
| --- | --- |
| click | 点击可用菜单项时触发 |
