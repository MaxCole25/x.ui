<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { XButton } from '../../../basic-components/button'
import { XDialog } from '../../../feedback-components/dialog'
import { XCheckbox } from '../../../form-components/checkbox'
import { XInputNumber } from '../../../form-components/input-number'
import { XRadioButton } from '../../../form-components/radio'
import type { TableAlign, TableColumn, TableColumnSetting, TableFixed, TableReorderPosition } from '../../../display-components/table'
import type { TableColumnSettingsProps, TableColumnSettingsSlots } from './types'

defineOptions({ name: 'XTableColumnSettings' })

const props = withDefaults(defineProps<TableColumnSettingsProps>(), {
  title: '列设置',
  width: 760,
  height: 620,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: TableColumnSetting[]): void
  (e: 'change', value: TableColumnSetting[]): void
  (e: 'reset', value: TableColumnSetting[]): void
}>()

defineSlots<TableColumnSettingsSlots>()

const dialogVisible = ref(false)
const internalSettings = ref<TableColumnSetting[]>([])
const draggingKey = ref('')
const dragTarget = ref<{ key: string; position: TableReorderPosition } | null>(null)

const orderedSettings = computed(() => getOrderedSettings())

watch(
  () => [props.columns, props.modelValue],
  () => {
    internalSettings.value = normalizeColumnSettings(props.modelValue)
  },
  { deep: true, immediate: true }
)

function createDefaultColumnSettings() {
  return props.columns.map((column, index) => ({
    key: column.key,
    order: index,
    hidden: false,
    fixed: 'none' as TableFixed,
    align: column.align ?? 'left',
    width: typeof column.width === 'number' ? column.width : undefined,
    widthRatio: undefined
  }))
}

function normalizeNumber(value: number | undefined) {
  if (value === undefined || Number.isNaN(Number(value))) {
    return undefined
  }
  return Math.max(0, Number(value))
}

function normalizeColumnSettings(settings: TableColumnSetting[] = []) {
  const settingMap = new Map(settings.map((setting) => [setting.key, setting]))
  return props.columns.map((column, index) => {
    const current = settingMap.get(column.key)
    return {
      key: column.key,
      order: current?.order ?? index,
      hidden: current?.hidden ?? false,
      fixed: current?.fixed ?? 'none',
      align: current?.align ?? column.align ?? 'left',
      width: normalizeNumber(current?.width),
      widthRatio: normalizeNumber(current?.widthRatio)
    }
  })
}

function getFixedWeight(fixed: TableColumnSetting['fixed']) {
  if (fixed === 'left') return 0
  if (fixed === 'right') return 2
  return 1
}

function getOrderedSettings() {
  const orderMap = new Map(props.columns.map((column, index) => [column.key, index]))
  return [...internalSettings.value].sort((a, b) => {
    const fixedWeight = getFixedWeight(a.fixed) - getFixedWeight(b.fixed)
    if (fixedWeight !== 0) {
      return fixedWeight
    }
    return (a.order ?? orderMap.get(a.key) ?? 0) - (b.order ?? orderMap.get(b.key) ?? 0)
  })
}

function getColumn(key: string): TableColumn | undefined {
  return props.columns.find((column) => column.key === key)
}

function getColumnLabel(key: string) {
  return getColumn(key)?.label ?? key
}

function getColumnWidth(key: string) {
  const width = getColumn(key)?.width
  return typeof width === 'number' ? width : undefined
}

function emitSettings(settings: TableColumnSetting[]) {
  const next = normalizeColumnSettings(settings)
  internalSettings.value = next
  const payload = next.map((setting) => ({ ...setting }))
  emit('update:modelValue', payload)
  emit('change', payload)
}

function updateSetting(key: string, setting: Partial<TableColumnSetting>) {
  const next = normalizeColumnSettings(internalSettings.value).map((item) => {
    if (item.key !== key) {
      return item
    }

    const hasWidth = Object.prototype.hasOwnProperty.call(setting, 'width')
    const hasWidthRatio = Object.prototype.hasOwnProperty.call(setting, 'widthRatio')
    return {
      ...item,
      ...setting,
      fixed: setting.fixed ?? item.fixed,
      align: setting.align ?? item.align,
      width: hasWidth ? normalizeNumber(setting.width) : item.width,
      widthRatio: hasWidthRatio ? normalizeNumber(setting.widthRatio) : item.widthRatio
    }
  })
  emitSettings(next)
}

