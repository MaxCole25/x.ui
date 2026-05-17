# 空状态 Empty

用于列表、表格、树或容器没有数据时展示占位状态。

## 基础用法

```vue
<XEmpty description="暂无数据" action-text="刷新" @action="reload" />
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片地址 | `string` | - |
| imageSize | 图片尺寸 | `number \| string` | `96px` |
| description | 描述文本 | `string` | `暂无数据` |
| actionText | 默认操作按钮文本 | `string` | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义操作区 |
| image | 自定义图片区域 |
| description | 自定义描述 |
