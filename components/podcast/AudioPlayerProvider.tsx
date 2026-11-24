"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, RotateCcw, RotateCw, X } from "lucide-react";
import { EPISODES, Episode, PODCAST_CONFIG, episodeNumber } from "data/podcast";

type PlayerContext = {
  current: Episode | null;
  playing: boolean;
  /** Position in the real episode (seconds), even when preview audio plays. */
  realTime: number;
  /** Play / pause an episode by id. */
  play: (id: string) => void;
  /** Load an episode without starting it. */
  load: (ep: Episode, startAt?: number, autoplay?: boolean) => void;
  /** Jump to a point in the real episode (seconds) and play. */
  seekReal: (seconds: number) => void;
};

const Ctx = createContext<PlayerContext | null>(null);

export const usePlayer = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePlayer must be used inside <AudioPlayerProvider>");
  return ctx;
};

const STORE_KEY = "exs-player";
const SPEEDS = [1, 1.25, 1.5, 2, 0.75];

const fmt = (s: number) => {
  s = Math.max(0, Math.floor(s || 0));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export default function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [current, setCurrent] = useState<Episode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [dragValue, setDragValue] = useState<number | null>(null);
  const currentRef = useRef<Episode | null>(null);
  currentRef.current = current;

  const isPreview = !!current && !current.audio;
  const realTime =
    current && isPreview && duration ? (time / duration) * current.duration * 60 : time;

  // Create the audio element on the client only
  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;
    const onTime = () => {
      setTime(audio.currentTime);
      const ep = currentRef.current;
      if (ep) {
        try {
          sessionStorage.setItem(STORE_KEY, JSON.stringify({ id: ep.id, t: audio.currentTime }));
        } catch {}
      }
    };
    const onMeta = () => setDuration(audio.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);

    // Restore the last episode (paused) after navigation / reload
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) || "null");
      const ep = saved && EPISODES.find((e) => e.id === saved.id);
      if (ep) {
        setCurrent(ep);
        audio.src = ep.audio || PODCAST_CONFIG.previewAudio;
        audio.addEventListener("loadedmetadata", () => (audio.currentTime = saved.t || 0), { once: true });
      }
    } catch {}

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
    };
  }, []);

  const whenReady = (audio: HTMLAudioElement, fn: () => void) => {
    if (audio.readyState >= 1) fn();
    else audio.addEventListener("loadedmetadata", fn, { once: true });
  };

  const load = useCallback((ep: Episode, startAt = 0, autoplay = true) => {
    const audio = audioRef.current;
    if (!audio) return;
    // Update the ref now so a seekReal() in the same tick sees this episode
    currentRef.current = ep;
    setCurrent(ep);
    setTime(0);
    setDuration(0);
    setSpeed(1);
    audio.playbackRate = 1;
    audio.src = ep.audio || PODCAST_CONFIG.previewAudio;
    // Lock-screen / headphone controls show the episode
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: ep.title,
          artist: "The Event XChange Show",
          album: episodeNumber(ep.number),
          artwork: [{ src: ep.image }],
        });
      } catch {}
    }
    whenReady(audio, () => {
      if (startAt) audio.currentTime = startAt;
      if (autoplay) audio.play().catch(() => {});
    });
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !currentRef.current) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const play = useCallback(
    (id: string) => {
      const ep = EPISODES.find((e) => e.id === id);
      if (!ep) return;
      if (currentRef.current?.id === id) toggle();
      else load(ep);
    },
    [load, toggle]
  );

  const seekReal = useCallback((seconds: number) => {
    const audio = audioRef.current;
    const ep = currentRef.current;
    if (!audio || !ep) return;
    whenReady(audio, () => {
      audio.currentTime = !ep.audio ? (seconds / (ep.duration * 60)) * audio.duration : seconds;
      audio.play().catch(() => {});
    });
  }, []);

  const close = () => {
    audioRef.current?.pause();
    setCurrent(null);
    try {
      sessionStorage.removeItem(STORE_KEY);
    } catch {}
  };

  const skip = (by: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(Math.max(0, audio.currentTime + by), audio.duration || 0);
  };

  const cycleSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const progress = dragValue ?? (duration ? (time / duration) * 1000 : 0);

  return (
    <Ctx.Provider value={{ current, playing, realTime, play, load, seekReal }}>
      {children}

      {current && (
        <>
          {/* Spacer so the fixed player never covers the footer */}
          <div className="h-36 sm:h-28" aria-hidden="true" />

          <div
            role="region"
            aria-label="Episode player"
            className="fixed left-3 right-3 bottom-3 z-[60] mx-auto max-w-[980px] grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded-[20px] border border-[#00E5FF]/35 bg-[#041122]/95 backdrop-blur-xl px-3.5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_30px_rgba(0,229,255,0.12)] text-white"
          >
            <div className="relative w-[52px] h-[52px] rounded-xl overflow-hidden bg-[#061c2d]">
              <Image src={current.image} alt="" fill sizes="52px" className="object-cover" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                {episodeNumber(current.number)} · {current.title}
                {isPreview && (
                  <span className="ml-1.5 align-[2px] rounded-md bg-[#00F0FF] px-1.5 py-px text-[10px] font-bold tracking-wider text-[#012232]">
                    PREVIEW AUDIO
                  </span>
                )}
              </p>
              <p className="truncate text-xs text-[#94a9bf]">
                {current.guest.name} with Ace Johnson &amp; Suley Usman
              </p>
              <div className="mt-1.5 flex items-center gap-2.5 text-[11.5px] tabular-nums text-[#94a9bf]">
                <span>{fmt(dragValue !== null ? (dragValue / 1000) * duration : time)}</span>
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={progress}
                  aria-label="Seek"
                  onChange={(e) => setDragValue(Number(e.target.value))}
                  onPointerUp={() => {
                    if (dragValue !== null && audioRef.current && duration) {
                      audioRef.current.currentTime = (dragValue / 1000) * duration;
                    }
                    setDragValue(null);
                  }}
                  onKeyUp={() => {
                    if (dragValue !== null && audioRef.current && duration) {
                      audioRef.current.currentTime = (dragValue / 1000) * duration;
                    }
                    setDragValue(null);
                  }}
                  className="flex-1 h-1 cursor-pointer accent-[#00E5FF]"
                />
                <span>{fmt(duration)}</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => skip(-15)}
                aria-label="Back 15 seconds"
                className="grid place-items-center w-10 h-10 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="grid place-items-center w-12 h-12 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#00C2FF] text-[#012232] shadow-[0_0_14px_rgba(0,229,255,0.45)] cursor-pointer"
              >
                {playing ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={() => skip(30)}
                aria-label="Forward 30 seconds"
                className="grid place-items-center w-10 h-10 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <RotateCw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={cycleSpeed}
                aria-label="Playback speed"
                className="h-8 min-w-[46px] rounded-full border border-solid border-[#202e3d] px-2 text-xs font-bold hover:bg-white/10 cursor-pointer"
              >
                {speed}×
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Close player"
                className="grid place-items-center w-10 h-10 rounded-full hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}
    </Ctx.Provider>
  );
}
