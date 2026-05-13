import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import {
  XAutocomplete,
  XAvatar,
  XButton,
  XCascader,
  XCheckbox,
  XColorPicker,
  XColorPickerPanel,
  XDatePicker,
  XDatePickerPanel,
  XDateTimePicker,
  XForm,
  XInput,
  XInputNumber,
  XRadio,
  XScrollbar,
  XSelect,
  XSlider,
  XSwitch,
  XText,
  XTimePicker,
  XTimeSelect
} from '../src'

describe('元素组件', () => {
  it('renders text style classes', () => {
    const wrapper = mount(XText, {
      props: { type: 'primary', size: 'title' },
      slots: { default: '标题' }
    })

    expect(wrapper.text()).toBe('标题')
    expect(wrapper.classes()).toContain('x-text--primary')
    expect(wrapper.classes()).toContain('x-text--title')
  })

  it('renders avatar initials', () => {
    const wrapper = mount(XAvatar, {
      props: { name: 'UX' }
    })

    expect(wrapper.text()).toBe('UX')
  })

  it('renders avatar border style variables', () => {
    const wrapper = mount(XAvatar, {
      props: {
        name: 'UX',
        borderWidth: 2,
        borderColor: '#0f172a'
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-avatar-border-width: 2px')
    expect(wrapper.attributes('style')).toContain('--x-avatar-border-color: #0f172a')
  })

  it('exposes shared element appearance style variables', () => {
    const appearanceProps = {
      borderWidth: 3,
      borderColor: '#155e75',
      backgroundColor: '#ecfeff',
      textColor: '#164e63'
    }
    const cases = [
      [XButton, { slots: { default: '按钮' } }],
      [XInput, { props: { modelValue: '输入' } }],
      [XSelect, { props: { modelValue: 'vue', options: [{ label: 'Vue', value: 'vue' }] } }],
      [XCheckbox, { props: { modelValue: true }, slots: { default: '复选' } }],
      [XRadio, { props: { modelValue: 'a', value: 'a' }, slots: { default: '单选' } }],
      [XSwitch, { props: { modelValue: true } }],
      [XForm, { slots: { default: '表单' } }],
      [XInputNumber, { props: { modelValue: 1 } }],
      [XAutocomplete, { props: { modelValue: '杭', options: [] } }],
      [XCascader, { props: { modelValue: [], options: [] } }],
      [XDatePicker, { props: { modelValue: '2026-05-12' } }],
      [XDateTimePicker, { props: { modelValue: '2026-05-12T09:30' } }],
      [XTimePicker, { props: { modelValue: '09:30' } }],
      [XTimeSelect, { props: { modelValue: '09:30' } }],
      [XColorPicker, { props: { modelValue: '#1264f4' } }],
      [XColorPickerPanel, { props: { modelValue: '#1264f4' } }],
      [XSlider, { props: { modelValue: 20 } }],
      [XText, { slots: { default: '文本' } }],
      [XScrollbar, { slots: { default: '滚动' } }],
      [XAvatar, { props: { name: 'UX' } }]
    ] as const

    cases.forEach(([component, options]) => {
      const wrapper = mount(component, {
        ...options,
        props: {
          ...('props' in options ? options.props : {}),
          ...appearanceProps
        }
      })

      const style = wrapper.attributes('style')
      expect(style).toContain('--x-element-border-width: 3px')
      expect(style).toContain('--x-element-border-color: #155e75')
      expect(style).toContain('--x-element-bg: #ecfeff')
      expect(style).toContain('--x-element-text: #164e63')
    })
  })

  it('emits focus events and can hide active border for bordered element controls', async () => {
    const cases = [
      [XInput, { props: { modelValue: '输入' }, target: 'input' }],
      [XSelect, { props: { modelValue: 'vue', options: [{ label: 'Vue', value: 'vue' }] }, target: 'button' }],
      [XAutocomplete, { props: { modelValue: '杭', options: [] }, target: 'input' }],
      [XCascader, { props: { modelValue: [], options: [] }, target: 'button' }],
      [XInputNumber, { props: { modelValue: 1 }, target: 'input' }],
      [XDatePicker, { props: { modelValue: '2026-05-12' }, target: 'input' }],
      [XDateTimePicker, { props: { modelValue: '2026-05-12T09:30' }, target: 'input' }],
      [XTimePicker, { props: { modelValue: '09:30' }, target: 'input' }],
      [XTimeSelect, { props: { modelValue: '09:30' }, target: 'select' }],
      [XColorPicker, { props: { modelValue: '#1264f4' }, target: 'input[type="color"]' }]
    ] as const

    for (const [component, options] of cases) {
      const wrapper = mount(component as any, {
        props: {
          ...(options.props as Record<string, unknown>),
          showActiveBorder: false
        } as Record<string, unknown>,
        attachTo: document.body
      })

      expect(wrapper.classes()).toContain('is-active-border-hidden')
      await wrapper.find(options.target).trigger('focus')
      expect(wrapper.emitted('focus')).toHaveLength(1)
      wrapper.unmount()
    }
  })

  it('steps input number value', async () => {
    const wrapper = mount(XInputNumber, {
      props: { modelValue: 1, step: 2 }
    })

    await wrapper.find('button[aria-label="增加"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3])
  })

  it('exposes input number appearance variables', () => {
    const wrapper = mount(XInputNumber, {
      props: {
        modelValue: 1,
        fullWidth: true,
        fullHeight: true,
        borderRadius: 10,
        fontFamily: 'Georgia',
        fontSize: 18,
        decreaseButtonBackgroundColor: '#e2e8f0',
        increaseButtonBackgroundColor: '#0f766e'
      }
    })

    expect(wrapper.classes()).toContain('is-full-width')
    expect(wrapper.classes()).toContain('is-full-height')
    const style = wrapper.attributes('style')
    expect(style).toContain('--x-input-number-radius: 10px')
    expect(style).toContain('--x-input-number-font-family: Georgia')
    expect(style).toContain('--x-input-number-font-size: 18px')
    expect(style).toContain('--x-input-number-decrease-bg: #e2e8f0')
    expect(style).toContain('--x-input-number-increase-bg: #0f766e')
  })

  it('selects autocomplete option', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '杭',
        options: [{ label: '杭州', value: 'hangzhou' }]
      }
    })

    await wrapper.find('.x-autocomplete__option').trigger('click')
    expect(wrapper.emitted('select')?.[0]?.[0]).toMatchObject({ value: 'hangzhou' })
  })

  it('opens autocomplete dropdown without changing option behavior', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '杭',
        options: [{ label: '杭州', value: 'hangzhou' }]
      },
      attachTo: document.body
    })

    await wrapper.find('input').trigger('focus')
    expect(wrapper.classes()).toContain('is-open')
    expect(wrapper.find('.x-autocomplete__dropdown').isVisible()).toBe(true)
    wrapper.unmount()
  })

  it('selects cascader leaf path', async () => {
    const wrapper = mount(XCascader, {
      props: {
        modelValue: [],
        options: [
          {
            label: '浙江',
            value: 'zhejiang',
            children: [{ label: '杭州', value: 'hangzhou' }]
          }
        ]
      }
    })

    await wrapper.find('.x-cascader__control').trigger('click')
    await wrapper.findAll('.x-cascader__option')[0].trigger('click')
    await wrapper.findAll('.x-cascader__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['zhejiang', 'hangzhou']])
  })

  it('updates color from panel swatch', async () => {
    const wrapper = mount(XColorPickerPanel, {
      props: { modelValue: '#1264f4', colors: ['#1264f4', '#10b981'] }
    })

    await wrapper.findAll('.x-color-panel__swatch')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['#10b981'])
  })

  it('keeps disabled color picker from emitting panel updates', async () => {
    const wrapper = mount(XColorPicker, {
      props: { modelValue: '#1264f4', disabled: true }
    })

    await wrapper.findAll('.x-color-panel__swatch')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('selects a date from panel', async () => {
    const wrapper = mount(XDatePickerPanel, {
      props: { year: 2026, month: 5 }
    })

    await wrapper.findAll('.x-date-panel__day')[11].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2026-05-12'])
  })

  it('shows cascader empty state', async () => {
    const wrapper = mount(XCascader, {
      props: { modelValue: [], options: [] }
    })

    await wrapper.find('.x-cascader__control').trigger('click')
    expect(wrapper.find('.x-cascader__empty').text()).toBe('暂无数据')
  })

  it('opens cascader panel without changing empty state behavior', async () => {
    const wrapper = mount(XCascader, {
      props: { modelValue: [], options: [] },
      attachTo: document.body
    })

    await wrapper.find('.x-cascader__control').trigger('click')
    expect(wrapper.classes()).toContain('is-open')
    expect(wrapper.find('.x-cascader__panel').isVisible()).toBe(true)
    wrapper.unmount()
  })

  it('updates slider value', async () => {
    const wrapper = mount(XSlider, {
      props: { modelValue: 10 }
    })

    await wrapper.find('input').setValue(20)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([20])
  })

  it('renders time select options', () => {
    const wrapper = mount(XTimeSelect, {
      props: { start: '09:00', end: '10:00', stepMinutes: 30 }
    })

    expect(wrapper.findAll('option')).toHaveLength(4)
  })
})
