import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import Stars from "../components/Stars";
import { testimonials } from "../data";
import { wrap } from "../lib/ui";

const initials = (name) => name.split(" ").map((p) => p[0]).join("");
const avatarTones = ["from-brand-500 to-navy-900", "from-sun-400 to-amber-600", "from-emerald-400 to-teal-700"];

export default function Testimonials() {
  return (
    <section className={`${wrap} pt-16 sm:pt-20`}>
      <SectionHeading
        eyebrow="Traveller stories"
        title="What Our Customers Say"
        subtitle="Real experiences from happy travellers."
      />

      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal
            as="li"
            key={t.name}
            delay={i * 0.09}
            className="flex flex-col rounded-2xl border border-line bg-white p-6 shadow-card"
          >
            <div className="flex items-center gap-3">
              <span
                className={`grid size-11 place-items-center rounded-full bg-linear-to-br text-sm font-extrabold text-white ${avatarTones[i]}`}
              >
                {initials(t.name)}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-navy-950">{t.name}</p>
                <p className="text-xs text-mute">{t.country}</p>
              </div>
            </div>
            <Stars value={t.rating} className="mt-4 text-sm" />
            <p className="mt-3 text-sm leading-relaxed text-navy-900/85">{t.text}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
