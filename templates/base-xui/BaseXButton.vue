<script setup lang="ts">
import { computed, type Component } from 'vue'
import { XButton, type ButtonVariant } from 'x.ui'
import { normalizeBaseXSize, type BaseXSize } from './xSize'

defineOptions({
  name: 'BaseXButton',
  inheritAttrs: false,
})

type BaseXButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

const props = withDefaults(
  defineProps<{
    size?: BaseXSize
    type?: BaseXButtonType
    variant?: ButtonVariant
    icon?: Component | string
    width?: number | string
    height?: number | string
    disabled?: boolean
    loading?: boolean
    link?: boolean
    text?: boolean
    plain?: boolean
    circle?: boolean
  }>(),
  {
    size: undefined,
    type: 'default',
    variant: undefined,
    icon: undefined,
    width: undefined,
    height: undefined,
    disabled: false,
    loading: false,
    link: false,
    text: false,
    plain: false,
    circle: false,
  },
)

const normalizedSize = computed(() => normalizeBaseXSize(props.size))

function toCssSize(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

const resolvedVariant = computed<ButtonVariant>(() => {
  if (props.variant) {
    return props.variant
  }
  if (props.link || props.text) {
    return 'ghost'
  }
  if (props.plain || props.type === 'default' || props.type === 'info') {
    return 'outline'
  }
  return 'solid'
})

const colorVars = computed(() => {
  if (props.type === 'default') {
    return {
      backgroundColor: props.link || props.text ? 'transparent' : 'var(--color-surface)',
      borderColor: props.link || props.text ? 'transparent' : 'var(--color-border)',
      textColor: 'var(--color-text-2)',
    }
  }

  const tokenMap: Record<Exclude<BaseXButtonType, 'default'>, string> = {
    primary: 'var(--color-primary-600)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-danger)',
    info: 'var(--color-text-muted)',
  }
  const token = tokenMap[props.type]

  if (resolvedVariant.value === 'solid') {
    return {
      backgroundColor: token,
      borderColor: token,
      textColor: '#ffffff',
    }
  }

  return {
    backgroundColor: 'transparent',
    borderColor: props.link || props.text ? 'transparent' : token,
    textColor: token,
  }
})

const buttonStyle = computed(() => {
  const size = normalizedSize.value
  const height = props.height ?? `var(--component-size-${size}-height)`
  const width = props.circle ? height : props.width

  return {
    '--base-x-button-height': toCssSize(height),
    '--base-x-button-font-size': `var(--component-size-${size}-font-size)`,
    '--base-x-button-padding': props.circle ? '0' : `var(--component-size-${size}-padding)`,
    '--base-x-button-radius': props.circle ? '999px' : `var(--component-size-${size}-radius)`,
    '--base-x-button-width': width ? toCssSize(width) : 'auto',
  }
})

const buttonClass = computed(() => [
  'base-x-button',
  `base-x-button--${normalizedSize.value}`,
  `base-x-button--${props.type}`,
  {
    'is-circle': props.circle,
    'is-link': props.link || props.text,
    'is-plain': props.plain,
  },
])

const isIconClass = computed(() => typeof props.icon === 'string')
</script>

<template>
  <XButton
    v-bind="$attrs"
    :class="buttonClass"
    :style="buttonStyle"
    :variant="resolvedVariant"
    :size="normalizedSize"
    :width="props.circle ? props.height || `var(--component-size-${normalizedSize}-height)` : props.width || 'auto'"
    :height="props.height || `var(--component-size-${normalizedSize}-height)`"
    :background-color="colorVars.backgroundColor"
    :border-color="colorVars.borderColor"
    :text-color="colorVars.textColor"
    :disabled="props.disabled"
    :loading="props.loading"
  >
    <template v-if="props.icon || $slots.prefix" #prefix>
      <i v-if="isIconClass" class="base-x-button__icon" :class="props.icon" aria-hidden="true"></i>
      <component :is="props.icon" v-else-if="props.icon" class="base-x-button__icon" aria-hidden="true" />
      <slot name="prefix"></slot>
    </template>
    <slot></slot>
    <template v-if="$slots.suffix" #suffix>
      <slot name="suffix"></slot>
    </template>
  </XButton>
</template>

<style scoped>
.base-x-button.x-button {
  border-radius: var(--base-x-button-radius);
  font-size: var(--base-x-button-font-size);
  font-weight: 500;
  gap: 4px;
  height: var(--base-x-button-height);
  line-height: 1;
  min-height: var(--base-x-button-height);
  padding: var(--base-x-button-padding);
  width: var(--base-x-button-width);
}

.base-x-button.x-button.is-circle {
  flex: 0 0 var(--base-x-button-height);
  padding: 0;
  width: var(--base-x-button-height);
}

.base-x-button.x-button.is-link {
  min-width: 0;
}

.base-x-button.x-button.is-link:hover:not(:disabled) {
  background: transparent;
}

.base-x-button__icon {
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 1.12em;
  height: 1em;
  line-height: 1;
  width: 1em;
}

.base-x-button__icon svg {
  height: 1em;
  width: 1em;
}
</style>
