# MD2Card Obsidian Plugin

<div align="center">

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/gevikhn/obsidian-md2card)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Obsidian](https://img.shields.io/badge/Obsidian-0.15.0+-purple.svg)](https://obsidian.md/)

将你的 Markdown 笔记转换为精美的卡片图片

Convert your Markdown notes into beautiful card images

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Styles](#-built-in-styles) • [Documentation](#-documentation)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 中文

- 🎯 **选择转换** - 选中任意文本，快速生成卡片
- 📄 **全文转换** - 将整个文档一键转换为卡片
- 🎨 **多种风格** - 内置 5 种专业样式主题
- 🎭 **自定义样式** - 通过 CSS 创建个性化卡片风格
- ⚙️ **灵活尺寸** - 自由调整卡片宽度和高度
- 💾 **高质量导出** - 导出为高清 PNG 图片
- 🌐 **完整支持** - 支持所有 Markdown 语法

</td>
<td width="50%">

### English

- 🎯 **Selection Conversion** - Convert selected text to cards
- 📄 **Document Conversion** - Convert entire documents with one click
- 🎨 **Multiple Styles** - 5 built-in professional style themes
- 🎭 **Custom Styling** - Create personalized card styles with CSS
- ⚙️ **Flexible Size** - Adjust card width and height freely
- 💾 **High-Quality Export** - Export to high-resolution PNG format
- 🌐 **Full Markdown Support** - All Markdown syntax supported

</td>
</tr>
</table>

## 🎨 Built-in Styles

MD2Card includes 5 professionally designed built-in styles:

MD2Card 内置 5 种专业设计的样式：

<table>
<tr>
<th width="20%">Style<br/>样式</th>
<th width="40%">Description<br/>描述</th>
<th width="40%">Best For<br/>适用场景</th>
</tr>
<tr>
<td align="center"><strong>Card Theme</strong><br/>卡片主题</td>
<td>Classic card design with clean layout<br/>经典卡片设计，布局简洁清晰</td>
<td>General notes, study cards<br/>通用笔记、学习卡片</td>
</tr>
<tr>
<td align="center"><strong>GitHub Style</strong><br/>GitHub 风格</td>
<td>Developer-friendly code-focused theme<br/>开发者友好的代码主题</td>
<td>Code snippets, technical documentation<br/>代码片段、技术文档</td>
</tr>
<tr>
<td align="center"><strong>LaTeX Style</strong><br/>LaTeX 风格</td>
<td>Academic paper aesthetic<br/>学术论文美学风格</td>
<td>Academic notes, formulas, research<br/>学术笔记、公式、研究</td>
</tr>
<tr>
<td align="center"><strong>PIE Style</strong><br/>PIE 主题</td>
<td>Colorful and vibrant design<br/>多彩活力设计</td>
<td>Creative content, social media<br/>创意内容、社交媒体</td>
</tr>
<tr>
<td align="center"><strong>Vintage Newspaper</strong><br/>复古报纸</td>
<td>Classic newspaper layout<br/>经典报纸排版风格</td>
<td>Articles, storytelling, blogs<br/>文章、故事叙述、博客</td>
</tr>
</table>

### Custom Styles / 自定义样式

You can create your own custom card styles using CSS! See [CUSTOM_STYLE_GUIDE.md](./CUSTOM_STYLE_GUIDE.md) and [EXAMPLE_CUSTOM_CSS.md](./EXAMPLE_CUSTOM_CSS.md) for detailed instructions.

你可以使用 CSS 创建自己的自定义卡片样式！查看 [CUSTOM_STYLE_GUIDE.md](./CUSTOM_STYLE_GUIDE.md) 和 [EXAMPLE_CUSTOM_CSS.md](./EXAMPLE_CUSTOM_CSS.md) 获取详细说明。

## 🚀 Installation

### Manual Installation / 手动安装

1. **Download** the latest release files: `main.js`, `manifest.json`, and `versions.json`

   **下载**最新发布的文件：`main.js`、`manifest.json` 和 `versions.json`

2. **Create** a folder named `md2card` in your vault's `.obsidian/plugins/` directory

   在你的仓库的 `.obsidian/plugins/` 目录中**创建**名为 `md2card` 的文件夹

3. **Copy** the downloaded files into the `md2card` folder

   将下载的文件**复制**到 `md2card` 文件夹中

4. **Reload** Obsidian

   **重新加载** Obsidian

5. **Enable** the MD2Card plugin in Settings → Community Plugins

   在设置 → 第三方插件中**启用** MD2Card 插件

### Build from Source / 从源码构建

```bash
# Clone the repository / 克隆仓库
git clone https://github.com/gevikhn/obsidian-md2card.git
cd obsidian-md2card

# Install dependencies / 安装依赖
npm install

# Build the plugin / 构建插件
npm run build:plugin

# Copy files to your Obsidian vault / 将文件复制到你的 Obsidian 仓库
# .obsidian/plugins/md2card/
```

## 📖 Usage

### Quick Start / 快速开始

1. **Select** text in your note or open a document

   在笔记中**选择**文本或打开文档

2. **Open** command palette (`Ctrl/Cmd + P`)

   **打开**命令面板 (`Ctrl/Cmd + P`)

3. **Run** one of these commands / **运行**以下命令之一：
   - `MD2Card: Convert selection to card` - Convert selected text / 转换选中内容
   - `MD2Card: Convert document to card` - Convert entire document / 转换整个文档

4. **Preview** and **export** your card

   **预览**并**导出**你的卡片

### Settings / 设置

Access plugin settings via **Settings → MD2Card**:

通过**设置 → MD2Card** 访问插件设置：

- **Card Width / 卡片宽度** - Set card width in pixels (default: 440px) / 设置卡片宽度（默认：440px）
- **Card Height / 卡片高度** - Set card height in pixels (0 for auto) / 设置卡片高度（0 为自动）
- **Custom CSS / 自定义 CSS** - Add your custom styles / 添加你的自定义样式

## 💡 Use Cases

<table>
<tr>
<td align="center">

📚 **Study Notes**<br/>学习笔记

</td>
<td align="center">

💬 **Quote Cards**<br/>引言卡片

</td>
<td align="center">

💻 **Code Snippets**<br/>代码片段

</td>
</tr>
<tr>
<td align="center">

📝 **Meeting Notes**<br/>会议记录

</td>
<td align="center">

📖 **Articles**<br/>文章博客

</td>
<td align="center">

📊 **Data & Tables**<br/>数据表格

</td>
</tr>
</table>

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PLUGIN_README.md](./PLUGIN_README.md) | Full plugin documentation / 完整插件文档 |
| [快速开始.md](./快速开始.md) | Chinese quick start guide / 中文快速入门指南 |
| [CUSTOM_STYLE_GUIDE.md](./CUSTOM_STYLE_GUIDE.md) | Custom style guide / 自定义样式指南 |
| [EXAMPLE_CUSTOM_CSS.md](./EXAMPLE_CUSTOM_CSS.md) | Custom CSS examples / 自定义 CSS 示例 |

