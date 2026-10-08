<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, onUpdated, ref, useId, watch } from 'vue'
import { selectContextKey } from './context'
import type { OptionProps } from './types'

defineOptions({
  name: 'XOption'
})

const props = withDefaults(defineProps<OptionProps>(), {
  disabled: false
})

const select = inject(selectContextKey, null)
const optionRef = ref<HTMLElement | null>(null)
const optionId = useId()

const option = computed(() => ({
  id: optionId,
  element: optionRef.value ?? undefined,
  label: props.label,
  value: props.value,
  disabled: props.disabled
}))

const selected = computed(() => select?.selectedValues().includes(props.value) ?? false)

onMounted(() => select?.registerOption(option.value))
onUpdated(() => select?.registerOption(option.value))

watch(option, (next) => {
  select?.registerOption(next)
})

onBeforeUnmount(() => {
  select?.unregisterOption(optionId)
})
</script>

<template>
  <button
    ref="optionRef"
    :id="optionId"
    tabindex="-1"
    class="x-option"
    :class="{ 'is-selected': selected, 'is-disabled': props.disabled, 'is-active': select?.isActive(optionId) }"
    type="button"
    role="option"
    :aria-selected="selected"
    :disabled="props.disabled"
    @mousedown.prevent
    @click="select?.selectOption(option)"
  >
    <span><slot>{{ select?.getOptionDisplayText(option) ?? props.label }}</slot></span>
    <span v-if="selected" class="x-option__check">✓</span>
  </button>
</template>
