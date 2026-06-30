/* ═══════════════════════════════════════════════
   APP.JS — TOEIC 600 單字 App 應用程式邏輯
═══════════════════════════════════════════════ */

const LS_KEY          = 'toeic_mastered';
const LS_DARK         = 'toeic_dark';
const LS_STREAK       = 'toeic_streak';
const LS_LAST_OPEN    = 'toeic_last_open';
const LS_WEEK         = 'toeic_week_activity';
const LS_HEATMAP      = 'toeic_heatmap';
const LS_CARD_RATINGS = 'toeic_card_ratings';

let words        = [];
let activeFilter = '全部';
let searchQuery  = '';
let activeWordId = null;
let currentPage  = 'home';

/* ── 單字卡狀態 ── */
let cardQueue   = [];
let cardIndex   = 0;
let cardFlipped = false;

/* ── 測驗狀態 ── */
let quizQuestions = [];
let quizIndex     = 0;
let quizScore     = 0;
let quizLocked    = false;

/* ═══ 初始化 ═══ */
function bootstrap() {
  if (typeof WORDS === 'undefined' || !Array.isArray(WORDS)) {
    document.getElementById('page-home').innerHTML = '<div class="notice-box"><strong>資料載入失敗</strong>請確認 data.js 已正確載入</div>';
    return;
  }
  words = WORDS.map(w => ({ ...w }));
  loadMastered();
  loadDarkMode();
  updateStreak();
  renderHome();
  renderSchedule();

  setTimeout(() => { renderWordList(); }, 100);
  setTimeout(() => { renderStats(); }, 200);

  window.addEventListener('message', e => {
    if (e.data?.type === '__activate_edit_mode')   document.getElementById('tweaksPanel').classList.add('open');
    if (e.data?.type === '__deactivate_edit_mode') document.getElementById('tweaksPanel').classList.remove('open');
  });
  window.parent.postMessage({ type: '__edit_mode_available' }, '*');
}

/* ═══ localStorage ═══ */
function loadMastered() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    words.forEach(w => { if (saved[w.id] !== undefined) w.mastered = saved[w.id]; });
  } catch(_) {}
}
function saveMastered() {
  const d = {};
  words.forEach(w => { if (w.mastered) d[w.id] = true; });
  localStorage.setItem(LS_KEY, JSON.stringify(d));
}

function loadDarkMode() {
  const dark = localStorage.getItem(LS_DARK) === 'true';
  document.documentElement.setAttribute('data-dark', dark);
  document.getElementById('darkToggle').classList.toggle('on', dark);
  const icon = document.getElementById('darkIcon');
  if (icon) {
    if (dark) {
      icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    } else {
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>';
    }
  }
}
function toggleDark() {
  const isDark = document.documentElement.getAttribute('data-dark') === 'true';
  const next = !isDark;
  document.documentElement.setAttribute('data-dark', next);
  localStorage.setItem(LS_DARK, next);
  document.getElementById('darkToggle').classList.toggle('on', next);
  const icon = document.getElementById('darkIcon');
  if (icon) {
    if (next) {
      icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    } else {
      icon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>';
    }
  }
}

/* ═══ Streak（連續天數）═══ */
function updateStreak() {
  const today = new Date().toDateString();
  const lastOpen = localStorage.getItem(LS_LAST_OPEN);
  let streak = parseInt(localStorage.getItem(LS_STREAK) || '0', 10);

  if (lastOpen === today) { /* 當天已計算 */ }
  else if (lastOpen === new Date(Date.now() - 86400000).toDateString()) {
    streak += 1;
    localStorage.setItem(LS_STREAK, streak);
  } else if (!lastOpen) {
    streak = 1;
    localStorage.setItem(LS_STREAK, streak);
  } else {
    streak = 1;
    localStorage.setItem(LS_STREAK, streak);
  }
  localStorage.setItem(LS_LAST_OPEN, today);

  try {
    const week = JSON.parse(localStorage.getItem(LS_WEEK) || '{}');
    week[today] = (week[today] || 0) + 1;
    localStorage.setItem(LS_WEEK, JSON.stringify(week));
  } catch(_) {}
}

