<script setup lang="ts">
const buttonGroupBasicCode = `<XButtonGroup>
  <XButton variant="outline">上一项</XButton>
  <XButton variant="outline">当前项</XButton>
  <XButton variant="outline">下一项</XButton>
</XButtonGroup>`

const buttonGroupVerticalCode = `<XButtonGroup direction="vertical" width="160px">
  <XButton variant="outline">创建</XButton>
  <XButton variant="outline">复制</XButton>
  <XButton variant="outline">删除</XButton>
</XButtonGroup>`

const buttonGroupRadiusCode = `<XButtonGroup :radius="12" width="360px">
  <XButton variant="outline">日</XButton>
  <XButton variant="outline">周</XButton>
  <XButton variant="outline">月</XButton>
</XButtonGroup>`

const buttonGroupStateCode = `<XButtonGroup width="360px">
  <XButton>保存</XButton>
  <XButton variant="outline">预览</XButton>
  <XButton variant="outline" disabled>发布</XButton>
</XButtonGroup>`
</script>

# 按钮组 ButtonGroup

用于将多个按钮组合成一组连续操作，常见于工具栏、筛选切换和弹窗底部的相邻动作。

按钮组只负责排列和外侧圆角控制，按钮本身仍使用 `XButton`。组内按钮会去掉各自圆角，仅保留按钮组最外侧的四个角。

## 基础用法

<XDocDemo title="基础用法" :code="buttonGroupBasicCode">
  <div class="x-demo-row">
    <XButtonGroup>
      <XButton variant="outline">上一项</XButton>
      <XButton variant="outline">当前项</XButton>
      <XButton variant="outline">下一项</XButton>
    </XButtonGroup>
  </div>
</XDocDemo>

## 竖向排列

通过 `direction="vertical"` 让按钮竖向排列。

<XDocDemo title="竖向排列" :code="buttonGroupVerticalCode">
  <div class="x-demo-row">
    <XButtonGroup direction="vertical" width="160px">
      <XButton variant="outline">创建</XButton>
      <XButton variant="outline">复制</XButton>
      <XButton variant="outline">删除</XButton>
    </XButtonGroup>
  </div>
</XDocDemo>

## 自定义圆角

`radius` 只作用于整组按钮最外侧四个角，中间按钮不会保留独立圆角。

<XDocDemo title="自定义圆角" :code="buttonGroupRadiusCode">
  <div class="x-demo-row">
    <XButtonGroup :radius="12" width="360px">
      <XButton variant="outline">日</XButton>
      <XButton variant="outline">周</XButton>
      <XButton variant="outline">月</XButton>
    </XButtonGroup>
  </div>
</XDocDemo>

## 混合状态

按钮组不改变按钮自身能力，`disabled`、`loading`、`variant` 和点击事件仍然由每个 `XButton` 控制。

<XDocDemo title="混合状态" :code="buttonGroupStateCode">
  <div class="x-demo-row">
    <XButtonGroup width="360px">
      <XButton>保存</XButton>
      <XButton variant="outline">预览</XButton>
      <XButton variant="outline" disabled>发布</XButton>
    </XButtonGroup>
  </div>
</XDocDemo>

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `direction` | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| `width` | 按钮组宽度，数字按 px 处理 | `number \| string` | 自适应内容 |
| `height` | 按钮组高度，数字按 px 处理 | `number \| string` | 自适应内容 |
| `radius` | 按钮组外侧圆角，数字按 px 处理 | `number \| string` | `6px` |
| `borderColor` | 通过按钮级变量传递给组内按钮的边框色 | `string` | 按按钮类型决定 |
| `backgroundColor` | 通过按钮级变量传递给组内按钮的背景色 | `string` | 按按钮类型决定 |
| `textColor` | 通过按钮级变量传递给组内按钮的文字色 | `string` | 按按钮类型决定 |
| `borderWidth` | 传递给组内按钮的边框宽度，数字按 px 处理 | `number \| string` | `1px` |

## Slots

| 插槽名 | 说明 |
| --- | --- |
| `default` | 一组按钮，推荐直接放置多个 `XButton` |

## 手动验收建议

- 切换横向和竖向排列，确认按钮之间连续贴合。
- 修改 `radius`，确认只有按钮组最外侧四个角出现圆角。
- 放入不同 `variant`、`disabled`、`loading` 的按钮，确认按钮自身状态仍正常。
- 设置较窄父容器，确认长文本不会溢出到相邻按钮外。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XButtonGroup / `ButtonGroupProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |
| `showActiveBorder` | 是否显示激活边框 | `boolean` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
