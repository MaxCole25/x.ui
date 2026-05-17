<script setup lang="ts">
import { computed } from 'vue'
import { iconAliases } from './aliases'
import { plainRemixIconNames } from './plainIconNames'
import { toCssSize } from '../../../_utils/elementStyle'
import { componentSizePreset } from '../../../_utils/size'
import type { IconProps } from './types'

defineOptions({
  name: 'XIcon',
  inheritAttrs: false
})

const props = withDefaults(defineProps<IconProps>(), {
  variant: 'line',
  size: undefined,
  iconSize: undefined,
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
const mergedSize = computed(() => props.size ?? 'md')
const usesExplicitSize = computed(() => props.size != null)

const iconStyle = computed(() => {
  const size = usesExplicitSize.value ? `${componentSizePreset[mergedSize.value].fontSize}px` : toCssSize(props.iconSize)

  return {
    '--x-icon-size': size,
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