function getStreak() {
  return parseInt(localStorage.getItem(LS_STREAK) || '0', 10);
}

/* ═══ 頁面切換 ═══ */
function switchPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const tb = document.getElementById('tb-' + page);
  if (tb) tb.classList.add('active');

  document.getElementById('tabBar').style.display = page === 'card' ? 'none' : '';

  currentPage = page;
  if (page === 'quiz')   startQuiz();
  if (page === 'card')   startCardMode();
  if (page === 'stats')  setTimeout(() => renderStats(), 0);
  if (page === 'list')   setTimeout(() => renderWordList(), 0);
}

/* ═══ 首頁 Dashboard ═══ */
function renderHome() {
  const total    = words.length;
  const mastered = words.filter(w => w.mastered).length;
  const pct      = total ? Math.round(mastered / total * 100) : 0;

  // 計算今日已熟記數（依 card ratings 的 ratedAt 日期判斷）
  const today = new Date().toDateString();
  const masteredToday = (() => {
    try {
      const ratings = JSON.parse(localStorage.getItem(LS_CARD_RATINGS) || '{}');
      return Object.values(ratings).filter(r =>
        r.rating === 'got' && new Date(r.ratedAt).toDateString() === today
      ).length;
    } catch(_) { return 0; }
  })();
  const dailyGoal = 20;
  const left = Math.max(0, dailyGoal - masteredToday);

  const now = new Date();
  const dateStr = now.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' });
  document.getElementById('heroDate').textContent = dateStr;
  document.getElementById('heroMastered').textContent = mastered;
  document.getElementById('heroTotal').textContent = total;
  document.getElementById('heroLeft').textContent = left;
  document.getElementById('heroBig').style.width = pct + '%';

  document.getElementById('statStreak').textContent = getStreak();
  document.getElementById('statMastered').textContent = mastered;
  document.getElementById('statDue').textContent = computeDueCount();
  document.getElementById('statTotal').textContent = total;

  document.getElementById('taskCardSub').textContent = `${total - mastered} 字尚未熟記`;
}

/* ═══ 單字卡模式 ═══ */
function startCardMode() {
  const pool = shuffle(words.filter(w => !w.mastered)).slice(0, 20);
  if (!pool.length) {
    document.getElementById('flashcardArea').innerHTML = `
      <div style="text-align:center;padding:40px 22px;color:var(--ink-mute)">
        <div style="font-size:40px;margin-bottom:14px">🎉</div>
        <div style="font-family:var(--serif);font-size:20px;color:var(--ink);margin-bottom:6px">全部熟記！</div>
        <div style="font-size:13px">你已記完所有單字。可在列表中取消標記再練習。</div>
      </div>`;
    document.getElementById('ratingArea').style.display = 'none';
    document.getElementById('cardProgFill').style.width = '100%';
    document.getElementById('cardCounter').textContent = '完成';
    return;
  }
  cardQueue   = pool;
  cardIndex   = 0;
  cardFlipped = false;
  renderCard();
}

