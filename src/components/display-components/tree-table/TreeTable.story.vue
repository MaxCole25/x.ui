<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XTreeTable } from './index'
import '../../../styles/index.css'

const expandedRowKeys = ref<string[]>(['sales', 'task-center', 'system', 'dev-settings'])
const selectedRowKeys = ref<string[]>([])
const eventLog = ref('等待交互')
const appearance = reactive({
  size: 'md' as 'sm' | 'md' | 'lg',
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

function expandAll() {
  expandedRowKeys.value = ['sales', 'task-center', 'system', 'dev-settings']
}

function collapseAll() {
  expandedRowKeys.value = []
}
</script>

<template>
  <Story title="展示组件/TreeTable 树表" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default>
          <XTreeTable
            v-model:expanded-row-keys="expandedRowKeys"
            v-model:selected-row-keys="selectedRowKeys"
            :data="rows"
            :columns="columns"
            :row-key="appearance.rowKey"
            :children-key="appearance.childrenKey"
            :tree-column-key="appearance.treeColumnKey"
            :label-key="appearance.labelKey"
            :size="appearance.size"
            :show-header="appearance.showHeader"
            :show-selection="appearance.showSelection"
            :default-expand-all="appearance.defaultExpandAll"
            :empty-text="appearance.emptyText"
            @expand-change="handleExpandChange"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
          />
        </template>

        <template #column-1>
          <label><span>尺寸</span><select v-model="appearance.size"><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label>
          <label><span>空态文本</span><input v-model="appearance.emptyText" /></label>
          <label><span>树形列</span><input v-model="appearance.treeColumnKey" /></label>
        </template>

        <template #column-2>
          <label><span>行键字段</span><input v-model="appearance.rowKey" /></label>
          <label><span>子级字段</span><input v-model="appearance.childrenKey" /></label>
          <label><span>文本字段</span><input v-model="appearance.labelKey" /></label>
        </template>

        <template #column-4>
          <label class="story-check"><input v-model="appearance.showHeader" type="checkbox" /><span>显示表头</span></label>
          <label class="story-check"><input v-model="appearance.showSelection" type="checkbox" /><span>显示选择列</span></label>
          <label class="story-check"><input v-model="appearance.defaultExpandAll" type="checkbox" /><span>默认全部展开</span></label>
        </template>

        <template #interfaces>
          <button type="button" class="story-button" @click="expandAll">展开全部</button>
          <button type="button" class="story-button" @click="collapseAll">收起全部</button>
        </template>

        <template #types>
          <p class="story-note">导出 TreeTableColumn、TreeTableRowData、TreeTableProps、TreeTableExpose 等类型。</p>
        </template>

        <template #events>
          <p class="story-note">{{ eventLog }}</p>
        </template>
      </ElementStylePlayground>
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
