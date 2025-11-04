# 自定义主题指南 / Custom Themes Guide

## 概述 / Overview

现在，自定义 CSS 不再是在现有主题基础上添加样式，而是用于创建完整的独立主题。您可以在生成卡片的预览页面中实时切换主题。

Custom CSS is no longer an overlay on existing themes. Instead, it creates complete standalone themes. You can switch themes in real-time on the card preview page.

## 主要变化 / Key Changes

### 之前 (Before)
- 自定义 CSS 添加在选定主题之上
- 只能在设置中选择主题
- Custom CSS applied on top of selected theme
- Theme selection only in settings

### 现在 (After)
- 自定义 CSS 创建独立主题
- 在预览页面实时切换主题
- 可创建、编辑、删除多个自定义主题
- Custom CSS creates standalone themes
- Real-time theme switching in preview
- Create, edit, delete multiple custom themes

## 如何使用 / How to Use

### 第一步：创建自定义主题 / Step 1: Create Custom Theme

1. 打开 Obsidian 设置 → MD2Card
   Open Obsidian Settings → MD2Card

2. 滚动到 "Custom Themes" 部分
   Scroll to "Custom Themes" section

3. 点击 "Create Theme" 按钮
   Click "Create Theme" button

4. 输入主题名称（例如：My Blue Theme）
   Enter theme name (e.g., My Blue Theme)

5. 输入 CSS 代码
   Enter CSS code

6. 点击 "Save" 保存
   Click "Save" to save

### 第二步：在预览中使用主题 / Step 2: Use Theme in Preview

1. 选择 Markdown 内容并生成卡片
   Select Markdown content and generate card

2. 在预览窗口顶部，找到 "Theme:" 下拉菜单
   At the top of preview window, find "Theme:" dropdown

3. 选择您的自定义主题（标记为 "Custom"）
   Select your custom theme (marked as "Custom")

4. 卡片立即更新为新主题
   Card updates immediately to new theme

5. 可以随时切换到其他主题
   Switch to other themes anytime

### 第三步：导出卡片 / Step 3: Export Card

1. 选择想要的主题
   Select desired theme

2. 点击 "Export as Image"
   Click "Export as Image"

3. 卡片以当前选定的主题导出
   Card exports with currently selected theme

## 自定义主题示例 / Custom Theme Examples

### 示例 1：简洁蓝色主题 / Example 1: Clean Blue Theme

```css
.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
}

.card-header::before {
  content: "📘 Note";
  display: block;
  padding: 12px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}

.card-content {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.card-content-inner {
  padding: 20px;
  color: white;
}

.card-content-inner h1,
.card-content-inner h2 {
  color: #ffd700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.card-content-inner .md-strong {
  color: #ffd700;
  font-weight: 700;
}

.card-footer::after {
  content: "Created with MD2Card ✨";
  display: block;
  text-align: center;
  padding: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9em;
  margin-top: 16px;
}
```

### 示例 2：优雅粉色主题 / Example 2: Elegant Pink Theme

```css
.card {
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(252, 182, 159, 0.4);
  border: 3px solid rgba(255, 255, 255, 0.5);
}

.card-header {
  border-bottom: 2px dashed #ff69b4;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.card-header::before {
  content: "🌸";
  font-size: 2em;
  display: block;
  text-align: center;
}

.card-content-inner {
  padding: 10px 20px;
}

.card-content-inner h1 {
  color: #d63384;
  font-family: 'Georgia', serif;
  text-align: center;
  border-bottom: 2px solid #ff69b4;
  padding-bottom: 10px;
}

.card-content-inner h2 {
  color: #ff69b4;
}

.card-content-inner .md-listitem::before {
  content: "💕 ";
  margin-right: 5px;
}

.card-footer {
  border-top: 2px dashed #ff69b4;
  padding-top: 15px;
  margin-top: 20px;
}

.card-footer::after {
  content: "Lovely Notes 💝";
  display: block;
  text-align: center;
  color: #d63384;
  font-style: italic;
}
```

