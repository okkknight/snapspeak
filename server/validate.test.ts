import { describe, expect, it } from 'vitest';
import { generateRequestSchema, validateAiResult } from './validate';

describe('generateRequestSchema', () => {
  it('accepts a valid generation request', () => {
    const parsed = generateRequestSchema.parse({
      photoId: 'photo_1',
      mode: 'Describe',
      level: 'Normal',
      image: {
        dataUrl: 'data:image/jpeg;base64,AAA=',
        fileName: 'demo.jpg',
        mimeType: 'image/jpeg',
      },
    });

    expect(parsed.mode).toBe('Describe');
  });
});

describe('validateAiResult', () => {
  it('rejects malformed ai output', () => {
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
