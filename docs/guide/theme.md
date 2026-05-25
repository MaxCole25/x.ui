# 主题基础色

x.ui 默认通过 CSS 变量预设组件基础色。业务项目不需要额外安装主题插件，也不需要修改 `app.use(XUi)` 的方式，只要在引入 `x.ui/style.css` 之后覆盖对应变量即可。

## 基础接入

```ts
import { createApp } from 'vue'
import XUi from 'x.ui'
import 'x.ui/style.css'
import './x-ui-theme.css'
import App from './App.vue'

createApp(App).use(XUi).mount('#app')
```

`x-ui-theme.css` 示例：

```css
:root {
  --x-color-primary: #1677ff;
  --x-color-primary-hover: #0958d9;
  --x-color-primary-soft: #e6f4ff;
  --x-color-text: #1f2937;
  --x-color-text-muted: #667085;
  --x-color-border: #d9d9d9;
  --x-color-surface: #ffffff;
}
```

## 可覆盖变量

下面列出主题基础色的所有初始值。色块展示的是浏览器最终渲染颜色；像 `--x-color-text-muted` 这类引用变量，会同时保留原始变量值和解析后的实际颜色。

<style>
.x-theme-color-swatch {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  vertical-align: middle;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.38);
}
</style>

### 浅色主题默认初始值

| 色块 | 变量 | 初始值 | 用途 |
| --- | --- | --- | --- |
| <span class="x-theme-color-swatch" style="background: #1264f4;"></span> | `--x-color-primary` | `#1264f4` | 主色，用于主按钮、激活态、选中态和重点交互 |
| <span class="x-theme-color-swatch" style="background: #0f54d6;"></span> | `--x-color-primary-hover` | `#0f54d6` | 主色 hover 或按下态 |
| <span class="x-theme-color-swatch" style="background: #e0ecff;"></span> | `--x-color-primary-soft` | `#e0ecff` | 主色浅背景，用于 hover 背景、轻量选中态 |
| <span class="x-theme-color-swatch" style="background: #ffffff;"></span> | `--x-color-primary-text` | `#ffffff` | 主色背景上的文字色 |
| <span class="x-theme-color-swatch" style="background: #16a34a;"></span> | `--x-color-success` | `#16a34a` | 成功色 |
| <span class="x-theme-color-swatch" style="background: #f0f9eb;"></span> | `--x-color-success-soft` | `#f0f9eb` | 成功浅背景 |
| <span class="x-theme-color-swatch" style="background: #c2e7b0;"></span> | `--x-color-success-border` | `#c2e7b0` | 成功边框色 |
| <span class="x-theme-color-swatch" style="background: #166534;"></span> | `--x-color-success-text` | `#166534` | 成功文字色 |
| <span class="x-theme-color-swatch" style="background: #d97706;"></span> | `--x-color-warning` | `#d97706` | 警告色 |
| <span class="x-theme-color-swatch" style="background: #fdf6ec;"></span> | `--x-color-warning-soft` | `#fdf6ec` | 警告浅背景 |
| <span class="x-theme-color-swatch" style="background: #f3d19e;"></span> | `--x-color-warning-border` | `#f3d19e` | 警告边框色 |
| <span class="x-theme-color-swatch" style="background: #92400e;"></span> | `--x-color-warning-text` | `#92400e` | 警告文字色 |
| <span class="x-theme-color-swatch" style="background: #dc2626;"></span> | `--x-color-danger` | `#dc2626` | 危险或错误色 |
| <span class="x-theme-color-swatch" style="background: #fef0f0;"></span> | `--x-color-danger-soft` | `#fef0f0` | 危险浅背景 |
| <span class="x-theme-color-swatch" style="background: #fab6b6;"></span> | `--x-color-danger-border` | `#fab6b6` | 危险边框色 |
| <span class="x-theme-color-swatch" style="background: #b91c1c;"></span> | `--x-color-danger-text` | `#b91c1c` | 危险文字色 |
| <span class="x-theme-color-swatch" style="background: #64748b;"></span> | `--x-color-info` | `#64748b` | 信息色 |
| <span class="x-theme-color-swatch" style="background: #f4f4f5;"></span> | `--x-color-info-soft` | `#f4f4f5` | 信息浅背景 |
| <span class="x-theme-color-swatch" style="background: #d4d7de;"></span> | `--x-color-info-border` | `#d4d7de` | 信息边框色 |
| <span class="x-theme-color-swatch" style="background: #475569;"></span> | `--x-color-info-text` | `#475569` | 信息文字色 |
| <span class="x-theme-color-swatch" style="background: #121826;"></span> | `--x-color-text` | `#121826` | 默认正文色 |
| <span class="x-theme-color-swatch" style="background: #606b7d;"></span> | `--x-color-muted` | `#606b7d` | 次要色 |
| <span class="x-theme-color-swatch" style="background: #606b7d;"></span> | `--x-color-text-muted` | `var(--x-color-muted)`，解析为 `#606b7d` | 次要文字色 |
| <span class="x-theme-color-swatch" style="background: #d1d9e6;"></span> | `--x-color-border` | `#d1d9e6` | 默认边框色 |
| <span class="x-theme-color-swatch" style="background: #ffffff;"></span> | `--x-color-surface` | `#ffffff` | 默认组件表面背景 |
| <span class="x-theme-color-swatch" style="background: #f1f5f9;"></span> | `--x-color-disabled-bg` | `#f1f5f9` | 禁用背景色 |
| <span class="x-theme-color-swatch" style="background: #94a3b8;"></span> | `--x-color-disabled-text` | `#94a3b8` | 禁用文字色 |
| <span class="x-theme-color-swatch" style="background: #d4d7de;"></span> | `--x-color-disabled-border` | `#d4d7de` | 禁用边框色 |

