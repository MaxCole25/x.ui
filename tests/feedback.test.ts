import { defineComponent, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  XDropdown,
  XDropdownItem,
  XDropdownMenu,
  XLoading,
  XMessage,
  XMessageBox,
  XMessageBoxComponent,
  XMessageComponent,
  vLoading
} from '../src'

describe('feedback components', () => {
  it('renders XMessageComponent and emits close', async () => {
    const wrapper = mount(XMessageComponent, {
      props: {
        message: '保存成功',
        status: 'success',
        showClose: true,
        duration: 0
      }
    })

    expect(wrapper.text()).toContain('保存成功')
    await wrapper.find('.x-message__close').trigger('click')
    expect(wrapper.emitted('close')?.length).toBe(1)
  })

  it('uses message status class', () => {
    const wrapper = mount(XMessageComponent, {
      props: {
        message: '状态提示',
        status: 'warning',
        duration: 0
      }
    })

    expect(wrapper.find('.x-message').classes()).toContain('x-message--warning')
    expect(wrapper.find('.x-message').classes()).not.toContain('x-message--success')
  })

  it('keeps message size from owning padding and radius', () => {
    const wrapper = mount(XMessageComponent, {
      props: {
        message: '保存成功',
        size: 'sm',
        padding: '18px 20px',
        radius: 12,
        duration: 0
      }
    })

    const style = wrapper.find('.x-message').attributes('style')
    expect(style).toContain('--x-message-font-size: 10px')
    expect(style).toContain('--x-message-min-height: 22px')
    expect(style).toContain('--x-message-padding: 18px 20px')
    expect(style).toContain('--x-message-radius: 12px')
  })

  it('creates message service instances', () => {
    const handler = XMessage.success({
      message: '服务消息',
      duration: 0,
      showClose: true
    })

    expect(document.body.querySelector('.x-message')?.textContent).toContain('服务消息')
    handler.close()
    expect(document.body.querySelector('.x-message')).toBeNull()
  })

  it('emits message box actions', async () => {
    const wrapper = mount(XMessageBoxComponent, {
      props: {
        modelValue: true,
        message: '确认删除',
        showCancelButton: true
      },
      attachTo: document.body
    })

    const confirm = document.body.querySelector('.x-message-box__button--confirm') as HTMLButtonElement
    confirm.click()
    await nextTick()

    expect(wrapper.emitted('action')?.[0]).toEqual(['confirm'])
    expect(wrapper.emitted('confirm')?.length).toBe(1)
    wrapper.unmount()
  })

  it('uses message box status class', () => {
    const wrapper = mount(XMessageBoxComponent, {
      props: {
        modelValue: true,
        message: '确认删除',
        status: 'error'
      },
      attachTo: document.body
    })

    const icon = document.body.querySelector('.x-message-box__icon') as HTMLElement
    expect(icon.classList.contains('x-message-box__icon--error')).toBe(true)
    expect(icon.classList.contains('x-message-box__icon--success')).toBe(false)
    wrapper.unmount()
  })

  it('keeps message box size from owning padding and radius', () => {
    const wrapper = mount(XMessageBoxComponent, {
      props: {
        modelValue: true,
        message: '确认删除',
        size: 'lg',
        padding: '22px',
        radius: 14
      },
      attachTo: document.body
    })

    const style = (document.body.querySelector('.x-message-box__mask') as HTMLElement).getAttribute('style')
    expect(style).toContain('--x-message-box-font-size: 14px')
    expect(style).toContain('--x-message-box-control-height: 38px')
    expect(style).toContain('--x-message-box-padding: 22px')
    expect(style).toContain('--x-message-box-radius: 14px')
    wrapper.unmount()
  })

  it('resolves message box service when confirmed', async () => {
    const promise = XMessageBox.confirm('确认继续？', '提示')
    const confirm = document.body.querySelector('.x-message-box__button--confirm') as HTMLButtonElement
    confirm.click()
    await expect(promise).resolves.toBe('confirm')
  })

  it('renders loading component and directive', async () => {
    const wrapper = mount(XLoading, {
      props: {
        modelValue: true,
        text: '加载中'
      }
    })

    expect(wrapper.text()).toContain('加载中')

    const Demo = defineComponent({
      directives: {
        loading: vLoading
      },
      setup() {
        const loading = ref(true)
        return { loading }
      },
      template: '<div class="host" v-loading="loading">内容</div>'
    })

    const directiveWrapper = mount(Demo, { attachTo: document.body })
    expect(directiveWrapper.find('.x-loading').exists()).toBe(true)
    directiveWrapper.vm.loading = false
    await nextTick()
    expect(directiveWrapper.find('.x-loading').exists()).toBe(false)
  })

  it('supports dropdown command and expanded placement', async () => {
    const Demo = defineComponent({
      components: {
        XDropdown,
        XDropdownMenu,
        XDropdownItem
      },
      template: `
        <XDropdown trigger="click" placement="right-end" show-arrow @command="$emit('command', $event)">
          <button>更多</button>
          <template #dropdown>
            <XDropdownMenu>
              <XDropdownItem command="copy">复制</XDropdownItem>
            </XDropdownMenu>
          </template>
        </XDropdown>
      `
    })
    const wrapper = mount(Demo)

    await wrapper.find('.x-dropdown__trigger').trigger('click')
    expect(wrapper.find('.x-dropdown__popper--right-end').exists()).toBe(true)
    await wrapper.findComponent(XDropdownItem).trigger('click')
    expect(wrapper.emitted('command')?.[0]).toEqual(['copy'])
  })
})
