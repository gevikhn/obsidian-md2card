# MD2Card HTML Structure Diagram / HTML 结构图

## 卡片结构图 / Card Structure Diagram

```
┌─────────────────────────────────────────────────┐
│ .card (container)                               │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ .card-header                              │ │
│  │ (可用于标题、图标等 / For title, icons)    │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ .card-content                             │ │
│  │                                           │ │
│  │  ┌─────────────────────────────────────┐ │ │
│  │  │ .card-content-inner                 │ │ │
│  │  │                                     │ │ │
│  │  │ Markdown 内容区域:                   │ │ │
│  │  │ Markdown Content Area:              │ │ │
│  │  │                                     │ │ │
│  │  │ • <h1 data-text="标题">标题</h1>    │ │ │
│  │  │ • <h2 data-text="副标题">副标题</h2> │ │ │
│  │  │ • <p>段落内容</p>                    │ │ │
│  │  │ • <ol class="md-ol">               │ │ │
│  │  │     <li data-index="0">项目1</li>  │ │ │
│  │  │     <li data-index="1">项目2</li>  │ │ │
│  │  │   </ol>                            │ │ │
│  │  │ • <blockquote class="md-blockquote">│ │ │
│  │  │ • <code class="md-codespan">      │ │ │
│  │  │ • <pre class="md-pre">            │ │ │
│  │  │     <code class="md-code">        │ │ │
│  │  │ • 更多元素... / More elements...  │ │ │
│  │  │                                     │ │ │
│  │  └─────────────────────────────────────┘ │ │
│  │                                           │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ .card-footer                              │ │
│  │ (可用于页脚信息 / For footer info)         │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Markdown 元素类名映射 / Markdown Element Class Mapping

| Markdown 元素<br/>Markdown Element | HTML 类名<br/>HTML Class | 说明<br/>Description |
|-----------------------------------|------------------------|-------------------|
| # 标题 / Heading | `.md-h1` ~ `.md-h6` | 带 data-text 属性<br/>With data-text attribute |
| 段落 / Paragraph | `<p>` | 标准 p 标签<br/>Standard p tag |
| 无序列表 / Unordered List | `.md-ul` | ul 元素<br/>ul element |
| 有序列表 / Ordered List | `.md-ol` | ol 元素<br/>ol element |
| 列表项 / List Item | `.md-listitem` | 带 data-index 属性<br/>With data-index attribute |
| > 引用 / Blockquote | `.md-blockquote` | blockquote 元素<br/>blockquote element |
| 代码块 / Code Block | `.md-pre`, `.md-code` | pre > code 结构<br/>pre > code structure |
| `行内代码` / Inline Code | `.md-codespan` | code 元素<br/>code element |
| **加粗** / Bold | `.md-strong` | strong 元素<br/>strong element |
| *斜体* / Italic | `.md-em` | em 元素<br/>em element |
| ~~删除线~~ / Strikethrough | `.md-del` | del 元素<br/>del element |
| 表格 / Table | `.md-table` | table 元素<br/>table element |
| 表格头 / Table Header | `.md-thead`, `.md-th` | thead, th 元素<br/>thead, th elements |
| 表格体 / Table Body | `.md-tbody`, `.md-tr`, `.md-td` | tbody, tr, td 元素<br/>tbody, tr, td elements |
| [链接] / Link | `.md-link` | a 元素<br/>a element |
| ![图片] / Image | `.md-image` | img 元素<br/>img element |
| --- / Horizontal Rule | `.md-hr` | hr 元素<br/>hr element |

## CSS 选择器示例 / CSS Selector Examples

### 基础选择器 / Basic Selectors

```css
/* 卡片容器 / Card container */
.card { }

/* 卡片头部 / Card header */
.card-header { }

/* 卡片内容区域 / Card content area */
.card-content { }

/* Markdown 内容容器 / Markdown content container */
.card-content-inner { }

/* 卡片底部 / Card footer */
.card-footer { }
```

### 内容元素选择器 / Content Element Selectors

```css
/* 所有标题 / All headings */
.card-content-inner h1 { }
.card-content-inner h2 { }
.card-content-inner h3 { }

/* 段落 / Paragraphs */
.card-content-inner p { }

/* 列表 / Lists */
.card-content-inner .md-ul { }
.card-content-inner .md-ol { }
.card-content-inner .md-listitem { }

/* 引用 / Blockquotes */
.card-content-inner .md-blockquote { }

/* 代码 / Code */
.card-content-inner .md-pre { }
.card-content-inner .md-code { }
.card-content-inner .md-codespan { }

/* 文本样式 / Text styles */
.card-content-inner .md-strong { }
.card-content-inner .md-em { }
.card-content-inner .md-del { }

