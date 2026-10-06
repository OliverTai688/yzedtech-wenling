import type { CSSProperties } from "react";
import WingsMark from "../brand/WingsMark";
import { needEntries } from "../../data";

// 白金色的書（純圖形，對輔助科技隱藏；文字是另外疊在書頁上的真實內容，見 StageBook.tsx）。
// 六張書葉：第 0 張的正面是封面、背面是序的那一頁；第 k 張（1～4）的背面是第 k 個對象的那一頁。
// 書頁本身是空白的珠光白，字疊在上面。
// 桌機是攤開的對頁（書葉繞書背翻 180°）；手機是一疊單頁，一頁一頁翻走（樣式在 stage-book.css）。
export default function StageBookArt() {
  const leaves = Array.from({ length: needEntries.length + 2 }, (_, i) => i);
  return (
    <div className="st-book__art" aria-hidden="true">
      <div className="st-book__scene">
        <div className="st-book__inner">
          <div className="st-board" />
          {leaves.map((i) => (
            <div
              key={i}
              className="st-leaf"
              data-leaf={i}
              style={{ "--i": i } as CSSProperties}
            >
              <div className="st-leaf__in">
                <div
                  className={`st-face st-face--front ${i === 0 ? "" : "st-face--right"}`}
                >
                  {i === 0 ? (
                    <div className="st-cover">
                      <span className="st-cover__seal">
                        <WingsMark className="st-cover__mark" />
                      </span>
                    </div>
                  ) : (
                    <div className="st-pg" />
                  )}
                </div>
                {i <= needEntries.length && (
                  <div
                    className={`st-face st-face--back ${i === 0 ? "st-face--inside" : ""}`}
                  >
                    <div className="st-pg">
                      {i === 0 && (
                        <span className="st-pg__seal">
                          <WingsMark className="st-pg__mark" />
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
