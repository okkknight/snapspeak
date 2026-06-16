import { useEffect, useMemo, useState } from 'react';
import { CameraBottomBar } from './components/CameraBottomBar';
import { CameraPreview } from './components/CameraPreview';
import { CapturedPhotoPreview } from './components/CapturedPhotoPreview';
import { ResultBottomSheet } from './components/ResultBottomSheet';
import { getMockResult, levelOrder } from './data/mockResults';
import type { Level, Mode } from './types';

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
  const index = levelOrder.indexOf(level);
  return levelOrder[(index + 1) % levelOrder.length];
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('camera');
  const [activeMode, setActiveMode] = useState<Mode>('Describe');
  const [activeLevel, setActiveLevel] = useState<Level>('Normal');
  const [chineseOpen, setChineseOpen] = useState(false);
  const [playing, setPlaying] = useState(false);

  const result = useMemo(() => getMockResult(activeMode, activeLevel), [activeMode, activeLevel]);

  useEffect(() => {
    if (screen !== 'result') {
      setPlaying(false);
      window.speechSynthesis?.cancel();
    }
  }, [screen]);

  useEffect(() => {
    setChineseOpen(false);
  }, [activeMode, activeLevel, screen]);

  const handlePlay = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(result.speakText);
    utterance.lang = 'en-US';
    utterance.onstart = () => setPlaying(true);
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleShutter = () => {
    setScreen('result');
    setChineseOpen(false);
    setPlaying(false);
  };

  const handleRetake = () => {
    setScreen('camera');
    setPlaying(false);
  };

  const handleSwitchLevel = () => {
    setActiveLevel((current) => nextLevel(current));
  };

  return (
    <main className="mobile-app">
      <div className="mobile-app__shell">
        <MobileStatusBar />

        {screen === 'camera' ? (
          <section className="mobile-screen mobile-screen--camera" aria-label="Camera mode">
            <CameraPreview className="mobile-screen__preview" />
            <CameraBottomBar mode={activeMode} level={activeLevel} onShutter={handleShutter} className="mobile-screen__bottom-bar" />
          </section>
        ) : (
          <section className="mobile-screen mobile-screen--result" aria-label="Result mode">
            <CapturedPhotoPreview className="mobile-screen__preview" />
            <ResultBottomSheet
              mode={activeMode}
              level={activeLevel}
              result={result}
              chineseOpen={chineseOpen}
              playing={playing}
              onModeChange={setActiveMode}
              onLevelChange={setActiveLevel}
              onToggleChinese={() => setChineseOpen((value) => !value)}
              onPlay={handlePlay}
              onRetake={handleRetake}
              onSwitchLevel={handleSwitchLevel}
              className="mobile-screen__sheet"
            />
          </section>
        )}
      </div>
    </main>
  );
}
