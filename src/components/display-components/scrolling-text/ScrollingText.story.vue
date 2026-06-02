<script setup lang="ts">
import { computed, reactive } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XScrollingText } from './index'
import type { ScrollingTextDisplayDirection, ScrollingTextFlowDirection } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  text: '系统公告：x.ui 滚动文字组件支持横向、竖向和速度控制。',
  displayDirection: 'horizontal' as ScrollingTextDisplayDirection,
  flowDirection: 'left' as ScrollingTextFlowDirection,
  width: 260,
  height: 96,
  speed: 40,
  fontFamily: 'var(--x-font-family)',
  fontSize: 14,
  textColor: '#12323a',
  backgroundColor: '#ffffff'
})

const fontFamilies = [
  { label: '系统默认', value: 'var(--x-font-family)' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: '微软雅黑', value: '"Microsoft YaHei", sans-serif' },
  { label: '宋体', value: 'SimSun, serif' },
  { label: '等宽字体', value: 'Consolas, "Courier New", monospace' }
]

const flowDirectionOptions = computed(() =>
  appearance.displayDirection === 'horizontal'
    ? [
        { label: '向左', value: 'left' },
        { label: '向右', value: 'right' }
      ]
    : [
        { label: '向上', value: 'up' },
        { label: '向下', value: 'down' }
      ]
)

function syncFlowDirection() {
  if (appearance.displayDirection === 'horizontal' && !['left', 'right'].includes(appearance.flowDirection)) {
    appearance.flowDirection = 'left'
  }

  if (appearance.displayDirection === 'vertical' && !['up', 'down'].includes(appearance.flowDirection)) {
    appearance.flowDirection = 'up'
  }
}
</script>

<template>
  <Story title="展示组件/ScrollingText 滚动文字" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default>
          <XScrollingText
            :display-direction="appearance.displayDirection"
            :flow-direction="appearance.flowDirection"
            :width="appearance.width"
            :height="appearance.height"
            :speed="appearance.speed"
            :font-family="appearance.fontFamily"
            :font-size="appearance.fontSize"
            :text-color="appearance.textColor"
            :background-color="appearance.backgroundColor"
          >
            {{ appearance.text }}
          </XScrollingText>
        </template>

        <template #controls="{ state }">
          <section class="scrolling-text-story__area">
            <h3 class="scrolling-text-story__area-title">属性</h3>
            <div class="scrolling-text-story__grid">
              <section class="scrolling-text-story__column">
                <label>
                  <span>显示方向</span>
                  <select v-model="appearance.displayDirection" @change="syncFlowDirection">
                    <option value="horizontal">横向</option>
                    <option value="vertical">竖向</option>
                  </select>
                </label>
                <label>
                  <span>文字流向</span>
                  <select v-model="appearance.flowDirection">
                    <option v-for="option in flowDirectionOptions" :key="option.value" :value="option.value">
                      {{ option.label }}
                    </option>
                  </select>
                </label>
                <label v-if="appearance.displayDirection === 'horizontal'">
                  <span>宽度</span>
                  <input v-model.number="appearance.width" type="number" min="80" max="1200" step="10" />
                </label>
                <label v-else>
                  <span>高度</span>
                  <input v-model.number="appearance.height" type="number" min="32" max="800" step="10" />
                </label>
              </section>

              <section class="scrolling-text-story__column">
                <label>
                  <span>滚动速度</span>
                  <input v-model.number="appearance.speed" type="number" min="1" max="300" step="1" />
                </label>
                <label>
                  <span>字体样式</span>
                  <select v-model="appearance.fontFamily">
                    <option v-for="font in fontFamilies" :key="font.value" :value="font.value">{{ font.label }}</option>
                  </select>
                </label>
                <label>
                  <span>字体大小</span>
                  <input v-model.number="appearance.fontSize" type="number" min="8" max="72" step="1" />
                </label>
              </section>

              <section class="scrolling-text-story__column">
                <label>
                  <span>字体颜色</span>
                  <input v-model="appearance.textColor" type="color" />
                </label>
                <label>
                  <span>背景色</span>
                  <input v-model="appearance.backgroundColor" type="color" />
                </label>
                <label>
                  <span>父元素宽度</span>
                  <input v-model.number="state.parentWidth" type="number" min="80" max="1200" step="10" />
                </label>
              </section>

              <section class="scrolling-text-story__column">
                <label>
                  <span>父元素高度</span>
                  <input v-model.number="state.parentHeight" type="number" min="40" max="800" step="10" />
                </label>
                <label class="scrolling-text-story__check">
                  <input v-model="state.parentFullWidth" type="checkbox" />
                  <span>父元素撑满宽度</span>
                </label>
                <label class="scrolling-text-story__check">
                  <input v-model="state.parentFullHeight" type="checkbox" />
                  <span>父元素撑满高度</span>
                </label>
              </section>
            </div>
          </section>

          <section class="scrolling-text-story__area">
            <h3 class="scrolling-text-story__area-title">接口</h3>
            <div class="scrolling-text-story__grid">
              <section class="scrolling-text-story__column">
                <label>
                  <span>默认插槽</span>
                  <input v-model="appearance.text" />
                </label>
              </section>
            </div>
          </section>

          <section class="scrolling-text-story__area">
            <h3 class="scrolling-text-story__area-title">类型</h3>
            <div class="scrolling-text-story__grid">
              <p class="scrolling-text-story__empty">
                displayDirection: horizontal | vertical；flowDirection: left | right | up | down。
              </p>
            </div>
          </section>

          <section class="scrolling-text-story__area">
            <h3 class="scrolling-text-story__area-title">事件</h3>
            <div class="scrolling-text-story__grid">
              <p class="scrolling-text-story__empty">暂无公开事件。</p>
            </div>
          </section>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.scrolling-text-story__area {
  display: grid;
  gap: 10px;
  min-width: max-content;
}

.scrolling-text-story__area + .scrolling-text-story__area {
  margin-top: 16px;
}

.scrolling-text-story__area-title {
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  margin: 0;
}

.scrolling-text-story__grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(4, 180px);
}

.scrolling-text-story__column {
  align-content: start;
  display: grid;
  gap: 12px;
  width: 180px;
}

.scrolling-text-story__area label {
  align-items: center;
  color: #102a43;
  display: flex;
  font-size: 14px;
  gap: 6px;
  justify-content: space-between;
  min-width: 0;
}

.scrolling-text-story__area span {
  flex: 0 1 92px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scrolling-text-story__area input,
.scrolling-text-story__area select {
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  box-sizing: border-box;
  flex: 0 0 72px;
  min-height: 32px;
  min-width: 0;
  padding: 0 6px;
  width: 72px;
}

.scrolling-text-story__area input[type='color'] {
  flex-basis: 48px;
  padding: 2px;
  width: 48px;
}

.scrolling-text-story__area input[type='checkbox'] {
  flex-basis: auto;
  min-height: auto;
  width: auto;
}

.scrolling-text-story__check {
  justify-content: flex-start;
}

.scrolling-text-story__empty {
  color: #64748b;
  font-size: 13px;
  margin: 0;
}
</style>
