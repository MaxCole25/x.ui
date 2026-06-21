<script setup lang="ts">
const dropdownMenuBasicCode = `\x3Cscript setup lang="ts">
<\/script>

<XDropdownMenu width="180px">
    <XDropdownItem icon="ri-edit-line">编辑</XDropdownItem>
    <XDropdownItem icon="ri-file-copy-line">复制</XDropdownItem>
    <XDropdownItem divided icon="ri-delete-bin-line">删除</XDropdownItem>
  </XDropdownMenu>`

const dropdownMenuInDropdownCode = `\x3Cscript setup lang="ts">
<\/script>

<XDropdown trigger="click" popper-width="180px">
      <XButton>更多操作</XButton>
      <template #dropdown>
        <XDropdownMenu width="180px">
          <XDropdownItem command="edit">编辑</XDropdownItem>
          <XDropdownItem command="copy">复制</XDropdownItem>
          <XDropdownItem command="delete" divided>删除</XDropdownItem>
        </XDropdownMenu>
      </template>
    </XDropdown>`

const dropdownMenuAppearanceCode = `\x3Cscript setup lang="ts">
<\/script>

<XDropdownMenu
    width="220px"
    max-height="160px"
    padding="8px"
    radius="8px"
    border-color="#bfdbfe"
    background-color="#f8fbff"
    shadow="0 10px 24px rgba(18, 100, 244, 0.14)"
  >
    <XDropdownItem>新建任务</XDropdownItem>
    <XDropdownItem active>进行中</XDropdownItem>
    <XDropdownItem disabled>已归档</XDropdownItem>
  </XDropdownMenu>`
</script>

# 下拉菜单容器 DropdownMenu

`XDropdownMenu` 用于承载一组 `XDropdownItem`，可以单独作为菜单列表展示，也可以放入 `XDropdown` 的 `dropdown` 插槽中作为弹层内容。

## 基础用法

<XDocDemo title="基础用法" :code="dropdownMenuBasicCode">
  <XDropdownMenu width="180px">
    <XDropdownItem icon="ri-edit-line">编辑</XDropdownItem>
    <XDropdownItem icon="ri-file-copy-line">复制</XDropdownItem>
    <XDropdownItem divided icon="ri-delete-bin-line">删除</XDropdownItem>
  </XDropdownMenu>
</XDocDemo>

## 配合 Dropdown

放入 `XDropdown` 时，`XDropdownItem` 的 `command` 会通过父级 `XDropdown` 触发 `command` 事件。

<XDocDemo title="配合 Dropdown" :code="dropdownMenuInDropdownCode">
  <ClientOnly>
    <XDropdown trigger="click" popper-width="180px">
      <XButton>更多操作</XButton>
      <template #dropdown>
        <XDropdownMenu width="180px">
          <XDropdownItem command="edit">编辑</XDropdownItem>
          <XDropdownItem command="copy">复制</XDropdownItem>
          <XDropdownItem command="delete" divided>删除</XDropdownItem>
        </XDropdownMenu>
      </template>
    </XDropdown>
  </ClientOnly>
</XDocDemo>

## 外观控制

菜单容器继承通用外观属性，也提供宽度、最大高度、圆角、阴影和内边距等容器级属性。

<XDocDemo title="外观控制" :code="dropdownMenuAppearanceCode">
  <XDropdownMenu
    width="220px"
    max-height="160px"
    padding="8px"
    radius="8px"
    border-color="#bfdbfe"
    background-color="#f8fbff"
    shadow="0 10px 24px rgba(18, 100, 244, 0.14)"
  >
    <XDropdownItem>新建任务</XDropdownItem>
    <XDropdownItem active>进行中</XDropdownItem>
    <XDropdownItem disabled>已归档</XDropdownItem>
  </XDropdownMenu>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 菜单尺寸，会传递字体和密度语义 | `sm \| md \| lg` | - |
| width | 菜单宽度，数字按 px 处理 | `number \| string` | `max-content` |
| minWidth | 菜单最小宽度，数字按 px 处理 | `number \| string` | `136px` |
| maxHeight | 菜单最大高度，数字按 px 处理 | `number \| string` | `260px` |
| padding | 菜单内边距，数字按 px 处理 | `number \| string` | `6px` |
| radius | 菜单圆角，数字按 px 处理 | `number \| string` | `6px` |
| shadow | 菜单阴影 | `string` | 内置阴影 |
| borderWidth | 边框宽度，数字按 px 处理 | `number \| string` | `1px` |
| borderColor | 边框颜色 | `string` | `#e4e7ed` |
| backgroundColor | 背景色 | `string` | `#fff` |
| textColor | 文字颜色 | `string` | `#606266` |
| showActiveBorder | 是否显示激活边框 | `boolean` | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项内容，通常放置 `XDropdownItem` |

## 手动验收建议

1. 在 `XDropdown` 弹层中检查菜单是否能跟随触发器显示，并确认菜单内容不会被父容器裁剪。
2. 设置 `maxHeight` 后放入较多菜单项，检查容器滚动和圆角边界是否正常。
3. 在亮色、深色或业务主题色下检查 `borderColor`、`backgroundColor`、`textColor` 与菜单项 hover/active 状态是否协调。
