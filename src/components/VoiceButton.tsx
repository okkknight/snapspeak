import { cn } from '../utils/cn';
import { PauseIcon, PlayIcon } from './icons';

type Props = {
  playing?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function VoiceButton({ playing = false, onClick, disabled = false, className }: Props) {
  return (
    <button
      type="button"
      className={cn('voice-button', playing && 'voice-button--playing', disabled && 'voice-button--disabled', className)}
      onClick={onClick}
      disabled={disabled}
    >
      {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      <span>{playing ? 'Playing' : 'Play'}</span>
    </button>
  );
}
