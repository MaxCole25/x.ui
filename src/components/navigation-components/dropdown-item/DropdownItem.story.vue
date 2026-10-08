<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XDropdownItem } from './index'
import '../../../styles/index.css'
const appearance = reactive({ fontSize: 14,
  label: '菜单项',
  command: 'save',
  icon: 'ri-save-line',
  disabled: false,
  divided: false
})
</script>

<template>
  <Story title="导航组件/DropdownItem 下拉菜单项" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDropdownItem">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDropdownItem  :command="appearance.command" :icon="appearance.icon"  :divided="appearance.divided" v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
              {{ appearance.label }}
            </XDropdownItem>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.item-shell {
  width: 160px;
}
</style>
