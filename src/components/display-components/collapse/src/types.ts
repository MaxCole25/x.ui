export type CollapseValue = string | number

export interface CollapseItem {
  name: CollapseValue
  title: string
  content?: string
  disabled?: boolean
}

export interface CollapseProps {
  modelValue?: CollapseValue | CollapseValue[]
  items?: CollapseItem[]
  accordion?: boolean
}
