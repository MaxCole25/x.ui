<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
import { XBrick, XPagination } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XPagination v-model="page" :total="86" show-page-size />
  </XBrick>
</template>
