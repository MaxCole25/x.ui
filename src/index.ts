import type { App, Plugin } from 'vue'
import { XBadge } from './components/display-components/badge'
import { XCollapse } from './components/display-components/collapse'
import { XDescriptions } from './components/display-components/descriptions'
import { XList } from './components/display-components/list'
import { XProgress } from './components/display-components/progress'
import { XSkeleton } from './components/display-components/skeleton'
import { XStatistic } from './components/display-components/statistic'
import { XUpload } from './components/form-components/upload'
import { XBreadcrumb } from './components/navigation-components/breadcrumb'
import { XPagination } from './components/navigation-components/pagination'
import { XSteps } from './components/navigation-components/steps'
import { XAlert } from './components/feedback-components/alert'
import { XNotification, XNotificationComponent } from './components/feedback-components/notification'
import { XPopover } from './components/feedback-components/popover'
import { XPopconfirm } from './components/feedback-components/popconfirm'
import { XAutocomplete } from './components/form-components/autocomplete'
import { XAvatar } from './components/display-components/avatar'
import { XBaseInput } from './components/basic-components/base-input'
import { XButton } from './components/basic-components/button'
import { XButtonGroup } from './components/basic-components/button-group'
import { XBrick, XBrickItem } from './components/basic-components/brick'
import { XSplitPane, XSplitter } from './components/basic-components/splitter'
import { XCard } from './components/basic-components/card'
import { XGroupContainer } from './components/basic-components/group-container'
import { XChart } from './components/display-components/chart'
import { XCascader } from './components/form-components/cascader'
import { XCheckbox } from './components/form-components/checkbox'
import { XColorPicker } from './components/form-components/color-picker'
import { XColorPickerPanel } from './components/form-components/color-picker-panel'
import { XDatePicker } from './components/form-components/date-picker'
import { XDatePickerPanel } from './components/form-components/date-picker-panel'
import { XDateTimePicker } from './components/form-components/date-time-picker'
import { XDataTableSettings } from './components/other-components/data-table-settings'
import { XTableColumnSettings } from './components/other-components/table-column-settings'
import { XDialog } from './components/feedback-components/dialog'
import { XDivider } from './components/basic-components/divider'
import { XDrawer } from './components/feedback-components/drawer'
import { XDropdown } from './components/navigation-components/dropdown'
import { XDropdownItem } from './components/navigation-components/dropdown-item'
import { XDropdownMenu } from './components/navigation-components/dropdown-menu'
import { XFloatButtonGroup } from './components/navigation-components/float-button-group'
import { XTools } from './components/navigation-components/tools'
import { XUserStatus } from './components/navigation-components/user-status'
import { XEmpty } from './components/display-components/empty'
import { XFileDisk } from './components/other-components/file-disk'
import { XFlow, XFlowItem } from './components/basic-components/flow'
import { XForm, XFormItem } from './components/form-components/form'
import { XGrid, XGridItem } from './components/basic-components/grid'
import { XIcon } from './components/basic-components/icon'
import { XIconSelect } from './components/form-components/icon-select'
import { XInput } from './components/form-components/input'
import { XInputNumber } from './components/form-components/input-number'
import { XTextarea } from './components/form-components/textarea'
import { XJsonEditor } from './components/other-components/json-editor'
import { XLayout } from './components/basic-components/layout'
import { XLogin } from './components/other-components/login'
import { XLoginPage } from './components/other-components/login-page'
import { XRegister } from './components/other-components/register'
import { XLoading, vLoading, XLoadingService } from './components/feedback-components/loading'
import { XMessage, XMessageComponent } from './components/feedback-components/message'
import { XMessageBox, XMessageBoxComponent } from './components/feedback-components/message-box'
import { XNavMenu } from './components/navigation-components/nav-menu'
import { XRadio, XRadioButton } from './components/form-components/radio'
import { XRichTextEditor } from './components/other-components/rich-text-editor'
import { XScrollbar } from './components/basic-components/scrollbar'
import { XOption, XSelect } from './components/form-components/select'
import { XSlider } from './components/form-components/slider'
import { XScrollingText } from './components/display-components/scrolling-text'
import { XSwitch } from './components/form-components/switch'
import { XTable } from './components/display-components/table'
import { XTag } from './components/display-components/tag'
import { XTabs } from './components/navigation-components/tabs'
import { XText } from './components/basic-components/text'
import { XTooltip } from './components/feedback-components/tooltip'
import { XTimePicker } from './components/form-components/time-picker'
import { XTimeSelect } from './components/form-components/time-select'
import { XTree } from './components/display-components/tree'
import { XTreeTable } from './components/display-components/tree-table'
import './styles/index.css'