function moveToEdge(key: string, edge: 'first' | 'last') {
  const sorted = getOrderedSettings()
  const fromIndex = sorted.findIndex((setting) => setting.key === key)
  if (fromIndex < 0 || (edge === 'first' && fromIndex === 0) || (edge === 'last' && fromIndex === sorted.length - 1)) {
    return
  }

  const [movedSetting] = sorted.splice(fromIndex, 1)
  if (edge === 'first') {
    sorted.unshift(movedSetting)
  } else {
    sorted.push(movedSetting)
  }
  emitSettings(sorted.map((setting, order) => ({ ...setting, order })))
}

function reorder(key: string, targetKey: string, position: TableReorderPosition) {
  if (key === targetKey) {
    return
  }

  const sorted = getOrderedSettings()
  const fromIndex = sorted.findIndex((setting) => setting.key === key)
  const targetIndex = sorted.findIndex((setting) => setting.key === targetKey)
  if (fromIndex < 0 || targetIndex < 0) {
    return
  }

  const [movedSetting] = sorted.splice(fromIndex, 1)
  let toIndex = targetIndex + (position === 'after' ? 1 : 0)
  if (fromIndex < toIndex) {
    toIndex -= 1
  }
  if (fromIndex === toIndex) {
    return
  }

  sorted.splice(toIndex, 0, movedSetting)
  emitSettings(sorted.map((setting, order) => ({ ...setting, order })))
}

function updateVisible(key: string, value: boolean | Array<string | number | boolean>) {
  updateSetting(key, { hidden: !Boolean(value) })
}

function updateFixed(key: string, value: string | number | boolean) {
  updateSetting(key, { fixed: value as TableFixed })
}

function updateAlign(key: string, value: string | number | boolean) {
  updateSetting(key, { align: value as TableAlign })
}

