import { WordChips } from './WordChips';
import { VoiceButton } from './VoiceButton';
import { ChineseExplanation } from './ChineseExplanation';
import { cn } from '../utils/cn';
import type { AIResult } from '../types';
import { StarIcon, VolumeIcon } from './icons';

type Props = {
  result?: AIResult | null;
  loading?: boolean;
  error?: string | null;
  chineseOpen?: boolean;
  onToggleChinese?: () => void;
  onPlay?: () => void;
  onRetry?: () => void;
  playing?: boolean;
  className?: string;
};

export function EnglishResultCard({
  result,
  loading = false,
  error = null,
  chineseOpen = false,
  onToggleChinese,
  onPlay,
  onRetry,
  playing = false,
  className,
}: Props) {
  if (loading) {
    return (
      <article className={cn('english-result-card', 'english-result-card--loading', className)}>
        <div className="english-result-card__state english-result-card__state--loading" aria-live="polite">
          <div className="english-result-card__skeleton english-result-card__skeleton--title" />
          <div className="english-result-card__skeleton english-result-card__skeleton--line" />
          <div className="english-result-card__skeleton english-result-card__skeleton--line english-result-card__skeleton--line-short" />
          <div className="english-result-card__skeleton english-result-card__skeleton--chips" />
          <div className="english-result-card__skeleton english-result-card__skeleton--button" />
        </div>
      </article>
    );
  }

  if (error) {
    return (
      <article className={cn('english-result-card', 'english-result-card--error', className)}>
        <div className="english-result-card__state english-result-card__state--error" aria-live="polite">
          <p className="english-result-card__error-kicker">Generation failed</p>
          <h4>We could not generate learning content right now.</h4>
          <p>{error}</p>
          <button type="button" className="english-result-card__retry-button" onClick={onRetry} disabled={!onRetry}>
            Retry
          </button>
        </div>
      </article>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <article className={cn('english-result-card', className)}>
      <div className="english-result-card__content">
        {result.english.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>

      <WordChips words={result.words} />

      <div className="english-result-card__actions">
        <VoiceButton playing={playing} onClick={onPlay} disabled={!onPlay} />
        <button type="button" className="english-result-card__waveform" onClick={onPlay} disabled={!onPlay} aria-label="Play again">
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
