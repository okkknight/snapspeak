import { SceneMock } from './SceneMock';
import { cn } from '../utils/cn';
import { CloseIcon, FlashIcon, ScanIcon, SwapIcon } from './icons';

type Props = {
  className?: string;
};

export function CameraPreview({ className }: Props) {
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
          <button type="button" className="camera-preview__icon-button" aria-label="Switch camera">
            <SwapIcon size={18} />
          </button>
        </div>
      </div>

      <div className="camera-preview__frame">
        <SceneMock />
        <div className="camera-preview__grid camera-preview__grid--vertical" />
        <div className="camera-preview__grid camera-preview__grid--horizontal" />
        <div className="camera-preview__focus">
          <ScanIcon size={18} />
        </div>
      </div>
    </section>
  );
}
