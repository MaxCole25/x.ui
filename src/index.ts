import type { App, Plugin } from 'vue'
import { XAutocomplete } from './components/autocomplete'
import { XAvatar } from './components/avatar'
import { XBaseInput } from './components/base-input'
import { XButton } from './components/button'
import { XCascader } from './components/cascader'
import { XCheckbox } from './components/checkbox'
import { XColorPicker } from './components/color-picker'
import { XColorPickerPanel } from './components/color-picker-panel'
import { XDatePicker } from './components/date-picker'
import { XDatePickerPanel } from './components/date-picker-panel'
import { XDateTimePicker } from './components/date-time-picker'
import { XDialog } from './components/dialog'
import { XFileDisk } from './components/file-disk'
import { XForm, XFormItem } from './components/form'
import { XInput } from './components/input'
import { XInputNumber } from './components/input-number'
import { XJsonEditor } from './components/json-editor'
import { XLayout } from './components/layout'
import { XLogin } from './components/login'
import { XNavMenu } from './components/nav-menu'
import { XPageBuilder } from './components/page-builder'
import { XRadio } from './components/radio'
import { XRichTextEditor } from './components/rich-text-editor'
import { XScrollbar } from './components/scrollbar'
import { XOption, XSelect } from './components/select'
import { XSlider } from './components/slider'
import { XSwitch } from './components/switch'
import { XTable } from './components/table'
import { XTabs } from './components/tabs'
import { XText } from './components/text'
import { XTimePicker } from './components/time-picker'
import { XTimeSelect } from './components/time-select'
import { XTree } from './components/tree'
import './styles/index.css'

export { XAutocomplete }
export { XAvatar }
export { XButton }
export { XCascader }
export { XCheckbox }
export { XColorPicker }
export { XColorPickerPanel }
export { XDatePicker }
export { XDatePickerPanel }
export { XDateTimePicker }
export { XDialog }
export { XFileDisk }
export { XForm }
export { XFormItem }
export { XBaseInput }
export { XInput }
export { XInputNumber }
export { XJsonEditor }
export { XLayout }
export { XLogin }
export { XNavMenu }
export { XOption }
export { XPageBuilder }
export { XRadio }
export { XRichTextEditor }
export { XScrollbar }
export { XSelect }
export { XSlider }
export { XSwitch }
export { XTable }
export { XTable as XlTable } from './components/table'
export { XTabs }
export { XText }
export { XTimePicker }
export { XTimeSelect }
export { XTree }
export { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS } from './components/rich-text-editor'
export {
  clonePageBuilderSchema,
  createDefaultPageBuilderSchema,
  createPageBuilderNode,
  getPageBuilderWidget,
  isPageBuilderContainer,
  pageBuilderCategoryLabels,
  pageBuilderWidgets
} from './components/page-builder'

export type {
  AutocompleteExpose,
  AutocompleteOption,
  AutocompleteOptionSource,
  AutocompleteOptionValue,
  AutocompleteProps,
  AutocompleteRemoteMethod
} from './components/autocomplete'
export type { AvatarProps, AvatarShape, AvatarSize } from './components/avatar'
export type { BaseInputProps, BaseInputSize, BaseInputStatus, BaseInputTextAlign, BaseInputType } from './components/base-input'
export type { ButtonProps, ButtonSize, ButtonVariant } from './components/button'
export type {
  CascaderOption,
  CascaderProps,
  CascaderSize,
  CascaderStatus,
  CascaderTextAlign
} from './components/cascader'
export type { CheckboxProps, CheckboxSize } from './components/checkbox'
export type { ColorPickerPanelProps } from './components/color-picker-panel'
export type { ColorPickerProps } from './components/color-picker'
export type { DatePickerPanelProps } from './components/date-picker-panel'
export type { DatePickerProps } from './components/date-picker'
export type { DateTimePickerProps } from './components/date-time-picker'
export type { DialogProps } from './components/dialog'
export type { FileDiskAdapter, FileDiskClipboardAction, FileDiskClipboardPayload, FileDiskColors, FileDiskCreateFolderPayload, FileDiskDownloadOptions, FileDiskDownloadPayload, FileDiskItem, FileDiskItemType, FileDiskPermission, FileDiskProps, FileDiskRenamePayload, FileDiskTransferPayload, FileDiskUploadPayload, FileDiskViewMode } from './components/file-disk'
export type { FormItemProps, FormProps, FormSize } from './components/form'
export type { InputNumberProps } from './components/input-number'
export type { InputProps, InputSize, InputTextAlign, InputType } from './components/input'
export type { JsonEditorProps } from './components/json-editor'
export type { LayoutMode, LayoutProps } from './components/layout'
export type { LoginLabelPosition, LoginLogoPosition, LoginProps, LoginSize, LoginSubmitPayload } from './components/login'
export type { NavMenuItem, NavMenuMode, NavMenuProps } from './components/nav-menu'
export type { PageBuilderCanvasSchema, PageBuilderLayoutSchema, PageBuilderNodeSchema, PageBuilderNodeType, PageBuilderProps, PageBuilderSchema, PageBuilderWidgetCategory, PageBuilderWidgetDefinition } from './components/page-builder'
export type { RadioProps, RadioSize } from './components/radio'
export type { RichTextEditorExpose, RichTextEditorProps, RichTextEditorTheme, RichTextEditorToolbarButton, RichTextEditorValue, UploadResult } from './components/rich-text-editor'
export type { ScrollbarProps } from './components/scrollbar'
export type {
  OptionProps,
  SelectOption,
  SelectOptionValue,
  SelectProps,
  SelectSize,
  SelectStatus,
  SelectTextAlign
} from './components/select'
export type { SliderProps } from './components/slider'
export type { SwitchLabelPosition, SwitchProps, SwitchSize } from './components/switch'
export type { TabItem, TabName, TabPosition, TabsLabelDirection, TabsCloseAllPayload, TabsCloseOthersPayload, TabsEditAction, TabsPaneContext, TabsProps, TabsReorderPayload, TabsReorderPosition, TabsType } from './components/tabs'
export type { TableAlign, TableColumn, TableColumnSetting, TablePaginationChangePayload, TablePaginationMode, TablePaginationState, TableProps, TableReorderPosition, TableRowKey, TableRowReorderPayload, TableSelectionMode, XlTableColumn, XlTablePaginationChangePayload, XlTablePaginationMode, XlTableProps } from './components/table'
export type { TextProps, TextSize, TextType } from './components/text'
export type { TimePickerProps } from './components/time-picker'
export type { TimeSelectProps } from './components/time-select'
export type { TreeContextAction, TreeNodeData, TreeProps } from './components/tree'

const components = [
  XButton,
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
  XForm,
  XFormItem,
  XDialog,
  XFileDisk,
  XLayout,
  XNavMenu,
  XPageBuilder,
  XTree,
  XTabs,
  XTable,
  XLogin,
  XRichTextEditor,
  XJsonEditor
]

const XUi: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component)
    })
  }
}

export default XUi
