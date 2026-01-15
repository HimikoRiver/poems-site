"use client";

import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 9;

function buildPagination(totalPages, currentPage) {
  // Требование:
  // - страницы 1-3: 1 2 3 … last
  // - начиная с 4: 1 … p-1 p p+1 … last  (то есть 2 и 3 "уезжают")
  // - конец: 1 … last-2 last-1 last

  if (totalPages <= 6) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const last = totalPages;

  if (currentPage <= 3) {
    return [1, 2, 3, "...", last];
  }

  if (currentPage >= last - 2) {
    return [1, "...", last - 2, last - 1, last];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", last];
}

export default function PoemsSidebar({ poems, activeId, onSelect }) {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(poems.length / ITEMS_PER_PAGE)),
    [poems.length]
  );

  // Держим page в рамках
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [page, totalPages]);

  // Если выбран стих не с текущей страницы — синхронизируем page
  useEffect(() => {
    const idx = poems.findIndex((p) => p.id === activeId);
    if (idx === -1) return;

    const neededPage = Math.floor(idx / ITEMS_PER_PAGE) + 1;
    if (neededPage !== page) setPage(neededPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return poems.slice(start, start + ITEMS_PER_PAGE);
  }, [poems, page]);

  const pagination = useMemo(
    () => buildPagination(totalPages, page),
    [totalPages, page]
  );

  const canPrev = page > 1;
  const canNext = page < totalPages;

  // При смене страницы выбираем первый стих этой страницы,
  // чтобы page не "откатывало" назад из-за activeId.
  const goToPage = (p) => {
    const nextPage = Math.min(Math.max(1, p), totalPages);
    setPage(nextPage);

    const start = (nextPage - 1) * ITEMS_PER_PAGE;
    const first = poems[start];
    if (first) onSelect(first.id);
  };

  return (
    <aside className="h-fit">
      <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-4 flex flex-col overflow-hidden">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-300/70">
          стихи
        </p>
              
                        <p className="mt-2 text-xs text-zinc-400/80">
                          Всего стихов: {poems.length}
                        </p>

        {/* 9 стихов, без скролла */}
        <div className="mt-3 space-y-2">
          {pageItems.map((p) => {
            const active = p.id === activeId;

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id)}
                className={[
                  "w-full rounded-2xl border px-4 py-3 text-left text-sm transition",
                  active
                    ? "border-white/20 bg-black/45 text-zinc-100"
                    : "border-white/10 bg-black/20 text-zinc-200/90 hover:bg-black/35",
                ].join(" ")}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        {/* Пагинация внизу. ВАЖНО: не переносится и не вылезает */}
        <div className="mt-auto pt-4 border-t border-white/10 overflow-hidden -mx-4 px-4">
          <div className="flex items-center gap-3">
            {/* Prev */}
            <button
              onClick={() => canPrev && goToPage(page - 1)}
              disabled={!canPrev}
              className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:bg-black/35 disabled:opacity-40"
              aria-label="Предыдущая страница"
            >
              ‹
            </button>

            {/* Центр: строго в пределах контейнера */}
            <div className="flex-1 overflow-hidden">
              <div className="flex flex-nowrap items-center justify-center gap-2 overflow-hidden whitespace-nowrap">
                {pagination.map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`dots-${i}`}
                      className="shrink-0 px-1 text-zinc-400"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={[
                        "shrink-0 rounded-xl border text-sm transition",
                        // компактнее, чтобы не вылезало
                        "min-w-8 px-2 py-2 md:min-w-9 md:px-3",
                        p === page
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-white/10 bg-black/20 text-zinc-200 hover:bg-black/35",
                      ].join(" ")}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={() => canNext && goToPage(page + 1)}
              disabled={!canNext}
              className="shrink-0 rounded-full border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:bg-black/35 disabled:opacity-40"
              aria-label="Следующая страница"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
