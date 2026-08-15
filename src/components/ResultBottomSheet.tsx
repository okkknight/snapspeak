import { cn } from '../utils/cn';
import type { Level, Mode, AIResult } from '../types';
import { LevelSelector } from './LevelSelector';
import { ModeTabs } from './ModeTabs';
import { EnglishResultCard } from './EnglishResultCard';
import { CameraIcon, SwapIcon } from './icons';

type Props = {
  mode: Mode;
  level: Level;
  result?: AIResult | null;
  loading?: boolean;
  error?: string | null;
  chineseOpen?: boolean;
  playing?: boolean;
  onModeChange?: (mode: Mode) => void;
  onModeStep?: (direction: -1 | 1) => void;
  onLevelChange?: (level: Level) => void;
  onToggleChinese?: () => void;
  onPlay?: () => void;
  onRetry?: () => void;
  onRetake?: () => void;
  onSwitchLevel?: () => void;
  className?: string;
};

export function ResultBottomSheet({
  mode,
  level,
  result,
  loading = false,
  error = null,
  chineseOpen = false,
  playing = false,
  onModeChange,
  onModeStep,
  onLevelChange,
  onToggleChinese,
  onPlay,
  onRetry,
  onRetake,
  onSwitchLevel,
  className,
}: Props) {
  return (
    <section className={cn('result-bottom-sheet', className)}>
      <div className="result-bottom-sheet__handle" />
      <div className="result-bottom-sheet__header">
        <h3 className="result-bottom-sheet__title">{loading ? 'Generating' : result?.title ?? mode}</h3>
        <LevelSelector active={level} onChange={onLevelChange} />
      </div>
      <ModeTabs active={mode} onChange={onModeChange} onStep={onModeStep} />
      <EnglishResultCard
        result={result}
        loading={loading}
        error={error}
        chineseOpen={chineseOpen}
        playing={playing}
        onToggleChinese={onToggleChinese}
        onPlay={onPlay}
        onRetry={onRetry}
      />
      <div className="result-bottom-sheet__footer">
        <button type="button" className="result-bottom-sheet__ghost-button" onClick={onRetake}>
          <CameraIcon size={17} />
          Retake
        </button>
        <button type="button" className="result-bottom-sheet__primary-button" onClick={onSwitchLevel}>
          <SwapIcon size={17} />
          Switch level
        </button>
      </div>
    </section>
  );
}
