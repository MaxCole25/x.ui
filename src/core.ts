import type { App, Plugin } from 'vue'
import { XAutocomplete } from './components/form-components/autocomplete'
import { XAvatar } from './components/display-components/avatar'
import { XBaseInput } from './components/basic-components/base-input'
import { XButton } from './components/basic-components/button'
import { XButtonGroup } from './components/basic-components/button-group'
import { XBrick, XBrickItem } from './components/basic-components/brick'
import { XCard } from './components/basic-components/card'
import { XCascader } from './components/form-components/cascader'
import { XCheckbox } from './components/form-components/checkbox'
import { XDatePicker } from './components/form-components/date-picker'
import { XDateTimePicker } from './components/form-components/date-time-picker'
import { XDialog } from './components/feedback-components/dialog'
import { XDivider } from './components/basic-components/divider'
import { XDrawer } from './components/feedback-components/drawer'
import { XDropdown } from './components/navigation-components/dropdown'
import { XDropdownItem } from './components/navigation-components/dropdown-item'
import { XDropdownMenu } from './components/navigation-components/dropdown-menu'
import { XEmpty } from './components/display-components/empty'
import { XFlow, XFlowItem } from './components/basic-components/flow'
import { XForm, XFormItem } from './components/form-components/form'
import { XGrid, XGridItem } from './components/basic-components/grid'
import { XIcon } from './components/basic-components/icon'
import { XInput } from './components/form-components/input'
import { XInputNumber } from './components/form-components/input-number'
import { XTextarea } from './components/form-components/textarea'
import { XLayout } from './components/basic-components/layout'
import { XLogin } from './components/other-components/login'
import { XMessage, XMessageComponent } from './components/feedback-components/message'
import { XNavMenu } from './components/navigation-components/nav-menu'
import { XOption, XSelect } from './components/form-components/select'
import { XScrollingText } from './components/display-components/scrolling-text'
import { XSwitch } from './components/form-components/switch'
import { XTag } from './components/display-components/tag'
import { XTabs } from './components/navigation-components/tabs'
import { XText } from './components/basic-components/text'
import { XTooltip } from './components/feedback-components/tooltip'
import { XTree } from './components/display-components/tree'

export { componentSizeOptions, componentSizePreset } from './components/_utils/size'
export type { ComponentSizePreset, XSize } from './components/_utils/size'
export { overlayZIndex } from './components/_utils/zIndex'
export type { OverlayZIndexName } from './components/_utils/zIndex'

export { XAutocomplete }
export { XAvatar }
export { XBaseInput }
export { XButton }
export { XButtonGroup }
export { XBrick }
export { XBrickItem }
export { XCard }
export { XCascader }
export { XCheckbox }
export { XDatePicker }
export { XDateTimePicker }
export { XDialog }
export { XDivider }
export { XDrawer }
export { XDropdown }
export { XDropdownItem }
export { XDropdownMenu }
export { XEmpty }
export { XFlow }
export { XFlowItem }
export { XForm }
export { XFormItem }
export { XGrid }
export { XGridItem }
export { XIcon }
export { iconAliases } from './components/basic-components/icon'
export { XInput }
export { XInputNumber }
export { XTextarea }
export { XLayout }
export { XLogin }
export { XMessage, XMessageComponent }
export { XNavMenu }
export { XOption }
export { XScrollingText }
export { XSelect }
export { XSwitch }
export { XTag }
export { XTabs }
export { XText }
export { XTooltip }
export { XTree }

