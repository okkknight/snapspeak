import { WordChips } from './WordChips';
import { VoiceButton } from './VoiceButton';
import { ChineseExplanation } from './ChineseExplanation';
import { cn } from '../utils/cn';
import type { AIResult } from '../types';
import { StarIcon, VolumeIcon } from './icons';

type Props = {
  result: AIResult;
  chineseOpen?: boolean;
  onToggleChinese?: () => void;
  onPlay?: () => void;
  playing?: boolean;
  className?: string;
};

export function EnglishResultCard({
  result,
  chineseOpen = false,
  onToggleChinese,
  onPlay,
  playing = false,
  className,
}: Props) {
  return (
    <article className={cn('english-result-card', className)}>
      <div className="english-result-card__content">
        {result.english.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <WordChips words={result.words} />

      <div className="english-result-card__actions">
        <VoiceButton playing={playing} onClick={onPlay} />
        <button type="button" className="english-result-card__waveform" onClick={onPlay} aria-label="Play again">
          <VolumeIcon size={16} />
          <span className="english-result-card__waveform-bars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </span>
        </button>
        <button type="button" className="english-result-card__star" aria-label="Favorite result">
          <StarIcon size={18} />
        </button>
      </div>

      <ChineseExplanation text={result.chinese} open={chineseOpen} onToggle={onToggleChinese} />
    </article>
  );
}
