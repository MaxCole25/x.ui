<script setup lang="ts">
import Example1 from '../examples/messenger/Example1.vue'
import Example1Source from '../examples/messenger/Example1.vue?raw'
</script>

# 内部通讯 Messenger

`XMessenger` 提供独立好友列表与唯一聊天窗口，聊天区复用现有 `XChat`，支持同事单聊、群聊、个人分组、业务单据卡片及历史记录查询。

<XDocDemo title="完整内部沟通演示" :code="Example1Source"><Example1 /></XDocDemo>

好友列表默认停靠右侧，高度可通过 contactListHeight 设置，也可拖拽列表底部的横向手柄调整；支持 v-model:contactListHeight 同步拖拽后的高度，内容超出后内部滚动。停靠与悬浮只通过 contactListPlacement 属性设置，界面不显示位置选择；悬浮模式可拖动表头移动列表；收起后的消息浮标默认位于浮动区域右下角，可用鼠标拖动或方向键移动，拖动结束不会误触展开，展开列表后再收起保留浮标位置，不会自动切换停靠位置。顶部显示消息图标和「信息」，右上角为固定按钮。默认固定并常驻显示；取消固定后收起为彩色消息浮标，点击浮标展开，点击列表外部或按 Esc 后收回浮标，再次固定则保持列表显示。底部图标栏左侧为「显示分组」「最近消息」「群聊」，默认显示最近联系人；管理员设置图标位于底部最右侧。双击同事或群聊打开唯一的独立聊天窗口，标题栏直接显示好友名或群名，通过好友列表切换会话。输入工具栏右侧的图标可打开历史查询或群管理，拖动中间分隔条可调整左右宽度；发送按钮旁的上拉菜单可选择 Enter 或 Ctrl + Enter 发送。

聊天标题栏、聊天区、接收气泡和发送气泡可分别设置背景色。默认以浅色聊天区衬托白色接收气泡；消息时间居中显示：当天为时间、昨天为「昨天 + 时间」，其它为日期和时间；首条、跨自然日或间隔至少五分钟显示，连续消息不重复标注。

两个区域相互独立，没有模态遮罩；单击好友列表将它置于聊天窗口上层，单击聊天窗口则将聊天窗口置前。关闭聊天窗口后，好友列表仍然可用。演示提供 48 条单聊历史；输入「订单」并选择日期，可验证分页和消息定位。「业务单据」按钮模拟 ERP 选择单据，将卡片加入待发送区。

**示例使用内存数据模拟 ERP，刷新后重置。组件本身不连接消息服务、不上传附件、不保存聊天记录。**

联系人名称右侧显示最后消息时间，名称下方显示最后一条聊天摘要，不显示在线状态或已读标记；圆形未读数与摘要同行靠右显示。分组视图保留折叠，行内不再显示分组名称或移动分组选择框。当前用户角色为 admin 时显示底部最右侧设置按钮，点击后打开独立的「联系人设置」弹出窗，不占用或挤压列表空间。弹出窗采用左右结构：左侧为可展开的好友分组及成员，右侧只显示未分组用户，可搜索姓名或部门。展开左侧目标分组后，双击右侧用户将其移入该分组；双击左侧成员将其移出并归为未分组。用户加入任意分组后从右侧移除，移出分组后重新出现在右侧，人数同步更新。键盘 Enter 支持同样操作。新增、重命名和删除分组也在此弹出窗内完成，群聊入口使用双消息气泡图标。创建群聊仅在群聊视图的搜索框右侧显示「＋」图标，悬停提示「创建群聊」，点击沿用现有创建群聊流程；由 allowCreateGroup 控制是否显示。

界面使用功能配色：最近消息为蓝色、联系人分组为青绿色、群聊为紫色、固定与设置为暖金色。图标按钮带柔和底色和选中效果；搜索框、联系人头像、列表悬停、未读数和设置弹窗保持一致的圆角与间距，聊天工具图标使用对应功能色。

## 接入 ERP

