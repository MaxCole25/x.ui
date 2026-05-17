<script setup lang="ts">
import { reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XDivider } from './index'
import type { DividerBorderStyle, DividerContentPosition, DividerDirection } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  text: '分割线',
  direction: 'horizontal' as DividerDirection,
  contentPosition: 'center' as DividerContentPosition,
  borderStyle: 'solid' as DividerBorderStyle,
  spacing: 16
})
</script>

<template>
  <Story title="基础组件/Divider 分割线" group="components">
    

    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <div class="divider-demo">
            <span>前</span>
            <XDivider v-bind="styleProps" :direction="appearance.direction" :content-position="appearance.contentPosition" :border-style="appearance.borderStyle" :spacing="appearance.spacing">
              {{ appearance.text }}
            </XDivider>
            <span>后</span>
          </div>
        </template>
        <template #column-1>
          <label><span>文本</span><input v-model="appearance.text" /></label>
          <label><span>方向</span><select v-model="appearance.direction"><option value="horizontal">horizontal</option><option value="vertical">vertical</option></select></label>
          <label><span>位置</span><select v-model="appearance.contentPosition"><option value="left">left</option><option value="center">center</option><option value="right">right</option></select></label>
          <label><span>线型</span><select v-model="appearance.borderStyle"><option value="solid">solid</option><option value="dashed">dashed</option><option value="dotted">dotted</option></select></label>
        </template>
        <template #column-2>
          <label><span>间距</span><input v-model.number="appearance.spacing" type="number" min="0" /></label>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-block {
  padding: 16px;
}
.divider-demo {
  width: 100%;
}
</style>
