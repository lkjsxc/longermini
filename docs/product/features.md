# Product Features

## UI Structure
- A central text area for user input.
- A "longermini" button to process text via the Gemini AI API.
- A "Post to X" button that appears post-generation, appending `#longermini` to the tweet.
- A "getseed" feature to request a short, random sentence from AI in various languages.

## Character Limits
- The initial input limit is strictly 120 characters.
- Once the text is successfully expanded via the "longermini" button, this limit is lifted.
- Users can then freely edit their expanded text without hitting the 120-character restriction.
- If the user deletes all text (clearing the box entirely), the 120-character limit is re-enforced.

## Placeholders
- The empty state displays casual, funny, and mundane phrases in multiple languages.
- These placeholders rotate automatically every 3 seconds.
- The placeholder list is loaded from `public/examples.json`.

## getseed Feature
- Allows users to select a language (English, Japanese, Chinese, Korean, Spanish, French, German, Italian, Portuguese, Russian, Arabic, Hindi).
- Requests a short, casual sentence from the Gemini API to serve as a seed for the longermini expansion.