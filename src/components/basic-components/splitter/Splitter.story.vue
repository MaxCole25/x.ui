<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { reactive, ref } from 'vue'
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
function recordEvent(name: string, payload: SplitterResizePayload) {
  eventLog.value = `${name}: 分隔条 ${payload.index + 1}，尺寸 [${payload.sizes.map((size) => Math.round(size)).join(', ')}]`
}
</script>

<template>
  <Story title="基础组件/Splitter 可拖拽分栏" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XSplitter">
        <template #default="{ apiProps = {}, styleProps = {}, apiEvents = {}, captureInstance }">
          <XSplitter
            v-model="sizes"

            @resize-start="recordEvent('开始调整', $event)"
            @resize="recordEvent('调整中', $event)"
            @resize-end="recordEvent('调整结束', $event)"
           v-bind="apiProps" v-on="apiEvents" @vue:mounted="captureInstance" >
            <XSplitPane :min-size="appearance.firstMinSize" :padding="appearance.firstPadding" :locked="appearance.firstLocked"><div class="splitter-story-pane pane-one">栏位一</div></XSplitPane>
            <XSplitPane :min-size="appearance.secondMinSize" :padding="appearance.secondPadding" :locked="appearance.secondLocked"><div class="splitter-story-pane pane-two">栏位二</div></XSplitPane>
            <XSplitPane :min-size="appearance.thirdMinSize" :padding="appearance.thirdPadding" :locked="appearance.thirdLocked"><div class="splitter-story-pane pane-three">栏位三</div></XSplitPane>
          </XSplitter>
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.splitter-story-pane { align-items: center; box-sizing: border-box; display: flex; font-weight: 700; height: 100%; justify-content: center; min-width: 0; padding: 12px; }
.pane-one { background: #e0ecff; }.pane-two { background: #f8fafc; }.pane-three { background: #f0fdf4; }
.splitter-story-check { justify-content: flex-start; }.splitter-story-text { color: #102a43; font-size: 13px; grid-column: 1 / -1; margin: 0; }
</style>
