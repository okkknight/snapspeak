# AGENTS.md

## Project

Build a mobile-first web prototype for **snapspeak**.

Product idea:

> Take a photo, turn the real-world scene into short, natural English learning content.

The first version is a high-fidelity UI prototype for Codex to implement. Focus on UI restoration, interaction flow, and clean component structure. Do not overbuild backend, login, history, or advanced learning features.

---

## Core Experience

The app has two main states:

1. **Camera Mode**
2. **Result Mode**

The product should feel like a polished camera app, not a form-based AI tool.

---

## Target Platform

Build for **mobile web first**.

Recommended stack:

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion if animation is needed

The UI should be responsive, but the main target is iPhone-sized screens.

---

## Visual Direction

Use the provided UI design image as the main visual reference.

Style keywords:

- Modern mobile app
- Camera-first
- Soft glassmorphism
- Warm ivory background
- Purple + yellow accent
- Rounded cards
- Calm shadows
- Clean typography
- Premium but simple

Suggested colors:

```css
--bg: #F7F6FF;
--surface: #FFFFFF;
--surface-warm: #FFF9EE;
--text: #111827;
--muted: #6B7280;
--primary: #6D4AFF;
--primary-dark: #2A145A;
--yellow: #FFC928;
--yellow-soft: #FFF1B8;
--border: rgba(17, 24, 39, 0.08);
```

Use system fonts:

```css
font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", "PingFang SC", sans-serif;
```

---

## State 1: Camera Mode

### Purpose

User opens the page and can immediately take a photo.

### Layout

Full mobile screen.

Top:

- Status bar mock area
- Minimal camera controls:
  - Close / back icon
  - Flash icon
  - Camera switch icon

Main:

- Camera preview area
- Use a realistic placeholder image if real camera is not implemented yet
- Add subtle grid lines
- Add a soft focus feeling

Bottom:

- Dark translucent control panel
- Current mode and level chip: `Describe · Normal`
- Large yellow shutter button
- Album / upload button
- Settings button

### Behavior

Default values:

```ts
currentMode = "Describe"
currentLevel = "Normal"
currentImage = null
```

Clicking the shutter button should switch to Result Mode.

For MVP, it is acceptable to use a mock captured image instead of real camera capture if camera implementation slows progress.

---

## State 2: Result Mode

### Purpose

Show the captured photo and AI-generated English learning result.

### Layout

Top:

- Captured photo preview
- Back button
- Share icon
- Optional expand image icon

Bottom:

- White / warm bottom sheet
- Draggable-looking handle
- Mode title
- Level selector
- Mode tabs
- English output
- Useful words chips
- Voice play button
- Optional waveform visual
- Favorite/star button
- Chinese explanation collapsible card
- Bottom action bar:
  - Retake
  - Switch level

### Bottom Sheet

The result content should look like a premium card over the photo.

The bottom sheet can be static in the MVP, but visually it should feel like it can be dragged.

---

## Modes

There are four output modes:

```ts
type Mode = "Describe" | "Explain" | "Comment" | "Practice";
```

### Describe

Goal: describe what is visible in the photo.

Example:

```text
I can see a coffee mug on the desk.
There is a laptop next to it.
```

### Explain

Goal: explain the main object or scene.

Example:

```text
This is a laptop.
People use it to work, study, or surf the internet.
```

### Comment

Goal: give a natural human-like comment about the scene.

Example:

```text
This scene looks clean and comfortable.
It's a great place to study or work.
```

### Practice

Goal: ask the user to say something.

Example:

```text
Try to describe this photo in one sentence.
Example: I can see a coffee mug on the desk.
```

---

## Mode Switching

In Result Mode, users should be able to switch modes without retaking the photo.

Preferred interaction:

- Horizontal mode tabs
- Also support swipe-like carousel if easy

Mode list:

```text
Describe | Explain | Comment | Practice
```

When mode changes:

