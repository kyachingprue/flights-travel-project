import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { FiHeart, FiWifi, FiMapPin } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { MdPool, MdFreeBreakfast, MdSpa, MdLocalParking } from "react-icons/md";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import SearchBox from "../components/SearchBox";
import { hotelCategories, hotels, IMG } from "../data";
import { money } from "../lib/format";
import { button, wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

const AMENITY = {
  wifi: { icon: FiWifi, label: "Free Wi-Fi" },
  pool: { icon: MdPool, label: "Pool" },
  breakfast: { icon: MdFreeBreakfast, label: "Breakfast" },
  spa: { icon: MdSpa, label: "Spa" },
  parking: { icon: MdLocalParking, label: "Parking" },
};

const SORTS = {
  recommended: (a, b) => b.rating * Math.log(b.reviews) - a.rating * Math.log(a.reviews),
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  rating: (a, b) => b.rating - a.rating,
};

function HotelCard({ hotel, featured, saved, onSave }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group flex flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-line transition-shadow duration-300 hover:shadow-lift ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? "aspect-[16/10] md:aspect-auto md:w-[58%]" : "aspect-[4/3]"}`}>
        <Img src={hotel.image} alt={`${hotel.name}, ${hotel.city}`} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-extrabold text-navy-950">
          <FaStar className="text-sun-500" /> {hotel.rating}
        </span>
        <motion.button
          type="button"
          onClick={() => onSave(hotel.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${hotel.name} from saved` : `Save ${hotel.name}`}
          whileTap={{ scale: 0.8 }}
          className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-white/95 text-lg text-navy-900 transition hover:text-rose-600"
        >
          <FiHeart className={saved ? "fill-rose-500 text-rose-500" : ""} />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-mute">
          <FiMapPin className="text-brand-600" /> {hotel.city}
        </p>
        <h3 className={`mt-1 font-extrabold text-navy-950 ${featured ? "text-2xl" : "text-lg"}`}>{hotel.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-mute">{hotel.blurb}</p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {hotel.amenities.map((key) => {
            const { icon: Icon, label } = AMENITY[key];
            return (
              <li key={key} title={label} className="flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-navy-900">
                <Icon className="text-brand-600" /> {label}
              </li>
            );
          })}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <p className="text-xs text-mute">{hotel.reviews.toLocaleString("en-US")} reviews</p>
          <p className="text-right leading-tight">
            <span className="block text-2xl font-extrabold text-navy-950">{money(hotel.price)}</span>
            <span className="text-xs text-mute">per night</span>
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function Hotels() {
  usePageTitle("Hotels");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("recommended");
  const [saved, setSaved] = useState(new Set());

  const list = useMemo(
    () =>
      hotels
        .filter((h) => category === "All" || h.tags.includes(category))
        .sort(SORTS[sort]),
    [category, sort]
  );

  const save = (id) =>
    setSaved((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <>
      {/* Editorial header: headline left, photo mosaic right */}
      <section className="bg-mist">
        <div className={`${wrap} grid items-center gap-10 pt-12 pb-28 lg:grid-cols-[1fr_1.05fr] lg:pt-16 lg:pb-32`}>
          <div>
            <h1 className="text-4xl leading-[1.08] font-extrabold text-navy-950 sm:text-5xl lg:text-6xl">
              Stay somewhere you'll want to come back to.
            </h1>
            <p className="mt-5 max-w-md text-lg text-mute">
              Hand-checked hotels, resorts and boutique stays in 190 countries. Free cancellation on most rooms.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-navy-900">
              {["Free cancellation", "Pay at the hotel", "Price match"].map((t) => (
                <span key={t} className="rounded-full bg-white px-4 py-2 ring-1 ring-line">{t}</span>
              ))}
            </div>
          </div>

          <Reveal className="grid h-[300px] grid-cols-3 grid-rows-2 gap-3 sm:h-[380px]" x={40} y={0}>
            <Img src={IMG.resort} alt="Resort pool at sunset" className="col-span-2 row-span-2 size-full rounded-[2rem] rounded-tl-[5rem] object-cover" />
            <Img src={IMG.hotel} alt="Bright hotel room" className="size-full rounded-[2rem] object-cover" />
            <Img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=70" alt="Hotel suite" className="size-full rounded-[2rem] rounded-br-[4rem] object-cover" />
          </Reveal>
        </div>
      </section>

      <div className={`${wrap} relative z-10 -mt-20`}>
        <SearchBox initial="hotels" />
      </div>

      <section className={`${wrap} py-14`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="tablist" aria-label="Hotel type" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            {hotelCategories.map((c) => (
              <button
                key={c}
                role="tab"
                type="button"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-bold ring-1 transition-colors ${
                  category === c ? "text-white ring-navy-900" : "bg-white text-navy-900 ring-line hover:ring-brand-500"
                }`}
              >
                {category === c && (
                  <motion.span layoutId="hotel-chip" className="absolute inset-0 rounded-full bg-navy-900" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm text-mute">
            Sort by
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-bold text-navy-900 outline-none focus:border-brand-500"
            >
              <option value="recommended">Recommended</option>
              <option value="low">Price, low to high</option>
              <option value="high">Price, high to low</option>
              <option value="rating">Guest rating</option>
            </select>
          </label>
        </div>

        <p className="mt-6 text-sm text-mute" aria-live="polite">
          <span className="font-extrabold text-navy-950">{list.length}</span> stays
          {saved.size > 0 && <> &middot; {saved.size} saved</>}
        </p>

        <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((h, i) => (
              <HotelCard key={h.id} hotel={h} featured={i === 0 && list.length > 2} saved={saved.has(h.id)} onSave={save} />
            ))}
          </AnimatePresence>
        </div>

        {list.length === 0 && (
          <p className="mt-6 rounded-3xl bg-mist p-10 text-center text-mute">No stays in this category yet.</p>
        )}

        <Reveal className="mt-14 flex flex-col items-center justify-between gap-5 rounded-[2rem] bg-brand-600 p-8 text-white sm:flex-row sm:p-10">
          <div>
            <h2 className="text-2xl font-extrabold">Flying there too?</h2>
            <p className="mt-1 text-white/85">Bundle a flight and hotel to save up to 18%.</p>
          </div>
          <Link to="/holidays" className={button("sun")}>See holiday packages</Link>
        </Reveal>
      </section>
    </>
  );
}
