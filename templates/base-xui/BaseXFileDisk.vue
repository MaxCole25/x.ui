<script lang="ts">
import { defineComponent, h } from 'vue'
import { XFileDisk } from 'x.ui'
import { getBaseXTheme } from './baseXConfig'
import { normalizeBaseXSize } from './xSize'

export default defineComponent({
  name: 'BaseXFileDisk',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const theme = getBaseXTheme().fileDisk
      const { size, ...restAttrs } = attrs

      return h(
        XFileDisk as never,
        {
          size: normalizeBaseXSize(size),
          backgroundColor: theme.backgroundColor,
          textColor: theme.textColor,
          mutedTextColor: theme.mutedTextColor,
          borderColor: theme.borderColor,
          headerBackgroundColor: theme.headerBackgroundColor,
          toolbarBackgroundColor: theme.toolbarBackgroundColor,
          itemBackgroundColor: theme.itemBackgroundColor,
          itemHoverBackgroundColor: theme.itemHoverBackgroundColor,
          itemActiveBackgroundColor: theme.itemActiveBackgroundColor,
          itemActiveTextColor: theme.itemActiveTextColor,
          iconColor: theme.iconColor,
          activeIconColor: theme.activeIconColor,
          emptyBackgroundColor: theme.emptyBackgroundColor,
          dragOverBackgroundColor: theme.dragOverBackgroundColor,
          colors: theme.colors,
          ...restAttrs,
        },
        slots,
      )
    }
  },
})
</script>

