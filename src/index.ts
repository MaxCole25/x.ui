import type { App, Plugin } from 'vue'
import { XAutocomplete } from './components/form-components/autocomplete'
import { XAvatar } from './components/display-components/avatar'
import { XBaseInput } from './components/basic-components/base-input'
import { XButton } from './components/basic-components/button'
import { XButtonGroup } from './components/basic-components/button-group'
import { XCard } from './components/basic-components/card'
import { XCascader } from './components/form-components/cascader'
import { XCheckbox } from './components/form-components/checkbox'
import { XColorPicker } from './components/form-components/color-picker'
import { XColorPickerPanel } from './components/form-components/color-picker-panel'
import { XDatePicker } from './components/form-components/date-picker'
import { XDatePickerPanel } from './components/form-components/date-picker-panel'
import { XDateTimePicker } from './components/form-components/date-time-picker'
import { XDialog } from './components/feedback-components/dialog'
import { XDivider } from './components/basic-components/divider'
import { XDrawer } from './components/feedback-components/drawer'
import { XDropdown } from './components/navigation-components/dropdown'
import { XDropdownItem } from './components/navigation-components/dropdown-item'
import { XDropdownMenu } from './components/navigation-components/dropdown-menu'
import { XEmpty } from './components/display-components/empty'
import { XFileDisk } from './components/other-components/file-disk'
import { XForm, XFormItem } from './components/form-components/form'
import { XIcon } from './components/basic-components/icon'
import { XInput } from './components/form-components/input'
import { XInputNumber } from './components/form-components/input-number'
import { XJsonEditor } from './components/other-components/json-editor'
import { XLayout } from './components/basic-components/layout'
import { XLogin } from './components/other-components/login'
import { XLoading, vLoading, XLoadingService } from './components/feedback-components/loading'
import { XMessage, XMessageComponent } from './components/feedback-components/message'
import { XMessageBox, XMessageBoxComponent } from './components/feedback-components/message-box'
import { XNavMenu } from './components/navigation-components/nav-menu'
import { XPageBuilder } from './components/other-components/page-builder'
import { XRadio, XRadioButton } from './components/form-components/radio'
import { XRichTextEditor } from './components/other-components/rich-text-editor'
import { XScrollbar } from './components/basic-components/scrollbar'
import { XOption, XSelect } from './components/form-components/select'
import { XSlider } from './components/form-components/slider'
import { XSwitch } from './components/form-components/switch'
import { XTable } from './components/display-components/table'
import { XTag } from './components/display-components/tag'
import { XTabs } from './components/navigation-components/tabs'
import { XText } from './components/basic-components/text'
import { XTooltip } from './components/feedback-components/tooltip'
import { XTimePicker } from './components/form-components/time-picker'
import { XTimeSelect } from './components/form-components/time-select'
import { XTree } from './components/display-components/tree'
import './styles/index.css'

export { componentSizeOptions, componentSizePreset } from './components/_utils/size'
export type { ComponentSizePreset, XSize } from './components/_utils/size'

