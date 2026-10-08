<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { createFileDiskScene } from '../../_story/createFileDiskScene'
import { XFileDisk } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="其它组件/文件磁盘 FileDisk" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XFileDisk" :create-initial-props="createFileDiskScene">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          <XFileDisk v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
      <p>适配器使用内存文件数据；上传、复制、移动、重命名和删除可操作。下载通过事件日志核对参数，不产生真实下载文件。恢复默认会重建目录数据。</p>
    </Variant>
  </Story>
</template>
