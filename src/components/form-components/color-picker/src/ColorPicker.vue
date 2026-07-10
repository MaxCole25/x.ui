<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import XPopover from '../../../feedback-components/popover'
import XColorPickerPanel from '../../color-picker-panel'
import type { ColorPickerProps } from './types'

defineOptions({
  name: 'XColorPicker'
})

const props = withDefaults(defineProps<ColorPickerProps>(), {
  modelValue: '#1264f4',
  disabled: false,
  panelMode: 'inline',
  hideInlinePanel: false,
  showValue: true,
  showActiveBorder: true
})

const colorPickerStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-color-picker-width': toCssSize(props.width),
  '--x-color-picker-padding': toCssSize(props.padding)
}))

const shouldUsePopoverPanel = computed(() => props.panelMode === 'popover' || props.hideInlinePanel)
const isTransparentColor = computed(() => props.modelValue.trim().toLowerCase() === 'transparent')

const panelProps = computed(() => ({
  modelValue: props.modelValue,
  borderWidth: props.borderWidth,
  borderColor: props.borderColor,
  backgroundColor: props.backgroundColor,
  textColor: props.textColor
}))

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
}>()

const commit = (value: string) => {
  if (props.disabled) return
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div
    class="x-color-picker"
    :class="{ 'is-disabled': props.disabled, 'is-active-border-hidden': !props.showActiveBorder, 'is-value-hidden': !props.showValue }"
    :style="colorPickerStyle"
  >
    <span v-if="shouldUsePopoverPanel" class="x-color-picker__trigger" tabindex="0">
      <XPopover trigger="click" placement="bottom" :width="248" :show-arrow="false" content-plain :disabled="props.disabled">
        <span class="x-color-picker__chip" :class="{ 'is-transparent': isTransparentColor }" :style="{ backgroundColor: props.modelValue }" />
        <template #content>
          <slot name="panel">
            <XColorPickerPanel v-bind="panelProps" @update:model-value="commit" />
          </slot>
        </template>
      </XPopover>
      <input
        v-if="props.showValue"
        class="x-color-picker__value-input"
        :value="props.modelValue"
        type="text"
        :disabled="props.disabled"
        @click.stop
        @focus="emit('focus', $event)"
        @input="commit(($event.target as HTMLInputElement).value)"
      />
    </span>
    <template v-else>
      <span class="x-color-picker__trigger" tabindex="0">
        <label class="x-color-picker__chip" :class="{ 'is-transparent': isTransparentColor }" :style="{ backgroundColor: props.modelValue }">
          <input class="x-color-picker__native-input" :value="props.modelValue" type="color" :disabled="props.disabled" @focus="emit('focus', $event)" @input="commit(($event.target as HTMLInputElement).value)" />
        </label>
        <input
          v-if="props.showValue"
          class="x-color-picker__value-input"
          :value="props.modelValue"
          type="text"
          :disabled="props.disabled"
          @click.stop
          @focus="emit('focus', $event)"
          @input="commit(($event.target as HTMLInputElement).value)"
        />
      </span>
      <slot name="panel">
        <XColorPickerPanel v-bind="panelProps" @update:model-value="commit" />
      </slot>
    </template>
  </div>
</template>
