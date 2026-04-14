export async function fetchStream(
  url: string,
  body: any,
  onChunk: (text: string, raw: string) => void,
  onRemainingUses?: (uses: number) => void
) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (response.headers.get("X-Remaining-Uses") && onRemainingUses) {
    onRemainingUses(parseInt(response.headers.get("X-Remaining-Uses")!, 10));
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || "Failed request");
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
    finalText = rawResponse.replace(/<think>[\s\S]*?(<\/think>|$)/g, "").trim();
    onChunk(finalText, rawResponse);
  }
  
  return finalText;
}
