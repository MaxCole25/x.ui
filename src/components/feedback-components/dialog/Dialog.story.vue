<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { ref } from 'vue'
import { XButton } from '../../basic-components/button'
import { XSelect } from '../../form-components/select'
import { XDrawer } from '../drawer'
import { XDialog } from './index'
import '../../../styles/index.css'
const nestedVisible = ref(false)
const initialProps = { modelValue: false, title: '模态与浮层验收' }
</script>

<template>
  <Story title="反馈组件/弹窗 Dialog" group="components">
    <Variant title="外观接口">
      <p>展开 Select 后按 Esc：第一次关闭下拉，第二次按 closeOnEsc 处理弹窗。打开抽屉检查顶层关闭、焦点恢复和滚动锁。</p>
      <ApiPlayground component="XDialog" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XButton @click="apiProps.modelValue = true">打开弹窗</XButton>
          <XDialog v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" @close="nestedVisible = false">
            <div style="display: grid; gap: 12px">
              <XSelect :options="[{ label: 'Vue', value: 'vue' }, { label: 'Vite', value: 'vite' }]" placeholder="Esc 顺序验收">
                <input placeholder="浮层内输入与 Tab 验收" @click.stop />
              </XSelect>
              <input placeholder="检查 Tab 焦点循环" />
              <XButton @click="nestedVisible = true">打开嵌套抽屉</XButton>
            </div>
            <XDrawer v-model="nestedVisible" :z-index="1950" title="最上层抽屉">
              <XSelect :options="[{ label: '抽屉内选项', value: 'nested' }]" />
              <input placeholder="关闭后焦点恢复到打开按钮" />
            </XDrawer>
            <template #footer><XButton @click="apiProps.modelValue = false">关闭</XButton></template>
          </XDialog>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
