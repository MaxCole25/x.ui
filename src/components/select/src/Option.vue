<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, watch } from 'vue'
import { selectContextKey } from './context'
import type { OptionProps } from './types'

defineOptions({
  name: 'XOption'
})

const props = withDefaults(defineProps<OptionProps>(), {
  disabled: false
})

const select = inject(selectContextKey, null)

const option = computed(() => ({
  label: props.label,
  value: props.value,
  disabled: props.disabled
}))

const selected = computed(() => select?.selectedValues().includes(props.value) ?? false)

onMounted(() => {
  select?.registerOption(option.value)
})

watch(option, (next) => {
  select?.registerOption(next)
})

onBeforeUnmount(() => {
  select?.unregisterOption(props.value)
})
</script>

<template>
  <button
    class="x-option"
    :class="{ 'is-selected': selected, 'is-disabled': props.disabled }"
    type="button"
    role="option"
    :aria-selected="selected"
    :disabled="props.disabled"
    @mousedown.prevent
    @click="select?.selectOption(option)"
  >
    <span><slot>{{ props.label }}</slot></span>
    <span v-if="selected" class="x-option__check">✓</span>
  </button>
</template>
