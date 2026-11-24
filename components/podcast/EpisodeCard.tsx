"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Pause, Play } from "lucide-react";
import { Episode, episodeNumber, episodeUrl, formatDate } from "data/podcast";
import { usePlayer } from "./AudioPlayerProvider";
import Wave from "./Wave";

/** Round play/pause button + label that follows the global player. */
export function PlayEpisodeButton({ ep, label = "Play Episode" }: { ep: Episode; label?: string }) {
  const { current, playing, play } = usePlayer();
  const isCurrent = current?.id === ep.id;
  const on = isCurrent && playing;
  return (
    <button
      type="button"
      onClick={() => play(ep.id)}
      className="inline-flex items-center gap-2.5 text-sm sm:text-[15px] font-semibold text-white hover:text-[#00F0FF] transition-colors cursor-pointer"
    >
      <span className="grid place-items-center w-9 h-9 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#00C2FF] text-[#012232] shadow-[0_0_12px_rgba(0,229,255,0.4)]">
        {on ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
      </span>
      <span>{on ? "Pause" : isCurrent ? "Resume" : label}</span>
    </button>
  );
}

/** Frosted play button in the middle of an episode image. */
export function PlayDot({ ep, size = "md" }: { ep: Episode; size?: "md" | "lg" }) {
  const { current, playing, play } = usePlayer();
  const on = current?.id === ep.id && playing;
  return (
    <button
      type="button"
      onClick={() => play(ep.id)}
      aria-label={`${on ? "Pause" : "Play"} ${ep.title}`}
      className={`absolute inset-0 m-auto grid place-items-center rounded-full border border-solid border-white/30 bg-white/20 backdrop-blur-md text-white transition-all hover:bg-[#00E5FF]/85 hover:text-[#012232] hover:scale-105 cursor-pointer ${
        size === "lg" ? "w-[72px] h-[72px]" : "w-[54px] h-[54px]"
      }`}
    >
      {on ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
    </button>
  );
}

export default function EpisodeCard({
  ep,
  released,
  isNewest = false,
}: {
  ep: Episode;
  released: boolean;
  isNewest?: boolean;
}) {
  const { current, playing } = usePlayer();
  const on = current?.id === ep.id && playing;

  return (
    <article className="group flex flex-col h-full rounded-[20px] border border-[#1c2e3f] bg-gradient-to-b from-[#061c2d]/90 to-[#040e1a]/95 p-3.5 transition-all duration-300 hover:-translate-y-[3px] hover:border-[#00E5FF]/45 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)]">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] bg-[#061c2d]">
        <Link href={episodeUrl(ep)} tabIndex={-1} aria-hidden="true">
          <Image
            src={ep.image}
            alt=""
            fill
            sizes="(min-width: 1080px) 33vw, (min-width: 700px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        {released ? (
          <PlayDot ep={ep} />
        ) : (
          <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-[#030A16]/75 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#e5e7eb]">
            Coming {formatDate(ep.date, false)}
          </span>
        )}
        {released && isNewest && (
          <span className="absolute right-3 top-3 rounded-full border border-[#00E5FF]/40 bg-[#030A16]/75 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#00F0FF]">
            New
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1.5 pt-4 pb-1.5">
        <div className="flex items-center gap-3 text-[13px] text-[#94a9bf]">
          <span className="font-bold text-[#00F0FF]">{episodeNumber(ep.number)}</span>
          <span>{ep.format}</span>
          <span>{ep.duration} min</span>
        </div>
        <h3 className="mt-2.5 mb-2 text-xl font-bold leading-tight tracking-tight text-white">
          <Link href={episodeUrl(ep)} className="hover:text-[#00F0FF] transition-colors">
            {ep.title}
          </Link>
        </h3>
        <p className="mb-5 text-[15px] leading-relaxed text-[#a9bccd]">{ep.summary}</p>

        <div className="mt-auto flex items-center justify-between gap-2.5 border-t border-[#1c2e3f] pt-3.5">
          {released ? (
            <PlayEpisodeButton ep={ep} />
          ) : (
            <Link
              href="/subscribe"
              className="inline-flex items-center gap-2.5 text-sm sm:text-[15px] font-semibold text-white hover:text-[#00F0FF]"
            >
              <span className="grid place-items-center w-9 h-9 rounded-full bg-[#1c2e3f] text-[#94a9bf]">
                <Clock className="w-4 h-4" />
              </span>
              Get notified
            </Link>
          )}
          <Wave playing={on} />
        </div>
        <div className="mt-3 flex justify-between gap-3 text-[13px] text-[#6e859b]">
          <span>{ep.guest.name}</span>
          <span>{ep.guest.role}</span>
        </div>
      </div>
    </article>
  );
}
