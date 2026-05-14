import type { App } from 'vue'
import Autocomplete from './src/Autocomplete.vue'

export const XAutocomplete = Autocomplete

export type { AutocompleteProps } from './src/types'

XAutocomplete.install = (app: App) => {
  app.component(XAutocomplete.name!, XAutocomplete)
}

export default XAutocomplete
