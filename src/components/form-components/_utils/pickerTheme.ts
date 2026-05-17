import { toCssSize } from '../../_utils/elementStyle'

export interface PickerPanelThemeProps {
  panelBackgroundColor?: string
  panelTextColor?: string
  panelMutedTextColor?: string
  panelBorderColor?: string
  panelHeaderTextColor?: string
  panelShadow?: string
  panelCloseIconColor?: string
  panelCloseIconHoverColor?: string
}

export interface PickerToolbarThemeProps {
  panelToolBackgroundColor?: string
  panelToolTextColor?: string
  panelToolBorderColor?: string
  panelToolHoverBackgroundColor?: string
  panelToolHoverTextColor?: string
  panelToolHoverBorderColor?: string
  panelCurrentTextColor?: string
}

export interface PickerDayThemeProps {
  panelWeekTextColor?: string
  panelDayTextColor?: string
  panelDayHoverBackgroundColor?: string
  panelDayHoverTextColor?: string
  panelDayActiveBackgroundColor?: string
  panelDayActiveTextColor?: string
  panelDayDisabledTextColor?: string
  panelDayRadius?: number | string
}

export interface PickerFestivalThemeProps {
  festivalBackgroundColor?: string
  festivalTextColor?: string
  festivalBadgeBackgroundColor?: string
  festivalBadgeTextColor?: string
  solarTermBackgroundColor?: string
  solarTermTextColor?: string
  solarTermBadgeBackgroundColor?: string
  solarTermBadgeTextColor?: string
  customFestivalBackgroundColor?: string
  customFestivalTextColor?: string
  customFestivalBadgeBackgroundColor?: string
  customFestivalBadgeTextColor?: string
  panelDayMarkedHoverBackgroundColor?: string
  panelDayMarkedHoverTextColor?: string
  panelDayMarkedActiveBackgroundColor?: string
  panelDayMarkedActiveTextColor?: string
  panelDayMarkedBadgeHoverBackgroundColor?: string
  panelDayMarkedBadgeHoverTextColor?: string
}

export interface PickerTimeThemeProps {
  timePanelBackgroundColor?: string
  timePanelBorderColor?: string
  timeColumnLabelColor?: string
  timeOptionTextColor?: string
  timeOptionHoverTextColor?: string
  timeOptionActiveTextColor?: string
  timeOptionActiveBackgroundColor?: string
  timeOptionSelectionBackgroundColor?: string
  timeOptionSelectionBorderColor?: string
  timeColumnMaskTopColor?: string
  timeColumnMaskMiddleColor?: string
  timeColumnMaskBottomColor?: string
}

export interface PickerButtonThemeProps {
  panelPrimaryButtonBackgroundColor?: string
  panelPrimaryButtonTextColor?: string
  panelPrimaryButtonHoverBackgroundColor?: string
  panelSecondaryButtonBackgroundColor?: string
  panelSecondaryButtonTextColor?: string
  panelSecondaryButtonBorderColor?: string
  panelSecondaryButtonHoverBackgroundColor?: string
  panelSecondaryButtonHoverTextColor?: string
  panelSecondaryButtonHoverBorderColor?: string
}

export interface PickerCalendarThemeProps extends PickerDayThemeProps, PickerFestivalThemeProps {}

export interface PickerPopupThemeProps
  extends PickerPanelThemeProps,
    PickerToolbarThemeProps,
    PickerCalendarThemeProps,
    PickerButtonThemeProps {}

export interface PickerTimePopupThemeProps extends PickerPanelThemeProps, PickerTimeThemeProps, PickerButtonThemeProps {}

export interface PickerDateTimePopupThemeProps extends PickerPopupThemeProps, PickerTimeThemeProps {}

export type PickerThemeProps = PickerDateTimePopupThemeProps

