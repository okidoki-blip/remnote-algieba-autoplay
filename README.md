# Flashcard Audio Autoplay

Plays an existing question recording when a configured flashcard appears, and its answer recording when the answer is revealed. Playback follows the active card in Card Clusters and stops the previous recording when the card or side changes. A replay button is available if autoplay is blocked.

## Configuration

The downloadable package contains no personal card mapping, card identifiers, recording URLs, recordings, or credentials. It starts with no configured cards and remains silent until you import your own configuration.

Open **Configure flashcard audio** from RemNote's command menu. Import a JSON object keyed by card ID; each record must contain `remId`, `question`, and `answer`. Both recordings must use HTTPS URLs. Save recordings, then reopen your review session. Saving replaces the previous configuration; saving `{}` clears it.

Configuration is saved through RemNote's synced plugin storage, separately from the public package and GitHub repository. It is handled by RemNote and may sync with your account; it is not described as a secret vault or as device-only storage. Only use media links you are authorized to play. Anyone who obtains a shareable recording link may be able to access that recording according to the media host's access controls.

## Permissions and network behavior

No note-reading scopes, note-writing scopes, or native-system access are requested. The plugin uses the active card ID and revealed state provided to its review widget. It does not edit notes, cards, schedules, or review history. It requests only the recording URLs you configure when playing media. There is no speech generation, Google API call, API key, analytics, or tracking service. An internet connection may be required to stream your recordings.

Review-only styling hides embedded audio controls and collapses audio-only spacing. Editor controls remain visible. This styling applies to reviews beyond configured cards. Desktop is the supported platform.

## Reviewer checks and correction

Version 0.1.10 replaces the earlier personal pilot package. The earlier upload included a personal three-card mapping and six media URLs; its description incorrectly implied that the submitted mapping was private. Unlisted packages can still be publicly downloaded. This replacement removes all personal mappings and media URLs from source and compiled assets and provides an explicit user import flow instead. The developer should request removal of earlier downloadable artifacts where possible. Removing this package's links does not revoke links already obtained from earlier versions.

Reviewers can inspect the manifest (empty required scopes), configure their own HTTPS recordings, and verify silence before configuration, question playback on entry, answer playback on reveal, stop on transition, and replay when blocked. No real user recordings are included for testing.

## Build

Source uses React, esbuild, and the public RemNote plugin SDK. Run `node build.mjs` after installing dependencies. Package only the `dist` contents. Do not add personal configuration to source, build inputs, screenshots, or published archives. The approved package runs within RemNote and does not require a localhost helper.
