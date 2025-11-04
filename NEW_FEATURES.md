# 新功能说明 / New Features Guide

## 最新更新 / Latest Updates

### 1. 右键菜单支持 / Right-Click Context Menu Support

现在可以通过右键菜单快速调用卡片生成功能！

Now you can quickly invoke card generation through the right-click context menu!

#### 使用方法 / Usage

**方法一：转换选中内容 / Method 1: Convert Selection**

1. 在编辑器中选中文本
   Select text in the editor

2. 右键点击选中的文本
   Right-click on the selected text

3. 选择 "Convert selection to card"
   Choose "Convert selection to card"

4. 卡片预览窗口自动打开
   Card preview window opens automatically

**方法二：转换整个文档 / Method 2: Convert Entire Document**

1. 在编辑器的任意位置右键点击
   Right-click anywhere in the editor

2. 选择 "Convert document to card"
   Choose "Convert document to card"

3. 整个文档内容转换为卡片
   Entire document content converts to card

#### 优势 / Benefits

✅ 更快速的访问 - 无需打开命令面板
✅ Faster access - No need to open command palette

✅ 更直观的操作 - 右键即可使用
✅ More intuitive - Right-click to use

✅ 两种选项 - 选中内容或整个文档
✅ Two options - Selected content or entire document

### 2. 复制到剪切板功能 / Copy to Clipboard Feature

新增"复制到剪切板"按钮，可以直接将卡片图片复制到系统剪切板！

New "Copy to Clipboard" button allows you to copy card images directly to the system clipboard!

#### 使用方法 / Usage

1. 生成卡片预览（使用命令或右键菜单）
   Generate card preview (via command or right-click menu)

2. 在预览窗口中选择想要的主题
   Select desired theme in preview window

3. 点击绿色的 "Copy to Clipboard" 按钮
   Click the green "Copy to Clipboard" button

4. 卡片图片已复制到剪切板
   Card image is copied to clipboard

5. 在其他应用中直接粘贴（Ctrl+V 或 Cmd+V）
   Paste directly in other applications (Ctrl+V or Cmd+V)

#### 按钮布局 / Button Layout

预览窗口底部有三个按钮：

Three buttons at the bottom of preview window:

```
┌────────────────────────────────────────────────┐
│                                                │
│  [Copy to Clipboard] [Export as Image] [Close]│
│       (绿色/Green)      (紫色/Purple)   (灰色/Gray)│
└────────────────────────────────────────────────┘
```

#### 优势 / Benefits

✅ 快速分享 - 无需保存文件
✅ Quick sharing - No need to save file

✅ 便捷粘贴 - 直接粘贴到聊天、文档等
✅ Convenient pasting - Paste directly to chat, documents, etc.

✅ 高质量 - 与导出相同的高清图片
✅ High quality - Same high-resolution image as export

✅ 保留两种方式 - 复制或导出，按需选择
✅ Keep both options - Copy or export, choose as needed

## 使用场景 / Use Cases

### 场景 1：快速分享到聊天软件 / Scenario 1: Quick Share to Chat

**之前 / Before:**
1. 选中文本
2. Ctrl+P 打开命令面板
3. 输入 "convert"
4. 选择命令
5. 点击 Export
6. 找到下载的文件
7. 拖拽到聊天软件

**现在 / Now:**
1. 选中文本
2. 右键 → "Convert selection to card"
3. 点击 "Copy to Clipboard"
4. 在聊天软件中 Ctrl+V 粘贴

**节省 4 步操作！/ Save 4 steps!**

### 场景 2：制作演示文稿 / Scenario 2: Create Presentation

**之前 / Before:**
1. 使用命令生成卡片
2. 导出为图片文件
3. 打开 PowerPoint/Keynote
4. 插入图片
5. 浏览文件夹找到图片
6. 插入到幻灯片

**现在 / Now:**
1. 右键 → "Convert to card"
2. 点击 "Copy to Clipboard"
3. 在演示文稿中 Ctrl+V 粘贴

**节省 3 步操作！/ Save 3 steps!**

### 场景 3：编辑文档时快速插入 / Scenario 3: Quick Insert While Editing

**之前 / Before:**
- 需要切换应用查找导出的图片
- Need to switch apps to find exported image

**现在 / Now:**
- 直接复制粘贴，无需切换
- Copy and paste directly, no switching needed

## 技术说明 / Technical Details

### 右键菜单实现 / Right-Click Menu Implementation

使用 Obsidian 的 `editor-menu` 事件：

Uses Obsidian's `editor-menu` event:

```typescript
this.registerEvent(
  this.app.workspace.on('editor-menu', (menu, editor, view) => {
    // 如果有选中内容，添加"转换选中内容"选项
    if (selection) {
      menu.addItem((item) => {
        item
          .setTitle('Convert selection to card')
          .setIcon('image')
          .onClick(() => { /* ... */ });
      });
    }
    
    // 始终添加"转换文档"选项
    menu.addItem((item) => {
      item
        .setTitle('Convert document to card')
        .setIcon('file-image')
        .onClick(() => { /* ... */ });
    });
  })
);
```

