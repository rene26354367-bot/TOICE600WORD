// scheme-b.jsx — 方案 B 柔霧靜物（現代圓潤、柔和漸層）
const { useState: useStateB } = React;

function SchemeB_Dashboard({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, overflow: 'auto', background: `linear-gradient(180deg, ${theme.bg} 0%, ${theme.bgDeep} 100%)`, position: 'relative' }}>
        <div style={{ padding: '14px 22px 10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: theme.inkSoft, marginBottom: 3 }}>Hi, 早安 👋</div>
              <div style={{ fontFamily: theme.serif, fontSize: 24, color: theme.ink, fontWeight: 500 }}>讓我們繼續吧</div>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: theme.accentSoft, border: `1px solid ${theme.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accent, fontFamily: theme.serif, fontSize: 14, fontWeight: 500 }}>M</div>
          </div>
        </div>

        {/* 今日大卡 - 柔和漸層 */}
        <div style={{ margin: '6px 18px 0', padding: 20, borderRadius: 22, background: `linear-gradient(135deg, ${theme.accent} 0%, ${theme.accent2} 120%)`, color: theme.paper, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.10)' }}/>
          <div style={{ position: 'absolute', top: 30, right: 20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }}/>
          <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.85 }}>TODAY · 4月25日</div>
          <div style={{ fontFamily: theme.serif, fontSize: 40, fontWeight: 500, marginTop: 6, lineHeight: 1 }}>18<span style={{ fontSize: 16, opacity: 0.75 }}> / 30</span></div>
          <div style={{ fontSize: 11, opacity: 0.85, marginTop: 3 }}>今日已背 · 剩 12 字</div>
          <div style={{ marginTop: 12, height: 5, background: 'rgba(255,255,255,0.25)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: theme.paper, borderRadius: 3 }}/>
          </div>
          <div style={{ marginTop: 14, display: 'inline-flex', padding: '8px 16px', background: theme.paper, color: theme.accent, borderRadius: 20, fontSize: 12, fontWeight: 500, alignItems: 'center', gap: 6 }}>
            繼續學習 <window.Icon.ArrowRight s={12} c={theme.accent}/>
          </div>
        </div>

        {/* 快捷四宮格 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '14px 18px 0' }}>
          {[
            { Icon: window.Icon.Flame, n: '23', u: '連續日', c: theme.accent },
            { Icon: window.Icon.Leaf, n: '247', u: '已熟記', c: theme.accent2 },
            { Icon: window.Icon.Clock, n: '12', u: '待複習', c: theme.accent },
            { Icon: window.Icon.Star, n: '4.8', u: '本週平均', c: theme.accent2 },
          ].map((s, i) => (
            <div key={i} style={{ padding: 14, background: theme.paper, borderRadius: 16, border: `1px solid ${theme.line}` }}>
              <div style={{ width: 28, height: 28, borderRadius: 10, background: theme.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <s.Icon s={14} c={s.c}/>
              </div>
              <div style={{ fontFamily: theme.serif, fontSize: 24, color: theme.ink, fontWeight: 500, marginTop: 8 }}>{s.n}</div>
              <div style={{ fontSize: 11, color: theme.inkMute }}>{s.u}</div>
            </div>
          ))}
        </div>

        {/* 主題單元 */}
        <div style={{ margin: '16px 18px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 15, color: theme.ink, fontWeight: 500 }}>主題單元</div>
            <div style={{ fontSize: 11, color: theme.accent }}>查看全部</div>
          </div>
          {[
            { t: '辦公室情境', sub: '48 字 · 已完成 32', pct: 67, c: theme.accent },
            { t: '會議與簡報', sub: '52 字 · 已完成 18', pct: 35, c: theme.accent2 },
          ].map((u, i) => (
            <div key={i} style={{ padding: 14, background: theme.paper, borderRadius: 14, border: `1px solid ${theme.line}`, marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500 }}>{u.t}</div>
                  <div style={{ fontSize: 11, color: theme.inkMute, marginTop: 2 }}>{u.sub}</div>
                </div>
                <div style={{ fontSize: 11, color: u.c, fontFamily: theme.serif, fontWeight: 500 }}>{u.pct}%</div>
              </div>
              <div style={{ marginTop: 10, height: 4, background: theme.line, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${u.pct}%`, background: u.c, borderRadius: 2 }}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 14 }}/>
      </div>
      <window.TabBar theme={theme} active="home"/>
    </window.Phone>
  );
}

