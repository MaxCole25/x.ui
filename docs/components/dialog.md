# 弹窗 Dialog

`XDialog` 是可拖拽、可缩放的弹出窗体组件，支持 `v-model` 控制显隐，并通过插槽承载自定义业务内容。

## 基础用法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { XButton, XDialog } from 'x.ui'

const visible = ref(false)
</script>

<template>
  <XButton @click="visible = true">打开弹窗</XButton>

  <XDialog v-model="visible" title="编辑信息">
    <div>这里放置表单内容</div>
    <template #footer>
      <XButton variant="ghost" @click="visible = false">取消</XButton>
      <XButton @click="visible = false">保存</XButton>
    </template>
  </XDialog>
</template>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示弹窗（`v-model`） | `boolean` | - |
| title | 标题文本（未传 `header` 插槽时显示） | `string` | `''` |
| width | 弹窗宽度（像素） | `number` | `920` |
| height | 弹窗高度（像素） | `number` | `760` |
| minWidth | 最小宽度（像素） | `number` | `720` |
| minHeight | 最小高度（像素） | `number` | `520` |
| maxWidth | 最大宽度（像素，`0` 表示按视口自适应上限） | `number` | `0` |
| maxHeight | 最大高度（像素，`0` 表示按视口自适应上限） | `number` | `0` |
| draggable | 是否允许拖拽 | `boolean` | `true` |
| resizable | 是否允许右下角缩放 | `boolean` | `true` |
| closeOnMaskClick | 点击遮罩是否关闭 | `boolean` | `true` |

## Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| update:modelValue | 显隐状态变化 | `(value: boolean)` |
| close | 点击关闭按钮或遮罩触发关闭时触发 | `()` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 主体内容区域 |
| header | 自定义头部区域 |
| footer | 自定义底部操作区域 |

## 手动验收建议

1. 分别检查 `draggable`、`resizable` 开关，确认拖拽与缩放行为符合预期。
2. 验证 `closeOnMaskClick` 在 `true/false` 两种状态下的关闭行为。
3. 在默认、`header`、`footer` 三个插槽中放入长文本和复杂表单，确认内容不溢出且移动端可滚动。
