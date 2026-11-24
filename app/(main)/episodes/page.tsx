import type { Metadata } from "next";
import EpisodesView from "components/episodes/EpisodesView";

// Re-render daily so "released / coming soon" follows the calendar
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Episodes",
  description:
    "Every conversation from The Event XChange Show: real event professionals, real decisions, and something worth taking back to your next program.",
  alternates: { canonical: "/episodes" },
};

export default function EpisodesPage() {
  return <EpisodesView />;
}
