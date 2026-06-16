import { useMemo, useState } from 'react';
import { CameraPreview } from './components/CameraPreview';
import { CameraBottomBar } from './components/CameraBottomBar';
import { CapturedPhotoPreview } from './components/CapturedPhotoPreview';
import { ResultBottomSheet } from './components/ResultBottomSheet';
import { ModeTabs } from './components/ModeTabs';
import { LevelSelector } from './components/LevelSelector';
import { EnglishResultCard } from './components/EnglishResultCard';
import { ModeLevelChip } from './components/ModeLevelChip';
import { ShutterButton } from './components/ShutterButton';
import { VoiceButton } from './components/VoiceButton';
import { ChineseExplanation } from './components/ChineseExplanation';
import { WordChips } from './components/WordChips';
import { SceneMock } from './components/SceneMock';
import { getMockResult, modeOrder, levelOrder } from './data/mockResults';
import type { Level, Mode } from './types';

const showcaseItems = [
  { title: 'Camera preview', element: <CameraPreview /> },
  {
    title: 'Bottom camera controls',
    element: (
      <div className="showcase-stack__demo showcase-stack__demo--dark">
        <CameraBottomBar mode="Describe" level="Normal" />
      </div>
    ),
  },
  {
    title: 'Result header + sheet',
    element: <ResultBottomSheet mode="Describe" level="Normal" result={getMockResult('Describe', 'Normal')} />,
  },
  {
    title: 'Captured photo preview',
    element: <CapturedPhotoPreview />,
  },
  {
    title: 'Tabs and selectors',
    element: (
      <div className="showcase-grid">
        <ModeTabs active="Explain" />
        <LevelSelector active="Normal" />
      </div>
    ),
  },
  {
    title: 'Content blocks',
    element: (
      <div className="showcase-grid showcase-grid--tight">
        <ModeLevelChip mode="Describe" level="Normal" />
        <ShutterButton />
        <VoiceButton />
        <WordChips words={['coffee mug', 'desk', 'next to']} />
        <ChineseExplanation text="我能看到桌上有一个咖啡杯。旁边有一台笔记本电脑。" open />
      </div>
    ),
  },
  {
    title: 'English result card',
    element: <EnglishResultCard result={getMockResult('Comment', 'Advanced')} chineseOpen />,
  },
  {
    title: 'Scene mock asset',
    element: (
      <div className="showcase-stack__demo showcase-stack__demo--scene">
        <SceneMock />
      </div>
    ),
  },
];

export default function App() {
  const [activeMode, setActiveMode] = useState<Mode>('Describe');
  const [activeLevel, setActiveLevel] = useState<Level>('Normal');
  const [chineseOpen, setChineseOpen] = useState(true);

  const result = useMemo(() => getMockResult(activeMode, activeLevel), [activeMode, activeLevel]);

  return (
    <main className="app-shell">
      <div className="app-shell__backdrop app-shell__backdrop--left" />
      <div className="app-shell__backdrop app-shell__backdrop--right" />

      <header className="page-header">
        <div>
          <p className="page-header__kicker">snapspeak component library</p>
          <h1>Mobile-first UI parts for a photo-based English coach.</h1>
        </div>
        <p className="page-header__lead">
          A reusable component set for the camera preview, controls, result sheet, and learning content blocks.
        </p>
      </header>

      <section className="live-playground">
        <div className="live-playground__label">Interactive result composition</div>
        <CapturedPhotoPreview />
        <ResultBottomSheet
          mode={activeMode}
          level={activeLevel}
          result={result}
          chineseOpen={chineseOpen}
          onModeChange={setActiveMode}
          onLevelChange={setActiveLevel}
          onToggleChinese={() => setChineseOpen((value) => !value)}
        />
      </section>

      <section className="showcase-grid-layout">
        {showcaseItems.map((item) => (
          <article key={item.title} className="showcase-card">
            <div className="showcase-card__meta">
              <h2>{item.title}</h2>
            </div>
            {item.element}
          </article>
        ))}
      </section>

      <section className="mock-matrix">
        <div className="mock-matrix__header">
          <h2>Mock content matrix</h2>
          <p>Mode and level combinations that can be reused later when the real workflow arrives.</p>
        </div>
        <div className="mock-matrix__chips">
          {modeOrder.map((mode) =>
            levelOrder.map((level) => (
              <div key={`${mode}-${level}`} className="mock-matrix__chip">
                <strong>
                  {mode} · {level}
                </strong>
                <span>{getMockResult(mode, level).english[0]}</span>
              </div>
            )),
          )}
        </div>
      </section>
    </main>
  );
}
