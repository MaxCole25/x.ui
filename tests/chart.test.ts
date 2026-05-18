import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { XChart } from '../src'
import type { ChartExpose } from '../src'

const echartsMock = vi.hoisted(() => {
  type Handler = (...args: unknown[]) => void

  const instances: Array<{
    handlers: Record<string, Handler[]>
    setOption: ReturnType<typeof vi.fn>
    resize: ReturnType<typeof vi.fn>
    dispatchAction: ReturnType<typeof vi.fn>
    clear: ReturnType<typeof vi.fn>
    showLoading: ReturnType<typeof vi.fn>
    hideLoading: ReturnType<typeof vi.fn>
    dispose: ReturnType<typeof vi.fn>
    on: ReturnType<typeof vi.fn>
    off: ReturnType<typeof vi.fn>
    trigger: (name: string, ...args: unknown[]) => void
  }> = []

  const init = vi.fn(() => {
    const handlers: Record<string, Handler[]> = {}
    const instance = {
      handlers,
      setOption: vi.fn(),
      resize: vi.fn(),
      dispatchAction: vi.fn(),
      clear: vi.fn(),
      showLoading: vi.fn(),
      hideLoading: vi.fn(),
      dispose: vi.fn(),
      on: vi.fn((name: string, queryOrHandler: string | object | Handler, maybeHandler?: Handler) => {
        const handler = typeof queryOrHandler === 'function' ? queryOrHandler : maybeHandler
        if (handler) {
          handlers[name] = [...(handlers[name] ?? []), handler as Handler]
        }
        return instance
      }),
      off: vi.fn((name: string, handler?: Handler) => {
        if (!handler) {
          handlers[name] = []
        } else {
          handlers[name] = (handlers[name] ?? []).filter((item) => item !== (handler as Handler))
        }
        return instance
      }),
      trigger: (name: string, ...args: unknown[]) => {
        ;(handlers[name] ?? []).forEach((handler) => handler(...args))
      }
    }
    instances.push(instance)
    return instance
  })

  return { init, instances }
})

vi.mock('echarts/core', () => ({
  init: echartsMock.init
}))

async function flushChart() {
  await nextTick()
  await nextTick()
}

