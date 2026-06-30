// scheme-c.jsx — 方案 C 墨跡學術（文庫本氣質）
const { useState: useStateC } = React;

function SchemeC_Dashboard({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, overflow: 'auto', position: 'relative' }}>
        <window.PaperTexture theme={theme} opacity={0.4}/>
        {/* 文庫本扉頁式 header */}
        <div style={{ padding: '12px 22px 10px', borderBottom: `1px solid ${theme.lineStrong}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 3 }}>NO.023</div>
              <div style={{ fontFamily: theme.serif, fontSize: 22, color: theme.ink, fontWeight: 600, marginTop: 2 }}>TOEIC 600</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 10, color: theme.inkSoft, letterSpacing: 1 }}>
              <div>令和八年</div>
              <div>卯月廿五日</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '18px 22px 10px' }}>
          <div style={{ fontSize: 10, letterSpacing: 4, color: theme.inkMute }}>— TODAY —</div>
          <div style={{ fontFamily: theme.serif, fontSize: 18, color: theme.ink, fontWeight: 500, marginTop: 6, lineHeight: 1.4 }}>
            "日に一語ずつ、やがて千語となる。"
          </div>
          <div style={{ fontSize: 10, color: theme.inkSoft, marginTop: 3 }}>一日一字，終將積千語。</div>
        </div>

        {/* 主進度 - 文庫本內頁樣式 */}
        <div style={{ margin: '0 18px', padding: 20, background: theme.paper, border: `1.5px solid ${theme.lineStrong}`, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -1, left: -1, width: 14, height: 14, borderTop: `2px solid ${theme.accent}`, borderLeft: `2px solid ${theme.accent}` }}/>
          <div style={{ position: 'absolute', top: -1, right: -1, width: 14, height: 14, borderTop: `2px solid ${theme.accent}`, borderRight: `2px solid ${theme.accent}` }}/>
          <div style={{ position: 'absolute', bottom: -1, left: -1, width: 14, height: 14, borderBottom: `2px solid ${theme.accent}`, borderLeft: `2px solid ${theme.accent}` }}/>
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: 14, height: 14, borderBottom: `2px solid ${theme.accent}`, borderRight: `2px solid ${theme.accent}` }}/>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>本日の進捗</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
                <div style={{ fontFamily: theme.serif, fontSize: 42, color: theme.ink, fontWeight: 500, lineHeight: 1 }}>18</div>
                <div style={{ fontSize: 12, color: theme.inkSoft, fontFamily: theme.serif }}>/ 30 語</div>
              </div>
            </div>
            <window.ProgressRing value={18} total={30} size={70} stroke={2} theme={theme} label="六〇%"/>
          </div>
          <div style={{ marginTop: 14, display: 'flex', gap: 2 }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 8, background: i < 18 ? theme.accent : theme.line, borderRadius: 0.5 }}/>
            ))}
          </div>
        </div>

        {/* 兩列 — 連續 / 熟記 */}
        <div style={{ display: 'flex', margin: '12px 18px 0', border: `1px solid ${theme.lineStrong}`, background: theme.paper }}>
          <div style={{ flex: 1, padding: '14px 16px', borderRight: `1px solid ${theme.lineStrong}` }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: theme.inkMute }}>連續日數</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
              <div style={{ fontFamily: theme.serif, fontSize: 24, color: theme.accent2, fontWeight: 600 }}>廿三</div>
              <div style={{ fontSize: 10, color: theme.inkMute }}>日</div>
            </div>
          </div>
          <div style={{ flex: 1, padding: '14px 16px' }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: theme.inkMute }}>熟記字數</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
              <div style={{ fontFamily: theme.serif, fontSize: 24, color: theme.ink, fontWeight: 600 }}>247</div>
              <div style={{ fontSize: 10, color: theme.inkMute }}>/ 600</div>
            </div>
          </div>
        </div>

        {/* 目錄式 — 今日課題 */}
        <div style={{ margin: '16px 18px 20px' }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: theme.inkMute, paddingBottom: 6, borderBottom: `1px solid ${theme.lineStrong}` }}>— 目次 CONTENTS —</div>
          {[
            { no: '壹', zh: '新字學習', en: 'NEW WORDS', num: '12', tag: '進行中' },
            { no: '貳', zh: '間隔複習', en: 'SPACED REVIEW', num: '8', tag: '未著手' },
            { no: '參', zh: '小測驗', en: 'MINI QUIZ', num: '10', tag: '未著手' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 2px', borderBottom: `0.5px dashed ${theme.line}`, gap: 12 }}>
              <div style={{ fontFamily: theme.serif, fontSize: 16, color: theme.accent, fontWeight: 600, width: 22 }}>{t.no}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500 }}>{t.zh}</div>
                  <div style={{ fontSize: 10, color: theme.inkMute, fontFamily: theme.mono }}>p.{String(i+1).padStart(3, '0')}</div>
                </div>
                <div style={{ fontSize: 9, color: theme.inkMute, letterSpacing: 1, marginTop: 2 }}>{t.en} · {t.num} ITEMS · {t.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <window.TabBar theme={theme} active="home"/>
    </window.Phone>
  );
}

function SchemeC_FlashCard({ theme }) {
  const [flipped, setFlipped] = useStateC(false);
  const w = window.SAMPLE_WORDS[0];
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <window.PaperTexture theme={theme} opacity={0.4}/>
        <div style={{ padding: '6px 22px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.lineStrong}` }}>
          <window.Icon.X s={17} c={theme.inkSoft}/>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute, fontFamily: theme.serif }}>第參回 · 03 / 12</div>
          <window.Icon.More s={17} c={theme.inkSoft}/>
        </div>
        <div style={{ display: 'flex', gap: 1, padding: '8px 22px 0' }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 2, background: i < 3 ? theme.accent : theme.line }}/>
          ))}
        </div>

        <div style={{ flex: 1, padding: '20px 22px', display: 'flex', alignItems: 'center' }}>
          <div onClick={() => setFlipped(!flipped)} style={{
            width: '100%', aspectRatio: 0.75, background: theme.paper,
            border: `1.5px solid ${theme.lineStrong}`, position: 'relative',
            display: 'flex', flexDirection: 'column', padding: 28,
          }}>
            {/* 四角裝飾 */}
            {[[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,1,0,0]].map(([t,b,l,r], i) => {
              const pos = { top: t ? 8 : 'auto', bottom: b ? 8 : 'auto', left: l ? 8 : 'auto', right: r ? 8 : 'auto' };
              return <div key={i} style={{ position: 'absolute', ...pos, width: 10, height: 10,
                borderTop: t ? `1px solid ${theme.accent}` : 'none',
                borderBottom: b ? `1px solid ${theme.accent}` : 'none',
                borderLeft: l ? `1px solid ${theme.accent}` : 'none',
                borderRight: r ? `1px solid ${theme.accent}` : 'none', }}/>;
            })}

            {!flipped ? (
              <>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 9, letterSpacing: 3, color: theme.inkMute, textTransform: 'uppercase' }}>動 詞 · VERB</div>
                  <div style={{ height: 0.5, width: 30, background: theme.lineStrong, margin: '8px auto' }}/>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                  <div style={{ fontFamily: theme.serif, fontSize: 40, fontWeight: 500, color: theme.ink, letterSpacing: -0.3 }}>
                    {w.en}
                  </div>
                  <div style={{ fontFamily: theme.mono, fontSize: 13, color: theme.accent, padding: '3px 10px', border: `0.5px solid ${theme.accent}` }}>{w.ipa}</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${theme.lineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <window.Icon.Speaker s={16} c={theme.ink}/>
                    </div>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', border: `1px solid ${theme.lineStrong}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <window.Icon.Bookmark s={14} c={theme.ink}/>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 9, color: theme.inkMute, letterSpacing: 3, textAlign: 'center' }}>— TAP TO REVEAL —</div>
              </>
            ) : (
              <>
                <div style={{ fontFamily: theme.serif, fontSize: 22, color: theme.ink, fontWeight: 500 }}>{w.en}</div>
                <div style={{ fontSize: 10, color: theme.inkMute, letterSpacing: 1, marginTop: 4 }}>{w.ipa} · {w.pos}</div>
                <div style={{ height: 1, background: theme.lineStrong, margin: '12px 0' }}/>
                <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>釋 義</div>
                <div style={{ fontFamily: theme.serif, fontSize: 16, color: theme.ink, fontWeight: 500, marginTop: 4 }}>{w.zh}</div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute, marginTop: 14 }}>例 文</div>
                <div style={{ fontFamily: theme.serif, fontSize: 12, color: theme.ink, lineHeight: 1.6, fontStyle: 'italic', marginTop: 4 }}>
                  "{w.example}"
                </div>
                <div style={{ fontSize: 10, color: theme.inkSoft, marginTop: 4, lineHeight: 1.5 }}>{w.exampleZh}</div>
                <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute, marginTop: 14 }}>類 義 · 反 義</div>
                <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 11, fontFamily: theme.serif }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: theme.accent2, fontSize: 9, letterSpacing: 1 }}>SYN</div>
                    <div style={{ color: theme.ink, marginTop: 2 }}>{w.synonyms.join('、')}</div>
                  </div>
                  <div style={{ width: 0.5, background: theme.line }}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: theme.accent2, fontSize: 9, letterSpacing: 1 }}>ANT</div>
                    <div style={{ color: theme.ink, marginTop: 2 }}>{w.antonyms.join('、')}</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{ padding: '8px 22px 22px' }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: theme.inkMute, textAlign: 'center', marginBottom: 10 }}>— 自 己 評 価 —</div>
          <div style={{ display: 'flex', border: `1px solid ${theme.lineStrong}`, background: theme.paper }}>
            {[
              { key: '陌生', sub: '1m', color: theme.accent2 },
              { key: '不熟', sub: '10m', color: theme.inkSoft },
              { key: '熟記', sub: '3d', color: theme.accent },
            ].map((b, i) => (
              <div key={b.key} style={{
                flex: 1, padding: '12px 4px', textAlign: 'center',
                borderRight: i < 2 ? `1px solid ${theme.lineStrong}` : 'none',
                cursor: 'pointer',
              }}>
                <div style={{ fontFamily: theme.serif, fontSize: 15, color: b.color, fontWeight: 600 }}>{b.key}</div>
                <div style={{ fontSize: 9, color: theme.inkMute, marginTop: 2, fontFamily: theme.mono }}>+{b.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </window.Phone>
  );
}

function SchemeC_Quiz({ theme }) {
  const w = window.SAMPLE_WORDS[1];
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <window.PaperTexture theme={theme} opacity={0.4}/>
        <div style={{ padding: '6px 22px 10px', borderBottom: `1px solid ${theme.lineStrong}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <window.Icon.X s={17} c={theme.inkSoft}/>
          <div style={{ fontSize: 11, letterSpacing: 2, color: theme.inkMute, fontFamily: theme.serif }}>小試驗 · 五問目</div>
          <div style={{ fontSize: 11, color: theme.accent, fontFamily: theme.mono, fontWeight: 500 }}>00:42</div>
        </div>

        <div style={{ padding: '14px 22px 4px', display: 'flex', gap: 4 }}>
          {[1,1,1,1,2,0,0,0,0,0].map((s, i) => (
            <div key={i} style={{ flex: 1, height: 4, background: s === 1 ? theme.accent : s === 2 ? theme.accent2 : theme.line }}/>
          ))}
        </div>

        <div style={{ padding: '18px 22px 0' }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: theme.inkMute }}>— QUESTION —</div>
          <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, marginTop: 10, lineHeight: 1.6 }}>
            次の単語の正しい訳を選びなさい。<br/>
            <span style={{ fontSize: 11, color: theme.inkSoft }}>選出以下單字的正確釋義。</span>
          </div>
          <div style={{ marginTop: 14, padding: '24px 0', borderTop: `1px solid ${theme.lineStrong}`, borderBottom: `1px solid ${theme.lineStrong}`, textAlign: 'center', background: theme.paper, position: 'relative' }}>
            <div style={{ position: 'absolute', top: 8, left: 12, fontSize: 9, color: theme.inkMute, letterSpacing: 2 }}>動 · v.</div>
            <div style={{ position: 'absolute', top: 8, right: 12 }}>
              <window.Icon.Speaker s={15} c={theme.inkMute}/>
            </div>
            <div style={{ fontFamily: theme.serif, fontSize: 32, fontWeight: 500, color: theme.ink }}>{w.en}</div>
            <div style={{ fontFamily: theme.mono, fontSize: 11, color: theme.accent, marginTop: 6 }}>{w.ipa}</div>
          </div>
        </div>

        <div style={{ padding: '18px 22px 0', flex: 1 }}>
          {[
            { no: '一', label: '監督する', zh: '監督；管理' },
            { no: '二', label: '割り当てる', zh: '分配；撥出', correct: true },
            { no: '三', label: '手配する', zh: '安排；籌劃' },
            { no: '四', label: '評価する', zh: '評估；估價' },
          ].map((opt, i) => {
            const picked = opt.correct;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px',
                marginBottom: 6, background: picked ? theme.accentSoft : theme.paper,
                border: `1px solid ${picked ? theme.accent : theme.lineStrong}`,
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  border: `1px solid ${picked ? theme.accent : theme.lineStrong}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: theme.serif, fontSize: 13, color: picked ? theme.accent : theme.inkSoft, fontWeight: 600,
                  background: picked ? theme.paper : 'transparent',
                }}>{picked ? <window.Icon.Check s={14} c={theme.accent} w={2.5}/> : opt.no}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 1 }}>{opt.zh}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ padding: '8px 22px 22px' }}>
          <div style={{ padding: '14px 0', textAlign: 'center', background: theme.accent, color: theme.paper, fontFamily: theme.serif, fontSize: 14, fontWeight: 500, letterSpacing: 4, border: `1px solid ${theme.accent}` }}>
            次 へ
          </div>
        </div>
      </div>
    </window.Phone>
  );
}

