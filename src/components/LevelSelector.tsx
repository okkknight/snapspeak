import { cn } from '../utils/cn';
import type { Level } from '../types';
import { ChevronDownIcon } from './icons';

type Props = {
  active: Level;
  onChange?: (level: Level) => void;
  levels?: Level[];
  className?: string;
};

export function LevelSelector({ active, onChange, levels = ['Easy', 'Normal', 'Advanced'], className }: Props) {
  const currentIndex = levels.indexOf(active);
  const nextLevel = levels[(currentIndex + 1) % levels.length];

  return (
    <div className={cn('level-selector', className)}>
      <button type="button" className="level-selector__item" onClick={() => onChange?.(nextLevel)}>
        <span>{active}</span>
        <ChevronDownIcon size={12} />
      </button>
    </div>
  );
}
