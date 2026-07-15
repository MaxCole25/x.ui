export type LoginLogoPosition = 'top' | 'left' | 'right'
export type LoginLabelPosition = 'top' | 'left'
export type LoginSize = 'sm' | 'md' | 'lg'

export interface LoginSubmitPayload {
  username: string
  password: string
  remember: boolean
  imageCode: string
  letterCode: string
  phone: string
  smsCode: string
}

export interface LoginProps {
  username?: string
  password?: string
  remember?: boolean
  imageCode?: string
  letterCode?: string
  phone?: string
  smsCode?: string
  title?: string
  description?: string
  logoSrc?: string
  logoAlt?: string
  logoPosition?: LoginLogoPosition
  labelPosition?: LoginLabelPosition
  size?: LoginSize
  loading?: boolean
  disabled?: boolean
  usernameLabel?: string
  passwordLabel?: string
  usernamePlaceholder?: string
  passwordPlaceholder?: string
  imageCodePlaceholder?: string
  letterCodePlaceholder?: string
  phonePlaceholder?: string
  smsCodePlaceholder?: string
  loginText?: string
  registerPromptText?: string
  registerText?: string
  smsButtonText?: string
  wechatText?: string
  rememberText?: string
  imageCaptchaSrc?: string
  imageCaptchaAlt?: string
  imageCaptchaTitle?: string
  imageCaptchaTip?: string
  imageCaptchaSuccessText?: string
  accentColor?: string
  accentSoftColor?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  radius?: string
  width?: string
  textColor?: string
  mutedTextColor?: string
  inputBackgroundColor?: string
  buttonTextColor?: string
  letterCaptchaText?: string
  enableImageCaptcha?: boolean
  enableLetterCaptcha?: boolean
  enableWechatLogin?: boolean
  enableSmsLogin?: boolean
  showRemember?: boolean
  showRegister?: boolean
}