function renderCard() {
  if (cardIndex >= cardQueue.length) {
    showCardFinish();
    return;
  }
  const w = cardQueue[cardIndex];
  const pct = cardQueue.length ? Math.round((cardIndex / cardQueue.length) * 100) : 0;
  document.getElementById('cardProgFill').style.width = pct + '%';
  document.getElementById('cardCounter').textContent = `${cardIndex + 1}/${cardQueue.length}`;
  cardFlipped = false;
  document.getElementById('ratingArea').style.display = 'none';

  const hasSyn = w.synonyms && w.synonyms.trim();
  const hasAnt = w.antonyms && w.antonyms.trim();

  document.getElementById('flashcardArea').innerHTML = `
    <div class="flashcard" id="theCard" onclick="flipCard()">
      <div class="flashcard-inner">
      <div class="fc-face fc-front-face">
      <div class="fc-meta">
        <div class="fc-pos-tag">${escHtml(w.pos || 'word')}</div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="${w.mastered ? 'var(--accent)' : 'none'}" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>
      </div>
      <div class="fc-front" id="fcFront">
        <div class="fc-word">${escHtml(w.word)}</div>
        <div class="fc-ipa" id="fcIpa"></div>
        <button class="fc-audio-btn" onclick="speakWord(event,'${escAttr(w.word)}')">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h3l5-4v14l-5-4H5V9z"/><path d="M16 8.5a4 4 0 010 7"/></svg>
        </button>
        <div class="fc-hint">點擊翻面</div>
      </div>
      </div><!-- /fc-front-face -->
      <div class="fc-face fc-back-face">
      <div class="fc-back" id="fcBack">
        <div style="font-family:var(--mono);font-size:13px;color:var(--ink-mute)">${escHtml(w.pos || '')} ${escHtml(w.word)}</div>
        <div class="fc-zh">${escHtml(w.definition)}</div>
        <div class="fc-example-box">
          <div class="fc-example-label">TOEIC 情境例句</div>
          <div class="fc-example" id="fcExample" style="color:var(--ink-mute);font-style:normal;font-size:11px">（例句端口：可從 API 載入）</div>
        </div>
        ${hasSyn ? `<div>
          <div style="font-size:10px;color:var(--ink-mute);letter-spacing:1.5px;margin-bottom:4px">同義詞</div>
          <div class="syn-row">${w.synonyms.split(',').slice(0,4).map(s=>`<span class="syn-chip">${escHtml(s.trim())}</span>`).join('')}</div>
        </div>` : ''}
        ${hasAnt ? `<div>
          <div style="font-size:10px;color:var(--ink-mute);letter-spacing:1.5px;margin-bottom:4px">反義詞</div>
          <div class="syn-row">${w.antonyms.split(',').slice(0,4).map(s=>`<span class="syn-chip" style="color:var(--accent)">${escHtml(s.trim())}</span>`).join('')}</div>
        </div>` : ''}
      </div>
      </div><!-- /fc-back-face -->
      </div><!-- /flashcard-inner -->
    </div>`;
  fetchWordData(w.word);
}

