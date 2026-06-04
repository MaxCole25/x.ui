<script setup lang="ts">
import { computed, reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XIcon } from '../icon'
import { XFlow } from './index'
import type { FlowAlign, FlowItemOverflow } from './src/types'
import '../../../styles/index.css'

const iconNames = [
  'ri-home-4-line',
  'ri-search-line',
  'ri-settings-3-line',
  'ri-user-3-line',
  'ri-file-list-3-line',
  'ri-folder-3-line',
  'ri-download-2-line',
  'ri-upload-2-line',
  'ri-delete-bin-6-line',
  'ri-edit-line',
  'ri-save-3-line',
  'ri-star-line',
  'ri-heart-line',
  'ri-calendar-line',
  'ri-time-line',
  'ri-notification-3-line',
  'ri-mail-line',
  'ri-lock-line',
  'ri-eye-line',
  'ri-image-line'
]

const appearance = reactive({
  itemWidth: '72px',
  count: 240,
  gap: 8,
  rowGap: '',
  columnGap: '',
  width: '100%',
  height: '320px',
  minWidth: '',
  minHeight: '',
  padding: '10px',
  justifyItems: 'center' as FlowAlign,
  alignItems: 'center' as FlowAlign,
  backgroundColor: '#f8fafc',
  textColor: '#12323a',
  borderColor: '#d8e2e8',
  borderWidth: 1,
  borderStyle: 'solid',
  radius: '8px',
  itemBackgroundColor: '#ffffff',
  itemTextColor: '#12323a',
  itemBorderColor: '#cbd5e1',
  itemBorderWidth: 1,
  itemBorderStyle: 'solid',
  itemRadius: '6px',
  itemPadding: '8px',
  itemOverflow: 'hidden' as FlowItemOverflow,
  lazy: true,
  initialCount: 80,
  loadCount: 40
})

const sampleItems = computed(() =>
  Array.from({ length: Math.max(0, Math.floor(Number(appearance.count) || 0)) }, (_, index) => ({
    id: index + 1,
    name: iconNames[index % iconNames.length],
    label: `图标 ${index + 1}`
  }))
)

const previewCode = computed(() => `<XFlow
  :items="icons"
  item-key="id"
  item-width="${appearance.itemWidth}"
  :gap="${appearance.gap}"
  height="${appearance.height}"
  :lazy="${appearance.lazy}"
  :initial-count="${appearance.initialCount}"
  :load-count="${appearance.loadCount}"
>
  <template #default="{ item }">
    <XIcon :name="item.name" />
  </template>
</XFlow>`)

function normalizeSize(value: string) {
  return value.trim() === '' ? undefined : value
}
</script>

