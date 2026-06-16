import { cn } from '../utils/cn';

type Props = {
  words: string[];
  className?: string;
};

export function WordChips({ words, className }: Props) {
  return (
    <div className={cn('word-chips', className)}>
      {words.map((word) => (
        <span key={word} className="word-chips__item">
          {word}
        </span>
      ))}
    </div>
  );
}
