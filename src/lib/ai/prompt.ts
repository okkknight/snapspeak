import type { Level, Mode } from '../../types';

const modeGuidance: Record<Mode, string> = {
  Describe: 'Describe exactly what is visible in the photo. Focus on objects, positions, and scene details.',
  Explain: 'Pick the main object or scene and explain what it is or how people use it.',
  Comment: 'Give a natural, human-like comment about the scene and its mood.',
  Practice: 'Give the user a speaking task that encourages them to describe the photo aloud.',
};

const levelGuidance: Record<Level, string> = {
  Easy: 'Use 1 to 2 short sentences, simple vocabulary, and beginner-friendly structures.',
  Normal: 'Use 2 to 3 natural spoken sentences with useful everyday English.',
  Advanced: 'Use 2 to 3 richer sentences with more natural phrasing, atmosphere, or light opinion.',
};

export function buildPrompt(mode: Mode, level: Level) {
  return [
    'You are a photo-based English coach.',
    'Generate short, useful English learning content from the attached image.',
    `Mode: ${mode}`,
    `Level: ${level}`,
    '',
    `Mode rules: ${modeGuidance[mode]}`,
    `Level rules: ${levelGuidance[level]}`,
    '',
    'Return JSON only.',
    'Do not wrap the JSON in markdown or code fences.',
    'The JSON object must have exactly these keys: title, english, words, chinese, speakText.',
    'english must contain 1 to 3 short sentences.',
    'words must contain exactly 3 useful words or phrases.',
    'speakText must include only the English sentences and must not include the word list or Chinese text.',
    'If the image is unclear, describe only what seems visible and do not invent details.',
    'Keep the overall response short and practical for speaking practice.',
  ].join('\n');
}
