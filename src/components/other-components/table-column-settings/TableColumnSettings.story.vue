<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
import type { TableColumn, TableColumnSetting } from '../../display-components/table'
import { XTableColumnSettings } from './index'
import '../../../styles/index.css'
const columns: TableColumn[] = [
  { key: 'component', label: '组件', minWidth: 180 },
  { key: 'category', label: '分类', width: 140 },
  { key: 'owner', label: '负责人', minWidth: 160 },
  { key: 'count', label: '使用数', width: 110, align: 'right' },
  { key: 'updatedAt', label: '更新时间', width: 140 }
]
const state = reactive({
  parentWidth: 860,
  parentHeight: 360,
  fullWidth: false,
  fullHeight: false,
  title: '列设置',
  width: 760,
  height: 620,
  disabled: false,
  useCustomTrigger: false
})
const settings = ref<TableColumnSetting[]>([])
const eventText = ref('尚未触发事件')
function handleChange(value: TableColumnSetting[]) {
  eventText.value = `已更新 ${value.length} 个列配置`
}
function handleReset(value: TableColumnSetting[]) {
  eventText.value = `已恢复默认 ${value.length} 个列配置`
}
</script>

<template>
  <Story title="其它组件/TableColumnSettings 列设置" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTableColumnSettings">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XTableColumnSettings
              v-model="settings"
              :columns="columns"
              :title="state.title"

              @change="handleChange"
              @reset="handleReset"
             v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
              <template v-if="state.useCustomTrigger" #trigger="{ open, disabled, visible }">
                <button
                  class="table-column-settings-story__icon-trigger"
                  type="button"
                  :class="{ 'is-active': visible }"
                  :disabled="disabled"
                  aria-label="列设置"
                  title="列设置"
                  @click="open"
                >
                  <i class="ri-settings-3-line" aria-hidden="true"></i>
                </button>
              </template>
            </XTableColumnSettings>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.table-column-settings-story {
  display: grid;
  gap: 12px;
}

.table-column-settings-story__preview {
  box-sizing: border-box;
  display: grid;
  gap: 10px;
  grid-template-rows: auto minmax(0, 1fr);
  max-width: 100%;
  min-height: 0;
  padding: 10px;
}

.table-column-settings-story__toolbar {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.table-column-settings-story__icon-trigger {
  align-items: center;
  background: var(--x-table-control-bg, var(--x-color-surface, #fff));
  border: 1px solid var(--x-table-control-border-color, var(--x-color-border, #cbd5e1));
  border-radius: 6px;
  color: var(--x-table-control-text-color, var(--x-color-text, #334155));
  cursor: pointer;
  display: inline-flex;
  font-size: 18px;
  height: 30px;
  justify-content: center;
  padding: 0;
  width: 30px;
}

.table-column-settings-story__icon-trigger:hover,
.table-column-settings-story__icon-trigger:focus-visible,
.table-column-settings-story__icon-trigger.is-active {
  border-color: var(--x-color-primary, #1264f4);
  color: var(--x-color-primary, #1264f4);
  outline: none;
}

.table-column-settings-story__icon-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.56;
}

.table-column-settings-story__section {
  display: grid;
  gap: 8px;
}

.table-column-settings-story__grid {
  align-items: center;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(4, 180px);
}

.table-column-settings-story__grid label {
  align-items: center;
  display: grid;
  font-size: 12px;
  gap: 6px;
  grid-template-columns: 76px minmax(0, 1fr);
  min-width: 0;
}

.table-column-settings-story__grid span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.table-column-settings-story__grid input {
  box-sizing: border-box;
  min-width: 0;
  width: 100%;
}

.table-column-settings-story__grid p {
  color: #64748b;
  font-size: 12px;
  margin: 0;
  min-width: 0;
}
</style>
