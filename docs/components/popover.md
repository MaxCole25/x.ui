<script setup lang="ts">
const popoverCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XPopover content="这里展示更多字段说明" :teleported="false"><XButton>查看说明</XButton></XPopover>
  </div>`
</script>

# 气泡卡片 Popover

用于轻量说明、辅助编辑和上下文详情，位于 Tooltip 与 Dialog 之间。

## 基础用法

<XDocDemo title="基础用法" :code="popoverCode">
  <div class="x-demo-row">
    <XPopover content="这里展示更多字段说明" :teleported="false"><XButton>查看说明</XButton></XPopover>
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示 | `boolean` | - |
| title | 标题 | `string` | - |
| content | 内容 | `string` | - |
| placement | 位置 | `top | bottom | left | right` | `bottom` |
| trigger | 触发方式 | `hover | click | focus` | `click` |
| teleported | 是否 Teleport | `boolean` | `true` |
| zIndex | 层级 | `number` | `overlayZIndex.popper` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 显示状态变化 |
| show | 显示时触发 |
| hide | 隐藏时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
