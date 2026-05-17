<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XAvatar } from './index'
import type { AvatarShape, AvatarSize } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  src: '',
  alt: '演示头像',
  name: '演示',
  size: 'md' as AvatarSize,
  shape: 'circle' as AvatarShape,
  color: '#1264f4'
})
</script>

<template>
  <Story title="展示组件/Avatar 头像" group="components">
    

    

    

    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XAvatar
            v-bind="styleProps"
            :src="appearance.src || undefined"
            :alt="appearance.alt"
            :name="appearance.name"
            :size="appearance.size"
            :shape="appearance.shape"
            :color="appearance.color"
          />
        </template>
        <template #column-1>
          <label>
            <span>图片地址</span>
            <input v-model="appearance.src" />
          </label>
          <label>
            <span>alt</span>
            <input v-model="appearance.alt" />
          </label>
          <label>
            <span>name</span>
            <input v-model="appearance.name" />
          </label>
          <label>
            <span>尺寸</span>
            <select v-model="appearance.size">
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>
          <label>
            <span>形状</span>
            <select v-model="appearance.shape">
              <option value="circle">circle</option>
              <option value="square">square</option>
            </select>
          </label>
        </template>
        <template #column-3>
          <label>
            <span>主题色</span>
            <input v-model="appearance.color" type="color" />
          </label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-row {
  align-items: center;
  display: flex;
  gap: 14px;
  padding: 16px;
}
</style>
