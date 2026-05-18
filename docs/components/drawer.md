# 抽屉 Drawer

从屏幕边缘滑出的容器，适合配置面板、详情面板和页面构建器属性面板。

## 基础用法

```vue
<XDrawer v-model="visible" title="配置面板" panel-size="360px">
  抽屉内容
</XDrawer>
```

## Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 显示状态 | `boolean` | `false` |
| title | 标题 | `string` | - |
| direction | 展开方向 | `rtl \| ltr \| ttb \| btt` | `rtl` |
| size | 尺寸规格，仅影响字号和关闭按钮尺寸，不影响头部、正文、底部留白与面板圆角 | `sm \| md \| lg` | `md` |
| panelSize | 面板宽度或高度，左右抽屉控制宽度，上下抽屉控制高度 | `number \| string` | `30%` |
| withHeader | 是否显示头部 | `boolean` | `true` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| closeOnMaskClick | 点击遮罩是否关闭 | `boolean` | `true` |
| destroyOnClose | 关闭后是否销毁内容 | `boolean` | `false` |
| zIndex | 遮罩层级 | `number` | `1800` |
| backgroundColor | 面板背景色，会写入 `--x-drawer-bg` 和 `--x-element-bg` | `string` | - |
| textColor | 面板文字色，会写入 `--x-drawer-text` 和 `--x-element-text` | `string` | - |
| borderColor | 面板边框色，会写入 `--x-drawer-border-color` 和 `--x-element-border-color` | `string` | - |
| borderWidth | 面板边框宽度，会写入 `--x-drawer-border-width` 和 `--x-element-border-width` | `number \| string` | - |
| maskColor | 遮罩背景色 | `string` | - |
| titleColor | 标题文字色 | `string` | - |
| headerBackgroundColor | 头部背景色 | `string` | - |
| bodyBackgroundColor | 内容区背景色 | `string` | - |
| footerBackgroundColor | 底部背景色 | `string` | - |
| headerBorderColor | 头部分割线颜色 | `string` | - |
| footerBorderColor | 底部分割线颜色 | `string` | - |
| closeIconColor | 关闭按钮图标颜色 | `string` | - |
| closeIconHoverColor | 关闭按钮悬浮图标颜色 | `string` | - |
| closeIconHoverBackgroundColor | 关闭按钮悬浮背景色 | `string` | - |
| shadow | 面板阴影 | `string` | - |

## 主题变量

`XDrawer` 的默认颜色可由全局 CSS 变量统一控制，单个实例传入 props 时优先级更高。

| 变量 | 说明 |
| --- | --- |
| `--x-drawer-mask` | 遮罩背景 |
| `--x-drawer-bg` | 面板背景 |
| `--x-drawer-text` | 面板文字 |
| `--x-drawer-title` | 标题文字 |
| `--x-drawer-border-color` | 面板边框颜色 |
| `--x-drawer-border-width` | 面板边框宽度 |
| `--x-drawer-header-bg` | 头部背景 |
| `--x-drawer-body-bg` | 内容区背景 |
| `--x-drawer-footer-bg` | 底部背景 |
| `--x-drawer-header-border` | 头部分割线 |
| `--x-drawer-footer-border` | 底部分割线 |
| `--x-drawer-header-padding` | 头部内边距 |
| `--x-drawer-body-padding` | 内容区内边距 |
| `--x-drawer-footer-padding` | 底部内边距 |
| `--x-drawer-close-icon` | 关闭按钮图标 |
| `--x-drawer-close-icon-hover` | 关闭按钮悬浮图标 |
| `--x-drawer-close-hover-bg` | 关闭按钮悬浮背景 |
| `--x-drawer-shadow` | 面板阴影 |
| `--x-drawer-z-index` | 遮罩层级 |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 显示状态变化 |
| open | 打开动画结束后触发 |
| close | 请求关闭时触发 |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 抽屉主体内容 |
| header | 自定义头部内容 |
| footer | 自定义底部内容 |
