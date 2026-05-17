<script setup lang="ts">
import { XIcon } from '../../src'
import IconGallery from '../.vitepress/components/IconGallery.vue'
</script>

# 图标 Icon

`XIcon` 提供 x.ui 统一的图标调用方式。组件基于 Remix Icon，并额外提供常用语义别名，方便在按钮、表单、菜单、工具栏和业务组件中保持一致的尺寸、颜色和可访问性写法。

## 基础用法

<div class="x-icon-preview-row">
  <XIcon name="home"></XIcon>
  <XIcon name="search"></XIcon>
  <XIcon name="add"></XIcon>
  <XIcon name="edit"></XIcon>
  <XIcon name="delete"></XIcon>
</div>

```vue
<XIcon name="home" />
<XIcon name="search" />
<XIcon name="add" />
```

## 风格

当传入 `name="home"` 这类不带风格后缀的名称时，组件默认使用 `line` 风格。可通过 `variant="fill"` 切换填充风格。你也可以直接传入完整 Remix Icon 名称，例如 `home-fill`、`settings-3-line`。

<div class="x-icon-preview-row">
  <XIcon name="home" variant="line" size="lg"></XIcon>
  <XIcon name="home" variant="fill" size="lg"></XIcon>
  <XIcon name="settings-3-line" size="lg"></XIcon>
  <XIcon name="settings-3-fill" size="lg"></XIcon>
</div>

```vue
<XIcon name="home" variant="line" />
<XIcon name="home" variant="fill" />
<XIcon name="settings-3-line" />
```

## 尺寸、颜色和旋转

`size` 只表示统一 UI 尺寸，支持 `sm`、`md`、`lg`。需要指定图标本身像素大小时使用 `icon-size`，数字会按 `px` 处理。

<div class="x-icon-preview-row">
  <XIcon name="search" size="sm"></XIcon>
  <XIcon name="search" size="md"></XIcon>
  <XIcon name="search" size="lg"></XIcon>
  <XIcon name="loading" :icon-size="24" color="#1264f4" spin title="加载中"></XIcon>
</div>

```vue
<XIcon name="search" size="lg" color="#1264f4" />
<XIcon name="loading" :icon-size="24" spin title="加载中" />
```

## 语义别名

以下别名由 x.ui 维护，适合常见业务界面直接使用。

| 别名 | 对应图标 |
| --- | --- |
| `add` / `plus` | `add-line` |
| `edit` | `edit-line` |
| `delete` | `delete-bin-line` |
| `search` | `search-line` |
| `close` | `close-line` |
| `upload` | `upload-cloud-line` |
| `download` | `download-line` |
| `save` | `save-line` |
| `home` | `home-line` |
| `user` | `user-line` |
| `setting` | `settings-3-line` |
| `success` | `checkbox-circle-line` |
| `warning` | `alert-line` |
| `error` | `error-warning-line` |
| `info` | `information-line` |
| `loading` | `loader-4-line` |

## 全部图标

下面展示当前 x.ui 可用的全部 Remix Icon 图标。输入英文关键词可以快速筛选，复制卡片下方的名称作为 `name` 使用。

<IconGallery></IconGallery>

## 可访问性

默认情况下，未设置 `title` 的图标会被视为装饰图标，并设置 `aria-hidden="true"`。如果图标本身承担语义，请传入 `title`。

```vue
<XIcon name="notification-3" title="通知" />
```

## Props

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `name` | 图标名称，支持 x.ui 语义别名、Remix Icon 名称或 `ri-` 前缀名称 | `string` | - |
| `variant` | 当名称不带 `line` / `fill` 后缀时使用的风格 | `'line' \| 'fill'` | `'line'` |
| `size` | 统一 UI 尺寸 | `'sm' \| 'md' \| 'lg'` | `'md'` |
| `iconSize` | 图标本身尺寸，数字按 px 处理；未传 `size` 时可单独覆盖 | `number \| string` | - |
| `color` | 图标颜色 | `string` | 继承当前文字色 |
| `title` | 图标可访问名称 | `string` | - |
| `decorative` | 是否作为装饰图标处理 | `boolean` | 未设置 `title` 时为 `true` |
| `spin` | 是否旋转，常用于加载图标 | `boolean` | `false` |

## 手动验收建议

- 搜索 `home`、`file`、`arrow` 等关键词，确认全部图标列表可以筛选。
- 检查 `line` 和 `fill` 风格是否能正确切换。
- 设置 `sm`、`md`、`lg` 和 `icon-size`，确认图标大小符合预期。
- 设置 `color`，确认图标颜色不影响周围文本。
- 设置 `title`，确认图标具有可访问名称。

## 图标来源和许可

图标资产来自 Remix Icon。x.ui 仅作为组件库的一部分提供统一调用方式，不将 Remix Icon 重新包装为独立图标库。使用品牌类图标时，请同时遵守对应品牌的商标规则。
