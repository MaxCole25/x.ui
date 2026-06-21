import type { XSize } from '../../../_utils/size'

export type IconSelectCategoryName =
  | '全部'
  | '系统'
  | '箭头'
  | '用户'
  | '文件'
  | '媒体'
  | '编辑'
  | '设备'
  | '地图'
  | '品牌'
  | '其它'

export interface IconSelectIconInfo {
  name: string
  className: string
  category: IconSelectCategoryName
  variant: 'line' | 'fill' | 'plain'
}

export interface IconSelectProps {
  modelValue?: string
  size?: XSize
  disabled?: boolean
  readonly?: boolean
  placeholder?: string
  emptyText?: string
  iconColor?: string
  selectedIconColor?: string
  accentColor?: string
  panelHeight?: number | string
  iconSize?: number | string
}
