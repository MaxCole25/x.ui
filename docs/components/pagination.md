<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)

const paginationCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
<\/script>

<div class="x-demo-row">
    <XPagination v-model="page" :total="86" show-page-size />
  </div>`
</script>

# 分页 Pagination

用于列表、表格和卡片流分页，支持总数、页码切换和页容量切换。

## 基础用法

<XDocDemo title="基础用法" :code="paginationCode">
  <div class="x-demo-row">
    <XPagination v-model="page" :total="86" show-page-size />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前页 | `number` | `1` |
| total | 总条数 | `number` | `0` |
| pageSize | 每页条数 | `number` | `10` |
| showTotal | 是否显示总数 | `boolean` | `true` |
| showPageSize | 是否显示页容量选择 | `boolean` | `false` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 当前页变化 |
| update:pageSize | 页容量变化 |
| change | 页码或页容量变化 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
