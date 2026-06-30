<script setup lang="ts">
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { XLogin } from '../../login'
import type { LoginSubmitPayload } from '../../login/src/types'
import type { LoginPageProps, LoginPageSectionConfig, LoginPagePreset } from './types'

defineOptions({
  name: 'XLoginPage'
})

const props = withDefaults(defineProps<LoginPageProps>(), {
  preset: 'centered',
  width: '100%',
  minHeight: '100vh',
  backgroundColor: '#f6f8fb',
  backgroundImage: '',
  loginWidth: 420,
  loginProps: () => ({})
})

const emit = defineEmits<{
  login: [payload: LoginSubmitPayload]
  register: []
  'send-sms-code': [phone: string]
  'wechat-login': []
  'refresh-image-captcha': []
  'refresh-letter-captcha': []
  'image-captcha-change': [percent: number]
  'image-captcha-success': []
  'image-captcha-help': []
  'image-captcha-close': []
}>()

type SectionName = 'header' | 'footer' | 'content' | 'contentTop' | 'contentLeft' | 'contentCenter' | 'contentRight' | 'contentBottom'

interface PresetConfig {
  sections: Record<SectionName, LoginPageSectionConfig>
  loginWidth: number | string
  loginProps: Record<string, unknown>
}

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly'
} as const

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch'
} as const

const baseSections: Record<SectionName, LoginPageSectionConfig> = {
  header: {
    visible: true,
    height: 72,
    padding: '0 48px',
    direction: 'row',
    align: 'center',
    justify: 'between',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    textColor: '#172033'
  },
  footer: {
    visible: true,
    height: 72,
    padding: '0 48px',
    direction: 'row',
    align: 'center',
    justify: 'center',
    textColor: 'rgba(255, 255, 255, 0.78)'
  },
  content: {
    visible: true,
    padding: '48px',
    gap: 36,
    direction: 'row',
    align: 'center',
    justify: 'center',
    overflow: 'hidden'
  },
  contentTop: {
    visible: false,
    direction: 'row',
    align: 'center',
    justify: 'center'
  },
  contentLeft: {
    visible: false,
    width: 520,
    direction: 'column',
    align: 'start',
    justify: 'center',
    gap: 24,
    textColor: '#ffffff'
  },
  contentCenter: {
    visible: true,
    direction: 'column',
    align: 'center',
    justify: 'center'
  },
  contentRight: {
    visible: false,
    width: 520,
    direction: 'column',
    align: 'start',
    justify: 'center',
    gap: 24,
    textColor: '#ffffff'
  },
  contentBottom: {
    visible: false,
    direction: 'row',
    align: 'center',
    justify: 'center'
  }
}