function fetchWordData(word) {
  const cacheKey = 'dict_' + word.toLowerCase().replace(/\s+/g, '_');
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    applyWordData(JSON.parse(cached));
    return;
  }
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`)
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data || !data[0]) return;
      const entry = data[0];
      const result = {
        phonetic: entry.phonetic || (entry.phonetics?.find(p => p.text)?.text) || '',
        example:  entry.meanings?.[0]?.definitions?.[0]?.example || ''
      };
      sessionStorage.setItem(cacheKey, JSON.stringify(result));
      applyWordData(result);
    })
    .catch(() => {});
}

function applyWordData({ phonetic, example }) {
  // 單字卡
  const ipaEl = document.getElementById('fcIpa');
  if (ipaEl && phonetic) ipaEl.textContent = phonetic;
  const exEl = document.getElementById('fcExample');
  if (exEl && example) {
    exEl.textContent = example;
    exEl.style.fontStyle = 'italic';
    exEl.style.color = 'var(--ink-soft)';
    exEl.style.fontSize = '12px';
  }
  // Modal
  const modalIpa = document.getElementById('modalIpa');
  if (modalIpa) modalIpa.textContent = phonetic || '';
  const modalEx = document.getElementById('modalExample');
  const modalExLabel = document.getElementById('modalExLabel');
  if (modalEx && example) {
    modalEx.textContent = example;
    if (modalExLabel) modalExLabel.style.display = '';
  }
  const modalAudioBtn = document.getElementById('modalAudioBtn');
  if (modalAudioBtn) modalAudioBtn.style.display = '';
}

function flipCard() {
  if (cardFlipped) return;
  cardFlipped = true;
  document.getElementById('theCard').classList.add('flipped');
  document.getElementById('ratingArea').style.display = '';
}

function rateCard(rating) {
  const w = cardQueue[cardIndex];
  if (!w) return;

  try {
    const ratings = JSON.parse(localStorage.getItem(LS_CARD_RATINGS) || '{}');
    ratings[w.id] = { rating, ratedAt: Date.now() };
    localStorage.setItem(LS_CARD_RATINGS, JSON.stringify(ratings));
  } catch(_) {}

  if (rating === 'got') {
    w.mastered = true;
    const idx = words.findIndex(x => x.id === w.id);
    if (idx >= 0) words[idx].mastered = true;
    saveMastered();
  }

  try {
    const today = new Date().toDateString();
    const week  = JSON.parse(localStorage.getItem(LS_WEEK) || '{}');
    week[today] = (week[today] || 0) + 1;
    localStorage.setItem(LS_WEEK, JSON.stringify(week));
  } catch(_) {}

  cardIndex++;
  renderCard();
}

function showCardFinish() {
  const mastered = cardQueue.filter(w => w.mastered).length;
  document.getElementById('flashcardArea').innerHTML = `
    <div style="text-align:center;padding:40px 22px;width:100%">
      <div style="font-size:44px;margin-bottom:16px">✨</div>
      <div style="font-family:var(--serif);font-size:22px;color:var(--ink);font-weight:500;margin-bottom:6px">本輪完成！</div>
      <div style="font-size:13px;color:var(--ink-soft);margin-bottom:28px">本次標記熟記 ${mastered} 個字</div>
      <button class="btn btn-primary btn-lg" onclick="startCardMode()">再練一輪</button>
      <div style="height:10px"></div>
      <button class="btn btn-secondary btn-lg" onclick="switchPage('home')">回首頁</button>
    </div>`;
  document.getElementById('ratingArea').style.display = 'none';
  document.getElementById('cardProgFill').style.width = '100%';
  document.getElementById('cardCounter').textContent = '完成';
}

function speakWord(e, word) {
  e.stopPropagation();
  if (!('speechSynthesis' in window)) return;
  const utt = new SpeechSynthesisUtterance(word);
  utt.lang = 'en-US';
  utt.rate = 0.85;
  speechSynthesis.speak(utt);
}

/* ═══ 測驗 ═══ */
function startQuiz() {
  const unmastered = words.filter(w => !w.mastered);
  const el = document.getElementById('quizContent');
  if (unmastered.length < 4) {
    el.innerHTML = `<div class="notice-box"><strong>單字不足</strong>未背過的單字少於 4 個，<br>請先取消部分「已背過」或新增更多字。</div>`;
    return;
  }
  quizQuestions = shuffle([...unmastered]).slice(0, Math.min(10, unmastered.length));
  quizIndex = 0; quizScore = 0; quizLocked = false;
  renderQuizQ();
}

function renderQuizQ() {
  if (quizIndex >= quizQuestions.length) { renderQuizResult(); return; }
  const q = quizQuestions[quizIndex];
  const others = words.filter(w => w.id !== q.id).map(w => w.definition);
  const opts   = shuffle([q.definition, ...shuffle(others).slice(0, 3)]);
  const pct    = Math.round((quizIndex / quizQuestions.length) * 100);

  document.getElementById('quizProgFill').style.width = pct + '%';
  document.getElementById('quizCounter').textContent = `${quizIndex + 1}/${quizQuestions.length}`;

  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-q-card">
      <div class="quiz-q-label">選出正確的中文定義</div>
      <div class="quiz-q-word">${escHtml(q.word)}</div>
      ${q.pos ? `<div class="quiz-q-ipa">${escHtml(q.pos)}</div>` : ''}
    </div>
    <div class="quiz-options">
      ${opts.map((opt, i) => `
        <button class="quiz-opt" data-opt="${escAttr(opt)}" onclick="selectOpt(this,'${escAttr(q.definition)}')">
          <div class="quiz-opt-letter">${'ABCD'[i]}</div>
          ${escHtml(opt)}
        </button>`).join('')}
    </div>`;
  quizLocked = false;
}

function selectOpt(btn, correct) {
  if (quizLocked) return;
  quizLocked = true;
  document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
  const chosen = btn.getAttribute('data-opt');
  if (chosen === correct) { btn.classList.add('correct'); quizScore++; }
  else {
    btn.classList.add('wrong');
    document.querySelectorAll('.quiz-opt').forEach(b => { if (b.getAttribute('data-opt') === correct) b.classList.add('correct'); });
  }
  setTimeout(() => { quizIndex++; renderQuizQ(); }, 1100);
}

