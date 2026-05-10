<template>
  <figure class="xl-image-block">
    <img :src="url" :alt="alt" />
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  url: string
  alt?: string
}>()
</script>
