// shared.jsx — 共用裝飾元件
const { useState } = React;

// 紙張紋理背景（微雜訊 + 輕微暈染）
function PaperTexture({ theme, style = {}, opacity = 0.5 }) {
  return (
    <svg style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', opacity, mixBlendMode: 'multiply', ...style,
    }}>
      <filter id="paper-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="2"/>
        <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.2  0 0 0 0.08 0"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-noise)"/>
    </svg>
  );
}

// 細點陣格線 (for dashboard 統計)
function DotGrid({ theme, spacing = 16, style = {} }) {
  return (
    <svg style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', opacity: 0.35, ...style,
    }}>
      <pattern id={`dot-${spacing}`} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.7" fill={theme.inkMute}/>
      </pattern>
      <rect width="100%" height="100%" fill={`url(#dot-${spacing})`}/>
    </svg>
  );
}

// 圓形進度環
function ProgressRing({ value, total, size = 80, stroke = 4, theme, label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / total, 1);
  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={theme.line} strokeWidth={stroke}/>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={theme.accent} strokeWidth={stroke}
                strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)}/>
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center', lineHeight: 1.1 }}>
        <div style={{ fontFamily: theme.serif, fontSize: size * 0.28, fontWeight: 500, color: theme.ink }}>{label ?? value}</div>
        {sub && <div style={{ fontSize: 9, color: theme.inkMute, marginTop: 2, letterSpacing: 0.5 }}>{sub}</div>}
      </div>
    </div>
  );
}

// 印章章紋 (朱色印記)
function Stamp({ theme, text = '学', size = 36, rotate = -8 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 6,
      border: `2px solid ${theme.accent}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: theme.serif, fontWeight: 600, color: theme.accent,
      fontSize: size * 0.45, letterSpacing: -1,
      transform: `rotate(${rotate}deg)`,
      background: 'rgba(168,83,60,0.06)',
      boxShadow: 'inset 0 0 0 1px rgba(168,83,60,0.15)',
    }}>{text}</div>
  );
}

// 狀態 bar (手機頂部時鐘等)
function StatusBar({ theme, dark }) {
  const c = theme.ink;
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 22px 4px', fontFamily: theme.sans,
      fontSize: 13, fontWeight: 600, color: c,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        <svg width="16" height="10" viewBox="0 0 16 10" fill={c}>
          <rect x="0" y="6" width="2.4" height="4" rx="0.5"/>
          <rect x="3.5" y="4" width="2.4" height="6" rx="0.5"/>
          <rect x="7" y="2" width="2.4" height="8" rx="0.5"/>
          <rect x="10.5" y="0" width="2.4" height="10" rx="0.5"/>
        </svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke={c} strokeWidth="1">
          <rect x="0.5" y="0.5" width="19" height="9" rx="2.5"/>
          <rect x="2" y="2" width="14" height="6" rx="1" fill={c}/>
          <path d="M21 3v4" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}

// 底部 tab bar
function TabBar({ theme, active = 'home', onTab, icons }) {
  const tabs = [
    { id: 'home', label: '今日', Icon: window.Icon.Home },
    { id: 'cards', label: '學習', Icon: window.Icon.Cards },
    { id: 'review', label: '複習', Icon: window.Icon.Clock },
    { id: 'list', label: '單字', Icon: window.Icon.List },
    { id: 'stats', label: '統計', Icon: window.Icon.Chart },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '10px 8px 22px', borderTop: `0.5px solid ${theme.line}`,
      background: theme.paper, fontFamily: theme.sans,
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <div key={t.id} onClick={() => onTab?.(t.id)}
               style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', padding: '4px 10px' }}>
            <t.Icon s={21} c={isActive ? theme.accent : theme.inkMute} w={isActive ? 1.8 : 1.4}/>
            <span style={{ fontSize: 10, color: isActive ? theme.accent : theme.inkMute, letterSpacing: 0.5, fontWeight: isActive ? 600 : 400 }}>{t.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// 手機外框 — 自訂，不綁 iOS/Android
function Phone({ children, theme, width = 320, height = 680, style = {} }) {
  return (
    <div style={{
      width, height, background: theme.paper,
      borderRadius: 36, overflow: 'hidden', position: 'relative',
      boxShadow: `0 0 0 8px ${theme.bgDeep}, 0 2px 6px rgba(0,0,0,0.04), 0 20px 40px -8px rgba(0,0,0,0.12)`,
      fontFamily: theme.sans, color: theme.ink,
      display: 'flex', flexDirection: 'column',
      ...style,
    }}>
      {children}
    </div>
  );
}

window.PaperTexture = PaperTexture;
window.DotGrid = DotGrid;
window.ProgressRing = ProgressRing;
window.Stamp = Stamp;
window.StatusBar = StatusBar;
window.TabBar = TabBar;
window.Phone = Phone;