export { XAutocomplete }
export { XAvatar }
export { XButton }
export { XButtonGroup }
export { XCard }
export { XCascader }
export { XCheckbox }
export { XColorPicker }
export { XColorPickerPanel }
export { XDatePicker }
export { XDatePickerPanel }
export { XDateTimePicker }
export { XDialog }
export { XDivider }
export { XDrawer }
export { XDropdown }
export { XDropdownItem }
export { XDropdownMenu }
export { XEmpty }
export { XFileDisk }
export { XForm }
export { XFormItem }
export { XBaseInput }
export { XIcon }
export { iconAliases } from './components/basic-components/icon'
export { XInput }
export { XInputNumber }
export { XJsonEditor }
export { XLayout }
export { XLogin }
export { XLoading, XLoadingService, vLoading }
export { XMessage, XMessageComponent }
export { XMessageBox, XMessageBoxComponent }
export { XNavMenu }
export { XOption }
export { XPageBuilder }
export { XRadio }
export { XRadioButton }
export { XRichTextEditor }
export { XScrollbar }
export { XSelect }
export { XSlider }
export { XSwitch }
export { XTable }
export { XTable as XlTable } from './components/display-components/table'
export { XTag }
export { XTabs }
export { XText }
export { XTimePicker }
export { XTimeSelect }
export { XTooltip }
export { XTree }
export { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS } from './components/other-components/rich-text-editor'
export {
  clonePageBuilderSchema,
  createDefaultPageBuilderSchema,
  createPageBuilderNode,
  getPageBuilderWidget,
  isPageBuilderContainer,
  pageBuilderCategoryLabels,
  pageBuilderWidgets
} from './components/other-components/page-builder'

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
export type { ColorPickerPanelProps } from './components/form-components/color-picker-panel'
export type { ColorPickerProps } from './components/form-components/color-picker'
export type {
  PickerButtonThemeProps,
  PickerCalendarThemeProps,
  PickerDateTimePopupThemeProps,
  PickerDayThemeProps,
  PickerFestivalThemeProps,
  PickerPanelThemeProps,
  PickerPopupThemeProps,
  PickerThemeProps,
  PickerTimePopupThemeProps,
  PickerTimeThemeProps,
  PickerToolbarThemeProps
} from './components/form-components/_utils/pickerTheme'
export type { DatePickerPanelProps } from './components/form-components/date-picker-panel'
export type { DatePickerProps } from './components/form-components/date-picker'
export type { DateTimePickerProps } from './components/form-components/date-time-picker'
export type { DialogProps } from './components/feedback-components/dialog'
export type { DividerBorderStyle, DividerContentPosition, DividerDirection, DividerProps } from './components/basic-components/divider'
export type { DrawerDirection, DrawerProps } from './components/feedback-components/drawer'
export type { DropdownItemProps } from './components/navigation-components/dropdown-item'
export type { DropdownMenuProps } from './components/navigation-components/dropdown-menu'
export type { DropdownPlacement, DropdownProps, DropdownTrigger } from './components/navigation-components/dropdown'
export type { EmptyProps } from './components/display-components/empty'
export type { FileDiskAdapter, FileDiskClipboardAction, FileDiskClipboardPayload, FileDiskColors, FileDiskCreateFolderPayload, FileDiskDownloadOptions, FileDiskDownloadPayload, FileDiskItem, FileDiskItemType, FileDiskPermission, FileDiskProps, FileDiskRenamePayload, FileDiskTransferPayload, FileDiskUploadPayload, FileDiskViewMode } from './components/other-components/file-disk'
export type {
  FormControlSize,
  FormExpose,
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
export type { IconProps, IconSize, IconVariant } from './components/basic-components/icon'
export type { InputNumberProps } from './components/form-components/input-number'
export type { InputProps, InputSize, InputTextAlign, InputType } from './components/form-components/input'
export type { JsonEditorProps } from './components/other-components/json-editor'
export type { LayoutMode, LayoutProps } from './components/basic-components/layout'
export type { LoginLabelPosition, LoginLogoPosition, LoginProps, LoginSize, LoginSubmitPayload } from './components/other-components/login'
export type { LoadingInstance, LoadingOptions, LoadingProps } from './components/feedback-components/loading'
export type { MessageHandler, MessageOptions, MessagePlacement, MessageProps, MessageType } from './components/feedback-components/message'
export type { MessageBoxAction, MessageBoxOptions, MessageBoxProps, MessageBoxType } from './components/feedback-components/message-box'
export type { NavMenuItem, NavMenuMode, NavMenuProps } from './components/navigation-components/nav-menu'
export type { PageBuilderCanvasSchema, PageBuilderLayoutSchema, PageBuilderNodeSchema, PageBuilderNodeType, PageBuilderProps, PageBuilderSchema, PageBuilderWidgetCategory, PageBuilderWidgetDefinition } from './components/other-components/page-builder'
export type { RadioButtonProps, RadioProps, RadioSize } from './components/form-components/radio'
export type { RichTextEditorExpose, RichTextEditorProps, RichTextEditorTheme, RichTextEditorToolbarButton, RichTextEditorValue, UploadResult } from './components/other-components/rich-text-editor'
export type { ScrollbarProps } from './components/basic-components/scrollbar'
export type {
  OptionProps,
  SelectOption,
  SelectOptionValue,
  SelectProps,
  SelectSize,
  SelectStatus,
  SelectTextAlign
} from './components/form-components/select'
export type { SliderProps } from './components/form-components/slider'
export type { SwitchLabelPosition, SwitchProps, SwitchSize } from './components/form-components/switch'
export type { TagEffect, TagProps, TagSize, TagType } from './components/display-components/tag'
export type { TabItem, TabName, TabPosition, TabsLabelDirection, TabsCloseAllPayload, TabsCloseOthersPayload, TabsEditAction, TabsPaneContext, TabsProps, TabsReorderPayload, TabsReorderPosition, TabsType } from './components/navigation-components/tabs'
export type { TableAlign, TableColumn, TableColumnSetting, TablePaginationChangePayload, TablePaginationMode, TablePaginationState, TableProps, TableReorderPosition, TableRowKey, TableRowReorderPayload, TableSelectionMode, XlTableColumn, XlTablePaginationChangePayload, XlTablePaginationMode, XlTableProps } from './components/display-components/table'
export type { TextProps, TextSize, TextType } from './components/basic-components/text'
export type { TooltipPlacement, TooltipProps, TooltipTrigger } from './components/feedback-components/tooltip'
export type { TimePickerProps } from './components/form-components/time-picker'
export type { TimeSelectProps } from './components/form-components/time-select'
export type { TreeContextAction, TreeNodeData, TreeProps } from './components/display-components/tree'

const components = [
  XButton,
  XButtonGroup,
  XCard,
  XText,
  XBaseInput,
  XInput,
  XInputNumber,
  XAutocomplete,
  XSelect,
  XOption,
  XCascader,
  XCheckbox,
  XRadio,
  XRadioButton,
  XSwitch,
  XSlider,
  XColorPickerPanel,
  XColorPicker,
  XDatePickerPanel,
  XDatePicker,
  XDateTimePicker,
  XTimePicker,
  XTimeSelect,
  XScrollbar,
  XAvatar,
  XTag,
  XTooltip,
  XDropdown,
  XDropdownMenu,
  XDropdownItem,
  XEmpty,
  XDrawer,
  XDivider,
  XForm,
  XFormItem,
  XIcon,
  XDialog,
  XFileDisk,
  XLayout,
  XNavMenu,
  XPageBuilder,
  XTree,
  XTabs,
  XTable,
  XLogin,
  XLoading,
  XMessageComponent,
  XMessageBoxComponent,
  XRichTextEditor,
  XJsonEditor
]

const XUi: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component)
    })
    app.directive('loading', vLoading)
    app.config.globalProperties.$message = XMessage
    app.config.globalProperties.$messageBox = XMessageBox
    app.config.globalProperties.$loading = XLoadingService
  }
}

export default XUi
