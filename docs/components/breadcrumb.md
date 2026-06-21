<script setup lang="ts">
const breadcrumbCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XBreadcrumb :items="[{ label: '首页', to: '#/' }, { label: '组件' }, { label: 'Breadcrumb' }]" />
  </div>`
</script>

# 面包屑 Breadcrumb

用于展示当前页面在信息架构中的位置，并支持点击中间层级返回。

## 基础用法

<XDocDemo title="基础用法" :code="breadcrumbCode">
  <div class="x-demo-row">
    <XBreadcrumb :items="[{ label: '首页', to: '#/' }, { label: '组件' }, { label: 'Breadcrumb' }]" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面包屑列表 | `BreadcrumbItem[]` | `[]` |
| separator | 分隔符 | `string` | `/` |

## Events

| 名称 | 说明 |
| --- | --- |
| click | 点击可用项时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
