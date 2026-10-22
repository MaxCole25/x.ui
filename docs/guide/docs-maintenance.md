# 文档部署与维护

文档目标地址为 <https://maxcole25.github.io/x.ui/>。是否上线以 GitHub Actions 的实际部署结果为准。

## GitHub Pages 配置

`.github/workflows/deploy-docs.yml` 在 `main` 推送时构建并部署，也支持手动触发。Pull Request 仅构建与验收。使用现有 CI 的 Node 22 和 `package.json` 固定的 pnpm 10.10.0，冻结锁文件安装。

管理员首次在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**，确认允许 Actions 运行。工作流不会自动修改仓库权限或可见性。若 `github-pages` 环境设有审批或分支保护，需按仓库规则批准。

构建只需 `contents: read`；部署任务使用 `pages: write` 和 `id-token: write`。同一 Pages 并发组按序运行，构建产物通过官方 `configure-pages`、`upload-pages-artifact`、`deploy-pages` 发布。原有 `check.yml` 继续独立运行，不包含 npm 发布。

VitePress 固定 `base: /x.ui/`，内置 sitemap 使用完整站点地址。静态资源优先使用导入或 VitePress 的路径处理，不在业务示例中写死 `/logo.svg` 这样的域名根路径。不要开启忽略死链接选项。站点的 viewport 由 VitePress 默认提供。

## 文档与代码同步

```bash
pnpm install --frozen-lockfile
pnpm api:inventory:check
pnpm docs:coverage
pnpm typecheck:docs
pnpm docs:build
pnpm docs:verify
```

已有 `scripts/component-api.mjs` 从 TypeScript、Vue SFC、默认配置和导出读取 API，生成 `src/components/_meta/api.json`；`api:inventory:check` 检查清单是否与源码一致。已有 `pnpm docs:api` 更新组件 API 表和类型定义，保留示例及人工说明。更新前检查工作区差异，避免覆盖正在编辑的说明。

新增 `docs:coverage` 复用该提取器，检查每个已提取组件是否有文档、Vue 示例，以及 Props、Events、Slots、实例方法名称是否覆盖。它不能证明所有说明、默认值和类型文本均正确，也不能替代响应式、主题或交互验收。清单检查验证源码与元数据同步，API 表仍需运行更新命令并审查差异。本次不大规模改写现有组件文档。

每次 `docs:build` 会在构建结束时生成 `llms.txt` 和 `llms-full.txt`，只读取公开 `docs` Markdown 及其示例，不读取凭证、环境文件或私有业务数据。完整文本去掉文档脚本导入，展开真实示例源码，保留 API 和类型。产物不提交 Git。

`docs:verify` 检查构建后 HTML 的本地资源与链接、canonical、description、组件 API 静态正文、sitemap 覆盖和机器可读入口。构建期间的死链接检查仍由 VitePress 负责。新增或调整示例后，还应运行文档站，检查浏览器中的真实渲染与交互。

## 搜索与爬虫边界

VitePress 静态生成各页 HTML，正文与 API 表无需客户端执行才能读取。独立页面标题来自一级标题，描述优先取 frontmatter，其次取正文首段；特殊页面可单独设置 description。

项目站提供 `/x.ui/robots.txt`，其中允许 Googlebot、Bingbot、OAI-SearchBot、GPTBot 和其它正常爬虫，声明 sitemap。但标准爬虫一般只读取域名根目录 `/robots.txt`；当前仓库无法控制 `https://maxcole25.github.io/robots.txt`。如需域名级声明，需在该账号的用户站仓库单独维护，或以后使用独立域名。本次不修改其它仓库。

允许抓取不保证搜索排名、AI 检索命中或模型训练收录。上线后可向搜索引擎提交 sitemap；这属于独立的站长平台操作。

## 后续改进

- 逐步完善提取器未覆盖的服务接口、动态插槽与复杂类型，并给 API 生成区增加明确标记，再引入 API 表内容差异检查。
- 在已有组件文档中补充各自的主题继承、响应式边界和人工验收说明，不从属性名称推测支持情况。
- 根据实际检索需求拆分完整 LLM 文档为分类文件，避免重复维护内容；有需求时再评估 MCP，不部署额外服务。
