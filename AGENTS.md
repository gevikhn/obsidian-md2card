# MD2Card Agents Guide

概述插件中的“代理”角色及其职责，便于团队成员或自动化协作者快速理解各模块的功能边界与协作方式。

## 1. MD2Card Plugin Agent (`MD2CardPlugin`)
- **职责**：负责插件生命周期管理，加载/保存设置，注册所有命令与菜单项，并在需要时实例化预览模态框。
- **输入**：来自 Obsidian 的命令触发、菜单交互、文件上下文。
- **输出**：调用 `generateCard` 创建 `CardPreviewModal`，将 Markdown 文本交给下游代理处理。
- **关键依赖**：Obsidian `Plugin` 基类，`Notice` 用于错误提示，`this.app.vault.cachedRead` 读取文件内容。

## 2. Card Preview Agent (`CardPreviewModal`)
- **职责**：渲染卡片预览 UI，处理主题切换、尺寸调整、Markdown 渲染、Mermaid 解析，以及导出/复制功能。
- **输入**：Markdown 源文本、当前插件设置、主题定义。
- **输出**：预览 DOM、渲染后的卡片图像（复制/导出），刷新过的设置值。
- **关键流程**：
  - 创建结构化卡片 DOM（header/content/footer），注入主题样式。
  - 借助 `MarkdownRenderer.renderMarkdown` 渲染文本，托管生成内容的 `Component` 避免内存泄露。
  - 预处理 Mermaid 代码块并调用 Mermaid API 生成 SVG。
  - 使用 `html-to-image` 在导出或复制时生成 PNG。
  - 根据窗口尺寸重算卡片宽度及滚动状态。

## 3. Mermaid Rendering Agent
- **职责**：检测 Markdown 中的 `language-mermaid` 代码块，替换成待渲染容器并调用 Mermaid API 输出 SVG；在 Mermaid 不可用或解析失败时提供回退内容。
- **组件位置**：`CardPreviewModal.prepareMermaidBlocks`、`renderMermaidDiagrams`、`initializeMermaid`、`getMermaid`、`replaceMermaidWithFallback`。
- **关键依赖**：全局 `window.mermaid` 对象（由 Obsidian 或用户环境提供）。
- **防护措施**：缺少 Mermaid 时记录警告并展示原始代码，避免阻塞整个卡片渲染流程。

## 4. Theme Management Agent (`MD2CardSettingTab`)
- **职责**：在设置面板中提供主题选择与卡片宽度配置，校验当前选中主题是否有效。
- **输入**：插件设置对象。
- **输出**：更新后的设置数据，触发保存操作。
- **关键依赖**：Obsidian `Setting` UI 组件，内置主题常量 `BUILT_IN_THEMES`。

## 5. Custom Theme Editor Agent (`CustomThemeEditorModal`)
- **职责**：管理自定义主题的创建、编辑与删除，校验主题名称唯一性，保持当前选中主题的正确指向。
- **输入**：目标主题（可空）、用户输入的名称与 CSS。
- **输出**：更新 `customThemes` 数组，必要时同步调整 `selectedTheme`。
- **关键依赖**：`Notice` 用于表单校验反馈，插件设置保存流程。

## 6. Styling & Asset Agent (`styles.css`)
- **职责**：提供通用 Markdown 渲染样式与按钮交互效果，确保卡片视觉表现与导出一致。
- **范围**：只包含基础排版和交互样式，不再维护特定主题的类（内置主题通过内联样式实现，自定义主题由用户 CSS 控制）。

## 7. Build Agent (`esbuild.config.mjs`)
- **职责**：负责插件代码的打包，内联 CSS 资源，保持与 Obsidian 期望的 CJS 输出兼容。
- **工作模式**：`node esbuild.config.mjs`（开发 watch 模式）或 `node esbuild.config.mjs production`（生产构建）。
- **关键依赖**：`esbuild`、`builtin-modules`、自定义 `inline-css` 插件用于把 `.css` 转为字符串导入。

## 协作要点
- **设置数据流**：`MD2CardPlugin` 持有设置对象，设置面板与模态框均通过引用共享，并在用户操作后调用 `saveSettings` 持久化。
- **资源清理**：`CardPreviewModal` 在关闭时移除窗口级事件并通过插件实例卸载 Markdown `Component`，避免内存泄露。
- **主题一致性**：内置主题使用 TypeScript 中的内联样式，自定义主题完全依赖 `CSS` 文本；两者统一通过 `applyBaseStyles` 注入。
- **导出链路**：复制与导出均使用 `withFullWidth` 临时调整卡片宽度，以保证输出像素与用户设置一致。
- **错误处理**：所有异步操作（文件读取、Mermaid 渲染、图片导出）均包裹 `try/catch` 并使用 `Notice` 提示用户。

通过以上代理划分，可以快速定位问题或扩展功能，同时为自动化测试、脚本化操作或多协作者开发提供清晰的职责边界。*** End Patch
