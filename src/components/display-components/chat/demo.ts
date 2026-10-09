import type { ChatMessage } from './src/types'

export function createChatMessages(): ChatMessage[] {
  return [
    { id: 'notice', kind: 'system', content: '今天 10:20 · 你们已成为好友，开始聊天吧' },
    { id: 1, senderId: 'friend', senderName: '小林', time: '10:20', content: '你好！新的聊天消息框做好了吗？🙂' },
    { id: 2, senderId: 'me', senderName: '我', time: '10:21', content: '做好了，支持左右气泡、头像和消息状态。\n长消息会自动换行，换行符也会保留。', status: 'read' },
    { id: 3, senderId: 'friend', senderName: '小林', time: '10:22', kind: 'image', content: '周末去看山吧', imageUrl: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22320%22%20height%3D%22180%22%20viewBox%3D%220%200%20320%20180%22%3E%0A%20%20%3Crect%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23d7edff%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%22255%22%20cy%3D%2240%22%20r%3D%2220%22%20fill%3D%22%23fff5c4%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M0%20145%2085%2040%20170%20145Z%22%20fill%3D%22%2384a9bf%22%2F%3E%0A%20%20%3Cpath%20d%3D%22m58%2074%2027-34%2027%2034-26-12Z%22%20fill%3D%22%23f6fbff%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M100%20160%20215%2055%20320%20150v30H0v-25Z%22%20fill%3D%22%23619487%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M0%20146q80-20%20160%207t160-3v30H0Z%22%20fill%3D%22%23b3d7af%22%2F%3E%0A%3C%2Fsvg%3E%0D%0A" },
    { id: 4, senderId: 'me', senderName: '我', time: '10:23', content: '看起来不错，我们周末出发！', quote: { senderName: '小林', content: '周末去看山吧' }, status: 'sent' },
    { id: 'order-card', senderId: 'friend', senderName: '小林', time: '10:23', kind: 'business', content: '订单交期确认', business: { businessType: '销售订单', businessId: 'order-001', businessNumber: 'SO20261009001', title: '订单交期确认', summary: '点击卡片交给 ERP 打开业务单据' } },
    { id: 5, senderId: 'me', senderName: '我', time: '10:24', content: '这条消息可以点击重试。', status: 'failed' }
  ]
}
