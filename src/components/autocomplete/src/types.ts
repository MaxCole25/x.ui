import type { ElementStyleProps } from '../../_utils/elementStyle'
import type { InputSize } from '../../input'

export interface AutocompleteOption {
  label: string
  value: string
  disabled?: boolean
}

export interface AutocompleteProps extends ElementStyleProps {
  modelValue?: string
  options?: AutocompleteOption[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  size?: InputSize
}
