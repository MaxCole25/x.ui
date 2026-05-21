<script lang="ts">
import { defineComponent, h } from 'vue'
import { XInputNumber } from 'x.ui'
import { getBaseXTheme } from './baseXConfig'
import { normalizeBaseXSize } from './xSize'

export default defineComponent({
  name: 'BaseXInputNumber',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const { size, ...restAttrs } = attrs
      return (
      h(
        XInputNumber as never,
        {
          size: normalizeBaseXSize(size),
          backgroundColor: getBaseXTheme().formControl.backgroundColor,
          textColor: getBaseXTheme().formControl.textColor,
          borderColor: getBaseXTheme().formControl.borderColor,
          activeBorderColor: getBaseXTheme().formControl.activeBorderColor,
          decreaseButtonBackgroundColor: 'var(--color-surface-soft)',
          increaseButtonBackgroundColor: getBaseXTheme().formControl.activeBorderColor,
          ...restAttrs,
        },
        slots,
      )
      )
    }
  },
})
</script>

