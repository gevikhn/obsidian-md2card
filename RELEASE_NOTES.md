# MD2Card v1.0.0 - Obsidian Plugin Release

## 🎉 What's New

We're excited to announce the first release of the MD2Card Obsidian plugin! This plugin brings the power of MD2Card's beautiful card generation directly into your Obsidian workflow.

## ✨ Features

### Core Functionality
- **Convert Selection to Card**: Transform selected text into a beautiful card image
- **Convert Document to Card**: Convert your entire note into a card
- **Live Preview**: Preview your card before exporting
- **One-Click Export**: Export cards as high-quality PNG images

### Themes
Four stunning built-in themes:
1. **默认 (Default)** - Bright, energetic pop art style with decorative elements
2. **暗黑 (Dark)** - Professional purple gradient with high contrast
3. **玻璃 (Glass)** - Modern translucent glass morphism design
4. **温暖 (Warm)** - Friendly peachy gradient with soft tones

### Customization
- Adjustable card width (default: 440px)
- Adjustable card height (default: 586px, or auto-height)
- Theme selection via settings panel
- Persistent settings across sessions

### Markdown Support
Full support for standard markdown syntax:
- ✅ Headers (H1-H6)
- ✅ **Bold**, *italic*, and ~~strikethrough~~ text
- ✅ Ordered and unordered lists
- ✅ Block quotes
- ✅ Code blocks with syntax highlighting
- ✅ Inline code
- ✅ Tables
- ✅ Links
- ✅ Images
- ✅ Horizontal rules

## 📦 Installation

### Requirements
- Obsidian v0.15.0 or higher
- Any operating system (Windows, macOS, Linux)

### Quick Install
1. Download `main.js`, `manifest.json`, and `versions.json`
2. Create folder: `.obsidian/plugins/md2card/`
3. Copy files to the folder
4. Enable plugin in Obsidian settings

See [INSTALL_PLUGIN.md](./INSTALL_PLUGIN.md) for detailed instructions.

## 📖 Documentation

- **[PLUGIN_README.md](./PLUGIN_README.md)** - Complete user guide
- **[INSTALL_PLUGIN.md](./INSTALL_PLUGIN.md)** - Installation instructions
- **[EXAMPLES.md](./EXAMPLES.md)** - Use cases and examples

## 🚀 Usage

### Basic Workflow
1. Write or open a note in Obsidian
2. Select the content you want to convert (or use entire document)
3. Open command palette (Ctrl/Cmd + P)
4. Run "MD2Card: Convert selection to card"
5. Preview the card and customize theme/size in settings if needed
6. Click "Export as Image" to save

### Advanced Usage
- Create study flashcards from your notes
- Generate social media content from quotes
- Convert code snippets into shareable images
- Make recipe cards from your cooking notes
- Transform meeting notes into visual summaries

## 🔧 Technical Details

### Built With
- TypeScript
- Obsidian Plugin API
- Marked (markdown parser)
- html-to-image (export functionality)
- esbuild (bundler)

### Project Structure
```
md2card/
├── main.ts              # Plugin source code
├── manifest.json        # Plugin metadata
├── versions.json        # Compatibility info
├── main.js              # Compiled plugin (generated)
└── docs/
    ├── PLUGIN_README.md
    ├── INSTALL_PLUGIN.md
    └── EXAMPLES.md
```

### Build Process
```bash
npm install           # Install dependencies
npm run build:plugin  # Build plugin
```

## 🐛 Known Limitations

- Images in cards use original URLs (no local caching yet)
- Only PNG export format supported
- Custom theme creation not yet available
- No batch processing of multiple cards

## 🔮 Future Plans

- Support for custom theme creation
- Additional export formats (JPEG, SVG)
- Batch processing capabilities
- Image local caching
- More built-in themes
- Card templates
- Integration with Obsidian's image management

## 🙏 Acknowledgments

This plugin is based on the MD2Card web application project, adapting its card generation capabilities for seamless integration with Obsidian.

## 📄 License

MIT License - Free to use and modify

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
- Report bugs via GitHub issues
- Suggest features via GitHub issues
- Submit pull requests for improvements

## 📞 Support

- GitHub Issues: [Report issues or request features](https://github.com/gevikhn/md2card/issues)
- Documentation: See the docs folder for guides
- Examples: Check EXAMPLES.md for usage patterns

## 🔐 Security

- ✅ No external API calls
- ✅ No data collection or tracking
- ✅ All processing done locally
- ✅ CodeQL security scan passed with 0 vulnerabilities

## 📊 Stats

- **Lines of Code**: ~500 (main.ts)
- **Bundle Size**: 113KB (main.js)
- **Dependencies**: 4 (obsidian, marked, html-to-image, esbuild for building)
- **Themes**: 4
- **Commands**: 2
- **Settings**: 3

## 🎯 Use Cases

Perfect for:
- 📚 Students creating visual study materials
- 👨‍💼 Professionals sharing meeting highlights
- 👨‍🏫 Teachers making educational content
- 📱 Social media enthusiasts creating posts
- 🧑‍💻 Developers sharing code snippets
- 📝 Writers highlighting quotes
- 🧘 Journaling with visual elements

---

**Version**: 1.0.0  
**Release Date**: October 29, 2024  
**Minimum Obsidian Version**: 0.15.0

Thank you for using MD2Card! We hope it enhances your Obsidian experience. 🎉
