<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { XDialog } from '../../../feedback-components/dialog'
import { XIcon } from '../../../basic-components/icon'
import MessengerContactList from './MessengerContactList.vue'
import MessengerComposer from './MessengerComposer.vue'
import MessengerHistory from './MessengerHistory.vue'
import MessengerGroupManager from './MessengerGroupManager.vue'
import { XChat, type ChatBusinessReference, type ChatExpose, type ChatSendPayload, type ChatScrollPayload } from '../../../display-components/chat'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { overlayZIndex } from '../../../_utils/zIndex'
import type { MessengerEmits, MessengerExpose, MessengerProps, MessengerId, MessengerOpenPayload, MessengerHistoryQuery, MessengerHistoryMessageType } from './types'
defineOptions({ name: 'XMessenger', inheritAttrs: false })
const props = withDefaults(defineProps<MessengerProps>(), {
  modelValue: false, contacts: () => [], contactGroups: () => [], groups: () => [], conversations: () => [], messagePages: () => [],
  title: '内部消息', width: 800, height: 640, showContactList: true, contactListPlacement: 'right', contactListWidth: 280, contactListHeight: 520, fontSize: 14, disabled: false, allowCreateGroup: false,
  currentUserRole: 'user', enableContactGroupManagement: true, showBusinessPicker: true, teleported: true, teleportTo: 'body', zIndex: overlayZIndex.dialog
})
const emit = defineEmits<MessengerEmits>()
const internalActiveId = ref<MessengerId>()
const activeId = computed(() => props.activeConversationId ?? internalActiveId.value)
const activeConversation = computed(() => props.conversations.find(item => item.id === activeId.value))
const activeGroup = computed(() => activeConversation.value?.kind === 'group' ? props.groups.find(group => group.id === activeConversation.value?.targetId) : undefined)
const selectedContact = ref<MessengerId>()
const selectedKind = ref<'direct' | 'group'>('direct')
const activeSurface = ref<'contacts' | 'chat'>('contacts')
const contactLayer = computed(() => props.zIndex + (activeSurface.value === 'contacts' ? 1 : 0))
const chatLayer = computed(() => props.zIndex + (activeSurface.value === 'chat' ? 1 : 0))
function activateSurface(surface: 'contacts' | 'chat') { activeSurface.value = surface }

