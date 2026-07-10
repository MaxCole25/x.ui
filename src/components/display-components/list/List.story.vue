<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ElementStylePlayground from '../../_story/ElementStylePlayground.vue'
import { XList } from './index'
import '../../../styles/index.css'
import type { ListItem, ListItemAlign, ListItemContentWidthMode, ListItemReorderPayload, ListItemValue } from './src/types'

const selectedValue = ref<ListItemValue>('audit')
const eventState = reactive({
  change: 'audit',
  itemClick: '审核中心',
  loadMore: 0,
  itemReorder: '暂无'
})
const appearance = reactive({
  disabled: false,
  draggable: true,
  size: 'md',
  height: 220,
  maxHeight: 260,
  bordered: true,
  hoverable: true,
  enableEqualItemHeight: false,
  itemAlign: 'stretch',
  itemContentWidthMode: 'auto',
  itemContentWidth: '',
  itemContentMaxWidth: '',
  itemGap: 8,
  itemRadius: 6,
  padding: '',
  titleFontSize: '',
  titleTextColor: '#0f172a',
  descriptionFontSize: '',
  descriptionTextColor: '#64748b',
  iconFontSize: '',
  iconTextColor: '#0f172a',
  extraFontSize: '',
  extraTextColor: '#64748b',
  activeBackgroundColor: '#e0f2fe',
  activeBorderColor: '#0284c7',
  activeTextColor: '#075985',
  loading: false,
  loadingText: '加载中',
  finished: false,
  finishedText: '没有更多了',
  loadOffset: 80,
  slotMode: '局部插槽',
  scene: '普通列表'
})

const listItems = ref<ListItem[]>([
  { value: 'audit', title: '审核中心', description: '12 条待处理审批，包含合同和付款申请。', icon: '审', extra: '待办 12' },
  { value: 'order', title: '订单同步', description: '最近同步于 09:30，队列运行正常。', icon: '单', extra: '正常' },
  { value: 'risk', title: '风险提醒', description: '命中 3 条高优先级策略，建议尽快复核。', icon: '险', extra: '高' },
  { value: 'archive', title: '归档记录', description: '当前账号暂无归档权限。', icon: '档', extra: '禁用', disabled: true },
  { value: 'report', title: '日报汇总', description: '昨日经营日报已生成，可进入查看详情。', icon: '报', extra: '已生成' }
])

const alignedItems = ref<ListItem[]>([
  { value: 'notice-1', title: '系统通知', description: '你的申请已经进入复核流程，请留意后续状态变化。', icon: '通', extra: '09:12', align: 'start' },
  { value: 'notice-2', title: '处理记录', description: '已提交补充材料，等待业务方确认。', icon: '记', extra: '09:18', align: 'end' },
  { value: 'notice-3', title: '风险提醒', description: '当前对象命中高优先级策略，需要补充说明后继续流转。', icon: '险', extra: '09:24', align: 'start' },
  { value: 'notice-4', title: '操作完成', description: '复核结果已同步到当前列表。', icon: '完', extra: '09:30', align: 'end' }
])

const listStyle = computed(() => ({
  width: '100%'
}))
const listSize = computed(() => appearance.size as 'sm' | 'md' | 'lg')
const itemAlign = computed(() => appearance.itemAlign as ListItemAlign)
const itemContentWidthMode = computed(() => appearance.itemContentWidthMode as ListItemContentWidthMode)
const currentItems = computed(() => (appearance.scene === '左右对齐' ? alignedItems.value : listItems.value))
const itemContentWidth = computed(() => appearance.itemContentWidth || undefined)
const itemContentMaxWidth = computed(() => appearance.itemContentMaxWidth || undefined)

function handleChange(value: ListItemValue, item: ListItem) {
  eventState.change = String(value)
  eventState.itemClick = item.title ?? String(value)
}

function handleItemClick(payload: { item: ListItem }) {
  eventState.itemClick = payload.item.title ?? String(payload.item.value)
}

function handleLoadMore() {
  eventState.loadMore += 1
}

function handleItemReorder(payload: ListItemReorderPayload) {
  eventState.itemReorder = `${payload.sourceValue} -> ${payload.targetValue} (${payload.position})`
  if (appearance.scene === '左右对齐') {
    alignedItems.value = payload.items
    return
  }

  listItems.value = payload.items
}
</script>

