import type { XSize } from '../../../_utils/size'
export interface JsonEditorProps {
  size?: XSize
  modelValue: string
  title?: string
  externalError?: string
  resizable?: boolean
}
