import type { ChatMessage, ChatBusinessReference } from '../../display-components/chat'
import type { MessengerProps, MessengerExpose, MessengerSendPayload, MessengerOpenPayload, MessengerId, MessengerHistoryQuery, MessengerGroupAction, MessengerContactGroupAction } from './src/types'
import { matchesHistoryMessage } from './src/history'
export interface MessengerDemoState extends MessengerProps { allMessages: Map<MessengerId, ChatMessage[]>; demoSequence: number }
export function createMessengerDemoState(): MessengerDemoState {
  const contacts = [
    { id: 'lin', name: '林晓', department: '销售部', status: 'online' as const, groupId: 'sales', unreadCount: 2 },
    { id: 'wang', name: '王明', department: '采购部', status: 'busy' as const, groupId: 'partners' },
    { id: 'chen', name: '陈宁', department: '财务部', status: 'offline' as const, groupId: 'partners' },
    { id: 'me', name: '我', department: '运营部', status: 'online' as const }
  ]
  const business: ChatBusinessReference = { businessType: '销售订单', businessId: 'order-001', businessNumber: 'SO20261009001', title: '华东客户补货订单', summary: '客户：华东商贸 · 待确认交期' }
  const history: ChatMessage[] = Array.from({ length: 47 }, (_item, index) => ({
    id: 'history-' + index, senderId: index % 2 ? 'me' : 'lin', senderName: index % 2 ? '我' : '林晓',
    content: index % 3 === 0 ? '订单交期需要确认，第 ' + (index + 1) + ' 条记录' : '已核对库存，第 ' + (index + 1) + ' 条记录',
    time: '10-08 09:' + String(index).padStart(2, '0'), sentAt: '2026-10-08T09:' + String(index).padStart(2, '0') + ':00+08:00', status: 'sent'
  }))
  history[0] = { ...history[0], kind: 'image', content: '项目效果图', imageUrl: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22320%22%20height%3D%22180%22%20viewBox%3D%220%200%20320%20180%22%3E%0A%20%20%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23d7edff%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22255%22%20cy%3D%2240%22%20r%3D%2220%22%20fill%3D%22%23fff5c4%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M0%20145%2085%2040%20170%20145Z%22%20fill%3D%22%2384a9bf%22%2F%3E%0A%20%20%3Cpath%20d%3D%22m58%2074%2027-34%2027%2034-26-12Z%22%20fill%3D%22%23f6fbff%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M100%20160%20215%2055%20320%20150v30H0v-25Z%22%20fill%3D%22%23619487%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M0%20146q80-20%20160%207t160-3v30H0Z%22%20fill%3D%22%23b3d7af%22%2F%3E%0A%3C%2Fsvg%3E%0D%0A" }
  history[1] = { ...history[1], content: '👍🎉' }
  history[2] = { ...history[2], kind: 'file', content: '销售订单明细', fileName: '销售订单明细.xlsx', fileSize: 24576 }
  history[3] = { ...history[3], content: '项目资料 https://example.com/project/order-001' }
  history[4] = { ...history[4], kind: 'file', content: '产品演示', fileName: '产品演示.mp4', fileSize: 5242880 }
  history.push({ id: 'business-1', senderId: 'lin', senderName: '林晓', content: business.title, kind: 'business', business, time: '10-09 09:00', sentAt: '2026-10-09T09:00:00+08:00' })
  const groupMessages: ChatMessage[] = [
    { id: 'group-1', kind: 'system', content: '项目沟通群已创建', time: '09:00', sentAt: '2026-10-09T09:00:00+08:00' },
    { id: 'group-2', senderId: 'wang', senderName: '王明', content: '采购和销售可以在这里同步订单进度。', time: '09:10', sentAt: '2026-10-09T09:10:00+08:00' }
  ]
  return {
    modelValue: false, currentUserRole: 'admin', currentUserId: 'me', activeConversationId: 'direct-lin', contacts,
    contactGroups: [{ id: 'sales', name: '销售同事' }, { id: 'partners', name: '协作同事' }],
    groups: [{ id: 'project', name: '订单项目沟通群', memberIds: ['me', 'lin', 'wang'], ownerId: 'me', adminIds: ['lin'], announcement: '请在群内同步订单与交期，重要事项附上业务单据。', unreadCount: 1, permissions: { canRename: true, canManageMembers: true, canManageAdmins: true, canEditAnnouncement: true, canLeave: true, canDissolve: true } }],
    conversations: [
      { id: 'direct-lin', kind: 'direct', targetId: 'lin', title: '林晓', lastMessage: '销售订单待确认', lastMessageTime: '2026-10-09T09:00:00+08:00', unreadCount: 2 },
      { id: 'group-project', kind: 'group', targetId: 'project', title: '订单项目沟通群', lastMessage: '同步订单进度', lastMessageTime: '2026-10-09T09:10:00+08:00', unreadCount: 1 }
    ],
    messagePages: [{ conversationId: 'direct-lin', messages: history.slice(-8), hasMore: true }, { conversationId: 'group-project', messages: groupMessages, hasMore: false }],
    width: 800, height: 640, fontSize: 14, contactListPlacement: 'right', contactListWidth: 280, contactListHeight: 520, allowCreateGroup: true, showBusinessPicker: true,
    allMessages: new Map([['direct-lin', history], ['group-project', groupMessages]]), demoSequence: 100
  }
}
export function createMessengerDemoHandlers(state: MessengerDemoState, instance: () => MessengerExpose | undefined, notice: (text: string) => void = () => {}) {
  function messages(id: MessengerId) { let list = state.allMessages.get(id); if (!list) { list = []; state.allMessages.set(id, list) } return list }
  function refresh(id: MessengerId) {
    const list = messages(id)
    const page = state.messagePages?.find(item => item.conversationId === id)
    const size = Math.max(8, page?.messages.length ?? 8)
    const next = { conversationId: id, messages: list.slice(-size), hasMore: list.length > size }
    state.messagePages = [...(state.messagePages ?? []).filter(item => item.conversationId !== id), next]
    const conversation = state.conversations?.find(item => item.id === id)
    if (conversation) { conversation.lastMessage = list[list.length - 1]?.fileName || list[list.length - 1]?.content; conversation.lastMessageTime = list[list.length - 1]?.sentAt; state.conversations = [conversation, ...(state.conversations ?? []).filter(item => item.id !== id)] }
  }
  function open(payload: MessengerOpenPayload) {
    let conversation = state.conversations?.find(item => item.kind === payload.kind && item.targetId === payload.targetId)
    if (!conversation) {
      const target = payload.kind === 'direct' ? state.contacts?.find(item => item.id === payload.targetId) : state.groups?.find(item => item.id === payload.targetId)
      if (!target) return
      conversation = { id: 'demo-conversation-' + (++state.demoSequence), kind: payload.kind, targetId: payload.targetId, title: target.name, unreadCount: 0 }
      state.conversations = [conversation, ...(state.conversations ?? [])]
      refresh(conversation.id)
    }
    state.activeConversationId = conversation.id
    state.modelValue = true
  }
  async function send(payload: MessengerSendPayload) {
    const list = messages(payload.conversationId)
    const base = { senderId: state.currentUserId, senderName: '我', time: '刚刚', sentAt: new Date().toISOString(), status: 'sent' as const }
    if (payload.content) list.push({ ...base, id: ++state.demoSequence, content: payload.content })
    for (const reference of payload.businessReferences) list.push({ ...base, id: ++state.demoSequence, kind: 'business', content: reference.title, business: reference })
    refresh(payload.conversationId)
    for (const attachment of payload.attachments) {
      const url = await new Promise<string>(resolve => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.readAsDataURL(attachment.file) })
      list.push({ ...base, id: ++state.demoSequence, kind: attachment.kind, content: attachment.name, imageUrl: attachment.kind === 'image' ? url : undefined, fileUrl: attachment.kind === 'file' ? url : undefined, fileName: attachment.name, fileSize: attachment.size })
    }
    refresh(payload.conversationId)
  }
  function loadHistory(payload: { conversationId: MessengerId }) {
    const list = messages(payload.conversationId)
    const page = state.messagePages?.find(item => item.conversationId === payload.conversationId)
    const size = (page?.messages.length ?? 0) + 20
    state.messagePages = [...(state.messagePages ?? []).filter(item => item.conversationId !== payload.conversationId), { conversationId: payload.conversationId, messages: list.slice(-size), hasMore: list.length > size }]
  }
  function historyQuery(query: MessengerHistoryQuery) {
    const filtered = messages(query.conversationId).filter(message => {
      const content = [message.content, message.fileName, message.business?.businessNumber, message.business?.title].filter(Boolean).join(' ')
      const date = message.sentAt?.slice(0, 10) ?? ''
      return matchesHistoryMessage(message, query.messageType) && (query.senderId === undefined || message.senderId === query.senderId) && content.toLowerCase().includes(query.keyword.toLowerCase()) && (!query.startDate || date >= query.startDate) && (!query.endDate || date <= query.endDate)
    })
    state.historyResult = { ...query, total: filtered.length, messages: filtered.slice((query.page - 1) * query.pageSize, query.page * query.pageSize) }
  }
  function locate(payload: { conversationId: MessengerId; messageId: MessengerId }) {
    const list = messages(payload.conversationId)
    state.messagePages = [...(state.messagePages ?? []).filter(item => item.conversationId !== payload.conversationId), { conversationId: payload.conversationId, messages: [...list], hasMore: false }]
  }
  function read(payload: { conversationId: MessengerId }) {
    const conversation = state.conversations?.find(item => item.id === payload.conversationId)
    if (!conversation) return
    conversation.unreadCount = 0
    const target = conversation.kind === 'direct' ? state.contacts?.find(item => item.id === conversation.targetId) : state.groups?.find(item => item.id === conversation.targetId)
    if (target) target.unreadCount = 0
  }
  function contactGroupAction(payload: MessengerContactGroupAction) {
    if (payload.action === 'create') state.contactGroups = [...(state.contactGroups ?? []), { id: 'contact-group-' + (++state.demoSequence), name: payload.name }]
    if (payload.action === 'rename') { const group = state.contactGroups?.find(item => item.id === payload.groupId); if (group) group.name = payload.name }
    if (payload.action === 'delete') { state.contactGroups = state.contactGroups?.filter(item => item.id !== payload.groupId); state.contacts?.forEach(item => { if (item.groupId === payload.groupId) item.groupId = undefined }) }
    if (payload.action === 'move') { const contact = state.contacts?.find(item => item.id === payload.contactId); if (contact) contact.groupId = payload.groupId }
  }
  function groupAction(payload: MessengerGroupAction) {
    if (payload.action === 'create') {
      const id = 'group-' + (++state.demoSequence)
      state.groups = [...(state.groups ?? []), { id, name: payload.name, memberIds: payload.memberIds, ownerId: state.currentUserId, adminIds: [], permissions: { canRename: true, canManageMembers: true, canManageAdmins: true, canEditAnnouncement: true, canLeave: true, canDissolve: true } }]
      open({ kind: 'group', targetId: id })
      return
    }
    const group = state.groups?.find(item => item.id === payload.groupId)
    if (!group) return
    if (payload.action === 'rename') { group.name = payload.name; state.conversations?.forEach(item => { if (item.kind === 'group' && item.targetId === group.id) item.title = payload.name }) }
    if (payload.action === 'members') { group.memberIds = payload.memberIds; group.adminIds = group.adminIds?.filter(id => payload.memberIds.includes(id)) }
    if (payload.action === 'admins') group.adminIds = payload.adminIds.filter(id => group.memberIds.includes(id))
    if (payload.action === 'announcement') group.announcement = payload.announcement
    if (payload.action === 'leave' || payload.action === 'dissolve') {
      const removed = state.conversations?.filter(item => item.kind === 'group' && item.targetId === group.id).map(item => item.id) ?? []
      state.groups = state.groups?.filter(item => item.id !== group.id)
      state.conversations = state.conversations?.filter(item => !removed.includes(item.id))
      state.messagePages = state.messagePages?.filter(item => !removed.includes(item.conversationId))
      removed.forEach(id => state.allMessages.delete(id))
      if (removed.includes(state.activeConversationId!)) state.activeConversationId = state.conversations?.[0]?.id
    }
    notice('群操作已由模拟 ERP 完成')
  }
  function businessSelect(payload: { conversationId: MessengerId }) {
    instance()?.addBusinessReference(payload.conversationId, { businessType: '采购订单', businessId: 'purchase-001', businessNumber: 'PO20261009008', title: '原材料补货采购单', summary: '供应商：示例供应商 · 待收货' })
  }
  function receive() {
    const id = state.activeConversationId ?? state.conversations?.[0]?.id
    if (id === undefined) return
    messages(id).push({ id: ++state.demoSequence, senderId: 'lin', senderName: '林晓', content: '模拟收到同事消息：订单已确认。', time: '刚刚', sentAt: new Date().toISOString() })
    const conversation = state.conversations?.find(item => item.id === id)
    if (conversation) {
      conversation.unreadCount = (conversation.unreadCount ?? 0) + 1
      const target = conversation.kind === 'direct' ? state.contacts?.find(item => item.id === conversation.targetId) : state.groups?.find(item => item.id === conversation.targetId)
      if (target) target.unreadCount = conversation.unreadCount
    }
    refresh(id)
  }
  function fileClick(payload: { detail: { message: ChatMessage } }) {
    const url = payload.detail.message.fileUrl
    if (!url) return
    const link = document.createElement('a'); link.href = url; link.download = payload.detail.message.fileName ?? '附件'; link.click()
  }
  function imageClick(payload: { detail: { message: ChatMessage } }) { notice('图片预览：' + payload.detail.message.content) }
  function businessClick(payload: { message: ChatMessage }) { notice('模拟打开单据：' + payload.message.business?.businessNumber + '（正式接入由 ERP 路由处理）') }
  function retry(payload: { message: ChatMessage }) { payload.message.status = 'sent' }
  return { open, send, loadHistory, historyQuery, locate, read, contactGroupAction, groupAction, businessSelect, receive, fileClick, imageClick, businessClick, retry }
}
