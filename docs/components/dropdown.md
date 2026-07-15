<script setup lang="ts">
import { ref } from 'vue'

const command = ref('')

const dropdownBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const command = ref('')
<\/script>

<div class="x-demo-column" style="width: 180px">
      <XDropdown trigger="click" @command="(value) => { command = String(value) }">
        <XButton>更多</XButton>
        <template #dropdown>
          <div style="display: flex; min-width: 136px; flex-direction: column; gap: 4px; padding: 6px">
            <button type="button" class="x-demo-action" @click="command = '编辑'">编辑</button>
            <button type="button" class="x-demo-action" style="color: #d92d20" @click="command = '删除'">删除</button>
          </div>
        </template>
      </XDropdown>
      <p class="x-demo-label">当前命令：{{ command }}</p>
    </div>`

const dropdownMenuCode = `\x3Cscript setup lang="ts">
<\/script>

<XDropdown trigger="click" popper-width="180px">
      <XButton>打开菜单</XButton>
      <template #dropdown>
        <div style="display: flex; min-width: 160px; max-height: 180px; flex-direction: column; gap: 4px; padding: 6px">
          <button type="button" class="x-demo-action">编辑</button>
          <button type="button" class="x-demo-action" style="color: #d92d20">删除</button>
        </div>
      </template>
    </XDropdown>`

const dropdownItemCode = `\x3Cscript setup lang="ts">
<\/script>

<XDropdown trigger="click" :hide-on-click="false">
      <XButton>更多操作</XButton>
      <template #dropdown>
        <div style="display: flex; min-width: 160px; flex-direction: column; gap: 4px; padding: 6px">
          <button type="button" class="x-demo-action">复制</button>
          <button type="button" class="x-demo-action" disabled style="opacity: 0.45">已禁用</button>
          <button type="button" class="x-demo-action" style="color: #d92d20">删除</button>
        </div>
      </template>
    </XDropdown>`
</script>

# 下拉菜单 Dropdown

用于承载命令菜单、更多操作和页面构建器中的动作入口。

## 基础用法

<XDocDemo title="基础用法" :code="dropdownBasicCode">
  <ClientOnly>
    <div class="x-demo-column" style="width: 180px">
      <XDropdown trigger="click" @command="(value) => { command = String(value) }">
        <XButton>更多</XButton>
        <template #dropdown>
          <div style="display: flex; min-width: 136px; flex-direction: column; gap: 4px; padding: 6px">
            <button type="button" class="x-demo-action" @click="command = '编辑'">编辑</button>
            <button type="button" class="x-demo-action" style="color: #d92d20" @click="command = '删除'">删除</button>
          </div>
        </template>
      </XDropdown>
      <p class="x-demo-label">当前命令：{{ command }}</p>
    </div>
  </ClientOnly>
</XDocDemo>

## 组件组成

当前公开入口提供 `XDropdown`，弹层内容通过 `dropdown` 插槽传入。菜单容器和菜单项可以直接使用业务侧的 HTML 或项目内按钮组件组织。

| 组件 | 职责 |
| --- | --- |
| `XDropdown` | 控制触发方式、弹层位置、Teleport、显示隐藏和 `command` 事件。 |
| `dropdown` 插槽内容 | 承载菜单列表、命令按钮、说明文本或自定义业务面板。 |

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
| modelValue | 是否显示菜单；未传入时由组件内部控制 | `boolean` | — |
| teleported | 是否将弹层挂载到 `teleportTo`，用于避免被父级裁剪 | `boolean` | `true` |
| teleportTo | 弹层挂载目标 | `string` | `body` |
| offset | 弹层偏移长度 | `number \| string` | `6` |
| popperWidth | 弹层宽度 | `number \| string` | `max-content` |
| zIndex | 弹层层级 | `number` | `2000` |
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
| dropdown | 弹层内容，通常放置菜单列表或业务面板 |

## 自定义菜单容器

### 基础用法

<XDocDemo title="菜单容器" :code="dropdownMenuCode">
  <ClientOnly>
    <XDropdown trigger="click" popper-width="180px">
      <XButton>打开菜单</XButton>
      <template #dropdown>
        <div style="display: flex; min-width: 160px; max-height: 180px; flex-direction: column; gap: 4px; padding: 6px">
          <button type="button" class="x-demo-action">编辑</button>
          <button type="button" class="x-demo-action" style="color: #d92d20">删除</button>
        </div>
      </template>
    </XDropdown>
  </ClientOnly>
</XDocDemo>

### 可控制能力

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| popperWidth | 弹层宽度 | `number \| string` | `max-content` |
| radius | 弹层圆角 | `number \| string` | `6px` |
| shadow | 弹层阴影 | `string` | 内置阴影 |
| borderWidth | 弹层边框宽度 | `number \| string` | `1px` |
| borderColor | 弹层边框色 | `string` | `#e4e7ed` |
| backgroundColor | 弹层背景色 | `string` | `#fff` |
| textColor | 弹层文字色 | `string` | `#606266` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 菜单项内容 |

## 自定义菜单项

### 基础用法

<XDocDemo title="菜单项" :code="dropdownItemCode">
  <ClientOnly>
    <XDropdown trigger="click" :hide-on-click="false">
      <XButton>更多操作</XButton>
      <template #dropdown>
        <div style="display: flex; min-width: 160px; flex-direction: column; gap: 4px; padding: 6px">
          <button type="button" class="x-demo-action">复制</button>
          <button type="button" class="x-demo-action" disabled style="opacity: 0.45">已禁用</button>
          <button type="button" class="x-demo-action" style="color: #d92d20">删除</button>
        </div>
      </template>
    </XDropdown>
  </ClientOnly>
</XDocDemo>

### 菜单项建议

1. 菜单项建议使用 `button type="button"`，避免嵌套在表单中时触发表单提交。
2. 点击菜单项后需要关闭弹层时，保持 `hideOnClick` 默认值；需要连续操作时可设置 `:hide-on-click="false"`。
3. 危险操作、禁用状态、图标和分割线可以在插槽内容中按业务设计系统自行实现。

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

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
