import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { XLogin } from '../src'

describe('XLogin', () => {
  it('renders username and password fields', () => {
    const wrapper = mount(XLogin, {
      props: {
        title: '系统登录',
        description: '请输入账号密码'
      }
    })

    expect(wrapper.text()).toContain('系统登录')
    expect(wrapper.text()).toContain('请输入账号密码')
    expect(wrapper.find('input[autocomplete="username"]').exists()).toBe(true)
    expect(wrapper.find('input[autocomplete="current-password"]').exists()).toBe(true)
    expect(wrapper.find('.x-login__input-icon').exists()).toBe(true)
  })

  it('emits model update events when typing', async () => {
    const wrapper = mount(XLogin)

    await wrapper.find('input[autocomplete="username"]').setValue('admin')
    await wrapper.find('input[autocomplete="current-password"]').setValue('secret')
    await wrapper.find('input[type="checkbox"]').setValue(true)

    expect(wrapper.emitted('update:username')?.[0]).toEqual(['admin'])
    expect(wrapper.emitted('update:password')?.[0]).toEqual(['secret'])
    expect(wrapper.emitted('update:remember')?.[0]).toEqual([true])
  })

  it('emits login on submit and enter with remember state', async () => {
    const wrapper = mount(XLogin, {
      props: {
        username: 'admin',
        password: 'secret',
        remember: true
      }
    })

    await wrapper.find('form').trigger('submit')
    await wrapper.find('.x-login').trigger('keydown.enter')

    expect(wrapper.emitted('login')).toHaveLength(2)
    expect(wrapper.emitted('login')?.[0]?.[0]).toMatchObject({
      username: 'admin',
      password: 'secret',
      remember: true
    })
  })

  it('supports hiding the remember checkbox', () => {
    const wrapper = mount(XLogin, {
      props: {
        showRemember: false
      }
    })

    expect(wrapper.text()).not.toContain('记住我')
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(false)
  })

  it('emits register event without handling business logic', async () => {
    const wrapper = mount(XLogin)

    await wrapper.find('.x-login__link-button').trigger('click')

    expect(wrapper.emitted('register')).toHaveLength(1)
    expect(wrapper.text()).toContain('还没有账号？')
    expect(wrapper.text()).toContain('立即注册')
  })

  it('renders optional verification entries and emits integration events', async () => {
    const wrapper = mount(XLogin, {
      props: {
        enableImageCaptcha: true,
        enableLetterCaptcha: true,
        enableWechatLogin: true,
        enableSmsLogin: true,
        phone: '13800000000'
      }
    })

    expect(wrapper.text()).toContain('拖动下方滑块完成拼图')
    expect(wrapper.text()).toContain('字母识别')
    expect(wrapper.text()).toContain('手机号')
    expect(wrapper.text()).toContain('微信登录')

    await wrapper.findAll('.x-login__captcha-tool')[1].trigger('click')
    await wrapper.find('.x-login__letter-card').trigger('click')
    await wrapper.find('.x-login__minor-button').trigger('click')
    await wrapper.find('.x-login__wechat').trigger('click')

    expect(wrapper.emitted('refresh-image-captcha')).toHaveLength(1)
    expect(wrapper.emitted('refresh-letter-captcha')).toHaveLength(1)
    expect(wrapper.emitted('send-sms-code')?.[0]).toEqual(['13800000000'])
    expect(wrapper.emitted('wechat-login')).toHaveLength(1)
  })

  it('toggles password visibility and supports left labels with theme styles', async () => {
    const wrapper = mount(XLogin, {
      props: {
        labelPosition: 'left',
        accentColor: '#8a4b12',
        backgroundColor: '#fffaf1',
        borderWidth: '2px',
        borderRadius: '12px',
        width: '420px'
      }
    })

    const password = wrapper.find('input[autocomplete="current-password"]')
    expect(wrapper.classes()).toContain('x-login--label-left')
    expect(wrapper.attributes('style')).toContain('--x-login-accent: #8a4b12')
    expect(wrapper.attributes('style')).toContain('--x-login-surface: #fffaf1')
    expect(wrapper.attributes('style')).toContain('--x-login-border-width: 2px')
    expect(wrapper.attributes('style')).toContain('--x-login-radius: 12px')
    expect(wrapper.attributes('style')).toContain('--x-login-width: 420px')
    expect(password.attributes('type')).toBe('password')

    await wrapper.find('.x-login__eye').trigger('pointerdown')

    expect(wrapper.find('input[autocomplete="current-password"]').attributes('type')).toBe('text')

    await wrapper.find('.x-login__eye').trigger('pointerup')

    expect(wrapper.find('input[autocomplete="current-password"]').attributes('type')).toBe('password')
  })
})
