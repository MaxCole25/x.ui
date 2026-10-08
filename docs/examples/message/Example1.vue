<script setup lang="ts">
import { XBrick, XMessageComponent } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12">
    <XMessageComponent message="这是一条消息" status="info" :duration="0" />
    <XMessageComponent message="保存成功" status="success" show-close :duration="0" />
    <XMessageComponent message="提交失败" status="error" show-close :duration="0" />
  </XBrick>
</template>
