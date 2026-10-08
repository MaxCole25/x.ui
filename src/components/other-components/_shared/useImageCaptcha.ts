import { onBeforeUnmount, ref } from 'vue'

interface CaptchaEmit {
  (event: 'update:imageCode', value: string): void
  (event: 'image-captcha-change', value: number): void
  (event: 'image-captcha-success'): void
  (event: 'refresh-image-captcha'): void
}

export function useImageCaptcha(props: { disabled?: boolean; loading?: boolean }, emit: CaptchaEmit) {
const sliderTrack = ref<HTMLElement>()
const sliderPercent = ref(0)
const isDragging = ref(false)
const isImageCaptchaVerified = ref(false)
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
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  window.removeEventListener('pointerup', finishSlider)
})
return { sliderTrack, sliderPercent, isImageCaptchaVerified, startSlider, resetImageCaptcha }
}
