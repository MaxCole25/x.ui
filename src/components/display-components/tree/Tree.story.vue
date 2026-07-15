<script setup lang="ts">
import { computed, reactive, ref, type CSSProperties } from 'vue'
import { XTree } from './index'
import type { TreeContextMenuContext, TreeContextMenuItem, TreeNodeData } from './src/types'
import '../../../styles/index.css'

const current = ref('1-1')
const currentUserId = ref<number | null>(1001)
const lastAction = ref('')
const dropLog = ref('')
const extraLog = ref('')
const size = ref<'sm' | 'md' | 'lg'>('md')
const activeAccentColor = ref('#2f66cf')
const hoverBackgroundColor = ref('#e0ecff')
const activeBackgroundColor = ref('#dbeafe')
const parentWidth = ref(420)
const parentHeight = ref(280)
const parentFullWidth = ref(false)
const parentFullHeight = ref(false)
const flags = reactive({
  allowCreate: true,
  allowDelete: true,
  useCustomMenu: false,
  useCustomMethods: false,
  useExtraSlot: false
})
const data = ref<TreeNodeData[]>([
  {
    id: '1',
    rawId: 1,
    type: 'group',
    label: '产品组',
    authorId: 1001,
    authorDisplayName: '张三',
    isCurrentUserRootMember: true,
    children: [
      { id: '1-1', rawId: 11, type: 'user', label: '需求文档', authorId: 1002, authorDisplayName: '李四' },
      { id: '1-2', rawId: 12, type: 'document', label: '发布记录', authorId: 1001, authorDisplayName: '张三' }
    ]
  },
  { id: '2', rawId: 2, type: 'group', label: '运营组', authorId: 1003, authorDisplayName: '王五' }
])

const parentStyle = computed<CSSProperties>(() => ({
  alignItems: 'center',
  border: '1px solid #d1d9e6',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  minHeight: '120px',
  padding: '10px',
  width: parentFullWidth.value ? '100%' : `${parentWidth.value}px`,
  height: parentFullHeight.value ? '100%' : `${parentHeight.value}px`
}))

function onContextAction(action: string, node: TreeNodeData) {
  lastAction.value = `${action}: ${node.label}`
}

function onNodeExtraClick(node: TreeNodeData) {
  extraLog.value = `右侧点击: ${node.label}`
}

function makeNode(label: string): TreeNodeData {
  const id = `story-${Date.now()}-${Math.round(Math.random() * 1000)}`
  return {
    id,
    rawId: Number(String(Date.now()).slice(-6)),
    type: 'document',
    label,
    isEditing: true
  }
}

function createRootNode(treeData: TreeNodeData[]) {
  const node = makeNode('业务新增根节点')
  treeData.push(node)
  return node
}

function createNode(node: TreeNodeData) {
  const child = makeNode('业务新增节点')
  node.children = node.children || []
  node.children.push(child)
  return child
}

function deleteNode(node: TreeNodeData, treeData: TreeNodeData[]) {
  removeNodeById(treeData, node.id)
}

function customContextMenuItems(context: TreeContextMenuContext): TreeContextMenuItem[] {
  return [
    { action: 'new-root', label: '增加根节点' },
    { action: 'new-child', label: '新建节点', disabled: !context.node || !flags.allowCreate },
    { action: 'delete-node', label: '删除节点', disabled: !context.node || !flags.allowDelete, tone: 'danger' }
  ]
}

function removeNodeById(nodes: TreeNodeData[], id: string | number): TreeNodeData | null {
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i]
    if (node.id === id) {
      return nodes.splice(i, 1)[0]
    }
    if (node.children?.length) {
      const found = removeNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

function findNodeById(nodes: TreeNodeData[], id: string | number): TreeNodeData | null {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children?.length) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

function insertBeforeOrAfter(nodes: TreeNodeData[], targetId: string | number, dragging: TreeNodeData, type: 'before' | 'after'): boolean {
  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].id === targetId) {
      const at = type === 'before' ? i : i + 1
      nodes.splice(at, 0, dragging)
      return true
    }
    if (nodes[i].children?.length) {
      const ok = insertBeforeOrAfter(nodes[i].children!, targetId, dragging, type)
      if (ok) return true
    }
  }
  return false
}

function handleNodeDrop(draggingNode: TreeNodeData, dropNode: TreeNodeData, dropType: 'before' | 'after' | 'inner') {
  const dragging = removeNodeById(data.value, draggingNode.id)
  if (!dragging) return

  if (dropType === 'inner') {
    const target = findNodeById(data.value, dropNode.id)
    if (!target) return
    target.children = target.children || []
    target.children.push(dragging)
  } else {
    insertBeforeOrAfter(data.value, dropNode.id, dragging, dropType)
  }

  dropLog.value = `拖拽: ${String(draggingNode.id)} -> ${String(dropNode.id)} (${dropType})`
}
</script>

