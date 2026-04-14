# Product Features

## UI Layout
- **Input:** A primary text input (textarea) restricted to 140 original characters.
- **Primary Action:** A prominent submit button labeled exactly "longermini!".
- **Header Actions:** A GitHub source code link and a manual Light/Dark Theme toggle button in the top header.
- **Social Action:** An X (Twitter) post button (using Twitter Intent) appears alongside the submit button, pre-filled with the rewritten text.
- **Background Cards:** ~100 Input/Output examples randomly selected and displayed as softly fading background cards (using CSS transitions) without blocking pointer events.
- **Placeholders:** Textarea placeholder shows examples randomly chosen from an array.
- **Theming:** Defaults to dark mode (`bg-[#0a0a0a]`). Supports light mode via manual toggle applying CSS classes/variables.
- **Usage Limit:** Displays remaining daily generations.

## Interaction Flow
1. User loads page; background cards randomly fade in/out behind the UI.
2. User sees random placeholder examples in the textarea.
3. User enters text (up to 140 chars).
4. User clicks "longermini!".
5. UI displays "Thinking..." state while the backend executes a strictly constrained (~5 seconds max) `<think>` phase.
6. Local API enforces 10 requests/day limit.
7. Textarea is overwritten with the expanded, verbose text.
8. The new entry is prepended to the user's local history.
9. User can easily post the exact rewritten text to X (Twitter) via the newly revealed button.
10. User can repeatedly click "longermini!" for further expansion.
