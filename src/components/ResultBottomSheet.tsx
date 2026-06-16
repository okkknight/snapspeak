import { cn } from '../utils/cn';
import type { Level, Mode, AIResult } from '../types';
import { LevelSelector } from './LevelSelector';
import { ModeTabs } from './ModeTabs';
import { EnglishResultCard } from './EnglishResultCard';
import { CameraIcon, SwapIcon } from './icons';

type Props = {
  mode: Mode;
  level: Level;
  result: AIResult;
  chineseOpen?: boolean;
  playing?: boolean;
  onModeChange?: (mode: Mode) => void;
  onModeStep?: (direction: -1 | 1) => void;
  onLevelChange?: (level: Level) => void;
  onToggleChinese?: () => void;
  onPlay?: () => void;
  onRetake?: () => void;
  onSwitchLevel?: () => void;
  className?: string;
};

export function ResultBottomSheet({
  mode,
  level,
  result,
  chineseOpen = false,
  playing = false,
  onModeChange,
  onModeStep,
  onLevelChange,
  onToggleChinese,
  onPlay,
  onRetake,
  onSwitchLevel,
  className,
}: Props) {
  return (
    <section className={cn('result-bottom-sheet', className)}>
      <div className="result-bottom-sheet__handle" />
      <div className="result-bottom-sheet__header">
        <div>
          <p className="result-bottom-sheet__eyebrow">Result mode</p>
          <h3 className="result-bottom-sheet__title">{result.title}</h3>
          <p className="result-bottom-sheet__hint">Swipe tabs to switch mode</p>
        </div>
        <LevelSelector active={level} onChange={onLevelChange} />
      </div>
      <ModeTabs active={mode} onChange={onModeChange} onStep={onModeStep} />
      <EnglishResultCard
        result={result}
        chineseOpen={chineseOpen}
        playing={playing}
        onToggleChinese={onToggleChinese}
        onPlay={onPlay}
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
