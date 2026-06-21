<script setup lang="ts">
import { reactive, ref } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XSteps } from './index'
import '../../../styles/index.css'

const page = ref(1)
const activeNames = ref(['base'])
const steps = [{ title: '填写信息', description: '录入基础资料' }, { title: '确认内容', description: '核对字段' }, { title: '提交完成', description: '等待处理' }]
const collapseItems = [{ name: 'base', title: '基础信息', content: '这里展示基础设置。' }, { name: 'advanced', title: '高级设置', content: '这里展示高级参数。' }]
const descriptionItems = [{ label: '客户', value: '杭州示例科技' }, { label: '状态', value: '进行中' }, { label: '负责人', value: '运营组' }]
const appearance = reactive({ disabled: false, drag: false, status: 'success', variant: 'light', content: '这里展示更多字段说明', title: '步骤条', percentage: 64, dot: false, hidden: false, current: 1 })
</script>

<template>
  <Story title="导航组件/Steps 步骤条" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default>
          <XSteps :items="steps" :model-value="1" />
        </template>
        <template #column-1>
          <label><span>标题</span><input v-model="appearance.title" /></label>
          <label><span>内容</span><input v-model="appearance.content" /></label>
        </template>
        <template #column-2>
          <label><span>状态</span><select v-model="appearance.status"><option value="success">success</option><option value="warning">warning</option><option value="info">info</option><option value="error">error</option></select></label>
          <label><span>进度</span><input v-model.number="appearance.percentage" type="number" min="0" max="100" /></label>
        </template>
        <template #column-4>
          <label class="story-check"><input v-model="appearance.disabled" type="checkbox" /><span>禁用</span></label>
          <label class="story-check"><input v-model="appearance.drag" type="checkbox" /><span>拖拽</span></label>
          <label class="story-check"><input v-model="appearance.dot" type="checkbox" /><span>圆点</span></label>
          <label class="story-check"><input v-model="appearance.hidden" type="checkbox" /><span>隐藏</span></label>
        </template>
        <template #interfaces><p class="story-note">组件公开 Props、事件与插槽可在控制区和文档中核对。</p></template>
        <template #types><p class="story-note">类型定义从 <code>src/types.ts</code> 导出。</p></template>
        <template #events><p class="story-note">交互事件可在 Histoire actions 面板中观察。</p></template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note { color: #64748b; font-size: 13px; margin: 0; }
</style>
