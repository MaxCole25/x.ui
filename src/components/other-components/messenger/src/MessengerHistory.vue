<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { XIcon } from '../../../basic-components/icon'
import { XAvatar } from '../../../display-components/avatar'
import { formatChatFileSize } from '../../../display-components/chat/src/useChatComposer'
import { isHistoryEmoji, isHistoryVideo } from './history'
import type { ChatMessage } from '../../../display-components/chat'
import type { MessengerContact, MessengerHistoryQuery, MessengerHistoryResult, MessengerHistoryMessageType, MessengerId } from './types'
const props = defineProps<{ query: MessengerHistoryQuery; result?: MessengerHistoryResult; contacts: MessengerContact[] }>()
const emit = defineEmits<{ query: [query: MessengerHistoryQuery]; locate: [id: MessengerId] }>()
const keyword = ref(props.query.keyword)
const startDate = ref(props.query.startDate)
const endDate = ref(props.query.endDate)
const messageType = ref<MessengerHistoryMessageType>(props.query.messageType ?? 'all')
const senderId = ref(props.query.senderId)
const showFilters = ref(false)
const tabs: { value: MessengerHistoryMessageType; text: string }[] = [
  { value: 'all', text: '全部' }, { value: 'media', text: '图片/视频' }, { value: 'emoji', text: '表情' }, { value: 'file', text: '文件' }, { value: 'link', text: '链接' }
]
const senders = computed(() => {
  const users = new Map(props.contacts.map(contact => [contact.id, { id: contact.id, name: contact.name }]))
  for (const message of props.result?.messages ?? []) if (message.senderId !== undefined && !users.has(message.senderId)) users.set(message.senderId, { id: message.senderId, name: message.senderName || String(message.senderId) })
  return [...users.values()]
})
const senderIndex = computed(() => senders.value.findIndex(user => user.id === senderId.value))
const filterCount = computed(() => Number(!!(startDate.value || endDate.value)) + Number(senderId.value !== undefined))
const invalidDates = computed(() => !!(startDate.value && endDate.value && startDate.value > endDate.value))
const sections = computed(() => {
  const groups = new Map<string, ChatMessage[]>()
  for (const message of props.result?.messages ?? []) {
    const date = (message.sentAt || message.time || '').match(/^\d{4}-\d{2}-\d{2}/)?.[0] ?? '日期未知'
    if (!groups.has(date)) groups.set(date, [])
    groups.get(date)!.push(message)
  }
  return [...groups].map(([date, messages]) => ({ date: date.replace(/-/g, '/'), messages }))
})
let searchTimer: ReturnType<typeof setTimeout> | undefined
function search(page = 1) {
  clearTimeout(searchTimer)
  if (invalidDates.value) return
  emit('query', { ...props.query, keyword: keyword.value.trim(), startDate: startDate.value, endDate: endDate.value, messageType: messageType.value, senderId: senderId.value, page })
}
function scheduleSearch() { clearTimeout(searchTimer); searchTimer = setTimeout(() => search(), 300) }
function selectType(value: MessengerHistoryMessageType) { messageType.value = value; search() }
function selectSender(event: Event) { senderId.value = senders.value[Number((event.target as HTMLSelectElement).value)]?.id; search() }
function resetFilters() { startDate.value = ''; endDate.value = ''; senderId.value = undefined; search() }
function timeText(message: ChatMessage) { return message.time?.match(/\d{1,2}:\d{2}(?::\d{2})?/)?.[0] || message.sentAt?.match(/T(\d{2}:\d{2})/)?.[1] || message.time || '' }
watch([() => props.query.keyword, () => props.query.startDate, () => props.query.endDate, () => props.query.messageType, () => props.query.senderId], ([text, start, end, kind, sender]) => { keyword.value = text; startDate.value = start; endDate.value = end; messageType.value = kind ?? 'all'; senderId.value = sender })
onBeforeUnmount(() => clearTimeout(searchTimer))
</script>
<template>
  <section class="x-messenger-history" aria-label="历史消息">
    <form class="x-messenger-history__search" @submit.prevent="search()">
      <XIcon name="search" :icon-size="16" />
      <input v-model="keyword" type="search" placeholder="搜索" aria-label="历史关键词" @input="scheduleSearch" />
    </form>
    <div class="x-messenger-history__toolbar">
      <div class="x-messenger-history__tabs" role="tablist" aria-label="历史消息类型">
        <button v-for="tab in tabs" :key="tab.value" type="button" role="tab" :aria-selected="messageType === tab.value" :class="{ 'is-active': messageType === tab.value }" @click="selectType(tab.value)">{{ tab.text }}</button>
      </div>
      <button type="button" class="x-messenger-history__filter-button" :class="{ 'is-active': showFilters || filterCount }" :aria-expanded="showFilters" aria-label="历史筛选" @click="showFilters = !showFilters"><span>筛选{{ filterCount ? ' ' + filterCount : '' }}</span><XIcon name="filter-3" :icon-size="15" /></button>
    </div>
    <div class="x-messenger-history__body" :class="{ 'has-filters': showFilters }">
      <div class="x-messenger-history__records" aria-live="polite">
        <p v-if="result?.loading" class="x-messenger-history__empty">正在查询…</p>
        <template v-else>
          <section v-for="section in sections" :key="section.date" class="x-messenger-history__day">
            <header>{{ section.date }}</header>
            <button v-for="message in section.messages" :key="message.id" type="button" class="x-messenger-history__record" :aria-label="'定位消息 ' + (message.fileName || message.content)" @click="emit('locate', message.id)">
              <XAvatar :name="message.senderName || '系统'" :src="message.avatar || contacts.find(user => user.id === message.senderId)?.avatar" :avatar-size="30" avatar-background-color="linear-gradient(135deg, #63b6dd, #5b83cf)" />
              <span class="x-messenger-history__message">
                <span class="x-messenger-history__meta"><span>{{ message.senderName || '系统' }}</span><time>{{ timeText(message) }}</time></span>
                <img v-if="message.kind === 'image' && message.imageUrl" class="x-messenger-history__image" :src="message.imageUrl" :alt="message.content || '历史图片'" loading="lazy" />
                <span v-else-if="message.kind === 'file'" class="x-messenger-history__card"><XIcon :name="isHistoryVideo(message) ? 'video' : 'file-2'" :icon-size="28" /><span><strong>{{ message.fileName || message.content }}</strong><small>{{ isHistoryVideo(message) ? '视频' : '文件' }}{{ message.fileSize !== undefined ? ' · ' + formatChatFileSize(message.fileSize) : '' }}</small></span></span>
                <span v-else-if="message.business" class="x-messenger-history__card x-messenger-history__card--business"><XIcon name="briefcase-2" :icon-size="24" /><span><small>{{ message.business.businessType }} · {{ message.business.businessNumber }}</small><strong>{{ message.business.title }}</strong><small v-if="message.business.summary">{{ message.business.summary }}</small></span></span>
                <span v-else class="x-messenger-history__text" :class="{ 'is-emoji': isHistoryEmoji(message), 'is-link': /https?:\/\//i.test(message.content) }">{{ message.content }}</span>
              </span>
            </button>
          </section>
          <p v-if="!sections.length" class="x-messenger-history__empty">{{ result ? '没有匹配记录' : '正在查询…' }}</p>
        </template>
      </div>
      <aside v-if="showFilters" class="x-messenger-history__filters" aria-label="筛选条件">
        <header><strong>筛选条件</strong><button type="button" aria-label="关闭历史筛选" @click="showFilters = false"><XIcon name="close" :icon-size="16" /></button></header>
        <form @submit.prevent="search()">
          <label>发送日期<input v-model="startDate" type="date" aria-label="历史开始日期" @change="search()" /><input v-model="endDate" type="date" :min="startDate" aria-label="历史结束日期" @change="search()" /></label>
          <p v-if="invalidDates" class="x-messenger-history__error">结束日期不能早于开始日期</p>
          <label>发送人<select :value="senderIndex" aria-label="历史发送人" @change="selectSender"><option :value="-1">全部发送人</option><option v-for="(user, index) in senders" :key="user.id" :value="index">{{ user.name }}</option></select></label>
          <button type="button" class="x-messenger-history__reset" @click="resetFilters">重置筛选</button>
        </form>
      </aside>
    </div>
    <nav v-if="result && result.total > 0" class="x-messenger-history__pagination" aria-label="历史记录分页">
      <button type="button" :disabled="query.page === 1 || result.loading" aria-label="上一页历史" @click="search(query.page - 1)"><XIcon name="arrow-left-s" :icon-size="18" /></button>
      <span>{{ query.page }} / {{ Math.ceil(result.total / query.pageSize) }} · {{ result.total }} 条</span>
      <button type="button" :disabled="query.page * query.pageSize >= result.total || result.loading" aria-label="下一页历史" @click="search(query.page + 1)"><XIcon name="arrow-right-s" :icon-size="18" /></button>
    </nav>
  </section>
