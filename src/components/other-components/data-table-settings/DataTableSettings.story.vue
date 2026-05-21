<script setup lang="ts">
import { computed, ref } from 'vue'
import { XCheckbox } from '../../form-components/checkbox'
import { XInput } from '../../form-components/input'
import { XSwitch } from '../../form-components/switch'
import { XDataTableSettings } from './index'
import type {
  DataTableSettingsAdapter,
  DataTableSettingsColumnMeta,
  DataTableSettingsDataSourceOption,
  DataTableSettingsRow,
  DataTableSettingsTable
} from './src/types'
import '../../../styles/index.css'

const parentWidth = ref(980)
const parentHeight = ref(560)
const fillWidth = ref(true)
const fillHeight = ref(false)
const height = ref('100%')
const saveButtonText = ref('保存配置')
const showTableMeta = ref(true)
const backgroundColor = ref('#ffffff')
const textColor = ref('#0f172a')
const borderColor = ref('#d7e3f0')
const metaTextColor = ref('#64748b')
const headerBackgroundColor = ref('#f3f7fb')
const headerTextColor = ref('#0f172a')
const bodyBackgroundColor = ref('#ffffff')
const bodyStripeBackgroundColor = ref('#f8fafc')
const bodyTextColor = ref('#0f172a')
const controlBackgroundColor = ref('#ffffff')
const controlTextColor = ref('#0f172a')
const controlBorderColor = ref('#cbd5e1')
const dropdownBackgroundColor = ref('#ffffff')
const saveButtonBackgroundColor = ref('#1264f4')
const saveButtonTextColor = ref('#ffffff')
const saveButtonBorderColor = ref('#1264f4')
const saveButtonActiveBackgroundColor = ref('#0f56d9')
const saveButtonActiveBorderColor = ref('#0f56d9')
const saveButtonActiveTextColor = ref('#ffffff')
const loadingDelay = ref(false)
const failLoading = ref(false)
const failSaving = ref(false)
const lastEvent = ref('暂无事件')

const tables: DataTableSettingsTable[] = [
  {
    tableKey: 'contracts',
    label: '合同信息',
    physicalTableName: 'SjHeTongXinXiSet',
    modelName: 'ContractInfo',
    group: 'Business',
    businessKeys: [{ key: 'contractNumber', label: '合同编号' }]
  },
  {
    tableKey: 'customers',
    label: '客户信息',
    physicalTableName: 'SjKeHuXinXiSet',
    modelName: 'CustomerInfo',
    group: 'Business',
    businessKeys: [{ key: 'customerId', label: '客户ID' }]
  }
]

const columnsByTable: Record<string, DataTableSettingsColumnMeta[]> = {
  contracts: [
    { key: 'contractNumber', label: '合同编号', type: 'number', editType: 'input', isKey: true, keyType: 'primary', align: 'right', sortOrder: 10 },
    { key: 'contractDate', label: '合同日期', type: 'date', editType: 'date', align: 'center', sortOrder: 20 },
    { key: 'customerId', label: '客户ID', type: 'number', editType: 'autocomplete', dataSourceKey: 'customers', align: 'right', sortOrder: 30 },
    { key: 'contractAmount', label: '合同金额', type: 'number', editType: 'input', align: 'right', sortOrder: 40 }
  ],
  customers: [
    { key: 'customerId', label: '客户ID', type: 'number', editType: 'input', isKey: true, keyType: 'primary', align: 'right', sortOrder: 10 },
    { key: 'name', label: '客户名称', type: 'text', editType: 'input', isSortable: true, align: 'left', sortOrder: 20 },
    { key: 'industry', label: '行业', type: 'tag', editType: 'select', dataSourceKey: 'industries', align: 'left', sortOrder: 30 }
  ]
}

