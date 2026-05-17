<script setup lang="ts">
import { computed, reactive } from 'vue'

withDefaults(
  defineProps<{
    sampleCount?: number
  }>(),
  {
    sampleCount: 1
  }
)

const state = reactive({
  parentWidth: 260,
  parentHeight: 96,
  parentFullWidth: false,
  parentFullHeight: false,
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

const parentStyle = computed(() => ({
  width: state.parentFullWidth ? '100%' : `${state.parentWidth}px`,
  height: state.parentFullHeight ? '100%' : `${state.parentHeight}px`
}))
</script>

<template>
  <div class="element-style-playground">
    <div class="element-style-playground__preview">
      <div class="element-style-playground__parent" :style="parentStyle">
        <slot v-for="sampleIndex in sampleCount" :key="sampleIndex" v-bind="styleProps" />
      </div>
    </div>

    <div class="element-style-playground__controls">
      <slot name="controls" :state="state" :parent-style="parentStyle">
        <section class="element-style-playground__area">
          <h3 class="element-style-playground__area-title">属性</h3>
          <div class="element-style-playground__area-grid">
            <section class="element-style-playground__column">
              <slot name="column-1" :state="state" />
            </section>

            <section class="element-style-playground__column">
              <label>
                <span>父元素宽度</span>
                <input v-model.number="state.parentWidth" type="number" min="80" max="1200" step="10" />
              </label>
              <label>
                <span>父元素高度</span>
                <input v-model.number="state.parentHeight" type="number" min="40" max="800" step="10" />
              </label>
              <label>
                <span>边框粗细</span>
                <input v-model.number="state.borderWidth" type="number" min="0" max="12" step="1" />
              </label>
              <slot name="column-2" :state="state" />
            </section>

            <section class="element-style-playground__column">
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
              <slot name="column-3" :state="state" />
            </section>

            <section class="element-style-playground__column">
              <label class="element-style-playground__check">
                <input v-model="state.parentFullWidth" type="checkbox" />
                <span>父元素撑满宽度</span>
              </label>
              <label class="element-style-playground__check">
                <input v-model="state.parentFullHeight" type="checkbox" />
                <span>父元素撑满高度</span>
              </label>
              <label class="element-style-playground__check">
                <input v-model="state.showActiveBorder" type="checkbox" />
                <span>显示激活边框</span>
              </label>
              <slot name="column-4" :state="state" />
            </section>
          </div>
        </section>

        <section class="element-style-playground__area">
          <h3 class="element-style-playground__area-title">接口</h3>
          <div class="element-style-playground__area-grid">
            <slot name="interfaces" :state="state">
              <p class="element-style-playground__empty">暂无公开接口调试项</p>
            </slot>
          </div>
        </section>

        <section class="element-style-playground__area">
          <h3 class="element-style-playground__area-title">类型</h3>
          <div class="element-style-playground__area-grid">
            <slot name="types" :state="state">
              <p class="element-style-playground__empty">暂无公开类型调试项</p>
            </slot>
          </div>
        </section>

        <section class="element-style-playground__area">
          <h3 class="element-style-playground__area-title">事件</h3>
          <div class="element-style-playground__area-grid">
            <slot name="events" :state="state">
              <p class="element-style-playground__empty">暂无公开事件调试项</p>
            </slot>
          </div>
        </section>
      </slot>
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

.element-style-playground__parent {
  align-items: center;
  background: #e8f7ec;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  max-width: 100%;
  padding: 10px;
}

.element-style-playground__controls {
  display: grid;
  gap: 16px;
  overflow-x: auto;
  padding: 16px;
}

.element-style-playground__area {
  display: grid;
  gap: 10px;
  min-width: max-content;
}

.element-style-playground__area-title {
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.element-style-playground__area-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 180px);
}

.element-style-playground__column {
  align-content: start;
  display: grid;
  gap: 12px;
  width: 180px;
}

.element-style-playground__controls label,
.element-style-playground__controls :deep(label) {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 6px;
  justify-content: space-between;
  min-width: 0;
}

.element-style-playground__controls span,
.element-style-playground__controls :deep(span) {
  flex: 0 1 92px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.element-style-playground__empty {
  color: #64748b;
  font-size: 13px;
  margin: 0;
}

.element-style-playground__check {
  justify-content: flex-start;
}

.element-style-playground__controls input,
.element-style-playground__controls select,
.element-style-playground__controls :deep(input),
.element-style-playground__controls :deep(select) {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  flex: 0 0 72px;
  min-height: 32px;
  min-width: 0;
  padding: 0 6px;
  width: 72px;
}

.element-style-playground__controls input[type='color'],
.element-style-playground__controls :deep(input[type='color']) {
  flex-basis: 48px;
  padding: 2px;
  width: 48px;
}

.element-style-playground__controls input[type='checkbox'],
.element-style-playground__controls :deep(input[type='checkbox']) {
  flex-basis: auto;
  min-height: auto;
  width: auto;
}
</style>
