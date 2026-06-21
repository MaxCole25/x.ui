<script setup lang="ts">
const badgeCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XBadge :model-value="12"><XButton>消息</XButton></XBadge>
  </div>`
</script>

# 徽标 Badge

用于消息数量、状态点和菜单提醒，可包裹任意触发元素。

## 基础用法

<XDocDemo title="基础用法" :code="badgeCode">
  <div class="x-demo-row">
    <XBadge :model-value="12"><XButton>消息</XButton></XBadge>
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 徽标内容 | `string | number` | - |
| max | 最大数字 | `number` | - |
| dot | 是否显示圆点 | `boolean` | `false` |
| hidden | 是否隐藏 | `boolean` | `false` |
| status | 颜色状态 | `primary | success | warning | danger | info` | `danger` |

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
