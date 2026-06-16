import { cn } from '../utils/cn';
import type { Mode } from '../types';

type Props = {
  active: Mode;
  onChange?: (mode: Mode) => void;
  modes?: Mode[];
  className?: string;
};

export function ModeTabs({ active, onChange, modes = ['Describe', 'Explain', 'Comment', 'Practice'], className }: Props) {
  return (
    <div className={cn('mode-tabs', className)}>
      {modes.map((mode) => {
        const selected = mode === active;
        return (
          <button
            key={mode}
            type="button"
            className={cn('mode-tabs__item', selected && 'mode-tabs__item--active')}
            onClick={() => onChange?.(mode)}
          >
            <span className="mode-tabs__label">{mode}</span>
          </button>
        );
      })}
    </div>
  );
}
