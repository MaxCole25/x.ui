<script setup lang="ts">
import { ref } from 'vue'
const selectedCommand = ref('')
import { XBrick, XText, XDropdown, XButton, XDropdownMenu, XDropdownItem } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="200px">
    <XDropdown trigger="click" @command="(value) => { selectedCommand = String(value) }">
      <XButton>选择操作</XButton>
      <template #dropdown>
        <XDropdownMenu width="180px">
          <XDropdownItem command="archive">归档</XDropdownItem>
          <XDropdownItem command="restore">恢复</XDropdownItem>
          <XDropdownItem command="remove" divided>移除</XDropdownItem>
        </XDropdownMenu>
      </template>
    </XDropdown>
    <XText tag="p" variant="muted">当前命令：{{ selectedCommand }}</XText>
  </XBrick>
</template>
