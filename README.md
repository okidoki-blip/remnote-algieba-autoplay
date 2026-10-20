# Flashcard Audio Autoplay

Listen to existing question and answer recordings hands-free while reviewing configured flashcards. Question audio starts when a card appears; answer audio starts when the answer is revealed. Playback follows the active cloze card within native Card Clusters and stops the previous recording when the card or side changes.

Embedded audio players are hidden during review to keep the card readable. Review-only styling also collapses audio-only blank space. Audio controls remain available in the note editor, and the review widget provides replay or a play control if automatic playback is blocked.

## Current release and review scope

This is an unlisted, desktop-only personal pilot, configured for three sample cloze cards in one figure. Other cards remain silent. The general title describes the playback function; this release does not automatically support every card or provide a recording configuration interface. The stable plugin ID retains the original trial name to preserve the existing submission.

## Permissions and data handling

The submitted personal package requests read-only access to descendants of the configured figure to identify the active card. It does not write notes, create cards, change scheduling, or modify review history. No native-system access is requested.

The plugin plays previously attached recordings from RemNote-hosted media URLs. It does not generate speech, call Google or another AI service, require an API key, or send card text to a speech provider. Internet access may be required to stream recordings. Ordinary media requests go to the existing media host; the plugin adds no analytics or external tracking.

## Source and personal configuration

The public repository contains source code and an empty trial-map.json. Card text, personal card identifiers, recording URLs, recordings, and credentials are excluded. The private submitted package contains the three-card playback mapping. To reproduce a personal build, configure that mapping locally and the corresponding read-only descendant scope, install dependencies, run node build.mjs, and zip the dist contents. Do not commit personal mappings.

The uploaded package includes its playback code and requires no local helper once approved and installed. The development installation uses a localhost helper while approval is pending. A hosted development experiment was rejected by the desktop localhost loader; hosting is disabled. Extra compiled/setup files from that experiment are not part of the submitted package.

## Reviewer verification

Inspect the index widget, playback widget, controller, review CSS, and manifest. With the configured sample cards, verify question playback on entry, answer playback on reveal, stopped audio on card transitions, silent unmapped cards, replay availability, and preserved editor audio controls. The configured personal pilot has been tested on all six card sides. Approval remains at RemNote's discretion.
