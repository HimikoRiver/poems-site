"use client";

import { useMemo, useState, useEffect } from "react";
import Header from "./components/Header";
import PoemsSidebar from "./components/PoemsSidebar";
import Footer from "./components/Footer";
import { POEMS } from "./data/poems";

export default function Home() {
  const [activeId, setActiveId] = useState(POEMS[0]?.id);

  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const onSearch = () => setSubmittedQuery(query.trim());

  const filteredPoems = useMemo(() => {
    const q = submittedQuery.toLowerCase();
    if (!q) return POEMS;

    return POEMS.filter((p) => {
      const t = (p.title || "").toLowerCase();
      const body = (p.text || "").toLowerCase();
      return t.includes(q) || body.includes(q);
    });
  }, [submittedQuery]);

  useEffect(() => {
    if (!filteredPoems.length) return;
    const exists = filteredPoems.some((p) => p.id === activeId);
    if (!exists) setActiveId(filteredPoems[0].id);
  }, [filteredPoems, activeId]);

  const activePoem = useMemo(() => {
    return (
      filteredPoems.find((p) => p.id === activeId) ||
      filteredPoems[0] ||
      POEMS[0]
    );
  }, [filteredPoems, activeId]);

  return (
    <>
      <Header query={query} setQuery={setQuery} onSearch={onSearch} />

      {/* ВАЖНО: main = flex-1 чтобы занять всю высоту и прижать футер вниз */}
      <main className="flex-1">
        <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6">
          <div className="py-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[420px_minmax(0,1fr)_340px] items-start">
              <PoemsSidebar
                poems={filteredPoems}
                activeId={activeId}
                onSelect={setActiveId}
              />

              <section className="flex justify-center">
                <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md p-6 md:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-zinc-300/70">
                        стихотворение
                      </p>
                      <h1 className="mt-3 text-2xl font-semibold tracking-tight">
                        {activePoem?.title}
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

                  {filteredPoems.length === 0 ? (
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
