import { nextTick, onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

import { useModalFloatingElement } from './useModal'

type Placement = 'top' | 'bottom' | 'left' | 'right'

/** Teleport 浮层使用视口坐标，监听打开期间的滚动、窗口与内容尺寸变化。 */
export function useFloatingPosition(options: {
  trigger: Ref<HTMLElement | null>
  popper: Ref<HTMLElement | null>
  visible: Readonly<Ref<boolean>>
  placement: () => Placement
  teleported: () => boolean
}) {
  useModalFloatingElement(options.popper, options.visible)
  const position = ref<Record<string, string>>({})
  const effectivePlacement = ref<Placement>(options.placement())
  let observer: ResizeObserver | undefined
  let stopWatch: (() => void) | undefined
  function updatePosition() {
    if (!options.visible.value || !options.teleported() || !options.trigger.value || !options.popper.value) return
    const trigger = options.trigger.value.getBoundingClientRect()
    const popper = options.popper.value.getBoundingClientRect()
    const gap = 8
    const width = window.innerWidth || document.documentElement.clientWidth
    const height = window.innerHeight || document.documentElement.clientHeight
    const space = { top: trigger.top - gap, bottom: height - trigger.bottom - gap, left: trigger.left - gap, right: width - trigger.right - gap }
    const opposite = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' } as const
    let placement = options.placement()
    const size = placement === 'left' || placement === 'right' ? popper.width : popper.height
    if (space[placement] < size && space[opposite[placement]] > space[placement]) placement = opposite[placement]
    let left = trigger.left + (trigger.width - popper.width) / 2
    let top = trigger.bottom + gap
    if (placement === 'top') top = trigger.top - popper.height - gap
    if (placement === 'left' || placement === 'right') {
      left = placement === 'left' ? trigger.left - popper.width - gap : trigger.right + gap
      top = trigger.top + (trigger.height - popper.height) / 2
    }
    effectivePlacement.value = placement
    position.value = {
      left: `${Math.round(Math.max(gap, Math.min(left, width - popper.width - gap)))}px`,
      top: `${Math.round(Math.max(gap, Math.min(top, height - popper.height - gap)))}px`
    }
  }
  function cleanup() {
    observer?.disconnect()
    observer = undefined
    window.removeEventListener('scroll', updatePosition, true)
    window.removeEventListener('resize', updatePosition)
  }
  onMounted(() => {
    stopWatch = watch([options.visible, options.teleported, options.placement, options.trigger, options.popper], async (_values, _previousValues, onCleanup) => {
      let active = true
      onCleanup(() => {
        active = false
        cleanup()
      })
      position.value = {}
      await nextTick()
      if (!active || !options.visible.value || !options.teleported() || !options.trigger.value || !options.popper.value) return
      updatePosition()
      window.addEventListener('scroll', updatePosition, true)
      window.addEventListener('resize', updatePosition)
      if (typeof ResizeObserver !== 'undefined') {
        observer = new ResizeObserver(updatePosition)
        if (options.trigger.value) observer.observe(options.trigger.value)
        if (options.popper.value) observer.observe(options.popper.value)
      }
    }, { immediate: true, flush: 'post' })
  })
  onBeforeUnmount(() => { stopWatch?.(); cleanup() })
  return { position, effectivePlacement, updatePosition }
}
