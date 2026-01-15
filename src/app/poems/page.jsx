import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function PoemPage({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "public", "poems", "items", `${slug}.md`);

  if (!fs.existsSync(filePath)) notFound();

  const text = fs.readFileSync(filePath, "utf8");

  return (
    <section className="min-h-screen bg-neutral-950 text-neutral-100 px-4 md:px-8 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href="/poems" className="text-sm text-neutral-400 hover:text-neutral-200">
          ← Назад к списку
        </Link>

        <pre className="mt-8 whitespace-pre-wrap font-serif leading-relaxed text-lg">
          {text}
        </pre>
      </div>
    </section>
  );
}