function SchemeC_List({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, overflow: 'auto', position: 'relative' }}>
        <window.PaperTexture theme={theme} opacity={0.4}/>
        <div style={{ padding: '12px 22px', borderBottom: `1.5px solid ${theme.lineStrong}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: 3, color: theme.inkMute }}>INDEX · 索引</div>
              <div style={{ fontFamily: theme.serif, fontSize: 24, color: theme.ink, fontWeight: 600, marginTop: 2 }}>単語一覧</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <window.Icon.Search s={17} c={theme.ink}/>
              <window.Icon.Filter s={17} c={theme.ink}/>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', padding: '10px 22px 4px', gap: 14, borderBottom: `0.5px solid ${theme.line}`, fontSize: 11, fontFamily: theme.serif }}>
          {['全 600', '熟 247', '習 132', '新 221', '收 18'].map((t, i) => (
            <div key={i} style={{
              paddingBottom: 8, color: i === 0 ? theme.accent : theme.inkSoft,
              borderBottom: i === 0 ? `2px solid ${theme.accent}` : 'none',
              fontWeight: i === 0 ? 600 : 400,
            }}>{t}</div>
          ))}
        </div>

        <div style={{ padding: '10px 22px 4px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.accent, fontWeight: 600 }}>A</div>
          <div style={{ flex: 1, height: 0.5, background: theme.line }}/>
          <div style={{ fontSize: 9, color: theme.inkMute, letterSpacing: 1 }}>14 字</div>
        </div>

        {window.SAMPLE_WORDS.slice(0, 5).map((w, i) => {
          const lvl = w.level === 'familiar' ? { c: theme.accent, ch: '熟' } :
                       w.level === 'learning' ? { c: theme.accent2, ch: '習' } : { c: theme.inkMute, ch: '新' };
          return (
            <div key={i} style={{ display: 'flex', padding: '14px 22px', borderBottom: `0.5px solid ${theme.line}`, gap: 14 }}>
              <div style={{ fontFamily: theme.serif, fontSize: 11, color: theme.inkMute, width: 22, textAlign: 'right', lineHeight: 1.8 }}>
                {String(i+1).padStart(3, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <div style={{ fontFamily: theme.serif, fontSize: 16, color: theme.ink, fontWeight: 500 }}>{w.en}</div>
                  <div style={{ fontFamily: theme.mono, fontSize: 10, color: theme.inkMute }}>{w.ipa}</div>
                </div>
                <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 3, fontFamily: theme.serif }}>
                  <span style={{ color: theme.accent, fontSize: 10 }}>[{w.pos}]</span>  {w.zh}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 22, height: 22, border: `1px solid ${lvl.c}`, color: lvl.c, fontFamily: theme.serif, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{lvl.ch}</div>
                {i === 0 && <window.Icon.Bookmark s={11} c={theme.accent2} filled/>}
              </div>
            </div>
          );
        })}
      </div>
      <window.TabBar theme={theme} active="list"/>
    </window.Phone>
  );
}

function SchemeC_Stats({ theme }) {
  const max = Math.max(...window.STATS.weeklyMinutes);
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, overflow: 'auto', position: 'relative' }}>
        <window.PaperTexture theme={theme} opacity={0.4}/>
        <div style={{ padding: '12px 22px', borderBottom: `1.5px solid ${theme.lineStrong}` }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: theme.inkMute }}>STATISTICS · 學習記錄</div>
          <div style={{ fontFamily: theme.serif, fontSize: 24, color: theme.ink, fontWeight: 600, marginTop: 2 }}>学習の足跡</div>
        </div>

        <div style={{ padding: '18px 22px 14px' }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>總體進度</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 8 }}>
            <div>
              <div style={{ fontFamily: theme.serif, fontSize: 48, color: theme.ink, fontWeight: 600, lineHeight: 1 }}>41<span style={{ color: theme.accent }}>.2</span><span style={{ fontSize: 16 }}>%</span></div>
              <div style={{ fontSize: 11, color: theme.inkSoft, fontFamily: theme.serif, marginTop: 4 }}>247 語 / 600 語</div>
            </div>
            <div style={{ flex: 1, height: 2, background: theme.lineStrong, marginBottom: 10 }}/>
          </div>
          <div style={{ marginTop: 14, display: 'flex', border: `1px solid ${theme.lineStrong}`, height: 10 }}>
            <div style={{ flex: 247, background: theme.accent }}/>
            <div style={{ flex: 132, background: theme.accent2, borderLeft: `1px solid ${theme.paper}` }}/>
            <div style={{ flex: 221, background: 'transparent' }}/>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: theme.inkSoft, fontFamily: theme.mono }}>
            <span>熟 247</span><span>習 132</span><span>新 221</span>
          </div>
        </div>

        <div style={{ padding: '4px 22px 18px', borderTop: `1px solid ${theme.lineStrong}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute }}>本週學習</div>
            <div style={{ fontSize: 11, color: theme.ink, fontFamily: theme.serif, fontWeight: 500 }}>計 153 分</div>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 80, marginTop: 14, borderBottom: `1px solid ${theme.lineStrong}`, paddingBottom: 4 }}>
            {window.STATS.weeklyMinutes.map((m, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ fontSize: 9, color: theme.inkMute, fontFamily: theme.mono }}>{m || '—'}</div>
                <div style={{ width: '100%', height: 50, display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: `${(m/max)*100}%`, background: i === 4 ? theme.accent : theme.lineStrong }}/>
                </div>
                <div style={{ fontSize: 10, color: i === 6 ? theme.accent : theme.ink, fontFamily: theme.serif }}>{window.STATS.weekDays[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '14px 22px 20px', borderTop: `1px solid ${theme.lineStrong}` }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute, marginBottom: 10 }}>近八週軌跡</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 2 }}>
            {Array.from({ length: 56 }).map((_, i) => {
              const v = [0, 0.15, 0.3, 0.5, 0.7, 0.9][Math.floor(Math.random() * 6)];
              return <div key={i} style={{
                aspectRatio: '1',
                background: v === 0 ? 'transparent' : theme.accent,
                opacity: v === 0 ? 1 : v,
                border: `0.5px solid ${theme.line}`,
              }}/>;
            })}
          </div>
        </div>
      </div>
      <window.TabBar theme={theme} active="stats"/>
    </window.Phone>
  );
}

