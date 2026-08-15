import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { CameraBottomBar } from './components/CameraBottomBar';
import { CameraPreview } from './components/CameraPreview';
import { CapturedPhotoPreview } from './components/CapturedPhotoPreview';
import { ResultBottomSheet } from './components/ResultBottomSheet';
import type { CameraFacingMode } from './hooks/useLiveCamera';
import { useLiveCamera } from './hooks/useLiveCamera';
import { useGeneration } from './hooks/useGeneration';
import { captureVideoFrame, createPhotoDraft, revokePhotoPreview } from './lib/photo';
import type { CapturedPhoto, Level, Mode } from './types';

type Screen = 'camera' | 'result';

function MobileStatusBar() {
  return (
    <div className="mobile-status-bar" aria-hidden="true">
      <span className="mobile-status-bar__time">9:41</span>
      <div className="mobile-status-bar__island">
        <span />
      </div>
      <div className="mobile-status-bar__icons">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function nextLevel(level: Level): Level {
  const levels: Level[] = ['Easy', 'Normal', 'Advanced'];
  const index = levels.indexOf(level);
  return levels[(index + 1) % levels.length];
}

function stepMode(mode: Mode, direction: -1 | 1): Mode {
  const modes: Mode[] = ['Describe', 'Explain', 'Comment', 'Practice'];
  const index = modes.indexOf(mode);
  return modes[(index + direction + modes.length) % modes.length];
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('camera');
  const [activeMode, setActiveMode] = useState<Mode>('Describe');
  const [activeLevel, setActiveLevel] = useState<Level>('Normal');
  const [capturedPhoto, setCapturedPhoto] = useState<CapturedPhoto | null>(null);
  const [facingMode, setFacingMode] = useState<CameraFacingMode>('environment');
  const [chineseOpen, setChineseOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    status: generationStatus,
    result: generationResult,
    error: generationError,
    generate,
    retry,
    clear,
  } = useGeneration();
  const camera = useLiveCamera(screen === 'camera', facingMode);

  const result = generationResult;
  const isResultReady = generationStatus === 'success' && result !== null;

  useEffect(() => {
    if (screen !== 'result' || !capturedPhoto) {
      clear();
      setPlaying(false);
      window.speechSynthesis?.cancel();
      return;
    }

    void generate({
      photo: capturedPhoto,
      mode: activeMode,
      level: activeLevel,
    });
  }, [activeLevel, activeMode, capturedPhoto, clear, generate, screen]);

  useEffect(() => {
    if (screen !== 'result' || generationStatus !== 'success') {
      setPlaying(false);
      window.speechSynthesis?.cancel();
    }
  }, [generationStatus, screen]);

  useEffect(() => {
    return () => {
      revokePhotoPreview(capturedPhoto);
    };
  }, [capturedPhoto]);

  const handlePlay = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis || !result) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(result.speakText);
    utterance.lang = 'en-US';
    setPlaying(true);
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      setPlaying(false);
    }
  };

  const acceptPhoto = (photo: CapturedPhoto) => {
    setPlaying(false);
    setChineseOpen(false);
    setCapturedPhoto((current) => {
      revokePhotoPreview(current);
      return photo;
    });
    setScreen('result');
  };

  const openAlbum = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    acceptPhoto(createPhotoDraft(file, 'upload'));
  };

  const handleShutter = async () => {
    if (camera.status !== 'ready' || !videoRef.current) {
      openAlbum();
      return;
    }

    try {
      const photo = await captureVideoFrame(videoRef.current, 'camera');
      acceptPhoto(photo);
    } catch {
      openAlbum();
    }
  };

  const handleRetake = () => {
    clear();
    setScreen('camera');
    setPlaying(false);
    setChineseOpen(false);
    setCapturedPhoto((current) => {
      revokePhotoPreview(current);
      return null;
    });
  };

  const handleSwitchLevel = () => {
    setActiveLevel((current) => nextLevel(current));
  };

  const handleModeStep = (direction: -1 | 1) => {
    setActiveMode((current) => stepMode(current, direction));
  };

  const handleSwitchCamera = () => {
    setFacingMode((current) => (current === 'environment' ? 'user' : 'environment'));
  };

  const handleRetry = () => {
    retry();
  };

  const handleShare = async () => {
    if (!capturedPhoto) {
      return;
    }

    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({
          title: 'snapspeak',
          text: 'A photo-based English learning result from snapspeak.',
        });
        return;
      } catch {
        // fall through to open the captured image
      }
    }

    window.open(capturedPhoto.previewUrl, '_blank', 'noopener,noreferrer');
  };

  const handleExpand = () => {
    if (capturedPhoto) {
      window.open(capturedPhoto.previewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const resultSheetError = generationStatus === 'error' ? generationError : null;
  const resultSheetLoading = generationStatus === 'loading';

  return (
    <main className="mobile-app">
      <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="sr-only-input" onChange={handleFileChange} />

      {screen === 'camera' ? (
        <section className="mobile-screen mobile-screen--camera" aria-label="Camera mode">
          <MobileStatusBar />
          <CameraPreview
            stream={camera.stream}
            videoRef={videoRef}
            status={camera.status}
            error={camera.error}
            onSwitchCamera={handleSwitchCamera}
            className="mobile-screen__preview"
          />
          <CameraBottomBar
            mode={activeMode}
            level={activeLevel}
            onShutter={handleShutter}
            onOpenAlbum={openAlbum}
            onSwitchCamera={handleSwitchCamera}
            onSettings={handleSwitchCamera}
            className="mobile-screen__bottom-bar"
          />
        </section>
      ) : (
        <section className="mobile-screen mobile-screen--result" aria-label="Result mode">
          <MobileStatusBar />
          <CapturedPhotoPreview
            photo={capturedPhoto}
            onBack={handleRetake}
            onShare={handleShare}
            onExpand={handleExpand}
            className="mobile-screen__preview"
          />
          <ResultBottomSheet
            mode={activeMode}
            level={activeLevel}
            result={result}
            loading={resultSheetLoading}
            error={resultSheetError}
            chineseOpen={chineseOpen && isResultReady}
            playing={playing}
            onModeChange={setActiveMode}
            onLevelChange={setActiveLevel}
            onModeStep={handleModeStep}
            onToggleChinese={() => setChineseOpen((value) => !value)}
            onPlay={isResultReady ? handlePlay : undefined}
            onRetry={handleRetry}
            onRetake={handleRetake}
            onSwitchLevel={handleSwitchLevel}
            className="mobile-screen__sheet"
          />
        </section>
      )}
    </main>
  );
}
