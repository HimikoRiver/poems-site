"use client";

import { useEffect, useState } from "react";

export default function PoemsPage() {
  const [text, setText] = useState("Загружаю стихи...");

  useEffect(() => {
    fetch("/poems/poems.md")
      .then((res) => res.text())
      .then((data) => setText(data))
      .catch(() => setText("Не удалось загрузить стихи"));
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Стихи</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
    </div>
  );
}
