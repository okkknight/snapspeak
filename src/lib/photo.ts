import type { CapturedPhoto, PhotoSource } from '../types';

const defaultMimeType = 'image/jpeg';
const compressedUploadThreshold = 900 * 1024;
const maxCompressedSide = 1600;
const compressedQuality = 0.82;

function createPreviewUrl(file: File) {
  if (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function') {
    return URL.createObjectURL(file);
  }

  return '';
}

export function createPhotoId() {
  return `photo_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

export function createPhotoDraft(file: File, source: PhotoSource = 'upload'): CapturedPhoto {
  return {
    photoId: createPhotoId(),
    file,
    previewUrl: createPreviewUrl(file),
    source,
    fileName: file.name || `snapspeak-${source}.jpg`,
    mimeType: file.type || defaultMimeType,
    createdAt: Date.now(),
  };
}

export function buildCacheKey(photoId: string, mode: string, level: string) {
  return `${photoId}::${mode}::${level}`;
}

export function revokePhotoPreview(photo: CapturedPhoto | null | undefined) {
  if (!photo?.previewUrl || typeof URL === 'undefined' || typeof URL.revokeObjectURL !== 'function') {
    return;
  }

  URL.revokeObjectURL(photo.previewUrl);
}

export function fileToDataUrl(file: File) {
  if (file.size <= compressedUploadThreshold) {
    return readFileAsDataUrl(file);
  }

  return readAndCompressImage(file).catch(() => readFileAsDataUrl(file));
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error('Unable to read image file.'));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

function loadImageFromFile(file: File) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = createPreviewUrl(file);
    const image = new Image();

    image.onload = () => {
      if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
        URL.revokeObjectURL(objectUrl);
      }
      resolve(image);
    };

    image.onerror = () => {
      if (typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
        URL.revokeObjectURL(objectUrl);
      }
      reject(new Error('Unable to load image for compression.'));
    };

    image.src = objectUrl;
  });
}

function getCompressedDimensions(width: number, height: number) {
  const longestSide = Math.max(width, height);
  if (longestSide <= maxCompressedSide) {
    return { width, height };
  }

  const scale = maxCompressedSide / longestSide;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

async function readAndCompressImage(file: File) {
  const image = await loadImageFromFile(file);
  const { width, height } = getCompressedDimensions(image.naturalWidth || image.width, image.naturalHeight || image.height);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to create image compression context.');
  }

  context.drawImage(image, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => {
      if (!value) {
        reject(new Error('Unable to compress image.'));
        return;
      }

      resolve(value);
    }, defaultMimeType, compressedQuality);
  });

  return readBlobAsDataUrl(blob);
}

function readBlobAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error('Unable to read compressed image.'));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}

export async function captureVideoFrame(video: HTMLVideoElement, source: PhotoSource = 'camera') {
  const width = video.videoWidth || 1280;
  const height = video.videoHeight || 720;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Unable to create image capture context.');
  }

  context.drawImage(video, 0, 0, width, height);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((value) => {
      if (!value) {
        reject(new Error('Unable to capture photo from camera.'));
        return;
      }

      resolve(value);
    }, defaultMimeType, 0.92);
  });

  const file = new File([blob], `snapspeak-${source}-${Date.now()}.jpg`, { type: blob.type || defaultMimeType });
  return createPhotoDraft(file, source);
}
