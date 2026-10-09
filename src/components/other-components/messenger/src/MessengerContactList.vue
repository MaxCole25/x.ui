<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { XAvatar } from '../../../display-components/avatar'
import { XIcon } from '../../../basic-components/icon'
import { XDialog } from '../../../feedback-components/dialog'
import { XTooltip } from '../../../feedback-components/tooltip'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { MessengerProps, MessengerId, MessengerOpenPayload, MessengerContactGroupAction } from './types'


const props = withDefaults(defineProps<Omit<MessengerProps, 'modelValue'> & { modelValue?: MessengerId; activeKind?: 'direct' | 'group' }>(), {
  contacts: () => [], contactGroups: () => [], groups: () => [], conversations: () => [], messagePages: () => [],
  contactListPlacement: 'right', contactListWidth: 280, contactListHeight: 520, fontSize: 14,
  currentUserRole: 'user', enableContactGroupManagement: true, disabled: false,
  teleported: true, teleportTo: 'body', zIndex: overlayZIndex.dialog
})
const emit = defineEmits<{
  'update:modelValue': [id: MessengerId]
  'update:activeKind': [kind: 'direct' | 'group']
  'update:contactListHeight': [height: number]
  open: [payload: MessengerOpenPayload]
  activate: []
  'create-group': []
  'contact-group-action': [payload: MessengerContactGroupAction]
}>()
const mounted = ref(false)
const surface = ref<HTMLElement>()
const launcher = ref<HTMLElement>()
const pinned = ref(true)
const expanded = ref(false)
const panelVisible = computed(() => pinned.value || expanded.value)
const view = ref<'recent' | 'contacts' | 'groups'>('recent')
const keyword = ref('')
const showSettings = ref(false)
async function togglePinned() {
  pinned.value = !pinned.value
  expanded.value = false
  endResize()
  endDrag()
  await nextTick()
  if (!pinned.value) launcher.value?.querySelector<HTMLButtonElement>('button')?.focus()
}
async function openPanel() {
  expanded.value = true
  emit('activate')
  await nextTick()
  surface.value?.querySelector<HTMLButtonElement>('header button')?.focus()
}
function dismissPanel(event: PointerEvent) {
  if (pinned.value || showSettings.value) return
  const target = event.target as Node
  if (!surface.value?.contains(target) && !launcher.value?.contains(target)) expanded.value = false
}
function onEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && !pinned.value && !showSettings.value) expanded.value = false
}
function startCreateGroup() {
  if (props.disabled || !props.allowCreateGroup) return
  emit('create-group')
  if (!pinned.value) expanded.value = false
}
const canManage = computed(() => props.currentUserRole === 'admin' && props.enableContactGroupManagement)
const newGroupName = ref('')
const editingId = ref<MessengerId>()
const editingName = ref('')
const settingsGroupId = ref<MessengerId>()
const settingsKeyword = ref('')
const settingsGroups = computed(() => props.contactGroups.map(group => ({
  ...group, members: props.contacts.filter(contact => contact.groupId === group.id)
})))
const activeSettingsGroup = computed(() => props.contactGroups.find(group => group.id === settingsGroupId.value))
const ungroupedUsers = computed(() => props.contacts.filter(contact => !props.contactGroups.some(group => group.id === contact.groupId)))
const settingsUsers = computed(() => ungroupedUsers.value.filter(contact => (contact.name + ' ' + (contact.department ?? '')).toLowerCase().includes(settingsKeyword.value.trim().toLowerCase())))
watch(showSettings, visible => {
  if (visible && !activeSettingsGroup.value) settingsGroupId.value = props.contactGroups[0]?.id
})
watch(() => props.contactGroups, () => {
  if (!activeSettingsGroup.value) settingsGroupId.value = props.contactGroups[0]?.id
}, { deep: true })
function toggleSettingsGroup(id: MessengerId) {
  settingsGroupId.value = settingsGroupId.value === id ? undefined : id
}
function moveToSettingsGroup(contactId: MessengerId) {
  if (!activeSettingsGroup.value || props.contacts.find(contact => contact.id === contactId)?.groupId === settingsGroupId.value) return
  action({ action: 'move', contactId, groupId: settingsGroupId.value })
}
function removeFromSettingsGroup(contactId: MessengerId) {
  action({ action: 'move', contactId, groupId: undefined })
}

