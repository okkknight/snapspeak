import { describe, expect, it } from 'vitest';
import { buildCacheKey, createPhotoDraft, createPhotoId } from './photo';

describe('createPhotoId', () => {
  it('creates a stable prefixed identifier', () => {
    expect(createPhotoId()).toMatch(/^photo_/);
  });
});

describe('buildCacheKey', () => {
  it('combines photo, mode, and level', () => {
    expect(buildCacheKey('photo_1', 'Describe', 'Normal')).toBe('photo_1::Describe::Normal');
  });
});

describe('createPhotoDraft', () => {
  it('wraps a File in a photo draft', () => {
    const draft = createPhotoDraft(new File(['x'], 'demo.jpg', { type: 'image/jpeg' }));
    expect(draft.photoId).toMatch(/^photo_/);
    expect(draft.file.type).toBe('image/jpeg');
    expect(draft.fileName).toBe('demo.jpg');
  });
});
