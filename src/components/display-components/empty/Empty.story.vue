<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XEmpty } from './index'
import '../../../styles/index.css'

const appearance = reactive({
  description: '暂无数据',
  actionText: '刷新',
  image: '',
  imageSize: 96,
  actionCount: 0
})
</script>

<template>
  <Story title="展示组件/Empty 空状态" group="components">
    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XEmpty v-bind="styleProps" :description="appearance.description" :action-text="appearance.actionText" :image="appearance.image || undefined" :image-size="appearance.imageSize" @action="appearance.actionCount += 1" />
        </template>
        <template #column-1>
          <label><span>描述</span><input v-model="appearance.description" /></label>
          <label><span>按钮文本</span><input v-model="appearance.actionText" /></label>
          <label><span>图片地址</span><input v-model="appearance.image" /></label>
        </template>
        <template #column-2>
          <label><span>图片尺寸</span><input v-model.number="appearance.imageSize" type="number" min="24" /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
