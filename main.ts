import { App, Component, Editor, EventRef, MarkdownRenderer, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import * as htmlToImage from 'html-to-image';
import defaultCardThemeCss from './default_card_theme.css';
import defaultGithubStyleCss from './default_github_style.css';
import defaultPieStyleCss from './default_pie_style.css';
import defaultLatexStyleCss from './default_latex_style.css';
import defaultVintageNewspaperStyleCss from './default_vintage_newspaper_style.css';

type MermaidAPI = {
  initialize: (config: unknown) => void;
  render: (id: string, code: string) => Promise<{ svg: string }>;
};

const ALLOWED_PIXEL_RATIOS = [1, 2, 4, 8] as const;
type PixelRatioOption = (typeof ALLOWED_PIXEL_RATIOS)[number];
const MAX_CANVAS_DIMENSION = 8192;
const MAX_CANVAS_PIXELS = 67_108_864; // 8192^2, conservative guard against browser canvas limits.

const waitForDocumentFonts = async (doc: Document | null | undefined): Promise<void> => {
  if (!doc || !('fonts' in doc)) {
    return;
  }

  try {
    await (doc as Document & { fonts: FontFaceSet }).fonts.ready;
  } catch (error) {
    console.warn('Failed to wait for document fonts', error);
  }
};

interface CustomTheme {
  name: string;
  css: string;
}

interface MD2CardSettings {
  selectedTheme: string;
  cardWidth: number;
  customThemes: CustomTheme[];
  cardSizePreset?: string; // e.g., '自由', 'A4(纵向)', 'A4(横向)', '16:9', '1:1'
  exportPixelRatio: PixelRatioOption;
  exportQuality: number;
}

const BUILT_IN_THEMES = ['默认', 'GitHub', '玻璃', '温暖', 'PI', 'LaTeX', '复古报纸'] as const;
const BUILT_IN_THEME_LABELS: Record<(typeof BUILT_IN_THEMES)[number], string> = {
  '默认': 'Default (Clean)',
  'GitHub': 'GitHub',
  '玻璃': 'Glass',
  '温暖': 'Warm',
  'PI': 'Palette Pie',
  'LaTeX': 'LaTeX Journal',
  '复古报纸': 'Vintage Newspaper'
};

const DEFAULT_SETTINGS: MD2CardSettings = {
  selectedTheme: '默认',
  cardWidth: 440,
  customThemes: [],
  cardSizePreset: '自由',
  exportPixelRatio: 1,
  exportQuality: 1
};

// Card size presets (height ratios based on width)
const CARD_SIZE_PRESETS: Array<{ key: string; label: string; ratio: number | null }> = [
  { key: '自由', label: '自由 (自适应高度)', ratio: null },
  { key: 'A4(纵向)', label: 'A4 纵向 (210×297)', ratio: 297 / 210 },
  { key: 'A4(横向)', label: 'A4 横向 (297×210)', ratio: 210 / 297 },
  { key: '1:1', label: '正方形 1:1', ratio: 1 },
  { key: '16:9', label: '16:9', ratio: 9 / 16 },
  { key: '4:3', label: '4:3', ratio: 3 / 4 },
];

const getPresetRatio = (preset: string | undefined): number | null => {
  const found = CARD_SIZE_PRESETS.find(p => p.key === preset);
  return found ? found.ratio : null;
};

// Suggested widths (px) for presets; height remains auto
const getPresetSuggestedWidth = (preset: string | undefined, currentWidth: number): number | null => {
  switch (preset) {
    case 'A4(纵向)':
      return 794; // ~8.27in at 96dpi
    case 'A4(横向)':
      return 1123; // ~11.69in at 96dpi
    case '1:1':
      return 600;
    case '16:9':
      return 1280;
    case '4:3':
      return 1024;
    default:
      return currentWidth; // 自由 or unknown: keep current width
  }
};

export default class MD2CardPlugin extends Plugin {
  settings: MD2CardSettings;

  async onload() {
    await this.loadSettings();

    // Add command to convert selection to card
    this.addCommand({
      id: 'convert-selection-to-card',
      name: 'Convert selection to card',
      editorCallback: (editor: Editor) => {
        const selection = editor.getSelection();
        if (!selection) {
          new Notice('Please select some text first');
          return;
        }
        this.generateCard(selection);
      }
    });

    // Add command to convert entire document to card
    this.addCommand({
      id: 'convert-document-to-card',
      name: 'Convert document to card',
      editorCallback: (editor: Editor) => {
        const content = editor.getValue();
        this.generateCard(content);
      }
    });

    // Add command for preview mode conversion with shortcut
    this.addCommand({
      id: 'convert-preview-document-to-card',
      name: 'Convert document to card (Preview)',
      hotkeys: [{ modifiers: ['Mod'], key: 'p' }],
      checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!view || typeof view.getMode !== 'function' || view.getMode() !== 'preview') {
          return false;
        }

        if (!checking) {
          const content = view.getViewData();
          this.generateCard(content);
        }

        return true;
      }
    });

    // Add editor context menu for selection
    this.registerEvent(
      this.app.workspace.on('editor-menu', (menu, editor) => {
        const selection = editor.getSelection();
        if (selection) {
          menu.addItem((item) => {
            item
              .setTitle('Convert selection to card')
              .setIcon('image')
              .onClick(() => {
                this.generateCard(selection);
              });
          });
        }
        
        // Always add option to convert entire document
        menu.addItem((item) => {
          item
            .setTitle('Convert document to card')
            .setIcon('file-image')
            .onClick(() => {
              const content = editor.getValue();
              this.generateCard(content);
            });
        });
      })
    );

    this.registerEvent(
      this.app.workspace.on('view-menu', (menu, view) => {
        if (!(view instanceof MarkdownView) || typeof view.getMode !== 'function' || view.getMode() !== 'preview') {
          return;
        }

        menu.addItem((item) => {
          item
            .setTitle('Convert document to card')
            .setIcon('file-image')
            .onClick(() => {
              const content = view.getViewData();
              this.generateCard(content);
            });
        });
      })
    );

    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        if (!(file instanceof TFile)) {
          return;
        }

        menu.addItem((item) => {
          item
            .setTitle('Convert document to card')
            .setIcon('file-image')
            .onClick(async () => {
              await this.convertFileToCard(file);
            });
        });
      })
    );

    // Add settings tab
    this.addSettingTab(new MD2CardSettingTab(this.app, this));
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async generateCard(markdown: string) {
    // Always reload settings to pick up external changes to data.json
    await this.loadSettings();
    new CardPreviewModal(this.app, markdown, this.settings, this).open();
  }

  private async convertFileToCard(file: TFile) {
    try {
      const content = await this.app.vault.cachedRead(file);
      this.generateCard(content);
    } catch (error) {
      console.error('Failed to read file for card conversion', error);
      new Notice('Failed to read file contents');
    }
  }
}

class CardPreviewModal extends Modal {
  markdown: string;
  settings: MD2CardSettings;
  plugin: MD2CardPlugin;
  currentTheme: string;
  previewContainer: HTMLElement;
  previewScrollContainer: HTMLElement;
  cardElement: HTMLElement;
  innerCardElement?: HTMLElement;
  mermaidInitialized: boolean;
  private previewHost?: HTMLElement;
  private mermaidApi?: MermaidAPI;
  private resizeHandler?: () => void;
  private wheelHandler?: (e: WheelEvent) => void;
  private markdownComponent?: Component;
  private themeChangeRef?: EventRef;
  private advancedOpen = false;
  private zoomScale: number = 1;
  private resetZoomButton?: HTMLButtonElement;

