export interface StatisticProps {
  modelValue?: string | number
  title?: string
  precision?: number
  prefix?: string
  suffix?: string
  formatter?: (value: string | number) => string
  valueColor?: string
  titleColor?: string
}
