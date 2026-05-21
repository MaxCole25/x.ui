import type { App, Plugin } from 'vue'
import { provideBaseXConfig } from './baseXConfig'
import type { BaseXConfigOptions } from './types'
import BaseXAutocomplete from './BaseXAutocomplete.vue'
import BaseXAvatar from './BaseXAvatar.vue'
import BaseXButton from './BaseXButton.vue'
import BaseXButtonGroup from './BaseXButtonGroup.vue'
import BaseXCard from './BaseXCard.vue'
import BaseXCellDatePicker from './BaseXCellDatePicker.vue'
import BaseXCellInput from './BaseXCellInput.vue'
import BaseXCellInputNumber from './BaseXCellInputNumber.vue'
import BaseXCellSelect from './BaseXCellSelect.vue'
import BaseXCellSwitch from './BaseXCellSwitch.vue'
import BaseXCheckbox from './BaseXCheckbox.vue'
import BaseXDatePicker from './BaseXDatePicker.vue'
import BaseXDialog from './BaseXDialog.vue'
import BaseXDivider from './BaseXDivider.vue'
import BaseXDrawer from './BaseXDrawer.vue'
import BaseXDropdown from './BaseXDropdown.vue'
import BaseXDropdownItem from './BaseXDropdownItem.vue'
import BaseXDropdownMenu from './BaseXDropdownMenu.vue'
import BaseXEmpty from './BaseXEmpty.vue'
import BaseXFileDisk from './BaseXFileDisk.vue'
import BaseXForm from './BaseXForm.vue'
import BaseXFormItem from './BaseXFormItem.vue'
import BaseXIcon from './BaseXIcon.vue'
import BaseXInput from './BaseXInput.vue'
import BaseXInputNumber from './BaseXInputNumber.vue'
import BaseXLayout from './BaseXLayout.vue'
import BaseXLogin from './BaseXLogin.vue'
import BaseXNavMenu from './BaseXNavMenu.vue'
import BaseXOption from './BaseXOption.vue'
import BaseXPageBuilder from './BaseXPageBuilder.vue'
import BaseXRadioButton from './BaseXRadioButton.vue'
import BaseXRichTextEditor from './BaseXRichTextEditor.vue'
import BaseXSelect from './BaseXSelect.vue'
import BaseXSwitch from './BaseXSwitch.vue'
import BaseXTable from './BaseXTable.vue'
import BaseXTableColumnSettingsDialog from './BaseXTableColumnSettingsDialog.vue'
import BaseXTabs from './BaseXTabs.vue'
import BaseXTag from './BaseXTag.vue'
import BaseXText from './BaseXText.vue'
import BaseXTooltip from './BaseXTooltip.vue'
import BaseXTree from './BaseXTree.vue'
import PrintActions from './PrintActions.vue'

export { default as BaseXButton } from './BaseXButton.vue'
export { default as BaseXAutocomplete } from './BaseXAutocomplete.vue'
export { default as BaseXAvatar } from './BaseXAvatar.vue'
export { default as BaseXButtonGroup } from './BaseXButtonGroup.vue'
export { default as BaseXCard } from './BaseXCard.vue'
export { default as BaseXCellDatePicker } from './BaseXCellDatePicker.vue'
export { default as BaseXCellInput } from './BaseXCellInput.vue'
export { default as BaseXCellInputNumber } from './BaseXCellInputNumber.vue'
export { default as BaseXCellSelect } from './BaseXCellSelect.vue'
export { default as BaseXCellSwitch } from './BaseXCellSwitch.vue'
export { default as BaseXCheckbox } from './BaseXCheckbox.vue'
export { default as BaseXDatePicker } from './BaseXDatePicker.vue'
export { default as BaseXDialog } from './BaseXDialog.vue'
export { default as BaseXDivider } from './BaseXDivider.vue'
export { default as BaseXDrawer } from './BaseXDrawer.vue'
export { default as BaseXDropdown } from './BaseXDropdown.vue'
export { default as BaseXDropdownItem } from './BaseXDropdownItem.vue'
export { default as BaseXDropdownMenu } from './BaseXDropdownMenu.vue'
export { default as BaseXEmpty } from './BaseXEmpty.vue'
export { default as BaseXFileDisk } from './BaseXFileDisk.vue'
export { default as BaseXForm } from './BaseXForm.vue'
export { default as BaseXFormItem } from './BaseXFormItem.vue'
export { default as BaseXIcon } from './BaseXIcon.vue'
export { default as BaseXInput } from './BaseXInput.vue'
export { default as BaseXInputNumber } from './BaseXInputNumber.vue'
export { default as BaseXLayout } from './BaseXLayout.vue'
export { default as BaseXLogin } from './BaseXLogin.vue'
export { BaseXMessage } from './BaseXMessage'
export { BaseXMessageBox } from './BaseXMessageBox'
export { createBaseXTableServerSortPayload } from './tableSort'
export { default as BaseXNavMenu } from './BaseXNavMenu.vue'
export { default as BaseXOption } from './BaseXOption.vue'
export { default as BaseXPageBuilder } from './BaseXPageBuilder.vue'
export { default as BaseXRadioButton } from './BaseXRadioButton.vue'
export { default as BaseXRichTextEditor } from './BaseXRichTextEditor.vue'
export { default as BaseXSelect } from './BaseXSelect.vue'
export { default as BaseXSwitch } from './BaseXSwitch.vue'
export { default as BaseXTable } from './BaseXTable.vue'
export { default as BaseXTableColumnSettingsDialog } from './BaseXTableColumnSettingsDialog.vue'
export { default as BaseXTabs } from './BaseXTabs.vue'
export { default as BaseXTag } from './BaseXTag.vue'
export { default as BaseXText } from './BaseXText.vue'
export { default as BaseXTooltip } from './BaseXTooltip.vue'
export { default as BaseXTree } from './BaseXTree.vue'
export { default as PrintActions } from './PrintActions.vue'
export * from './baseXConfig'
export * from './defaults'
export * from './types'

