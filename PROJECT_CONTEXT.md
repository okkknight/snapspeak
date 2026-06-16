# snapspeak Project Context

## What The Project Is

`snapspeak` is a mobile-first web prototype for turning a photo into short, natural English learning content.

The product flow is:
camera mode -> capture/upload photo -> result mode -> play English -> switch mode or level -> retake.

## What The Project Is Not

- Not a login or account product
- Not a history or progress tracker
- Not a payment product
- Not a real-time camera AI streaming product
- Not a speaking score or correction product
- Not an iOS native app

## Current Product State

- Design is settled in `docs/snapspeak_PRD.md`
- Visual reference is in `docs/image.png`
- Project name is standardized as `snapspeak`
- Git repository is initialized on `main`
- React/Vite component library is implemented in `src/`
- App.tsx is a component showcase page, not the final product flow
- MVP uses mock content instead of a real AI API

## Current Latest Task And Status

- Latest completed task: build the reusable mobile UI component library and showcase page
- Status: complete

## Architecture Or State Flow

- Two UI states: Camera Mode and Result Mode
- Default state: `Describe + Normal`
- Modes: `Describe`, `Explain`, `Comment`, `Practice`
- Levels: `Easy`, `Normal`, `Advanced`
- Result content should be cacheable by `photoId + mode + level`
- Voice playback uses browser TTS for English only

## Key Files

- `AGENTS.md`
- `docs/snapspeak_PRD.md`
- `docs/image.png`
- `src/App.tsx`
- `src/components/`
- `src/data/mockResults.ts`
- `flow/task/TASK_TEMPLATE.md`
- `flow/issue/ISSUE_TEMPLATE.md`
- `flow/dev_report/DEV_REPORT_TEMPLATE.md`
- `docs/handoff/README.md`
- `docs/handoff/CHANGELOG.md`

## Verified Commands

- `git init -b main`
- `git status --short`
- `rg -n "Photo English Coach|Photo_English_Coach|SnapSpeak|snapspeak" .`

## Runtime Notes

- The repo currently contains docs only
- No buildable frontend app exists yet
- `docs/.DS_Store` and root `.DS_Store` should stay ignored

## Working Rules

- Keep the first implementation phase lightweight
- Preserve the camera-app feel
- Use mock results first, not a real AI API
- Keep English content visually dominant
- Keep Chinese explanation secondary and collapsed by default

## Open Decisions

- When to replace mock output with a real vision model API
- Whether the first runnable UI should be pure mock data or photo upload plus local static mapping

## Main Risks And Tradeoffs

- Overbuilding backend too early would slow the prototype
- Mixing mode switching and level switching gestures could create UX ambiguity
- Letting the UI drift toward a generic AI form would break the product intent
