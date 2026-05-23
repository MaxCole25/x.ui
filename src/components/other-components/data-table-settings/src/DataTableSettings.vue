<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { XButton } from '../../../basic-components/button'
import { XInput } from '../../../form-components/input'
import { XOption, XSelect } from '../../../form-components/select'
import { XSwitch } from '../../../form-components/switch'
import { XDialog } from '../../../feedback-components/dialog'
import { XTable, type TableColumn, type TableRowReorderPayload } from '../../../display-components/table'
import type {
  DataTableSettingsColumnMeta,
  DataTableSettingsDataSourceOption,
  DataTableSettingsEditorType,
  DataTableSettingsErrorPayload,
  DataTableSettingsLoadedPayload,
  DataTableSettingsOption,
  DataTableSettingsProps,
  DataTableSettingsRow,
  DataTableSettingsSavePayload,
  DataTableSettingsTable
} from './types'

defineOptions({ name: 'XDataTableSettings' })

const props = withDefaults(defineProps<DataTableSettingsProps>(), {
  height: '100%',
  emptyText: '暂无字段配置',
  saveButtonText: '保存配置',
  showTableMeta: true,
  displayTypeOptions: () => [
    { label: '默认', value: '' },
    { label: '文本', value: 'text' },
    { label: '标签', value: 'tag' },
    { label: '布尔', value: 'boolean' },
    { label: '日期', value: 'date' },
    { label: '数字', value: 'number' }
  ],
  editorTypeOptions: () => [
    { label: '不编辑', value: '' },
    { label: '输入框', value: 'input' },
    { label: '自动完成', value: 'autocomplete' },
    { label: '下拉选择', value: 'select' },
    { label: '单选框', value: 'radio' },
    { label: '开关', value: 'boolean' },
    { label: '日期', value: 'date' },
    { label: '日期时间', value: 'datetime' }
  ],
  alignOptions: () => [
    { label: '左', value: 'left' },
    { label: '中', value: 'center' },
    { label: '右', value: 'right' }
  ],
  keyTypeOptions: () => [
    { label: '非 Key', value: '' },
    { label: '主 Key', value: 'primary' },
    { label: '普通 Key', value: 'normal' }
  ]
})

const emit = defineEmits<{
  loaded: [payload: DataTableSettingsLoadedPayload]
  'table-change': [table: DataTableSettingsTable | null]
  'save-success': [payload: DataTableSettingsSavePayload]
  'save-error': [payload: DataTableSettingsErrorPayload]
  'load-error': [payload: DataTableSettingsErrorPayload]
}>()

const columns: TableColumn[] = [
  { key: 'columnKey', label: '字段Key', minWidth: 180 },
  { key: 'columnLabel', label: '显示名称', minWidth: 180 },
  { key: 'displayType', label: '显示类型(type)', minWidth: 170 },
  { key: 'editType', label: '编辑类型', minWidth: 170 },
  { key: 'dataSourceKey', label: '数据源', minWidth: 240 },
  { key: 'keyType', label: 'Key', width: 130, align: 'center' },
  { key: 'isHidden', label: '隐藏', width: 100, align: 'center' },
  { key: 'isSortable', label: '可排序', width: 110, align: 'center' },
  { key: 'align', label: '对齐方式', width: 120, align: 'center' },
  { key: 'defaultFormatter', label: '默认格式', minWidth: 160, align: 'center' },
  { key: 'sortOrder', label: '排序', width: 120, align: 'center' }
]

const loading = ref(false)
const settingsLoading = ref(false)
const saving = ref(false)
const tableOptions = ref<DataTableSettingsTable[]>([])
const selectedTableKey = ref('')
const rows = ref<DataTableSettingsRow[]>([])
const dataSourceOptions = ref<DataTableSettingsDataSourceOption[]>([])
const formatterDialogVisible = ref(false)
const formatterEditingKey = ref('')
const formatterDraft = ref('')

const selectedTable = computed(() =>
  tableOptions.value.find((item) => item.tableKey === selectedTableKey.value) ?? null
)

const isBusy = computed(() => loading.value || settingsLoading.value)

