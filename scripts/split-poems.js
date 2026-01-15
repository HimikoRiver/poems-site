const fs = require("fs");
const path = require("path");

// ====== НАСТРОЙКИ ======

const INPUT = path.join(
  process.cwd(),
  "public",
  "poems",
  "poems.md"
);

const OUTPUT_DIR = path.join(
  process.cwd(),
  "public",
  "poems",
  "items"
);

// Разделитель между стихами: строка с ---
const SEPARATOR_REGEX = /\n\s*---\s*\n/g;

// ====== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ======

function safeSlug(text) {
  return text
    .toLowerCase()
    .replace(/[«»"']/g, "")
    .replace(/[^a-zа-яё0-9\s-]/gi, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "bez-nazvaniya";
}

function pad(num) {
  return String(num).padStart(3, "0");
}

// ====== ОСНОВНАЯ ЛОГИКА ======

if (!fs.existsSync(INPUT)) {
  console.error("❌ Файл poems.md не найден:", INPUT);
  process.exit(1);
}

// создаём папку для результатов
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// читаем исходный файл
const raw = fs.readFileSync(INPUT, "utf8").trim();

// режем по разделителю ---
const parts = raw
  .split(SEPARATOR_REGEX)
  .map(block => block.trim())
  .filter(Boolean);

if (parts.length === 0) {
  console.error("❌ Не найдено ни одного стиха. Проверь разделители ---");
  process.exit(1);
}

const usedSlugs = new Map();

parts.forEach((block, index) => {
  const lines = block.split("\n").map(l => l.trimEnd());

  // название — первая непустая строка
  const titleLine = lines.find(l => l.trim().length > 0) || `Без названия ${index + 1}`;
  let slug = safeSlug(titleLine);

  // защита от одинаковых названий
  const count = (usedSlugs.get(slug) || 0) + 1;
  usedSlugs.set(slug, count);
  if (count > 1) {
    slug = `${slug}-${count}`;
  }

  const filename = `${pad(index + 1)}-${slug}.md`;
  const outputPath = path.join(OUTPUT_DIR, filename);

  fs.writeFileSync(outputPath, block + "\n", "utf8");
});

// ====== ГОТОВО ======

console.log(`✅ Готово: ${parts.length} файлов в ${OUTPUT_DIR}`);
