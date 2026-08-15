import { ModeLevelChip } from './ModeLevelChip';
import { ShutterButton } from './ShutterButton';
import { cn } from '../utils/cn';
import type { Level, Mode } from '../types';
import { ImagesIcon, SettingsIcon } from './icons';

type Props = {
  mode: Mode;
  level: Level;
  onShutter?: () => void;
  onOpenAlbum?: () => void;
  onSwitchCamera?: () => void;
  onSettings?: () => void;
  className?: string;
};

export function CameraBottomBar({ mode, level, onShutter, onOpenAlbum, onSwitchCamera, onSettings, className }: Props) {
  return (
    <div className={cn('camera-bottom-bar', className)}>
      <div className="camera-bottom-bar__mode">
        <ModeLevelChip mode={mode} level={level} />
      </div>
      <div className="camera-bottom-bar__actions">
        <div className="camera-bottom-bar__action camera-bottom-bar__action--start">
          <button type="button" className="camera-bottom-bar__icon-button" aria-label="Open album" onClick={onOpenAlbum}>
            <ImagesIcon size={20} />
          </button>
          <span className="camera-bottom-bar__label">相册</span>
        </div>
        <ShutterButton onClick={onShutter} />
        <div className="camera-bottom-bar__action camera-bottom-bar__action--end">
          <button type="button" className="camera-bottom-bar__icon-button" aria-label="Open settings" onClick={onSettings ?? onSwitchCamera}>
            <SettingsIcon size={20} />
          </button>
          <span className="camera-bottom-bar__label">设置</span>
        </div>
      </div>
    </div>
  );
}