  constructor(app: App, markdown: string, settings: MD2CardSettings, plugin: MD2CardPlugin) {
    super(app);
    this.markdown = markdown;
    this.settings = settings;
    this.plugin = plugin;
    this.currentTheme = settings.selectedTheme;
    this.mermaidInitialized = false;
  }

  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    this.modalEl.addClass('md2card-modal');
    this.modalEl.style.width = 'min(90vw, 1000px)';
    this.modalEl.style.maxHeight = '90vh';

    contentEl.createEl('h2', { text: 'Card Preview' });

    // Add theme selector
    const themeContainer = contentEl.createDiv({ cls: 'md2card-theme-selector' });
    themeContainer.style.marginBottom = '15px';
    themeContainer.style.display = 'flex';
    themeContainer.style.alignItems = 'center';
    themeContainer.style.gap = '10px';

    const themeLabel = themeContainer.createEl('label', { text: 'Theme: ' });
    themeLabel.style.fontWeight = 'bold';

    const themeSelect = themeContainer.createEl('select');
    themeSelect.style.padding = '5px 10px';
    themeSelect.style.borderRadius = '4px';
    themeSelect.style.border = '1px solid #ccc';
    themeSelect.style.flex = '1';

    const rebuildThemeOptions = () => {
      while (themeSelect.firstChild) themeSelect.removeChild(themeSelect.firstChild);
      BUILT_IN_THEMES.forEach(theme => {
        const option = themeSelect.createEl('option', { text: theme, value: theme });
        if (theme === this.currentTheme) option.selected = true;
      });
      if (this.settings.customThemes.length > 0) {
        const separator = themeSelect.createEl('option');
        separator.disabled = true;
        separator.text = '──────────';
        this.settings.customThemes.forEach(customTheme => {
          const value = `custom:${customTheme.name}`;
          const option = themeSelect.createEl('option', { text: `${customTheme.name} (Custom)`, value });
          if (value === this.currentTheme) option.selected = true;
        });
      }
    };
    rebuildThemeOptions();

    themeSelect.addEventListener('change', async () => {
      this.currentTheme = themeSelect.value;
      this.settings.selectedTheme = this.currentTheme;
      await this.plugin.saveSettings();
      await this.renderCard(this.cardElement);
    });

    const widthControl = contentEl.createDiv({ cls: 'md2card-width-control' });
    widthControl.style.display = 'flex';
    widthControl.style.alignItems = 'center';
    widthControl.style.gap = '10px';
    widthControl.style.marginBottom = '15px';

    const widthLabel = widthControl.createEl('label', { text: 'Card width (px):' });
    widthLabel.style.fontWeight = 'bold';

    const widthRange = widthControl.createEl('input', { type: 'range' });
    widthRange.min = '200';
    widthRange.max = '1600';
    widthRange.value = String(this.settings.cardWidth);
    widthRange.style.flex = '1';

    const widthNumber = widthControl.createEl('input', { type: 'number' });
    widthNumber.style.width = '90px';
    widthNumber.style.padding = '5px';
    widthNumber.style.borderRadius = '4px';
    widthNumber.style.border = '1px solid #ccc';
    widthNumber.min = '200';
    widthNumber.max = '1600';
    widthNumber.value = String(this.settings.cardWidth);

    const applyWidth = (rawWidth: number) => {
      if (!Number.isFinite(rawWidth)) {
        return;
      }
      const normalized = Math.min(1600, Math.max(200, Math.round(rawWidth)));
      this.settings.cardWidth = normalized;
      widthRange.value = String(normalized);
      widthNumber.value = String(normalized);
      this.updateCardWidth();
      void this.plugin.saveSettings();
    };

    widthRange.addEventListener('input', (event) => {
      const value = Number((event.target as HTMLInputElement).value);
      applyWidth(value);
    });

    widthNumber.addEventListener('change', (event) => {
      const value = Number((event.target as HTMLInputElement).value);
      if (Number.isNaN(value)) {
        widthNumber.value = String(this.settings.cardWidth);
        return;
      }
      applyWidth(value);
    });

    // Collapsible advanced section (hidden by default)
    // const advToggleRow = contentEl.createDiv({ cls: 'md2card-adv-toggle-row' });
    // advToggleRow.style.display = 'flex';
    // advToggleRow.style.justifyContent = 'flex-start';
    // advToggleRow.style.margin = '8px 0 4px';

    const advToggleBtn = widthControl.createEl('button', { cls: 'md2card-adv-toggle' });
    advToggleBtn.style.display = 'inline-flex';
    advToggleBtn.style.alignItems = 'center';
    advToggleBtn.style.gap = '6px';
    advToggleBtn.style.padding = '4px 10px';
    advToggleBtn.style.borderRadius = '6px';
    advToggleBtn.style.border = 'none';
    advToggleBtn.style.background = 'transparent';
    advToggleBtn.style.cursor = 'pointer';
    advToggleBtn.style.boxShadow = 'none';
    advToggleBtn.style.outline = 'none';
    advToggleBtn.style.setProperty('appearance', 'none');
    advToggleBtn.style.setProperty('-webkit-appearance', 'none');
    advToggleBtn.style.setProperty('-moz-appearance', 'none');
    const iconSpan = advToggleBtn.createSpan({ cls: 'md2card-adv-icon' });
    const labelSpan = advToggleBtn.createSpan({ text: '' });

    // Inline SVG icons using currentColor
    const ICON_EXPAND = '<svg viewBox="0 0 1024 1024" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M880.768 271.808a51.072 51.072 0 0 0-73.92 0L512.064 574.144 217.28 271.808a51.072 51.072 0 0 0-73.92 0 55.232 55.232 0 0 0 0 76.288l330.432 339.2 1.28 1.408a51.328 51.328 0 0 0 73.984 0l1.28-1.408 330.432-339.2a55.232 55.232 0 0 0 0-76.288z" fill="currentColor"></path></svg>';
    const ICON_COLLAPSE = '<svg viewBox="0 0 1024 1024" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M512 253.561905l-487.619048 443.733333 63.390477 73.142857 424.228571-385.219047 424.228571 385.219047 63.390477-73.142857z" fill="currentColor"></path></svg>';

    const applyToggleIcon = () => {
      iconSpan.innerHTML = this.advancedOpen ? ICON_COLLAPSE : ICON_EXPAND;
      labelSpan.setText(this.advancedOpen ? '' : '');
    };
    applyToggleIcon();

    const advPanel = contentEl.createDiv({ cls: 'md2card-adv-panel' });
    advPanel.style.display = 'none';
    // No border for a cleaner, cohesive look
    advPanel.style.border = 'none';
    advPanel.style.borderRadius = '8px';
    advPanel.style.padding = '10px';
    advPanel.style.marginBottom = '12px';
    advPanel.style.background = 'transparent';

    advToggleBtn.addEventListener('click', () => {
      this.advancedOpen = !this.advancedOpen;
      advPanel.style.display = this.advancedOpen ? 'block' : 'none';
      applyToggleIcon();
    });

    // Advanced: Card size preset
    const sizeRow = advPanel.createDiv({ cls: 'md2card-size-row' });
    sizeRow.style.display = 'flex';
    sizeRow.style.alignItems = 'center';
    sizeRow.style.gap = '10px';
    sizeRow.style.marginBottom = '8px';
    const sizeLabel = sizeRow.createEl('label', { text: 'Card size preset:' });
    sizeLabel.style.fontWeight = 'bold';

    const ensurePresetKey = (value: unknown): string | undefined => {
      const textValue = typeof value === 'string' ? value : String(value ?? '');
      const match = CARD_SIZE_PRESETS.find(p => p.key === textValue);
      return match ? match.key : CARD_SIZE_PRESETS[0]?.key;
    };

