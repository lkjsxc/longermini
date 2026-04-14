"use client";

import { useEffect, useState } from "react";

interface IOExample {
  input: string;
  output: string;
}

interface ActiveCard {
  id: number;
  data: IOExample;
  style: React.CSSProperties;
  fadingOut: boolean;
}

export default function BackgroundCards() {
  const [examples, setExamples] = useState<IOExample[]>([]);
  const [activeCards, setActiveCards] = useState<ActiveCard[]>([]);

  useEffect(() => {
    fetch("/io-examples.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) setExamples(data);
      })
      .catch((e) => console.error("Failed to load io-examples", e));
  }, []);

  useEffect(() => {
    if (examples.length === 0) return;

    const maxCards = 4;
    let cardCounter = 0;

    const spawnCard = () => {
      const data = examples[Math.floor(Math.random() * examples.length)];
      const id = cardCounter++;
      
      const top = Math.random() * 80 + 10; // 10% to 90%
      const left = Math.random() * 80 + 10;
      
      const newCard: ActiveCard = {
        id,
        data,
        style: {
          top: `${top}%`,
          left: `${left}%`,
        },
        fadingOut: false,
      };

      setActiveCards((prev) => [...prev.slice(-(maxCards - 1)), newCard]);

      setTimeout(() => {
        setActiveCards((prev) =>
          prev.map((c) => (c.id === id ? { ...c, fadingOut: true } : c))
        );
      }, 4000); // Start fade out after 4s
    };

    // Initial spawn
    for (let i = 0; i < maxCards; i++) {
      setTimeout(spawnCard, i * 1500);
    }

    const interval = setInterval(spawnCard, 2500);
    return () => clearInterval(interval);
  }, [examples]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {activeCards.map((card) => (
        <div
          key={card.id}
          className={`absolute p-4 max-w-xs bg-white dark:bg-gray-800 rounded-sm shadow-xl border border-gray-200 dark:border-gray-700 transition-opacity duration-1000 ${
            card.fadingOut ? "opacity-0" : "opacity-10"
          }`}
          style={card.style}
        >
          <div className="text-xs font-bold text-gray-500 mb-1">{card.data.input}</div>
          <div className="text-sm text-gray-700 dark:text-gray-300">{card.data.output}</div>
        </div>
      ))}
    </div>
  );
}