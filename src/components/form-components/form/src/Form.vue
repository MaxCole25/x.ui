<script setup lang="ts">
import { computed, provide, ref, toRef } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import { formContextKey, type FormItemValidateContext } from './context'
import type { FormControlSize, FormProps, FormPublicSize, FormValidateCallback } from './types'

defineOptions({
  name: 'XForm'
})

const props = withDefaults(defineProps<FormProps>(), {
  disabled: false,
  size: 'md',
  inline: false,
  height: 'auto',
  labelWidth: '96px',
  labelPosition: 'right',
  loading: false
})

const emit = defineEmits<{
  validate: [prop: string, valid: boolean, message: string]
  submit: [event: SubmitEvent]
}>()

const itemMap = ref(new Map<string, FormItemValidateContext>())

const controlSize = computed<FormControlSize>(() => props.size)
const publicSize = computed<FormPublicSize>(() => props.size)

const registerItem = (item: FormItemValidateContext) => {
  itemMap.value.set(item.id, item)
}

const unregisterItem = (id: string) => {
  itemMap.value.delete(id)
}

// 字段注册表由 XFormItem 维护，表单方法统一从这里查找目标字段。
const getItems = (propsFilter?: string | string[]) => {
  const items = Array.from(itemMap.value.values())
  if (!propsFilter) return items

  const propsList = Array.isArray(propsFilter) ? propsFilter : [propsFilter]
  return items.filter((item) => item.prop && propsList.includes(item.prop))
}

// validate 与 validateField 共用同一套结果聚合逻辑，便于业务层 await。
const runValidate = async (items: FormItemValidateContext[], callback?: FormValidateCallback) => {
  const results = await Promise.all(items.map(async (item) => {
    const valid = await item.validate()
    emit('validate', item.prop ?? '', valid, item.getError())
    return [item.prop, valid, item.getError()] as const
  }))

  const errors = results.reduce<Record<string, string>>((acc, [prop, valid, message]) => {
    if (prop && !valid) acc[prop] = message
    return acc
  }, {})
  const valid = Object.keys(errors).length === 0
  callback?.(valid, errors)
  return valid
}

const validate = (callback?: FormValidateCallback) => runValidate(getItems(), callback)
const validateField = (propsFilter?: string | string[], callback?: FormValidateCallback) => runValidate(getItems(propsFilter), callback)

const resetFields = (propsFilter?: string | string[]) => {
  getItems(propsFilter).forEach((item) => item.resetField())
}

const clearValidate = (propsFilter?: string | string[]) => {
  getItems(propsFilter).forEach((item) => item.clearValidate())
}

const scrollToField = (prop: string) => {
  getItems(prop)[0]?.scrollIntoView()
}

provide(formContextKey, {
  disabled: toRef(props, 'disabled'),
  size: controlSize,
  publicSize,
  labelWidth: toRef(props, 'labelWidth'),
  labelPosition: toRef(props, 'labelPosition'),
  model: toRef(props, 'model'),
  rules: toRef(props, 'rules'),
  registerItem,
  unregisterItem
})

const formStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-form-height': toCssSize(props.height),
  '--x-form-color': props.accentColor,
  '--x-form-border-color': props.borderColor,
  '--x-form-border-width': toCssSize(props.borderWidth),
  '--x-form-bg': props.backgroundColor,
  '--x-form-text-color': props.textColor,
  '--x-form-radius': props.radius
}))

const handleSubmit = (event: SubmitEvent) => {
  emit('submit', event)
}

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
  scrollToField
})
</script>

<template>
  <form
    class="x-form"
    :class="[
      `x-form--${publicSize}`,
      `x-form--label-${props.labelPosition}`,
      {
        'x-form--inline': props.inline,
        'is-disabled': props.disabled,
        'is-loading': props.loading
      }
    ]"
    :style="formStyle"
    @submit.prevent="handleSubmit"
  >
    <slot />
    <div v-if="props.loading" class="x-form__loading" aria-live="polite">
      <span class="x-form__spinner" aria-hidden="true"></span>
      <span>加载中</span>
    </div>
  </form>
</template>