### 暗色主题初始值

当根节点或上层容器命中 `:root.dark`、`:root[data-theme='dark']`、`[data-theme='dark']` 或 `[data-doc-theme-scheme='dark']` 时，会使用下面这组基础色。

| 色块 | 变量 | 初始值 | 用途 |
| --- | --- | --- | --- |
| <span class="x-theme-color-swatch" style="background: #3b82f6;"></span> | `--x-color-primary` | `#3b82f6` | 主色，用于主按钮、激活态、选中态和重点交互 |
| <span class="x-theme-color-swatch" style="background: #60a5fa;"></span> | `--x-color-primary-hover` | `#60a5fa` | 主色 hover 或按下态 |
| <span class="x-theme-color-swatch" style="background: rgba(59, 130, 246, 0.16);"></span> | `--x-color-primary-soft` | `rgba(59, 130, 246, 0.16)` | 主色浅背景，用于 hover 背景、轻量选中态 |
| <span class="x-theme-color-swatch" style="background: #ffffff;"></span> | `--x-color-primary-text` | `#ffffff` | 主色背景上的文字色 |
| <span class="x-theme-color-swatch" style="background: #22c55e;"></span> | `--x-color-success` | `#22c55e` | 成功色 |
| <span class="x-theme-color-swatch" style="background: rgba(34, 197, 94, 0.16);"></span> | `--x-color-success-soft` | `rgba(34, 197, 94, 0.16)` | 成功浅背景 |
| <span class="x-theme-color-swatch" style="background: rgba(34, 197, 94, 0.38);"></span> | `--x-color-success-border` | `rgba(34, 197, 94, 0.38)` | 成功边框色 |
| <span class="x-theme-color-swatch" style="background: #86efac;"></span> | `--x-color-success-text` | `#86efac` | 成功文字色 |
| <span class="x-theme-color-swatch" style="background: #f59e0b;"></span> | `--x-color-warning` | `#f59e0b` | 警告色 |
| <span class="x-theme-color-swatch" style="background: rgba(245, 158, 11, 0.16);"></span> | `--x-color-warning-soft` | `rgba(245, 158, 11, 0.16)` | 警告浅背景 |
| <span class="x-theme-color-swatch" style="background: rgba(245, 158, 11, 0.38);"></span> | `--x-color-warning-border` | `rgba(245, 158, 11, 0.38)` | 警告边框色 |
| <span class="x-theme-color-swatch" style="background: #fcd34d;"></span> | `--x-color-warning-text` | `#fcd34d` | 警告文字色 |
| <span class="x-theme-color-swatch" style="background: #f87171;"></span> | `--x-color-danger` | `#f87171` | 危险或错误色 |
| <span class="x-theme-color-swatch" style="background: rgba(248, 113, 113, 0.16);"></span> | `--x-color-danger-soft` | `rgba(248, 113, 113, 0.16)` | 危险浅背景 |
| <span class="x-theme-color-swatch" style="background: rgba(248, 113, 113, 0.38);"></span> | `--x-color-danger-border` | `rgba(248, 113, 113, 0.38)` | 危险边框色 |
| <span class="x-theme-color-swatch" style="background: #fca5a5;"></span> | `--x-color-danger-text` | `#fca5a5` | 危险文字色 |
| <span class="x-theme-color-swatch" style="background: #94a3b8;"></span> | `--x-color-info` | `#94a3b8` | 信息色 |
| <span class="x-theme-color-swatch" style="background: rgba(148, 163, 184, 0.14);"></span> | `--x-color-info-soft` | `rgba(148, 163, 184, 0.14)` | 信息浅背景 |
| <span class="x-theme-color-swatch" style="background: rgba(148, 163, 184, 0.32);"></span> | `--x-color-info-border` | `rgba(148, 163, 184, 0.32)` | 信息边框色 |
| <span class="x-theme-color-swatch" style="background: #cbd5e1;"></span> | `--x-color-info-text` | `#cbd5e1` | 信息文字色 |
| <span class="x-theme-color-swatch" style="background: #eef4fb;"></span> | `--x-color-text` | `#eef4fb` | 默认正文色 |
| <span class="x-theme-color-swatch" style="background: #8da0b8;"></span> | `--x-color-muted` | `#8da0b8` | 次要色 |
| <span class="x-theme-color-swatch" style="background: #8da0b8;"></span> | `--x-color-text-muted` | `var(--x-color-muted)`，解析为 `#8da0b8` | 次要文字色 |
| <span class="x-theme-color-swatch" style="background: #203247;"></span> | `--x-color-border` | `#203247` | 默认边框色 |
| <span class="x-theme-color-swatch" style="background: #0b1726;"></span> | `--x-color-surface` | `#0b1726` | 默认组件表面背景 |
| <span class="x-theme-color-swatch" style="background: #111f31;"></span> | `--x-color-disabled-bg` | `#111f31` | 禁用背景色 |
| <span class="x-theme-color-swatch" style="background: #60738d;"></span> | `--x-color-disabled-text` | `#60738d` | 禁用文字色 |
| <span class="x-theme-color-swatch" style="background: #334155;"></span> | `--x-color-disabled-border` | `#334155` | 禁用边框色 |

`success`、`warning`、`danger`、`info` 还提供 `-soft`、`-border`、`-text` 后缀变量，用于消息提示、标签和状态类组件。

## 局部主题

CSS 变量可以放在业务容器上，只有容器内部的 x.ui 组件会使用这组颜色：

```css
.admin-theme {
  --x-color-primary: #0f766e;
  --x-color-primary-hover: #115e59;
  --x-color-primary-soft: #ccfbf1;
}
```

组件自身的颜色 props 和组件级变量优先级更高，适合临时覆盖某个组件；全局基础色适合统一业务项目的主色、文字、边框和状态色。
