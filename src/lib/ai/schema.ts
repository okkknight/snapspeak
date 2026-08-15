import { z } from 'zod';
import type { Level, Mode } from '../../types';

export const modeValues = ['Describe', 'Explain', 'Comment', 'Practice'] as const satisfies readonly Mode[];
export const levelValues = ['Easy', 'Normal', 'Advanced'] as const satisfies readonly Level[];

export const aiResultSchema = z.object({
  title: z.enum(modeValues),
  english: z.array(z.string().min(1)).min(1).max(3),
  words: z.array(z.string().min(1)).length(3),
  chinese: z.string().min(1),
  speakText: z.string().min(1),
});

export const aiResultOutputSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: { type: 'string', enum: [...modeValues] },
    english: {
      type: 'array',
      minItems: 1,
      maxItems: 3,
      items: { type: 'string', minLength: 1 },
    },
    words: {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: { type: 'string', minLength: 1 },
    },
    chinese: { type: 'string', minLength: 1 },
    speakText: { type: 'string', minLength: 1 },
  },
  required: ['title', 'english', 'words', 'chinese', 'speakText'],
} as const;

export type AIResult = z.infer<typeof aiResultSchema>;
