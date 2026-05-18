# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Loading the Extension

This is a Chrome Extension (Manifest V3) with no build step. To load it:

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select this directory
4. After any code change, click the refresh icon on the extension card to reload it

## Architecture

This is a **Manifest V3** Chrome Extension. The three execution contexts are:

- **`background.js`** — Service worker. Runs independently of any tab/window. Used here for `chrome.alarms` (fires every 1 second via `periodInMinutes: 1/60`). Cannot use `setInterval` reliably in MV3 service workers — the commented-out code shows this was intentionally replaced with `chrome.alarms`.
- **`popup.js`** — Injected into `popup.html`, which renders when the user clicks the extension icon. Reads `name` from `chrome.storage.sync` and displays the current time. Also sets the badge text via `chrome.action.setBadgeText`.
- **`options.js`** — Injected into `options.html` (accessible via right-click → Options). Writes a user-provided name to `chrome.storage.sync`.

## Data Flow

`options.js` → `chrome.storage.sync.set({name})` → `popup.js` reads it back via `chrome.storage.sync.get(["name"])`. The `storage` and `alarms` permissions in `manifest.json` are required for these APIs.

## Key Constraints

- No `window` or DOM access in `background.js` — it is a service worker.
- MV3 service workers are not persistent; avoid relying on in-memory state across alarm firings.
- `chrome.action.setBadgeText` is called from `popup.js` (not background), so the badge only updates when the popup opens.