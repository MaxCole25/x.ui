<script setup lang="ts">
const alertCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XAlert title="保存成功" description="数据已写入草稿。" status="success" show-icon />
  </div>`
</script>

# 提示 Alert

用于页面内的结果、警告和说明提示，区别于短暂浮出的 Message。

## 基础用法

<XDocDemo title="基础用法" :code="alertCode">
  <div class="x-demo-row">
    <XAlert title="保存成功" description="数据已写入草稿。" status="success" show-icon />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| description | 描述 | `string` | - |
| status | 状态 | `success | warning | info | error` | `info` |
| variant | 形态 | `light | plain` | `light` |
| closable | 是否可关闭 | `boolean` | `false` |

## Events

| 名称 | 说明 |
| --- | --- |
| close | 关闭时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 默认内容或自定义内容 |

## 手动验收建议

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
