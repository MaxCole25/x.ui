<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import { splitterContextKey } from './types'
import type { CSSProperties } from 'vue'
import type { SplitPaneProps } from './types'

defineOptions({
  name: 'XSplitPane'
})

const props = withDefaults(defineProps<SplitPaneProps>(), {
  locked: false,
  overflow: 'auto'
})

const context = inject(splitterContextKey, undefined)
const rootRef = ref<HTMLElement>()
let unregister: (() => void) | undefined

onMounted(() => {
  if (context) {
    unregister = context.registerPane({ element: rootRef, props })
  }
})

onUnmounted(() => unregister?.())

const paneStyle = computed<CSSProperties>(() => ({
  overflow: props.overflow,
  padding: toCssSize(props.padding)
}))
</script>

<template>
  <section ref="rootRef" class="x-split-pane" :style="paneStyle" data-x-split-pane>
    <slot />
  </section>
</template>
