<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import type { DropdownMenuProps } from './types'

defineOptions({
  name: 'XDropdownMenu'
})

const props = defineProps<DropdownMenuProps>()

const menuStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-dropdown-menu-width': toCssSize(props.width),
  '--x-dropdown-menu-max-height': toCssSize(props.maxHeight),
  '--x-dropdown-menu-min-width': toCssSize(props.minWidth),
  '--x-dropdown-menu-padding': toCssSize(props.padding),
  '--x-dropdown-menu-radius': toCssSize(props.radius),
  '--x-dropdown-menu-shadow': props.shadow
}))
</script>

<template>
  <div class="x-dropdown-menu" :style="menuStyle" role="menu">
    <slot />
  </div>
</template>
