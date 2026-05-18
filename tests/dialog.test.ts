import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XDialog } from '../src'

describe('XDialog', () => {
  it('renders body and footer slots when visible', () => {
    const wrapper = mount(XDialog, {
      props: {
        modelValue: true
      },
      slots: {
        default: '<div class="body-slot">正文内容</div>',
        footer: '<div class="footer-slot">底部操作</div>'
      },
      attachTo: document.body
    })

    expect(document.body.querySelector('.x-dialog')).not.toBeNull()
    expect(document.body.querySelector('.body-slot')?.textContent).toContain('正文内容')
    expect(document.body.querySelector('.footer-slot')?.textContent).toContain('底部操作')
    wrapper.unmount()
  })

  it('emits update:modelValue and close when clicking close button', async () => {
    const wrapper = mount(XDialog, {
      props: {
        modelValue: true
      },
      attachTo: document.body
    })

    const closeButton = document.body.querySelector('.x-dialog__close') as HTMLButtonElement
    closeButton.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')?.length).toBe(1)
    wrapper.unmount()
  })

  it('does not close on mask click when closeOnMaskClick is false', async () => {
    const wrapper = mount(XDialog, {
      props: {
        modelValue: true,
        closeOnMaskClick: false
      },
      attachTo: document.body
    })

    const mask = document.body.querySelector('.x-dialog__mask') as HTMLElement
    mask.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    wrapper.unmount()
  })

  it('keeps dialog shell spacing and radius independent from size preset', () => {
    const wrapper = mount(XDialog, {
      props: {
        modelValue: true,
        size: 'sm'
      },
      attachTo: document.body
    })

    const dialog = document.body.querySelector('.x-dialog') as HTMLElement
    expect(dialog.getAttribute('style')).toContain('--x-dialog-font-size: 10px')
    expect(dialog.getAttribute('style')).toContain('--x-dialog-control-height: 22px')
    expect(dialog.getAttribute('style')).not.toContain('--x-dialog-padding')
    expect(dialog.getAttribute('style')).not.toContain('--x-dialog-radius')
    wrapper.unmount()
  })
})
