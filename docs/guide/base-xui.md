# BaseX 可复制封装

`BaseX` 是一套基于 `x.ui` 的本地二次封装模板，用来把常用默认尺寸、主题、表格按钮、单元格编辑组件、打印动作等能力收敛到业务项目自己的 `components/base-xui` 目录中。

它不是 npm 包导出能力，而是一个可复制模板。复制后项目可以直接改封装代码，也可以通过少量通用接口接入权限、主题和打印服务。

## 适用场景

- 希望业务项目默认使用同一套 `x.ui` 外观参数。
- 希望 `BaseXButton`、`BaseXInput`、`BaseXTable` 这类常用封装复制后直接可用。
- 不想每个项目都重新写一遍尺寸映射、表格主题、单元格编辑组件。
- 允许复制后按项目实际需求继续修改封装代码。

## 复制模板

在 PowerShell 中执行：

```powershell
robocopy "D:\UGit\x-ui\templates\base-xui" "目标项目\src\components\base-xui" /E
```

如果目标目录已经存在，`robocopy` 会同步新增和修改的文件。复制前建议先确认目标项目中没有同名业务文件被覆盖。

## 基础接入

目标项目需要安装并使用 `x.ui`，然后注册 `BaseXPlugin`：

```ts
import { createApp } from 'vue'
import XUi from 'x.ui'
import 'x.ui/style.css'
import { BaseXPlugin } from './components/base-xui'
import App from './App.vue'

createApp(App)
  .use(XUi)
  .use(BaseXPlugin)
  .mount('#app')
```

注册后可以在模板中直接使用全局组件：

```vue
<template>
  <BaseXButton type="primary">保存</BaseXButton>
  <BaseXInput v-model="keyword" placeholder="请输入关键字" />
</template>
```

也可以按需导入：

```vue
<script setup lang="ts">
import { BaseXButton, BaseXInput } from '@/components/base-xui'
</script>
```

## 配置尺寸

`BaseX` 默认使用 `md` 尺寸。可通过 `currentSize` 修改默认值：

```ts
app.use(BaseXPlugin, {
  currentSize: 'sm',
})
```

如果项目里已有响应式尺寸状态，也可以传函数：

```ts
app.use(BaseXPlugin, {
  currentSize: () => userPreferences.uiSize,
})
```

组件仍然兼容 `small`、`default`、`large`，会映射为 `sm`、`md`、`lg`。

## 配置主题

默认主题使用 CSS 变量，并带有兜底颜色。项目可以通过 `theme` 覆盖指定区域：

```ts
import { defaultBaseXTheme } from '@/components/base-xui'

app.use(BaseXPlugin, {
  theme: {
    ...defaultBaseXTheme,
    formControl: {
      ...defaultBaseXTheme.formControl,
      backgroundColor: 'var(--color-input-bg)',
      activeBorderColor: 'var(--color-primary-600)',
    },
  },
})
```

表格主题单独通过 `tableTheme` 覆盖：

```ts
app.use(BaseXPlugin, {
  tableTheme: {
    headerHeight: 44,
    rowHeight: 46,
    headerBackgroundColor: 'var(--color-table-header-bg)',
  },
})
```

## 表格权限接口

`BaseXTable` 保留 `showCrudActions`、`crudResource`、`actionPermissions`、`actionDisabled`。它不再直接依赖路由或 store，而是通过 `canUseAction` 接业务权限：

```ts
app.use(BaseXPlugin, {
  getPermissionResource: () => route.meta.permissionBase as string,
  canUseAction: ({ permission, resource, permissionAction }) => {
    if (permission === false) return false
    if (permission === true) return true

    const code = typeof permission === 'string' && permission
      ? permission
      : `${resource}.${permissionAction}`

    return authStore.hasPermission(code)
  },
})
```

使用示例：

```vue
<BaseXTable
  :columns="columns"
  :data="rows"
  show-crud-actions
  crud-resource="system.user"
  @add="openCreate"
  @edit="openEdit"
  @delete="removeSelected"
/>
```

## 打印接口

`PrintActions` 不再直接依赖某个业务项目的打印服务。需要打印时传入 `printAdapter`：

```ts
app.use(BaseXPlugin, {
  printAdapter: {
    getPrinters,
    getPrintSettings,
    savePrintSettings,
    renderPrintDocument,
    submitPrintJob,
    fetchPrintPreview,
    fetchPrintSource,
  },
})
```

组件使用：

```vue
<PrintActions
  template-path="/templates/order.xlsx"
  file-name="订单"
  :data="order"
/>
```

没有配置 `printAdapter` 时，打印相关按钮会禁用，避免复制到新项目后因为缺少打印服务而编译失败。

## 模板结构

```text
src/components/base-xui/
├─ baseXConfig.ts
├─ defaults.ts
├─ types.ts
├─ xSize.ts
├─ createBaseXComponent.ts
├─ BaseXButton.vue
├─ BaseXInput.vue
├─ BaseXTable.vue
├─ PrintActions.vue
└─ index.ts
```

- `baseXConfig.ts`：插件注册、全局配置、运行时读取。
- `defaults.ts`：默认主题、表格主题、预览和下载实现。
- `types.ts`：可对接业务的通用接口。
- `index.ts`：统一导出组件、类型和 `BaseXPlugin`。

## 修改建议

复制后的 `base-xui` 属于业务项目源码，可以直接修改。建议优先保持这些接口稳定：`BaseXPlugin`、`BaseXConfig`、`BaseXPrintAdapter`、`BaseXTable` 的权限参数。这样后续从模板同步改动时，冲突会更少。