    const sizeSelect = sizeRow.createEl('select', { cls: 'md2card-select' });
    sizeSelect.style.padding = '6px 10px';
    sizeSelect.style.borderRadius = '6px';
    sizeSelect.style.border = '1px solid var(--md2card-border, #d1d5db)';
    sizeSelect.style.background = 'var(--md2card-panel-bg, rgba(0,0,0,0.02))';
    sizeSelect.style.color = 'var(--md2card-fg, #111827)';
    sizeSelect.style.minWidth = '220px';

    const currentPresetKey = ensurePresetKey(this.settings.cardSizePreset);
    if (currentPresetKey && this.settings.cardSizePreset !== currentPresetKey) {
      this.settings.cardSizePreset = currentPresetKey;
    }

    CARD_SIZE_PRESETS.forEach((preset) => {
      const option = sizeSelect.createEl('option', { text: preset.label, value: preset.key });
      if (preset.key === currentPresetKey) {
        option.selected = true;
      }
    });

    sizeSelect.value = currentPresetKey ?? '';

    sizeSelect.addEventListener('change', async () => {
      const selectedKey = ensurePresetKey(sizeSelect.value);
      if (!selectedKey) {
        return;
      }
      this.settings.cardSizePreset = selectedKey;
      const suggested = getPresetSuggestedWidth(selectedKey, this.settings.cardWidth);
      if (suggested != null) {
        applyWidth(suggested);
      }
      await this.plugin.saveSettings();
      this.updateCardWidth();
    });

    const ensurePixelRatio = (value: unknown): PixelRatioOption => {
      const numericValue = Number(value);
      return (ALLOWED_PIXEL_RATIOS as ReadonlyArray<number>).includes(numericValue)
        ? (numericValue as PixelRatioOption)
        : ALLOWED_PIXEL_RATIOS[0];
    };

    // Advanced: Pixel ratio selection
    const ratioRow = advPanel.createDiv({ cls: 'md2card-ratio-row' });
    ratioRow.style.display = 'flex';
    ratioRow.style.alignItems = 'center';
    ratioRow.style.gap = '10px';
    ratioRow.style.marginBottom = '8px';
    const ratioLabel = ratioRow.createEl('label', { text: 'Export pixel ratio:' });
    ratioLabel.style.fontWeight = 'bold';

    const ratioSelect = ratioRow.createEl('select', { cls: 'md2card-select' });
    ratioSelect.style.padding = '6px 10px';
    ratioSelect.style.borderRadius = '6px';
    ratioSelect.style.border = '1px solid var(--md2card-border, #d1d5db)';
    ratioSelect.style.background = 'var(--md2card-panel-bg, rgba(0,0,0,0.02))';
    ratioSelect.style.color = 'var(--md2card-fg, #111827)';
    ratioSelect.style.minWidth = '110px';

    ALLOWED_PIXEL_RATIOS.forEach((value) => {
      const option = ratioSelect.createEl('option', { text: `${value}x`, value: String(value) });
      option.selected = ensurePixelRatio(this.settings.exportPixelRatio) === value;
    });

    ratioSelect.addEventListener('change', () => {
      const selected = ensurePixelRatio(ratioSelect.value);
      if (this.settings.exportPixelRatio !== selected) {
        this.settings.exportPixelRatio = selected;
        void this.plugin.saveSettings();
      }
    });

    // Advanced: Image quality controls
    const qualityRow = advPanel.createDiv({ cls: 'md2card-quality-row' });
    qualityRow.style.display = 'flex';
    qualityRow.style.alignItems = 'center';
    qualityRow.style.gap = '10px';
    qualityRow.style.marginBottom = '8px';
    const qualityLabel = qualityRow.createEl('label', { text: 'Export quality:' });
    qualityLabel.style.fontWeight = 'bold';

    const qualityGroup = qualityRow.createDiv({ cls: 'md2card-quality-group' });
    qualityGroup.style.display = 'flex';
    qualityGroup.style.alignItems = 'center';
    qualityGroup.style.gap = '8px';

    const clampQuality = (raw: number): number => {
      if (!Number.isFinite(raw)) {
        return this.settings.exportQuality;
      }
      return Math.min(1, Math.max(0.5, raw));
    };
    const roundQuality = (raw: number): number => Math.round(raw * 100) / 100;
    const formatQuality = (value: number): string =>
      roundQuality(value).toFixed(2).replace(/\.?0+$/, '');

    const qualityRange = qualityGroup.createEl('input', { type: 'range' });
    qualityRange.min = '0.5';
    qualityRange.max = '1';
    qualityRange.step = '0.05';
    qualityRange.style.flex = '1';

    const qualityNumber = qualityGroup.createEl('input', { type: 'number' });
    qualityNumber.min = '0.5';
    qualityNumber.max = '1';
    qualityNumber.step = '0.05';
    qualityNumber.style.width = '70px';
    qualityNumber.style.padding = '5px';
    qualityNumber.style.borderRadius = '4px';
    qualityNumber.style.border = '1px solid #ccc';
    qualityNumber.style.boxSizing = 'border-box';

    const applyQualityValue = (raw: number, { save }: { save: boolean }) => {
      const normalized = roundQuality(clampQuality(raw));
      this.settings.exportQuality = normalized;
      qualityRange.value = normalized.toString();
      qualityNumber.value = formatQuality(normalized);
      if (save) {
        void this.plugin.saveSettings();
      }
    };

    applyQualityValue(this.settings.exportQuality ?? 1, { save: false });

    qualityRange.addEventListener('input', (event) => {
      const value = Number((event.target as HTMLInputElement).value);
      if (Number.isNaN(value)) {
        return;
      }
      applyQualityValue(value, { save: true });
    });

    qualityNumber.addEventListener('change', (event) => {
      const value = Number((event.target as HTMLInputElement).value);
      if (Number.isNaN(value)) {
        qualityNumber.value = formatQuality(this.settings.exportQuality);
        return;
      }
      applyQualityValue(value, { save: true });
    });

    // Advanced: Theme editor actions
    const themeEditRow = advPanel.createDiv({ cls: 'md2card-theme-edit-row' });
    themeEditRow.style.display = 'flex';
    themeEditRow.style.alignItems = 'center';
    themeEditRow.style.gap = '10px';
    const themeEditLabel = themeEditRow.createEl('label', { text: 'Theme 编辑:' });
    themeEditLabel.style.fontWeight = 'bold';
    const themeEditBtn = themeEditRow.createEl('button', { text: '编辑' });
    themeEditBtn.style.padding = '6px 12px';
    themeEditBtn.style.borderRadius = '6px';
    themeEditBtn.style.border = 'none';
    themeEditBtn.style.background = 'transparent';
    themeEditBtn.style.cursor = 'pointer';
    themeEditBtn.addEventListener('click', () => {
      const isCustom = this.currentTheme.startsWith('custom:');
      const themeName = isCustom ? this.currentTheme.substring(7) : null;
      const idx = themeName ? this.settings.customThemes.findIndex(t => t.name === themeName) : -1;
      const themeObj = idx >= 0 ? this.settings.customThemes[idx] : null;
      const modal = new CustomThemeEditorModal(this.app, this.plugin, themeObj, idx, async () => {
        rebuildThemeOptions();
        await this.renderCard(this.cardElement);
      });
      modal.open();
    });

