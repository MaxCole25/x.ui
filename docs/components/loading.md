<script setup lang="ts">
const loadingDirectiveCode = `<div v-loading="loading" class="panel">
  正在加载的数据区域
</div>`

const loadingComponentCode = `<div style="position: relative; min-height: 160px">
  <XLoading model-value text="加载中" />
</div>`

const loadingServiceCode = `import { XLoadingService } from 'x.ui'

const loading = XLoadingService({ text: '提交中' })
setTimeout(() => loading.close(), 1200)`
</script>

# Loading 加载

`XLoading` 参考 Element Plus 的 `v-loading`，提供组件、指令和服务三种使用方式。

## 指令用法

全量安装 `x.ui` 后可直接使用 `v-loading`：

<XDocDemo title="指令用法" :code="loadingDirectiveCode">
  <div style="position: relative; min-height: 120px; border: 1px dashed var(--x-color-border); border-radius: 6px; padding: 16px">
    <p>正在加载的数据区域</p>
    <XLoading model-value text="加载中" />
  </div>
</XDocDemo>

## 组件用法

<XDocDemo title="组件用法" :code="loadingComponentCode">
  <div style="position: relative; min-height: 160px">
    <XLoading model-value text="加载中" />
  </div>
</XDocDemo>

## 服务用法

<XDocDemo title="服务用法" :code="loadingServiceCode" language="ts">
  <div style="position: relative; min-height: 120px; border: 1px dashed var(--x-color-border); border-radius: 6px; padding: 16px">
    <p>服务调用会把加载层挂载到指定目标或全屏区域。</p>
    <XLoading model-value text="提交中" background-color="rgba(255, 255, 255, 0.68)" />
  </div>
</XDocDemo>

## Props / Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 是否显示，仅组件模式使用 | `boolean` | `false` |
| text | 加载文字 | `string` | `''` |
| fullscreen | 是否全屏 | `boolean` | `false` |
| lock | 是否锁定滚动，预留接口 | `boolean` | `false` |
| backgroundColor | 遮罩背景色 | `string` | `rgba(255, 255, 255, 0.76)` |
| textColor | 文字色 | `string` | `#1264f4` |
| spinnerColor | 加载图标色 | `string` | `#1264f4` |
| spinnerSize | 加载图标长度 | `number \| string` | `32` |
| zIndex | 层级 | `number` | `2100` |
| target | 服务挂载目标 | `HTMLElement \| string` | `document.body` |

## 手动验收建议

- 检查局部容器 `v-loading` 是否覆盖在当前容器内。
- 检查服务调用是否自动全屏，并可通过 `close()` 关闭。
- 检查背景色、文字色、图标色和图标大小是否生效。

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:START -->
## 公开属性补充

以下属性来自组件公开 `Props` 类型，用于补齐现有文档中未展开的接口字段。

### XLoading / `LoadingProps`

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 尺寸规格 | `XSize` | — |

<!-- AUTO-GENERATED-PROPS-SUPPLEMENT:END -->