1. ERP 提供当前用户、权限过滤后的同事、个人分组、群聊及最近会话；用户 ID 的字符串或数字类型保持一致。
2. 处理 `open-conversation`，由服务端获取或创建单聊会话，更新 `conversations` 和 `activeConversationId`，再加载会话消息。重复打开已有会话直接激活。
3. 处理 `send`，上传附件中的 File，并提交文本与业务引用。收到服务端结果后更新 `messagePages`，发送状态以服务端数据为准。
4. 实时通道收到消息时更新消息列表、摘要和未读数；处理 `read-request` 时按最后消息 ID 提交已读游标。
5. 处理分组和群操作，成功后更新对应 Props。服务端始终校验用户权限、成员资格和单据访问权限。

会话切换期间保留文本、待发送附件和单据卡片。关闭窗口会销毁聊天实例并释放本地附件地址，未发送草稿不跨窗口关闭保存。附件事件中的本地预览地址仅在对应 XChat 实例生命周期内有效；正式消息必须改用上传返回的持久地址。

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| conversationReadonly | 当前活动会话只读，隐藏发送区但保留历史查询与单据点击 | boolean | false |
| defaultContactListPinned | 联系人列表初始固定状态；false 时初始显示消息浮标 | boolean | true |
| headerBackgroundColor | 聊天窗口标题栏背景色 | string | 主色混合 12% |
| chatBackgroundColor | 聊天区背景色，独立于输入区和气泡 | string | surface-soft |
| bubbleBackgroundColor | 接收消息气泡背景色 | string | surface |
| selfBubbleBackgroundColor | 自己消息的气泡背景色 | string | 浅蓝色 |
| selfBubbleTextColor | 自己消息的文字色 | string | 继承正文色 |
| timePlacement | 消息时间位置；separator 居中显示相对日期，meta 显示于昵称旁 | 'meta' \| 'separator' | 'separator' |
| modelValue | 独立聊天窗口显示，支持 v-model | boolean | false |
| showContactList | 显示独立好友列表 | boolean | true |
| launcherPositionStorageKey | 消息浮标位置的 localStorage 键，建议包含租户和用户标识；拖动结束或方向键移动后保存，刷新时恢复并限制在当前边界内，未配置时不持久化 | string | — |
| floatingBoundary | 悬浮列表与消息浮标的边界容器 CSS 选择器；默认使用视口，浮标初始位于区域右下角，支持鼠标拖动和方向键移动 | string | — |
| contactListPlacement | 好友列表停靠位置，仅通过组件属性设置 | 'left' \| 'top' \| 'right' \| 'floating' | 'right' |
| contactListWidth | 好友列表宽度，px | number | 280 |
| contactListHeight | 好友列表初始高度，px；支持底部拖拽和 v-model:contactListHeight | number | 520 |
| activeConversationId | 当前会话，支持 v-model:activeConversationId；未传时内部管理 | MessengerId | — |
| currentUserId | 当前 ERP 用户 ID | MessengerId | — |
| currentUserRole | 当前用户角色，admin 显示好友列表设置按钮 | 'admin' \| 'user' | 'user' |
| contacts | 权限过滤后的同事 | MessengerContact[] | [] |
| contactGroups | 个人联系人分组 | MessengerContactGroup[] | [] |
| groups | 当前用户可访问的群 | MessengerGroup[] | [] |
| conversations | 按最近活动排列的会话 | MessengerConversation[] | [] |
| messagePages | 各会话已加载的消息，按时间从早到晚排列 | MessengerMessagePage[] | [] |
| historyResult | 带查询条件的历史结果，用于避免过期结果显示在其它会话 | MessengerHistoryResult | — |
| title | 未选择会话时的窗口标题；选中后显示好友名或群名 | string | '内部消息' |
| width | 默认聊天窗口宽度，px | number | 800 |
| height | 默认聊天窗口高度，px | number | 640 |
| fontSize | 正文字号，px | number | 14 |
| disabled | 禁止发送、修改和切换会话 | boolean | false |
| allowCreateGroup | 在群聊视图搜索框右侧显示带提示的创建图标 | boolean | false |
| enableContactGroupManagement | 启用管理员设置中的个人分组操作 | boolean | true |
| showBusinessPicker | 显示业务单据选择入口 | boolean | true |
| teleported | 传送窗口到目标容器 | boolean | true |
| teleportTo | 挂载目标 | string | 'body' |
| zIndex | 两个区域的基础层级，当前激活区域使用基础层级 + 1 | number | overlayZIndex.dialog（1900） |

