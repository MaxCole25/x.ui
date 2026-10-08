<script setup lang="ts">
import { XDropdownMenu, XDropdownItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDropdownMenu
    width="220px"
    max-height="160px"
    padding="8px"
    radius="8px"
    border-color="#bfdbfe"
    background-color="#f8fbff"
    shadow="0 10px 24px rgba(18, 100, 244, 0.14)"
  >
    <XDropdownItem>新建任务</XDropdownItem>
    <XDropdownItem active>进行中</XDropdownItem>
    <XDropdownItem disabled>已归档</XDropdownItem>
  </XDropdownMenu>
</template>
