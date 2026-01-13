import "./globals.css";

export const metadata = {
  title: "Poems",
  description: "Поэтический сайт",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className="min-h-dvh flex flex-col text-zinc-100 antialiased">
        {/* BACKGROUND LAYER */}
        <div className="fixed inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/bg/background.png')" }}
          />
        </div>

        {children}
      </body>
    </html>
  );
}
