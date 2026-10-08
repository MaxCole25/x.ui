import { nextTick, onBeforeUnmount, onMounted, watch, type Ref } from 'vue'

interface ModalEntry {
  element: Ref<HTMLElement | null>
  zIndex: () => number
  closeOnEsc: () => boolean
  close: () => void
  previousFocus: HTMLElement | null
}

const modals: ModalEntry[] = []
let previousOverflow = ''
const focusableSelector = 'button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
const topModal = () => modals.reduce<ModalEntry | undefined>((top, item) => !top || item.zIndex() >= top.zIndex() ? item : top, undefined)
const focusableElements = (element: HTMLElement) => Array.from(element.querySelectorAll<HTMLElement>(focusableSelector)).filter(item => item.tabIndex >= 0 && !item.closest('[inert], [hidden]') && item.getClientRects().length > 0)

function focusModal(entry: ModalEntry) {
  const element = entry.element.value
  if (element) (focusableElements(element)[0] ?? element).focus({ preventScroll: true })
}

function onKeydown(event: KeyboardEvent) {
  const entry = topModal()
  const element = entry?.element.value
  if (!entry || !element) return
  if (event.key === 'Escape' && !event.isComposing) {
    event.preventDefault()
    event.stopPropagation()
    if (entry.closeOnEsc()) entry.close()
  } else if (event.key === 'Tab') {
    const items = focusableElements(element)
    const first = items[0]
    const last = items[items.length - 1]
    if (!first || !element.contains(document.activeElement) || (event.shiftKey ? document.activeElement === first || document.activeElement === element : document.activeElement === last)) {
      event.preventDefault()
      ;(event.shiftKey ? last ?? element : first ?? element).focus()
    }
  }
}

/** 模态层共享滚动锁及键盘处理，关闭一层不会释放其它层的锁。 */
export function useModal(options: {
  visible: Readonly<Ref<boolean>>
  element: Ref<HTMLElement | null>
  zIndex: () => number
  closeOnEsc: () => boolean
  close: () => void
}) {
  const entry: ModalEntry = { ...options, previousFocus: null }
  let stop: (() => void) | undefined
  function deactivate() {
    const index = modals.indexOf(entry)
    if (index < 0) return
    const wasTop = topModal() === entry
    modals.splice(index, 1)
    if (!modals.length) {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeydown, true)
    }
    if (!wasTop) return
    const top = topModal()
    if (entry.previousFocus?.isConnected && (!top || top.element.value?.contains(entry.previousFocus))) entry.previousFocus.focus({ preventScroll: true })
    else if (top) focusModal(top)
  }
  onMounted(() => {
    stop = watch(options.visible, async visible => {
      if (!visible) return deactivate()
      if (modals.includes(entry)) return
      entry.previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
      if (!modals.length) {
        previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', onKeydown, true)
      }
      modals.push(entry)
      await nextTick()
      if (options.visible.value && topModal() === entry) focusModal(entry)
    }, { immediate: true, flush: 'post' })
  })
  onBeforeUnmount(() => { stop?.(); deactivate() })
}