function SchemeB_FlashCard({ theme }) {
  const [flipped, setFlipped] = useStateB(false);
  const w = window.SAMPLE_WORDS[0];
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: `linear-gradient(180deg, ${theme.bg}, ${theme.bgDeep})`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '6px 22px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: theme.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.line}` }}>
            <window.Icon.X s={16} c={theme.inkSoft}/>
          </div>
          <div style={{ flex: 1, margin: '0 12px', height: 6, background: theme.accentSoft, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '25%', height: '100%', background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent2})`, borderRadius: 3 }}/>
          </div>
          <div style={{ fontSize: 11, color: theme.inkSoft, fontFamily: theme.mono }}>3/12</div>
        </div>

        {/* Card */}
        <div style={{ flex: 1, padding: '0 22px', display: 'flex', alignItems: 'center' }}>
          <div onClick={() => setFlipped(!flipped)}
               style={{
                 width: '100%', aspectRatio: 0.72,
                 background: `linear-gradient(180deg, ${theme.paper}, ${theme.accentSoft})`,
                 borderRadius: 28, padding: 26,
                 boxShadow: '0 2px 4px rgba(0,0,0,0.02), 0 24px 60px -20px rgba(0,0,0,0.18)',
                 border: `1px solid ${theme.line}`,
                 display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
               }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: `radial-gradient(circle, ${theme.accent}15, transparent 70%)` }}/>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
              <div style={{ padding: '4px 10px', borderRadius: 10, background: theme.accentSoft, fontSize: 10, color: theme.accent, fontWeight: 500, letterSpacing: 0.5 }}>{w.pos} 動詞</div>
              <window.Icon.Bookmark s={16} c={theme.accent} filled/>
            </div>

            {!flipped ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, position: 'relative' }}>
                <div style={{ fontFamily: theme.serif, fontSize: 40, color: theme.ink, fontWeight: 500, letterSpacing: -0.5, textAlign: 'center', lineHeight: 1 }}>
                  {w.en}
                </div>
                <div style={{ fontFamily: theme.mono, fontSize: 13, color: theme.inkSoft }}>{w.ipa}</div>
                <div style={{ width: 54, height: 54, borderRadius: '50%', background: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 6px 18px -4px ${theme.accent}`, marginTop: 8 }}>
                  <window.Icon.Speaker s={22} c={theme.paper}/>
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14, position: 'relative' }}>
                <div>
                  <div style={{ fontFamily: theme.serif, fontSize: 24, color: theme.ink, fontWeight: 500 }}>{w.en}</div>
                  <div style={{ fontFamily: theme.serif, fontSize: 18, color: theme.accent, marginTop: 4 }}>{w.zh}</div>
                </div>
                <div style={{ padding: 14, background: 'rgba(255,255,255,0.5)', borderRadius: 14, border: `1px solid ${theme.line}` }}>
                  <div style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 1, marginBottom: 4 }}>TOEIC 例句</div>
                  <div style={{ fontFamily: theme.serif, fontSize: 13, color: theme.ink, lineHeight: 1.5, fontStyle: 'italic' }}>{w.example}</div>
                  <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 4 }}>{w.exampleZh}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {w.synonyms.map(s => (
                    <span key={s} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 10, background: theme.paper, color: theme.accent2, border: `1px solid ${theme.line}`, fontFamily: theme.serif }}>+ {s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: '18px 22px 22px' }}>
          <div style={{ fontSize: 11, color: theme.inkMute, textAlign: 'center', marginBottom: 10 }}>你記得嗎？</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { key: 'new', label: '陌生', emoji: '😕', color: '#c77d5f' },
              { key: 'learning', label: '不熟', emoji: '🤔', color: '#d4a574' },
              { key: 'familiar', label: '熟記', emoji: '😎', color: theme.accent2 },
            ].map(b => (
              <div key={b.key} style={{
                flex: 1, padding: '14px 4px', borderRadius: 16,
                background: theme.paper, border: `1.5px solid ${theme.line}`,
                textAlign: 'center', cursor: 'pointer',
              }}>
                <div style={{ fontSize: 22 }}>{b.emoji}</div>
                <div style={{ fontFamily: theme.serif, fontSize: 13, color: b.color, fontWeight: 500, marginTop: 4 }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </window.Phone>
  );
}

function SchemeB_Quiz({ theme }) {
  const w = window.SAMPLE_WORDS[1];
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: `linear-gradient(180deg, ${theme.bg}, ${theme.bgDeep})`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '6px 22px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: theme.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.line}` }}>
            <window.Icon.X s={16} c={theme.inkSoft}/>
          </div>
          <div style={{ flex: 1, height: 6, background: theme.accentSoft, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: '50%', height: '100%', background: theme.accent, borderRadius: 3 }}/>
          </div>
          <div style={{ padding: '4px 10px', borderRadius: 14, background: theme.paper, border: `1px solid ${theme.line}`, fontSize: 11, color: theme.accent, fontFamily: theme.serif, fontWeight: 500 }}>5/10</div>
        </div>

        <div style={{ padding: '12px 22px 0' }}>
          <div style={{ fontSize: 11, color: theme.inkMute, letterSpacing: 1 }}>閱讀句子，選出空格適合的字</div>
          <div style={{ marginTop: 14, padding: 20, background: theme.paper, borderRadius: 20, border: `1px solid ${theme.line}`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: `${theme.accent}15` }}/>
            <div style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 1.5 }}>TOEIC CLOZE</div>
            <div style={{ fontFamily: theme.serif, fontSize: 16, color: theme.ink, lineHeight: 1.6, marginTop: 8, position: 'relative' }}>
              The manager will <span style={{ display: 'inline-block', minWidth: 70, borderBottom: `2px solid ${theme.accent}`, margin: '0 3px', textAlign: 'center', color: theme.accent }}>_____</span> the budget among all departments this quarter.
            </div>
            <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 6 }}>經理將把預算分配給各部門。</div>
          </div>
        </div>

        <div style={{ padding: '18px 22px 0', flex: 1 }}>
          {[
            { w: 'supervise', p: '/ˈsuː.pər.vaɪz/', pos: 'v. 監督' },
            { w: 'allocate', p: '/ˈæl.ə.keɪt/', pos: 'v. 分配', correct: true, picked: true },
            { w: 'arrange', p: '/əˈreɪndʒ/', pos: 'v. 安排' },
            { w: 'evaluate', p: '/ɪˈvæl.ju.eɪt/', pos: 'v. 評估' },
          ].map((opt, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 14, marginBottom: 8, borderRadius: 16,
              background: opt.picked ? `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})` : theme.paper,
              border: `1.5px solid ${opt.picked ? theme.accent : theme.line}`,
              color: opt.picked ? theme.paper : theme.ink,
              boxShadow: opt.picked ? `0 8px 20px -8px ${theme.accent}` : 'none',
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: opt.picked ? 'rgba(255,255,255,0.25)' : theme.accentSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: opt.picked ? theme.paper : theme.accent,
                fontFamily: theme.serif, fontSize: 12, fontWeight: 500,
              }}>{opt.picked ? <window.Icon.Check s={14} c={theme.paper} w={2.5}/> : String.fromCharCode(65+i)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: theme.serif, fontSize: 15, fontWeight: 500 }}>{opt.w}</div>
                <div style={{ fontSize: 10, opacity: 0.75, marginTop: 1, fontFamily: theme.mono }}>{opt.p} · {opt.pos}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '4px 22px 22px' }}>
          <div style={{ padding: '15px 0', borderRadius: 18, textAlign: 'center', background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, color: theme.paper, fontFamily: theme.serif, fontSize: 15, fontWeight: 500, boxShadow: `0 10px 24px -10px ${theme.accent}` }}>
            確認答案
          </div>
        </div>
      </div>
    </window.Phone>
  );
}

