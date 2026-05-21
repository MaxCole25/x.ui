<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { LoginProps, LoginSubmitPayload } from './types'

defineOptions({
  name: 'XLogin'
})

const props = withDefaults(defineProps<LoginProps>(), {
  username: '',
  password: '',
  remember: false,
  imageCode: '',
  letterCode: '',
  phone: '',
  smsCode: '',
  title: '欢迎登录',
  description: '请输入账号信息继续访问系统',
  logoSrc: '',
  logoAlt: 'Logo',
  logoPosition: 'top',
  labelPosition: 'top',
  size: 'md',
  loading: false,
  disabled: false,
  usernameLabel: '用户名',
  passwordLabel: '密码',
  usernamePlaceholder: '请输入用户名',
  passwordPlaceholder: '请输入密码',
  imageCodePlaceholder: '请输入图像验证码',
  letterCodePlaceholder: '请输入字母验证码',
  phonePlaceholder: '请输入手机号',
  smsCodePlaceholder: '请输入短信验证码',
  loginText: '登录',
  registerPromptText: '还没有账号？',
  registerText: '立即注册',
  smsButtonText: '获取验证码',
  wechatText: '微信登录',
  rememberText: '记住我',
  imageCaptchaSrc: '',
  imageCaptchaAlt: '滑块图像验证',
  imageCaptchaTitle: '拖动下方滑块完成拼图',
  imageCaptchaTip: '按住滑块，拖动拼图完成验证',
  imageCaptchaSuccessText: '验证通过',
  accentColor: '#0b4a52',
  accentSoftColor: '#e1f5f7',
  backgroundColor: '#ffffff',
  borderColor: '#cfe0e6',
  borderWidth: '1px',
  borderRadius: '18px',
  width: '100%',
  textColor: '#12323a',
  mutedColor: '#6b7c93',
  inputBackgroundColor: '#ffffff',
  buttonTextColor: '#ffffff',
  letterCaptchaText: '',
  enableImageCaptcha: false,
  enableLetterCaptcha: false,
  enableWechatLogin: false,
  enableSmsLogin: false,
  showRemember: true,
  showRegister: true
})

