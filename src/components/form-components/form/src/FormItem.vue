<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { formContextKey, formItemContextKey } from './context'
import type { FormControlSize, FormItemAlign, FormItemHorizontalAlign, FormItemProps, FormItemRule, FormItemStyle, FormLabelPosition, FormPublicSize, FormSize } from './types'

defineOptions({
  name: 'XFormItem'
})

const props = withDefaults(defineProps<FormItemProps>(), {
  required: false,
  loading: false,
  contentFillHeight: false,
  align: 'start'
})

const emit = defineEmits<{
  validate: [valid: boolean, message: string]
}>()

const form = inject(formContextKey, null)
const id = `x-field-${Math.random().toString(36).slice(2, 10)}`
const itemRef = ref<HTMLElement>()
const validateMessage = ref('')
const initialValue = ref<unknown>()

const controlSizeMap: Record<FormSize, FormControlSize> = {
  sm: 'sm',
  md: 'md',
  lg: 'lg'
}

const mergedPublicSize = computed<FormPublicSize>(() => props.size ?? form?.publicSize.value ?? 'md')
const mergedControlSize = computed<FormControlSize>(() => controlSizeMap[props.size ?? mergedPublicSize.value])
const mergedDisabled = computed(() => props.disabled || Boolean(form?.disabled.value))
const mergedLabelPosition = computed<FormLabelPosition>(() => props.labelPosition ?? form?.labelPosition.value ?? 'right')
const mergedAlign = computed<FormItemAlign>(() => props.align)
const displayError = computed(() => props.error ?? validateMessage.value)

const fieldJustifyMap: Record<NonNullable<FormItemProps['contentJustify']>, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'flex-start'
}

const labelJustifyMap: Record<FormItemHorizontalAlign, string> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
}

provide(formItemContextKey, {
  id,
  prop: props.prop,
  label: props.label
})

if (form) {
  provide(formContextKey, {
    ...form,
    disabled: computed(() => mergedDisabled.value),
    size: mergedControlSize,
    publicSize: computed(() => mergedPublicSize.value),
    labelPosition: computed(() => mergedLabelPosition.value)
  })
}

const labelBaseStyle = computed<Record<string, string> | undefined>(() => {
  const width = props.labelWidth ?? form?.labelWidth.value
  const style: Record<string, string> = {}

  if (width != null && mergedLabelPosition.value !== 'top') {
    style.width = typeof width === 'number' ? `${width}px` : width
  }

  if (props.labelAlign) {
    style['--x-form-item-label-align'] = props.labelAlign
    style['--x-form-item-label-justify'] = labelJustifyMap[props.labelAlign]
  }

  return Object.keys(style).length > 0 ? style : undefined
})

const labelStyle = computed<FormItemStyle | FormItemStyle[] | undefined>(() => {
  if (!labelBaseStyle.value) return props.labelStyle
  return props.labelStyle ? [labelBaseStyle.value, props.labelStyle] : labelBaseStyle.value
})

const contentBaseStyle = computed<Record<string, string> | undefined>(() => {
  const style: Record<string, string> = {}

  if (props.contentAlign) {
    style['--x-form-item-content-align'] = props.contentAlign
  }

  if (props.contentJustify) {
    style['--x-form-item-content-justify'] = props.contentJustify
    style['--x-form-item-field-justify'] = fieldJustifyMap[props.contentJustify]
  }

  return Object.keys(style).length > 0 ? style : undefined
})

const contentStyle = computed<FormItemStyle | FormItemStyle[] | undefined>(() => {
  if (!contentBaseStyle.value) return props.contentStyle
  return props.contentStyle ? [contentBaseStyle.value, props.contentStyle] : contentBaseStyle.value
})

const itemThemeStyle = computed<Record<string, string> | undefined>(() => {
  const style: Record<string, string> = {}
  const labelColor = props.labelTextColor ?? props.labelColor
  const hintColor = props.hintTextColor ?? props.descriptionTextColor

  if (labelColor) style['--x-form-item-label-color'] = labelColor
  if (props.contentTextColor) style['--x-form-item-content-color'] = props.contentTextColor
  if (props.backgroundColor) style['--x-form-item-bg'] = props.backgroundColor
  if (props.borderColor) style['--x-form-item-border-color'] = props.borderColor
  if (props.requiredMarkColor) style['--x-form-item-required-color'] = props.requiredMarkColor
  if (props.errorTextColor) style['--x-form-item-error-color'] = props.errorTextColor
  if (hintColor) style['--x-form-item-hint-color'] = hintColor

  return Object.keys(style).length > 0 ? style : undefined
})

