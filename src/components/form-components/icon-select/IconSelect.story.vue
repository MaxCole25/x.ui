<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
import XIconSelect from './src/IconSelect.vue'
import type { IconSelectIconInfo, IconSelectProps } from './src/types'
import '../../../styles/index.css'
const sample = reactive<Required<IconSelectProps>>({
  modelValue: 'home-line',
  fontSize: 14,
  disabled: false,
  readonly: false,
  placeholder: '双击选择图标',
  emptyText: '暂无图标',
  iconColor: '#334155',
  selectedIconColor: '#1264f4',
  accentColor: '#1264f4',
  panelHeight: 320,
  iconSize: 22
})
const eventState = reactive({
  selectCount: 0,
  dblclickCount: 0,
  changeCount: 0
})
const lastIcon = ref<IconSelectIconInfo | null>(null)
const handleSelect = (icon: IconSelectIconInfo) => {
  eventState.selectCount += 1
  lastIcon.value = icon
}
const handleDblclick = (icon: IconSelectIconInfo) => {
  eventState.dblclickCount += 1
  lastIcon.value = icon
}
const handleChange = (_value: string, icon: IconSelectIconInfo) => {
  eventState.changeCount += 1
  lastIcon.value = icon
}
</script>

<template>
  <Story title="Form 组件/IconSelect 图标选择面板" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XIconSelect">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XIconSelect
              v-model="sample.modelValue"

              :placeholder="sample.placeholder"
              :empty-text="sample.emptyText"

              @select="handleSelect"
              @dblclick="handleDblclick"
              @change="handleChange"
             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.icon-select-appearance {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.icon-select-appearance__preview {
  background: #f8fafc;
  min-height: 520px;
  padding: 24px;
}

.icon-select-appearance__parent {
  align-items: center;
  background: #ecfdf5;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  min-height: 0;
  min-width: 0;
  padding: 10px;
}

.icon-select-appearance__controls {
  display: grid;
  gap: 16px;
  overflow-x: auto;
  padding: 16px;
}

.icon-select-appearance__section {
  display: grid;
  gap: 10px;
}

.icon-select-appearance__section h3 {
  color: #102a43;
  font-size: 14px;
  line-height: 1.4;
  margin: 0;
}

.icon-select-appearance__grid {
  display: grid;
  gap: 10px 12px;
  grid-template-columns: repeat(4, 180px);
}

.icon-select-appearance__grid label {
  align-items: center;
  color: #102a43;
  display: grid;
  font-size: 13px;
  gap: 8px;
  grid-template-columns: 84px 1fr;
  min-width: 0;
  width: 180px;
}

.icon-select-appearance__grid label > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon-select-appearance__grid input,
.icon-select-appearance__grid select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 30px;
  min-width: 0;
  padding: 0 8px;
  width: 100%;
}

.icon-select-appearance__grid input[type='checkbox'] {
  min-height: auto;
  padding: 0;
  width: auto;
}

.icon-select-appearance__check {
  grid-template-columns: auto 1fr;
}
</style>
