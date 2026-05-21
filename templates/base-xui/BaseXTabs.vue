<script lang="ts">
import { defineComponent, h } from 'vue'
import { XTabs } from 'x.ui'
import { getBaseXTheme } from './baseXConfig'
import { normalizeBaseXSize } from './xSize'

export default defineComponent({
  name: 'BaseXTabs',
  inheritAttrs: false,
  setup(_, { attrs, slots }) {
    return () => {
      const { size, ...restAttrs } = attrs
      return (
      h(
        XTabs as never,
        {
          size: normalizeBaseXSize(size),
          activeTabBgColor: getBaseXTheme().tabs.activeTabBgColor,
          activeTabTextColor: getBaseXTheme().tabs.activeTabTextColor,
          tabBgColor: getBaseXTheme().tabs.tabBgColor,
          tabTextColor: getBaseXTheme().tabs.tabTextColor,
          tabBorder: getBaseXTheme().tabs.tabBorder,
          contentBackgroundColor: getBaseXTheme().tabs.contentBackgroundColor,
          contentBorder: getBaseXTheme().tabs.contentBorder,
          ...restAttrs,
        },
        slots,
      )
      )
    }
  },
})
</script>

