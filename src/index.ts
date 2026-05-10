import type { App, Plugin } from 'vue'
import { XButton } from './components/button'
import { XDialog } from './components/dialog'
import { XJsonEditor } from './components/json-editor'
import { XLayout } from './components/layout'
import { XNavMenu } from './components/nav-menu'
import { XLogin } from './components/login'
import { XRichTextEditor } from './components/rich-text-editor'
import { XTable } from './components/table'
import { XTabs } from './components/tabs'
import { XTree } from './components/tree'
import './styles/index.css'

export { XButton }
export { XDialog }
export { XLayout }
export { XNavMenu }
export { XTree }
export { XTabs }
export { XTable }
export { XLogin }
export { XTable as XlTable } from './components/table'
export { XRichTextEditor }
export { RICH_TEXT_EDITOR_TOOLBAR_BUTTONS } from './components/rich-text-editor'
export { XJsonEditor }
export type { ButtonProps, ButtonSize, ButtonVariant } from './components/button'
export type { DialogProps } from './components/dialog'
export type { JsonEditorProps } from './components/json-editor'
export type { LayoutMode, LayoutProps } from './components/layout'
export type { LoginLabelPosition, LoginLogoPosition, LoginProps, LoginSize, LoginSubmitPayload } from './components/login'
export type { NavMenuItem, NavMenuMode, NavMenuProps } from './components/nav-menu'
export type { RichTextEditorExpose, RichTextEditorProps, RichTextEditorTheme, RichTextEditorToolbarButton, RichTextEditorValue, UploadResult } from './components/rich-text-editor'
export type { TabItem, TabName, TabPosition, TabsCloseAllPayload, TabsCloseOthersPayload, TabsEditAction, TabsPaneContext, TabsProps, TabsReorderPayload, TabsReorderPosition, TabsType } from './components/tabs'
export type { TableAlign, TableCellChange, TableColumn, TableColumnOption, TableColumnOrderChangePayload, TableColumnSetting, TableColumnType, TableDirtySubmitPayload, TableExpose, TableFixed, TableProps, TableRowKey, TableRowDblclickPayload, TableRowOrderChangePayload, TableSelectionMode, TableSize, TableStoredState, TableTagType, XlTableColumn, XlTableColumnOption, XlTableProps } from './components/table'
export type { TreeContextAction, TreeNodeData, TreeProps } from './components/tree'

const components = [XButton, XDialog, XLayout, XNavMenu, XTree, XTabs, XTable, XLogin, XRichTextEditor, XJsonEditor]

const XUi: Plugin = {
  install(app: App) {
    components.forEach((component) => {
      app.component(component.name!, component)
    })
  }
}

export default XUi



