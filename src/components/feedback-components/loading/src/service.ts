import { createApp, h } from 'vue'
import Loading from './Loading.vue'
import type { LoadingInstance, LoadingOptions } from './types'

export function XLoadingService(options: LoadingOptions = {}): LoadingInstance {
  const target = typeof options.target === 'string' ? document.querySelector(options.target) : options.target
  const mountTarget = target || document.body
  const container = document.createElement('div')
  mountTarget.appendChild(container)

  const app = createApp({
    render() {
      return h(Loading, {
        ...options,
        fullscreen: options.fullscreen ?? !target,
        modelValue: true
      })
    }
  })

  app.mount(container)

  return {
    close() {
      app.unmount()
      container.remove()
    }
  }
}
