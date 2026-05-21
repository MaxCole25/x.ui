<script setup lang="ts">
import { ref } from 'vue'
import type { TableColumn, TableColumnSetting } from 'x.ui'
import BaseXButton from './BaseXButton.vue'
import BaseXCheckbox from './BaseXCheckbox.vue'
import BaseXDialog from './BaseXDialog.vue'
import BaseXInputNumber from './BaseXInputNumber.vue'
import BaseXRadioButton from './BaseXRadioButton.vue'

type UpdateColumnSetting = (key: string, setting: Partial<TableColumnSetting>) => void
type ReorderColumnSetting = (key: string, targetKey: string, position: 'before' | 'after') => void

const props = withDefaults(defineProps<{
  modelValue: boolean
  columnSettings: TableColumnSetting[]
  columns?: TableColumn[]
  updateColumnSetting: UpdateColumnSetting
  reorderColumnSetting: ReorderColumnSetting
  resetColumnSettings: () => void
  getColumnLabel?: (key: string) => string
  title?: string
  width?: number
  height?: number
  minWidth?: number
  minHeight?: number
}>(), {
  title: '列设置',
  width: 760,
  height: 620,
  minWidth: 640,
  minHeight: 460,
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const draggingColumnSettingKey = ref('')
const columnSettingDragTarget = ref<{ key: string; position: 'before' | 'after' } | null>(null)

function updateVisible(value: unknown) {
  emit('update:modelValue', Boolean(value))
}

function getDisplayLabel(key: string) {
  return props.getColumnLabel?.(key) ?? key
}

function getDefaultColumn(key: string) {
  return props.columns?.find((column) => column.key === key)
}

function getDefaultOrder(key: string) {
  const index = props.columns?.findIndex((column) => column.key === key) ?? -1
  return index >= 0 ? index : undefined
}

function getDefaultWidth(key: string) {
  const width = getDefaultColumn(key)?.width
  return typeof width === 'number' ? width : undefined
}

function getDefaultAlign(key: string) {
  return getDefaultColumn(key)?.align ?? 'left'
}

function updateSettingFixed(key: string, value: string | number | boolean) {
  props.updateColumnSetting(key, { fixed: value as TableColumnSetting['fixed'] })
}

function updateSettingVisible(key: string, value: boolean | Array<string | number | boolean>) {
  props.updateColumnSetting(key, { hidden: !Boolean(value) })
}

function normalizePositiveNumber(value: unknown) {
  const numeric = Number(value)
  return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined
}

function updateSettingWidth(key: string, value: unknown) {
  props.updateColumnSetting(key, { width: normalizePositiveNumber(value), widthRatio: undefined })
}

function updateSettingWidthRatio(key: string, value: unknown) {
  props.updateColumnSetting(key, { widthRatio: normalizePositiveNumber(value), width: undefined })
}

function resetColumnSetting(key: string) {
  props.updateColumnSetting(key, {
    order: getDefaultOrder(key),
    hidden: false,
    fixed: 'none',
    align: getDefaultAlign(key),
    width: getDefaultWidth(key),
    widthRatio: undefined,
  })
}

function startColumnSettingDrag(key: string, event: DragEvent) {
  draggingColumnSettingKey.value = key
  columnSettingDragTarget.value = null
  event.dataTransfer?.setData('text/plain', key)
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

function getColumnSettingDropPosition(event: DragEvent): 'before' | 'after' {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  return event.clientY < rect.top + rect.height / 2 ? 'before' : 'after'
}

function updateColumnSettingDragTarget(key: string, event: DragEvent) {
  event.preventDefault()
  if (!draggingColumnSettingKey.value || draggingColumnSettingKey.value === key) {
    columnSettingDragTarget.value = null
    return
  }
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
  columnSettingDragTarget.value = {
    key,
    position: getColumnSettingDropPosition(event),
  }
}

function isColumnSettingDragOver(key: string, position: 'before' | 'after') {
  return columnSettingDragTarget.value?.key === key && columnSettingDragTarget.value.position === position
}

function dropColumnSetting(targetKey: string, event: DragEvent) {
  event.preventDefault()
  const sourceKey = draggingColumnSettingKey.value || event.dataTransfer?.getData('text/plain') || ''
  const position = columnSettingDragTarget.value?.key === targetKey
    ? columnSettingDragTarget.value.position
    : getColumnSettingDropPosition(event)
  if (sourceKey && sourceKey !== targetKey) {
    props.reorderColumnSetting(sourceKey, targetKey, position)
  }
  resetColumnSettingDrag()
}

function resetColumnSettingDrag() {
  draggingColumnSettingKey.value = ''
  columnSettingDragTarget.value = null
}
</script>

<template>
  <BaseXDialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    :height="height"
    :min-width="minWidth"
    :min-height="minHeight"
    @update:model-value="updateVisible"
  >
    <div class="base-x-column-settings">
      <p class="base-x-column-settings__hint">
        拖拽列项可调整列顺序；固定列、比例宽度和 px 宽度会自动保留。
      </p>
      <div class="base-x-column-settings__header" aria-hidden="true">
        <span class="base-x-column-settings__header-name">列名</span>
        <span>固定列</span>
        <span>比例</span>
        <span>宽度px</span>
      </div>
      <div class="base-x-column-settings__list" @mouseleave="resetColumnSettingDrag">
        <div
          v-for="setting in columnSettings"
          :key="setting.key"
          class="base-x-column-settings__row"
          :class="{
            'is-dragging': draggingColumnSettingKey === setting.key,
            'is-drag-over-before': isColumnSettingDragOver(setting.key, 'before'),
            'is-drag-over-after': isColumnSettingDragOver(setting.key, 'after'),
          }"
          draggable="true"
          @dragstart="startColumnSettingDrag(setting.key, $event)"
          @dragover="updateColumnSettingDragTarget(setting.key, $event)"
          @drop="dropColumnSetting(setting.key, $event)"
          @dragend="resetColumnSettingDrag"
        >
          <div class="base-x-column-settings__name-cell">
            <button
              class="base-x-column-settings__drag-handle"
              type="button"
              aria-label="拖拽排序"
              title="拖拽排序"
              draggable="true"
              @dragstart="startColumnSettingDrag(setting.key, $event)"
            >
              <i class="ri-draggable" aria-hidden="true"></i>
            </button>
            <BaseXCheckbox
              class="base-x-column-settings__check"
              :model-value="!setting.hidden"
              :aria-label="`${getDisplayLabel(setting.key)}列显示`"
              @update:model-value="updateSettingVisible(setting.key, $event)"
              @dragstart.stop
            />
            <i class="base-x-column-settings__lock ri-lock-line" aria-hidden="true"></i>
            <span class="base-x-column-settings__name">{{ getDisplayLabel(setting.key) }}</span>
            <button
              class="base-x-column-settings__icon-button"
              type="button"
              aria-label="复位当前列"
              title="复位当前列"
              @click="resetColumnSetting(setting.key)"
            >
              <i class="ri-refresh-line" aria-hidden="true"></i>
            </button>
          </div>
          <div class="base-x-column-settings__fixed">
            <BaseXRadioButton
              :model-value="setting.fixed ?? 'none'"
              value="left"
              label="左"
              @update:model-value="updateSettingFixed(setting.key, $event)"
            />
            <BaseXRadioButton
              :model-value="setting.fixed ?? 'none'"
              value="none"
              label="无"
              @update:model-value="updateSettingFixed(setting.key, $event)"
            />
            <BaseXRadioButton
              :model-value="setting.fixed ?? 'none'"
              value="right"
              label="右"
              @update:model-value="updateSettingFixed(setting.key, $event)"
            />
          </div>
          <BaseXInputNumber
            class="base-x-column-settings__number"
            :model-value="setting.widthRatio"
            :min="0"
            :max="100"
            :step="5"
            placeholder="比例"
            controls-position="right"
            @update:model-value="updateSettingWidthRatio(setting.key, $event)"
          />
          <BaseXInputNumber
            class="base-x-column-settings__number"
            :model-value="setting.width"
            :min="0"
            :step="10"
            placeholder="宽度px"
            controls-position="right"
            @update:model-value="updateSettingWidth(setting.key, $event)"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <div class="base-x-column-settings__footer">
        <BaseXButton @click="emit('update:modelValue', false)">关闭</BaseXButton>
        <BaseXButton @click="resetColumnSettings">全部复位</BaseXButton>
      </div>
    </template>
  </BaseXDialog>
</template>

<style scoped>
.base-x-column-settings {
  display: grid;
  grid-template-rows: auto auto minmax(0, 1fr);
  height: 100%;
  min-height: 0;
}

.base-x-column-settings__hint {
  color: #8a96a8;
  font-size: var(--ui-size-font-size);
  line-height: 1.6;
  margin: 0 0 8px;
}

.base-x-column-settings__header,
.base-x-column-settings__row {
  align-items: center;
  column-gap: 14px;
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 104px 96px 108px;
  min-width: 0;
}

.base-x-column-settings__header {
  color: #4f6b83;
  font-size: var(--ui-size-font-size);
  padding: 0 12px 8px;
}

.base-x-column-settings__header span:not(.base-x-column-settings__header-name) {
  text-align: center;
}

.base-x-column-settings__list {
  display: grid;
  gap: 8px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 4px;
  scrollbar-color: rgba(100, 116, 139, 0.22) transparent;
  scrollbar-width: thin;
}

.base-x-column-settings__list::-webkit-scrollbar {
  width: 4px;
}

.base-x-column-settings__list::-webkit-scrollbar-track {
  background: transparent;
}

.base-x-column-settings__list::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.22);
  border-radius: 999px;
}

