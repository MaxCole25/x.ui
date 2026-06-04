<script setup lang="ts">
const cardBasicCode = `<XCard header="卡片标题" footer="底部内容" width="320px">
  卡片正文
</XCard>`

const cardSlotCode = `<XCard width="320px" shadow="hover">
  <template #header>
    <div style="display: flex; justify-content: space-between; align-items: center">
      <span>项目概览</span>
      <XButton width="72px" height="28px">查看</XButton>
    </div>
  </template>

  <div style="line-height: 1.8">
    今日新增 12 条任务，3 条需要优先处理。
  </div>

  <template #footer>
    更新时间：09:30
  </template>
</XCard>`
</script>

# 卡片 Card

用于承载一组相关内容，可配置头部、底部、边框、背景和阴影。

## 基础用法

<XDocDemo title="基础用法" :code="cardBasicCode">
  <XCard header="卡片标题" footer="底部内容" width="320px">
    卡片正文
  </XCard>
</XDocDemo>

## 自定义插槽

通过 `header`、`default` 和 `footer` 插槽组合更完整的内容区块。

<XDocDemo title="自定义插槽" :code="cardSlotCode">
  <XCard width="320px" shadow="hover">
    <template #header>
      <div style="display: flex; justify-content: space-between; align-items: center">
        <span>项目概览</span>
        <XButton width="72px" height="28px">查看</XButton>
      </div>
    </template>
    <div style="line-height: 1.8">今日新增 12 条任务，3 条需要优先处理。</div>
    <template #footer>更新时间：09:30</template>
  </XCard>
</XDocDemo>

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| header | 头部文本 | `string` | - |
| footer | 底部文本 | `string` | - |
| size | 尺寸规格，仅影响文字大小，不影响卡片内边距与圆角 | `sm \| md \| lg` | `md` |
| shadow | 阴影策略 | `always \| hover \| never` | `always` |
| width | 宽度 | `number \| string` | `100%` |
| height | 高度 | `number \| string` | - |
| bodyStyle | 正文区域样式 | `CSSProperties` | - |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 卡片内容 |
| header | 自定义头部 |
| footer | 自定义底部 |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XCard / `CardProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `borderWidth` | 边框粗细，数字按 px 处理 | `string \| number` | — |
| `borderColor` | 边框颜色 | `string` | — |
| `backgroundColor` | 背景色 | `string` | — |
| `textColor` | 文字颜色 | `string` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
