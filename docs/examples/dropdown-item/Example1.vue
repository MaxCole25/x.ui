<script setup lang="ts">
import { XDropdownMenu, XDropdownItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDropdownMenu width="180px">
    <XDropdownItem command="edit" icon="ri-edit-line">编辑资料</XDropdownItem>
    <XDropdownItem command="copy" icon="ri-file-copy-line">复制链接</XDropdownItem>
    <XDropdownItem command="delete" divided icon="ri-delete-bin-line">删除</XDropdownItem>
  </XDropdownMenu>
</template>
