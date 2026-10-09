import type { VNode } from 'vue'
import type { ElementStyleProps } from '../../../_utils/elementStyle'

export type ChatMessageId = string | number
export type ChatMessageKind = 'text' | 'image' | 'file' | 'system' | 'business'
export interface ChatBusinessReference {
  businessType: string
  businessId: string | number
  businessNumber: string
  title: string
  summary?: string
}
export type ChatMessageStatus = 'sending' | 'sent' | 'read' | 'failed'
export interface ChatMessageQuote {
  senderName: string
  content: string
}
/** 按数组顺序显示，id 在当前会话内唯一。 */
export interface ChatMessage {
  id: ChatMessageId
  senderId?: ChatMessageId
  senderName?: string
  avatar?: string
  kind?: ChatMessageKind
  content: string
  /** 调用方格式化的时间文本。 */
  time?: string
  imageUrl?: string
  fileUrl?: string
  fileName?: string
  /** 文件大小，单位 byte。 */
  fileSize?: number
  status?: ChatMessageStatus
  /** 原始时间，用于历史查询；time 仍用于显示。 */
  sentAt?: string
  business?: ChatBusinessReference
  quote?: ChatMessageQuote
}
export interface ChatProps extends ElementStyleProps {
  /** 消息列表 */
  messages?: ChatMessage[]
  /** 当前用户标识 */
  currentUserId?: ChatMessageId
  /** 聊天标题 */
  title?: string
  width?: number | string
  height?: number | string
  fontSize?: number
  /** 显示头像 */
  showAvatar?: boolean
  /** 显示昵称 */
  showName?: boolean
  /** 显示时间 */
  showTime?: boolean
  /** 显示发送状态 */
  showStatus?: boolean
  /** 启用自动跟随底部 */
  enableAutoScroll?: boolean
  /** 空消息提示 */
  emptyText?: string
  /** 自己的消息背景色 */
  selfBubbleBackgroundColor?: string
  /** 自己的消息文字色 */
  selfBubbleTextColor?: string
  /** 对方的消息背景色 */
  bubbleBackgroundColor?: string
  /** 气泡圆角 */
  bubbleRadius?: number
  /** 输入区绑定文本，未传入时由组件管理 */
  modelValue?: string
  /** 显示内置输入区 */
  showComposer?: boolean
  /** 显示图片选择按钮 */
  showImagePicker?: boolean
  /** 显示文件选择按钮 */
  showFilePicker?: boolean
  /** 显示表情选择按钮 */
  showEmojiPicker?: boolean
  /** 启用粘贴图片和文件 */
  enablePaste?: boolean
  disabled?: boolean
  placeholder?: string
  /** 发送按钮文本 */
  sendText?: string
  /** 文件选择框接受的扩展名或 MIME 类型 */
  fileAccept?: string
  /** 常用表情列表 */
  emojis?: string[]
}
export type ChatAttachmentKind = 'image' | 'file'
export type ChatAttachmentSource = 'picker' | 'paste'
export interface ChatAttachment {
  id: string
  kind: ChatAttachmentKind
  file: File
  name: string
  size: number
  /** 本地预览地址，在当前 XChat 实例销毁前有效。 */
  url: string
}
export interface ChatAttachmentPayload {
  attachments: ChatAttachment[]
  source: ChatAttachmentSource
}
export interface ChatSendPayload {
  content: string
  attachments: ChatAttachment[]
}
export interface ChatMessageSlotProps {
  message: ChatMessage
  index: number
  isSelf: boolean
}
export interface ChatMessageClickPayload extends ChatMessageSlotProps {
  event: MouseEvent
}
export interface ChatScrollPayload {
  scrollTop: number
  isAtBottom: boolean
}
export interface ChatEmits {
  'message-click': [payload: ChatMessageClickPayload]
  'image-click': [payload: ChatMessageClickPayload]
  'file-click': [payload: ChatMessageClickPayload]
  'business-click': [payload: ChatMessageClickPayload]
  'retry': [message: ChatMessage]
  'scroll': [payload: ChatScrollPayload]
  'update:modelValue': [value: string]
  'send': [payload: ChatSendPayload]
  'attachment-add': [payload: ChatAttachmentPayload]
  'attachment-remove': [attachment: ChatAttachment]
  'emoji-select': [emoji: string]
}
export interface ChatSlots {
  header?: () => VNode[]
  footer?: () => VNode[]
  empty?: () => VNode[]
  message?: (props: ChatMessageSlotProps) => VNode[]
  avatar?: (props: ChatMessageSlotProps) => VNode[]
}
export interface ChatExpose {
  scrollToMessage: (id: ChatMessageId) => Promise<boolean>
  scrollToBottom: (behavior?: ScrollBehavior) => Promise<void>
  focus: () => void
  clearDraft: () => void
  sendMessage: () => void
}
