// data.jsx — 共用資料
const SAMPLE_WORDS = [
  {
    en: 'acknowledge', ipa: '/əkˈnɑː.lɪdʒ/', pos: 'v.',
    zh: '承認；確認收到',
    example: 'Please acknowledge receipt of this email by Friday.',
    exampleZh: '請於週五前確認收到此封郵件。',
    synonyms: ['admit', 'confirm', 'recognize'],
    antonyms: ['deny', 'ignore'],
    level: 'familiar', // familiar | learning | new
  },
  {
    en: 'allocate', ipa: '/ˈæl.ə.keɪt/', pos: 'v.',
    zh: '分配；撥出',
    example: 'The manager will allocate the budget among all departments.',
    exampleZh: '經理將把預算分配給各部門。',
    synonyms: ['assign', 'distribute'],
    antonyms: ['withhold'],
    level: 'learning',
  },
  {
    en: 'beneficial', ipa: '/ˌben.əˈfɪʃ.əl/', pos: 'adj.',
    zh: '有益的；有利的',
    example: 'Regular exercise is beneficial to your health.',
    exampleZh: '規律運動對健康有益。',
    synonyms: ['helpful', 'advantageous'],
    antonyms: ['harmful', 'detrimental'],
    level: 'new',
  },
  {
    en: 'consecutive', ipa: '/kənˈsek.jə.t̬ɪv/', pos: 'adj.',
    zh: '連續的',
    example: 'She has won the award for three consecutive years.',
    exampleZh: '她連續三年獲得此獎。',
    synonyms: ['successive', 'sequential'],
    antonyms: ['alternating'],
    level: 'learning',
  },
  {
    en: 'diligent', ipa: '/ˈdɪl.ə.dʒənt/', pos: 'adj.',
    zh: '勤奮的；用功的',
    example: 'He is a diligent worker who rarely takes breaks.',
    exampleZh: '他是一位勤奮的員工，很少休息。',
    synonyms: ['hardworking', 'industrious'],
    antonyms: ['lazy'],
    level: 'new',
  },
];

// Dashboard 統計
const STATS = {
  streak: 23,
  todayGoal: 30,
  todayDone: 18,
  totalMastered: 247,
  totalWords: 600,
  weeklyMinutes: [18, 25, 0, 32, 41, 15, 22],
  weekDays: ['一', '二', '三', '四', '五', '六', '日'],
};

// 複習排程
const REVIEW_SCHEDULE = [
  { label: '今天', count: 12, due: true, words: ['acknowledge', 'allocate', 'brief'] },
  { label: '明天', count: 8, due: false, words: ['deadline', 'efficient'] },
  { label: '後天', count: 15, due: false, words: [] },
  { label: '3 天後', count: 22, due: false, words: [] },
  { label: '7 天後', count: 34, due: false, words: [] },
];

window.SAMPLE_WORDS = SAMPLE_WORDS;
window.STATS = STATS;
window.REVIEW_SCHEDULE = REVIEW_SCHEDULE;
