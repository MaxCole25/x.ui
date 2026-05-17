<script setup>
import { reactive, ref } from 'vue'

const formRef = ref()
const form = reactive({
  username: '',
  password: '',
  status: 'todo',
  enabled: true,
  hasDrawing: true,
  reviewed: false,
  archived: true,
  remark: '<p>固定高度容器中的备注内容。</p>'
})

const result = ref('等待校验')
const rules = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 2, message: '用户名至少 2 个字符' }
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少 6 个字符' }
  ]
}

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]

const validate = async () => {
  result.value = await formRef.value?.validate() ? '校验通过' : '校验未通过'
}

const reset = () => {
  formRef.value?.resetFields()
  result.value = '已重置'
}
</script>

# Form 表单

`XForm` 和 `XFormItem` 用于统一企业业务表单的布局、标签宽度、尺寸、禁用状态、校验行为和错误提示。业务项目应优先使用 `XForm` / `XFormItem`，避免直接散落使用底层表单实现。

## 基础用法

<div class="x-demo-block">
  <XForm ref="formRef" :model="form" :rules="rules" label-width="96px" style="max-width: 560px">
    <XFormItem label="用户名" prop="username" required>
      <XInput v-model="form.username" placeholder="请输入用户名" clearable />
    </XFormItem>
    <XFormItem label="密码" prop="password" required help="密码不少于 6 个字符。">
      <XInput v-model="form.password" type="password" placeholder="请输入密码" />
    </XFormItem>
    <XFormItem label="状态" prop="status">
      <XSelect v-model="form.status" :options="statusOptions" />
    </XFormItem>
    <XFormItem label="启用">
      <XSwitch v-model="form.enabled" active-text="启用" inactive-text="停用" />
    </XFormItem>
    <XFormItem label="操作">
      <div class="x-demo-row" style="margin: 0">
        <XButton style="width: auto" @click="validate">校验</XButton>
        <XButton variant="outline" style="width: auto" @click="reset">重置</XButton>
        <span>{{ result }}</span>
      </div>
    </XFormItem>
  </XForm>
</div>

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormExpose, FormRules } from 'x.ui'

const formRef = ref<FormExpose>()
const form = reactive({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
}

const submit = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return
}
</script>

<template>
  <XForm ref="formRef" :model="form" :rules="rules" size="md">
    <XFormItem label="用户名" prop="username">
      <XInput v-model="form.username" />
    </XFormItem>

    <XFormItem label="密码" prop="password">
      <XInput v-model="form.password" type="password" />
    </XFormItem>
  </XForm>
</template>
```

## 继承机制

`XForm` 会通过 provide/inject 向下传递 `size`、`disabled`、`labelWidth`、`labelPosition` 和表单实例。输入框、选择器、开关等表单控件会自动继承尺寸和禁用状态。

<div class="x-demo-block">
  <XForm size="sm" disabled style="max-width: 520px">
    <XFormItem label="用户名">
      <XInput model-value="整表禁用" />
    </XFormItem>
    <XFormItem label="状态">
      <XSelect model-value="todo" :options="statusOptions" />
    </XFormItem>
  </XForm>
</div>

```vue
<XForm size="sm" disabled>
  <XFormItem label="用户名">
    <XInput v-model="form.username" />
  </XFormItem>
</XForm>
```

## 标签与插槽

`XFormItem` 支持默认插槽、`#label`、`#help` 和 `#error`，便于业务表单放置复杂标签、辅助说明和统一错误文案。

<div class="x-demo-block">
  <XForm label-position="top" style="max-width: 420px">
    <XFormItem prop="username" error="用户名称需要保持唯一。">
      <template #label>用户名称</template>
      <XInput v-model="form.username" placeholder="请输入用户名称" status="error" />
      <template #error>用户名称需要保持唯一。</template>
    </XFormItem>
    <XFormItem label="备注">
      <XInput placeholder="请输入备注" />
      <template #help>帮助文本可用来解释字段填写规则。</template>
    </XFormItem>
  </XForm>
</div>

## 紧凑横向控件

短标签搭配开关、复选框等小控件时，可在 `XFormItem` 上设置 `align="center"`，让标签和控件在垂直方向居中对齐，避免业务页面通过 `:deep` 覆写内部结构。该模式会保留错误和帮助文案的独立换行区域；更推荐用于没有错误提示的状态开关条等紧凑场景。

