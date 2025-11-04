# 测试自定义样式功能 / Test Custom Style Feature

## 功能验证 / Feature Verification

本文档用于验证新的自定义卡片样式功能是否正常工作。

This document is used to verify that the new custom card style feature works correctly.

### HTML 结构验证 / HTML Structure Verification

新的卡片应该包含以下结构：
The new card should contain the following structure:

```html
<div class="card">
  <div class="card-header"></div>
  <div class="card-content">
    <div class="card-content-inner">
      <!-- Markdown content -->
    </div>
  </div>
  <div class="card-footer"></div>
</div>
```

### Data 属性验证 / Data Attributes Verification

标题应该包含 `data-text` 属性：
Headings should include `data-text` attribute:

- ✅ H1 with data-text attribute
- ✅ H2 with data-text attribute  
- ✅ H3 with data-text attribute

列表项应该包含 `data-index` 属性：
List items should include `data-index` attribute:

1. First item (data-index="0")
2. Second item (data-index="1")
3. Third item (data-index="2")

### Markdown 元素验证 / Markdown Elements Verification

测试各种 Markdown 元素的类名：
Test class names for various Markdown elements:

**加粗文本** (should have class `.md-strong`)

*斜体文本* (should have class `.md-em`)

~~删除线~~ (should have class `.md-del`)

`行内代码` (should have class `.md-codespan`)

> 这是一个引用块 (should have class `.md-blockquote`)
> This is a blockquote

```javascript
// 代码块 (should have class .md-pre and .md-code)
function hello() {
  console.log("Hello, MD2Card!");
}
```

| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 数据1 | 数据2 | 数据3 |
| 数据4 | 数据5 | 数据6 |

(table should have classes `.md-table`, `.md-thead`, `.md-tbody`, `.md-tr`, `.md-th`, `.md-td`)

### 测试步骤 / Testing Steps

1. 在 Obsidian 中打开此文件
   Open this file in Obsidian

2. 选中部分内容或整个文档
   Select part of the content or the entire document

3. 运行 "MD2Card: Convert selection to card" 或 "Convert document to card" 命令
   Run "MD2Card: Convert selection to card" or "Convert document to card" command

4. 检查生成的卡片预览
   Check the generated card preview

5. 使用浏览器开发者工具检查 HTML 结构
   Use browser developer tools to inspect HTML structure

6. 验证以下内容：
   Verify the following:
   - ✅ Card has `.card` class
   - ✅ Card contains `.card-header` div
   - ✅ Card contains `.card-content` div
   - ✅ Card contains `.card-content-inner` div
   - ✅ Card contains `.card-footer` div
   - ✅ Headings have `data-text` attribute
   - ✅ List items have `data-index` attribute
   - ✅ All Markdown elements have correct class names

7. 测试自定义 CSS 功能
   Test custom CSS feature:
   - 打开插件设置 / Open plugin settings
   - 在 "Custom CSS" 字段添加测试样式 / Add test styles to "Custom CSS" field
   - 生成卡片查看效果 / Generate card to see the effect

### 示例自定义 CSS / Example Custom CSS

在设置中添加以下 CSS 测试功能：
Add the following CSS in settings to test the feature:

```css
.card-header {
  padding: 15px;
  background: #667eea;
  color: white;
  text-align: center;
  font-weight: bold;
}

.card-header::before {
  content: "测试卡片 Test Card";
}

.card-footer {
  padding: 10px;
  background: #f0f0f0;
  text-align: center;
  font-size: 0.9em;
}

.card-footer::after {
  content: "Custom Style Test";
}

.card-content-inner h1 {
  color: #667eea;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.3em;
}

.card-content-inner .md-listitem[data-index="0"] {
  font-weight: bold;
  color: #764ba2;
}
```

### 预期结果 / Expected Results

添加上述 CSS 后，卡片应该显示：
After adding the above CSS, the card should display:

- 紫色的卡片头部，显示 "测试卡片 Test Card"
  Purple card header displaying "测试卡片 Test Card"
  
- 灰色的卡片底部，显示 "Custom Style Test"
  Gray card footer displaying "Custom Style Test"
  
- H1 标题应该是紫色并带有下划线
  H1 headings should be purple with underline
  
- 第一个列表项应该加粗并显示为紫色
  First list item should be bold and purple

### 注意事项 / Notes

- 确保 Obsidian 插件已更新到最新版本
  Make sure the Obsidian plugin is updated to the latest version
  
- 自定义 CSS 立即生效，无需重启
  Custom CSS takes effect immediately without restart
  
- 可以通过插件设置随时修改自定义 CSS
  Custom CSS can be modified anytime through plugin settings

---

**测试完成！/ Testing Complete!** ✅

如果所有验证项都通过，说明自定义样式功能已成功实现。
If all verification items pass, the custom style feature has been successfully implemented.
