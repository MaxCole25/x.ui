<script setup lang="ts">
const popconfirmCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XPopconfirm content="删除后不可恢复" :teleported="false"><XButton>删除</XButton></XPopconfirm>
  </div>`
</script>

# 气泡确认 Popconfirm

用于删除、停用等轻量确认操作，避免为了小动作打开完整弹窗。

## 基础用法

<XDocDemo title="基础用法" :code="popconfirmCode">
  <div class="x-demo-row">
    <XPopconfirm content="删除后不可恢复" :teleported="false"><XButton>删除</XButton></XPopconfirm>
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示 | `boolean` | - |
| title | 标题 | `string` | `确认执行该操作？` |
| content | 内容 | `string` | - |
| confirmText | 确认按钮文案 | `string` | `确认` |
| cancelText | 取消按钮文案 | `string` | `取消` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 显示状态变化 |
| confirm | 点击确认 |
| cancel | 点击取消 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
