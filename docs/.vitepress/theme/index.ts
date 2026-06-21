import DefaultTheme from 'vitepress/theme'
import { XBadge } from '../../../src/components/display-components/badge'
import { XCollapse } from '../../../src/components/display-components/collapse'
import { XDescriptions } from '../../../src/components/display-components/descriptions'
import { XProgress } from '../../../src/components/display-components/progress'
import { XSkeleton } from '../../../src/components/display-components/skeleton'
import { XStatistic } from '../../../src/components/display-components/statistic'
import { XUpload } from '../../../src/components/form-components/upload'
import { XBreadcrumb } from '../../../src/components/navigation-components/breadcrumb'
import { XPagination } from '../../../src/components/navigation-components/pagination'
import { XSteps } from '../../../src/components/navigation-components/steps'
import { XAlert } from '../../../src/components/feedback-components/alert'
import { XNotificationComponent } from '../../../src/components/feedback-components/notification'
import { XPopover } from '../../../src/components/feedback-components/popover'
import { XPopconfirm } from '../../../src/components/feedback-components/popconfirm'
import { XButton } from '../../../src/components/basic-components/button'
import { XButtonGroup } from '../../../src/components/basic-components/button-group'
import { XBaseInput } from '../../../src/components/basic-components/base-input'
import { XBrick, XBrickItem } from '../../../src/components/basic-components/brick'
import { XCard } from '../../../src/components/basic-components/card'
import { XDivider } from '../../../src/components/basic-components/divider'
import { XFlow, XFlowItem } from '../../../src/components/basic-components/flow'
import { XGrid, XGridItem } from '../../../src/components/basic-components/grid'
import { XIcon } from '../../../src/components/basic-components/icon'
import { XIconSelect } from '../../../src/components/form-components/icon-select'
import { XLayout } from '../../../src/components/basic-components/layout'
import { XScrollbar } from '../../../src/components/basic-components/scrollbar'
import { XText } from '../../../src/components/basic-components/text'
import { XAutocomplete } from '../../../src/components/form-components/autocomplete'
import { XCascader } from '../../../src/components/form-components/cascader'
import { XCheckbox } from '../../../src/components/form-components/checkbox'
import { XColorPicker } from '../../../src/components/form-components/color-picker'
import { XColorPickerPanel } from '../../../src/components/form-components/color-picker-panel'
import { XDatePicker } from '../../../src/components/form-components/date-picker'
import { XDatePickerPanel } from '../../../src/components/form-components/date-picker-panel'
import { XDateTimePicker } from '../../../src/components/form-components/date-time-picker'
import { XInput } from '../../../src/components/form-components/input'
import { XInputNumber } from '../../../src/components/form-components/input-number'
import { XTextarea } from '../../../src/components/form-components/textarea'
import { XRadio, XRadioButton } from '../../../src/components/form-components/radio'
import { XOption, XSelect } from '../../../src/components/form-components/select'
import { XSlider } from '../../../src/components/form-components/slider'
import { XSwitch } from '../../../src/components/form-components/switch'
import { XForm, XFormItem } from '../../../src/components/form-components/form'
import { XTimePicker } from '../../../src/components/form-components/time-picker'
import { XTimeSelect } from '../../../src/components/form-components/time-select'
import { XAvatar } from '../../../src/components/display-components/avatar'
import { XChart } from '../../../src/components/display-components/chart'
import { XEmpty } from '../../../src/components/display-components/empty'
import { XScrollingText } from '../../../src/components/display-components/scrolling-text'
import { XTable } from '../../../src/components/display-components/table'
import { XTag } from '../../../src/components/display-components/tag'
import { XTree } from '../../../src/components/display-components/tree'
import { XDropdown } from '../../../src/components/navigation-components/dropdown'
import { XDropdownItem } from '../../../src/components/navigation-components/dropdown-item'
import { XDropdownMenu } from '../../../src/components/navigation-components/dropdown-menu'
import { XNavMenu } from '../../../src/components/navigation-components/nav-menu'
import { XTabs } from '../../../src/components/navigation-components/tabs'
import { XDialog } from '../../../src/components/feedback-components/dialog'
import { XDrawer } from '../../../src/components/feedback-components/drawer'
import { XLoading } from '../../../src/components/feedback-components/loading'
import { XMessageComponent } from '../../../src/components/feedback-components/message'
import { XMessageBoxComponent } from '../../../src/components/feedback-components/message-box'
import { XTooltip } from '../../../src/components/feedback-components/tooltip'
import { XFileDisk } from '../../../src/components/other-components/file-disk'
import { XDataTableSettings } from '../../../src/components/other-components/data-table-settings'
import { XTableColumnSettings } from '../../../src/components/other-components/table-column-settings'
import { XJsonEditor } from '../../../src/components/other-components/json-editor'
import { XLogin } from '../../../src/components/other-components/login'
import { XRichTextEditor } from '../../../src/components/other-components/rich-text-editor'
import ButtonPlayground from '../components/ButtonPlayground.vue'
import IconGallery from '../components/IconGallery.vue'
import XDocDemo from '../components/XDocDemo.vue'
import '../../../src/styles/index.css'
import '../theme.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component(XBadge.name!, XBadge)
    app.component(XCollapse.name!, XCollapse)
    app.component(XDescriptions.name!, XDescriptions)
    app.component(XProgress.name!, XProgress)
    app.component(XSkeleton.name!, XSkeleton)
    app.component(XStatistic.name!, XStatistic)
    app.component(XUpload.name!, XUpload)
    app.component(XBreadcrumb.name!, XBreadcrumb)
    app.component(XPagination.name!, XPagination)
    app.component(XSteps.name!, XSteps)
    app.component(XAlert.name!, XAlert)
    app.component(XNotificationComponent.name!, XNotificationComponent)
    app.component('XNotificationComponent', XNotificationComponent)
    app.component(XPopover.name!, XPopover)
    app.component(XPopconfirm.name!, XPopconfirm)
    app.component(XButton.name!, XButton)
    app.component(XButtonGroup.name!, XButtonGroup)
    app.component(XBaseInput.name!, XBaseInput)
    app.component(XBrick.name!, XBrick)
    app.component(XBrickItem.name!, XBrickItem)
    app.component(XCard.name!, XCard)
    app.component(XDivider.name!, XDivider)
    app.component(XFlow.name!, XFlow)
    app.component(XFlowItem.name!, XFlowItem)
    app.component(XGrid.name!, XGrid)
    app.component(XGridItem.name!, XGridItem)
    app.component(XIcon.name!, XIcon)
    app.component(XIconSelect.name!, XIconSelect)
    app.component(XLayout.name!, XLayout)
    app.component(XScrollbar.name!, XScrollbar)
    app.component(XText.name!, XText)
    app.component(XInput.name!, XInput)
    app.component(XTextarea.name!, XTextarea)
    app.component(XAutocomplete.name!, XAutocomplete)
    app.component(XCascader.name!, XCascader)
    app.component(XCheckbox.name!, XCheckbox)
    app.component(XColorPicker.name!, XColorPicker)
    app.component(XColorPickerPanel.name!, XColorPickerPanel)
    app.component(XDatePicker.name!, XDatePicker)
    app.component(XDatePickerPanel.name!, XDatePickerPanel)
    app.component(XDateTimePicker.name!, XDateTimePicker)
    app.component(XInputNumber.name!, XInputNumber)
    app.component(XRadio.name!, XRadio)
    app.component(XRadioButton.name!, XRadioButton)
    app.component(XSelect.name!, XSelect)
    app.component(XOption.name!, XOption)
    app.component(XSlider.name!, XSlider)
    app.component(XSwitch.name!, XSwitch)
    app.component(XForm.name!, XForm)
    app.component(XFormItem.name!, XFormItem)
    app.component(XTimePicker.name!, XTimePicker)
    app.component(XTimeSelect.name!, XTimeSelect)
    app.component(XAvatar.name!, XAvatar)
    app.component(XChart.name!, XChart)
    app.component(XEmpty.name!, XEmpty)
    app.component(XScrollingText.name!, XScrollingText)
    app.component(XTable.name!, XTable)
    app.component(XTag.name!, XTag)
    app.component(XTree.name!, XTree)
    app.component(XDropdown.name!, XDropdown)
    app.component(XDropdownItem.name!, XDropdownItem)
    app.component(XDropdownMenu.name!, XDropdownMenu)
    app.component(XNavMenu.name!, XNavMenu)
    app.component(XTabs.name!, XTabs)
    app.component(XDialog.name!, XDialog)
    app.component(XDrawer.name!, XDrawer)
    app.component(XLoading.name!, XLoading)
    app.component(XMessageComponent.name!, XMessageComponent)
    app.component('XMessageComponent', XMessageComponent)
    app.component(XMessageBoxComponent.name!, XMessageBoxComponent)
    app.component('XMessageBoxComponent', XMessageBoxComponent)
    app.component(XTooltip.name!, XTooltip)
    app.component(XFileDisk.name!, XFileDisk)
    app.component(XDataTableSettings.name!, XDataTableSettings)
    app.component(XTableColumnSettings.name!, XTableColumnSettings)
    app.component(XJsonEditor.name!, XJsonEditor)
    app.component(XLogin.name!, XLogin)
    app.component(XRichTextEditor.name!, XRichTextEditor)
    app.component('ButtonPlayground', ButtonPlayground)
    app.component('IconGallery', IconGallery)
    app.component('XDocDemo', XDocDemo)
  }
}
