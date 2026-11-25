import type { Metadata } from "next";
import Image from "next/image";
import PitchForm from "components/be-a-guest/PitchForm";
import Faq from "components/podcast/Faq";
import PageBackdrop from "components/podcast/PageBackdrop";
import Reveal from "components/podcast/Reveal";
import { SuggestGuestButton } from "components/podcast/SuggestGuestProvider";
import { TypingHeading } from "components/ui/TypingTitle";
import { PODCAST_CONFIG } from "data/podcast";
import { btnPrimary, card, container, gradText, h2, heroY, lead, panel, sectionY } from "lib/ui";

export const metadata: Metadata = {
  title: "Be a Guest",
  description:
    "Pitch yourself or a colleague for The Event XChange Show. How an episode works, who we're looking for, and how to apply.",
  alternates: { canonical: "/be-a-guest" },
};

const PERSONAS = [
  {
    img: "/images/be-a-guest/persona-planners.jpg",
    title: "Event professionals",
    text: "You run the sales kickoffs, annual meetings and conferences, and you've made the hard calls that never show up on stage.",
  },
  {
    img: "/images/be-a-guest/persona-early.jpg",
    title: "Early-career professionals",
    text: "Fresh perspective counts. Tell us the lesson from your first big program while it's still vivid.",
  },
  {
    img: "/images/be-a-guest/persona-leaders.jpg",
    title: "Production Company",
    text: "Decades in the industry? Share the decision that changed how you plan, produce or lead a team.",
  },
];

const STEPS = [
  { title: "You pitch", text: "Tell us the story and the takeaway. We read every pitch and reply within two weeks." },
  {
    title: "Intro call",
    text: "A relaxed 20-minute call with Ace or Suley to find the heart of the story and see if it's a fit for the show. No prep homework needed.",
  },
  {
    title: "Decision time",
    text: "If it's a fit, we confirm your recording date and send a setup checklist ahead of time.",
  },
  { title: "We record", text: "About 45 minutes, remote or in studio." },
  {
    title: "Release & share",
    text: "Your episode goes live with show notes, audiograms and a share kit for LinkedIn.",
  },
];

const EXPECT = [
  { big: "20 min", small: "intro call" },
  { big: "45 min", small: "recording session" },
  { big: "30–40", small: "minute episode" },
  { big: "$0", small: "cost to guests" },
];

const FAQ = [
  {
    q: "Do I need podcast or speaking experience?",
    a: "Not at all. Most of our guests have never been on a podcast. Ace and Suley guide the conversation, and the intro call is there to help you feel ready.",
  },
  {
    q: "Can I talk about a program that went wrong?",
    a: "Please do. Real stories are the heart of the show. We'll agree beforehand on anything confidential, like client names or budgets, and leave it out.",
  },
  {
    q: "Do I need special equipment?",
    a: "For remote recordings we recommend a USB microphone and headphones. If you don't have one, tell us and we will send you recommendation links. In-studio recordings need nothing but you.",
  },
  {
    q: "Can I promote my company or product?",
    a: "You'll be introduced with your role and organization, and we link to you in the show notes. Episodes aren't sales pitches, so we steer away from product talk.",
  },
  {
    q: "Will I get to hear the episode before it's released?",
    a: "We share the release date and your share kit ahead of time. If something comes up that needs correcting, just let us know and we'll take care of it.",
  },
];

