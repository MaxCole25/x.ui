<script setup lang="ts">
const steps = [
  { title: '提交', description: '提交申请' },
  { title: '审核', description: '等待审核' },
  { title: '完成', description: '流程完成' }
]

const stepsCode = `\x3Cscript setup lang="ts">
const steps = [
  { title: '提交', description: '提交申请' },
  { title: '审核', description: '等待审核' },
  { title: '完成', description: '流程完成' }
]
<\/script>

<div class="x-demo-row">
    <XSteps :items="steps" :model-value="1" />
  </div>`
</script>

# 步骤条 Steps

用于流程进度、分步表单和审批链路，支持横向、纵向和可点击切换。

## 基础用法

<XDocDemo title="基础用法" :code="stepsCode">
  <div class="x-demo-row">
    <XSteps :items="steps" :model-value="1" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前步骤索引 | `number` | `0` |
| items | 步骤列表 | `StepItem[]` | `[]` |
| direction | 方向 | `horizontal | vertical` | `horizontal` |
| clickable | 是否可点击切换 | `boolean` | `false` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 当前步骤变化 |
| change | 点击步骤时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
