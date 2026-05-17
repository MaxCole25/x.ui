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
| size | 宽度或高度 | `number \| string` | `30%` |
| withHeader | 是否显示头部 | `boolean` | `true` |
| showClose | 是否显示关闭按钮 | `boolean` | `true` |
| closeOnMaskClick | 点击遮罩是否关闭 | `boolean` | `true` |
| destroyOnClose | 关闭后是否销毁内容 | `boolean` | `false` |

## Events

| 名称 | 说明 |
| --- | --- |
| update:modelValue | 显示状态变化 |
| open | 打开动画结束后触发 |
| close | 请求关闭时触发 |
