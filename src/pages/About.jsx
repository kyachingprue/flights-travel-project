import { Link } from "react-router";
import { FiCompass, FiHeart, FiShield } from "react-icons/fi";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import { destinations } from "../data";
import { button, wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

const stats = [
  { n: "12M+", label: "travellers booked with us" },
  { n: "500+", label: "airlines compared" },
  { n: "190", label: "countries covered" },
  { n: "24/7", label: "human support" },
];

const values = [
  { icon: FiCompass, title: "Show the real price", text: "Taxes, fees and baggage are in the number you see. No surprises at checkout." },
  { icon: FiHeart, title: "Make changes easy", text: "Plans move. We keep change and cancel options clear so you can decide with confidence." },
  { icon: FiShield, title: "Protect your data", text: "Payments are encrypted and we never sell your personal details." },
];

const timeline = [
  { year: "2014", text: "Two friends launch a fare-comparison site from a spare room." },
  { year: "2018", text: "Hotels and car rental join flights in a single search." },
  { year: "2022", text: "Flexible fares and free changes on selected airlines." },
  { year: "2026", text: "Twelve million travellers and support in 14 languages." },
];

export default function About() {
  usePageTitle("About us");
  return (
    <>
      <section className={`${wrap} grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]`}>
        <div>
          <h1 className="text-4xl leading-[1.05] font-extrabold text-navy-950 sm:text-6xl">
            Travel should start with a good decision, not twelve open tabs.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-mute">
            We built flights.com to put every airline, hotel and car in one honest comparison, and to keep a real person one message away when plans change.
          </p>
          <Link to="/flights" className={`${button("brand", "lg")} mt-8`}>Start searching</Link>
        </div>

        <Reveal x={40} y={0} className="grid grid-cols-2 gap-3">
          <Img src={destinations[6].image} alt="Tokyo streets" className="mt-8 aspect-[3/4] w-full rounded-[2rem] object-cover" />
          <Img src={destinations[13].image} alt="Santorini coast" className="aspect-[3/4] w-full rounded-[2rem] rounded-tr-[5rem] object-cover" />
        </Reveal>
      </section>

      <section className="bg-navy-900 text-white">
        <dl className={`${wrap} grid grid-cols-2 gap-8 py-12 lg:grid-cols-4`}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <dt className="order-2 text-sm text-white/70">{s.label}</dt>
              <dd className="text-4xl font-extrabold text-sun-400 sm:text-5xl">{s.n}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className={`${wrap} py-16 sm:py-20`}>
        <h2 className="max-w-lg text-3xl font-extrabold text-navy-950 sm:text-4xl">What we promise every traveller</h2>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.09} className="rounded-3xl bg-mist p-7">
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-600 text-xl text-white"><Icon /></span>
              <h3 className="mt-5 text-lg font-extrabold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{text}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-mist">
        <div className={`${wrap} py-16 sm:py-20`}>
          <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">Our story so far</h2>
          <ol className="relative mt-10 space-y-8 border-l-2 border-brand-200 pl-8">
            {timeline.map((t) => (
              <Reveal as="li" key={t.year} x={-20} y={0} className="relative">
                <span className="absolute top-1.5 -left-[41px] size-4 rounded-full border-4 border-mist bg-brand-600" />
                <p className="text-xl font-extrabold text-brand-600">{t.year}</p>
                <p className="mt-1 max-w-lg text-navy-900/85">{t.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
