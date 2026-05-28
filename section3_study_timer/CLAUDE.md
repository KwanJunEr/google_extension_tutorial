# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Loading the Extension

This is a Chrome Extension (Manifest V3) with no build step. To load it:

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select this directory
4. After any code change, click the refresh icon on the extension card to reload it

## Project Purpose

A study timer (Pomodoro-style) Chrome Extension. Intended to track work/break intervals, persist state across popup opens/closes, and optionally send desktop notifications when a session ends.

## Architecture

**Manifest V3** Chrome Extension — same three-context model as section2:

- **`background.js`** — Service worker. Owns the timer logic. Use `chrome.alarms` for timed events (not `setInterval`, which is unreliable in MV3 service workers). Persists timer state to `chrome.storage.local` so it survives service worker restarts.
- **`popup.js`** — Injected into `popup.html`. Reads timer state from `chrome.storage.local` and renders it. Sends messages to the background service worker via `chrome.runtime.sendMessage` to start/pause/reset the timer.
- **`options.js`** — Injected into `options.html` (right-click → Options). Allows configuring session durations, written to `chrome.storage.sync`.

## Key MV3 Constraints

- No persistent in-memory state in `background.js` — the service worker can be killed and restarted between alarm firings. All timer state must be stored in `chrome.storage`.
- `chrome.alarms` minimum interval is 1 minute in production; during development with `periodInMinutes` fractional values work for testing.
- `chrome.notifications` requires the `"notifications"` permission in `manifest.json`.
- No `window` or DOM access in `background.js`.