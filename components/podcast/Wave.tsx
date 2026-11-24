/** Small decorative sound wave. Animates while `playing`. */
export default function Wave({ bars = 14, playing = false }: { bars?: number; playing?: boolean }) {
  return (
    <span className="inline-flex items-center gap-[3px] h-[22px]" aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <i
          key={i}
          className={`block w-[3px] rounded-[3px] bg-[#00E5FF]/75 origin-center ${
            playing ? "animate-[eq_1s_ease-in-out_infinite]" : ""
          }`}
          style={{ height: 6 + ((i * 7) % 15), animationDelay: `${(i % 5) * 0.12}s` }}
        />
      ))}
    </span>
  );
}
