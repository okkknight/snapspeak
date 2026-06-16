import { ModeLevelChip } from './ModeLevelChip';
import { ShutterButton } from './ShutterButton';
import { cn } from '../utils/cn';
import type { Level, Mode } from '../types';
import { ImagesIcon, SettingsIcon } from './icons';

type Props = {
  mode: Mode;
  level: Level;
  className?: string;
};

export function CameraBottomBar({ mode, level, className }: Props) {
  return (
    <div className={cn('camera-bottom-bar', className)}>
      <ModeLevelChip mode={mode} level={level} />
      <div className="camera-bottom-bar__actions">
        <button type="button" className="camera-bottom-bar__icon-button" aria-label="Open album">
          <ImagesIcon size={20} />
        </button>
        <ShutterButton />
        <button type="button" className="camera-bottom-bar__icon-button" aria-label="Open settings">
          <SettingsIcon size={20} />
        </button>
      </div>
    </div>
  );
}
