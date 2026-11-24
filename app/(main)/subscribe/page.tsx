import type { Metadata } from "next";
import { Lightbulb, Mic, X } from "lucide-react";
import SubscribeHero from "components/subscribe/SubscribeHero";
import PlatformLinks from "components/podcast/PlatformLinks";
import Faq from "components/podcast/Faq";
import Reveal from "components/podcast/Reveal";
import { TypingHeading } from "components/ui/TypingTitle";
import { card, container, gradText, h2, panel, sectionY } from "lib/ui";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "One useful idea from each episode of The Event XChange Show, followed by a clear invitation to listen. No sales follow-ups.",
  alternates: { canonical: "/subscribe" },
};

const INBOX = [
  {
    Icon: Lightbulb,
    title: "One useful idea",
    text: "The single most practical takeaway from each conversation, written so you can use it on Monday.",
  },
  {
    Icon: Mic,
    title: "A clear invitation to listen",
    text: "A short note on who the guest is, why it matters, and a link straight to the episode on your favorite app.",
  },
  {
    Icon: X,
    title: "Nothing else",
    text: "No sponsored blasts, no sales follow-ups, no sharing your address. One email a week, every Wednesday.",
  },
];

const FAQ = [
  {
    q: "How often will you email me?",
    a: "Once a week, on Wednesdays when a new episode goes live. If we skip a week, you won't hear from us.",
  },
  {
    q: "Will my email be shared with sponsors or vendors?",
    a: "No. Your address is used only to send the weekly idea email. We never sell or share it.",
  },
  { q: "How do I unsubscribe?", a: "Every email has a one-click unsubscribe link at the bottom. No questions asked." },
];

export default function SubscribePage() {
  return (
    <div className="bg-[#030A16] text-white">
      <SubscribeHero />

      {/* ---------------- WHAT LANDS IN YOUR INBOX ---------------- */}
      <section className={sectionY}>
        <div className={container}>
          <TypingHeading
            as="h2"
            className={h2 + " mb-9 text-center"}
            segments={[{ text: "What lands in " }, { text: "your inbox", className: gradText }]}
            ariaLabel="What lands in your inbox"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {INBOX.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08} className={card + " p-7"}>
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-[14px] border border-[#00E5FF]/35 bg-[#00E5FF]/10 text-[#00F0FF]">
                  <Icon className="h-[22px] w-[22px]" />
                </div>
                <h3 className="mb-2 text-xl font-bold tracking-tight">{title}</h3>
                <p className="text-[15px] sm:text-base leading-relaxed text-[#a9bccd]">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FOLLOW THE SHOW ---------------- */}
      <section id="listen" className={sectionY}>
        <div className={container}>
          <div className={panel}>
            <div
              className="pointer-events-none absolute -right-44 -top-56 h-[520px] w-[520px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(0,200,255,0.22), transparent 65%)" }}
              aria-hidden="true"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              <div>
                <TypingHeading
                  as="h2"
                  className={h2}
                  segments={[{ text: "Prefer to just " }, { text: "follow the show?", className: gradText }]}
                  ariaLabel="Prefer to just follow the show?"
                />
                <p className="mt-4 text-base sm:text-lg text-[#a9bccd]">
                  New episodes every Wednesday on your favorite podcast app.
                </p>
              </div>
              <PlatformLinks />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className={sectionY}>
        <div className={container}>
          <Faq items={FAQ} />
        </div>
      </section>
    </div>
  );
}
