"use client";

import { useMemo, useState, useEffect } from "react";
import Header from "./components/Header";
import PoemsSidebar from "./components/PoemsSidebar";
import Footer from "./components/Footer";

export default function Home() {
  const [poems, setPoems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [activeId, setActiveId] = useState(null);

  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const onSearch = () => setSubmittedQuery(query.trim());

  // 1) Загружаем стихи с сервера (из public/poems/items)
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setLoadError("");

        const res = await fetch("/api/poems", { cache: "no-store" });
        const data = await res.json();

        const list = Array.isArray(data?.poems) ? data.poems : [];
        if (!alive) return;

        setPoems(list);

        // выставляем активный стих
        if (list.length) setActiveId((prev) => prev ?? list[0].id);
      } catch (e) {
        if (!alive) return;
        setLoadError(
          "Не удалось загрузить стихи. Проверь /public/poems/items и API /api/poems"
        );
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  const filteredPoems = useMemo(() => {
    const q = submittedQuery.toLowerCase();
    if (!q) return poems;

    return poems.filter((p) => {
      const t = (p.title || "").toLowerCase();
      const body = (p.text || "").toLowerCase();
      return t.includes(q) || body.includes(q);
    });
  }, [submittedQuery, poems]);

  // 2) Если после фильтра активный исчез — ставим первый из отфильтрованных
  useEffect(() => {
    if (!filteredPoems.length) return;
    const exists = filteredPoems.some((p) => p.id === activeId);
    if (!exists) setActiveId(filteredPoems[0].id);
  }, [filteredPoems, activeId]);

  const activePoem = useMemo(() => {
    return (
      filteredPoems.find((p) => p.id === activeId) ||
      filteredPoems[0] ||
      poems[0] ||
      null
    );
  }, [filteredPoems, activeId, poems]);

  return (
    <>
<Header query={query} setQuery={setQuery} onSearch={onSearch} />


      {/* Хедер теперь sticky и фиксированный (h-16 / md:h-20),
          поэтому контенту даём верхний отступ, чтобы не залезал под него */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6">
          <div className="py-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_minmax(0,1fr)_340px] items-start">
              {/* ЛЕВАЯ КОЛОНКА: липкая на десктопе */}
              <div className="lg:sticky lg:top-20 self-start">
                <PoemsSidebar
                  poems={filteredPoems}
                  activeId={activeId}
                  onSelect={setActiveId}
                />
              </div>

              {/* ЦЕНТР: липкий на десктопе + ограничение высоты под viewport + внутренний скролл */}
              <section className="flex justify-center lg:sticky lg:top-20 self-start">
                <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-6 md:p-10 max-h-[calc(100vh-5rem)] overflow-auto">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-300/70">
                        стихотворение
                      </p>

                      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                        {loading ? "Загрузка..." : activePoem?.title || "—"}
                      </h1>


                    </div>

                    {submittedQuery ? (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setSubmittedQuery("");
                        }}
                        className="shrink-0 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200 hover:bg-black/35"
                      >
                        Сбросить
                      </button>
                    ) : null}
                  </div>

                  {/* Состояния */}
                  {loading ? (
                    <div className="mt-8 text-zinc-200/80">
                      Подгружаю стихи...
                    </div>
                  ) : loadError ? (
                    <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
                      {loadError}
                    </div>
                  ) : poems.length === 0 ? (
                    <div className="mt-8 text-zinc-200/80">
                      Пока нет стихов. Проверь, что файлы лежат в{" "}
                      <span className="text-zinc-100">public/poems/items</span>.
                    </div>
                  ) : filteredPoems.length === 0 ? (
                    <div className="mt-8 text-zinc-200/80">
                      Ничего не найдено по запросу:{" "}
                      <span className="text-zinc-100">{submittedQuery}</span>
                    </div>
                  ) : (
                    <div className="mt-6 whitespace-pre-wrap text-zinc-100/90 leading-relaxed text-[16px] md:text-[17px]">
                      {activePoem?.text}
                    </div>
                  )}
                </div>
              </section>

              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