<template>
  <Story title="基础组件/Flow 流式布局" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XFlow
            v-bind="styleProps"
            :items="sampleItems"
            item-key="id"
            :item-width="normalizeSize(appearance.itemWidth)"
            :gap="appearance.gap"
            :row-gap="normalizeSize(appearance.rowGap)"
            :column-gap="normalizeSize(appearance.columnGap)"
            :width="normalizeSize(appearance.width)"
            :height="normalizeSize(appearance.height)"
            :min-width="normalizeSize(appearance.minWidth)"
            :min-height="normalizeSize(appearance.minHeight)"
            :padding="normalizeSize(appearance.padding)"
            :justify-items="appearance.justifyItems"
            :align-items="appearance.alignItems"
            :background-color="appearance.backgroundColor"
            :text-color="appearance.textColor"
            :border-color="appearance.borderColor"
            :border-width="appearance.borderWidth"
            :border-style="appearance.borderStyle"
            :radius="normalizeSize(appearance.radius)"
            :item-background-color="appearance.itemBackgroundColor"
            :item-text-color="appearance.itemTextColor"
            :item-border-color="appearance.itemBorderColor"
            :item-border-width="appearance.itemBorderWidth"
            :item-border-style="appearance.itemBorderStyle"
            :item-radius="normalizeSize(appearance.itemRadius)"
            :item-padding="normalizeSize(appearance.itemPadding)"
            :item-overflow="appearance.itemOverflow"
            :lazy="appearance.lazy"
            :initial-count="appearance.initialCount"
            :load-count="appearance.loadCount"
          >
            <template #default="{ item }">
              <div class="flow-story-icon">
                <XIcon :name="item.name" />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </XFlow>
        </template>

        <template #column-1>
          <label><span>元素宽度</span><input v-model="appearance.itemWidth" /></label>
          <label><span>数量</span><input v-model.number="appearance.count" type="number" min="0" max="1000" /></label>
          <label><span>横竖间距</span><input v-model.number="appearance.gap" type="number" min="0" max="40" /></label>
          <label><span>竖向间距</span><input v-model="appearance.rowGap" placeholder="默认跟随 gap" /></label>
          <label><span>横向间距</span><input v-model="appearance.columnGap" placeholder="默认跟随 gap" /></label>
          <label class="flow-story-check"><input v-model="appearance.lazy" type="checkbox" /><span>增量渲染</span></label>
          <label><span>初始数量</span><input v-model.number="appearance.initialCount" type="number" min="0" max="1000" /></label>
          <label><span>追加数量</span><input v-model.number="appearance.loadCount" type="number" min="1" max="500" /></label>
        </template>

        <template #column-2>
          <label><span>宽度</span><input v-model="appearance.width" /></label>
          <label><span>高度</span><input v-model="appearance.height" /></label>
          <label><span>最小宽度</span><input v-model="appearance.minWidth" /></label>
          <label><span>最小高度</span><input v-model="appearance.minHeight" /></label>
          <label><span>内边距</span><input v-model="appearance.padding" /></label>
          <label><span>圆角</span><input v-model="appearance.radius" /></label>
          <label><span>边框</span><input v-model.number="appearance.borderWidth" type="number" min="0" max="8" /></label>
          <label><span>边框色</span><input v-model="appearance.borderColor" type="color" /></label>
        </template>

        <template #column-3>
          <label><span>背景色</span><input v-model="appearance.backgroundColor" type="color" /></label>
          <label><span>文本色</span><input v-model="appearance.textColor" type="color" /></label>
          <label><span>边框样式</span><input v-model="appearance.borderStyle" /></label>
          <label>
            <span>水平对齐</span>
            <select v-model="appearance.justifyItems">
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
              <option value="stretch">stretch</option>
            </select>
          </label>
          <label>
            <span>垂直对齐</span>
            <select v-model="appearance.alignItems">
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
              <option value="stretch">stretch</option>
            </select>
          </label>
        </template>

        <template #column-4>
          <label><span>子项背景色</span><input v-model="appearance.itemBackgroundColor" type="color" /></label>
          <label><span>子项文本色</span><input v-model="appearance.itemTextColor" type="color" /></label>
          <label><span>子项边框色</span><input v-model="appearance.itemBorderColor" type="color" /></label>
          <label><span>子项边框</span><input v-model.number="appearance.itemBorderWidth" type="number" min="0" max="8" /></label>
          <label><span>子项边框样式</span><input v-model="appearance.itemBorderStyle" /></label>
          <label><span>子项圆角</span><input v-model="appearance.itemRadius" /></label>
          <label><span>子项内边距</span><input v-model="appearance.itemPadding" /></label>
          <label>
            <span>子项溢出</span>
            <select v-model="appearance.itemOverflow">
              <option value="visible">visible</option>
              <option value="hidden">hidden</option>
              <option value="clip">clip</option>
              <option value="scroll">scroll</option>
              <option value="auto">auto</option>
            </select>
          </label>
        </template>

        <template #interfaces>
          <section class="flow-story-meta">
            <p><code>XFlow</code> 推荐使用 <code>items</code> 数据驱动模式；默认插槽接收 <code>{ item, index }</code>。</p>
            <pre><code>{{ previewCode }}</code></pre>
          </section>
        </template>

        <template #types>
          <section class="flow-story-meta">
            <p><code>FlowAlign = 'start' | 'center' | 'end' | 'stretch'</code></p>
            <p><code>FlowItemOverflow = 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'</code></p>
            <p><code>FlowItemKey = string | number | ((item, index) =&gt; string | number)</code></p>
          </section>
        </template>

        <template #events>
          <section class="flow-story-meta">
            <p><code>XFlow</code> 和 <code>XFlowItem</code> 是静态布局组件，当前不触发业务事件。</p>
          </section>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.flow-story-icon {
  align-items: center;
  display: grid;
  gap: 6px;
  justify-items: center;
  min-width: 0;
}

.flow-story-icon :deep(.x-icon) {
  font-size: 22px;
}

.flow-story-icon span {
  font-size: 12px;
  line-height: 1.3;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flow-story-check {
  justify-content: flex-start;
}

.flow-story-meta {
  color: #334155;
  display: grid;
  font-size: 13px;
  gap: 8px;
  line-height: 1.6;
  margin: 0;
}

.flow-story-meta p {
  margin: 0;
}

.flow-story-meta pre {
  background: #f8fafc;
  border: 1px solid #d8e2e8;
  border-radius: 6px;
  margin: 0;
  overflow-x: auto;
  padding: 10px;
}
</style>
