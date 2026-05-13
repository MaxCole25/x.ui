<script setup lang="ts">
import '../../styles/index.css'
import { reactive } from 'vue'
import XInput from './src/Input.vue'
import type { InputSize } from './src/types'

const state = reactive({
  value: 'XInput 尺寸预设',
  placeholder: '请输入内容',
  size: 'md' as InputSize,
  clearable: true
})

const sizes: InputSize[] = ['sm', 'md', 'lg']
</script>

<template>
  <Story title="元素/Input 输入框" group="components">
    <Variant title="尺寸属性">
      <div class="input-size-story">
        <XInput v-model="state.value" :placeholder="state.placeholder" :size="state.size" :clearable="state.clearable" />

        <div class="input-size-story__controls">
          <label>
            <span>绑定值</span>
            <input v-model="state.value" />
          </label>
          <label>
            <span>占位文本</span>
            <input v-model="state.placeholder" />
          </label>
          <label>
            <span>尺寸</span>
            <select v-model="state.size">
              <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </label>
          <label class="input-size-story__check">
            <input v-model="state.clearable" type="checkbox" />
            <span>可清空</span>
          </label>
        </div>
      </div>
    </Variant>
  </Story>
</template>

<style scoped>
.input-size-story {
  display: grid;
  gap: 18px;
  max-width: 420px;
  padding: 24px;
}

.input-size-story__controls {
  display: grid;
  gap: 12px;
}

.input-size-story__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
  justify-content: space-between;
  min-width: 0;
}

.input-size-story__controls input,
.input-size-story__controls select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  min-height: 32px;
  min-width: 0;
  padding: 0 8px;
  width: 220px;
}

.input-size-story__controls input[type='checkbox'] {
  min-height: auto;
  width: auto;
}

.input-size-story__check {
  justify-content: flex-start;
}
</style>
