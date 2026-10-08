<script setup lang="ts">
import { ref } from 'vue'
const maxRowsValue = ref('设置 maxRows 后，文本域最多显示指定行数。内容继续增加时会显示竖向滚动条。')
import { XTextarea } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XTextarea v-model="maxRowsValue" auto-height :rows="2" :max-rows="3" />
</template>