const panel = ref<'history' | 'group' | 'create'>()
const surface = ref<HTMLElement>()
const panelWidth = ref(280)
const sendShortcut = ref<'enter' | 'ctrl-enter'>('enter')
const composers = new Map<MessengerId, { focus: () => void }>()
function bindComposer(id: MessengerId, instance: unknown) { if (instance) composers.set(id, instance as { focus: () => void }); else composers.delete(id) }
function toggleHistory() { panel.value = panel.value === 'history' ? undefined : 'history'; if (panel.value === 'history') { setPanelWidth(Math.max(panelWidth.value, 360)); queryHistory() } }
function setPanelWidth(value: number) {
  const width = surface.value?.clientWidth ?? 800
  const minimum = Math.min(220, width * .4)
  const maximum = Math.max(minimum, width - Math.min(320, width * .5) - 6)
  panelWidth.value = Math.round(Math.max(minimum, Math.min(maximum, value)))
}
function startPanelResize(event: PointerEvent) {
  if (event.button !== 0) return
  const handle = event.currentTarget as HTMLElement
  const startX = event.clientX
  const startWidth = panelWidth.value
  handle.setPointerCapture(event.pointerId)
  const move = (current: PointerEvent) => setPanelWidth(startWidth + startX - current.clientX)
  const stop = () => { handle.removeEventListener('pointermove', move); handle.removeEventListener('lostpointercapture', stop) }
  handle.addEventListener('pointermove', move)
  handle.addEventListener('lostpointercapture', stop)
}
let surfaceObserver: ResizeObserver | undefined
watch(surface, element => {
  surfaceObserver?.disconnect()
  if (element) { surfaceObserver = new ResizeObserver(() => setPanelWidth(panelWidth.value)); surfaceObserver.observe(element) }
}, { flush: 'post' })
onBeforeUnmount(() => surfaceObserver?.disconnect())
const visited = ref(new Set<MessengerId>())
const cachedConversations = computed(() => props.conversations.filter(item => visited.value.has(item.id)))
const chats = new Map<MessengerId, ChatExpose>()
const businessDrafts = reactive(new Map<MessengerId, ChatBusinessReference[]>())
const topConversations = reactive(new Set<MessengerId>())
const historyRequests = reactive(new Map<MessengerId, { beforeMessageId?: MessengerId; loadingSeen: boolean }>())
const pendingLocation = ref<{ conversationId: MessengerId; messageId: MessengerId }>()
const keyword = ref('')
const startDate = ref('')
const endDate = ref('')
const historyMessageType = ref<MessengerHistoryMessageType>('all')
const historySenderId = ref<MessengerId>()
const historyPage = ref(1)
const historyPageSize = 20
const groupName = ref('')
const memberIds = ref<MessengerId[]>([])
const matchingHistory = computed(() => {
  const result = props.historyResult
  return result && result.conversationId === activeId.value && result.keyword === keyword.value.trim() && result.startDate === startDate.value && result.endDate === endDate.value && result.page === historyPage.value && (result.messageType ?? 'all') === historyMessageType.value && result.senderId === historySenderId.value ? result : undefined
})
function messagePage(id: MessengerId) { return props.messagePages.find(page => page.conversationId === id) }
function selectConversation(id: MessengerId) {
  if (props.disabled || !props.conversations.some(item => item.id === id)) return
  activateSurface('chat')
  internalActiveId.value = id
  emit('update:activeConversationId', id)
}
function openConversation(payload: MessengerOpenPayload) {
  if (props.disabled) return
  const existing = props.conversations.find(item => item.kind === payload.kind && item.targetId === payload.targetId)
  activateSurface('chat')
  emit('update:modelValue', true)
  if (existing) selectConversation(existing.id)
  else emit('open-conversation', payload)
}
function bindChat(id: MessengerId, instance: unknown) { if (instance) chats.set(id, instance as ChatExpose); else chats.delete(id) }
function addBusinessReference(conversationId: MessengerId, reference: ChatBusinessReference) {
  if (props.disabled || !props.conversations.some(item => item.id === conversationId)) return
  businessDrafts.set(conversationId, [...(businessDrafts.get(conversationId) ?? []), reference])
}
function removeBusinessReference(id: MessengerId, index: number) { businessDrafts.set(id, (businessDrafts.get(id) ?? []).filter((_item, current) => current !== index)) }
function send(id: MessengerId, payload: ChatSendPayload) {
  emit('send', { conversationId: id, ...payload, businessReferences: [...(businessDrafts.get(id) ?? [])] })
  businessDrafts.delete(id)
}
function sendBusiness(id: MessengerId) {
  if (props.disabled || !businessDrafts.get(id)?.length) return
  send(id, { content: '', attachments: [] })
}
function read(id: MessengerId) {
  if (!props.modelValue || activeId.value !== id) return
  const messages = messagePage(id)?.messages ?? []
  const lastMessageId = messages[messages.length - 1]?.id
  if (lastMessageId !== undefined) emit('read-request', { conversationId: id, lastMessageId })
}
function onChatScroll(id: MessengerId, detail: ChatScrollPayload) {
  if (detail.scrollTop <= 1) topConversations.add(id)
  else topConversations.delete(id)
  if (detail.isAtBottom) read(id)
}
function loadHistory(id: MessengerId, event: WheelEvent) {
  const target = event.target as HTMLElement
  const viewport = target.closest<HTMLElement>('.x-chat__viewport')
  if (!viewport || event.deltaY >= 0 || event.ctrlKey || activeId.value !== id || viewport.scrollTop > 1) return
  topConversations.add(id)
  const page = messagePage(id)
  if (!page?.hasMore || page.loading || historyRequests.has(id)) return
  event.preventDefault()
  const beforeMessageId = page.messages[0]?.id
  historyRequests.set(id, { beforeMessageId, loadingSeen: false })
  emit('load-history', { conversationId: id, beforeMessageId })
}
watch(() => props.messagePages, () => {
  for (const [id, request] of historyRequests) {
    const page = messagePage(id)
    if (!page || !page.hasMore || page.messages[0]?.id !== request.beforeMessageId || (request.loadingSeen && !page.loading)) historyRequests.delete(id)
    else if (page.loading) request.loadingSeen = true
  }
}, { deep: true })
function queryHistory(page = 1) {
  if (activeId.value === undefined || (startDate.value && endDate.value && startDate.value > endDate.value)) return
  historyPage.value = page
  emit('history-query', { conversationId: activeId.value, keyword: keyword.value.trim(), startDate: startDate.value, endDate: endDate.value, page, pageSize: historyPageSize, messageType: historyMessageType.value, senderId: historySenderId.value })
}
function applyHistoryQuery(query: MessengerHistoryQuery) {
  keyword.value = query.keyword; startDate.value = query.startDate; endDate.value = query.endDate; historyMessageType.value = query.messageType ?? 'all'; historySenderId.value = query.senderId
  queryHistory(query.page)
}
async function locateMessage(conversationId: MessengerId, messageId: MessengerId) {
  selectConversation(conversationId)
  panel.value = undefined
  await nextTick()
  pendingLocation.value = { conversationId, messageId }
  if (await chats.get(conversationId)?.scrollToMessage(messageId)) pendingLocation.value = undefined
  else emit('locate-message', { conversationId, messageId })
}
function editGroup() { if (activeGroup.value) panel.value = 'group' }
function startCreate() { activateSurface('chat'); emit('update:modelValue', true); groupName.value = ''; memberIds.value = props.currentUserId === undefined ? [] : [props.currentUserId]; panel.value = 'create' }
function toggleMember(id: MessengerId, checked: boolean) { memberIds.value = checked ? [...memberIds.value, id] : memberIds.value.filter(item => item !== id) }
function createGroup() {
  if (props.disabled || !props.allowCreateGroup || !groupName.value.trim() || memberIds.value.length < 2) return
  emit('group-action', { action: 'create', name: groupName.value.trim(), memberIds: [...memberIds.value] })
  panel.value = undefined
}
watch(activeId, async id => {
  panel.value = undefined
  pendingLocation.value = undefined
  keyword.value = ''; startDate.value = ''; endDate.value = ''; historyPage.value = 1; historyMessageType.value = 'all'; historySenderId.value = undefined
  if (id === undefined) return
  visited.value = new Set([...visited.value, id])
  await nextTick()
  if (props.modelValue) { composers.get(id)?.focus(); read(id) }
}, { immediate: true })
watch(() => props.modelValue, async visible => {
  if (!visible) { chats.clear(); composers.clear(); visited.value = new Set(); businessDrafts.clear(); topConversations.clear(); historyRequests.clear(); return }
  if (activeId.value !== undefined) visited.value = new Set([...visited.value, activeId.value])
  await nextTick()
  if (activeId.value !== undefined) { composers.get(activeId.value)?.focus(); read(activeId.value) }
})
watch(() => props.messagePages, async () => {
  const target = pendingLocation.value
  if (target && activeId.value === target.conversationId && await chats.get(target.conversationId)?.scrollToMessage(target.messageId)) pendingLocation.value = undefined
}, { deep: true, flush: 'post' })
watch(() => props.conversations, () => {
  const validIds = new Set(props.conversations.map(item => item.id))
  visited.value = new Set([...visited.value].filter(id => validIds.has(id)))
  for (const id of businessDrafts.keys()) if (!validIds.has(id)) businessDrafts.delete(id)
}, { deep: true })
defineExpose<MessengerExpose>({ openConversation, selectConversation, addBusinessReference, locateMessage })
</script>
<template>
  <MessengerContactList v-if="showContactList" v-model="selectedContact" v-model:active-kind="selectedKind" :contact-list-placement="contactListPlacement" :contact-list-width="contactListWidth" :contact-list-height="contactListHeight" :contacts="contacts" :contact-groups="contactGroups" :groups="groups" :font-size="fontSize" :enable-contact-group-management="enableContactGroupManagement" :conversations="conversations" :message-pages="messagePages" :current-user-role="currentUserRole" :allow-create-group="allowCreateGroup" :disabled="disabled" :teleported="teleported" :teleport-to="teleportTo" :z-index="contactLayer" :radius="radius" :border-color="borderColor" :border-width="borderWidth" :background-color="backgroundColor" :text-color="textColor"
    @create-group="startCreate" @update:contact-list-height="emit('update:contactListHeight', $event)" @activate="activateSurface('contacts')" @open="openConversation" @contact-group-action="emit('contact-group-action', $event)">
  </MessengerContactList>
  <XDialog :model-value="modelValue" :title="activeConversation?.title ?? title" :width="width" :height="height" :min-width="560" :min-height="440" :font-size="fontSize" :teleported="teleported" :teleport-to="teleportTo" :z-index="chatLayer" :enable-modal="false" :radius="radius" :border-width="borderWidth" :border-color="borderColor" :background-color="backgroundColor" :text-color="textColor" :close-on-mask-click="false" show-fullscreen class="x-messenger-dialog" header-background-color="color-mix(in srgb, var(--x-color-primary, #4385ef) 5%, var(--x-color-surface, white))" close-icon-color="var(--x-color-text-muted, #7a8493)" @pointerdown.capture="activateSurface('chat')" @focusin="activateSurface('chat')" @update:model-value="emit('update:modelValue', $event)" @close="emit('close')">
    <div ref="surface" class="x-messenger" :style="{ ...createElementStyleVars(props), fontSize: fontSize + 'px' }">
      <main class="x-messenger__main">
        <p v-if="activeGroup?.announcement" class="x-messenger__announcement">{{ activeGroup.announcement }}</p>
        <div v-for="conversation in cachedConversations" v-show="activeId === conversation.id" :key="conversation.id" class="x-messenger__session">
          <span v-if="topConversations.has(conversation.id) && messagePage(conversation.id)?.hasMore" class="x-messenger__history-hint" role="status">{{ messagePage(conversation.id)?.loading || historyRequests.has(conversation.id) ? '正在加载更早消息…' : '继续向上滚动加载更早消息' }}</span>
          <div v-if="businessDrafts.get(conversation.id)?.length" class="x-messenger__business-drafts"><div v-for="(reference, index) in businessDrafts.get(conversation.id)" :key="index"><span>{{ reference.businessNumber }} · {{ reference.title }}</span><button type="button" :disabled="disabled" aria-label="移除待发送单据" @click="removeBusinessReference(conversation.id, index)">×</button></div><button type="button" :disabled="disabled" @click="sendBusiness(conversation.id)">发送单据</button></div>
          <XChat :ref="instance => bindChat(conversation.id, instance)" :messages="messagePage(conversation.id)?.messages ?? []" :current-user-id="currentUserId" :font-size="fontSize" height="100%" :disabled="disabled"
            @send="send(conversation.id, $event)" @scroll="onChatScroll(conversation.id, $event)" @wheel.capture="loadHistory(conversation.id, $event)"
            @business-click="emit('business-click', { conversationId: conversation.id, message: $event.message })"
            @image-click="emit('image-click', { conversationId: conversation.id, detail: $event })"
            @file-click="emit('file-click', { conversationId: conversation.id, detail: $event })"
            @retry="emit('retry', { conversationId: conversation.id, message: $event })"
            @attachment-add="emit('attachment-add', { conversationId: conversation.id, detail: $event })"
            @attachment-remove="emit('attachment-remove', { conversationId: conversation.id, attachment: $event })" >
            <template #footer>
              <MessengerComposer :ref="instance => bindComposer(conversation.id, instance)" v-model:send-shortcut="sendShortcut" :disabled="disabled" :show-business-picker="showBusinessPicker" :show-group-management="conversation.kind === 'group'" :history-visible="panel === 'history'" :z-index="Math.max(overlayZIndex.popper, chatLayer + 1)"
                @send="send(conversation.id, $event)" @history-request="toggleHistory" @group-manage="panel === 'group' ? panel = undefined : editGroup()" @business-select="emit('business-select', { conversationId: conversation.id })"
                @attachment-add="emit('attachment-add', { conversationId: conversation.id, detail: $event })" @attachment-remove="emit('attachment-remove', { conversationId: conversation.id, attachment: $event })" />
            </template>
          </XChat>
        </div>
        <div v-if="!activeConversation" class="x-messenger__empty">双击联系人或群聊开始沟通</div>
      </main>
      <div v-if="panel" class="x-messenger__divider" role="separator" aria-label="调整聊天区和侧栏宽度" aria-orientation="vertical" :aria-valuenow="panelWidth" tabindex="0" @pointerdown.prevent="startPanelResize" @keydown.left.prevent="setPanelWidth(panelWidth + 20)" @keydown.right.prevent="setPanelWidth(panelWidth - 20)" />
      <aside v-if="panel" class="x-messenger__panel" :class="{ 'is-history': panel === 'history' }" :style="{ width: panelWidth + 'px', flexBasis: panelWidth + 'px' }">
        <header><strong>{{ panel === 'history' ? '历史记录' : panel === 'create' ? '创建群聊' : '群管理' }}</strong><button type="button" aria-label="关闭面板" @click="panel = undefined"><XIcon name="close" :icon-size="18" /></button></header>
        <MessengerHistory v-if="panel === 'history' && activeId !== undefined" :query="{ conversationId: activeId, keyword, startDate, endDate, page: historyPage, pageSize: historyPageSize, messageType: historyMessageType, senderId: historySenderId }" :result="matchingHistory" :contacts="contacts" @query="applyHistoryQuery" @locate="locateMessage(activeId, $event)" />
        <form v-else-if="panel === 'create'" @submit.prevent="createGroup"><label>群名称<input v-model="groupName" aria-label="新群名称" :disabled="disabled" /></label><fieldset><legend>选择同事</legend><label v-for="contact in contacts" :key="contact.id" class="x-messenger__check"><input type="checkbox" :checked="memberIds.includes(contact.id)" :disabled="disabled || contact.id === currentUserId" @change="toggleMember(contact.id, ($event.target as HTMLInputElement).checked)" />{{ contact.name }}</label></fieldset><button :disabled="disabled || !groupName.trim() || memberIds.length < 2">创建群聊</button></form>
        <MessengerGroupManager v-else-if="activeGroup" :group="activeGroup" :contacts="contacts" :disabled="disabled" @action="emit('group-action', $event)" @close="panel = undefined" />
      </aside>
    </div>
  </XDialog>
