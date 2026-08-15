# snapspeak Real AI Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mock-only learning pipeline with a real photo-to-English generation flow that captures or uploads an image, sends it to a secure AI backend, validates structured output, and renders that output inside the existing mobile UI.

**Architecture:** Keep the current Vite/React client as the presentation and interaction layer only. Add a Node AI proxy that owns image handling, prompt assembly, Codex-driven multimodal calls, response validation, and error mapping. In the current trusted development environment, the proxy can run under Codex-managed ChatGPT auth by shelling out to `codex exec` with the captured image attached. The frontend is responsible for live camera preview, photo capture, mode/level state, request lifecycle, local caching, and Web Speech playback. The prototype should render as the real product UI without the temporary phone-shell container.

**Tech Stack:** React 19, Vite, TypeScript, browser camera/file APIs, Web Speech API, OpenAI multimodal API, Zod, Vitest, Playwright, and a lightweight Node-based backend proxy. If the deployment target later changes, only the proxy runtime changes; the frontend contract stays stable.

---

## Confirmed Decisions

1. AI provider/runtime: OpenAI multimodal model through a Node proxy using `codex exec` in the trusted dev environment.
2. Development auth: Codex CLI ChatGPT OAuth / local `auth.json` workflow for the trusted dev environment only.
3. Photo input: real live camera preview plus capture.
4. Failure behavior: structured error card with Retry, no mock fallback.
5. Caching scope: browser-only cache by `photoId + mode + level`.
6. UI framing: no temporary phone-shell container in the real product UI.

**Important note:** this plan deliberately scopes Codex-managed auth to local/trusted development. If the project later needs a shared staging or production backend, add a separate authentication decision then instead of assuming the Codex CLI session is the deployment credential.

---

## Task 1: Freeze the AI contract and add a test harness

**Files:**
- Modify: `package.json`
- Modify: `src/types.ts`
- Create: `src/lib/ai/schema.ts`
- Create: `src/lib/ai/prompt.ts`
- Create: `src/lib/ai/schema.test.ts`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, expect, it } from 'vitest';
import { aiResultSchema } from './schema';
import { buildPrompt } from './prompt';

describe('aiResultSchema', () => {
  it('accepts the exact snapspeak result shape', () => {
    const parsed = aiResultSchema.parse({
      title: 'Describe',
      english: ['I can see a coffee mug on the desk.'],
      words: ['coffee mug', 'desk', 'next to'],
      chinese: '我能看到桌上有一个咖啡杯。',
      speakText: 'I can see a coffee mug on the desk.',
    });

    expect(parsed.title).toBe('Describe');
  });
});

describe('buildPrompt', () => {
  it('includes the selected mode and level rules', () => {
    const prompt = buildPrompt('Practice', 'Advanced');
    expect(prompt).toContain('Practice');
    expect(prompt).toContain('Advanced');
    expect(prompt).toContain('Return JSON only');
  });
});
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run:

```bash
npm run test src/lib/ai/schema.test.ts
```

Expected: fail because `vitest` and the new AI contract files do not exist yet.

- [ ] **Step 3: Implement the contract layer**

Implement:

```ts
// src/lib/ai/schema.ts
import { z } from 'zod';
export const aiResultSchema = z.object({
  title: z.enum(['Describe', 'Explain', 'Comment', 'Practice']),
  english: z.array(z.string().min(1)).min(1).max(3),
  words: z.array(z.string().min(1)).length(3),
  chinese: z.string().min(1),
  speakText: z.string().min(1),
});
```

```ts
// src/lib/ai/prompt.ts
export function buildPrompt(mode: Mode, level: Level) {
  return `You are a photo-based English coach.
Mode: ${mode}
Level: ${level}
Return JSON only with title, english, words, chinese, speakText.
`;
}
```

Add the Vitest config, update scripts in `package.json`, and keep the prompt rules aligned with `docs/snapspeak_PRD.md`.

- [ ] **Step 4: Run the tests and confirm they pass**

Run:

```bash
npm run test src/lib/ai/schema.test.ts
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add package.json src/types.ts src/lib/ai vitest.config.ts vitest.setup.ts
git commit -m "feat: define snapspeak ai contract"
```

---

## Task 2: Build the secure AI proxy

**Files:**
- Create: `server/index.ts`
- Create: `server/generate.ts`
- Create: `server/codexRunner.ts`
- Create: `server/prompts.ts`
- Create: `server/image.ts`
- Create: `server/validate.ts`
- Create: `server/config.ts`
- Create: `.env.example`
- Modify: `package.json`
- Modify: `vite.config.ts`

- [ ] **Step 1: Write the failing tests**

Test the pure helpers first so the route stays thin:

