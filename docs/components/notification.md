<script setup lang="ts">
const notificationCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XNotification title="导出完成" message="报表已生成，可以下载。" status="success" :duration="0" />
  </div>`
</script>

# 通知 Notification

用于右上角或角落持久通知，适合后台任务、系统消息和异步结果提醒。

## 基础用法

<XDocDemo title="基础用法" :code="notificationCode">
  <div class="x-demo-row">
    <XNotification title="导出完成" message="报表已生成，可以下载。" status="success" :duration="0" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| message | 内容 | `string` | - |
| status | 状态 | `success | warning | info | error` | `info` |
| placement | 位置 | `top-right | top-left | bottom-right | bottom-left` | `top-right` |
| duration | 自动关闭时间 | `number` | `4500` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |

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
