# 使用 X.UI 组合业务页面

在线指南：https://maxcole25.github.io/x.ui/guide/ai-usage.html
组件索引：https://maxcole25.github.io/x.ui/llms.txt
完整公开文档：https://maxcole25.github.io/x.ui/llms-full.txt

1. 先检查业务项目 package.json、Vue 版本和已有样式入口。包名固定为 `@x-soft88/x-ui`，Vue peer 为 `^3.5.0`。包当前为 restricted 发布配置，安装失败先核对账号访问权限，或按仓库文档本地 link；不要假设已经公开发布。
2. 按功能搜索组件，布局先查 Brick、Grid、Flow、Layout；输入和反馈选已有对应组件。在线不可用时，读取本地组件文档或已安装类型声明，不凭其它库经验猜 API。
3. 对照具体组件 Props、默认值、事件、Slots、实例方法与公开类型。源码仓库查 `src/components/<category>/<component>/src/types.ts`、SFC 和 `src/index.ts`；安装包查 `dist/index.d.ts` 及其关联声明。仅导入根入口实际导出的组件与类型。
4. 用组件布局和 Props 组合业务页面，统一引入 `@x-soft88/x-ui/style.css`。字号用数字 `fontSize`，不把它当高度设置。主题 regular、dark、light 设置在 html 的 data-theme 上，兼顾 Teleport 浮层。优先主题默认值，不为每个控件重复硬编码颜色。
5. 能力不足时说明具体缺口，只补必要 CSS。未经需求授权，不额外安装重复 UI 依赖或把业务开发变成组件库 API 改造。
6. 在业务项目运行其实际 TypeScript 和构建命令，核对绑定类型、事件参数与导出。库仓库的示例由 `pnpm typecheck:docs`、`pnpm docs:build` 验证；业务项目不要照搬这些库维护命令。

可运行组合示例见在线指南；本仓库对应 `docs/examples/ai/Example1.vue`，同时用于真实预览和源码展示。不能把所有布局 Props 视作所有组件都支持的通用属性；逐个核对类型。响应式能力也按组件文档确认，不编造断点接口。
