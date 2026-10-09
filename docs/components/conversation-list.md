<script setup lang="ts">
import Example1 from '../examples/conversation-list/Example1.vue'
import Example1Source from '../examples/conversation-list/Example1.vue?raw'
</script>

# 会话列表 ConversationList

`XConversationList` 显示最近单聊和群聊的标题、最后消息摘要、时间及未读数，单击或键盘激活切换会话。调用方按最近活动时间排列 `conversations`；组件保持传入顺序。

<XDocDemo title="最近会话" :code="Example1Source"><Example1 /></XDocDemo>

## 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前会话 ID | MessengerId | — |
| conversations | 最近会话列表 | MessengerConversation[] | [] |
| width | 宽度 | number \| string | '100%' |
| height | 高度 | number \| string | '100%' |
| fontSize | 字号，单位 px | number | 14 |
| disabled | 禁止切换 | boolean | false |

支持通用外观属性 `radius`、`borderWidth`、`borderColor`、`backgroundColor`、`textColor`。

## 事件与插槽

| 事件名 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 更新当前会话 | MessengerId |
| select | 选中会话 | MessengerConversation |

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| conversation | 自定义会话内容 | { conversation: MessengerConversation } |
| empty | 空会话提示 | — |

公开类型：ConversationListProps、ConversationListEmits、ConversationListSlots。会话数据见 [内部通讯数据类型](./messenger#数据契约)。

## 手动验收

在「展示组件 / ConversationList 会话列表 / 外观接口」检查选择、消息摘要、未读数、空列表、长名称和禁用状态。
