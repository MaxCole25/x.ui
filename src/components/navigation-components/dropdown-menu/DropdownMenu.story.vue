<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XDropdownItem } from '../dropdown-item'
import { XDropdownMenu } from './index'
import '../../../styles/index.css'

const appearance = reactive({
  maxHeight: 160
})
</script>

<template>
  <Story title="导航组件/DropdownMenu 下拉菜单容器" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XDropdownMenu v-bind="styleProps" :max-height="appearance.maxHeight">
            <XDropdownItem>菜单一</XDropdownItem>
            <XDropdownItem>菜单二</XDropdownItem>
            <XDropdownItem divided>分割菜单</XDropdownItem>
          </XDropdownMenu>
        </template>
        <template #column-2>
          <label><span>最大高度</span><input v-model.number="appearance.maxHeight" type="number" min="60" /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>
