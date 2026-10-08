<script setup lang="ts">
import { XDropdownMenu, XDropdownItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDropdownMenu width="200px">
    <XDropdownItem
      active
      height="38px"
      radius="8px"
      background-color="#eff6ff"
      text-color="#1d4ed8"
      active-background-color="#1264f4"
      active-text-color="#fff"
    >已选菜单</XDropdownItem>
  </XDropdownMenu>
</template>
