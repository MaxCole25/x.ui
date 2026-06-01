<script setup lang="ts">
import { computed, inject, nextTick, ref, useAttrs, watch } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { inputSizePreset } from '../../../_utils/inputSize'
import { XBaseInput } from '../../../basic-components/base-input'
import { XDialog } from '../../../feedback-components/dialog'
import { createPickerThemeVars, omitPickerThemeProps } from '../../_utils/pickerTheme'
import { formContextKey } from '../../form/src/context'
import type { TimeSelectProps } from './types'

defineOptions({
  name: 'XTimeSelect',
  inheritAttrs: false
})

const props = withDefaults(defineProps<TimeSelectProps>(), {
  modelValue: '',
  start: '09:00',
  end: '18:00',
  stepMinutes: 30,
  placeholder: '请选择时间',
  disabled: false,
  readonly: false,
  clearable: false,
  hideClearButton: false,
  status: 'default',
  textAlign: 'center',
  showActiveBorder: true
})

const attrs = useAttrs()
const form = inject(formContextKey, null)
const open = ref(false)
const draftValue = ref('')
const optionListRef = ref<HTMLElement | null>(null)
const optionScrollTimer = ref<number>()
const timeSelectStyle = computed(() => createElementStyleVars(props))
const dialogStyle = computed(() => createPickerThemeVars(props))
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

  omitPickerThemeProps(next)

  return next
})

const canOpen = computed(() => !mergedDisabled.value && !props.readonly)

const padTime = (value: number) => String(value).padStart(2, '0')

const toMinutes = (value: string) => {
  const [hour = 0, minute = 0] = value.split(':').map(Number)

  return Math.min(Math.max((hour || 0) * 60 + (minute || 0), 0), 24 * 60 - 1)
}

const formatMinutes = (value: number) => `${padTime(Math.floor(value / 60))}:${padTime(value % 60)}`

const options = computed(() => {
  const result: string[] = []
  const start = toMinutes(props.start)
  const end = toMinutes(props.end)
  const step = Math.max(Number(props.stepMinutes) || 1, 1)

  for (let current = start; current <= end; current += step) {
    result.push(formatMinutes(current))
  }

  return result
})

const syncDraft = () => {
  draftValue.value = options.value.includes(props.modelValue ?? '') ? props.modelValue ?? '' : options.value[0] ?? ''
}

const scrollOption = () => {
  const list = optionListRef.value
  const index = options.value.indexOf(draftValue.value)

  if (!list || index < 0) return

  const top = index * 44

  if (typeof list.scrollTo === 'function') {
    list.scrollTo({
      top,
      behavior: 'auto'
    })
    return
  }

  list.scrollTop = top
}

const openPanel = () => {
  if (!canOpen.value) return

  syncDraft()
  open.value = true
  nextTick(scrollOption)
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

const selectOption = (value: string) => {
  draftValue.value = value
  nextTick(scrollOption)
}

const handleOptionScroll = () => {
  const list = optionListRef.value

  if (!list || !options.value.length) return

  const index = Math.min(Math.max(Math.round(list.scrollTop / 44), 0), options.value.length - 1)
  const value = options.value[index]

  if (draftValue.value !== value) {
    draftValue.value = value
  }

  window.clearTimeout(optionScrollTimer.value)
  optionScrollTimer.value = window.setTimeout(scrollOption, 120)
}

const selectNow = () => {
  const now = new Date()
  const current = toMinutes(`${padTime(now.getHours())}:${padTime(now.getMinutes())}`)
  const nearest = options.value.reduce((next, option) => {
    if (!next) return option

    return Math.abs(toMinutes(option) - current) < Math.abs(toMinutes(next) - current) ? option : next
  }, '')

  draftValue.value = nearest
  nextTick(scrollOption)
}

const confirm = () => {
  const value = draftValue.value

  emit('update:modelValue', value)
  emit('input', value)
  emit('change', value)
  open.value = false
}

watch(
  () => [props.modelValue, props.start, props.end, props.stepMinutes],
  () => {
    if (open.value) {
      syncDraft()
      nextTick(scrollOption)
    }
  }
)
</script>

<template>
  <div
    class="x-time-select"
    :class="{ 'is-disabled': mergedDisabled, 'is-active-border-hidden': !props.showActiveBorder }"
    :style="timeSelectStyle"
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
          <i class="ri-time-line" aria-hidden="true"></i>
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
      title="选择时间"
      :width="240"
      :height="440"
      :min-width="220"
      :min-height="420"
      :draggable="true"
      :resizable="false"
      class="x-time-select__dialog"
      :style="dialogStyle"
    >
      <div class="x-time-select__panel-shell">
        <div class="x-time-select__time" aria-label="时间选择">
          <div class="x-time-select__time-column">
            <div class="x-time-select__time-label">时间</div>
            <div ref="optionListRef" class="x-time-select__time-list" @scroll="handleOptionScroll">
              <button
                v-for="option in options"
                :key="option"
                type="button"
                class="x-time-select__time-option"
                :class="{ 'is-active': draftValue === option }"
                @click="selectOption(option)"
              >
                {{ option }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="x-time-select__footer">
          <button type="button" class="x-time-select__secondary" @click="selectNow">此刻</button>
          <button type="button" class="x-time-select__primary" @click="confirm">确定</button>
        </div>
      </template>
    </XDialog>
  </div>
</template>