import type { TableAlign, TableColumn as XTableColumn } from 'x.ui'

export type { BaseXTableServerSortOrder, BaseXTableServerSortPayload } from './tableSort'
export type { RichTextEditorProps } from 'x.ui'
export type { TabItem } from 'x.ui'
export type {
  FileDiskAdapter,
  FileDiskItem,
  FileDiskTransferPayload,
  FileDiskViewMode,
  LayoutMode,
  LoginSubmitPayload,
  MessageBoxAction,
  NavMenuItem,
  PageBuilderSchema,
  PageBuilderWidgetDefinition,
  TableColumnSetting,
  TablePaginationChangePayload,
  TableSummaryAggregator,
  TableSummaryCell,
  TableSummaryContext,
  TableSummaryRow,
  TableSummaryScope,
  TableSorter,
  TableSortOrder,
  TreeNodeData,
} from 'x.ui'

export {
  createDefaultPageBuilderSchema,
} from 'x.ui'

export type TableColumn = XTableColumn & {
  sortable?: boolean
  searchable?: boolean
  type?: string
  displayType?: string
  editType?: string
  editorType?: string
  dataSourceKey?: string
  valueGetter?: (row: Record<string, unknown>, column: TableColumn) => unknown
  editable?: boolean
  readonly?: boolean
  isKey?: boolean
  defaultFormatter?: string
  fixed?: 'left' | 'right' | 'none'
  align?: TableAlign
  options?: Array<{
    label: string
    value: string | number | boolean
    type?: string
  }>
}

export interface TableRowDblclickPayload<Row extends Record<string, unknown> = Record<string, unknown>> {
  row: Row
  rowIndex: number
  rowKey: string
  event: MouseEvent
}

const baseXComponents = [
  BaseXAutocomplete,
  BaseXAvatar,
  BaseXButton,
  BaseXButtonGroup,
  BaseXCard,
  BaseXCellDatePicker,
  BaseXCellInput,
  BaseXCellInputNumber,
  BaseXCellSelect,
  BaseXCellSwitch,
  BaseXCheckbox,
  BaseXDatePicker,
  BaseXDialog,
  BaseXDivider,
  BaseXDrawer,
  BaseXDropdown,
  BaseXDropdownItem,
  BaseXDropdownMenu,
  BaseXEmpty,
  BaseXFileDisk,
  BaseXForm,
  BaseXFormItem,
  BaseXIcon,
  BaseXInput,
  BaseXInputNumber,
  BaseXLayout,
  BaseXLogin,
  BaseXNavMenu,
  BaseXOption,
  BaseXPageBuilder,
  BaseXRadioButton,
  BaseXRichTextEditor,
  BaseXSelect,
  BaseXSwitch,
  BaseXTable,
  BaseXTableColumnSettingsDialog,
  BaseXTabs,
  BaseXTag,
  BaseXText,
  BaseXTooltip,
  BaseXTree,
  PrintActions,
]

export const BaseXPlugin: Plugin<[BaseXConfigOptions?]> = {
  install(app: App, options: BaseXConfigOptions = {}) {
    provideBaseXConfig(app, options)
    baseXComponents.forEach((component) => {
      app.component(component.name!, component)
    })
  },
}

export default BaseXPlugin