/* 表格 / Tables */
.card-content-inner .md-table { }
.card-content-inner .md-th { }
.card-content-inner .md-td { }
```

### 使用 Data 属性的选择器 / Selectors Using Data Attributes

```css
/* 特定标题内容 / Specific heading content */
.card-content-inner h1[data-text="重要"] { }
.card-content-inner h1[data-text*="Important"] { }

/* 特定列表项 / Specific list item */
.card-content-inner .md-listitem[data-index="0"] { }
.card-content-inner .md-listitem[data-index="1"] { }

/* 偶数列表项 / Even list items */
.card-content-inner .md-listitem:nth-child(even) { }
```

### 组合选择器 / Combined Selectors

```css
/* 头部和底部的内容 / Header and footer content */
.card-header::before {
  content: "我的标题 / My Title";
}

.card-footer::after {
  content: "页脚信息 / Footer Info";
}

/* 嵌套元素 / Nested elements */
.card-content-inner .md-ol .md-listitem::before {
  content: counter(item);
}

/* 主题特定样式 / Theme-specific styles */
.theme-default .card-content-inner h1 {
  color: #ff4081;
}

.theme-dark .card-content-inner {
  color: #ffffff;
}
```

## 样式优先级 / Style Priority

1. **Custom CSS** (自定义 CSS) - 最高优先级 / Highest priority
2. **Theme styles** (主题样式) - 中等优先级 / Medium priority  
3. **Base styles** (基础样式) - 最低优先级 / Lowest priority

提示：如果自定义样式不生效，可以使用 `!important` 提高优先级（谨慎使用）。

Tip: If custom styles don't work, you can use `!important` to increase priority (use sparingly).

```css
.card-content-inner h1 {
  color: red !important;
}
```

## 响应式设计建议 / Responsive Design Tips

```css
/* 使用相对单位 / Use relative units */
.card-content-inner {
  font-size: 1em;      /* 不是 / instead of 16px */
  padding: 1.5em;      /* 不是 / instead of 24px */
  line-height: 1.6;    /* 相对行高 / relative line height */
}

/* 使用百分比宽度 / Use percentage widths */
.card-header {
  width: 100%;
  padding: 2%;
}

/* 使用 em 作为边距 / Use em for margins */
.card-content-inner h1 {
  margin-top: 1em;
  margin-bottom: 0.5em;
}
```

## 调试技巧 / Debugging Tips

### 1. 查看结构 / Inspect Structure

在预览窗口中右键点击 → 检查元素（F12）

Right-click in preview window → Inspect Element (F12)

### 2. 测试样式 / Test Styles

在开发者工具的 Styles 面板中实时编辑 CSS

Edit CSS live in the Styles panel of developer tools

### 3. 查找元素 / Find Elements

```javascript
// 在控制台中运行 / Run in console
document.querySelectorAll('.card-content-inner h1')
document.querySelectorAll('[data-text]')
document.querySelectorAll('[data-index]')
```

### 4. 检查应用的样式 / Check Applied Styles

在 Elements 面板中查看 Computed 标签页

Check Computed tab in Elements panel

## 常见问题解决 / Common Issues & Solutions

### 样式不生效 / Styles Not Working

```css
/* 问题 / Problem: 样式被覆盖 / Style is overridden */
.card-header { color: red; }

/* 解决方案 / Solution: 提高优先级 / Increase specificity */
div.card div.card-header { color: red; }

/* 或使用 !important / Or use !important */
.card-header { color: red !important; }
```

### 布局问题 / Layout Issues

```css
/* 问题 / Problem: 内容溢出 / Content overflow */
.card-content-inner { }

/* 解决方案 / Solution: 添加溢出控制 / Add overflow control */
.card-content-inner {
  overflow: auto;
  max-height: 500px;
}
```

### 颜色继承 / Color Inheritance

```css
/* 问题 / Problem: 颜色没有应用到子元素 / Color not applied to children */
.card-content { color: blue; }

/* 解决方案 / Solution: 使用继承或直接选择 / Use inheritance or direct selection */
.card-content,
.card-content * {
  color: blue;
}
```

## 最佳实践总结 / Best Practices Summary

1. ✅ 使用相对单位（em, %, rem）
   Use relative units (em, %, rem)

2. ✅ 保持选择器简洁
   Keep selectors concise

3. ✅ 利用 data 属性进行精确控制
   Use data attributes for precise control

4. ✅ 考虑可访问性（对比度、字体大小）
   Consider accessibility (contrast, font size)

5. ✅ 测试不同主题下的效果
   Test with different themes

6. ✅ 使用注释说明复杂样式
   Use comments for complex styles

7. ✅ 遵循移动优先原则
   Follow mobile-first principles

---

**参考文档 / Reference Documentation:**
- [自定义样式指南 / Custom Style Guide](./CUSTOM_STYLE_GUIDE.md)
- [样式示例 / Style Examples](./EXAMPLE_CUSTOM_CSS.md)
- [测试文档 / Testing Documentation](./TEST_CUSTOM_STYLE.md)
