<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
import '../../../styles/index.css'
import XRadio from './src/Radio.vue'
const appearanceValue = ref('A')
const appearance = reactive({ height: 32,
  label: '单选项',
  value: 'A',
  name: 'appearance-radio',
  labelColor: '#4c1d95',
  buttonColor: '#7c3aed',
  buttonSize: 14,
  fontSize: 15,
  fontFamily: '',
  disabled: false
})
</script>

<template>
  <Story title="Form 组件/Radio 单选框" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XRadio">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XRadio

            v-model="appearanceValue"
            :name="appearance.name"
            :value="appearance.value"

           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            {{ appearance.label }}
          </XRadio>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.radio-appearance-playground {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.radio-appearance-playground__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  min-height: 132px;
  padding: 24px;
}

.radio-appearance-playground__controls {
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(0, 320px);
  padding: 16px;
}

.radio-appearance-playground__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
  justify-content: space-between;
  min-width: 0;
}

.radio-appearance-playground__controls span {
  overflow-wrap: anywhere;
}

.radio-appearance-playground__check {
  justify-content: flex-start;
}

.radio-appearance-playground__controls input,
.radio-appearance-playground__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 32px;
  min-width: 0;
  padding: 0 8px;
}

.radio-appearance-playground__controls input[type="color"] {
  padding: 2px;
  width: 48px;
}

.radio-appearance-playground__controls input[type="checkbox"] {
  min-height: auto;
}
</style>
