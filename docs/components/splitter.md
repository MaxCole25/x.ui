<script setup lang="ts">
import { ref } from 'vue'

const horizontalSizes = ref([180, 320, 220])
const verticalSizes = ref([100, 180, 140])

const horizontalCode = `<script setup lang="ts">
import { ref } from 'vue'

const sizes = ref([180, 320, 220])
<\/script>

<XSplitter v-model="sizes" height="260px">
  <XSplitPane :min-size="120" padding="12px">左侧</XSplitPane>
  <XSplitPane :min-size="180">中间内容</XSplitPane>
  <XSplitPane :min-size="120">右侧</XSplitPane>
</XSplitter>`

const verticalCode = `<XSplitter v-model="sizes" direction="vertical" height="420px">
  <XSplitPane size="100px" locked>顶部固定</XSplitPane>
  <XSplitPane :min-size="120">中间内容</XSplitPane>
  <XSplitPane :min-size="80">底部</XSplitPane>
</XSplitter>`
</script>

# 可拖拽分栏 Splitter

`XSplitter` 用于将容器分成可由鼠标或触控拖拽调整的多个面板。直接子元素使用 `XSplitPane`，可通过 `locked` 固定某个面板大小。默认状态只显示 1px 分隔线；鼠标靠近分隔区时会显示方向箭头，提示可拖拽调整相邻面板。

## 横向三栏

<XDocDemo title="横向三栏" :code="horizontalCode">
  <XSplitter v-model="horizontalSizes" height="260px">
    <XSplitPane :min-size="120" padding="12px"><div class="splitter-demo splitter-demo--one">左侧</div></XSplitPane>
    <XSplitPane :min-size="180"><div class="splitter-demo splitter-demo--two">中间内容</div></XSplitPane>
    <XSplitPane :min-size="120"><div class="splitter-demo splitter-demo--three">右侧</div></XSplitPane>
  </XSplitter>
</XDocDemo>

当前尺寸：`{{ horizontalSizes.map((size) => Math.round(size)).join('px、') }}px`

## 竖向与锁定栏位

竖向分栏需要设置可计算的高度。锁定面板后，其相邻分隔条不再允许拖拽。

<XDocDemo title="竖向与锁定栏位" :code="verticalCode">
  <XSplitter v-model="verticalSizes" direction="vertical" height="420px">
    <XSplitPane size="100px" locked><div class="splitter-demo splitter-demo--one">顶部固定</div></XSplitPane>
    <XSplitPane :min-size="120"><div class="splitter-demo splitter-demo--two">中间内容</div></XSplitPane>
    <XSplitPane :min-size="80"><div class="splitter-demo splitter-demo--three">底部</div></XSplitPane>
  </XSplitter>
</XDocDemo>

## Splitter Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 与各 `XSplitPane` 顺序一致的主轴像素尺寸 | `number[]` | — |
| direction | 分栏方向，`horizontal` 为左右栏，`vertical` 为上下栏 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| width | 容器宽度 | `number \| string` | `'100%'` |
| height | 容器高度 | `number \| string` | — |
| splitterSize | 分隔拖拽区尺寸（px），可见分隔线固定为 1px | `number` | `6` |
| splitterColor | 分隔条颜色 | `string` | `#d8e2e8` |
| activeSplitterColor | 悬停或拖拽时的分隔条颜色 | `string` | `#5b6b9a` |

## SplitPane Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| paneSize | 未使用 `v-model` 时的初始主轴尺寸，支持像素或百分比 | `number \| string` | — |
| minSize | 主轴最小尺寸（px） | `number` | `0` |
| maxSize | 主轴最大尺寸（px） | `number` | — |
| padding | 面板内容内边距，支持数字像素或 CSS 长度 | `number \| string` | — |
| locked | 是否锁定该栏的大小 | `boolean` | `false` |
| overflow | 内容溢出行为 | `'visible' \| 'hidden' \| 'clip' \| 'scroll' \| 'auto'` | `'auto'` |

## Events

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 拖拽过程中更新尺寸数组 | `number[]` |
| resize-start | 开始拖拽分隔条 | `SplitterResizePayload` |
| resize | 拖拽过程中触发 | `SplitterResizePayload` |
| resize-end | 结束拖拽 | `SplitterResizePayload` |

`SplitterResizePayload` 包含当前分隔条的 `index` 和完整 `sizes` 数组。

## 手动验收建议

1. 在横向和竖向模式靠近分隔线，确认显示对应方向箭头，并拖动各分隔条确认仅相邻两个栏位改变。
2. 设置最小/最大尺寸，确认拖动不会突破边界。
3. 锁定任意面板，确认其相邻分隔条变为不可拖拽。
4. 在包含表格或滚动内容的面板中，确认内容不会越过分隔区。
5. 将 `v-model` 的尺寸数组保存并重新传入，确认布局可恢复。

<style scoped>
.splitter-demo { align-items: center; box-sizing: border-box; display: flex; height: 100%; justify-content: center; min-height: 0; padding: 12px; }
.splitter-demo--one { background: #e0ecff; }.splitter-demo--two { background: #f8fafc; }.splitter-demo--three { background: #f0fdf4; }
</style>
