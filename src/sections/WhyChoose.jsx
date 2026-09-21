import { FiTag, FiMousePointer, FiRefreshCw, FiUsers } from "react-icons/fi";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { features } from "../data";
import { wrap } from "../lib/ui";

const icons = [FiTag, FiMousePointer, FiRefreshCw, FiUsers];
const tones = {
  amber: "bg-amber-100 text-amber-600",
  blue: "bg-brand-100 text-brand-600",
  green: "bg-emerald-100 text-emerald-600",
  sky: "bg-sky-100 text-sky-600",
};

export default function WhyChoose() {
  return (
    <section className={`${wrap} pt-16 sm:pt-20`}>
      <SectionHeading eyebrow="The smarter way to travel" title="Why Choose Flights.com?" />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => {
          const Icon = icons[i];
          return (
            <Reveal
              as="li"
              key={f.title}
              delay={i * 0.07}
              className="rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <span className={`grid size-12 place-items-center rounded-full text-xl ${tones[f.tone]}`}>
                <Icon />
              </span>
              <h3 className="mt-4 text-base font-bold text-navy-950">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-mute">{f.text}</p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
