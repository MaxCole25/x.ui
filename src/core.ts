import type { App, Plugin } from 'vue'
import { XAvatar } from './components/display-components/avatar'
import { XBaseInput } from './components/basic-components/base-input'
import { XButton } from './components/basic-components/button'
import { XButtonGroup } from './components/basic-components/button-group'
import { XBrick, XBrickItem } from './components/basic-components/brick'
import { XCheckbox } from './components/form-components/checkbox'
import { XDateTimePicker } from './components/form-components/date-time-picker'
import { XDialog } from './components/feedback-components/dialog'
import { XDropdown } from './components/navigation-components/dropdown'
import { XDropdownItem } from './components/navigation-components/dropdown-item'
import { XDropdownMenu } from './components/navigation-components/dropdown-menu'
import { XEmpty } from './components/display-components/empty'
import { XForm, XFormItem } from './components/form-components/form'
import { XGrid, XGridItem } from './components/basic-components/grid'
import { XIcon } from './components/basic-components/icon'
import { XInput } from './components/form-components/input'
import { XLogin } from './components/other-components/login'
import { XMessage, XMessageComponent } from './components/feedback-components/message'
import { XOption, XSelect } from './components/form-components/select'
import { XSwitch } from './components/form-components/switch'
import { XTabs } from './components/navigation-components/tabs'
import { XTooltip } from './components/feedback-components/tooltip'
import { XTree } from './components/display-components/tree'

export { componentSizeOptions, componentSizePreset } from './components/_utils/size'
export type { ComponentSizePreset, XSize } from './components/_utils/size'
export { overlayZIndex } from './components/_utils/zIndex'
export type { OverlayZIndexName } from './components/_utils/zIndex'

export { XAvatar }
export { XBaseInput }
export { XButton }
export { XButtonGroup }
export { XBrick }
export { XBrickItem }
export { XCheckbox }
export { XDateTimePicker }
export { XDialog }
export { XDropdown }
export { XDropdownItem }
export { XDropdownMenu }
export { XEmpty }
export { XForm }
export { XFormItem }
export { XGrid }
export { XGridItem }
export { XIcon }
export { iconAliases } from './components/basic-components/icon'
export { XInput }
export { XLogin }
export { XMessage, XMessageComponent }
export { XOption }
export { XSelect }
export { XSwitch }
export { XTabs }
export { XTooltip }
export { XTree }

export type { AvatarProps, AvatarShape, AvatarSize } from './components/display-components/avatar'
export type { BaseInputProps, BaseInputSize, BaseInputStatus, BaseInputTextAlign, BaseInputType } from './components/basic-components/base-input'
export type { BrickDirection, BrickItemOverflow, BrickItemProps, BrickProps, BrickSize } from './components/basic-components/brick'
export type { ButtonProps, ButtonVariant } from './components/basic-components/button'
export type { ButtonGroupDirection, ButtonGroupProps } from './components/basic-components/button-group'
export type { CheckboxProps, CheckboxSize } from './components/form-components/checkbox'
export type { DateTimePickerProps } from './components/form-components/date-time-picker'
export type { DialogProps } from './components/feedback-components/dialog'
export type { DropdownItemProps } from './components/navigation-components/dropdown-item'
export type { DropdownMenuProps } from './components/navigation-components/dropdown-menu'
export type { DropdownPlacement, DropdownProps, DropdownTrigger } from './components/navigation-components/dropdown'
export type { EmptyProps } from './components/display-components/empty'
export type {
  FormControlSize,
  FormExpose,
  FormItemAlign,
  FormItemClass,
  FormItemContentJustify,
  FormItemHorizontalAlign,
  FormItemProps,
  FormItemRule,
  FormItemStyle,
  FormLabelPosition,
  FormProps,
  FormPublicSize,
  FormRules,
  FormSize,
  FormValidateCallback,
  FormValidateFieldMethod,
  FormValidateMethod,
  FormValidateResult
} from './components/form-components/form'
export type { GridAlign, GridItemOverflow, GridItemProps, GridProps, GridSize } from './components/basic-components/grid'
export type { IconProps, IconSize, IconVariant } from './components/basic-components/icon'
export type { InputProps, InputSize, InputTextAlign, InputType } from './components/form-components/input'
export type { LoginLabelPosition, LoginLogoPosition, LoginProps, LoginSize, LoginSubmitPayload } from './components/other-components/login'
export type { MessageHandler, MessageOptions, MessagePlacement, MessageProps, MessageType } from './components/feedback-components/message'
export type {
  SelectOption,
  SelectOptionValue,
  SelectProps
} from './components/form-components/select'
export type { SwitchLabelPosition, SwitchProps, SwitchSize } from './components/form-components/switch'
export type { TabItem, TabName, TabPosition, TabsLabelDirection, TabsCloseAllPayload, TabsCloseOthersPayload, TabsEditAction, TabsPaneContext, TabsProps, TabsReorderPayload, TabsReorderPosition, TabsType } from './components/navigation-components/tabs'
export type { TooltipPlacement, TooltipProps, TooltipTrigger } from './components/feedback-components/tooltip'
export type {
  TreeContextAction,
  TreeContextMenuContext,
  TreeContextMenuItem,
  TreeContextMenuItems,
  TreeCreateNode,
  TreeCreateRootNode,
  TreeDeleteNode,
  TreeNodeData,
  TreeProps
} from './components/display-components/tree'

const components = [
  XAvatar,
  XBaseInput,
  XButton,
  XButtonGroup,
  XBrick,
  XBrickItem,
  XCheckbox,
  XDateTimePicker,
  XDialog,
  XDropdown,
  XDropdownItem,
  XDropdownMenu,
  XEmpty,
  XForm,
  XFormItem,
  XGrid,
  XGridItem,
  XIcon,
  XInput,
  XLogin,
  XOption,
  XSelect,
  XSwitch,
  XTabs,
  XTooltip,
  XTree
]

const XUiCore: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component)
    })
    app.component(XMessageComponent.name!, XMessageComponent)
    app.config.globalProperties.$message = XMessage
  }
}

export default XUiCore