const presetConfigs: Record<LoginPagePreset, PresetConfig> = {
  centered: {
    loginWidth: 420,
    loginProps: {
      title: '欢迎登录',
      description: '请输入账号信息继续访问系统',
      accentColor: '#2454d6',
      accentSoftColor: '#e8efff',
      radius: '16px'
    },
    sections: {
      ...baseSections,
      footer: { ...baseSections.footer, textColor: '#7b8496' },
      content: {
        ...baseSections.content,
        padding: '48px 24px',
        backgroundColor: '#f6f8fb',
        backgroundImage: 'linear-gradient(135deg, rgba(36, 84, 214, 0.12), rgba(0, 184, 169, 0.08))'
      }
    }
  },
  finance: {
    loginWidth: 430,
    loginProps: {
      title: '个人中心登录',
      description: '统一账号，安全访问业务中心',
      accentColor: '#ff5a1f',
      accentSoftColor: '#fff0e8',
      radius: '18px',
      showRegister: true
    },
    sections: {
      ...baseSections,
      header: { ...baseSections.header, height: 70, padding: '0 22vw', backgroundColor: '#ffffff' },
      footer: { ...baseSections.footer, textColor: 'rgba(255, 255, 255, 0.86)' },
      content: {
        ...baseSections.content,
        padding: '72px 24px',
        backgroundColor: '#6f82c7',
        backgroundImage: 'radial-gradient(circle at 45% 42%, rgba(255, 255, 255, 0.22), transparent 24%), linear-gradient(135deg, #8ca0d9, #6379bd)'
      },
      contentLeft: { ...baseSections.contentLeft, visible: true, width: 440 },
      contentCenter: { ...baseSections.contentCenter, align: 'center' }
    }
  },
  recruit: {
    loginWidth: 430,
    loginProps: {
      title: '登录/注册',
      description: '求职者端',
      accentColor: '#1688f0',
      accentSoftColor: '#e8f4ff',
      radius: '0px',
      enableSmsLogin: true,
      showRegister: true
    },
    sections: {
      ...baseSections,
      header: { ...baseSections.header, backgroundColor: 'transparent', padding: '0 16vw' },
      footer: { ...baseSections.footer, height: 58, textColor: 'rgba(16, 67, 120, 0.48)' },
      content: {
        ...baseSections.content,
        gap: 80,
        padding: '70px 24px',
        backgroundColor: '#55bceb',
        backgroundImage: 'linear-gradient(180deg, #55bceb 0%, #4db4e6 100%)'
      },
      contentLeft: { ...baseSections.contentLeft, visible: true, width: 560 },
      contentCenter: { ...baseSections.contentCenter, align: 'center' }
    }
  },
  retail: {
    loginWidth: 360,
    loginProps: {
      title: '扫码登录',
      description: '账号登录',
      accentColor: '#f5127a',
      accentSoftColor: '#ffe8f2',
      radius: '0px',
      enableWechatLogin: true,
      showRegister: true
    },
    sections: {
      ...baseSections,
      header: { ...baseSections.header, height: 98, padding: '0 24vw', backgroundColor: '#ffffff' },
      footer: { ...baseSections.footer, height: 168, backgroundColor: '#f6f6f6', textColor: '#909399' },
      content: {
        ...baseSections.content,
        gap: 80,
        padding: '50px 24px',
        backgroundColor: '#f6a0aa'
      },
      contentLeft: { ...baseSections.contentLeft, visible: true, width: 560 },
      contentCenter: { ...baseSections.contentCenter, align: 'center' }
    }
  },
  split: {
    loginWidth: 420,
    loginProps: {
      title: '企业账号登录',
      description: '安全、稳定、高效地进入工作台',
      accentColor: '#0f766e',
      accentSoftColor: '#dff8f4',
      radius: '18px'
    },
    sections: {
      ...baseSections,
      header: { ...baseSections.header, visible: false },
      footer: { ...baseSections.footer, visible: false },
      content: {
        ...baseSections.content,
        padding: 0,
        gap: 0,
        justify: 'center',
        backgroundColor: '#ffffff'
      },
      contentLeft: {
        ...baseSections.contentLeft,
        visible: true,
        width: '50%',
        minHeight: '100vh',
        padding: '72px',
        backgroundColor: '#0f766e',
        backgroundImage: 'linear-gradient(135deg, #0f766e 0%, #134e4a 100%)'
      },
      contentCenter: {
        ...baseSections.contentCenter,
        width: '50%',
        minHeight: '100vh',
        padding: '48px',
        backgroundColor: '#f8fafc'
      }
    }
  }
}

const rootClasses = computed(() => [`x-login-page--${props.preset}`])

function toCssSize(value?: number | string) {
  return typeof value === 'number' ? `${value}px` : value
}

function toBackgroundImage(value?: string) {
  if (!value) {
    return undefined
  }

  return value.includes('gradient(') ? value : `url("${value}")`
}

function mergeSection(name: SectionName) {
  return {
    ...presetConfigs[props.preset].sections[name],
    ...(props[name] ?? {})
  }
}

const sections = computed<Record<SectionName, LoginPageSectionConfig>>(() => ({
  header: mergeSection('header'),
  footer: mergeSection('footer'),
  content: mergeSection('content'),
  contentTop: mergeSection('contentTop'),
  contentLeft: mergeSection('contentLeft'),
  contentCenter: mergeSection('contentCenter'),
  contentRight: mergeSection('contentRight'),
  contentBottom: mergeSection('contentBottom')
}))

const rootStyle = computed<CSSProperties>(() => ({
  width: toCssSize(props.width),
  height: toCssSize(props.height),
  minHeight: toCssSize(props.minHeight),
  backgroundColor: props.backgroundColor,
  backgroundImage: toBackgroundImage(props.backgroundImage),
  backgroundSize: props.backgroundImage ? 'cover' : undefined,
  backgroundPosition: props.backgroundImage ? 'center' : undefined
}))