function SchemeB_List({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, overflow: 'auto' }}>
        <div style={{ padding: '10px 22px 6px' }}>
          <div style={{ fontFamily: theme.serif, fontSize: 26, color: theme.ink, fontWeight: 500 }}>我的單字</div>
          <div style={{ fontSize: 12, color: theme.inkSoft, marginTop: 2 }}>600 個 TOEIC 核心字彙</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: theme.paper, borderRadius: 14, border: `1px solid ${theme.line}` }}>
              <window.Icon.Search s={15} c={theme.inkMute}/>
              <div style={{ fontSize: 12, color: theme.inkMute }}>搜尋單字…</div>
            </div>
            <div style={{ width: 40, height: 40, background: theme.paper, border: `1px solid ${theme.line}`, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <window.Icon.Filter s={15} c={theme.inkSoft}/>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, padding: '14px 22px 8px', overflowX: 'auto' }}>
          {[{t:'全部', n:600, a:true}, {t:'熟記', n:247}, {t:'學習中', n:132}, {t:'陌生', n:221}, {t:'收藏', n:18}].map((c, i) => (
            <div key={i} style={{
              padding: '7px 14px', borderRadius: 20, whiteSpace: 'nowrap',
              background: c.a ? theme.ink : theme.paper,
              color: c.a ? theme.paper : theme.inkSoft,
              border: `1px solid ${c.a ? theme.ink : theme.line}`,
              fontSize: 12, fontFamily: theme.serif, fontWeight: 500,
            }}>{c.t} <span style={{ opacity: 0.6, fontSize: 10 }}>{c.n}</span></div>
          ))}
        </div>

        <div style={{ padding: '0 18px' }}>
          {window.SAMPLE_WORDS.slice(0, 5).map((w, i) => {
            const levelColor = w.level === 'familiar' ? theme.accent2 : w.level === 'learning' ? theme.accent : theme.inkMute;
            const pct = w.level === 'familiar' ? 90 : w.level === 'learning' ? 50 : 15;
            return (
              <div key={i} style={{ padding: 14, background: theme.paper, borderRadius: 16, border: `1px solid ${theme.line}`, marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <div style={{ fontFamily: theme.serif, fontSize: 17, color: theme.ink, fontWeight: 500 }}>{w.en}</div>
                      <div style={{ fontSize: 10, color: theme.inkMute, fontFamily: theme.mono }}>{w.ipa}</div>
                    </div>
                    <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 3 }}>{w.pos} {w.zh}</div>
                  </div>
                  <window.Icon.Speaker s={16} c={theme.inkMute}/>
                  <window.Icon.Bookmark s={16} c={i === 0 ? theme.accent : theme.inkMute} filled={i === 0}/>
                </div>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 3, background: theme.line, borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: levelColor }}/>
                  </div>
                  <div style={{ fontSize: 10, color: levelColor, fontFamily: theme.serif, fontWeight: 500 }}>
                    {w.level === 'familiar' ? '熟記' : w.level === 'learning' ? '學習中' : '陌生'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <window.TabBar theme={theme} active="list"/>
    </window.Phone>
  );
}

function SchemeB_Stats({ theme }) {
  const max = Math.max(...window.STATS.weeklyMinutes);
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, overflow: 'auto' }}>
        <div style={{ padding: '10px 22px' }}>
          <div style={{ fontFamily: theme.serif, fontSize: 26, color: theme.ink, fontWeight: 500 }}>學習統計</div>
          <div style={{ fontSize: 12, color: theme.inkSoft }}>2026 · April</div>
        </div>

        {/* 總進度環 + 圖例 */}
        <div style={{ margin: '6px 18px 0', padding: 20, background: theme.paper, borderRadius: 20, border: `1px solid ${theme.line}`, display: 'flex', alignItems: 'center', gap: 20 }}>
          <window.ProgressRing value={247} total={600} size={88} stroke={5} theme={theme} label="41%" sub="MASTERED"/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 12, color: theme.ink, fontWeight: 500, marginBottom: 8 }}>600 字進度</div>
            {[
              { t: '熟記', n: 247, c: theme.accent2 },
              { t: '學習中', n: 132, c: theme.accent },
              { t: '未學', n: 221, c: theme.inkMute },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: s.c }}/>
                <div style={{ fontSize: 11, color: theme.inkSoft }}>{s.t}</div>
                <div style={{ marginLeft: 'auto', fontFamily: theme.mono, fontSize: 11, color: theme.ink, fontWeight: 500 }}>{s.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 週長條 */}
        <div style={{ margin: '12px 18px 0', padding: 20, background: theme.paper, borderRadius: 20, border: `1px solid ${theme.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500 }}>本週</div>
            <div style={{ fontSize: 11, color: theme.inkSoft }}>153 分鐘</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 90, marginTop: 14 }}>
            {window.STATS.weeklyMinutes.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: '100%', height: 70, display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{
                    width: '100%', height: `${(m / max) * 100 || 2}%`,
                    background: i === 6 ? `linear-gradient(180deg, ${theme.accent}, ${theme.accent2})` : `linear-gradient(180deg, ${theme.accent2}90, ${theme.accent2}60)`,
                    borderRadius: 8,
                  }}/>
                </div>
                <div style={{ fontSize: 10, color: i === 6 ? theme.accent : theme.inkMute, fontWeight: i === 6 ? 600 : 400 }}>{window.STATS.weekDays[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 成就環 */}
        <div style={{ margin: '12px 18px 20px', padding: 20, background: theme.paper, borderRadius: 20, border: `1px solid ${theme.line}` }}>
          <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500, marginBottom: 12 }}>近期紀錄</div>
          {[
            { t: '連續學習 3 週', sub: '持續 21 天', Icon: window.Icon.Flame, c: theme.accent },
            { t: '掌握 250 字', sub: '里程碑達成', Icon: window.Icon.Star, c: theme.accent2 },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i === 0 ? `1px solid ${theme.line}` : 'none' }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: theme.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <a.Icon s={18} c={a.c}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: theme.ink, fontFamily: theme.serif, fontWeight: 500 }}>{a.t}</div>
                <div style={{ fontSize: 10, color: theme.inkMute, marginTop: 1 }}>{a.sub}</div>
              </div>
              <window.Icon.ArrowRight s={14} c={theme.inkMute}/>
            </div>
          ))}
        </div>
      </div>
      <window.TabBar theme={theme} active="stats"/>
    </window.Phone>
  );
}

function SchemeB_Review({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, overflow: 'auto' }}>
        <div style={{ padding: '10px 22px' }}>
          <div style={{ fontFamily: theme.serif, fontSize: 26, color: theme.ink, fontWeight: 500 }}>複習計劃</div>
          <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 2 }}>智能排程，不讓你忘記</div>
        </div>

        <div style={{ margin: '8px 18px 0', padding: 22, borderRadius: 24, background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, color: theme.paper, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.15)' }}/>
          <div style={{ position: 'absolute', top: 20, right: 20, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }}/>
          <div style={{ fontSize: 10, letterSpacing: 2, opacity: 0.85 }}>TODAY · 今日複習</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 6 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 48, fontWeight: 500, lineHeight: 1 }}>12</div>
            <div style={{ fontSize: 14, opacity: 0.85 }}>字待複習</div>
          </div>
          <div style={{ fontSize: 11, opacity: 0.9, marginTop: 4 }}>約需 6 分鐘</div>
          <div style={{ marginTop: 14, display: 'inline-flex', padding: '10px 18px', background: theme.paper, color: theme.accent, borderRadius: 24, fontSize: 13, fontWeight: 500, alignItems: 'center', gap: 6, fontFamily: theme.serif }}>
            立即開始 <window.Icon.ArrowRight s={12} c={theme.accent}/>
          </div>
        </div>

        <div style={{ padding: '18px 22px 6px', fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500 }}>未來排程</div>

        {window.REVIEW_SCHEDULE.slice(1).map((r, i) => (
          <div key={i} style={{ margin: '0 18px 8px', padding: 14, background: theme.paper, borderRadius: 16, border: `1px solid ${theme.line}`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: theme.accentSoft, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontFamily: theme.serif, fontSize: 16, color: theme.accent, fontWeight: 500, lineHeight: 1 }}>{r.count}</div>
              <div style={{ fontSize: 8, color: theme.accent, opacity: 0.7, marginTop: 1 }}>字</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: theme.ink, fontFamily: theme.serif, fontWeight: 500 }}>{r.label}</div>
              <div style={{ fontSize: 10, color: theme.inkMute, marginTop: 2 }}>根據遺忘曲線自動排程</div>
            </div>
            <window.Icon.ArrowRight s={14} c={theme.inkMute}/>
          </div>
        ))}

        <div style={{ margin: '14px 18px 20px', padding: 20, background: `linear-gradient(135deg, ${theme.accentSoft}, ${theme.paper})`, borderRadius: 20, border: `1px solid ${theme.line}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <window.Icon.Leaf s={15} c={theme.accent2}/>
            <div style={{ fontFamily: theme.serif, fontSize: 13, color: theme.ink, fontWeight: 500 }}>小提醒</div>
          </div>
          <div style={{ fontSize: 11, color: theme.inkSoft, lineHeight: 1.6 }}>持續連續複習 23 天了！別讓努力白費，今天也保持吧。</div>
        </div>
      </div>
      <window.TabBar theme={theme} active="review"/>
    </window.Phone>
  );
}

Object.assign(window, {
  SchemeB_Dashboard, SchemeB_FlashCard, SchemeB_Quiz,
  SchemeB_List, SchemeB_Stats, SchemeB_Review,
});
