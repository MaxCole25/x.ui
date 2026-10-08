<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
import { XButton, XBrick, XText, XDrawer } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <div>
    <XButton type="button" @click="visible = true">打开抽屉</XButton>
    <XDrawer v-model="visible" title="配置面板" panel-size="360px">
      <XBrick direction="vertical" :gap="12">
        <p>抽屉内容</p>
        <XText tag="p" variant="muted">适合承载配置项、详情说明和操作入口。</XText>
      </XBrick>
    </XDrawer>
  </div>
</template>
