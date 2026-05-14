import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it, vi } from 'vitest'
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

  it('exposes text appearance props', () => {
    const wrapper = mount(XText, {
      props: {
        modelValue: '外层 div 承载边框',
        borderWidth: '3px',
        borderColor: '#ff0000',
        radius: '8px',
        backgroundColor: '#f0fdf4',
        textColor: '#000000',
        fontFamily: 'Arial, sans-serif',
        fontSize: 12,
        height: 40,
        padding: '5px 10px',
        textAlign: 'left',
        name: 'businessName',
        id: 'x-text-story',
        maxlength: 4
      }
    })

    expect(wrapper.text()).toContain('外层 d')
    expect(wrapper.attributes('id')).toBe('x-text-story')
    expect(wrapper.attributes('name')).toBe('businessName')
    const style = wrapper.attributes('style')
    expect(style).toContain('--x-text-border-width: 3px')
    expect(style).toContain('--x-text-border-color: #ff0000')
    expect(style).toContain('--x-text-radius: 8px')
    expect(style).toContain('--x-text-bg: #f0fdf4')
    expect(style).toContain('--x-text-color: #000000')
    expect(style).toContain('--x-text-font-family: Arial, sans-serif')
    expect(style).toContain('--x-text-font-size: 12px')
    expect(style).toContain('--x-text-height: 40px')
    expect(style).toContain('--x-text-padding: 5px 10px')
    expect(style).toContain('--x-text-align: left')
  })

  it('formats text value with custom formatter', () => {
    const wrapper = mount(XText, {
      props: {
        modelValue: 12.5,
        formatter: (value) => `[${value}]`
      }
    })

    expect(wrapper.text()).toBe('[12.5]')
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
      [XAutocomplete, { props: { modelValue: '杭' } }],
      [XCascader, { props: { modelValue: [], options: [] } }],
      [XDatePicker, { props: { modelValue: '2026-05-12' } }],
      [XDateTimePicker, { props: { modelValue: '2026-05-12 09:30' } }],
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
      [XAutocomplete, { props: { modelValue: '杭' }, target: 'input' }],
      [XCascader, { props: { modelValue: [], options: [] }, target: 'button' }],
      [XInputNumber, { props: { modelValue: 1 }, target: 'input' }],
      [XDatePicker, { props: { modelValue: '2026-05-12' }, target: 'input' }],
      [XDateTimePicker, { props: { modelValue: '2026-05-12 09:30' }, target: 'input' }],
      [XTimePicker, { props: { modelValue: '09:30' }, target: 'input' }],
      [XTimeSelect, { props: { modelValue: '09:30' }, target: 'input' }],
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

  it('keeps decimal input number steps readable', async () => {
    const wrapper = mount(XInputNumber, {
      props: { modelValue: 0.5, step: 0.1 }
    })

    await wrapper.find('button[aria-label="增加"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0.6])
  })

  it('exposes input number range and step props', async () => {
    const wrapper = mount(XInputNumber, {
      props: { modelValue: 9, min: 0, max: 10, step: 2 }
    })
    const input = wrapper.find('input')

    expect(input.attributes('min')).toBe('0')
    expect(input.attributes('max')).toBe('10')
    expect(input.attributes('step')).toBe('2')

    await wrapper.find('button[aria-label="增加"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([10])
  })

  it('exposes input number appearance variables', () => {
    const wrapper = mount(XInputNumber, {
      props: {
        modelValue: 1,
        fullWidth: true,
        fullHeight: true,
        color: '#2563eb',
        activeBorderColor: '#1d4ed8',
        borderWidth: 2,
        borderColor: '#94a3b8',
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
    expect(style).toContain('--x-input-number-color: #2563eb')
    expect(style).toContain('--x-input-number-active-border-color: #1d4ed8')
    expect(style).toContain('--x-input-number-border-color: #94a3b8')
    expect(style).toContain('--x-input-number-border-width: 2px')
    expect(style).toContain('--x-input-number-radius: 10px')
    expect(style).toContain('--x-input-number-font-family: Georgia')
    expect(style).toContain('--x-input-number-font-size: 18px')
    expect(style).toContain('--x-input-number-decrease-bg: #e2e8f0')
    expect(style).toContain('--x-input-number-increase-bg: #0f766e')
  })

  it('delegates autocomplete input behavior to XInput', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '上',
        prefix: '城市',
        suffix: 'CN'
      }
    })

    expect(wrapper.find('.x-base-input').exists()).toBe(true)
    expect(wrapper.text()).toContain('城市')
    expect(wrapper.text()).toContain('CN')

    await wrapper.find('input').trigger('focus')
    expect(wrapper.classes()).toContain('is-open')
    expect(wrapper.find('.x-autocomplete__option').text()).toBe('上海')

    await wrapper.find('input').setValue('上海')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['上海'])
    expect(wrapper.emitted('input')?.[0]).toEqual(['上海'])
  })

  it('keeps autocomplete type fixed while preserving input clearable and readonly interfaces', () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '上海',
        type: 'search',
        readonly: true,
        clearable: true
      } as any
    })

    const input = wrapper.find('input')
    expect(input.attributes('type')).toBe('text')
    expect(input.attributes('readonly')).toBeDefined()
    expect(wrapper.find('.x-base-input__clear').exists()).toBe(false)
  })

  it('exposes select input-like appearance and readonly interfaces', async () => {
    const wrapper = mount(XSelect, {
      props: {
        modelValue: 'vue',
        options: [
          { label: 'Vue', value: 'vue' },
          { label: 'TypeScript', value: 'ts' }
        ],
        prefix: '技术',
        suffix: '必选',
        readonly: true,
        clearable: true,
        hideClearButton: true,
        size: 'sm',
        status: 'success',
        name: 'tech',
        id: 'select-tech',
        activeBorderColor: '#1d4ed8',
        clearIconColor: '#64748b',
        clearIconSize: 15
      }
    })

    expect(wrapper.classes()).toContain('x-select--sm')
    expect(wrapper.classes()).toContain('x-select--success')
    expect(wrapper.classes()).toContain('is-readonly')
    expect(wrapper.find('.x-select__control').attributes('name')).toBe('tech')
    expect(wrapper.find('.x-select__control').attributes('id')).toBe('select-tech')
    expect(wrapper.text()).toContain('技术')
    expect(wrapper.text()).toContain('必选')
    expect(wrapper.find('.x-select__clear').exists()).toBe(false)
    expect(wrapper.attributes('style')).toContain('--x-select-height: 22px')
    expect(wrapper.attributes('style')).toContain('--x-select-font-size: 10px')
    expect(wrapper.attributes('style')).toContain('--x-select-active-border-color: #1d4ed8')
    expect(wrapper.attributes('style')).toContain('--x-select-clear-icon-color: #64748b')
    expect(wrapper.attributes('style')).toContain('--x-select-clear-icon-size: 15px')

    await wrapper.find('.x-select__control').trigger('click')
    expect(wrapper.classes()).not.toContain('is-open')
  })

  it('shows autocomplete clear button when clearable and editable', () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '上海',
        clearable: true
      }
    })

    expect(wrapper.find('.x-base-input__clear').exists()).toBe(true)
  })

  it('exposes readonly autocomplete option lists', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '深',
        options: [
          { label: '深圳', value: 'shenzhen' },
          { label: '上海', value: 'shanghai' }
        ]
      }
    })

    const vm = wrapper.vm as unknown as {
      getOptions: () => Array<{ label: string; value: string }>
      getVisibleOptions: () => Array<{ label: string; value: string }>
    }
    const options = vm.getOptions()
    options[0].label = '已修改'

    expect(vm.getOptions()[0].label).toBe('深圳')
    expect(vm.getVisibleOptions()).toEqual([{ label: '深圳', value: 'shenzhen' }])
  })

  it('queries autocomplete remote options from server-side input method', async () => {
    const remoteMethod = vi.fn(() => [{ label: '深圳服务端', value: 'remote-shenzhen' }])
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '',
        remote: true,
        remoteDebounce: 0,
        remoteMethod
      }
    })

    await wrapper.find('input').setValue('深')
    await new Promise((resolve) => window.setTimeout(resolve, 0))
    await nextTick()

    expect(remoteMethod).toHaveBeenCalledWith('深')
    expect(wrapper.emitted('query')?.[0]).toEqual(['深'])
    expect(wrapper.find('.x-autocomplete__option').text()).toBe('深圳服务端')
  })

  it('maps autocomplete key-value fields from remote options', async () => {
    const remoteMethod = vi.fn(() => [{ name: '广州服务端', id: 20 }])
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '',
        remote: true,
        remoteDebounce: 0,
        fieldNames: { label: 'name', value: 'id' },
        remoteMethod
      }
    })

    await wrapper.find('input').setValue('广')
    await new Promise((resolve) => window.setTimeout(resolve, 0))
    await nextTick()

    expect(wrapper.find('.x-autocomplete__option').text()).toBe('广州服务端')
    await wrapper.find('.x-autocomplete__option').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([20])
  })

  it('loads select options from server-side dropdown request and maps key-value fields', async () => {
    const remoteMethod = vi.fn(() => [{ name: '远程完成', id: 'done' }])
    const wrapper = mount(XSelect, {
      props: {
        modelValue: '',
        remote: true,
        fieldNames: { label: 'name', value: 'id' },
        remoteMethod
      }
    })

    await wrapper.find('.x-select__control').trigger('click')
    await nextTick()

    expect(remoteMethod).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted('query')).toHaveLength(1)
    expect(wrapper.find('.x-option').text()).toContain('远程完成')

    await wrapper.find('.x-option').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['done'])
  })

  it('uses autocomplete size before explicit height and font size', () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '上海',
        size: 'sm',
        height: 99,
        fontSize: 30
      }
    })

    const style = wrapper.find('.x-base-input').attributes('style')
    expect(style).toContain('--x-base-input-font-size: 12px')
    expect(style).toContain('--x-base-input-height: 28px')
    expect(wrapper.attributes('style')).toContain('--x-autocomplete-option-font-size: 12px')
    expect(wrapper.attributes('style')).toContain('--x-autocomplete-option-padding: 0 8px')
  })

  it('exposes autocomplete focus and blur events from XInput', async () => {
    const wrapper = mount(XAutocomplete, {
      props: {
        modelValue: '杭',
        showActiveBorder: false
      },
      attachTo: document.body
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')
    expect(wrapper.classes()).toContain('is-active-border-hidden')
    expect(wrapper.emitted('focus')).toHaveLength(1)
    expect(wrapper.emitted('blur')).toHaveLength(1)
    wrapper.unmount()
  })

  it('uses centered text alignment by default for autocomplete and date time inputs', () => {
    const cases: Array<[any, Record<string, string>]> = [
      [XAutocomplete, { modelValue: '上海' }],
      [XTimePicker, { modelValue: '09:30' }],
      [XTimeSelect, { modelValue: '09:30' }],
      [XDatePicker, { modelValue: '2026-05-12' }],
      [XDateTimePicker, { modelValue: '2026-05-12 09:30' }]
    ]

    cases.forEach(([component, props]) => {
      const wrapper = mount(component, { props })
      expect(wrapper.find('.x-base-input').attributes('style')).toContain('--x-base-input-text-align: center')
    })
  })

  it('delegates date picker input behavior to XInput with suffix slot icon', async () => {
    const wrapper = mount(XDatePicker, {
      props: {
        modelValue: '2026-05-12',
        prefix: '日期',
        clearable: true,
        size: 'lg',
        status: 'success',
        name: 'deliveryDate',
        id: 'delivery-date'
      }
    })

    expect(wrapper.find('.x-base-input').exists()).toBe(true)
    expect(wrapper.find('.x-base-input').classes()).toContain('x-base-input--lg')
    expect(wrapper.find('.x-base-input').classes()).toContain('x-base-input--success')
    expect(wrapper.find('input').attributes('type')).toBe('text')
    expect(wrapper.find('input').attributes('name')).toBe('deliveryDate')
    expect(wrapper.find('input').attributes('id')).toBe('delivery-date')
    expect(wrapper.text()).toContain('日期')
    expect(wrapper.find('.x-base-input__prefix .ri-calendar-line').exists()).toBe(true)
    expect(wrapper.find('.x-base-input__clear').exists()).toBe(true)

    await wrapper.find('input').setValue('2026-05-13')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2026-05-13'])
    expect(wrapper.emitted('input')?.[0]).toEqual(['2026-05-13'])
  })

  it('opens date picker dialog and selects date from custom panel', async () => {
    const wrapper = mount(XDatePicker, {
      props: {
        modelValue: '2026-05-12'
      },
      attachTo: document.body
    })

    await wrapper.find('input').trigger('click')
    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('.x-date-picker__dialog')).not.toBeNull()
    expect(document.body.querySelector('.x-date-picker__current')?.textContent).toContain('2026 年 5 月')
    expect(document.body.querySelector('.x-date-picker__dialog')?.textContent).toContain('立夏')
    expect(document.body.querySelector('.x-date-picker__dialog')?.textContent).toContain('小满')

    const days = document.body.querySelectorAll<HTMLButtonElement>('.x-date-picker__dialog .x-date-panel__day')
    days[12].click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2026-05-13'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['2026-05-13'])
    expect(document.body.querySelector('.x-date-picker__dialog')).toBeNull()
    wrapper.unmount()
  })

  it('switches date picker dialog year and month from toolbar', async () => {
    const wrapper = mount(XDatePicker, {
      props: {
        modelValue: '2026-05-12'
      },
      attachTo: document.body
    })

    await wrapper.find('input').trigger('click')
    await wrapper.vm.$nextTick()

    ;(document.body.querySelector('[aria-label="上一年"]') as HTMLButtonElement).click()
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('.x-date-picker__current')?.textContent).toContain('2025 年 5 月')

    ;(document.body.querySelector('[aria-label="下一年"]') as HTMLButtonElement).click()
    ;(document.body.querySelector('[aria-label="下个月"]') as HTMLButtonElement).click()
    await wrapper.vm.$nextTick()
    expect(document.body.querySelector('.x-date-picker__current')?.textContent).toContain('2026 年 6 月')

    wrapper.unmount()
  })

  it('allows date picker suffix slot to replace the default icon', () => {
    const wrapper = mount(XDatePicker, {
      props: { modelValue: '2026-05-12' },
      slots: { suffix: '<span class="custom-date-suffix">交付</span>' }
    })

    expect(wrapper.find('.custom-date-suffix').text()).toBe('交付')
    expect(wrapper.find('.x-base-input__prefix .ri-calendar-line').exists()).toBe(true)
  })

  it('delegates date time picker input behavior to XInput', async () => {
    const wrapper = mount(XDateTimePicker, {
      props: {
        modelValue: '2026-05-12T09:30',
        prefix: '时间',
        clearable: true,
        size: 'lg',
        status: 'success',
        name: 'meetingTime',
        id: 'meeting-time'
      }
    })

    expect(wrapper.find('.x-base-input').exists()).toBe(true)
    expect(wrapper.find('.x-base-input').classes()).toContain('x-base-input--lg')
    expect(wrapper.find('.x-base-input').classes()).toContain('x-base-input--success')
    expect(wrapper.find('input').attributes('type')).toBe('text')
    expect(wrapper.find('input').attributes('name')).toBe('meetingTime')
    expect(wrapper.find('input').attributes('id')).toBe('meeting-time')
    expect(wrapper.find('input').element.value).toBe('2026-05-12 09:30')
    expect(wrapper.text()).toContain('时间')
    expect(wrapper.find('.x-base-input__prefix .ri-calendar-schedule-line').exists()).toBe(true)
    expect(wrapper.find('.x-base-input__clear').exists()).toBe(true)

    await wrapper.find('input').setValue('2026-05-13T10:40')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2026-05-13 10:40'])
    expect(wrapper.emitted('input')?.[0]).toEqual(['2026-05-13 10:40'])
  })

  it('opens date time picker dialog and confirms custom date time', async () => {
    const wrapper = mount(XDateTimePicker, {
      props: {
        modelValue: '2026-06-19 09:30'
      },
      attachTo: document.body
    })

    await wrapper.find('input').trigger('click')
    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('.x-date-time-picker__dialog')).not.toBeNull()
    expect(document.body.querySelector('.x-date-time-picker__current')?.textContent).toContain('2026 年 6 月')
    expect(document.body.querySelector('.x-date-time-picker__dialog')?.textContent).toContain('端午节')
    expect(document.body.querySelector('.x-date-time-picker__dialog')?.textContent).toContain('夏至')

    const days = document.body.querySelectorAll<HTMLButtonElement>('.x-date-time-picker__dialog .x-date-panel__day')
    days[20].click()
    const timeColumns = document.body.querySelectorAll('.x-date-time-picker__time-column')
    ;(Array.from(timeColumns[0].querySelectorAll<HTMLButtonElement>('.x-date-time-picker__time-option')).find((button) => button.textContent === '14') as HTMLButtonElement).click()
    ;(Array.from(timeColumns[1].querySelectorAll<HTMLButtonElement>('.x-date-time-picker__time-option')).find((button) => button.textContent === '45') as HTMLButtonElement).click()
    ;(document.body.querySelector('.x-date-time-picker__primary') as HTMLButtonElement).click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2026-06-21 14:45'])
    expect(wrapper.emitted('change')?.[0]).toEqual(['2026-06-21 14:45'])
    expect(document.body.querySelector('.x-date-time-picker__dialog')).toBeNull()
    wrapper.unmount()
  })

  it('keeps date time picker scroll selection aligned at time column edges', async () => {
    const wrapper = mount(XDateTimePicker, {
      props: {
        modelValue: '2026-05-12 09:30'
      },
      attachTo: document.body
    })

    await wrapper.find('input').trigger('click')
    await wrapper.vm.$nextTick()

    const timeLists = document.body.querySelectorAll<HTMLElement>('.x-date-time-picker__time-list')
    const hourList = timeLists[0]
    const minuteList = timeLists[1]

    Object.defineProperty(hourList, 'clientHeight', { configurable: true, value: 264 })
    Object.defineProperty(minuteList, 'clientHeight', { configurable: true, value: 264 })
    Object.defineProperty(hourList, 'scrollHeight', { configurable: true, value: 1276 })
    Object.defineProperty(minuteList, 'scrollHeight', { configurable: true, value: 2860 })

    expect(hourList.clientHeight).toBe(264)
    expect(minuteList.clientHeight).toBe(264)

    hourList.scrollTop = hourList.scrollHeight - hourList.clientHeight
    minuteList.scrollTop = minuteList.scrollHeight - minuteList.clientHeight
    hourList.dispatchEvent(new Event('scroll'))
    minuteList.dispatchEvent(new Event('scroll'))

    await new Promise((resolve) => window.setTimeout(resolve, 150))
    await wrapper.vm.$nextTick()

    expect(hourList.querySelector('.is-active')?.textContent).toBe('23')
    expect(minuteList.querySelector('.is-active')?.textContent).toBe('59')

    ;(document.body.querySelector('.x-date-time-picker__primary') as HTMLButtonElement).click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2026-05-12 23:59'])
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

  it('loads cascader columns from server-side request and maps key-value fields', async () => {
    const remoteMethod = vi.fn((option?: { value: string | number | boolean }) => {
      if (!option) {
        return [{ name: '浙江', id: 'zhejiang' }]
      }
      if (option.value === 'hangzhou') {
        return []
      }

      return [{ name: '杭州', id: 'hangzhou' }]
    })
    const wrapper = mount(XCascader, {
      props: {
        modelValue: [],
        remote: true,
        fieldNames: { label: 'name', value: 'id' },
        remoteMethod
      }
    })

    await wrapper.find('.x-cascader__control').trigger('click')
    await nextTick()
    expect(remoteMethod).toHaveBeenCalledWith(undefined, [])
    expect(wrapper.find('.x-cascader__option').text()).toContain('浙江')

    await wrapper.find('.x-cascader__option').trigger('click')
    await nextTick()
    expect(remoteMethod).toHaveBeenLastCalledWith(
      expect.objectContaining({ label: '浙江', value: 'zhejiang' }),
      [expect.objectContaining({ label: '浙江', value: 'zhejiang' })]
    )

    await wrapper.findAll('.x-cascader__option')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['zhejiang', 'hangzhou']])
  })

  it('exposes cascader input-like appearance and readonly interfaces', async () => {
    const wrapper = mount(XCascader, {
      props: {
        modelValue: ['zhejiang', 'hangzhou'],
        options: [
          {
            label: '浙江',
            value: 'zhejiang',
            children: [{ label: '杭州', value: 'hangzhou' }]
          }
        ],
        prefix: '地区',
        suffix: '必选',
        readonly: true,
        clearable: true,
        hideClearButton: true,
        size: 'sm',
        status: 'success',
        separator: ' > ',
        name: 'area',
        id: 'cascader-area',
        activeBorderColor: '#1d4ed8',
        clearIconColor: '#64748b',
        clearIconSize: 15
      }
    })

    expect(wrapper.classes()).toContain('x-cascader--sm')
    expect(wrapper.classes()).toContain('x-cascader--success')
    expect(wrapper.classes()).toContain('is-readonly')
    expect(wrapper.find('.x-cascader__control').attributes('name')).toBe('area')
    expect(wrapper.find('.x-cascader__control').attributes('id')).toBe('cascader-area')
    expect(wrapper.text()).toContain('地区')
    expect(wrapper.text()).toContain('浙江 > 杭州')
    expect(wrapper.text()).toContain('必选')
    expect(wrapper.find('.x-cascader__clear').exists()).toBe(false)
    expect(wrapper.attributes('style')).toContain('--x-cascader-height: 22px')
    expect(wrapper.attributes('style')).toContain('--x-cascader-font-size: 10px')
    expect(wrapper.attributes('style')).toContain('--x-cascader-active-border-color: #1d4ed8')
    expect(wrapper.attributes('style')).toContain('--x-cascader-clear-icon-color: #64748b')
    expect(wrapper.attributes('style')).toContain('--x-cascader-clear-icon-size: 15px')

    await wrapper.find('.x-cascader__control').trigger('click')
    expect(wrapper.classes()).not.toContain('is-open')
  })

  it('clears cascader value and supports selecting parent nodes', async () => {
    const wrapper = mount(XCascader, {
      props: {
        modelValue: ['zhejiang', 'hangzhou'],
        clearable: true,
        changeOnSelect: true,
        options: [
          {
            label: '浙江',
            value: 'zhejiang',
            children: [{ label: '杭州', value: 'hangzhou' }]
          }
        ]
      }
    })

    await wrapper.find('.x-cascader__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
    expect(wrapper.emitted('clear')).toHaveLength(1)

    await wrapper.find('.x-cascader__control').trigger('click')
    await wrapper.findAll('.x-cascader__option')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[1]).toEqual([['zhejiang']])
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

  it('shows China traditional festivals and solar terms in date panel', () => {
    const wrapper = mount(XDatePickerPanel, {
      props: { year: 2026, month: 6 }
    })

    const days = wrapper.findAll('.x-date-panel__day')

    expect(days.some((day) => day.classes().includes('is-festival') && day.text().includes('端午节'))).toBe(true)
    expect(days.some((day) => day.classes().includes('is-solar-term') && day.text().includes('芒种'))).toBe(true)
    expect(days.some((day) => day.classes().includes('is-solar-term') && day.text().includes('夏至'))).toBe(true)
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

  it('renders time select options in the custom dialog', async () => {
    const wrapper = mount(XTimeSelect, {
      attachTo: document.body,
      props: { start: '09:00', end: '10:00', stepMinutes: 30 }
    })

    await wrapper.find('input').trigger('click')
    await nextTick()

    const options = Array.from(document.body.querySelectorAll<HTMLButtonElement>('.x-time-select__time-option'))
    expect(options.map((option) => option.textContent?.trim())).toEqual(['09:00', '09:30', '10:00'])

    wrapper.unmount()
  })
})
