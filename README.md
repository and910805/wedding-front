# 💍 Wedding — Auto Theme v2
- **沒有手動切換鍵**，主題依滾動自動切換。
- 改良判定：IntersectionObserver 門檻 30%，rootMargin 已扣除 sticky header。
- 區塊加上 `min-h-[70vh]`，確保在手機也能穩定觸發。

## 指南
1) 放照片到 `public/photos/euro/`、`public/photos/tang/` 並更新 `src/data/*.js`。
2) 開發：`npm install && npm run dev`。
