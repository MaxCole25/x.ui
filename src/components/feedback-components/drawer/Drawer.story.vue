<script setup lang="ts">
import { computed, reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XButton } from '../../basic-components/button'
import { XDrawer } from './index'
import { overlayZIndex } from '../../_utils/zIndex'
import type { DrawerDirection } from './src/types'
import type { XSize } from '../../_utils/size'
import '../../../styles/index.css'

const appearance = reactive({
  visible: false,
  title: '抽屉标题',
  direction: 'rtl' as DrawerDirection,
  size: 'md' as XSize,
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
      <ElementStylePlayground>
        <template #default="styleProps">
          <XButton width="120px" @click="appearance.visible = true">打开预览</XButton>
          <XDrawer
            v-bind="{ ...styleProps, ...drawerThemeProps }"
            :model-value="appearance.visible"
            :title="appearance.title"
            :direction="appearance.direction"
            :size="appearance.size"
            :panel-size="appearance.panelSize"
            :with-header="appearance.withHeader"
            :show-close="appearance.showClose"
            :close-on-mask-click="appearance.closeOnMaskClick"
            :destroy-on-close="appearance.destroyOnClose"
            @update:model-value="handleUpdateVisible"
            @open="eventState.open += 1"
            @close="eventState.close += 1"
          >
            抽屉内容
          </XDrawer>
        </template>
        <template #column-1>
          <label><span>标题</span><input v-model="appearance.title" /></label>
          <label><span>面板尺寸</span><input v-model="appearance.panelSize" /></label>
          <label><span>尺寸</span><select v-model="appearance.size"><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label>
          <label><span>方向</span><select v-model="appearance.direction"><option value="rtl">rtl</option><option value="ltr">ltr</option><option value="ttb">ttb</option><option value="btt">btt</option></select></label>
        </template>
        <template #column-2>
          <label><span>层级</span><input v-model.number="appearance.zIndex" type="number" min="1" step="10" /></label>
          <label><span>阴影</span><input v-model="appearance.shadow" /></label>
        </template>
        <template #column-3>
          <label><span>遮罩色</span><input v-model="appearance.maskColor" /></label>
          <label><span>标题色</span><input v-model="appearance.titleColor" type="color" /></label>
          <label><span>头部背景色</span><input v-model="appearance.headerBackgroundColor" type="color" /></label>
          <label><span>主体背景色</span><input v-model="appearance.bodyBackgroundColor" type="color" /></label>
          <label><span>底部背景色</span><input v-model="appearance.footerBackgroundColor" type="color" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.withHeader" type="checkbox" /><span>显示头部</span></label>
          <label class="story-check"><input v-model="appearance.showClose" type="checkbox" /><span>显示关闭</span></label>
          <label class="story-check"><input v-model="appearance.closeOnMaskClick" type="checkbox" /><span>点击遮罩关闭</span></label>
          <label class="story-check"><input v-model="appearance.destroyOnClose" type="checkbox" /><span>关闭后销毁</span></label>
        </template>
        <template #interfaces>
          <section class="element-style-playground__column">
            <label><span>头部分割色</span><input v-model="appearance.headerBorderColor" type="color" /></label>
            <label><span>底部分割色</span><input v-model="appearance.footerBorderColor" type="color" /></label>
            <label><span>关闭图标色</span><input v-model="appearance.closeIconColor" type="color" /></label>
            <label><span>关闭悬浮色</span><input v-model="appearance.closeIconHoverColor" type="color" /></label>
          </section>
          <section class="element-style-playground__column">
            <label><span>关闭悬浮背景色</span><input v-model="appearance.closeIconHoverBackgroundColor" type="color" /></label>
          </section>
        </template>
        <template #types>
          <section class="element-style-playground__column">
            <p class="drawer-story__meta">DrawerDirection: rtl / ltr / ttb / btt</p>
            <p class="drawer-story__meta">XSize: sm / md / lg</p>
          </section>
        </template>
        <template #events>
          <section class="element-style-playground__column">
            <p class="drawer-story__meta">update:modelValue: {{ eventState.updateModelValue }}</p>
            <p class="drawer-story__meta">open: {{ eventState.open }}</p>
            <p class="drawer-story__meta">close: {{ eventState.close }}</p>
          </section>
        </template>
      </ElementStylePlayground>
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
