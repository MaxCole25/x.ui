import type { ChatMessage } from '../../../display-components/chat'
import type { MessengerHistoryMessageType } from './types'
export function isHistoryVideo(message: ChatMessage) {
  return message.kind === 'file' && /\.(mp4|webm|mov|m4v|avi)(?:$|[?#])/i.test(message.fileName || message.fileUrl || '')
}
export function isHistoryEmoji(message: ChatMessage) {
  return (!message.kind || message.kind === 'text') && /^(?:\p{Extended_Pictographic}|\p{Emoji_Component}|\s)+$/u.test(message.content.trim()) && !!message.content.trim()
}
export function matchesHistoryMessage(message: ChatMessage, messageType: MessengerHistoryMessageType = 'all') {
  if (messageType === 'media') return message.kind === 'image' || isHistoryVideo(message)
  if (messageType === 'emoji') return isHistoryEmoji(message)
  if (messageType === 'file') return message.kind === 'file' && !isHistoryVideo(message)
  if (messageType === 'link') return (!message.kind || message.kind === 'text') && /https?:\/\/\S+/i.test(message.content)
  return true
}