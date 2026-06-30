// icons.jsx — 細線風格 SVG icons（日系極簡）
const Icon = {
  Home: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1v-9z"/>
    </svg>
  ),
  Cards: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="14" height="14" rx="2"/>
      <path d="M7 2h14v14"/>
    </svg>
  ),
  Quiz: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 3.5"/>
      <circle cx="12" cy="17" r="0.5" fill={c}/>
    </svg>
  ),
  List: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h10"/>
    </svg>
  ),
  Chart: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>
    </svg>
  ),
  Clock: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
    </svg>
  ),
  Speaker: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 9h3l5-4v14l-5-4H5V9z"/>
      <path d="M16 8.5a4 4 0 010 7M18.5 6a7 7 0 010 12"/>
    </svg>
  ),
  Bookmark: ({ s = 20, c = 'currentColor', w = 1.5, filled = false }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-6-4-6 4V3z"/>
    </svg>
  ),
  Star: ({ s = 20, c = 'currentColor', w = 1.5, filled = false }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={filled ? c : 'none'} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 21l1.2-6.5L2.5 9.9 9.1 9 12 3z"/>
    </svg>
  ),
  Flame: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c0 4-5 5-5 10a5 5 0 0010 0c0-2-1-3-2-4 0 2-1 3-2 3 1-3 0-7-1-9z"/>
    </svg>
  ),
  Check: ({ s = 20, c = 'currentColor', w = 2 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12l5 5 11-11"/>
    </svg>
  ),
  X: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  ArrowLeft: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  ),
  ArrowRight: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  ),
  Search: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/>
      <path d="M21 21l-4.3-4.3"/>
    </svg>
  ),
  Filter: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5h18l-7 8v6l-4 2v-8L3 5z"/>
    </svg>
  ),
  More: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <circle cx="5" cy="12" r="1.5"/>
      <circle cx="12" cy="12" r="1.5"/>
      <circle cx="19" cy="12" r="1.5"/>
    </svg>
  ),
  Plus: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  Leaf: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20c0-8 5-14 16-16-1 11-6 16-14 16-1 0-2-0-2 0M5 19l10-10"/>
    </svg>
  ),
  Sun: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>
    </svg>
  ),
  Moon: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>
    </svg>
  ),
  Refresh: ({ s = 20, c = 'currentColor', w = 1.5 }) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 01-15.5 6.3L3 15M3 12a9 9 0 0115.5-6.3L21 9M21 4v5h-5M3 20v-5h5"/>
    </svg>
  ),
};

window.Icon = Icon;
