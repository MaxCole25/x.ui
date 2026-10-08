<script setup lang="ts">
import { XBrick, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XButton width="180px">
      <template #prefix>+</template>
      新建
    </XButton>
    <XButton width="220px" variant="outline">
      保存
      <template #suffix>Ctrl+S</template>
    </XButton>
  </XBrick>
</template>
