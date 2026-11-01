
import Hero2 from "components/home/hero2";
import Marquee from "components/home/marquee";
import Podcast from "components/home/podcast";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030A16]">
      <Hero2 />
      <Marquee />
      <Podcast />
    </main>
  );
}

