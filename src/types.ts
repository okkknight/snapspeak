export type Mode = 'Describe' | 'Explain' | 'Comment' | 'Practice';
export type Level = 'Easy' | 'Normal' | 'Advanced';

export type AIResult = {
  title: Mode;
  english: string[];
  words: string[];
  chinese: string;
  speakText: string;
};
