# 文本 Text

用于展示标题、正文、辅助说明和状态文本。

## 基础用法

<XText>正文文本</XText>
<XText size="title">标题文本</XText>
<XText type="muted">辅助文本</XText>

```vue
<XText>正文文本</XText>
<XText size="title">标题文本</XText>
<XText type="muted">辅助文本</XText>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 文本尺寸 | `sm \| md \| lg \| title` | `md` |
| type | 文本语义色 | `default \| muted \| primary \| success \| warning \| danger` | `default` |
| tag | 渲染标签 | `string` | `span` |
| truncated | 是否单行省略 | `boolean` | `false` |
