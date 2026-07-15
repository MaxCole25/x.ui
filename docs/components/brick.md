<script setup lang="ts">
const brickBasicCode = `\x3Cscript setup lang="ts">
<\/script>

<XBrick direction="horizontal" :gap="8" height="220px">
    <XBrickItem width="160px" background-color="#e0ecff">左侧</XBrickItem>
    <XBrickItem background-color="#f8fafc">中间自适应</XBrickItem>
    <XBrickItem width="30%" background-color="#f0fdf4">右侧</XBrickItem>
  </XBrick>`

const brickVerticalCode = `\x3Cscript setup lang="ts">
<\/script>

<XBrick direction="vertical" height="260px" :gap="8">
    <XBrickItem height="64px" background-color="#e0ecff">顶部</XBrickItem>
    <XBrickItem background-color="#f8fafc">内容一</XBrickItem>
    <XBrickItem background-color="#f0fdf4">内容二</XBrickItem>
  </XBrick>`

const brickCountCode = `\x3Cscript setup lang="ts">
<\/script>

<XBrick :count="3" height="180px" :gap="8" />`

const brickAlignCode = `\x3Cscript setup lang="ts">
<\/script>

<XBrick height="220px" right-align vertical-center horizontal-center padding="16px">
    <XBrickItem width="180px" background-color="#e0ecff">区块整体靠右，内容继承居中</XBrickItem>
    <XBrickItem :vertical-center="false" padding="8px" background-color="#f8fafc">覆盖父级配置</XBrickItem>
    <XBrickItem width="30%" bottom-align right-align background-color="#f0fdf4">内容右下对齐</XBrickItem>
  </XBrick>`
</script>

# 砖格 Brick

`XBrick` 用于把一个容器按单一方向分隔成多个区域，适合面板、左右栏、上下分区和可嵌套的局部布局。

固定尺寸区域会先占用空间，未设置尺寸的区域会平分剩余空间。复杂二维布局可以通过嵌套 `XBrick` 实现。

## 基础用法

<XDocDemo title="基础用法" :code="brickBasicCode">
  <XBrick direction="horizontal" :gap="8" height="220px">
    <XBrickItem width="160px" background-color="#e0ecff">左侧</XBrickItem>
    <XBrickItem background-color="#f8fafc">中间自适应</XBrickItem>
    <XBrickItem width="30%" background-color="#f0fdf4">右侧</XBrickItem>
  </XBrick>
</XDocDemo>

## 竖向分隔

<XDocDemo title="竖向分隔" :code="brickVerticalCode">
  <XBrick direction="vertical" height="260px" :gap="8">
    <XBrickItem height="64px" background-color="#e0ecff">顶部</XBrickItem>
    <XBrickItem background-color="#f8fafc">内容一</XBrickItem>
    <XBrickItem background-color="#f0fdf4">内容二</XBrickItem>
  </XBrick>
</XDocDemo>

## 根据数量生成空容器

当没有传入内部容器插槽时，可以通过 `count` 生成指定数量的空区域，用于占位或后续动态填充。

<XDocDemo title="根据数量生成空容器" :code="brickCountCode">
  <XBrick :count="3" height="180px" :gap="8" />
</XDocDemo>

## 区块对齐、内容对齐和内边距

`XBrick` 的 `rightAlign` 用于让直接子区块整体靠右排列；横向分隔时会把区块组推到右侧，竖向分隔时会把区块贴到右侧。横向右对齐时，未设置主轴尺寸的 `XBrickItem` 会按内容收缩，避免继续平分剩余空间。

`XBrick` 仍可以为所有内部容器统一设置内容垂直居中、水平居中、下对齐和内边距；`XBrickItem` 传入同名属性时会覆盖父级配置。`XBrickItem` 的 `rightAlign` 用于控制当前容器内部内容右对齐。若同时开启居中和末端对齐，末端对齐优先。

<XDocDemo title="区块对齐、内容对齐和内边距" :code="brickAlignCode">
  <XBrick height="220px" right-align vertical-center horizontal-center padding="16px">
    <XBrickItem width="180px" background-color="#e0ecff">区块整体靠右，内容继承居中</XBrickItem>
    <XBrickItem :vertical-center="false" padding="8px" background-color="#f8fafc">覆盖父级配置</XBrickItem>
    <XBrickItem width="30%" bottom-align right-align background-color="#f0fdf4">内容右下对齐</XBrickItem>
  </XBrick>
</XDocDemo>

## 滚动条样式

