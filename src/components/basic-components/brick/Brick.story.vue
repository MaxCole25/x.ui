<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive } from 'vue'
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
function normalizeSize(value: string) {
  return value.trim() === '' ? undefined : value
}
function resolveBooleanOverride(value: BooleanOverride) {
  if (value === 'inherit') {
    return undefined
  }

  return value === 'true'
}
</script>

<template>
  <Story title="基础组件/Brick 砖格" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XBrick">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XBrick

            :count="appearance.count"

            :wrap="appearance.wrap"
            :vertical-center="appearance.verticalCenter"
            :horizontal-center="appearance.horizontalCenter"

           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
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
      </ApiPlayground>
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
