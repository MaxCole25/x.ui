<script setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('这是一段多行文本')
const autoValue = ref('自动高度适合备注、说明、审批意见等长度不固定的内容。继续输入时，文本域会跟随内容增长。')
const maxRowsValue = ref('设置 maxRows 后，文本域最多显示指定行数。内容继续增加时，组件不会继续撑高页面，而是在文本域内部显示竖向滚动条。')
const nowrapValue = ref('这是一段很长很长的单行内容，用于验证禁止自动换行时只保留竖向滚动能力并隐藏横向溢出。')

const textareaBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const basicValue = ref('这是一段多行文本')
<\/script>

<XTextarea v-model="basicValue" placeholder="请输入内容" clearable />`

const textareaAutoHeightCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const autoValue = ref('自动高度适合备注、说明、审批意见等长度不固定的内容。')
<\/script>

<XTextarea v-model="autoValue" auto-height :rows="2" />`

const textareaMaxRowsCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const maxRowsValue = ref('设置 maxRows 后，文本域最多显示指定行数。内容继续增加时会显示竖向滚动条。')
<\/script>

<XTextarea v-model="maxRowsValue" auto-height :rows="2" :max-rows="3" />`

const textareaNoWrapCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const nowrapValue = ref('这是一段很长很长的单行内容，用于验证禁止自动换行。')
<\/script>

<XTextarea v-model="nowrapValue" :allow-wrap="false" :rows="3" />`
</script>

# Textarea 多行输入框

`XTextarea` 用于输入多行文本，支持自动高度、最大行数滚动、禁用换行、清空按钮和输入框体系一致的尺寸与状态。

## 基础用法

<XDocDemo title="基础用法" :code="textareaBasicCode">
  <div style="width: 360px">
    <XTextarea v-model="basicValue" placeholder="请输入内容" clearable />
  </div>
</XDocDemo>

## 自动高度

设置 `autoHeight` 后，文本域会根据输入内容自动增高。不设置 `maxRows` 时，高度会持续跟随内容增长。

<XDocDemo title="自动高度" :code="textareaAutoHeightCode">
  <div style="width: 360px">
    <XTextarea v-model="autoValue" auto-height :rows="2" />
  </div>
</XDocDemo>

## 最大行数滚动

设置 `maxRows` 后，文本域最多显示指定行数；内容超过后保留竖向滚动条，避免撑开页面布局。

<XDocDemo title="最大行数滚动" :code="textareaMaxRowsCode">
  <div style="width: 360px">
    <XTextarea v-model="maxRowsValue" auto-height :rows="2" :max-rows="3" />
  </div>
</XDocDemo>

## 禁止自动换行

设置 `allowWrap=false` 后，文本不会自动换行，横向溢出会隐藏；需要滚动时只显示竖向滚动条。

<XDocDemo title="禁止自动换行" :code="textareaNoWrapCode">
  <div style="width: 360px">
    <XTextarea v-model="nowrapValue" :allow-wrap="false" :rows="3" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | `string` | `''` |
| placeholder | 占位文本 | `string` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| readonly | 是否只读 | `boolean` | `false` |
| clearable | 是否显示清空按钮 | `boolean` | `false` |
| hideClearButton | 是否隐藏清空按钮 | `boolean` | `false` |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| status | 校验状态 | `default \| success \| warning \| error` | `default` |
| rows | 初始可见行数 | `number` | `3` |
| maxRows | 最大显示行数，超出后显示竖向滚动条 | `number` | `undefined` |
| autoHeight | 是否随内容自动增高 | `boolean` | `false` |
| allowWrap | 是否允许自动换行 | `boolean` | `true` |
| width | 组件宽度 | `number \| string` | `undefined` |
| height | 组件高度 | `number \| string` | `undefined` |
| fontFamily | 字体 | `string` | `undefined` |
| fontSize | 字号 | `number \| string` | `undefined` |
| padding | 内边距 | `number \| string` | `undefined` |
| radius | 圆角 | `number \| string` | `undefined` |
| textAlign | 文本对齐 | `left \| center \| right` | `undefined` |
| borderWidth | 边框粗细 | `number \| string` | `undefined` |
| borderColor | 边框颜色 | `string` | `undefined` |
| backgroundColor | 背景色 | `string` | `undefined` |
| inputBackgroundColor | 输入区域背景色，优先级高于 `backgroundColor` | `string` | `undefined` |
| textColor | 文字颜色 | `string` | `undefined` |
| accentColor | 主题色，未设置 `activeBorderColor` 时作为激活边框色 | `string` | `undefined` |
| activeBorderColor | 激活边框色 | `string` | `undefined` |
| disabledBackgroundColor | 禁用背景色 | `string` | `undefined` |
| disabledTextColor | 禁用文字颜色 | `string` | `undefined` |
| clearIconColor | 清空图标颜色 | `string` | `undefined` |
| clearIconSize | 清空图标尺寸 | `number \| string` | `undefined` |
| showActiveBorder | 是否显示激活边框 | `boolean` | `true` |
| name | 原生 `name` 属性 | `string` | `undefined` |
| id | 原生 `id` 属性 | `string` | `undefined` |
| maxlength | 最大输入长度 | `number` | `undefined` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 输入值变化时触发 |
| input | 输入时触发 |
| change | 原生 change 时触发 |
| clear | 点击清空时触发 |
| focus | 聚焦时触发 |
| blur | 失焦时触发 |
| keydown | 按键按下时触发 |
| keyup | 按键释放时触发 |
