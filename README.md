# RemNote Algieba Autoplay

Hosted three-card trial with question audio on card entry, answer audio on reveal, hidden embedded audio bars and compact cloze review spacing.

This repository and its compiled JavaScript contain code only: no card text, real card IDs, audio URLs, recordings, API keys, or personal configuration. The plugin requests no note-reading or note-editing permissions. It matches the active FlashcardUnder widget card ID against three configured cards.

The setup popup imports exactly three card mappings into RemNote synced plugin storage. Configuration is never sent to GitHub. Shape: an object whose keys are card IDs, with each value containing remId, question and answer HTTPS URLs. Use the Configure Algieba trial recordings command to replace configuration. Keep private configuration out of commits.

Install dependencies and run node build.mjs. The root compiled files are served through GitHub Pages for a self-hosted development trial while the separately submitted package awaits RemNote approval. Loading from a hosted development address depends on RemNote's supported development interface. Audio streams from existing RemNote attachments; internet access is required. No TTS generation requests are made.
