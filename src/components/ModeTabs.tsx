import { useRef, type PointerEvent } from 'react';
import { cn } from '../utils/cn';
import type { Mode } from '../types';

type Props = {
  active: Mode;
  onChange?: (mode: Mode) => void;
  onStep?: (direction: -1 | 1) => void;
  modes?: Mode[];
  className?: string;
};

export function ModeTabs({
  active,
  onChange,
  onStep,
  modes = ['Describe', 'Explain', 'Comment', 'Practice'],
  className,
}: Props) {
  const gesture = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    gesture.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = gesture.current;
    gesture.current = null;

    if (!start || !onStep) {
      return;
    }

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;

    if (Math.abs(dx) < 34 || Math.abs(dx) < Math.abs(dy) * 1.15) {
      return;
    }

    onStep(dx < 0 ? 1 : -1);
  };

  return (
    <div
      className={cn('mode-tabs', className)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        gesture.current = null;
      }}
    >
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
