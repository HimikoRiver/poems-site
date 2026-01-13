"use client";

export default function Header({ query, setQuery, onSearch }) {
  return (
    <header className="shrink-0">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 py-4">
        <div className="rounded-3xl border border-white/10 bg-black/25 backdrop-blur-md px-4 py-3">
          <div className="grid grid-cols-[120px_1fr_320px] items-center gap-4">
            {/* ЛОГО */}
            <div className="text-sm tracking-[0.25em] text-zinc-100/90">
              POEMS
            </div>

            {/* НАВ */}
            <nav className="flex justify-center gap-2">
              <a
                href="#"
                className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200 hover:bg-black/35"
              >
                Главная
              </a>
              <a
                href="#"
                className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200 hover:bg-black/35"
              >
                Об авторе
              </a>
              <a
                href="#"
                className="rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200 hover:bg-black/35"
              >
                Контакты
              </a>
            </nav>

            {/* ПОИСК */}
            <form
              className="flex justify-end gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                onSearch();
              }}
            >
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск стихов..."
                className="w-full rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-400/70 outline-none focus:border-white/20"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-zinc-200 hover:bg-black/35"
              >
                Найти
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
