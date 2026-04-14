"use client";

import { useState, useEffect } from "react";
import RewriteHistory, { RewriteRecord } from "@/components/RewriteHistory";
import Header from "@/components/Header";
import { fetchStream } from "@/utils/stream";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SEED_LANGUAGES, SeedLanguage } from "@/constants/languages";

export default function Home() {
  const [text, setText] = useState("");
  const [isOriginal, setIsOriginal] = useState(true);
  const [isLimitEnforced, setIsLimitEnforced] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [remainingUses, setRemainingUses] = useLocalStorage<number | null>("remainingUses", null);
  const [history, setHistory] = useState<RewriteRecord[]>([]);
  const [examples, setExamples] = useState<string[]>(["Enter text here..."]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [seedLang, setSeedLang] = useLocalStorage<SeedLanguage>("seedLang", "English");
  const [isGettingSeed, setIsGettingSeed] = useState(false);

  useEffect(() => {
    fetch("/examples.json")
      .then((res) => res.json())
      .then((data) => { if (data && data.length) setExamples([...data].sort(() => Math.random() - 0.5)); })
      .catch(() => console.error("Failed to load examples"));

    const saved = localStorage.getItem("rewriteHistory");
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    if (!text && examples.length > 1) {
      const interval = setInterval(() => setPlaceholderIndex((prev) => (prev + 1) % examples.length), 3000);
      return () => clearInterval(interval);
    }
  }, [text, examples.length]);

  const saveHistory = (newHistory: RewriteRecord[]) => {
    setHistory(newHistory);
    localStorage.setItem("rewriteHistory", JSON.stringify(newHistory));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (isLimitEnforced && val.length > 120) return;
    setText(val);
    if (val === "") {
      setIsOriginal(true);
      setIsLimitEnforced(true);
    }
  };

  const handleGetSeed = async () => {
    if (isGettingSeed) return;
    setIsGettingSeed(true);
    try {
      await fetchStream("/api/seed", { language: seedLang }, (finalText) => {
        setText(finalText);
      }, setRemainingUses);
      setIsOriginal(true);
      setIsLimitEnforced(true);
    } catch (error: any) {
      alert(error.message || String(error));
    } finally {
      setIsGettingSeed(false);
    }
  };

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || loading) return;

    const originalText = text;
    setLoading(true);
    setIsThinking(true);

    try {
      const finalText = await fetchStream("/api/rewrite", { text: originalText }, (t, raw) => {
        setIsThinking(raw.includes("<think>") && !raw.includes("</think>"));
        setText(t);
      }, setRemainingUses);

      setIsOriginal(false);
      setIsLimitEnforced(false);

      if (finalText) {
        saveHistory([{ id: crypto.randomUUID(), original: originalText, rewritten: finalText, timestamp: Date.now() }, ...history]);
      }
    } catch (error: any) {
      alert(error.message || String(error));
    } finally {
      setLoading(false);
      setIsThinking(false);
    }
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + '\n#longermini')}`;

  return (
    <main className="min-h-screen p-8 sm:p-12 relative z-10">
      <div className="max-w-2xl mx-auto relative z-20">
        <Header />
        <form onSubmit={handleRewrite} className="flex flex-col gap-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder={examples[placeholderIndex]}
              className="w-full h-40 p-4 rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none transition-colors"
            />
            {isLimitEnforced && (
              <div className={`absolute bottom-3 right-3 text-xs ${text.length >= 120 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                {text.length} / 120
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <select value={seedLang} onChange={(e) => setSeedLang(e.target.value as SeedLanguage)} className="px-2 py-2 text-sm rounded-sm border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none">
                {SEED_LANGUAGES.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              <button type="button" onClick={handleGetSeed} disabled={isGettingSeed || loading} className="px-4 py-2 text-sm rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {isGettingSeed ? "..." : "getseed"}
              </button>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end ml-auto">
              {isThinking && <span className="text-sm font-semibold text-blue-600 animate-pulse">Thinking...</span>}
              {!isOriginal && !loading && (
                <a href={tweetUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-sm bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold transition-colors flex items-center justify-center text-sm">
                  Post to X
                </a>
              )}
              <button type="submit" disabled={loading || !text.trim()} className="px-6 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors">
                {loading ? "Processing..." : "longermini"}
              </button>
            </div>
          </div>
          {remainingUses !== null && <p className="text-xs text-right text-gray-500">{remainingUses} generation{remainingUses !== 1 ? 's' : ''} remaining today</p>}
        </form>
        <RewriteHistory history={history} onClear={() => saveHistory([])} />
      </div>
    </main>
  );
}
