export const POEMS = Array.from({ length: 600 }, (_, i) => {
  const n = i + 1;

  return {
    id: `poem-${n}`,
    title: `Стихотворение №${n}`,
    text: `Стих №${n}

Это заглушка текста для теста пагинации.
Потом заменишь на реальные стихи.`,
  };
});
