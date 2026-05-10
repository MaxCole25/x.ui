<template>
  <div class="xl-table-menu">
    <button type="button" @click="$emit('insert-row')">插入行</button>
    <button type="button" @click="$emit('insert-column')">插入列</button>
    <button type="button" @click="$emit('delete-table')">删除表格</button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  'insert-row': []
  'insert-column': []
  'delete-table': []
}>()
</script>
