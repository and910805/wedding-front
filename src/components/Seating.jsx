import { useEffect, useMemo, useRef, useState } from "react";
import { guests, tables } from "../data/seating";
import { useTheme } from "../theme/ThemeContext";

const norm = (s = "") => s.toLowerCase().replace(/\s+/g, "").trim();

export default function Seating() {
  const { theme } = useTheme();
  const [q, setQ] = useState("");
  const tableRefs = useRef({});

  const normalizedQuery = norm(q);

  const matches = useMemo(() => {
    if (!normalizedQuery) return [];
    return guests.filter((guest) =>
      [guest.name, ...(guest.aliases || [])].some((value) =>
        norm(value).includes(normalizedQuery),
      ),
    );
  }, [normalizedQuery]);

  const result = useMemo(() => {
    if (!normalizedQuery) return null;
    if (!matches.length) return { notFound: true };

    const guest = matches[0];
    const table = tables.find((t) => t.id === guest.tableId);
    return { guest, table };
  }, [matches, normalizedQuery]);

  useEffect(() => {
    if (result?.table?.id && tableRefs.current[result.table.id]) {
      tableRefs.current[result.table.id].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [result?.table?.id]);

  const suggestions = useMemo(() => matches.slice(0, 5), [matches]);
  const highlightTableId = result?.guest ? result.table?.id : null;
  const showSuggestions =
    normalizedQuery &&
    suggestions.length > 0 &&
    !(suggestions.length === 1 && norm(suggestions[0].name) === normalizedQuery);

  const ringClass = theme === "tang" ? "border-cinnabar/50" : "border-gold/60";
  const chipClass =
    theme === "tang"
      ? "bg-cinnabar text-white border-cinnabar"
      : "bg-forest text-white border-forest";

  const handleSuggestionSelect = (guest) => {
    setQ(guest.name);
  };

  return (
    <>
      <style>{`
        @keyframes pulse-once {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }
        .animate-pulse-once {
          animation: pulse-once 1s ease-in-out 2;
        }
      `}</style>
      <div className="grid gap-6 md:grid-cols-2 md:gap-10">
        <div>
          <h3 className="mb-3 text-xl font-serif text-stone-800 md:text-2xl">查詢座位</h3>
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="輸入姓名 / Name / Pinyin（例：wang xiaoming)"
              className="w-full rounded-2xl border border-stone-300/60 bg-white/90 px-11 py-3 font-sans text-base text-stone-700 outline-none transition focus:border-rose-200 focus:ring-2 focus:ring-rose-200/60"
            />
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-70">🔎</span>
            {showSuggestions && (
              <ul className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-rose-200/70 bg-white/95 shadow-soft backdrop-blur">
                {suggestions.map((guest) => (
                  <li key={`${guest.tableId}-${guest.seatNo}`}>
                    <button
                      type="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        handleSuggestionSelect(guest);
                      }}
                      className="flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm text-stone-700 transition hover:bg-rose-50/80"
                    >
                      <span className="font-medium text-stone-800">{guest.name}</span>
                      {guest.aliases?.length ? (
                        <span className="text-xs text-stone-500">
                          {guest.aliases.join(" · ")}
                        </span>
                      ) : (
                        <span className="text-xs text-stone-400">Table {guest.tableId}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-stone-300/60 bg-white/85 p-4 shadow-soft">
            {!normalizedQuery && (
              <p className="font-sans text-sm text-stone-600 md:text-base">
                支援中文 / 英文 / 拼音，若姓名可能有不同寫法，可在資料加入 <code>aliases</code>。
              </p>
            )}
            {normalizedQuery && result?.notFound && (
              <p className="font-sans text-sm text-rose-500">
                找不到此賓客，請確認姓名是否正確，或聯繫新人協助確認座位。
              </p>
            )}
            {result?.guest && result.table && (
              <div className="space-y-2 font-sans text-stone-700">
                <p className="text-lg">
                  賓客：<b className="font-serif text-stone-900">{result.guest.name}</b>
                </p>
                <p>
                  桌次：<b className="font-serif text-stone-900">Table {result.table.id}</b>（
                  {result.table.name}）
                </p>
                <p className="text-xs text-stone-500">
                  已為您高亮桌面位置並自動捲動至該桌，祝您今晚與親友歡聚。
                </p>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs tracking-wide ${chipClass}`}
                >
                  已定位
                </span>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-stone-600">
            <span className="inline-flex items-center gap-2">
              <i className="inline-block h-3 w-3 rounded-full bg-stone-800"></i>
              已安排
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="inline-block h-3 w-3 rounded-full border border-stone-300/60 bg-white"></i>
              空位
            </span>
            <span className="inline-flex items-center gap-2">
              <i className={`inline-block h-3 w-3 rounded-full border ${chipClass}`}></i>
              您的位置
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {tables.map((table) => {
            const isActive = highlightTableId === table.id;
            const isDimmed = Boolean(highlightTableId && !isActive);

            return (
              <div
                key={table.id}
                ref={(el) => (tableRefs.current[table.id] = el)}
                className={`relative rounded-2xl bg-white/90 p-4 shadow-soft transition duration-300 ease-out ${
                  isActive
                    ? "border-amber-400 border-4 scale-105 transform-gpu shadow-lg"
                    : "border border-stone-200"
                } ${isDimmed ? "opacity-40 blur-[1px]" : ""}`}
              >
                <div className="text-sm text-stone-500">Table {table.id}</div>
                <div className="font-serif text-lg text-stone-800">{table.name}</div>

                <div
                  className={`relative mx-auto mt-3 h-40 w-40 rounded-full border-[6px] ${ringClass} bg-gradient-to-b from-white to-ivory shadow-[0_10px_30px_rgba(0,0,0,0.08)]`}
                >
                  <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_0_6px_rgba(255,255,255,0.7)]"></span>

                  {Array.from({ length: table.seats }).map((_, index) => {
                    const angle = (index / table.seats) * Math.PI * 2;
                    const x = 80 + Math.cos(angle) * 76;
                    const y = 80 + Math.sin(angle) * 76;

                    const occupant = guests.find(
                      (guest) => guest.tableId === table.id && guest.seatNo === index + 1,
                    );
                    const isYou = result?.guest && occupant?.name === result.guest.name;

                    const base =
                      "absolute -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full border transition-transform duration-300 ease-out";
                    let cls = `${base} bg-white border-stone-300/60`;

                    if (occupant) {
                      cls = `${base} bg-stone-800 border-stone-800`;
                    }

                    if (isYou) {
                      cls = `${base} animate-pulse-once border-amber-400 bg-amber-200/80 shadow-lg`;
                    }

                    const title = occupant
                      ? `Seat ${index + 1} — ${occupant.name}`
                      : `Seat ${index + 1}`;

                    return (
                      <div
                        key={index}
                        style={{ left: x, top: y }}
                        title={title}
                        className={cls}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
