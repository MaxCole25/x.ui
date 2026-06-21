<script setup lang="ts">
const skeletonCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XSkeleton avatar :rows="3" />
  </div>`
</script>

# 骨架屏 Skeleton

用于异步内容加载中的占位反馈，比整块 Loading 更适合局部数据区域。

## 基础用法

<XDocDemo title="基础用法" :code="skeletonCode">
  <div class="x-demo-row">
    <XSkeleton avatar :rows="3" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 是否显示骨架 | `boolean` | `true` |
| rows | 段落行数 | `number` | `3` |
| animated | 是否动画 | `boolean` | `true` |
| avatar | 是否显示头像占位 | `boolean` | `false` |
| title | 是否显示标题占位 | `boolean` | `true` |

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
