# 多益 600 單字練習 Web App

手機優先的多益單字練習應用程式，日式手寫簡潔風格設計。
純靜態網頁，無需伺服器，直接用瀏覽器開啟即可使用，並支援深色模式。

---

## 專案結構

```
TOICE600WORD/
├── index.html   — 主體結構：5 個分頁、底部 Tab Bar、單字 Modal
├── style.css    — 日式手寫簡潔風格樣式（含深色模式）
├── data.js      — 單字資料（目前約 3,138 筆）
└── app.js       — 所有應用程式邏輯
```

---

## 使用方式

直接用瀏覽器開啟 `index.html`，無需安裝任何套件或啟動伺服器。
（若要在本機以伺服器方式預覽，可執行 `python -m http.server` 後開啟對應網址。）

---

## 功能說明

### 今日 Dashboard（首頁）
- 顯示日期、今日已記進度、每日目標（20 字）與整體達成率進度條
- 四張統計卡：連續天數（streak）、已熟記、待複習、總字數
- 三個快速入口：單字卡學習、四選一測驗、複習排程

### 單字卡學習
- 從「未熟記」單字隨機抽取最多 20 張
- 點擊卡片 3D 翻面：正面為單字＋音標＋發音，背面為中文定義、例句、同／反義詞
- 三段自我評分：陌生 / 不熟 / 熟記（評為「熟記」即標記為已背過）
- 透過 [dictionaryapi.dev](https://dictionaryapi.dev) 動態載入音標與例句（離線時自動略過）
- 內建朗讀（Web Speech API）

### 四選一測驗
- 從「未熟記」單字隨機抽取最多 10 題
- 題目為英文單字，四個中文定義選項
- 作答後鎖定，顯示答對（綠）/ 答錯（紅），約 1 秒後自動換題
- 結束顯示得分、正確率與「再挑戰」
- 未熟記單字少於 4 個時顯示提示（四選一最少需 4 個不同定義）

### 單字列表
- 卡片式列出所有單字（單字＋詞性＋中文定義）
- 搜尋（單字或釋義）＋分類篩選：全部 / A2 / B1/ 常見 / 已熟記 / 未記
- 大量資料以 `IntersectionObserver` 分批載入（每批 40 筆）
- 點擊卡片 → 開啟詳細 Modal（音標、定義、同／反義詞、例句、標記按鈕）

### 複習排程（間隔重複）
- 依評分結果（陌生 1 分鐘、不熟 10 分鐘、熟記 3 天）計算到期時間
- 顯示今日待複習字數，以及明天 / 3 天後 / 7 天後 / 14 天後的預估排程
- 附遺忘曲線示意圖

### 學習統計
- 整體進度環（熟記 / 學習中 / 未學）
- 本週每日學習次數長條圖
- 近 8 週學習軌跡熱力圖

### 深色模式
- 底部 Tab Bar 右側按鈕切換，狀態會記憶於 localStorage

---

## 單字資料欄位說明

`data.js` 中的 `WORDS` 為物件陣列，每筆欄位如下：

| 欄位 | 型別 | 說明 |
|------|------|------|
| `id` | Number | 唯一編號 |
| `word` | String | 英文單字 |
| `pos` | String | 詞性（如 `n.`、`v.`、`adj.`、`phr.`，可為空字串）|
| `category` | String | 分類（如 `A2`、`B1`、`常見`）|
| `definition` | String | 中文定義 |
| `synonyms` | String | 同義詞，以逗號分隔（可為空字串）|
| `antonyms` | String | 反義詞，以逗號分隔（可為空字串）|
| `mastered` | Boolean | 固定填 `false`（實際狀態由程式從 localStorage 讀取）|

> 音標與例句不存於 `data.js`，而是在開啟卡片 / Modal 時即時向字典 API 取得並快取於 `sessionStorage`。

新增單字時在陣列末端依格式續加即可，`id` 須唯一，`mastered` 一律填 `false`。

---

## 進度儲存（localStorage）

所有進度皆儲存在瀏覽器 `localStorage`，重新整理或關閉後不會消失：

| 鍵值 | 內容 |
|------|------|
| `toeic_mastered` | 已熟記單字（`{ "1": true, "5": true }`，只存已熟記的 id）|
| `toeic_dark` | 深色模式開關（`"true"` / `"false"`）|
| `toeic_streak` | 連續學習天數 |
| `toeic_last_open` | 最後開啟日期（用於計算 streak）|
| `toeic_week_activity` | 每日學習次數（供長條圖 / 熱力圖）|
| `toeic_card_ratings` | 單字卡評分紀錄（`{ id: { rating, ratedAt } }`，供複習排程）|

### 清除所有進度

在瀏覽器開發人員工具 Console 執行（清除全部或單一鍵）：

```js
// 只清除已熟記狀態
localStorage.removeItem('toeic_mastered');

// 或清除全部本 App 進度
['toeic_mastered','toeic_dark','toeic_streak','toeic_last_open',
 'toeic_week_activity','toeic_card_ratings'].forEach(k => localStorage.removeItem(k));

location.reload();
```

---

## 設計風格

- **色調**：米白底色、墨黑文字、朱紅（`--accent`）與抹茶綠（`--accent2`）強調色
- **字型**：Noto Serif TC/JP（標題）＋ Noto Sans TC/JP（內文）＋ IBM Plex Mono（音標）
- **卡片**：細線框線、充足留白、柔和陰影
- **需要網路**：字型透過 Google Fonts、音標／例句透過字典 API 載入；離線環境下會退為系統字型且略過 API，核心功能不受影響