    // Create preview host (overlay anchor) and scrollable preview container inside
    this.previewHost = contentEl.createDiv({ cls: 'md2card-preview-host' });
    this.previewHost.style.position = 'relative';
    this.previewHost.style.marginBottom = '20px';
    this.previewContainer = this.previewHost.createDiv({ cls: 'md2card-preview-container' });
    this.previewContainer.style.padding = '20px';
    this.previewContainer.style.borderRadius = '8px';
    this.previewContainer.style.overflowX = 'auto';
    this.previewContainer.style.overflowY = 'auto';
    this.previewContainer.style.width = '100%';
    this.previewContainer.style.boxSizing = 'border-box';
    this.syncPreviewTheme();

    if (!this.themeChangeRef) {
      this.themeChangeRef = this.app.workspace.on('css-change', () => {
        this.syncPreviewTheme();
      });
    }

    this.previewScrollContainer = this.previewContainer.createDiv({ cls: 'md2card-preview-scroll-container' });
    this.previewScrollContainer.style.display = 'flex';
    this.previewScrollContainer.style.justifyContent = 'center';
    this.previewScrollContainer.style.alignItems = 'flex-start';
    this.previewScrollContainer.style.minWidth = '100%';
    this.previewScrollContainer.style.flex = '0 0 auto';

    // Create card element
    this.cardElement = this.previewScrollContainer.createDiv({ cls: 'md2card-card' });
    this.updatePreviewContainerMaxHeight();
    await this.renderCard(this.cardElement);
    this.syncPreviewTheme();

