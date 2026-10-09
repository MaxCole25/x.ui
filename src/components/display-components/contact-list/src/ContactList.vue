<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { XAvatar } from '../../avatar'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { createFontStyle } from '../../../_utils/size'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { ContactListPlacement, ContactListEmits, ContactListProps, ContactListSlots, MessengerId } from './types'
defineOptions({ name: 'XContactList' })
const props = withDefaults(defineProps<ContactListProps>(), { contacts: () => [], contactGroups: () => [], groups: () => [], width: '100%', height: '100%', fontSize: 14, activeKind: 'direct', showSearch: true, showGroups: true, enableGroupManagement: true, disabled: false, teleported: true, teleportTo: 'body', zIndex: overlayZIndex.dialog })
const emit = defineEmits<ContactListEmits>()
defineSlots<ContactListSlots>()
const surface = ref<HTMLElement>()
const mounted = ref(false)
const internalPlacement = ref<ContactListPlacement>('inline')
const placementValue = computed(() => props.placement ?? internalPlacement.value)
const viewport = reactive({ width: 0, height: 0 })
const floatingPosition = reactive({ left: 24, top: 80 })
let drag: { x: number; y: number; left: number; top: number; moved: boolean } | undefined
function setPlacement(value: ContactListPlacement) {
  if (value === 'floating' && placementValue.value !== 'floating' && surface.value) {
    const rect = surface.value.getBoundingClientRect()
    floatingPosition.left = rect.left
    floatingPosition.top = rect.top
  }
  internalPlacement.value = value
  emit('update:placement', value)
}
function fitViewport() {
  viewport.width = window.innerWidth
  viewport.height = window.innerHeight
  floatingPosition.left = Math.max(0, Math.min(floatingPosition.left, viewport.width - (surface.value?.offsetWidth ?? 280)))
  floatingPosition.top = Math.max(0, Math.min(floatingPosition.top, viewport.height - (surface.value?.offsetHeight ?? 520)))
}
function moveDrag(event: PointerEvent) {
  if (!drag) return
  const dx = event.clientX - drag.x
  const dy = event.clientY - drag.y
  if (!drag.moved && Math.abs(dx) + Math.abs(dy) < 4) return
  drag.moved = true
  if (placementValue.value !== 'floating') setPlacement('floating')
  floatingPosition.left = drag.left + dx
  floatingPosition.top = drag.top + dy
  fitViewport()
}
function endDrag() {
  if (drag?.moved && surface.value) {
    const rect = surface.value.getBoundingClientRect()
    if (rect.top <= 24) setPlacement('top')
    else if (rect.left <= 24) setPlacement('left')
    else if (viewport.width - rect.right <= 24) setPlacement('right')
  }
  drag = undefined
  window.removeEventListener('pointermove', moveDrag)
  window.removeEventListener('pointerup', endDrag)
  window.removeEventListener('pointercancel', endDrag)
}
function startDrag(event: PointerEvent) {
  if (event.button !== 0 || !surface.value || (event.target as HTMLElement).closest('button, select, input')) return
  event.preventDefault()
  const rect = surface.value.getBoundingClientRect()
  drag = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, moved: false }
  window.addEventListener('pointermove', moveDrag)
  window.addEventListener('pointerup', endDrag)
  window.addEventListener('pointercancel', endDrag)
}
onMounted(() => {
  mounted.value = true
  viewport.width = window.innerWidth
  viewport.height = window.innerHeight
  floatingPosition.left = Math.max(0, viewport.width - 304)
  window.addEventListener('resize', fitViewport)
})
onBeforeUnmount(() => { window.removeEventListener('resize', fitViewport); endDrag() })
const keyword = ref('')
const newGroupName = ref('')
const editingId = ref<MessengerId>()
const editingName = ref('')
const collapsed = ref(new Set<MessengerId | undefined>())
const statusNames = { online: '在线', offline: '离线', busy: '忙碌', away: '离开' }
const filtered = computed(() => props.contacts.filter(item => (item.name + ' ' + (item.department ?? '')).toLowerCase().includes(keyword.value.trim().toLowerCase())))
const sections = computed(() => [...props.contactGroups, { id: undefined, name: '未分组' }].map(group => ({ ...group, contacts: filtered.value.filter(contact => group.id === undefined ? !props.contactGroups.some(item => item.id === contact.groupId) : contact.groupId === group.id) })))
const visibleGroups = computed(() => props.groups.filter(group => group.name.toLowerCase().includes(keyword.value.trim().toLowerCase())))
const style = computed(() => {
  const placement = placementValue.value
  const detached = placement !== 'inline'
  const width = detached && props.width === '100%' ? '280px' : toCssSize(props.width)
  const height = detached && props.height === '100%' ? '520px' : toCssSize(props.height)
  const placementStyle = placement === 'left' ? { left: '0px', top: '24px' }
    : placement === 'right' ? { right: '0px', top: '24px' }
    : placement === 'top' ? { left: '50%', top: '0px', transform: 'translateX(-50%)' }
    : placement === 'floating' ? { left: floatingPosition.left + 'px', top: floatingPosition.top + 'px' } : {}
  return { ...createElementStyleVars(props), ...createFontStyle(props.fontSize), width, height, ...(detached ? { position: 'fixed' as const, maxWidth: 'calc(100vw - 12px)', maxHeight: 'calc(100vh - 24px)', '--x-contact-list-z-index': props.zIndex, ...placementStyle } : {}) }
})
function select(kind: 'direct' | 'group', id: MessengerId) { if (props.disabled) return; emit('update:modelValue', id); emit('update:activeKind', kind) }
function open(kind: 'direct' | 'group', id: MessengerId) { if (props.disabled) return; select(kind, id); emit('open', { kind, targetId: id }) }
function toggle(id: MessengerId | undefined) { const next = new Set(collapsed.value); next.has(id) ? next.delete(id) : next.add(id); collapsed.value = next }
function createGroup() { if (props.disabled || !newGroupName.value.trim()) return; emit('contact-group-action', { action: 'create', name: newGroupName.value.trim() }); newGroupName.value = '' }
function renameGroup() { if (props.disabled || editingId.value === undefined || !editingName.value.trim()) return; emit('contact-group-action', { action: 'rename', groupId: editingId.value, name: editingName.value.trim() }); editingId.value = undefined }
function move(contactId: MessengerId, event: Event) { const index = Number((event.target as HTMLSelectElement).value); emit('contact-group-action', { action: 'move', contactId, groupId: props.contactGroups[index]?.id }) }
</script>
<template>
  <Teleport :to="teleportTo" :disabled="placementValue === 'inline' || !teleported || !mounted">
  <section ref="surface" class="x-contact-list" :class="{ 'is-detached': placementValue !== 'inline' }" :style="style" aria-label="好友列表" @pointerdown.capture="emit('activate')" @focusin="emit('activate')">
    <header v-if="placementValue !== 'inline'" class="x-contact-list__dock-header" @pointerdown="startDrag">
      <strong>好友列表</strong>
      <select :value="placementValue" aria-label="好友列表停靠位置" @change="setPlacement(($event.target as HTMLSelectElement).value as ContactListPlacement)">
        <option value="left">左侧</option><option value="top">顶部</option><option value="right">右侧</option><option value="floating">悬浮</option>
      </select>
    </header>
    <input v-if="showSearch" v-model="keyword" class="x-contact-list__search" placeholder="搜索姓名、部门或群聊" aria-label="搜索联系人" :disabled="disabled" />
    <form v-if="enableGroupManagement" class="x-contact-list__create" @submit.prevent="createGroup"><input v-model="newGroupName" placeholder="新分组名称" aria-label="新分组名称" :disabled="disabled" /><button :disabled="disabled || !newGroupName.trim()">新增分组</button></form>
    <div class="x-contact-list__scroll">
      <div v-for="(section, sectionIndex) in sections" :key="sectionIndex">
        <div class="x-contact-list__heading">
          <button type="button" :aria-expanded="!collapsed.has(section.id)" @click="toggle(section.id)">{{ collapsed.has(section.id) ? '▸' : '▾' }} {{ section.name }} <small>{{ section.contacts.length }}</small></button>
          <template v-if="enableGroupManagement && section.id !== undefined">
            <button type="button" :disabled="disabled" aria-label="重命名分组" @click="editingId = section.id; editingName = section.name">编辑</button>
            <button type="button" :disabled="disabled" aria-label="删除分组" @click="emit('contact-group-action', { action: 'delete', groupId: section.id })">删除</button>
          </template>
        </div>
        <form v-if="editingId !== undefined && editingId === section.id" class="x-contact-list__create" @submit.prevent="renameGroup"><input v-model="editingName" aria-label="分组名称" :disabled="disabled" /><button :disabled="disabled">保存</button><button type="button" @click="editingId = undefined">取消</button></form>
        <div v-if="!collapsed.has(section.id)">
          <div v-for="contact in section.contacts" :key="contact.id" class="x-contact-list__row" :class="{ 'is-active': modelValue === contact.id && activeKind === 'direct' }">
            <button type="button" class="x-contact-list__item" :disabled="disabled" @click="select('direct', contact.id)" @dblclick="open('direct', contact.id)" @keydown.enter.prevent="open('direct', contact.id)">
              <slot name="contact" :contact="contact"><XAvatar :src="contact.avatar" :name="contact.name" :avatar-size="34" /><span class="x-contact-list__info"><strong>{{ contact.name }}</strong><small><i :class="['x-contact-list__status', 'is-' + (contact.status ?? 'offline')]" />{{ statusNames[contact.status ?? 'offline'] }}<span v-if="contact.department"> · {{ contact.department }}</span></small></span><span v-if="contact.unreadCount" class="x-contact-list__badge">{{ contact.unreadCount }}</span></slot>
            </button>
            <select v-if="enableGroupManagement" :value="contactGroups.findIndex(group => group.id === contact.groupId)" :aria-label="'移动' + contact.name + '到分组'" :disabled="disabled" @change="move(contact.id, $event)"><option :value="-1">未分组</option><option v-for="(group, index) in contactGroups" :key="group.id" :value="index">{{ group.name }}</option></select>
          </div>
        </div>
      </div>
      <template v-if="showGroups"><div class="x-contact-list__heading"><strong>群聊</strong><small>{{ visibleGroups.length }}</small></div><button v-for="group in visibleGroups" :key="group.id" type="button" class="x-contact-list__item" :class="{ 'is-active': modelValue === group.id && activeKind === 'group' }" :disabled="disabled" @click="select('group', group.id)" @dblclick="open('group', group.id)" @keydown.enter.prevent="open('group', group.id)"><slot name="group" :group="group"><XAvatar :src="group.avatar" :name="group.name" :avatar-size="34" /><span class="x-contact-list__info"><strong>{{ group.name }}</strong><small>{{ group.memberIds.length }} 位成员</small></span><span v-if="group.unreadCount" class="x-contact-list__badge">{{ group.unreadCount }}</span></slot></button></template>
      <div v-if="!filtered.length && (!showGroups || !visibleGroups.length)" class="x-contact-list__empty"><slot name="empty">暂无联系人</slot></div>
    </div>
    <footer v-if="$slots.footer" class="x-contact-list__footer"><slot name="footer" /></footer>
  </section>
  </Teleport>