function renderQuizResult() {
  const pct = Math.round(quizScore / quizQuestions.length * 100);
  const msg = pct === 100 ? '完美！全部答對！' : pct >= 70 ? '答得不錯，繼續加油！' : '再接再厲，多練習幾次！';
  document.getElementById('quizProgFill').style.width = '100%';
  document.getElementById('quizCounter').textContent = '完成';
  document.getElementById('quizContent').innerHTML = `
    <div class="quiz-result-wrap">
      <div class="qr-label">本次得分</div>
      <div class="qr-score">${quizScore}<span class="qr-total"> / ${quizQuestions.length}</span></div>
      <div class="qr-msg">${msg}（正確率 ${pct}%）</div>
      <div class="qr-actions">
        <button class="btn btn-secondary" style="flex:1" onclick="switchPage('home')">回首頁</button>
        <button class="btn btn-primary" style="flex:1" onclick="startQuiz()">再挑戰</button>
      </div>
    </div>`;
}

/* ═══ 單字列表（分批載入）═══ */
const LIST_PAGE_SIZE = 40;
let filteredList = [];
let listRendered = 0;
let listObserver = null;

function setFilter(cat, el) {
  activeFilter = cat;
  document.querySelectorAll('#listChips .chip').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderWordList();
}

function handleSearch() {
  searchQuery = document.getElementById('searchInput').value.toLowerCase();
  renderWordList();
}

function buildFilteredList() {
  let list = words;
  if (activeFilter === 'A2')   list = list.filter(w => w.category === 'A2');
  else if (activeFilter === 'B1')   list = list.filter(w => w.category === 'B1');
  else if (activeFilter === '常見') list = list.filter(w => w.category === '常見');
  else if (activeFilter === '熟記') list = list.filter(w => w.mastered);
  else if (activeFilter === '未記') list = list.filter(w => !w.mastered);
  if (searchQuery) {
    list = list.filter(w =>
      w.word.toLowerCase().includes(searchQuery) ||
      w.definition.toLowerCase().includes(searchQuery)
    );
  }
  return list;
}

function wordRowHTML(w) {
  return `<div class="word-row" onclick="openModal(${w.id})">
    <div class="word-row-status ${w.mastered ? 'mastered' : 'unmastered'}">${w.mastered ? '✓' : ''}</div>
    <div class="word-row-body">
      <div class="word-row-en">${escHtml(w.word)}<span class="word-row-pos">${escHtml(w.pos || '')}</span></div>
      <div class="word-row-zh">${escHtml(w.definition)}</div>
    </div>
    <span class="word-row-arrow">›</span>
  </div>`;
}

function renderWordList() {
  const scroll = document.getElementById('wordListScroll');
  if (listObserver) { listObserver.disconnect(); listObserver = null; }

  filteredList = buildFilteredList();
  listRendered = 0;

  if (!filteredList.length) {
    scroll.innerHTML = '<div class="notice-box"><strong>沒有符合條件的單字</strong></div>';
    return;
  }

  const firstBatch = filteredList.slice(0, LIST_PAGE_SIZE);
  scroll.innerHTML = firstBatch.map(wordRowHTML).join('');
  listRendered = firstBatch.length;

  if (listRendered >= filteredList.length) return;

  const sentinel = document.createElement('div');
  sentinel.id = 'list-sentinel';
  sentinel.style.height = '1px';
  scroll.appendChild(sentinel);

  listObserver = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    const nextBatch = filteredList.slice(listRendered, listRendered + LIST_PAGE_SIZE);
    const frag = document.createDocumentFragment();
    nextBatch.forEach(w => {
      const div = document.createElement('div');
      div.innerHTML = wordRowHTML(w);
      frag.appendChild(div.firstElementChild);
    });
    sentinel.before(frag);
    listRendered += nextBatch.length;
    if (listRendered >= filteredList.length) {
      listObserver.disconnect();
      listObserver = null;
      sentinel.remove();
    }
  }, { root: scroll, threshold: 0 });

  listObserver.observe(sentinel);
}

