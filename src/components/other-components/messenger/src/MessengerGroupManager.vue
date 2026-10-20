<script setup lang="ts">import { translate as t } from '../../../../locale'

import { messageAvatarColor } from "../../../_utils/avatarColor"
import { computed, ref, watch } from 'vue'
import { XAvatar } from '../../../display-components/avatar'
import { XIcon } from '../../../basic-components/icon'
import type { MessengerContact, MessengerGroup, MessengerGroupAction, MessengerId } from './types'
const props = defineProps<{ group: MessengerGroup; contacts: MessengerContact[]; disabled?: boolean }>()
const emit = defineEmits<{ action: [action: MessengerGroupAction]; close: [] }>()
type Section = 'members' | 'invite' | 'remove' | 'settings' | 'admins' | 'announcement'
const section = ref<Section>()
const keyword = ref('')
const groupName = ref(props.group.name)
const announcement = ref(props.group.announcement ?? '')
const selection = ref<MessengerId[]>([])
const armedAction = ref<'leave' | 'dissolve'>()
const permissions = computed(() => props.group.permissions ?? {})
const members = computed(() => props.group.memberIds.map(id => props.contacts.find(user => user.id === id) ?? { id, name: String(id), avatar: undefined }))
const previewMembers = computed(() => members.value.slice(0, permissions.value.canManageMembers ? 13 : 15))
const owner = computed(() => members.value.find(user => user.id === props.group.ownerId)?.name ?? t("extension.55a04b58cd2c"))
const candidates = computed(() => {
  const users = section.value === 'invite' ? props.contacts.filter(user => !props.group.memberIds.includes(user.id)) : members.value
  return users.filter(user => (user.name + ' ' + ('department' in user ? user.department ?? '' : '')).toLowerCase().includes(keyword.value.trim().toLowerCase()))
})
function role(id: MessengerId) { return id === props.group.ownerId ? t("extension.4fbe15e0f8b0") : props.group.adminIds?.includes(id) ? t("extension.ef84e765e027") : '' }
function open(value: Section) {
  if (section.value === value) { section.value = undefined; return }
  section.value = value
  keyword.value = ''
  groupName.value = props.group.name
  announcement.value = props.group.announcement ?? ''
  selection.value = value === 'admins' ? [...(props.group.adminIds ?? [])] : []
  armedAction.value = undefined
}
function toggle(id: MessengerId, checked: boolean) {
  selection.value = checked ? [...new Set([...selection.value, id])] : selection.value.filter(value => value !== id)
}
function saveMembers() {
  if (props.disabled || !permissions.value.canManageMembers || !selection.value.length) return
  const memberIds = section.value === 'invite' ? [...new Set([...props.group.memberIds, ...selection.value])] : props.group.memberIds.filter(id => id === props.group.ownerId || !selection.value.includes(id))
  emit('action', { action: 'members', groupId: props.group.id, memberIds })
  section.value = undefined
}
function saveName() {
  if (props.disabled || !permissions.value.canRename || !groupName.value.trim()) return
  emit('action', { action: 'rename', groupId: props.group.id, name: groupName.value.trim() })
}
function saveAnnouncement() {
  if (props.disabled || !permissions.value.canEditAnnouncement) return
  emit('action', { action: 'announcement', groupId: props.group.id, announcement: announcement.value })
  section.value = undefined
}
function saveAdmins() {
  if (props.disabled || !permissions.value.canManageAdmins) return
  emit('action', { action: 'admins', groupId: props.group.id, adminIds: selection.value.filter(id => props.group.memberIds.includes(id) && id !== props.group.ownerId) })
  section.value = undefined
}
function leave(action: 'leave' | 'dissolve') {
  if (props.disabled || !(action === 'leave' ? permissions.value.canLeave : permissions.value.canDissolve)) return
  if (armedAction.value !== action) { armedAction.value = action; return }
  emit('action', { action, groupId: props.group.id })
  emit('close')
}
watch(() => props.group, () => { groupName.value = props.group.name; announcement.value = props.group.announcement ?? ''; selection.value = []; armedAction.value = undefined }, { deep: true })
</script>
<template>
  <div class="x-messenger-group">
    <section class="x-messenger-group__identity">
      <XAvatar :name="group.name" :src="group.avatar" :avatar-size="40" avatar-background-color="linear-gradient(135deg, #ffbd6a, #ff974b)" />
      <div><strong :title="group.name">{{ group.name }}</strong><small>{{ t("extension.143dce79703b") }}{{ group.id }}</small></div>
    </section>
    <section class="x-messenger-group__card">
      <header><strong>{{ t("extension.ed8e37912772") }}</strong><button type="button" class="x-messenger-group__text-button" :aria-expanded="section === 'members'" @click="open('members')">{{ t("extension.ed2172fd7894") }}{{ members.length }}{{ t("extension.4912771a4216") }}<XIcon name="arrow-right-s" :icon-size="16" /></button></header>
      <div class="x-messenger-group__members">
        <button v-for="member in previewMembers" :key="member.id" type="button" class="x-messenger-group__member" :title="member.name + (role(member.id) ? ' · ' + role(member.id) : '')" @click="open('members')"><XAvatar :name="member.name" :src="member.avatar" :avatar-size="32" :background-color="messageAvatarColor(member.id, member.name)" text-color="#ffffff" /><span>{{ member.name }}</span></button>
        <button v-if="permissions.canManageMembers" type="button" class="x-messenger-group__member x-messenger-group__member--action" :aria-label="t('extension.b9453718a11d')" :disabled="disabled" :aria-expanded="section === 'invite'" @click="open('invite')"><span class="x-messenger-group__circle"><XIcon name="add" :icon-size="22" /></span><span>{{ t("extension.3d96750f4657") }}</span></button>
        <button v-if="permissions.canManageMembers" type="button" class="x-messenger-group__member x-messenger-group__member--action" :aria-label="t('extension.51d2582a4d93')" :disabled="disabled" :aria-expanded="section === 'remove'" @click="open('remove')"><span class="x-messenger-group__circle"><XIcon name="subtract" :icon-size="22" /></span><span>{{ t("extension.0d01c5a3a219") }}</span></button>
      </div>
      <div v-if="section === 'members' || section === 'invite' || section === 'remove'" class="x-messenger-group__expanded">
        <header><strong>{{ section === 'members' ? t('extension.961787cd7e25') : section === 'invite' ? t('extension.6f2946b7c4d2') : t('extension.7fbcf76576cc') }}</strong><button type="button" :aria-label="t('extension.7ce61027d147')" @click="section = undefined"><XIcon name="arrow-up-s" :icon-size="16" /></button></header>
        <input v-model="keyword" class="x-messenger-group__search" :placeholder="t('extension.c94d6475e263')" :aria-label="t('extension.4aa82951227e')" />
        <div class="x-messenger-group__people">
          <label v-for="user in candidates" :key="user.id" class="x-messenger-group__person"><input v-if="section !== 'members'" type="checkbox" :checked="selection.includes(user.id)" :disabled="disabled || (section === 'remove' && user.id === group.ownerId)" @change="toggle(user.id, ($event.target as HTMLInputElement).checked)" /><XAvatar :name="user.name" :src="user.avatar" :avatar-size="28" :background-color="messageAvatarColor(user.id, user.name)" text-color="#ffffff" /><span>{{ user.name }}</span><small>{{ role(user.id) }}</small></label>
          <p v-if="!candidates.length" class="x-messenger-group__empty">{{ section === 'invite' ? t('extension.9a4556650c32') : t('extension.93b83bfee4a1') }}</p>
        </div>
        <button v-if="section !== 'members'" type="button" class="x-messenger-group__save" :disabled="disabled || !selection.length" @click="saveMembers">{{ section === 'invite' ? t('extension.73cf8eb3b944') : t('extension.f4b17e638e71') }}{{ selection.length ? '（' + selection.length + '）' : '' }}</button>
      </div>
    </section>
    <h4>{{ t("extension.416b54554c74") }}</h4>
    <section class="x-messenger-group__card x-messenger-group__card--rows">
      <button type="button" class="x-messenger-group__row" :aria-expanded="section === 'settings' || section === 'admins'" @click="open('settings')"><span>{{ t("extension.ff0306f01bac") }}</span><XIcon name="arrow-right-s" :icon-size="18" /></button>
      <div v-if="section === 'settings'" class="x-messenger-group__expanded">
        <p class="x-messenger-group__detail"><span>{{ t("extension.4fbe15e0f8b0") }}</span><strong>{{ owner }}</strong></p>
        <form v-if="permissions.canRename" @submit.prevent="saveName"><label>{{ t("extension.9f34667d1238") }}<input v-model="groupName" :aria-label="t('extension.9f34667d1238')" :disabled="disabled" /></label><button class="x-messenger-group__save" :disabled="disabled || !groupName.trim() || groupName.trim() === group.name">{{ t("extension.6d0d378e4c3a") }}</button></form>
        <p v-else class="x-messenger-group__detail"><span>{{ t("extension.9f34667d1238") }}</span><strong>{{ group.name }}</strong></p>
        <button v-if="permissions.canManageAdmins" type="button" class="x-messenger-group__row" :disabled="disabled" @click="open('admins')"><span>{{ t("extension.f8c7ea21e502") }}</span><small>{{ group.adminIds?.length ?? 0 }}{{ t("extension.4912771a4216") }}</small><XIcon name="arrow-right-s" :icon-size="16" /></button>
      </div>
      <form v-if="section === 'admins'" class="x-messenger-group__expanded" @submit.prevent="saveAdmins">
        <header><strong>{{ t("extension.f8c7ea21e502") }}</strong><button type="button" :aria-label="t('extension.b5250271b357')" @click="open('settings')"><XIcon name="arrow-left-s" :icon-size="16" /></button></header>
        <div class="x-messenger-group__people"><label v-for="member in members.filter(user => user.id !== group.ownerId)" :key="member.id" class="x-messenger-group__person"><input type="checkbox" :checked="selection.includes(member.id)" :disabled="disabled" @change="toggle(member.id, ($event.target as HTMLInputElement).checked)" /><XAvatar :name="member.name" :src="member.avatar" :avatar-size="28" :background-color="messageAvatarColor(member.id, member.name)" text-color="#ffffff" /><span>{{ member.name }}</span></label></div>
        <button class="x-messenger-group__save" :disabled="disabled">{{ t("extension.36eb74241115") }}</button>
      </form>
    </section>
    <h4>{{ t("extension.0de9f087e0c1") }}</h4>
    <section class="x-messenger-group__card x-messenger-group__card--rows">
      <button type="button" class="x-messenger-group__row" :aria-expanded="section === 'announcement'" @click="open('announcement')"><span :title="group.announcement">{{ group.announcement || t('extension.5c27ad20abd0') }}</span><XIcon name="arrow-right-s" :icon-size="18" /></button>
      <div v-if="section === 'announcement'" class="x-messenger-group__expanded">
        <form v-if="permissions.canEditAnnouncement" @submit.prevent="saveAnnouncement"><textarea v-model="announcement" :aria-label="t('extension.0de9f087e0c1')" :placeholder="t('extension.15cf667b42a9')" :disabled="disabled" rows="4" /><button class="x-messenger-group__save" :disabled="disabled || announcement === (group.announcement ?? '')">{{ t("extension.e1dd79bf6f75") }}</button></form>
        <p v-else class="x-messenger-group__announcement">{{ group.announcement || t('extension.5c27ad20abd0') }}</p>
      </div>
    </section>
    <section v-if="permissions.canLeave || permissions.canDissolve" class="x-messenger-group__card x-messenger-group__card--rows x-messenger-group__danger">
      <button v-if="permissions.canLeave" type="button" class="x-messenger-group__row" :disabled="disabled" @click="leave('leave')"><span>{{ armedAction === 'leave' ? t('extension.e9b88789cbab') : t('extension.b10fdd2d8f5b') }}</span><XIcon name="logout-box-r" :icon-size="16" /></button>
      <button v-if="permissions.canDissolve" type="button" class="x-messenger-group__row" :disabled="disabled" @click="leave('dissolve')"><span>{{ armedAction === 'dissolve' ? t('extension.c7b1465ae388') : t('extension.baf73bd195d0') }}</span><XIcon name="delete-bin" :icon-size="16" /></button>
    </section>
  </div>