.base-x-column-settings__list::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.34);
}

.base-x-column-settings__row {
  background: #f4f7fb;
  border: 1px solid transparent;
  border-radius: var(--ui-size-radius);
  min-height: calc(var(--ui-size-height) + 16px);
  padding: 8px 8px 8px 4px;
  position: relative;
  transition:
    border-color 0.16s ease,
    margin 0.16s ease,
    opacity 0.16s ease,
    transform 0.16s ease;
}

.base-x-column-settings__row:hover {
  border-color: #d9e5ee;
}

.base-x-column-settings__row.is-dragging {
  opacity: 0.55;
  transform: scale(0.995);
}

.base-x-column-settings__row.is-drag-over-before {
  margin-top: 16px;
}

.base-x-column-settings__row.is-drag-over-after {
  margin-bottom: 16px;
}

.base-x-column-settings__row.is-drag-over-before::before,
.base-x-column-settings__row.is-drag-over-after::after {
  background: var(--color-primary);
  border-radius: 999px;
  content: '';
  height: 3px;
  left: 8px;
  position: absolute;
  right: 8px;
}

.base-x-column-settings__row.is-drag-over-before::before {
  top: -10px;
}

.base-x-column-settings__row.is-drag-over-after::after {
  bottom: -10px;
}

.base-x-column-settings__name-cell {
  align-items: center;
  display: grid;
  gap: 8px;
  grid-template-columns: 16px 14px 14px minmax(0, max-content) 24px;
  justify-content: start;
  min-width: 0;
}

