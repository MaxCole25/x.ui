<script setup lang="ts">
import { ref } from 'vue'
const cityValue = ref('shanghai')
const cities = [
  { label: '上海', value: 'shanghai' },
  { label: '杭州', value: 'hangzhou' },
  { label: '深圳', value: 'shenzhen' }
]
import { XGrid, XAutocomplete } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="240px">
    <XAutocomplete v-model="cityValue" :options="cities" display-field="value" placeholder="显示城市 id" />
  </XGrid>
</template>