</template>
<style scoped>
.x-contact-list { display: flex; flex-direction: column; min-height: 0; box-sizing: border-box; color: var(--x-element-text, var(--x-color-text, #303846)); background: var(--x-element-bg, var(--x-color-surface, white)); border: var(--x-element-border-width, 1px) solid var(--x-element-border-color, var(--x-color-border, #dde2ea)); border-radius: var(--x-element-radius, 8px); overflow: hidden; }
.x-contact-list.is-detached { z-index: var(--x-contact-list-z-index, var(--x-z-index-dialog, 1900)); box-shadow: 0 10px 30px rgba(20, 35, 60, .18); }
.x-contact-list__dock-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; gap: 8px; cursor: move; touch-action: none; user-select: none; border-bottom: 1px solid var(--x-color-border, #dde2ea); }
.x-contact-list__dock-header select { width: 78px; height: 28px; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 4px; background: var(--x-color-surface, white); color: inherit; }
.x-contact-list__footer { padding: 8px; border-top: 1px solid var(--x-color-border, #dde2ea); }
.x-contact-list input,.x-contact-list select,.x-contact-list button { font: inherit; }
.x-contact-list input { min-width: 0; height: 32px; box-sizing: border-box; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 4px; padding: 0 8px; }
.x-contact-list__search { margin: 10px; }
.x-contact-list__create { display: flex; gap: 4px; padding: 6px 10px; }.x-contact-list__create input { flex: 1; width: 0; }
.x-contact-list__create button,.x-contact-list__heading button { border: 0; background: transparent; color: inherit; cursor: pointer; white-space: nowrap; }
.x-contact-list__scroll { flex: 1; overflow: auto; min-height: 0; }
.x-contact-list__heading { display: flex; align-items: center; gap: 6px; min-height: 34px; padding: 0 10px; background: var(--x-color-surface-soft, #f6f8fb); }.x-contact-list__heading>:first-child { flex: 1; text-align: left; }
.x-contact-list__item { display: flex; align-items: center; gap: 8px; width: 100%; min-width: 0; padding: 9px 10px; border: 0; background: transparent; color: inherit; text-align: left; cursor: pointer; }
.x-contact-list__row { display: flex; align-items: center; }.x-contact-list__row .x-contact-list__item { flex: 1; width: 0; }.x-contact-list__row select { width: 68px; margin-right: 8px; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 4px; height: 28px; }
.x-contact-list__item:hover,.x-contact-list__row:hover { background: var(--x-color-surface-soft, #f6f8fb); }.is-active { background: var(--x-color-primary-soft, #eaf3ff); }
.x-contact-list__info { display: grid; gap: 3px; flex: 1; min-width: 0; }.x-contact-list__info strong,.x-contact-list__info small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.x-contact-list__info strong { font-weight: var(--x-font-weight-medium, 500); }.x-contact-list__info small,.x-contact-list__heading small { color: var(--x-color-text-muted, #7a8493); }
.x-contact-list__status { display: inline-block; width: 6px; height: 6px; margin-right: 4px; border-radius: 50%; background: #a0a8b5; }.x-contact-list__status.is-online { background: #24ad74; }.x-contact-list__status.is-busy { background: #ef6464; }.x-contact-list__status.is-away { background: #e9af40; }
.x-contact-list__badge { background: var(--x-color-danger, #e95353); color: white; border-radius: 12px; padding: 1px 6px; font-size: 12px; }.x-contact-list__empty { padding: 28px 10px; text-align: center; color: var(--x-color-text-muted, #7a8493); }button:disabled { cursor: default; opacity: .6; }
</style>
