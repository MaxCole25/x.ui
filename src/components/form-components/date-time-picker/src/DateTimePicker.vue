<script setup lang="ts">
import { computed, inject, nextTick, ref, useAttrs, watch } from 'vue'
import { createElementStyleVars } from '../../../_utils/elementStyle'
import { overlayZIndex } from '../../../_utils/zIndex'
import { inputSizePreset } from '../../../_utils/inputSize'
import { XBaseInput } from '../../../basic-components/base-input'
import { XDatePickerPanel } from '../../date-picker-panel'
import { XDialog } from '../../../feedback-components/dialog'
import { createPickerThemeVars, omitPickerThemeProps, pickPickerThemeProps } from '../../_utils/pickerTheme'
import { formContextKey } from '../../form/src/context'
import type { DateTimePickerProps } from './types'

defineOptions({
  name: 'XDateTimePicker',
  inheritAttrs: false
})

const props = withDefaults(defineProps<DateTimePickerProps>(), {
  modelValue: '',
  placeholder: '请选择日期时间',
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
const draftDate = ref('')
const draftHour = ref('00')
const draftMinute = ref('00')
const hourListRef = ref<HTMLElement | null>(null)
const minuteListRef = ref<HTMLElement | null>(null)
const timeScrollTimers: Partial<Record<'hour' | 'minute', number>> = {}
const dateTimePickerStyle = computed(() => createElementStyleVars(props))
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

const normalizeDateTimeValue = (value?: string) =>
  String(value ?? '').replace(/^(\d{4}-\d{2}-\d{2})T(\d{1,2}:\d{1,2})/, '$1 $2')

const inputProps = computed(() => {
  const preset = inputSizePreset[mergedSize.value]
  const usesExplicitSize = props.size != null
  const next: Record<string, unknown> = {
    ...props,
    modelValue: normalizeDateTimeValue(props.modelValue),
    type: 'text' as const,
    disabled: mergedDisabled.value,
    size: mergedSize.value,
    fontSize: usesExplicitSize ? preset.fontSize : props.fontSize ?? preset.fontSize,
    height: usesExplicitSize ? preset.height : props.height ?? preset.height,
    padding: usesExplicitSize ? preset.padding : props.padding ?? preset.padding,
    radius: usesExplicitSize ? preset.radius : props.radius ?? preset.radius
  }

  delete next.showChinaFestivals
  delete next.teleported
  delete next.teleportTo
  delete next.zIndex
  delete next.festivals
  omitPickerThemeProps(next)

  return next
})

const canOpen = computed(() => !mergedDisabled.value && !props.readonly)
const hours = computed(() => Array.from({ length: 24 }, (_, index) => padTime(index)))
const minutes = computed(() => Array.from({ length: 60 }, (_, index) => padTime(index)))

const padTime = (value: number) => String(value).padStart(2, '0')

const formatDate = (date: Date) => `${date.getFullYear()}-${padTime(date.getMonth() + 1)}-${padTime(date.getDate())}`

const parseValue = (value?: string) => {
  const [datePart, timePart] = normalizeDateTimeValue(value).split(/\s+/)
  const parsedDate = datePart ? new Date(datePart) : new Date()
  const safeDate = Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate
  const [hour = '00', minute = '00'] = (timePart ?? '').split(':')

  return {
    date: datePart && !Number.isNaN(parsedDate.getTime()) ? datePart : formatDate(safeDate),
    hour: padTime(Math.min(Math.max(Number.parseInt(hour, 10) || 0, 0), 23)),
    minute: padTime(Math.min(Math.max(Number.parseInt(minute, 10) || 0, 0), 59))
  }
}

const syncDraft = () => {
  const parsed = parseValue(props.modelValue)
  const date = new Date(parsed.date)

  draftDate.value = parsed.date
  draftHour.value = parsed.hour
  draftMinute.value = parsed.minute
  panelYear.value = date.getFullYear()
  panelMonth.value = date.getMonth() + 1
}

const openPanel = () => {
  if (!canOpen.value) return

  syncDraft()
  open.value = true
  nextTick(() => {
    scrollTimeColumn('hour')
    scrollTimeColumn('minute')
  })
}

const handleUpdate = (value: string | number) => {
  emit('update:modelValue', normalizeDateTimeValue(String(value)))
}

const handleInput = (value: string | number) => {
  emit('input', normalizeDateTimeValue(String(value)))
}

const handleChange = (value: string | number) => {
  emit('change', normalizeDateTimeValue(String(value)))
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('input', '')
  emit('clear')
}

const goMonth = (offset: number) => {
  const next = new Date(panelYear.value, panelMonth.value - 1 + offset, 1)
  panelYear.value = next.getFullYear()
  panelMonth.value = next.getMonth() + 1
}

const goYear = (offset: number) => {
  panelYear.value += offset
}

const selectDate = (value: string) => {
  draftDate.value = value
}

const setTime = (target: 'hour' | 'minute', value: string) => {
  if (target === 'hour') {
    draftHour.value = value
  } else {
    draftMinute.value = value
  }

  nextTick(() => scrollTimeColumn(target))
}

const scrollTimeColumn = (target: 'hour' | 'minute') => {
  const list = target === 'hour' ? hourListRef.value : minuteListRef.value
  const value = target === 'hour' ? draftHour.value : draftMinute.value
  const index = Number.parseInt(value, 10)

  if (!list || Number.isNaN(index)) return

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

const handleTimeScroll = (target: 'hour' | 'minute') => {
  const list = target === 'hour' ? hourListRef.value : minuteListRef.value
  const max = target === 'hour' ? 23 : 59

  if (!list) return

  const index = Math.min(Math.max(Math.round(list.scrollTop / 44), 0), max)
  const value = padTime(index)

  if (target === 'hour') {
    if (draftHour.value !== value) {
      draftHour.value = value
    }
  } else if (draftMinute.value !== value) {
    draftMinute.value = value
  }

  window.clearTimeout(timeScrollTimers[target])
  timeScrollTimers[target] = window.setTimeout(() => scrollTimeColumn(target), 120)
}

const selectNow = () => {
  const now = new Date()
  draftDate.value = formatDate(now)
  draftHour.value = padTime(now.getHours())
  draftMinute.value = padTime(now.getMinutes())
  panelYear.value = now.getFullYear()
  panelMonth.value = now.getMonth() + 1
  nextTick(() => {
    scrollTimeColumn('hour')
    scrollTimeColumn('minute')
  })
}

const confirm = () => {
  const value = `${draftDate.value} ${draftHour.value}:${draftMinute.value}`

  emit('update:modelValue', value)
  emit('input', value)
  emit('change', value)
  open.value = false
}

watch(
  () => props.modelValue,
  () => {
    if (open.value) {
      syncDraft()
    }
  }
)
</script>

<template>
  <div
    class="x-date-time-picker"
    :class="{ 'is-disabled': mergedDisabled, 'is-active-border-hidden': !props.showActiveBorder }"
    :style="dateTimePickerStyle"
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
          <i class="ri-calendar-schedule-line" aria-hidden="true"></i>
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
      title="选择日期时间"
      :width="520"
      :height="440"
      :min-width="500"
      :min-height="420"
      :draggable="true"
      :resizable="false"
      :teleported="props.teleported"
      :teleport-to="props.teleportTo"
      :z-index="props.zIndex"
      class="x-date-time-picker__dialog"
      :style="dialogStyle"
    >
      <div class="x-date-time-picker__panel-shell">
        <div class="x-date-time-picker__calendar">
          <div class="x-date-time-picker__toolbar">
            <button type="button" class="x-date-time-picker__tool" aria-label="上一年" @click="goYear(-1)">
              <i class="ri-arrow-left-double-line" aria-hidden="true"></i>
            </button>
            <button type="button" class="x-date-time-picker__tool" aria-label="上个月" @click="goMonth(-1)">
              <i class="ri-arrow-left-s-line" aria-hidden="true"></i>
            </button>
            <div class="x-date-time-picker__current">{{ panelYear }} 年 {{ panelMonth }} 月</div>
            <button type="button" class="x-date-time-picker__tool" aria-label="下个月" @click="goMonth(1)">
              <i class="ri-arrow-right-s-line" aria-hidden="true"></i>
            </button>
            <button type="button" class="x-date-time-picker__tool" aria-label="下一年" @click="goYear(1)">
              <i class="ri-arrow-right-double-line" aria-hidden="true"></i>
            </button>
          </div>

          <XDatePickerPanel
            :model-value="draftDate"
            :year="panelYear"
            :month="panelMonth"
            :show-china-festivals="props.showChinaFestivals"
            :festivals="props.festivals"
            v-bind="datePanelThemeProps"
            @update:model-value="selectDate"
          />
        </div>

        <div class="x-date-time-picker__time" aria-label="时间选择">
          <div class="x-date-time-picker__time-column">
            <div class="x-date-time-picker__time-label">时</div>
            <div ref="hourListRef" class="x-date-time-picker__time-list" @scroll="handleTimeScroll('hour')">
              <button
                v-for="hour in hours"
                :key="hour"
                type="button"
                class="x-date-time-picker__time-option"
                :class="{ 'is-active': draftHour === hour }"
                @click="setTime('hour', hour)"
              >
                {{ hour }}
              </button>
            </div>
          </div>

          <div class="x-date-time-picker__time-column">
            <div class="x-date-time-picker__time-label">分</div>
            <div ref="minuteListRef" class="x-date-time-picker__time-list" @scroll="handleTimeScroll('minute')">
              <button
                v-for="minute in minutes"
                :key="minute"
                type="button"
                class="x-date-time-picker__time-option"
                :class="{ 'is-active': draftMinute === minute }"
                @click="setTime('minute', minute)"
              >
                {{ minute }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="x-date-time-picker__footer">
          <button type="button" class="x-date-time-picker__secondary" @click="selectNow">此刻</button>
          <button type="button" class="x-date-time-picker__primary" @click="confirm">确定</button>
        </div>
      </template>
    </XDialog>
  </div>
</template>
