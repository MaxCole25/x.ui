export type RegisterLogoPosition = 'top' | 'left' | 'right'
export type RegisterLabelPosition = 'top' | 'left'
export type RegisterFontSize = number

export interface RegisterSubmitPayload {
  username: string
  displayName: string
  phone: string
  smsCode: string
  password: string
  confirmPassword: string
  agreementChecked: boolean
  letterCode: string
  imageCode: string
}

export interface RegisterProps {
  username?: string
  displayName?: string
  phone?: string
  smsCode?: string
  password?: string
  confirmPassword?: string
  agreementChecked?: boolean
  letterCode?: string
  imageCode?: string
  title?: string
  description?: string
  logoSrc?: string
  logoAlt?: string
  logoPosition?: RegisterLogoPosition
  labelPosition?: RegisterLabelPosition
  fontSize?: number
  loading?: boolean
  disabled?: boolean
  usernameLabel?: string
  displayNameLabel?: string
  phoneLabel?: string
  smsCodeLabel?: string
  passwordLabel?: string
  confirmPasswordLabel?: string
  usernamePlaceholder?: string
  displayNamePlaceholder?: string
  phonePlaceholder?: string
  smsCodePlaceholder?: string
  passwordPlaceholder?: string
  confirmPasswordPlaceholder?: string
  imageCodePlaceholder?: string
  letterCodePlaceholder?: string
  registerText?: string
  loginPromptText?: string
  loginText?: string
  smsButtonText?: string
  agreementText?: string
  imageCaptchaSrc?: string
  imageCaptchaAlt?: string
  imageCaptchaTitle?: string
  imageCaptchaTip?: string
  imageCaptchaSuccessText?: string
  letterCaptchaText?: string
  accentColor?: string
  accentSoftColor?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: string
  radius?: number | string
  width?: string
  textColor?: string
  mutedTextColor?: string
  inputBackgroundColor?: string
  buttonTextColor?: string
  enableImageCaptcha?: boolean
  enableLetterCaptcha?: boolean
  showDisplayName?: boolean
  showPhone?: boolean
  showSmsCode?: boolean
  showAgreement?: boolean
  showLogin?: boolean
}
