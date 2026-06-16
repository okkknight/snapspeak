# Changelog

## 2026-06-16

- Initialized the `snapspeak` project context and handoff pack.
- Standardized project naming to `snapspeak`.
- Marked the MVP as mock-output first with no real AI API required yet.
- Implemented the reusable mobile UI component library in React/Vite, then folded it into the mobile-only Camera Mode / Result Mode prototype.
- Converted the app into a mobile-only Camera Mode / Result Mode prototype.
- Replaced the mock-only pipeline with a real Codex CLI-backed generation flow, live camera capture, browser caching, loading/error/retry states, and end-to-end browser verification on the local dev machine.
- Independent acceptance completed on the current workspace: verified live camera preview, shutter capture, result generation, mode tabs, level switching, browser cache reuse, voice playback, Chinese explanation toggle, share/expand actions, retake, upload fallback, retry after forced generation failure, and camera-unavailable fallback.
- Deployed `snapspeak` onto the `boringmax` VPS under `/opt/boringmax/snapspeak` and `/opt/boringmax/site/snapspeak`, added a `snapspeak.service`, registered it in `boringapi`, routed `/snapspeak/api/*` through Caddy, and fixed `boringapi`'s `tsx` temp-dir runtime by setting `TMPDIR` to a writable path.

## 2026-06-17

- Reviewer verification on the VPS passed for the core mobile flow when opened at `https://boringmax.com/snapspeak/`: live camera preview, shutter capture, result generation, mode switching, level switching, cache reuse, voice playback, Chinese explanation toggle, share/expand, retake, and retry after a forced generation failure all worked.
- Reviewer found two deployment issues that keep the overall acceptance from being a clean pass: opening `https://boringmax.com/snapspeak` without the trailing slash returns 404 because the frontend resolves `./api/generate` against the wrong base URL, and uploading a typical ~1.6 MB image returned `Payload Too Large` while only a very small image uploaded successfully.
