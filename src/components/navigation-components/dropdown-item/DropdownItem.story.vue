<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XDropdownItem } from './index'
import '../../../styles/index.css'

const appearance = reactive({
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
      <ElementStylePlayground>
        <template #default>
          <div class="item-shell">
            <XDropdownItem :command="appearance.command" :icon="appearance.icon" :disabled="appearance.disabled" :divided="appearance.divided">
              {{ appearance.label }}
            </XDropdownItem>
          </div>
        </template>
        <template #column-1>
          <label><span>文本</span><input v-model="appearance.label" /></label>
          <label><span>命令</span><input v-model="appearance.command" /></label>
          <label><span>图标</span><input v-model="appearance.icon" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.disabled" type="checkbox" /><span>禁用</span></label>
          <label class="story-check"><input v-model="appearance.divided" type="checkbox" /><span>显示分割线</span></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.item-shell {
  width: 160px;
}
</style>
