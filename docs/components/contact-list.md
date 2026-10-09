<script setup lang="ts">
import Example1 from '../examples/contact-list/Example1.vue'
import Example1Source from '../examples/contact-list/Example1.vue?raw'
</script>

# 通讯录 ContactList

`XContactList` 展示 ERP 可见同事、个人联系人分组和群聊。联系人由 ERP 按权限提供，不需要好友申请。个人分组只影响自己的通讯录，不改变访问权限。

<XDocDemo title="个人分组与双击打开会话" :code="Example1Source"><Example1 /></XDocDemo>

单击联系人或群聊只选中；双击或聚焦后按 Enter 触发 `open`。搜索匹配同事姓名、部门和群名。分组可折叠，支持新增、改名、删除和移动联系人；组件发出操作请求，调用方持久化成功后更新数据。删除分组时调用方应将其中联系人移入未分组。

## 停靠与悬浮

默认 placement 为 inline，可嵌入页面。设置为 left、top、right 或 floating 后成为独立面板，并显示停靠选择和拖动表头。拖动表头可移动面板；贴近屏幕左、上、右边缘释放时自动停靠。悬浮与停靠不包含遮罩或页面滚动锁。

`activate` 在鼠标按下或焦点进入时触发，父级可调整面板层级。`XMessenger` 已实现好友列表与独立聊天窗口的相互置前。

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placement | 布局位置，支持 v-model:placement；未传时内部管理 | ContactListPlacement | 'inline' |
| teleported | 独立面板传送到目标容器，inline 时不传送 | boolean | true |
| teleportTo | 独立面板挂载目标 | string | 'body' |
| zIndex | 独立面板层级，统一 CSS 变量兜底 | number | overlayZIndex.dialog（1900） |
| modelValue | 选中的联系人或群 ID | MessengerId | — |
| activeKind | 选中条目类别，支持 v-model:activeKind | 'direct' \| 'group' | 'direct' |
| contacts | 可见同事 | MessengerContact[] | [] |
| contactGroups | 当前用户的个人分组 | MessengerContactGroup[] | [] |
| groups | 可访问的群聊 | MessengerGroup[] | [] |
| width | 宽度 | number \| string | '100%' |
| height | 高度 | number \| string | '100%' |
| fontSize | 字号，单位 px | number | 14 |
| showSearch | 显示搜索输入框 | boolean | true |
| showGroups | 显示群列表 | boolean | true |
| enableGroupManagement | 启用个人分组操作 | boolean | true |
| disabled | 禁止选择及修改 | boolean | false |

支持通用外观属性 `radius`、`borderWidth`、`borderColor`、`backgroundColor`、`textColor`。

## 事件与插槽

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 更新选择 | MessengerId |
| update:activeKind | 更新选择类别 | 'direct' \| 'group' |
| open | 请求打开单聊或群聊 | { kind, targetId } |
| update:placement | 停靠位置变化 | ContactListPlacement |
| activate | 鼠标按下或焦点进入面板 | — |
| contact-group-action | 请求新增、重命名、删除分组或移动联系人 | MessengerContactGroupAction |

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| contact | 自定义联系人内容 | { contact: MessengerContact } |
| group | 自定义群内容 | { group: MessengerGroup } |
| empty | 空列表提示 | — |
| footer | 面板底部操作区 | — |

公开类型包含 ContactListProps、ContactListEmits、ContactListSlots，以及 [内部通讯数据类型](./messenger#数据契约)。

## 手动验收

在「展示组件 / ContactList 通讯录 / 外观接口」检查搜索、折叠、双击、键盘 Enter、分组操作、在线状态、未读数和禁用状态。窄容器内检查长名称省略及移动分组选项。
