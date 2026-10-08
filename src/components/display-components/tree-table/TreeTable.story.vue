<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive, ref } from 'vue'
import { XTreeTable } from './index'
import '../../../styles/index.css'
const expandedRowKeys = ref<string[]>(['sales', 'task-center', 'system', 'dev-settings'])
const selectedRowKeys = ref<string[]>([])
const eventLog = ref('等待交互')
const appearance = reactive({
  fontSize: 14 as number,
  showHeader: false,
  showSelection: true,
  defaultExpandAll: false,
  emptyText: '暂无数据',
  treeColumnKey: 'label',
  labelKey: 'label',
  rowKey: 'id',
  childrenKey: 'children'
})
const columns = computed(() => [
  { key: 'label', label: '名称', minWidth: 180 },
  { key: 'path', label: '路径', minWidth: 220 }
])
const rows = [
  {
    id: 'sales',
    label: '销售',
    path: '/销售',
    children: [
      { id: 'sales-quote', label: '报价表', path: '/auto-pages/bao-jia-biao' },
      { id: 'sales-customer', label: '客户表', path: '/auto-pages/ke-hu-biao' },
      { id: 'sales-contract', label: '合同表', path: '/auto-pages/he-tong-biao' },
      { id: 'sales-product', label: '物品表', path: '/auto-pages/wu-pin-biao' }
    ]
  },
  { id: 'workbench', label: '工作台', path: '/workbench' },
  {
    id: 'task-center',
    label: '任务中心',
    path: '/task-center',
    children: [
      { id: 'task-settings', label: '任务设置', path: '/task-center/settings' },
      { id: 'my-tasks', label: '我的任务', path: '/task-center/tasks' }
    ]
  },
  {
    id: 'system',
    label: '用户权限',
    path: '/system/user-permission',
    children: [
      { id: 'users', label: '用户管理', path: '/system/user-permission/users' },
      { id: 'roles', label: '角色管理', path: '/system/user-permission/roles' }
    ]
  },
  {
    id: 'dev-settings',
    label: '开发设置',
    path: '/dev-settings',
    children: [
      { id: 'menu', label: '菜单管理', path: '/menu' },
      { id: 'tables', label: '数据表管理', path: '/data-management/tables' }
    ]
  }
]
function handleExpandChange(payload: { rowKey: string; expanded: boolean }) {
  eventLog.value = `${payload.rowKey} ${payload.expanded ? '展开' : '收起'}`
}
function handleSelectionChange(payload: { keys: string[] }) {
  eventLog.value = `选择 ${payload.keys.length} 行`
}
function handleRowClick(payload: { rowKey: string }) {
  eventLog.value = `点击 ${payload.rowKey}`
}
</script>

<template>
  <Story title="展示组件/TreeTable 树表" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XTreeTable">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XTreeTable
            v-model:expanded-row-keys="expandedRowKeys"
            v-model:selected-row-keys="selectedRowKeys"
            :data="rows"
            :columns="columns"
            :row-key="appearance.rowKey"
            :children-key="appearance.childrenKey"
            :tree-column-key="appearance.treeColumnKey"
            :label-key="appearance.labelKey"

            :default-expand-all="appearance.defaultExpandAll"
            :empty-text="appearance.emptyText"
            @expand-change="handleExpandChange"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-button {
  background: #fff;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  color: #0f172a;
  cursor: pointer;
  font: inherit;
  min-height: 32px;
  padding: 0 10px;
}

.story-button:hover {
  border-color: #1264f4;
  color: #1264f4;
}

.story-note {
  color: #64748b;
  font-size: 13px;
  margin: 0;
}
</style>