    // Initialize zoom state and handlers
    this.zoomScale = 1;
    this.applyZoom();
    this.wheelHandler = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      e.stopPropagation();
      const factor = Math.exp(-(e.deltaY || 0) / 500);
      const next = Math.min(3, Math.max(0.5, this.zoomScale * factor));
      if (Math.abs(next - this.zoomScale) > 0.0001) {
        this.zoomScale = next;
        this.applyZoom();
      }
    };
    this.previewContainer.addEventListener('wheel', this.wheelHandler, { passive: false });

    // Floating reset-zoom button in bottom-right of preview area
    const resetBtn = this.previewHost.createEl('button', { cls: 'md2card-reset-zoom' });
    this.resetZoomButton = resetBtn;
    resetBtn.setAttr('type', 'button');
    resetBtn.setAttr('aria-label', 'Reset zoom');
    resetBtn.title = 'Reset zoom (100%)';
    resetBtn.style.position = 'absolute';
    resetBtn.style.right = '12px';
    resetBtn.style.bottom = '12px';
    resetBtn.style.width = '36px';
    resetBtn.style.height = '36px';
    resetBtn.style.borderRadius = '9999px';
    resetBtn.style.border = 'none';
    resetBtn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
    resetBtn.style.display = 'none';
    resetBtn.style.alignItems = 'center';
    resetBtn.style.justifyContent = 'center';
    resetBtn.style.padding = '0';
    resetBtn.style.cursor = 'pointer';
    resetBtn.style.background = this.isDarkTheme() ? '#1f2937' : '#ffffff';
    resetBtn.style.color = this.isDarkTheme() ? '#e5e7eb' : '#111827';
    // Use inline SVG from reset.svg
    resetBtn.innerHTML = '<svg viewBox="0 0 1024 1024" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M512 85.333333c235.648 0 426.666667 191.018667 426.666667 426.666667s-191.018667 426.666667-426.666667 426.666667S85.333333 747.648 85.333333 512l0.106667-3.2A42.666667 42.666667 0 0 1 170.666667 512c0 188.522667 152.810667 341.333333 341.333333 341.333333s341.333333-152.810667 341.333333-341.333333S700.522667 170.666667 512 170.666667a340.053333 340.053333 0 0 0-225.792 85.333333H341.333333a42.666667 42.666667 0 0 1 3.2 85.226667L341.333333 341.333333H192a43.008 43.008 0 0 1-7.850667-0.725333l-1.813333-0.362667a42.410667 42.410667 0 0 1-2.666667-0.725333l-0.576-0.170667a42.282667 42.282667 0 0 1-2.730666-0.981333l-0.917334-0.362667a42.432 42.432 0 0 1-2.112-0.96l-0.512-0.256a42.645333 42.645333 0 0 1-12.373333-9.386666l-1.344-1.557334a42.666667 42.666667 0 0 1-9.664-24L149.333333 298.666667V149.333333a42.666667 42.666667 0 0 1 85.226667-3.2L234.666667 149.333333v38.4A424.981333 424.981333 0 0 1 512 85.333333z" fill="#515151"></path></svg>';
    resetBtn.addEventListener('click', () => {
      this.zoomScale = 1;
      this.applyZoom();
    });

    this.resizeHandler = () => {
      this.updatePreviewContainerMaxHeight();
      this.updateCardWidth();
    };
    window.addEventListener('resize', this.resizeHandler);

    // Add export button
    const buttonContainer = contentEl.createDiv({ cls: 'md2card-button-container' });
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'flex-end';
    buttonContainer.style.gap = '10px';

    const copyButton = buttonContainer.createEl('button', { text: 'Copy to Clipboard' });
    copyButton.style.padding = '8px 16px';
    copyButton.style.backgroundColor = '#059669';
    copyButton.style.color = 'white';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '4px';
    copyButton.style.cursor = 'pointer';
    copyButton.addEventListener('click', async () => {
      await this.copyToClipboard(this.cardElement);
    });

    const exportButton = buttonContainer.createEl('button', { text: 'Export as Image' });
    exportButton.style.padding = '8px 16px';
    exportButton.style.backgroundColor = '#5b21b6';
    exportButton.style.color = 'white';
    exportButton.style.border = 'none';
    exportButton.style.borderRadius = '4px';
    exportButton.style.cursor = 'pointer';
    exportButton.addEventListener('click', async () => {
      await this.exportCard(this.cardElement);
    });

    const closeButton = buttonContainer.createEl('button', { text: 'Close' });
    closeButton.style.padding = '8px 16px';
    closeButton.style.backgroundColor = '#6b7280';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '4px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', () => {
      this.close();
    });
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = undefined;
    }
    if (this.themeChangeRef) {
      this.app.workspace.offref(this.themeChangeRef);
      this.themeChangeRef = undefined;
    }
    if (this.wheelHandler && this.previewContainer) {
      this.previewContainer.removeEventListener('wheel', this.wheelHandler as EventListener);
      this.wheelHandler = undefined;
    }
    if (this.markdownComponent) {
      this.plugin.removeChild(this.markdownComponent);
      this.markdownComponent = undefined;
    }
  }

  private isDarkTheme(): boolean {
    const body = document.body;
    if (!body) {
      return false;
    }
    return body.classList.contains('theme-dark');
  }

  private syncPreviewTheme(): void {
    const isDark = this.isDarkTheme();
    this.modalEl.classList.toggle('theme-dark', isDark);
    this.modalEl.classList.toggle('theme-light', !isDark);
    if (this.previewContainer) {
      this.previewContainer.classList.toggle('md2card-preview-dark', isDark);
      this.previewContainer.style.backgroundColor = isDark ? '#111827' : '#f5f5f5';
      this.previewContainer.style.color = isDark ? '#e5e7eb' : '#111827';
    }
    if (this.resetZoomButton) {
      this.resetZoomButton.style.background = isDark ? '#1f2937' : '#ffffff';
      this.resetZoomButton.style.color = isDark ? '#e5e7eb' : '#111827';
    }
  }

  async renderCard(container: HTMLElement) {
    container.empty();

    const { cardEl, contentInner } = this.buildCardStructure(container, this.currentTheme);
    this.updateCardWidthForElement(container);
    container.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

    if (this.markdownComponent) {
      this.plugin.removeChild(this.markdownComponent);
      this.markdownComponent = undefined;
    }
    this.markdownComponent = new Component();
    this.plugin.addChild(this.markdownComponent);

    await MarkdownRenderer.renderMarkdown(this.markdown, contentInner, '', this.markdownComponent);
    this.decorateRenderedMarkdown(contentInner);

    await this.renderMermaidDiagrams(cardEl);

    // Apply base styles
    this.applyBaseStyles(container);
    // Re-apply zoom to match current scale after re-render
    this.applyZoom();
    this.schedulePreviewRecentering();
  }

  applyBaseStyles(container: HTMLElement) {
    // Remove existing base style elements
    const existingStyles = container.querySelectorAll('style[data-md2card-base="true"]');
    existingStyles.forEach(style => style.remove());

    const doc = container.ownerDocument ?? document;
    const style = doc.createElement('style');
    style.setAttribute('data-md2card-base', 'true');
    
    // Check if current theme is a custom theme
    let customCSS = '';
    if (this.currentTheme.startsWith('custom:')) {
      const themeName = this.currentTheme.substring(7); // Remove 'custom:' prefix
      const customTheme = this.settings.customThemes.find(t => t.name === themeName);
      if (customTheme) {
        customCSS = customTheme.css;
      }
    }
    let builtInThemeCSS = '';
    if (!this.currentTheme.startsWith('custom:')) {
      const themeStyles = this.getThemeStyles(this.currentTheme);
      if (themeStyles.css) {
        builtInThemeCSS = themeStyles.css;
      }
    }
    
    style.textContent = `
      .card {
        position: relative;
        box-sizing: border-box;
      }
      .card-header {
        box-sizing: border-box;
      }
      .card-content {
        box-sizing: border-box;
      }
      .card-content-inner {
        box-sizing: border-box;
      }
      .card-footer {
        box-sizing: border-box;
      }
      button.copy-code-button {
        display: none !important;
      }
      .card-content-inner h1, .card-content-inner h2, .card-content-inner h3,
      .card-content-inner h4, .card-content-inner h5, .card-content-inner h6 {
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        font-weight: 600;
        line-height: 1.3;
      }
      .card-content-inner h1 { font-size: 2em; }
      .card-content-inner h2 { font-size: 1.5em; }
      .card-content-inner h3 { font-size: 1.25em; }
      .card-content-inner h4 { font-size: 1.1em; }
      .card-content-inner h5 { font-size: 1em; }
      .card-content-inner h6 { font-size: 0.9em; }
      .card-content-inner p { margin: 0.5em 0; line-height: 1.6; }
      .md-ul, .md-ol { margin: 0.5em 0; padding-left: 2em; }
      .md-listitem { margin: 0.3em 0; line-height: 1.5; }
      .md-table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 0.9em; }
      .md-th, .md-td { border: 1px solid rgba(0, 0, 0, 0.2); padding: 0.5em; text-align: left; }
      .md-th { background: rgba(0, 0, 0, 0.05); font-weight: 600; }
      .md-image { max-width: 100%; height: auto; border-radius: 4px; margin: 0.5em 0; }
      .md-mermaid {
        margin: 1em 0;
      }
      .md-mermaid-error {
        background: rgba(255, 0, 0, 0.1);
        color: #b91c1c;
        padding: 0.75em;
        border-radius: 6px;
        overflow-x: auto;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
      }
      .katex-display {
        margin: 1em 0;
      }
      .katex {
        font-size: 1em;
      }
      ${builtInThemeCSS}
      ${customCSS}
    `;
    container.appendChild(style);
  }

  private buildCardStructure(container: HTMLElement, themeName: string): { cardEl: HTMLElement; contentInner: HTMLElement } {
    const cardEl = container.createDiv({ cls: 'card' });
    this.innerCardElement = cardEl;

    let contentStyles = '';
    if (themeName.startsWith('custom:')) {
      // Custom themes rely on user-supplied CSS, so no inline styling here
    } else {
      const themeStyles = this.getThemeStyles(themeName);
      if (themeStyles.container) {
        cardEl.setAttr('style', themeStyles.container);
      }

      if (themeStyles.afterElement) {
        cardEl.insertAdjacentHTML('afterbegin', themeStyles.afterElement);
      }
      if (themeStyles.beforeElement) {
        cardEl.insertAdjacentHTML('afterbegin', themeStyles.beforeElement);
      }

      if (themeStyles.content) {
        contentStyles = themeStyles.content;
      }
    }

    const headerEl = cardEl.createDiv({ cls: 'card-header' });
    const contentEl = cardEl.createDiv({ cls: 'card-content' });
    if (contentStyles) {
      contentEl.setAttr('style', contentStyles);
    }
    const contentInner = contentEl.createDiv({ cls: 'card-content-inner' });
    const footerEl = cardEl.createDiv({ cls: 'card-footer' });

    // Ensure inner .card fills wrapper width and respects wrapper min-height
    cardEl.style.width = '100%';
    cardEl.style.minHeight = 'inherit';
    headerEl.style.minHeight = 'auto';
    footerEl.style.minHeight = 'auto';

    return { cardEl, contentInner };
  }

  private decorateRenderedMarkdown(root: HTMLElement) {
    const headings = Array.from(root.querySelectorAll<HTMLElement>('h1, h2, h3, h4, h5, h6'));
    for (const heading of headings) {
      const level = heading.tagName.substring(1);
      heading.classList.add(`md-h${level}`);
      heading.dataset.text = heading.textContent?.trim() ?? '';
    }

    const classMap: Array<[string, string]> = [
      ['blockquote', 'md-blockquote'],
      ['ul', 'md-ul'],
      ['ol', 'md-ol'],
      ['li', 'md-listitem'],
      ['table', 'md-table'],
      ['thead', 'md-thead'],
      ['tbody', 'md-tbody'],
      ['tr', 'md-tr'],
      ['th', 'md-th'],
      ['td', 'md-td'],
      ['strong', 'md-strong'],
      ['em', 'md-em'],
      ['del', 'md-del'],
      ['a', 'md-link'],
      ['img', 'md-image'],
      ['hr', 'md-hr']
    ];

    for (const [selector, className] of classMap) {
      root.querySelectorAll(selector).forEach(element => element.classList.add(className));
    }

    root.querySelectorAll('button.copy-code-button').forEach(button => {
      button.remove();
    });

    root.querySelectorAll('pre').forEach(pre => pre.classList.add('md-pre'));
    root.querySelectorAll('pre code').forEach(code => code.classList.add('md-code'));

    root.querySelectorAll('code').forEach(code => {
      if (code.parentElement?.tagName !== 'PRE') {
        code.classList.add('md-codespan');
      }
    });

    this.prepareMermaidBlocks(root);
  }

  private prepareMermaidBlocks(root: HTMLElement) {
    const mermaidCodes = Array.from(root.querySelectorAll<HTMLPreElement>('pre'))
      .map(pre => ({ pre, code: pre.querySelector('code.language-mermaid') }))
      .filter((entry): entry is { pre: HTMLPreElement; code: HTMLElement } => !!entry.code);

    for (const { pre, code } of mermaidCodes) {
      const doc = pre.ownerDocument ?? document;
      const container = doc.createElement('div');
      container.className = 'md-mermaid';
      container.dataset.code = encodeURIComponent(code.textContent ?? '');
      pre.replaceWith(container);
    }
  }

  async renderMermaidDiagrams(container: HTMLElement) {
    const mermaidBlocks = Array.from(container.querySelectorAll<HTMLElement>('.md-mermaid'));
    if (mermaidBlocks.length === 0) {
      return;
    }

    const mermaidApi = this.getMermaid();
    if (!mermaidApi) {
      for (const block of mermaidBlocks) {
        this.replaceMermaidWithFallback(block);
      }
      return;
    }

    this.initializeMermaid(mermaidApi);

    let index = 0;
    for (const block of mermaidBlocks) {
      const code = block.dataset.code ? decodeURIComponent(block.dataset.code) : '';
      if (!code) {
        continue;
      }

      try {
        const id = `md2card-mermaid-${Date.now()}-${index++}`;
        const { svg } = await mermaidApi.render(id, code);
        block.innerHTML = svg;
        block.removeAttribute('data-code');
        block.classList.add('md-mermaid-rendered');
      } catch (error) {
        console.error('Failed to render Mermaid diagram:', error);
        this.replaceMermaidWithFallback(block, code);
      }
    }
  }

  initializeMermaid(existingApi?: MermaidAPI | null) {
    if (this.mermaidInitialized) {
      return;
    }

    const mermaidApi = existingApi ?? this.getMermaid();
    if (!mermaidApi) {
      return;
    }

    mermaidApi.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose'
    });
    this.mermaidInitialized = true;
  }

  private getMermaid(): MermaidAPI | null {
    if (this.mermaidApi) {
      return this.mermaidApi;
    }

    const globalMermaid = (window as Window & { mermaid?: MermaidAPI }).mermaid;
    if (!globalMermaid) {
      console.warn('Mermaid library is not available in this environment.');
      return null;
    }

    this.mermaidApi = globalMermaid;
    return this.mermaidApi;
  }

  private replaceMermaidWithFallback(block: HTMLElement, code?: string) {
    const fallback = (block.ownerDocument ?? document).createElement('pre');
    fallback.className = 'md-mermaid-error';
    fallback.textContent = code ?? (block.dataset.code ? decodeURIComponent(block.dataset.code) : '');
    block.replaceWith(fallback);
  }

  getThemeStyles(themeName: string): { container?: string; content?: string; beforeElement?: string; afterElement?: string; css?: string } {
    const themes: Record<string, { container?: string; content?: string; beforeElement?: string; afterElement?: string; css?: string }> = {
      '默认': {
        css: defaultCardThemeCss
      },
      'GitHub': {
        css: defaultGithubStyleCss
      },
      '玻璃': {
        container: `
          position: relative;
          border-radius: 16px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        `,
        content: `
          border-radius: 12px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.05);
          min-height: 100%;
        `
      },
      '温暖': {
        container: `
          position: relative;
          border-radius: 12px;
          padding: 20px;
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
          box-shadow: 0 8px 24px rgba(252, 182, 159, 0.3);
        `,
        content: `
          border-radius: 8px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(10px);
          min-height: 100%;
        `
      },
      'PI': {
        css: defaultPieStyleCss
      },
      'LaTeX': {
        css: defaultLatexStyleCss
      },
      '复古报纸': {
        css: defaultVintageNewspaperStyleCss
      }
    };

    return themes[themeName] || themes['默认'];
  }

  async copyToClipboard(cardElement: HTMLElement) {
    try {
      const doc = cardElement.ownerDocument ?? document;
      await waitForDocumentFonts(doc);

      const { blob } = await this.withFullWidth(cardElement, (node) => this.renderHighQualityImage(node));

      // Use the Clipboard API to copy the image
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);
      
      new Notice('Card copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      new Notice('Failed to copy to clipboard');
    }
  }

  async exportCard(cardElement: HTMLElement) {
    try {
      const doc = cardElement.ownerDocument ?? document;
      await waitForDocumentFonts(doc);

      const { dataUrl } = await this.withFullWidth(cardElement, (node) => this.renderHighQualityImage(node));

      // Create download link
      const link = (doc ?? document).createElement('a');
      link.download = 'md2card-' + Date.now() + '.png';
      link.href = dataUrl;
      link.click();
      
      new Notice('Card exported successfully!');
    } catch (error) {
      console.error('Error exporting card:', error);
      new Notice('Failed to export card');
    }
  }

  private updateCardWidth() {
    if (!this.cardElement) {
      return;
    }
    this.updateCardWidthForElement(this.cardElement);
    this.applyZoom();
    this.schedulePreviewRecentering();
  }

  private updatePreviewContainerMaxHeight() {
    if (!this.previewContainer) {
      return;
    }
    const doc = this.previewContainer.ownerDocument ?? document;
    const view = doc.defaultView ?? (typeof window !== 'undefined' ? window : undefined);
    const viewportHeight = view?.innerHeight ?? doc.documentElement?.clientHeight ?? 800;
    const maxHeight = Math.max(240, Math.floor(viewportHeight * 0.6));
    this.previewContainer.style.maxHeight = `${maxHeight}px`;
  }

  private updateCardWidthForElement(element: HTMLElement) {
    const previewWidth = this.computePreviewCardWidth();
    element.style.width = `${previewWidth}px`;
    element.style.maxWidth = 'none';
    element.style.marginLeft = '0';
    element.style.marginRight = '0';
    // Do not constrain height; let content define it
    element.style.removeProperty('height');
    element.style.flex = '0 0 auto';
    element.style.flexShrink = '0';
    if (this.innerCardElement) {
      this.innerCardElement.style.removeProperty('height');
      this.innerCardElement.style.removeProperty('min-height');
    }
    // Respect current zoom when computing scroll container width
    this.updateScrollContainerWidth(Math.round(previewWidth * this.zoomScale));
  }

  private computePreviewCardWidth(): number {
    return Math.max(200, Math.min(1600, Math.round(this.settings.cardWidth)));
  }

  private updateScrollContainerWidth(cardWidth: number) {
    if (!this.previewContainer || !this.previewScrollContainer) {
      return;
    }

    const doc = this.previewContainer.ownerDocument ?? document;
    const view = doc.defaultView ?? (typeof window !== 'undefined' ? window : undefined);
    const computedStyle = view?.getComputedStyle(this.previewContainer);
    const paddingLeft = parseFloat(computedStyle?.paddingLeft ?? '0') || 0;
    const paddingRight = parseFloat(computedStyle?.paddingRight ?? '0') || 0;
    const innerWidth = Math.max(0, this.previewContainer.clientWidth - paddingLeft - paddingRight);
    const needsHorizontalScroll = cardWidth > innerWidth + 0.5;

    if (needsHorizontalScroll) {
      this.previewScrollContainer.style.width = `${cardWidth}px`;
      this.previewContainer.style.overflowX = 'auto';
    } else {
      this.previewScrollContainer.style.width = '100%';
      this.previewContainer.style.overflowX = 'hidden';
      this.previewContainer.scrollLeft = 0;
    }
  }

  private schedulePreviewRecentering() {
    if (!this.previewContainer || !this.cardElement) {
      return;
    }

    const schedule: (callback: FrameRequestCallback) => number =
      typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function'
        ? window.requestAnimationFrame.bind(window)
        : (callback: FrameRequestCallback) => setTimeout(callback, 0);

    schedule(() => {
      if (!this.previewContainer || !this.cardElement) {
        return;
      }

      const containerWidth = this.previewContainer.clientWidth;
      const baseCardWidth = this.cardElement.offsetWidth;
      const cardWidth = Math.round(baseCardWidth * this.zoomScale);

      if (cardWidth <= containerWidth) {
        this.previewContainer.scrollLeft = 0;
        return;
      }

      const doc = this.previewContainer.ownerDocument ?? document;
      const view = doc.defaultView ?? (typeof window !== 'undefined' ? window : undefined);
      if (!view) {
        return;
      }

      const computedStyle = view.getComputedStyle(this.previewContainer);
      const paddingLeft = parseFloat(computedStyle.paddingLeft ?? '0') || 0;
      const paddingRight = parseFloat(computedStyle.paddingRight ?? '0') || 0;
      const availableWidth = containerWidth - paddingLeft - paddingRight;
      const targetScroll = Math.max(0, (cardWidth - availableWidth) / 2);

      this.previewContainer.scrollLeft = targetScroll;
    });
  }

  private async withFullWidth<T>(cardElement: HTMLElement, callback: (node: HTMLElement) => Promise<T>): Promise<T> {
    const doc = cardElement.ownerDocument ?? document;
    // Clone the live node to avoid flicker in the UI
    const clone = cardElement.cloneNode(true) as HTMLElement;
    // Force full configured width and disable any zoom transform on the inner card
    clone.style.width = `${this.settings.cardWidth}px`;
    clone.style.maxWidth = 'none';
    clone.style.transform = 'none';
    // Try to remove transform from inner .card if present
    const inner = clone.querySelector('.card') as HTMLElement | null;
    if (inner) {
      inner.style.transform = 'none';
      inner.style.transformOrigin = '';
    }

    // Render offscreen to keep it invisible but measurable
    const hiddenHost = doc.createElement('div');
    hiddenHost.style.position = 'fixed';
    hiddenHost.style.left = '-10000px';
    hiddenHost.style.top = '-10000px';
    hiddenHost.style.width = `${this.settings.cardWidth}px`;
    hiddenHost.style.zIndex = '-1';
    hiddenHost.appendChild(clone);
    doc.body.appendChild(hiddenHost);

    try {
      return await callback(clone);
    } finally {
      hiddenHost.remove();
    }
  }

  private async renderHighQualityImage(cardElement: HTMLElement): Promise<{ blob: Blob; dataUrl: string }> {
    const { width, height } = this.measureCardDimensions(cardElement);
    const requestedPixelRatio = this.resolveExportPixelRatio(width, height);
    const { pixelRatio, downgraded } = this.ensureSafePixelRatio(width, height, requestedPixelRatio);

    if (downgraded) {
      console.warn(
        `Requested pixel ratio ${requestedPixelRatio} downgraded to ${pixelRatio} due to canvas limitations for ${width}x${height} card.`
      );
      if (pixelRatio !== requestedPixelRatio) {
        new Notice(
          `Export scaled to ${pixelRatio}x (requested ${requestedPixelRatio}x exceeds browser limits for this card size).`,
          4000
        );
      }
    }

    const quality = this.resolveExportQuality();
    const dataUrl = await htmlToImage.toPng(cardElement, {
      quality,
      pixelRatio
    });

    const blob = await this.dataUrlToBlob(dataUrl);

    return { blob, dataUrl };
  }

  private measureCardDimensions(cardElement: HTMLElement): { width: number; height: number } {
    const rect = cardElement.getBoundingClientRect();
    const measuredWidth =
      rect.width ||
      cardElement.offsetWidth ||
      cardElement.scrollWidth ||
      this.settings.cardWidth ||
      1;
    const measuredHeight =
      rect.height ||
      cardElement.offsetHeight ||
      cardElement.scrollHeight ||
      cardElement.clientHeight ||
      measuredWidth;

    return {
      width: Math.max(1, Math.round(measuredWidth)),
      height: Math.max(1, Math.round(measuredHeight))
    };
  }

  private resolveExportPixelRatio(width: number, height: number): number {
    const candidate = Number(this.settings.exportPixelRatio);
    if (Number.isFinite(candidate) && (ALLOWED_PIXEL_RATIOS as ReadonlyArray<number>).includes(candidate)) {
      return candidate;
    }
    return this.computeSupersamplePixelRatio(width, height);
  }

  private resolveExportQuality(): number {
    const raw = Number(this.settings.exportQuality);
    if (!Number.isFinite(raw)) {
      return 1;
    }
    return Math.min(1, Math.max(0.5, raw));
  }

  private ensureSafePixelRatio(width: number, height: number, desired: number): { pixelRatio: number; downgraded: boolean } {
    const fits = (candidate: number): boolean => {
      const scaledWidth = width * candidate;
      const scaledHeight = height * candidate;
      return (
        scaledWidth <= MAX_CANVAS_DIMENSION &&
        scaledHeight <= MAX_CANVAS_DIMENSION &&
        scaledWidth * scaledHeight <= MAX_CANVAS_PIXELS
      );
    };

    if (fits(desired)) {
      return { pixelRatio: desired, downgraded: false };
    }

    const allowedDescending = [...ALLOWED_PIXEL_RATIOS]
      .filter((value) => value < desired)
      .sort((a, b) => b - a);

    for (const candidate of allowedDescending) {
      if (fits(candidate)) {
        return { pixelRatio: candidate, downgraded: true };
      }
    }

    const maxDimension = Math.max(width, height);
    const fallback = Math.max(1, Math.min(desired, Math.floor(MAX_CANVAS_DIMENSION / Math.max(1, maxDimension))));
    if (fits(fallback)) {
      return { pixelRatio: fallback, downgraded: fallback !== desired };
    }

    return { pixelRatio: 1, downgraded: desired !== 1 };
  }

  private computeSupersamplePixelRatio(width: number, height: number): number {
    const maxDimension = Math.max(width, height);
    // Scale extra for very large cards to keep text crisp after downscaling.
    return maxDimension >= 1600 ? 4 : 2;
  }

  private async dataUrlToBlob(dataUrl: string): Promise<Blob> {
    try {
      if (typeof fetch === 'function') {
        const response = await fetch(dataUrl);
        return await response.blob();
      }
    } catch (error) {
      console.warn('Fetch-based data URL to Blob conversion failed, falling back to manual decode', error);
    }

    const parts = dataUrl.split(',');
    if (parts.length < 2) {
      throw new Error('Invalid data URL');
    }
    const mimeMatch = parts[0].match(/data:(.*?);base64/);
    const mimeType = mimeMatch?.[1] ?? 'image/png';
    const byteString = atob(parts[1]);
    const length = byteString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = byteString.charCodeAt(i);
    }
    return new Blob([bytes], { type: mimeType });
  }

  private applyZoom() {
    if (!this.cardElement) return;
    // Apply visual scale to inner card only
    if (this.innerCardElement) {
      this.innerCardElement.style.transformOrigin = 'top center';
      this.innerCardElement.style.transform = this.zoomScale === 1 ? 'none' : `scale(${this.zoomScale})`;
    }
    // Adjust wrapper height to match scaled content to avoid blank area
    const baseHeight = this.innerCardElement?.offsetHeight ?? this.cardElement.offsetHeight;
    const scaledHeight = Math.round(baseHeight * (this.zoomScale || 1));
    this.cardElement.style.height = `${scaledHeight}px`;
    // Update scroll widths and centering based on scaled width
    const baseWidth = this.computePreviewCardWidth();
    this.updateScrollContainerWidth(Math.round(baseWidth * this.zoomScale));
    this.schedulePreviewRecentering();
    if (this.resetZoomButton) {
      const pct = Math.round(this.zoomScale * 100);
      this.resetZoomButton.style.display = this.zoomScale === 1 ? 'none' : 'inline-flex';
      this.resetZoomButton.title = `Reset zoom (${pct}%)`;
    }
  }
}

