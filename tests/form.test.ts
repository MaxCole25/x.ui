import { mount } from '@vue/test-utils'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { XForm, XFormItem, XInput, XSelect, XSwitch } from '../src'
import type { FormExpose, FormRules } from '../src'

const styles = readFileSync('src/styles/index.css', 'utf-8').replace(/\r\n/g, '\n')
const getCssRule = (selector: string) => styles.match(new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\{[^}]+\\}`))?.[0] ?? ''

describe('form', () => {
  it('validates, clears and resets fields through exposed methods', async () => {
    const wrapper = mount({
      components: { XForm, XFormItem, XInput },
      data: () => ({
        form: {
          username: '',
          password: ''
        },
        rules: {
          username: [{ required: true, message: '请输入用户名' }],
          password: [{ min: 6, message: '密码至少 6 个字符' }]
        } satisfies FormRules
      }),
      template: `
        <XForm ref="formRef" :model="form" :rules="rules">
          <XFormItem label="用户名" prop="username" required>
            <XInput v-model="form.username" />
          </XFormItem>
          <XFormItem label="密码" prop="password">
            <XInput v-model="form.password" />
          </XFormItem>
        </XForm>
      `
    })

    const formRef = wrapper.vm.$refs.formRef as FormExpose

    expect(await formRef.validate()).toBe(false)
    expect(wrapper.find('.x-form-item__error').text()).toBe('请输入用户名')

    await wrapper.findAll('input')[0].setValue('alice')
    await wrapper.findAll('input')[1].setValue('123')
    expect(await formRef.validateField('password')).toBe(false)
    expect(wrapper.findAll('.x-form-item')[1].find('.x-form-item__error').text()).toBe('密码至少 6 个字符')

    formRef.clearValidate('password')
    await nextTick()
    expect(wrapper.findAll('.x-form-item')[1].find('.x-form-item__error').exists()).toBe(false)

    formRef.resetFields()
    await nextTick()
    expect((wrapper.findAll('input')[0].element as HTMLInputElement).value).toBe('')
    expect((wrapper.findAll('input')[1].element as HTMLInputElement).value).toBe('')
  })

  it('passes size, disabled and label settings through provide and inject', () => {
    const wrapper = mount({
      components: { XForm, XFormItem, XInput, XSelect },
      template: `
        <XForm size="sm" disabled label-width="120px" label-position="right">
          <XFormItem label="用户名">
            <XInput />
          </XFormItem>
          <XFormItem label="状态">
            <XSelect :options="[{ label: '启用', value: 'on' }]" />
          </XFormItem>
        </XForm>
      `
    })

    expect(wrapper.find('.x-form').classes()).toContain('x-form--sm')
    expect(wrapper.find('.x-base-input').classes()).toContain('x-base-input--sm')
    expect(wrapper.find('.x-select').classes()).toContain('x-select--sm')
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.x-select__control').attributes('disabled')).toBeDefined()
    expect(wrapper.find('.x-form-item__label').attributes('style')).toContain('width: 120px')
    expect(getCssRule('.x-form-item__label')).toContain('font-size: var(--x-form-item-label-font-size, 12px)')
    expect(getCssRule('.x-form-item__label')).toContain('display: inline-flex')
    expect(getCssRule('.x-form-item__label')).toContain('min-height: var(--x-form-control-height, 30px)')
    expect(getCssRule('.x-form--label-top .x-form-item__label,\n.x-form-item--label-top .x-form-item__label')).toContain('min-height: 0')
    expect(getCssRule('.x-form--sm,\n.x-form-item--sm')).toContain('--x-form-item-label-font-size: 10px')
  })

  it('uses XForm accentColor variable', () => {
    const wrapper = mount(XForm, {
      props: {
        accentColor: '#0f766e'
      },
      slots: {
        default: '表单内容'
      }
    })

    expect(wrapper.attributes('style')).toContain('--x-form-color: #0f766e')
  })

  it('maps XForm height prop to the public CSS variable with auto default', () => {
    const defaultWrapper = mount(XForm, {
      slots: {
        default: '表单内容'
      }
    })
    const fixedWrapper = mount(XForm, {
      props: {
        height: 320
      },
      slots: {
        default: '固定高度表单'
      }
    })

    expect(defaultWrapper.attributes('style')).toContain('--x-form-height: auto')
    expect(fixedWrapper.attributes('style')).toContain('--x-form-height: 320px')
    expect(getCssRule('.x-form')).toContain('height: var(--x-form-height, auto)')
  })

  it('renders custom label, help and error slots', () => {
    const wrapper = mount({
      components: { XForm, XFormItem, XInput },
      template: `
        <XForm>
          <XFormItem prop="name" error="字段错误">
            <template #label>用户名称</template>
            <XInput />
            <template #error>自定义错误</template>
          </XFormItem>
          <XFormItem label="备注">
            <XInput />
            <template #help>自定义帮助</template>
          </XFormItem>
        </XForm>
      `
    })

    expect(wrapper.find('.x-form-item__label').text()).toBe('用户名称')
    expect(wrapper.find('.x-form-item__error').text()).toBe('自定义错误')
    expect(wrapper.find('.x-form-item__help').text()).toBe('自定义帮助')
  })

  it('supports centered compact inline controls without flattening messages', () => {
    const wrapper = mount({
      components: { XFormItem, XSwitch },
      template: `
        <XFormItem label="含图纸" label-position="left" label-width="58px" size="sm" align="center" help="状态说明">
          <XSwitch size="md" label-position="inside" active-text="是" inactive-text="否" />
        </XFormItem>
      `
    })

    const item = wrapper.find('.x-form-item')

    expect(item.classes()).toContain('x-form-item--align-center')
    expect(wrapper.find('.x-form-item__field .x-switch').exists()).toBe(true)
    expect(wrapper.find('.x-form-item__help').text()).toBe('状态说明')
  })

  it('keeps align center as vertical alignment without shrinking the field width model', () => {
    const wrapper = mount({
      components: { XFormItem, XInput },
      template: `
        <XFormItem label="客户ID" label-position="left" label-width="86px" size="sm" align="center" help="辅助说明">
          <XInput style="width: 100%" />
        </XFormItem>
      `
    })

    const contentRule = getCssRule('.x-form-item--align-center .x-form-item__content')
    const fieldRule = getCssRule('.x-form-item--align-center .x-form-item__field')
    const messageRule = getCssRule('.x-form-item__error,\n.x-form-item__help')

    expect(wrapper.find('.x-form-item--align-center .x-form-item__field .x-base-input').exists()).toBe(true)
    expect(wrapper.find('.x-form-item__help').text()).toBe('辅助说明')
    expect(contentRule).toContain('display: flex')
    expect(contentRule).toContain('flex: 1 1 auto')
    expect(contentRule).not.toContain('display: inline-flex')
    expect(fieldRule).toContain('display: flex')
    expect(fieldRule).toContain('flex: 1 1 auto')
    expect(fieldRule).toContain('justify-content: var(--x-form-item-field-justify, flex-start)')
    expect(fieldRule).toContain('width: 100%')
    expect(fieldRule).not.toContain('display: inline-flex')
    expect(messageRule).toContain('flex: 0 0 100%')
  })

  it('maps align center content justify to the full-width field flex alignment', () => {
    const defaultWrapper = mount({
      components: { XFormItem, XSwitch },
      template: `
        <XFormItem label="启用状态" label-position="left" label-width="86px" align="center">
          <XSwitch />
        </XFormItem>
      `
    })
    const endWrapper = mount({
      components: { XFormItem, XSwitch },
      template: `
        <XFormItem label="含税" label-position="left" label-width="86px" align="center" content-justify="end">
          <XSwitch />
        </XFormItem>
      `
    })
    const centerWrapper = mount({
      components: { XFormItem, XSwitch },
      template: `
        <XFormItem label="居中开关" label-position="left" label-width="86px" align="center" content-justify="center">
          <XSwitch />
        </XFormItem>
      `
    })

    expect(defaultWrapper.find('.x-form-item__content').attributes('style') ?? '').not.toContain('--x-form-item-field-justify')
    expect(endWrapper.find('.x-form-item__content').attributes('style')).toContain('--x-form-item-content-justify: end')
    expect(endWrapper.find('.x-form-item__content').attributes('style')).toContain('--x-form-item-field-justify: flex-end')
    expect(centerWrapper.find('.x-form-item__content').attributes('style')).toContain('--x-form-item-content-justify: center')
    expect(centerWrapper.find('.x-form-item__content').attributes('style')).toContain('--x-form-item-field-justify: center')
  })

  it('exposes label and content layout props without deep selectors', () => {
    const wrapper = mount({
      components: { XFormItem, XSwitch },
      template: `
        <XFormItem
          label="含税"
          label-align="center"
          content-align="right"
          content-justify="end"
          label-class="custom-label"
          :label-style="{ color: 'rgb(18, 100, 244)' }"
          :content-class="['custom-content', { 'is-tight': true }]"
          :content-style="{ minWidth: '120px' }"
        >
          <XSwitch />
        </XFormItem>
      `
    })

    const label = wrapper.find('.x-form-item__label')
    const content = wrapper.find('.x-form-item__content')

    expect(label.classes()).toContain('custom-label')
    expect(label.attributes('style')).toContain('--x-form-item-label-align: center')
    expect(label.attributes('style')).toContain('--x-form-item-label-justify: center')
    expect(label.attributes('style')).toContain('color: rgb(18, 100, 244)')
    expect(content.classes()).toContain('custom-content')
    expect(content.classes()).toContain('is-tight')
    expect(content.attributes('style')).toContain('--x-form-item-content-align: right')
    expect(content.attributes('style')).toContain('--x-form-item-content-justify: end')
    expect(content.attributes('style')).toContain('--x-form-item-field-justify: flex-end')
    expect(content.attributes('style')).toContain('min-width: 120px')
  })

  it('keeps content fill height class opt-in and preserves form item structure', () => {
    const defaultWrapper = mount({
      components: { XFormItem },
      template: `
        <XFormItem label="备注">
          <div class="fill-child" style="height: 100%">默认内容</div>
        </XFormItem>
      `
    })
    const fillWrapper = mount({
      components: { XFormItem },
      template: `
        <XFormItem label="备注" label-position="top" content-full-height>
          <div class="fill-child" style="height: 100%">填满内容</div>
        </XFormItem>
      `
    })

    const fillItem = fillWrapper.find('.x-form-item')
    const contentFillRule = getCssRule('.x-form-item--content-fill-height')
    const topRule = getCssRule('.x-form-item--content-fill-height.x-form-item--label-top')
    const contentRule = getCssRule('.x-form-item--content-fill-height .x-form-item__content')
    const topContentRule = getCssRule('.x-form-item--content-fill-height.x-form-item--label-top .x-form-item__content')
    const fieldRule = getCssRule('.x-form-item--content-fill-height .x-form-item__field')
    const topFieldRule = getCssRule('.x-form-item--content-fill-height.x-form-item--label-top .x-form-item__field')

    expect(defaultWrapper.find('.x-form-item').classes()).not.toContain('x-form-item--content-fill-height')
    expect(fillItem.classes()).toContain('x-form-item--content-fill-height')
    expect(fillItem.classes()).toContain('x-form-item--label-top')
    expect(fillWrapper.find('.x-form-item__label').text()).toBe('备注')
    expect(fillWrapper.find('.x-form-item__content > .x-form-item__field > .fill-child').exists()).toBe(true)
    expect(contentFillRule).toContain('height: 100%')
    expect(contentFillRule).toContain('min-height: 0')
    expect(topRule).toContain('grid-template-rows: auto minmax(0, 1fr)')
    expect(contentRule).toContain('height: 100%')
    expect(contentRule).toContain('overflow: hidden')
    expect(topContentRule).toContain('grid-template-rows: minmax(0, 1fr)')
    expect(fieldRule).toContain('height: 100%')
    expect(fieldRule).toContain('overflow: hidden')
    expect(topFieldRule).toContain('grid-template-rows: minmax(0, 1fr)')

    const disabledWrapper = mount(XFormItem, {
      props: {
        contentFullHeight: false
      }
    })
    expect(disabledWrapper.classes()).not.toContain('x-form-item--content-fill-height')
  })

  it('maps form item theme props to public CSS variables', () => {
    const wrapper = mount({
      components: { XFormItem, XInput },
      template: `
        <XFormItem
          label="审批意见"
          required
          help="请填写审批说明"
          label-text-color="#dbeafe"
          content-text-color="#f8fafc"
          background-color="#101827"
          border-color="#334155"
          required-mark-color="#fb7185"
          error-text-color="#f87171"
          hint-text-color="#94a3b8"
        >
          <XInput />
        </XFormItem>
      `
    })

    const itemStyle = wrapper.find('.x-form-item').attributes('style')
    const labelRule = getCssRule('.x-form-item__label')
    const contentRule = getCssRule('.x-form-item__content')
    const requiredRule = getCssRule('.x-form-item.is-required .x-form-item__label::before')
    const errorRule = getCssRule('.x-form-item__error')

    expect(itemStyle).toContain('--x-form-item-label-color: #dbeafe')
    expect(itemStyle).toContain('--x-form-item-content-color: #f8fafc')
    expect(itemStyle).toContain('--x-form-item-bg: #101827')
    expect(itemStyle).toContain('--x-form-item-border-color: #334155')
    expect(itemStyle).toContain('--x-form-item-required-color: #fb7185')
    expect(itemStyle).toContain('--x-form-item-error-color: #f87171')
    expect(itemStyle).toContain('--x-form-item-hint-color: #94a3b8')
    expect(labelRule).toContain('color: var(--x-form-item-label-color, #606266)')
    expect(contentRule).toContain('color: var(--x-form-item-content-color, var(--x-form-text-color, #303133))')
    expect(requiredRule).toContain('color: var(--x-form-item-required-color, var(--x-form-error-color))')
    expect(errorRule).toContain('color: var(--x-form-item-error-color, var(--x-form-error-color))')
    expect(styles).toContain('color: var(--x-form-item-hint-color, var(--x-form-help-color))')
  })
})