支持通用外观属性 `radius`、`borderWidth`、`borderColor`、`backgroundColor`、`textColor`。窗口可拖动、调整尺寸和全屏。

## 数据契约

所有 ID 使用 `MessengerId = string | number`，采用严格相等比较；联系人 ID、群 ID 和会话 ID 各自独立。

| 类型 | 主要字段 |
| --- | --- |
| MessengerContact | id、name、avatar、department、status（online/offline/busy/away）、groupId、unreadCount |
| MessengerContactGroup | id、name |
| MessengerGroup | id、name、avatar、memberIds、ownerId、adminIds、announcement、unreadCount、permissions |
| MessengerGroupPermissions | canRename、canManageMembers、canManageAdmins、canEditAnnouncement、canLeave、canDissolve；未提供时隐藏对应操作 |
| MessengerConversation | id、kind（direct/group）、targetId、title、avatar、lastMessage、lastMessageTime、unreadCount |
| MessengerMessagePage | conversationId、messages: ChatMessage[]、hasMore、loading |
| MessengerHistoryQuery | conversationId、keyword、startDate、endDate、page（从 1 开始）、pageSize（20）、messageType（all/media/emoji/file/link，默认 all）、senderId（可选，按字符串或数字 ID 筛选） |
| MessengerHistoryResult | 查询条件原样返回，加 messages、total、loading |
| ChatBusinessReference | businessType、businessId、businessNumber、title、summary |

消息沿用 `ChatMessage`；同次发送的各条记录应携带相同 `groupId`，同一发送人的连续同组记录会合并到一个气泡，图片、文件和单据在上，文字在下，头像、昵称和状态只显示一次。分页应返回完整的发送组；各条记录仍保留自己的 id，图片预览、下载和历史定位事件使用对应记录。单聊和群聊消息均支持右键「回复」，输入区显示可取消的引用，发送事件携带 `replyToMessageId` 和 `quote`；ERP 应保存原消息关系，并在读取时返回 `ChatMessage.quote`。同组消息的引用只显示一次。引用右侧显示向上箭头，点击滚动至原消息并高亮；原消息未加载时复用 `locate-message` 事件加载上下文后自动定位。业务卡片使用 `kind: 'business'` 和 `business: ChatBusinessReference`，`content` 保存可搜索的文字摘要。可选 `sentAt` 保存原始时间，`time` 仍为格式化的显示文字。

好友列表使用会话的 lastMessage 和 lastMessageTime；未提供摘要时从已加载消息的最后一条读取，不考虑消息的已读状态。未读数优先使用会话 unreadCount，包括 0；超过 99 显示 99+。最近联系人按照 conversations 中单聊会话的顺序显示，群聊由独立视图显示。

底部「最近消息」和「群聊」图标右上角分别显示单聊与群聊未读数量气泡；计数不受搜索、视图切换影响，打开列表不清零，以业务方回写的已读数为准。0 时隐藏，超过 99 显示 99+，悬停及无障碍说明保留完整数量。两个图标的计数之和与浮标未读总数一致。

折叠后的消息浮标右上角显示红色数量气泡，汇总所有单聊和群聊未读数，不受当前视图或搜索条件影响。每个会话优先使用 conversations 中的 unreadCount，未提供时使用对应联系人或群的 unreadCount；尚无会话的联系人和群也计入汇总，同一对象不会在会话与联系人或群数据中重复累加。总数为 0 时隐藏气泡，超过 99 显示 99+，悬停提示和无障碍标签保留完整数量。业务方更新 unreadCount 后气泡同步变化；仅展开好友列表不会清空未读数，仍由业务方处理 read-request 并回写计数。