<template>
  <Story title="展示组件/List 列表" group="components">
    <Variant title="外观接口">
      <ElementStylePlayground>
        <template #default>
          <XList
            v-model="selectedValue"
            :items="currentItems"
            :disabled="appearance.disabled"
            :draggable="appearance.draggable"
            :size="listSize"
            :height="appearance.height"
            :max-height="appearance.maxHeight"
            :bordered="appearance.bordered"
            :hoverable="appearance.hoverable"
            :enable-equal-item-height="appearance.enableEqualItemHeight"
            :item-align="itemAlign"
            :item-content-width-mode="itemContentWidthMode"
            :item-content-width="itemContentWidth"
            :item-content-max-width="itemContentMaxWidth"
            :item-gap="appearance.itemGap"
            :item-radius="appearance.itemRadius"
            :padding="appearance.padding || undefined"
            :title-font-size="appearance.titleFontSize || undefined"
            :title-text-color="appearance.titleTextColor"
            :description-font-size="appearance.descriptionFontSize || undefined"
            :description-text-color="appearance.descriptionTextColor"
            :icon-font-size="appearance.iconFontSize || undefined"
            :icon-text-color="appearance.iconTextColor"
            :extra-font-size="appearance.extraFontSize || undefined"
            :extra-text-color="appearance.extraTextColor"
            :active-background-color="appearance.activeBackgroundColor"
            :active-border-color="appearance.activeBorderColor"
            :active-text-color="appearance.activeTextColor"
            :loading="appearance.loading"
            :loading-text="appearance.loadingText"
            :finished="appearance.finished"
            :finished-text="appearance.finishedText"
            :load-offset="appearance.loadOffset"
            :style="listStyle"
            @change="handleChange"
            @item-click="handleItemClick"
            @item-reorder="handleItemReorder"
            @load-more="handleLoadMore"
          >
            <template v-if="appearance.slotMode === '局部插槽'" #extra="{ item, active }">
              <span class="list-story-extra" :class="{ 'is-active': active }">{{ item.extra }}</span>
            </template>
            <template v-if="appearance.slotMode === '整项插槽'" #item="{ item, active, disabled }">
              <span class="list-story-custom" :class="{ 'is-active': active, 'is-disabled': disabled }">
                <strong>{{ item.title }}</strong>
                <small>{{ item.description }}</small>
                <em>{{ item.extra }}</em>
              </span>
            </template>
            <template #loading>
              <span class="list-story-footer">正在加载更多信息块...</span>
            </template>
            <template #finished>
              <span class="list-story-footer">全部信息块已加载</span>
            </template>
          </XList>
        </template>
        <template #column-1>
          <label><span>尺寸</span><select v-model="appearance.size"><option value="sm">sm</option><option value="md">md</option><option value="lg">lg</option></select></label>
          <label><span>高度</span><input v-model.number="appearance.height" type="number" min="120" max="520" /></label>
          <label><span>最大高度</span><input v-model.number="appearance.maxHeight" type="number" min="120" max="640" /></label>
          <label><span>内边距</span><input v-model="appearance.padding" placeholder="如 0 8px" /></label>
          <label><span>条目间距</span><input v-model.number="appearance.itemGap" type="number" min="0" max="32" /></label>
          <label><span>圆角</span><input v-model.number="appearance.itemRadius" type="number" min="0" max="24" /></label>
          <label><span>数据示例</span><select v-model="appearance.scene"><option>普通列表</option><option>左右对齐</option></select></label>
        </template>
        <template #column-2>
          <label><span>绑定值</span><input :value="selectedValue" type="text" readonly /></label>
          <label><span>加载文案</span><input v-model="appearance.loadingText" /></label>
          <label><span>完成文案</span><input v-model="appearance.finishedText" /></label>
          <label><span>加载距离</span><input v-model.number="appearance.loadOffset" type="number" min="0" max="240" /></label>
          <label><span>标题字号</span><input v-model="appearance.titleFontSize" placeholder="如 12px" /></label>
          <label><span>描述字号</span><input v-model="appearance.descriptionFontSize" placeholder="如 12px" /></label>
          <label><span>内容对齐</span><select v-model="appearance.itemAlign"><option value="stretch">stretch</option><option value="start">start</option><option value="end">end</option></select></label>
          <label><span>宽度模式</span><select v-model="appearance.itemContentWidthMode"><option value="auto">auto</option><option value="equal">equal</option></select></label>
        </template>
        <template #column-3>
          <label><span>标题颜色</span><input v-model="appearance.titleTextColor" type="color" /></label>
          <label><span>描述颜色</span><input v-model="appearance.descriptionTextColor" type="color" /></label>
          <label><span>激活背景色</span><input v-model="appearance.activeBackgroundColor" type="color" /></label>
          <label><span>激活边框色</span><input v-model="appearance.activeBorderColor" type="color" /></label>
          <label><span>激活文字色</span><input v-model="appearance.activeTextColor" type="color" /></label>
          <label><span>插槽模式</span><select v-model="appearance.slotMode"><option>局部插槽</option><option>整项插槽</option><option>默认模板</option></select></label>
          <label><span>内容宽度</span><input v-model="appearance.itemContentWidth" placeholder="如 280px" /></label>
          <label><span>最大宽度</span><input v-model="appearance.itemContentMaxWidth" placeholder="如 72%" /></label>
        </template>
        <template #column-4>
          <label><span>图标字号</span><input v-model="appearance.iconFontSize" placeholder="如 14px" /></label>
          <label><span>右侧字号</span><input v-model="appearance.extraFontSize" placeholder="如 12px" /></label>
          <label><span>图标颜色</span><input v-model="appearance.iconTextColor" type="color" /></label>
          <label><span>右侧颜色</span><input v-model="appearance.extraTextColor" type="color" /></label>
          <label class="story-check"><input v-model="appearance.disabled" type="checkbox" /><span>禁用</span></label>
          <label class="story-check"><input v-model="appearance.draggable" type="checkbox" /><span>可拖拽</span></label>
          <label class="story-check"><input v-model="appearance.bordered" type="checkbox" /><span>显示边框</span></label>
          <label class="story-check"><input v-model="appearance.hoverable" type="checkbox" /><span>悬停反馈</span></label>
          <label class="story-check"><input v-model="appearance.enableEqualItemHeight" type="checkbox" /><span>启用等高信息块</span></label>
          <label class="story-check"><input v-model="appearance.loading" type="checkbox" /><span>加载中</span></label>
          <label class="story-check"><input v-model="appearance.finished" type="checkbox" /><span>加载完成</span></label>
        </template>
        <template #interfaces>
          <p class="story-note">Props 覆盖选中值、数据项、尺寸、禁用、拖拽、边框、等高信息块、内容对齐、内容宽度模式、内容宽度、内边距、条目间距、标题/描述/图标/右侧字号颜色、选中色、加载状态、完成状态和滚动触发距离。</p>
        </template>
        <template #types>
          <p class="story-note"><code>ListItemValue</code>、<code>ListItemAlign</code>、<code>ListItemContentWidthMode</code>、<code>ListReorderPosition</code>、<code>ListItem</code>、<code>ListItemSlotProps</code>、<code>ListItemClickPayload</code>、<code>ListItemReorderPayload</code>、<code>ListProps</code></p>
        </template>
        <template #events>
          <p class="story-note">change: {{ eventState.change }}；item-click: {{ eventState.itemClick }}；item-reorder: {{ eventState.itemReorder }}；load-more: {{ eventState.loadMore }} 次</p>
        </template>
      </ElementStylePlayground>
    </Variant>
  </Story>
</template>

<style scoped>
.story-note {
  color: #64748b;
  font-size: 13px;
  margin: 0;
}

.list-story-extra {
  border: 1px solid #bae6fd;
  border-radius: 999px;
  color: #0369a1;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 12px;
  line-height: 1.4;
  padding: 1px 8px;
  white-space: nowrap;
}

.list-story-extra.is-active {
  background: #0284c7;
  color: #fff;
}

.list-story-custom {
  align-items: center;
  display: grid;
  gap: 4px;
  grid-template-columns: minmax(0, 1fr) auto;
  width: 100%;
}

.list-story-custom strong,
.list-story-custom small {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.list-story-custom strong {
  font-size: 13px;
}

.list-story-custom small {
  color: #64748b;
  font-size: 12px;
}

.list-story-custom em {
  color: #0284c7;
  font-style: normal;
  grid-row: 1 / span 2;
}

.list-story-custom.is-disabled {
  opacity: 0.7;
}

.list-story-footer {
  color: #64748b;
}
</style>
