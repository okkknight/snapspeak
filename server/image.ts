import os from 'node:os';
import path from 'node:path';
import { promises as fs } from 'node:fs';

const imageMimeExtensions: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
  'image/heic': 'heic',
  'image/heif': 'heif',
};

function getExtension(mimeType: string) {
  return imageMimeExtensions[mimeType.toLowerCase()] ?? 'jpg';
}

export async function writeDataUrlToTempImage(dataUrl: string, photoId: string, mimeType: string) {
  const match = dataUrl.match(/^data:(.+?);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid image payload.');
  }

  const base64 = match[2];
  const tempFile = path.join(os.tmpdir(), `snapspeak-${photoId}.${getExtension(mimeType)}`);
  await fs.writeFile(tempFile, Buffer.from(base64, 'base64'));
  return tempFile;
}
