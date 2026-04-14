# Features

## Main UI
- A large text area for user input.
- A "longermini!" submit button.
- A "Post to X" share button that appears after successful text processing.

## Placeholders
- The textarea randomly cycles through funny, informal placeholder sentences.
- Placeholder state is defined in `public/examples.json`.
- Changes occur every 3 seconds while the textarea is empty.

## Dark/Light Mode
- A manual toggle switch resides in the Header.
- The toggle adds or removes the `.dark` class on the `<html>` root element.
- The system defaults to Dark Mode initially or respects user OS preference if possible, but the manual toggle supersedes it via the `.dark` class custom variant in Tailwind v4.

## Character Limits
- User input is limited to 140 characters.

## History
- Processed generations are saved to `localStorage`.
- History can be cleared manually by the user.
