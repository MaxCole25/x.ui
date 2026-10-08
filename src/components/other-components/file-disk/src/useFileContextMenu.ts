import { ref, nextTick, type Ref } from 'vue'
import type { FileDiskItem } from './types'

export function useFileContextMenu(contextMenuRoot: Ref<HTMLElement | null>, isSelected: (item: FileDiskItem) => boolean, selectItem: (item: FileDiskItem) => void) {
const contextMenu = ref({
  visible: false,
  x: 0,
  y: 0
})

function closeContextMenu() {
  contextMenu.value.visible = false
}

function openContextMenu(event: MouseEvent, item?: FileDiskItem) {
  event.preventDefault()
  if (item && !isSelected(item)) {
    selectItem(item)
  }
  contextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY
  }
  nextTick(adjustContextMenuPosition)
}

function adjustContextMenuPosition() {
  const menu = contextMenuRoot.value
  if (!menu || !contextMenu.value.visible || typeof window === 'undefined') {
    return
  }

  const viewportPadding = 8
  const maxX = Math.max(viewportPadding, window.innerWidth - menu.offsetWidth - viewportPadding)
  const maxY = Math.max(viewportPadding, window.innerHeight - menu.offsetHeight - viewportPadding)
  const nextX = Math.min(Math.max(viewportPadding, contextMenu.value.x), maxX)
  const nextY = Math.min(Math.max(viewportPadding, contextMenu.value.y), maxY)

  if (nextX !== contextMenu.value.x || nextY !== contextMenu.value.y) {
    contextMenu.value = {
      ...contextMenu.value,
      x: nextX,
      y: nextY
    }
  }
}
return { contextMenu, closeContextMenu, openContextMenu, adjustContextMenuPosition }
}
