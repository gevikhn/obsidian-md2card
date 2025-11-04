# MD2Card 自定义卡片风格指南

## 概述

MD2Card 现在支持通过自定义 CSS 来控制卡片风格。卡片使用规范的 HTML 结构，包含多个可定制的区域。

## HTML 结构

每个卡片都具有以下 HTML 结构：

```html
<div class="card">
  <div class="card-header"></div>
  <div class="card-content">
    <div class="card-content-inner">
      <!-- Markdown 编译后的内容 -->
      <h1 data-text="标题">标题</h1>
      <h2 data-text="标题二">标题二</h2>
      <p>内容</p>
      <ol>
        <li data-index="0">列表项 1</li>
        <li data-index="1">列表项 2</li>
      </ol>
    </div>
  </div>
  <div class="card-footer"></div>
</div>
```

## 各部分说明

- **`.card`**: 卡片容器，包含整个卡片
- **`.card-header`**: 卡片头部区域，可用于添加标题、图标等
- **`.card-content`**: 卡片内容容器
- **`.card-content-inner`**: Markdown 编译后的内容区域，包含所有实际内容
- **`.card-footer`**: 卡片底部区域，可用于添加页脚信息

## Data 属性

为了更好的样式控制，某些元素包含 data 属性：

- **`data-text`**: 用于标题元素（h1-h6），存储标题文本
- **`data-index`**: 用于列表项（li），存储列表项的索引

## Markdown 内容类名

`card-content-inner` 中的 Markdown 元素使用以下类名：

- **标题**: `.md-h1`, `.md-h2`, `.md-h3`, `.md-h4`, `.md-h5`, `.md-h6`
- **段落**: `<p>` 标签
- **列表**: `.md-ul` (无序列表), `.md-ol` (有序列表)
- **列表项**: `.md-listitem`
- **引用**: `.md-blockquote`
- **代码块**: `.md-pre`, `.md-code`
- **行内代码**: `.md-codespan`
- **加粗**: `.md-strong`
- **斜体**: `.md-em`
- **删除线**: `.md-del`
- **表格**: `.md-table`, `.md-thead`, `.md-tbody`, `.md-tr`, `.md-th`, `.md-td`
- **链接**: `.md-link`
- **图片**: `.md-image`
- **分隔线**: `.md-hr`

## 如何自定义样式

### 1. 在设置中添加自定义 CSS

1. 打开 Obsidian 设置
2. 找到 MD2Card 插件设置
3. 在 "Custom CSS" 文本框中添加您的自定义样式

### 2. 自定义示例

#### 示例 1: 添加卡片头部和底部

```css
.card-header {
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  text-align: center;
}

.card-header::before {
  content: "📝 学习卡片";
  font-size: 1.2em;
}

.card-footer {
  padding: 10px;
  background: rgba(0, 0, 0, 0.05);
  text-align: center;
  font-size: 0.9em;
  color: #666;
}

.card-footer::after {
  content: "© 2024 MD2Card";
}
```

#### 示例 2: 自定义列表样式

```css
.card-content-inner .md-ol {
  counter-reset: item;
  list-style-type: none;
}

.card-content-inner .md-ol .md-listitem {
  counter-increment: item;
  position: relative;
  padding-left: 2.5em;
}

.card-content-inner .md-ol .md-listitem::before {
  content: counter(item);
  position: absolute;
  left: 0;
  width: 1.8em;
  height: 1.8em;
  background: #ff4081;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9em;
}
```

#### 示例 3: 基于 data 属性的样式

```css
/* 给特定标题添加样式 */
.card-content-inner h1[data-text*="重要"]::before {
  content: "⭐ ";
  color: #ffc107;
}

/* 高亮特定列表项 */
.card-content-inner .md-listitem[data-index="0"] {
  font-weight: bold;
  color: #ff4081;
}
```

#### 示例 4: 毛玻璃效果卡片

```css
.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.card-content-inner {
  background: rgba(255, 255, 255, 0.05);
}
```

#### 示例 5: 渐变边框卡片

```css
.card {
  position: relative;
  background: white;
  padding: 3px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #4facfe);
}

.card-content {
  background: white;
  border-radius: 10px;
}
```

## 最佳实践

1. **保持简洁**: 避免过于复杂的样式，确保卡片易于阅读
2. **使用相对单位**: 使用 `em` 和 `%` 而不是固定的 `px`，确保在不同尺寸下表现良好
3. **测试不同主题**: 确保自定义样式与内置主题配合良好
4. **考虑导出**: 记住卡片会被导出为图片，某些 CSS 效果可能无法完美转换

## 调试技巧

1. 使用浏览器开发者工具检查生成的 HTML 结构
2. 在 Custom CSS 中逐步添加样式，每次测试一个变化
3. 使用 `!important` 覆盖默认样式（谨慎使用）

## 常见问题

**Q: 自定义 CSS 不生效？**
A: 确保 CSS 选择器正确，检查是否需要提高选择器优先级。

**Q: 可以使用 CSS 动画吗？**
A: 可以在预览时使用，但导出的图片是静态的，不会包含动画效果。

**Q: 如何隐藏某些元素？**
A: 使用 `display: none;` 或 `visibility: hidden;`。

**Q: 自定义样式会影响所有主题吗？**
A: 是的，自定义 CSS 会应用到所有主题。如需针对特定主题，可以使用 `.theme-default`, `.theme-dark` 等类名。

## 示例库

这里是一些完整的自定义样式示例：

### 商务风格

```css
.card {
  border: 2px solid #2c3e50;
}

.card-header {
  background: #2c3e50;
  color: white;
  padding: 12px 20px;
  font-size: 1.1em;
  letter-spacing: 1px;
}

.card-header::before {
  content: "📊 ";
}

.card-footer {
  background: #ecf0f1;
  padding: 8px 20px;
  border-top: 1px solid #bdc3c7;
  font-size: 0.85em;
  color: #7f8c8d;
}
```

### 可爱风格

```css
.card {
  border-radius: 20px;
  border: 3px dashed #ff69b4;
  background: #fff5f7;
}

.card-header {
  background: #ff69b4;
  color: white;
  padding: 15px;
  border-radius: 17px 17px 0 0;
  text-align: center;
}

.card-header::before {
  content: "🌸 可爱笔记 🌸";
}

.card-content-inner h1,
.card-content-inner h2 {
  color: #ff69b4 !important;
}

.card-content-inner .md-listitem::before {
  content: "💕 ";
}
```

### 极简风格

```css
.card {
  border: none;
  background: white;
  box-shadow: none;
}

.card-content-inner {
  font-family: 'Georgia', serif;
  line-height: 1.8;
  color: #333;
}

.card-content-inner h1,
.card-content-inner h2,
.card-content-inner h3 {
  font-weight: 300;
  letter-spacing: 2px;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3em;
}
```

## 总结

通过自定义 CSS，您可以完全控制卡片的外观。发挥创意，创建独特的卡片风格！
