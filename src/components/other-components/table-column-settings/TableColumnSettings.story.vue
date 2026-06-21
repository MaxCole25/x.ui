<script setup lang="ts">
import { reactive, ref } from 'vue'
import { XTable } from '../../display-components/table'
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

const rows = [
  { id: 1, component: 'XTable', category: 'Display', owner: 'Platform Team', count: 14, updatedAt: '2026-04-10' },
  { id: 2, component: 'XDialog', category: 'Feedback', owner: 'UI Team', count: 7, updatedAt: '2026-04-09' },
  { id: 3, component: 'XTabs', category: 'Display', owner: 'Platform Team', count: 10, updatedAt: '2026-04-08' }
]

const state = reactive({
  parentWidth: 860,
  parentHeight: 360,
  fullWidth: false,
  fullHeight: false,
  title: '列设置',
  width: 760,
  height: 620,
  disabled: false
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
      <div class="table-column-settings-story">
        <div class="table-column-settings-story__preview" :style="{ width: state.fullWidth ? '100%' : `${state.parentWidth}px`, height: state.fullHeight ? '100%' : `${state.parentHeight}px` }">
          <div class="table-column-settings-story__toolbar">
            <XTableColumnSettings
              v-model="settings"
              :columns="columns"
              :title="state.title"
              :width="state.width"
              :height="state.height"
              :disabled="state.disabled"
              @change="handleChange"
              @reset="handleReset"
            />
            <span>{{ eventText }}</span>
          </div>
          <XTable :columns="columns" :data="rows" :column-settings="settings" row-key="id" full-height />
        </div>

        <section class="table-column-settings-story__section">
          <strong>属性</strong>
          <div class="table-column-settings-story__grid">
            <label><span>父元素宽度</span><input v-model.number="state.parentWidth" type="number" min="320" max="1200" /></label>
            <label><span>父元素高度</span><input v-model.number="state.parentHeight" type="number" min="240" max="720" /></label>
            <label><span>父元素撑满宽度</span><input v-model="state.fullWidth" type="checkbox" /></label>
            <label><span>父元素撑满高度</span><input v-model="state.fullHeight" type="checkbox" /></label>
            <label><span>标题</span><input v-model="state.title" type="text" /></label>
            <label><span>弹窗宽度</span><input v-model.number="state.width" type="number" min="640" max="1200" /></label>
            <label><span>弹窗高度</span><input v-model.number="state.height" type="number" min="460" max="900" /></label>
            <label><span>禁用</span><input v-model="state.disabled" type="checkbox" /></label>
          </div>
        </section>

        <section class="table-column-settings-story__section">
          <strong>接口</strong>
          <div class="table-column-settings-story__grid">
            <p><code>v-model</code> 维护列设置数组。</p>
            <p><code>columns</code> 接收表格列配置。</p>
            <p><code>open</code> 暴露打开弹窗方法。</p>
            <p><code>reset</code> 暴露恢复默认方法。</p>
          </div>
        </section>

        <section class="table-column-settings-story__section">
          <strong>类型</strong>
          <div class="table-column-settings-story__grid">
            <p><code>TableColumnSettingsProps</code></p>
            <p><code>TableColumnSettingsExpose</code></p>
            <p><code>TableColumn</code></p>
            <p><code>TableColumnSetting</code></p>
          </div>
        </section>

        <section class="table-column-settings-story__section">
          <strong>事件</strong>
          <div class="table-column-settings-story__grid">
            <p><code>update:modelValue</code></p>
            <p><code>change</code></p>
            <p><code>reset</code></p>
            <p>{{ eventText }}</p>
          </div>
        </section>
      </div>
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

