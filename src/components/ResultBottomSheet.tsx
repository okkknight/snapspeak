import { cn } from '../utils/cn';
import type { Level, Mode, AIResult } from '../types';
import { LevelSelector } from './LevelSelector';
import { ModeTabs } from './ModeTabs';
import { EnglishResultCard } from './EnglishResultCard';

type Props = {
  mode: Mode;
  level: Level;
  result: AIResult;
  chineseOpen?: boolean;
  onModeChange?: (mode: Mode) => void;
  onLevelChange?: (level: Level) => void;
  onToggleChinese?: () => void;
  className?: string;
};

export function ResultBottomSheet({
  mode,
  level,
  result,
  chineseOpen = false,
  onModeChange,
  onLevelChange,
  onToggleChinese,
  className,
}: Props) {
  return (
    <section className={cn('result-bottom-sheet', className)}>
      <div className="result-bottom-sheet__handle" />
      <div className="result-bottom-sheet__header">
        <div>
          <p className="result-bottom-sheet__eyebrow">Result mode</p>
          <h3 className="result-bottom-sheet__title">{result.title}</h3>
        </div>
        <LevelSelector active={level} onChange={onLevelChange} />
      </div>
      <ModeTabs active={mode} onChange={onModeChange} />
      <EnglishResultCard result={result} chineseOpen={chineseOpen} onToggleChinese={onToggleChinese} />
    </section>
  );
}
