<script setup lang="ts">
import { reactive, ref } from 'vue'
import { XTabs } from './index'
import type { TabItem, TabName, TabPosition, TabsLabelDirection, TabsReorderPayload, TabsSize } from './src/types'
import '../../../styles/index.css'

const active = ref<TabName>('dashboard')
const position = ref<TabPosition>('top')
const labelDirection = ref<TabsLabelDirection>('horizontal')
const size = ref<TabsSize>('md')
const events = ref<string[]>([])
const tabs = ref<TabItem[]>([
  { name: 'dashboard', label: '工作台', icon: 'ri-dashboard-3-line', avatarText: '工', locked: true, refreshable: true },
  { name: 'members', label: '成员管理', icon: 'ri-team-line', closable: true, refreshable: true },
  { name: 'logs', label: '操作日志', icon: 'ri-file-list-3-line', closable: true, lazy: true },
  { name: 'disabled', label: '禁用页签', icon: 'ri-forbid-2-line', disabled: true }
])

const config = reactive({
  closable: true,
  addable: true,
  draggable: true,
  lazy: false,
  stretch: false,
  showAvatar: true,
  showRefreshIcon: true,
  showContextMenu: true,
  borderRadius: 4,
  tabFontSize: 14,
  tabMinWidth: 140,
  tabBorder: '1px solid #C7D7E8',
  contentBorder: '1px solid #C7D7E8',
  contentBackgroundColor: '#ffffff',
  contextMenuBackgroundColor: '#ffffff',
  contextMenuTextColor: '#102a43'
})

function pushEvent(message: string) {
  events.value = [message, ...events.value].slice(0, 5)
}

function handleAdd() {
  const idx = tabs.value.length + 1
  const name = `new-${idx}`
  tabs.value.push({ name, label: `新增页签 ${idx}`, avatarText: String(idx), closable: true, refreshable: true })
  active.value = name
  pushEvent(`新增 ${name}`)
}

function handleRemove(name: TabName) {
  tabs.value = tabs.value.filter((item) => item.name !== name)
  if (active.value === name) {
    active.value = tabs.value[0]?.name
  }
  pushEvent(`关闭 ${name}`)
}

function handleReorder(payload: TabsReorderPayload) {
  const sourceIndex = tabs.value.findIndex((item) => item.name === payload.source)
  const targetIndex = tabs.value.findIndex((item) => item.name === payload.target)
  if (sourceIndex < 0 || targetIndex < 0) {
    return
  }

  const next = [...tabs.value]
  const [source] = next.splice(sourceIndex, 1)
  const insertIndex = next.findIndex((item) => item.name === payload.target)
  next.splice(payload.position === 'after' ? insertIndex + 1 : insertIndex, 0, source)
  tabs.value = next
  pushEvent(`排序 ${payload.source} -> ${payload.position} ${payload.target}`)
}
</script>

<template>
  <Story title="导航组件/标签页 Tabs" group="components">
    <Variant title="外观接口">
      <div style="display: grid; gap: 12px">
        <div style="display: flex; flex-wrap: wrap; gap: 12px; font-size: 13px">
          <label><input v-model="config.closable" type="checkbox" />可关闭</label>
          <label><input v-model="config.addable" type="checkbox" />可新增</label>
          <label><input v-model="config.draggable" type="checkbox" />可拖拽</label>
          <label><input v-model="config.lazy" type="checkbox" />懒渲染</label>
          <label><input v-model="config.stretch" type="checkbox" />拉伸</label>
          <label><input v-model="config.showAvatar" type="checkbox" />头像</label>
          <label><input v-model="config.showContextMenu" type="checkbox" />右键菜单</label>
          <label>
            圆角
            <input v-model.number="config.borderRadius" type="number" min="0" max="24" style="width: 64px" />
            px
          </label>
          <label>
            字号
            <input v-model.number="config.tabFontSize" type="number" min="10" max="24" style="width: 64px" />
            px
          </label>
          <label>
            最小宽度
            <input v-model.number="config.tabMinWidth" type="number" min="72" max="240" style="width: 64px" />
            px
          </label>
          <label>
            标签边框
            <input v-model="config.tabBorder" type="text" style="width: 72px" />
          </label>
          <label>
            内容边框
            <input v-model="config.contentBorder" type="text" style="width: 72px" />
          </label>
          <label>
            内容背景
            <input v-model="config.contentBackgroundColor" type="text" style="width: 120px" />
          </label>
          <label>
            右键背景
            <input v-model="config.contextMenuBackgroundColor" type="color" />
          </label>
          <label>
            右键文字
            <input v-model="config.contextMenuTextColor" type="color" />
          </label>
          <select v-model="position">
            <option value="top">顶部</option>
            <option value="bottom">底部</option>
            <option value="left">左侧</option>
            <option value="right">右侧</option>
          </select>
          <select v-model="labelDirection">
            <option value="horizontal">文字横排</option>
            <option value="vertical">文字竖排</option>
          </select>
          <select v-model="size">
            <option value="lg">大尺寸</option>
            <option value="md">中尺寸</option>
            <option value="sm">小尺寸</option>
          </select>
        </div>

        <div style="height: 260px; min-width: 0">
          <XTabs
            v-model="active"
            :items="tabs"
            :size="size"
            :tab-position="position"
            :label-direction="labelDirection"
            :closable="config.closable"
            :addable="config.addable"
            :draggable="config.draggable"
            :lazy="config.lazy"
            :stretch="config.stretch"
            :show-avatar="config.showAvatar"
            :show-refresh-icon="config.showRefreshIcon"
            :show-context-menu="config.showContextMenu"
            :border-radius="config.borderRadius"
            :tab-font-size="config.tabFontSize"
            :tab-min-width="config.tabMinWidth"
            :tab-border="config.tabBorder"
            :content-border="config.contentBorder"
            :content-background-color="config.contentBackgroundColor"
            :context-menu-background-color="config.contextMenuBackgroundColor"
            :context-menu-text-color="config.contextMenuTextColor"
            @tab-add="handleAdd"
            @tab-remove="handleRemove"
            @reorder="handleReorder"
            @tab-refresh="pushEvent(`刷新 ${$event}`)"
          >
            <template #pane="{ item }">
              <div style="display: grid; gap: 8px; padding: 8px">
                <strong>{{ item.label }}</strong>
                <span>当前页签值：{{ item.name }}</span>
              </div>
            </template>
          </XTabs>
        </div>

        <div style="font-size: 12px; color: #6b7c93">
          <div v-for="event in events" :key="event">{{ event }}</div>
        </div>
      </div>
    </Variant>

    

    
  </Story>
</template>
