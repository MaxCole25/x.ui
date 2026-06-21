<script setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['basic'])

const collapseItems = [
  { name: 'basic', title: '基础信息', content: '这里展示基础信息。' },
  { name: 'advanced', title: '高级设置', content: '这里展示高级设置。' }
]

const collapseCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const activeNames = ref(['basic'])

const collapseItems = [
  { name: 'basic', title: '基础信息', content: '这里展示基础信息。' },
  { name: 'advanced', title: '高级设置', content: '这里展示高级设置。' }
]
<\/script>

<div class="x-demo-row">
    <XCollapse v-model="activeNames" :items="collapseItems" />
  </div>`
</script>

# 折叠面板 Collapse

用于把设置项、说明内容和详情分组折叠收纳。

## 基础用法

<XDocDemo title="基础用法" :code="collapseCode">
  <div class="x-demo-row">
    <XCollapse v-model="activeNames" :items="collapseItems" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前展开项 | `CollapseValue | CollapseValue[]` | - |
| items | 面板列表 | `CollapseItem[]` | `[]` |
| accordion | 是否手风琴模式 | `boolean` | `false` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 展开项变化 |
| change | 展开项变化 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
