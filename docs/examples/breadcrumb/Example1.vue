<script setup lang="ts">
import { XBrick, XBreadcrumb } from '@x-soft88/x-ui'
import '@x-soft88/x-ui/style.css'
</script>

<template>
  <XBrick wrap vertical-center :gap="12">
    <XBreadcrumb :items="[{ label: '首页', to: '#/' }, { label: '组件' }, { label: 'Breadcrumb' }]" />
  </XBrick>
</template>
