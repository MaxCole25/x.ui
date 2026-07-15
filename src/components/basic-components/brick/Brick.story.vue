<script setup lang="ts">
import { computed, reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XBrick, XBrickItem } from './index'
import type { BrickDirection, BrickItemOverflow } from './src/types'
import '../../../styles/index.css'

type BooleanOverride = 'inherit' | 'true' | 'false'

const appearance = reactive({
  direction: 'horizontal' as BrickDirection,
  count: 3,
  gap: 8,
  width: '100%',
  height: '220px',
  wrap: false,
  verticalCenter: true,
  horizontalCenter: true,
  bottomAlign: false,
  rightAlign: false,
  padding: '10px',
  useSlotItems: true,
  firstSize: '140px',
  secondSize: '',
  thirdSize: '30%',
  itemOverflow: 'auto' as BrickItemOverflow,
  itemVerticalCenter: 'inherit' as BooleanOverride,
  itemHorizontalCenter: 'inherit' as BooleanOverride,
  itemBottomAlign: 'inherit' as BooleanOverride,
  itemRightAlign: 'inherit' as BooleanOverride,
  itemBackgroundColor: '#ffffff',
  itemBackgroundTransparent: true,
  itemPadding: ''
})

const sampleItems = computed(() => [
  { label: '区域一', itemSize: normalizeSize(appearance.firstSize) },
  { label: '区域二', itemSize: normalizeSize(appearance.secondSize) },
  { label: '区域三', itemSize: normalizeSize(appearance.thirdSize) }
])
const resolvedItemBackgroundColor = computed(() =>
  appearance.itemBackgroundTransparent ? 'transparent' : appearance.itemBackgroundColor
)

const previewCode = computed(() => {
  const attrs = [
    appearance.direction !== 'horizontal' ? `direction="${appearance.direction}"` : '',
    appearance.gap !== 0 ? `:gap="${appearance.gap}"` : '',
    appearance.width !== '100%' ? `width="${appearance.width}"` : '',
    appearance.height !== '220px' ? `height="${appearance.height}"` : '',
    appearance.wrap ? 'wrap' : '',
    appearance.verticalCenter ? 'vertical-center' : '',
    appearance.horizontalCenter ? 'horizontal-center' : '',
    appearance.bottomAlign ? 'bottom-align' : '',
    appearance.rightAlign ? 'right-align' : '',
    normalizeSize(appearance.padding) ? `padding="${appearance.padding}"` : ''
  ].filter(Boolean)
  const itemAttrs = [
    appearance.itemVerticalCenter !== 'inherit' ? booleanOverrideToAttr('vertical-center', appearance.itemVerticalCenter) : '',
    appearance.itemHorizontalCenter !== 'inherit'
      ? booleanOverrideToAttr('horizontal-center', appearance.itemHorizontalCenter)
      : '',
    appearance.itemBottomAlign !== 'inherit' ? booleanOverrideToAttr('bottom-align', appearance.itemBottomAlign) : '',
    appearance.itemRightAlign !== 'inherit' ? booleanOverrideToAttr('right-align', appearance.itemRightAlign) : '',
    resolvedItemBackgroundColor.value !== 'transparent' ? `background-color="${resolvedItemBackgroundColor.value}"` : '',
    normalizeSize(appearance.itemPadding) ? `padding="${appearance.itemPadding}"` : '',
    appearance.itemOverflow !== 'auto' ? `overflow="${appearance.itemOverflow}"` : ''
  ].filter(Boolean)
  const secondItemAttrs = itemAttrs.length ? ` ${itemAttrs.join(' ')}` : ''

  if (!appearance.useSlotItems) {
    return `<XBrick${attrs.length ? ` ${attrs.join(' ')}` : ''} :count="${appearance.count}" />`
  }

  return `<XBrick${attrs.length ? ` ${attrs.join(' ')}` : ''}>
  <XBrickItem item-size="${appearance.firstSize}"${secondItemAttrs}>区域一</XBrickItem>
  <XBrickItem${secondItemAttrs}>区域二</XBrickItem>
  <XBrickItem item-size="${appearance.thirdSize}"${secondItemAttrs}>区域三</XBrickItem>
</XBrick>`
})

function normalizeSize(value: string) {
  return value.trim() === '' ? undefined : value
}

function resolveBooleanOverride(value: BooleanOverride) {
  if (value === 'inherit') {
    return undefined
  }

  return value === 'true'
}

function booleanOverrideToAttr(name: string, value: BooleanOverride) {
  return value === 'true' ? name : `:${name}="false"`
}

</script>

