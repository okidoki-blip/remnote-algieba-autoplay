# RemNote Algieba Autoplay

Plays existing question audio when a mapped cloze card appears and answer audio when it is revealed. Supports native card clusters using the active widget card ID. Hides embedded audio bars only during flashcard review.

This repository contains plugin code only. No recordings, card text, real card IDs, audio URLs, credentials, or personal configuration are included.

The checked-in trial-map.json is deliberately empty. To build a personal package, configure that file locally with card IDs mapped to {remId, question, answer}, set a read-only DescendantsOfId scope for the target figure in manifest.json, and set repoUrl to this repository. Keep personal configuration out of commits. Install dependencies and run node build.mjs, then ZIP the contents of dist for RemNote's Upload Plugin tool.

An installed package includes its own code and needs no localhost helper or TTS API key. Playback uses existing RemNote audio attachments; network access may be needed to stream them. It never generates audio or edits notes or reviews.
