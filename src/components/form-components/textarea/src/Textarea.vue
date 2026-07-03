<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, useAttrs, watch } from 'vue'
import { inputSizePreset } from '../../../_utils/inputSize'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { formContextKey, formItemContextKey } from '../../form/src/context'
import type { TextareaProps } from './types'

defineOptions({
  name: 'XTextarea',
  inheritAttrs: false
})

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  disabled: false,
  readonly: false,
  clearable: false,
  hideClearButton: false,
  status: 'default',
  rows: 3,
  autoHeight: false,
  fullHeight: false,
  allowWrap: true,
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  keyup: [event: KeyboardEvent]
}>()

const attrs = useAttrs()
const form = inject(formContextKey, null)
const formItem = inject(formItemContextKey, null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const contentHeight = ref<string>()

const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')
const nativeId = computed(() => props.id ?? formItem?.id)
const inputValue = computed(() => props.modelValue ?? '')
const hasValue = computed(() => inputValue.value !== '')
const canClear = computed(() => hasValue.value && !mergedDisabled.value && !props.readonly)
const preset = computed(() => inputSizePreset[mergedSize.value])
const safeRows = computed(() => Math.max(1, Math.floor(props.rows)))
const safeMaxRows = computed(() => (typeof props.maxRows === 'number' && props.maxRows > 0 ? Math.max(1, Math.floor(props.maxRows)) : undefined))

const textareaStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-textarea-color': props.accentColor,
  '--x-textarea-active-border-color': props.activeBorderColor ?? props.accentColor,
  '--x-textarea-border-color': props.borderColor,
  '--x-textarea-border-width': toCssSize(props.borderWidth),
  '--x-textarea-clear-icon-color': props.clearIconColor,
  '--x-textarea-clear-icon-size': toCssSize(props.clearIconSize),
  '--x-textarea-disabled-bg': props.disabledBackgroundColor,
  '--x-textarea-disabled-text-color': props.disabledTextColor,
  '--x-textarea-radius': props.radius ?? preset.value?.radius,
  '--x-textarea-bg': props.inputBackgroundColor ?? props.backgroundColor,
  '--x-textarea-text-color': props.textColor,
  '--x-textarea-font-family': props.fontFamily,
  '--x-textarea-font-size': toCssSize(props.fontSize ?? preset.value?.fontSize),
  '--x-textarea-width': toCssSize(props.width),
  '--x-textarea-height': props.fullHeight ? '100%' : props.autoHeight ? contentHeight.value : toCssSize(props.height),
  '--x-textarea-padding': toCssSize(props.padding) ?? preset.value?.padding,
  '--x-textarea-text-align': props.textAlign,
  '--x-textarea-rows': safeRows.value,
  '--x-textarea-max-rows': safeMaxRows.value
}))

const syncAutoHeight = async () => {
  if (!props.autoHeight) {
    contentHeight.value = undefined
    return
  }

  await nextTick()
  const textarea = textareaRef.value
  if (!textarea) return

  textarea.style.height = 'auto'
  const computedStyle = window.getComputedStyle(textarea)
  const lineHeight = Number.parseFloat(computedStyle.lineHeight)
  const paddingTop = Number.parseFloat(computedStyle.paddingTop)
  const paddingBottom = Number.parseFloat(computedStyle.paddingBottom)
  const borderTop = Number.parseFloat(computedStyle.borderTopWidth)
  const borderBottom = Number.parseFloat(computedStyle.borderBottomWidth)
  const maxRowsHeight = safeMaxRows.value && Number.isFinite(lineHeight)
    ? safeMaxRows.value * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom
    : undefined
  const nextHeight = maxRowsHeight ? Math.min(textarea.scrollHeight, maxRowsHeight) : textarea.scrollHeight
  contentHeight.value = `${nextHeight}px`
  textarea.style.height = contentHeight.value
}

watch(() => [props.modelValue, props.autoHeight, props.maxRows, props.rows, props.fontSize, props.padding, mergedSize.value] as const, syncAutoHeight, { flush: 'post' })

onMounted(syncAutoHeight)

const handleInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  emit('input', value)
  syncAutoHeight()
}

const handleChange = (event: Event) => {
  emit('change', (event.target as HTMLTextAreaElement).value)
}

const clear = () => {
  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
  syncAutoHeight()
}
</script>

<template>
  <div
    class="x-textarea"
    :class="[
      `x-textarea--${mergedSize}`,
      `x-textarea--${props.status}`,
      {
        'is-disabled': mergedDisabled,
        'is-readonly': props.readonly,
        'is-auto-height': props.autoHeight,
        'is-full-height': props.fullHeight,
        'is-nowrap': !props.allowWrap,
        'has-max-rows': safeMaxRows,
        'is-active-border-hidden': !props.showActiveBorder,
        'has-clear': props.clearable && !props.hideClearButton
      }
    ]"
    :style="textareaStyle"
  >
    <textarea
      v-bind="attrs"
      :id="nativeId"
      ref="textareaRef"
      class="x-textarea__inner"
      :value="inputValue"
      :name="props.name"
      :placeholder="props.placeholder"
      :disabled="mergedDisabled"
      :readonly="props.readonly"
      :rows="safeRows"
      :maxlength="props.maxlength"
      :wrap="props.allowWrap ? 'soft' : 'off'"
      :aria-invalid="props.status === 'error' ? 'true' : undefined"
      @input="handleInput"
      @change="handleChange"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
      @keydown="emit('keydown', $event)"
      @keyup="emit('keyup', $event)"
    />
    <button
      v-if="props.clearable && !props.hideClearButton"
      class="x-textarea__clear"
      :class="{ 'is-visible': canClear }"
      type="button"
      aria-label="清空"
      :aria-hidden="canClear ? undefined : 'true'"
      :disabled="!canClear"
      :tabindex="canClear ? 0 : -1"
      @click="canClear && clear()"
    >
      <i class="ri-close-circle-line" aria-hidden="true"></i>
    </button>
  </div>
</template>
