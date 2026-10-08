<script setup lang="ts">
import Example1 from '../examples/popover/Example1.vue'
import Example1Source from '../examples/popover/Example1.vue?raw'
</script>
# 气泡卡片 Popover

用于轻量说明、辅助编辑和上下文详情，位于 Tooltip 与 Dialog 之间。

## 使用示例

### 基础用法

<XDocDemo title="基础用法" :code="Example1Source">
  <Example1 />
</XDocDemo>

## 属性

默认值列列出显式默认配置；—表示未显式设置。未设置时的继承或显示效果另行注明。

### 数据与绑定

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `modelValue` | 是否显示 | `boolean` | `undefined` | — |

### 内容与展示

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `title` | 标题 | `string` | `''` | — |
| `content` | 内容 | `string` | `''` | — |
| `trigger` | 触发方式 | `PopoverTrigger` | `'click'` | — |

### 布局与尺寸

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `width` | 宽度，数字按 px 处理 | `number \| string` | `220` | 数字为 px；字符串使用 CSS 单位 |

### 外观与排版

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `fontSize` | 字号，单位 px；不改变控件高度、内边距或圆角 | `number` | `14` | px |

### 状态与交互

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `disabled` | 是否禁用 | `boolean` | `false` | — |
| `showArrow` | 是否显示浮层箭头 | `boolean` | `true` | — |

### 浮层与定位

| 属性名 | 说明 | 类型 | 默认值 | 单位 |
| --- | --- | --- | --- | --- |
| `placement` | 位置 | `PopoverPlacement` | `'bottom'` | — |
| `teleported` | 是否 Teleport | `boolean` | `true` | — |
| `teleportTo` | 浮层挂载目标的 CSS 选择器 | `string` | `'body'` | — |
| `zIndex` | 层级 | `number` | `2000` | — |

## 事件

### 数据与绑定

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `update:modelValue` | 显示状态变化 | `[value: boolean]` |

### 状态与交互

| 事件名 | 触发说明 | 参数 |
| --- | --- | --- |
| `show` | 显示时触发 | `[]` |
| `hide` | 隐藏时触发 | `[]` |

## 插槽

### 内容与展示

| 插槽名 | 说明 | 作用域参数 |
| --- | --- | --- |
| `default` | 默认内容或自定义内容 | `无作用域参数` |
| `content` | 内容 | `无作用域参数` |

## 公开类型

以下类型可从 `@x-soft88/x-ui` 导入。

### PopoverProps

```ts
export interface PopoverProps {
  modelValue?: boolean
  title?: string
  content?: string
  placement?: PopoverPlacement
  trigger?: PopoverTrigger
  disabled?: boolean
  showArrow?: boolean
  width?: number | string
  teleported?: boolean
  teleportTo?: string
  zIndex?: number
  fontSize?: number
}
```

## 关联类型

以下定义用于理解接口关联，未从包主入口直接导出；不要按这些名称从包名导入。

### PopoverPlacement

```ts
export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right'
```

### PopoverTrigger

```ts
export type PopoverTrigger = 'hover' | 'click' | 'focus'
```

## 验收说明

- 打开浮层后滚动父容器、调整窗口和内容尺寸，检查定位更新及边界翻转。
- 在打开状态切换 `teleported`，确认容器内显示不沿用旧视口坐标；连续切换后恢复默认或卸载，确认监听与 ResizeObserver 清理。

1. 在 Histoire 的外观接口中切换主要 Props，确认布局不溢出。
2. 在文档示例中确认组件能真实渲染，而不是只显示源码。
3. 对有事件的组件执行一次交互，确认事件参数符合文档描述。
