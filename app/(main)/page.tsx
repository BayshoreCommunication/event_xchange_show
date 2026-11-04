import Conversation from "components/home/Conversation";
import Hero3 from "components/home/Hero3";
import Industry from "components/home/Industry";
import Marquee from "components/home/marquee";
import Newslettter from "components/home/Newslettter";
import Podcast from "components/home/Podcast";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030A16]">
      <Hero3 />
      {/* <Marquee /> */}
      <Podcast />
      <Conversation />
      <Industry />
      <Newslettter />
    </div>
  );
}