```ts
currentImage + currentMode + currentLevel -> generate or show cached result
```

For the prototype, use mock content for each mode.

---

## Difficulty Levels

There are three levels:

```ts
type Level = "Easy" | "Normal" | "Advanced";
```

Default:

```ts
currentLevel = "Normal";
```

### Easy

- Short sentences
- Simple words
- Beginner friendly

### Normal

- Default
- Natural spoken English
- Useful for most learners

### Advanced

- Richer expression
- More detailed
- More natural phrasing

Changing level should regenerate or switch mock content for the current photo and mode.

---

## AI Output Data Structure

Use this structure internally:

```ts
type AIResult = {
  title: Mode;
  english: string[];
  words: string[];
  chinese: string;
  speakText: string;
};
```

Example:

```json
{
  "title": "Describe",
  "english": [
    "I can see a coffee mug on the desk.",
    "There is a laptop next to it."
  ],
  "words": ["coffee mug", "desk", "next to"],
  "chinese": "我能看到桌上有一个咖啡杯。旁边有一台笔记本电脑。",
  "speakText": "I can see a coffee mug on the desk. There is a laptop next to it."
}
```

---

## Voice

MVP can use browser TTS:

```ts
const utterance = new SpeechSynthesisUtterance(result.speakText);
utterance.lang = "en-US";
speechSynthesis.speak(utterance);
```

Rules:

- Only read English content
- Do not read Chinese explanation
- Provide a clear Play button
- Auto-play is not required

---

## Chinese Explanation

Chinese explanation should exist but stay secondary.

Behavior:

- Default collapsed
- User taps to expand
- English content must remain visually dominant

---

## Mock Data

Use a desk scene as the default sample photo:

- coffee mug
- laptop
- notebook
- desk
- plant

Mock content should cover all four modes and three difficulty levels if possible.

---

## Required MVP Features

Implement these:

- Mobile-first layout
- Camera Mode screen
- Result Mode screen
- Shutter button switches to result
- Captured photo preview
- Default `Describe + Normal`
- Four mode tabs
- Three difficulty levels
- English result card
- Useful words chips
- Play voice button
- Chinese explanation collapse/expand
- Retake button
- Smooth transitions

---

## Do Not Implement Yet

Avoid these in the first version:

- User login
- Payment
- History records
- Cloud storage
- Real backend unless necessary
- Real AI API unless explicitly requested
- Real speaking assessment
- Real-time camera AI streaming
- iOS native code

---

## Component Suggestion

Suggested component structure:

```text
src/
  App.tsx
  components/
    PhoneShell.tsx
    CameraScreen.tsx
    ResultScreen.tsx
    CameraPreview.tsx
    CameraControls.tsx
    ResultBottomSheet.tsx
    ModeTabs.tsx
    LevelSelector.tsx
    WordChips.tsx
    VoiceButton.tsx
    ChineseExplanation.tsx
  data/
    mockResults.ts
  types/
    index.ts
```

Keep components clean and small.

---

## Interaction Flow

```text
Open app
↓
Camera preview
↓
Tap shutter
↓
Show result page
↓
Play English
↓
Switch mode
↓
Switch level
↓
Retake photo
```

---

## Acceptance Criteria

The prototype is acceptable when:

1. It looks like a polished mobile app, not a wireframe.
2. The initial screen looks like a camera interface.
3. The result screen clearly shows photo + AI learning card.
4. Mode switching works.
5. Level switching works.
6. Voice playback works with browser TTS.
7. Chinese explanation can expand/collapse.
8. Retake returns to Camera Mode.
9. The UI visually matches the design direction.
10. No unnecessary complex features are added.

---

## Implementation Priority

Build in this order:

1. Static mobile layout
2. Camera Mode visual
3. Result Mode visual
4. Mock data for modes and levels
5. Mode switching
6. Level switching
7. Voice playback
8. Chinese explanation toggle
9. Polish spacing, shadows, transitions

Focus on visible product quality first.
