"use client";

import { useState, useEffect } from "react";
import RewriteHistory, { RewriteRecord } from "@/components/RewriteHistory";
import Header from "@/components/Header";
import BackgroundCards from "@/components/BackgroundCards";

export default function Home() {
  const [text, setText] = useState("");
  const [isOriginal, setIsOriginal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [remainingUses, setRemainingUses] = useState<number | null>(null);
  const [history, setHistory] = useState<RewriteRecord[]>([]);
  const [examples, setExamples] = useState<string[]>(["Enter text here..."]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    fetch("/examples.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length) setExamples(data);
      })
      .catch(() => console.error("Failed to load examples"));

    const saved = localStorage.getItem("rewriteHistory");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (!text && examples.length > 1) {
      const interval = setInterval(() => {
        setPlaceholderIndex(Math.floor(Math.random() * examples.length));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [text, examples.length]);

  const saveHistory = (newHistory: RewriteRecord[]) => {
    setHistory(newHistory);
    localStorage.setItem("rewriteHistory", JSON.stringify(newHistory));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (isOriginal && val.length > 140) return;
    setText(val);
    setIsOriginal(true);
  };

  const handleRewrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || loading) return;

    const originalText = text;
    setLoading(true);
    setIsThinking(true);

    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: originalText }),
      });

      if (response.headers.get("X-Remaining-Uses")) {
        setRemainingUses(parseInt(response.headers.get("X-Remaining-Uses")!, 10));
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to rewrite");
      }

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let rawResponse = "";
      let finalText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        rawResponse += decoder.decode(value, { stream: true });
        
        const currentlyThinking = rawResponse.includes("<think>") && !rawResponse.includes("</think>");
        setIsThinking(currentlyThinking);

        finalText = rawResponse.replace(/<think>[\s\S]*?(<\/think>|$)/g, "").trim();
        setText(finalText);
      }

      setIsOriginal(false);
      setIsThinking(false);

      if (finalText) {
        const newRecord: RewriteRecord = {
          id: crypto.randomUUID(),
          original: originalText,
          rewritten: finalText,
          timestamp: Date.now(),
        };
        saveHistory([newRecord, ...history]);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
      setIsThinking(false);
    } finally {
      setLoading(false);
    }
  };

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;

  return (
    <main className="min-h-screen p-8 sm:p-12 relative z-10">
      <BackgroundCards />
      
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
            {isOriginal && (
              <div className={`absolute bottom-3 right-3 text-xs ${text.length >= 140 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                {text.length} / 140
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end ml-auto">
              {isThinking && <span className="text-sm font-semibold text-blue-600 animate-pulse">Thinking...</span>}
              
              {!isOriginal && !loading && (
                <a
                  href={tweetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-sm bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 font-semibold transition-colors flex items-center justify-center text-sm"
                >
                  Post to X
                </a>
              )}

              <button
                type="submit"
                disabled={loading || !text.trim()}
                className="px-6 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
              >
                {loading ? "Processing..." : "longermini!"}
              </button>
            </div>
          </div>
          
          {remainingUses !== null && (
            <p className="text-xs text-right text-gray-500">
              {remainingUses} generation{remainingUses !== 1 ? 's' : ''} remaining today
            </p>
          )}
        </form>

        <RewriteHistory history={history} onClear={() => saveHistory([])} />
      </div>
    </main>
  );
}