const settingsByTable: Record<string, DataTableSettingsRow[]> = {
  contracts: [
    { columnKey: 'contractNumber', columnLabel: '合同编号', displayType: 'number', editType: 'input', dataSourceKey: '', isKey: true, keyType: 'primary', isHidden: false, isSortable: true, align: 'right', defaultFormatter: '', sortOrder: 10 },
    { columnKey: 'contractDate', columnLabel: '签订日期', displayType: 'date', editType: 'date', dataSourceKey: '', isKey: false, keyType: '', isHidden: false, isSortable: true, align: 'center', defaultFormatter: '', sortOrder: 20 },
    { columnKey: 'customerId', columnLabel: '客户', displayType: 'text', editType: 'autocomplete', dataSourceKey: 'customers', isKey: true, keyType: 'normal', isHidden: false, isSortable: false, align: 'left', defaultFormatter: '', sortOrder: 30 },
    { columnKey: 'contractAmount', columnLabel: '合同金额', displayType: 'number', editType: 'input', dataSourceKey: '', isKey: false, keyType: '', isHidden: false, isSortable: true, align: 'right', defaultFormatter: '(value) => `￥${value}`', sortOrder: 40 }
  ],
  customers: []
}

const dataSources: DataTableSettingsDataSourceOption[] = [
  { key: 'customers', label: '客户字典', name: '客户字典', valueCount: 128 },
  { key: 'industries', label: '行业分类', name: '行业分类', valueCount: 12 }
]

function wait() {
  return loadingDelay.value ? new Promise((resolve) => window.setTimeout(resolve, 600)) : Promise.resolve()
}

const adapter = computed<DataTableSettingsAdapter>(() => ({
  async loadTables() {
    await wait()
    if (failLoading.value) {
      throw new Error('模拟加载失败')
    }
    return tables
  },
  async loadColumns(table) {
    await wait()
    return columnsByTable[table.tableKey] ?? []
  },
  async loadSettings(table) {
    await wait()
    return settingsByTable[table.tableKey] ?? []
  },
  async loadDataSources() {
    await wait()
    return dataSources
  },
  async saveSettings(table, rows) {
    await wait()
    if (failSaving.value) {
      throw new Error('模拟保存失败')
    }
    settingsByTable[table.tableKey] = rows
    return { ok: true }
  }
}))

const parentStyle = computed(() => ({
  width: fillWidth.value ? '100%' : `${parentWidth.value}px`,
  height: fillHeight.value ? '100%' : `${parentHeight.value}px`
}))
</script>