```ts
import { describe, expect, it } from 'vitest';
import { buildPrompt } from './prompts';
import { validateAiResult } from './validate';

describe('validateAiResult', () => {
  it('rejects malformed AI output', () => {
    expect(() =>
      validateAiResult({
        title: 'Describe',
        english: ['ok'],
        words: ['a', 'b'],
        chinese: '中文',
        speakText: 'ok',
      }),
    ).toThrow();
  });
});
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run:

```bash
npm run test server/validate.test.ts
```

Expected: fail because the backend modules are missing.

- [ ] **Step 3: Implement the proxy and request shape**

Implement a `/api/generate` endpoint that accepts:

```json
{
  "photoId": "string",
  "mode": "Describe | Explain | Comment | Practice",
  "level": "Easy | Normal | Advanced",
  "image": "multipart file or base64 payload"
}
```

Implementation details:

```ts
// server/routes/generate.ts
// 1. Validate mode/level.
// 2. Validate image mime type and size.
// 3. Build the system + user prompt from mode and level.
// 4. Send the image and prompt to the multimodal model.
// 5. Parse the JSON response through aiResultSchema.
// 6. Return the validated result or a mapped error.
```

Use `codex exec` in `server/codexRunner.ts` together with an output schema file so the trusted dev environment can call a multimodal OpenAI model without a project API key. Return only the data the frontend needs.

- [ ] **Step 3.5: Wire trusted development auth**

Make the backend rely on the current local Codex auth state from the trusted development environment instead of a project API key. Keep this contained to local development and do not commit `auth.json`.

```ts
// server/config.ts
// Read the current development command/runtime config for Codex exec.
// If Codex is not available or auth is missing, fail loudly with a dev-only error.
```

- [ ] **Step 3.6: Run the proxy locally and confirm it can authenticate**

Run:

```bash
npm run dev:server
```

Expected: the proxy boots under the current trusted Codex auth environment and can complete one generation request against the multimodal model.

- [ ] **Step 4: Run the tests and confirm they pass**

Run:

```bash
npm run test server/validate.test.ts
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add server package.json vite.config.ts .env.example
git commit -m "feat: add ai proxy"
```

---

## Task 3: Replace mock photo input with a real capture/upload path

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/CameraPreview.tsx`
- Modify: `src/components/CameraBottomBar.tsx`
- Create: `src/components/PhotoInput.tsx`
- Create: `src/hooks/usePhotoCapture.ts`
- Modify: `src/components/CapturedPhotoPreview.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write the failing tests**

Add a small unit test for the photo metadata helper:

```ts
import { describe, expect, it } from 'vitest';
import { createPhotoDraft } from './usePhotoCapture';

describe('createPhotoDraft', () => {
  it('creates a stable photo id and preview URL wrapper', () => {
    const draft = createPhotoDraft(new File(['x'], 'demo.jpg', { type: 'image/jpeg' }));
    expect(draft.photoId).toMatch(/^photo_/);
    expect(draft.file.type).toBe('image/jpeg');
  });
});
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run:

```bash
npm run test src/hooks/usePhotoCapture.test.ts
```

Expected: fail because the helper does not exist yet.

- [ ] **Step 3: Implement photo acquisition**

Implement a live camera preview with a capture flow, plus a file-input fallback:

```html
<input type="file" accept="image/*" capture="environment" />
```

Then wire the current shutter and album actions so the user can:

1. Open the camera capture sheet.
2. See a real live camera preview from `getUserMedia`.
3. Capture a frame into a still image.
4. Pick a photo from the album as a fallback path.
5. See a captured preview immediately after selection.

Treat camera permission denial as a recoverable state that switches to album upload.

- [ ] **Step 4: Run the tests and confirm they pass**

Run:

```bash
npm run test src/hooks/usePhotoCapture.test.ts
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/CameraPreview.tsx src/components/CameraBottomBar.tsx src/components/CapturedPhotoPreview.tsx src/components/PhotoInput.tsx src/hooks/usePhotoCapture.ts src/styles.css
git commit -m "feat: add real photo capture flow"
```

---

## Task 4: Swap mock results for real AI generation and caching

**Files:**
- Create: `src/lib/aiClient.ts`
- Create: `src/lib/cache.ts`
- Create: `src/hooks/useGeneration.ts`
- Modify: `src/App.tsx`
- Modify: `src/components/ResultBottomSheet.tsx`
- Modify: `src/components/EnglishResultCard.tsx`
- Modify: `src/data/mockResults.ts` if a demo fallback is still needed

- [ ] **Step 1: Write the failing tests**

Test the cache key and in-memory store behavior:

