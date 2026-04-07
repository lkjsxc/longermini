# Product Features

## UI Layout
- A primary text input (textarea) for user input, restricted to 140 original characters.
- A prominent "longermini" submit button.
- A history section that lists past original and "longerminied" texts.
- ~200 placeholder sentences in various languages rotating every few seconds in the textarea.
- A native, exclusively dark-mode UI for optimal readability.
- Global Next.js error boundary handling for frontend crashes.
- Global border radius of ~4px (`rounded-sm`).
- A display of remaining generations out of the 10-per-day limit.

## Interaction Flow
1. User sees rotating placeholder examples in the textarea.
2. User enters text (up to 140 chars).
3. User clicks the submit button.
4. UI displays an explicit "Thinking..." state (streaming or simulated).
5. The local route calls the Gemini API, enforcing a strict rate limit of 10 requests/day.
6. The frontend overwrites the textarea with the newly generated text.
7. The new entry is prepended to the user's Local Storage history (using "longerminied").
8. User can repeatedly click "longermini" to expand the text further.