### 示例 3：专业黑白主题 / Example 3: Professional Black & White Theme

```css
.card {
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 4px 4px 0px #000000;
}

.card-header::before {
  content: "DOCUMENT";
  display: block;
  background: #000000;
  color: #ffffff;
  padding: 8px 16px;
  font-weight: bold;
  letter-spacing: 2px;
  font-size: 0.9em;
  margin-bottom: 20px;
  text-align: center;
}

.card-content-inner {
  font-family: 'Georgia', serif;
  color: #000000;
  line-height: 1.8;
}

.card-content-inner h1 {
  font-size: 2.2em;
  font-weight: 700;
  border-bottom: 4px solid #000000;
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.card-content-inner h2 {
  font-size: 1.6em;
  font-weight: 600;
  border-left: 6px solid #000000;
  padding-left: 15px;
  margin: 20px 0;
}

.card-content-inner .md-strong {
  background: #000000;
  color: #ffffff;
  padding: 2px 6px;
}

.card-content-inner .md-blockquote {
  border-left: 4px solid #000000;
  padding-left: 20px;
  font-style: italic;
  background: #f5f5f5;
  padding: 15px 20px;
  margin: 20px 0;
}

.card-footer::after {
  content: "──────────";
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #000000;
}
```

### 示例 4：渐变彩虹主题 / Example 4: Gradient Rainbow Theme

```css
.card {
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #4facfe 75%,
    #00f2fe 100%
  );
  border-radius: 20px;
  padding: 4px;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
}

.card-header,
.card-content,
.card-footer {
  background: white;
  border-radius: 16px;
}

.card-header::before {
  content: "🌈 Rainbow Theme";
  display: block;
  padding: 15px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-content-inner {
  padding: 25px;
}

.card-content-inner h1 {
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2em;
  font-weight: bold;
}

.card-content-inner h2 {
  background: linear-gradient(135deg, #f093fb, #4facfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-footer::after {
  content: "✨ Colorful Design ✨";
  display: block;
  text-align: center;
  padding: 12px;
  color: #764ba2;
}
```

### 示例 5：夜间模式主题 / Example 5: Night Mode Theme

```css
.card {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border: 1px solid #16213e;
}

.card-header::before {
  content: "🌙 Night Notes";
  display: block;
  padding: 12px;
  background: linear-gradient(135deg, #0f3460 0%, #16213e 100%);
  border-radius: 8px;
  color: #e94560;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  border: 1px solid #16213e;
}

.card-content-inner {
  padding: 15px;
  color: #e0e0e0;
}

.card-content-inner h1 {
  color: #e94560;
  text-shadow: 0 0 10px rgba(233, 69, 96, 0.3);
  font-size: 2em;
  border-bottom: 2px solid #e94560;
  padding-bottom: 10px;
}

.card-content-inner h2 {
  color: #00d2ff;
  text-shadow: 0 0 8px rgba(0, 210, 255, 0.3);
}

.card-content-inner .md-strong {
  color: #e94560;
  font-weight: 700;
}

.card-content-inner .md-code,
.card-content-inner .md-pre {
  background: #0f3460;
  border: 1px solid #16213e;
  color: #00d2ff;
}

.card-content-inner .md-blockquote {
  border-left: 3px solid #e94560;
  padding-left: 15px;
  background: rgba(233, 69, 96, 0.1);
  padding: 10px 15px;
  color: #e0e0e0;
}

.card-footer::after {
  content: "💫 Dark Mode Active";
  display: block;
  text-align: center;
  padding: 12px;
  color: #00d2ff;
  border-top: 1px solid #16213e;
  margin-top: 20px;
  font-size: 0.9em;
}
```

## 管理自定义主题 / Managing Custom Themes

### 编辑主题 / Edit Theme

1. 在设置中找到您的自定义主题
   Find your custom theme in settings

2. 点击 "Edit" 按钮
   Click "Edit" button

3. 修改名称或 CSS
   Modify name or CSS

4. 保存更改
   Save changes

