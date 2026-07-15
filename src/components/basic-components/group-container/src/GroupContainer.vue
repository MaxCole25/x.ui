<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { toCssSize } from '../../../_utils/elementStyle'
import type { GroupContainerProps } from './types'

defineOptions({
  name: 'XGroupContainer'
})

const props = withDefaults(defineProps<GroupContainerProps>(), {
  titlePosition: 'top-left',
  width: '100%',
  padding: '16px',
  radius: '6px',
  borderWidth: '1px',
  borderStyle: 'solid',
  titlePadding: '0 8px',
  titleFontSize: '14px'
})

const slots = useSlots()
const hasTitle = computed(() => Boolean(slots.title || props.title))
const groupContainerStyle = computed(() => ({
  '--x-group-container-width': toCssSize(props.width),
  '--x-group-container-height': toCssSize(props.height),
  '--x-group-container-padding': toCssSize(props.padding),
  '--x-group-container-radius': toCssSize(props.radius),
  '--x-group-container-border-width': toCssSize(props.borderWidth),
  '--x-group-container-border-color': props.borderColor,
  '--x-group-container-border-style': props.borderStyle,
  '--x-group-container-background-color': props.backgroundColor,
  '--x-group-container-text-color': props.textColor,
  '--x-group-container-title-text-color': props.titleTextColor,
  '--x-group-container-title-background-color': props.titleBackgroundColor,
  '--x-group-container-title-padding': toCssSize(props.titlePadding),
  '--x-group-container-title-font-size': toCssSize(props.titleFontSize)
}))
</script>

<template>
  <fieldset
    class="x-group-container"
    :class="`x-group-container--${props.titlePosition}`"
    :style="groupContainerStyle"
  >
    <legend v-if="hasTitle" class="x-group-container__title">
      <slot name="title">{{ props.title }}</slot>
    </legend>
    <slot />
  </fieldset>
</template>

<style scoped>
.x-group-container {
  background: var(--x-group-container-background-color, var(--x-color-surface, #fff));
  border: var(--x-group-container-border-width, 1px) var(--x-group-container-border-style, solid) var(--x-group-container-border-color, var(--x-color-border, #d8d9df));
  border-radius: var(--x-group-container-radius, 6px);
  box-sizing: border-box;
  color: var(--x-group-container-text-color, var(--x-color-text, #303133));
  height: var(--x-group-container-height, auto);
  margin: 0;
  min-inline-size: 0;
  min-width: 0;
  padding: var(--x-group-container-padding, 16px);
  position: relative;
  width: var(--x-group-container-width, 100%);
}

.x-group-container__title {
  background: var(--x-group-container-title-background-color, var(--x-group-container-background-color, var(--x-color-surface, #fff)));
  box-sizing: border-box;
  color: var(--x-group-container-title-text-color, var(--x-group-container-text-color, var(--x-color-text, #303133)));
  font-size: var(--x-group-container-title-font-size, 14px);
  left: 16px;
  line-height: 1.4;
  margin: 0;
  max-width: calc(100% - 32px);
  padding: var(--x-group-container-title-padding, 0 8px);
  position: absolute;
  top: 0;
  white-space: nowrap;
}

.x-group-container--top-left .x-group-container__title {
  transform: translateY(-50%);
}

.x-group-container--top-center .x-group-container__title,
.x-group-container--bottom-center .x-group-container__title {
  left: 50%;
  transform: translate(-50%, -50%);
}

.x-group-container--top-right .x-group-container__title,
.x-group-container--bottom-right .x-group-container__title {
  left: auto;
  right: 16px;
  transform: translateY(-50%);
}

.x-group-container--bottom-left .x-group-container__title {
  bottom: 0;
  top: auto;
  transform: translateY(50%);
}

.x-group-container--bottom-center .x-group-container__title {
  bottom: 0;
  top: auto;
  transform: translate(-50%, 50%);
}

.x-group-container--bottom-right .x-group-container__title {
  bottom: 0;
  top: auto;
  transform: translateY(50%);
}
</style>
