<script setup lang="ts">
import { ref } from 'vue'
const areaWithAffix = ref(['zhejiang', 'hangzhou'])
const areaOptions = [
  { label: '浙江', value: 'zhejiang', children: [{ label: '杭州', value: 'hangzhou' }, { label: '宁波', value: 'ningbo' }] },
  { label: '广东', value: 'guangdong', children: [{ label: '广州', value: 'guangzhou' }, { label: '深圳', value: 'shenzhen' }] }
]
import { XGrid, XCascader } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="320px">
    <XCascader v-model="areaWithAffix" :options="areaOptions" prefix="地区" suffix="必选" clearable />
  </XGrid>
</template>
