<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XIcon } from './index'
import type { IconFontSize, IconVariant } from './src/types'
import '../../../styles/index.css'
const state = reactive({
  name: 'home',
  variant: 'line' as IconVariant,
  fontSize: 14 as IconFontSize,
  offsetY: '',
  color: '#1264f4',
  title: '首页',
  spin: false
})
</script>

<template>
  <Story title="基础组件/Icon 图标" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XIcon">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XIcon
            :name="state.name"

            :title="state.title"
            :spin="state.spin"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-playground {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.story-preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  min-height: 132px;
  padding: 28px;
}

.story-preview .x-icon {
  font-size: 36px;
}

.story-muted {
  color: #64748b;
  font-size: 14px;
}

.story-controls {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  padding: 18px;
}

.story-controls label,
.story-check {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
}

.story-controls label:not(.story-check) {
  justify-content: space-between;
}

.story-controls input:not([type="checkbox"]),
.story-controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 34px;
  padding: 0 10px;
}

.story-playground pre {
  background: #0f172a;
  color: #e2e8f0;
  margin: 0;
  overflow: auto;
  padding: 16px;
}

.story-row {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px;
}

.story-grid {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(132px, 1fr));
  padding: 16px;
}

.story-icon-card {
  align-items: center;
  background: #fff;
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  color: #102a43;
  cursor: pointer;
  display: grid;
  gap: 8px;
  justify-items: center;
  min-height: 88px;
  padding: 12px;
}

.story-icon-card span {
  font-size: 12px;
  overflow-wrap: anywhere;
  text-align: center;
}
</style>