.base-x-column-settings__drag-handle,
.base-x-column-settings__icon-button {
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 4px;
  color: #8a96a8;
  display: inline-flex;
  height: 22px;
  justify-content: center;
  padding: 0;
  width: 22px;
}

.base-x-column-settings__drag-handle {
  cursor: grab;
  width: 16px;
}

.base-x-column-settings__drag-handle:active {
  cursor: grabbing;
}

.base-x-column-settings__icon-button {
  cursor: pointer;
}

.base-x-column-settings__drag-handle:hover,
.base-x-column-settings__drag-handle:focus-visible,
.base-x-column-settings__icon-button:hover,
.base-x-column-settings__icon-button:focus-visible {
  background: #e6edf7;
  color: var(--color-primary);
  outline: none;
}

.base-x-column-settings__lock {
  color: #9aa7b8;
  font-size: 14px;
  line-height: 1;
}

.base-x-column-settings :deep(.base-x-column-settings__check) {
  height: 18px;
  min-width: 0;
}

.base-x-column-settings :deep(.base-x-column-settings__check .x-checkbox__label) {
  display: none;
}

.base-x-column-settings :deep(.base-x-column-settings__check .x-checkbox__box) {
  height: 14px;
  width: 14px;
}

.base-x-column-settings__name {
  color: #13201d;
  font-size: var(--ui-size-font-size);
  line-height: 20px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.base-x-column-settings__fixed {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  min-width: 0;
  white-space: nowrap;
}

.base-x-column-settings__footer {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  width: 100%;
}

.base-x-column-settings :deep(.base-x-column-settings__number) {
  min-width: 0;
  width: 100%;
}

.base-x-column-settings :deep(.x-input-number),
.base-x-column-settings :deep(.x-base-input) {
  max-width: 100%;
  min-width: 0;
}

@media (max-width: 720px) {
  .base-x-column-settings__header,
  .base-x-column-settings__row {
    column-gap: 8px;
    grid-template-columns: minmax(180px, 1fr) 82px 72px 80px;
  }
}

:global(html[data-ui-size='sm']) .base-x-column-settings__header,
:global(html[data-ui-size='sm']) .base-x-column-settings__row {
  column-gap: 8px;
  grid-template-columns: minmax(220px, 1fr) 82px 76px 86px;
}
</style>
