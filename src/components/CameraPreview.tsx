import { useEffect, type RefObject } from 'react';
import { SceneMock } from './SceneMock';
import { cn } from '../utils/cn';
import { CloseIcon, FlashIcon, ScanIcon, SwapIcon } from './icons';

type Props = {
  stream: MediaStream | null;
  videoRef: RefObject<HTMLVideoElement | null>;
  status: 'idle' | 'loading' | 'ready' | 'error';
  error?: string | null;
  onSwitchCamera?: () => void;
  className?: string;
};

export function CameraPreview({ stream, videoRef, status, error, onSwitchCamera, className }: Props) {
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.srcObject = stream;

    if (stream) {
      void videoRef.current.play().catch(() => {});
    }
  }, [stream, videoRef]);

  return (
    <section className={cn('camera-preview', className)}>
      <div className="camera-preview__chrome">
        <button type="button" className="camera-preview__icon-button" aria-label="Close camera">
          <CloseIcon size={19} />
        </button>
        <div className="camera-preview__chrome-group">
          <button type="button" className="camera-preview__icon-button" aria-label="Flashlight">
            <FlashIcon size={18} />
          </button>
          <button type="button" className="camera-preview__icon-button" aria-label="Switch camera" onClick={onSwitchCamera}>
            <SwapIcon size={18} />
          </button>
        </div>
      </div>

      <div className="camera-preview__frame">
        <SceneMock />
        <video ref={videoRef} className={cn('camera-preview__video', stream && 'camera-preview__video--visible')} autoPlay muted playsInline />
        <div className="camera-preview__grid camera-preview__grid--vertical" />
        <div className="camera-preview__grid camera-preview__grid--horizontal" />
        <div className="camera-preview__focus">
          <ScanIcon size={18} />
        </div>
        {status === 'loading' ? <div className="camera-preview__status">Starting camera…</div> : null}
        {status === 'error' ? <div className="camera-preview__status camera-preview__status--error">{error ?? 'Camera unavailable'}</div> : null}
      </div>
    </section>
  );
}
