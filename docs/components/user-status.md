<script setup lang="ts">
import { ref } from 'vue'

const command = ref('')
const guestAction = ref('')

const userItems = [
  { text: '消息管理', command: 'message', icon: 'notification-3' },
  { text: '个人中心', command: 'profile', icon: 'user' },
  { text: '基础设置', command: 'setting', icon: 'settings-3' },
  { text: '安全退出', command: 'logout', icon: 'logout-box-r' }
]

const userStatusBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const command = ref('')
const userItems = [
  { text: '消息管理', command: 'message', icon: 'notification-3' },
  { text: '个人中心', command: 'profile', icon: 'user' },
  { text: '基础设置', command: 'setting', icon: 'settings-3' },
  { text: '安全退出', command: 'logout', icon: 'logout-box-r' }
]
<\/script>

<XUserStatus
  name="测试管理员"
  description="2026-07-02 08:08:47"
  :items="userItems"
  @command="(value) => { command = String(value) }"
/>
<p class="x-demo-label">当前命令：{{ command || '暂无' }}</p>`

const userStatusGuestCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const guestAction = ref('')
<\/script>

<XUserStatus
  :logged-in="false"
  @login-click="guestAction = '登录'"
  @register-click="guestAction = '注册'"
/>
<p class="x-demo-label">当前操作：{{ guestAction || '暂无' }}</p>`
</script>

# 用户状态 UserStatus

用于后台页头、顶部工具栏等位置展示当前用户头像、名称、副标题，并承载个人中心、设置、退出等用户菜单。

## 基础用法

<XDocDemo title="基础用法" :code="userStatusBasicCode">
  <ClientOnly>
    <div class="x-demo-column" style="align-items: flex-start; width: 240px">
      <XUserStatus
        name="测试管理员"
        description="2026-07-02 08:08:47"
        :items="userItems"
        @command="(value) => { command = String(value) }"
      />
      <p class="x-demo-label">当前命令：{{ command || '暂无' }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 未登录状态

<XDocDemo title="未登录状态" :code="userStatusGuestCode">
  <ClientOnly>
    <div class="x-demo-column" style="align-items: flex-start; width: 240px">
      <XUserStatus
        :logged-in="false"
        @login-click="guestAction = '登录'"
        @register-click="guestAction = '注册'"
      />
      <p class="x-demo-label">当前操作：{{ guestAction || '暂无' }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loggedIn | 是否已登录，为 `false` 时显示 `登录 注册` | `boolean` | `true` |
| name | 用户名 | `string` | `''` |
| description | 第二行说明文本，例如登录时间或当前时间 | `string` | `''` |
| avatarSrc | 头像图片地址 | `string` | `''` |
| avatarAlt | 头像替代文本 | `string` | `''` |
| avatarIcon | 无图片时显示的头像图标 | `string` | `user` |
| avatarIconColor | 无图片时显示的头像图标色 | `string` | `#94a3b8` |
| avatarBackgroundColor | 头像背景色 | `string` | `#f1f5f9` |
| items | 用户菜单项 | `UserStatusMenuItem[]` | `[]` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| trigger | 菜单触发方式 | `hover \| click` | `click` |
| placement | 菜单弹出位置 | `DropdownPlacement` | `bottom-end` |
| disabled | 是否禁用 | `boolean` | `false` |
| hideOnClick | 点击菜单项后是否隐藏 | `boolean` | `true` |
| modelValue | 是否显示菜单；未传入时由组件内部控制 | `boolean` | — |
| teleported | 是否将弹层挂载到 `teleportTo` | `boolean` | `true` |
| teleportTo | 弹层挂载目标 | `string` | `body` |
| zIndex | 弹层层级 | `number` | `2000` |
| borderWidth | 触发区边框宽度 | `number \| string` | `0` |
| borderColor | 触发区边框色 | `string` | `transparent` |
| backgroundColor | 触发区背景色 | `string` | `transparent` |
| textColor | 触发区文字色 | `string` | 继承文本色 |

## UserStatusMenuItem

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 菜单文本 | `string` | 必填 |
| command | 菜单命令值，未传时使用 `text` | `unknown` | `text` |
| icon | 菜单图标名称 | `string` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| divided | 是否显示上分割线 | `boolean` | `false` |
| active | 是否激活 | `boolean` | `false` |

## Events

| 名称 | 说明 |
| --- | --- |
| command | 点击可用菜单项时触发，参数为 `(command, item)` |
| visible-change | 菜单显示状态变化时触发 |
| login-click | 未登录态点击“登录”时触发 |
| register-click | 未登录态点击“注册”时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| avatar | 替换头像区域 |
| name | 替换用户名行 |
| description | 替换第二行说明 |
| menu | 完全替换菜单内容，插槽参数为 `{ items, size }` |

## 手动验收建议

1. 在 Histoire 的 `外观接口` 中切换 `sm`、`md`、`lg`，确认头像、字号和菜单项尺寸同步变化。
2. 切换 `hover` 与 `click` 触发方式，确认菜单显示和 `visible-change` 事件正常。
3. 关闭 `loggedIn`，确认只显示 `登录 注册`，且不会出现头像或菜单。
4. 设置长用户名和长说明文本，确认触发区文本省略且不挤压菜单箭头。
