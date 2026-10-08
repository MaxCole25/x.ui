<script setup lang="ts">
import { ref } from 'vue'
const remoteCity = ref('')
const cityFieldNames = { label: 'name', value: 'id' }
function queryCity() {
  return [
    { name: '上海', id: 'shanghai' },
    { name: '杭州', id: 'hangzhou' }
  ]
}
import { XGrid, XAutocomplete } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="280px">
    <XAutocomplete
      v-model="remoteCity"
      remote
      :field-names="cityFieldNames"
      :remote-method="queryCity"
      :remote-debounce="300"
      :remote-min-length="1"
      placeholder="输入城市关键词"
    />
  </XGrid>
</template>
