# Purpose Contract

## Goal
`longermini` is a web application with a single primary text input box. It utilizes the Gemini API to progressively rewrite input into longer, more verbose, and dramatically embellished text that retains identical meaning. It explicitly refuses to add new semantic facts or alter core intent (e.g., "My stomach hurts" strictly becomes "My internal organs, probably my stomach and intestines, are crying out in agony").

## Product Intent
- Deliver a lightweight, fast UI supporting both explicit Dark (default) and Light modes.
- Allow short input (max 140 characters).
- Expand text using `gemini-3-flash-preview`.
- Support a highly constrained, fast explicit "thinking" phase (< 5 seconds).
- Overwrite the input directly, encouraging continuous repeated expansion.
- Provide a rich ambient background of historical I/O examples floating and fading to demonstrate app capabilities visually.
- Enable immediate social sharing of outputs to X (Twitter).
- Store usage history locally without enforcing logins.
- Cap usage at 10 generations per client, per day.

## Non-Goals
- No persistent backend database storage for user generations.
- No user authentication or multi-user accounts.
- No complex multi-page workflows or configuration screens.
- No altering the original semantic meaning of the text.