export default function BeAGuestPage() {
  return (
    <div className="bg-[#030A16] text-white">
      {/* ---------------- HERO ---------------- */}
      <section className={"relative isolate overflow-hidden text-center " + heroY}>
        <PageBackdrop src="/images/pages/studio-bg.jpg" overlay="dim" priority />
        <div className={container}>
          <TypingHeading
            as="h1"
            className="text-[40px] sm:text-[56px] lg:text-[72px] font-extrabold leading-[1.05] tracking-[-0.035em]"
            segments={[
              { text: "Have a story", lineBreak: true },
              { text: "the industry", className: gradText, lineBreak: true },
              { text: "needs to hear?", className: gradText },
            ]}
            triggerOnView={false}
            ariaLabel="Have a story the industry needs to hear?"
          />
          <div className="mt-9 flex justify-center">
            <a href="#pitch" className={btnPrimary}>
              Pitch yourself or a colleague
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- WHO WE'RE LOOKING FOR ---------------- */}
      <section className={sectionY}>
        <div className={container}>
          <div className="mb-10 text-center">
            <TypingHeading
              as="h2"
              className={h2}
              segments={[{ text: "Who we're " }, { text: "looking for", className: gradText }]}
              ariaLabel="Who we're looking for"
            />
            <p className={lead + " mx-auto mt-5 max-w-[640px]"}>
              Every episode pairs a real person with a real decision. Here&apos;s who that usually is.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {PERSONAS.map((p, i) => (
              <Reveal key={p.title} as="article" delay={i * 0.08} className={card + " overflow-hidden"}>
                <div className="relative aspect-video">
                  <Image src={p.img} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="px-6 pt-6 pb-7">
                  <h3 className="mb-2 text-xl font-bold tracking-tight">{p.title}</h3>
                  <p className="text-[15px] sm:text-base leading-relaxed text-[#a9bccd]">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW AN EPISODE WORKS ---------------- */}
      <section id="how-it-works" className={"scroll-mt-28 " + sectionY}>
        <div className={container}>
          <div className={panel}>
            <div
              className="pointer-events-none absolute -right-44 -top-56 h-[520px] w-[520px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(0,200,255,0.22), transparent 65%)" }}
              aria-hidden="true"
            />
            <TypingHeading
              as="h2"
              className={h2 + " relative mb-10 text-center"}
              segments={[{ text: "How an episode " }, { text: "works", className: gradText }]}
              ariaLabel="How an episode works"
            />
            <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {STEPS.map((s, i) => (
                <Reveal key={s.title} as="li" delay={i * 0.06} className={card + " relative px-6 pt-14 pb-6"}>
                  <span className="absolute left-6 top-5 text-[15px] font-extrabold tracking-wider text-[#00F0FF]">
                    0{i + 1}
                  </span>
                  <h3 className="mb-2 text-lg sm:text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="text-[15px] leading-relaxed text-[#a9bccd]">{s.text}</p>
                </Reveal>
              ))}
            </ol>
            <div className="relative mt-7 grid grid-cols-2 gap-3.5 md:grid-cols-4">
              {EXPECT.map((x) => (
                <div key={x.small} className="rounded-2xl border border-[#1c2e3f] bg-[#041122]/80 p-5">
                  <b className={gradText + " block text-[28px] font-extrabold tracking-[-0.03em]"}>{x.big}</b>
                  <small className="text-sm text-[#94a9bf]">{x.small}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- PITCH FORM ---------------- */}
      <section id="pitch" className={"scroll-mt-28 " + sectionY}>
        <div className="mx-auto max-w-[900px] px-5 sm:px-8">
          <div className="mb-8 text-center">
            <TypingHeading
              as="h2"
              className={h2}
              segments={[{ text: "Pitch " }, { text: "your story", className: gradText }]}
              ariaLabel="Pitch your story"
            />
            <p className={lead + " mx-auto mt-5 max-w-[640px]"}>
              Three short steps. Pitching someone else?{" "}
              <SuggestGuestButton className="text-[#00F0FF] hover:underline cursor-pointer">
                Suggest a guest instead →
              </SuggestGuestButton>
            </p>
          </div>
          <div className={panel}>
            <PitchForm />
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className={sectionY}>
        <div className={container}>
          <TypingHeading
            as="h2"
            className={h2 + " mb-8 text-center"}
            segments={[{ text: "Guest " }, { text: "questions", className: gradText }]}
            ariaLabel="Guest questions"
          />
          <Faq items={FAQ} />
          <p id="contact" className="mt-8 text-center text-[15px] sm:text-base text-[#94a9bf]">
            Other questions? Email us at{" "}
            <a href={`mailto:${PODCAST_CONFIG.contactEmail}`} className="text-[#00F0FF] hover:underline">
              {PODCAST_CONFIG.contactEmail}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
