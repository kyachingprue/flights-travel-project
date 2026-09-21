import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import Img from "./Img";
import Reveal from "./Reveal";
import { button } from "../lib/ui";

// Photo banner with a navy overlay, used all over the site.
export default function Banner({
  eyebrow,
  title,
  text,
  cta,
  image,
  badge,
  size = "md",
  position = "object-center",
  children,
}) {
  const heights = { md: "min-h-[280px] sm:min-h-[320px]", lg: "min-h-[340px] sm:min-h-[420px]" };
  return (
    <Reveal
      className={`relative isolate flex items-center overflow-hidden rounded-3xl bg-navy-900 text-white shadow-lift ${heights[size]}`}
    >
      <Img src={image} alt="" className={`absolute inset-0 -z-20 size-full object-cover ${position}`} />
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-navy-950/90 via-navy-900/55 to-transparent" />

      <div className="max-w-lg p-6 sm:p-10 lg:p-12">
        {eyebrow && (
          <p className="mb-3 text-[11px] font-bold tracking-[0.18em] text-sun-300 uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl leading-tight font-extrabold sm:text-4xl">{title}</h2>
        {text && <p className="mt-3 max-w-sm text-sm text-white/85 sm:text-base">{text}</p>}
        {cta && (
          <Link to={cta.to} className={`${button("sun")} mt-6`}>
            {cta.label}
            <FiArrowRight />
          </Link>
        )}
        {children}
      </div>

      {badge && (
        <div className="absolute top-5 right-5 grid size-24 rotate-6 place-items-center rounded-full bg-sun-400 text-center text-navy-950 shadow-lg sm:top-1/2 sm:right-14 sm:size-28 sm:-translate-y-1/2">
          <div className="leading-none">
            <span className="block text-[10px] font-bold">Up to</span>
            <span className="block text-3xl font-extrabold">{badge}</span>
            <span className="block text-xs font-extrabold">OFF</span>
          </div>
        </div>
      )}
    </Reveal>
  );
}
