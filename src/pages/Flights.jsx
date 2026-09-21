import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { FiSliders, FiCheck, FiBell, FiX } from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import SearchBox from "../components/SearchBox";
import { flights } from "../data";
import { fmtDuration, money } from "../lib/format";
import { button, wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

const SORTS = [
  { id: "cheapest", label: "Cheapest", fn: (a, b) => a.price - b.price },
  { id: "fastest", label: "Fastest", fn: (a, b) => a.duration - b.duration },
  { id: "best", label: "Best value", fn: (a, b) => a.price + a.duration * 0.35 - (b.price + b.duration * 0.35) },
];

const TIMES = [
  { id: "morning", label: "Morning", test: (h) => h < 12 },
  { id: "afternoon", label: "Afternoon", test: (h) => h >= 12 && h < 18 },
  { id: "evening", label: "Evening", test: (h) => h >= 18 },
];

const STOPS = [
  { id: "any", label: "Any" },
  { id: 0, label: "Non-stop" },
  { id: 1, label: "1 stop" },
  { id: 2, label: "2+ stops" },
];

const allAirlines = [...new Set(flights.map((f) => f.airline))].sort();
const MAX = Math.max(...flights.map((f) => f.price));
const MIN = Math.min(...flights.map((f) => f.price));

const group = "border-t border-line pt-5 first:border-0 first:pt-0";
const groupTitle = "mb-3 text-sm font-extrabold text-navy-950";

function toggle(set, value) {
  const next = new Set(set);
  next.has(value) ? next.delete(value) : next.add(value);
  return next;
}

export default function Flights() {
  usePageTitle("Compare flights");
  const [sort, setSort] = useState("cheapest");
  const [stops, setStops] = useState("any");
  const [picked, setPicked] = useState(new Set());
  const [times, setTimes] = useState(new Set());
  const [maxPrice, setMaxPrice] = useState(MAX);
  const [selected, setSelected] = useState(null);
  const [alerts, setAlerts] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const sorter = SORTS.find((s) => s.id === sort).fn;
    return flights
      .filter((f) => f.price <= maxPrice)
      .filter((f) => (stops === "any" ? true : stops === 2 ? f.stops >= 2 : f.stops === stops))
      .filter((f) => (picked.size ? picked.has(f.airline) : true))
      .filter((f) => {
        if (!times.size) return true;
        const hour = Number(f.dep.split(":")[0]);
        return TIMES.some((t) => times.has(t.id) && t.test(hour));
      })
      .sort(sorter);
  }, [sort, stops, picked, times, maxPrice]);

  const reset = () => {
    setStops("any");
    setPicked(new Set());
    setTimes(new Set());
    setMaxPrice(MAX);
  };

  const chosen = flights.find((f) => f.id === selected);

  return (
    <>
      {/* Header: deep navy with a soft horizon glow */}
      <section className="relative isolate overflow-hidden bg-navy-900 pt-12 pb-32 text-white sm:pt-16">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_80%_at_85%_0%,rgba(255,178,107,0.55),transparent),radial-gradient(60%_70%_at_0%_100%,rgba(61,118,251,0.45),transparent)]" />
        <div className={wrap}>
          <h1 className="max-w-2xl text-4xl leading-tight font-extrabold sm:text-5xl">
            New York to London, compared across {allAirlines.length} airlines
          </h1>
          <p className="mt-3 max-w-xl text-white/80">
            Prices shown are per traveller, round trip, taxes included. Sample data for demonstration.
          </p>
        </div>
      </section>

      <div className={`${wrap} relative z-10 -mt-24`}>
        <SearchBox initial="flights" />
      </div>

      <section className={`${wrap} grid gap-8 py-12 lg:grid-cols-[290px_1fr]`}>
        {/* Filters */}
        <aside className="self-start lg:sticky lg:top-24">
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            className={`${button("ghost", "sm")} w-full lg:hidden`}
          >
            {showFilters ? <FiX /> : <FiSliders />} {showFilters ? "Hide filters" : "Show filters"}
          </button>

          <div className={`${showFilters ? "block" : "hidden"} mt-3 space-y-5 rounded-3xl border border-line bg-white p-5 shadow-card lg:mt-0 lg:block`}>
            <div className={group}>
              <h2 className={groupTitle}>Stops</h2>
              <div className="flex flex-wrap gap-2">
                {STOPS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => setStops(s.id)}
                    aria-pressed={stops === s.id}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                      stops === s.id
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-line text-navy-900 hover:border-brand-500"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={group}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-navy-950">Max price</h2>
                <span className="text-sm font-extrabold text-brand-600">{money(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Maximum price"
                className="w-full accent-brand-600"
              />
              <div className="flex justify-between text-[11px] text-mute">
                <span>{money(MIN)}</span>
                <span>{money(MAX)}</span>
              </div>
            </div>

            <div className={group}>
              <h2 className={groupTitle}>Departure time</h2>
              <div className="flex flex-wrap gap-2">
                {TIMES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTimes((s) => toggle(s, t.id))}
                    aria-pressed={times.has(t.id)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                      times.has(t.id)
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-line text-navy-900 hover:border-brand-500"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={group}>
              <h2 className={groupTitle}>Airlines</h2>
              <ul className="space-y-2">
                {allAirlines.map((name) => {
                  const on = picked.has(name);
                  return (
                    <li key={name}>
                      <label className="flex cursor-pointer items-center gap-3 text-sm text-navy-900">
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => setPicked((s) => toggle(s, name))}
                          className="peer sr-only"
                        />
                        <span className="grid size-5 place-items-center rounded-md border border-line text-xs text-white transition peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100">
                          {on && <FiCheck />}
                        </span>
                        {name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={`${group} flex items-center justify-between gap-3`}>
              <span className="flex items-center gap-2 text-sm font-bold text-navy-950">
                <FiBell className="text-brand-600" /> Fare drop alerts
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={alerts}
                aria-label="Fare drop alerts"
                onClick={() => setAlerts((v) => !v)}
                className={`relative h-6 w-11 rounded-full transition-colors ${alerts ? "bg-brand-600" : "bg-line"}`}
              >
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  className={`absolute top-0.5 size-5 rounded-full bg-white shadow ${alerts ? "right-0.5" : "left-0.5"}`}
                />
              </button>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-mute">
              <span className="font-extrabold text-navy-950">{results.length}</span> flights found
            </p>
            <div role="tablist" aria-label="Sort flights" className="relative flex rounded-2xl bg-brand-50 p-1">
              {SORTS.map((s) => (
                <button
                  key={s.id}
                  role="tab"
                  type="button"
                  aria-selected={sort === s.id}
                  onClick={() => setSort(s.id)}
                  className={`relative rounded-xl px-4 py-2 text-xs font-bold transition-colors sm:text-sm ${
                    sort === s.id ? "text-navy-950" : "text-mute hover:text-navy-950"
                  }`}
                >
                  {sort === s.id && (
                    <motion.span
                      layoutId="sort-pill"
                      className="absolute inset-0 rounded-xl bg-white shadow"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {chosen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy-900 px-5 py-4 text-white">
                  <p className="text-sm">
                    <span className="font-extrabold">{chosen.airline}</span> selected, {chosen.dep} to {chosen.arr},{" "}
                    <span className="font-extrabold text-sun-300">{money(chosen.price)}</span>
                  </p>
                  <Link to="/signin" className={button("sun", "sm")}>Continue to book</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ul className="mt-4 space-y-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {results.map((f, i) => {
                const isSel = selected === f.id;
                return (
                  <motion.li
                    key={f.id}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className={`grid items-center gap-5 rounded-3xl border bg-white p-5 transition-shadow hover:shadow-card sm:grid-cols-[170px_1fr_auto] ${
                      isSel ? "border-brand-600 ring-4 ring-brand-100" : "border-line"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid size-11 shrink-0 place-items-center rounded-full text-xs font-extrabold text-white" style={{ backgroundColor: f.color }}>
                        {f.code}
                      </span>
                      <div className="leading-tight">
                        <p className="text-sm font-bold text-navy-950">{f.airline}</p>
                        <p className="text-xs text-mute">{f.cls}</p>
                        {i === 0 && sort === "cheapest" && (
                          <span className="mt-1 inline-block rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-700">Lowest price</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-center">
                        <p className="text-xl font-extrabold text-navy-950">{f.dep}</p>
                        <p className="text-xs font-semibold text-mute">JFK</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-center text-[11px] font-semibold text-mute">{fmtDuration(f.duration)}</p>
                        <div className="relative my-1 h-px bg-line">
                          <MdFlight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-white text-lg text-brand-600" />
                        </div>
                        <p className={`text-center text-[11px] font-bold ${f.stops === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                          {f.stops === 0 ? "Non-stop" : `${f.stops} stop${f.stops > 1 ? "s" : ""} via ${f.via}`}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-extrabold text-navy-950">
                          {f.arr}
                          {f.nextDay && <sup className="ml-0.5 text-[10px] text-rose-600">+1</sup>}
                        </p>
                        <p className="text-xs font-semibold text-mute">LHR</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-line pt-4 sm:block sm:border-0 sm:pt-0 sm:text-right">
                      <p className="text-2xl font-extrabold text-navy-950">{money(f.price)}</p>
                      <button
                        type="button"
                        onClick={() => setSelected(isSel ? null : f.id)}
                        aria-pressed={isSel}
                        className={`${button(isSel ? "navy" : "brand", "sm")} sm:mt-2`}
                      >
                        {isSel ? <><FiCheck /> Selected</> : "Select"}
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>

          {results.length === 0 && (
            <div className="mt-4 rounded-3xl border border-dashed border-brand-200 bg-mist p-10 text-center">
              <p className="text-lg font-extrabold text-navy-950">No flights match these filters</p>
              <p className="mt-1 text-sm text-mute">Raise the maximum price or clear a filter to see more options.</p>
              <button type="button" onClick={reset} className={`${button("brand", "sm")} mt-5`}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
