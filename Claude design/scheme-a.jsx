// scheme-a.jsx — 方案 A 紙感日誌
const { useState: useStateA } = React;

function SchemeA_Dashboard({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: theme.bg }}>
        <window.PaperTexture theme={theme}/>
        <div style={{ padding: '8px 22px 16px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: theme.inkMute, letterSpacing: 2, marginBottom: 4 }}>2026.04.25 · SAT</div>
              <div style={{ fontFamily: theme.serif, fontSize: 22, fontWeight: 500, color: theme.ink, lineHeight: 1.2 }}>
                おはよう、<br/>今日も一語ずつ。
              </div>
              <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 6 }}>早安，今天也一個字一個字地。</div>
            </div>
            <window.Stamp theme={theme} text="学"/>
          </div>
        </div>

        {/* 今日進度卡 */}
        <div style={{ margin: '0 18px', padding: '18px 20px', background: theme.paper, borderRadius: 14, border: `0.5px solid ${theme.line}`, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 2, textTransform: 'uppercase' }}>Today</div>
              <div style={{ fontFamily: theme.serif, fontSize: 32, fontWeight: 500, color: theme.ink, lineHeight: 1, marginTop: 4 }}>
                18<span style={{ fontSize: 14, color: theme.inkMute, fontWeight: 400 }}> / 30 語</span>
              </div>
              <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 6 }}>還差 12 字達成每日目標</div>
            </div>
            <window.ProgressRing value={18} total={30} size={74} stroke={3} theme={theme} label="60%"/>
          </div>
          <div style={{ marginTop: 14, height: 4, background: theme.line, borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '60%', background: theme.accent }}/>
          </div>
        </div>

        {/* 連續天數 + 掌握字數 */}
        <div style={{ display: 'flex', gap: 10, margin: '12px 18px 0' }}>
          <div style={{ flex: 1, padding: '14px 16px', background: theme.paper, borderRadius: 12, border: `0.5px solid ${theme.line}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <window.Icon.Flame s={14} c={theme.accent}/>
              <span style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 1 }}>連續</span>
            </div>
            <div style={{ fontFamily: theme.serif, fontSize: 26, color: theme.ink, fontWeight: 500, marginTop: 4 }}>23<span style={{ fontSize: 11, color: theme.inkMute, fontWeight: 400 }}> 日</span></div>
          </div>
          <div style={{ flex: 1, padding: '14px 16px', background: theme.paper, borderRadius: 12, border: `0.5px solid ${theme.line}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <window.Icon.Leaf s={14} c={theme.accent2}/>
              <span style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 1 }}>已熟記</span>
            </div>
            <div style={{ fontFamily: theme.serif, fontSize: 26, color: theme.ink, fontWeight: 500, marginTop: 4 }}>247<span style={{ fontSize: 11, color: theme.inkMute, fontWeight: 400 }}> / 600</span></div>
          </div>
        </div>

        {/* 今日複習 */}
        <div style={{ margin: '18px 18px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 15, color: theme.ink, fontWeight: 500 }}>今日課題</div>
            <div style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 1 }}>3 項</div>
          </div>
          {[
            { zh: '新單字學習', en: 'New words', num: '12 字', Icon: window.Icon.Cards, tag: '進行中' },
            { zh: '間隔複習', en: 'Spaced review', num: '8 字', Icon: window.Icon.Refresh, tag: '待完成' },
            { zh: '小測驗', en: 'Mini quiz', num: '10 題', Icon: window.Icon.Quiz, tag: '待完成' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: theme.paper, borderRadius: 10, marginBottom: 8, border: `0.5px solid ${theme.line}` }}>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: theme.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <t.Icon s={16} c={theme.accent}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: theme.ink, fontWeight: 500 }}>{t.zh}</div>
                <div style={{ fontSize: 10, color: theme.inkMute, marginTop: 1 }}>{t.en} · {t.num}</div>
              </div>
              <window.Icon.ArrowRight s={14} c={theme.inkMute}/>
            </div>
          ))}
        </div>
      </div>
      <window.TabBar theme={theme} active="home"/>
    </window.Phone>
  );
}

