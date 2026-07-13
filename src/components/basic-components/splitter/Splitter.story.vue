<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XSplitPane, XSplitter } from './index'
import type { SplitterDirection, SplitterResizePayload } from './src/types'
import '../../../styles/index.css'

const appearance = reactive({
  direction: 'horizontal' as SplitterDirection,
  splitterSize: 6,
  splitterColor: '#d8e2e8',
  activeSplitterColor: '#5b6b9a',
  firstMinSize: 100,
  secondMinSize: 120,
  thirdMinSize: 100,
  firstPadding: '12px',
  secondPadding: '12px',
  thirdPadding: '12px',
  firstLocked: false,
  secondLocked: false,
  thirdLocked: false
})
const sizes = ref([160, 260, 220])
const eventLog = ref('等待拖拽')
const parentSize = computed(() => (appearance.direction === 'horizontal' ? { width: '100%', height: '260px' } : { width: '100%', height: '360px' }))

function recordEvent(name: string, payload: SplitterResizePayload) {
  eventLog.value = `${name}: 分隔条 ${payload.index + 1}，尺寸 [${payload.sizes.map((size) => Math.round(size)).join(', ')}]`
}
</script>

<template>
  <Story title="基础组件/Splitter 可拖拽分栏" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default="styleProps">
          <XSplitter
            v-bind="styleProps"
            v-model="sizes"
            :direction="appearance.direction"
            :height="parentSize.height"
            :splitter-size="appearance.splitterSize"
            :splitter-color="appearance.splitterColor"
            :active-splitter-color="appearance.activeSplitterColor"
            @resize-start="recordEvent('开始调整', $event)"
            @resize="recordEvent('调整中', $event)"
            @resize-end="recordEvent('调整结束', $event)"
          >
            <XSplitPane :min-size="appearance.firstMinSize" :padding="appearance.firstPadding" :locked="appearance.firstLocked"><div class="splitter-story-pane pane-one">栏位一</div></XSplitPane>
            <XSplitPane :min-size="appearance.secondMinSize" :padding="appearance.secondPadding" :locked="appearance.secondLocked"><div class="splitter-story-pane pane-two">栏位二</div></XSplitPane>
            <XSplitPane :min-size="appearance.thirdMinSize" :padding="appearance.thirdPadding" :locked="appearance.thirdLocked"><div class="splitter-story-pane pane-three">栏位三</div></XSplitPane>
          </XSplitter>
        </template>

        <template #column-1>
          <label><span>方向</span><select v-model="appearance.direction"><option value="horizontal">horizontal</option><option value="vertical">vertical</option></select></label>
          <label><span>分隔拖拽区尺寸</span><input v-model.number="appearance.splitterSize" type="number" min="2" max="20" /></label>
          <label><span>分隔条颜色</span><input v-model="appearance.splitterColor" type="color" /></label>
          <label><span>激活分隔条色</span><input v-model="appearance.activeSplitterColor" type="color" /></label>
        </template>
        <template #column-2>
          <label><span>首栏最小尺寸</span><input v-model.number="appearance.firstMinSize" type="number" min="0" /></label>
          <label><span>中栏最小尺寸</span><input v-model.number="appearance.secondMinSize" type="number" min="0" /></label>
          <label><span>末栏最小尺寸</span><input v-model.number="appearance.thirdMinSize" type="number" min="0" /></label>
          <label><span>绑定值</span><input :value="sizes.join(', ')" readonly /></label>
          <label><span>首栏内边距</span><input v-model="appearance.firstPadding" /></label>
          <label><span>中栏内边距</span><input v-model="appearance.secondPadding" /></label>
          <label><span>末栏内边距</span><input v-model="appearance.thirdPadding" /></label>
        </template>
        <template #column-3>
          <label class="splitter-story-check"><input v-model="appearance.firstLocked" type="checkbox" /><span>锁定首栏</span></label>
          <label class="splitter-story-check"><input v-model="appearance.secondLocked" type="checkbox" /><span>锁定中栏</span></label>
          <label class="splitter-story-check"><input v-model="appearance.thirdLocked" type="checkbox" /><span>锁定末栏</span></label>
        </template>
        <template #interfaces><p class="splitter-story-text"><code>v-model</code> 使用与面板顺序一致的像素数组；默认显示 1px 分隔线，悬停时显示方向箭头并可在分隔区附近拖拽。</p></template>
        <template #types><p class="splitter-story-text"><code>SplitterDirection = 'horizontal' | 'vertical'</code></p></template>
        <template #events><p class="splitter-story-text">{{ eventLog }}</p></template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.splitter-story-pane { align-items: center; box-sizing: border-box; display: flex; font-weight: 700; height: 100%; justify-content: center; min-width: 0; padding: 12px; }
.pane-one { background: #e0ecff; }.pane-two { background: #f8fafc; }.pane-three { background: #f0fdf4; }
.splitter-story-check { justify-content: flex-start; }.splitter-story-text { color: #102a43; font-size: 13px; grid-column: 1 / -1; margin: 0; }
</style>
