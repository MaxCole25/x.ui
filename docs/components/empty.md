<script setup lang="ts">
const emptyBasicCode = `\x3Cscript setup lang="ts">
<\/script>

<XEmpty description="暂无数据" action-text="刷新" />`

const emptySlotCode = `\x3Cscript setup lang="ts">
<\/script>

<XEmpty description="还没有成员">
    <XButton variant="outline">邀请成员</XButton>
  </XEmpty>`
</script>

# 空状态 Empty

用于列表、表格、树或容器没有数据时展示占位状态。

## 基础用法

<XDocDemo title="基础用法" :code="emptyBasicCode">
  <XEmpty description="暂无数据" action-text="刷新" />
</XDocDemo>

## 自定义操作

<XDocDemo title="自定义操作" :code="emptySlotCode">
  <XEmpty description="还没有成员">
    <XButton variant="outline">邀请成员</XButton>
  </XEmpty>
</XDocDemo>

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

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XEmpty / `EmptyProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
