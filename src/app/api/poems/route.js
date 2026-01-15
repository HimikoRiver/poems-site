import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // чтобы в dev/на Vercel не кэшировалось странно

function firstNonEmptyLine(lines) {
  for (const l of lines) {
    if (l.trim().length) return l;
  }
  return "";
}

export async function GET() {
  const dir = path.join(process.cwd(), "public", "poems", "items");

  if (!fs.existsSync(dir)) {
    return Response.json(
      { poems: [], error: `Папка не найдена: ${dir}` },
      { status: 200 }
    );
  }

const files = fs
  .readdirSync(dir)
  .filter((name) => name.toLowerCase().endsWith(".md"))
  .sort()
  .reverse();

  const poems = files.map((filename) => {
    const id = filename.replace(/\.md$/i, "");
    const fullPath = path.join(dir, filename);

    const raw = fs.readFileSync(fullPath, "utf8");

    // Сохраняем переносы как есть, но приводим к \n (на Windows может быть \r\n)
    const normalized = raw.replace(/\r\n/g, "\n");

    const lines = normalized.split("\n");

    const title = firstNonEmptyLine(lines) || id;

    // text = всё, кроме первой непустой строки (и одного перевода строки после неё)
    let titleIndex = lines.findIndex((l) => l.trim().length > 0);
    if (titleIndex === -1) titleIndex = 0;

    const rest = lines.slice(titleIndex + 1);

    // если сразу после заголовка идут пустые строки — оставляем структуру,
    // но чтобы не было “пустой страницы”, уберём только самый первый пустой блок
    // (НЕ трогаем содержимое стихов, только стартовую “дырку”)
    while (rest.length && rest[0].trim() === "") rest.shift();

    const text = rest.join("\n").trimEnd();

    return { id, title, text };
  });

  return Response.json({ poems }, { status: 200 });
}
