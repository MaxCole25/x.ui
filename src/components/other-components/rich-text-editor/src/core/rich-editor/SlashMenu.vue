<template>
  <div v-if="visible" class="xl-slash-menu">
    <button
      v-for="item in items"
      :key="item.label"
      type="button"
      class="xl-slash-menu__item"
      @click="$emit('select', item.action)"
    >
      <strong>{{ item.label }}</strong>
      <span>{{ item.description }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
  items: Array<{ label: string; description: string; action: string }>
}>()

defineEmits<{
  select: [action: string]
}>()
</script>
