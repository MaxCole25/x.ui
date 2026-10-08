<script setup lang="ts">
import { ref } from 'vue'
const remoteArea = ref([])
const areaFieldNames = { label: 'name', value: 'id', children: 'children' }
function queryArea() {
  return [
    { name: '浙江', id: 'zhejiang', children: [{ name: '杭州', id: 'hangzhou' }] },
    { name: '广东', id: 'guangdong', children: [{ name: '深圳', id: 'shenzhen' }] }
  ]
}
import { XGrid, XCascader } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XGrid :columns="1" width="280px">
    <XCascader
      v-model="remoteArea"
      remote
      :field-names="areaFieldNames"
      :remote-method="queryArea"
      placeholder="请选择地区"
    />
  </XGrid>
</template>
