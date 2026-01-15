import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic"; // чтобы в dev/на Vercel не кэшировалось странно

function firstNonEmptyLine(lines) {
  for (const l of lines) {
    if (l.trim().length) return l;
  }
  return "";
}

/**
 * Убирает “мусорные” табы/пробелы в начале строк.
 * Типичный кейс: каждая строка начинается с \t или с нескольких пробелов из исходника.
 *
 * Правило:
 * - Для каждой НЕпустой строки удаляем:
 *   - один ведущий таб (\t)
 *   - или до 8 пробелов в начале
 */
function stripLeadingIndentPerLine(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");

  const cleaned = lines.map((line) => {
    if (!line.trim().length) return line; // пустые строки не трогаем
    // 1 таб ИЛИ до 8 пробелов
    return line.replace(/^(\t| {1,8})/, "");
  });

  return cleaned.join("\n");
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
    const normalizedRaw = raw.replace(/\r\n/g, "\n");
    const lines = normalizedRaw.split("\n");

    const title = firstNonEmptyLine(lines) || id;

    // text = всё, кроме первой непустой строки (заголовка)
    let titleIndex = lines.findIndex((l) => l.trim().length > 0);
    if (titleIndex === -1) titleIndex = 0;

    const rest = lines.slice(titleIndex + 1);

    // убираем пустые строки сразу после заголовка
    while (rest.length && rest[0].trim() === "") rest.shift();

    // склеиваем и чистим “табовый мусор”
    const text = stripLeadingIndentPerLine(rest.join("\n")).trimEnd();

    return { id, title, text };
  });

  return Response.json({ poems }, { status: 200 });
}