<div class="x-demo-block">
  <div class="x-demo-row" style="align-items: center; flex-wrap: wrap; gap: 12px 18px; margin: 0">
    <XFormItem label="含图纸" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.hasDrawing" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
    <XFormItem label="已复核" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.reviewed" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
    <XFormItem label="已归档" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.archived" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
  </div>
</div>

```vue
<template>
  <div class="status-bar">
    <XFormItem label="含图纸" label-position="left" label-width="58px" size="sm" align="center">
      <XSwitch v-model="form.hasDrawing" size="md" label-position="inside" active-text="是" inactive-text="否" />
    </XFormItem>
  </div>
</template>
```

## 标签与内容对齐

`XFormItem` 提供 `labelAlign`、`contentAlign` 和 `contentJustify` 控制内部 label 与 content 的横向布局。开关、复选框等自身宽度较小的控件可通过 `content-justify="end"` 靠右放置；只读文本或居中输入框可通过 `content-align="center"` 统一控制内容区文本对齐。

<div class="x-demo-block">
  <XForm label-position="left" label-width="86px" style="max-width: 360px">
    <XFormItem label="含税" content-justify="end">
      <XSwitch v-model="form.enabled" />
    </XFormItem>
    <XFormItem label="付款方式" content-align="center">
      <XInput v-model="form.status" text-align="center" />
    </XFormItem>
  </XForm>
</div>

```vue
<template>
  <XFormItem
    label="含税"
    label-position="left"
    label-width="86px"
    content-justify="end"
  >
    <XSwitch v-model="form.taxIncluded" />
  </XFormItem>

  <XFormItem
    label="付款方式"
    content-align="center"
  >
    <XInput v-model="form.paymentMethod" text-align="center" />
  </XFormItem>
</template>
```

## 内容区填满高度

父容器有明确高度时，可在 `label-position="top"` 的 `XFormItem` 上开启 `content-fill-height`。标签保持自然高度，内容区和字段容器会填满剩余高度，适合放置已经支持 `fill-height` 的富文本、表格等复杂控件。

<div class="x-demo-block">
  <div style="height: 320px; min-height: 0; max-width: 640px">
    <XFormItem label="备注" label-position="top" content-fill-height>
      <XRichTextEditor v-model="form.remark" fill-height :show-outline="false" />
    </XFormItem>
  </div>
</div>

```vue
<template>
  <div class="remark-field">
    <XFormItem
      label="备注"
      label-position="top"
      content-fill-height
    >
      <XRichTextEditor v-model="form.remark" fill-height :show-outline="false" />
    </XFormItem>
  </div>
</template>

<style scoped>
.remark-field {
  height: 320px;
  min-height: 0;
}
</style>
```

## 表单项主题配色

`XFormItem` 默认仍保持通用浅色风格。业务系统需要适配暗色主题时，可以通过 props 快速映射到 CSS variables，也可以在父级容器直接覆盖 `--x-form-item-*` 变量，统一控制 label、内容、背景、边框、必填星号、错误提示和辅助说明颜色。

<div class="x-demo-block" style="background: #020617; border-color: #1e293b">
  <XForm label-position="left" label-width="86px" style="max-width: 520px">
    <XFormItem
      label="审批人"
      required
      help="通过 props 覆盖当前表单项配色。"
      label-text-color="#dbeafe"
      content-text-color="#f8fafc"
      background-color="#111827"
      border-color="#334155"
      required-mark-color="#fb7185"
      hint-text-color="#94a3b8"
      style="--x-form-item-border-width: 1px; border-radius: 6px; padding: 10px 12px;"
    >
      <XInput v-model="form.username" background-color="#0f172a" border-color="#475569" color="#f8fafc" placeholder="请输入审批人" />
    </XFormItem>
  </XForm>
</div>

```vue
<template>
  <XFormItem
    label="审批人"
    required
    help="暗色主题辅助说明"
    label-text-color="#dbeafe"
    content-text-color="#f8fafc"
    background-color="#111827"
    border-color="#334155"
    required-mark-color="#fb7185"
    error-text-color="#f87171"
    hint-text-color="#94a3b8"
    style="--x-form-item-border-width: 1px;"
  >
    <XInput v-model="form.approver" />
  </XFormItem>

  <div class="dark-form-scope">
    <XFormItem label="备注" help="由父级 CSS variables 统一控制">
      <XInput v-model="form.remark" />
    </XFormItem>
  </div>
</template>

<style scoped>
.dark-form-scope {
  --x-form-item-label-color: #dbeafe;
  --x-form-item-content-color: #f8fafc;
  --x-form-item-bg: #111827;
  --x-form-item-border-color: #334155;
  --x-form-item-border-width: 1px;
  --x-form-item-required-color: #fb7185;
  --x-form-item-error-color: #f87171;
  --x-form-item-hint-color: #94a3b8;
}
</style>
```

