<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { RegisterProps, RegisterSubmitPayload } from './types'

defineOptions({
  name: 'XRegister'
})

const props = withDefaults(defineProps<RegisterProps>(), {
  username: '',
  displayName: '',
  phone: '',
  smsCode: '',
  password: '',
  confirmPassword: '',
  agreementChecked: false,
  letterCode: '',
  imageCode: '',
  title: '创建账号',
  description: '填写注册信息后即可开始使用',
  logoSrc: '',
  logoAlt: 'Logo',
  logoPosition: 'top',
  labelPosition: 'top',
  size: 'md',
  loading: false,
  disabled: false,
  usernameLabel: '用户名',
  displayNameLabel: '显示名称',
  phoneLabel: '手机号',
  smsCodeLabel: '短信验证',
  passwordLabel: '密码',
  confirmPasswordLabel: '确认密码',
  usernamePlaceholder: '请输入用户名',
  displayNamePlaceholder: '请输入显示名称',
  phonePlaceholder: '请输入手机号',
  smsCodePlaceholder: '请输入短信验证码',
  passwordPlaceholder: '请输入密码',
  confirmPasswordPlaceholder: '请再次输入密码',
  imageCodePlaceholder: '请输入图像验证码',
  letterCodePlaceholder: '请输入字母验证码',
  registerText: '注册',
  loginPromptText: '已有账号？',
  loginText: '立即登录',
  smsButtonText: '获取验证码',
  agreementText: '我已阅读并同意用户协议',
  imageCaptchaSrc: '',
  imageCaptchaAlt: '滑块图像验证',
  imageCaptchaTitle: '拖动下方滑块完成拼图',
  imageCaptchaTip: '按住滑块，拖动拼图完成验证',
  imageCaptchaSuccessText: '验证通过',
  letterCaptchaText: '',
  accentColor: '#0b4a52',
  accentSoftColor: '#e1f5f7',
  backgroundColor: '#ffffff',
  borderColor: '#cfe0e6',
  borderWidth: '1px',
  radius: '18px',
  width: '100%',
  textColor: '#12323a',
  mutedColor: '#6b7c93',
  inputBackgroundColor: '#ffffff',
  buttonTextColor: '#ffffff',
  enableImageCaptcha: false,
  enableLetterCaptcha: false,
  showDisplayName: false,
  showPhone: true,
  showSmsCode: true,
  showAgreement: true,
  showLogin: true
})

const emit = defineEmits<{
  'update:username': [value: string]
  'update:displayName': [value: string]
  'update:phone': [value: string]
  'update:smsCode': [value: string]
  'update:password': [value: string]
  'update:confirmPassword': [value: string]
  'update:agreementChecked': [value: boolean]
  'update:letterCode': [value: string]
  'update:imageCode': [value: string]
  register: [payload: RegisterSubmitPayload]
  login: []
  'send-sms-code': [phone: string]
  'refresh-image-captcha': []
  'refresh-letter-captcha': []
  'image-captcha-change': [percent: number]
  'image-captcha-success': []
}>()

const sliderTrack = ref<HTMLElement>()
const puzzleStage = ref<HTMLElement>()
const sliderPercent = ref(0)
const puzzleStageWidth = ref(0)
const isDragging = ref(false)
const isPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)
const isImageCaptchaVerified = ref(false)
let puzzleResizeObserver: ResizeObserver | undefined

const rootClasses = computed(() => [
  `x-register--${props.size}`,
  `x-register--logo-${props.logoPosition}`,
  `x-register--label-${props.labelPosition}`,
  {
    'is-loading': props.loading,
    'is-disabled': props.disabled
  }
])

