# MD2Card Plugin Examples
# MD2Card 插件示例

## 📝 Example Use Cases / 示例用例

### Example 1: Study Notes / 学习笔记

**Input Markdown:**
```markdown
# Machine Learning Basics

## Key Concepts

- **Supervised Learning**: Learning from labeled data
- **Unsupervised Learning**: Finding patterns in unlabeled data
- **Reinforcement Learning**: Learning through trial and error

> "The goal is to turn data into information, and information into insight."
```

**Result:** A beautiful card with hierarchical headings, styled lists, and an elegant quote.

---

### Example 2: Code Snippets / 代码片段

**Input Markdown:**
```markdown
# Quick Reference: Python List Comprehension

## Syntax
`[expression for item in iterable if condition]`

## Example Code
# Square all even numbers
squares = [x**2 for x in range(10) if x % 2 == 0]
# Result: [0, 4, 16, 36, 64]
```

**Result:** A card with syntax-highlighted code and clear formatting.

---

### Example 3: Meeting Notes / 会议笔记

**Input Markdown:**
```markdown
# Team Meeting - Oct 29, 2024

## Agenda
1. Project updates
2. Q4 goals
3. Action items

## Decisions Made

| Topic | Decision | Owner |
|-------|----------|-------|
| Design | Use Material UI | Alice |
| Backend | Switch to GraphQL | Bob |
| Testing | Add E2E tests | Carol |

## Action Items
- [ ] Alice: Create design mockups
- [ ] Bob: Set up GraphQL server
- [ ] Carol: Research E2E frameworks
```

**Result:** A well-formatted card with tables and task lists.

---

### Example 4: Quote Cards / 引言卡片

**Input Markdown:**
```markdown
# Daily Inspiration

> "The only way to do great work is to love what you do."
> 
> — Steve Jobs

**Remember:** Passion drives excellence.
```

**Result:** An elegant quote card perfect for sharing.

---

### Example 5: Recipe Card / 食谱卡片

**Input Markdown:**
```markdown
# Chocolate Chip Cookies

## Ingredients
- 2 cups flour
- 1 cup butter
- 1 cup sugar
- 2 eggs
- 1 tsp vanilla
- 2 cups chocolate chips

## Instructions
1. Preheat oven to 375°F
2. Mix butter and sugar
3. Add eggs and vanilla
4. Fold in flour and chips
5. Bake for 10-12 minutes

*Makes 24 cookies*
```

**Result:** A clean, readable recipe card.

---

## 🎨 Theme Comparison / 主题对比

### Default Theme (默认主题)
**Best for:** Fun content, social media posts, creative notes
**Style:** Bright yellow background, decorative star and badge
**Mood:** Energetic, playful, attention-grabbing

### Dark Theme (暗黑主题)
**Best for:** Professional presentations, technical documentation
**Style:** Purple gradient, dark overlay, white text
**Mood:** Sophisticated, modern, professional

### Glass Theme (玻璃主题)
**Best for:** Minimalist designs, elegant presentations
**Style:** Translucent glass effect, subtle shadows
**Mood:** Clean, modern, elegant

### Warm Theme (温暖主题)
**Best for:** Personal notes, journals, casual content
**Style:** Peachy gradient, soft tones
**Mood:** Comfortable, friendly, approachable

---

## 💡 Tips for Best Results / 最佳效果提示

### 1. Keep Content Focused / 保持内容集中
- Use selection mode for specific sections
- Don't overcrowd a single card
- Break long content into multiple cards

### 2. Use Headings Effectively / 有效使用标题
- Start with a clear H1 title
- Use H2/H3 for structure
- Headings are styled prominently

### 3. Leverage Lists / 利用列表
- Lists are great for card format
- Keep list items concise
- Mix ordered and unordered as needed

### 4. Add Visual Interest / 增加视觉趣味
- Use **bold** for emphasis
- Add *italics* for subtle points
- Include > blockquotes for highlights

### 5. Choose the Right Theme / 选择合适的主题
- Default: Social media, fun content
- Dark: Professional, technical
- Glass: Minimalist, elegant
- Warm: Personal, friendly

### 6. Optimal Dimensions / 最佳尺寸
- Default (440x586): Perfect for mobile
- Square (500x500): Great for Instagram
- Wide (600x400): Good for Twitter
- Custom: Adjust to your needs

---

## 🔄 Workflow Examples / 工作流示例

### Social Media Workflow
1. Write your note in Obsidian
2. Select the key point or quote
3. Use "Convert selection to card"
4. Choose "Default" or "Warm" theme
5. Export and share on social media

### Study Materials Workflow
1. Take notes during lecture
2. Highlight important concepts
3. Convert each concept to a card
4. Use "Dark" theme for consistency
5. Create a visual study deck

### Documentation Workflow
1. Write technical documentation
2. Extract code examples
3. Convert to cards with "Glass" theme
4. Use in presentations or tutorials

### Daily Journal Workflow
1. Write daily reflections
2. Select meaningful passages
3. Convert to cards with "Warm" theme
4. Build a visual journal collection

---

## 📐 Size Recommendations / 尺寸建议

### Social Media
- **Instagram Post**: 500x500 (square)
- **Instagram Story**: 440x780 (tall)
- **Twitter**: 600x400 (wide)
- **Facebook**: 600x500 (standard)

### Presentations
- **Slide**: 800x600 (4:3 ratio)
- **Widescreen**: 960x540 (16:9 ratio)

### Print
- **Business Card**: 350x200 (landscape)
- **Flash Card**: 400x300 (standard)

### Digital
- **Mobile**: 440x586 (default)
- **Tablet**: 600x800 (medium)
- **Desktop**: 800x1000 (large)

---

## 🎯 Advanced Tips / 高级技巧

### Combining with Other Plugins
- Use with Templater for consistent formatting
- Combine with Dataview for dynamic content
- Link with Daily Notes for journal cards

### Batch Processing
1. Create multiple selections
2. Convert each to card separately
3. Maintain consistent theme
4. Build a card collection

### Custom Workflows
- Create templates for common card types
- Set up hotkeys for quick access
- Organize exported cards in folders
- Use naming conventions for easy finding

---

## ❓ FAQ / 常见问题

**Q: Can I customize the themes?**
A: Currently, you can choose from 4 built-in themes. Custom theme support may be added in future versions.

**Q: What's the maximum content size?**
A: There's no hard limit, but cards work best with focused, concise content. For long content, use multiple cards.

**Q: Can I export to formats other than PNG?**
A: Currently only PNG export is supported. More formats may be added based on user feedback.

**Q: Does it work with all markdown syntax?**
A: Yes, it supports all standard markdown including tables, code blocks, images, and more.

---

For more information, see [PLUGIN_README.md](./PLUGIN_README.md) and [INSTALL_PLUGIN.md](./INSTALL_PLUGIN.md).
