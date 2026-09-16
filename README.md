# AIoT-DA Course | DO IN CLASS 1 (DIC-1)

## 專案名稱：Yu Ya Ting - Personal Space & Live Time Dashboard
**作者 (Author)**：Yu Ya Ting  
**課程名稱 (Course)**：AIoT-DA Course  
**課堂作業 (Assignment)**：DO IN CLASS 1 (DIC-1)  
**線上展示 (Live Demo)**：[https://jua91352.github.io/0916-1/](https://jua91352.github.io/0916-1/)

---

## 專案簡介 (Project Overview)

本專案為 **AIoT-DA 課程之課堂實作作業 DIC-1 (Do In Class 1)**。專案聚焦於**純個人首頁展示與高精度即時儀表板**（Personal Page & Precision Live Time Dashboard），結合現代前端美學設計（Bento Grid、Glassmorphism 玻璃擬態、動態光暈）與響應式排版。

---

## 核心功能 (Core Features)

### 1. 個人品牌與身份展示 (Personal Identity)
- **個人姓名呈現**：以現代排版視覺突出個人姓名 **Yu Ya Ting**。
- **動態縮寫徽章 (Monogram)**：依據姓名自動生成 `YT` 漸層光暈個人識別標誌。
- **時段感知問候**：根據當前系統時間自動顯示對應問候語（早安、午安、傍晚、晚安）。
- **即時個人化自訂**：內建自訂彈窗，支援在前端即時編輯個人姓名、專業職稱、簡介與 Email，並自動持久化保存於瀏覽器 LocalStorage。

### 2. 精準即時數位時鐘 (Precision Chrono Clock)
- **毫秒級即時刷新**：每 250ms 精確同步設備硬體時鐘，數字排版使用 Tabular 寬度對齊，秒數跳動平滑流暢。
- **12H / 24H 制自由切換**：可一鍵切換 24 小時制或 12 小時制（含 AM/PM 徽章顯示）。
- **時區自動感知**：自動偵測使用者本地時區名稱與 UTC 偏移值（如 `Asia/Taipei (UTC+8)`）。
- **當日進度追蹤 (Day Progress)**：即時計算當日經過的秒數百分比與剩餘時數，並以漸層進度條視覺化呈現。

### 3. 多時區世界時鐘 (World Clocks)
- 內建四大國際城市同步時鐘：
  - **New York (EDT • UTC-4)**
  - **London (BST • UTC+1)**
  - **Tokyo (JST • UTC+9)**
  - **Sydney (AEST • UTC+10)**

### 4. 日曆與年度時間指標 (Calendar & Year Insights)
- **當前年度進度**：動態換算當前為一年中的第幾天（Day of Year）及當週週數（Week Number）。
- **年度經過比例**：計算並視覺化該年度已過去的時間百分比。

### 5. 多主題切換與動態視覺 (Aesthetics & Themes)
- 內建 4 種主題配色，一鍵無縫切換：
  - **Aurora（極光藍）**：深海天幕與電光藍紫光暈。
  - **Obsidian（黑曜金）**：極致深黑與鈦金暖琥珀。
  - **Cyber（賽博龐克）**：未來霓虹洋紅與科技青綠。
  - **Sunset（落日橘）**：晚霞暗梅紫與熾熱夕陽橘。
- 完整適應桌面端、平板與行動裝置之響應式 Bento-Grid 版面。

---

## 技術架構 (Technology Stack)

- **核心架構**：原生 HTML5（語意化標籤）、Vanilla CSS3、Vanilla JavaScript (ES6+)。
- **樣式與設計系統**：CSS Custom Properties（設計變數體系）、Flexbox / CSS Grid 混合佈局、Backdrop Blur 玻璃擬態。
- **狀態管理**：純客戶端響應式狀態，以 `localStorage` 記錄主題偏好、時間制式及個人資訊。

---

## 專案結構 (File Structure)

```text
d:/L2/P1/
├── index.html        # 語意化 HTML5 結構與 Bento Grid 主介面
├── style.css         # CSS 變數主題系統、光暈動畫與響應式排版
├── script.js         # 即時時鐘計算、時區換算、主題與個人資料互動邏輯
├── README.md         # 專案說明文件（AIoT-DA DIC-1）
└── .gitignore        # Git 版本控制忽略設定
```

---

## 執行與預覽 (How to Run)

1. **線上即時展示 (Live Demo Page)**：
   👉 **[https://jua91352.github.io/0916-1/](https://jua91352.github.io/0916-1/)**
2. **本機直接開啟**：以瀏覽器雙擊開啟 [index.html](file:///d:/L2/P1/index.html)。
3. **透過本機伺服器運行**：
   ```bash
   python -m http.server 8080
   ```
   在瀏覽器訪問：`http://localhost:8080`
