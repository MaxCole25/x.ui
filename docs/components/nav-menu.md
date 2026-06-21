<script setup lang="ts">
import { ref } from 'vue'

const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]

const activeKey = ref('dashboard')

const navMenuBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]

const activeKey = ref('dashboard')
<\/script>

<div style="width: 240px">
      <XNavMenu
        :items="menuItems"
        :active-key="activeKey"
        mode="vertical"
        @select="(key) => { activeKey = key }"
      />
    </div>`

const navMenuStyleCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]

const activeKey = ref('dashboard')
<\/script>

<div style="width: 240px">
      <XNavMenu
        :items="menuItems"
        :active-key="activeKey"
        :item-radius="6"
        :submenu-item-radius="4"
        :show-submenu-arrow="true"
        submenu-arrow-icon="ri-arrow-right-s-line"
      />
    </div>`

const navMenuScrollCode = `\x3Cscript setup lang="ts">
const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]
<\/script>

<div style="width: 240px">
      <XNavMenu
        :items="menuItems"
        active-key="role"
        mode="vertical"
        scrollable
        :max-height="180"
      />
    </div>`

const navMenuSidebarCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]

const activeKey = ref('dashboard')
<\/script>

<aside style="width: 240px; height: 260px; overflow: hidden; border: 1px solid var(--x-color-border); border-radius: 6px">
      <div style="height: 48px; line-height: 48px; padding: 0 16px; font-weight: 600">x.ui Admin</div>
      <XNavMenu
        :items="menuItems"
        :active-key="activeKey"
        mode="vertical"
        scrollable
        max-height="212px"
        accordion
        @select="(key) => { activeKey = key }"
      />
    </aside>`

const navMenuHiddenCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]

const activeKey = ref('dashboard')
<\/script>

<div style="width: 240px; min-height: 48px; border: 1px dashed var(--x-color-border); padding: 10px">
      <XNavMenu :items="menuItems" :active-key="activeKey" mode="vertical" hidden />
      <span class="x-demo-label">菜单已隐藏，但组件状态仍保留。</span>
    </div>`

const navMenuAccordionCode = `\x3Cscript setup lang="ts">
const menuItems = [
  { key: 'dashboard', label: '工作台' },
  { key: 'settings', label: '设置' }
]
<\/script>

<div style="width: 240px">
      <XNavMenu :items="menuItems" active-key="role" mode="vertical" accordion />
    </div>`
</script>

# 菜单 NavMenu

`XNavMenu` 是从 NexMod `DashboardNavMenu` 抽离出的独立菜单组件，支持纵向/横向两种菜单模式，并支持多级菜单、收起态与侧边栏隐藏态。

## 基础用法

<XDocDemo title="基础用法" :code="navMenuBasicCode">
  <ClientOnly>
    <div style="width: 240px">
      <XNavMenu
        :items="menuItems"
        :active-key="activeKey"
        mode="vertical"
        @select="(key) => { activeKey = key }"
      />
    </div>
  </ClientOnly>
</XDocDemo>

## 菜单图标

`NavMenuItem.icon` 支持两种写法：传字符串时会交给 `XIcon` 渲染，可以使用 `dashboard`、`settings-3` 这类语义名，也可以继续传完整 Remix Icon 名称，例如 `ri-dashboard-line`；传 Vue 组件时会通过动态组件渲染，适合接入 `lucide-vue-next`、`@element-plus/icons-vue`、`ant-design-vue` 等第三方图标组件。

上方基础示例中的 `dashboard`、`settings-3`、`user` 等图标名称均会交给 `XIcon` 渲染。

## 自定义菜单项圆角与子菜单箭头

通过 `item-radius` 控制菜单项圆角，通过 `submenu-item-radius` 控制弹出子菜单项圆角。子菜单箭头默认跟随展开状态自动切换，也可以通过 `show-submenu-arrow` 隐藏，或通过 `submenu-arrow-icon` 统一替换为指定图标。

