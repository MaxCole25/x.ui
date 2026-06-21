<script setup lang="ts">
const gridBasicCode = `\x3Cscript setup lang="ts">
<\/script>

<XGrid :columns="3" :gap="8">
    <XGridItem>一</XGridItem>
    <XGridItem>二</XGridItem>
    <XGridItem>三</XGridItem>
  </XGrid>`

const gridCountCode = `\x3Cscript setup lang="ts">
<\/script>

<div class="x-demo-column" style="max-width: 100%">
    <XGrid :columns="3" :count="9" :gap="8" height="220px" />
    <XGrid :columns="4" :count="16" :gap="8" height="220px" />
  </div>`

const gridSpanCode = `\x3Cscript setup lang="ts">
<\/script>

<XGrid :columns="4" :gap="10">
    <XGridItem :col-span="2" background-color="#e0ecff">跨两列</XGridItem>
    <XGridItem :row-span="2" background-color="#f0fdf4">跨两行</XGridItem>
    <XGridItem>普通格子</XGridItem>
    <XGridItem column="1 / 3">指定列线</XGridItem>
  </XGrid>`

const gridAppearanceCode = `\x3Cscript setup lang="ts">
<\/script>

<XGrid
    :columns="3"
    :gap="12"
    background-color="#f8fafc"
    border-color="#94a3b8"
    :border-width="1"
    radius="8px"
    padding="12px"
  >
    <XGridItem
      v-for="index in 9"
      :key="index"
      background-color="#ffffff"
      border-color="#d8e2e8"
      :border-width="1"
      radius="6px"
      padding="12px"
    >
      {{ index }}
    </XGridItem>
  </XGrid>`
</script>

# 宫格 Grid

`XGrid` 用于构建二维宫格和栅格布局，适合九宫格、16 宫格、卡片列表、表单区域分组和需要跨行跨列的局部布局。

`XBrick` 更适合左右栏、上下区块这类一维分隔；需要二维行列时优先使用 `XGrid`。

## 基础用法

<XDocDemo title="基础用法" :code="gridBasicCode">
  <XGrid :columns="3" :gap="8">
    <XGridItem>一</XGridItem>
    <XGridItem>二</XGridItem>
    <XGridItem>三</XGridItem>
  </XGrid>
</XDocDemo>

## 九宫格和 16 宫格

没有默认插槽内容时，可以通过 `count` 快速生成占位格，方便调试宫格尺寸。

<XDocDemo title="九宫格和 16 宫格" :code="gridCountCode">
  <div class="x-demo-column" style="max-width: 100%">
    <XGrid :columns="3" :count="9" :gap="8" height="220px" />
    <XGrid :columns="4" :count="16" :gap="8" height="220px" />
  </div>
</XDocDemo>

## 跨行跨列

`XGridItem` 支持 `span`、`colSpan`、`rowSpan`，也可以通过 `column`、`row` 直接传入 CSS grid line。

<XDocDemo title="跨行跨列" :code="gridSpanCode">
  <XGrid :columns="4" :gap="10">
    <XGridItem :col-span="2" background-color="#e0ecff">跨两列</XGridItem>
    <XGridItem :row-span="2" background-color="#f0fdf4">跨两行</XGridItem>
    <XGridItem>普通格子</XGridItem>
    <XGridItem column="1 / 3">指定列线</XGridItem>
  </XGrid>
</XDocDemo>

## 颜色、边框和圆角

容器和格子都公开了常用外观属性，数字尺寸会自动转为 `px`。

<XDocDemo title="颜色、边框和圆角" :code="gridAppearanceCode">
  <XGrid
    :columns="3"
    :gap="12"
    background-color="#f8fafc"
    border-color="#94a3b8"
    :border-width="1"
    radius="8px"
    padding="12px"
  >
    <XGridItem
      v-for="index in 9"
      :key="index"
      background-color="#ffffff"
      border-color="#d8e2e8"
      :border-width="1"
      radius="6px"
      padding="12px"
    >
      {{ index }}
    </XGridItem>
  </XGrid>
</XDocDemo>

## Grid Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列模板；数字转为 `repeat(n, minmax(0, 1fr))`，字符串原样作为 CSS 值 | `number \| string` | `3` |
| rows | 行模板；数字转为 `repeat(n, minmax(0, 1fr))`，字符串原样作为 CSS 值 | `number \| string` | - |
| gap | 横竖统一间距，数字按 px 处理 | `number \| string` | - |
| rowGap | 竖向间距，优先级高于 `gap` | `number \| string` | - |
| columnGap | 横向间距，优先级高于 `gap` | `number \| string` | - |
| width | 容器宽度 | `number \| string` | `100%` |
| height | 容器高度 | `number \| string` | - |
| minWidth | 容器最小宽度 | `number \| string` | `0` |
| minHeight | 容器最小高度 | `number \| string` | `0` |
| padding | 容器内边距 | `number \| string` | - |
| autoRows | 自动生成行尺寸 | `number \| string` | - |
| autoColumns | 自动生成列尺寸 | `number \| string` | - |
| justifyItems | 格子默认水平对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |
| alignItems | 格子默认垂直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` |
| backgroundColor | 容器背景色 | `string` | - |
| textColor | 容器文字色 | `string` | - |
| borderColor | 容器边框颜色 | `string` | - |
| borderWidth | 容器边框粗细 | `number \| string` | - |
| borderStyle | 容器边框样式 | `string` | `'solid'` |
| radius | 容器圆角 | `number \| string` | - |
| count | 无默认插槽内容时生成的占位格数量 | `number` | `0` |

## GridItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 列跨度快捷属性 | `number` | - |
| colSpan | 列跨度 | `number` | - |
| rowSpan | 行跨度 | `number` | - |
| column | 自定义 `grid-column` | `string` | - |
| row | 自定义 `grid-row` | `string` | - |
| width | 格子宽度 | `number \| string` | - |
| height | 格子高度 | `number \| string` | - |
| minWidth | 格子最小宽度 | `number \| string` | `0` |
| minHeight | 格子最小高度 | `number \| string` | `0` |
| padding | 格子内边距 | `number \| string` | - |
| justifySelf | 当前格子水平对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| alignSelf | 当前格子垂直对齐 | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| backgroundColor | 格子背景色 | `string` | - |
| textColor | 格子文字色 | `string` | - |
| borderColor | 格子边框颜色 | `string` | - |
| borderWidth | 格子边框粗细 | `number \| string` | - |
| borderStyle | 格子边框样式 | `string` | `'solid'` |
| radius | 格子圆角 | `number \| string` | - |
| overflow | 内容溢出方式 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | `'auto'` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 放置任意内容，推荐使用 `XGridItem` 包裹需要外观或跨行跨列控制的格子 |

## 手动验收建议

1. 切换 `columns` 为 `3` 和 `4`，确认九宫格和 16 宫格等分。
2. 调整 `gap`、`rowGap`、`columnGap`，确认横竖间距优先级正确。
3. 设置 `colSpan`、`rowSpan`、`column`、`row`，确认单项跨行跨列生效。
4. 调整容器和格子的颜色、边框、圆角、内边距，确认公开外观属性可覆盖。
