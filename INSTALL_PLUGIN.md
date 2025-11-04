# MD2Card Obsidian Plugin Installation Guide
# MD2Card Obsidian 插件安装指南

## 📦 Installation Methods / 安装方法

### Method 1: Manual Installation / 方法一：手动安装

#### Step 1: Download Files / 步骤 1：下载文件

Download these three files from the repository:
从代码库下载以下三个文件：

- `main.js` (plugin code / 插件代码)
- `manifest.json` (plugin metadata / 插件元数据)
- `versions.json` (version info / 版本信息)

Or build them yourself:
或者自己构建：

```bash
# Clone the repository
git clone https://github.com/gevikhn/md2card.git
cd md2card

# Install dependencies
npm install

# Build the plugin
npm run build:plugin
```

#### Step 2: Create Plugin Folder / 步骤 2：创建插件文件夹

1. Open your Obsidian vault folder
   打开你的 Obsidian 仓库文件夹

2. Navigate to `.obsidian/plugins/` folder (create it if it doesn't exist)
   导航到 `.obsidian/plugins/` 文件夹（如果不存在则创建）

3. Create a new folder named `md2card`
   创建一个名为 `md2card` 的新文件夹

#### Step 3: Copy Files / 步骤 3：复制文件

Copy the three files (`main.js`, `manifest.json`, `versions.json`) into the `md2card` folder:
将三个文件（`main.js`、`manifest.json`、`versions.json`）复制到 `md2card` 文件夹中：

```
YourVault/
└── .obsidian/
    └── plugins/
        └── md2card/
            ├── main.js
            ├── manifest.json
            └── versions.json
```

#### Step 4: Enable the Plugin / 步骤 4：启用插件

1. Open Obsidian / 打开 Obsidian
2. Go to Settings → Community Plugins / 进入设置 → 第三方插件
3. Turn off "Safe mode" if it's on / 如果开启了"安全模式"，请关闭它
4. Click "Reload plugins" or restart Obsidian / 点击"重新加载插件"或重启 Obsidian
5. Find "MD2Card" in the list and enable it / 在列表中找到 "MD2Card" 并启用

### Method 2: Build from Source / 方法二：从源码构建

```bash
# Clone repository
git clone https://github.com/gevikhn/md2card.git
cd md2card

# Install dependencies
npm install

# Build plugin
npm run build:plugin

# Create symbolic link (optional, for development)
ln -s $(pwd) /path/to/your/vault/.obsidian/plugins/md2card
```

## ✅ Verify Installation / 验证安装

After installation, you should see:
安装后，你应该看到：

1. "MD2Card" appears in Settings → Community Plugins
   "MD2Card" 出现在 设置 → 第三方插件 中

2. Two new commands in command palette (Ctrl/Cmd + P):
   命令面板中出现两个新命令（Ctrl/Cmd + P）：
   - "MD2Card: Convert selection to card"
   - "MD2Card: Convert document to card"

3. A new settings page "MD2Card" in Settings
   设置中出现新的 "MD2Card" 设置页面

## 🚀 Quick Start / 快速开始

1. **Select some text** in any note
   在任何笔记中**选择一些文本**

2. **Open command palette** (Ctrl/Cmd + P)
   **打开命令面板**（Ctrl/Cmd + P）

3. **Run** "MD2Card: Convert selection to card"
   **运行** "MD2Card: Convert selection to card"

4. **Preview** the card and click "Export as Image"
   **预览**卡片并点击 "Export as Image"

5. The card image will be downloaded to your Downloads folder
   卡片图片将下载到你的下载文件夹

## ⚙️ Configuration / 配置

Go to Settings → MD2Card to customize:
进入设置 → MD2Card 以自定义：

- **Card Theme**: Choose from 4 beautiful themes
  **卡片主题**：从 4 个精美主题中选择
  
- **Card Width**: Set width in pixels (default: 440)
  **卡片宽度**：以像素为单位设置宽度（默认：440）
  
- **Card Height**: Set height in pixels or 0 for auto (default: 586)
  **卡片高度**：以像素为单位设置高度，或设为 0 自动调整（默认：586）

## 🎨 Available Themes / 可用主题

1. **默认 (Default)** - Colorful pop art style
   **默认** - 多彩波普艺术风格

2. **暗黑 (Dark)** - Purple gradient with dark overlay
   **暗黑** - 紫色渐变配深色叠加

3. **玻璃 (Glass)** - Transparent glass morphism
   **玻璃** - 透明玻璃态设计

4. **温暖 (Warm)** - Warm peachy tones
   **温暖** - 温暖的桃色调

## 🐛 Troubleshooting / 故障排除

### Plugin doesn't appear / 插件没有出现

1. Make sure all three files are in the correct folder
   确保三个文件都在正确的文件夹中

2. Restart Obsidian completely
   完全重启 Obsidian

3. Check that Safe Mode is disabled
   检查安全模式是否已禁用

### Commands don't work / 命令不起作用

1. Make sure the plugin is enabled in Settings
   确保插件在设置中已启用

2. Try reloading plugins (Settings → Community Plugins → Reload)
   尝试重新加载插件（设置 → 第三方插件 → 重新加载）

### Export doesn't work / 导出不起作用

1. Check browser console for errors (Ctrl/Cmd + Shift + I)
   检查浏览器控制台是否有错误（Ctrl/Cmd + Shift + I）

2. Make sure you have permission to write to Downloads folder
   确保你有权限写入下载文件夹

## 📞 Support / 支持

For issues, questions, or suggestions:
如有问题、疑问或建议：

- Open an issue on GitHub / 在 GitHub 上开启一个 issue
- Check existing issues for solutions / 查看现有 issue 寻找解决方案

## 🔄 Updates / 更新

To update the plugin:
更新插件：

1. Download the latest files / 下载最新文件
2. Replace old files in the plugin folder / 替换插件文件夹中的旧文件
3. Reload plugins or restart Obsidian / 重新加载插件或重启 Obsidian

## 📜 License / 许可证

MIT License - Free to use and modify
MIT 许可证 - 免费使用和修改
