import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  to,
  linkLabel,
  className = "",
}) {
  return (
    <Reveal
      className={`flex flex-wrap items-end justify-between gap-x-6 gap-y-3 ${className}`}
    >
      <div className="max-w-xl">
        {eyebrow && (
          <p className="mb-2 text-[11px] font-bold tracking-[0.18em] text-brand-600 uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl leading-tight font-extrabold text-navy-950 sm:text-4xl">
          {title} {accent && <span className="text-brand-600">{accent}</span>}
        </h2>
        {subtitle && <p className="mt-2 text-sm text-mute sm:text-base">{subtitle}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="group inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-800"
        >
          {linkLabel}
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