export type {
  AutocompleteExpose,
  AutocompleteOption,
  AutocompleteOptionSource,
  AutocompleteOptionValue,
  AutocompleteProps,
  AutocompleteRemoteMethod
} from './components/form-components/autocomplete'
export type { AvatarProps, AvatarShape, AvatarSize } from './components/display-components/avatar'
export type { BaseInputProps, BaseInputSize, BaseInputStatus, BaseInputTextAlign, BaseInputType } from './components/basic-components/base-input'
export type { BrickDirection, BrickItemOverflow, BrickItemProps, BrickProps, BrickSize } from './components/basic-components/brick'
export type { ButtonProps, ButtonVariant } from './components/basic-components/button'
export type { ButtonGroupDirection, ButtonGroupProps } from './components/basic-components/button-group'
export type { CardProps, CardShadow } from './components/basic-components/card'
export type {
  CascaderOption,
  CascaderProps,
  CascaderSize,
  CascaderStatus,
  CascaderTextAlign
} from './components/form-components/cascader'
export type { CheckboxProps, CheckboxSize } from './components/form-components/checkbox'
export type { DatePickerProps } from './components/form-components/date-picker'
export type { DateTimePickerProps } from './components/form-components/date-time-picker'
export type { DialogProps } from './components/feedback-components/dialog'
export type { DividerBorderStyle, DividerContentPosition, DividerDirection, DividerProps } from './components/basic-components/divider'
export type { DrawerDirection, DrawerProps } from './components/feedback-components/drawer'
export type { DropdownItemProps } from './components/navigation-components/dropdown-item'
export type { DropdownMenuProps } from './components/navigation-components/dropdown-menu'
export type { DropdownPlacement, DropdownProps, DropdownTrigger } from './components/navigation-components/dropdown'
export type { EmptyProps } from './components/display-components/empty'
export type { FlowAlign, FlowItemKey, FlowItemOverflow, FlowItemProps, FlowProps, FlowSize } from './components/basic-components/flow'
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
export type { InputNumberProps } from './components/form-components/input-number'
export type { InputProps, InputSize, InputTextAlign, InputType } from './components/form-components/input'
export type { TextareaProps, TextareaSize, TextareaStatus, TextareaTextAlign } from './components/form-components/textarea'
export type { LayoutMode, LayoutProps } from './components/basic-components/layout'
export type { LoginLabelPosition, LoginLogoPosition, LoginProps, LoginSize, LoginSubmitPayload } from './components/other-components/login'
export type { MessageHandler, MessageOptions, MessagePlacement, MessageProps, MessageType } from './components/feedback-components/message'
export type { NavMenuItem, NavMenuMode, NavMenuProps } from './components/navigation-components/nav-menu'
export type {
  SelectOption,
  SelectOptionValue,
  SelectProps
} from './components/form-components/select'
export type { ScrollingTextDisplayDirection, ScrollingTextFlowDirection, ScrollingTextProps } from './components/display-components/scrolling-text'
export type { SwitchLabelPosition, SwitchProps, SwitchSize } from './components/form-components/switch'
export type { TagEffect, TagProps, TagSize, TagType } from './components/display-components/tag'
export type { TabItem, TabName, TabPosition, TabsLabelDirection, TabsCloseAllPayload, TabsCloseOthersPayload, TabsEditAction, TabsPaneContext, TabsProps, TabsReorderPayload, TabsReorderPosition, TabsType } from './components/navigation-components/tabs'
export type { TextAlign, TextFormatter, TextProps, TextSize, TextType } from './components/basic-components/text'
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
  XAutocomplete,
  XAvatar,
  XBaseInput,
  XButton,
  XButtonGroup,
  XBrick,
  XBrickItem,
  XCard,
  XCascader,
  XCheckbox,
  XDatePicker,
  XDateTimePicker,
  XDialog,
  XDivider,
  XDrawer,
  XDropdown,
  XDropdownItem,
  XDropdownMenu,
  XEmpty,
  XFlow,
  XFlowItem,
  XForm,
  XFormItem,
  XGrid,
  XGridItem,
  XIcon,
  XInput,
  XTextarea,
  XInputNumber,
  XLayout,
  XLogin,
  XNavMenu,
  XOption,
  XScrollingText,
  XSelect,
  XSwitch,
  XTag,
  XTabs,
  XText,
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
