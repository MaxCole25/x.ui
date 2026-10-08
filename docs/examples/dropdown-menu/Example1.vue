<script setup lang="ts">
import { XDropdownMenu, XDropdownItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDropdownMenu width="180px">
    <XDropdownItem icon="ri-edit-line">编辑</XDropdownItem>
    <XDropdownItem icon="ri-file-copy-line">复制</XDropdownItem>
    <XDropdownItem divided icon="ri-delete-bin-line">删除</XDropdownItem>
  </XDropdownMenu>
</template>
