import type { LoginProps } from '../../login/src/types'

export type LoginPagePreset = 'finance' | 'recruit' | 'retail' | 'centered' | 'split'

export type LoginPageAlign = 'start' | 'center' | 'end' | 'stretch'
export type LoginPageJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type LoginPageDirection = 'row' | 'column'
export type LoginPageBackgroundSize = 'auto' | 'cover' | 'contain'
export type LoginPageBackgroundRepeat = 'repeat' | 'no-repeat'
export type LoginPageSectionOverflow = 'visible' | 'hidden' | 'auto'

export interface LoginPageSectionConfig {
  visible?: boolean
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  height?: number | string
  minHeight?: number | string
  maxHeight?: number | string
  padding?: number | string
  gap?: number | string
  align?: LoginPageAlign
  justify?: LoginPageJustify
  direction?: LoginPageDirection
  backgroundColor?: string
  backgroundImage?: string
  backgroundSize?: LoginPageBackgroundSize | string
  backgroundPosition?: string
  backgroundRepeat?: LoginPageBackgroundRepeat
  radius?: number | string
  borderWidth?: number | string
  borderColor?: string
  textColor?: string
  overflow?: LoginPageSectionOverflow
}

export interface LoginPageProps {
  preset?: LoginPagePreset
  width?: number | string
  height?: number | string
  minHeight?: number | string
  backgroundColor?: string
  backgroundImage?: string

  header?: LoginPageSectionConfig
  footer?: LoginPageSectionConfig
  content?: LoginPageSectionConfig
  contentTop?: LoginPageSectionConfig
  contentLeft?: LoginPageSectionConfig
  contentCenter?: LoginPageSectionConfig
  contentRight?: LoginPageSectionConfig
  contentBottom?: LoginPageSectionConfig

  loginWidth?: number | string
  loginProps?: LoginProps
}