/* ═══ Modal ═══ */
function openModal(id) {
  const w = words.find(x => x.id === id);
  if (!w) return;
  activeWordId = id;
  document.getElementById('modalEn').textContent  = w.word;
  document.getElementById('modalPos').textContent  = w.pos || '';
  document.getElementById('modalDef').textContent  = w.definition;
  const synEl = document.getElementById('modalSyn');
  const antEl = document.getElementById('modalAnt');
  synEl.textContent = w.synonyms || '';
  antEl.textContent = w.antonyms || '';
  document.getElementById('modalSynLabel').style.display = w.synonyms ? '' : 'none';
  document.getElementById('modalAntLabel').style.display = w.antonyms ? '' : 'none';
  updateModalBtn(w.mastered);
  // 重置 Modal 的動態欄位
  document.getElementById('modalIpa').textContent = '';
  document.getElementById('modalExample').textContent = '';
  const exLabel = document.getElementById('modalExLabel');
  if (exLabel) exLabel.style.display = 'none';
  const audioBtn = document.getElementById('modalAudioBtn');
  if (audioBtn) audioBtn.style.display = 'none';
  // 非同步抓取音標與例句
  fetchWordData(w.word);
  document.getElementById('modalOverlay').classList.add('open');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  activeWordId = null;
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
function updateModalBtn(mastered) {
  const btn = document.getElementById('modalMasterBtn');
  btn.textContent = mastered ? '✓ 已熟記（點擊取消）' : '標記為已背過';
  btn.classList.toggle('is-mastered', mastered);
}
function toggleMastered() {
  const w = words.find(x => x.id === activeWordId);
  if (!w) return;
  w.mastered = !w.mastered;
  saveMastered();
  renderHome();
  renderWordList();
  renderStats();
  updateModalBtn(w.mastered);
}

/* ═══ 複習排程（SM-2 間隔重複）═══ */
function computeDueCount() {
  try {
    const ratings = JSON.parse(localStorage.getItem(LS_CARD_RATINGS) || '{}');
    const now = Date.now();
    const intervals = { new: 60 * 1000, shaky: 10 * 60 * 1000, got: 3 * 24 * 60 * 60 * 1000 };
    return Object.entries(ratings).filter(([id, r]) => {
      const w = words.find(x => String(x.id) === String(id));
      if (!w || w.mastered) return false;
      const due = r.ratedAt + (intervals[r.rating] || 0);
      return due <= now;
    }).length;
  } catch(_) { return 0; }
}

function renderSchedule() {
  const dueCount = computeDueCount();
  document.getElementById('reviewDueCount').textContent = dueCount + ' 字';
  document.getElementById('reviewDueSub').textContent   = dueCount > 0 ? `約需 ${Math.ceil(dueCount * 0.5)} 分鐘` : '今日沒有到期的複習';
  document.getElementById('statDue').textContent = dueCount;

  // 動態計算各時間段的到期字數
  try {
    const ratings = JSON.parse(localStorage.getItem(LS_CARD_RATINGS) || '{}');
    const now = Date.now();
    const slots = [
      { label: '明天',   ms: 24 * 3600000,  interval: '1d' },
      { label: '3 天後', ms: 3 * 24 * 3600000, interval: '3d' },
      { label: '7 天後', ms: 7 * 24 * 3600000, interval: '7d' },
      { label: '14 天後',ms: 14 * 24 * 3600000, interval: '14d' },
    ];
    const intervals = { new: 60 * 1000, shaky: 10 * 60 * 1000, got: 3 * 24 * 60 * 60 * 1000 };
    const schedule = slots.map(slot => {
      const count = Object.entries(ratings).filter(([id, r]) => {
        const w = words.find(x => String(x.id) === String(id));
        if (!w || w.mastered) return false;
        const due = r.ratedAt + (intervals[r.rating] || 0);
        return due > now && due <= now + slot.ms;
      }).length;
      return { ...slot, count };
    });
    document.getElementById('scheduleList').innerHTML = schedule.map(r => `
      <div class="schedule-row">
        <div class="schedule-count-box">
          <div class="schedule-count-num">${r.count}</div>
          <div class="schedule-count-unit">字</div>
        </div>
        <div style="flex:1">
          <div class="schedule-label">${r.label}</div>
          <div class="schedule-sub">間隔 ${r.interval} · 依遺忘曲線排程</div>
        </div>
      </div>`).join('');
  } catch(_) {
    document.getElementById('scheduleList').innerHTML = '';
  }
}

/* ═══ 統計頁 ═══ */
function renderStats() {
  const total    = words.length;
  const mastered = words.filter(w => w.mastered).length;
  const learning = (() => {
    try {
      const ratings = JSON.parse(localStorage.getItem(LS_CARD_RATINGS) || '{}');
      return Object.entries(ratings).filter(([id, r]) => {
        const w = words.find(x => String(x.id) === String(id));
        return w && !w.mastered && (r.rating === 'new' || r.rating === 'shaky');
      }).length;
    } catch(_) { return 0; }
  })();
  const newWords = total - mastered - learning;
  const pct = total ? mastered / total : 0;

  document.getElementById('lgMastered').textContent = mastered;
  document.getElementById('lgLearning').textContent = learning;
  document.getElementById('lgNew').textContent      = newWords;

  const size = 88, stroke = 5, r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  document.getElementById('overallRing').innerHTML = `
    <div class="ring-wrap">
      <svg width="${size}" height="${size}" style="transform:rotate(-90deg)">
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--line)" stroke-width="${stroke}"/>
        <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--accent2)" stroke-width="${stroke}"
          stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}"/>
      </svg>
      <div class="ring-label" style="font-family:var(--serif);font-size:16px;font-weight:500;color:var(--ink)">
        ${Math.round(pct * 100)}%
        <div style="font-size:9px;color:var(--ink-mute);letter-spacing:.5px">DONE</div>
      </div>
    </div>`;

  const week = (() => { try { return JSON.parse(localStorage.getItem(LS_WEEK) || '{}'); } catch(_) { return {}; } })();
  const days = ['一','二','三','四','五','六','日'];
  const today = new Date();
  const bars = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() - (6 - i));
    const count = week[d.toDateString()] || 0;
    return { day: days[d.getDay() === 0 ? 6 : d.getDay() - 1], count, isToday: i === 6 };
  });
  const maxCount = Math.max(...bars.map(b => b.count), 1);
  const weekTotalCount = bars.reduce((s, b) => s + b.count, 0);
  document.getElementById('weekTotal').textContent = weekTotalCount + ' 次';
  document.getElementById('weekBars').innerHTML = bars.map(b => `
    <div class="bar-col">
      <div class="bar-val">${b.count || ''}</div>
      <div class="bar-track">
        <div class="bar-fill" style="height:${Math.max(4, (b.count/maxCount)*60)}px;background:${b.isToday ? 'linear-gradient(180deg,var(--accent),var(--accent2))' : 'var(--accent2)90'}"></div>
      </div>
      <div class="bar-day ${b.isToday ? 'today' : ''}">${b.day}</div>
    </div>`).join('');

  const heatmap = (() => { try { return JSON.parse(localStorage.getItem(LS_WEEK) || '{}'); } catch(_) { return {}; } })();
  document.getElementById('heatmapGrid').innerHTML = Array.from({ length: 56 }, (_, i) => {
    const d = new Date(today); d.setDate(today.getDate() - (55 - i));
    const v = heatmap[d.toDateString()] || 0;
    const opacity = v === 0 ? '' : v < 3 ? '40' : v < 8 ? '70' : '';
    const bg = v === 0 ? 'var(--line)' : `var(--accent)${opacity}`;
    return `<div class="heatmap-cell" style="background:${bg}"></div>`;
  }).join('');
}

/* ═══ 工具函式 ═══ */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function escHtml(str) {
  return String(str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(str) {
  return String(str||'').replace(/'/g,'&#39;').replace(/"/g,'&quot;');
}

bootstrap();