<template>
  <Story title="基础组件/Brick 砖格" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XBrick
            v-bind="styleProps"
            :direction="appearance.direction"
            :count="appearance.count"
            :gap="appearance.gap"
            :width="appearance.width"
            :height="appearance.height"
            :wrap="appearance.wrap"
            :vertical-center="appearance.verticalCenter"
            :horizontal-center="appearance.horizontalCenter"
            :bottom-align="appearance.bottomAlign"
            :right-align="appearance.rightAlign"
            :padding="normalizeSize(appearance.padding)"
          >
            <template v-if="appearance.useSlotItems">
              <XBrickItem
                v-for="item in sampleItems"
                :key="item.label"
                :item-size="item.itemSize"
                :overflow="appearance.itemOverflow"
                :vertical-center="resolveBooleanOverride(appearance.itemVerticalCenter)"
                :horizontal-center="resolveBooleanOverride(appearance.itemHorizontalCenter)"
                :bottom-align="resolveBooleanOverride(appearance.itemBottomAlign)"
                :right-align="resolveBooleanOverride(appearance.itemRightAlign)"
                :background-color="resolvedItemBackgroundColor"
                :padding="normalizeSize(appearance.itemPadding)"
              >
                <div class="brick-story-item">
                  <strong>{{ item.label }}</strong>
                  <span>{{ item.itemSize || '平分剩余' }}</span>
                </div>
              </XBrickItem>
            </template>
          </XBrick>
        </template>

        <template #column-1>
          <label>
            <span>方向</span>
            <select v-model="appearance.direction">
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>
          <label><span>数量</span><input v-model.number="appearance.count" type="number" min="0" max="8" /></label>
          <label><span>间距</span><input v-model.number="appearance.gap" type="number" min="0" max="40" /></label>
          <label><span>宽度</span><input v-model="appearance.width" /></label>
        </template>

        <template #column-2>
          <label><span>高度</span><input v-model="appearance.height" /></label>
          <label><span>内边距</span><input v-model="appearance.padding" /></label>
          <label><span>首项尺寸</span><input v-model="appearance.firstSize" /></label>
          <label><span>次项尺寸</span><input v-model="appearance.secondSize" /></label>
          <label><span>末项尺寸</span><input v-model="appearance.thirdSize" /></label>
        </template>

        <template #column-3>
          <label>
            <span>内容溢出</span>
            <select v-model="appearance.itemOverflow">
              <option value="auto">auto</option>
              <option value="hidden">hidden</option>
              <option value="visible">visible</option>
              <option value="clip">clip</option>
              <option value="scroll">scroll</option>
            </select>
          </label>
          <label>
            <span>子项垂直</span>
            <select v-model="appearance.itemVerticalCenter">
              <option value="inherit">继承</option>
              <option value="true">开启</option>
              <option value="false">关闭</option>
            </select>
          </label>
          <label>
            <span>子项水平</span>
            <select v-model="appearance.itemHorizontalCenter">
              <option value="inherit">继承</option>
              <option value="true">开启</option>
              <option value="false">关闭</option>
            </select>
          </label>
          <label>
            <span>子项下对齐</span>
            <select v-model="appearance.itemBottomAlign">
              <option value="inherit">继承</option>
              <option value="true">开启</option>
              <option value="false">关闭</option>
            </select>
          </label>
          <label>
            <span>子项右对齐</span>
            <select v-model="appearance.itemRightAlign">
              <option value="inherit">继承</option>
              <option value="true">开启</option>
              <option value="false">关闭</option>
            </select>
          </label>
          <label><span>子项内边距</span><input v-model="appearance.itemPadding" /></label>
          <label><span>子项背景色</span><input v-model="appearance.itemBackgroundColor" type="color" /></label>
        </template>

        <template #column-4>
          <label class="brick-story-check">
            <input v-model="appearance.verticalCenter" type="checkbox" />
            <span>垂直居中</span>
          </label>
          <label class="brick-story-check">
            <input v-model="appearance.horizontalCenter" type="checkbox" />
            <span>水平居中</span>
          </label>
          <label class="brick-story-check">
            <input v-model="appearance.bottomAlign" type="checkbox" />
            <span>下对齐</span>
          </label>
          <label class="brick-story-check">
            <input v-model="appearance.rightAlign" type="checkbox" />
            <span>区块右对齐</span>
          </label>
          <label class="brick-story-check">
            <input v-model="appearance.wrap" type="checkbox" />
            <span>允许换行</span>
          </label>
          <label class="brick-story-check">
            <input v-model="appearance.useSlotItems" type="checkbox" />
            <span>使用内部容器</span>
          </label>
          <label class="brick-story-check">
            <input v-model="appearance.itemBackgroundTransparent" type="checkbox" />
            <span>子项透明</span>
          </label>
        </template>

        <template #interfaces>
          <section class="brick-story-meta">
            <p>默认插槽放置 <code>XBrickItem</code>，无插槽内容时通过 <code>count</code> 生成空容器。</p>
            <pre><code>{{ previewCode }}</code></pre>
          </section>
        </template>

        <template #types>
          <section class="brick-story-meta">
            <p><code>BrickDirection = 'horizontal' | 'vertical'</code></p>
            <p><code>BrickSize = number | string</code></p>
            <p><code>BrickItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'</code></p>
            <p><code>XBrick</code> 的 <code>rightAlign</code> 控制区块整体靠右；<code>XBrickItem</code> 的右对齐控制当前容器内部内容。</p>
          </section>
        </template>

        <template #events>
          <section class="brick-story-meta">
            <p>首版为静态分隔容器，暂不触发事件；DOM 已保留 <code>data-x-brick-resizable</code> 供后续拖拽扩展。</p>
          </section>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.brick-story-item {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 100%;
  justify-content: center;
  min-height: 0;
  min-width: 0;
  padding: 10px;
  text-align: center;
}

.brick-story-item strong {
  font-size: 13px;
}

.brick-story-item span {
  font-size: 12px;
  opacity: 0.72;
}

.brick-story-check {
  justify-content: flex-start;
}

.brick-story-meta {
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-column: 1 / -1;
  line-height: 1.6;
  min-width: 0;
}

.brick-story-meta p {
  margin: 0;
}

.brick-story-meta pre {
  background: #0f172a;
  border-radius: 6px;
  color: #e2e8f0;
  margin: 0;
  overflow: auto;
  padding: 12px;
}
</style>
