<script setup lang="ts">
import { computed } from 'vue'
import { createElementStyleVars, toCssSize } from '../../../_utils/elementStyle'
import type { EmptyProps } from './types'

defineOptions({
  name: 'XEmpty'
})

const props = withDefaults(defineProps<EmptyProps>(), {
  description: '暂无数据'
})

const emit = defineEmits<{
  action: [event: MouseEvent]
}>()

const emptyStyle = computed(() => ({
  ...createElementStyleVars(props),
  '--x-empty-image-size': toCssSize(props.imageSize)
}))
</script>

<template>
  <div class="x-empty" :style="emptyStyle">
    <slot name="image">
      <img v-if="props.image" class="x-empty__image" :src="props.image" alt="" />
      <div v-else class="x-empty__image x-empty__image--placeholder" aria-hidden="true">
        <span></span>
      </div>
    </slot>
    <div class="x-empty__description">
      <slot name="description">{{ props.description }}</slot>
    </div>
    <div v-if="$slots.default || props.actionText" class="x-empty__actions">
      <slot>
        <button type="button" class="x-empty__action" @click="emit('action', $event)">{{ props.actionText }}</button>
      </slot>
    </div>
  </div>
</template>
