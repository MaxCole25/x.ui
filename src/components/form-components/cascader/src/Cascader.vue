<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { formContextKey, formItemContextKey } from '../../form/src/context'
import type { SelectOptionValue } from '../../select'
import type { CascaderOption, CascaderOptionSource, CascaderProps, CascaderSize } from './types'

defineOptions({
  name: 'XCascader',
  inheritAttrs: false
})

const props = withDefaults(defineProps<CascaderProps>(), {
  modelValue: () => [],
  options: () => [],
  fieldNames: () => ({}),
  displayField: 'label',
  remote: false,
  loading: false,
  loadingText: '加载中',
  emptyText: '暂无数据',
  placeholder: '请选择',
  disabled: false,
  readonly: false,
  clearable: false,
  hideClearButton: false,
  status: 'default',
  size: undefined,
  textAlign: 'left',
  separator: ' / ',
  changeOnSelect: false,
  showActiveBorder: true
})

const emit = defineEmits<{
  'update:modelValue': [value: SelectOptionValue[]]
  change: [value: SelectOptionValue[]]
  clear: []
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  query: [option: CascaderOption | undefined, path: CascaderOption[]]
}>()

const form = inject(formContextKey, null)
const formItem = inject(formItemContextKey, null)
const open = ref(false)
const activePath = ref<CascaderOption[]>([])
const remoteRootOptions = ref<CascaderOption[]>([])
const remoteChildren = ref(new Map<string, CascaderOption[]>())
const remoteLoading = ref(false)
let remoteRequestId = 0
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedSize = computed(() => props.size ?? form?.size.value ?? 'md')
const canInteract = computed(() => !mergedDisabled.value && !props.readonly)

const sizePreset: Record<CascaderSize, Pick<CascaderProps, 'fontSize' | 'height' | 'padding' | 'radius'>> = {
  sm: {
    fontSize: 10,
    height: 22,
    padding: '0 4px',
    radius: '4px'
  },
  md: {
    fontSize: 12,
    height: 30,
    padding: '0 8px',
    radius: '6px'
  },
  lg: {
    fontSize: 14,
    height: 38,
    padding: '0 10px',
    radius: '8px'
  }
}

const findPath = (
  options: CascaderOption[],
  values: SelectOptionValue[],
  depth = 0,
  path: CascaderOption[] = []
): CascaderOption[] => {
  const target = values[depth]
  const option = options.find((item) => item.value === target)
  if (!option) return path

  const nextPath = [...path, option]
  if (depth >= values.length - 1) return nextPath

  return findPath(option.children ?? [], values, depth + 1, nextPath)
}

const getPathKey = (path: CascaderOption[]) => path.map((item) => String(item.value)).join('__x_cascader__')

const normalizeOptions = (options: CascaderOptionSource[], path: CascaderOption[] = []): CascaderOption[] => {
  const labelKey = props.fieldNames.label ?? 'label'
  const valueKey = props.fieldNames.value ?? 'value'
  const disabledKey = props.fieldNames.disabled ?? 'disabled'
  const childrenKey = props.fieldNames.children ?? 'children'

  return options.map((source) => {
    const optionSource = source as Record<string, unknown>
    const rawLabel = optionSource[labelKey]
    const rawValue = optionSource[valueKey]
    const label = rawLabel == null ? String(rawValue ?? '') : String(rawLabel)
    const value = rawValue == null ? label : rawValue
    const option: CascaderOption = {
      label,
      value: value as SelectOptionValue
    }
    if (Object.prototype.hasOwnProperty.call(optionSource, disabledKey)) {
      option.disabled = Boolean(optionSource[disabledKey])
    }
    const rawChildren = optionSource[childrenKey]
    if (Array.isArray(rawChildren)) {
      option.children = normalizeOptions(rawChildren as CascaderOptionSource[], [...path, option])
    }

    const loadedChildren = remoteChildren.value.get(getPathKey([...path, option]))
    if (loadedChildren?.length) {
      option.children = loadedChildren
    }

    return option
  })
}

const propOptions = computed(() => normalizeOptions(props.options))
const rootOptions = computed(() => {
  if (props.remote) {
    return remoteRootOptions.value.length ? remoteRootOptions.value : propOptions.value
  }

  return propOptions.value
})
const selectedPath = computed(() => findPath(rootOptions.value, props.modelValue ?? []))
const getOptionDisplayText = (option: CascaderOption) => String(option[props.displayField])
const selectedLabels = computed(() => selectedPath.value.map(getOptionDisplayText))
const selectedText = computed(() => selectedLabels.value.join(props.separator))
const displayPath = computed(() => (open.value && activePath.value.length ? activePath.value : selectedPath.value))

const columns = computed(() => {
  const result: CascaderOption[][] = [rootOptions.value]
  displayPath.value.forEach((option) => {
    if (option.children?.length) result.push(option.children)
  })
  return result
})

const showClear = computed(() =>
  props.clearable &&
  !props.hideClearButton &&
  Boolean(selectedPath.value.length) &&
  canInteract.value
)
const isLoading = computed(() => props.loading || remoteLoading.value)

const cascaderStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-cascader-color': props.color ?? props.activeBorderColor,
  '--x-cascader-active-border-color': props.activeBorderColor ?? props.color,
  '--x-cascader-border-color': props.borderColor,
  '--x-cascader-hover-border-color': props.borderColor,
  '--x-cascader-border-width': toCssSize(props.borderWidth),
  '--x-cascader-radius': props.radius ?? sizePreset[mergedSize.value].radius,
  '--x-cascader-bg': props.backgroundColor ?? props.background,
  '--x-cascader-text-color': props.textColor,
  '--x-cascader-disabled-bg': props.disabledBackgroundColor,
  '--x-cascader-disabled-text-color': props.disabledTextColor,
  '--x-cascader-font-family': props.fontFamily,
  '--x-cascader-font-size': toCssSize(props.fontSize ?? sizePreset[mergedSize.value].fontSize),
  '--x-cascader-height': props.autoHeight ? 'auto' : toCssSize(props.height ?? sizePreset[mergedSize.value].height),
  '--x-cascader-padding': toCssSize(props.padding ?? sizePreset[mergedSize.value].padding),
  '--x-cascader-text-align': props.textAlign,
  '--x-cascader-clear-icon-color': props.clearIconColor,
  '--x-cascader-clear-icon-size': toCssSize(props.clearIconSize)
}))

const commit = (value: SelectOptionValue[]) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const loadRemoteOptions = async (option?: CascaderOption, path: CascaderOption[] = []) => {
  if (!props.remote || !props.remoteMethod) return

  emit('query', option, path)
  const requestId = ++remoteRequestId
  remoteLoading.value = true

  try {
    const result = await props.remoteMethod(option, path)
    if (requestId !== remoteRequestId || !Array.isArray(result)) return

    const normalized = normalizeOptions(result, path)
    if (option) {
      const next = new Map(remoteChildren.value)
      next.set(getPathKey(path), normalized)
      remoteChildren.value = next
      option.children = normalized
    } else {
      remoteRootOptions.value = normalized
    }
  } finally {
    if (requestId === remoteRequestId) {
      remoteLoading.value = false
    }
  }
}

const choose = async (option: CascaderOption, columnIndex: number) => {
  if (option.disabled || !canInteract.value) return

  const nextPath = [...displayPath.value.slice(0, columnIndex), option]
  activePath.value = nextPath
  if (props.remote && props.remoteMethod && !option.children?.length) {
    await loadRemoteOptions(option, nextPath)
  }

  if (props.changeOnSelect || !option.children?.length) {
    commit(nextPath.map((item) => item.value))
  }

  if (!option.children?.length) {
    open.value = false
  }
}

const clear = () => {
  if (!showClear.value) return

  activePath.value = []
  commit([])
  emit('clear')
}

const toggle = () => {
  if (!canInteract.value) return

  open.value = !open.value
  if (open.value) {
    void loadRemoteOptions()
  }
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  window.setTimeout(() => {
    open.value = false
  }, 120)
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    open.value = false
  }
}

watch(open, (value) => {
  if (value) {
    activePath.value = selectedPath.value
  }
})
</script>

<template>
  <div
    v-bind="$attrs"
    class="x-cascader"
    :class="[
      `x-cascader--${mergedSize}`,
      `x-cascader--${props.status}`,
      {
        'is-open': open,
        'is-disabled': mergedDisabled,
        'is-readonly': props.readonly,
        'is-auto-width': props.autoWidth,
        'is-auto-height': props.autoHeight,
        'is-active-border-hidden': !props.showActiveBorder
      }
    ]"
    :style="cascaderStyle"
    @keydown="handleKeydown"
  >
    <button
      :id="props.id ?? formItem?.id"
      type="button"
      class="x-cascader__control"
      :disabled="mergedDisabled"
      :name="props.name"
      :aria-expanded="open"
      :aria-readonly="props.readonly || undefined"
      aria-haspopup="listbox"
      @focus="handleFocus"
      @click="toggle"
      @blur="handleBlur"
    >
      <span v-if="$slots.prefix || props.prefix" class="x-cascader__affix x-cascader__prefix">
        <slot name="prefix">{{ props.prefix }}</slot>
      </span>
      <span v-if="selectedText" class="x-cascader__value" :title="selectedText">{{ selectedText }}</span>
      <span v-else class="x-cascader__placeholder">{{ props.placeholder }}</span>
      <span
        v-if="showClear"
        class="x-cascader__clear"
        role="button"
        tabindex="-1"
        aria-label="清空"
        @mousedown.prevent
        @click.stop="clear"
      >
        <i class="ri-close-circle-line" aria-hidden="true"></i>
      </span>
      <span class="x-cascader__arrow" aria-hidden="true">
        <i class="ri-arrow-down-s-line"></i>
      </span>
      <span v-if="$slots.suffix || props.suffix" class="x-cascader__affix x-cascader__suffix">
        <slot name="suffix">{{ props.suffix }}</slot>
      </span>
    </button>

    <div v-show="open" class="x-cascader__panel" role="listbox">
      <div v-if="isLoading" class="x-cascader__empty">{{ props.loadingText }}</div>
      <div v-else-if="!rootOptions.length" class="x-cascader__empty">{{ props.emptyText }}</div>
      <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="x-cascader__column">
        <button
          v-for="option in column"
          :key="String(option.value)"
          type="button"
          class="x-cascader__option"
          :class="{
            'is-active': displayPath[columnIndex]?.value === option.value,
            'is-disabled': option.disabled
          }"
          role="option"
          :aria-selected="displayPath[columnIndex]?.value === option.value"
          :disabled="option.disabled"
          @mousedown.prevent
          @click="choose(option, columnIndex)"
        >
          <span>{{ getOptionDisplayText(option) }}</span>
          <span v-if="option.children?.length" aria-hidden="true">
            <i class="ri-arrow-right-s-line"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
