// theme.jsx — 三個日系風格主題
const THEMES = {
  A: {
    name: '紙感日誌',
    subtitle: '米色紙張 · 細線描繪 · 手寫溫度',
    // 背景
    bg: '#f4efe6',
    bgDeep: '#ece5d6',
    paper: '#faf6ec',
    // 文字
    ink: '#2a2520',
    inkSoft: '#5c524a',
    inkMute: '#9a8e80',
    // 強調
    accent: '#a8533c',      // 朱紅印章
    accent2: '#5a6b4e',     // 竹綠
    accentSoft: '#f2e5d8',
    // 線
    line: 'rgba(42,37,32,0.14)',
    lineStrong: 'rgba(42,37,32,0.28)',
    // 字體
    serif: '"Noto Serif JP", "Noto Serif TC", Georgia, serif',
    sans: '"Noto Sans JP", "Noto Sans TC", -apple-system, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  B: {
    name: '柔霧靜物',
    subtitle: '淡粉米 · 柔和漸層 · 圓潤現代',
    bg: '#f6f0ea',
    bgDeep: '#eee4da',
    paper: '#ffffff',
    ink: '#3a2f2a',
    inkSoft: '#7a6a5f',
    inkMute: '#b5a89b',
    accent: '#c77d5f',      // 暖陶土
    accent2: '#8da08a',     // 抹茶
    accentSoft: '#f8e8dc',
    line: 'rgba(58,47,42,0.10)',
    lineStrong: 'rgba(58,47,42,0.22)',
    serif: '"Noto Serif JP", "Noto Serif TC", Georgia, serif',
    sans: '"Noto Sans JP", "Noto Sans TC", -apple-system, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
  C: {
    name: '墨跡學術',
    subtitle: '深米底 · 墨綠重點 · 文庫本氣質',
    bg: '#e8dfce',
    bgDeep: '#d8cdb6',
    paper: '#f1e8d6',
    ink: '#1f2420',
    inkSoft: '#4a4f47',
    inkMute: '#857d6e',
    accent: '#2e4a3a',      // 墨綠
    accent2: '#8b3a2a',     // 朱墨
    accentSoft: '#dcd1bb',
    line: 'rgba(31,36,32,0.18)',
    lineStrong: 'rgba(31,36,32,0.35)',
    serif: '"Noto Serif JP", "Noto Serif TC", Georgia, serif',
    sans: '"Noto Sans JP", "Noto Sans TC", -apple-system, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
  },
};

// 深色版本（翻轉核心色 + 保留強調）
const DARK_THEMES = {
  A: {
    ...THEMES.A,
    name: '紙感日誌 · 夜',
    bg: '#1a1713',
    bgDeep: '#12100d',
    paper: '#22201a',
    ink: '#f0e8d8',
    inkSoft: '#a89d8b',
    inkMute: '#6b6254',
    accent: '#d17658',
    accent2: '#8da87a',
    accentSoft: '#2e2a20',
    line: 'rgba(240,232,216,0.12)',
    lineStrong: 'rgba(240,232,216,0.24)',
  },
  B: {
    ...THEMES.B,
    name: '柔霧靜物 · 夜',
    bg: '#1f1a17',
    bgDeep: '#15110f',
    paper: '#2a2320',
    ink: '#f2e8de',
    inkSoft: '#b0a197',
    inkMute: '#7a6d63',
    accent: '#e09575',
    accent2: '#a8c0a2',
    accentSoft: '#352921',
    line: 'rgba(242,232,222,0.10)',
    lineStrong: 'rgba(242,232,222,0.22)',
  },
  C: {
    ...THEMES.C,
    name: '墨跡學術 · 夜',
    bg: '#15181a',
    bgDeep: '#0d0f10',
    paper: '#1d2022',
    ink: '#e8e0d0',
    inkSoft: '#a09684',
    inkMute: '#65604f',
    accent: '#7aa88a',
    accent2: '#d87c6a',
    accentSoft: '#1f2a23',
    line: 'rgba(232,224,208,0.12)',
    lineStrong: 'rgba(232,224,208,0.26)',
  },
};

window.THEMES = THEMES;
window.DARK_THEMES = DARK_THEMES;