</template>
<style scoped>
.x-messenger { display: flex; width: 100%; height: 100%; min-height: 0; color: var(--x-element-text, var(--x-color-text, #303846)); background: var(--x-element-bg, var(--x-color-surface, white)); }
.x-messenger button,.x-messenger input,.x-messenger textarea { font: inherit; }.x-messenger button { cursor: pointer; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 4px; padding: 5px 8px; background: var(--x-color-surface, white); color: inherit; }.x-messenger button:disabled { cursor: default; opacity: .55; }
.x-messenger__main { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; overflow: hidden; }.x-messenger__announcement { margin: 0; padding: 8px 12px; background: var(--x-color-surface-soft, #f6f8fb); font-size: 12px; max-height: 56px; overflow: auto; overflow-wrap: anywhere; }.x-messenger__session { position: relative; flex: 1; display: flex; flex-direction: column; min-height: 0; }.x-messenger__session :deep(.x-chat) { flex: 1; min-height: 0; height: 0 !important; border: 0; border-radius: 0; }
.x-messenger__panel { width: 280px; flex: 0 0 280px; padding: 12px; box-sizing: border-box; border-left: 1px solid var(--x-color-border, #dde2ea); overflow: auto; }.x-messenger__panel>header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }.x-messenger__panel form { display: grid; gap: 8px; margin-bottom: 14px; }.x-messenger__panel label { display: grid; gap: 5px; }.x-messenger__panel input:not([type=checkbox]),.x-messenger__panel textarea { width: 100%; min-width: 0; box-sizing: border-box; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 4px; padding: 6px; min-height: 32px; }.x-messenger__panel fieldset { border: 1px solid var(--x-color-border, #dde2ea); margin: 0 0 10px; min-width: 0; }.x-messenger__panel .x-messenger__check { display: flex; align-items: center; gap: 6px; margin: 5px 0; }
.x-messenger__danger { color: var(--x-color-danger, #e95353) !important; margin-top: 8px; }.x-messenger__empty { margin: auto; color: var(--x-color-text-muted, #7a8493); padding: 16px; text-align: center; }
.x-messenger button { border-radius: 7px; transition: background .16s, box-shadow .16s; }
.x-messenger button:hover:not(:disabled) { background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger button:focus-visible { outline: 2px solid var(--x-color-primary, #4385ef); outline-offset: 2px; }
.x-messenger__panel.is-history { display: flex; flex-direction: column; padding: 0; overflow: hidden; }
.x-messenger__panel.is-history>header { padding: 10px 12px; margin: 0; flex-shrink: 0; }
.x-messenger__panel { background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger__panel>header { gap: 8px; padding-bottom: 10px; border-bottom: 1px solid var(--x-color-border, #dde2ea); }
.x-messenger__panel>header button { display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; padding: 0; color: var(--x-color-text-muted, #7a8493); border: 0; }
.x-messenger__panel input:not([type=checkbox]), .x-messenger__panel textarea { border-radius: 7px; background: var(--x-color-surface, white); }
.x-messenger__panel form>button { min-height: 32px; color: white; border-color: transparent; background: var(--x-color-primary, #4385ef); }
.x-messenger__panel form>button:hover:not(:disabled) { background: color-mix(in srgb, var(--x-color-primary, #4385ef) 85%, black); }
.x-messenger :deep(.x-chat__tool[title="表情"]) { color: var(--x-color-warning, #d99a36); }
.x-messenger :deep(.x-chat__tool[title="图片"]) { color: var(--x-color-success, #1aa58b); }
.x-messenger :deep(.x-chat__tool[title="文件"]) { color: #4385ef; }
.x-messenger__business-drafts { display: flex; flex-wrap: wrap; gap: 6px; padding: 8px; background: var(--x-color-primary-soft, #eaf3ff); }
.x-messenger__business-drafts>div { display: flex; align-items: center; gap: 4px; min-width: 0; }
.x-messenger__business-drafts span { overflow-wrap: anywhere; }
.x-messenger__history-hint { position: absolute; top: 4px; left: 50%; transform: translateX(-50%); max-width: calc(100% - 24px); padding: 3px 8px; border-radius: 4px; color: var(--x-color-text-muted, #9aa4b3); background: var(--x-color-surface-soft, #f6f8fb); font-size: 12px; line-height: 18px; text-align: center; pointer-events: none; z-index: 1; }
.x-messenger__divider { flex: 0 0 6px; cursor: col-resize; touch-action: none; background: var(--x-color-border, #dde2ea); transition: background .16s; }
.x-messenger__divider:hover,.x-messenger__divider:focus-visible { background: var(--x-color-primary, #4385ef); outline: none; }
.x-messenger__session :deep(.x-chat__footer) { padding: 8px 14px; }
</style>
<style>
.x-messenger-dialog { --x-dialog-body-padding: 0; }
</style>
