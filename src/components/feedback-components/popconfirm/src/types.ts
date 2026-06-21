import type { PopoverPlacement, PopoverTrigger } from '../../popover/src/types'

export interface PopconfirmProps {
  modelValue?: boolean
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  placement?: PopoverPlacement
  trigger?: PopoverTrigger
  disabled?: boolean
  teleported?: boolean
  teleportTo?: string
  zIndex?: number
}
