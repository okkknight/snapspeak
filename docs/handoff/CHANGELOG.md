# Changelog

## 2026-06-16

- Initialized the `snapspeak` project context and handoff pack.
- Standardized project naming to `snapspeak`.
- Marked the MVP as mock-output first with no real AI API required yet.
- Implemented the reusable mobile UI component library in React/Vite, then folded it into the mobile-only Camera Mode / Result Mode prototype.
- Converted the app into a mobile-only Camera Mode / Result Mode prototype.
- Replaced the mock-only pipeline with a real Codex CLI-backed generation flow, live camera capture, browser caching, loading/error/retry states, and end-to-end browser verification on the local dev machine.
- Independent acceptance completed on the current workspace: verified live camera preview, shutter capture, result generation, mode tabs, level switching, browser cache reuse, voice playback, Chinese explanation toggle, share/expand actions, retake, upload fallback, retry after forced generation failure, and camera-unavailable fallback.
