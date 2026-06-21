<script setup lang="ts">
const progressCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <XProgress :percentage="64" status="success" />
  </div>`
</script>

# 进度条 Progress

用于展示任务、上传和流程完成度，支持线形和环形两种形态。

## 基础用法

<XDocDemo title="基础用法" :code="progressCode">
  <div class="x-demo-row">
    <XProgress :percentage="64" status="success" />
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percentage | 当前百分比 | `number` | `0` |
| status | 状态 | `primary | success | warning | danger` | `primary` |
| variant | 形态 | `line | circle` | `line` |
| strokeWidth | 线宽 | `number` | `8` |
| showText | 是否显示文本 | `boolean` | `true` |

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