function SchemeA_FlashCard({ theme }) {
  const [flipped, setFlipped] = useStateA(false);
  const w = window.SAMPLE_WORDS[0];
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <window.PaperTexture theme={theme}/>
        {/* Header */}
        <div style={{ padding: '6px 22px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <window.Icon.X s={18} c={theme.inkSoft}/>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>第 3 / 12 張</div>
          <window.Icon.More s={18} c={theme.inkSoft}/>
        </div>
        {/* 進度線 */}
        <div style={{ margin: '0 22px 16px', height: 2, background: theme.line, borderRadius: 1, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: '25%', background: theme.accent }}/>
        </div>

        {/* 單字卡 */}
        <div style={{ flex: 1, padding: '0 22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setFlipped(!flipped)}
               style={{
                 width: '100%', aspectRatio: '0.75',
                 background: theme.paper, borderRadius: 14, position: 'relative',
                 border: `0.5px solid ${theme.line}`,
                 boxShadow: '0 1px 0 rgba(0,0,0,0.03), 0 8px 24px -6px rgba(0,0,0,0.08)',
                 cursor: 'pointer', overflow: 'hidden',
               }}>
            {/* 裝訂線 */}
            <div style={{ position: 'absolute', left: 22, top: 18, bottom: 18, width: 0.5, background: theme.line }}/>
            <div style={{ position: 'absolute', left: 14, top: 30, width: 3, height: 3, borderRadius: 1.5, border: `0.5px solid ${theme.inkMute}` }}/>
            <div style={{ position: 'absolute', left: 14, bottom: 30, width: 3, height: 3, borderRadius: 1.5, border: `0.5px solid ${theme.inkMute}` }}/>

            <div style={{ padding: '28px 28px 28px 36px', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {!flipped ? (
                <>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: theme.inkMute, textTransform: 'uppercase' }}>Word · {w.pos}</div>
                  <div style={{ marginTop: 'auto', marginBottom: 'auto', textAlign: 'center' }}>
                    <div style={{ fontFamily: theme.serif, fontSize: 36, fontWeight: 500, color: theme.ink, letterSpacing: -0.5 }}>
                      {w.en}
                    </div>
                    <div style={{ fontFamily: theme.mono, fontSize: 13, color: theme.inkSoft, marginTop: 10 }}>{w.ipa}</div>
                    <div style={{ marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 20, border: `0.5px solid ${theme.line}`, background: theme.accentSoft }}>
                      <window.Icon.Speaker s={14} c={theme.accent}/>
                      <span style={{ fontSize: 11, color: theme.accent, letterSpacing: 0.5 }}>發音</span>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: theme.inkMute, textAlign: 'center', letterSpacing: 2 }}>點擊翻面</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: theme.inkMute, textTransform: 'uppercase' }}>Meaning · 釋義</div>
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontFamily: theme.serif, fontSize: 20, color: theme.ink, fontWeight: 500 }}>{w.zh}</div>
                    <div style={{ fontSize: 11, color: theme.inkMute, marginTop: 4 }}>{w.pos}</div>
                  </div>
                  <div style={{ marginTop: 18, paddingTop: 16, borderTop: `0.5px dashed ${theme.line}` }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: theme.inkMute, marginBottom: 6 }}>例 · EXAMPLE</div>
                    <div style={{ fontFamily: theme.serif, fontSize: 13, color: theme.ink, lineHeight: 1.5, fontStyle: 'italic' }}>"{w.example}"</div>
                    <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 6, lineHeight: 1.5 }}>{w.exampleZh}</div>
                  </div>
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: theme.inkMute, marginBottom: 6 }}>同義 · SYNONYMS</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {w.synonyms.map(s => (
                        <span key={s} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 4, background: theme.accentSoft, color: theme.accent, fontFamily: theme.serif }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 三等級評分 */}
        <div style={{ padding: '18px 22px 22px' }}>
          <div style={{ fontSize: 10, color: theme.inkMute, textAlign: 'center', letterSpacing: 2, marginBottom: 10 }}>這個字你的熟悉度？</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { key: 'new', label: '陌生', sub: '< 1 分鐘', color: theme.accent },
              { key: 'learning', label: '不熟', sub: '10 分鐘', color: theme.inkSoft },
              { key: 'familiar', label: '熟記', sub: '3 天', color: theme.accent2 },
            ].map(b => (
              <div key={b.key} style={{
                flex: 1, padding: '12px 4px', borderRadius: 10,
                background: theme.paper, border: `0.5px solid ${theme.line}`,
                textAlign: 'center', cursor: 'pointer',
              }}>
                <div style={{ fontFamily: theme.serif, fontSize: 14, color: b.color, fontWeight: 500 }}>{b.label}</div>
                <div style={{ fontSize: 9, color: theme.inkMute, marginTop: 2, letterSpacing: 0.5 }}>{b.sub}後再見</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </window.Phone>
  );
}

