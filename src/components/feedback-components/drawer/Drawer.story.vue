<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XButton } from '../../basic-components/button'
import { XDrawer } from './index'
import type { DrawerDirection } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  visible: false,
  title: '抽屉标题',
  direction: 'rtl' as DrawerDirection,
  panelSize: '320px',
  withHeader: true,
  showClose: true,
  closeOnMaskClick: true
})
</script>

<template>
  <Story title="反馈组件/Drawer 抽屉" group="components">
    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XButton width="120px" @click="appearance.visible = true">打开预览</XButton>
          <XDrawer v-bind="styleProps" v-model="appearance.visible" :title="appearance.title" :direction="appearance.direction" :panel-size="appearance.panelSize" :with-header="appearance.withHeader" :show-close="appearance.showClose" :close-on-mask-click="appearance.closeOnMaskClick">
            抽屉内容
          </XDrawer>
        </template>
        <template #column-1>
          <label><span>标题</span><input v-model="appearance.title" /></label>
          <label><span>面板尺寸</span><input v-model="appearance.panelSize" /></label>
          <label><span>方向</span><select v-model="appearance.direction"><option value="rtl">rtl</option><option value="ltr">ltr</option><option value="ttb">ttb</option><option value="btt">btt</option></select></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.withHeader" type="checkbox" /><span>显示头部</span></label>
          <label class="story-check"><input v-model="appearance.showClose" type="checkbox" /><span>显示关闭</span></label>
          <label class="story-check"><input v-model="appearance.closeOnMaskClick" type="checkbox" /><span>点击遮罩关闭</span></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-row {
  padding: 16px;
}
</style>