### 删除主题 / Delete Theme

1. 在设置中找到要删除的主题
   Find the theme to delete in settings

2. 点击 "Delete" 按钮（红色警告按钮）
   Click "Delete" button (red warning button)

3. 主题将被永久删除
   Theme will be permanently deleted

### 导出/导入主题 / Export/Import Themes

主题保存在 Obsidian 的数据文件中。您可以：

Themes are saved in Obsidian's data files. You can:

- 备份 `.obsidian/plugins/md2card/data.json` 文件
  Backup `.obsidian/plugins/md2card/data.json` file

- 将主题分享给其他人
  Share themes with others

- 在不同设备间同步
  Sync between devices

## CSS 选择器参考 / CSS Selector Reference

### 基础结构 / Basic Structure

```css
.card { }                    /* 卡片容器 / Card container */
.card-header { }            /* 头部 / Header */
.card-content { }           /* 内容容器 / Content container */
.card-content-inner { }     /* 内容区域 / Content area */
.card-footer { }            /* 底部 / Footer */
```

### 添加内容 / Adding Content

```css
.card-header::before { content: "Header Text"; }
.card-footer::after { content: "Footer Text"; }
```

### Markdown 元素 / Markdown Elements

```css
.card-content-inner h1 { }           /* 一级标题 / H1 */
.card-content-inner h2 { }           /* 二级标题 / H2 */
.card-content-inner p { }            /* 段落 / Paragraph */
.card-content-inner .md-strong { }   /* 加粗 / Bold */
.card-content-inner .md-em { }       /* 斜体 / Italic */
.card-content-inner .md-listitem { } /* 列表项 / List item */
.card-content-inner .md-blockquote { } /* 引用 / Blockquote */
.card-content-inner .md-code { }     /* 代码 / Code */
```

## 技巧和提示 / Tips and Tricks

### 1. 使用伪元素添加装饰 / Use Pseudo-elements for Decoration

```css
.card::before {
  content: "";
  position: absolute;
  top: -10px;
  left: -10px;
  width: 50px;
  height: 50px;
  background: #ff4081;
  border-radius: 50%;
}
```

### 2. 创建响应式设计 / Create Responsive Design

```css
.card-content-inner {
  padding: 5%;
  font-size: 1em;
  line-height: 1.6;
}
```

### 3. 使用渐变增加深度 / Use Gradients for Depth

```css
.card {
  background: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### 4. 添加阴影效果 / Add Shadow Effects

```css
.card {
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);
}
```

### 5. 使用背景图案 / Use Background Patterns

```css
.card {
  background-color: #f0f0f0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

## 故障排除 / Troubleshooting

### 样式不显示 / Styles Not Showing

1. 检查 CSS 语法是否正确
   Check if CSS syntax is correct

2. 确保选择器使用 `.card-content-inner` 而不是 `.card-content`
   Ensure selectors use `.card-content-inner` not `.card-content`

3. 使用浏览器开发者工具检查
   Use browser developer tools to inspect

### 主题切换不工作 / Theme Switching Not Working

1. 确保保存了自定义主题
   Ensure custom theme is saved

2. 刷新预览窗口
   Refresh preview window

3. 重新打开预览
   Reopen preview

### 导出图片样式错误 / Export Image Styles Incorrect

1. 在导出前选择正确的主题
   Select correct theme before export

2. 检查 CSS 是否包含不支持的属性
   Check if CSS contains unsupported properties

3. 避免使用动画和过渡效果
   Avoid using animations and transitions

## 社区资源 / Community Resources

### 分享您的主题 / Share Your Themes

在 GitHub Issues 中分享您的主题设计！

Share your theme designs in GitHub Issues!

### 获取灵感 / Get Inspiration

- 查看现有的 CSS 主题库
  Browse existing CSS theme libraries

- 参考网页设计趋势
  Reference web design trends

- 从其他卡片应用中学习
  Learn from other card applications

---

**开始创建您的自定义主题吧！/ Start creating your custom themes!** 🎨
