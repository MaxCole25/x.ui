<script setup lang="ts">
import { ref } from 'vue'
const notice = ref(false)
import { XBrick, XSwitch } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="outside" />
    <XSwitch v-model="notice" active-text="开" inactive-text="关" label-position="inside" />
  </XBrick>
</template>
