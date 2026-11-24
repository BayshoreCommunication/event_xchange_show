import Image from "next/image";

/** Full-bleed background photo that fades into the page colour. */
export default function PageBackdrop({
  src,
  overlay = "fade",
  priority = false,
}: {
  src: string;
  overlay?: "fade" | "dim";
  priority?: boolean;
}) {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Image src={src} alt="" fill priority={priority} sizes="100vw" className="object-cover object-center" />
      <div
        className={`absolute inset-0 ${
          overlay === "fade"
            ? "bg-gradient-to-b from-[#030A16]/20 to-[#030A16] to-[96%]"
            : "bg-gradient-to-b from-[#030A16]/55 to-[#030A16]/85"
        }`}
      />
    </div>
  );
}