const emit = defineEmits<{
  'update:username': [value: string]
  'update:password': [value: string]
  'update:remember': [value: boolean]
  'update:imageCode': [value: string]
  'update:letterCode': [value: string]
  'update:phone': [value: string]
  'update:smsCode': [value: string]
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

const sliderTrack = ref<HTMLElement>()
const puzzleStage = ref<HTMLElement>()
const sliderPercent = ref(0)
const puzzleStageWidth = ref(0)
const isDragging = ref(false)
const isPasswordVisible = ref(false)
const isImageCaptchaVerified = ref(false)
let puzzleResizeObserver: ResizeObserver | undefined

const rootClasses = computed(() => [
  `x-login--${props.size}`,
  `x-login--logo-${props.logoPosition}`,
  `x-login--label-${props.labelPosition}`,
  {
    'is-loading': props.loading,
    'is-disabled': props.disabled
  }
])

const themeStyle = computed<Record<string, string>>(() => ({
  '--x-login-accent': props.accentColor,
  '--x-login-accent-soft': props.accentSoftColor,
  '--x-login-surface': props.backgroundColor,
  '--x-login-border': props.borderColor,
  '--x-login-border-width': props.borderWidth,
  '--x-login-radius': props.borderRadius,
  '--x-login-width': props.width,
  '--x-login-text': props.textColor,
  '--x-login-muted': props.mutedColor,
  '--x-login-input-bg': props.inputBackgroundColor,
  '--x-login-button-text': props.buttonTextColor
}))

const sliderStyle = computed(() => ({
  left: `calc(${sliderPercent.value}% - ${sliderPercent.value * 0.76}px)`
}))

const puzzleTravel = computed(() => Math.max(0, puzzleStageWidth.value - 132))

const puzzleStyle = computed(() => ({
  backgroundImage: props.imageCaptchaSrc ? `url(${props.imageCaptchaSrc})` : undefined,
  backgroundSize: puzzleStageWidth.value ? `${puzzleStageWidth.value}px 176px` : undefined,
  transform: `translateX(${(sliderPercent.value / 100) * puzzleTravel.value}px)`
}))

function buildPayload(): LoginSubmitPayload {
  return {
    username: props.username,
    password: props.password,
    remember: props.remember,
    imageCode: props.imageCode,
    letterCode: props.letterCode,
    phone: props.phone,
    smsCode: props.smsCode
  }
}

function handleLogin() {
  if (props.disabled || props.loading) {
    return
  }

  emit('login', buildPayload())
}

function handleEnter() {
  handleLogin()
}

function updateSlider(clientX: number) {
  const track = sliderTrack.value
  if (!track) {
    return
  }

  const rect = track.getBoundingClientRect()
  const nextPercent = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
  sliderPercent.value = nextPercent
  emit('update:imageCode', String(Math.round(nextPercent)))
  emit('image-captcha-change', nextPercent)
}

function finishSlider() {
  if (!isDragging.value) {
    return
  }

  isDragging.value = false
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', finishSlider)

  if (sliderPercent.value >= 92) {
    sliderPercent.value = 100
    isImageCaptchaVerified.value = true
    emit('update:imageCode', 'verified')
    emit('image-captcha-success')
    return
  }

  sliderPercent.value = 0
  emit('update:imageCode', '')
  emit('image-captcha-change', 0)
}

function handlePointerMove(event: PointerEvent) {
  if (!isDragging.value) {
    return
  }

  updateSlider(event.clientX)
}

function startSlider(event: PointerEvent) {
  if (props.disabled || props.loading || isImageCaptchaVerified.value) {
    return
  }

  isDragging.value = true
  updateSlider(event.clientX)
  window.addEventListener('pointermove', handlePointerMove)
  window.addEventListener('pointerup', finishSlider)
}

function resetImageCaptcha() {
  sliderPercent.value = 0
  isImageCaptchaVerified.value = false
  emit('update:imageCode', '')
  emit('refresh-image-captcha')
}

function closeImageCaptcha() {
  resetImageCaptcha()
  emit('image-captcha-close')
}

function showPassword() {
  if (props.disabled || props.loading) {
    return
  }

  isPasswordVisible.value = true
}

function hidePassword() {
  isPasswordVisible.value = false
}

function updatePuzzleStageWidth() {
  puzzleStageWidth.value = puzzleStage.value?.clientWidth ?? 0
}

onMounted(() => {
  updatePuzzleStageWidth()
  if (typeof ResizeObserver !== 'undefined' && puzzleStage.value) {
    puzzleResizeObserver = new ResizeObserver(updatePuzzleStageWidth)
    puzzleResizeObserver.observe(puzzleStage.value)
  }
})

onBeforeUnmount(() => {
  puzzleResizeObserver?.disconnect()
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', finishSlider)
})
</script>

<template>
  <section class="x-login" :class="rootClasses" :style="themeStyle" @keydown.enter.prevent="handleEnter">
    <header class="x-login__brand">
      <div v-if="props.logoSrc || $slots.logo" class="x-login__logo-wrap">
        <slot name="logo">
          <img class="x-login__logo" :src="props.logoSrc" :alt="props.logoAlt" />
        </slot>
      </div>

      <div class="x-login__headline">
        <h2 class="x-login__title">
          <slot name="title">{{ props.title }}</slot>
        </h2>
        <p class="x-login__description">
          <slot name="description">{{ props.description }}</slot>
        </p>
      </div>
    </header>

    <form class="x-login__form" @submit.prevent="handleLogin">
      <label class="x-login__field">
        <span class="x-login__label">{{ props.usernameLabel }}</span>
        <span class="x-login__control x-login__control--prefix">
          <span class="x-login__input-icon" aria-hidden="true">
            <svg class="x-login__svg-icon" viewBox="0 0 24 24" focusable="false">
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" />
            </svg>
          </span>
          <input
            class="x-login__input"
            autocomplete="username"
            :disabled="props.disabled || props.loading"
            :placeholder="props.usernamePlaceholder"
            :value="props.username"
            @input="emit('update:username', ($event.target as HTMLInputElement).value)"
          />
        </span>
      </label>

      <label class="x-login__field">
        <span class="x-login__label">{{ props.passwordLabel }}</span>
        <span class="x-login__control x-login__control--prefix x-login__control--suffix">
          <span class="x-login__input-icon" aria-hidden="true">
            <svg class="x-login__svg-icon" viewBox="0 0 24 24" focusable="false">
              <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM5 10V20H19V10H5ZM11 14H13V16H11V14ZM7 14H9V16H7V14ZM15 14H17V16H15V14ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z" />
            </svg>
          </span>
          <input
            class="x-login__input"
            autocomplete="current-password"
            :disabled="props.disabled || props.loading"
            :placeholder="props.passwordPlaceholder"
            :type="isPasswordVisible ? 'text' : 'password'"
            :value="props.password"
            @input="emit('update:password', ($event.target as HTMLInputElement).value)"
          />
          <button
            class="x-login__eye"
            type="button"
            :aria-label="isPasswordVisible ? '隐藏密码' : '显示密码'"
            :disabled="props.disabled || props.loading"
            @blur="hidePassword"
            @mouseleave="hidePassword"
            @pointercancel="hidePassword"
            @pointerdown.prevent="showPassword"
            @pointerup="hidePassword"
          >
            <svg v-if="isPasswordVisible" class="x-login__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z" />
            </svg>
            <svg v-else class="x-login__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z" />
            </svg>
          </button>
        </span>
      </label>

      <label v-if="props.showRemember" class="x-login__remember">
        <input
          class="x-login__remember-input"
          type="checkbox"
          :checked="props.remember"
          :disabled="props.disabled || props.loading"
          @change="emit('update:remember', ($event.target as HTMLInputElement).checked)"
        />
        <span class="x-login__remember-box" aria-hidden="true">
          <svg class="x-login__remember-check" viewBox="0 0 16 16" focusable="false">
            <path d="M6.3 11.6L2.9 8.2L4.3 6.8L6.3 8.8L11.7 3.4L13.1 4.8L6.3 11.6Z" />
          </svg>
        </span>
        <span class="x-login__remember-text">{{ props.rememberText }}</span>
      </label>

      <div v-if="props.enableImageCaptcha" class="x-login__field x-login__field--captcha">
        <div class="x-login__slider-captcha" :class="{ 'is-verified': isImageCaptchaVerified }">
          <div class="x-login__captcha-title">{{ props.imageCaptchaTitle }}</div>
          <div ref="puzzleStage" class="x-login__puzzle-stage">
            <slot name="image-captcha">
              <img v-if="props.imageCaptchaSrc" class="x-login__puzzle-image" :src="props.imageCaptchaSrc" :alt="props.imageCaptchaAlt" />
              <div v-else class="x-login__puzzle-fallback">
                <span class="x-login__puzzle-cloud" />
                <span class="x-login__puzzle-wave" />
              </div>
            </slot>
            <span class="x-login__puzzle-gap" aria-hidden="true" />
            <span class="x-login__puzzle-piece" :style="puzzleStyle" aria-hidden="true" />
          </div>
          <div ref="sliderTrack" class="x-login__slider-track" @pointerdown.prevent="startSlider">
            <span class="x-login__slider-fill" :style="{ width: `${sliderPercent}%` }" />
            <span class="x-login__slider-tip">{{ isImageCaptchaVerified ? props.imageCaptchaSuccessText : props.imageCaptchaTip }}</span>
            <button class="x-login__slider-thumb" type="button" :style="sliderStyle" :disabled="props.disabled || props.loading || isImageCaptchaVerified">
              <span v-if="isImageCaptchaVerified" aria-hidden="true">✓</span>
              <span v-else class="x-login__slider-bars" aria-hidden="true"><i /><i /><i /></span>
            </button>
          </div>
          <div class="x-login__captcha-tools">
            <button class="x-login__captcha-tool" type="button" :disabled="props.disabled || props.loading" aria-label="帮助" @click="emit('image-captcha-help')">
              <svg class="x-login__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12S6.477 22 12 22 22 17.523 22 12 17.523 2 12 2ZM12 20C7.582 20 4 16.418 4 12S7.582 4 12 4 20 7.582 20 12 16.418 20 12 20ZM11 17H13V15H11V17ZM12 6C9.79 6 8 7.79 8 10H10C10 8.895 10.895 8 12 8S14 8.895 14 10C14 11.305 12.981 11.753 11.972 12.522 11.016 13.251 11 14.011 11 14H13C13 13.667 13.241 13.434 13.802 13.019 14.835 12.254 16 11.392 16 10 16 7.79 14.21 6 12 6Z" />
              </svg>
            </button>
            <button class="x-login__captcha-tool" type="button" :disabled="props.disabled || props.loading" aria-label="刷新图像验证" @click="resetImageCaptcha">
              <svg class="x-login__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M18.537 19.567C16.784 21.08 14.499 22 12 22 6.477 22 2 17.523 2 12S6.477 2 12 2C16.137 2 19.684 4.512 21.206 8.094L19.365 8.876C18.148 6.011 15.311 4 12 4 7.582 4 4 7.582 4 12S7.582 20 12 20C13.955 20 15.747 19.299 17.137 18.135L14 15H22V23L18.537 19.567ZM6.863 5.865L10 9H2V1L5.463 4.433C7.216 2.92 9.501 2 12 2V4C10.045 4 8.253 4.701 6.863 5.865Z" />
              </svg>
            </button>
            <button class="x-login__captcha-tool" type="button" :disabled="props.disabled || props.loading" aria-label="关闭图像验证" @click="closeImageCaptcha">
              <svg class="x-login__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="props.enableLetterCaptcha" class="x-login__field x-login__field--inline">
        <label class="x-login__inline-control">
          <span class="x-login__label">字母识别</span>
          <input
            class="x-login__input"
            :disabled="props.disabled || props.loading"
            :placeholder="props.letterCodePlaceholder"
            :value="props.letterCode"
            @input="emit('update:letterCode', ($event.target as HTMLInputElement).value)"
          />
        </label>
        <button class="x-login__letter-card" type="button" :disabled="props.disabled || props.loading" @click="emit('refresh-letter-captcha')">
          <slot name="letter-captcha">
            {{ props.letterCaptchaText || 'A7KQ' }}
          </slot>
        </button>
      </div>

      <div v-if="props.enableSmsLogin" class="x-login__sms">
        <label class="x-login__field">
          <span class="x-login__label">手机号</span>
          <input
            class="x-login__input"
            autocomplete="tel"
            :disabled="props.disabled || props.loading"
            :placeholder="props.phonePlaceholder"
            :value="props.phone"
            @input="emit('update:phone', ($event.target as HTMLInputElement).value)"
          />
        </label>

        <div class="x-login__field x-login__field--inline">
          <label class="x-login__inline-control">
            <span class="x-login__label">短信验证</span>
            <input
              class="x-login__input"
              autocomplete="one-time-code"
              :disabled="props.disabled || props.loading"
              :placeholder="props.smsCodePlaceholder"
              :value="props.smsCode"
              @input="emit('update:smsCode', ($event.target as HTMLInputElement).value)"
            />
          </label>
          <button class="x-login__minor-button" type="button" :disabled="props.disabled || props.loading" @click="emit('send-sms-code', props.phone)">
            {{ props.smsButtonText }}
          </button>
        </div>
      </div>

      <slot name="extra" />

      <button class="x-login__submit" type="submit" :disabled="props.disabled || props.loading">
        <span v-if="props.loading" class="x-login__spinner" aria-hidden="true" />
        <span>{{ props.loading ? '登录中...' : props.loginText }}</span>
      </button>

      <div class="x-login__actions">
        <p v-if="props.showRegister" class="x-login__register-tip">
          <span>{{ props.registerPromptText }}</span>
          <button class="x-login__link-button" type="button" :disabled="props.disabled || props.loading" @click="emit('register')">
            {{ props.registerText }}
          </button>
        </p>

        <button v-if="props.enableWechatLogin" class="x-login__wechat" type="button" :disabled="props.disabled || props.loading" @click="emit('wechat-login')">
          <slot name="wechat-icon">
            <svg class="x-login__wechat-logo" viewBox="0 0 31.902 26" focusable="false" aria-hidden="true">
              <path d="M11.53 0C5.163 0 0 4.336 0 9.685c0 2.918 1.553 5.545 3.984 7.32a.776.776 0 0 1 .282.879l-.52 1.953c-.023.092-.061.187-.061.283 0 .214.172.387.384.387.084 0 .152-.03.222-.072l2.525-1.469c.19-.11.39-.178.612-.178.118 0 .231.018.339.051a13.539 13.539 0 0 0 4.397.516 7.514 7.514 0 0 1-.387-2.374c0-4.878 4.708-8.833 10.516-8.833.21 0 .264.007.471.017C21.896 3.538 17.284 0 11.531 0M7.688 7.96a1.369 1.369 0 0 1-1.364-1.374c0-.76.61-1.374 1.364-1.374.752 0 1.362.615 1.362 1.374 0 .758-.61 1.374-1.362 1.374m7.686 0a1.369 1.369 0 0 1-1.363-1.374c0-.76.61-1.374 1.363-1.374s1.364.615 1.364 1.374c0 .758-.61 1.373-1.364 1.373" />
              <path d="M28.582 23.081c2.025-1.48 3.32-3.668 3.32-6.1 0-4.458-4.302-8.07-9.61-8.07-5.306 0-9.608 3.612-9.608 8.07s4.302 8.071 9.609 8.071c1.096 0 2.155-.158 3.136-.442a.96.96 0 0 1 .283-.043c.184 0 .352.057.51.149l2.103 1.224c.06.034.116.06.186.06.177 0 .32-.145.32-.323 0-.08-.032-.16-.052-.236-.012-.046-.27-1.02-.433-1.628a.647.647 0 0 1 .235-.732m-9.491-7.474c-.663 0-1.2-.54-1.2-1.208 0-.668.537-1.21 1.2-1.21.662 0 1.2.542 1.2 1.21 0 .667-.538 1.208-1.2 1.208m6.406 0c-.663 0-1.2-.54-1.2-1.208 0-.668.537-1.21 1.2-1.21.663 0 1.2.542 1.2 1.21 0 .667-.537 1.208-1.2 1.208" />
            </svg>
          </slot>
          <span>{{ props.wechatText }}</span>
        </button>
      </div>

      <slot name="footer" />
    </form>
  </section>
</template>

<style scoped>
.x-login {
  --x-login-accent: #0b4a52;
  --x-login-accent-soft: #e1f5f7;
  --x-login-border: #cfe0e6;
  --x-login-border-width: 1px;
  --x-login-radius: 18px;
  --x-login-width: 100%;
  --x-login-muted: #6b7c93;
  --x-login-text: #12323a;
  --x-login-surface: #ffffff;
  --x-login-input-bg: #ffffff;
  --x-login-button-text: #ffffff;
  background:
    radial-gradient(circle at top left, rgba(127, 214, 246, 0.22), transparent 36%),
    linear-gradient(145deg, var(--x-login-surface) 0%, #f6fbfc 100%);
  border: var(--x-login-border-width) solid var(--x-login-border);
  border-radius: var(--x-login-radius);
  box-shadow: 0 20px 60px rgba(11, 74, 82, 0.14);
  box-sizing: border-box;
  color: var(--x-login-text);
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 100%;
  padding: 32px;
  width: var(--x-login-width);
}

.x-login--sm {
  padding: 24px;
}

.x-login--lg {
  padding: 40px;
}

.x-login__brand {
  align-items: center;
  display: flex;
  gap: 18px;
  width: 100%;
}

.x-login--logo-top .x-login__brand {
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.x-login--logo-top .x-login__headline {
  text-align: center;
}

.x-login--logo-right .x-login__brand {
  flex-direction: row-reverse;
}

.x-login__logo-wrap {
  align-items: center;
  background: linear-gradient(135deg, var(--x-login-accent), #1e6b73);
  border-radius: 18px;
  display: inline-flex;
  flex: 0 0 auto;
  height: 64px;
  justify-content: center;
  overflow: hidden;
  width: 64px;
}

.x-login__logo {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.x-login__headline {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
}

.x-login__title {
  color: var(--x-login-text);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.02em;
  line-height: 1.2;
  margin: 0;
  width: 100%;
}

.x-login__description {
  color: var(--x-login-muted);
  font-size: 14px;
  line-height: 1.7;
  margin: 8px 0 0;
  width: 100%;
}

.x-login__form,
.x-login__sms {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.x-login__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  width: 100%;
}

.x-login--label-left .x-login__field:not(.x-login__field--inline):not(.x-login__field--captcha),
.x-login--label-left .x-login__inline-control {
  align-items: center;
  display: grid;
  gap: 10px;
  grid-template-columns: 56px minmax(0, 1fr);
}

.x-login--label-left .x-login__label {
  text-align: left;
}

.x-login__field--inline {
  align-items: flex-end;
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(0, 1fr) auto;
}

.x-login__inline-control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.x-login__label {
  color: #264d57;
  font-size: 13px;
  font-weight: 700;
}

.x-login__control {
  display: flex;
  position: relative;
  width: 100%;
}

.x-login__input-icon,
.x-login__eye {
  align-items: center;
  color: #6b7c93;
  display: inline-flex;
  height: 44px;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 42px;
  z-index: 1;
}

.x-login__input-icon {
  font-size: 13px;
  font-weight: 800;
  left: 0;
}

.x-login__eye {
  background: transparent;
  border: 0;
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  right: 0;
}

.x-login__svg-icon {
  display: block;
  fill: currentColor;
  height: 18px;
  width: 18px;
}

.x-login__input {
  background: color-mix(in srgb, var(--x-login-input-bg) 92%, transparent);
  border: 1px solid var(--x-login-border);
  border-radius: 12px;
  box-sizing: border-box;
  color: var(--x-login-text);
  font: inherit;
  height: 44px;
  outline: none;
  padding: 0 14px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  width: 100%;
}

.x-login__control--prefix .x-login__input {
  padding-left: 42px;
}

.x-login__control--suffix .x-login__input {
  padding-right: 42px;
}

.x-login__input:focus {
  background: var(--x-login-input-bg);
  border-color: #3aa6b5;
  box-shadow: 0 0 0 4px rgba(58, 166, 181, 0.16);
}

.x-login__remember {
  align-items: center;
  color: var(--x-login-muted);
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  gap: 8px;
  line-height: 1.4;
  user-select: none;
  width: fit-content;
}

.x-login__remember-input {
  height: 1px;
  opacity: 0;
  position: absolute;
  width: 1px;
}

.x-login__remember-box {
  align-items: center;
  background: var(--x-login-input-bg);
  border: 1px solid var(--x-login-border);
  border-radius: 5px;
  box-sizing: border-box;
  color: #ffffff;
  display: inline-flex;
  flex: 0 0 auto;
  height: 18px;
  justify-content: center;
  transition: background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  width: 18px;
}

.x-login__remember-check {
  display: block;
  fill: currentColor;
  height: 13px;
  opacity: 0;
  width: 13px;
}

.x-login__remember-input:checked + .x-login__remember-box {
  background: var(--x-login-accent);
  border-color: var(--x-login-accent);
}

.x-login__remember-input:checked + .x-login__remember-box .x-login__remember-check {
  opacity: 1;
}

.x-login__remember-input:focus-visible + .x-login__remember-box {
  box-shadow: 0 0 0 4px rgba(58, 166, 181, 0.16);
}

.x-login__remember-text {
  color: var(--x-login-muted);
}

.x-login__slider-captcha {
  background: #ffffff;
  border: 0;
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.12);
  display: grid;
  gap: 14px;
  padding: 16px;
}

.x-login__captcha-title {
  color: #111827;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
}

.x-login__puzzle-stage {
  background: linear-gradient(135deg, #e7eef3, #f7f0e6);
  border-radius: 2px;
  height: 176px;
  overflow: hidden;
  position: relative;
}

.x-login__puzzle-image,
.x-login__puzzle-fallback {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.x-login__puzzle-fallback {
  background:
    radial-gradient(ellipse at 51% 44%, #ead4c0 0 8%, transparent 9%),
    radial-gradient(ellipse at 42% 58%, #f7eadf 0 22%, transparent 23%),
    radial-gradient(ellipse at 49% 52%, #f2d8c4 0 24%, transparent 25%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.92), transparent 42%),
    linear-gradient(10deg, #84909b, #e6edf1 52%, #fcfaf6);
}

.x-login__puzzle-wave {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  bottom: -46px;
  height: 96px;
  left: 14%;
  position: absolute;
  width: 140px;
}

.x-login__puzzle-cloud {
  background: rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  height: 18px;
  left: 20px;
  position: absolute;
  top: 22px;
  width: 52px;
}

.x-login__puzzle-gap,
.x-login__puzzle-piece {
  height: 50px;
  position: absolute;
  top: 50px;
  width: 50px;
}

.x-login__puzzle-gap {
  background:
    radial-gradient(circle at 50% 0, transparent 0 9px, rgba(0, 0, 0, 0.5) 10px),
    radial-gradient(circle at 0 50%, transparent 0 9px, rgba(0, 0, 0, 0.5) 10px),
    rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.52), 0 1px 3px rgba(0, 0, 0, 0.28);
  right: 52px;
}

.x-login__puzzle-piece {
  background-color: rgba(255, 255, 255, 0.9);
  background-position: 18px 50px;
  background-size: 100% 176px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.32);
  left: 30px;
  transition: transform 0.12s ease;
}

.x-login__puzzle-piece::before,
.x-login__puzzle-piece::after {
  background: inherit;
  border: inherit;
  border-radius: 999px;
  content: "";
  position: absolute;
}

.x-login__puzzle-piece::before {
  height: 20px;
  left: 15px;
  top: -11px;
  width: 20px;
}

.x-login__puzzle-piece::after {
  height: 20px;
  left: -11px;
  top: 15px;
  width: 20px;
}

.x-login__slider-track {
  align-items: center;
  background: #e5e5e5;
  border-radius: 999px;
  cursor: grab;
  display: flex;
  height: 28px;
  margin: 8px 0 0;
  padding-right: 76px;
  overflow: visible;
  position: relative;
  user-select: none;
}

.x-login__slider-fill {
  background: rgba(52, 199, 89, 0.2);
  border-radius: 999px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
}

.x-login__slider-tip {
  color: #7c8794;
  font-size: 13px;
  font-weight: 700;
  left: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  text-align: center;
  z-index: 1;
}

.x-login__slider-thumb {
  align-items: center;
  background: #35c759;
  border: 0;
  border-radius: 18px;
  box-shadow: 0 12px 24px rgba(52, 199, 89, 0.36);
  color: #ffffff;
  cursor: grab;
  display: inline-flex;
  font-size: 18px;
  font-weight: 800;
  height: 56px;
  justify-content: center;
  left: 0;
  line-height: 1;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: left 0.12s ease;
  width: 76px;
  z-index: 2;
}

.x-login__slider-captcha.is-verified .x-login__slider-track {
  background: #dff8ea;
}

.x-login__slider-captcha.is-verified .x-login__slider-tip,
.x-login__slider-captcha.is-verified .x-login__slider-thumb {
  color: #ffffff;
}

.x-login__slider-bars {
  display: inline-flex;
  gap: 8px;
}

.x-login__slider-bars i {
  background: currentColor;
  border-radius: 999px;
  display: block;
  height: 22px;
  width: 3px;
}

.x-login__captcha-tools {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
}

.x-login__captcha-tool {
  align-items: center;
  background: transparent;
  border: 0;
  color: #c7c7c7;
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  padding: 0;
  width: 32px;
}

.x-login__captcha-tool:hover {
  color: var(--x-login-accent);
}

.x-login__captcha-refresh,
.x-login__letter-card,
.x-login__minor-button {
  align-items: center;
  background: var(--x-login-accent-soft);
  border: 1px solid #abd8e0;
  border-radius: 12px;
  color: var(--x-login-accent);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 700;
  height: 40px;
  justify-content: center;
  padding: 0 14px;
  white-space: nowrap;
}

.x-login__captcha-refresh {
  justify-self: end;
}

.x-login__letter-card {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 18px;
  height: 44px;
  letter-spacing: 0.22em;
  min-width: 112px;
}

.x-login__minor-button {
  height: 44px;
  min-width: 112px;
}

.x-login__submit {
  align-items: center;
  background: linear-gradient(135deg, var(--x-login-accent), #167d89);
  border: 0;
  border-radius: 14px;
  box-shadow: 0 14px 24px rgba(11, 74, 82, 0.22);
  color: var(--x-login-button-text);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 800;
  gap: 10px;
  height: 46px;
  justify-content: center;
  width: 100%;
}

.x-login__actions {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
}

.x-login__register-tip {
  align-items: center;
  color: var(--x-login-muted);
  display: inline-flex;
  font-size: 13px;
  gap: 4px;
  margin: 0;
}

.x-login__link-button,
.x-login__wechat {
  align-items: center;
  background: transparent;
  border: 0;
  color: var(--x-login-accent);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 700;
  gap: 8px;
  padding: 0;
}

.x-login__wechat-logo {
  display: inline-block;
  fill: currentColor;
  height: 18px;
  width: 22px;
}

.x-login__spinner {
  animation: x-login-spin 0.72s linear infinite;
  border: 2px solid rgba(255, 255, 255, 0.42);
  border-top-color: #ffffff;
  border-radius: 999px;
  height: 16px;
  width: 16px;
}

.x-login button:disabled,
.x-login input:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

@keyframes x-login-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 520px) {
  .x-login {
    padding: 22px;
  }

  .x-login__brand,
  .x-login--logo-right .x-login__brand {
    align-items: flex-start;
    flex-direction: column;
  }

  .x-login__field--inline {
    grid-template-columns: 1fr;
  }

  .x-login--label-left .x-login__field:not(.x-login__field--inline):not(.x-login__field--captcha),
  .x-login--label-left .x-login__inline-control {
    align-items: stretch;
    display: flex;
    gap: 8px;
  }

  .x-login--label-left .x-login__label {
    text-align: left;
  }

  .x-login__letter-card,
  .x-login__minor-button {
    width: 100%;
  }
}
</style>