const readModelValue = () => {
  if (!props.prop || !form?.model.value) return undefined
  // 支持 user.name 这类点路径，满足常见嵌套表单字段。
  return props.prop.split('.').reduce<unknown>((target, key) => {
    if (target == null || typeof target !== 'object') return undefined
    return (target as Record<string, unknown>)[key]
  }, form.model.value)
}

const writeModelValue = (value: unknown) => {
  if (!props.prop || !form?.model.value) return
  const keys = props.prop.split('.')
  const lastKey = keys.pop()
  if (!lastKey) return

  const target = keys.reduce<Record<string, unknown> | undefined>((acc, key) => {
    const next = acc?.[key]
    return next && typeof next === 'object' ? next as Record<string, unknown> : undefined
  }, form.model.value)

  if (target) {
    target[lastKey] = value
  }
}

const normalizeRules = computed<FormItemRule[]>(() => {
  const formRules = props.prop ? form?.rules.value?.[props.prop] : undefined
  // 表单 rules、表单项 rules 与 required 标记合并为单字段校验规则。
  const rules = [
    ...(Array.isArray(formRules) ? formRules : formRules ? [formRules] : []),
    ...(props.rules ?? [])
  ]

  if (props.required && !rules.some((rule) => rule.required)) {
    rules.unshift({ required: true, message: `${props.label ?? '该字段'}不能为空` })
  }

  return rules
})

const isRequired = computed(() => props.required || normalizeRules.value.some((rule) => rule.required))

const isEmptyValue = (value: unknown) => value == null || value === '' || (Array.isArray(value) && value.length === 0)

const runRule = async (rule: FormItemRule, value: unknown) => {
  if (rule.required && isEmptyValue(value)) return rule.message ?? `${props.label ?? '该字段'}不能为空`
  if (isEmptyValue(value)) return ''

  const textValue = String(value)
  if (rule.len != null && textValue.length !== rule.len) return rule.message ?? `${props.label ?? '该字段'}长度必须为 ${rule.len}`
  if (rule.min != null && textValue.length < rule.min) return rule.message ?? `${props.label ?? '该字段'}长度不能少于 ${rule.min}`
  if (rule.max != null && textValue.length > rule.max) return rule.message ?? `${props.label ?? '该字段'}长度不能超过 ${rule.max}`
  if (rule.pattern && !rule.pattern.test(textValue)) return rule.message ?? `${props.label ?? '该字段'}格式不正确`

  if (rule.validator) {
    const result = await rule.validator(rule, value, form?.model.value)
    if (result === false) return rule.message ?? `${props.label ?? '该字段'}校验失败`
    if (typeof result === 'string') return result
    if (result instanceof Error) return result.message
  }

  return ''
}

const validate = async () => {
  for (const rule of normalizeRules.value) {
    const message = await runRule(rule, readModelValue())
    if (message) {
      validateMessage.value = message
      emit('validate', false, message)
      return false
    }
  }

  validateMessage.value = ''
  emit('validate', true, '')
  return true
}

const resetField = () => {
  writeModelValue(initialValue.value)
  validateMessage.value = ''
}

const clearValidate = () => {
  validateMessage.value = ''
}

const scrollIntoView = () => {
  itemRef.value?.scrollIntoView({ block: 'center', behavior: 'smooth' })
}

onMounted(() => {
  initialValue.value = readModelValue()
  form?.registerItem({
    id,
    prop: props.prop,
    validate,
    resetField,
    clearValidate,
    scrollIntoView,
    getError: () => displayError.value
  })
})

onBeforeUnmount(() => {
  form?.unregisterItem(id)
})
</script>

<template>
  <div
    ref="itemRef"
    class="x-form-item"
    :style="itemThemeStyle"
    :class="[
      `x-form-item--${mergedPublicSize}`,
      `x-form-item--label-${mergedLabelPosition}`,
      {
        'x-form-item--align-center': mergedAlign === 'center',
        'x-form-item--content-fill-height': props.contentFillHeight,
        'is-required': isRequired,
        'is-error': Boolean(displayError),
        'is-disabled': mergedDisabled,
        'is-loading': props.loading
      }
    ]"
  >
    <label
      v-if="props.label || $slots.label"
      class="x-form-item__label"
      :class="props.labelClass"
      :for="id"
      :style="labelStyle"
    >
      <slot name="label">{{ props.label }}</slot>
    </label>
    <div class="x-form-item__content" :class="props.contentClass" :style="contentStyle">
      <div class="x-form-item__field">
        <slot />
      </div>
      <div v-if="displayError || $slots.error" class="x-form-item__error" role="alert">
        <slot name="error">{{ displayError }}</slot>
      </div>
      <div v-else-if="props.help || $slots.help" class="x-form-item__help">
        <slot name="help">{{ props.help }}</slot>
      </div>
    </div>
  </div>
</template>
