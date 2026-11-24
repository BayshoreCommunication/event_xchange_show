/* Shared Tailwind class tokens for the inner pages (Episodes, Episode,
   Be a Guest, Subscribe). Colours mirror the homepage. */

export const container = "max-w-7xl mx-auto px-5 sm:px-8 lg:px-12";

/* Section spacing — same scale as the homepage sections */
export const sectionY = "py-6 sm:py-10 lg:py-12";
export const sectionBottom = "pb-6 sm:pb-10 lg:pb-12";
/* Page hero spacing — same as the homepage hero */
export const heroY = "pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-10 lg:pb-12";

export const btnBase =
  "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030A16] active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed disabled:hover:scale-100";

export const btnPrimary =
  btnBase +
  " px-7 py-3.5 text-sm sm:text-[15px] text-[#012232] bg-gradient-to-r from-[#00E5FF] to-[#00C2FF] shadow-[0_0_15px_rgba(2,246,248,0.35)] hover:from-[#00F0FF] hover:to-[#00D5F8] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-[1.03]";

export const btnGhost =
  btnBase +
  " px-7 py-3.5 text-sm sm:text-[15px] text-white border border-solid border-white/25 hover:border-[#00E5FF]/70 hover:bg-white/[0.06] hover:scale-[1.03]";

export const btnSm = " !px-5 !py-2.5 !text-[13px] sm:!text-sm";

export const gradText =
  "bg-gradient-to-r from-[#00F0FF] via-[#00C4FB] to-[#07A6F7] bg-clip-text text-transparent";

export const display =
  "text-[40px] sm:text-[56px] lg:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.05] text-white";

export const h2 =
  "text-[32px] sm:text-[42px] lg:text-[50px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white";

export const lead = "text-base sm:text-lg lg:text-xl text-[#a9bccd] leading-relaxed";

export const eyebrow =
  "inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold tracking-[0.12em] uppercase text-[#00F0FF] before:content-[''] before:w-2 before:h-2 before:rounded-full before:bg-[#00F0FF] before:shadow-[0_0_10px_#00F0FF]";

export const card =
  "rounded-[20px] border border-[#1c2e3f] bg-gradient-to-b from-[#061c2d]/85 to-[#040e1a]/95";

export const panel =
  "relative overflow-hidden rounded-[28px] sm:rounded-[32px] border border-[#1c2e3f] bg-gradient-to-b from-[#0a253c]/55 to-[#041122]/90 px-5 py-10 sm:p-12 lg:p-14";

export const input =
  "w-full rounded-[14px] border border-solid border-[#202e3d] bg-[#030A16]/70 px-4 py-3.5 text-[15px] sm:text-base text-white placeholder:text-[#5d7285] outline-none transition focus:border-[#00E5FF]/70 focus:ring-4 focus:ring-[#00E5FF]/10";

export const inputInvalid = " !border-[#ff6b81]";

export const pill =
  "inline-flex items-center rounded-full border border-solid px-4 py-2.5 text-[13px] sm:text-sm font-medium cursor-pointer transition-all select-none";

export const pillOff = " border-[#202e3d] text-[#cbd5e1] hover:border-[#00E5FF]/50 hover:text-white";

export const pillOn = " border-[#00E5FF] bg-[#00E5FF]/[0.12] text-[#00F0FF]";
