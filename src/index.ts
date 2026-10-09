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
import { XChat } from './components/display-components/chat'
import { XContactList } from './components/display-components/contact-list'
import { XConversationList } from './components/display-components/conversation-list'
import { XMessenger } from './components/other-components/messenger'
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
import { XHorizontalMenu, XNavMenu, XVerticalMenu } from './components/navigation-components/nav-menu'
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

export { defaultControlMetrics } from './components/_utils/size'
export type { FontSize } from './components/_utils/size'
// 命名导出和公开类型统一由组件入口维护。
export * from './components'

const components = [
  XBadge,
  XCollapse,
  XDescriptions,
  XProgress,
  XSkeleton,
  XStatistic,
  XAlert,
  XNotificationComponent,
  XPopconfirm,
  XPopover,
  XUpload,
  XBreadcrumb,
  XPagination,
  XSteps,
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
  XChat,
  XContactList,
  XConversationList,
  XMessenger,
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
  XHorizontalMenu,
  XVerticalMenu,
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
