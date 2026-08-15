import { promises as fs } from 'node:fs';
import { generateWithCodex } from './codexRunner';
import { validateAiResult } from './validate';
import { writeDataUrlToTempImage } from './image';
import type { AIResult } from '../src/types';
import type { Level, Mode } from '../src/types';

export type GenerateInput = {
  photoId: string;
  mode: Mode;
  level: Level;
  image: {
    dataUrl: string;
    fileName: string;
    mimeType: string;
  };
};

export async function generateLearningResult(input: GenerateInput): Promise<AIResult> {
  const imagePath = await writeDataUrlToTempImage(input.image.dataUrl, input.photoId, input.image.mimeType);

  try {
    const raw = await generateWithCodex(imagePath, input.mode, input.level);
    const parsed = JSON.parse(raw) as unknown;
    return validateAiResult(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown generation error.';
    throw new Error(message);
  } finally {
    await fs.unlink(imagePath).catch(() => {});
  }
}
