<script lang="ts">
import { defineComponent, h } from 'vue'
import { XText } from 'x.ui'
import { getBaseXTheme } from './baseXConfig'
import { normalizeBaseXSize } from './xSize'

export default defineComponent({
  name: 'BaseXText',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const { size, ...restAttrs } = attrs

      return h(
        XText as never,
        {
          size: normalizeBaseXSize(size),
          backgroundColor: getBaseXTheme().textControl.backgroundColor,
          textColor: getBaseXTheme().textControl.textColor,
          borderColor: getBaseXTheme().textControl.borderColor,
          ...restAttrs,
        },
        slots,
      )
    }
  },
})
</script>

