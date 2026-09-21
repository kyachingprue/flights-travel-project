import { Link } from "react-router";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { deals } from "../data";
import { money } from "../lib/format";
import { button, wrap } from "../lib/ui";

export default function TopDeals() {
  return (
    <section className={`${wrap} pt-16 sm:pt-20`}>
      <SectionHeading
        eyebrow="Best deals"
        title="Top Flight Deals"
        subtitle="Hand-picked deals for your next adventure. Book now and save more."
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {deals.map((d, i) => (
          <Reveal as="li" key={d.id} delay={i * 0.08}>
            <Link
              to="/flights"
              className="group block overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Img
                  src={d.image}
                  alt={`${d.to} skyline`}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 rounded-lg bg-sun-400 px-2 py-1 text-[11px] font-extrabold text-navy-950">
                  {d.off}% off
                </span>
              </div>
              <div className="flex items-end justify-between gap-3 p-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-navy-950">
                    {d.from} to {d.to}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-mute">{d.cls}</p>
                  <p className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-rose-600">{money(d.price)}</span>
                    <span className="text-xs text-mute line-through">{money(d.was)}</span>
                  </p>
                  <p className="mt-1 text-[11px] text-mute">{d.dates}</p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600 transition group-hover:rotate-90 group-hover:bg-brand-600 group-hover:text-white">
                  <FiPlus />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-8 text-center">
        <Link to="/flights" className={button("brand")}>
          View all flight deals <FiArrowRight />
        </Link>
      </Reveal>
    </section>
  );
}
