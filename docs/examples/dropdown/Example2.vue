<script setup lang="ts">
import { XDropdownMenu, XDropdownItem, XDropdown, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDropdown trigger="click" popper-width="180px">
    <XButton>打开菜单</XButton>
    <template #dropdown>
      <XDropdownMenu min-width="160px" max-height="180px" padding="6px">
        <XDropdownItem type="button">编辑</XDropdownItem>
        <XDropdownItem type="button" text-color="#d92d20">删除</XDropdownItem>
      </XDropdownMenu>
    </template>
  </XDropdown>
</template>
