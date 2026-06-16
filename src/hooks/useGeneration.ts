import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { aiResultSchema } from '../lib/ai/schema';
import { createGenerationKey, readGenerationCache, writeGenerationCache } from '../lib/cache';
import { fileToDataUrl } from '../lib/photo';
import type { AIResult, CapturedPhoto, GenerationStatus, Level, Mode } from '../types';

type GenerationRequest = {
  photo: CapturedPhoto;
  mode: Mode;
  level: Level;
};

type GenerationState = {
  status: GenerationStatus;
  result: AIResult | null;
  error: string | null;
  key: string | null;
};

const initialState: GenerationState = {
  status: 'idle',
  result: null,
  error: null,
  key: null,
};
const generationEndpoint = `${import.meta.env.BASE_URL}api/generate`;

async function readErrorMessage(response: Response) {
  const body = await response.text();
  if (!body) {
    return `Request failed with status ${response.status}.`;
  }

  try {
    const parsed = JSON.parse(body) as { error?: string };
    return parsed.error || body;
  } catch {
    return body;
  }
}

export function useGeneration() {
  const cacheRef = useRef(readGenerationCache());
  const abortRef = useRef<AbortController | null>(null);
  const lastRequestRef = useRef<GenerationRequest | null>(null);
  const [state, setState] = useState<GenerationState>(initialState);

  useEffect(() => {
    writeGenerationCache(cacheRef.current);
  }, [state.result]);

  const clear = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    lastRequestRef.current = null;
    setState(initialState);
  }, []);

  const generate = useCallback(async (request: GenerationRequest) => {
    const key = createGenerationKey(request.photo.photoId, request.mode, request.level);
    lastRequestRef.current = request;

    abortRef.current?.abort();

    const cached = cacheRef.current.get(key);
    if (cached) {
      abortRef.current = null;
      setState({
        status: 'success',
        result: cached,
        error: null,
        key,
      });
      return cached;
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setState({
      status: 'loading',
      result: null,
      error: null,
      key,
    });

    try {
      const dataUrl = await fileToDataUrl(request.photo.file);
      const response = await fetch(generationEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photoId: request.photo.photoId,
          mode: request.mode,
          level: request.level,
          image: {
            dataUrl,
            fileName: request.photo.fileName,
            mimeType: request.photo.mimeType,
          },
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(await readErrorMessage(response));
      }

      const payload = await response.json();
      const result = aiResultSchema.parse(payload);
      cacheRef.current.set(key, result);
      setState({
        status: 'success',
        result,
        error: null,
        key,
      });
      return result;
    } catch (caughtError) {
      if (controller.signal.aborted) {
        return null;
      }

      const message = caughtError instanceof Error ? caughtError.message : 'Unable to generate result.';
      setState({
        status: 'error',
        result: null,
        error: message,
        key,
      });
      return null;
    }
  }, []);

  const retry = useCallback(() => {
    if (!lastRequestRef.current) {
      return;
    }

    void generate(lastRequestRef.current);
  }, [generate]);

  const hasCachedResult = useMemo(() => state.status === 'success' && state.result !== null, [state.result, state.status]);

  return {
    ...state,
    hasCachedResult,
    generate,
    retry,
    clear,
  };
}
