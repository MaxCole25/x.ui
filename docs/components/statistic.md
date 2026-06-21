<script setup lang="ts">
const statisticCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XStatistic title="转化率" :model-value="18.236" :precision="2" suffix="%" />
  </div>`
</script>

# 统计数值 Statistic

用于仪表盘指标、经营数据和摘要数值展示。

## 基础用法

<XDocDemo title="基础用法" :code="statisticCode">
  <div class="x-demo-row">
    <XStatistic title="转化率" :model-value="18.236" :precision="2" suffix="%" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 数值 | `string | number` | `0` |
| title | 标题 | `string` | - |
| precision | 小数位数 | `number` | - |
| prefix | 前缀 | `string` | - |
| suffix | 后缀 | `string` | - |
| formatter | 自定义格式化 | `(value) => string` | - |

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
