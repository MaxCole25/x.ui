<script setup lang="ts">
import { ref } from 'vue'
const action = ref('')
const toolsBasicItems = [
  {
    key: 'print',
    type: 'button' as const,
    name: '打印',
    showName: false,
    icon: 'printer',
    badgeValue: 12,
    badgeMax: 99,
    onClick: () => { action.value = '打印' }
  },
  {
    key: 'print-more',
    type: 'split-dropdown' as const,
    children: [
      { key: 'preview', name: '打印预览', command: 'preview' },
      { key: 'export', name: '导出 PDF', command: 'export' }
    ]
  },
  { type: 'separator' as const },
  {
    key: 'query',
    type: 'dropdown' as const,
    name: '查询条件',
    showName: false,
    icon: 'search',
    badgeDot: true,
    badgeStatus: 'warning' as const,
    disabled: true,
    children: [
      { key: 'today', name: '今日条件', command: 'today' },
      { key: 'advanced', name: '高级查询', command: 'advanced' }
    ]
  },
  { type: 'separator' as const },
  {
    key: 'refresh',
    type: 'button' as const,
    name: '刷新',
    icon: 'refresh',
    onClick: () => { action.value = '刷新' }
  },
  {
    key: 'settings',
    type: 'split-dropdown' as const,
    name: '设置',
    showName: false,
    icon: 'settings-3',
    badgeValue: 128,
    badgeMax: 99,
    children: [
      { key: 'column', name: '列设置', command: 'column' },
      { key: 'density', name: '密度设置', command: 'density' }
    ],
    onClick: () => { action.value = '设置' }
  },
  { type: 'separator' as const },
  {
    key: 'help',
    type: 'split-dropdown' as const,
    name: '帮助',
    icon: 'question',
    children: [
      { key: 'docs', name: '查看文档', command: 'docs' },
      { key: 'about', name: '关于系统', command: 'about', divided: true }
    ]
  },
  {
    key: 'close',
    type: 'button' as const,
    name: '关闭',
    icon: 'close-circle',
    onClick: () => { action.value = '关闭' }
  }
]
import { XTools } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTools
    :items="toolsBasicItems"
    @click="(item) => { action = String(item.name ?? item.key) }"
    @command="(command) => { action = String(command) }"
  />
  <p>当前动作：{{ action }}</p>
</template>
