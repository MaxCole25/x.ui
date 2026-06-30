<script setup lang="ts">
import { computed, reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
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
  itemAlignSelf: 'stretch' as GridAlign
})

const sampleItems = computed(() =>
  Array.from({ length: Math.max(0, Math.floor(Number(appearance.count) || 0)) }, (_, index) => ({
    id: index + 1,
    title: `格子 ${index + 1}`
  }))
)

const previewCode = computed(() => {
  const responsiveColumnsCode = getResponsiveColumnsCode()
  const attrs = [
    appearance.columns !== 3 ? `:columns="${appearance.columns}"` : '',
    responsiveColumnsCode ? `:responsive-columns="${responsiveColumnsCode}"` : '',
    normalizeSize(appearance.rows) ? `rows="${appearance.rows}"` : '',
    appearance.gap !== 0 ? `:gap="${appearance.gap}"` : '',
    normalizeSize(appearance.rowGap) ? `row-gap="${appearance.rowGap}"` : '',
    normalizeSize(appearance.columnGap) ? `column-gap="${appearance.columnGap}"` : '',
    normalizeSize(appearance.height) ? `height="${appearance.height}"` : '',
    normalizeSize(appearance.padding) ? `padding="${appearance.padding}"` : '',
    normalizeSize(appearance.radius) ? `radius="${appearance.radius}"` : ''
  ].filter(Boolean)

  if (!appearance.useSlotItems) {
    return `<XGrid${attrs.length ? ` ${attrs.join(' ')}` : ''} :count="${appearance.count}" />`
  }

  return `<XGrid${attrs.length ? ` ${attrs.join(' ')}` : ''}>
  <XGridItem :col-span="${appearance.firstColSpan}" :row-span="${appearance.firstRowSpan}">重点格子</XGridItem>
  <XGridItem>普通格子</XGridItem>
</XGrid>`
})

function normalizeSize(value: string) {
  return value.trim() === '' ? undefined : value
}

function getResponsiveColumnsCode() {
  const entries = Object.entries(appearance.responsiveColumns)
    .filter(([, value]) => String(value).trim() !== '')
    .map(([key, value]) => `${key}: ${Number(value)}`)

  return entries.length > 0 ? `{ ${entries.join(', ')} }` : ''
}
</script>

<template>
  <Story title="基础组件/Grid 宫格" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XGrid
            v-bind="styleProps"
            :columns="appearance.columns"
            :responsive-columns="appearance.responsiveColumns"
            :rows="normalizeSize(appearance.rows)"
            :count="appearance.count"
            :gap="appearance.gap"
            :row-gap="normalizeSize(appearance.rowGap)"
            :column-gap="normalizeSize(appearance.columnGap)"
            :width="normalizeSize(appearance.width)"
            :height="normalizeSize(appearance.height)"
            :min-width="normalizeSize(appearance.minWidth)"
            :min-height="normalizeSize(appearance.minHeight)"
            :padding="normalizeSize(appearance.padding)"
            :auto-rows="normalizeSize(appearance.autoRows)"
            :auto-columns="normalizeSize(appearance.autoColumns)"
            :justify-items="appearance.justifyItems"
            :align-items="appearance.alignItems"
            :border-style="appearance.borderStyle"
            :radius="normalizeSize(appearance.radius)"
          >
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

        <template #column-1>
          <label><span>列数</span><input v-model.number="appearance.columns" type="number" min="1" max="8" /></label>
          <label><span>小屏列数</span><input v-model.number="appearance.responsiveColumns.sm" type="number" min="1" max="8" /></label>
          <label><span>中屏列数</span><input v-model.number="appearance.responsiveColumns.md" type="number" min="1" max="8" /></label>
          <label><span>大屏列数</span><input v-model.number="appearance.responsiveColumns.lg" type="number" min="1" max="8" /></label>
          <label><span>行模板</span><input v-model="appearance.rows" placeholder="repeat(3, 1fr)" /></label>
          <label><span>数量</span><input v-model.number="appearance.count" type="number" min="0" max="24" /></label>
          <label><span>横竖间距</span><input v-model.number="appearance.gap" type="number" min="0" max="40" /></label>
          <label><span>竖向间距</span><input v-model="appearance.rowGap" placeholder="默认跟随 gap" /></label>
          <label><span>横向间距</span><input v-model="appearance.columnGap" placeholder="默认跟随 gap" /></label>
        </template>

        <template #column-2>
          <label><span>宽度</span><input v-model="appearance.width" /></label>
          <label><span>高度</span><input v-model="appearance.height" /></label>
          <label><span>最小宽度</span><input v-model="appearance.minWidth" /></label>
          <label><span>最小高度</span><input v-model="appearance.minHeight" /></label>
          <label><span>内边距</span><input v-model="appearance.padding" /></label>
          <label><span>圆角</span><input v-model="appearance.radius" /></label>
          <label><span>边框样式</span><input v-model="appearance.borderStyle" /></label>
        </template>

        <template #column-3>
          <label><span>自动行高</span><input v-model="appearance.autoRows" /></label>
          <label><span>自动列宽</span><input v-model="appearance.autoColumns" /></label>
          <label>
            <span>水平对齐</span>
            <select v-model="appearance.justifyItems">
              <option value="stretch">stretch</option>
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
            </select>
          </label>
          <label>
            <span>垂直对齐</span>
            <select v-model="appearance.alignItems">
              <option value="stretch">stretch</option>
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
            </select>
          </label>
          <label><span>首项跨列</span><input v-model.number="appearance.firstColSpan" type="number" min="1" max="8" /></label>
          <label><span>首项跨行</span><input v-model.number="appearance.firstRowSpan" type="number" min="1" max="8" /></label>
        </template>

        <template #column-4>
          <label class="grid-story-check">
            <input v-model="appearance.useSlotItems" type="checkbox" />
            <span>使用 GridItem</span>
          </label>
          <label><span>次项列线</span><input v-model="appearance.secondColumn" placeholder="1 / 3" /></label>
          <label><span>次项行线</span><input v-model="appearance.secondRow" placeholder="2 / 4" /></label>
          <label><span>子项内边距</span><input v-model="appearance.itemPadding" /></label>
          <label><span>子项圆角</span><input v-model="appearance.itemRadius" /></label>
          <label><span>子项边框</span><input v-model.number="appearance.itemBorderWidth" type="number" min="0" max="8" /></label>
          <label><span>子项边框色</span><input v-model="appearance.itemBorderColor" type="color" /></label>
          <label><span>子项背景色</span><input v-model="appearance.itemBackgroundColor" type="color" /></label>
        </template>

        <template #interfaces>
          <section class="grid-story-meta">
            <p><code>XGrid</code> 提供二维网格容器；无默认插槽内容时，<code>count</code> 会生成占位格。</p>
            <pre><code>{{ previewCode }}</code></pre>
          </section>
        </template>

        <template #types>
          <section class="grid-story-meta">
            <p><code>GridSize = number | string</code></p>
            <p><code>GridAlign = 'start' | 'center' | 'end' | 'stretch'</code></p>
            <p><code>GridResponsiveColumns = { sm?: GridSize; md?: GridSize; lg?: GridSize }</code></p>
            <p><code>GridItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'</code></p>
          </section>
        </template>

        <template #events>
          <section class="grid-story-meta">
            <p><code>XGrid</code> 和 <code>XGridItem</code> 是静态布局组件，当前不触发业务事件。</p>
          </section>
        </template>
      </ElementStylePlayground>
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
