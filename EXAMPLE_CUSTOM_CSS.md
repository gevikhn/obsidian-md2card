# MD2Card 自定义样式示例 / Custom Style Examples

## 如何使用 / How to Use

1. 打开 Obsidian 设置 / Open Obsidian Settings
2. 找到 MD2Card 插件 / Find MD2Card plugin
3. 在 "Custom CSS" 文本框中粘贴下面的示例代码 / Paste example code below into "Custom CSS" text area
4. 生成卡片查看效果 / Generate a card to see the effect

## 示例 1: 添加标题栏和页脚 / Example 1: Add Header and Footer

```css
.card-header {
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  text-align: center;
  font-size: 1.1em;
  letter-spacing: 1px;
}

.card-header::before {
  content: "📚 学习笔记 / Study Notes";
}

.card-footer {
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.03);
  text-align: center;
  font-size: 0.85em;
  color: #666;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.card-footer::after {
  content: "Created with MD2Card ❤️";
}
```

## 示例 2: 圆形编号列表 / Example 2: Circular Numbered List

```css
.card-content-inner .md-ol {
  counter-reset: item;
  list-style-type: none;
  padding-left: 0;
}

.card-content-inner .md-ol .md-listitem {
  counter-increment: item;
  position: relative;
  padding-left: 3em;
  margin-bottom: 0.8em;
}

.card-content-inner .md-ol .md-listitem::before {
  content: counter(item);
  position: absolute;
  left: 0;
  top: 0;
  width: 2em;
  height: 2em;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9em;
}
```

## 示例 3: 彩虹渐变边框 / Example 3: Rainbow Gradient Border

```css
.card {
  padding: 4px;
  background: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #4facfe 75%,
    #00f2fe 100%
  );
  border-radius: 16px;
}

.card-content {
  background: white;
  border-radius: 12px;
}
```

## 示例 4: 阴影卡片效果 / Example 4: Shadow Card Effect

```css
.card {
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1),
    0 16px 32px rgba(0, 0, 0, 0.1);
}

/* Respects user's motion preferences */
@media (prefers-reduced-motion: no-preference) {
  .card {
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 
      0 4px 8px rgba(0, 0, 0, 0.12),
      0 12px 24px rgba(0, 0, 0, 0.12),
      0 24px 48px rgba(0, 0, 0, 0.12);
  }
}
```

## 示例 5: 表情符号标题 / Example 5: Emoji Headings

```css
.card-content-inner h1[data-text*="重要"]::before,
.card-content-inner h1[data-text*="Important"]::before {
  content: "⭐ ";
}

.card-content-inner h1[data-text*="提示"]::before,
.card-content-inner h1[data-text*="Tip"]::before {
  content: "💡 ";
}

.card-content-inner h1[data-text*="警告"]::before,
.card-content-inner h1[data-text*="Warning"]::before {
  content: "⚠️ ";
}

.card-content-inner h1[data-text*="成功"]::before,
.card-content-inner h1[data-text*="Success"]::before {
  content: "✅ ";
}
```

## 示例 6: 代码块美化 / Example 6: Pretty Code Blocks

```css
.card-content-inner .md-pre {
  background: #282c34;
  border-radius: 8px;
  padding: 1.5em;
  position: relative;
  overflow: visible;
}

.card-content-inner .md-pre::before {
  content: "CODE";
  position: absolute;
  top: -10px;
  left: 20px;
  background: #61dafb;
  color: #282c34;
  padding: 2px 12px;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: bold;
  letter-spacing: 1px;
}

.card-content-inner .md-code {
  color: #abb2bf;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  line-height: 1.6;
}
```

## 示例 7: 引用块样式 / Example 7: Styled Blockquotes

```css
.card-content-inner .md-blockquote {
  border-left: 4px solid #667eea;
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.1), transparent);
  padding: 1em 1em 1em 1.5em;
  margin: 1em 0;
  border-radius: 0 8px 8px 0;
  font-style: italic;
  position: relative;
}

.card-content-inner .md-blockquote::before {
  content: '"';
  position: absolute;
  left: 0.3em;
  top: -0.2em;
  font-size: 3em;
  color: #667eea;
  opacity: 0.3;
  font-family: Georgia, serif;
}
```

## 示例 8: 表格美化 / Example 8: Styled Tables

```css
.card-content-inner .md-table {
  border-radius: 8px;
  overflow: hidden;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-content-inner .md-th {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85em;
  border: none;
  padding: 1em;
}

.card-content-inner .md-td {
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0.8em 1em;
}

.card-content-inner .md-tr:nth-child(even) {
  background: rgba(0, 0, 0, 0.02);
}

.card-content-inner .md-tr:hover {
  background: rgba(102, 126, 234, 0.05);
}
```

## 示例 9: 卡片背景图案 / Example 9: Card Background Pattern

```css
.card {
  background-color: #f0f4f8;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.3) 10px, rgba(255,255,255,.3) 20px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,.3) 10px, rgba(255,255,255,.3) 20px);
}
```

## 示例 10: 极简黑白风格 / Example 10: Minimalist Black & White

```css
.card {
  background: white;
  border: 1px solid #e0e0e0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-content-inner {
  font-family: 'Georgia', serif;
  color: #2c3e50;
  line-height: 1.8;
}

.card-content-inner h1,
.card-content-inner h2,
.card-content-inner h3 {
  font-weight: 400;
  letter-spacing: 1px;
  color: #000;
  border-bottom: 2px solid #000;
  padding-bottom: 0.3em;
  margin-top: 1.5em;
}

.card-content-inner .md-strong {
  background: #000;
  color: #fff;
  padding: 0 0.3em;
}

.card-content-inner .md-em {
  border-bottom: 1px solid #000;
  font-style: normal;
}
```

## 组合使用 / Combining Styles

你可以组合多个示例来创建独特的风格！例如：

You can combine multiple examples to create unique styles! For example:

```css
/* 组合示例 1 + 2 + 5 / Combine Examples 1 + 2 + 5 */

/* Header and Footer from Example 1 */
.card-header {
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-weight: bold;
  text-align: center;
}

.card-header::before {
  content: "📚 My Notes";
}

.card-footer {
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.03);
  text-align: center;
  font-size: 0.85em;
  color: #666;
}

/* Circular list from Example 2 */
.card-content-inner .md-ol {
  counter-reset: item;
  list-style-type: none;
}

.card-content-inner .md-ol .md-listitem {
  counter-increment: item;
  position: relative;
  padding-left: 3em;
}

.card-content-inner .md-ol .md-listitem::before {
  content: counter(item);
  position: absolute;
  left: 0;
  width: 2em;
  height: 2em;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* Emoji headings from Example 5 */
.card-content-inner h1[data-text*="Important"]::before {
  content: "⭐ ";
}
```

## 提示 / Tips

1. 每次只测试一个示例，确保效果符合预期
2. 可以调整颜色值来匹配你的个人风格
3. 使用浏览器开发者工具实时调试样式
4. 记得保存你喜欢的样式配置

1. Test one example at a time to ensure it works as expected
2. Adjust color values to match your personal style
3. Use browser developer tools for live debugging
4. Save your favorite style configurations

祝你创作愉快！/ Happy creating! 🎨