export { componentSizeOptions, componentSizePreset } from './components/_utils/size'
export type { ComponentSizePreset, XSize } from './components/_utils/size'
export { overlayZIndex } from './components/_utils/zIndex'
export type { OverlayZIndexName } from './components/_utils/zIndex'

export { XBadge }
export { XCollapse }
export { XDescriptions }
export { XList }
export { XProgress }
export { XSkeleton }
export { XStatistic }
export { XUpload }
export { XBreadcrumb }
export { XPagination }
export { XSteps }
export { XAlert }
export { XNotification, XNotificationComponent }
export { XPopover }
export { XPopconfirm }
export { XAutocomplete }
export { XAvatar }
export { XButton }
export { XButtonGroup }
export { XBrick }
export { XBrickItem }
export { XSplitter }
export { XSplitPane }
export { XCard }
export { XGroupContainer }
export { XChart }
export { XCascader }
export { XCheckbox }
export { XColorPicker }
export { XColorPickerPanel }
export { XDatePicker }
export { XDatePickerPanel }
export { XDateTimePicker }
export { XDataTableSettings }
export { XTableColumnSettings }
export { XDialog }
export { XDivider }
export { XDrawer }
export { XDropdown }
export { XDropdownItem }
export { XDropdownMenu }
export { XFloatButtonGroup }
export { XTools }
export { XUserStatus }
export { XEmpty }
export { XFileDisk }
export { XFlow }
export { XFlowItem }
export { XForm }
export { XFormItem }
export { XBaseInput }
export { XGrid }
export { XGridItem }
export { XIcon }
export { iconAliases } from './components/basic-components/icon'
export { XIconSelect }
export { XInput }
export { XInputNumber }
export { XTextarea }
export { XJsonEditor }
export { XLayout }
export { XLogin }
export { XLoginPage }
export { XRegister }
export { XLoading, XLoadingService, vLoading }
export { XMessage, XMessageComponent }
export { XMessageBox, XMessageBoxComponent }
export { XNavMenu }
export { XOption }
export { XRadio }
export { XRadioButton }
export { XRichTextEditor }
export { XScrollbar }
export { XScrollingText }
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
export { XTreeTable }
export { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS } from './components/other-components/rich-text-editor'

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
export type { SplitPaneOverflow, SplitPaneProps, SplitterDirection, SplitterProps, SplitterResizePayload, SplitterSize } from './components/basic-components/splitter'
export type { ButtonProps, ButtonVariant } from './components/basic-components/button'
export type { ButtonGroupDirection, ButtonGroupProps } from './components/basic-components/button-group'
export type { CardProps, CardShadow } from './components/basic-components/card'
export type { GroupContainerBorderStyle, GroupContainerProps, GroupContainerTitlePosition } from './components/basic-components/group-container'
export type {
  ChartAutoresize,
  ChartEventBinding,
  ChartEventHandler,
  ChartEvents,
  ChartExpose,
  ChartLoadingOptions,
  ChartProps,
  ChartTheme
} from './components/display-components/chart'
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
  DataTableSettingsAdapter,
  DataTableSettingsColumnMeta,
  DataTableSettingsDataSourceOption,
  DataTableSettingsDisplayType,
  DataTableSettingsEditorType,
  DataTableSettingsErrorPayload,
  DataTableSettingsKeyType,
  DataTableSettingsLoadedPayload,
  DataTableSettingsOption,
  DataTableSettingsProps,
  DataTableSettingsRow,
  DataTableSettingsSavePayload,
  DataTableSettingsTable
} from './components/other-components/data-table-settings'
export type { TableColumnSettingsExpose, TableColumnSettingsProps, TableColumnSettingsSlots, TableColumnSettingsTriggerSlotProps } from './components/other-components/table-column-settings'
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
export type { DialogFooterDividerStyle, DialogProps } from './components/feedback-components/dialog'
export type { DividerBorderStyle, DividerContentPosition, DividerDirection, DividerProps } from './components/basic-components/divider'
export type { DrawerDirection, DrawerProps } from './components/feedback-components/drawer'
export type { DropdownItemProps } from './components/navigation-components/dropdown-item'
export type { DropdownMenuProps } from './components/navigation-components/dropdown-menu'
export type { DropdownPlacement, DropdownProps, DropdownTrigger } from './components/navigation-components/dropdown'
export type { FloatButtonGroupDirection, FloatButtonGroupItem, FloatButtonGroupItemKey, FloatButtonGroupMode, FloatButtonGroupPlacement, FloatButtonGroupPosition, FloatButtonGroupProps } from './components/navigation-components/float-button-group'
export type { ToolsActionItem, ToolsItem, ToolsItemKey, ToolsItemLayout, ToolsItemType, ToolsMenuItem, ToolsProps, ToolsSeparatorItem } from './components/navigation-components/tools'
export type { UserStatusMenuItem, UserStatusProps } from './components/navigation-components/user-status'
export type { EmptyProps } from './components/display-components/empty'
export type { FileDiskAdapter, FileDiskClipboardAction, FileDiskClipboardPayload, FileDiskColors, FileDiskCreateFolderPayload, FileDiskDownloadOptions, FileDiskDownloadPayload, FileDiskItem, FileDiskItemType, FileDiskPermission, FileDiskProps, FileDiskRenamePayload, FileDiskTransferPayload, FileDiskUploadPayload, FileDiskViewMode } from './components/other-components/file-disk'
export type { FlowAlign, FlowItemKey, FlowItemOverflow, FlowItemProps, FlowProps, FlowSize } from './components/basic-components/flow'
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
export type { GridAlign, GridItemOverflow, GridItemProps, GridProps, GridResponsiveColumns, GridSize } from './components/basic-components/grid'
export type { IconProps, IconSize, IconVariant } from './components/basic-components/icon'
export type { IconSelectCategoryName, IconSelectIconInfo, IconSelectProps } from './components/form-components/icon-select'
export type { InputNumberProps } from './components/form-components/input-number'
export type { InputProps, InputSize, InputTextAlign, InputType } from './components/form-components/input'
export type { TextareaProps, TextareaSize, TextareaStatus, TextareaTextAlign } from './components/form-components/textarea'
export type { JsonEditorProps } from './components/other-components/json-editor'
export type { LayoutMode, LayoutProps } from './components/basic-components/layout'
export type { LoginLabelPosition, LoginLogoPosition, LoginProps, LoginSize, LoginSubmitPayload } from './components/other-components/login'
export type {
  LoginPageAlign,
  LoginPageBackgroundRepeat,
  LoginPageBackgroundSize,
  LoginPageDirection,
  LoginPageJustify,
  LoginPagePreset,
  LoginPageProps,
  LoginPageSectionConfig,
  LoginPageSectionOverflow
} from './components/other-components/login-page'
export type { RegisterLabelPosition, RegisterLogoPosition, RegisterProps, RegisterSize, RegisterSubmitPayload } from './components/other-components/register'
export type { LoadingInstance, LoadingOptions, LoadingProps } from './components/feedback-components/loading'
export type {
  ListItem,
  ListItemClickPayload,
  ListItemReorderPayload,
  ListItemSlotProps,
  ListItemValue,
  ListProps,
  ListReorderPosition,
  ListSize
} from './components/display-components/list'
export type { MessageHandler, MessageOptions, MessagePlacement, MessageProps, MessageType } from './components/feedback-components/message'
export type { MessageBoxAction, MessageBoxOptions, MessageBoxProps, MessageBoxType } from './components/feedback-components/message-box'
export type { NavMenuItem, NavMenuMode, NavMenuProps } from './components/navigation-components/nav-menu'
export type { RadioButtonProps, RadioProps, RadioSize } from './components/form-components/radio'
export type { RichTextEditorExpose, RichTextEditorProps, RichTextEditorTheme, RichTextEditorToolbarButton, RichTextEditorValue, UploadResult } from './components/other-components/rich-text-editor'
export type { ScrollbarProps } from './components/basic-components/scrollbar'
export type { ScrollingTextDisplayDirection, ScrollingTextFlowDirection, ScrollingTextProps } from './components/display-components/scrolling-text'
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
export type { TabItem, TabName, TabPosition, TabsLabelDirection, TabsCloseAllPayload, TabsCloseOthersPayload, TabsEditAction, TabsExpose, TabsPaneContext, TabsProps, TabsReorderPayload, TabsReorderPosition, TabsType } from './components/navigation-components/tabs'
export type {
  TableAlign,
  TableAppendRowPayload,
  TableCellChangePayload,
  TableColumn,
  TableColumnResizePayload,
  TableColumnSetting,
  TableDeleteSelectedRowsPayload,
  TableDirtyCellChange,
  TableDirtyChangePayload,
  TableEditableDataStrategy,
  TableExcelExportMode,
  TableExcelExportPayload,
  TableExcelImportPayload,
  TableFixed,
  TableProps,
  TableReorderPosition,
  TableRowClickPayload,
  TableRowKey,
  TableRowReorderPayload,
  TableSavePayload,
  TableSelectionMode,
  TableSorter,
  TableSortOrder,
  TableSummaryAggregator,
  TableSummaryCell,
  TableSummaryContext,
  TableSummaryRow,
  TableSummaryScope,
  XlTableAppendRowPayload,
  XlTableColumn,
  XlTableColumnResizePayload,
  XlTableDeleteSelectedRowsPayload,
  XlTableDirtyCellChange,
  XlTableDirtyChangePayload,
  XlTableEditableDataStrategy,
  XlTableExcelExportMode,
  XlTableExcelExportPayload,
  XlTableExcelImportPayload,
  XlTableProps,
  XlTableRowClickPayload,
  XlTableSavePayload,
  XlTableSorter,
  XlTableSortOrder,
  XlTableSummaryAggregator,
  XlTableSummaryCell,
  XlTableSummaryContext,
  XlTableSummaryRow,
  XlTableSummaryScope
} from './components/display-components/table'
export type { TextProps, TextSize, TextType } from './components/basic-components/text'
export type { TooltipPlacement, TooltipProps, TooltipTrigger } from './components/feedback-components/tooltip'
export type { TimePickerProps } from './components/form-components/time-picker'
export type { TimeSelectProps } from './components/form-components/time-select'
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
export type {
  TreeTableAlign,
  TreeTableColumn,
  TreeTableExpandChangePayload,
  TreeTableExpose,
  TreeTableProps,
  TreeTableRowClickPayload,
  TreeTableRowData,
  TreeTableRowInfo,
  TreeTableRowKey,
  TreeTableSelectionChangePayload,
  TreeTableSlots
} from './components/display-components/tree-table'

const components = [
  XButton,
  XButtonGroup,
  XBrick,
  XBrickItem,
  XSplitter,
  XSplitPane,
  XCard,
  XGroupContainer,
  XChart,
  XText,
  XBaseInput,
  XInput,
  XTextarea,
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
  XDataTableSettings,
  XTableColumnSettings,
  XTimePicker,
  XTimeSelect,
  XScrollbar,
  XFlow,
  XFlowItem,
  XScrollingText,
  XList,
  XAvatar,
  XTag,
  XTooltip,
  XDropdown,
  XDropdownMenu,
  XDropdownItem,
  XFloatButtonGroup,
  XTools,
  XUserStatus,
  XEmpty,
  XDrawer,
  XDivider,
  XForm,
  XFormItem,
  XGrid,
  XGridItem,
  XIcon,
  XIconSelect,
  XDialog,
  XFileDisk,
  XLayout,
  XNavMenu,
  XTree,
  XTreeTable,
  XTabs,
  XTable,
  XLogin,
  XLoginPage,
  XRegister,
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
    app.config.globalProperties.$notification = XNotification
    app.config.globalProperties.$loading = XLoadingService
  }
}

export default XUi