</template>
<style scoped>
.x-messenger-history { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; container-type: inline-size; color: var(--x-color-text, #303846); background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger-history button,.x-messenger-history input,.x-messenger-history select { font: inherit; }
.x-messenger-history button { cursor: pointer; }
.x-messenger-history__search { display: flex; align-items: center; gap: 6px; margin: 8px 12px; padding: 0 8px; height: 32px; flex-shrink: 0; border-radius: 8px; background: color-mix(in srgb, var(--x-color-text, #303846) 5%, var(--x-color-surface, white)); color: var(--x-color-text-muted, #8490a3); }
.x-messenger-history__search input { width: 100%; min-width: 0; height: 100%; border: 0; outline: none; background: transparent; color: var(--x-color-text, #303846); }
.x-messenger-history__toolbar { display: flex; align-items: center; gap: 6px; padding: 0 10px; border-bottom: 1px solid var(--x-color-border, #dde2ea); flex-shrink: 0; }
.x-messenger-history__tabs { display: flex; flex: 1; gap: 4px; min-width: 0; overflow-x: auto; scrollbar-width: thin; }
.x-messenger-history__tabs button { position: relative; flex-shrink: 0; border: 0; padding: 10px 5px; background: transparent; color: inherit; font-size: 12px; white-space: nowrap; }
.x-messenger-history__tabs button.is-active { color: #4385ef; }
.x-messenger-history__tabs button.is-active::after { content: ''; position: absolute; bottom: 0; left: 4px; right: 4px; height: 2px; background: #4385ef; border-radius: 2px; }
.x-messenger-history__filter-button { display: flex; flex-shrink: 0; align-items: center; gap: 3px; border: 0; border-radius: 6px; padding: 4px 5px; color: inherit; background: color-mix(in srgb, var(--x-color-text) 6%, transparent); font-size: 12px !important; }
.x-messenger-history__filter-button.is-active { color: #4385ef; background: color-mix(in srgb, #4385ef 10%, transparent); }
.x-messenger-history__body { position: relative; display: flex; flex: 1; min-height: 0; min-width: 0; overflow: hidden; }
.x-messenger-history__records { flex: 1; min-width: 0; overflow-y: auto; }
.x-messenger-history__day>header { position: sticky; top: 0; padding: 10px 12px; font-size: 12px; color: var(--x-color-text, #303846); border-bottom: 1px solid var(--x-color-border, #dde2ea); background: var(--x-color-surface-soft, #f6f8fb); z-index: 1; }
.x-messenger-history__record { display: flex; gap: 8px; width: 100%; box-sizing: border-box; border: 0; padding: 12px; text-align: left; background: transparent; color: inherit; }
.x-messenger-history__record:hover { background: color-mix(in srgb, #4385ef 4%, transparent); }
.x-messenger-history__message { display: grid; gap: 6px; flex: 1; min-width: 0; }
.x-messenger-history__meta { display: flex; flex-wrap: wrap; gap: 5px; font-size: 12px; color: var(--x-color-text-muted, #8490a3); }
.x-messenger-history__text { white-space: pre-wrap; overflow-wrap: anywhere; line-height: 1.6; }
.x-messenger-history__text.is-emoji { font-size: 28px; }.x-messenger-history__text.is-link { color: #4385ef; }
.x-messenger-history__image { display: block; max-width: 100%; max-height: 220px; width: auto; height: auto; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 6px; object-fit: contain; }
.x-messenger-history__card { display: flex; align-items: center; gap: 8px; padding: 10px; min-width: 0; background: var(--x-color-surface, white); border: 1px solid var(--x-color-border, #dde2ea); border-radius: 6px; color: #4385ef; }
.x-messenger-history__card>span { display: grid; gap: 4px; min-width: 0; overflow-wrap: anywhere; }.x-messenger-history__card strong { color: var(--x-color-text, #303846); font-weight: 500; }.x-messenger-history__card small { color: var(--x-color-text-muted, #8490a3); font-size: 11px; }.x-messenger-history__card--business { color: var(--x-color-success, #1aa58b); }
.x-messenger-history__empty { margin: 24px 12px; text-align: center; color: var(--x-color-text-muted, #8490a3); font-size: 12px; }
.x-messenger-history__filters { flex: 0 0 180px; box-sizing: border-box; padding: 12px; border-left: 1px solid var(--x-color-border, #dde2ea); overflow-y: auto; background: var(--x-color-surface-soft, #f6f8fb); }
.x-messenger-history__filters>header { display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-bottom: 22px; font-size: 12px; }.x-messenger-history__filters>header strong { font-weight: 500; }
.x-messenger-history__filters>header button { display: inline-flex; border: 0; padding: 2px; background: transparent; color: inherit; }
.x-messenger-history__filters form,.x-messenger-history__filters label { display: grid; gap: 8px; }.x-messenger-history__filters form { gap: 22px; }.x-messenger-history__filters label { color: var(--x-color-text-muted, #8490a3); font-size: 12px; }
.x-messenger-history__filters input,.x-messenger-history__filters select { width: 100%; min-width: 0; box-sizing: border-box; height: 32px; padding: 0 6px; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 6px; color: var(--x-color-text, #303846); background: var(--x-color-surface, white); font-size: 12px; }
.x-messenger-history__reset { height: 30px; border: 1px solid var(--x-color-border, #dde2ea); border-radius: 6px; background: var(--x-color-surface, white); color: var(--x-color-text-muted, #8490a3); font-size: 12px !important; }
.x-messenger-history__error { margin: -14px 0 0; color: var(--x-color-danger, #e95353); font-size: 12px; }
.x-messenger-history__pagination { display: flex; justify-content: center; align-items: center; gap: 8px; padding: 8px; border-top: 1px solid var(--x-color-border, #dde2ea); font-size: 12px; }
.x-messenger-history__pagination button { display: inline-flex; justify-content: center; align-items: center; border: 0; padding: 2px; background: transparent; color: inherit; }.x-messenger-history__pagination button:disabled { opacity: .4; cursor: default; }
.x-messenger-history button:focus-visible { outline: 2px solid #4385ef; outline-offset: -2px; }
@container (max-width: 420px) { .x-messenger-history__filters { position: absolute; top: 0; right: 0; bottom: 0; width: min(200px, 100%); box-shadow: -6px 0 20px rgb(15 23 42 / .08); z-index: 2; } }
</style>