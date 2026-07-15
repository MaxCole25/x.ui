<script setup lang="ts">
import { computed, inject, ref, useAttrs, watch } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { overlayZIndex } from '../../../_utils/zIndex'
import { inputSizePreset } from '../../../_utils/inputSize'
import { XBaseInput } from '../../../basic-components/base-input'
import { XDialog } from '../../../feedback-components/dialog'
import { XDatePickerPanel } from '../../date-picker-panel'
import { createPickerThemeVars, omitPickerThemeProps, pickPickerThemeProps } from '../../_utils/pickerTheme'
import { formContextKey } from '../../form/src/context'
import type { DatePickerProps } from './types'

defineOptions({
  name: 'XDatePicker',
  inheritAttrs: false
})

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  placeholder: '请选择日期',
  disabled: false,
  readonly: false,
  clearable: false,
  hideClearButton: false,
  status: 'default',
  textAlign: 'center',
  teleported: true,
  teleportTo: 'body',
  zIndex: overlayZIndex.dialog,
  showChinaFestivals: true,
  showActiveBorder: true
})

const attrs = useAttrs()
const form = inject(formContextKey, null)
const open = ref(false)
const panelYear = ref(new Date().getFullYear())
const panelMonth = ref(new Date().getMonth() + 1)
const datePickerStyle = computed(() => createElementStyleVars(props))
const dialogStyle = computed(() => createPickerThemeVars(props))
const datePanelThemeProps = computed(() => pickPickerThemeProps(props))
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: [value: string]
  change: [value: string]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const inputProps = computed(() => {
  const preset = inputSizePreset[mergedSize.value]
  const usesExplicitSize = props.size != null
  const next: Record<string, unknown> = {
    ...props,
    type: 'text' as const,
    disabled: mergedDisabled.value,
    size: mergedSize.value,
    fontSize: usesExplicitSize ? preset.fontSize : props.fontSize ?? preset.fontSize,
    height: usesExplicitSize ? preset.height : props.height ?? preset.height,
    padding: usesExplicitSize ? preset.padding : props.padding ?? preset.padding,
    radius: usesExplicitSize ? preset.radius : props.radius ?? preset.radius
  }

  delete next.showChinaFestivals
  delete next.festivals
  delete next.teleported
  delete next.teleportTo
  delete next.zIndex
  omitPickerThemeProps(next)

  return next
})

const selectedDate = computed(() => {
  const date = props.modelValue ? new Date(props.modelValue) : new Date()

  return Number.isNaN(date.getTime()) ? new Date() : date
})

const canOpen = computed(() => !mergedDisabled.value && !props.readonly)

const syncPanelDate = () => {
  panelYear.value = selectedDate.value.getFullYear()
  panelMonth.value = selectedDate.value.getMonth() + 1
}

const openPanel = () => {
  if (!canOpen.value) return

  syncPanelDate()
  open.value = true
}

const handleUpdate = (value: string | number) => {
  emit('update:modelValue', String(value))
}

const handleInput = (value: string | number) => {
  emit('input', String(value))
}

const handleChange = (value: string | number) => {
  emit('change', String(value))
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
}

const handleSelect = (value: string) => {
  emit('update:modelValue', value)
  emit('input', value)
  emit('change', value)
  open.value = false
}

const goMonth = (offset: number) => {
  const next = new Date(panelYear.value, panelMonth.value - 1 + offset, 1)
  panelYear.value = next.getFullYear()
  panelMonth.value = next.getMonth() + 1
}

const goYear = (offset: number) => {
  panelYear.value += offset
}

const selectToday = () => {
  const today = new Date()
  const value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  panelYear.value = today.getFullYear()
  panelMonth.value = today.getMonth() + 1
  handleSelect(value)
}

watch(
  () => props.modelValue,
  () => {
    if (open.value) {
      syncPanelDate()
    }
  }
)
</script>

<template>
  <div
    class="x-date-picker"
    :class="{ 'is-disabled': mergedDisabled, 'is-active-border-hidden': !props.showActiveBorder }"
    :style="datePickerStyle"
  >
    <XBaseInput
      v-bind="{ ...attrs, ...inputProps }"
      @update:model-value="handleUpdate"
      @input="handleInput"
      @change="handleChange"
      @clear="handleClear"
      @click="openPanel"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <template #prefix>
        <slot name="prefix">
          <i class="ri-calendar-line" aria-hidden="true"></i>
          <span v-if="props.prefix">{{ props.prefix }}</span>
        </slot>
      </template>
      <template v-if="$slots.suffix || props.suffix" #suffix>
        <slot name="suffix">
          {{ props.suffix }}
        </slot>
      </template>
    </XBaseInput>

    <XDialog
      v-model="open"
      title="选择日期"
      :width="360"
      :height="420"
      :min-width="320"
      :min-height="360"
      :draggable="true"
      :resizable="false"
      :teleported="props.teleported"
      :teleport-to="props.teleportTo"
      :z-index="props.zIndex"
      class="x-date-picker__dialog"
      :style="dialogStyle"
    >
      <div class="x-date-picker__panel-shell">
        <div class="x-date-picker__toolbar">
          <button type="button" class="x-date-picker__tool" aria-label="上一年" @click="goYear(-1)">
            <i class="ri-arrow-left-double-line" aria-hidden="true"></i>
          </button>
          <button type="button" class="x-date-picker__tool" aria-label="上个月" @click="goMonth(-1)">
            <i class="ri-arrow-left-s-line" aria-hidden="true"></i>
          </button>
          <div class="x-date-picker__current">{{ panelYear }} 年 {{ panelMonth }} 月</div>
          <button type="button" class="x-date-picker__tool" aria-label="下个月" @click="goMonth(1)">
            <i class="ri-arrow-right-s-line" aria-hidden="true"></i>
          </button>
          <button type="button" class="x-date-picker__tool" aria-label="下一年" @click="goYear(1)">
            <i class="ri-arrow-right-double-line" aria-hidden="true"></i>
          </button>
        </div>
        <XDatePickerPanel
          :model-value="props.modelValue"
          :year="panelYear"
          :month="panelMonth"
          :show-china-festivals="props.showChinaFestivals"
          :festivals="props.festivals"
          v-bind="datePanelThemeProps"
          @update:model-value="handleSelect"
        />
      </div>
      <template #footer>
        <div class="x-date-picker__footer">
          <button type="button" class="x-date-picker__today" @click="selectToday">今天</button>
        </div>
      </template>
    </XDialog>
  </div>
</template>
