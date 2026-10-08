<script setup lang="ts">
import { ref } from 'vue'
const command = ref('')
import { XBrick, XDropdownMenu, XDropdownItem, XText, XDropdown, XButton } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick direction="vertical" :gap="12" width="180px">
    <XDropdown trigger="click" @command="(value) => { command = String(value) }">
      <XButton>更多</XButton>
      <template #dropdown>
        <XDropdownMenu min-width="136px" padding="6px">
          <XDropdownItem type="button" command="编辑">编辑</XDropdownItem>
          <XDropdownItem type="button" command="删除" text-color="#d92d20">删除</XDropdownItem>
        </XDropdownMenu>
      </template>
    </XDropdown>
    <XText tag="p" variant="muted">当前命令：{{ command }}</XText>
  </XBrick>
</template>
