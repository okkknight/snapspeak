import { SceneMock } from './SceneMock';
import { cn } from '../utils/cn';
import { BackIcon, ExpandIcon, ShareIcon } from './icons';
import type { CapturedPhoto } from '../types';

type Props = {
  photo: CapturedPhoto | null;
  onBack?: () => void;
  onShare?: () => void;
  onExpand?: () => void;
  className?: string;
};

export function CapturedPhotoPreview({ photo, onBack, onShare, onExpand, className }: Props) {
  return (
    <section className={cn('captured-photo-preview', className)}>
      <div className="captured-photo-preview__image">
        {photo?.previewUrl ? <img src={photo.previewUrl} alt="Captured scene" className="captured-photo-preview__img" /> : <SceneMock />}
      </div>

      <div className="captured-photo-preview__chrome">
        <button type="button" className="captured-photo-preview__icon-button" aria-label="Back" onClick={onBack}>
          <BackIcon size={18} />
        </button>
        <div className="captured-photo-preview__chrome-group">
          <button type="button" className="captured-photo-preview__icon-button" aria-label="Share" onClick={onShare}>
            <ShareIcon size={18} />
          </button>
          <button type="button" className="captured-photo-preview__icon-button" aria-label="Expand" onClick={onExpand}>
            <ExpandIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