function SchemeC_Review({ theme }) {
  return (
    <window.Phone theme={theme}>
      <window.StatusBar theme={theme}/>
      <div style={{ flex: 1, background: theme.bg, overflow: 'auto', position: 'relative' }}>
        <window.PaperTexture theme={theme} opacity={0.4}/>
        <div style={{ padding: '12px 22px', borderBottom: `1.5px solid ${theme.lineStrong}` }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: theme.inkMute }}>REVIEW · 復習排程</div>
          <div style={{ fontFamily: theme.serif, fontSize: 24, color: theme.ink, fontWeight: 600, marginTop: 2 }}>復習の予定</div>
        </div>

        <div style={{ margin: '18px 22px 0', padding: 22, border: `2px solid ${theme.accent}`, background: theme.paper, position: 'relative' }}>
          <div style={{ position: 'absolute', top: -10, left: 16, padding: '2px 10px', background: theme.accent, color: theme.paper, fontSize: 10, letterSpacing: 3, fontFamily: theme.serif, fontWeight: 500 }}>URGENT · 急</div>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute, marginTop: 6 }}>本日復習待</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 44, color: theme.ink, fontWeight: 600, lineHeight: 1 }}>12</div>
            <div style={{ fontSize: 13, color: theme.inkSoft, fontFamily: theme.serif }}>語</div>
          </div>
          <div style={{ fontSize: 11, color: theme.inkSoft, marginTop: 2 }}>估計耗時 6 分</div>
          <div style={{ marginTop: 14, padding: '10px 0', textAlign: 'center', background: theme.accent, color: theme.paper, fontFamily: theme.serif, fontSize: 13, letterSpacing: 4, fontWeight: 500 }}>
            開 始 復 習
          </div>
        </div>

        <div style={{ padding: '18px 22px 6px', fontSize: 10, letterSpacing: 3, color: theme.inkMute, borderBottom: `0.5px solid ${theme.line}` }}>— SCHEDULE · 今後の予定 —</div>

        {window.REVIEW_SCHEDULE.slice(1).map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 22px', borderBottom: `0.5px solid ${theme.line}`, gap: 14 }}>
            <div style={{ fontFamily: theme.serif, fontSize: 13, color: theme.inkMute, width: 22, fontWeight: 500 }}>
              {['二','三','四','五'][i]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: theme.serif, fontSize: 14, color: theme.ink, fontWeight: 500 }}>{r.label}</div>
              <div style={{ fontSize: 10, color: theme.inkMute, marginTop: 2 }}>間隔 {['1','3','7','14'][i]} 日 · 遺忘曲線基準</div>
            </div>
            <div style={{ fontFamily: theme.serif, fontSize: 18, color: theme.ink, fontWeight: 600 }}>{r.count}<span style={{ fontSize: 10, color: theme.inkMute, fontWeight: 400 }}> 語</span></div>
          </div>
        ))}

        {/* 遺忘曲線 */}
        <div style={{ margin: '14px 22px 22px', padding: '14px 0', borderTop: `1px solid ${theme.lineStrong}`, borderBottom: `1px solid ${theme.lineStrong}` }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: theme.inkMute, marginBottom: 10 }}>FORGETTING CURVE · 遺忘曲線</div>
          <svg width="100%" height="100" viewBox="0 0 280 100">
            <line x1="20" y1="90" x2="280" y2="90" stroke={theme.lineStrong}/>
            <line x1="20" y1="10" x2="20" y2="90" stroke={theme.lineStrong}/>
            {[25, 50, 75].map(y => (
              <line key={y} x1="20" x2="280" y1={y+5} y2={y+5} stroke={theme.line} strokeDasharray="1 3"/>
            ))}
            <path d="M20,15 Q50,55 90,70 T170,85 T280,90" stroke={theme.accent} strokeWidth="1.5" fill="none"/>
            {[[20,15],[90,70],[170,85],[240,88]].map(([x,y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="3" fill={theme.paper} stroke={theme.accent} strokeWidth="1.5"/>
                <text x={x} y={99} fontSize="8" fill={theme.inkMute} textAnchor="middle" fontFamily={theme.mono}>
                  {['0','1d','3d','7d'][i]}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
      <window.TabBar theme={theme} active="review"/>
    </window.Phone>
  );
}

Object.assign(window, {
  SchemeC_Dashboard, SchemeC_FlashCard, SchemeC_Quiz,
  SchemeC_List, SchemeC_Stats, SchemeC_Review,
});
