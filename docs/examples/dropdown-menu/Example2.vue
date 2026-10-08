<script setup lang="ts">
import { XDropdown, XButton, XDropdownMenu, XDropdownItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDropdown trigger="click" popper-width="180px">
    <XButton>更多操作</XButton>
    <template #dropdown>
      <XDropdownMenu width="180px">
        <XDropdownItem command="edit">编辑</XDropdownItem>
        <XDropdownItem command="copy">复制</XDropdownItem>
        <XDropdownItem command="delete" divided>删除</XDropdownItem>
      </XDropdownMenu>
    </template>
  </XDropdown>
</template>
