"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header({ query, setQuery, onSearch }) {
  const hasSearch = typeof onSearch === "function";
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Блокируем скролл, пока меню открыто + Esc
  useEffect(() => {
    if (!menuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 h-24 md:h-28 shrink-0">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 h-full">
        <div className="h-full border-b md:border border-white/10 bg-black/25 backdrop-blur-md px-4 md:px-6 flex items-center">
          {/* MOBILE: лого + бургер */}
          <div className="w-full flex items-center justify-between gap-3 md:hidden">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-sm tracking-[0.25em] text-zinc-100/90 whitespace-nowrap"
            >
              Vore ona
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="shrink-0 border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200 hover:bg-black/35 active:scale-[0.98] transition"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* DESKTOP: всегда 3 колонки, даже если поиска нет */}
          <div className="hidden md:grid w-full items-center gap-4 grid-cols-[140px_1fr_360px]">
            {/* ЛОГО */}
            <Link
              href="/"
              className="text-sm tracking-[0.25em] text-zinc-100/90 whitespace-nowrap"
            >
              Vore ona
            </Link>

            {/* НАВ (всегда на одном месте) */}
            <nav className="flex justify-center gap-6 whitespace-nowrap uppercase">
              <Link href="/" className="nav-btn nav-btn-2">
                Главная
              </Link>

              <Link href="/about" className="nav-btn nav-btn-2">
                Об авторе
              </Link>

              <Link href="/contacts" className="nav-btn nav-btn-2">
                Контакты
              </Link>
            </nav>

            {/* ПРАВО: либо поиск, либо пустая заглушка той же ширины */}
            {hasSearch ? (
              <form
                className="flex justify-end gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  onSearch();
                }}
              >
                <label className="searchbox searchbox-2">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Поиск стихов..."
                    className="searchbox__input"
                  />
                </label>

                <button type="submit" className="nav-btn nav-btn-2">
                  Найти
                </button>
              </form>
            ) : (
              <div className="h-[42px]" />
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={[
          "md:hidden fixed inset-0 z-[60] transition-opacity duration-300",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Закрыть меню"
          onClick={closeMenu}
          className="absolute inset-0 bg-black/60"
        />

        {/* Panel */}
        <div
          className={[
            "absolute left-4 right-4 top-3 border border-white/10 bg-black/60 backdrop-blur-md p-4",
            "transition-[transform,opacity] duration-300 ease-out will-change-transform",
            menuOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-2 opacity-0 scale-[0.98]",
          ].join(" ")}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-300/70">
              меню
            </span>

            <button
              type="button"
              onClick={closeMenu}
              className="border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200 hover:bg-black/35 active:scale-[0.98] transition"
            >
              Закрыть
            </button>
          </div>

          <div className="mt-4 grid gap-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="w-full border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-zinc-200 hover:bg-black/35 transition"
            >
              ГЛАВНАЯ
            </Link>

            <Link
              href="/about"
              onClick={closeMenu}
              className="w-full border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-zinc-200 hover:bg-black/35 transition"
            >
              ОБ АВТОРЕ
            </Link>

            <Link
              href="/contacts"
              onClick={closeMenu}
              className="w-full border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-zinc-200 hover:bg-black/35 transition"
            >
              КОНТАКТЫ
            </Link>
          </div>

          {hasSearch ? (
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                onSearch();
                closeMenu();
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск стихов..."
                className="w-full min-w-0 border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-400/70 outline-none focus:border-white/20"
              />

              <button type="submit" className="nav-btn nav-btn-2">
                Найти
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </header>
  );
}
