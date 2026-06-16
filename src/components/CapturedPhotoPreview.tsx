import { SceneMock } from './SceneMock';
import { cn } from '../utils/cn';
import { BackIcon, ExpandIcon, ShareIcon } from './icons';

type Props = {
  className?: string;
};

export function CapturedPhotoPreview({ className }: Props) {
  return (
    <section className={cn('captured-photo-preview', className)}>
      <div className="captured-photo-preview__image">
        <SceneMock />
      </div>

      <div className="captured-photo-preview__chrome">
        <button type="button" className="captured-photo-preview__icon-button" aria-label="Back">
          <BackIcon size={18} />
        </button>
        <div className="captured-photo-preview__chrome-group">
          <button type="button" className="captured-photo-preview__icon-button" aria-label="Share">
            <ShareIcon size={18} />
          </button>
          <button type="button" className="captured-photo-preview__icon-button" aria-label="Expand">
            <ExpandIcon size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
