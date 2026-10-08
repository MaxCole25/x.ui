<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive } from 'vue'
import { XGrid, XGridItem } from './index'
import type { GridAlign, GridItemOverflow } from './src/types'
import '../../../styles/index.css'
const appearance = reactive({
  columns: 3,
  responsiveColumns: {
    sm: 1,
    md: 2,
    lg: 3
  },
  rows: '',
  count: 9,
  gap: 8,
  rowGap: '',
  columnGap: '',
  width: '100%',
  height: '300px',
  minWidth: '',
  minHeight: '',
  padding: '10px',
  autoRows: 'minmax(64px, auto)',
  autoColumns: '',
  justifyItems: 'stretch' as GridAlign,
  alignItems: 'stretch' as GridAlign,
  borderStyle: 'solid',
  radius: '8px',
  useSlotItems: true,
  firstColSpan: 2,
  firstRowSpan: 1,
  secondColumn: '',
  secondRow: '',
  itemPadding: '12px',
  itemRadius: '6px',
  itemBorderWidth: 1,
  itemBorderColor: '#cbd5e1',
  itemBorderStyle: 'solid',
  itemBackgroundColor: '#ffffff',
  itemTextColor: '#12323a',
  itemOverflow: 'auto' as GridItemOverflow,
  itemJustifySelf: 'stretch' as GridAlign,
  itemAlignSelf: 'stretch' as GridAlign,
  itemHorizontalCenter: false
})
const sampleItems = computed(() =>
  Array.from({ length: Math.max(0, Math.floor(Number(appearance.count) || 0)) }, (_, index) => ({
    id: index + 1,
    title: `格子 ${index + 1}`
  }))
)
function normalizeSize(value: string) {
  return value.trim() === '' ? undefined : value
}
</script>

<template>
  <Story title="基础组件/Grid 宫格" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XGrid">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XGrid
            :columns="appearance.columns"
            :responsive-columns="appearance.responsiveColumns"
            :rows="normalizeSize(appearance.rows)"
            :count="appearance.count"

            :auto-rows="normalizeSize(appearance.autoRows)"
            :auto-columns="normalizeSize(appearance.autoColumns)"
            :justify-items="appearance.justifyItems"

           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <template v-if="appearance.useSlotItems">
              <XGridItem
                v-for="item in sampleItems"
                :key="item.id"
                :col-span="item.id === 1 ? appearance.firstColSpan : undefined"
                :row-span="item.id === 1 ? appearance.firstRowSpan : undefined"
                :column="item.id === 2 ? normalizeSize(appearance.secondColumn) : undefined"
                :row="item.id === 2 ? normalizeSize(appearance.secondRow) : undefined"
                :padding="normalizeSize(appearance.itemPadding)"
                :radius="normalizeSize(appearance.itemRadius)"
                :border-width="appearance.itemBorderWidth"
                :border-color="appearance.itemBorderColor"
                :border-style="appearance.itemBorderStyle"
                :background-color="appearance.itemBackgroundColor"
                :text-color="appearance.itemTextColor"
                :overflow="appearance.itemOverflow"
                :justify-self="appearance.itemJustifySelf"
                :align-self="appearance.itemAlignSelf"
                :horizontal-center="appearance.itemHorizontalCenter"
              >
                <div class="grid-story-item">
                  <strong>{{ item.title }}</strong>
                  <span v-if="item.id === 1">col {{ appearance.firstColSpan }} / row {{ appearance.firstRowSpan }}</span>
                  <span v-else-if="item.id === 2 && (appearance.secondColumn || appearance.secondRow)">指定线</span>
                  <span v-else>普通宫格</span>
                </div>
              </XGridItem>
            </template>
          </XGrid>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.grid-story-item {
  display: grid;
  gap: 4px;
  min-width: 0;
}

.grid-story-item strong {
  font-size: 14px;
  line-height: 1.3;
}

.grid-story-item span {
  color: #64748b;
  font-size: 12px;
  line-height: 1.4;
}

.grid-story-check {
  justify-content: flex-start;
}

.grid-story-meta {
  color: #334155;
  display: grid;
  font-size: 13px;
  gap: 8px;
  line-height: 1.6;
  margin: 0;
}

.grid-story-meta p {
  margin: 0;
}

.grid-story-meta pre {
  background: #f8fafc;
  border: 1px solid #d8e2e8;
  border-radius: 6px;
  margin: 0;
  overflow-x: auto;
  padding: 10px;
}
</style>
