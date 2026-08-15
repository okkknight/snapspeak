import type { AIResult } from './ai/schema';
import { buildCacheKey } from './photo';

const storageKey = 'snapspeak-generation-cache-v1';

type CacheEntry = {
  key: string;
  result: AIResult;
};

function canUseSessionStorage() {
  return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
}

export function createGenerationKey(photoId: string, mode: string, level: string) {
  return buildCacheKey(photoId, mode, level);
}

export function readGenerationCache() {
  const cache = new Map<string, AIResult>();
  if (!canUseSessionStorage()) {
    return cache;
  }

  try {
    const raw = window.sessionStorage.getItem(storageKey);
    if (!raw) {
      return cache;
    }

    const parsed = JSON.parse(raw) as CacheEntry[];
    parsed.forEach((entry) => {
      cache.set(entry.key, entry.result);
    });
  } catch {
    window.sessionStorage.removeItem(storageKey);
  }

  return cache;
}

export function writeGenerationCache(cache: Map<string, AIResult>) {
  if (!canUseSessionStorage()) {
    return;
  }

  const payload: CacheEntry[] = Array.from(cache.entries()).map(([key, result]) => ({ key, result }));
  window.sessionStorage.setItem(storageKey, JSON.stringify(payload));
}
