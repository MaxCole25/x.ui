<script setup lang="ts">
import Example1 from '../examples/chat/Example1.vue'
import Example1Source from '../examples/chat/Example1.vue?raw'
</script>

# 聊天消息 Chat

`XChat` 是参考 QQ 消息框的聊天消息显示组件，支持左右消息气泡、头像、昵称、时间、文本换行、图片、文件卡片、引用、系统提示和发送状态，内置文本输入、本地附件选择、粘贴和常用表情。适用于私聊、群聊和客服会话。

消息由调用方管理，按 `messages` 数组顺序显示。`senderId` 与 `currentUserId` 相同的消息显示在右侧，其余显示在左侧。未传 `currentUserId` 时全部按对方消息显示。

## 使用示例

<XDocDemo title="聊天消息与交互" :code="Example1Source"><Example1 /></XDocDemo>

输入区默认提供表情、图片和文件按钮。可一次选择多个本地文件，也可在输入框粘贴截图或剪贴板中的文件；附件进入待发送区，可预览和移除，点击发送后触发 `send`。Enter 发送，Shift+Enter 换行，中文输入法确认文字时不会误发送。

示例直接用本地预览地址生成消息，文件卡片点击后可下载。正式接入时在 `send` 中上传附件的 `file`，再把服务器返回的图片或文件地址写入 `messages`。组件不会自行添加消息或访问上传接口。

## 属性

### 数据与内容

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `messages` | 消息列表，消息 id 在当前会话内唯一 | `ChatMessage[]` | `[]` |
| `currentUserId` | 当前用户标识，与 senderId 严格比较 | `string \| number` | — |
| `title` | 聊天标题，为空时不显示默认标题栏 | `string` | `''` |
| `emptyText` | 空消息提示 | `string` | `'暂无消息，开始聊天吧'` |

### 布局与外观

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `width` | 宽度，数字单位 px，字符串使用 CSS 单位 | `number \| string` | `'100%'` |
| `height` | 高度，数字单位 px，字符串使用 CSS 单位 | `number \| string` | `420` |
| `fontSize` | 正文字号，单位 px，不联动气泡内边距和头像尺寸 | `number` | `14` |
| `radius` | 整体圆角，数字单位 px | `number \| string` | —（样式默认 8px） |
| `borderWidth` | 边框宽度，数字单位 px | `number \| string` | —（样式默认 1px） |
| `borderColor` | 边框色 | `string` | — |
| `backgroundColor` | 消息区域背景色 | `string` | —（样式默认 #f5f7fa） |
| `textColor` | 正文文字色 | `string` | — |
| `bubbleRadius` | 气泡圆角，单位 px | `number` | `8` |
| `bubbleBackgroundColor` | 对方的消息背景色 | `string` | —（样式默认白色） |
| `selfBubbleBackgroundColor` | 自己的消息背景色 | `string` | —（样式默认 #d9ecff） |
| `selfBubbleTextColor` | 自己的消息文字色 | `string` | —（继承正文文字色） |

### 展示与滚动

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `showAvatar` | 显示头像，无图片时显示昵称文字 | `boolean` | `true` |
| `showName` | 显示昵称 | `boolean` | `true` |
| `showTime` | 显示调用方提供的时间文本 | `boolean` | `true` |
| `showStatus` | 显示自己的消息发送状态与失败重试按钮 | `boolean` | `true` |
| `enableAutoScroll` | 初次渲染及接近底部时跟随消息变化 | `boolean` | `true` |

用户距底部超过 48px 时，消息更新不会自动拉回底部。图片加载完成时也遵循此规则。需要主动跳转时可调用 `scrollToBottom()`；切换会话时建议通过不同的 `key` 创建新的组件实例。

