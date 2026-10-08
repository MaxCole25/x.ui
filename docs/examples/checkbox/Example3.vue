<script setup lang="ts">
import { ref } from 'vue'
const indeterminate = ref(true)
import { XBrick, XCheckbox } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XCheckbox v-model="indeterminate" indeterminate>部分选择</XCheckbox>
    <XCheckbox disabled>禁用未选</XCheckbox>
    <XCheckbox model-value disabled>禁用已选</XCheckbox>
  </XBrick>
</template>
