import { useCallback, useEffect, useState } from 'react';

export type CameraStatus = 'idle' | 'loading' | 'ready' | 'error';
export type CameraFacingMode = 'environment' | 'user';

export function useLiveCamera(enabled: boolean, facingMode: CameraFacingMode) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [status, setStatus] = useState<CameraStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const stopStream = useCallback((nextStream: MediaStream | null) => {
    nextStream?.getTracks().forEach((track) => track.stop());
  }, []);

  useEffect(() => {
    let cancelled = false;

    const start = async () => {
      if (!enabled) {
        setStatus('idle');
        setError(null);
        setStream((current) => {
          stopStream(current);
          return null;
        });
        return;
      }

      if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
        setStatus('error');
        setError('Camera access is not supported in this browser.');
        setStream((current) => {
          stopStream(current);
          return null;
        });
        return;
      }

      setStatus('loading');
      setError(null);

      try {
        const nextStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
          },
          audio: false,
        });

        if (cancelled) {
          stopStream(nextStream);
          return;
        }

        setStream((current) => {
          stopStream(current);
          return nextStream;
        });
        setStatus('ready');
      } catch (caughtError) {
        if (cancelled) {
          return;
        }

        const message = caughtError instanceof Error ? caughtError.message : 'Unable to access the camera.';
        setStream((current) => {
          stopStream(current);
          return null;
        });
        setStatus('error');
        setError(message);
      }
    };

    void start();

    return () => {
      cancelled = true;
    };
  }, [enabled, facingMode, stopStream]);

  return {
    stream,
    status,
    error,
  };
}
