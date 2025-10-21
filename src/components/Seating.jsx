import { useEffect, useMemo, useRef, useState } from "react";
import { guests, tables } from "../data/seating";
import { useTheme } from "../theme/ThemeContext";

const norm = (s = "") => s.toLowerCase().replace(/\s+/g, "").trim();

export default function Seating() {
  const { theme } = useTheme();
  const [q, setQ] = useState("");
  const tableRefs = useRef({});

  const result = useMemo(() => {
    const key = norm(q);
    if (!key) return null;

    const findByAny = (g) =>
      [g.name, ...(g.aliases || [])].some((v) => norm(v).includes(key));

    const g = guests.find(findByAny);
    if (!g) return { notFound: true };
    const t = tables.find((t) => t.id === g.tableId);
    return { guest: g, table: t };
  }, [q]);

  // 找到賓客後，自動捲動到該桌
  useEffect(() => {
    if (result?.table?.id && tableRefs.current[result.table.id]) {
      tableRefs.current[result.table.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [result?.table?.id]);

  const ringClass =
    theme === "tang" ? "border-cinnabar/50" : "border-gold/60";
  const chipClass =
    theme === "tang"
      ? "bg-cinnabar text-white border-cinnabar"
      : "bg-forest text-white border-forest";

  return (
    <div className="grid md:grid-cols-2 gap-6 md:gap-10">
      {/* 查詢區 */}
      <div>
        <h3 className="text-xl md:text-2xl mb-3">查詢座位</h3>
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="輸入姓名 / Name / Pinyin（例：wang xiaoming)"
            className="w-full bg-white/85 border border-stone-300/60 rounded-2xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-stone-300"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-70">
            🔎
          </span>
        </div>

        <div className="mt-4 rounded-2xl border border-stone-300/60 bg-white/80 p-4">
          {!q && (
            <p className="text-stone-600 text-sm md:text-base">
              支援中文 / 英文 / 拼音（請在資料加 <code>aliases</code>）
            </p>
          )}
          {q && result?.notFound && <p>找不到此賓客，請確認姓名是否正確。</p>}
          {q && result?.guest && (
            <div className="space-y-1">
              <p className="text-lg">
                賓客：<b>{result.guest.name}</b>
              </p>
              <p>
                桌次：<b>Table {result.table.id}</b>（{result.table.name}）
              </p>
              <p className="text-stone-600 text-sm">
                已為您高亮桌面位置，頁面也自動捲到了該桌。
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full border text-xs ${chipClass}`}
              >
                已定位
              </span>
            </div>
          )}
        </div>

        {/* 顏色圖例 */}
        <div className="mt-4 flex flex-wrap gap-3 text-sm items-center">
          <span className="inline-flex items-center gap-2">
            <i className="inline-block w-3 h-3 rounded-full bg-stone-800"></i>
            已安排
          </span>
          <span className="inline-flex items-center gap-2">
            <i className="inline-block w-3 h-3 rounded-full bg-white border border-stone-300/60"></i>
            空位
          </span>
          <span className="inline-flex items-center gap-2">
            <i
              className={`inline-block w-3 h-3 rounded-full border ${chipClass}`}
            ></i>
            您的位置
          </span>
        </div>
      </div>

      {/* 座位示意圖區 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {tables.map((t) => (
          <div
            key={t.id}
            ref={(el) => (tableRefs.current[t.id] = el)}
            className="bg-white/90 border border-stone-200 rounded-2xl p-4 shadow-soft"
          >
            <div className="text-sm text-stone-600">Table {t.id}</div>
            <div className="text-lg">{t.name}</div>

            {/* 圓桌（金邊＋柔光） */}
            <div
              className={`mt-3 relative mx-auto w-40 h-40 rounded-full border-[6px] ${ringClass} bg-gradient-to-b from-white to-ivory shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}
            >
              <span className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_0_0_6px_rgba(255,255,255,0.7)]"></span>

              {/* 座位點位 */}
              {Array.from({ length: t.seats }).map((_, i) => {
                const angle = (i / t.seats) * Math.PI * 2;
                const x = 80 + Math.cos(angle) * 76;
                const y = 80 + Math.sin(angle) * 76;

                const occupant = guests.find(
                  (g) => g.tableId === t.id && g.seatNo === i + 1
                );
                const isYou =
                  result?.guest && occupant?.name === result.guest.name;

                const base =
                  "absolute -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border transition transform";
                const cls = isYou
                  ? `${base} ${chipClass} ring-2 ring-current scale-110`
                  : occupant
                  ? `${base} bg-stone-800 border-stone-800`
                  : `${base} bg-white border-stone-300/60`;

                return (
                  <div
                    key={i}
                    style={{ left: x, top: y }}
                    title={`Seat ${i + 1}${
                      occupant ? ` — ${occupant.name}` : ""
                    }`}
                    className={cls}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
