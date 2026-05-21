# BaseX 可复制适配层

本目录是一套基于 `x.ui` 的本地封装模板，适合复制到业务项目的 `src/components/base-xui` 下使用。

## 复制

```powershell
robocopy "D:\UGit\x-ui\templates\base-xui" "目标项目\src\components\base-xui" /E
```

## 接入

```ts
import { createApp } from 'vue'
import XUi from 'x.ui'
import 'x.ui/style.css'
import { BaseXPlugin } from './components/base-xui'

createApp(App)
  .use(XUi)
  .use(BaseXPlugin)
  .mount('#app')
```

## 业务接口

复制后可以通过 `BaseXPlugin` 传入业务配置：

```ts
app.use(BaseXPlugin, {
  currentSize: 'md',
  getPermissionResource: () => 'system.user',
  canUseAction: ({ permission, resource, permissionAction }) => {
    if (permission === false) return false
    if (permission === true) return true
    const code = typeof permission === 'string' && permission ? permission : `${resource}.${permissionAction}`
    return authStore.hasPermission(code)
  },
  printAdapter,
})
```

- `currentSize`：默认尺寸，支持 `sm`、`md`、`lg`。
- `theme`：覆盖表单、开关、文本、Tabs、文件磁盘等默认主题变量。
- `tableTheme`：覆盖 `BaseXTable` 的默认表格主题属性。
- `canUseAction`：接入表格新增、修改、删除按钮权限。
- `getPermissionResource`：在表格没有传 `crudResource` 时提供默认资源名。
- `printAdapter`：接入打印服务；不配置时 `PrintActions` 会保持禁用状态。

## 注意

这套代码是复制模板，不是 `x.ui` 运行时导出的一部分。复制到项目后可以直接按业务需要修改封装代码。
