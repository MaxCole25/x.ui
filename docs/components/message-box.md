<script setup lang="ts">
import { ref } from 'vue'

const serviceVisible = ref(false)

const visible = ref(false)

const messageBoxServiceCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const serviceVisible = ref(false)
<\/script>

<div>
      <button
        type="button"
        style="height: 30px; min-width: 120px; border: 1px solid var(--x-color-primary); border-radius: 6px; background: var(--x-color-primary); color: #fff; cursor: pointer"
        @click="serviceVisible = true"
      >
        模拟服务调用
      </button><XMessageBoxComponent v-model="serviceVisible" title="删除确认" message="删除后不可恢复，是否继续？" status="warning" show-cancel-button confirm-button-text="删除" cancel-button-text="取消" :close-on-mask-click="false" />
    </div>`

const messageBoxComponentCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
<\/script>

<div>
      <button
        type="button"
        style="height: 30px; min-width: 120px; border: 1px solid var(--x-color-primary); border-radius: 6px; background: var(--x-color-primary); color: #fff; cursor: pointer"
        @click="visible = true"
      >
        打开弹框
      </button><XMessageBoxComponent v-model="visible" title="提示" message="确认继续吗？" show-cancel-button />
    </div>`
</script>

# MessageBox 消息弹框

`XMessageBox` 参考 Element Plus 的 `ElMessageBox`，用于需要用户确认的反馈场景。它支持服务调用，也支持 `XMessageBoxComponent` 作为普通组件使用。

## 服务调用

<XDocDemo title="服务调用" :code="messageBoxServiceCode" language="ts">
  <ClientOnly>
    <div>
      <button
        type="button"
        style="height: 30px; min-width: 120px; border: 1px solid var(--x-color-primary); border-radius: 6px; background: var(--x-color-primary); color: #fff; cursor: pointer"
        @click="serviceVisible = true"
      >
        模拟服务调用
      </button><XMessageBoxComponent v-model="serviceVisible" title="删除确认" message="删除后不可恢复，是否继续？" status="warning" show-cancel-button confirm-button-text="删除" cancel-button-text="取消" :close-on-mask-click="false" />
    </div>
  </ClientOnly>
</XDocDemo>

## 组件用法

<XDocDemo title="组件用法" :code="messageBoxComponentCode">
  <ClientOnly>
    <div>
      <button
        type="button"
        style="height: 30px; min-width: 120px; border: 1px solid var(--x-color-primary); border-radius: 6px; background: var(--x-color-primary); color: #fff; cursor: pointer"
        @click="visible = true"
      >
        打开弹框
      </button><XMessageBoxComponent v-model="visible" title="提示" message="确认继续吗？" show-cancel-button />
    </div>
  </ClientOnly>
</XDocDemo>

## Props / Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示，仅组件模式使用 | `boolean` | `false` |
| title | 标题 | `string` | `'提示'` |
| message | 内容 | `string` | `''` |
| status | 反馈状态 | `'success' \| 'warning' \| 'info' \| 'error'` | `'info'` |
| size | 尺寸规格，仅影响字号和按钮高度，不影响弹框内边距与圆角 | `sm \| md \| lg` | `md` |
| showCancelButton | 是否显示取消按钮 | `boolean` | `false` |
| showConfirmButton | 是否显示确认按钮 | `boolean` | `true` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| closeOnMaskClick | 点击遮罩是否关闭 | `boolean` | `true` |
| confirmButtonText | 确认按钮文字 | `string` | `'确定'` |
| cancelButtonText | 取消按钮文字 | `string` | `'取消'` |
| distinguishCancelAndClose | 是否区分取消和关闭 | `boolean` | `false` |
| width | 宽度 | `number \| string` | `420` |
| minWidth | 最小宽度 | `number \| string` | `280` |
| maxWidth | 最大宽度 | `number \| string` | `calc(100vw - 32px)` |
| zIndex | 层级 | `number` | `2300` |
| backgroundColor | 弹框背景色 | `string` | `#fff` |
| textColor | 内容文字色 | `string` | `#606266` |
| titleColor | 标题色 | `string` | `#303133` |
| borderColor | 边框色 | `string` | `#e4e7ed` |
| iconColor | 图标色 | `string` | 类型色 |
| maskColor | 遮罩色 | `string` | `rgba(18, 28, 45, 0.42)` |
| confirmBackgroundColor | 确认按钮背景色 | `string` | 主色 |
| confirmTextColor | 确认按钮文字色 | `string` | `#fff` |
| confirmBorderColor | 确认按钮边框色 | `string` | 主色 |
| cancelBackgroundColor | 取消按钮背景色 | `string` | `#fff` |
| cancelTextColor | 取消按钮文字色 | `string` | `#606266` |
| cancelBorderColor | 取消按钮边框色 | `string` | `#dcdfe6` |
| radius | 圆角 | `number \| string` | `8px` |
| padding | 内边距 | `string` | `16px` |
| shadow | 阴影 | `string` | 内置阴影 |

## Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 显隐变化 | `(value: boolean)` |
| action | 用户动作 | `'confirm' \| 'cancel' \| 'close'` |
| confirm | 点击确认 | `-` |
| cancel | 点击取消 | `-` |
| close | 点击关闭 | `-` |

## 手动验收建议

- 检查 alert、confirm 服务调用是否能正常打开和关闭。
- 检查遮罩关闭、关闭按钮、确认按钮、取消按钮的动作事件。
- 检查移动端窄屏下宽度不会溢出。
