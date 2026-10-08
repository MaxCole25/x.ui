import { inject, nextTick, onBeforeUnmount, onMounted, provide, watch, type InjectionKey, type Ref } from 'vue'

interface ModalEntry {
  element: Ref<HTMLElement | null>
  zIndex: () => number
  closeOnEsc: () => boolean
  close: () => void
  previousFocus: HTMLElement | null
  floatingElements: Set<Ref<HTMLElement | null>>
}

const modalKey: InjectionKey<ModalEntry> = Symbol('x-modal')
const containsFocus = (entry: ModalEntry, target: Node | null) => Boolean(target && (entry.element.value?.contains(target) || [...entry.floatingElements].some(item => item.value?.contains(target))))

/** 将 Teleport 子浮层关联到所属模态框，供焦点循环和恢复使用。 */
export function useModalFloatingElement(element: Ref<HTMLElement | null>, visible: Readonly<Ref<boolean>>) {
  const modal = inject(modalKey, null)
  const stop = watch(visible, opened => {
    if (opened) modal?.floatingElements.add(element)
    else modal?.floatingElements.delete(element)
  }, { immediate: true, flush: 'sync' })
  onBeforeUnmount(() => { stop(); modal?.floatingElements.delete(element) })
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
  if (!entry || !element || event.defaultPrevented) return
  if (event.key === 'Escape' && !event.isComposing) {
    if (entry.closeOnEsc()) {
      event.preventDefault()
      event.stopPropagation()
      entry.close()
    }
  } else if (event.key === 'Tab') {
    const items = [element, ...[...entry.floatingElements].map(item => item.value).filter((item): item is HTMLElement => item !== null && !element.contains(item))].flatMap(focusableElements)
    const first = items[0]
    const last = items[items.length - 1]
    if (!first || !containsFocus(entry, document.activeElement) || (event.shiftKey ? document.activeElement === first || document.activeElement === element : document.activeElement === last)) {
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
  const entry: ModalEntry = { ...options, previousFocus: null, floatingElements: new Set() }
  provide(modalKey, entry)
  let stop: (() => void) | undefined
  function deactivate() {
    const index = modals.indexOf(entry)
    if (index < 0) return
    const wasTop = topModal() === entry
    modals.splice(index, 1)
    if (!modals.length) {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeydown)
    }
    if (!wasTop) return
    const top = topModal()
    if (entry.previousFocus?.isConnected && (!top || containsFocus(top, entry.previousFocus))) entry.previousFocus.focus({ preventScroll: true })
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
        document.addEventListener('keydown', onKeydown)
      }
      modals.push(entry)
      await nextTick()
      if (options.visible.value && topModal() === entry) focusModal(entry)
    }, { immediate: true, flush: 'post' })
  })
  onBeforeUnmount(() => { stop?.(); deactivate() })
}
