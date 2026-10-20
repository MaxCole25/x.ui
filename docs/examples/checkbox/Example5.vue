<script setup lang="ts">
import { XBrick, XCheckbox } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
import { ref } from 'vue'
const checked = ref(true)
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XCheckbox model-value checked-color="#7c3aed" border-color="#c4b5fd" radius="6px">主题覆盖</XCheckbox>
    <XCheckbox model-value disabled disabled-background-color="#1e293b" disabled-text-color="#cbd5e1">深色禁用已选</XCheckbox>
    <XCheckbox disabled disabled-background-color="#1e293b" disabled-text-color="#cbd5e1">深色禁用未选</XCheckbox>
    <XCheckbox indeterminate disabled disabled-background-color="#1e293b" disabled-text-color="#cbd5e1">深色禁用半选</XCheckbox>
  </XBrick>
</template>
