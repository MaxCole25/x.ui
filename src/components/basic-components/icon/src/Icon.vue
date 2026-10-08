<script setup lang="ts">
import { computed } from 'vue'
import { iconAliases } from './aliases'
import { plainRemixIconNames } from './plainIconNames'
import { toCssSize } from '../../../_utils/elementStyle'
import type { IconProps } from './types'

defineOptions({
  name: 'XIcon',
  inheritAttrs: false
})

const props = withDefaults(defineProps<IconProps>(), {
  variant: 'line',
  fontSize: undefined,
  iconSize: undefined,
  offsetY: undefined,
  decorative: undefined,
  spin: false
})

const plainIconNameSet = new Set<string>(plainRemixIconNames)

const normalizedName = computed(() => {
  const rawName = props.name.trim().replace(/^ri-/, '')
  const aliasedName = iconAliases[rawName] ?? rawName
  const variantBaseName = aliasedName.replace(/-(?:line|fill)$/, '')

  if (plainIconNameSet.has(aliasedName) && props.variant !== 'fill') {
    return aliasedName
  }

  if (/-(?:line|fill)$/.test(aliasedName)) {
    if (!/-(?:line|fill)$/.test(rawName) && props.variant === 'fill') {
      return `${variantBaseName}-fill`
    }
    return aliasedName
  }

  if (props.variant) {
    return `${variantBaseName}-${props.variant}`
  }

  return `${aliasedName}-line`
})

const iconClass = computed(() => [`ri-${normalizedName.value}`, { 'is-spin': props.spin }])

const iconStyle = computed(() => {
  const size = toCssSize(props.iconSize ?? props.fontSize)

  return {
    '--x-icon-size': size,
    '--x-icon-offset-y': toCssSize(props.offsetY),
    color: props.color
  }
})

const isDecorative = computed(() => props.decorative ?? !props.title)
</script>

<template>
  <i
    v-bind="$attrs"
    class="x-icon"
    :class="iconClass"
    :style="iconStyle"
    :aria-hidden="isDecorative ? 'true' : undefined"
    :aria-label="!isDecorative ? props.title : undefined"
    :role="!isDecorative ? 'img' : undefined"
  />
</template>