function SchemeA_Quiz({ theme }) {
  const w = window.SAMPLE_WORDS[1];
  const [picked, setPicked] = useStateA(2);
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <window.PaperTexture theme={theme}/>
        <div style={{ padding: '6px 22px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <window.Icon.X s={18} c={theme.inkSoft}/>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>小測驗 · 5 / 10</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: theme.accent, fontFamily: theme.serif, fontWeight: 500 }}>
            <window.Icon.Clock s={13} c={theme.accent}/>
            00:42
          </div>
        </div>
        <div style={{ margin: '0 22px 20px', display: 'flex', gap: 3 }}>
          {[1,1,1,1,2,0,0,0,0,0].map((s, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: s === 1 ? theme.accent2 : s === 2 ? theme.accent : theme.line }}/>
          ))}
        </div>

        <div style={{ padding: '0 22px' }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: theme.inkMute, textTransform: 'uppercase' }}>Question · 問</div>
          <div style={{ fontFamily: theme.serif, fontSize: 13, color: theme.inkSoft, marginTop: 14, lineHeight: 1.6 }}>
            選出下方單字對應的正確中文釋義：
          </div>
          <div style={{ marginTop: 8, padding: '22px 20px', background: theme.paper, borderRadius: 14, border: `0.5px solid ${theme.line}`, textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 10, right: 12 }}>
              <window.Icon.Speaker s={16} c={theme.inkMute}/>
            </div>
            <div style={{ fontFamily: theme.serif, fontSize: 30, fontWeight: 500, color: theme.ink, letterSpacing: -0.3 }}>
              {w.en}
            </div>
            <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.inkMute, marginTop: 6 }}>{w.ipa} · {w.pos}</div>
          </div>
        </div>

        <div style={{ padding: '20px 22px 0', flex: 1 }}>
          {[
            { label: 'A', text: '監督；管理' },
            { label: 'B', text: '分配；撥出', correct: true },
            { label: 'C', text: '安排；籌劃' },
            { label: 'D', text: '評估；估價' },
          ].map((opt, i) => {
            const isPicked = picked === i;
            const showCorrect = isPicked && opt.correct;
            const showWrong = isPicked && !opt.correct;
            return (
              <div key={i} onClick={() => setPicked(i)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', marginBottom: 8, borderRadius: 12,
                background: showCorrect ? theme.accentSoft : theme.paper,
                border: `1px solid ${showCorrect ? theme.accent2 : isPicked ? theme.accent : theme.line}`,
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  border: `0.5px solid ${showCorrect ? theme.accent2 : theme.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: theme.serif, fontSize: 12, color: showCorrect ? theme.accent2 : theme.inkSoft,
                  background: showCorrect ? theme.paper : 'transparent',
                }}>{showCorrect ? <window.Icon.Check s={14} c={theme.accent2}/> : opt.label}</div>
                <div style={{ fontSize: 14, color: theme.ink, fontFamily: theme.serif, flex: 1 }}>{opt.text}</div>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '12px 22px 22px' }}>
          <div style={{
            padding: '14px 0', borderRadius: 12, textAlign: 'center',
            background: theme.ink, color: theme.paper,
            fontFamily: theme.serif, fontSize: 14, fontWeight: 500, letterSpacing: 2,
          }}>下一題</div>
        </div>
      </div>
    </window.Phone>
  );
}

function SchemeA_List({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, position: 'relative', overflow: 'hidden' }}>
        <window.PaperTexture theme={theme}/>
        <div style={{ padding: '10px 22px 6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>TOEIC 600</div>
              <div style={{ fontFamily: theme.serif, fontSize: 26, color: theme.ink, fontWeight: 500, marginTop: 2 }}>単語帳</div>
            </div>
            <window.Icon.Filter s={18} c={theme.inkSoft}/>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12, padding: '10px 12px', background: theme.paper, borderRadius: 10, border: `0.5px solid ${theme.line}` }}>
            <window.Icon.Search s={14} c={theme.inkMute}/>
            <div style={{ fontSize: 12, color: theme.inkMute, flex: 1 }}>搜尋單字、釋義</div>
          </div>
        </div>

        {/* filters */}
        <div style={{ display: 'flex', gap: 6, padding: '12px 22px 8px', overflowX: 'auto' }}>
          {[
            { t: '全部 600', active: true },
            { t: '熟記 247' },
            { t: '不熟 132' },
            { t: '陌生 221' },
            { t: '收藏' },
          ].map((c, i) => (
            <div key={i} style={{
              padding: '5px 11px', borderRadius: 14,
              background: c.active ? theme.ink : 'transparent',
              color: c.active ? theme.paper : theme.inkSoft,
              border: `0.5px solid ${c.active ? theme.ink : theme.line}`,
              fontSize: 11, fontFamily: theme.serif, whiteSpace: 'nowrap',
            }}>{c.t}</div>
          ))}
        </div>

        <div style={{ padding: '4px 22px', fontSize: 10, color: theme.inkMute, letterSpacing: 2 }}>A — Ad</div>

        {window.SAMPLE_WORDS.slice(0, 5).map((w, i) => {
          const levelColor = w.level === 'familiar' ? theme.accent2 : w.level === 'learning' ? theme.accent : theme.inkMute;
          const levelChar = w.level === 'familiar' ? '熟' : w.level === 'learning' ? '習' : '新';
          return (
            <div key={i} style={{
              padding: '12px 22px', borderBottom: `0.5px solid ${theme.line}`,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                border: `0.5px solid ${levelColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: theme.serif, fontSize: 12, color: levelColor,
                background: w.level === 'familiar' ? 'rgba(90,107,78,0.08)' : w.level === 'learning' ? 'rgba(168,83,60,0.08)' : 'transparent',
              }}>{levelChar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <div style={{ fontFamily: theme.serif, fontSize: 15, color: theme.ink, fontWeight: 500 }}>{w.en}</div>
                  <div style={{ fontFamily: theme.mono, fontSize: 10, color: theme.inkMute }}>{w.ipa}</div>
                </div>
                <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 2 }}>
                  <span style={{ fontStyle: 'italic', color: theme.inkMute }}>{w.pos}</span>  {w.zh}
                </div>
              </div>
              <window.Icon.Bookmark s={14} c={i === 0 ? theme.accent : theme.inkMute} filled={i === 0}/>
            </div>
          );
        })}
      </div>
      <window.TabBar theme={theme} active="list"/>
    </window.Phone>
  );
}

