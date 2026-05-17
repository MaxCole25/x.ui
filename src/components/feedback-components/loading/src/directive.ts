import { createApp, h, type App, type Directive } from 'vue'
import Loading from './Loading.vue'
import type { LoadingOptions } from './types'

type LoadingBinding = boolean | LoadingOptions

interface LoadingElement extends HTMLElement {
  __xLoading__?: {
    app: App
    container: HTMLElement
    options: LoadingOptions
  }
}

function resolveOptions(value: LoadingBinding): LoadingOptions & { modelValue: boolean } {
  if (typeof value === 'boolean') return { modelValue: value }
  return { ...value, modelValue: true }
}

function mountLoading(el: LoadingElement, value: LoadingBinding) {
  const options = resolveOptions(value)
  if (!options.modelValue) return
  const container = document.createElement('div')
  const previousPosition = getComputedStyle(el).position
  if (!previousPosition || previousPosition === 'static') {
    el.style.position = 'relative'
  }
  el.appendChild(container)
  const app = createApp({
    render() {
      return h(Loading, {
        ...options,
        modelValue: true
      })
    }
  })
  app.mount(container)
  el.__xLoading__ = { app, container, options }
}

function unmountLoading(el: LoadingElement) {
  const instance = el.__xLoading__
  if (!instance) return
  instance.app.unmount()
  instance.container.remove()
  delete el.__xLoading__
}

export const vLoading: Directive<LoadingElement, LoadingBinding> = {
  mounted(el, binding) {
    mountLoading(el, binding.value)
  },
  updated(el, binding) {
    const isActive = typeof binding.value === 'boolean' ? binding.value : Boolean(binding.value)
    const wasActive = typeof binding.oldValue === 'boolean' ? binding.oldValue : Boolean(binding.oldValue)
    if (isActive === wasActive && el.__xLoading__) return
    if (isActive) mountLoading(el, binding.value)
    else unmountLoading(el)
  },
  unmounted(el) {
    unmountLoading(el)
  }
}
