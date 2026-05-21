<script lang="ts">
import { XSelect } from 'x.ui'
import { getBaseXTheme } from './baseXConfig'
import { createBaseXComponent } from './createBaseXComponent'

export default createBaseXComponent('BaseXSelect', XSelect, () => ({
  color: getBaseXTheme().formControl.activeBorderColor,
  backgroundColor: getBaseXTheme().formControl.backgroundColor,
  dropdownBackgroundColor: 'var(--color-surface)',
  textColor: getBaseXTheme().formControl.textColor,
  borderColor: getBaseXTheme().formControl.borderColor,
  activeBorderColor: getBaseXTheme().formControl.activeBorderColor,
  disabledBackgroundColor: getBaseXTheme().formControl.disabledBackgroundColor,
  disabledTextColor: getBaseXTheme().formControl.disabledTextColor,
  clearIconColor: getBaseXTheme().formControl.clearIconColor,
}))
</script>