const collapsed = ref(new Set<MessengerId | undefined>())
const position = reactive({ left: 24, top: 80 })
const listHeight = ref(props.contactListHeight)
let drag: { x: number; y: number; left: number; top: number } | undefined
let resize: { y: number; height: number } | undefined
function setListHeight(height: number) {
  const top = surface.value?.getBoundingClientRect().top ?? 24
  const maxHeight = Math.max(0, window.innerHeight - Math.max(0, top) - 12)
  listHeight.value = Math.min(maxHeight, Math.max(Math.min(180, maxHeight), height))
  emit('update:contactListHeight', Math.round(listHeight.value))
}
function moveResize(event: PointerEvent) {
  if (resize) setListHeight(resize.height + event.clientY - resize.y)
}
function endResize() {
  resize = undefined
  window.removeEventListener('pointermove', moveResize)
  window.removeEventListener('pointerup', endResize)
  window.removeEventListener('pointercancel', endResize)
}
function startResize(event: PointerEvent) {
  if (event.button !== 0 || !surface.value) return
  event.preventDefault()
  endDrag()
  resize = { y: event.clientY, height: surface.value.getBoundingClientRect().height }
  window.addEventListener('pointermove', moveResize)
  window.addEventListener('pointerup', endResize)
  window.addEventListener('pointercancel', endResize)
}
watch(() => props.contactListHeight, height => { listHeight.value = height })
function fitViewport() {
  position.left = Math.max(0, Math.min(position.left, window.innerWidth - (surface.value?.offsetWidth || props.contactListWidth)))
  position.top = Math.max(0, Math.min(position.top, window.innerHeight - (surface.value?.offsetHeight || listHeight.value)))
}
function moveDrag(event: PointerEvent) {
  if (!drag) return
  position.left = drag.left + event.clientX - drag.x
  position.top = drag.top + event.clientY - drag.y
  fitViewport()
}
function endDrag() {
  drag = undefined
  window.removeEventListener('pointermove', moveDrag)
  window.removeEventListener('pointerup', endDrag)
  window.removeEventListener('pointercancel', endDrag)
}
function startDrag(event: PointerEvent) {
  if (props.contactListPlacement !== 'floating' || event.button !== 0 || (event.target as HTMLElement).closest('button')) return
  event.preventDefault()
  drag = { x: event.clientX, y: event.clientY, ...position }
  window.addEventListener('pointermove', moveDrag)
  window.addEventListener('pointerup', endDrag)
  window.addEventListener('pointercancel', endDrag)
}
onMounted(() => {
  mounted.value = true
  position.left = Math.max(0, window.innerWidth - props.contactListWidth - 24)
  fitViewport()
  window.addEventListener('resize', fitViewport)
  document.addEventListener('pointerdown', dismissPanel, true)
  document.addEventListener('keydown', onEscape)
})
onBeforeUnmount(() => { endResize(); endDrag(); window.removeEventListener('resize', fitViewport); document.removeEventListener('pointerdown', dismissPanel, true); document.removeEventListener('keydown', onEscape) })
watch(() => props.currentUserRole, () => { showSettings.value = false; editingId.value = undefined })
watch(() => props.contactListPlacement, () => { endResize(); endDrag() })
const style = computed(() => ({
  ...createElementStyleVars(props), fontSize: props.fontSize + 'px',
  width: props.contactListWidth + 'px', height: listHeight.value + 'px',
  '--x-messenger-contact-z-index': props.zIndex,
  ...(props.contactListPlacement === 'left' ? { left: '0px', top: '24px' }
    : props.contactListPlacement === 'right' ? { right: '0px', top: '24px' }
    : props.contactListPlacement === 'top' ? { left: '50%', top: '0px', transform: 'translateX(-50%)' }
    : { left: position.left + 'px', top: position.top + 'px' })
}))
const launcherStyle = computed(() => ({
  '--x-messenger-contact-z-index': props.zIndex,
  ...(props.contactListPlacement === 'left' ? { left: '16px', top: '24px' }
    : props.contactListPlacement === 'right' ? { right: '16px', top: '24px' }
    : props.contactListPlacement === 'top' ? { left: '50%', top: '12px', transform: 'translateX(-50%)' }
    : { left: position.left + 'px', top: position.top + 'px' })
}))
function matches(name: string, department = '') { return (name + ' ' + department).toLowerCase().includes(keyword.value.trim().toLowerCase()) }
function summary(kind: 'direct' | 'group', targetId: MessengerId, unreadCount?: number) {
  const conversation = props.conversations.find(item => item.kind === kind && item.targetId === targetId)
  const messages = props.messagePages.find(page => page.conversationId === conversation?.id)?.messages ?? []
  const last = messages[messages.length - 1]
  return {
    lastMessage: conversation?.lastMessage ?? (last?.business ? last.business.title : last?.fileName || last?.content || (last?.kind === 'image' ? '[图片]' : '')),
    lastMessageTime: conversation?.lastMessageTime ?? last?.sentAt ?? last?.time ?? '',
    unreadCount: conversation?.unreadCount ?? unreadCount ?? 0
  }
}
const contactRows = computed(() => props.contacts.map(contact => ({ ...contact, kind: 'direct' as const, ...summary('direct', contact.id, contact.unreadCount) })))
const filteredContacts = computed(() => contactRows.value.filter(contact => matches(contact.name, contact.department)))
const recent = computed(() => props.conversations.filter(item => item.kind === 'direct').map(item => {
  const contact = contactRows.value.find(contact => contact.id === item.targetId)
  return contact ?? { id: item.targetId, name: item.title, avatar: item.avatar, kind: 'direct' as const, ...summary('direct', item.targetId) }
}).filter(item => matches(item.name, 'department' in item ? item.department : '')))
const sections = computed(() => [...props.contactGroups, { id: undefined, name: '未分组' }].map(group => ({
  ...group, contacts: filteredContacts.value.filter(contact => group.id === undefined
    ? !props.contactGroups.some(item => item.id === contact.groupId) : contact.groupId === group.id)
})))
const groups = computed(() => props.groups.filter(group => matches(group.name)).map(group => ({
  ...group, kind: 'group' as const, ...summary('group', group.id, group.unreadCount)
})))
const rows = computed(() => view.value === 'groups' ? groups.value : recent.value)
function formatTime(value: string) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
  const weekAgo = new Date(today); weekAgo.setDate(today.getDate() - 7)
  const time = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0')
  if (day.getTime() === today.getTime()) return time
  if (day.getTime() === yesterday.getTime()) return '昨天 ' + time
  if (day >= weekAgo && day < today) return ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()]
  const monthDay = (date.getMonth() + 1) + '/' + date.getDate()
  return date.getFullYear() === now.getFullYear() ? monthDay : date.getFullYear() + '/' + monthDay
}
function select(kind: 'direct' | 'group', id: MessengerId) {
  if (props.disabled) return
  emit('update:modelValue', id); emit('update:activeKind', kind)
}
function open(kind: 'direct' | 'group', id: MessengerId) {
  if (props.disabled) return
  select(kind, id); emit('open', { kind, targetId: id })
}
function toggle(id: MessengerId | undefined) {
  const next = new Set(collapsed.value); next.has(id) ? next.delete(id) : next.add(id); collapsed.value = next
}
function action(payload: MessengerContactGroupAction) {
  if (canManage.value && !props.disabled) emit('contact-group-action', payload)
}
function createGroup() {
  if (!newGroupName.value.trim()) return
  action({ action: 'create', name: newGroupName.value.trim() }); newGroupName.value = ''
}
function renameGroup() {
  if (editingId.value === undefined || !editingName.value.trim()) return
  action({ action: 'rename', groupId: editingId.value, name: editingName.value.trim() }); editingId.value = undefined
}
const modes = [
  { value: 'contacts' as const, label: '显示分组', icon: 'organization-chart' },
  { value: 'recent' as const, label: '最近消息', icon: 'chat-history' },
  { value: 'groups' as const, label: '群聊', icon: 'discuss' }
]
</script>
<template>
  <Teleport :to="teleportTo" :disabled="!teleported || !mounted">
    <section v-show="panelVisible" ref="surface" class="x-messenger-contacts" :class="{ 'is-floating': contactListPlacement === 'floating' }" :style="style" aria-label="信息" @pointerdown.capture="emit('activate')" @focusin="emit('activate')">
      <header class="x-messenger-contacts__header" @pointerdown="startDrag">
        <strong><span class="x-messenger-contacts__brand"><XIcon name="message-3" variant="fill" :icon-size="18" /></span>信息</strong>
        <button type="button" class="x-messenger-contacts__pin" :title="pinned ? '取消固定' : '固定好友列表'" :aria-label="pinned ? '取消固定' : '固定好友列表'" :aria-pressed="pinned" :class="{ 'is-selected': pinned }" @click="togglePinned"><XIcon name="pushpin-2" variant="fill" :icon-size="18" /></button>
      </header>

      <div class="x-messenger-contacts__search">
        <label class="x-messenger-contacts__search-field"><XIcon name="search" :icon-size="16" /><input v-model="keyword" :placeholder="view === 'groups' ? '搜索群聊' : '搜索姓名、部门'" aria-label="搜索联系人" :disabled="disabled" /></label>
        <XTooltip v-if="view === 'groups' && allowCreateGroup" content="创建群聊" :disabled="disabled" :teleported="teleported" :teleport-to="teleportTo" :z-index="Math.max(overlayZIndex.tooltip, zIndex + 1)">
          <button type="button" class="x-messenger-contacts__create-group" aria-label="创建群聊" :disabled="disabled" @click="startCreateGroup"><XIcon name="add" :icon-size="20" /></button>
        </XTooltip>
      </div>
      <div class="x-messenger-contacts__scroll">
        <template v-if="view === 'contacts'">
          <div v-for="(section, index) in sections" :key="index">
            <button type="button" class="x-messenger-contacts__heading" :aria-expanded="!collapsed.has(section.id)" :disabled="disabled" @click="toggle(section.id)"><XIcon name="arrow-down-s" :icon-size="16" :class="{ 'is-collapsed': collapsed.has(section.id) }" /><span>{{ section.name }}</span><small>{{ section.contacts.length }}</small></button>
            <template v-if="!collapsed.has(section.id)">
              <button v-for="contact in section.contacts" :key="contact.id" type="button" class="x-messenger-contacts__item" :class="{ 'is-active': modelValue === contact.id && activeKind === 'direct' }" :disabled="disabled" @click="select('direct', contact.id)" @dblclick="open('direct', contact.id)" @keydown.enter.prevent="open('direct', contact.id)">
                <XAvatar :src="contact.avatar" :name="contact.name" :avatar-size="36" avatar-background-color="linear-gradient(135deg, #63b6dd, #5b83cf)" />
                <span class="x-messenger-contacts__info"><span class="x-messenger-contacts__line"><strong>{{ contact.name }}</strong><time :title="contact.lastMessageTime">{{ formatTime(contact.lastMessageTime) }}</time></span><span class="x-messenger-contacts__line"><small>{{ contact.lastMessage || '暂无消息' }}</small><span v-if="contact.unreadCount > 0" class="x-messenger-contacts__badge" :aria-label="contact.unreadCount + '条未读消息'">{{ contact.unreadCount > 99 ? '99+' : contact.unreadCount }}</span></span></span>
              </button>
            </template>
          </div>
          <p v-if="!filteredContacts.length" class="x-messenger-contacts__empty">暂无联系人</p>
        </template>
        <template v-else>
          <button v-for="row in rows" :key="row.id" type="button" class="x-messenger-contacts__item" :class="{ 'is-active': modelValue === row.id && activeKind === row.kind }" :disabled="disabled" @click="select(row.kind, row.id)" @dblclick="open(row.kind, row.id)" @keydown.enter.prevent="open(row.kind, row.id)">
            <XAvatar :src="row.avatar" :name="row.name" :avatar-size="36" :avatar-background-color="row.kind === 'group' ? 'linear-gradient(135deg, #a48de4, #7e6ad1)' : 'linear-gradient(135deg, #63b6dd, #5b83cf)'" />
            <span class="x-messenger-contacts__info"><span class="x-messenger-contacts__line"><strong>{{ row.name }}</strong><time :title="row.lastMessageTime">{{ formatTime(row.lastMessageTime) }}</time></span><span class="x-messenger-contacts__line"><small>{{ row.lastMessage || '暂无消息' }}</small><span v-if="row.unreadCount > 0" class="x-messenger-contacts__badge" :aria-label="row.unreadCount + '条未读消息'">{{ row.unreadCount > 99 ? '99+' : row.unreadCount }}</span></span></span>
          </button>
          <p v-if="!rows.length" class="x-messenger-contacts__empty">{{ view === 'recent' ? '暂无最近联系人' : '暂无群聊' }}</p>
        </template>
      </div>
      <footer class="x-messenger-contacts__footer">
        <nav aria-label="联系人视图">
          <button v-for="mode in modes" :key="mode.value" type="button" :title="mode.label" :aria-label="mode.label" :aria-pressed="view === mode.value" :class="['x-messenger-contacts__mode', 'is-' + mode.value, { 'is-selected': view === mode.value }]" :disabled="disabled" @click="view = mode.value"><XIcon :name="mode.icon" :variant="view === mode.value ? 'fill' : 'line'" :icon-size="18" /></button>
        </nav>
        <button v-if="currentUserRole === 'admin'" type="button" class="x-messenger-contacts__settings-trigger" title="设置" aria-label="联系人设置" :aria-expanded="showSettings" :disabled="disabled" @click="showSettings = !showSettings"><XIcon name="settings-3" :icon-size="18" /></button>
      </footer>
      <button type="button" class="x-messenger-contacts__resizer" aria-label="拖拽调整好友列表高度" title="拖拽调整高度" @pointerdown.stop="startResize" @keydown.up.prevent="setListHeight(listHeight - 20)" @keydown.down.prevent="setListHeight(listHeight + 20)" />
    </section>
    <div v-show="!panelVisible" ref="launcher" class="x-messenger-contacts__launcher" :style="launcherStyle">
      <button type="button" title="打开消息列表" aria-label="打开消息列表" :aria-expanded="panelVisible" @click="openPanel"><XIcon name="message-3" variant="fill" :icon-size="26" /></button>
    </div>
  </Teleport>
  <XDialog v-if="currentUserRole === 'admin'" v-model="showSettings" title="联系人设置" :width="760" :height="520" :min-width="560" :min-height="360" :font-size="fontSize" :teleported="teleported" :teleport-to="teleportTo" :z-index="zIndex + 1" :radius="radius" :border-color="borderColor" :background-color="backgroundColor" :text-color="textColor" header-background-color="color-mix(in srgb, var(--x-color-primary, #4385ef) 5%, var(--x-color-surface, white))" close-icon-color="var(--x-color-text-muted, #7a8493)">
      <div v-if="canManage" class="x-messenger-contacts__settings">
        <form class="x-messenger-contacts__settings-create" @submit.prevent="createGroup"><input v-model="newGroupName" placeholder="新分组名称" aria-label="新分组名称" :disabled="disabled" /><button class="x-messenger-contacts__primary" :disabled="disabled || !newGroupName.trim()"><XIcon name="add" :icon-size="16" />新增分组</button></form>
        <div class="x-messenger-contacts__settings-columns">
          <section class="x-messenger-contacts__settings-pane" aria-label="好友分组">
            <header><XIcon name="organization-chart" :icon-size="18" /><strong>好友分组</strong><small>{{ contactGroups.length }} 组</small></header>
            <p class="x-messenger-contacts__settings-hint">展开目标分组，双击成员可移出</p>
            <div class="x-messenger-contacts__settings-scroll">
              <div v-for="group in settingsGroups" :key="group.id" class="x-messenger-contacts__settings-group" :class="{ 'is-selected': settingsGroupId === group.id }">
                <div class="x-messenger-contacts__settings-group-header">
                  <button type="button" class="x-messenger-contacts__settings-group-toggle" :aria-label="'展开分组' + group.name" :aria-expanded="settingsGroupId === group.id" :disabled="disabled" @click="toggleSettingsGroup(group.id)"><XIcon name="arrow-down-s" :icon-size="16" :class="{ 'is-collapsed': settingsGroupId !== group.id }" /><span>{{ group.name }}</span><small>{{ group.members.length }}</small></button>
                  <button type="button" :title="'编辑' + group.name" :aria-label="'编辑分组' + group.name" :disabled="disabled" @click="editingId = group.id; editingName = group.name"><XIcon name="edit" :icon-size="15" /></button>
                  <button type="button" class="x-messenger-contacts__danger" :title="'删除' + group.name" :aria-label="'删除分组' + group.name" :disabled="disabled" @click="action({ action: 'delete', groupId: group.id })"><XIcon name="delete-bin" :icon-size="15" /></button>
                </div>
                <form v-if="editingId === group.id" class="x-messenger-contacts__settings-rename" @submit.prevent="renameGroup"><input v-model="editingName" aria-label="分组名称" :disabled="disabled" /><button :disabled="disabled || !editingName.trim()">保存</button><button type="button" @click="editingId = undefined">取消</button></form>
                <div v-if="settingsGroupId === group.id" class="x-messenger-contacts__settings-members">
                  <button v-for="member in group.members" :key="member.id" type="button" class="x-messenger-contacts__settings-user" :aria-label="'移出分组' + member.name" title="双击移出分组" :disabled="disabled" @dblclick="removeFromSettingsGroup(member.id)" @keydown.enter.prevent="removeFromSettingsGroup(member.id)"><XAvatar :name="member.name" :src="member.avatar" :avatar-size="28" avatar-background-color="linear-gradient(135deg, #63b6dd, #5b83cf)" /><span>{{ member.name }}</span><XIcon name="arrow-right" :icon-size="16" /></button>
                  <p v-if="!group.members.length" class="x-messenger-contacts__settings-empty">暂无成员，可双击右侧用户加入</p>
                </div>
              </div>
              <p v-if="!contactGroups.length" class="x-messenger-contacts__settings-empty">暂无分组，请先新增分组</p>
            </div>
          </section>
          <section class="x-messenger-contacts__settings-pane" aria-label="未分组用户">
            <header><XIcon name="user-3" :icon-size="18" /><strong>未分组用户</strong><small>{{ ungroupedUsers.length }} 人</small></header>
            <p class="x-messenger-contacts__settings-hint">{{ activeSettingsGroup ? '双击加入「' + activeSettingsGroup.name + '」' : '请先展开左侧目标分组' }}</p>
            <input v-model="settingsKeyword" class="x-messenger-contacts__settings-search" placeholder="搜索用户、部门" aria-label="搜索未分组用户" :disabled="disabled" />
            <div class="x-messenger-contacts__settings-scroll">
              <button v-for="user in settingsUsers" :key="user.id" type="button" class="x-messenger-contacts__settings-user" :aria-label="'加入分组' + user.name" :title="activeSettingsGroup ? '双击加入' + activeSettingsGroup.name : '请先展开左侧分组'" :disabled="disabled || !activeSettingsGroup" @dblclick="moveToSettingsGroup(user.id)" @keydown.enter.prevent="moveToSettingsGroup(user.id)"><XAvatar :name="user.name" :src="user.avatar" :avatar-size="28" avatar-background-color="linear-gradient(135deg, #63b6dd, #5b83cf)" /><span>{{ user.name }}</span><XIcon name="arrow-left" :icon-size="16" /></button>
              <p v-if="!settingsUsers.length" class="x-messenger-contacts__settings-empty">{{ settingsKeyword.trim() ? '暂无匹配用户' : '暂无未分组用户' }}</p>
            </div>
          </section>
        </div>
      </div>
      <p v-else>分组管理未启用</p>
  </XDialog>
