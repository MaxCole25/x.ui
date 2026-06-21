<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

const dialogBasicCode = `\x3Cscript setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
<\/script>

<div>
      <button
        type="button"
        style="height: 30px; min-width: 120px; border: 1px solid var(--x-color-primary); border-radius: 6px; background: var(--x-color-primary); color: #fff; cursor: pointer"
        @click="visible = true"
      >
        打开弹窗
      </button><XDialog v-model="visible" title="编辑信息" :width="520" :height="320" :min-width="360" :min-height="240"><div>这里放置表单内容。</div></XDialog>
    </div>`
</script>

# 弹窗 Dialog

`XDialog` 是可拖拽、可缩放的弹出窗体组件，支持 `v-model` 控制显隐，并通过插槽承载自定义业务内容。

## 基础用法

<XDocDemo title="基础用法" :code="dialogBasicCode">
  <ClientOnly>
    <div>
      <button
        type="button"
        style="height: 30px; min-width: 120px; border: 1px solid var(--x-color-primary); border-radius: 6px; background: var(--x-color-primary); color: #fff; cursor: pointer"
        @click="visible = true"
      >
        打开弹窗
      </button><XDialog v-model="visible" title="编辑信息" :width="520" :height="320" :min-width="360" :min-height="240"><div>这里放置表单内容。</div></XDialog>
    </div>
  </ClientOnly>
</XDocDemo>

## Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示弹窗（`v-model`） | `boolean` | - |
| title | 标题文本（未传 `header` 插槽时显示） | `string` | `''` |
| size | 弹窗尺寸，仅影响字号和关闭按钮尺寸，不影响头部、正文、底部留白与弹窗圆角 | `sm \| md \| lg` | `md` |
| width | 弹窗宽度（像素） | `number` | `920` |
| height | 弹窗高度（像素） | `number` | `760` |
| minWidth | 最小宽度（像素） | `number` | `720` |
| minHeight | 最小高度（像素） | `number` | `520` |
| maxWidth | 最大宽度（像素，`0` 表示按视口自适应上限） | `number` | `0` |
| maxHeight | 最大高度（像素，`0` 表示按视口自适应上限） | `number` | `0` |
| zIndex | 遮罩层级 | `number` | `1900` |
| draggable | 是否允许拖拽 | `boolean` | `true` |
| resizable | 是否允许右下角缩放 | `boolean` | `true` |
| showFullscreen | 是否显示全屏切换图标按钮，点击后弹窗在当前浏览器页面视口内铺满显示 | `boolean` | `false` |
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

## CSS 变量

| 变量名 | 说明 |
| --- | --- |
| `--x-dialog-header-padding` | 头部内边距 |
| `--x-dialog-body-padding` | 正文内边距 |
| `--x-dialog-footer-padding` | 底部内边距 |
| `--x-dialog-radius` | 弹窗圆角 |

## 手动验收建议

1. 分别检查 `draggable`、`resizable`、`showFullscreen` 开关，确认拖拽、缩放和全屏切换行为符合预期。
2. 验证 `closeOnMaskClick` 在 `true/false` 两种状态下的关闭行为。
3. 在默认、`header`、`footer` 三个插槽中放入长文本和复杂表单，确认内容不溢出且移动端可滚动。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XDialog / `DialogProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `maskColor` | 遮罩颜色 | `string` | — |
| `titleColor` | 标题颜色 | `string` | — |
| `headerBackgroundColor` | 头部背景色 | `string` | — |
| `bodyBackgroundColor` | 主体背景色 | `string` | — |
| `footerBackgroundColor` | 底部背景色 | `string` | — |
| `headerBorderColor` | 头部边框颜色 | `string` | — |
| `footerBorderColor` | 底部边框颜色 | `string` | — |
| `closeIconColor` | 关闭图标颜色 | `string` | — |
| `closeIconHoverColor` | 关闭图标悬浮颜色 | `string` | — |
| `closeIconHoverBackgroundColor` | 关闭图标悬浮背景色 | `string` | — |
| `shadow` | 阴影样式 | `string` | — |
| `resizerColor` | resizer颜色 | `string` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