const rootStyle = computed(() => ({
  '--x-data-table-settings-bg': props.backgroundColor,
  '--x-data-table-settings-text': props.textColor,
  '--x-data-table-settings-border-color': props.borderColor,
  '--x-data-table-settings-meta-text': props.metaTextColor,
  border: props.borderColor ? '1px solid var(--x-data-table-settings-border-color)' : undefined,
  height: formatCssSize(props.height)
}))

const resolvedControlBackgroundColor = computed(() => props.controlBackgroundColor ?? props.backgroundColor)
const resolvedControlTextColor = computed(() => props.controlTextColor ?? props.textColor)
const resolvedControlBorderColor = computed(() => props.controlBorderColor ?? props.borderColor)
const resolvedDropdownBackgroundColor = computed(() => props.dropdownBackgroundColor ?? props.controlBackgroundColor ?? props.backgroundColor)
const resolvedTableBodyBackgroundColor = computed(() => props.bodyBackgroundColor ?? props.backgroundColor)
const resolvedTableBodyTextColor = computed(() => props.bodyTextColor ?? props.textColor)
const resolvedTableBorderColor = computed(() => props.borderColor)
const resolvedSaveButtonBorderColor = computed(() => props.saveButtonBorderColor ?? props.saveButtonBackgroundColor)

const selectedBusinessKeyText = computed(() => {
  const keys = selectedTable.value?.businessKeys ?? []
  return keys.length > 0 ? keys.map((item) => `${item.label}(${item.key})`).join('、') : '无'
})

const dataSourceSelectOptions = computed(() => [
  { key: '', label: '不使用', valueCount: 0 },
  ...dataSourceOptions.value
])

