# MD2Card Obsidian Plugin

将你的 Markdown 笔记转换为精美的卡片图片，支持自定义主题。

Convert your Markdown notes into beautiful card images with customizable themes.

## ✨ Features / 功能特性

- 🎯 **选择转换** / **Selection Conversion**: Convert selected text to cards
- 📄 **文档转换** / **Document Conversion**: Convert entire documents to cards  
- 🎨 **多种主题** / **Multiple Themes**: 4 built-in beautiful themes
- ⚙️ **自定义尺寸** / **Customizable Size**: Adjust card width and height
- 💾 **导出图片** / **Export Images**: One-click export to PNG format
- 🌐 **完整 Markdown 支持** / **Full Markdown Support**: Headers, lists, tables, code blocks, and more

## 🚀 Installation / 安装

### Manual Installation / 手动安装

1. Download `main.js`, `manifest.json`, and `versions.json` from the latest release
2. Create a folder named `md2card` in your Obsidian vault's `.obsidian/plugins/` directory
3. Copy the downloaded files into the `md2card` folder
4. Reload Obsidian
5. Enable the MD2Card plugin in Settings → Community Plugins

1. 从最新版本下载 `main.js`、`manifest.json` 和 `versions.json`
2. 在你的 Obsidian 仓库的 `.obsidian/plugins/` 目录中创建一个名为 `md2card` 的文件夹
3. 将下载的文件复制到 `md2card` 文件夹中
4. 重新加载 Obsidian
5. 在设置 → 第三方插件中启用 MD2Card 插件

## 📖 Usage / 使用方法

### Convert Selection / 转换选中内容

1. Select text in your note / 在笔记中选择文本
2. Open command palette (Ctrl/Cmd + P) / 打开命令面板 (Ctrl/Cmd + P)
3. Run "MD2Card: Convert selection to card" / 运行 "MD2Card: Convert selection to card"
4. Preview and export the card / 预览并导出卡片

### Convert Document / 转换整个文档

1. Open the document you want to convert / 打开要转换的文档
2. Open command palette (Ctrl/Cmd + P) / 打开命令面板 (Ctrl/Cmd + P)
3. Run "MD2Card: Convert document to card" / 运行 "MD2Card: Convert document to card"
4. Preview and export the card / 预览并导出卡片

## ⚙️ Settings / 设置

Access plugin settings via Settings → MD2Card:

通过 设置 → MD2Card 访问插件设置：

- **Card Theme / 卡片主题**: Choose from 4 themes
  - 默认 (Default/Pop): Colorful with decorative elements
  - 暗黑 (Dark): Purple gradient with dark backdrop
  - 玻璃 (Glass): Transparent glass morphism style
  - 温暖 (Warm): Warm peachy gradient
  
- **Card Width / 卡片宽度**: Set card width in pixels (default: 440px)
- **Card Height / 卡片高度**: Set card height in pixels (0 for auto-height)

## 🎨 Themes Preview / 主题预览

### 默认主题 (Default Theme)
- Bright yellow background with polka dots
- Pink star decoration
- Blue "POP!" badge
- Perfect for fun, energetic content

### 暗黑主题 (Dark Theme)
- Purple gradient background
- Dark semi-transparent overlay
- White text for high contrast
- Ideal for professional content

### 玻璃主题 (Glass Theme)
- Translucent glass effect
- Subtle backdrop blur
- Elegant minimalist design
- Great for modern aesthetics

### 温暖主题 (Warm Theme)
- Peachy gradient background
- Soft warm tones
- Comfortable reading experience
- Perfect for notes and reflections

## 📖 Examples / 示例

See [EXAMPLES.md](./EXAMPLES.md) for detailed examples including:
查看 [EXAMPLES.md](./EXAMPLES.md) 获取详细示例，包括：

- Study notes and flashcards / 学习笔记和闪卡
- Code snippets / 代码片段
- Meeting notes / 会议笔记
- Quote cards / 引言卡片
- Recipe cards / 食谱卡片
- Size recommendations / 尺寸建议
- Workflow examples / 工作流示例

## 🛠️ Development / 开发

### Build the Plugin / 构建插件

```bash
# Install dependencies
npm install

# Build for production
npm run build:plugin

# Watch mode for development
npm run dev:plugin
```

### Project Structure / 项目结构

```
md2card/
├── main.ts                 # Plugin entry point
├── manifest.json          # Plugin manifest
├── versions.json          # Version compatibility
├── esbuild.config.mjs     # Build configuration
├── tsconfig-plugin.json   # TypeScript config for plugin
└── src/                   # Web app source code
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

## 🤝 Contributing / 贡献

Contributions are welcome! Please feel free to submit a Pull Request.

欢迎贡献！请随时提交 Pull Request。

## 📄 License / 许可证

This project is open source and available under the MIT License.

## 🙏 Acknowledgments / 致谢

This plugin is based on the MD2Card web application, which provides a convenient way to convert Markdown to beautiful card images.

本插件基于 MD2Card 网页应用开发，提供了一种便捷的方式将 Markdown 转换为精美的卡片图片。
