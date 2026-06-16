import { NotebookIcon, SparkleIcon } from './icons';

export function SceneMock() {
  return (
    <div className="scene-mock">
      <div className="scene-mock__window" />
      <div className="scene-mock__glow scene-mock__glow--left" />
      <div className="scene-mock__glow scene-mock__glow--right" />
      <div className="scene-mock__desk" />
      <div className="scene-mock__laptop">
        <div className="scene-mock__laptop-screen" />
        <div className="scene-mock__laptop-base" />
      </div>
      <div className="scene-mock__mug">
        <div className="scene-mock__mug-fill" />
        <div className="scene-mock__mug-handle" />
      </div>
      <div className="scene-mock__notebook">
        <NotebookIcon size={18} />
      </div>
      <div className="scene-mock__plant" aria-hidden="true">
        <SparkleIcon size={14} />
        <span />
      </div>
    </div>
  );
}
