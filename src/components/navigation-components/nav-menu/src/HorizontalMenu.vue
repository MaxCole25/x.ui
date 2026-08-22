<script setup lang="ts">
import NavMenu from './NavMenu.vue'
import type { HorizontalMenuProps } from './types'

defineOptions({
  name: 'XHorizontalMenu',
})

const props = defineProps<HorizontalMenuProps>()

const emit = defineEmits<{
  (e: 'select', key: string): void
  (e: 'open-change', openKeys: string[]): void
  (e: 'update:openKeys', openKeys: string[]): void
}>()
</script>

<template>
  <NavMenu
    v-bind="props"
    mode="horizontal"
    @select="emit('select', $event)"
    @open-change="emit('open-change', $event)"
    @update:open-keys="emit('update:openKeys', $event)"
  >
    <template #header><slot name="header" /></template>
    <template #footer><slot name="footer" /></template>
  </NavMenu>
</template>
