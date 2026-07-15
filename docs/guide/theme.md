# 内置主题

x.ui 内置三套主题，全部通过 CSS 变量实现，不需要额外插件，也不改变 `app.use(XUi)` 的方式。

- `regular`：常规蓝白主题，也是未设置主题时的默认值。
- `dark`：深蓝灰主题，适合暗色工作台。
- `light`：纯白底色与线条点缀的浅色主题。

<ThemePreview />

## 全局启用

主题必须设置在 `<html>` 上。这样 Select、Dialog、Message、Tooltip 等 Teleport 到 `body` 的浮层才能与页面保持一致。

```ts
import { createApp } from 'vue'
import XUi from 'xl.ui'
import 'xl.ui/style.css'
import App from './App.vue'

document.documentElement.dataset.theme = 'dark'

createApp(App).use(XUi).mount('#app')
```

`regular` 可以省略：删除 `data-theme` 与设置 `data-theme="regular"` 的效果相同。

```ts
type XUiTheme = 'regular' | 'dark' | 'light'

function setTheme(theme: XUiTheme) {
  document.documentElement.dataset.theme = theme
}
```

主题切换会立即生效；x.ui 不会自动读取系统主题，也不会保存用户选择。

## 主题基础色

| Token | 常规 `regular` | 深色 `dark` | 浅色 `light` | 用途 |
| --- | --- | --- | --- | --- |
| `--x-color-page-background` | `#f5f5f5` | `#08111f` | `#ffffff` | 页面背景 |
| `--x-color-primary` | `#586085` | `#3b82f6` | `#2f6fed` | 重点交互与激活态 |
| `--x-color-primary-hover` | `#263d6f` | `#60a5fa` | `#245dc9` | 主色 hover |
| `--x-color-primary-soft` | `#eeeeee` | `rgba(59, 130, 246, .16)` | `#f4f8ff` | 轻量选中与 hover 背景 |
| `--x-color-text` | `#14221f` | `#eef4fb` | `#1f2937` | 正文颜色 |
| `--x-color-text-muted` | `#52615d` | `#8da0b8` | `#66758a` | 次要文字和图标 |
| `--x-color-surface` | `#ffffff` | `#0b1726` | `#ffffff` | 组件表面 |
| `--x-color-surface-soft` | `#e8f2ee` | `#12243a` | `#f9fbfd` | 次级表面 |
| `--x-color-border` | `#cdded7` | `#203247` | `#cbd7e6` | 默认边框 |
| `--x-color-border-strong` | `#7fa5dd` | `#36506d` | `#9fb1c7` | 强调边框 |
| `--x-color-disabled-bg` | `#f1f5f9` | `#111f31` | `#f7f9fc` | 禁用背景 |

成功、警告、危险、信息色均提供 `--x-color-{status}`、`-soft`、`-border`、`-text` 四组 token；浮层和表格还提供 `--x-dialog-*`、`--x-drawer-*`、`--x-tooltip-*`、`--x-table-*` 专属 token，并随三套主题同步切换。

## 业务布局接入

主题 token 只能影响使用它们的业务样式。应用外壳、页面内容区、面板和业务表头请避免写死 `#fff`、`#cbd5e1` 等颜色，改为使用下列语义 token：

```css
.app-shell {
  background: var(--x-color-page-background);
  color: var(--x-color-text);
}

.app-panel {
  background: var(--x-color-surface);
  border: 1px solid var(--x-color-border);
}

.app-toolbar,
.app-table-header {
  background: var(--x-color-surface-soft);
  border-color: var(--x-color-border);
}
```

这样 `regular` 会呈现浅蓝灰画布与蓝调次级面板，`light` 则保持白底和中性线框；不消费 token 的业务布局不会随组件库主题切换。

## 自定义主题

内置主题是预设，不限制业务自定义。请在引入 `xl.ui/style.css` **之后**加载业务样式，并覆盖需要改变的 token；没有覆盖的 token 会继承常规主题的默认值。

```css
:root[data-theme='brand'] {
  --x-color-page-background: #faf7ff;
  --x-color-primary: #7c3aed;
  --x-color-primary-hover: #6d28d9;
  --x-color-primary-soft: #f3e8ff;
  --x-color-text: #24113d;
  --x-color-border: #d8b4fe;
  --x-color-surface: #ffffff;
}
```

```ts
document.documentElement.dataset.theme = 'brand'
```

组件的颜色 Props 和组件专属 CSS 变量优先级高于全局 token，适合对单个实例做临时覆盖。

## 使用限制

- 公开内置主题值为 `regular`、`dark`、`light`；自定义值由业务 CSS 自行定义。
- 本期只保证 `<html data-theme="...">` 的全局主题。把主题写在局部容器时，容器内的普通组件可以继承变量，但 Teleport 浮层仍会使用 `html` / `body` 的全局主题。
- 为兼容现有文档站，`.dark` 与 `data-doc-theme-scheme="dark"` 仍会触发深色 token；业务项目请统一使用 `data-theme`。