function SchemeA_Stats({ theme }) {
  const max = Math.max(...window.STATS.weeklyMinutes);
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, position: 'relative', overflow: 'auto' }}>
        <window.PaperTexture theme={theme}/>
        <div style={{ padding: '10px 22px' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>2026 APRIL</div>
          <div style={{ fontFamily: theme.serif, fontSize: 26, color: theme.ink, fontWeight: 500 }}>学習記録</div>
        </div>

        {/* 整體進度 */}
        <div style={{ margin: '4px 18px 0', padding: 18, background: theme.paper, borderRadius: 14, border: `0.5px solid ${theme.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 1 }}>總體進度</div>
              <div style={{ fontFamily: theme.serif, fontSize: 30, fontWeight: 500, color: theme.ink, marginTop: 4 }}>
                41<span style={{ fontSize: 14, color: theme.inkMute }}>.2%</span>
              </div>
              <div style={{ fontSize: 10, color: theme.inkSoft, marginTop: 2 }}>247 / 600 字</div>
            </div>
            <window.ProgressRing value={247} total={600} size={68} stroke={3} theme={theme} label="41%"/>
          </div>
          <div style={{ display: 'flex', height: 6, marginTop: 14, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ flex: 247, background: theme.accent2 }}/>
            <div style={{ flex: 132, background: theme.accent }}/>
            <div style={{ flex: 221, background: theme.line }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 9, color: theme.inkMute, letterSpacing: 1 }}>
            <span>● 熟記 247</span>
            <span>● 學習中 132</span>
            <span>○ 未學 221</span>
          </div>
        </div>

        {/* 週長條 */}
        <div style={{ margin: '14px 18px 0', padding: '18px 18px 14px', background: theme.paper, borderRadius: 14, border: `0.5px solid ${theme.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500 }}>本週學習時間</div>
            <div style={{ fontSize: 11, color: theme.inkSoft }}>153 分鐘</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', height: 88 }}>
            {window.STATS.weeklyMinutes.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 9, color: theme.inkMute, fontFamily: theme.mono, fontWeight: 500 }}>{m || '—'}</div>
                <div style={{ width: '100%', height: 60, display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%',
                    height: `${(m / max) * 100}%`,
                    background: i === 4 ? theme.accent : i === 6 ? theme.accent2 : theme.lineStrong,
                    borderRadius: '3px 3px 0 0',
                  }}/>
                </div>
                <div style={{ fontSize: 10, color: i === 6 ? theme.accent : theme.inkMute, fontFamily: theme.serif }}>{window.STATS.weekDays[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 連續天數日曆 */}
        <div style={{ margin: '14px 18px 20px', padding: 18, background: theme.paper, borderRadius: 14, border: `0.5px solid ${theme.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500 }}>學習軌跡</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: theme.accent }}>
              <window.Icon.Flame s={13} c={theme.accent}/>
              <span style={{ fontFamily: theme.serif, fontSize: 14, fontWeight: 600 }}>23</span>
              <span style={{ fontSize: 10, color: theme.inkMute }}>連續日</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 3 }}>
            {Array.from({ length: 56 }).map((_, i) => {
              const intensity = [0, 0.2, 0.4, 0.6, 0.8, 1][Math.floor(Math.random() * 6)];
              return <div key={i} style={{
                aspectRatio: '1', borderRadius: 2,
                background: intensity === 0 ? theme.line : `rgba(168,83,60,${intensity})`,
              }}/>;
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 9, color: theme.inkMute, letterSpacing: 1 }}>
            <span>8 週前</span>
            <span>今日</span>
          </div>
        </div>
      </div>
      <window.TabBar theme={theme} active="stats"/>
    </window.Phone>
  );
}

function SchemeA_Review({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, position: 'relative', overflow: 'auto' }}>
        <window.PaperTexture theme={theme}/>
        <div style={{ padding: '10px 22px' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>SPACED REPETITION</div>
          <div style={{ fontFamily: theme.serif, fontSize: 26, color: theme.ink, fontWeight: 500 }}>複習排程</div>
          <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 4 }}>依據遺忘曲線為你安排</div>
        </div>

        <div style={{ margin: '6px 18px 0', padding: '16px 18px', background: theme.accent, borderRadius: 14, color: theme.paper, position: 'relative', overflow: 'hidden' }}>
          <window.Stamp theme={{...theme, accent: theme.paper}} text="急" size={32} rotate={8}/>
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.7 }}>DUE NOW</div>
          </div>
          <div style={{ marginTop: 6 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 30, fontWeight: 500 }}>12 字</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>今日需複習，保持熟記</div>
          </div>
          <div style={{ marginTop: 12, padding: '8px 14px', background: 'rgba(255,255,255,0.18)', borderRadius: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, fontFamily: theme.serif }}>開始複習</span>
            <window.Icon.ArrowRight s={12} c={theme.paper}/>
          </div>
        </div>

        <div style={{ padding: '16px 22px 6px', fontSize: 10, color: theme.inkMute, letterSpacing: 2 }}>即將到期</div>

        {window.REVIEW_SCHEDULE.slice(1).map((r, i) => (
          <div key={i} style={{ margin: '0 18px 8px', padding: '14px 16px', background: theme.paper, borderRadius: 12, border: `0.5px solid ${theme.line}`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ textAlign: 'center', width: 44 }}>
              <div style={{ fontFamily: theme.serif, fontSize: 18, color: theme.ink, fontWeight: 500 }}>{r.count}</div>
              <div style={{ fontSize: 9, color: theme.inkMute, letterSpacing: 1 }}>字</div>
            </div>
            <div style={{ width: 0.5, height: 30, background: theme.line }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: theme.serif, fontSize: 13, color: theme.ink, fontWeight: 500 }}>{r.label}</div>
              <div style={{ fontSize: 10, color: theme.inkMute, marginTop: 2 }}>預定 {new Date(Date.now() + (i+1)*86400000).toLocaleDateString('zh-TW', {month: 'numeric', day: 'numeric'})}</div>
            </div>
            <div style={{ padding: '4px 10px', borderRadius: 10, background: theme.accentSoft, color: theme.accent, fontSize: 10, letterSpacing: 1 }}>
              +{i === 0 ? '1d' : i === 1 ? '3d' : i === 2 ? '7d' : '14d'}
            </div>
          </div>
        ))}

        {/* 遺忘曲線圖 */}
        <div style={{ margin: '14px 18px 22px', padding: 18, background: theme.paper, borderRadius: 14, border: `0.5px solid ${theme.line}` }}>
          <div style={{ fontFamily: theme.serif, fontSize: 13, color: theme.ink, fontWeight: 500 }}>你的遺忘曲線</div>
          <div style={{ fontSize: 10, color: theme.inkMute, marginTop: 3 }}>下次複習時機以此推算</div>
          <svg width="100%" height="110" viewBox="0 0 260 110" style={{ marginTop: 10 }}>
            <defs>
              <linearGradient id="curveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={theme.accent} stopOpacity="0.25"/>
                <stop offset="100%" stopColor={theme.accent} stopOpacity="0"/>
              </linearGradient>
            </defs>
            {[0, 30, 60, 90].map(y => (
              <line key={y} x1="0" x2="260" y1={y + 10} y2={y + 10} stroke={theme.line} strokeDasharray="2 3"/>
            ))}
            <path d="M0,15 Q30,50 70,70 T140,90 T260,100 L260,110 L0,110 Z" fill="url(#curveGrad)"/>
            <path d="M0,15 Q30,50 70,70 T140,90 T260,100" stroke={theme.accent} strokeWidth="1.5" fill="none"/>
            {[[0,15],[70,70],[140,90],[210,98]].map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="3" fill={theme.paper} stroke={theme.accent} strokeWidth="1.5"/>
            ))}
            <text x="0" y="108" fontSize="8" fill={theme.inkMute} fontFamily={theme.mono}>0</text>
            <text x="68" y="108" fontSize="8" fill={theme.inkMute} fontFamily={theme.mono}>1d</text>
            <text x="138" y="108" fontSize="8" fill={theme.inkMute} fontFamily={theme.mono}>3d</text>
            <text x="208" y="108" fontSize="8" fill={theme.inkMute} fontFamily={theme.mono}>7d</text>
          </svg>
        </div>
      </div>
      <window.TabBar theme={theme} active="review"/>
    </window.Phone>
  );
}

Object.assign(window, {
  SchemeA_Dashboard, SchemeA_FlashCard, SchemeA_Quiz,
  SchemeA_List, SchemeA_Stats, SchemeA_Review,
});
