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
  return (
    <div className={cn('level-selector', className)}>
      {levels.map((level) => (
        <button
          key={level}
          type="button"
          className={cn('level-selector__item', active === level && 'level-selector__item--active')}
          onClick={() => onChange?.(level)}
        >
          <span>{level}</span>
          {level === active ? <ChevronDownIcon size={12} /> : null}
        </button>
      ))}
    </div>
  );
}
