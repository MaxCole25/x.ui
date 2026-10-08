<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XTabs } from './index'
import type { TabItem, TabName, TabsProps, TabsReorderPayload } from './src/types'
import '../../../styles/index.css'

const initialProps = {
  modelValue: 'dashboard',
  tabPosition: 'top',
  items: [
    { name: 'dashboard', label: '工作台', icon: 'ri-dashboard-3-line', avatarText: '工', locked: true, refreshable: true },
    { name: 'members', label: '成员管理', icon: 'ri-team-line', closable: true, refreshable: true },
    { name: 'logs', label: '操作日志', icon: 'ri-file-list-3-line', closable: true, lazy: true },
    { name: 'disabled', label: '禁用页签', icon: 'ri-forbid-2-line', disabled: true }
  ],
  closable: true,
  addable: true,
  draggable: true,
  lazy: false,
  tabStretch: false
} satisfies TabsProps

function handleAdd(state: Record<string, unknown>) {
  const items = (state.items as TabItem[] | undefined) ?? []
  let index = items.length + 1
  while (items.some(item => item.name === `new-${index}`)) index++
  const name = `new-${index}`
  state.items = [...items, { name, label: `新增页签 ${index}`, avatarText: String(index), closable: true, refreshable: true }]
  state.modelValue = name
}
function handleRemove(state: Record<string, unknown>, name: TabName) {
  const items = ((state.items as TabItem[] | undefined) ?? []).filter(item => item.name !== name)
  state.items = items
  if (state.modelValue === name) state.modelValue = items[0]?.name
}
function handleReorder(state: Record<string, unknown>, payload: TabsReorderPayload) {
  const items = [...((state.items as TabItem[] | undefined) ?? [])]
  const sourceIndex = items.findIndex(item => item.name === payload.source)
  const targetIndex = items.findIndex(item => item.name === payload.target)
  if (sourceIndex < 0 || targetIndex < 0) return
  const [source] = items.splice(sourceIndex, 1)
  const insertIndex = items.findIndex(item => item.name === payload.target)
  items.splice(payload.position === 'after' ? insertIndex + 1 : insertIndex, 0, source)
  state.items = items
}
</script>

<template>
  <Story title="导航组件/标签页 Tabs" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTabs" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XTabs
            v-bind="apiProps"
            v-on="apiEvents"
            @tab-add="handleAdd(apiProps)"
            @tab-remove="handleRemove(apiProps, $event)"
            @reorder="handleReorder(apiProps, $event)"
            @vue:mounted="captureInstance"
          >
            <template #pane="{ item }">
              <div style="display: grid; gap: 8px; padding: 8px">
                <strong>{{ item.label }}</strong>
                <span>当前页签值：{{ item.name }}</span>
              </div>
            </template>
          </XTabs>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
