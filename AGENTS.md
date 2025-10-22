# Agent Notes
- Use the `assetUrl` helper for any asset path that should respect the deployed base path (e.g., images, logos, favicons).
- The couple's official names are：新娘「莊雨瑄」、新郎「趙國宏」。維持此寫法於所有文案與 UI。
- 保持文案為繁體中文，並注意字詞的溫柔與喜宴氛圍。
- 維持婚禮網站的柔和浪漫風格：常用 `font-serif`、`font-script` 字型設定與粉米色、赤紅色系，避免跳脫整體視覺。
- 站上已採用「Noto Serif TC／Playfair Display」與「Noto Sans TC／Josefin Sans」字體組合；標題優先使用 `font-serif`，段落與按鈕維持 `font-sans`，並確保中英文並排時視覺一致。
- 若需新增背景特效（如落花、光暈），請以 `pointer-events-none` 設定避免干擾操作，並保持柔和的透明度與動畫節奏。
- 確保彈窗或模態元件在手機上可完整閱讀：提供捲動空間、舒適留白與可見的關閉動作。

### 💌 WeddingInvitation 模組說明

**檔案位置：**
`src/components/WeddingInvitation.jsx`

**功能：**
- 信封動畫（可開／關）
- 浪漫字體（Playfair Display + Parisienne + Noto TC）
- 背景花紋 + 飄落花瓣效果
- 手機／平板 RWD 完整支援
- 返回鍵可於所有裝置正常操作
- 打開後標題字具淡入與輕微放大動畫

**動畫設計：**
- 信封上蓋使用 Framer Motion `rotateX` 動畫。
- 卡片與文字以 `opacity + scale` 漸入。
- 花瓣具隨機下落效果，使用 `pointer-events: none` 避免阻擋互動。

**測試條件：**
- Desktop Chrome / Safari
- iPhone 14 Pro (390px)
- Pixel 7 (412px)
