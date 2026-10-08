<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive } from 'vue'
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
</script>

<template>
  <Story title="基础组件/Flow 流式布局" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XFlow">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XFlow
            :items="sampleItems"
            item-key="id"

            :justify-items="appearance.justifyItems"

            :item-overflow="appearance.itemOverflow"
            :lazy="appearance.lazy"
            :initial-count="appearance.initialCount"
            :load-count="appearance.loadCount"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <template #default="{ item }">
              <div class="flow-story-icon">
                <XIcon :name="item.name" />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </XFlow>
        </template>
      </ApiPlayground>
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