const loginStyle = computed<CSSProperties>(() => ({
  width: toCssSize(props.loginWidth ?? presetConfigs[props.preset].loginWidth),
  flexBasis: toCssSize(props.loginWidth ?? presetConfigs[props.preset].loginWidth),
  maxWidth: '100%'
}))

const mergedLoginProps = computed(() => ({
  ...presetConfigs[props.preset].loginProps,
  ...props.loginProps,
  width: props.loginProps.width ?? '100%'
}))

function sectionStyle(section: LoginPageSectionConfig): CSSProperties {
  return {
    width: toCssSize(section.width),
    minWidth: toCssSize(section.minWidth),
    maxWidth: toCssSize(section.maxWidth),
    height: toCssSize(section.height),
    minHeight: toCssSize(section.minHeight),
    maxHeight: toCssSize(section.maxHeight),
    padding: toCssSize(section.padding),
    gap: toCssSize(section.gap),
    alignItems: section.align ? alignMap[section.align] : undefined,
    justifyContent: section.justify ? justifyMap[section.justify] : undefined,
    flexDirection: section.direction,
    backgroundColor: section.backgroundColor,
    backgroundImage: toBackgroundImage(section.backgroundImage),
    backgroundSize: section.backgroundSize ?? (section.backgroundImage ? 'cover' : undefined),
    backgroundPosition: section.backgroundPosition ?? (section.backgroundImage ? 'center' : undefined),
    backgroundRepeat: section.backgroundRepeat ?? (section.backgroundImage ? 'no-repeat' : undefined),
    borderRadius: toCssSize(section.radius),
    borderWidth: toCssSize(section.borderWidth),
    borderColor: section.borderColor,
    color: section.textColor,
    overflow: section.overflow
  }
}

function sectionClass(name: SectionName) {
  return [`x-login-page__${name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`]
}

function handleLogin(payload: LoginSubmitPayload) {
  emit('login', payload)
}
</script>

<template>
  <section class="x-login-page" :class="rootClasses" :style="rootStyle">
    <header v-if="sections.header.visible" :class="sectionClass('header')" :style="sectionStyle(sections.header)">
      <slot name="header">
        <div class="x-login-page__brand">
          <slot name="brand">
            <span class="x-login-page__brand-mark">X</span>
            <span class="x-login-page__brand-text">x.ui 登录页</span>
          </slot>
        </div>
        <div class="x-login-page__header-extra">安全登录 · 快速访问</div>
      </slot>
    </header>

    <main v-if="sections.content.visible" :class="sectionClass('content')" :style="sectionStyle(sections.content)">
      <div v-if="sections.contentTop.visible" :class="sectionClass('contentTop')" :style="sectionStyle(sections.contentTop)">
        <slot name="content-top" />
      </div>

      <div class="x-login-page__content-main">
        <aside v-if="sections.contentLeft.visible" :class="sectionClass('contentLeft')" :style="sectionStyle(sections.contentLeft)">
          <slot name="content-left">
            <slot name="slogan">
              <p class="x-login-page__eyebrow">WELCOME</p>
              <h1 class="x-login-page__slogan">统一身份入口</h1>
              <p class="x-login-page__summary">支持账号、短信、验证码与第三方入口，快速搭建常规登录页面。</p>
              <div class="x-login-page__actions">
                <button type="button">下载客户端</button>
                <button type="button">了解更多</button>
              </div>
            </slot>
          </slot>
        </aside>

        <section v-if="sections.contentCenter.visible" :class="sectionClass('contentCenter')" :style="sectionStyle(sections.contentCenter)">
          <slot name="content-center">
            <div class="x-login-page__login" :style="loginStyle">
              <slot name="login">
                <XLogin
                  v-bind="mergedLoginProps"
                  @login="handleLogin"
                  @register="emit('register')"
                  @send-sms-code="emit('send-sms-code', $event)"
                  @wechat-login="emit('wechat-login')"
                  @refresh-image-captcha="emit('refresh-image-captcha')"
                  @refresh-letter-captcha="emit('refresh-letter-captcha')"
                  @image-captcha-change="emit('image-captcha-change', $event)"
                  @image-captcha-success="emit('image-captcha-success')"
                  @image-captcha-help="emit('image-captcha-help')"
                  @image-captcha-close="emit('image-captcha-close')"
                />
              </slot>
            </div>
          </slot>
        </section>

        <aside v-if="sections.contentRight.visible" :class="sectionClass('contentRight')" :style="sectionStyle(sections.contentRight)">
          <slot name="content-right" />
        </aside>
      </div>

      <div v-if="sections.contentBottom.visible" :class="sectionClass('contentBottom')" :style="sectionStyle(sections.contentBottom)">
        <slot name="content-bottom" />
      </div>
    </main>

    <footer v-if="sections.footer.visible" :class="sectionClass('footer')" :style="sectionStyle(sections.footer)">
      <slot name="footer">
        <span>关于我们</span>
        <span>联系我们</span>
        <span>隐私保护</span>
        <span>服务协议</span>
      </slot>
    </footer>
  </section>