<XDocDemo title="自定义菜单项圆角与子菜单箭头" :code="navMenuStyleCode">
  <ClientOnly>
    <div style="width: 240px">
      <XNavMenu
        :items="menuItems"
        :active-key="activeKey"
        :item-radius="6"
        :submenu-item-radius="4"
        :show-submenu-arrow="true"
        submenu-arrow-icon="ri-arrow-right-s-line"
      />
    </div>
  </ClientOnly>
</XDocDemo>

## 纵向菜单内部滚动

`scrollable` 只影响纵向菜单。传入 `max-height` 后，滚动条会出现在菜单自身区域，适合菜单项较多且外层容器高度受限的场景。

纵向菜单收起后如果还需要弹出多级子菜单，建议同时开启 `teleported`。这样弹出层会挂载到 `teleport-to` 指定目标，避免被菜单自身或外层滚动容器裁剪。

<XDocDemo title="纵向菜单内部滚动" :code="navMenuScrollCode">
  <ClientOnly>
    <div style="width: 240px">
      <XNavMenu
        :items="menuItems"
        active-key="role"
        mode="vertical"
        scrollable
        :max-height="180"
      />
    </div>
  </ClientOnly>
</XDocDemo>

## 固定侧边栏

固定高度侧边栏中可以让头部保持固定，菜单区域独立滚动，避免页面整体被菜单撑高。

<XDocDemo title="固定侧边栏" :code="navMenuSidebarCode">
  <ClientOnly>
    <aside style="width: 240px; height: 260px; overflow: hidden; border: 1px solid var(--x-color-border); border-radius: 6px">
      <div style="height: 48px; line-height: 48px; padding: 0 16px; font-weight: 600">x.ui Admin</div>
      <XNavMenu
        :items="menuItems"
        :active-key="activeKey"
        mode="vertical"
        scrollable
        max-height="212px"
        accordion
        @select="(key) => { activeKey = key }"
      />
    </aside>
  </ClientOnly>
</XDocDemo>

## 隐藏侧边栏

当外层布局需要完全隐藏侧边栏时，可以传入 `hidden`。它会保留组件实例和受控状态，但让菜单根节点 `display: none`，适合移动端抽屉关闭或后台布局切换。

<XDocDemo title="隐藏侧边栏" :code="navMenuHiddenCode">
  <ClientOnly>
    <div style="width: 240px; min-height: 48px; border: 1px dashed var(--x-color-border); padding: 10px">
      <XNavMenu :items="menuItems" :active-key="activeKey" mode="vertical" hidden />
      <span class="x-demo-label">菜单已隐藏，但组件状态仍保留。</span>
    </div>
  </ClientOnly>
</XDocDemo>

## 手风琴展开

开启 `accordion` 后，纵向菜单同一层级内只会保留一个父菜单展开。`activeKey` 对应的父级路径会默认展开，并在 `activeKey` 变化时自动展开到当前激活项。

<XDocDemo title="手风琴展开" :code="navMenuAccordionCode">
  <ClientOnly>
    <div style="width: 240px">
      <XNavMenu :items="menuItems" active-key="role" mode="vertical" accordion />
    </div>
  </ClientOnly>