`XBrickItem` 默认使用 `overflow="auto"`，内容过多时会显示较细的半透明滚动条。需要隐藏滚动条和溢出内容时，可以显式设置 `overflow="hidden"`。

滚动条颜色可以通过 `--x-brick-scrollbar-thumb` 和 `--x-brick-scrollbar-thumb-hover` 覆盖。

## 尺寸规则

- `direction="horizontal"` 表示从左到右分隔，固定项按 `size || width` 占宽度。
- `direction="vertical"` 表示从上到下分隔，固定项按 `size || height` 占高度。
- 未设置主轴尺寸的 `XBrickItem` 使用 `flex: 1 1 0` 平分剩余空间。
- 设置主轴尺寸的 `XBrickItem` 使用 `flex: 0 0 <size>`。
- 数字尺寸会转成 `px`，字符串尺寸会原样作为 CSS 长度。
- `XBrickItem` 的 `verticalCenter`、`horizontalCenter`、`bottomAlign`、`rightAlign` 和 `padding` 优先级高于 `XBrick` 的内容布局同名属性。
- `XBrickItem` 内继续嵌套 `XBrick` 时，内层 `XBrick` 会继承外层 item 已合并后的居中和内边距；内层 `XBrick` 显式传入同名属性时仍以显式值为准。

## Brick Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 分隔方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| count | 无内部容器时生成的空容器数量 | `number` | `0` |
| gap | 容器间距，支持数字像素或 CSS 长度 | `number \| string` | `0` |
| width | 外层宽度，支持数字像素或 CSS 长度 | `number \| string` | `undefined` |
| height | 外层高度，支持数字像素或 CSS 长度 | `number \| string` | `undefined` |
| wrap | 是否允许换行 | `boolean` | `false` |
| verticalCenter | 是否让内部容器内容垂直居中 | `boolean` | `false` |
| horizontalCenter | 是否让内部容器内容水平居中 | `boolean` | `false` |
| bottomAlign | 是否让内部容器内容下对齐，优先级高于 `verticalCenter` | `boolean` | `false` |
| rightAlign | 是否让直接子区块整体靠右排列；横向分隔时未设置主轴尺寸的子区块会按内容收缩 | `boolean` | `false` |
| backgroundColor | 外层背景色，会通过 `--x-brick-bg` 写到 `XBrick` 自身，不会向子组件写入通用背景变量 | `string` | `undefined`，默认显示为透明 |
| textColor | 内部容器文字颜色，会通过 CSS 变量传递给 `XBrickItem` | `string` | `undefined` |
| padding | 内部容器默认内边距，支持数字像素或 CSS 长度 | `number \| string` | `undefined` |

## BrickItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| itemSize | 沿主轴的固定尺寸，优先级高于 `width` 或 `height` | `number \| string` | `undefined` |
| width | 宽度；横向分隔时也作为主轴尺寸 | `number \| string` | `undefined` |
| height | 高度；竖向分隔时也作为主轴尺寸 | `number \| string` | `undefined` |
| minSize | 沿主轴的最小尺寸 | `number \| string` | `undefined` |
| maxSize | 沿主轴的最大尺寸 | `number \| string` | `undefined` |
| backgroundColor | 当前容器背景色 | `string` | `'transparent'` |
| overflow | 内容溢出方式 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | `'auto'` |
| verticalCenter | 是否让当前容器内容垂直居中，优先级高于 `XBrick` | `boolean` | `undefined` |
| horizontalCenter | 是否让当前容器内容水平居中，优先级高于 `XBrick` | `boolean` | `undefined` |
| bottomAlign | 是否让当前容器内容下对齐，优先级高于 `XBrick` 和 `verticalCenter` | `boolean` | `undefined` |
| rightAlign | 是否让当前容器内容右对齐，优先级高于 `XBrick` 和 `horizontalCenter` | `boolean` | `undefined` |
| padding | 当前容器内边距，优先级高于 `XBrick` | `number \| string` | `undefined` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 放置 `XBrickItem`，也可以嵌套其它 `XBrick` 形成组合布局 |

## 手动验收建议

1. 在 Histoire 中切换横向和竖向，确认固定尺寸和自适应区域分配正确。
2. 清空中间区域尺寸，确认多个未设尺寸的容器平分剩余空间。
3. 关闭内部容器开关，调整 `count`，确认可以生成指定数量的空容器。
4. 开启 `XBrick` 的右对齐，确认直接子区块整体靠右排列；再开启 `XBrickItem` 的右对齐和下对齐，确认子项内部内容右下对齐。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XBrick / `BrickProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