```ts
import { describe, expect, it } from 'vitest';
import { buildCacheKey } from './cache';

describe('buildCacheKey', () => {
  it('uses photo, mode, and level', () => {
    expect(buildCacheKey('photo_1', 'Describe', 'Normal')).toBe('photo_1::Describe::Normal');
  });
});
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run:

```bash
npm run test src/lib/cache.test.ts
```

Expected: fail because the cache helper does not exist yet.

- [ ] **Step 3: Implement the generation hook**

Implement this flow:

```ts
// 1. When the user captures a photo, store photoId + file + previewUrl.
// 2. When screen === result, call /api/generate with photoId, mode, level, and the image payload.
// 3. Cache the validated AIResult in memory by photoId + mode + level.
// 4. If the user switches mode or level, reuse cache when present; otherwise fetch again.
// 5. Cancel the in-flight request when the user retakes or changes to a new photo.
```

The result screen should show loading state, then the AI result. If the request fails, keep the last successful result only for the current photo when the retry path is still relevant; do not silently replace failures with mock content.

- [ ] **Step 4: Run the tests and confirm they pass**

Run:

```bash
npm run test src/lib/cache.test.ts
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/lib/aiClient.ts src/lib/cache.ts src/hooks/useGeneration.ts src/components/ResultBottomSheet.tsx src/components/EnglishResultCard.tsx
git commit -m "feat: wire ai generation pipeline"
```

---

## Task 5: Add loading, error, retry, and accessibility states

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/ResultBottomSheet.tsx`
- Modify: `src/components/EnglishResultCard.tsx`
- Modify: `src/components/VoiceButton.tsx`
- Modify: `src/components/ChineseExplanation.tsx`
- Modify: `src/styles.css`

- [ ] **Step 1: Write the failing tests**

```ts
import { describe, expect, it } from 'vitest';
import { isRetryableGenerationError } from './errors';

describe('isRetryableGenerationError', () => {
  it('treats timeouts and network failures as retryable', () => {
    expect(isRetryableGenerationError(new Error('fetch failed'))).toBe(true);
  });
});
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run:

```bash
npm run test src/lib/errors.test.ts
```

Expected: fail because the helper does not exist yet.

- [ ] **Step 3: Implement the UX states**

Add:

1. A clear loading state on the result sheet while the AI call is in flight.
2. A retry action that reuses the same photo and current mode/level.
3. A friendly error card when the proxy or model fails.
4. Speech controls that stop audio when the user retakes or leaves the result screen.
5. ARIA labels and disabled states for buttons that should not be interactive during loading.

- [ ] **Step 4: Run the tests and confirm they pass**

Run:

```bash
npm run test src/lib/errors.test.ts
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/components/ResultBottomSheet.tsx src/components/EnglishResultCard.tsx src/components/VoiceButton.tsx src/components/ChineseExplanation.tsx src/styles.css
git commit -m "feat: improve ai result states"
```

---

## Task 6: Verify the end-to-end product and prepare deployment

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/snapspeak.spec.ts`
- Modify: `README.md`
- Modify: `docs/handoff/CHANGELOG.md`
- Modify: `docs/snapspeak_PRD.md` if the implementation adds a deliberate product decision

- [ ] **Step 1: Write the failing end-to-end test**

```ts
import { expect, test } from '@playwright/test';

test('snapspeak happy path', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByLabel('Camera mode')).toBeVisible();
  await page.getByLabel('Take photo').click();
  await expect(page.getByLabel('Result mode')).toBeVisible();
  await expect(page.getByText('Describe')).toBeVisible();
});
```

- [ ] **Step 2: Run the test and confirm it fails**

Run:

```bash
npx playwright test tests/e2e/snapspeak.spec.ts
```

Expected: fail until the real flow and test setup exist.

- [ ] **Step 3: Implement the smoke test and deployment notes**

Add a mobile viewport config, a repeatable local start command, and a deployment note that matches the confirmed runtime from Task 2. Document:

1. Required environment variables.
2. How to run the frontend and proxy locally.
3. Which endpoint serves the AI requests.
4. What the retry/error behavior is.

- [ ] **Step 4: Run the test and confirm it passes**

Run:

```bash
npx playwright test tests/e2e/snapspeak.spec.ts
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/e2e README.md docs/handoff/CHANGELOG.md docs/snapspeak_PRD.md
git commit -m "feat: verify snapspeak real ai flow"
```

---

## Coverage Check

- The plan covers the PRD’s required flow: capture or upload photo, default `Describe + Normal`, structured English output, useful words, Chinese explanation, speech playback, mode switching, level switching, same-photo regeneration, and retake.
- The plan intentionally does not add login, history, rating, continuous camera AI, or native iOS code.
- The only open product decisions are provider/runtime, v1 photo input style, fallback behavior, and whether server-side caching is worth the extra complexity.
