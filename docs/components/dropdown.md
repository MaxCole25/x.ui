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

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | `hover \| click` | `hover` |
| placement | 弹出位置 | `bottom-start \| bottom \| bottom-end \| top-start \| top \| top-end \| left-start \| left \| left-end \| right-start \| right \| right-end` | `bottom-start` |
| size | 菜单尺寸 | `sm \| md \| lg` | `md` |
| disabled | 是否禁用 | `boolean` | `false` |
| hideOnClick | 点击菜单项后是否隐藏 | `boolean` | `true` |
| showArrow | 是否显示箭头 | `boolean` | `true` |
| offset | 弹层偏移长度 | `number \| string` | `6` |
| popperWidth | 弹层宽度 | `number \| string` | `max-content` |
| popperZIndex | 弹层层级 | `number` | `2000` |
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

## Events

| 名称 | 说明 |
| --- | --- |
| command | 菜单项命令触发 |
| visible-change | 显示状态变化 |
