<script setup lang="ts">
import { ref } from 'vue'
import { XButton, XDialog } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'

const parentVisible = ref(false)
const childVisible = ref(false)
const closeOnEsc = ref(true)
</script>

<template>
  <XButton @click="parentVisible = true">打开嵌套弹窗</XButton>
  <XDialog v-model="parentVisible" title="父弹窗" :width="620" :height="400" :min-width="400" :min-height="260">
    <p>子弹窗关闭后焦点返回打开按钮，父弹窗仍锁定背景滚动。</p>
    <XButton @click="childVisible = true">打开子弹窗</XButton>
    <XDialog
      v-model="childVisible"
      title="子弹窗"
      :width="440"
      :height="280"
      :min-width="320"
      :min-height="220"
      :close-on-esc="closeOnEsc"
    >
      <label>
        <input v-model="closeOnEsc" type="checkbox" />
        允许 Esc 关闭子弹窗
      </label>
      <p>Tab 键在当前弹窗中循环；禁止 Esc 时不会关闭父弹窗。</p>
      <XButton @click="childVisible = false">关闭子弹窗</XButton>
    </XDialog>
  </XDialog>
</template>
