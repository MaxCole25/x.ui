# 颜色选择器面板 ColorPickerPanel

用于展示颜色预览、色板和颜色值输入。

## 基础用法

```vue
<XColorPickerPanel v-model="color" />
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 当前颜色值 | `string` | `#1264f4` |
| colors | 预设色板 | `string[]` | 内置色板 |
