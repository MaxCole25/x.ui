<script setup lang="ts">
import { XDropdownMenu, XDropdownItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDropdownMenu width="180px">
    <XDropdownItem active>当前页面</XDropdownItem>
    <XDropdownItem disabled>禁用操作</XDropdownItem>
    <XDropdownItem divided>分割菜单项</XDropdownItem>
  </XDropdownMenu>
</template>
