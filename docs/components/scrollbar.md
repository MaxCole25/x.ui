<script setup lang="ts">
const scrollbarBasicCode = `\x3Cscript setup lang="ts">
<\/script>

<div style="width: 320px">
    <XScrollbar max-height="120px">
      <p>列表项 A</p>
      <p>列表项 B</p>
      <p>列表项 C</p>
      <p>列表项 D</p>
      <p>列表项 E</p>
    </XScrollbar>
  </div>`

const scrollbarHeightCode = `\x3Cscript setup lang="ts">
<\/script>

<div style="width: 320px">
    <XScrollbar height="140px" background-color="#f8fafc" border-color="#d8e2e8" :border-width="1">
      <p v-for="index in 8" :key="index">固定高度内容 {{ index }}</p>
    </XScrollbar>
  </div>`
</script>

# 滚动条 Scrollbar

用于约束内容区域高度并提供统一滚动条样式。

## 基础用法

<XDocDemo title="基础用法" :code="scrollbarBasicCode">
  <div style="width: 320px">
    <XScrollbar max-height="120px">
      <p>列表项 A</p>
      <p>列表项 B</p>
      <p>列表项 C</p>
      <p>列表项 D</p>
      <p>列表项 E</p>
    </XScrollbar>
  </div>
</XDocDemo>

## 固定高度

通过 `height` 固定滚动区域高度，也可以结合外观属性设置边框和背景。

<XDocDemo title="固定高度" :code="scrollbarHeightCode">
  <div style="width: 320px">
    <XScrollbar height="140px" background-color="#f8fafc" border-color="#d8e2e8" :border-width="1">
      <p v-for="index in 8" :key="index">固定高度内容 {{ index }}</p>
    </XScrollbar>
  </div>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 固定高度 | `string \| number` | - |
| maxHeight | 最大高度 | `string \| number` | - |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XScrollbar / `ScrollbarProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
