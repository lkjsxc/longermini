"use client";

export type RewriteRecord = {
  id: string;
  original: string;
  rewritten: string;
  timestamp: number;
};

interface Props {
  history: RewriteRecord[];
  onClear: () => void;
}

export default function RewriteHistory({ history, onClear }: Props) {
  if (history.length === 0) {
    return <p className="text-gray-500 italic mt-8 text-center">No longerminied texts yet.</p>;
  }

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">History</h2>
        <button onClick={onClear} className="text-sm text-red-500 hover:underline rounded-sm px-2 py-1">Clear</button>
      </div>
      <div className="space-y-6">
        {history.map((record) => (
          <div key={record.id} className="p-4 border rounded-sm bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 shadow-sm">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {new Date(record.timestamp).toLocaleString()}
            </div>
            <div className="mb-2">
              <span className="font-semibold text-sm">Original:</span>
              <p className="mt-1 text-sm">{record.original}</p>
            </div>
            <div>
              <span className="font-semibold text-sm">Longerminied:</span>
              <p className="mt-1 text-sm">{record.rewritten}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}