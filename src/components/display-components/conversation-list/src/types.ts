import type { VNode } from 'vue'
import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { MessengerConversation, MessengerId } from '../../../_utils/messenger'
export type { MessengerConversation, MessengerId } from '../../../_utils/messenger'
export interface ConversationListProps extends ElementStyleProps {
  modelValue?: MessengerId
  conversations?: MessengerConversation[]
  width?: number | string
  height?: number | string
  fontSize?: number
  disabled?: boolean
}
export interface ConversationListEmits { 'update:modelValue': [id: MessengerId]; 'select': [conversation: MessengerConversation] }
export interface ConversationListSlots { conversation?: (props: { conversation: MessengerConversation }) => VNode[]; empty?: () => VNode[] }
