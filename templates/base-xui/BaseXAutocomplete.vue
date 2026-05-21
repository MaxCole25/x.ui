<script lang="ts">
import { defineComponent, h } from 'vue'
import { XAutocomplete } from 'x.ui'
import { getBaseXTheme } from './baseXConfig'
import { normalizeBaseXSize } from './xSize'

export default defineComponent({
  name: 'BaseXAutocomplete',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const { size, ...restAttrs } = attrs
      return (
      h(
        XAutocomplete as never,
        {
          size: normalizeBaseXSize(size),
          backgroundColor: getBaseXTheme().formControl.backgroundColor,
          textColor: getBaseXTheme().formControl.textColor,
          borderColor: getBaseXTheme().formControl.borderColor,
          activeBorderColor: getBaseXTheme().formControl.activeBorderColor,
          disabledBackgroundColor: getBaseXTheme().formControl.disabledBackgroundColor,
          disabledTextColor: getBaseXTheme().formControl.disabledTextColor,
          clearIconColor: getBaseXTheme().formControl.clearIconColor,
          ...restAttrs,
        },
        slots,
      )
      )
    }
  },
})
</script>

