"use client";

import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shrink-0">
      <div className="mx-auto w-full max-w-[1600px] px-4 md:px-6 pb-6">
        <div className="rounded-3xl border border-white/10 bg-black/30 backdrop-blur-md px-6 py-6 md:py-7">
          {/* ВЕРХ: слева текст, справа иконки + "для сотрудничества" под ними */}
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            {/* ЛЕВО: ТЕКСТ (куда ты указала) */}
            <div className="max-w-[70ch] text-sm md:text-[15px] text-zinc-300/80 leading-relaxed">
              Поэтический блог. Здесь тексты живут спокойно: без шума, без лишнего.
              Если хочешь связаться — нажми на иконки справа.
            </div>

            {/* ПРАВО: ИКОНКИ + подпись снизу */}
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex items-center gap-4 md:gap-5">
                {/* Telegram */}
                <a
                  href="https://t.me/HimikoRiver"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="opacity-85 hover:opacity-100 transition"
                >
                  <Image
                    src="/icons/telegram.png"
                    alt=""
                    width={44}
                    height={44}
                    className="block"
                  />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/79300009485"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="opacity-85 hover:opacity-100 transition"
                >
                  <Image
                    src="/icons/whatsapp.png"
                    alt=""
                    width={44}
                    height={44}
                    className="block"
                  />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/himikomayriver"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="opacity-85 hover:opacity-100 transition"
                >
                  <Image
                    src="/icons/instagram.png"
                    alt=""
                    width={44}
                    height={44}
                    className="block"
                  />
                </a>

                {/* VK */}
                <a
                  href="https://vk.com/dororo94857"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VK"
                  className="opacity-85 hover:opacity-100 transition"
                >
                  <Image
                    src="/icons/vk.png"
                    alt=""
                    width={44}
                    height={44}
                    className="block"
                  />
                </a>
              </div>

              {/* "Для сотрудничества" ПОД иконками */}
              <div className="text-xs md:text-sm text-zinc-300/80">
                Для сотрудничества
              </div>
            </div>
          </div>

          {/* НИЗ: две строки строго по центру */}
          <div className="mt-5 pt-4 border-t border-white/10 text-center">
            <div className="text-xs md:text-sm text-zinc-300/80">
              © {year} Poetic Blog. Все права защищены.
            </div>

            <div className="mt-2 text-xs md:text-sm text-zinc-400/80">
              Быстрые ссылки:{" "}
              <a
                href="#about"
                className="text-zinc-300/80 hover:text-zinc-200 transition"
              >
                Об авторе
              </a>{" "}
              ·{" "}
              <a
                href="#contacts"
                className="text-zinc-300/80 hover:text-zinc-200 transition"
              >
                Контакты
              </a>{" "}
              · <span className="text-zinc-500/80">(скоро: политика и условия)</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
