<script lang="ts">
import { defineComponent, h } from 'vue'
import { XSwitch } from 'x.ui'
import { getBaseXTheme } from './baseXConfig'
import { normalizeBaseXSize } from './xSize'

export default defineComponent({
  name: 'BaseXSwitch',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const { size, ...restAttrs } = attrs
      return (
      h(
        XSwitch as never,
        {
          size: normalizeBaseXSize(size),
          color: getBaseXTheme().switchControl.color,
          inactiveColor: getBaseXTheme().switchControl.inactiveColor,
          thumbColor: getBaseXTheme().switchControl.thumbColor,
          borderColor: getBaseXTheme().switchControl.borderColor,
          borderWidth: getBaseXTheme().switchControl.borderWidth,
          backgroundColor: getBaseXTheme().switchControl.backgroundColor,
          textColor: getBaseXTheme().switchControl.textColor,
          ...restAttrs,
        },
        slots,
      )
      )
    }
  },
})
</script>

