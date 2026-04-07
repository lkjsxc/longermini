'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service if needed
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen p-8 sm:p-12 text-gray-100 bg-[#0a0a0a] flex flex-col items-center justify-center">
      <div className="max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-400 mb-8">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
