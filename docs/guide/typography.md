<script setup lang="ts">
import TypographyDemo from '../.vitepress/components/TypographyDemo.vue'
import demoSource from '../.vitepress/components/TypographyDemo.vue?raw'

const code = demoSource
  .replace('../../../src/components/basic-components/button', '@x-soft88/x-ui')
  .replace('../../../src/components/form-components/input', '@x-soft88/x-ui')
  .replace('../../../src/components/form-components/input-number', '@x-soft88/x-ui')
  .replace('../../../src/components/form-components/select', '@x-soft88/x-ui')
  .replace('../../../src/components/form-components/textarea', '@x-soft88/x-ui')
  .replace('../../../src/components/basic-components/text', '@x-soft88/x-ui')
  .replace('../../../src/components/basic-components/card', '@x-soft88/x-ui')
  .replace("import { ref } from 'vue'", "import { ref } from 'vue'\nimport '@x-soft88/x-ui/style.css'")
</script>

# 字体与控件高度

组件使用 `fontSize` 设置字号，类型为 `number`，单位固定为 px；Vue 模板中写作 `:font-size="14"`。旧的 `size` 属性和 `sm/md/lg` 档位已移除，不提供兼容别名。

## 字号与高度分别设置

按钮、单行输入框、选择器、日期和时间输入等常规控件默认字号为 14px、高度为 32px。通过 `fontSize` 改字号，通过 `height` 改高度，两者独立，内边距和圆角也不会随字号改变。

<XDocDemo title="独立调整字号和高度" :code="code">
  <TypographyDemo />
</XDocDemo>

`XForm` 的 `fontSize` 可以由内部表单控件继承，控件自己的 `fontSize` 优先。多行输入框继续使用 `rows`、`autoHeight` 或显式高度；卡片、布局容器、表格、弹窗和抽屉继续由内容或自身布局属性决定高度，不能把它们的整体高度设成 32px。表格行高由 `rowHeight` 控制。

开关轨道保留胶囊外观及 24px 默认视觉高度，可通过 `height` 调整；单选和复选的操作区域默认高 32px，内部标记不会随文字放大。头像使用 `avatarSize`、图标使用 `iconSize` 设置图形尺寸。

卡片正文、弹窗正文、表格、列表、普通文本、多行输入框和编辑器文本区域的默认字号同样为 **14px**；高度继续按各自布局设置。

## 默认文字层级

| 用途 | 字号 | 字重 | 行高 |
| --- | --- | --- | --- |
| 常规控件 | 14px | 400 | 1.5 |
| 内容正文、文本区域 | 14px | 400 | 1.5 |
| 辅助说明 | 12px | 400 | 1.5 |
| 卡片、分组标题 | 14px | 600 | 1.4 |
| 弹窗、抽屉标题 | 16px | 600 | 1.4 |
| 页面标题 | 20px | 600 | 1.3 |

以上是默认层级，组件的 `fontSize` 或局部标题属性可用于明确的业务覆盖。按钮和图标等单行控件保留适合居中的行高，代码内容使用等宽字体。

## 字体与主题变量

默认字体依次为系统字体、Segoe UI、苹方、微软雅黑、Noto Sans CJK SC 和通用无衬线字体；实际使用系统已安装的字体。需要指定字体的控件可以使用 `fontFamily`。

```css
:root {
  --x-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
    "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif;
  --x-font-family-mono: ui-monospace, SFMono-Regular, Consolas,
    "Liberation Mono", monospace;
  --x-font-size-control: 14px;
  --x-font-size-caption: 12px;
  --x-font-size-body: 14px;
  --x-font-size-section-title: 14px;
  --x-font-size-dialog-title: 16px;
  --x-font-size-page-title: 20px;
  --x-font-weight-regular: 400;
  --x-font-weight-semibold: 600;
  --x-line-height-body: 1.5;
  --x-line-height-title: 1.4;
}
```

局部显式字号优先于主题默认值；主题变量不会覆盖调用方传入的属性。正文、辅助、禁用和状态文字继续使用全局语义颜色，避免为每个组件写固定色值。
