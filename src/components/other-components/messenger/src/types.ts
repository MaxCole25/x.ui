import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { ContactListPlacement } from '../../../display-components/contact-list'
import type { OverlayProps } from '../../../_utils/overlay'
import type { ChatProps, ChatAttachment, ChatAttachmentPayload, ChatBusinessReference, ChatMessage, ChatMessageClickPayload, ChatMessageId, ChatSendPayload, ChatMessageQuote } from '../../../display-components/chat'
export type MessengerId = ChatMessageId
export interface MessengerContact {
  id: MessengerId
  name: string
  avatar?: string
  department?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
  groupId?: MessengerId
  unreadCount?: number
}
export interface MessengerContactGroup { id: MessengerId; name: string }
export interface MessengerGroupPermissions {
  canRename?: boolean
  canManageMembers?: boolean
  canManageAdmins?: boolean
  canEditAnnouncement?: boolean
  canLeave?: boolean
  canDissolve?: boolean
}
export interface MessengerGroup {
  id: MessengerId
  name: string
  avatar?: string
  memberIds: MessengerId[]
  ownerId?: MessengerId
  adminIds?: MessengerId[]
  announcement?: string
  unreadCount?: number
  permissions?: MessengerGroupPermissions
}
export interface MessengerConversation {
  id: MessengerId
  kind: 'direct' | 'group'
  targetId: MessengerId
  title: string
  avatar?: string
  lastMessage?: string
  /** ISO 8601 时间用于日期分档；预格式化文字直接显示。 */
  lastMessageTime?: string
  unreadCount?: number
}
export interface MessengerMessagePage { conversationId: MessengerId; messages: ChatMessage[]; hasMore?: boolean; loading?: boolean }
export type MessengerHistoryMessageType = 'all' | 'media' | 'emoji' | 'file' | 'link'
export interface MessengerHistoryQuery { conversationId: MessengerId; keyword: string; startDate: string; endDate: string; page: number; pageSize: number; messageType?: MessengerHistoryMessageType; senderId?: MessengerId }
export interface MessengerHistoryResult extends MessengerHistoryQuery { messages: ChatMessage[]; total: number; loading?: boolean; error?: string }
export interface MessengerOpenPayload { kind: 'direct' | 'group'; targetId: MessengerId }
export interface MessengerSendPayload extends ChatSendPayload { conversationId: MessengerId; businessReferences: ChatBusinessReference[]; replyToMessageId?: MessengerId; quote?: ChatMessageQuote }
export type MessengerContactGroupAction =
  | { action: 'create'; name: string }
  | { action: 'rename'; groupId: MessengerId; name: string }
  | { action: 'delete'; groupId: MessengerId }
  | { action: 'move'; contactId: MessengerId; groupId?: MessengerId }
export type MessengerGroupAction =
  | { action: 'create'; name: string; memberIds: MessengerId[] }
  | { action: 'rename'; groupId: MessengerId; name: string }
  | { action: 'members'; groupId: MessengerId; memberIds: MessengerId[] }
  | { action: 'admins'; groupId: MessengerId; adminIds: MessengerId[] }
  | { action: 'announcement'; groupId: MessengerId; announcement: string }
  | { action: 'leave' | 'dissolve'; groupId: MessengerId }

export type MessengerContactListPlacement = Exclude<ContactListPlacement, 'inline'>
export interface MessengerProps extends ElementStyleProps, OverlayProps, Pick<ChatProps, 'bubbleBackgroundColor' | 'selfBubbleBackgroundColor' | 'selfBubbleTextColor' | 'timePlacement'> {
  /** 独立聊天窗口标题栏背景色。 */
  headerBackgroundColor?: string
  /** 聊天消息区域背景色，与气泡和输入区分离。 */
  chatBackgroundColor?: string
  /** 独立聊天窗口是否显示，好友列表单独控制。 */
  modelValue?: boolean
  /** 当前活动会话只读，仍可切换和查询历史。 */
  conversationReadonly?: boolean
  /** 联系人列表初始固定状态。 */
  defaultContactListPinned?: boolean
  showContactList?: boolean
  contactListPlacement?: MessengerContactListPlacement
  /** 悬浮区域的 CSS 选择器；未指定时使用浏览器视口。 */
  floatingBoundary?: string
  /** 消息浮标位置的 localStorage 键；由应用按租户和用户提供，未指定时不持久化。 */
  launcherPositionStorageKey?: string
  contactListWidth?: number
  /** 好友列表初始高度，单位 px；支持底部拖拽和 v-model:contactListHeight。 */
  contactListHeight?: number
  activeConversationId?: MessengerId
  currentUserId?: MessengerId
  /** 当前用户角色；仅 admin 显示好友列表设置。 */
  currentUserRole?: 'admin' | 'user'
  contacts?: MessengerContact[]
  contactGroups?: MessengerContactGroup[]
  groups?: MessengerGroup[]
  conversations?: MessengerConversation[]
  messagePages?: MessengerMessagePage[]
  historyResult?: MessengerHistoryResult
  title?: string
  width?: number
  height?: number
  fontSize?: number
  disabled?: boolean
  /** 在群聊视图搜索框右侧显示创建群聊图标。 */
  allowCreateGroup?: boolean
  enableContactGroupManagement?: boolean
  showBusinessPicker?: boolean
}
export interface MessengerEmits {
  'update:modelValue': [visible: boolean]
  'update:contactListHeight': [height: number]
  'update:activeConversationId': [id: MessengerId]
  'open-conversation': [payload: MessengerOpenPayload]
  'send': [payload: MessengerSendPayload]
  'load-history': [payload: { conversationId: MessengerId; beforeMessageId?: MessengerId }]
  'history-query': [payload: MessengerHistoryQuery]
  'locate-message': [payload: { conversationId: MessengerId; messageId: MessengerId }]
  'read-request': [payload: { conversationId: MessengerId; lastMessageId: MessengerId }]
  'contact-group-action': [payload: MessengerContactGroupAction]
  'group-action': [payload: MessengerGroupAction]
  'business-select': [payload: { conversationId: MessengerId }]
  'business-click': [payload: { conversationId: MessengerId; message: ChatMessage }]
  'image-click': [payload: { conversationId: MessengerId; detail: ChatMessageClickPayload }]
  'file-click': [payload: { conversationId: MessengerId; detail: ChatMessageClickPayload }]
  'retry': [payload: { conversationId: MessengerId; message: ChatMessage }]
  'attachment-add': [payload: { conversationId: MessengerId; detail: ChatAttachmentPayload }]
  'attachment-remove': [payload: { conversationId: MessengerId; attachment: ChatAttachment }]
  'close': []
}
export interface MessengerExpose {
  openConversation: (payload: MessengerOpenPayload) => void
  selectConversation: (id: MessengerId) => void
  addBusinessReference: (conversationId: MessengerId, reference: ChatBusinessReference) => void
  locateMessage: (conversationId: MessengerId, messageId: MessengerId) => Promise<void>
}
