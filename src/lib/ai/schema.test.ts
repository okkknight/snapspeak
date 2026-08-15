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