</template>
<style scoped>
.x-messenger-contacts {
  --x-messenger-blue: #4385ef;
  --x-messenger-green: var(--x-color-success, #1aa58b);
  --x-messenger-violet: #8061d5;
  --x-messenger-amber: var(--x-color-warning, #d99a36);
  position: fixed; display: flex; flex-direction: column; box-sizing: border-box; min-height: 0;
  max-width: calc(100vw - 12px); max-height: calc(100vh - 24px); overflow: hidden;
  z-index: var(--x-messenger-contact-z-index, var(--x-z-index-dialog, 1900));
  color: var(--x-element-text, var(--x-color-text, #303846));
  background: var(--x-element-bg, var(--x-color-surface, white));
  border: var(--x-element-border-width, 1px) solid var(--x-element-border-color, var(--x-color-border, #dde2ea));
  border-radius: var(--x-element-radius, 14px);
  box-shadow: 0 16px 44px rgba(38, 61, 105, .12), 0 3px 10px rgba(38, 61, 105, .05);
}
button, input, select { font: inherit; color: inherit; }
button { cursor: pointer; background: transparent; border: 0; transition: background .16s, color .16s, box-shadow .16s; }
button:disabled { cursor: default; opacity: .5; }
button:focus-visible { outline: 2px solid var(--x-color-primary, #4385ef); outline-offset: 2px; }
.x-messenger-contacts__header { display: flex; align-items: center; gap: 8px; padding: 12px 14px; border-bottom: 1px solid var(--x-color-border, #dde2ea); background: linear-gradient(120deg, color-mix(in srgb, var(--x-messenger-blue) 7%, transparent), color-mix(in srgb, var(--x-messenger-violet) 3%, transparent)); }
.is-floating .x-messenger-contacts__header { cursor: move; touch-action: none; }
.x-messenger-contacts__header strong { display: flex; align-items: center; gap: 9px; flex: 1; white-space: nowrap; font-weight: var(--x-font-weight-semibold, 600); }
.x-messenger-contacts__brand { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border-radius: 9px; color: white; background: linear-gradient(135deg, #4c9ff5, #6c76dd); box-shadow: 0 3px 8px rgba(77, 130, 224, .2); }
.x-messenger-contacts__header button, .x-messenger-contacts__footer button { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.x-messenger-contacts__pin { color: var(--x-messenger-amber); }
.x-messenger-contacts__pin :deep(.x-icon) { transform: rotate(90deg); transition: transform .16s; }
.x-messenger-contacts__pin.is-selected :deep(.x-icon) { transform: rotate(0deg); }
.x-messenger-contacts__search { display: flex; align-items: center; gap: 8px; margin: 12px 14px 8px; flex-shrink: 0; }
.x-messenger-contacts__search-field { display: flex; align-items: center; gap: 7px; flex: 1; min-width: 0; padding: 0 9px; border: 1px solid transparent; border-radius: 8px; color: color-mix(in srgb, var(--x-messenger-blue) 65%, var(--x-color-text-muted, #7a8493)); background: var(--x-color-surface-soft, #f6f8fb); transition: border-color .16s, box-shadow .16s; }
input, select { min-width: 0; height: 32px; box-sizing: border-box; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 7px; padding: 0 8px; background: var(--x-color-surface, white); }
.x-messenger-contacts__search-field input { flex: 1; width: 0; padding: 0; color: var(--x-element-text, var(--x-color-text, #303846)); border: 0; background: transparent; outline: none; }
.x-messenger-contacts__search-field:focus-within { border-color: var(--x-messenger-blue); box-shadow: 0 0 0 3px color-mix(in srgb, var(--x-messenger-blue) 10%, transparent); }
.x-messenger-contacts__create-group { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; padding: 0; border-radius: 9px; color: white; background: linear-gradient(135deg, #28bb9d, #16a68e); box-shadow: 0 3px 8px rgba(22, 166, 142, .18); }
.x-messenger-contacts__create-group:hover:not(:disabled) { background: #16a68e; box-shadow: 0 4px 12px rgba(22, 166, 142, .3); }
.x-messenger-contacts__scroll { flex: 1; min-height: 0; overflow: auto; padding: 4px 0; scrollbar-width: thin; }
.x-messenger-contacts__heading { display: flex; align-items: center; gap: 6px; width: calc(100% - 16px); min-height: 34px; margin: 3px 8px; padding: 0 9px; text-align: left; border-radius: 8px; background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger-contacts__heading :deep(.x-icon) { color: var(--x-messenger-green); transition: transform .16s; }
.x-messenger-contacts__heading .is-collapsed { transform: rotate(-90deg); }
.x-messenger-contacts__heading span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.x-messenger-contacts__heading small { display: inline-flex; align-items: center; justify-content: center; min-width: 20px; padding: 2px 4px; border-radius: 6px; color: var(--x-messenger-green); background: color-mix(in srgb, var(--x-messenger-green) 10%, transparent); font-size: 11px; }
.x-messenger-contacts__item { position: relative; display: flex; align-items: center; gap: 9px; width: calc(100% - 16px); min-width: 0; margin: 3px 8px; padding: 10px 8px; text-align: left; border-radius: 10px; }
.x-messenger-contacts__item:hover { background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger-contacts__item.is-active { background: color-mix(in srgb, var(--x-messenger-blue) 9%, var(--x-element-bg, var(--x-color-surface, white))); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--x-messenger-blue) 12%, transparent); }
.x-messenger-contacts__info { display: grid; gap: 4px; flex: 1; min-width: 0; }
.x-messenger-contacts__line { display: flex; align-items: center; gap: 8px; min-width: 0; min-height: 22px; }
.x-messenger-contacts__line strong, .x-messenger-contacts__line small { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.x-messenger-contacts__line strong { font-weight: var(--x-font-weight-medium, 500); }
.x-messenger-contacts__line time { flex-shrink: 0; font-size: 11px; white-space: nowrap; }
.x-messenger-contacts__line time, .x-messenger-contacts__line small, .x-messenger-contacts__empty { color: var(--x-color-text-muted, #7a8493); }
.x-messenger-contacts__badge { display: inline-flex; align-items: center; justify-content: center; flex: 0 0 20px; width: 20px; height: 20px; border-radius: 50%; font-size: 10px; line-height: 1; background: var(--x-color-danger, #e95353); color: white; box-shadow: 0 2px 5px color-mix(in srgb, var(--x-color-danger, #e95353) 22%, transparent); }
.x-messenger-contacts__empty { padding: 28px 14px; text-align: center; }
.x-messenger-contacts__footer { display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; padding: 10px 14px 6px; border-top: 1px solid var(--x-color-border, #dde2ea); background: linear-gradient(0deg, var(--x-color-surface-soft, #f6f8fb), transparent); }
.x-messenger-contacts__footer nav { display: flex; gap: 8px; }
.x-messenger-contacts__mode { --x-messenger-tone: var(--x-messenger-blue); color: var(--x-messenger-tone); }
.x-messenger-contacts__mode.is-contacts { --x-messenger-tone: var(--x-messenger-green); }
.x-messenger-contacts__mode.is-groups { --x-messenger-tone: var(--x-messenger-violet); }
.x-messenger-contacts__mode:hover:not(:disabled) { color: color-mix(in srgb, var(--x-messenger-tone) 80%, black); }
.x-messenger-contacts__mode.is-selected { color: color-mix(in srgb, var(--x-messenger-tone) 85%, black); }
.x-messenger-contacts__settings-trigger { color: var(--x-messenger-amber); }
.x-messenger-contacts__settings-trigger:hover:not(:disabled) { color: color-mix(in srgb, var(--x-messenger-amber) 80%, black); }
.x-messenger-contacts__resizer { display: flex; align-items: center; justify-content: center; flex: 0 0 10px; width: 100%; padding: 0; cursor: ns-resize; touch-action: none; }
.x-messenger-contacts__resizer::after { content: ''; width: 32px; height: 3px; border-radius: 2px; background: color-mix(in srgb, var(--x-messenger-blue) 30%, var(--x-color-border, #dde2ea)); }
.x-messenger-contacts__resizer:hover::after, .x-messenger-contacts__resizer:focus-visible::after { background: var(--x-messenger-blue); }
.x-messenger-contacts__launcher { position: fixed; z-index: var(--x-messenger-contact-z-index, var(--x-z-index-dialog, 1900)); }
.x-messenger-contacts__launcher button { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; padding: 0; border-radius: 16px; color: white; background: linear-gradient(135deg, #3d9cf2, #8560dc); box-shadow: 0 6px 20px rgba(71, 104, 209, .28); }
.x-messenger-contacts__launcher button:hover { filter: brightness(1.08); }
.x-messenger-contacts__settings { display: flex; flex-direction: column; height: 100%; min-height: 0; font: inherit; color: inherit; }
.x-messenger-contacts__settings-create, .x-messenger-contacts__settings-rename { display: flex; gap: 6px; flex-shrink: 0; margin-bottom: 12px; }
.x-messenger-contacts__settings input { min-width: 0; }
.x-messenger-contacts__settings-create input, .x-messenger-contacts__settings-rename input { flex: 1; width: 0; }
.x-messenger-contacts__settings button { display: inline-flex; align-items: center; justify-content: center; gap: 4px; min-height: 32px; border-radius: 7px; color: #4385ef; }
.x-messenger-contacts__settings-create button, .x-messenger-contacts__settings-rename button { padding: 5px 8px; flex-shrink: 0; white-space: nowrap; border: 1px solid var(--x-color-border, #dde2ea); }
.x-messenger-contacts__settings .x-messenger-contacts__primary { color: white; background: #4385ef; border-color: transparent; }
.x-messenger-contacts__settings .x-messenger-contacts__danger { color: var(--x-color-danger, #e95353); }
.x-messenger-contacts__settings-columns { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px; flex: 1; min-height: 0; }
.x-messenger-contacts__settings-pane { display: flex; flex-direction: column; min-width: 0; min-height: 0; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 10px; overflow: hidden; }
.x-messenger-contacts__settings-pane>header { display: flex; align-items: center; gap: 7px; padding: 10px 12px; flex-shrink: 0; background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger-contacts__settings-pane>header :deep(.x-icon) { color: var(--x-color-success, #1aa58b); }
.x-messenger-contacts__settings-pane:last-child>header :deep(.x-icon) { color: #4385ef; }
.x-messenger-contacts__settings-pane>header strong { flex: 1; }
.x-messenger-contacts__settings-pane>header small { color: var(--x-color-text-muted, #7a8493); white-space: nowrap; }
.x-messenger-contacts__settings-hint { padding: 8px 10px; margin: 0; font-size: 12px; color: var(--x-color-text-muted, #7a8493); overflow-wrap: anywhere; }
.x-messenger-contacts__settings-scroll { flex: 1; min-height: 0; padding: 4px 7px 8px; overflow: auto; scrollbar-width: thin; }
.x-messenger-contacts__settings-group { margin-bottom: 7px; border: 1px solid transparent; border-radius: 8px; }
.x-messenger-contacts__settings-group.is-selected { border-color: color-mix(in srgb, #4385ef 24%, var(--x-color-border, #dde2ea)); }
.x-messenger-contacts__settings-group-header { display: flex; align-items: center; gap: 2px; padding: 3px; border-radius: 7px; background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger-contacts__settings-group-header>button:not(:first-child) { width: 28px; flex-shrink: 0; padding: 0; }
.x-messenger-contacts__settings .x-messenger-contacts__settings-group-toggle { flex: 1; min-width: 0; justify-content: flex-start; padding: 0 5px; color: inherit; }
.x-messenger-contacts__settings-group-toggle span { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; text-align: left; }
.x-messenger-contacts__settings-group-toggle :deep(.x-icon) { color: var(--x-color-success, #1aa58b); transition: transform .16s; }
.x-messenger-contacts__settings-group-toggle .is-collapsed { transform: rotate(-90deg); }
.x-messenger-contacts__settings-group-toggle small { color: var(--x-color-text-muted, #7a8493); }
.x-messenger-contacts__settings-rename { margin: 6px; flex-wrap: wrap; }
.x-messenger-contacts__settings-members { padding: 4px; }
.x-messenger-contacts__settings .x-messenger-contacts__settings-user { display: flex; gap: 8px; width: 100%; min-width: 0; padding: 8px; margin: 2px 0; color: inherit; text-align: left; }
.x-messenger-contacts__settings-user>span:not(.x-avatar) { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.x-messenger-contacts__settings-user small { max-width: 42%; font-size: 11px; color: var(--x-color-text-muted, #7a8493); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.x-messenger-contacts__settings-user:disabled { opacity: .7; }
.x-messenger-contacts__settings-user:hover:not(:disabled) { background: color-mix(in srgb, #4385ef 7%, var(--x-color-surface, white)); }
.x-messenger-contacts__settings-user :deep(.x-icon) { color: #4385ef; }
.x-messenger-contacts__settings-search { flex-shrink: 0; width: calc(100% - 20px); margin: 0 10px 6px; }
.x-messenger-contacts__settings-empty { margin: 0; padding: 14px 8px; font-size: 12px; color: var(--x-color-text-muted, #7a8493); text-align: center; }
</style>
