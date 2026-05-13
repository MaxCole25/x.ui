<script setup lang="ts">
import { computed, reactive } from 'vue'

const state = reactive({
  borderWidth: 1,
  borderColor: '#0f766e',
  backgroundColor: '#ffffff',
  textColor: '#12323a',
  showActiveBorder: true
})

const styleProps = computed(() => ({
  borderWidth: state.borderWidth,
  borderColor: state.borderColor,
  backgroundColor: state.backgroundColor,
  textColor: state.textColor,
  showActiveBorder: state.showActiveBorder
}))
</script>

<template>
  <div class="element-style-playground">
    <div class="element-style-playground__preview">
      <slot v-bind="styleProps" />
    </div>

    <div class="element-style-playground__controls">
      <label>
        <span>边框粗细</span>
        <input v-model.number="state.borderWidth" type="number" min="0" max="12" step="1" />
      </label>
      <label>
        <span>边框颜色</span>
        <input v-model="state.borderColor" type="color" />
      </label>
      <label>
        <span>背景色</span>
        <input v-model="state.backgroundColor" type="color" />
      </label>
      <label>
        <span>文字颜色</span>
        <input v-model="state.textColor" type="color" />
      </label>
      <label class="element-style-playground__check">
        <input v-model="state.showActiveBorder" type="checkbox" />
        <span>显示激活边框</span>
      </label>
    </div>
  </div>
</template>

<style scoped>
.element-style-playground {
  border: 1px solid #d8e2e8;
  border-radius: 8px;
  overflow: hidden;
}

.element-style-playground__preview {
  align-items: center;
  background: #f8fafc;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  min-height: 132px;
  padding: 24px;
}

.element-style-playground__controls {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  padding: 16px;
}

.element-style-playground__controls label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 10px;
  justify-content: space-between;
}

.element-style-playground__check {
  justify-content: flex-start;
}

.element-style-playground__controls input {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  min-height: 32px;
  padding: 0 8px;
}
</style>
