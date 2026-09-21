import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { FiSearch, FiArrowUpRight } from "react-icons/fi";
import Img from "../components/Img";
import { destinations, regions } from "../data";
import { money } from "../lib/format";
import { wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

// Different heights per tile give the grid a masonry rhythm
const ratios = ["aspect-[4/5]", "aspect-square", "aspect-[4/3]", "aspect-[3/4]", "aspect-[5/4]", "aspect-[4/5]"];

export default function Destinations() {
  usePageTitle("Destinations");
  const [region, setRegion] = useState("All");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => Object.fromEntries(regions.map((r) => [r, r === "All" ? destinations.length : destinations.filter((d) => d.region === r).length])),
    []
  );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter(
      (d) =>
        (region === "All" || d.region === region) &&
        (!q || `${d.city} ${d.country} ${d.tag}`.toLowerCase().includes(q))
    );
  }, [region, query]);

  return (
    <>
      <section className="bg-linear-to-b from-brand-100 via-brand-50 to-white">
        <div className={`${wrap} pt-14 pb-10 text-center sm:pt-20`}>
          <h1 className="mx-auto max-w-3xl text-4xl leading-[1.08] font-extrabold text-navy-950 sm:text-6xl">
            Where to next?
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-mute">
            {destinations.length} places our travellers keep booking, with the lowest fares we found this week.
          </p>

          <label className="mx-auto mt-8 flex max-w-xl items-center gap-3 rounded-full bg-white px-5 py-3.5 shadow-card ring-1 ring-line transition focus-within:ring-2 focus-within:ring-brand-500">
            <FiSearch className="text-xl text-brand-600" />
            <span className="sr-only">Search destinations</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a city, country or vibe"
              className="w-full bg-transparent text-base outline-none placeholder:text-mute/70"
            />
          </label>

          <div role="tablist" aria-label="Region" className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {regions.map((r) => (
              <button
                key={r}
                role="tab"
                type="button"
                aria-selected={region === r}
                onClick={() => setRegion(r)}
                className={`relative shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                  region === r ? "text-white" : "bg-white text-navy-900 ring-1 ring-line hover:ring-brand-500"
                }`}
              >
                {region === r && (
                  <motion.span layoutId="region-pill" className="absolute inset-0 rounded-full bg-brand-600" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">
                  {r} <span className={region === r ? "text-white/70" : "text-mute"}>{counts[r]}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={`${wrap} pt-8 pb-20`}>
        {list.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl bg-mist p-10 text-center">
            <p className="text-lg font-extrabold text-navy-950">Nothing matches "{query}"</p>
            <p className="mt-1 text-sm text-mute">Try a city name, or choose a different region.</p>
            <button type="button" onClick={() => { setQuery(""); setRegion("All"); }} className="mt-5 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white">
              Clear search
            </button>
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {list.map((d, i) => (
                <motion.div
                  key={d.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-4 break-inside-avoid"
                >
                  <Link
                    to="/flights"
                    className={`group relative block overflow-hidden rounded-[1.75rem] bg-navy-900 ${ratios[i % ratios.length]}`}
                  >
                    <Img src={d.image} alt={`${d.city}, ${d.country}`} className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/15 to-transparent" />
                    <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold text-navy-950">
                      From {money(d.from)}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-2xl font-extrabold">{d.city}</p>
                      <p className="text-sm text-white/80">{d.country}</p>
                      <p className="text-xs text-white/65">{d.tag}</p>
                      <span className="mt-3 inline-flex translate-y-2 items-center gap-1.5 text-sm font-bold text-sun-300 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                        Find flights <FiArrowUpRight />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </>
  );
}
