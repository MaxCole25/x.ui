import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { nextTick } from 'vue'
import { describe, expect, it } from 'vitest'
import { overlayZIndex, XBaseInput, XCheckbox, XForm, XFormItem, XInput, XInputNumber, XRadio, XRadioButton, XSelect, XSwitch, XText, XTimePicker, XTimeSelect } from '../src'

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

  it('keeps XBaseInput native input outline hidden when focused', async () => {
    const wrapper = mount(XBaseInput, {
      props: {
        modelValue: '统一由外层显示聚焦边框'
      },
      attachTo: document.body
    })

    const input = wrapper.find<HTMLInputElement>('.x-base-input__inner')
    input.element.focus()
    await input.trigger('focus')

    const styles = readFileSync('src/styles/index.css', 'utf-8').replace(/\r\n/g, '\n')
    expect(input.element).toBe(document.activeElement)
    expect(styles).toContain('.x-base-input__inner:focus,\n.x-base-input__inner:focus-visible')
    expect(styles).toContain('outline: none !important')

    wrapper.unmount()
  })

  it('formats XBaseInput display value while emitting parsed raw values', async () => {
    const formatCurrency = (value: string | number) => {
      const n = Number(value ?? 0)
      return Number.isFinite(n)
        ? `￥${n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        : '￥0.00'
    }
    const parseCurrency = (value: string) => {
      const n = Number(String(value ?? '').replace(/[¥￥,\s]/g, ''))
      return Number.isFinite(n) ? n : 0
    }

    const wrapper = mount(XBaseInput, {
      props: {
        modelValue: 9200,
        type: 'number' as const,
        textAlign: 'right' as const,
        clearable: true,
        formatter: formatCurrency,
        parser: parseCurrency,
        'onUpdate:modelValue': (value: string | number) => wrapper.setProps({ modelValue: value })
      }
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('￥9,200.00')
    expect(input.attributes('type')).toBe('text')
    expect(wrapper.find('.x-base-input').attributes('style')).toContain('--x-base-input-text-align: right')

    await input.trigger('focus')
    await input.setValue('￥12,345.60')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([12345.6])
    expect(wrapper.emitted('input')?.[0]).toEqual([12345.6])
    expect(wrapper.props('modelValue')).toBe(12345.6)
    expect(input.element.value).toBe('￥12,345.60')

    await input.trigger('change')
    expect(wrapper.emitted('change')?.[0]).toEqual([12345.6])

    await input.trigger('blur')
    expect(input.element.value).toBe('￥12,345.60')

    await wrapper.find('.x-base-input__clear').trigger('click')
    const modelUpdates = wrapper.emitted('update:modelValue') ?? []
    const inputEvents = wrapper.emitted('input') ?? []
    expect(modelUpdates[modelUpdates.length - 1]).toEqual([''])
    expect(inputEvents[inputEvents.length - 1]).toEqual([''])
    expect(wrapper.emitted('clear')).toHaveLength(1)
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
    await nextTick()
    const options = Array.from(document.body.querySelectorAll<HTMLButtonElement>('.x-select__dropdown .x-option'))
    options[1].click()
    await nextTick()
    expect(wrapper.props('modelValue')).toBe('done')

    await wrapper.find('.x-select__control').trigger('click')
    expect(wrapper.find('.x-base-input').exists()).toBe(true)
    await wrapper.find('.x-base-input__clear').trigger('click')
    expect(wrapper.props('modelValue')).toBeUndefined()

    wrapper.unmount()
  })

  it('teleports XSelect dropdown to body by default', async () => {
    const wrapper = mount(XSelect, {
      props: {
        modelValue: '',
        radius: '10px',
        backgroundColor: '#ffffff',
        dropdownBackgroundColor: '#fef3c7',
        options: [
          { label: '待处理', value: 'todo' },
          { label: '完成', value: 'done' }
        ]
      }
    })

    wrapper.element.getBoundingClientRect = () => ({
      bottom: 70,
      height: 30,
      left: 24,
      right: 224,
      top: 40,
      width: 200,
      x: 24,
      y: 40,
      toJSON: () => ({})
    })

    await wrapper.find('.x-select__control').trigger('click')
    await nextTick()

    const dropdown = document.body.querySelector<HTMLElement>('.x-select__dropdown')
    expect(dropdown).not.toBeNull()
    expect(dropdown?.classList.contains('is-teleported')).toBe(true)
    expect(wrapper.element.contains(dropdown)).toBe(false)
    expect(dropdown?.style.left).toBe('24px')
    expect(dropdown?.style.width).toBe('200px')
    expect(dropdown?.style.maxWidth).toBe('360px')
    expect(dropdown?.style.zIndex).toBe(String(overlayZIndex.popper))
    expect(dropdown?.getAttribute('style')).toContain('--x-select-radius: 10px')
    expect(dropdown?.getAttribute('style')).toContain('--x-select-dropdown-bg: #fef3c7')

    wrapper.unmount()
  })

  it('expands XSelect teleported dropdown only up to the max width for long options', async () => {
    const wrapper = mount(XSelect, {
      props: {
        modelValue: '',
        backgroundColor: '#fee2e2',
        dropdownMaxWidth: 260,
        options: [{ label: '这是一段很长很长的选项文本，用于测试弹层宽度上限', value: 'long' }]
      }
    })

    wrapper.element.getBoundingClientRect = () => ({
      bottom: 70,
      height: 30,
      left: 24,
      right: 144,
      top: 40,
      width: 120,
      x: 24,
      y: 40,
      toJSON: () => ({})
    })

    await wrapper.find('.x-select__control').trigger('click')
    await nextTick()

    const dropdown = document.body.querySelector<HTMLElement>('.x-select__dropdown')
    expect(dropdown).not.toBeNull()
    if (!dropdown) throw new Error('XSelect dropdown should render')
    Object.defineProperty(dropdown, 'scrollWidth', {
      configurable: true,
      value: 420
    })

    window.dispatchEvent(new Event('resize'))
    await nextTick()

    expect(dropdown.style.width).toBe('260px')
    expect(dropdown.style.maxWidth).toBe('260px')
    expect(dropdown.getAttribute('style')).toContain('--x-select-dropdown-bg: #ffffff')

    wrapper.unmount()
  })

  it('keeps XSelect dropdown inside the component when teleport is disabled', async () => {
    const wrapper = mount(XSelect, {
      props: {
        modelValue: '',
        teleported: false,
        options: [{ label: '待处理', value: 'todo' }]
      }
    })

    await wrapper.find('.x-select__control').trigger('click')
    const dropdown = wrapper.find('.x-select__dropdown')
    expect(dropdown.exists()).toBe(true)
    expect(dropdown.classes()).not.toContain('is-teleported')
    expect(wrapper.element.contains(dropdown.element)).toBe(true)

    wrapper.unmount()
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
        color: '#1264f4',
        inactiveColor: '#dcdfe6',
        thumbColor: '#ffffff',
        buttonSize: 20,
        fontSize: 15,
        fontFamily: 'Arial, sans-serif'
      }
    })

    const style = wrapper.find('.x-switch').attributes('style')
    expect(style).toContain('--x-switch-color: #1264f4')
    expect(style).toContain('--x-switch-inactive-color: #dcdfe6')
    expect(style).toContain('--x-switch-thumb-color: #ffffff')
    expect(style).toContain('--x-switch-button-size: 20px')
    expect(style).toContain('--x-switch-font-size: 15px')
    expect(style).toContain('--x-switch-font-family: Arial, sans-serif')
  })

  it('lets explicit size own visual dimensions for text, number input and switch', () => {
    const text = mount(XText, {
      props: {
        modelValue: '尺寸文本',
        size: 'lg',
        fontSize: 30,
        height: 60,
        padding: 20,
        radius: '20px'
      }
    })
    const inputNumber = mount(XInputNumber, {
      props: {
        modelValue: 6,
        size: 'sm',
        fontSize: 24,
        borderRadius: 12
      }
    })
    const switcher = mount(XSwitch, {
      props: {
        size: 'lg',
        buttonSize: 12,
        fontSize: 30,
        radius: '999px'
      }
    })

    const textStyle = text.find('.x-text').attributes('style')
    const inputNumberStyle = inputNumber.find('.x-input-number').attributes('style')
    const switchStyle = switcher.find('.x-switch').attributes('style')

    expect(textStyle).toContain('--x-text-font-size: 14px')
    expect(textStyle).toContain('--x-text-height: 38px')
    expect(textStyle).toContain('--x-text-padding: 0 10px')
    expect(textStyle).toContain('--x-text-radius: 8px')
    expect(inputNumberStyle).toContain('--x-input-number-height: 22px')
    expect(inputNumberStyle).toContain('--x-input-number-font-size: 10px')
    expect(inputNumberStyle).toContain('--x-input-number-radius: 4px')
    expect(switchStyle).toContain('--x-switch-size: 30.4px')
    expect(switchStyle).not.toContain('--x-switch-button-size')
    expect(switchStyle).toContain('--x-switch-font-size: 14px')
    expect(switchStyle).toContain('--x-switch-radius: 999px')
  })

  it('keeps switch size visual dimensions at 80 percent of the standard height', () => {
    const css = readFileSync('src/styles/index.css', 'utf8')

    expect(css).toContain('--x-switch-default-size: 17.6px')
    expect(css).toContain('--x-switch-default-size: 24px')
    expect(css).toContain('--x-switch-default-size: 30.4px')
    expect(css).toContain('--x-switch-color: var(--x-color-primary, #1264f4)')
    expect(css).toContain('width: calc(var(--x-switch-size, var(--x-switch-button-size, var(--x-switch-default-size))) * 2)')
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

  it('updates radio button values and exposes appearance variables', async () => {
    const wrapper = mount(XRadioButton, {
      props: {
        modelValue: 'day',
        value: 'week',
        fontFamily: 'Microsoft YaHei, 微软雅黑, sans-serif',
        fontSize: 13,
        textColor: '#1f2937',
        backgroundColor: '#f8fafc',
        borderColor: '#94a3b8',
        borderWidth: 2,
        buttonColor: '#2563eb',
        variant: 'outline' as const,
        direction: 'vertical' as const,
        width: 120,
        height: 36,
        radius: 8,
        activeBackgroundColor: '#0f766e',
        activeBorderColor: '#115e59',
        activeTextColor: '#ffffff',
        buttonSize: 34,
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
      }
    })

    expect(wrapper.find('.x-radio-button').classes()).not.toContain('is-checked')
    await wrapper.find('.x-radio-button').trigger('click')
    expect(wrapper.props('modelValue')).toBe('week')
    expect(wrapper.find('.x-radio-button').classes()).toContain('is-checked')
    expect(wrapper.find('.x-radio-button').attributes('role')).toBe('radio')
    expect(wrapper.find('.x-radio-button').attributes('aria-checked')).toBe('true')
    expect(wrapper.emitted('change')?.[0]).toEqual(['week'])

    const style = wrapper.find('.x-radio-button').attributes('style')
    expect(style).toContain('--x-radio-button-font-family: Microsoft YaHei, 微软雅黑, sans-serif')
    expect(style).toContain('--x-radio-button-font-size: 13px')
    expect(style).toContain('--x-radio-button-text-color: #1f2937')
    expect(style).toContain('--x-radio-button-bg: #f8fafc')
    expect(style).toContain('--x-radio-button-border-color: #94a3b8')
    expect(style).toContain('--x-radio-button-border-width: 2px')
    expect(style).toContain('--x-radio-button-color: #2563eb')
    expect(style).toContain('--x-radio-button-width: 120px')
    expect(style).toContain('--x-radio-button-height: 36px')
    expect(style).toContain('--x-radio-button-radius: 8px')
    expect(style).toContain('--x-radio-button-active-bg: #0f766e')
    expect(style).toContain('--x-radio-button-active-border-color: #115e59')
    expect(style).toContain('--x-radio-button-active-text: #ffffff')
    expect(wrapper.find('.x-radio-button').classes()).toContain('x-radio-button--outline')
    expect(wrapper.find('.x-radio-button').classes()).toContain('x-radio-button--vertical')
  })

  it('lets radio button labelColor work as textColor fallback', () => {
    const wrapper = mount(XRadioButton, {
      props: {
        modelValue: 'day',
        value: 'week',
        labelColor: '#4c1d95',
        buttonColor: '#7c3aed'
      }
    })

    const style = wrapper.find('.x-radio-button').attributes('style')
    expect(style).toContain('--x-radio-button-text-color: #4c1d95')
    expect(style).toContain('--x-radio-button-color: #7c3aed')
  })

  it('does not emit radio button updates for disabled or already checked options', async () => {
    const disabled = mount(XRadioButton, {
      props: {
        modelValue: 'day',
        value: 'week',
        disabled: true
      }
    })
    const checked = mount(XRadioButton, {
      props: {
        modelValue: 'day',
        value: 'day'
      }
    })

    await disabled.find('.x-radio-button').trigger('click')
    await checked.find('.x-radio-button').trigger('click')

    expect(disabled.emitted('update:modelValue')).toBeUndefined()
    expect(disabled.emitted('change')).toBeUndefined()
    expect(checked.emitted('update:modelValue')).toBeUndefined()
    expect(checked.emitted('change')).toBeUndefined()
  })

  it('lets explicit radio button size own visual dimensions', () => {
    const wrapper = mount(XRadioButton, {
      props: {
        modelValue: 'lg',
        value: 'lg',
        size: 'lg',
        height: 60,
        buttonSize: 52,
        fontSize: 30,
        radius: 20
      }
    })

    const style = wrapper.find('.x-radio-button').attributes('style')
    expect(style).toContain('--x-radio-button-font-size: 14px')
    expect(style).toContain('--x-radio-button-height: 38px')
    expect(style).toContain('--x-radio-button-padding: 0 10px')
    expect(style).toContain('--x-radio-button-radius: 8px')
  })

  it('controls radio button selection inside a segmented v-model group', async () => {
    const wrapper = mount({
      components: { XRadioButton },
      data: () => ({
        city: 'washington'
      }),
      template: `
        <div>
          <XRadioButton v-model="city" name="city" value="new-york">New York</XRadioButton>
          <XRadioButton v-model="city" name="city" value="washington">Washington</XRadioButton>
          <XRadioButton v-model="city" name="city" value="los-angeles">Los Angeles</XRadioButton>
          <XRadioButton v-model="city" name="city" value="chicago">Chicago</XRadioButton>
        </div>
      `
    })

    const buttons = wrapper.findAll('.x-radio-button')
    expect(buttons[1].classes()).toContain('is-checked')
    expect(buttons.filter((button) => button.classes().includes('is-checked'))).toHaveLength(1)

    await wrapper.findAll('.x-radio-button')[2].trigger('click')

    expect(wrapper.vm.city).toBe('los-angeles')
    expect(wrapper.findAll('.x-radio-button')[2].classes()).toContain('is-checked')
    expect(wrapper.findAll('.x-radio-button').filter((button) => button.classes().includes('is-checked'))).toHaveLength(1)
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

  it('confirms XTimePicker value from the custom dialog', async () => {
    const wrapper = mount(XTimePicker, {
      attachTo: document.body,
      props: {
        modelValue: '10:15',
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
      }
    })

    await wrapper.find('input').trigger('click')
    await nextTick()

    const columns = Array.from(document.body.querySelectorAll<HTMLElement>('.x-time-picker__time-column'))
    const hourOptions = Array.from(columns[0].querySelectorAll<HTMLButtonElement>('.x-time-picker__time-option'))
    const minuteOptions = Array.from(columns[1].querySelectorAll<HTMLButtonElement>('.x-time-picker__time-option'))

    hourOptions[8].click()
    minuteOptions[45].click()
    document.body.querySelector<HTMLButtonElement>('.x-time-picker__primary')?.click()
    await nextTick()

    expect(wrapper.props('modelValue')).toBe('08:45')
    const changes = wrapper.emitted('change') ?? []
    expect(changes[changes.length - 1]).toEqual(['08:45'])

    wrapper.unmount()
  })

  it('confirms XTimeSelect value from generated time options', async () => {
    const wrapper = mount(XTimeSelect, {
      attachTo: document.body,
      props: {
        modelValue: '',
        start: '09:00',
        end: '10:00',
        stepMinutes: 15,
        'onUpdate:modelValue': (value) => wrapper.setProps({ modelValue: value })
      }
    })

    await wrapper.find('input').trigger('click')
    await nextTick()

    const options = Array.from(document.body.querySelectorAll<HTMLButtonElement>('.x-time-select__time-option'))
    options.find((option) => option.textContent?.trim() === '09:45')?.click()
    document.body.querySelector<HTMLButtonElement>('.x-time-select__primary')?.click()
    await nextTick()

    expect(wrapper.props('modelValue')).toBe('09:45')
    const changes = wrapper.emitted('change') ?? []
    expect(changes[changes.length - 1]).toEqual(['09:45'])

    wrapper.unmount()
  })
})
