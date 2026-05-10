# 按钮 Button

用于表单、弹窗、工具栏等场景中的基础操作。

## 交互式预览

你可以在这里手动切换按钮类型、尺寸、加载状态和禁用状态，并点击按钮确认事件是否正常触发。

<ButtonPlayground />

## 类型

<div class="x-demo-row">
  <XButton>主要按钮</XButton>
  <XButton variant="outline">描边按钮</XButton>
  <XButton variant="ghost">文本按钮</XButton>
</div>

```vue
<XButton>主要按钮</XButton>
<XButton variant="outline">描边按钮</XButton>
<XButton variant="ghost">文本按钮</XButton>
```

## 尺寸

<div class="x-demo-row">
  <XButton size="sm">小按钮</XButton>
  <XButton>默认按钮</XButton>
  <XButton size="lg">大按钮</XButton>
</div>

```vue
<XButton size="sm">小按钮</XButton>
<XButton>默认按钮</XButton>
<XButton size="lg">大按钮</XButton>
```

## 状态

<div class="x-demo-row">
  <XButton loading>加载中</XButton>
  <XButton disabled>禁用状态</XButton>
</div>

```vue
<XButton loading>加载中</XButton>
<XButton disabled>禁用状态</XButton>
```

## 手动验收建议

- 切换 `类型`，确认主要、描边、文本按钮的颜色层级是否符合预期。
- 切换 `尺寸`，确认按钮高度、字号、左右间距是否协调。
- 勾选 `加载中`，确认按钮不可重复点击，并出现加载图标。
- 勾选 `禁用`，确认按钮不可点击，视觉上有明确禁用态。
- 在桌面和移动端宽度下检查按钮文本是否溢出。
