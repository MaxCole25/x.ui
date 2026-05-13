<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  status: 'todo',
  enabled: true,
  agree: false,
  mode: 'day'
})

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' },
  { label: '已完成', value: 'done' }
]
</script>

# Form 表单

用于组织表单项，并为输入类组件提供统一的尺寸、禁用状态和主题变量。

## 典型表单

<div class="x-demo-block">
  <XForm style="max-width: 560px">
    <XFormItem label="任务名称" required>
      <XInput v-model="form.name" placeholder="请输入任务名称" clearable />
    </XFormItem>
    <XFormItem label="状态">
      <XSelect v-model="form.status" :options="statusOptions" />
    </XFormItem>
    <XFormItem label="视图模式">
      <div class="x-demo-row" style="margin: 0">
        <XRadio v-model="form.mode" name="form-mode" value="day">日</XRadio>
        <XRadio v-model="form.mode" name="form-mode" value="week">周</XRadio>
        <XRadio v-model="form.mode" name="form-mode" value="month">月</XRadio>
      </div>
    </XFormItem>
    <XFormItem label="启用">
      <XSwitch v-model="form.enabled" active-text="启用" inactive-text="停用" />
    </XFormItem>
    <XFormItem label="确认" help="表单项会继承表单尺寸、禁用状态和主题变量。">
      <XCheckbox v-model="form.agree">我已确认配置</XCheckbox>
    </XFormItem>
  </XForm>
</div>

```vue
<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  status: 'todo',
  enabled: true,
  agree: false
})

const statusOptions = [
  { label: '待处理', value: 'todo' },
  { label: '处理中', value: 'doing' }
]
</script>

<template>
  <XForm>
    <XFormItem label="任务名称" required>
      <XInput v-model="form.name" placeholder="请输入任务名称" clearable />
    </XFormItem>
    <XFormItem label="状态">
      <XSelect v-model="form.status" :options="statusOptions" />
    </XFormItem>
    <XFormItem label="启用">
      <XSwitch v-model="form.enabled" />
    </XFormItem>
    <XFormItem label="确认" help="表单项会继承表单上下文。">
      <XCheckbox v-model="form.agree">我已确认配置</XCheckbox>
    </XFormItem>
  </XForm>
</template>
```

## 顶部标签

<div class="x-demo-block">
  <XForm label-position="top" style="max-width: 420px">
    <XFormItem label="名称">
      <XInput placeholder="顶部标签更适合窄容器" />
    </XFormItem>
    <XFormItem label="状态">
      <XSelect :options="statusOptions" placeholder="请选择状态" />
    </XFormItem>
  </XForm>
</div>

```vue
<XForm label-position="top">
  <XFormItem label="名称">
    <XInput placeholder="顶部标签更适合窄容器" />
  </XFormItem>
  <XFormItem label="状态">
    <XSelect :options="options" placeholder="请选择状态" />
  </XFormItem>
</XForm>
```

## 尺寸

<div class="x-demo-block">
  <XForm size="lg" style="max-width: 520px">
    <XFormItem label="大尺寸">
      <XInput placeholder="内部输入控件继承 lg 尺寸" />
    </XFormItem>
    <XFormItem label="选择器">
      <XSelect :options="statusOptions" placeholder="请选择状态" />
    </XFormItem>
  </XForm>
</div>

```vue
<XForm size="lg">
  <XFormItem label="大尺寸">
    <XInput placeholder="内部输入控件继承 lg 尺寸" />
  </XFormItem>
</XForm>
```

## 禁用表单

<div class="x-demo-block">
  <XForm disabled style="max-width: 520px">
    <XFormItem label="名称">
      <XInput model-value="已禁用" />
    </XFormItem>
    <XFormItem label="状态">
      <XSelect model-value="todo" :options="statusOptions" />
    </XFormItem>
    <XFormItem label="启用">
      <XSwitch model-value />
    </XFormItem>
  </XForm>
</div>

```vue
<XForm disabled>
  <XFormItem label="名称">
    <XInput model-value="已禁用" />
  </XFormItem>
  <XFormItem label="启用">
    <XSwitch model-value />
  </XFormItem>
</XForm>
```

## 校验提示

<div class="x-demo-block">
  <XForm style="max-width: 520px">
    <XFormItem label="用户名" required error="用户名不能为空">
      <XInput status="error" placeholder="请输入用户名" />
    </XFormItem>
    <XFormItem label="备注" help="这是一条普通帮助文本。">
      <XInput placeholder="请输入备注" />
    </XFormItem>
  </XForm>
</div>

```vue
<XForm>
  <XFormItem label="用户名" required error="用户名不能为空">
    <XInput status="error" placeholder="请输入用户名" />
  </XFormItem>
  <XFormItem label="备注" help="这是一条普通帮助文本。">
    <XInput placeholder="请输入备注" />
  </XFormItem>
</XForm>
```

## 业务主题

<div class="x-demo-block">
  <XForm color="#7c3aed" border-color="#c4b5fd" radius="12px" style="max-width: 520px">
    <XFormItem label="名称">
      <XInput placeholder="继承表单主题色" />
    </XFormItem>
    <XFormItem label="状态">
      <XSelect :options="statusOptions" placeholder="继承表单主题色" />
    </XFormItem>
    <XFormItem label="确认">
      <XCheckbox model-value>继承表单主题色</XCheckbox>
    </XFormItem>
  </XForm>
</div>

```vue
<XForm color="#7c3aed" border-color="#c4b5fd" radius="12px">
  <XFormItem label="名称">
    <XInput placeholder="继承表单主题色" />
  </XFormItem>
  <XFormItem label="状态">
    <XSelect :options="options" placeholder="继承表单主题色" />
  </XFormItem>
</XForm>
```

## XForm Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| model | 表单数据对象 | `Record<string, unknown>` | - |
| disabled | 是否禁用内部组件 | `boolean` | `false` |
| size | 内部组件尺寸 | `sm \| md \| lg` | `md` |
| labelWidth | 标签宽度 | `string \| number` | `96px` |
| labelPosition | 标签位置 | `left \| top` | `left` |
| color | 表单主题色 | `string` | - |
| borderColor | 表单边框色 | `string` | - |
| radius | 表单圆角 | `string` | - |

## XFormItem Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签文本 | `string` | - |
| prop | 字段名 | `string` | - |
| required | 是否显示必填标记 | `boolean` | `false` |
| error | 错误信息 | `string` | - |
| help | 帮助信息 | `string` | - |
| labelWidth | 当前项标签宽度 | `string \| number` | - |

## 手动验收建议

- 检查不同 `size` 下输入框、选择器、开关和选择控件高度是否协调。
- 检查业务项目覆盖 `--x-color-primary`、`--x-color-border`、`--x-radius-md` 后样式是否统一。
- 检查禁用表单时内部组件是否继承禁用状态。
