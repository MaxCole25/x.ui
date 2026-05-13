# 头像 Avatar

用于展示用户头像、姓名缩写或自定义头像内容。

## 基础用法

<XAvatar name="UX" />
<XAvatar name="王小明" size="lg" />
<XAvatar name="边框" border-width="2px" border-color="#0f172a" />

```vue
<XAvatar name="UX" />
<XAvatar name="王小明" size="lg" />
<XAvatar name="边框" border-width="2px" border-color="#0f172a" />
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| name | 显示名称，图片不可用时取前两个字符 | `string` | - |
| size | 尺寸 | `sm \| md \| lg` | `md` |
| shape | 形状 | `circle \| square` | `circle` |
| color | 背景色 | `string` | - |
| borderWidth | 边框粗细，数字会按 px 处理 | `number \| string` | - |
| borderColor | 边框颜色 | `string` | `#fff` |
