/** Simple accessible FAQ built on <details>. */
export default function Faq({ items }: { items: { q: string; a: React.ReactNode }[] }) {
  return (
    <div className="mx-auto grid max-w-[820px] gap-3">
      {items.map((it) => (
        <details
          key={it.q}
          className="group rounded-2xl border border-[#1c2e3f] bg-[#041122]/80 px-5 sm:px-6 transition-colors open:border-[#00E5FF]/40"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base sm:text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
            {it.q}
            <span className="text-2xl leading-none text-[#00F0FF] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 text-[15px] sm:text-base leading-relaxed text-[#a9bccd]">{it.a}</p>
        </details>
      ))}
    </div>
  );
}