function startDrag(key: string, event: DragEvent) {
  draggingKey.value = key
  dragTarget.value = null
  event.dataTransfer?.setData('text/plain', key)
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

function updateDragTarget(key: string, event: DragEvent) {
  if (!draggingKey.value || draggingKey.value === key) {
    return
  }

  event.preventDefault()
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  dragTarget.value = {
    key,
    position: event.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
  }
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

function dropSetting(targetKey: string, event: DragEvent) {
  if (!draggingKey.value) {
    return
  }

  event.preventDefault()
  const position = dragTarget.value?.key === targetKey ? dragTarget.value.position : 'after'
  reorder(draggingKey.value, targetKey, position)
  resetDrag()
}

function isDragOver(key: string, position: TableReorderPosition) {
  return dragTarget.value?.key === key && dragTarget.value.position === position
}

function resetDrag() {
  draggingKey.value = ''
  dragTarget.value = null
}

function open() {
  if (!props.disabled) {
    dialogVisible.value = true
  }
}

function close() {
  dialogVisible.value = false
}

function reset() {
  const next = createDefaultColumnSettings()
  emitSettings(next)
  emit('reset', next.map((setting) => ({ ...setting })))
}

function getSettings() {
  return internalSettings.value.map((setting) => ({ ...setting }))
}

defineExpose({
  open,
  close,
  reset,
  getSettings
})
</script>

<template>
  <slot name="trigger" :open="open" :disabled="disabled" :visible="dialogVisible">
    <XButton class="x-table-column-settings__trigger" :disabled="disabled" width="auto" @click="open">
      <i class="ri-settings-3-line" aria-hidden="true"></i>
      <span>列设置</span>
    </XButton>
  </slot>

  <XDialog
    v-if="dialogVisible"
    v-model="dialogVisible"
    class="x-table-column-settings__dialog"
    :title="title"
    :width="width"
    :height="height"
    :min-width="640"
    :min-height="460"
  >
    <div class="x-table-column-settings" @mouseup="resetDrag" @mouseleave="resetDrag">
      <p class="x-table-column-settings__hint">勾选显示列，拖拽列名调整顺序，也可以设置冻结、对齐和宽度。</p>
      <div class="x-table-column-settings__scroll x-scrollbar--native">
        <div class="x-table-column-settings__header" aria-hidden="true">
          <span></span>
          <span>显示</span>
          <span class="x-table-column-settings__header-name">列名</span>
          <span>排序</span>
          <span>冻结</span>
          <span>对齐</span>
          <span>比例%</span>
          <span>宽度px</span>
        </div>
        <div class="x-table-column-settings__list">
          <div
            v-for="setting in orderedSettings"
            :key="setting.key"
            class="x-table-column-settings__row"
            :class="{
              'is-dragging': draggingKey === setting.key,
              'is-drag-over-before': isDragOver(setting.key, 'before'),
              'is-drag-over-after': isDragOver(setting.key, 'after')
            }"
            draggable="true"
            @dragstart="startDrag(setting.key, $event)"
            @dragover="updateDragTarget(setting.key, $event)"
            @drop="dropSetting(setting.key, $event)"
            @dragend="resetDrag"
          >
            <button
              class="x-table-column-settings__drag-button"
              type="button"
              aria-label="拖拽排序"
              title="拖拽排序"
              draggable="true"
              @dragstart="startDrag(setting.key, $event)"
            >
              <i class="ri-draggable" aria-hidden="true"></i>
            </button>
            <XCheckbox
              class="x-table-column-settings__visible"
              :model-value="!setting.hidden"
              aria-label="显示列"
              size="sm"
              @update:model-value="updateVisible(setting.key, $event)"
            />
            <span class="x-table-column-settings__name" :title="getColumnLabel(setting.key)">
              {{ getColumnLabel(setting.key) }}
            </span>
            <div class="x-table-column-settings__edge-actions">
              <button class="x-table-column-settings__edge-button" type="button" :aria-label="`${getColumnLabel(setting.key)}置顶`" :title="`${getColumnLabel(setting.key)}置顶`" @click="moveToEdge(setting.key, 'first')">
                置顶
              </button>
              <button class="x-table-column-settings__edge-button" type="button" :aria-label="`${getColumnLabel(setting.key)}置底`" :title="`${getColumnLabel(setting.key)}置底`" @click="moveToEdge(setting.key, 'last')">
                置底
              </button>
            </div>
            <div class="x-table-column-settings__radio-group x-table-column-settings__radio-group--button">
              <XRadioButton :model-value="setting.fixed" value="left" :name="`x-table-column-settings-fixed-${setting.key}`" label="左" size="sm" @update:model-value="updateFixed(setting.key, $event)" />
              <XRadioButton :model-value="setting.fixed" value="none" :name="`x-table-column-settings-fixed-${setting.key}`" label="无" size="sm" @update:model-value="updateFixed(setting.key, $event)" />
              <XRadioButton :model-value="setting.fixed" value="right" :name="`x-table-column-settings-fixed-${setting.key}`" label="右" size="sm" @update:model-value="updateFixed(setting.key, $event)" />
            </div>
            <div class="x-table-column-settings__radio-group x-table-column-settings__radio-group--button">
              <XRadioButton :model-value="setting.align" value="left" :name="`x-table-column-settings-align-${setting.key}`" label="左" size="sm" @update:model-value="updateAlign(setting.key, $event)" />
              <XRadioButton :model-value="setting.align" value="center" :name="`x-table-column-settings-align-${setting.key}`" label="中" size="sm" @update:model-value="updateAlign(setting.key, $event)" />
              <XRadioButton :model-value="setting.align" value="right" :name="`x-table-column-settings-align-${setting.key}`" label="右" size="sm" @update:model-value="updateAlign(setting.key, $event)" />
            </div>
            <XInputNumber class="x-table-column-settings__number" :model-value="setting.widthRatio" :min="0" :max="100" :step="5" size="sm" full-width placeholder="-" @update:model-value="updateSetting(setting.key, { widthRatio: $event })" />
            <XInputNumber class="x-table-column-settings__number" :model-value="setting.width" :min="0" :step="10" size="sm" full-width :placeholder="String(getColumnWidth(setting.key) ?? '-')" @update:model-value="updateSetting(setting.key, { width: $event })" />
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="x-table-column-settings__footer">
        <button class="x-table-column-settings__footer-button" type="button" @click="reset">恢复默认</button>
        <button class="x-table-column-settings__footer-button is-primary" type="button" @click="close">关闭</button>
      </div>
    </template>
  </XDialog>
</template>

<style scoped>
.x-table-column-settings__trigger {
  gap: 6px;
}

.x-table-column-settings {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.x-table-column-settings__hint {
  color: var(--x-color-text-muted, var(--x-color-muted, #64748b));
  font-size: 12px;
  margin: 0;
}

.x-table-column-settings__scroll {
  border: 1px solid var(--x-color-border, #d1d9e6);
  border-radius: 6px;
  max-height: 464px;
  min-width: 0;
  overflow: auto;
}

.x-table-column-settings__header,
.x-table-column-settings__row {
  align-items: center;
  box-sizing: border-box;
  column-gap: 10px;
  display: grid;
  grid-template-columns: 28px 52px minmax(120px, 1fr) 80px 84px 84px 84px 92px;
  min-width: 694px;
  width: 100%;
}

.x-table-column-settings__header {
  background: var(--x-color-surface-soft, #f8fafc);
  border-bottom: 1px solid var(--x-color-border, #d1d9e6);
  color: var(--x-color-text-muted, var(--x-color-muted, #64748b));
  font-size: 12px;
  font-weight: 600;
  min-height: 34px;
  padding: 0 10px;
  position: sticky;
  top: 0;
  z-index: 5;
}

.x-table-column-settings__header span {
  min-width: 0;
  text-align: center;
}

.x-table-column-settings__header-name {
  text-align: left !important;
}

.x-table-column-settings__list {
  min-width: 0;
}

.x-table-column-settings__row {
  background: var(--x-color-surface, #fff);
  border-bottom: 1px solid var(--x-color-border, #d1d9e6);
  min-height: 48px;
  padding: 8px 10px;
  position: relative;
  z-index: 0;
  transition:
    background-color 140ms ease,
    box-shadow 140ms ease,
    margin 140ms ease,
    opacity 140ms ease,
    transform 140ms ease;
}

.x-table-column-settings__row:last-child {
  border-bottom: 0;
}

.x-table-column-settings__row.is-dragging {
  opacity: 0.48;
  transform: scale(0.998);
}

.x-table-column-settings__row.is-drag-over-before,
.x-table-column-settings__row.is-drag-over-after {
  background: var(--x-table-row-drag-background, var(--x-color-primary-soft, #f0f9ff));
  box-shadow: 0 4px 14px rgb(15 23 42 / 10%);
}

.x-table-column-settings__row.is-drag-over-before {
  margin-top: 10px;
}

.x-table-column-settings__row.is-drag-over-after {
  margin-bottom: 10px;
}

.x-table-column-settings__row.is-drag-over-before::before,
.x-table-column-settings__row.is-drag-over-after::after {
  background: var(--x-table-drag-indicator-color, var(--x-color-primary, #1264f4));
  border-radius: 999px;
  content: "";
  height: 2px;
  left: 10px;
  pointer-events: none;
  position: absolute;
  right: 10px;
  z-index: 1;
}

.x-table-column-settings__row.is-drag-over-before::before {
  top: -6px;
}

.x-table-column-settings__row.is-drag-over-after::after {
  bottom: -6px;
}

.x-table-column-settings__drag-button {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 4px;
  color: var(--x-color-text-muted, var(--x-color-muted, #64748b));
  cursor: grab;
  display: inline-flex;
  font-size: 18px;
  height: 26px;
  justify-content: center;
  padding: 0;
  width: 26px;
}

.x-table-column-settings__drag-button:hover,
.x-table-column-settings__drag-button:focus-visible {
  background: var(--x-color-surface-soft, #f8fafc);
  color: var(--x-color-primary, #1264f4);
  outline: none;
}

.x-table-column-settings__drag-button:active {
  cursor: grabbing;
}

.x-table-column-settings__visible {
  justify-self: center;
}

.x-table-column-settings__visible :deep(.x-checkbox__label) {
  display: none;
}

.x-table-column-settings__name {
  color: var(--x-color-text, #121826);
  font-size: 12px;
  font-weight: 600;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-table-column-settings__edge-actions,
.x-table-column-settings__radio-group {
  align-items: center;
  display: inline-flex;
  gap: 4px;
  justify-self: center;
  min-width: 0;
}

.x-table-column-settings__edge-button {
  background: var(--x-table-control-bg, var(--x-color-surface, #fff));
  border: 1px solid var(--x-table-control-border-color, var(--x-color-border, #cbd5e1));
  border-radius: 4px;
  color: var(--x-table-control-text-color, var(--x-color-text, #334155));
  cursor: pointer;
  font-size: 12px;
  height: 24px;
  line-height: 1;
  min-width: 34px;
  padding: 0 6px;
  white-space: nowrap;
}

.x-table-column-settings__edge-button:hover,
.x-table-column-settings__edge-button:focus-visible {
  border-color: var(--x-color-primary, #1264f4);
  color: var(--x-color-primary, #1264f4);
  outline: none;
}

.x-table-column-settings__radio-group--button {
  gap: 0;
}

.x-table-column-settings__radio-group--button :deep(.x-radio-button) {
  min-width: 28px;
}

.x-table-column-settings__number {
  justify-self: stretch;
  min-width: 0;
}

.x-table-column-settings__footer {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}

.x-table-column-settings__footer-button {
  background: var(--x-table-control-bg, var(--x-color-surface, #fff));
  border: 1px solid var(--x-table-control-border-color, var(--x-color-border, #cbd5e1));
  border-radius: 6px;
  color: var(--x-table-control-text-color, var(--x-color-text, #334155));
  cursor: pointer;
  min-height: 30px;
  padding: 0 8px;
}

.x-table-column-settings__footer-button:hover {
  background: var(--x-table-control-hover-bg, var(--x-color-primary-soft));
  border-color: var(--x-table-control-hover-border-color, var(--x-color-primary));
  color: var(--x-table-control-hover-text-color, var(--x-color-primary));
}

.x-table-column-settings__footer-button.is-primary {
  background: var(--x-color-primary, #1264f4);
  border-color: var(--x-color-primary, #1264f4);
  color: var(--x-color-primary-text, #fff);
}
</style>
