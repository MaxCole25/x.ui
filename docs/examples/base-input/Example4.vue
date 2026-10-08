<script setup lang="ts">
import { ref } from 'vue'
const inputAmount = ref('12345')
import { XBrick, XGrid, XBaseInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="240px">
      <XBaseInput v-model="inputAmount" type="number" prefix="￥" suffix="元" />
    </XGrid>
  </XBrick>
</template>
