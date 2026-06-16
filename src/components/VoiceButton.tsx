import { cn } from '../utils/cn';
import { PauseIcon, PlayIcon } from './icons';

type Props = {
  playing?: boolean;
  onClick?: () => void;
  className?: string;
};

export function VoiceButton({ playing = false, onClick, className }: Props) {
  return (
    <button type="button" className={cn('voice-button', playing && 'voice-button--playing', className)} onClick={onClick}>
      {playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
      <span>{playing ? 'Playing' : 'Play'}</span>
    </button>
  );
}
