<script lang="ts">
import { defineComponent, h } from 'vue'
import { XPageBuilder } from 'x.ui'
import { normalizeBaseXSize } from './xSize'

export default defineComponent({
  name: 'BaseXPageBuilder',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const { size, ...restAttrs } = attrs

      return h(
        XPageBuilder as never,
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
