<script setup lang="ts">
import { computed, reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XTools } from './index'
import type { ToolsItem, ToolsItemType } from './src/types'
import '../../../styles/index.css'

const eventState = reactive({
  click: '',
  command: '',
  visible: ''
})

const appearance = reactive({
  size: 'md' as 'sm' | 'md' | 'lg',
  disabled: false,
  teleported: true,
  teleportTo: 'body',
  zIndex: 2000,
  popperWidth: 148,
  primaryType: 'button' as ToolsItemType,
  dropdownType: 'dropdown' as ToolsItemType,
  splitType: 'split-dropdown' as ToolsItemType,
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
    icon: 'printer',
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
    icon: 'search',
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
    icon: 'refresh',
    onClick: () => {
      eventState.click = '刷新'
    }
  },
  {
    key: 'settings',
    type: appearance.splitType === 'separator' ? 'split-dropdown' : appearance.splitType,
    name: appearance.settingsName,
    icon: 'settings-3',
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
      <ElementStylePlayground>
        <template #default="styleProps">
          <XTools
            v-bind="styleProps"
            :items="tools"
            :size="appearance.size"
            :disabled="appearance.disabled"
            :teleported="appearance.teleported"
            :teleport-to="appearance.teleportTo"
            :z-index="appearance.zIndex"
            :popper-width="appearance.popperWidth"
            @click="eventState.click = String($event.name ?? $event.key)"
            @command="eventState.command = String($event)"
            @visible-change="handleVisibleChange"
          />
        </template>

        <template #column-1>
          <label><span>尺寸</span><select v-model="appearance.size"><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label>
          <label><span>层级</span><input v-model.number="appearance.zIndex" type="number" /></label>
          <label><span>弹层宽度</span><input v-model.number="appearance.popperWidth" type="number" /></label>
        </template>

        <template #column-2>
          <label><span>打印名称</span><input v-model="appearance.printName" type="text" /></label>
          <label><span>查询名称</span><input v-model="appearance.queryName" type="text" /></label>
          <label><span>刷新名称</span><input v-model="appearance.refreshName" type="text" /></label>
        </template>

        <template #column-3>
          <label><span>设置名称</span><input v-model="appearance.settingsName" type="text" /></label>
          <label><span>帮助名称</span><input v-model="appearance.helpName" type="text" /></label>
          <label><span>关闭名称</span><input v-model="appearance.closeName" type="text" /></label>
        </template>

        <template #column-4>
          <label class="story-check"><input v-model="appearance.disabled" type="checkbox" /><span>禁用</span></label>
          <label class="story-check"><input v-model="appearance.teleported" type="checkbox" /><span>挂载到外部</span></label>
          <label><span>挂载目标</span><input v-model="appearance.teleportTo" type="text" /></label>
        </template>

        <template #interfaces>
          <label><span>items</span><input value="ToolsItem[]" type="text" readonly /></label>
          <label><span>item 插槽</span><input value="可自定义工具项" type="text" readonly /></label>
          <label><span>icon 插槽</span><input value="可自定义图标" type="text" readonly /></label>
          <label><span>dropdown-item 插槽</span><input value="可自定义菜单项" type="text" readonly /></label>
        </template>

        <template #types>
          <label><span>普通项类型</span><select v-model="appearance.primaryType"><option value="button">button</option><option value="dropdown">dropdown</option><option value="split-dropdown">split-dropdown</option></select></label>
          <label><span>下拉项类型</span><select v-model="appearance.dropdownType"><option value="dropdown">dropdown</option><option value="split-dropdown">split-dropdown</option></select></label>
          <label><span>分割项类型</span><select v-model="appearance.splitType"><option value="split-dropdown">split-dropdown</option><option value="dropdown">dropdown</option><option value="button">button</option></select></label>
        </template>

        <template #events>
          <label><span>click 事件</span><input :value="eventState.click" type="text" readonly /></label>
          <label><span>command 事件</span><input :value="eventState.command" type="text" readonly /></label>
          <label><span>visible-change</span><input :value="eventState.visible" type="text" readonly /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
