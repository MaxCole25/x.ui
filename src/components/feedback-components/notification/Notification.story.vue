<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XNotificationComponent as XNotification } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="反馈组件/Notification 通知" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XNotification">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XNotification  title="导出完成" message="报表已生成，可以下载。"  :duration="0"  v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
