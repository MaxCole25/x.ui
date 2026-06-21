<script setup lang="ts">
const textBasicCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-column">
    <XText>正文文本</XText>
    <XText size="title">标题文本</XText>
    <XText variant="muted">辅助文本</XText>
  </div>`

const textAppearanceCode = `\x3Cscript setup lang="ts">
<\/script>

<XText
    model-value="外层 div 承载边框"
    border-width="3px"
    border-color="#ff0000"
    background-color="#f0fdf4"
    text-color="#000000"
    font-family="Arial, sans-serif"
    :font-size="12"
    line-height="1.55"
    :height="40"
    radius="8px"
    padding="5px 10px"
    text-align="left"
    vertical-align="middle"
  />`

const textFormatterCode = `\x3Cscript setup lang="ts">
<\/script>

<XText
    :model-value="12.5"
    :formatter="(value) => \`[\${value}]\`"
  />`
</script>

# 文本 Text

用于展示标题、正文、辅助说明和状态文本。

## 基础用法

<XDocDemo title="基础用法" :code="textBasicCode">
  <div class="x-demo-column">
    <XText>正文文本</XText>
    <XText size="title">标题文本</XText>
    <XText variant="muted">辅助文本</XText>
  </div>
</XDocDemo>

## 外观接口

`XText` 支持常用外观属性，可用于在低代码配置面板中统一控制文本容器、边框和字号样式。
当显式传入 `size="sm" | "md" | "lg"` 时，组件会按统一尺寸预设接管字号、高度、内边距和圆角：`sm` 为 `22px / 10px / 0 4px / 4px`，`md` 为 `30px / 12px / 0 8px / 6px`，`lg` 为 `38px / 14px / 0 10px / 8px`；未显式传入 `size` 时，仍可通过 `fontSize`、`height`、`padding`、`radius` 做局部外观调整。
设置 `autoHeight` 后，组件会撑满父元素高度；如需控制文字在父元素内的垂直位置，可使用 `verticalAlign="top" | "middle" | "bottom"`。当需要更贴近底部对齐时，可配合 `lineHeight="1"` 减少文字行盒上下留白。

<XDocDemo title="外观接口" :code="textAppearanceCode">
  <XText
    model-value="外层 div 承载边框"
    border-width="3px"
    border-color="#ff0000"
    background-color="#f0fdf4"
    text-color="#000000"
    font-family="Arial, sans-serif"
    :font-size="12"
    line-height="1.55"
    :height="40"
    radius="8px"
    padding="5px 10px"
    text-align="left"
    vertical-align="middle"
  />
</XDocDemo>

## 文本格式化

通过 `formatter` 可以把绑定值格式化后展示。组件不内置具体业务格式，展示规则由使用方决定。

<XDocDemo title="文本格式化" :code="textFormatterCode">
  <XText
    :model-value="12.5"
    :formatter="(value) => `[${value}]`"
  />
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定文本值，无默认插槽时显示 | `string \| number` | `''` |
| size | 文本尺寸 | `sm \| md \| lg \| title` | `md` |
| variant | 文本视觉形态 | `default \| muted \| primary \| success \| warning \| danger` | `default` |
| tag | 渲染标签 | `string` | `span` |
| truncated | 是否单行省略 | `boolean` | `false` |
| formatter | 自定义格式化函数 | `(value: string \| number) => string` | `undefined` |
| disabled | 是否禁用 | `boolean` | `false` |
| borderWidth | 边框粗细 | `number \| string` | `undefined` |
| borderColor | 边框颜色 | `string` | `undefined` |
| backgroundColor | 背景色 | `string` | `undefined` |
| textColor | 文字颜色 | `string` | `undefined` |
| fontFamily | 字体样式 | `string` | `undefined` |
| fontSize | 字体大小，未显式传入 `size` 时生效 | `number \| string` | `undefined` |
| lineHeight | 行高，数字会作为无单位行高使用 | `number \| string` | `undefined` |
| height | 组件高度，未显式传入 `size` 时生效 | `number \| string` | `undefined` |
| autoHeight | 是否自动高度 | `boolean` | `false` |
| padding | 容器内边距，未显式传入 `size` 时生效 | `number \| string` | `undefined` |
| radius | 圆角，未显式传入 `size` 时生效 | `string` | `undefined` |
| textAlign | 文字对齐 | `left \| center \| right` | `undefined` |
| verticalAlign | 垂直对齐 | `top \| middle \| bottom` | `middle` |
| name | 原生 `name` 属性 | `string` | `undefined` |
| id | 原生 `id` 属性 | `string` | `undefined` |
| maxlength | 最大显示长度 | `number` | `undefined` |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XText / `TextProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
