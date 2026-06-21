import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import {
  XAlert,
  XBadge,
  XBreadcrumb,
  XCollapse,
  XDescriptions,
  XNotification,
  XNotificationComponent,
  XPagination,
  XPopover,
  XPopconfirm,
  XProgress,
  XSkeleton,
  XStatistic,
  XSteps,
  XUpload,
  overlayZIndex
} from '../src'

describe('关键补充组件', () => {
  it('renders badge content with max and dot modes', async () => {
    const wrapper = mount(XBadge, { props: { modelValue: 120, max: 99 }, slots: { default: '<button>消息</button>' } })

    expect(wrapper.find('.x-badge__content').text()).toBe('99+')
    await wrapper.setProps({ dot: true })
    expect(wrapper.find('.x-badge__content').classes()).toContain('is-dot')
  })

  it('renders progress with normalized percentage', () => {
    const wrapper = mount(XProgress, { props: { percentage: 120, status: 'success' } })

    expect(wrapper.attributes('aria-valuenow')).toBe('100')
    expect(wrapper.attributes('style')).toContain('--x-progress-percent: 100%')
  })

  it('shows skeleton while loading and default slot after loaded', async () => {
    const wrapper = mount(XSkeleton, { props: { loading: true, rows: 2, avatar: true }, slots: { default: '真实内容' } })

    expect(wrapper.findAll('.x-skeleton__row')).toHaveLength(2)
    await wrapper.setProps({ loading: false })
    expect(wrapper.text()).toContain('真实内容')
  })

  it('toggles collapse values', async () => {
    const wrapper = mount(XCollapse, {
      props: {
        modelValue: [],
        items: [
          { name: 'base', title: '基础', content: '基础内容' },
          { name: 'more', title: '更多', content: '更多内容' }
        ]
      }
    })

    await wrapper.find('.x-collapse__header').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['base']])
  })

  it('renders descriptions and statistic values', () => {
    const descriptions = mount(XDescriptions, {
      props: { title: '订单', bordered: true, items: [{ label: '客户', value: '示例科技' }] }
    })
    const statistic = mount(XStatistic, { props: { title: '转化率', modelValue: 18.236, precision: 2, suffix: '%' } })

    expect(descriptions.text()).toContain('示例科技')
    expect(descriptions.classes()).toContain('is-bordered')
    expect(statistic.text()).toContain('18.24')
    expect(statistic.text()).toContain('%')
  })

  it('emits breadcrumb click for enabled items', async () => {
    const wrapper = mount(XBreadcrumb, { props: { items: [{ label: '首页' }, { label: '组件', disabled: true }, { label: '当前' }] } })

    await wrapper.find('.x-breadcrumb__link').trigger('click')
    expect(wrapper.emitted('click')?.[0]?.[0]).toMatchObject({ label: '首页' })
  })

  it('updates pagination page and page size', async () => {
    const wrapper = mount(XPagination, { props: { modelValue: 1, total: 80, pageSize: 10, showPageSize: true } })

    await wrapper.findAll('.x-pagination__pager')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([2])
    await wrapper.find('select').setValue('20')
    expect(wrapper.emitted('update:pageSize')?.[0]).toEqual([20])
  })

  it('emits steps change when clickable', async () => {
    const wrapper = mount(XSteps, {
      props: {
        modelValue: 0,
        clickable: true,
        items: [{ title: '第一步' }, { title: '第二步' }]
      }
    })

    await wrapper.findAll('.x-steps__item')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([1])
    expect(wrapper.findAll('.x-steps__item')[0].classes()).toContain('x-steps__item--process')
  })

  it('queues upload files and runs request method', async () => {
    const requestMethod = vi.fn(async (_file: File, onProgress: (percentage: number) => void) => {
      onProgress(66)
      return { ok: true }
    })
    const wrapper = mount(XUpload, { props: { autoUpload: true, requestMethod } })
    const input = wrapper.find('input[type="file"]')
    const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })
    Object.defineProperty(input.element, 'files', { configurable: true, value: [file] })

    await input.trigger('change')
    await nextTick()
    await Promise.resolve()

    expect(requestMethod).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('success')?.[0]?.[0]).toMatchObject({ name: 'hello.txt', status: 'success', percentage: 100 })
  })

  it('closes alert and emits close', async () => {
    const wrapper = mount(XAlert, { props: { title: '提醒', closable: true } })

    await wrapper.find('.x-alert__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.find('.x-alert').exists()).toBe(false)
  })

  it('opens popover without teleport and uses z index', async () => {
    const wrapper = mount(XPopover, { props: { content: '详情', teleported: false, zIndex: overlayZIndex.popper }, slots: { default: '<button>打开</button>' } })

    await wrapper.trigger('click')
    expect(wrapper.find('.x-popover__popper').text()).toContain('详情')
    expect(wrapper.find('.x-popover__popper').attributes('style')).toContain('--x-popover-z-index: 2000')
  })

  it('confirms popconfirm action', async () => {
    const wrapper = mount(XPopconfirm, { props: { content: '删除？', teleported: false }, slots: { default: '<button>删除</button>' } })

    await wrapper.trigger('click')
    await wrapper.find('.x-popconfirm__confirm').trigger('click')
    expect(wrapper.emitted('confirm')).toHaveLength(1)
    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents?.[updateEvents.length - 1]).toEqual([false])
  })

  it('renders notification component and service can close', async () => {
    const wrapper = mount(XNotificationComponent, { props: { title: '完成', message: '导出完成', duration: 0 } })

    expect(wrapper.text()).toContain('导出完成')
    await wrapper.find('.x-notification__close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)

    const handler = XNotification({ title: '服务', message: '创建成功', duration: 0 })
    expect(document.body.textContent).toContain('创建成功')
    handler.close()
    expect(document.body.textContent).not.toContain('创建成功')
  })
})

