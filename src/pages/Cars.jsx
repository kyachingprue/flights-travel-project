import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiUsers, FiBriefcase, FiSettings, FiZap, FiCheck, FiArrowDown } from "react-icons/fi";
import { MdLocalGasStation } from "react-icons/md";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import SearchBox from "../components/SearchBox";
import { carTypes, cars, IMG } from "../data";
import { money } from "../lib/format";
import { button, wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

const steps = [
  { title: "Choose your car", text: "Filter by size, fuel and price. Every rental shows the full cost up front." },
  { title: "Book in two minutes", text: "Add a driver, pick extras and pay. Free cancellation up to 48 hours before pick-up." },
  { title: "Collect and go", text: "Show your booking at the desk or use the airport shuttle to the lot." },
];

const perks = ["Free cancellation", "Unlimited mileage", "Airport pick-up", "Full insurance options"];

const spec = "flex items-center gap-1.5 text-xs font-semibold text-navy-900";

export default function Cars() {
  usePageTitle("Car rental");
  const [type, setType] = useState("All");

  const counts = useMemo(
    () => Object.fromEntries(carTypes.map((t) => [t, t === "All" ? cars.length : cars.filter((c) => c.type === t).length])),
    []
  );
  const list = useMemo(
    () => cars.filter((c) => type === "All" || c.type === type).sort((a, b) => a.price - b.price),
    [type]
  );

  return (
    <>
      {/* Dark, high-contrast header with the car breaking out of a rounded frame */}
      <section className="relative isolate overflow-hidden bg-navy-950 text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_80%_50%,rgba(31,87,240,0.55),transparent),radial-gradient(40%_50%_at_10%_100%,rgba(255,198,41,0.18),transparent)]" />
        <div className={`${wrap} grid items-center gap-10 pt-14 pb-36 lg:grid-cols-[1.05fr_1fr] lg:pt-20 lg:pb-40`}>
          <div>
            <h1 className="text-4xl leading-[1.05] font-extrabold sm:text-6xl">
              Land at the airport. <span className="text-sun-400">Drive off in ten minutes.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-white/80">
              Compare 900 rental brands in 60,000 locations. The price you see includes taxes and fees.
            </p>
            <ul className="mt-6 grid max-w-md grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/90">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <FiCheck className="text-sun-400" /> {p}
                </li>
              ))}
            </ul>
            <a href="#fleet" className={`${button("sun", "lg")} mt-8`}>
              Browse the fleet <FiArrowDown />
            </a>
          </div>

          <Reveal x={50} y={0} className="relative">
            <div className="aspect-[4/3] rotate-[-2deg] overflow-hidden rounded-[2.5rem] rounded-tr-[6rem] bg-navy-900 shadow-lift ring-1 ring-white/15">
              <Img src={IMG.car} alt="Rental car on a coastal road" className="size-full object-cover" />
            </div>
            <p className="absolute -bottom-4 left-4 rounded-2xl bg-sun-400 px-4 py-2.5 text-sm font-extrabold text-navy-950 shadow-lg sm:left-8">
              Cars from {money(24)} a day
            </p>
          </Reveal>
        </div>
      </section>

      <div className={`${wrap} relative z-10 -mt-24`}>
        <SearchBox initial="cars" />
      </div>

      {/* Fleet list */}
      <section id="fleet" className={`${wrap} scroll-mt-24 pt-16 pb-6`}>
        <h2 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">Pick a car that fits the trip</h2>

        <div role="tablist" aria-label="Car type" className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {carTypes.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={type === t}
              onClick={() => setType(t)}
              className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                type === t ? "text-white" : "bg-brand-50 text-navy-900 hover:bg-brand-100"
              }`}
            >
              {type === t && (
                <motion.span layoutId="car-tab" className="absolute inset-0 rounded-xl bg-brand-600" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">{t}</span>
              <span className={`relative rounded-md px-1.5 text-[11px] ${type === t ? "bg-white/20" : "bg-white text-mute"}`}>
                {counts[t]}
              </span>
            </button>
          ))}
        </div>

        <ul className="mt-8 space-y-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((c) => (
              <motion.li
                key={c.id}
                layout
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="grid overflow-hidden rounded-3xl border border-line bg-white transition-shadow hover:shadow-lift sm:grid-cols-[260px_1fr_auto]"
              >
                <div className="relative aspect-[16/10] bg-mist sm:aspect-auto">
                  <Img src={c.image} alt={c.name} className="absolute inset-0 size-full object-cover" />
                  {c.tag && (
                    <span className="absolute top-3 left-3 rounded-lg bg-navy-900 px-2.5 py-1 text-[11px] font-bold text-white">{c.tag}</span>
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-xs font-bold text-brand-600">{c.type}</p>
                  <h3 className="mt-0.5 text-lg font-extrabold text-navy-950">{c.name}</h3>
                  <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:max-w-sm">
                    <li className={spec}><FiUsers className="text-brand-600" /> {c.seats} seats</li>
                    <li className={spec}><FiBriefcase className="text-brand-600" /> {c.bags} {c.bags === 1 ? "bag" : "bags"}</li>
                    <li className={spec}><FiSettings className="text-brand-600" /> {c.gearbox}</li>
                    <li className={spec}>
                      {c.fuel === "Electric" ? <FiZap className="text-brand-600" /> : <MdLocalGasStation className="text-brand-600" />} {c.fuel}
                    </li>
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-dashed border-line bg-mist px-5 py-4 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:border-l sm:px-7">
                  <p className="leading-tight sm:text-right">
                    <span className="block text-3xl font-extrabold text-navy-950">{money(c.price)}</span>
                    <span className="text-xs text-mute">per day, taxes included</span>
                  </p>
                  <button type="button" className={button("brand", "sm")}>Reserve</button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>

      {/* A real sequence, so numbered steps make sense here */}
      <section className={`${wrap} py-16 sm:py-20`}>
        <h2 className="max-w-lg text-3xl font-extrabold text-navy-950 sm:text-4xl">Renting takes three steps</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.1} className="relative rounded-3xl bg-mist p-7">
              <span className="grid size-10 place-items-center rounded-full bg-navy-900 text-sm font-extrabold text-white">{i + 1}</span>
              <h3 className="mt-5 text-lg font-extrabold text-navy-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
