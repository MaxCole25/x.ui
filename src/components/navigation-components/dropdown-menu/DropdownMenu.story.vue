<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XDropdownItem } from '../dropdown-item'
import { XDropdownMenu } from './index'
import '../../../styles/index.css'
</script>

<template>
  <Story title="导航组件/DropdownMenu 下拉菜单容器" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDropdownMenu">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDropdownMenu     v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <XDropdownItem>菜单一</XDropdownItem>
            <XDropdownItem>菜单二</XDropdownItem>
            <XDropdownItem divided>分割菜单</XDropdownItem>
          </XDropdownMenu>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
