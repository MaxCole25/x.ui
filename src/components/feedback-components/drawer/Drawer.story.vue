<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { computed, reactive } from 'vue'
import { XDrawer } from './index'
import { overlayZIndex } from '../../_utils/zIndex'
import type { DrawerDirection } from './src/types'
import type { FontSize } from '../../_utils/size'
import '../../../styles/index.css'
const appearance = reactive({
  visible: false,
  title: '抽屉标题',
  direction: 'rtl' as DrawerDirection,
  fontSize: 14 as FontSize,
  panelSize: '320px',
  withHeader: true,
  showClose: true,
  closeOnMaskClick: true,
  destroyOnClose: false,
  zIndex: overlayZIndex.drawer,
  maskColor: 'rgba(18, 28, 45, 0.42)',
  titleColor: '#121826',
  headerBackgroundColor: '#ffffff',
  bodyBackgroundColor: '#ffffff',
  footerBackgroundColor: '#ffffff',
  headerBorderColor: '#d1d9e6',
  footerBorderColor: '#d1d9e6',
  closeIconColor: '#606b7d',
  closeIconHoverColor: '#121826',
  closeIconHoverBackgroundColor: '#e0ecff',
  shadow: '0 18px 50px rgba(15, 23, 42, 0.22)'
})
const eventState = reactive({
  updateModelValue: 0,
  open: 0,
  close: 0
})
const drawerThemeProps = computed(() => ({
  maskColor: appearance.maskColor,
  titleColor: appearance.titleColor,
  headerBackgroundColor: appearance.headerBackgroundColor,
  bodyBackgroundColor: appearance.bodyBackgroundColor,
  footerBackgroundColor: appearance.footerBackgroundColor,
  headerBorderColor: appearance.headerBorderColor,
  footerBorderColor: appearance.footerBorderColor,
  closeIconColor: appearance.closeIconColor,
  closeIconHoverColor: appearance.closeIconHoverColor,
  closeIconHoverBackgroundColor: appearance.closeIconHoverBackgroundColor,
  shadow: appearance.shadow,
  zIndex: appearance.zIndex
}))
function handleUpdateVisible(value: boolean) {
  appearance.visible = value
  eventState.updateModelValue += 1
}
</script>

<template>
  <Story title="反馈组件/Drawer 抽屉" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XDrawer">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XDrawer
            v-bind="{ ...({ ...styleProps, ...drawerThemeProps }), ...(apiProps) }"
            :model-value="appearance.visible"
            :title="appearance.title"

            :with-header="appearance.withHeader"

            @update:model-value="handleUpdateVisible"
            @open="eventState.open += 1"
            @close="eventState.close += 1"
            v-on="apiEvents" @vue:mounted="captureInstance" >
            抽屉内容
          </XDrawer>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-row {
  padding: 16px;
}

.drawer-story__meta {
  color: #475569;
  font-size: 12px;
  line-height: 1.5;
  margin: 0;
}
</style>
