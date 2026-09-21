import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { airlines } from "../data";
import { wrap } from "../lib/ui";

const arrow =
  "grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white text-lg text-navy-900 shadow-card transition hover:border-brand-500 hover:text-brand-600";

export default function AirlinesRow() {
  const rail = useRef(null);
  const slide = (dir) =>
    rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.7, behavior: "smooth" });

  return (
    <section className={`${wrap} pt-16 sm:pt-20`}>
      <SectionHeading
        eyebrow="Popular airlines"
        title="Fly with the World's Best Airlines"
        subtitle="We partner with top airlines to give you the best experience and comfort."
        to="/flights"
        linkLabel="View all airlines"
      />

      <Reveal className="mt-8 flex items-center gap-3">
        <button type="button" aria-label="Previous airlines" onClick={() => slide(-1)} className={`${arrow} max-sm:hidden`}>
          <FiChevronLeft />
        </button>

        <ul ref={rail} className="no-scrollbar flex flex-1 snap-x gap-3 overflow-x-auto scroll-smooth py-2">
          {airlines.map((a) => (
            <li
              key={a.code}
              className="flex h-20 shrink-0 snap-start whitespace-nowrap items-center justify-center gap-3 rounded-2xl border border-line bg-white px-5 transition hover:-translate-y-1 hover:shadow-card"
            >
              <span
                className="grid size-10 place-items-center rounded-full text-xs font-extrabold text-white"
                style={{ backgroundColor: a.color }}
              >
                {a.code}
              </span>
              <span className="text-sm font-bold text-navy-950">{a.name}</span>
            </li>
          ))}
        </ul>

        <button type="button" aria-label="Next airlines" onClick={() => slide(1)} className={`${arrow} max-sm:hidden`}>
          <FiChevronRight />
        </button>
      </Reveal>
    </section>
  );
}
