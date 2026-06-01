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
  icon: 'user',
  iconVariant: 'line' as 'line' | 'fill',
  iconFull: false,
  iconColor: '#ffffff',
  iconTitle: '',
  iconSpin: false,
  size: 'md' as AvatarSize,
  shape: 'circle' as AvatarShape,
  avatarBackgroundColor: '#1264f4'
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
            :icon="appearance.icon"
            :icon-variant="appearance.iconVariant"
            :icon-full="appearance.iconFull"
            :icon-color="appearance.iconColor"
            :icon-title="appearance.iconTitle || undefined"
            :icon-spin="appearance.iconSpin"
            :size="appearance.size"
            :shape="appearance.shape"
            :avatar-background-color="appearance.avatarBackgroundColor"
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
            <span>图标</span>
            <input v-model="appearance.icon" />
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
        <template #column-2>
          <label>
            <span>图标类型</span>
            <select v-model="appearance.iconVariant">
              <option value="line">line</option>
              <option value="fill">fill</option>
            </select>
          </label>
          <label class="story-check">
            <input v-model="appearance.iconFull" type="checkbox" />
            <span>图标撑满</span>
          </label>
          <label>
            <span>图标标题</span>
            <input v-model="appearance.iconTitle" />
          </label>
          <label class="story-check">
            <input v-model="appearance.iconSpin" type="checkbox" />
            <span>图标旋转</span>
          </label>
        </template>
        <template #column-3>
          <label>
            <span>头像背景色</span>
            <input v-model="appearance.avatarBackgroundColor" type="color" />
          </label>
          <label>
            <span>图标色</span>
            <input v-model="appearance.iconColor" type="color" />
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
