<script setup lang="ts">
import { XBrick, XGrid, XInput } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XGrid :columns="1" width="240px">
      <XInput :font-size="10" placeholder="小尺寸" />
    </XGrid>
    <XGrid :columns="1" width="240px">
      <XInput :font-size="12" placeholder="默认尺寸" />
    </XGrid>
    <XGrid :columns="1" width="240px">
      <XInput :font-size="14" placeholder="大尺寸" />
    </XGrid>
  </XBrick>
</template>
