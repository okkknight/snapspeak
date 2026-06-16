import { cn } from '../utils/cn';

type Props = {
  onClick?: () => void;
  className?: string;
};

export function ShutterButton({ onClick, className }: Props) {
  return (
    <button type="button" className={cn('shutter-button', className)} onClick={onClick} aria-label="Take photo">
      <span className="shutter-button__ring">
        <span className="shutter-button__core" />
      </span>
    </button>
  );
}