</XDocDemo>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单数据 | `NavMenuItem[]` | `[]` |
| activeKey | 当前激活菜单 key | `string` | `''` |
| mode | 菜单模式 | `'vertical' \| 'horizontal'` | `'vertical'` |
| collapsed | 是否收起（仅纵向有效） | `boolean` | `false` |
| allowCollapse | 是否启用收起能力 | `boolean` | `false` |
| hidden | 是否隐藏菜单侧边栏区域 | `boolean` | `false` |
| teleported | 是否将弹出子菜单挂载到 `teleportTo`，用于避免被父级裁剪 | `boolean` | `false` |
| teleportTo | 弹出子菜单挂载目标 | `string` | `body` |
| scrollable | 是否启用菜单自身滚动（仅纵向有效） | `boolean` | `false` |
| maxHeight | 菜单最大高度，传入数字时按 px 处理 | `number \| string` | `undefined` |
| itemGap | 竖向菜单项间距 | `number \| string` | `4` |
| accordion | 是否启用同级仅展开一个子菜单（仅纵向非收起态有效） | `boolean` | `false` |
| openKeys | 当前展开的父菜单 key，配合 `update:openKeys` 可受控使用 | `string[]` | `undefined` |
| defaultOpenKeys | 默认展开的父菜单 key | `string[]` | `[]` |
| textColor | 菜单文字默认色 | `string` | `'var(--x-color-text)'` |
| activeTextColor | 菜单文字激活色 | `string` | `'#fff'` |
| submenuActiveTextColor | 弹出子菜单 active 项文字色，只控制弹出子菜单中的激活项；未传时回退使用 `activeTextColor` | `string` | `undefined` |
| activeBackgroundColor | 菜单激活背景色 | `string` | `'var(--x-color-primary)'` |
| fontSize | 菜单文字大小，传入数字时按 px 处理 | `number \| string` | `14` |
| fontWeight | 菜单文字默认字重 | `number \| string` | `400` |
| activeFontWeight | 菜单文字激活字重 | `number \| string` | `600` |
| fontFamily | 菜单字体族 | `string` | `'var(--x-font-family)'` |
| itemRadius | 菜单项圆角，传入数字时按 px 处理 | `number \| string` | `undefined` |
| submenuItemRadius | 弹出子菜单项圆角，传入数字时按 px 处理 | `number \| string` | `undefined` |
| showSubmenuArrow | 是否显示有子菜单项右侧箭头 | `boolean` | `true` |
| submenuArrowIcon | 自定义子菜单箭头图标，字符串按 `XIcon` 名称渲染，Vue 组件按第三方图标组件渲染 | `string \| Component` | `undefined` |

## NavMenuItem 类型

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| key | 菜单唯一标识 | `string` |
| label | 菜单文本 | `string` |
| icon | 菜单图标，字符串按 `XIcon` 名称渲染，Vue 组件按第三方图标组件渲染（可选） | `string \| Component` |
| routeName | 路由名（可选） | `string` |
| permissionCode | 权限码（可选） | `string` |
| children | 子菜单（可选） | `NavMenuItem[]` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| select | 点击叶子节点菜单时触发 | `(key: string) => void` |
| open-change | 展开菜单变化时触发 | `(openKeys: string[]) => void` |
| update:openKeys | 受控展开菜单更新时触发 | `(openKeys: string[]) => void` |

## 手动验收建议

1. 在 Histoire 中切换 `vertical/horizontal`，确认菜单布局变化正确。
2. 在 `vertical` 模式下开启 `hidden`，确认侧边栏菜单区域被隐藏；关闭后状态仍保留。
3. 在 `vertical` 模式下开启 `collapsed`，确认一级菜单仅显示图标并保留 `title` 提示。
4. 在收起的纵向菜单中点击或悬停带子菜单的一级项，确认子菜单从右侧弹出，且更深层级继续向右级联弹出。
5. 点击多级菜单叶子项，确认 `select` 事件能正确返回 `key`。
6. 调整字体大小、字重和字体族，确认一级菜单、子菜单和激活态文本样式同步生效。
7. 开启 `scrollable` 并设置 `maxHeight=300`，确认滚动条只出现在菜单内部。
8. 开启 `accordion`，依次展开同级父菜单，确认前一个父菜单会自动折叠。
9. 设置 `activeKey="/security/roles"`，确认“系统设置”和“权限管理”等父级路径默认展开。
10. 调整 `itemGap`、`itemRadius`、`submenuItemRadius`、`showSubmenuArrow`、`submenuArrowIcon`，确认间距、圆角和箭头显示符合配置。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XNavMenu / `NavMenuProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
