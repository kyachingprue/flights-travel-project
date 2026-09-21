import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { FiCheck, FiMoon, FiArrowRight } from "react-icons/fi";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import SearchBox from "../components/SearchBox";
import { holidayThemes, holidays, IMG } from "../data";
import { money } from "../lib/format";
import { button, wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

function PackageRow({ p, flip }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${flip ? "lg:[&>div:first-child]:order-2" : ""}`}
    >
      <Reveal x={flip ? 60 : -60} y={0} className="relative">
        <div className={`aspect-[5/4] overflow-hidden bg-navy-900 shadow-lift ${flip ? "rounded-[2rem] rounded-tr-[6rem]" : "rounded-[2rem] rounded-tl-[6rem]"}`}>
          <Img src={p.image} alt={p.title} className="size-full object-cover transition-transform duration-1000 hover:scale-105" />
        </div>
        <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-navy-950 shadow-lg">
          <FiMoon className="text-brand-600" /> {p.nights} nights
        </span>
      </Reveal>

      <div>
        <p className="text-sm font-bold text-brand-600">{p.theme} &middot; {p.place}</p>
        <h3 className="mt-2 text-3xl font-extrabold text-navy-950 sm:text-4xl">{p.title}</h3>

        <ul className="mt-5 space-y-2.5">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-navy-900/85">
              <FiCheck className="mt-1 shrink-0 text-brand-600" /> {h}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-2">
          {p.includes.map((i) => (
            <li key={i} className="rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-navy-900">{i}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <p className="leading-tight">
            <span className="text-xs text-mute">From, per person</span>
            <span className="block text-3xl font-extrabold text-navy-950">{money(p.price)}</span>
          </p>
          <Link to="/flights" className={button("brand")}>
            Check dates <FiArrowRight />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Holidays() {
  usePageTitle("Holiday packages");
  const [theme, setTheme] = useState("All");
  const list = useMemo(() => holidays.filter((h) => theme === "All" || h.theme === theme), [theme]);

  // Hero photo drifts slower than the page for a sense of depth
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <>
      <section className="relative isolate overflow-hidden rounded-b-[2.5rem] bg-navy-900 pt-20 pb-44 text-center text-white sm:rounded-b-[4rem] sm:pt-28 sm:pb-52">
        <motion.div aria-hidden style={{ y }} className="absolute inset-x-0 -top-10 -bottom-10 -z-10">
          <Img src={IMG.offer} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-b from-navy-950/70 via-navy-900/40 to-navy-950/80" />
        </motion.div>
        <div className={wrap}>
          <h1 className="mx-auto max-w-3xl text-4xl leading-[1.06] font-extrabold sm:text-6xl">
            Flights, hotel and transfers. <span className="font-script text-5xl font-normal text-sun-300 sm:text-7xl">Sorted.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
            Handpicked holiday packages with everything included, so all you pick is the date.
          </p>
        </div>
      </section>

      <div className={`${wrap} relative z-10 -mt-32 sm:-mt-36`}>
        <SearchBox initial="holidays" />
      </div>

      <section className={`${wrap} py-16 sm:py-20`}>
        <div role="tablist" aria-label="Holiday style" className="no-scrollbar -mx-4 flex justify-start gap-2 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0">
          {holidayThemes.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={theme === t}
              onClick={() => setTheme(t)}
              className={`relative shrink-0 rounded-full px-6 py-2.5 text-sm font-bold ring-1 transition-colors ${
                theme === t ? "text-navy-950 ring-sun-400" : "text-navy-900 ring-line hover:ring-brand-500"
              }`}
            >
              {theme === t && (
                <motion.span layoutId="holiday-chip" className="absolute inset-0 rounded-full bg-sun-400" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>

        <div className="mt-14 space-y-20 sm:space-y-28">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <PackageRow key={p.id} p={p} flip={i % 2 === 1} />
            ))}
          </AnimatePresence>
        </div>

        <Reveal className="mt-24 rounded-[2rem] bg-mist p-8 text-center sm:p-14">
          <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">Want something we haven't listed?</h2>
          <p className="mx-auto mt-2 max-w-md text-mute">
            Tell us where and when. A travel expert builds a quote within one working day.
          </p>
          <Link to="/support" className={`${button("brand", "lg")} mt-6`}>Request a custom trip</Link>
        </Reveal>
      </section>
    </>
  );
}
