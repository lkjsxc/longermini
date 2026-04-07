# Purpose Contract

## Goal

`longermini` is a simple web application with a single text input box. When activated, it uses the Gemini API to rewrite the input into a progressively longer, more verbose piece of text with a similar meaning. It explicitly avoids adding new information or altering the core meaning (e.g., "My stomach hurts" becomes "My internal organs, probably my stomach and intestines, are crying out").

## Product Intent

- Serve a lightweight, fast, exclusively dark-mode UI.
- Allow users to input short text (max 140 characters).
- Generate longer variants using AI (`gemini-3-flash-preview` by default).
- Support explicit thinking phases for the LLM output.
- Overwrite the input field directly with the generated text, enabling repeated expansion.
- Store generation history locally in the browser.
- Limit usage to 10 generations per day per client.

## Non-Goals

- No persistent backend database storage for user history.
- No multi-user authentication.
- No complex or multi-page workflows.
- No style selection options; strict adherence to the default expansion behavior.