function formatCssSize(value: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

function canUseDataSource(editType: string) {
  return editType === 'select' || editType === 'radio' || editType === 'autocomplete'
}

function normalizeTextValue(value: unknown) {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? String(value) : ''
}

function normalizeAlign(value: unknown): DataTableSettingsRow['align'] {
  return value === 'left' || value === 'right' || value === 'center' ? value : 'center'
}

function normalizeKeyType(value: unknown, isKey?: boolean): DataTableSettingsRow['keyType'] {
  if (value === 'primary' || value === 'normal') {
    return value
  }
  return isKey ? 'normal' : ''
}

function normalizeOptionValue<T extends string>(value: unknown, options: Array<DataTableSettingsOption<T>>, fallback: T): T {
  return options.some((option) => option.value === value) ? value as T : fallback
}

function createRowFromMeta(meta: DataTableSettingsColumnMeta, index: number): DataTableSettingsRow {
  const keyType = normalizeKeyType(meta.keyType, meta.isKey)
  return {
    columnKey: meta.key,
    columnLabel: meta.label || meta.key,
    displayType: normalizeTextValue(meta.displayType ?? meta.type),
    editType: normalizeTextValue(meta.editType),
    dataSourceKey: normalizeTextValue(meta.dataSourceKey),
    isKey: keyType !== '',
    keyType,
    isHidden: keyType !== '' ? false : Boolean(meta.isHidden),
    isSortable: Boolean(meta.isSortable ?? meta.sortable),
    align: normalizeAlign(meta.align),
    defaultFormatter: meta.defaultFormatter?.trim() || '',
    sortOrder: meta.sortOrder ?? (index + 1) * 10
  }
}

function normalizeRow(row: Partial<DataTableSettingsRow>, index: number): DataTableSettingsRow {
  const keyType = normalizeKeyType(row.keyType, row.isKey)
  const editType = normalizeTextValue(row.editType) as DataTableSettingsEditorType
  return {
    columnKey: normalizeTextValue(row.columnKey),
    columnLabel: normalizeTextValue(row.columnLabel || row.columnKey),
    displayType: normalizeTextValue(row.displayType),
    editType,
    dataSourceKey: canUseDataSource(editType) ? normalizeTextValue(row.dataSourceKey) : '',
    isKey: keyType !== '',
    keyType,
    isHidden: keyType !== '' ? false : Boolean(row.isHidden),
    isSortable: Boolean(row.isSortable),
    align: normalizeAlign(row.align),
    defaultFormatter: normalizeTextValue(row.defaultFormatter).trim(),
    sortOrder: Number(row.sortOrder) || (index + 1) * 10
  }
}

function mergeRows(columnsMeta: DataTableSettingsColumnMeta[], settings: DataTableSettingsRow[]) {
  const settingMap = new Map(settings.map((item) => [item.columnKey.toLowerCase(), item]))
  const merged = columnsMeta.map((meta, index) => {
    const fallback = createRowFromMeta(meta, index)
    const setting = settingMap.get(meta.key.toLowerCase())
    settingMap.delete(meta.key.toLowerCase())
    return normalizeRow({ ...fallback, ...(setting ?? {}) }, index)
  })

  settingMap.forEach((setting) => {
    merged.push(normalizeRow(setting, merged.length))
  })

  return merged
    .filter((item) => item.columnKey)
    .sort((left, right) => Number(left.sortOrder) - Number(right.sortOrder))
}

function updateSettingValue<Key extends keyof DataTableSettingsRow>(
  row: DataTableSettingsRow,
  key: Key,
  value: DataTableSettingsRow[Key]
) {
  rows.value = rows.value.map((item) => {
    if (item.columnKey !== row.columnKey) {
      return item
    }
    const next = {
      ...item,
      [key]: value
    }
    if (key === 'editType' && !canUseDataSource(String(value ?? ''))) {
      next.dataSourceKey = ''
    }
    return next
  })
}

function updateKeyType(row: DataTableSettingsRow, value: DataTableSettingsRow['keyType']) {
  rows.value = rows.value.map((item) => {
    const keyType = item.columnKey === row.columnKey
      ? value
      : item.keyType === 'primary' && value === 'primary'
        ? 'normal'
        : item.keyType

    return {
      ...item,
      keyType,
      isKey: keyType !== '',
      isHidden: keyType !== '' ? false : item.isHidden
    }
  })
}

function openFormatterDialog(row: DataTableSettingsRow) {
  formatterEditingKey.value = row.columnKey
  formatterDraft.value = row.defaultFormatter
  formatterDialogVisible.value = true
}

function saveFormatterDraft() {
  const targetKey = formatterEditingKey.value
  rows.value = rows.value.map((item) =>
    item.columnKey === targetKey
      ? { ...item, defaultFormatter: formatterDraft.value.trim() }
      : item
  )
  formatterDialogVisible.value = false
}

function displayFormatter(row: DataTableSettingsRow) {
  return row.defaultFormatter.trim() ? row.defaultFormatter.trim() : '未设置'
}

function asSettingsRow(row: Record<string, unknown>) {
  return row as unknown as DataTableSettingsRow
}

function handleRowReorder(payload: TableRowReorderPayload) {
  rows.value = payload.rows.map((row, index) => ({
    ...asSettingsRow(row),
    sortOrder: (index + 1) * 10
  }))
}

function buildSaveRows() {
  return rows.value.map((row, index) => {
    const normalized = normalizeRow(row, index)
    return {
      ...normalized,
      isKey: normalized.keyType !== '',
      isHidden: normalized.keyType !== '' ? false : normalized.isHidden,
      dataSourceKey: canUseDataSource(normalized.editType) ? normalized.dataSourceKey : '',
      defaultFormatter: normalized.defaultFormatter.trim(),
      sortOrder: Number(normalized.sortOrder) || 0
    }
  })
}

async function loadDataSources() {
  if (!props.adapter.loadDataSources) {
    dataSourceOptions.value = []
    return
  }

  try {
    const next = await props.adapter.loadDataSources()
    dataSourceOptions.value = Array.isArray(next) ? next : []
  } catch (error) {
    dataSourceOptions.value = []
    emit('load-error', { stage: 'dataSources', error })
  }
}

async function reloadSettings() {
  const table = selectedTable.value
  if (!table) {
    rows.value = []
    emit('loaded', { table: null, rows: [] })
    return
  }

  settingsLoading.value = true
  try {
    const [columnsMeta, settings] = await Promise.all([
      props.adapter.loadColumns(table),
      props.adapter.loadSettings(table)
    ])
    rows.value = mergeRows(
      Array.isArray(columnsMeta) ? columnsMeta : [],
      Array.isArray(settings) ? settings : []
    )
    emit('loaded', { table, rows: rows.value.map((row) => ({ ...row })) })
  } catch (error) {
    rows.value = []
    emit('load-error', { stage: 'settings', error })
  } finally {
    settingsLoading.value = false
  }
}

async function reloadTables() {
  loading.value = true
  try {
    await loadDataSources()
    const tables = await props.adapter.loadTables()
    tableOptions.value = Array.isArray(tables) ? tables : []
    const preferredKey = props.initialTableKey && tableOptions.value.some((item) => item.tableKey === props.initialTableKey)
      ? props.initialTableKey
      : tableOptions.value[0]?.tableKey ?? ''
    selectedTableKey.value = preferredKey
    emit('table-change', selectedTable.value)
    await reloadSettings()
  } catch (error) {
    tableOptions.value = []
    selectedTableKey.value = ''
    rows.value = []
    emit('load-error', { stage: 'tables', error })
  } finally {
    loading.value = false
  }
}

async function save() {
  const table = selectedTable.value
  if (!table || saving.value) {
    return
  }

  const saveRows = buildSaveRows()
  saving.value = true
  try {
    const result = await props.adapter.saveSettings(table, saveRows)
    emit('save-success', { table, rows: saveRows.map((row) => ({ ...row })), result })
    await reloadSettings()
  } catch (error) {
    emit('save-error', { stage: 'save', error })
  } finally {
    saving.value = false
  }
}

async function setSelectedTableKey(key: string) {
  if (selectedTableKey.value === key) {
    return
  }
  selectedTableKey.value = key
  emit('table-change', selectedTable.value)
  await reloadSettings()
}

function getRows() {
  return rows.value.map((row) => ({ ...row }))
}

watch(
  () => props.initialTableKey,
  (key) => {
    if (key && tableOptions.value.some((table) => table.tableKey === key)) {
      void setSelectedTableKey(key)
    }
  }
)

onMounted(reloadTables)

defineExpose({
  reloadTables,
  reloadSettings,
  save,
  getRows,
  setSelectedTableKey
})
</script>

<template>
  <section class="x-data-table-settings" :style="rootStyle">
    <div class="x-data-table-settings__toolbar">
      <XSelect
        class="x-data-table-settings__table-select"
        :model-value="selectedTableKey"
        :disabled="loading"
        :loading="loading"
        :background-color="resolvedControlBackgroundColor"
        :text-color="resolvedControlTextColor"
        :border-color="resolvedControlBorderColor"
        :dropdown-background-color="resolvedDropdownBackgroundColor"
        @update:model-value="setSelectedTableKey(String($event ?? ''))"
      >
        <XOption
          v-for="item in tableOptions"
          :key="item.tableKey"
          :label="item.physicalTableName ? `${item.label} / ${item.physicalTableName}` : item.label"
          :value="item.tableKey"
        />
      </XSelect>
      <XButton
        class="x-data-table-settings__save-button"
        variant="solid"
        width="auto"
        :background-color="saveButtonBackgroundColor"
        :text-color="saveButtonTextColor"
        :border-color="resolvedSaveButtonBorderColor"
        :active-background-color="saveButtonActiveBackgroundColor"
        :active-border-color="saveButtonActiveBorderColor"
        :active-text-color="saveButtonActiveTextColor"
        :loading="saving"
        :disabled="!selectedTable"
        @click="save"
      >
        {{ saveButtonText }}
      </XButton>
    </div>

    <div v-if="showTableMeta && selectedTable" class="x-data-table-settings__meta">
      <span v-if="selectedTable.physicalTableName">物理表：{{ selectedTable.physicalTableName }}</span>
      <span v-if="selectedTable.modelName">模型类：{{ selectedTable.modelName }}</span>
      <span>业务Key：{{ selectedBusinessKeyText }}</span>
    </div>

    <XTable
      class="x-data-table-settings__table"
      :data="rows"
      :columns="columns"
      row-key="columnKey"
      :empty-text="emptyText"
      :row-draggable="true"
      :show-actions="false"
      :show-pagination="false"
      :column-resizable="true"
      :fill-height="true"
      :panel-background-color="backgroundColor"
      :header-background-color="headerBackgroundColor"
      :header-text-color="headerTextColor"
      :body-background-color="resolvedTableBodyBackgroundColor"
      :body-stripe-background-color="bodyStripeBackgroundColor"
      :body-text-color="resolvedTableBodyTextColor"
      :border-color="resolvedTableBorderColor"
      :viewport-border-color="resolvedTableBorderColor"
      :header-divider-color="resolvedTableBorderColor"
      :row-border-color="resolvedTableBorderColor"
      :column-border-color="resolvedTableBorderColor"
      :style="{ opacity: isBusy ? 0.64 : 1 }"
      @row-reorder="handleRowReorder"
    >
      <template #cell-columnLabel="{ row }">
        <span class="x-data-table-settings__cell-control" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XInput
            :model-value="String(row.columnLabel ?? '')"
            height="100%"
            padding="0 4px"
            radius="0"
            background-color="transparent"
            :text-color="resolvedControlTextColor"
            border-color="transparent"
            :show-active-border="false"
            @update:model-value="updateSettingValue(asSettingsRow(row), 'columnLabel', String($event))"
          />
        </span>
      </template>

      <template #cell-displayType="{ row }">
        <span class="x-data-table-settings__cell-control" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XSelect
            :model-value="String(row.displayType ?? '')"
            :options="displayTypeOptions"
            height="100%"
            padding="0 4px"
            radius="0"
            background-color="transparent"
            :text-color="resolvedControlTextColor"
            border-color="transparent"
            :show-active-border="false"
            :dropdown-background-color="resolvedDropdownBackgroundColor"
            @update:model-value="updateSettingValue(asSettingsRow(row), 'displayType', normalizeTextValue($event))"
          />
        </span>
      </template>

      <template #cell-editType="{ row }">
        <span class="x-data-table-settings__cell-control" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XSelect
            :model-value="String(row.editType ?? '')"
            :options="editorTypeOptions"
            height="100%"
            padding="0 4px"
            radius="0"
            background-color="transparent"
            :text-color="resolvedControlTextColor"
            border-color="transparent"
            :show-active-border="false"
            :dropdown-background-color="resolvedDropdownBackgroundColor"
            @update:model-value="updateSettingValue(asSettingsRow(row), 'editType', normalizeTextValue($event))"
          />
        </span>
      </template>

      <template #cell-dataSourceKey="{ row }">
        <span class="x-data-table-settings__cell-control" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XSelect
            :model-value="String(row.dataSourceKey ?? '')"
            :disabled="!canUseDataSource(String(row.editType ?? ''))"
            :options="dataSourceSelectOptions.map((option) => ({
              label: Number(option.valueCount ?? 0) > 0 ? `${option.label}（${option.valueCount}项）` : option.label,
              value: option.key
            }))"
            clearable
            height="100%"
            padding="0 4px"
            radius="0"
            background-color="transparent"
            :text-color="resolvedControlTextColor"
            border-color="transparent"
            :show-active-border="false"
            :dropdown-background-color="resolvedDropdownBackgroundColor"
            @update:model-value="updateSettingValue(asSettingsRow(row), 'dataSourceKey', normalizeTextValue($event))"
          />
        </span>
      </template>

      <template #cell-keyType="{ row }">
        <span class="x-data-table-settings__cell-control" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XSelect
            :model-value="String(row.keyType ?? '')"
            :options="keyTypeOptions"
            text-align="center"
            height="100%"
            padding="0 4px"
            radius="0"
            background-color="transparent"
            :text-color="resolvedControlTextColor"
            border-color="transparent"
            :show-active-border="false"
            :dropdown-background-color="resolvedDropdownBackgroundColor"
            @update:model-value="updateKeyType(asSettingsRow(row), normalizeOptionValue($event, keyTypeOptions, ''))"
          />
        </span>
      </template>

      <template #cell-isHidden="{ row }">
        <span class="x-data-table-settings__switch-cell" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XSwitch
            :model-value="Boolean(row.isHidden)"
            :disabled="Boolean(row.keyType)"
            @update:model-value="updateSettingValue(asSettingsRow(row), 'isHidden', Boolean($event))"
          />
        </span>
      </template>

      <template #cell-isSortable="{ row }">
        <span class="x-data-table-settings__switch-cell" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XSwitch
            :model-value="Boolean(row.isSortable)"
            @update:model-value="updateSettingValue(asSettingsRow(row), 'isSortable', Boolean($event))"
          />
        </span>
      </template>

      <template #cell-align="{ row }">
        <span class="x-data-table-settings__cell-control" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XSelect
            :model-value="String(row.align ?? 'center')"
            :options="alignOptions"
            text-align="center"
            height="100%"
            padding="0 4px"
            radius="0"
            background-color="transparent"
            :text-color="resolvedControlTextColor"
            border-color="transparent"
            :show-active-border="false"
            :dropdown-background-color="resolvedDropdownBackgroundColor"
            @update:model-value="updateSettingValue(asSettingsRow(row), 'align', normalizeAlign($event))"
          />
        </span>
      </template>

      <template #cell-defaultFormatter="{ row }">
        <XButton class="x-data-table-settings__formatter-button" variant="ghost" @mousedown.stop @click.stop="openFormatterDialog(asSettingsRow(row))">
          {{ displayFormatter(asSettingsRow(row)) }}
        </XButton>
      </template>

      <template #cell-sortOrder="{ row }">
        <span class="x-data-table-settings__cell-control" @mousedown.stop @click.stop @dblclick.stop @keydown.stop>
          <XInput
            :model-value="String(row.sortOrder ?? '')"
            text-align="center"
            height="100%"
            padding="0 4px"
            radius="0"
            background-color="transparent"
            :text-color="resolvedControlTextColor"
            border-color="transparent"
            :show-active-border="false"
            @update:model-value="updateSettingValue(asSettingsRow(row), 'sortOrder', String($event))"
          />
        </span>
      </template>
    </XTable>

    <XDialog
      v-model="formatterDialogVisible"
      title="默认格式"
      :width="620"
      :height="300"
      :min-width="520"
      :min-height="260"
    >
      <XInput
        v-model="formatterDraft"
        class="x-data-table-settings__formatter-input"
        placeholder="(value: string | number, row?: Record<string, unknown>) => string"
        :background-color="resolvedControlBackgroundColor"
        :text-color="resolvedControlTextColor"
        :border-color="resolvedControlBorderColor"
      />
      <template #footer>
        <XButton @click="formatterDialogVisible = false">取消</XButton>
        <XButton variant="solid" @click="saveFormatterDraft">确定</XButton>
      </template>
    </XDialog>
  </section>