## 输入区属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `modelValue` | 输入文本，可使用 v-model；未传入时由组件管理 | `string` | — |
| `showComposer` | 显示内置输入区，设为 false 可仅展示消息 | `boolean` | `true` |
| `showImagePicker` | 显示本地图片选择按钮 | `boolean` | `true` |
| `showFilePicker` | 显示本地文件选择按钮 | `boolean` | `true` |
| `showEmojiPicker` | 显示常用表情按钮 | `boolean` | `true` |
| `enablePaste` | 支持粘贴图片和文件，普通文本粘贴始终保留 | `boolean` | `true` |
| `disabled` | 禁用内置输入区及发送操作 | `boolean` | `false` |
| `placeholder` | 输入区占位文本 | `string` | `'输入消息，支持粘贴图片或文件'` |
| `sendText` | 发送按钮文本 | `string` | `'发送'` |
| `fileAccept` | 文件选择框接受的扩展名或 MIME 类型，图片选择框固定 image/* | `string` | `''` |
| `emojis` | 常用表情列表，选择后插入到光标位置 | `string[]` | 内置 24 个常用表情 |

表情面板在输入区内展开。附件粘贴使用浏览器在剪贴板中提供的文件数据，普通文本与文件混合粘贴时会一起保留。隐藏选择按钮不会关闭粘贴；可通过 `enablePaste` 独立关闭附件粘贴。

## 消息数据

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `id` | 必填，唯一消息标识 | `ChatMessageId` |
| `senderId` | 发送者标识 | `ChatMessageId` |
| `senderName` | 昵称 | `string` |
| `avatar` | 头像地址 | `string` |
| `kind` | 消息形态，默认 text | `'text' \| 'image' \| 'file' \| 'system' \| 'business'` |
| `content` | 必填，文本内容；图片消息用作替代文本 | `string` |
| `time` | 格式化的时间文本 | `string` |
| `imageUrl` | 图片消息的地址 | `string` |
| `fileUrl` | 文件消息的地址，供 file-click 处理 | `string` |
| `fileName` | 文件名称 | `string` |
| `fileSize` | 文件大小，单位 byte | `number` |
| `status` | 自己的消息状态 | `'sending' \| 'sent' \| 'read' \| 'failed'` |
| `quote` | 引用内容 | `{ senderName: string; content: string }` |

文本按纯文本显示，保留换行。`system` 消息居中显示。`image` 消息需要 `imageUrl`，未提供时显示 `content`。`file` 消息显示名称和大小，点击后触发 `file-click`，由调用方处理下载或查看。

## 事件

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `message-click` | 点击普通消息气泡；点击图片也会触发 | `ChatMessageClickPayload` |
| `image-click` | 点击图片，支持键盘激活 | `ChatMessageClickPayload` |
| `file-click` | 点击文件卡片，支持键盘激活 | `ChatMessageClickPayload` |
| `update:modelValue` | 输入文本变化 | `string` |
| `send` | 发送文本和待发送附件 | `ChatSendPayload` |
| `attachment-add` | 选择或粘贴附件 | `ChatAttachmentPayload` |
| `attachment-remove` | 移除待发送附件，回调结束后释放预览地址 | `ChatAttachment` |
| `emoji-select` | 选择常用表情 | `string` |
| `retry` | 点击失败消息的重试按钮 | `ChatMessage` |
| `scroll` | 消息区域滚动 | `ChatScrollPayload` |

`ChatMessageClickPayload` 包含 `message`、`index`、`isSelf` 和原始 `event`。`ChatScrollPayload` 包含 `scrollTop` 和 `isAtBottom`。

### 发送载荷

`ChatSendPayload` 包含 `content: string` 和 `attachments: ChatAttachment[]`。每个附件提供 `id`、`kind`（image 或 file）、`file`（原始 File）、`name`、`size`（byte）、`url`（本地预览地址）。`ChatAttachmentPayload` 额外包含 `source`（picker 或 paste）。

只有文本或附件非空时才发送。发送后清空输入和待发送列表；本地已发送附件的预览地址保留到当前 XChat 实例销毁，销毁时统一释放。需要跨会话或持久化的消息，请使用上传后的服务器地址。

## 插槽

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `header` | 自定义标题栏 | 无 |
| `footer` | 替换整个内置输入区；自定义输入、附件和发送操作由调用方管理 | 无 |
| `empty` | 自定义空状态 | 无 |
| `message` | 替换气泡内容或系统提示内容 | `ChatMessageSlotProps` |
| `avatar` | 自定义头像 | `ChatMessageSlotProps` |

`ChatMessageSlotProps` 包含 `message`、`index` 和 `isSelf`。

## 实例方法

| 方法名 | 说明 | 类型 |
| --- | --- | --- |
| `scrollToBottom` | DOM 更新后滚动到底部，默认立即滚动，可传 smooth | `(behavior?: ScrollBehavior) => Promise<void>` |
| `focus` | 聚焦内置输入框 | `() => void` |
| `clearDraft` | 清空输入及待发送附件并关闭表情面板 | `() => void` |
| `sendMessage` | 发送当前草稿，与点击发送按钮一致 | `() => void` |

## 公开类型

可从 `@x-soft88/x-ui` 导入 `ChatProps`、`ChatMessage`、`ChatMessageId`、`ChatMessageKind`、`ChatMessageStatus`、`ChatMessageQuote`、`ChatMessageSlotProps`、`ChatMessageClickPayload`、`ChatScrollPayload`、`ChatEmits`、`ChatSlots`、`ChatExpose`、`ChatAttachmentKind`、`ChatAttachmentSource`、`ChatAttachment`、`ChatAttachmentPayload` 和 `ChatSendPayload`。

## 手动验收

- 在 Histoire「展示组件 / Chat 聊天消息 / 外观接口」调整消息、字号、颜色、父容器尺寸和展示开关。
- 点击文本、图片及重试按钮，检查事件参数；通过实例方法滚动到底部。
- 向上查看历史消息后追加新消息，确认阅读位置不被拉回；清空消息检查空状态。
- 缩小容器，确认长文本换行，图片和气泡保持在消息区域内。

- 选择图片和文件、粘贴截图，检查待发送预览、移除和发送；选择常用表情，检查光标位置插入。
- 验证 Enter 发送、Shift+Enter 换行与中文输入法；关闭输入区或禁用时核对操作状态。

## 业务单据与历史定位

业务消息使用 `kind: 'business'` 和 `business: ChatBusinessReference`，显示类型、编号、标题和摘要；点击触发 `business-click`（参数为 ChatMessageClickPayload），由 ERP 打开单据并校验权限。

`ChatBusinessReference` 包含 businessType、businessId、businessNumber、title、可选 summary。消息可选 `sentAt: string` 保存原始时间，`time` 仍用于显示。

新增实例方法 `scrollToMessage(id): Promise<boolean>`，加载目标消息后滚动并短暂高亮，未找到返回 false。在数组前部合并更早消息时保持当前阅读位置。完整会话、通讯录与查询交互见 [内部通讯 Messenger](./messenger)。
