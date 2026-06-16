import { WordChips } from './WordChips';
import { VoiceButton } from './VoiceButton';
import { ChineseExplanation } from './ChineseExplanation';
import { cn } from '../utils/cn';
import type { AIResult } from '../types';
import { StarIcon } from './icons';

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
      <div className="english-result-card__header">
        <div>
          <p className="english-result-card__eyebrow">{result.title}</p>
          <h3 className="english-result-card__title">Speak it naturally</h3>
        </div>
        <button type="button" className="english-result-card__star" aria-label="Favorite result">
          <StarIcon size={18} />
        </button>
      </div>

      <div className="english-result-card__content">
        {result.english.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <WordChips words={result.words} />

      <div className="english-result-card__actions">
        <VoiceButton playing={playing} onClick={onPlay} />
        <button type="button" className="english-result-card__secondary" onClick={onPlay}>
          Repeat
        </button>
      </div>

      <ChineseExplanation text={result.chinese} open={chineseOpen} onToggle={onToggleChinese} />
    </article>
  );
}
