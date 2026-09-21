import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  FiSearch, FiCalendar, FiCreditCard, FiRefreshCw, FiBriefcase, FiPlus,
  FiMessageCircle, FiPhone, FiMail, FiCheckCircle,
} from "react-icons/fi";
import Reveal from "../components/Reveal";
import { faqCategories, faqs } from "../data";
import { button, wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

const topics = [
  { cat: "Bookings", icon: FiCalendar, text: "Find, manage and share your trip" },
  { cat: "Payments", icon: FiCreditCard, text: "Cards, receipts and invoices" },
  { cat: "Changes and refunds", icon: FiRefreshCw, text: "Dates, names and cancellations" },
  { cat: "Baggage", icon: FiBriefcase, text: "Allowances and extras" },
];

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

function FaqItem({ item, open, onToggle }) {
  const panel = `faq-panel-${item.id}`;
  return (
    <li className="rounded-2xl border border-line bg-white transition-shadow hover:shadow-card">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panel}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-navy-950"
        >
          {item.q}
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-100 text-brand-600">
            <FiPlus />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panel}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-mute">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Support() {
  usePageTitle("Support");
  const [cat, setCat] = useState("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState("q1");
  const [sent, setSent] = useState(false);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter(
      (f) => (cat === "All" || f.cat === cat) && (!q || `${f.q} ${f.a}`.toLowerCase().includes(q))
    );
  }, [cat, query]);

  return (
    <>
      <section className="border-b border-line bg-brand-50">
        <div className={`${wrap} py-14 sm:py-20`}>
          <h1 className="max-w-2xl text-4xl leading-[1.08] font-extrabold text-navy-950 sm:text-5xl">
            How can we help you today?
          </h1>
          <label className="mt-7 flex max-w-2xl items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-card ring-1 ring-line transition focus-within:ring-2 focus-within:ring-brand-500">
            <FiSearch className="text-xl text-brand-600" />
            <span className="sr-only">Search help articles</span>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCat("All"); }}
              placeholder="Search, for example: refund, baggage, change date"
              className="w-full bg-transparent outline-none placeholder:text-mute/70"
            />
          </label>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map(({ cat: c, icon: Icon, text }, i) => (
              <Reveal as="li" key={c} delay={i * 0.06}>
                <button
                  type="button"
                  onClick={() => { setCat(c); setQuery(""); document.getElementById("faq")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  className="group flex w-full items-start gap-3 rounded-2xl bg-white p-4 text-left ring-1 ring-line transition hover:-translate-y-1 hover:shadow-card hover:ring-brand-500"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-100 text-lg text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                    <Icon />
                  </span>
                  <span>
                    <span className="block text-sm font-extrabold text-navy-950">{c}</span>
                    <span className="block text-xs text-mute">{text}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${wrap} grid gap-10 py-14 lg:grid-cols-[1fr_400px] lg:gap-14`}>
        <div id="faq" className="scroll-mt-28">
          <h2 className="text-2xl font-extrabold text-navy-950 sm:text-3xl">Common questions</h2>

          <div role="tablist" aria-label="Question type" className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {faqCategories.map((c) => (
              <button
                key={c}
                role="tab"
                type="button"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  cat === c ? "bg-navy-900 text-white" : "bg-brand-50 text-navy-900 hover:bg-brand-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="mt-6 space-y-3">
            {list.map((f) => (
              <FaqItem key={f.id} item={f} open={openId === f.id} onToggle={() => setOpenId(openId === f.id ? null : f.id)} />
            ))}
          </ul>
          {list.length === 0 && (
            <p className="mt-6 rounded-2xl bg-mist p-6 text-sm text-mute">
              No answers match that search. Send us a message and we'll reply within a few hours.
            </p>
          )}
        </div>

        <aside className="self-start lg:sticky lg:top-24">
          <div className="rounded-3xl bg-navy-900 p-6 text-white sm:p-7">
            <h2 className="text-xl font-extrabold">Talk to a person</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-white/10"><FiMessageCircle /></span> Live chat, usually under 2 minutes</li>
              <li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-white/10"><FiPhone /></span> +1 (800) 555 0142, open 24/7</li>
              <li className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-white/10"><FiMail /></span> help@flights.example</li>
            </ul>
          </div>

          <div className="mt-4 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
                  <FiCheckCircle className="mx-auto text-5xl text-emerald-500" />
                  <p className="mt-3 text-lg font-extrabold text-navy-950">Message sent</p>
                  <p className="mt-1 text-sm text-mute">We'll reply to your email within a few hours.</p>
                  <button type="button" onClick={() => setSent(false)} className={`${button("ghost", "sm")} mt-5`}>Send another</button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  className="space-y-3.5"
                >
                  <h2 className="text-lg font-extrabold text-navy-950">Send a message</h2>
                  <div>
                    <label htmlFor="s-name" className="mb-1 block text-xs font-bold text-navy-900">Your name</label>
                    <input id="s-name" required className={field} placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label htmlFor="s-email" className="mb-1 block text-xs font-bold text-navy-900">Email</label>
                    <input id="s-email" type="email" required className={field} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label htmlFor="s-topic" className="mb-1 block text-xs font-bold text-navy-900">Topic</label>
                    <select id="s-topic" className={field} defaultValue="Bookings">
                      {faqCategories.slice(1).map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="s-msg" className="mb-1 block text-xs font-bold text-navy-900">How can we help?</label>
                    <textarea id="s-msg" required rows={4} className={field} placeholder="Include your booking reference if you have one" />
                  </div>
                  <button type="submit" className={`${button("brand")} w-full`}>Send message</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </aside>
      </section>
    </>
  );
}
