import { computed, ref, type ComputedRef } from 'vue'
import type { FileDiskItem, FileDiskProps } from './types'

export function useFileSelection(props: Pick<FileDiskProps, 'multiple'>, sortedEntries: ComputedRef<FileDiskItem[]>, cancelEditing: () => void, emit: (event: 'selection-change', items: FileDiskItem[]) => void) {
const selectedIds = ref<Array<FileDiskItem['id']>>([])

const selectedItems = computed(() =>
  sortedEntries.value.filter((item) => selectedIds.value.some((id) => String(id) === String(item.id)))
)

const allSelected = computed(
  () => sortedEntries.value.length > 0 && sortedEntries.value.every((item) => selectedIds.value.includes(item.id))
)

function isSelected(item: FileDiskItem) {
  return selectedIds.value.some((id) => String(id) === String(item.id))
}

function emitSelection() {
  emit('selection-change', selectedItems.value)
}

function clearSelection() {
  selectedIds.value = []
  emitSelection()
}

function toggleAll() {
  cancelEditing()
  selectedIds.value = allSelected.value ? [] : sortedEntries.value.map((item) => item.id)
  emitSelection()
}

function selectItem(item: FileDiskItem, event?: MouseEvent) {
  if (item.disabled) {
    return
  }
  cancelEditing()

  if (props.multiple && (event?.ctrlKey || event?.metaKey)) {
    selectedIds.value = isSelected(item)
      ? selectedIds.value.filter((id) => String(id) !== String(item.id))
      : [...selectedIds.value, item.id]
  } else {
    selectedIds.value = [item.id]
  }
  emitSelection()
}

function toggleItem(item: FileDiskItem) {
  cancelEditing()
  selectedIds.value = isSelected(item)
    ? selectedIds.value.filter((id) => String(id) !== String(item.id))
    : [...selectedIds.value, item.id]
  emitSelection()
}
return { selectedIds, selectedItems, allSelected, isSelected, emitSelection, clearSelection, toggleAll, selectItem, toggleItem }
}
