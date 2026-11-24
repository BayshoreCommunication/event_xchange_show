import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EpisodeDetail from "components/episodes/EpisodeDetail";
import { EPISODES, episodeNumber, getEpisode } from "data/podcast";

// Re-render daily so "released / coming soon" follows the calendar
export const revalidate = 86400;

export function generateStaticParams() {
  return EPISODES.map((e) => ({ id: e.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const ep = getEpisode(params.id);
  if (!ep) return {};
  return {
    title: `${episodeNumber(ep.number)}: ${ep.title}`,
    description: ep.summary,
    alternates: { canonical: `/episodes/${ep.id}` },
    openGraph: { title: ep.title, description: ep.summary, images: [ep.image] },
  };
}

export default function EpisodePage({ params }: { params: { id: string } }) {
  const ep = getEpisode(params.id);
  if (!ep) notFound();
  return <EpisodeDetail ep={ep} />;
}