describe('XChart', () => {
  beforeEach(() => {
    echartsMock.init.mockClear()
    echartsMock.instances.length = 0
  })

  it('initializes echarts and applies option on mount', async () => {
    const option = { xAxis: {}, yAxis: {}, series: [] }

    const wrapper = mount(XChart, {
      props: { option }
    })
    await flushChart()

    expect(echartsMock.init).toHaveBeenCalledTimes(1)
    expect(echartsMock.instances[0].setOption).toHaveBeenCalledWith(option, undefined)
    expect(wrapper.emitted('ready')?.[0]?.[0]).toBe(echartsMock.instances[0])
  })

  it('updates option only when option reference changes', async () => {
    const option = { series: [{ data: [1] }] }
    const wrapper = mount(XChart, {
      props: { option }
    })
    await flushChart()

    expect(echartsMock.instances[0].setOption).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ option })
    expect(echartsMock.instances[0].setOption).toHaveBeenCalledTimes(1)

    const nextOption = { series: [{ data: [2] }] }
    await wrapper.setProps({ option: nextOption, setOptionOptions: { notMerge: true } })
    expect(echartsMock.instances[0].setOption).toHaveBeenCalledWith(nextOption, { notMerge: true })
  })

  it('syncs loading state', async () => {
    const wrapper = mount(XChart, {
      props: {
        option: { series: [] },
        loading: true,
        loadingOptions: { text: '加载中' }
      }
    })
    await flushChart()

    expect(echartsMock.instances[0].showLoading).toHaveBeenCalledWith('default', { text: '加载中' })

    await wrapper.setProps({ loading: false })
    expect(echartsMock.instances[0].hideLoading).toHaveBeenCalled()
  })

  it('binds updates and clears custom events', async () => {
    const click = vi.fn()
    const hover = vi.fn()
    const nextClick = vi.fn()
    const wrapper = mount(XChart, {
      props: {
        option: { series: [] },
        events: {
          click,
          mouseover: { query: 'series', handler: hover }
        }
      }
    })
    await flushChart()

    const instance = echartsMock.instances[0]
    expect(instance.on).toHaveBeenCalledWith('click', click)
    expect(instance.on).toHaveBeenCalledWith('mouseover', 'series', hover)

    instance.trigger('click', { type: 'click' })
    expect(click).toHaveBeenCalledWith({ type: 'click' })

    await wrapper.setProps({ events: { click: nextClick } })
    instance.trigger('click', { type: 'next' })

    expect(click).toHaveBeenCalledTimes(1)
    expect(nextClick).toHaveBeenCalledWith({ type: 'next' })
    expect(instance.off).toHaveBeenCalledWith('click', click)
    expect(instance.off).toHaveBeenCalledWith('mouseover', hover)
  })

  it('forwards rendered and finished events', async () => {
    const wrapper = mount(XChart, {
      props: { option: { series: [] } }
    })
    await flushChart()

    echartsMock.instances[0].trigger('rendered', { rendered: true })
    echartsMock.instances[0].trigger('finished', { finished: true })

    expect(wrapper.emitted('rendered')?.[0]).toEqual([{ rendered: true }])
    expect(wrapper.emitted('finished')?.[0]).toEqual([{ finished: true }])
  })

  it('recreates chart when theme or init options reference changes', async () => {
    const option = { series: [] }
    const initOptions = { renderer: 'canvas' as const }
    const wrapper = mount(XChart, {
      props: {
        option,
        theme: 'light',
        initOptions
      }
    })
    await flushChart()

    const firstInstance = echartsMock.instances[0]
    expect(echartsMock.init).toHaveBeenCalledWith(expect.any(HTMLElement), 'light', initOptions)

    await wrapper.setProps({ theme: 'dark' })
    await flushChart()

    expect(firstInstance.dispose).toHaveBeenCalled()
    expect(echartsMock.init).toHaveBeenLastCalledWith(expect.any(HTMLElement), 'dark', initOptions)
    expect(echartsMock.instances[1].setOption).toHaveBeenCalledWith(option, undefined)

    const nextInitOptions = { renderer: 'svg' as const }
    await wrapper.setProps({ initOptions: nextInitOptions })
    await flushChart()

    expect(echartsMock.instances[1].dispose).toHaveBeenCalled()
    expect(echartsMock.init).toHaveBeenLastCalledWith(expect.any(HTMLElement), 'dark', nextInitOptions)
  })

  it('disposes chart on unmount', async () => {
    const wrapper = mount(XChart, {
      props: { option: { series: [] } }
    })
    await flushChart()

    const instance = echartsMock.instances[0]
    wrapper.unmount()

    expect(instance.dispose).toHaveBeenCalled()
  })

  it('exposes common echarts instance methods', async () => {
    const wrapper = mount(XChart, {
      props: { option: { series: [] } }
    })
    await flushChart()

    const vm = wrapper.vm as unknown as ChartExpose
    const instance = echartsMock.instances[0]
    const nextOption = { series: [{ data: [1, 2] }] }

    expect(vm.getInstance()).toBe(instance)
    vm.setOption(nextOption, { notMerge: true })
    vm.resize({ animation: { duration: 0 } })
    vm.dispatchAction({ type: 'highlight' })
    vm.clear()
    vm.showLoading('default', { text: '处理中' })
    vm.hideLoading()

    expect(instance.setOption).toHaveBeenCalledWith(nextOption, { notMerge: true })
    expect(instance.resize).toHaveBeenCalledWith({ animation: { duration: 0 } })
    expect(instance.dispatchAction).toHaveBeenCalledWith({ type: 'highlight' })
    expect(instance.clear).toHaveBeenCalled()
    expect(instance.showLoading).toHaveBeenCalledWith('default', { text: '处理中' })
    expect(instance.hideLoading).toHaveBeenCalled()
  })
})
