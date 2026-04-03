/* ===========================
   TOEIC 600 單字練習 App
   app.js — 所有應用程式邏輯
   =========================== */

const LS_KEY = 'toeic_mastered'; // localStorage 鍵值

// 工作陣列：從 data.js 的 WORDS 深複製一份
let words = [];

// 目前在 Modal 中顯示的單字 id
let activeWordId = null;

// 目前篩選的分類
let activeFilter = '全部';

// 測驗狀態
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizLocked = false;

/* ===========================
   初始化
   =========================== */
function init() {
  loadMastered();
  renderProgress();
  renderWordList();
}

function renderFatalError(message) {
  const progressLabel = document.getElementById('progressLabel');
  const wordList = document.getElementById('wordList');

  if (progressLabel) progressLabel.textContent = '載入失敗';
  if (wordList) {
    wordList.innerHTML = `<div class="notice"><strong>${escHtml(message)}</strong></div>`;
  }
}

function bootstrap() {
  try {
    if (typeof WORDS === 'undefined' || !Array.isArray(WORDS)) {
      throw new Error('data.js 載入失敗，WORDS 資料不存在');
    }

    words = WORDS.map(w => ({ ...w }));
    init();
  } catch (error) {
    console.error(error);
    renderFatalError(error && error.message ? error.message : '初始化失敗');
  }
}

/* ===========================
   localStorage 讀寫
   =========================== */
function loadMastered() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    words.forEach(w => {
      if (saved[w.id] !== undefined) w.mastered = saved[w.id];
    });
  } catch (_) { /* 若資料損毀則忽略 */ }
}

function saveMastered() {
  const data = {};
  words.forEach(w => { if (w.mastered) data[w.id] = true; });
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

/* ===========================
   進度條
   =========================== */
function renderProgress() {
  const total    = words.length;
  const mastered = words.filter(w => w.mastered).length;
  const pct      = total ? Math.round(mastered / total * 100) : 0;

  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent =
    `已背過 ${mastered} / ${total}（${pct}%）`;
}

/* ===========================
   分頁切換
   =========================== */
function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));

  document.getElementById('tab' + capitalize(tab)).classList.add('active');
  document.getElementById('page' + capitalize(tab)).classList.add('active');

  if (tab === 'quiz') startQuiz();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ===========================
   單字列表
   =========================== */
function setFilter(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === cat);
  });
  renderWordList();
}

function renderWordList() {
  const container = document.getElementById('wordList');
  container.innerHTML = '';

  const list = activeFilter === '全部' ? words : words.filter(w => w.category === activeFilter);

  list.forEach(w => {
    const card = document.createElement('div');
    card.className = 'word-card' + (w.mastered ? ' mastered' : '');
    card.setAttribute('data-id', w.id);
    card.innerHTML = `
      <div class="card-left">
        <div class="card-word">${escHtml(w.word)}${w.pos ? `<span class="card-pos">${escHtml(w.pos)}</span>` : ''}</div>
      </div>
      ${w.mastered ? '<span class="card-badge">已背過</span>' : ''}
      <span class="card-arrow">›</span>
    `;
    card.addEventListener('click', () => openModal(w.id));
    container.appendChild(card);
  });
  if (!list.length) {
    container.innerHTML = '<div class="notice"><strong>此分類沒有單字</strong></div>';
  }
}

/* ===========================
   Modal 彈出視窗
   =========================== */
function openModal(id) {
  const w = words.find(x => x.id === id);
  if (!w) return;
  activeWordId = id;

  document.getElementById('modalWord').textContent       = w.word;
  document.getElementById('modalPos').textContent        = w.pos || '';
  document.getElementById('modalDefinition').textContent = w.definition;

  const synEl  = document.getElementById('modalSynonyms');
  const antEl  = document.getElementById('modalAntonyms');
  const synLbl = document.getElementById('modalSynLabel');
  const antLbl = document.getElementById('modalAntLabel');

  synEl.textContent = w.synonyms || '';
  antEl.textContent = w.antonyms || '';
  synLbl.style.display = w.synonyms ? '' : 'none';
  antLbl.style.display = w.antonyms ? '' : 'none';

  updateModalBtn(w.mastered);
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
  const btn = document.getElementById('modalMasteredBtn');
  btn.textContent = mastered ? '✓ 已背過（點擊取消）' : '標記為已背過';
  btn.classList.toggle('is-mastered', mastered);
}

