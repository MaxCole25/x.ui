import type { VNode } from 'vue'
import type { OverlayProps } from '../../../_utils/overlay'
import type { ElementStyleProps } from '../../../_utils/elementStyle'
import type { MessengerContact, MessengerContactGroup, MessengerContactGroupAction, MessengerGroup, MessengerId, MessengerOpenPayload } from '../../../_utils/messenger'
export type * from '../../../_utils/messenger'
export type ContactListPlacement = 'inline' | 'left' | 'top' | 'right' | 'floating'
export interface ContactListProps extends ElementStyleProps, OverlayProps {
  /** inline 嵌入页面，其余模式为独立停靠或悬浮面板。 */
  placement?: ContactListPlacement
  /** 当前选中的联系人或群 ID */
  modelValue?: MessengerId
  /** 当前选中条目的类别 */
  activeKind?: 'direct' | 'group'
  contacts?: MessengerContact[]
  contactGroups?: MessengerContactGroup[]
  groups?: MessengerGroup[]
  width?: number | string
  height?: number | string
  fontSize?: number
  showSearch?: boolean
  showGroups?: boolean
  enableGroupManagement?: boolean
  disabled?: boolean
}
export interface ContactListEmits {
  'update:modelValue': [id: MessengerId]
  'update:activeKind': [kind: 'direct' | 'group']
  'open': [payload: MessengerOpenPayload]
  'update:placement': [placement: ContactListPlacement]
  'activate': []
  'contact-group-action': [payload: MessengerContactGroupAction]
}
export interface ContactListSlots { footer?: () => VNode[]; contact?: (props: { contact: MessengerContact }) => VNode[]; group?: (props: { group: MessengerGroup }) => VNode[]; empty?: () => VNode[] }