<template>
  <Story title="展示组件/树目录 Tree" group="components">
    <Variant title="外观接口">
      <div style="display: grid; gap: 12px">
        <div style="display: grid; gap: 10px">
          <section>
            <strong style="display: block; margin-bottom: 6px; font-size: 13px">属性</strong>
            <div style="display: grid; grid-template-columns: repeat(4, 180px); gap: 8px; align-items: center; font-size: 12px">
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                尺寸
                <select v-model="size" style="min-width: 0">
                  <option value="sm">sm</option>
                  <option value="md">md</option>
                  <option value="lg">lg</option>
                </select>
              </label>
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                当前用户ID
                <input v-model.number="currentUserId" type="number" style="min-width: 0" />
              </label>
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                激活颜色
                <input v-model="activeAccentColor" type="color" style="min-width: 0" />
              </label>
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                悬浮背景色
                <input v-model="hoverBackgroundColor" type="color" style="min-width: 0" />
              </label>
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                激活背景色
                <input v-model="activeBackgroundColor" type="color" style="min-width: 0" />
              </label>
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                父元素宽度
                <input v-model.number="parentWidth" type="number" style="min-width: 0" />
              </label>
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                父元素高度
                <input v-model.number="parentHeight" type="number" style="min-width: 0" />
              </label>
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                撑满宽度
                <input v-model="parentFullWidth" type="checkbox" />
              </label>
              <label style="display: grid; grid-template-columns: 72px 1fr; gap: 6px; align-items: center">
                撑满高度
                <input v-model="parentFullHeight" type="checkbox" />
              </label>
            </div>
          </section>
          <section>
            <strong style="display: block; margin-bottom: 6px; font-size: 13px">接口</strong>
            <div style="display: grid; grid-template-columns: repeat(4, 180px); gap: 8px; align-items: center; font-size: 12px">
              <label style="display: grid; grid-template-columns: 88px 1fr; gap: 6px; align-items: center">
                允许新建节点
                <input v-model="flags.allowCreate" type="checkbox" />
              </label>
              <label style="display: grid; grid-template-columns: 88px 1fr; gap: 6px; align-items: center">
                允许删除
                <input v-model="flags.allowDelete" type="checkbox" />
              </label>
              <label style="display: grid; grid-template-columns: 88px 1fr; gap: 6px; align-items: center">
                自定义菜单
                <input v-model="flags.useCustomMenu" type="checkbox" />
              </label>
              <label style="display: grid; grid-template-columns: 88px 1fr; gap: 6px; align-items: center">
                自定义方法
                <input v-model="flags.useCustomMethods" type="checkbox" />
              </label>
              <label style="display: grid; grid-template-columns: 88px 1fr; gap: 6px; align-items: center">
                右侧插槽
                <input v-model="flags.useExtraSlot" type="checkbox" />
              </label>
            </div>
          </section>
          <section>
            <strong style="display: block; margin-bottom: 6px; font-size: 13px">类型</strong>
            <div style="display: grid; grid-template-columns: repeat(4, 180px); gap: 8px; font-size: 12px; color: #64748b">
              <span>TreeNodeData</span>
              <span>TreeContextMenuItem</span>
              <span>TreeContextAction</span>
              <span>TreeContextMenuContext</span>
            </div>
          </section>
          <section>
            <strong style="display: block; margin-bottom: 6px; font-size: 13px">事件</strong>
            <div style="display: grid; grid-template-columns: repeat(4, 180px); gap: 8px; font-size: 12px; color: #64748b">
              <span>nodeClick/键盘选择: {{ current }}</span>
              <span>contextAction: {{ lastAction || '-' }}</span>
              <span>nodeDrop: {{ dropLog || '-' }}</span>
              <span>nodeExtraClick: {{ extraLog || '-' }}</span>
            </div>
          </section>
        </div>

        <div :style="parentStyle">
          <XTree
            v-if="!flags.useExtraSlot"
            :tree-data="data"
            :current-tree-key="current"
            :current-user-id="currentUserId"
            :size="size"
            :active-accent-color="activeAccentColor"
            :hover-background-color="hoverBackgroundColor"
            :active-background-color="activeBackgroundColor"
            :can-create-child-by-node="() => flags.allowCreate"
            :can-delete-node-by-id="() => flags.allowDelete"
            :context-menu-items="flags.useCustomMenu ? customContextMenuItems : undefined"
            :create-root-node="flags.useCustomMethods ? createRootNode : undefined"
            :create-node="flags.useCustomMethods ? createNode : undefined"
            :delete-node="flags.useCustomMethods ? deleteNode : undefined"
            @node-click="(node) => (current = String(node.id))"
            @node-extra-click="onNodeExtraClick"
            @context-action="onContextAction"
            @node-drop="handleNodeDrop"
          />
          <XTree
            v-else
            :tree-data="data"
            :current-tree-key="current"
            :current-user-id="currentUserId"
            :size="size"
            :active-accent-color="activeAccentColor"
            :hover-background-color="hoverBackgroundColor"
            :active-background-color="activeBackgroundColor"
            :can-create-child-by-node="() => flags.allowCreate"
            :can-delete-node-by-id="() => flags.allowDelete"
            :context-menu-items="flags.useCustomMenu ? customContextMenuItems : undefined"
            :create-root-node="flags.useCustomMethods ? createRootNode : undefined"
            :create-node="flags.useCustomMethods ? createNode : undefined"
            :delete-node="flags.useCustomMethods ? deleteNode : undefined"
            @node-click="(node) => (current = String(node.id))"
            @node-extra-click="onNodeExtraClick"
            @context-action="onContextAction"
            @node-drop="handleNodeDrop"
          >
            <template #nodeExtra="{ node }">
              <button type="button" style="border: 0; background: transparent; color: #2563eb; cursor: pointer; font: inherit; padding: 0">
                {{ node.authorDisplayName || node.authorUserName || '操作' }}
              </button>
            </template>
          </XTree>
        </div>
      </div>
    </Variant>
  </Story>
</template>
