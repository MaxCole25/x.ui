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

  it('exposes color style variables for dialog shell', () => {
    const wrapper = mount(XDialog, {
      props: {
        modelValue: true,
        maskColor: 'rgba(0, 0, 0, 0.52)',
        backgroundColor: '#07111f',
        textColor: '#eef4fb',
        borderColor: '#203247',
        borderWidth: 2,
        titleColor: '#ffffff',
        headerBackgroundColor: '#0b1726',
        bodyBackgroundColor: '#101d2e',
        footerBackgroundColor: '#0b1726',
        headerBorderColor: '#203247',
        footerBorderColor: '#203247',
        closeIconColor: '#8da0b8',
        closeIconHoverColor: '#ffffff',
        closeIconHoverBackgroundColor: '#12243a',
        shadow: '0 24px 80px rgba(0, 0, 0, 0.42)',
        resizerColor: '#8da0b8'
      },
      attachTo: document.body
    })

    const mask = document.body.querySelector('.x-dialog__mask') as HTMLElement
    const dialog = document.body.querySelector('.x-dialog') as HTMLElement
    const maskStyle = mask.getAttribute('style')
    const dialogStyle = dialog.getAttribute('style')

    expect(maskStyle).toContain('--x-dialog-mask: rgba(0, 0, 0, 0.52)')
    expect(dialogStyle).toContain('--x-dialog-bg: #07111f')
    expect(dialogStyle).toContain('--x-dialog-text: #eef4fb')
    expect(dialogStyle).toContain('--x-dialog-border-color: #203247')
    expect(dialogStyle).toContain('--x-dialog-border-width: 2px')
    expect(dialogStyle).toContain('--x-dialog-title: #ffffff')
    expect(dialogStyle).toContain('--x-dialog-header-bg: #0b1726')
    expect(dialogStyle).toContain('--x-dialog-body-bg: #101d2e')
    expect(dialogStyle).toContain('--x-dialog-footer-bg: #0b1726')
    expect(dialogStyle).toContain('--x-dialog-close-icon: #8da0b8')
    expect(dialogStyle).toContain('--x-dialog-close-icon-hover: #ffffff')
    expect(dialogStyle).toContain('--x-dialog-close-hover-bg: #12243a')
    expect(dialogStyle).toContain('--x-dialog-resizer-color: #8da0b8')
    wrapper.unmount()
  })
})
