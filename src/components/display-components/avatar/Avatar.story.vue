<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XAvatar } from './index'
import type { AvatarProps } from './src/types'
import '../../../styles/index.css'
const initialProps = {
  src: '',
  alt: '演示头像',
  name: '演示',
  icon: 'user',
  iconVariant: 'line',
  iconFull: false,
  iconColor: '#ffffff',
  iconTitle: '',
  iconSpin: false,
  fontSize: 14,
  avatarSize: 32,
  shape: 'circle',
  avatarBackgroundColor: '#1264f4'
} satisfies AvatarProps
</script>

<template>
  <Story title="展示组件/Avatar 头像" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XAvatar" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XAvatar v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
      <p>分别调整 avatarSize 和 fontSize，检查头像宽高与文字大小独立；切换 iconFull 检查图标尺寸，再恢复默认。</p>
      <p>图片验收：输入无效 src 检查回退内容，再换为有效图片地址检查重新加载；清空 src 后检查图标或姓名缩写恢复。</p>
    </Variant>
  </Story>
</template>
