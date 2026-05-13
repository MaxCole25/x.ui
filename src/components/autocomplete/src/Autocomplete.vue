<script setup lang="ts">
import { computed, ref } from 'vue'
import { createElementStyleVars } from '../../_utils/elementStyle'
import type { AutocompleteOption, AutocompleteProps } from './types'

defineOptions({
  name: 'XAutocomplete'
})

const props = withDefaults(defineProps<AutocompleteProps>(), {
  modelValue: '',
  options: () => [],
  placeholder: '请输入',
  disabled: false,
  clearable: false,
  size: 'md',
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  select: [option: AutocompleteOption]
  clear: []
  focus: [event: FocusEvent]
}>()

const open = ref(false)
const keyword = computed(() => props.modelValue ?? '')
const autocompleteStyle = computed(() => createElementStyleVars(props))
const filteredOptions = computed(() =>
  props.options.filter((option) => option.label.toLowerCase().includes(keyword.value.toLowerCase()))
)

const update = (value: string) => {
  emit('update:modelValue', value)
  emit('input', value)
  open.value = true
}

const select = (option: AutocompleteOption) => {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('select', option)
  open.value = false
}

const clear = () => {
  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
}

const handleFocus = (event: FocusEvent) => {
  open.value = true
  emit('focus', event)
}
</script>

<template>
  <div
    class="x-autocomplete"
    :class="[`x-autocomplete--${props.size}`, { 'is-open': open, 'is-disabled': props.disabled, 'is-active-border-hidden': !props.showActiveBorder }]"
    :style="autocompleteStyle"
  >
    <div class="x-autocomplete__control">
      <input
        :value="keyword"
        :placeholder="props.placeholder"
        :disabled="props.disabled"
        @focus="handleFocus"
        @blur="open = false"
        @input="update(($event.target as HTMLInputElement).value)"
      />
      <button v-if="props.clearable && keyword && !props.disabled" type="button" aria-label="清空" @mousedown.prevent @click="clear">×</button>
    </div>
    <div v-show="open" class="x-autocomplete__dropdown" role="listbox">
      <button
        v-for="option in filteredOptions"
        :key="option.value"
        class="x-autocomplete__option"
        :class="{ 'is-disabled': option.disabled }"
        type="button"
        role="option"
        :disabled="option.disabled"
        @mousedown.prevent
        @click="select(option)"
      >
        {{ option.label }}
      </button>
      <div v-if="!filteredOptions.length" class="x-autocomplete__empty">暂无匹配数据</div>
    </div>
  </div>
</template>
