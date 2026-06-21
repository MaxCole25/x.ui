<script setup lang="ts">
import { ref } from 'vue'

const selectedCommand = ref('')

const dropdownItemBasicCode = `\x3Cscript setup lang="ts">
<\/script>

<XDropdownMenu width="180px">
    <XDropdownItem command="edit" icon="ri-edit-line">编辑资料</XDropdownItem>
    <XDropdownItem command="copy" icon="ri-file-copy-line">复制链接</XDropdownItem>
    <XDropdownItem command="delete" divided icon="ri-delete-bin-line">删除</XDropdownItem>
  </XDropdownMenu>`

const dropdownItemStateCode = `\x3Cscript setup lang="ts">
<\/script>

<XDropdownMenu width="180px">
    <XDropdownItem active>当前页面</XDropdownItem>
    <XDropdownItem disabled>禁用操作</XDropdownItem>
    <XDropdownItem divided>分割菜单项</XDropdownItem>
  </XDropdownMenu>`

const dropdownItemCommandCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const selectedCommand = ref('')
<\/script>

<div class="x-demo-column" style="width: 200px">
      <XDropdown trigger="click" @command="(value) => { selectedCommand = String(value) }">
        <XButton>选择操作</XButton>
        <template #dropdown>
          <XDropdownMenu width="180px">
            <XDropdownItem command="archive">归档</XDropdownItem>
            <XDropdownItem command="restore">恢复</XDropdownItem>
            <XDropdownItem command="remove" divided>移除</XDropdownItem>
          </XDropdownMenu>
        </template>
      </XDropdown>
      <p class="x-demo-label">当前命令：{{ selectedCommand }}</p>
    </div>`

const dropdownItemAppearanceCode = `\x3Cscript setup lang="ts">
<\/script>

<XDropdownMenu width="200px">
    <XDropdownItem
      active
      height="38px"
      radius="8px"
      background-color="#eff6ff"
      text-color="#1d4ed8"
      active-background-color="#1264f4"
      active-text-color="#fff"
    >
      已选菜单
    </XDropdownItem>
  </XDropdownMenu>`
</script>

# 下拉菜单项 DropdownItem

`XDropdownItem` 是下拉菜单中的单个命令项，支持图标、分割线、禁用、激活和命令值。放在 `XDropdown` 内部时，点击可用菜单项会向父级触发 `command`。

## 基础用法

<XDocDemo title="基础用法" :code="dropdownItemBasicCode">
  <XDropdownMenu width="180px">
    <XDropdownItem command="edit" icon="ri-edit-line">编辑资料</XDropdownItem>
    <XDropdownItem command="copy" icon="ri-file-copy-line">复制链接</XDropdownItem>
    <XDropdownItem command="delete" divided icon="ri-delete-bin-line">删除</XDropdownItem>
  </XDropdownMenu>
</XDocDemo>

## 状态

`active` 用于标记当前项，`disabled` 会阻止点击和命令触发，`divided` 会在当前项上方显示分割线。

<XDocDemo title="状态" :code="dropdownItemStateCode">
  <XDropdownMenu width="180px">
    <XDropdownItem active>当前页面</XDropdownItem>
    <XDropdownItem disabled>禁用操作</XDropdownItem>
    <XDropdownItem divided>分割菜单项</XDropdownItem>
  </XDropdownMenu>
</XDocDemo>

## 命令事件

`command` 只在注入了 `XDropdown` 上下文时向父级派发；单独渲染 `XDropdownItem` 时仍会触发自身的 `click` 事件。

<XDocDemo title="命令事件" :code="dropdownItemCommandCode">
  <ClientOnly>
    <div class="x-demo-column" style="width: 200px">
      <XDropdown trigger="click" @command="(value) => { selectedCommand = String(value) }">
        <XButton>选择操作</XButton>
        <template #dropdown>
          <XDropdownMenu width="180px">
            <XDropdownItem command="archive">归档</XDropdownItem>
            <XDropdownItem command="restore">恢复</XDropdownItem>
            <XDropdownItem command="remove" divided>移除</XDropdownItem>
          </XDropdownMenu>
        </template>
      </XDropdown>
      <p class="x-demo-label">当前命令：{{ selectedCommand }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 外观控制

菜单项继承通用外观属性，并额外提供悬浮、激活和分割线颜色控制。

<XDocDemo title="外观控制" :code="dropdownItemAppearanceCode">
  <XDropdownMenu width="200px">
    <XDropdownItem
      active
      height="38px"
      radius="8px"
      background-color="#eff6ff"
      text-color="#1d4ed8"
      active-background-color="#1264f4"
      active-text-color="#fff"
    >
      已选菜单
    </XDropdownItem>
  </XDropdownMenu>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| command | 点击后传给父级 `XDropdown` 的命令值 | `unknown` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| divided | 是否在当前项上方显示分割线 | `boolean` | `false` |
| icon | 图标 class，通常传入 Remix Icon 类名 | `string` | - |
| size | 菜单项尺寸 | `sm \| md \| lg` | `md` |
| active | 是否为激活状态 | `boolean` | `false` |
| height | 菜单项高度，数字按 px 处理 | `number \| string` | 跟随 `size` |
| padding | 菜单项内边距 | `string` | 跟随 `size` |
| radius | 菜单项圆角，数字按 px 处理 | `number \| string` | `4px` |
| borderWidth | 边框宽度，数字按 px 处理 | `number \| string` | - |
| borderColor | 边框颜色 | `string` | - |
| backgroundColor | 背景色 | `string` | - |
| textColor | 文字颜色 | `string` | - |
| showActiveBorder | 是否显示激活边框 | `boolean` | - |
| hoverBackgroundColor | 悬浮背景色 | `string` | 主色浅色 |
| hoverTextColor | 悬浮文字颜色 | `string` | 主色 |
| activeBackgroundColor | 激活背景色 | `string` | 主色 |
| activeTextColor | 激活文字颜色 | `string` | `#fff` |
| dividedColor | 分割线颜色 | `string` | `#edf1f7` |

## Events

| 名称 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击可用菜单项时触发，禁用状态不会触发 | `(event: MouseEvent)` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项文本或自定义内容 |

## 手动验收建议

1. 在 `XDropdown` 内点击可用菜单项，确认父级收到对应 `command`，且 `hideOnClick` 默认会关闭弹层。
2. 分别检查 `disabled`、`active`、`divided` 与图标同时存在时的对齐和 hover 状态。
3. 切换 `sm`、`md`、`lg`，确认高度符合统一尺寸规则，长文本不会撑破菜单宽度。
