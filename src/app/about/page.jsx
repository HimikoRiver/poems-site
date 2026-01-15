import Image from "next/image";

import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Об авторе — Vore ona",
  description: "Страница об авторе и поэзии",
};

export default function AboutPage() {
  return (
    <>
      {/* Header без поиска (он сам спрячется) */}
      <Header />

      <main className="flex-1">
        <div className="mx-auto w-full max-w-[900px] px-4 md:px-6 py-10">
          <section className="border border-white/10 bg-black/30 backdrop-blur-md p-6 md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-300/70">
              об авторе
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-100">
              Vore ona
            </h1>

            {/* Блок фото + текст */}
            <div className="mt-8 grid gap-6 md:grid-cols-[220px_1fr] md:items-start">
              {/* Фото */}
              <div className="border border-white/10 bg-black/20 p-2">
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-white/10">
<Image
  src="/me.jpg"
  alt="Фото автора"
  fill
  sizes="(max-width: 768px) 80vw, 220px"
  className="object-cover"
  priority
/>

                </div>

                <p className="mt-3 text-xs text-zinc-300/70 leading-relaxed">
                  Дата рождения: 15.01.1997
                </p>
              </div>

              {/* Текст */}
<div className="space-y-4 text-zinc-100/90 leading-relaxed text-[16px] md:text-[17px]">
  <p>
    Я начала писать стихи в 14 лет. Потеряв одного из моих самых близких и любимых людей, моего потрясающего отца,
    во мне что-то переключилось, будто щёлкнуло выключателем. Однажды ночью просто села и написала стих, будто всегда это делала.
    Сначала это были короткие тексты для себя — без цели, без планов, просто как способ разобраться в том, что происходит
    внутри. 
  </p>

  <p>
    Со временем стало понятно, что стихи — это мой основной язык. Через них
    проще думать, переживать и фиксировать моменты, которые сложно объяснить
    вслух. Я никогда не была влюблена, но так много писала о любви, будто сама переживала эти моменты.
  </p>

  <p>
    По образованию у меня два направления: государственное управление
    (менеджмент) и программирование — frontend-разработка. Это разные сферы, но
    обе научили меня структуре, вниманию к деталям и ответственности за то, что
    я делаю.
  </p>

  <p>
    Этот сайт — место, где собраны мои тексты без правок и без
    попытки сделать их популярными, но они обязательно найдут своего читателя. 
  </p>

  <p>
    Отдельно хочу сказать спасибо моей маме — за любовь, поддержку и принятие
    моего творческого пути. Даже в те моменты, когда я писала откровенно глупые строки, 
    она всегда была рядом и всегда восхищалась мной.
    Для меня это было действительно важно.
  </p>

  <p>
    Если ты здесь и читаешь — значит, в тебе откликнулось. Этого более
    чем достаточно.
  </p>
</div>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