class MD2CardSettingTab extends PluginSettingTab {
  plugin: MD2CardPlugin;

  constructor(app: App, plugin: MD2CardPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    containerEl.createEl('h2', { text: 'MD2Card Settings' });

    // Theme selection
    const availableCustomThemes = this.plugin.settings.customThemes.map(theme => `custom:${theme.name}`);
    const knownThemes = new Set<string>([...BUILT_IN_THEMES, ...availableCustomThemes]);
    if (!knownThemes.has(this.plugin.settings.selectedTheme)) {
      this.plugin.settings.selectedTheme = '默认';
      void this.plugin.saveSettings();
    }

    new Setting(containerEl)
      .setName('Card Theme')
      .setDesc('Select the theme for your cards')
      .addDropdown(dropdown => {
        BUILT_IN_THEMES.forEach(theme => {
          dropdown.addOption(theme, BUILT_IN_THEME_LABELS[theme]);
        });

        this.plugin.settings.customThemes.forEach(theme => {
          dropdown.addOption(`custom:${theme.name}`, `${theme.name} (Custom)`);
        });

        dropdown.setValue(this.plugin.settings.selectedTheme);
        dropdown.onChange(async (value) => {
          this.plugin.settings.selectedTheme = value;
          await this.plugin.saveSettings();
        });
      });

    // Card width
    new Setting(containerEl)
      .setName('Card Width')
      .setDesc('Set the width of the card in pixels')
      .addText(text => text
        .setPlaceholder('440')
        .setValue(String(this.plugin.settings.cardWidth))
        .onChange(async (value) => {
          const width = parseInt(value);
          if (!isNaN(width) && width > 0) {
            this.plugin.settings.cardWidth = width;
            await this.plugin.saveSettings();
          }
        }));

    // Custom Themes Section
    containerEl.createEl('h3', { text: 'Custom Themes' });
    
    const customThemesDesc = containerEl.createDiv();
    customThemesDesc.style.marginBottom = '15px';
    customThemesDesc.style.color = '#666';
    customThemesDesc.createEl('p', { text: 'Create custom themes using CSS. Each theme can define complete card styling.' });

    // Display existing custom themes
    this.plugin.settings.customThemes.forEach((theme, index) => {
      new Setting(containerEl)
        .setName(theme.name)
        .setDesc('Custom theme')
        .addButton(button => button
          .setButtonText('Edit')
          .onClick(() => {
            this.openThemeEditor(theme, index);
          }))
        .addButton(button => button
          .setButtonText('Delete')
          .setWarning()
          .onClick(async () => {
            const removed = this.plugin.settings.customThemes.splice(index, 1)[0];
            if (removed && this.plugin.settings.selectedTheme === `custom:${removed.name}`) {
              this.plugin.settings.selectedTheme = '默认';
            }
            await this.plugin.saveSettings();
            this.display(); // Refresh settings display
          }));
    });

    // Add new theme button
    new Setting(containerEl)
      .setName('Add New Custom Theme')
      .setDesc('Create a new theme using custom CSS')
      .addButton(button => button
        .setButtonText('Create Theme')
        .setCta()
        .onClick(() => {
          this.openThemeEditor(null, -1);
        }));
  }