</template>

<style scoped>
.x-data-table-settings {
  background: var(--x-data-table-settings-bg, transparent);
  box-sizing: border-box;
  color: var(--x-data-table-settings-text, var(--x-color-text));
  display: grid;
  gap: 8px;
  grid-template-rows: auto auto minmax(0, 1fr);
  min-height: 0;
  min-width: 0;
}

.x-data-table-settings__toolbar {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  min-width: 0;
}

.x-data-table-settings__table-select {
  max-width: 100%;
  width: min(360px, 100%);
}

.x-data-table-settings__save-button {
  flex: 0 0 auto;
  min-width: 96px;
}

.x-data-table-settings__meta {
  color: var(--x-data-table-settings-meta-text, var(--x-color-text-muted, #64748b));
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  gap: 8px 16px;
  line-height: 1.5;
  min-width: 0;
}

.x-data-table-settings__table {
  min-height: 0;
}

.x-data-table-settings__cell-control,
.x-data-table-settings__switch-cell {
  align-items: stretch;
  display: inline-flex;
  min-height: 22px;
  min-width: 0;
  width: 100%;
}

.x-data-table-settings__switch-cell {
  align-items: center;
  justify-content: center;
}

.x-data-table-settings__cell-control :deep(.x-base-input) {
  border-radius: 0;
  min-width: 0;
  width: 100%;
}

.x-data-table-settings__formatter-button {
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.x-data-table-settings__formatter-input {
  width: 100%;
}

@media (max-width: 720px) {
  .x-data-table-settings__toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .x-data-table-settings__table-select {
    width: 100%;
  }

  .x-data-table-settings__save-button {
    width: 100%;
  }
}
</style>
