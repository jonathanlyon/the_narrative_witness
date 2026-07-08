import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, AudioLines } from "lucide-react";

/**
 * A quiet audio player for a reading of the excerpt. If `src` is provided
 * (an uploaded recording, or a generated natural-voice file), it plays with a
 * scrubbable progress bar. If not, it degrades to a calm "reading coming soon"
 * state rather than disappearing — so the slot is visible and ready.
 */

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
};

export const AudioReading: React.FC<{ title: string; src?: string }> = ({ title, src }) => {
  useAudioStyles();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setT(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [src]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) { void a.play(); setPlaying(true); }
    else { a.pause(); setPlaying(false); }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a || !dur) return;
    a.currentTime = (Number(e.target.value) / 100) * dur;
  };

  if (!src) {
    return (
      <div className="nw-audio nw-audio-empty">
        <span className="nw-audio-icon" aria-hidden><AudioLines className="w-4 h-4" strokeWidth={1.5} /></span>
        <div className="nw-audio-copy">
          <p className="nw-audio-label">Listen</p>
          <p className="nw-audio-note">A reading of this piece, in the author’s voice, is being prepared.</p>
        </div>
      </div>
    );
  }

  const pct = dur ? (t / dur) * 100 : 0;

  return (
    <div className="nw-audio">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button className="nw-audio-btn" onClick={toggle} aria-label={playing ? "Pause reading" : "Play reading"}>
        {playing ? <Pause className="w-4 h-4" strokeWidth={1.5} /> : <Play className="w-4 h-4" strokeWidth={1.5} />}
      </button>
      <div className="nw-audio-copy">
        <p className="nw-audio-label">A reading of “{title}”</p>
        <div className="nw-audio-scrub">
          <input
            type="range"
            min={0}
            max={100}
            value={pct}
            onChange={seek}
            aria-label="Seek"
            className="nw-audio-range"
            style={{ background: `linear-gradient(to right, #1A1A1A ${pct}%, #D1C9BE ${pct}%)` }}
          />
          <span className="nw-audio-time">{fmt(t)} / {fmt(dur)}</span>
        </div>
      </div>
    </div>
  );
};

function useAudioStyles() {
  useEffect(() => {
    const id = "nw-audio-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = CSS;
    document.head.appendChild(el);
  }, []);
}

const CSS = `
.nw-audio { display: flex; align-items: center; gap: 0.9rem; width: min(24rem, 88%); margin-top: 1.6rem; padding: 0.85rem 1rem; border: 1px solid #D1C9BE; background: rgba(234,231,226,0.4); }
.nw-audio-empty { color: #6E6A64; }
.nw-audio-icon, .nw-audio-btn { display: inline-flex; align-items: center; justify-content: center; flex: none; }
.nw-audio-icon { width: 2rem; height: 2rem; color: #8A8479; }
.nw-audio-btn { width: 2.4rem; height: 2.4rem; border-radius: 50%; border: 1px solid #1A1A1A; background: #1A1A1A; color: #F4F1EE; cursor: pointer; transition: opacity 0.2s ease; }
.nw-audio-btn:hover { opacity: 0.82; }
.nw-audio-copy { flex: 1; min-width: 0; }
.nw-audio-label { font-family: "JetBrains Mono", monospace; font-size: 0.5rem; letter-spacing: 0.28em; text-transform: uppercase; color: #6E6A64; margin: 0 0 0.15rem; }
.nw-audio-note { font-family: Georgia, serif; font-style: italic; font-size: 0.8rem; color: #6E6A64; margin: 0.35rem 0 0; line-height: 1.4; }
.nw-audio-scrub { display: flex; align-items: center; gap: 0.7rem; margin-top: 0.35rem; }
.nw-audio-range { -webkit-appearance: none; appearance: none; height: 2px; flex: 1; border-radius: 2px; outline: none; cursor: pointer; }
.nw-audio-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 11px; height: 11px; border-radius: 50%; background: #1A1A1A; cursor: pointer; }
.nw-audio-range::-moz-range-thumb { width: 11px; height: 11px; border: 0; border-radius: 50%; background: #1A1A1A; cursor: pointer; }
.nw-audio-time { font-family: "JetBrains Mono", monospace; font-size: 0.55rem; color: #8A8479; white-space: nowrap; }
`;
