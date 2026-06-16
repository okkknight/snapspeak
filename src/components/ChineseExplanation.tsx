import { cn } from '../utils/cn';
import { ChevronDownIcon } from './icons';

type Props = {
  text: string;
  open?: boolean;
  onToggle?: () => void;
  className?: string;
};

export function ChineseExplanation({ text, open = false, onToggle, className }: Props) {
  return (
    <section className={cn('chinese-explanation', open && 'chinese-explanation--open', className)}>
      <button type="button" className="chinese-explanation__trigger" onClick={onToggle}>
        <span>中文解释</span>
        <ChevronDownIcon size={14} className={cn(open && 'rotate-180')} />
      </button>
      {open ? <p className="chinese-explanation__body">{text}</p> : null}
    </section>
  );
}