const themeStyle = computed<Record<string, string>>(() => ({
  '--x-register-accent': props.accentColor,
  '--x-register-accent-soft': props.accentSoftColor,
  '--x-register-surface': props.backgroundColor,
  '--x-register-border': props.borderColor,
  '--x-register-border-width': props.borderWidth,
  '--x-register-radius': props.radius,
  '--x-register-width': props.width,
  '--x-register-text': props.textColor,
  '--x-register-muted': props.mutedColor,
  '--x-register-input-bg': props.inputBackgroundColor,
  '--x-register-button-text': props.buttonTextColor
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

function buildPayload(): RegisterSubmitPayload {
  return {
    username: props.username,
    displayName: props.displayName,
    phone: props.phone,
    smsCode: props.smsCode,
    password: props.password,
    confirmPassword: props.confirmPassword,
    agreementChecked: props.agreementChecked,
    letterCode: props.letterCode,
    imageCode: props.imageCode
  }
}

function handleRegister() {
  if (props.disabled || props.loading) {
    return
  }

  emit('register', buildPayload())
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
  <section class="x-register" :class="rootClasses" :style="themeStyle" @keydown.enter.prevent="handleRegister">
    <header class="x-register__brand">
      <div v-if="props.logoSrc || $slots.logo" class="x-register__logo-wrap">
        <slot name="logo">
          <img class="x-register__logo" :src="props.logoSrc" :alt="props.logoAlt" />
        </slot>
      </div>

      <div class="x-register__headline">
        <h2 class="x-register__title">
          <slot name="title">{{ props.title }}</slot>
        </h2>
        <p class="x-register__description">
          <slot name="description">{{ props.description }}</slot>
        </p>
      </div>
    </header>

    <form class="x-register__form" @submit.prevent="handleRegister">
      <label class="x-register__field">
        <span class="x-register__label">{{ props.usernameLabel }}</span>
        <span class="x-register__control x-register__control--prefix">
          <span class="x-register__input-icon" aria-hidden="true">
            <svg class="x-register__svg-icon" viewBox="0 0 24 24" focusable="false">
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13Z" />
            </svg>
          </span>
          <input
            class="x-register__input"
            autocomplete="username"
            :disabled="props.disabled || props.loading"
            :placeholder="props.usernamePlaceholder"
            :value="props.username"
            @input="emit('update:username', ($event.target as HTMLInputElement).value)"
          />
        </span>
      </label>

      <label v-if="props.showDisplayName" class="x-register__field">
        <span class="x-register__label">{{ props.displayNameLabel }}</span>
        <input
          class="x-register__input"
          autocomplete="name"
          :disabled="props.disabled || props.loading"
          :placeholder="props.displayNamePlaceholder"
          :value="props.displayName"
          @input="emit('update:displayName', ($event.target as HTMLInputElement).value)"
        />
      </label>

      <label v-if="props.showPhone" class="x-register__field">
        <span class="x-register__label">{{ props.phoneLabel }}</span>
        <input
          class="x-register__input"
          autocomplete="tel"
          :disabled="props.disabled || props.loading"
          :placeholder="props.phonePlaceholder"
          :value="props.phone"
          @input="emit('update:phone', ($event.target as HTMLInputElement).value)"
        />
      </label>

      <div v-if="props.showSmsCode" class="x-register__field x-register__field--inline">
        <label class="x-register__inline-control">
          <span class="x-register__label">{{ props.smsCodeLabel }}</span>
          <input
            class="x-register__input"
            autocomplete="one-time-code"
            :disabled="props.disabled || props.loading"
            :placeholder="props.smsCodePlaceholder"
            :value="props.smsCode"
            @input="emit('update:smsCode', ($event.target as HTMLInputElement).value)"
          />
        </label>
        <button class="x-register__minor-button" type="button" :disabled="props.disabled || props.loading" @click="emit('send-sms-code', props.phone)">
          {{ props.smsButtonText }}
        </button>
      </div>

      <label class="x-register__field">
        <span class="x-register__label">{{ props.passwordLabel }}</span>
        <span class="x-register__control x-register__control--prefix x-register__control--suffix">
          <span class="x-register__input-icon" aria-hidden="true">
            <svg class="x-register__svg-icon" viewBox="0 0 24 24" focusable="false">
              <path d="M18 8H20C20.5523 8 21 8.44772 21 9V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V9C3 8.44772 3.44772 8 4 8H6V7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7V8ZM16 8V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V8H16Z" />
            </svg>
          </span>
          <input
            class="x-register__input"
            autocomplete="new-password"
            :disabled="props.disabled || props.loading"
            :placeholder="props.passwordPlaceholder"
            :type="isPasswordVisible ? 'text' : 'password'"
            :value="props.password"
            @input="emit('update:password', ($event.target as HTMLInputElement).value)"
          />
          <button
            class="x-register__eye"
            type="button"
            :aria-label="isPasswordVisible ? '隐藏密码' : '显示密码'"
            :disabled="props.disabled || props.loading"
            @blur="isPasswordVisible = false"
            @mouseleave="isPasswordVisible = false"
            @pointercancel="isPasswordVisible = false"
            @pointerdown.prevent="isPasswordVisible = true"
            @pointerup="isPasswordVisible = false"
          >
            <svg v-if="isPasswordVisible" class="x-register__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z" />
            </svg>
            <svg v-else class="x-register__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z" />
            </svg>
          </button>
        </span>
      </label>

      <label class="x-register__field">
        <span class="x-register__label">{{ props.confirmPasswordLabel }}</span>
        <span class="x-register__control x-register__control--prefix x-register__control--suffix">
          <span class="x-register__input-icon" aria-hidden="true">
            <svg class="x-register__svg-icon" viewBox="0 0 24 24" focusable="false">
              <path d="M9 12.75L11.25 15L15.5 9.5L17.08 10.72L11.42 18.03L7.59 14.2L9 12.75ZM12 2L20 5V11C20 16.55 16.16 21.74 12 23C7.84 21.74 4 16.55 4 11V5L12 2Z" />
            </svg>
          </span>
          <input
            class="x-register__input"
            autocomplete="new-password"
            :disabled="props.disabled || props.loading"
            :placeholder="props.confirmPasswordPlaceholder"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            :value="props.confirmPassword"
            @input="emit('update:confirmPassword', ($event.target as HTMLInputElement).value)"
          />
          <button
            class="x-register__eye"
            type="button"
            :aria-label="isConfirmPasswordVisible ? '隐藏确认密码' : '显示确认密码'"
            :disabled="props.disabled || props.loading"
            @blur="isConfirmPasswordVisible = false"
            @mouseleave="isConfirmPasswordVisible = false"
            @pointercancel="isConfirmPasswordVisible = false"
            @pointerdown.prevent="isConfirmPasswordVisible = true"
            @pointerup="isConfirmPasswordVisible = false"
          >
            <svg v-if="isConfirmPasswordVisible" class="x-register__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968ZM5.9356 7.3497C4.60673 8.56015 3.6378 10.1672 3.22278 12.0002C4.14022 16.0521 7.7646 19.0002 12.0003 19.0002C13.5997 19.0002 15.112 18.5798 16.4243 17.8384L14.396 15.8101C13.7023 16.2472 12.8808 16.5002 12.0003 16.5002C9.51498 16.5002 7.50026 14.4854 7.50026 12.0002C7.50026 11.1196 7.75317 10.2981 8.19031 9.60442L5.9356 7.3497ZM12.9139 14.328L9.67246 11.0866C9.5613 11.3696 9.50026 11.6777 9.50026 12.0002C9.50026 13.3809 10.6196 14.5002 12.0003 14.5002C12.3227 14.5002 12.6309 14.4391 12.9139 14.328ZM20.8068 16.5925L19.376 15.1617C20.0319 14.2268 20.5154 13.1586 20.7777 12.0002C19.8603 7.94818 16.2359 5.00016 12.0003 5.00016C11.1544 5.00016 10.3329 5.11773 9.55249 5.33818L7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925ZM11.7229 7.50857C11.8146 7.50299 11.9071 7.50016 12.0003 7.50016C14.4855 7.50016 16.5003 9.51488 16.5003 12.0002C16.5003 12.0933 16.4974 12.1858 16.4919 12.2775L11.7229 7.50857Z" />
            </svg>
            <svg v-else class="x-register__svg-icon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
              <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z" />
            </svg>
          </button>
        </span>
      </label>

      <div v-if="props.enableImageCaptcha" class="x-register__field x-register__field--captcha">
        <div class="x-register__slider-captcha" :class="{ 'is-verified': isImageCaptchaVerified }">
          <div class="x-register__captcha-title">{{ props.imageCaptchaTitle }}</div>
          <div ref="puzzleStage" class="x-register__puzzle-stage">
            <slot name="image-captcha">
              <img v-if="props.imageCaptchaSrc" class="x-register__puzzle-image" :src="props.imageCaptchaSrc" :alt="props.imageCaptchaAlt" />
              <div v-else class="x-register__puzzle-fallback">
                <span class="x-register__puzzle-cloud" />
                <span class="x-register__puzzle-wave" />
              </div>
            </slot>
            <span class="x-register__puzzle-gap" aria-hidden="true" />
            <span class="x-register__puzzle-piece" :style="puzzleStyle" aria-hidden="true" />
          </div>
          <div ref="sliderTrack" class="x-register__slider-track" @pointerdown.prevent="startSlider">
            <span class="x-register__slider-fill" :style="{ width: `${sliderPercent}%` }" />
            <span class="x-register__slider-tip">{{ isImageCaptchaVerified ? props.imageCaptchaSuccessText : props.imageCaptchaTip }}</span>
            <button class="x-register__slider-thumb" type="button" :style="sliderStyle" :disabled="props.disabled || props.loading || isImageCaptchaVerified">
              <span v-if="isImageCaptchaVerified" aria-hidden="true">✓</span>
              <span v-else class="x-register__slider-bars" aria-hidden="true"><i /><i /><i /></span>
            </button>
          </div>
          <button class="x-register__captcha-refresh" type="button" :disabled="props.disabled || props.loading" @click="resetImageCaptcha">
            刷新验证
          </button>
        </div>
      </div>

      <div v-if="props.enableLetterCaptcha" class="x-register__field x-register__field--inline">
        <label class="x-register__inline-control">
          <span class="x-register__label">字母识别</span>
          <input
            class="x-register__input"
            :disabled="props.disabled || props.loading"
            :placeholder="props.letterCodePlaceholder"
            :value="props.letterCode"
            @input="emit('update:letterCode', ($event.target as HTMLInputElement).value)"
          />
        </label>
        <button class="x-register__letter-card" type="button" :disabled="props.disabled || props.loading" @click="emit('refresh-letter-captcha')">
          <slot name="letter-captcha">
            {{ props.letterCaptchaText || 'A7KQ' }}
          </slot>
        </button>
      </div>

      <label v-if="props.showAgreement" class="x-register__agreement">
        <input
          class="x-register__agreement-input"
          type="checkbox"
          :checked="props.agreementChecked"
          :disabled="props.disabled || props.loading"
          @change="emit('update:agreementChecked', ($event.target as HTMLInputElement).checked)"
        />
        <span class="x-register__agreement-box" aria-hidden="true">
          <svg class="x-register__agreement-check" viewBox="0 0 16 16" focusable="false">
            <path d="M6.3 11.6L2.9 8.2L4.3 6.8L6.3 8.8L11.7 3.4L13.1 4.8L6.3 11.6Z" />
          </svg>
        </span>
        <span class="x-register__agreement-text">
          <slot name="agreement">{{ props.agreementText }}</slot>
        </span>
      </label>

      <slot name="extra" />

      <button class="x-register__submit" type="submit" :disabled="props.disabled || props.loading">
        <span v-if="props.loading" class="x-register__spinner" aria-hidden="true" />
        <span>{{ props.loading ? '注册中...' : props.registerText }}</span>
      </button>

      <div class="x-register__actions">
        <p v-if="props.showLogin" class="x-register__login-tip">
          <span>{{ props.loginPromptText }}</span>
          <button class="x-register__link-button" type="button" :disabled="props.disabled || props.loading" @click="emit('login')">
            {{ props.loginText }}
          </button>
        </p>
      </div>

      <slot name="footer" />
    </form>
  </section>
</template>

<style scoped>
.x-register {
  --x-register-accent: #0b4a52;
  --x-register-accent-soft: #e1f5f7;
  --x-register-border: #cfe0e6;
  --x-register-border-width: 1px;
  --x-register-radius: 18px;
  --x-register-width: 100%;
  --x-register-muted: #6b7c93;
  --x-register-text: #12323a;
  --x-register-surface: #ffffff;
  --x-register-input-bg: #ffffff;
  --x-register-button-text: #ffffff;
  background: linear-gradient(145deg, var(--x-register-surface) 0%, #f6fbfc 100%);
  border: var(--x-register-border-width) solid var(--x-register-border);
  border-radius: var(--x-register-radius);
  box-shadow: 0 20px 60px rgba(11, 74, 82, 0.14);
  box-sizing: border-box;
  color: var(--x-register-text);
  display: flex;
  flex-direction: column;
  gap: 22px;
  max-width: 100%;
  padding: 32px;
  width: var(--x-register-width);
}

.x-register--sm {
  padding: 24px;
}

.x-register--lg {
  padding: 40px;
}

.x-register__brand {
  align-items: center;
  display: flex;
  gap: 18px;
  width: 100%;
}

.x-register--logo-top .x-register__brand {
  flex-direction: column;
  text-align: center;
}

.x-register--logo-right .x-register__brand {
  flex-direction: row-reverse;
}

.x-register__logo-wrap {
  align-items: center;
  background: linear-gradient(135deg, var(--x-register-accent), #1e6b73);
  border-radius: 18px;
  display: inline-flex;
  flex: 0 0 auto;
  height: 64px;
  justify-content: center;
  overflow: hidden;
  width: 64px;
}

.x-register__logo {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.x-register__headline {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
}

.x-register__title {
  color: var(--x-register-text);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1.2;
  margin: 0;
}

.x-register__description {
  color: var(--x-register-muted);
  font-size: 14px;
  line-height: 1.7;
  margin: 8px 0 0;
}

.x-register__form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.x-register__field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  width: 100%;
}

.x-register--label-left .x-register__field:not(.x-register__field--inline):not(.x-register__field--captcha),
.x-register--label-left .x-register__inline-control {
  align-items: center;
  display: grid;
  gap: 10px;
  grid-template-columns: 72px minmax(0, 1fr);
}

.x-register__field--inline {
  align-items: flex-end;
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(0, 1fr) auto;
}

.x-register__inline-control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.x-register__label {
  color: #264d57;
  font-size: 13px;
  font-weight: 700;
}

.x-register__control {
  display: flex;
  position: relative;
  width: 100%;
}

.x-register__input-icon,
.x-register__eye {
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

.x-register__input-icon {
  left: 0;
}

.x-register__eye {
  background: transparent;
  border: 0;
  cursor: pointer;
  font: inherit;
  right: 0;
}

.x-register__svg-icon {
  display: block;
  fill: currentColor;
  height: 18px;
  width: 18px;
}

.x-register__input {
  background: color-mix(in srgb, var(--x-register-input-bg) 92%, transparent);
  border: 1px solid var(--x-register-border);
  border-radius: 12px;
  box-sizing: border-box;
  color: var(--x-register-text);
  font: inherit;
  height: 44px;
  outline: none;
  padding: 0 14px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  width: 100%;
}

.x-register__control--prefix .x-register__input {
  padding-left: 42px;
}

.x-register__control--suffix .x-register__input {
  padding-right: 42px;
}

.x-register__input:focus {
  background: var(--x-register-input-bg);
  border-color: #3aa6b5;
  box-shadow: 0 0 0 4px rgba(58, 166, 181, 0.16);
}

.x-register__minor-button,
.x-register__letter-card,
.x-register__captcha-refresh {
  align-items: center;
  background: var(--x-register-accent-soft);
  border: 1px solid #abd8e0;
  border-radius: 12px;
  color: var(--x-register-accent);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 700;
  height: 44px;
  justify-content: center;
  padding: 0 14px;
  white-space: nowrap;
}

.x-register__letter-card {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 18px;
  letter-spacing: 0.22em;
  min-width: 112px;
}

.x-register__slider-captcha {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.12);
  display: grid;
  gap: 14px;
  padding: 16px;
}

.x-register__captcha-title {
  color: #111827;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.25;
}

.x-register__puzzle-stage {
  background: linear-gradient(135deg, #e7eef3, #f7f0e6);
  border-radius: 2px;
  height: 176px;
  overflow: hidden;
  position: relative;
}

.x-register__puzzle-image,
.x-register__puzzle-fallback {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.x-register__puzzle-fallback {
  background:
    radial-gradient(ellipse at 51% 44%, #ead4c0 0 8%, transparent 9%),
    radial-gradient(ellipse at 42% 58%, #f7eadf 0 22%, transparent 23%),
    linear-gradient(10deg, #84909b, #e6edf1 52%, #fcfaf6);
}

.x-register__puzzle-wave {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  bottom: -46px;
  height: 96px;
  left: 14%;
  position: absolute;
  width: 140px;
}

.x-register__puzzle-cloud {
  background: rgba(255, 255, 255, 0.72);
  border-radius: 999px;
  height: 18px;
  left: 20px;
  position: absolute;
  top: 22px;
  width: 52px;
}

.x-register__puzzle-gap,
.x-register__puzzle-piece {
  height: 50px;
  position: absolute;
  top: 50px;
  width: 50px;
}

.x-register__puzzle-gap {
  background: rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.52), 0 1px 3px rgba(0, 0, 0, 0.28);
  right: 52px;
}

.x-register__puzzle-piece {
  background-color: rgba(255, 255, 255, 0.9);
  background-position: 18px 50px;
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.32);
  left: 30px;
  transition: transform 0.12s ease;
}

.x-register__slider-track {
  align-items: center;
  background: #e5e5e5;
  border-radius: 999px;
  cursor: grab;
  display: flex;
  height: 28px;
  margin: 8px 0 0;
  overflow: visible;
  position: relative;
  user-select: none;
}

.x-register__slider-fill {
  background: rgba(52, 199, 89, 0.2);
  border-radius: 999px;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
}

.x-register__slider-tip {
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

.x-register__slider-thumb {
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

.x-register__slider-captcha.is-verified .x-register__slider-track {
  background: #dff8ea;
}

.x-register__slider-bars {
  display: inline-flex;
  gap: 8px;
}

.x-register__slider-bars i {
  background: currentColor;
  border-radius: 999px;
  display: block;
  height: 22px;
  width: 3px;
}

.x-register__agreement {
  align-items: center;
  color: var(--x-register-muted);
  cursor: pointer;
  display: inline-flex;
  font-size: 13px;
  gap: 8px;
  line-height: 1.4;
  user-select: none;
  width: fit-content;
}

.x-register__agreement-input {
  height: 1px;
  opacity: 0;
  position: absolute;
  width: 1px;
}

.x-register__agreement-box {
  align-items: center;
  background: var(--x-register-input-bg);
  border: 1px solid var(--x-register-border);
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

.x-register__agreement-check {
  display: block;
  fill: currentColor;
  height: 13px;
  opacity: 0;
  width: 13px;
}

.x-register__agreement-input:checked + .x-register__agreement-box {
  background: var(--x-register-accent);
  border-color: var(--x-register-accent);
}

.x-register__agreement-input:checked + .x-register__agreement-box .x-register__agreement-check {
  opacity: 1;
}

.x-register__submit {
  align-items: center;
  background: linear-gradient(135deg, var(--x-register-accent), #167d89);
  border: 0;
  border-radius: 14px;
  box-shadow: 0 14px 24px rgba(11, 74, 82, 0.22);
  color: var(--x-register-button-text);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 800;
  gap: 10px;
  height: 46px;
  justify-content: center;
  width: 100%;
}

.x-register__actions {
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
}

.x-register__login-tip {
  align-items: center;
  color: var(--x-register-muted);
  display: inline-flex;
  font-size: 13px;
  gap: 4px;
  margin: 0;
}

.x-register__link-button {
  align-items: center;
  background: transparent;
  border: 0;
  color: var(--x-register-accent);
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  font-weight: 700;
  padding: 0;
}

.x-register__spinner {
  animation: x-register-spin 0.72s linear infinite;
  border: 2px solid rgba(255, 255, 255, 0.42);
  border-radius: 999px;
  border-top-color: #ffffff;
  height: 16px;
  width: 16px;
}

.x-register button:disabled,
.x-register input:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

@keyframes x-register-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 520px) {
  .x-register {
    padding: 22px;
  }

  .x-register__brand,
  .x-register--logo-right .x-register__brand {
    align-items: flex-start;
    flex-direction: column;
  }

  .x-register__field--inline {
    grid-template-columns: 1fr;
  }

  .x-register--label-left .x-register__field:not(.x-register__field--inline):not(.x-register__field--captcha),
  .x-register--label-left .x-register__inline-control {
    align-items: stretch;
    display: flex;
    gap: 8px;
  }

  .x-register__letter-card,
  .x-register__minor-button {
    width: 100%;
  }
}
</style>
