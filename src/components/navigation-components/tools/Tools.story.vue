<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive } from 'vue'
import { XTools } from './index'
import type { ToolsItem, ToolsItemLayout, ToolsItemType } from './src/types'
import '../../../styles/index.css'
const eventState = reactive({
  click: '',
  command: '',
  visible: ''
})
const appearance = reactive({
  fontSize: 14 as number,
  itemLayout: 'vertical' as ToolsItemLayout,
  disabled: false,
  teleported: true,
  teleportTo: 'body',
  zIndex: 2000,
  popperWidth: 148,
  primaryType: 'button' as ToolsItemType,
  dropdownType: 'dropdown' as ToolsItemType,
  splitType: 'split-dropdown' as ToolsItemType,
  showName: true,
  badgeValue: '12',
  badgeMax: 99,
  badgeDot: false,
  badgeHidden: false,
  badgeStatus: 'danger' as 'primary' | 'success' | 'warning' | 'danger' | 'info',
  printName: '打印',
  queryName: '查询条件',
  refreshName: '刷新',
  settingsName: '设置',
  helpName: '帮助',
  closeName: '关闭'
})
const tools = computed<ToolsItem[]>(() => [
  {
    key: 'print',
    type: appearance.primaryType === 'separator' ? 'button' : appearance.primaryType,
    name: appearance.printName,
    showName: appearance.showName,
    icon: 'printer',
    badgeValue: appearance.badgeValue,
    badgeMax: appearance.badgeMax,
    badgeDot: appearance.badgeDot,
    badgeHidden: appearance.badgeHidden,
    badgeStatus: appearance.badgeStatus,
    onClick: () => {
      eventState.click = '打印'
    }
  },
  {
    key: 'print-more',
    type: 'split-dropdown',
    children: [
      { key: 'preview', name: '打印预览', command: 'preview' },
      { key: 'export', name: '导出 PDF', command: 'export' }
    ],
    onCommand: (command) => {
      eventState.command = String(command)
    }
  },
  { type: 'separator' },
  {
    key: 'query',
    type: appearance.dropdownType === 'separator' ? 'dropdown' : appearance.dropdownType,
    name: appearance.queryName,
    showName: appearance.showName,
    icon: 'search',
    badgeDot: true,
    badgeHidden: appearance.badgeHidden,
    badgeStatus: 'warning',
    disabled: true,
    children: [
      { key: 'today', name: '今日条件', command: 'today' },
      { key: 'advanced', name: '高级查询', command: 'advanced' }
    ]
  },
  { type: 'separator' },
  {
    key: 'refresh',
    type: 'button',
    name: appearance.refreshName,
    showName: appearance.showName,
    icon: 'refresh',
    onClick: () => {
      eventState.click = '刷新'
    }
  },
  {
    key: 'settings',
    type: appearance.splitType === 'separator' ? 'split-dropdown' : appearance.splitType,
    name: appearance.settingsName,
    showName: appearance.showName,
    icon: 'settings-3',
    badgeValue: 128,
    badgeMax: appearance.badgeMax,
    badgeHidden: appearance.badgeHidden,
    badgeStatus: appearance.badgeStatus,
    children: [
      { key: 'column', name: '列设置', command: 'column' },
      { key: 'density', name: '密度设置', command: 'density' }
    ],
    onClick: () => {
      eventState.click = '设置'
    }
  },
  { type: 'separator' },
  {
    key: 'help',
    type: 'split-dropdown',
    name: appearance.helpName,
    showName: appearance.showName,
    icon: 'question',
    children: [
      { key: 'docs', name: '查看文档', command: 'docs' },
      { key: 'about', name: '关于系统', command: 'about', divided: true }
    ]
  },
  {
    key: 'close',
    type: 'button',
    name: appearance.closeName,
    showName: appearance.showName,
    icon: 'close-circle',
    onClick: () => {
      eventState.click = '关闭'
    }
  }
])
function handleVisibleChange(item: ToolsItem, visible: boolean) {
  if (item.type === 'separator') return
  eventState.visible = `${String(item.key)}: ${visible}`
}
</script>

<template>
  <Story title="导航组件/Tools 工具栏" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTools">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XTools
            :items="tools"
            :item-layout="appearance.itemLayout"

            @click="eventState.click = String($event.name ?? $event.key)"
            @command="eventState.command = String($event)"
            @visible-change="handleVisibleChange"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
