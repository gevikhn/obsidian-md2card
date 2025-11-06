# MD2Card Obsidian Plugin

<div align="center">

[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/gevikhn/md2card)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Obsidian](https://img.shields.io/badge/Obsidian-0.15.0+-purple.svg)](https://obsidian.md/)

将你的 Markdown 笔记转换为精美的卡片图片

Convert your Markdown notes into beautiful card images

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Documentation](#-documentation)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 中文

- 🎯 **选择转换** - 选中任意文本，快速生成卡片
- 📄 **全文转换** - 将整个文档一键转换为卡片
- 🎨 **四种主题** - 默认、暗黑、玻璃、温暖任你选择
- ⚙️ **自定义尺寸** - 灵活调整卡片宽度和高度
- 💾 **一键导出** - 支持导出为高质量 PNG 图片
- 🌐 **完整支持** - 支持标题、列表、表格、代码块等所有 Markdown 语法

</td>
<td width="50%">

### English

- 🎯 **Selection Conversion** - Convert selected text to cards
- 📄 **Document Conversion** - Convert entire documents with one click
- 🎨 **Four Themes** - Choose from Default, Dark, Glass, and Warm themes
- ⚙️ **Customizable Size** - Adjust card width and height
- 💾 **One-Click Export** - Export to high-quality PNG format
- 🌐 **Full Markdown Support** - Headers, lists, tables, code blocks, and more

</td>
</tr>
</table>

## 🎨 Theme Preview

| Default Theme | Dark Theme | Glass Theme | Warm Theme |
|:---:|:---:|:---:|:---:|
| Bright & Energetic | Professional & Modern | Elegant & Minimalist | Warm & Friendly |
| Yellow + Pink | Purple Gradient | Translucent Glass | Peachy Gradient |

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
git clone https://github.com/gevikhn/md2card.git
cd md2card

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

- **Card Theme / 卡片主题** - Choose from 4 beautiful themes / 从 4 个精美主题中选择
- **Card Width / 卡片宽度** - Set card width in pixels (default: 440px) / 设置卡片宽度（默认：440px）
- **Card Height / 卡片高度** - Set card height in pixels (0 for auto) / 设置卡片高度（0 为自动）

## 💡 Use Cases

<table>
<tr>
<td>

📚 **Study Notes**
学习笔记

</td>
<td>

💬 **Quote Cards**
引言卡片

</td>
<td>

💻 **Code Snippets**
代码片段

</td>
</tr>
<tr>
<td>

📝 **Meeting Notes**
会议记录

</td>
<td>

🍳 **Recipe Cards**
食谱卡片

</td>
<td>

📊 **Data Tables**
数据表格

</td>
</tr>
</table>

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PLUGIN_README.md](./PLUGIN_README.md) | Full plugin documentation / 完整插件文档 |
| [快速开始.md](./快速开始.md) | Chinese quick start guide / 中文快速入门指南 |
| [EXAMPLES.md](./EXAMPLES.md) | Usage examples and scenarios / 使用示例和场景 |
| [INSTALL_PLUGIN.md](./INSTALL_PLUGIN.md) | Detailed installation guide / 详细安装指南 |
| [CUSTOM_THEMES_GUIDE.md](./CUSTOM_THEMES_GUIDE.md) | Theme customization guide / 主题自定义指南 |

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
