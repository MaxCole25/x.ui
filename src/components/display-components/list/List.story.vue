<script setup lang="ts">
import ApiPlayground from '../../_story/ApiPlayground.vue'
import { XList } from './index'
import type { ListItem } from './src/types'
import '../../../styles/index.css'

const items: ListItem[] = [
  { value: 'audit', title: '审核中心', description: '12 条待处理审批，包含合同和付款申请。', icon: '审', extra: '待办 12' },
  { value: 'order', title: '订单同步', description: '最近同步于 09:30，队列运行正常。', icon: '单', extra: '正常' },
  { value: 'risk', title: '风险提醒', description: '命中 3 条高优先级策略，建议尽快复核。', icon: '险', extra: '高' },
  { value: 'archive', title: '归档记录', description: '当前账号暂无归档权限。', icon: '档', extra: '禁用', disabled: true },
  { value: 'report', title: '日报汇总', description: '昨日经营日报已生成，可进入查看详情。', icon: '报', extra: '已生成' }
]
const initialProps = { modelValue: 'audit', items, height: 360, draggable: false }
</script>

<template>
  <Story title="展示组件/List 列表" group="components">
    <Variant title="外观接口">
      <ApiPlayground component="XList" :initial-props="initialProps">
        <template #default="{ apiProps, apiEvents, captureInstance }">
          <XList v-bind="apiProps" v-on="apiEvents" @item-reorder="apiProps.items = $event.items" @vue:mounted="captureInstance" />
        </template>
      </ApiPlayground>
    </Variant>
  </Story>
</template>
