import { cn } from '../utils/cn';
import type { Level, Mode } from '../types';
import { ChevronDownIcon } from './icons';

type Props = {
  mode: Mode;
  level: Level;
  className?: string;
};

export function ModeLevelChip({ mode, level, className }: Props) {
  return (
    <div className={cn('mode-level-chip', className)}>
      <span>{mode} · {level}</span>
      <ChevronDownIcon size={14} />
    </div>
  );
}