lastMessageTime 推荐传 ISO 8601 完整时间，按浏览器本地时区显示：今天为 HH:mm，昨天为「昨天 HH:mm」，此前七天内为星期几，今年更早为 M/D，往年为 YYYY/M/D。已格式化的时间文字直接显示。

日期范围为调用方业务时区的自然日，开始日和结束日均包含；传空字符串表示不限。历史结果应回传完整查询条件；服务端负责实际筛选、排序和分页。

## 事件

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 聊天窗口显示变化 | boolean |
| update:contactListHeight | 拖拽或键盘调整好友列表高度 | number（px） |
| update:activeConversationId | 当前会话变化 | MessengerId |
| open-conversation | 请求创建或获取会话 | MessengerOpenPayload |
| send | 提交文本、附件及业务卡片；由 ERP 写入消息 | MessengerSendPayload |
| load-history | 请求更早消息；合并到对应消息数组前部 | { conversationId, beforeMessageId? } |
| history-query | 查询当前会话历史 | MessengerHistoryQuery |
| locate-message | 目标尚未加载，请求包含目标的消息上下文 | { conversationId, messageId } |
| read-request | 当前可见会话到达底部或首次打开，请求推进已读游标 | { conversationId, lastMessageId } |
| contact-group-action | 请求新增、改名、删除个人分组或移动联系人 | MessengerContactGroupAction |
| group-action | 请求创建、改名、调整成员/管理员、修改公告、退出或解散群 | MessengerGroupAction |
| business-select | 请求 ERP 打开业务对象选择器 | { conversationId } |
| business-click | 请求 ERP 打开业务单据 | { conversationId, message } |
| image-click / file-click | 图片预览或文件下载 | { conversationId, detail: ChatMessageClickPayload } |
| retry | 重试发送，由 ERP 处理 | { conversationId, message } |
| attachment-add | 选择或粘贴本地附件 | { conversationId, detail: ChatAttachmentPayload } |
| attachment-remove | 移除待发送附件 | { conversationId, attachment: ChatAttachment } |
| close | 点击关闭窗口 | — |

`MessengerSendPayload` 包含 conversationId、content、attachments 和 businessReferences。纯单据可以点击「发送单据」；文字与附件发送时同时携带该会话待发送的业务引用。

个人分组操作使用 action: create/rename/delete/move；群操作使用 action: create/rename/members/admins/announcement/leave/dissolve。成员和管理员操作提交修改后的完整 ID 数组；群主不能从成员勾选中移除。退出和解散需再次点击确认。

## 实例方法

| 方法 | 说明 |
| --- | --- |
| openConversation(payload) | 打开已有会话，或请求 ERP 创建会话，同时请求显示窗口 |
| selectConversation(id) | 切换到已有会话 |
| addBusinessReference(conversationId, reference) | ERP 选择单据后加入指定会话待发送区 |
| locateMessage(conversationId, messageId) | 激活会话并定位；未加载时触发 locate-message，更新消息后自动继续定位 |

好友列表与聊天窗口独立渲染，窗口不含联系人侧栏。管理员的「聊天设置」使用标签页，默认显示联系人分组。

| 插槽 | 说明 |
| --- | --- |
| `business-settings` | 自定义「表设置」标签页内容，由业务应用负责读取和保存；提供插槽时显示该标签页。 |
需要自定义联系人、会话或消息内容时，可独立组合 XContactList、XConversationList 和 XChat。导出 MessengerProps、MessengerEmits、MessengerExpose 及本页数据契约、操作载荷类型。

## 手动验收

