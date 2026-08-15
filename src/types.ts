export type Mode = 'Describe' | 'Explain' | 'Comment' | 'Practice';
export type Level = 'Easy' | 'Normal' | 'Advanced';
export type PhotoSource = 'camera' | 'upload';

export type AIResult = {
  title: Mode;
  english: string[];
  words: string[];
  chinese: string;
  speakText: string;
};

export type CapturedPhoto = {
  photoId: string;
  file: File;
  previewUrl: string;
  source: PhotoSource;
  fileName: string;
  mimeType: string;
  createdAt: number;
};

export type GenerationStatus = 'idle' | 'loading' | 'success' | 'error';
