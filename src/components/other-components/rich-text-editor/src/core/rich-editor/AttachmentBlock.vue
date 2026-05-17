<template>
  <a class="xl-attachment xl-attachment--preview" :href="url" target="_blank" rel="noreferrer">
    <span class="xl-attachment__name">{{ fileName }}</span>
    <span class="xl-attachment__meta">{{ meta }}</span>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  url: string
  fileName: string
  meta: string
}>()
</script>
