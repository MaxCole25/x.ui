import type { ComponentWithInstall } from '../../_utils/install'
import type { App } from 'vue'
import Autocomplete from './src/Autocomplete.vue'

export const XAutocomplete = Autocomplete as ComponentWithInstall<typeof Autocomplete>

export type {
  AutocompleteDisplayField,
  AutocompleteExpose,
  AutocompleteOption,
  AutocompleteOptionSource,
  AutocompleteOptionValue,
  AutocompleteProps,
  AutocompleteRemoteMethod
} from './src/types'

XAutocomplete.install = (app: App) => {
  app.component(XAutocomplete.name!, XAutocomplete)
}

export default XAutocomplete