function toggleMasteredFromModal() {
  const w = words.find(x => x.id === activeWordId);
  if (!w) return;
  w.mastered = !w.mastered;
  saveMastered();
  renderProgress();
  renderWordList();
  updateModalBtn(w.mastered);
}

/* ===========================
   測驗
   =========================== */
function startQuiz() {
  const unmastered = words.filter(w => !w.mastered);
  const container  = document.getElementById('quizWrap');

  if (unmastered.length < 4) {
    container.innerHTML = `
      <div class="notice">
        <strong>單字不足</strong>
        目前「未背過」的單字少於 4 個，<br>
        無法產生四選一選擇題。<br><br>
        請先在單字列表中取消部分「已背過」的標記，<br>
        或新增更多單字至 data.js。
      </div>`;
    return;
  }

  // 隨機抽題（最多 10 題）
  const shuffled   = shuffle([...unmastered]);
  quizQuestions    = shuffled.slice(0, Math.min(10, shuffled.length));
  quizIndex        = 0;
  quizScore        = 0;
  quizLocked       = false;

  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (quizIndex >= quizQuestions.length) {
    renderQuizResult();
    return;
  }

  const q          = quizQuestions[quizIndex];
  const otherDefs  = words.filter(w => w.id !== q.id).map(w => w.definition);
  const distractors= shuffle(otherDefs).slice(0, 3);
  const options    = shuffle([q.definition, ...distractors]);

  const container  = document.getElementById('quizWrap');
  container.innerHTML = `
    <div class="quiz-counter">第 ${quizIndex + 1} 題 / 共 ${quizQuestions.length} 題</div>
    <div class="quiz-question-card">
      <div class="quiz-question-word">${escHtml(q.word)}</div>
    </div>
    <div class="quiz-options" id="quizOptions">
      ${options.map((opt, i) => `
        <button class="quiz-option-btn" data-opt="${escAttr(opt)}" onclick="selectOption(this, '${escAttr(q.definition)}')">
          ${escHtml(opt)}
        </button>
      `).join('')}
    </div>
  `;
  quizLocked = false;
}

function selectOption(btn, correctDef) {
  if (quizLocked) return;
  quizLocked = true;

  const allBtns = document.querySelectorAll('.quiz-option-btn');
  allBtns.forEach(b => b.disabled = true);

  const chosen = btn.getAttribute('data-opt');
  if (chosen === correctDef) {
    btn.classList.add('correct');
    quizScore++;
  } else {
    btn.classList.add('wrong');
    // 同時標出正確答案
    allBtns.forEach(b => {
      if (b.getAttribute('data-opt') === correctDef) b.classList.add('correct');
    });
  }

  setTimeout(() => {
    quizIndex++;
    renderQuizQuestion();
  }, 1100);
}

function renderQuizResult() {
  const total   = quizQuestions.length;
  const pct     = Math.round(quizScore / total * 100);
  let message   = '';
  if (pct === 100) message = '完美！全部答對！';
  else if (pct >= 70) message = '答得不錯，繼續加油！';
  else message = '再接再厲，多練習幾次！';

  document.getElementById('quizWrap').innerHTML = `
    <div class="quiz-result">
      <div class="result-score-label">本次得分</div>
      <div class="result-score">
        ${quizScore}<span class="result-total"> / ${total}</span>
      </div>
      <div class="result-message">${message}（正確率 ${pct}%）</div>
      <div class="result-actions">
        <button class="btn btn-close" onclick="switchTab('wordlist')">回列表</button>
        <button class="btn btn-mastered is-mastered" onclick="startQuiz()">再挑戰</button>
      </div>
    </div>
  `;
}

/* ===========================
   工具函式
   =========================== */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(str) {
  return String(str).replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

/* ===========================
   啟動
   =========================== */
bootstrap();
