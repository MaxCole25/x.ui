<script setup lang="ts">
import { XDropdownMenu, XDropdownItem, XDropdown, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XDropdown trigger="click" :hide-on-click="false">
    <XButton>更多操作</XButton>
    <template #dropdown>
      <XDropdownMenu min-width="160px" padding="6px">
        <XDropdownItem type="button">复制</XDropdownItem>
        <XDropdownItem type="button" disabled>已禁用</XDropdownItem>
        <XDropdownItem type="button" text-color="#d92d20">删除</XDropdownItem>
      </XDropdownMenu>
    </template>
  </XDropdown>
</template>
