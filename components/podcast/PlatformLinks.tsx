import { SiAmazon, SiApplepodcasts, SiSpotify, SiYoutube } from "react-icons/si";
import { PODCAST_CONFIG } from "data/podcast";

const P = PODCAST_CONFIG.platforms;

export const PLATFORMS = [
  { name: "Apple Podcasts", sub: "Listen on iPhone, Mac & CarPlay", href: P.apple, bg: "linear-gradient(135deg,#c35cf5,#7b2ff7)", Icon: SiApplepodcasts },
  { name: "Spotify", sub: "Follow and get new episodes", href: P.spotify, bg: "#1db954", Icon: SiSpotify },
  { name: "YouTube", sub: "Watch the full conversations", href: P.youtube, bg: "#ff0033", Icon: SiYoutube },
  { name: "Amazon Music", sub: "Listen with Alexa or the app", href: P.amazon, bg: "linear-gradient(135deg,#25d1da,#1a98ff)", Icon: SiAmazon },
] as const;

/** Big platform tiles (Subscribe page). */
export default function PlatformLinks() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PLATFORMS.map(({ name, sub, href, bg, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 rounded-2xl border border-[#1c2e3f] bg-[#041122]/80 px-4 py-4 transition-all hover:-translate-y-0.5 hover:border-[#00E5FF]/50"
        >
          <span className="grid place-items-center w-11 h-11 shrink-0 rounded-xl text-white" style={{ background: bg }}>
            <Icon className="w-5 h-5" />
          </span>
          <span>
            <b className="block text-base text-white">{name}</b>
            <small className="text-[13px] text-[#94a9bf]">{sub}</small>
          </span>
        </a>
      ))}
    </div>
  );
}