</template>
<style scoped>
.x-messenger-group { display: grid; gap: 14px; min-width: 0; color: var(--x-color-text, #303846); }
.x-messenger-group button,.x-messenger-group input,.x-messenger-group textarea { font: inherit; }
.x-messenger-group button { cursor: pointer; }.x-messenger-group button:disabled { cursor: default; opacity: .5; }
.x-messenger-group__identity { display: flex; align-items: center; gap: 10px; padding: 14px; border-radius: 10px; background: var(--x-color-surface, white); }
.x-messenger-group__identity>div { display: grid; gap: 4px; min-width: 0; }.x-messenger-group__identity strong { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.x-messenger-group__identity small { width: fit-content; padding: 1px 4px; border-radius: 3px; color: var(--x-color-text-muted, #7a8493); background: var(--x-color-surface-soft, #f6f8fb); font-size: 11px; overflow-wrap: anywhere; }
.x-messenger-group__card { min-width: 0; padding: 12px; border-radius: 10px; background: var(--x-color-surface, white); }.x-messenger-group__card--rows { padding: 0; overflow: hidden; }
.x-messenger-group__card>header,.x-messenger-group__expanded>header { display: flex; align-items: center; justify-content: space-between; gap: 4px; font-size: 12px; }.x-messenger-group__card header strong { font-weight: 500; }
.x-messenger-group__text-button { display: inline-flex; align-items: center; gap: 2px; border: 0; padding: 0; background: transparent; color: var(--x-color-text-muted, #7a8493); font-size: 11px !important; white-space: nowrap; }
.x-messenger-group__members { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 14px 4px; margin-top: 18px; }
.x-messenger-group__member { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 0; min-width: 0; border: 0; background: transparent; color: var(--x-color-text-muted, #7a8493); }
.x-messenger-group__member>span:last-child { display: block; width: 100%; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; text-align: center; }
.x-messenger-group__circle { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; background: var(--x-color-surface-soft, #f6f8fb); color: var(--x-color-text-muted, #7a8493); }
.x-messenger-group__member--action:hover:not(:disabled) .x-messenger-group__circle { color: #4385ef; background: color-mix(in srgb, #4385ef 10%, transparent); }
.x-messenger-group h4 { margin: 2px 4px -8px; color: var(--x-color-text-muted, #7a8493); font-size: 12px; font-weight: 400; }
.x-messenger-group__row { display: flex; align-items: center; gap: 8px; width: 100%; min-height: 36px; border: 0; padding: 9px 12px; background: transparent; color: inherit; text-align: left; }
.x-messenger-group__row>span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.x-messenger-group__row small { color: var(--x-color-text-muted, #7a8493); font-size: 11px; }.x-messenger-group__row:deep(.x-icon) { color: var(--x-color-text-muted, #7a8493); flex-shrink: 0; }
.x-messenger-group__row:hover:not(:disabled) { background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger-group__expanded { display: grid; gap: 10px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--x-color-border, #dde2ea); }.x-messenger-group__card--rows>.x-messenger-group__expanded { margin: 0; padding: 12px; }
.x-messenger-group__expanded>header button { display: inline-flex; padding: 0; border: 0; background: transparent; color: var(--x-color-text-muted, #7a8493); }
.x-messenger-group__expanded form,.x-messenger-group__expanded label { display: grid; gap: 8px; }.x-messenger-group__expanded label { color: var(--x-color-text-muted, #7a8493); font-size: 12px; }
.x-messenger-group input:not([type=checkbox]),.x-messenger-group textarea { width: 100%; min-width: 0; box-sizing: border-box; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 6px; padding: 6px 8px; background: var(--x-color-surface, white); color: var(--x-color-text, #303846); }
.x-messenger-group input:not([type=checkbox]) { height: 32px; }.x-messenger-group textarea { resize: vertical; min-height: 84px; }
.x-messenger-group__people { display: grid; gap: 4px; max-height: 220px; overflow-y: auto; }
.x-messenger-group__expanded label.x-messenger-group__person { display: flex; align-items: center; gap: 6px; padding: 5px 0; color: var(--x-color-text, #303846); }
.x-messenger-group__person>span:not(.x-avatar) { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }.x-messenger-group__person small { color: #8061d5; font-size: 11px; }
.x-messenger-group__save { height: 32px; padding: 0 10px; border: 0; border-radius: 6px; background: var(--x-color-primary, #4385ef); color: white; font-size: 12px !important; }
.x-messenger-group__detail { display: flex; gap: 8px; margin: 0; font-size: 12px; }.x-messenger-group__detail>span { flex-shrink: 0; color: var(--x-color-text-muted, #7a8493); }.x-messenger-group__detail strong { font-weight: 400; overflow-wrap: anywhere; }
.x-messenger-group__announcement { margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.6; }
.x-messenger-group__empty { margin: 8px 0; text-align: center; font-size: 12px; color: var(--x-color-text-muted, #7a8493); }
.x-messenger-group__danger { margin-top: 4px; color: var(--x-color-danger, #e95353); }.x-messenger-group__danger>.x-messenger-group__row + .x-messenger-group__row { border-top: 1px solid var(--x-color-border, #dde2ea); }
.x-messenger-group button:focus-visible { outline: 2px solid #4385ef; outline-offset: 2px; }
</style>