### 剪切板复制实现 / Clipboard Copy Implementation

使用现代 Clipboard API：

Uses modern Clipboard API:

```typescript
async copyToClipboard(cardElement: HTMLElement) {
  // 1. 将卡片元素转换为 Blob
  const blob = await htmlToImage.toBlob(cardElement, {
    quality: 1,
    pixelRatio: 2,
  });
  
  // 2. 使用 Clipboard API 写入
  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': blob
    })
  ]);
}
```

#### 浏览器兼容性 / Browser Compatibility

- ✅ Chrome/Edge 76+
- ✅ Firefox 90+
- ✅ Safari 13.1+
- ✅ Obsidian (基于 Electron / Based on Electron)

### 图片格式 / Image Format

- 格式：PNG
- 质量：最高（quality: 1）
- 分辨率：2x 像素比率（适合高清屏幕）
- Format: PNG
- Quality: Maximum (quality: 1)
- Resolution: 2x pixel ratio (suitable for high-resolution screens)

## 快捷键建议 / Keyboard Shortcut Suggestions

虽然插件本身没有设置快捷键，但您可以在 Obsidian 设置中为这些命令分配快捷键：

While the plugin doesn't set shortcuts by itself, you can assign them in Obsidian settings:

1. 打开 Obsidian 设置 → 快捷键
   Open Obsidian Settings → Hotkeys

2. 搜索 "MD2Card"
   Search for "MD2Card"

3. 为以下命令设置快捷键：
   Assign shortcuts for these commands:
   - "Convert selection to card" - 建议：Ctrl+Shift+C
   - "Convert document to card" - 建议：Ctrl+Shift+D

## 常见问题 / FAQ

### Q1: 右键菜单选项没有显示？
### Q1: Right-click menu options not showing?

**A:** 确保插件已启用，并且在编辑器视图中右键点击。

**A:** Make sure the plugin is enabled and you right-click in editor view.

### Q2: 复制到剪切板后无法粘贴？
### Q2: Cannot paste after copying to clipboard?

**A:** 检查以下几点：
1. 确认看到 "Card copied to clipboard!" 提示
2. 尝试在支持图片粘贴的应用中粘贴（如 Word、聊天软件等）
3. 如果使用的是纯文本编辑器，它可能不支持粘贴图片

**A:** Check the following:
1. Confirm you see "Card copied to clipboard!" notice
2. Try pasting in apps that support image pasting (Word, chat apps, etc.)
3. If using plain text editor, it may not support pasting images

### Q3: 复制的图片质量如何？
### Q3: What's the quality of copied images?

**A:** 与导出功能相同，使用 2x 像素比率，确保高清显示。

**A:** Same as export function, uses 2x pixel ratio for high-resolution display.

### Q4: 可以同时使用复制和导出功能吗？
### Q4: Can I use both copy and export features?

**A:** 可以！两个功能互不影响。您可以先复制用于快速分享，然后导出保存存档。

**A:** Yes! Both features work independently. You can copy for quick sharing, then export to save for archival.

### Q5: 右键菜单会取代命令吗？
### Q5: Will right-click menu replace commands?

**A:** 不会。原有的命令面板调用方式仍然保留，右键菜单只是提供了额外的便捷方式。

**A:** No. Original command palette invocation remains available. Right-click menu just provides an additional convenient method.

## 组合使用示例 / Combined Usage Example

### 完整工作流 / Complete Workflow

```
1. 在 Obsidian 中编写笔记
   Write notes in Obsidian
   
2. 选中想要分享的内容
   Select content to share
   
3. 右键 → "Convert selection to card"
   Right-click → "Convert selection to card"
   
4. 在预览中切换主题找到最佳效果
   Switch themes in preview to find best look
   
5. 点击 "Copy to Clipboard" 快速分享
   Click "Copy to Clipboard" for quick sharing
   
6. 如需存档，点击 "Export as Image" 保存
   Click "Export as Image" to save for archival
   
7. 在微信、Slack、Discord 等处直接粘贴
   Paste directly in WeChat, Slack, Discord, etc.
```

## 性能说明 / Performance Notes

### 内存使用 / Memory Usage
- 复制操作：临时创建 Blob，粘贴后自动释放
- Copy operation: Temporarily creates Blob, automatically released after paste

### 速度 / Speed
- 复制速度：约 0.5-1 秒（取决于卡片复杂度）
- Copy speed: About 0.5-1 second (depends on card complexity)
- 比导出稍快，因为不涉及文件系统操作
- Slightly faster than export, as it doesn't involve file system operations

### 图片大小 / Image Size
- 典型卡片：100-500 KB
- Typical card: 100-500 KB
- 取决于内容复杂度和卡片尺寸
- Depends on content complexity and card dimensions

## 反馈和建议 / Feedback and Suggestions

如果您有任何问题或建议，请在 GitHub 上提交 Issue：

If you have any questions or suggestions, please submit an Issue on GitHub:

https://github.com/gevikhn/md2card/issues

---

**享受更便捷的卡片生成体验！/ Enjoy a more convenient card generation experience!** 🎉
