<script lang="ts">
import { defineComponent, h } from 'vue'
import { XLogin } from 'x.ui'
import { normalizeBaseXSize } from './xSize'

export default defineComponent({
  name: 'BaseXLogin',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const { size, ...restAttrs } = attrs

      return h(
        XLogin as never,
        {
          size: normalizeBaseXSize(size),
          ...restAttrs,
        },
        slots,
      )
    }
  },
})
</script>
