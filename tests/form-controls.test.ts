import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XBaseInput, XCheckbox, XForm, XFormItem, XInput, XRadio, XSelect, XSwitch } from '../src'

describe('form controls', () => {
  it('updates XInput model value and clears content', async () => {
    const wrapper = mount(XInput, {
      props: {
        modelValue: 'abc',
        clearable: true,
        'onUpdate:modelValue': (value: string | number) => wrapper.setProps({ modelValue: value })
      }
    })

    await wrapper.find('input').setValue('x.ui')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['x.ui'])
    expect(wrapper.find('.x-base-input').exists()).toBe(true)
    expect(wrapper.find('.x-base-input__inner + .x-base-input__clear').exists()).toBe(true)
    expect(wrapper.find('.x-base-input__clear .ri-close-circle-line').exists()).toBe(true)

    await wrapper.find('.x-base-input__clear').trigger('click')
    expect(wrapper.emitted('clear')).toHaveLength(1)
    expect(wrapper.props('modelValue')).toBe('')
  })

  it('lets XBaseInput opt into automatic height', () => {
    const wrapper = mount(XBaseInput, {
      props: {
        modelValue: '嵌入单元格',
        autoHeight: true,
        height: 44
      }
    })

    expect(wrapper.find('.x-base-input').attributes('style')).toContain('--x-base-input-height: auto')
  })

  it('selects and clears an option in XSelect', async () => {
    const wrapper = mount(XSelect, {
      props: {
        modelValue: '',
        clearable: true,
        options: [
          { label: '待处理', value: 'todo' },
          { label: '完成', value: 'done' }
        ],
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
      }
    })

    await wrapper.find('.x-select__control').trigger('click')
    await wrapper.findAll('.x-option')[1].trigger('click')
    expect(wrapper.props('modelValue')).toBe('done')

    await wrapper.find('.x-select__control').trigger('click')
    await wrapper.find('.x-select__clear').trigger('click')
    expect(wrapper.props('modelValue')).toBeUndefined()
  })

  it('updates checkbox array values', async () => {
    const wrapper = mount(XCheckbox, {
      props: {
        modelValue: ['read'],
        value: 'write',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
      }
    })

    await wrapper.find('input').trigger('change')
    expect(wrapper.props('modelValue')).toEqual(['read', 'write'])
  })

  it('updates radio and switch values', async () => {
    const radio = mount(XRadio, {
      props: {
        modelValue: 'day',
        value: 'week',
        'onUpdate:modelValue': (value) => radio.setProps({ modelValue: value })
      }
    })

    await radio.find('input').trigger('change')
    expect(radio.props('modelValue')).toBe('week')

    const switcher = mount(XSwitch, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (value) => switcher.setProps({ modelValue: value })
      }
    })

    await switcher.find('button').trigger('click')
    expect(switcher.props('modelValue')).toBe(true)
  })

  it('renders default and custom switch labels', () => {
    const defaults = mount(XSwitch)

    expect(defaults.find('.x-switch__text--inactive').text()).toBe('关')
    expect(defaults.find('.x-switch__text--active').text()).toBe('开')
    expect(defaults.classes()).toContain('x-switch--label-outside')

    const custom = mount(XSwitch, {
      props: {
        activeText: '开启通知',
        inactiveText: '关闭通知'
      }
    })

    expect(custom.find('.x-switch__text--inactive').text()).toBe('关闭通知')
    expect(custom.find('.x-switch__text--active').text()).toBe('开启通知')
  })

  it('renders switch labels inside the track when configured', async () => {
    const wrapper = mount(XSwitch, {
      props: {
        modelValue: false,
        activeText: '开',
        inactiveText: '关',
        labelPosition: 'inside' as const,
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
      }
    })

    expect(wrapper.classes()).toContain('x-switch--label-inside')
    expect(wrapper.find('.x-switch__text--inactive').exists()).toBe(false)
    expect(wrapper.find('.x-switch__text--active').exists()).toBe(false)
    expect(wrapper.find('.x-switch__track-text').text()).toBe('关')

    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.x-switch__track-text').text()).toBe('开')
  })

  it('exposes switch appearance variables', () => {
    const wrapper = mount(XSwitch, {
      props: {
        color: '#409eff',
        inactiveColor: '#dcdfe6',
        thumbColor: '#ffffff',
        buttonSize: 20,
        fontSize: 15,
        fontFamily: 'Arial, sans-serif'
      }
    })

    const style = wrapper.find('.x-switch').attributes('style')
    expect(style).toContain('--x-switch-color: #409eff')
    expect(style).toContain('--x-switch-inactive-color: #dcdfe6')
    expect(style).toContain('--x-switch-thumb-color: #ffffff')
    expect(style).toContain('--x-switch-button-size: 20px')
    expect(style).toContain('--x-switch-font-size: 15px')
    expect(style).toContain('--x-switch-font-family: Arial, sans-serif')
  })

  it('controls radio selection inside a v-model group', async () => {
    const wrapper = mount({
      components: { XRadio },
      data: () => ({
        priority: 'normal'
      }),
      template: `
        <div>
          <XRadio v-model="priority" name="priority" value="normal">普通</XRadio>
          <XRadio v-model="priority" name="priority" value="urgent">紧急</XRadio>
          <XRadio v-model="priority" name="priority" value="blocked">阻塞</XRadio>
        </div>
      `
    })

    await wrapper.findAll('input')[1].trigger('change')
    expect(wrapper.vm.priority).toBe('urgent')
    expect(wrapper.findAll('.x-radio')[1].classes()).toContain('is-checked')
    expect(wrapper.findAll('.x-radio')[0].classes()).not.toContain('is-checked')
  })

  it('exposes radio appearance variables', () => {
    const wrapper = mount(XRadio, {
      props: {
        modelValue: 'custom',
        value: 'custom',
        fontFamily: 'SimSun, 宋体, serif',
        fontSize: 15,
        labelColor: '#4c1d95',
        buttonColor: '#7c3aed',
        buttonSize: 18
      }
    })

    const style = wrapper.find('.x-radio').attributes('style')
    const nativeStyle = wrapper.find('input').attributes('style')
    expect(style).toContain('--x-radio-font-family: SimSun, 宋体, serif')
    expect(style).toContain('--x-radio-font-size: 15px')
    expect(style).toContain('--x-radio-text-color: #4c1d95')
    expect(style).toContain('--x-radio-color: #7c3aed')
    expect(nativeStyle).toContain('accent-color: #7c3aed')
    expect(nativeStyle).toContain('height: 18px')
    expect(nativeStyle).toContain('width: 18px')
    expect(style).not.toContain('--x-radio-active-glow-color')
    expect(style).not.toContain('--x-radio-disabled-button-color')
  })

  it('provides form size and disabled state to children', () => {
    const wrapper = mount({
      components: { XForm, XFormItem, XInput },
      template: `
        <XForm size="lg" disabled>
          <XFormItem label="名称">
            <XInput />
          </XFormItem>
        </XForm>
      `
    })

    expect(wrapper.find('.x-base-input').classes()).toContain('x-base-input--lg')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('label').attributes('for')).toBe(wrapper.find('input').attributes('id'))
  })
})
