<script setup lang="ts">
const dividerBasicCode = `\x3Cscript setup lang="ts">
<\/script>

<XDivider>标题</XDivider>`

const dividerVerticalCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-row">
    <span>文本</span>
    <XDivider direction="vertical" />
    <span>文本</span>
  </div>`

const dividerStyleCode = `\x3Cscript setup lang="ts">
<\/script>

<XDivider content-position="left" border-style="dashed" border-color="#0e7490">
    左侧标题
  </XDivider>

  <XDivider content-position="right" border-style="dotted" :thickness="2" text-color="#7c3aed">
    右侧标题
  </XDivider>`
</script>

# 分割线 Divider

用于分隔内容区域，支持水平、垂直、标题文本和线型。

## 基础用法

<XDocDemo title="水平分割线" :code="dividerBasicCode">
  <XDivider>标题</XDivider>
</XDocDemo>

## 垂直分割线

垂直分割线适合在同一行内分隔短文本或工具项。

<XDocDemo title="垂直分割线" :code="dividerVerticalCode">
  <div class="x-demo-row">
    <span>文本</span>
    <XDivider direction="vertical" />
    <span>文本</span>
  </div>
</XDocDemo>

## 标题位置和线型

通过 `contentPosition`、`borderStyle`、`thickness` 和颜色属性调整分割线的视觉表现。

<XDocDemo title="标题位置和线型" :code="dividerStyleCode">
  <XDivider content-position="left" border-style="dashed" border-color="#0e7490">
    左侧标题
  </XDivider>

  <XDivider content-position="right" border-style="dotted" :thickness="2" text-color="#7c3aed">
    右侧标题
  </XDivider>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 方向 | `horizontal \| vertical` | `horizontal` |
| contentPosition | 文本位置 | `left \| center \| right` | `center` |
| borderStyle | 线型 | `solid \| dashed \| dotted` | `solid` |
| thickness | 分割线粗细，数字按 px 处理 | `number \| string` | `1px` |
| margin | 外边距，数字按 px 处理 | `number \| string` | 水平 `16px`，垂直 `8px` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 水平分割线中的文本 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XDivider / `DividerProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