## 🛠️ Development

### Build Commands / 构建命令

```bash
# Development mode with watch / 开发模式（监听文件变化）
npm run dev:plugin

# Production build / 生产构建
npm run build:plugin
```

### Tech Stack / 技术栈

- **TypeScript** - Type-safe development / 类型安全的开发
- **Obsidian API** - Plugin integration / 插件集成
- **html-to-image** - Image generation / 图片生成
- **esbuild** - Fast bundling / 快速打包

### Project Structure / 项目结构

```
obsidian-md2card/
├── main.ts                            # Plugin entry point / 插件入口
├── manifest.json                      # Plugin manifest / 插件清单
├── versions.json                      # Version compatibility / 版本兼容性
├── global.d.ts                        # TypeScript definitions / TypeScript 定义
├── esbuild.config.mjs                 # Build configuration / 构建配置
├── default_card_theme.css             # Card theme style / 卡片主题样式
├── default_github_style.css           # GitHub style / GitHub 风格
├── default_latex_style.css            # LaTeX style / LaTeX 风格
├── default_pie_style.css              # PIE theme / PIE 主题
└── default_vintage_newspaper_style.css # Vintage newspaper / 复古报纸
```

## 📝 Supported Markdown Syntax / 支持的 Markdown 语法

- ✅ Headers (h1-h6) / 标题
- ✅ Bold, Italic, Strikethrough / 粗体、斜体、删除线
- ✅ Lists (ordered & unordered) / 列表（有序和无序）
- ✅ Blockquotes / 引用
- ✅ Code blocks & inline code / 代码块和行内代码
- ✅ Tables / 表格
- ✅ Links / 链接
- ✅ Images / 图片
- ✅ Horizontal rules / 分隔线

## 🤝 Contributing

Contributions are welcome! Feel free to:

欢迎贡献！你可以：

- 🐛 Report bugs / 报告 Bug
- 💡 Suggest features / 提出功能建议
- 📝 Improve documentation / 改进文档
- 🔧 Submit pull requests / 提交 Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 Acknowledgments

This plugin is based on the MD2Card web application, providing a convenient way to convert Markdown to beautiful card images directly within Obsidian.

本插件基于 MD2Card 网页应用开发，为 Obsidian 用户提供了便捷的 Markdown 转卡片图片功能。

---

<div align="center">

**Made with ❤️ for the Obsidian community**

为 Obsidian 社区用心打造

[Report Issues](https://github.com/gevikhn/obsidian-md2card/issues) • [View Source](https://github.com/gevikhn/obsidian-md2card)

</div>
