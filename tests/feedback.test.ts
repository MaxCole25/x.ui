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
        type: 'success',
        showClose: true,
        duration: 0
      }
    })

    expect(wrapper.text()).toContain('保存成功')
    await wrapper.find('.x-message__close').trigger('click')
    expect(wrapper.emitted('close')?.length).toBe(1)
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