<template>
  <Story title="其它组件/DataTableSettings 数据表设置">
    <Variant title="外观接口">
      <div class="story-shell" :style="parentStyle">
        <XDataTableSettings
          :adapter="adapter"
          :height="height"
          :save-button-text="saveButtonText"
          :show-table-meta="showTableMeta"
          :background-color="backgroundColor"
          :text-color="textColor"
          :border-color="borderColor"
          :meta-text-color="metaTextColor"
          :header-background-color="headerBackgroundColor"
          :header-text-color="headerTextColor"
          :body-background-color="bodyBackgroundColor"
          :body-stripe-background-color="bodyStripeBackgroundColor"
          :body-text-color="bodyTextColor"
          :control-background-color="controlBackgroundColor"
          :control-text-color="controlTextColor"
          :control-border-color="controlBorderColor"
          :dropdown-background-color="dropdownBackgroundColor"
          :save-button-background-color="saveButtonBackgroundColor"
          :save-button-text-color="saveButtonTextColor"
          :save-button-border-color="saveButtonBorderColor"
          :save-button-active-background-color="saveButtonActiveBackgroundColor"
          :save-button-active-border-color="saveButtonActiveBorderColor"
          :save-button-active-text-color="saveButtonActiveTextColor"
          @loaded="lastEvent = `已加载 ${$event.rows.length} 个字段`"
          @table-change="lastEvent = $event ? `切换到 ${$event.label}` : '未选择数据表'"
          @save-success="lastEvent = `已保存 ${$event.rows.length} 个字段`"
          @save-error="lastEvent = '保存失败'"
          @load-error="lastEvent = `加载失败：${$event.stage}`"
        />
      </div>

      <template #controls>
        <div class="story-controls">
          <section>
            <h4>属性</h4>
            <label><span>父元素宽度</span><XInput v-model="parentWidth" type="number" /></label>
            <label><span>父元素高度</span><XInput v-model="parentHeight" type="number" /></label>
            <label><span>组件高度</span><XInput v-model="height" /></label>
            <label><span>保存按钮</span><XInput v-model="saveButtonText" /></label>
            <label><span>父元素撑满宽度</span><XCheckbox v-model="fillWidth" /></label>
            <label><span>父元素撑满高度</span><XCheckbox v-model="fillHeight" /></label>
            <label><span>显示表元信息</span><XSwitch v-model="showTableMeta" /></label>
            <label><span>背景色</span><input v-model="backgroundColor" type="color" /></label>
            <label><span>文字色</span><input v-model="textColor" type="color" /></label>
            <label><span>边框色</span><input v-model="borderColor" type="color" /></label>
            <label><span>元信息色</span><input v-model="metaTextColor" type="color" /></label>
            <label><span>表头背景色</span><input v-model="headerBackgroundColor" type="color" /></label>
            <label><span>表头文字色</span><input v-model="headerTextColor" type="color" /></label>
            <label><span>表体背景色</span><input v-model="bodyBackgroundColor" type="color" /></label>
            <label><span>表体斑马纹色</span><input v-model="bodyStripeBackgroundColor" type="color" /></label>
            <label><span>表体文字色</span><input v-model="bodyTextColor" type="color" /></label>
            <label><span>控件背景色</span><input v-model="controlBackgroundColor" type="color" /></label>
            <label><span>控件文字色</span><input v-model="controlTextColor" type="color" /></label>
            <label><span>控件边框色</span><input v-model="controlBorderColor" type="color" /></label>
            <label><span>下拉背景色</span><input v-model="dropdownBackgroundColor" type="color" /></label>
            <label><span>按钮背景色</span><input v-model="saveButtonBackgroundColor" type="color" /></label>
            <label><span>按钮文字色</span><input v-model="saveButtonTextColor" type="color" /></label>
            <label><span>按钮边框色</span><input v-model="saveButtonBorderColor" type="color" /></label>
            <label><span>按钮按下背景色</span><input v-model="saveButtonActiveBackgroundColor" type="color" /></label>
            <label><span>按钮按下边框色</span><input v-model="saveButtonActiveBorderColor" type="color" /></label>
            <label><span>按钮按下文字色</span><input v-model="saveButtonActiveTextColor" type="color" /></label>
          </section>
          <section>
            <h4>接口</h4>
            <label><span>加载延迟</span><XSwitch v-model="loadingDelay" /></label>
            <label><span>加载失败</span><XSwitch v-model="failLoading" /></label>
            <label><span>保存失败</span><XSwitch v-model="failSaving" /></label>
          </section>
          <section>
            <h4>类型</h4>
            <p>DataTableSettingsAdapter</p>
            <p>DataTableSettingsTable</p>
            <p>DataTableSettingsRow</p>
          </section>
          <section>
            <h4>事件</h4>
            <p>{{ lastEvent }}</p>
          </section>
        </div>
      </template>
    </Variant>
  </Story>
</template>

<style scoped>
.story-shell {
  box-sizing: border-box;
  display: grid;
  margin: 0 auto;
  min-height: 360px;
  min-width: 320px;
  padding: 10px;
}

.story-controls {
  display: grid;
  gap: 10px;
}

.story-controls section {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(4, 180px);
}

.story-controls h4 {
  grid-column: 1 / -1;
  margin: 0;
}

.story-controls label {
  align-items: center;
  display: grid;
  gap: 6px;
  grid-template-columns: 72px minmax(0, 1fr);
}

.story-controls span,
.story-controls p {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.story-controls input[type='color'] {
  box-sizing: border-box;
  height: 28px;
  max-width: 100%;
  width: 100%;
}
</style>
