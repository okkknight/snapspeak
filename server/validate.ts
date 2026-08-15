import { z } from 'zod';
import { aiResultOutputSchema, aiResultSchema, levelValues, modeValues } from '../src/lib/ai/schema';
import type { AIResult } from '../src/types';

export const generateRequestSchema = z.object({
  photoId: z.string().min(1),
  mode: z.enum(modeValues),
  level: z.enum(levelValues),
  image: z.object({
    dataUrl: z.string().startsWith('data:image/'),
    fileName: z.string().min(1),
    mimeType: z.string().min(1),
  }),
});

export const codexResponseSchema = aiResultSchema;

export function validateAiResult(payload: unknown): AIResult {
  return codexResponseSchema.parse(payload);
}

export function getOutputSchemaObject() {
  return aiResultOutputSchema;
}
