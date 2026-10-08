<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive } from 'vue'
import { XButton } from './index'
import type { ButtonVariant } from './src/types'
import '../../../styles/index.css'
const state = reactive({
  clickCount: 0
})
const appearance = reactive({ fontSize: 14,
  label: '外观按钮',
  prefix: '前',
  suffix: '后',
  variant: 'solid' as ButtonVariant,
  width: 120,
  height: 40,
  padding: '0 12px',
  radius: 10,
  activeBackgroundColor: '#0f54d6',
  activeBorderColor: '#0b3d91',
  activeTextColor: '#ffffff',
  liftOnHover: false,
  loading: false,
  disabled: false
})
function handleClick() {
  state.clickCount += 1
}
</script>

<template>
  <Story title="基础组件/Button 按钮" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XButton">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XButton 

            @click="handleClick"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <template v-if="appearance.prefix" #prefix>{{ appearance.prefix }}</template>
            {{ appearance.label }}
            <template v-if="appearance.suffix" #suffix>{{ appearance.suffix }}</template>
          </XButton>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