- 在左侧、顶部、右侧及悬浮模式检查独立好友列表，通过属性切换位置，悬浮模式拖动表头移动；重叠后分别点击两个区域，确认点击区域置前。
- 调整 contactListHeight 或拖拽底部手柄，确认面板高度变化、绑定值同步且长列表内部滚动；手柄获得焦点后用上下方向键调整高度；切换三个视图，确认默认最近联系人和分组折叠。
- 检查摘要、圆形未读数及今天、昨天、近七天、今年和往年的消息时间；普通用户不显示设置，管理员点击设置后弹出独立窗口，列表位置和高度不被挤压；在弹出窗中展开分组，双击右侧用户加入，再双击左侧成员移出；确认加入后从右侧移除、移出后回到右侧，人数同步更新。
- 检查固定按钮和底部四个按钮仅显示彩色图标，无背景框和背景色；固定时图钉竖放，取消固定后横放，选中视图通过实心图标区分；检查底部栏左侧三个视图图标、管理员右侧设置；仅群聊视图搜索框右侧显示创建图标，悬停显示提示。
- 点击取消固定，确认只显示彩色消息浮标；点击浮标展开，点击外部或按 Esc 收起，再次固定后保持展开；收起再展开保留列表高度、搜索和当前视图。
- 折叠好友列表后，使用演示中的「模拟收到消息」确认气泡数量增加；调整 conversations、contacts 和 groups 的 unreadCount，检查会话计数优先、单聊与群聊汇总、不重复累加、0 时隐藏以及超过 99 显示 99+；搜索和切换视图不影响总数，已读回写后气泡同步减少。
- 关闭聊天窗口后好友列表仍可操作；页面不被遮罩或滚动锁阻挡。
- 双击联系人或群聊打开会话，再次打开复用唯一聊天窗口；不同会话分别保留文本、附件与单据草稿。
- 聊天窗口标题直接显示当前好友名或群名；附件工具栏最右侧的历史图标打开侧栏，拖动中间分隔条调整聊天区和历史区宽度，也可用左右方向键调整。
- 点击发送按钮旁的箭头，在上拉菜单中选择 Enter 或 Ctrl + Enter 发送；默认 Enter 发送，Shift + Enter 换行，切换为 Ctrl + Enter 后 Enter 换行；切换会话保留快捷键设置。
- 通过输入工具栏选择业务单据，发送文字、图片、文件和单据，检查事件的会话 ID；关闭再打开后，已发送附件仍使用持久地址。
- 单聊和群聊中右键文字、图片或文件消息，选择回复，输入区显示原消息发送人和摘要；可取消引用，发送后显示引用。重新打开会话仍显示服务端返回的引用；只读通知及发送中、失败消息不提供回复菜单。纯表情消息放大到正文的 1.8 倍。
- 历史区域顶部搜索支持输入后自动查询，消息类型标签提供全部、图片/视频、表情、文件、链接；筛选按钮展开日期范围和发送人，按日期分组显示头像、昵称、时间、图片缩略图及对应消息内容。查询由 ERP 在分页前筛选，返回结果需携带相同 messageType 和 senderId；宽侧栏并排显示筛选条件，窄侧栏在历史区内展开浮动筛选面板。
- 搜索历史、切换页码、点击尚未加载的结果，检查定位与高亮；滚动到当前消息顶部时显示浅色小字提示，再向上滚动才加载更早消息；加载期间不重复请求，追加历史后保持当前阅读位置。
- 新增、重命名、删除个人分组，移动联系人；创建群、改名、修改公告、调整成员和管理员、退出及解散。
- 群管理默认显示群头像和名称、成员头像网格、群资料与公告入口；点击查看全部显示成员及角色，邀请和移出使用头像旁的加减入口；展开群资料后改名或设置管理员，展开公告后查看或编辑。群主不能被移出，操作按群权限显示，退出和解散需再次点击确认。
- 去掉群权限后确认对应操作隐藏；检查长文本、窄窗口、全屏和窗口层级。

在 Histoire「其它组件 / Messenger 内部通讯 / 外观接口」调整公开属性和数据，并查看事件日志。

未设置头像图片时，消息用户使用按用户 ID 稳定分配的彩色背景及白色文字；同一用户在聊天、联系人、分组、群成员和历史记录中保持一致，已有头像图片优先显示。

### 历史查询失败

`MessengerHistoryResult.error?: string` 用于区分查询失败和正常空结果。失败时显示错误及“重试”，重试携带原条件和页码；调用方可保留上次成功的 `messages/total`，组件继续展示。调用方应忽略旧会话、旧条件和旧账号的迟到响应。
