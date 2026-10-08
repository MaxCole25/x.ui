<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XHorizontalMenu } from './index'
const items = [{ key: 'home', label: '首页' }, { key: 'settings', label: '设置', children: [{ key: 'profile', label: '个人资料' }] }]
import '../../../styles/index.css'
</script>

<template>
  <Story title="导航组件/HorizontalMenu 横向菜单" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XHorizontalMenu">
        <template #default="{ apiProps = {}, apiEvents = {}, captureInstance }">
          
            <XHorizontalMenu :items="items" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance"></XHorizontalMenu>
          
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
