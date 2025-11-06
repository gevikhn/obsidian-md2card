# Release Guide / 发布指南

## Automated Release Process / 自动发布流程

This repository uses GitHub Actions to automate the build and release process.

本仓库使用 GitHub Actions 自动化构建和发布流程。

## Workflows / 工作流

### 1. Build Workflow (build.yml)

**Triggers / 触发条件:**
- Push to `main` branch / 推送到 `main` 分支
- Pull requests to `main` / 针对 `main` 的 Pull Request

**Purpose / 目的:**
- Verify that the code builds successfully / 验证代码能够成功构建
- Generate build artifacts for review / 生成构建产物供审查
- Ensure code quality before merging / 确保合并前的代码质量

**Artifacts / 产物:**
Build artifacts are stored for 7 days and include:
构建产物保留 7 天，包括：
- `main.js`
- `manifest.json`
- `versions.json`

### 2. Release Workflow (release.yml)

**Triggers / 触发条件:**
- Push of a tag (e.g., `v1.1.0`, `1.2.0`) / 推送标签（如 `v1.1.0`, `1.2.0`）

**Purpose / 目的:**
- Build the plugin / 构建插件
- Create a GitHub Release / 创建 GitHub Release
- Upload plugin files to the release / 上传插件文件到 release

**Release Contents / Release 内容:**
- `main.js` - Plugin code / 插件代码
- `manifest.json` - Plugin metadata / 插件元数据
- `versions.json` - Version compatibility / 版本兼容性信息

## How to Create a Release / 如何创建发布

### Step 1: Update Version / 步骤 1：更新版本

Update the version number in the following files:
在以下文件中更新版本号：

1. **manifest.json**
   ```json
   {
     "version": "1.2.0"
   }
   ```

2. **versions.json**
   ```json
   {
     "1.2.0": "0.15.0"
   }
   ```

3. **package.json**
   ```json
   {
     "version": "1.2.0"
   }
   ```

### Step 2: Commit Changes / 步骤 2：提交更改

```bash
git add manifest.json versions.json package.json
git commit -m "Bump version to 1.2.0"
git push origin main
```

### Step 3: Create and Push Tag / 步骤 3：创建并推送标签

```bash
# Create a tag / 创建标签
git tag -a 1.2.0 -m "Release version 1.2.0"

# Or with 'v' prefix / 或使用 'v' 前缀
git tag -a v1.2.0 -m "Release version 1.2.0"

# Push the tag / 推送标签
git push origin 1.2.0

# Or / 或
git push origin v1.2.0
```

### Step 4: GitHub Actions Automatically Runs / 步骤 4：GitHub Actions 自动运行

Once the tag is pushed, GitHub Actions will automatically:
标签推送后，GitHub Actions 将自动：

1. ✅ Checkout the code / 检出代码
2. ✅ Install dependencies / 安装依赖
3. ✅ Build the plugin / 构建插件
4. ✅ Create a GitHub Release / 创建 GitHub Release
5. ✅ Upload files to the release / 上传文件到 release

### Step 5: Verify Release / 步骤 5：验证发布

1. Go to the repository's Releases page
   前往仓库的 Releases 页面

2. Verify the new release is created
   验证新 release 已创建

3. Check that all three files are attached
   检查三个文件都已附加

4. Test download and installation
   测试下载和安装

## Troubleshooting / 故障排除

### Build Fails / 构建失败

If the build workflow fails:
如果构建工作流失败：

1. Check the Actions tab for error logs
   在 Actions 标签页查看错误日志

2. Fix the errors locally
   在本地修复错误

3. Push the fixes
   推送修复

### Release Fails / 发布失败

If the release workflow fails:
如果发布工作流失败：

1. Delete the failed release (if created)
   删除失败的 release（如果已创建）

2. Delete the tag locally and remotely
   在本地和远程删除标签

   ```bash
   # Delete local tag / 删除本地标签
   git tag -d 1.2.0

   # Delete remote tag / 删除远程标签
   git push origin :refs/tags/1.2.0
   ```

3. Fix the issues
   修复问题

4. Create and push the tag again
   重新创建并推送标签

## Version Numbering / 版本号规范

Follow Semantic Versioning (SemVer):
遵循语义化版本规范 (SemVer)：

- **MAJOR.MINOR.PATCH** (e.g., 1.2.0)
  - **MAJOR**: Breaking changes / 重大破坏性更改
  - **MINOR**: New features / 新功能
  - **PATCH**: Bug fixes / Bug 修复

Examples / 示例:
- `1.0.0` - Initial release / 初始版本
- `1.1.0` - Add new features / 添加新功能
- `1.1.1` - Fix bugs / 修复 bug
- `2.0.0` - Breaking changes / 重大更新

## Manual Release (Optional) / 手动发布（可选）

If you prefer to create releases manually:
如果你希望手动创建 release：

1. Build locally / 本地构建:
   ```bash
   npm run build:plugin
   ```

2. Create a release on GitHub
   在 GitHub 上创建 release

3. Upload the three files manually
   手动上传三个文件

## Security / 安全

- The `GITHUB_TOKEN` is automatically provided by GitHub Actions
  `GITHUB_TOKEN` 由 GitHub Actions 自动提供

- No additional secrets need to be configured
  无需配置额外的 secrets

- The token has write permissions to create releases
  该 token 具有创建 release 的写权限

## Notes / 注意事项

- Always test the build locally before creating a release
  创建 release 前务必在本地测试构建

- The build workflow runs on every push to `main`
  每次推送到 `main` 都会运行构建工作流

- The release workflow only runs when a tag is pushed
  只有推送标签时才会运行发布工作流

- Release names are automatically generated from the version
  Release 名称会根据版本自动生成

- You can edit the release description on GitHub after creation
  创建后可以在 GitHub 上编辑 release 描述

---

For more information, see the [GitHub Actions Documentation](https://docs.github.com/en/actions).

更多信息请参阅 [GitHub Actions 文档](https://docs.github.com/zh/actions)。