const pickerThemeVarMap = [
  ['panelBackgroundColor', '--x-picker-panel-bg'],
  ['panelTextColor', '--x-picker-panel-text'],
  ['panelMutedTextColor', '--x-picker-panel-muted-text'],
  ['panelBorderColor', '--x-picker-panel-border'],
  ['panelHeaderTextColor', '--x-picker-panel-header-text'],
  ['panelShadow', '--x-picker-panel-shadow'],
  ['panelCloseIconColor', '--x-picker-panel-close-icon'],
  ['panelCloseIconHoverColor', '--x-picker-panel-close-icon-hover'],
  ['panelToolBackgroundColor', '--x-picker-tool-bg'],
  ['panelToolTextColor', '--x-picker-tool-text'],
  ['panelToolBorderColor', '--x-picker-tool-border'],
  ['panelToolHoverBackgroundColor', '--x-picker-tool-hover-bg'],
  ['panelToolHoverTextColor', '--x-picker-tool-hover-text'],
  ['panelToolHoverBorderColor', '--x-picker-tool-hover-border'],
  ['panelCurrentTextColor', '--x-picker-current-text'],
  ['panelWeekTextColor', '--x-picker-week-text'],
  ['panelDayTextColor', '--x-picker-day-text'],
  ['panelDayHoverBackgroundColor', '--x-picker-day-hover-bg'],
  ['panelDayHoverTextColor', '--x-picker-day-hover-text'],
  ['panelDayActiveBackgroundColor', '--x-picker-day-active-bg'],
  ['panelDayActiveTextColor', '--x-picker-day-active-text'],
  ['panelDayDisabledTextColor', '--x-picker-day-disabled-text'],
  ['festivalBackgroundColor', '--x-picker-festival-bg'],
  ['festivalTextColor', '--x-picker-festival-text'],
  ['festivalBadgeBackgroundColor', '--x-picker-festival-badge-bg'],
  ['festivalBadgeTextColor', '--x-picker-festival-badge-text'],
  ['solarTermBackgroundColor', '--x-picker-solar-term-bg'],
  ['solarTermTextColor', '--x-picker-solar-term-text'],
  ['solarTermBadgeBackgroundColor', '--x-picker-solar-term-badge-bg'],
  ['solarTermBadgeTextColor', '--x-picker-solar-term-badge-text'],
  ['customFestivalBackgroundColor', '--x-picker-custom-festival-bg'],
  ['customFestivalTextColor', '--x-picker-custom-festival-text'],
  ['customFestivalBadgeBackgroundColor', '--x-picker-custom-festival-badge-bg'],
  ['customFestivalBadgeTextColor', '--x-picker-custom-festival-badge-text'],
  ['panelDayMarkedHoverBackgroundColor', '--x-picker-day-marked-hover-bg'],
  ['panelDayMarkedHoverTextColor', '--x-picker-day-marked-hover-text'],
  ['panelDayMarkedActiveBackgroundColor', '--x-picker-day-marked-active-bg'],
  ['panelDayMarkedActiveTextColor', '--x-picker-day-marked-active-text'],
  ['panelDayMarkedBadgeHoverBackgroundColor', '--x-picker-day-marked-badge-hover-bg'],
  ['panelDayMarkedBadgeHoverTextColor', '--x-picker-day-marked-badge-hover-text'],
  ['timePanelBackgroundColor', '--x-picker-time-bg'],
  ['timePanelBorderColor', '--x-picker-time-border'],
  ['timeColumnLabelColor', '--x-picker-time-label-text'],
  ['timeOptionTextColor', '--x-picker-time-option-text'],
  ['timeOptionHoverTextColor', '--x-picker-time-option-hover-text'],
  ['timeOptionActiveTextColor', '--x-picker-time-option-active-text'],
  ['timeOptionActiveBackgroundColor', '--x-picker-time-option-active-bg'],
  ['timeOptionSelectionBackgroundColor', '--x-picker-time-selection-bg'],
  ['timeOptionSelectionBorderColor', '--x-picker-time-selection-border'],
  ['timeColumnMaskTopColor', '--x-picker-time-mask-top'],
  ['timeColumnMaskMiddleColor', '--x-picker-time-mask-middle'],
  ['timeColumnMaskBottomColor', '--x-picker-time-mask-bottom'],
  ['panelPrimaryButtonBackgroundColor', '--x-picker-primary-button-bg'],
  ['panelPrimaryButtonTextColor', '--x-picker-primary-button-text'],
  ['panelPrimaryButtonHoverBackgroundColor', '--x-picker-primary-button-hover-bg'],
  ['panelSecondaryButtonBackgroundColor', '--x-picker-secondary-button-bg'],
  ['panelSecondaryButtonTextColor', '--x-picker-secondary-button-text'],
  ['panelSecondaryButtonBorderColor', '--x-picker-secondary-button-border'],
  ['panelSecondaryButtonHoverBackgroundColor', '--x-picker-secondary-button-hover-bg'],
  ['panelSecondaryButtonHoverTextColor', '--x-picker-secondary-button-hover-text'],
  ['panelSecondaryButtonHoverBorderColor', '--x-picker-secondary-button-hover-border']
] as const

export const pickerThemePropKeys = [
  ...pickerThemeVarMap.map(([prop]) => prop),
  'panelDayRadius'
] as Array<keyof PickerThemeProps>

export const createPickerThemeVars = (props: Partial<PickerThemeProps>) => {
  const vars: Record<string, string | undefined> = {}

  pickerThemeVarMap.forEach(([prop, variable]) => {
    vars[variable] = props[prop]
  })
  vars['--x-picker-day-radius'] = toCssSize(props.panelDayRadius)

  return vars
}

export const omitPickerThemeProps = (target: Record<string, unknown>) => {
  pickerThemePropKeys.forEach((key) => {
    delete target[key]
  })

  return target
}

export const pickPickerThemeProps = (props: Partial<PickerThemeProps>) => {
  const picked: Partial<PickerThemeProps> = {}

  pickerThemePropKeys.forEach((key) => {
    if (props[key] !== undefined) {
      ;(picked as Record<string, unknown>)[key] = props[key]
    }
  })

  return picked
}