## 暴露方法

`XForm` 通过 `defineExpose` 暴露以下方法：

| 方法 | 说明 |
| --- | --- |
| validate | 校验全部字段，返回 `Promise<boolean>` |
| validateField | 校验指定字段 |
| resetFields | 重置指定字段或全部字段 |
| clearValidate | 清除指定字段或全部字段的校验信息 |
| scrollToField | 滚动到指定字段 |

## XForm Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `Record<string, unknown>` | - |
| rules | 表单校验规则 | `FormRules` | - |
| disabled | 是否禁用内部组件 | `boolean` | `false` |
| size | 表单尺寸 | `sm \| md \| lg` | `md` |
| inline | 是否行内布局 | `boolean` | `false` |
| labelWidth | 标签宽度 | `string \| number` | `96px` |
| labelPosition | 标签位置 | `left \| right \| top` | `right` |
| loading | 是否显示加载遮罩 | `boolean` | `false` |

## XFormItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | - |
| prop | 字段路径 | `string` | - |
| required | 是否必填 | `boolean` | `false` |
| rules | 当前项校验规则 | `FormItemRule[]` | - |
| error | 外部错误信息 | `string` | - |
| size | 覆盖当前项尺寸 | `sm \| md \| lg` | - |
| disabled | 覆盖当前项禁用状态 | `boolean` | - |
| help | 帮助文本 | `string` | - |
| contentFillHeight | 内容区是否填满表单项扣除标签后的剩余高度 | `boolean` | `false` |
| align | 标签和内容的垂直对齐方式 | `start \| center` | `start` |
| labelAlign | 标签文本横向对齐方式 | `left \| center \| right` | - |
| contentAlign | 内容区文本横向对齐方式 | `left \| center \| right \| stretch` | - |
| contentJustify | 内容区网格项横向分布方式 | `start \| center \| end \| stretch` | - |
| contentClass | 追加到内容区的 class | `string \| string[] \| Record<string, boolean>` | - |
| contentStyle | 追加到内容区的 style | `string \| Record<string, string \| number>` | - |
| labelClass | 追加到标签的 class | `string \| string[] \| Record<string, boolean>` | - |
| labelStyle | 追加到标签的 style | `string \| Record<string, string \| number>` | - |
| labelTextColor | 标签文字颜色，映射到 `--x-form-item-label-color` | `string` | - |
| labelColor | 标签文字颜色别名，映射到 `--x-form-item-label-color` | `string` | - |
| contentTextColor | 内容区域文字颜色，映射到 `--x-form-item-content-color` | `string` | - |
| backgroundColor | 表单项背景色，映射到 `--x-form-item-bg` | `string` | - |
| borderColor | 表单项边框或分隔线颜色，映射到 `--x-form-item-border-color` | `string` | - |
| requiredMarkColor | 必填星号颜色，映射到 `--x-form-item-required-color` | `string` | - |
| errorTextColor | 错误提示文字颜色，映射到 `--x-form-item-error-color` | `string` | - |
| hintTextColor | 辅助说明文字颜色，映射到 `--x-form-item-hint-color` | `string` | - |
| descriptionTextColor | 辅助说明文字颜色别名，映射到 `--x-form-item-hint-color` | `string` | - |
| loading | 当前项加载状态 | `boolean` | `false` |

## 手动验收建议

- 检查 `sm`、`md`、`lg` 三档下标签、输入框、选择器和开关高度是否协调。
- 检查 `disabled`、`labelWidth`、`labelPosition` 是否能从 `XForm` 自动继承到内部表单项。
- 检查 `validate`、`validateField`、`resetFields`、`clearValidate` 和 `scrollToField` 是否可通过 `ref` 调用。
- 检查错误提示、帮助文本、自定义插槽和加载状态是否符合业务视觉规范。
- 在固定高度父容器内检查 `content-fill-height` 搭配 `label-position="top"` 和 `XRichTextEditor fill-height` 时，内容区是否填满标签下方剩余高度且不遮挡下一项。