</template>

<style scoped>
.x-login-page {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
  color: #172033;
  display: flex;
  flex-direction: column;
  font-family: inherit;
  overflow: hidden;
}

.x-login-page *,
.x-login-page *::before,
.x-login-page *::after {
  box-sizing: border-box;
}

.x-login-page__header,
.x-login-page__footer,
.x-login-page__content,
.x-login-page__content-top,
.x-login-page__content-left,
.x-login-page__content-center,
.x-login-page__content-right,
.x-login-page__content-bottom {
  border-style: solid;
  border-width: 0;
  display: flex;
  min-width: 0;
  position: relative;
}

.x-login-page__content {
  flex: 1 1 auto;
  width: 100%;
}

.x-login-page__content-main {
  align-items: inherit;
  display: flex;
  flex: 1 1 auto;
  flex-direction: inherit;
  gap: inherit;
  justify-content: inherit;
  min-height: 0;
  min-width: 0;
  width: 100%;
}

.x-login-page__content-center {
  flex: 0 1 auto;
}

.x-login-page__brand {
  align-items: center;
  display: inline-flex;
  gap: 10px;
  min-width: 0;
}

.x-login-page__brand-mark {
  align-items: center;
  background: currentColor;
  border-radius: 10px;
  color: inherit;
  display: inline-flex;
  flex: 0 0 auto;
  font-size: 0;
  height: 32px;
  justify-content: center;
  position: relative;
  width: 32px;
}

.x-login-page__brand-mark::after {
  color: #ffffff;
  content: "X";
  font-size: 16px;
  font-weight: 800;
}

.x-login-page__brand-text {
  font-size: 20px;
  font-weight: 800;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.x-login-page__header-extra {
  color: currentColor;
  font-size: 14px;
  opacity: 0.72;
}

.x-login-page__eyebrow {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.16em;
  margin: 0;
  opacity: 0.76;
}

.x-login-page__slogan {
  color: currentColor;
  font-size: 52px;
  font-weight: 900;
  letter-spacing: 0;
  line-height: 1.08;
  margin: 0;
}

.x-login-page__summary {
  color: currentColor;
  font-size: 17px;
  line-height: 1.8;
  margin: 0;
  max-width: 520px;
  opacity: 0.82;
}

.x-login-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.x-login-page__actions button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.32);
  border-radius: 8px;
  color: currentColor;
  cursor: pointer;
  font: inherit;
  font-weight: 700;
  min-height: 44px;
  padding: 0 22px;
}

.x-login-page__login {
  flex: 0 0 auto;
}

.x-login-page__footer {
  flex-wrap: wrap;
  gap: 34px;
  font-size: 14px;
}

.x-login-page--recruit .x-login-page__slogan {
  font-size: 64px;
  transform: skew(-8deg);
}

.x-login-page--retail .x-login-page__slogan {
  font-size: 48px;
}

.x-login-page--split .x-login-page__content-main {
  min-height: 100vh;
}

@media (max-width: 900px) {
  .x-login-page__header,
  .x-login-page__footer,
  .x-login-page__content {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .x-login-page__content-main {
    flex-direction: column;
  }

  .x-login-page__content-left,
  .x-login-page__content-right,
  .x-login-page__content-center {
    min-height: auto !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    width: 100% !important;
  }

  .x-login-page__login {
    flex-basis: auto !important;
    width: 100% !important;
  }

  .x-login-page__content-left,
  .x-login-page__content-right {
    align-items: center !important;
    text-align: center;
  }

  .x-login-page__slogan {
    font-size: 36px;
  }

  .x-login-page--recruit .x-login-page__slogan {
    font-size: 42px;
  }

  .x-login-page__header-extra {
    display: none;
  }
}
</style>
