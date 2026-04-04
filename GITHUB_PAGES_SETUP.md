# GitHub Pages 手機使用設定說明

## 目的

讓這個專案可以透過 GitHub Pages 發布成網站，並用手機瀏覽器直接使用。

## 觀念

手機不是在「執行 GitHub」。

正確方式是：

1. 專案推送到 GitHub
2. 啟用 GitHub Pages
3. GitHub 產生公開網站網址
4. 手機使用瀏覽器打開該網址

## 推送專案

可使用以下指令：

```bash
git status
git add data.js app.js TEST_REPORT.md MOBILE_USAGE.md GITHUB_PAGES_SETUP.md
git commit -m "Fix: data.js 修復與 app.js 錯誤處理改進"
git push
```

如果確認目前目錄下所有變更都要提交，也可以使用：

```bash
git add .
git commit -m "Fix: data.js 修復與 app.js 錯誤處理改進"
git push
```

## 啟用 GitHub Pages

以此倉庫為例：

[https://github.com/rene26354367-bot/TOICE600WORD](https://github.com/rene26354367-bot/TOICE600WORD)

請在 GitHub 上操作：

1. 進入 repository
2. 點選 `Settings`
3. 點選 `Pages`
4. 在 `Build and deployment` 區塊設定：
5. `Source` 選擇 `Deploy from a branch`
6. `Branch` 選擇 `main`
7. `Folder` 選擇 `/ (root)`
8. 按下 `Save`

## GitHub Pages 網址

若設定成功，公開網址通常會是：

[https://rene26354367-bot.github.io/TOICE600WORD/](https://rene26354367-bot.github.io/TOICE600WORD/)

## 手機使用方式

在手機上：

1. 打開 Safari 或 Chrome
2. 輸入 GitHub Pages 網址
3. 直接使用網站

## 注意事項

- 不要在手機上打開 GitHub 的原始碼頁面
- 不要把 GitHub 檔案列表頁當成網站使用
- 一定要使用 `github.io` 網址
- 若更新後畫面沒變，請重新整理頁面
- 必要時可清除瀏覽器快取

## 補充

第一張圖可正常顯示單字，代表本機頁面已能讀到資料。

第二張圖出現：

```text
data.js 載入失敗，WORDS 資料不存在
```

這不是 GitHub Pages 沒有載入 `data.js`，而是 [`app.js`](/C:/Users/user/Desktop/CLAUD%20CODE專案區域/TOICE600WORD/app.js) 之前使用 `globalThis.WORDS` 做檢查，判斷方式不正確。

原因如下：

- [`data.js`](/C:/Users/user/Desktop/CLAUD%20CODE專案區域/TOICE600WORD/data.js) 使用的是 `const WORDS = [...]`
- `const` 宣告的全域變數，不會自動掛到 `window` / `globalThis`
- 因此 GitHub Pages 上雖然資料已載入，仍被錯誤判定為不存在

目前已修正為直接檢查 `WORDS` 本身。

## 結論

這個專案可以在手機上使用，但前提是：

- 專案要先 push 到 GitHub
- GitHub Pages 要啟用
- 手機要打開 `github.io` 網址，而不是 GitHub 原始碼頁