  openThemeEditor(theme: CustomTheme | null, index: number) {
    const modal = new CustomThemeEditorModal(this.app, this.plugin, theme, index, () => {
      this.display(); // Refresh settings after saving
    });
    modal.open();
  }
}

class CustomThemeEditorModal extends Modal {
  plugin: MD2CardPlugin;
  theme: CustomTheme | null;
  themeIndex: number;
  onSave: () => void;
  nameInput: HTMLInputElement;
  cssTextArea: HTMLTextAreaElement;

  constructor(app: App, plugin: MD2CardPlugin, theme: CustomTheme | null, index: number, onSave: () => void) {
    super(app);
    this.plugin = plugin;
    this.theme = theme;
    this.themeIndex = index;
    this.onSave = onSave;
  }

  onOpen() {
    const { contentEl } = this;
    contentEl.empty();

    contentEl.createEl('h2', { text: this.theme ? 'Edit Custom Theme' : 'Create Custom Theme' });

    // Theme name input
    const nameContainer = contentEl.createDiv();
    nameContainer.style.marginBottom = '15px';
    nameContainer.createEl('label', { text: 'Theme Name' });
    this.nameInput = nameContainer.createEl('input', { type: 'text' });
    this.nameInput.style.width = '100%';
    this.nameInput.style.padding = '8px';
    this.nameInput.style.marginTop = '5px';
    this.nameInput.style.borderRadius = '4px';
    this.nameInput.style.border = '1px solid #ccc';
    this.nameInput.placeholder = 'e.g., My Awesome Theme';
    if (this.theme) {
      this.nameInput.value = this.theme.name;
    }

    // CSS textarea
    const cssContainer = contentEl.createDiv();
    cssContainer.style.marginBottom = '15px';
    cssContainer.createEl('label', { text: 'Custom CSS' });
    this.cssTextArea = cssContainer.createEl('textarea');
    this.cssTextArea.style.width = '100%';
    this.cssTextArea.style.minHeight = '300px';
    this.cssTextArea.style.padding = '10px';
    this.cssTextArea.style.marginTop = '5px';
    this.cssTextArea.style.borderRadius = '4px';
    this.cssTextArea.style.border = '1px solid #ccc';
    this.cssTextArea.style.fontFamily = 'monospace';
    this.cssTextArea.style.fontSize = '12px';
    this.cssTextArea.placeholder = `.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
}

.card-header::before {
  content: "My Theme";
  display: block;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.card-content-inner {
  padding: 20px;
  color: white;
}

.card-footer::after {
  content: "Footer Text";
  display: block;
  text-align: center;
  padding: 10px;
}`;
    
    if (this.theme) {
      this.cssTextArea.value = this.theme.css;
    }

    // Button container
    const buttonContainer = contentEl.createDiv();
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'flex-end';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.marginTop = '15px';

    // Save button
    const saveButton = buttonContainer.createEl('button', { text: 'Save' });
    saveButton.style.padding = '8px 16px';
    saveButton.style.backgroundColor = '#5b21b6';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';
    saveButton.addEventListener('click', async () => {
      await this.saveTheme();
    });

    // Cancel button
    const cancelButton = buttonContainer.createEl('button', { text: 'Cancel' });
    cancelButton.style.padding = '8px 16px';
    cancelButton.style.backgroundColor = '#6b7280';
    cancelButton.style.color = 'white';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.cursor = 'pointer';
    cancelButton.addEventListener('click', () => {
      this.close();
    });
  }

  async saveTheme() {
    const name = this.nameInput.value.trim();
    const css = this.cssTextArea.value.trim();

    if (!name) {
      new Notice('Please enter a theme name');
      return;
    }

    if (!css) {
      new Notice('Please enter CSS code');
      return;
    }

    // Check for duplicate names (excluding current theme if editing)
    const existingIndex = this.plugin.settings.customThemes.findIndex((t, i) => 
      t.name === name && i !== this.themeIndex
    );
    
    if (existingIndex !== -1) {
      new Notice('A theme with this name already exists');
      return;
    }

    const newTheme: CustomTheme = { name, css };

    if (this.themeIndex === -1) {
      // Adding new theme
      this.plugin.settings.customThemes.push(newTheme);
    } else {
      // Editing existing theme
      const previousTheme = this.plugin.settings.customThemes[this.themeIndex];
      this.plugin.settings.customThemes[this.themeIndex] = newTheme;
      if (previousTheme && this.plugin.settings.selectedTheme === `custom:${previousTheme.name}`) {
        this.plugin.settings.selectedTheme = `custom:${newTheme.name}`;
      }
    }

    await this.plugin.saveSettings();
    new Notice(`Theme "${name}" saved successfully`);
    this.close();
    this.onSave();
  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
