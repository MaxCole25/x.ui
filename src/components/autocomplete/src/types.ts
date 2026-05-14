import type { InputProps } from '../../input'

export type AutocompleteSize = NonNullable<InputProps['size']>

export interface AutocompleteProps
  extends Omit<
    InputProps,
    'type' | 'color'
  > {
  autoWidth?: boolean
}
