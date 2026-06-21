<script setup lang="ts">
const descriptionItems = [
  { label: '产品', value: 'x.ui' },
  { label: '版本', value: '1.0.0' },
  { label: '产品', value: 'x.ui' }
]

const descriptionsCode = `\x3Cscript setup lang="ts">
const descriptionItems = [
  { label: '产品', value: 'x.ui' },
  { label: '版本', value: '1.0.0' },
  { label: '状态', value: '维护中' }
]
<\/script>

<div class="x-demo-row">
    <XDescriptions title="订单信息" bordered :items="descriptionItems" />
  </div>`
</script>

# 描述列表 Descriptions

用于详情页字段展示，适合用户资料、订单信息和审批摘要。

## 基础用法

<XDocDemo title="基础用法" :code="descriptionsCode">
  <div class="x-demo-row">
    <XDescriptions title="订单信息" bordered :items="descriptionItems" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| items | 描述项 | `DescriptionItem[]` | `[]` |
| column | 列数 | `number` | `3` |
| bordered | 是否显示边框 | `boolean` | `false` |
| labelWidth | 标签宽度 | `number | string` | `96px` |

## Events

暂无事件。

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
