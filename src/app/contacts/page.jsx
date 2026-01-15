import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Контакты — Vore ona",
  description: "Связаться с автором",
};

const links = [
  {
    name: "Telegram",
    href: "https://t.me/HimikoRiver",
    icon: "/icons/telegram.png",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/79300009485",
    icon: "/icons/whatsapp.png",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/himikomayriver",
    icon: "/icons/instagram.png",
  },
  {
    name: "VK",
    href: "https://vk.com/dororo94857",
    icon: "/icons/vk.png",
  },
];

export default function ContactsPage() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[900px] px-4 md:px-6 py-10">
          {/* id="contacts" — чтобы якорь тоже работал, если где-то останется */}
          <section
            id="contacts"
            className="border border-white/10 bg-black/30 backdrop-blur-md p-6 md:p-10"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-300/70">
              контакты
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-100">
              Связаться со мной
            </h1>

            <p className="mt-6 text-zinc-100/85 leading-relaxed text-[16px] md:text-[17px]">
              Если понадобится — пиши. Можно по делу, можно просто с отзывом о
              тексте. Отвечаю не мгновенно, но отвечаю.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {links.map((l) => (
                <a
                  key={l.name}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-white/10 bg-black/20 p-4 hover:bg-black/35 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={l.icon}
                      alt=""
                      width={44}
                      height={44}
                      className="block opacity-90 group-hover:opacity-100 transition"
                    />

                    <div className="min-w-0">
                      <div className="text-zinc-100/90 font-medium">
                        {l.name}
                      </div>
                      <div className="text-sm text-zinc-300/70">
                        Нажми, чтобы открыть
                      </div>
                    </div>

                    <div className="ml-auto text-zinc-300/50 group-hover:text-zinc-100/70 transition">
                      ↗
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 text-xs md:text-sm text-zinc-300/70">
              Для сотрудничества — любые из вариантов выше.
            </div>
          </section>
        </div>
      </main>

      <Footer showIcons={false} />

    </>
  );
}
