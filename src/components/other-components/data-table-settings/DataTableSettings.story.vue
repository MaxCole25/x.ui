<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { createDataTableSettingsScene } from '../../_story/createDataTableSettingsScene'
import { XDataTableSettings } from './index'
import type { DataTableSettingsAdapter } from './src/types'
import '../../../styles/index.css'
</script>

<template>
  <Story title="其它组件/DataTableSettings 数据表设置" group="components">
    <Variant title="外观接口">
      <p>颜色验收：调整 dropdownBackgroundColor，打开顶部数据表及行内各下拉框，检查面板背景；清空后检查 controlBackgroundColor、backgroundColor 的回退。</p>
      <p>保存后切换数据表再切回，检查模拟保存结果；恢复默认会重建适配器和初始数据。loaded、table-change、save-success、save-error、load-error 在公共事件日志中查看。</p>
      <ApiPlayground component="XDataTableSettings" :create-initial-props="createDataTableSettingsScene">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XDataTableSettings v-bind="apiProps" :adapter="apiProps.adapter as DataTableSettingsAdapter" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
