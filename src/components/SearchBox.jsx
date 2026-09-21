import { useId, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FiSearch, FiMapPin, FiCalendar, FiUsers } from "react-icons/fi";
import {
  MdFlight,
  MdFlightTakeoff,
  MdFlightLand,
  MdHotel,
  MdDirectionsCar,
  MdBeachAccess,
} from "react-icons/md";
import { isoDate } from "../lib/format";

// span = how many of the 2 mobile columns a field takes
const TABS = [
  {
    id: "flights",
    label: "Flights",
    icon: MdFlight,
    to: "/flights",
    cols: "minmax(0,1.05fr) minmax(0,1.05fr) minmax(0,1fr) minmax(0,1fr) minmax(0,1.4fr) auto",
    fields: [
      { name: "from", label: "From", icon: MdFlightTakeoff, type: "text", value: "New York (JFK)", span: 2 },
      { name: "to", label: "To", icon: MdFlightLand, type: "text", value: "London (LHR)", span: 2 },
      { name: "depart", label: "Depart", icon: FiCalendar, type: "date", value: isoDate(30), span: 1 },
      { name: "return", label: "Return", icon: FiCalendar, type: "date", value: isoDate(37), span: 1 },
      { name: "pax", label: "Passengers", icon: FiUsers, type: "select", span: 2, options: ["1 Passenger, Economy", "2 Passengers, Economy", "3 Passengers, Economy", "1 Passenger, Business"] },
    ],
  },
  {
    id: "hotels",
    label: "Hotels",
    icon: MdHotel,
    to: "/hotels",
    fields: [
      { name: "where", label: "Destination", icon: FiMapPin, type: "text", value: "London, UK", span: 2 },
      { name: "in", label: "Check-in", icon: FiCalendar, type: "date", value: isoDate(30), span: 1 },
      { name: "out", label: "Check-out", icon: FiCalendar, type: "date", value: isoDate(34), span: 1 },
      { name: "guests", label: "Guests", icon: FiUsers, type: "select", span: 2, options: ["2 Guests, 1 Room", "1 Guest, 1 Room", "3 Guests, 2 Rooms", "4 Guests, 2 Rooms"] },
    ],
  },
  {
    id: "cars",
    label: "Cars",
    icon: MdDirectionsCar,
    to: "/cars",
    fields: [
      { name: "pickup", label: "Pick-up location", icon: FiMapPin, type: "text", value: "London Heathrow (LHR)", span: 2 },
      { name: "from", label: "Pick-up date", icon: FiCalendar, type: "date", value: isoDate(30), span: 1 },
      { name: "until", label: "Drop-off date", icon: FiCalendar, type: "date", value: isoDate(36), span: 1 },
      { name: "age", label: "Driver age", icon: FiUsers, type: "select", span: 2, options: ["30 to 65", "21 to 29", "66 and over"] },
    ],
  },
  {
    id: "holidays",
    label: "Holidays",
    icon: MdBeachAccess,
    to: "/holidays",
    fields: [
      { name: "from", label: "Leaving from", icon: MdFlightTakeoff, type: "text", value: "New York (JFK)", span: 2 },
      { name: "to", label: "Going to", icon: MdFlightLand, type: "text", value: "Anywhere", span: 2 },
      { name: "month", label: "Travel month", icon: FiCalendar, type: "month", value: isoDate(45).slice(0, 7), span: 1 },
      { name: "people", label: "Travellers", icon: FiUsers, type: "select", span: 1, options: ["2 Adults", "1 Adult", "2 Adults, 2 Children", "4 Adults"] },
    ],
  },
];

const fieldBox =
  "flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-white px-3.5 py-2.5 transition focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100";

function Field({ field }) {
  const id = useId();
  const Icon = field.icon;
  const spanCls = field.span === 2 ? "col-span-2 lg:col-span-1" : "col-span-1";
  const control =
    "w-full min-w-0 bg-transparent text-sm font-bold text-navy-900 outline-none";

  return (
    <div className={`${fieldBox} ${spanCls}`}>
      <Icon className={`shrink-0 text-lg text-brand-600 ${field.span === 1 ? "max-sm:hidden" : ""}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <label htmlFor={id} className="block text-[11px] font-semibold text-mute">
          {field.label}
        </label>
        {field.type === "select" ? (
          <select id={id} name={field.name} className={control}>
            {field.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={field.name}
            type={field.type}
            defaultValue={field.value}
            className={control}
          />
        )}
      </div>
    </div>
  );
}

export default function SearchBox({ initial = "flights", className = "" }) {
  const [tabId, setTabId] = useState(initial);
  const navigate = useNavigate();
  const uid = useId();
  const tab = TABS.find((t) => t.id === tabId);

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label="What are you looking for?"
        className="no-scrollbar relative z-10 flex w-full gap-1 overflow-x-auto rounded-t-3xl bg-white px-2 pt-3 sm:inline-flex sm:w-auto sm:px-3"
      >
        {TABS.map(({ id, label, icon: Icon }) => {
          const active = id === tabId;
          return (
            <button
              key={id}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setTabId(id)}
              className={`relative flex flex-1 shrink-0 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[13px] font-bold transition-colors sm:flex-none sm:gap-2 sm:px-4 sm:text-sm ${
                active ? "text-white" : "text-navy-900/70 hover:text-brand-600"
              }`}
            >
              {active && (
                <motion.span
                  layoutId={`search-pill-${uid}`}
                  className="absolute inset-0 rounded-xl bg-brand-600"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <Icon className="relative text-base" />
              <span className="relative">{label}</span>
            </button>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(tab.to);
        }}
        className="rounded-3xl rounded-tl-none bg-white p-4 shadow-lift sm:p-5 max-sm:rounded-tl-none"
      >
        <div
          key={tab.id}
          style={{
            "--cols": tab.cols ?? `repeat(${tab.fields.length}, minmax(0, 1fr)) auto`,
          }}
          className="grid grid-cols-2 gap-3 lg:grid-cols-(--cols)"
        >
          {tab.fields.map((f) => (
            <Field key={f.name} field={f} />
          ))}
          <button
            type="submit"
            className="col-span-2 flex h-14 items-center justify-center gap-2 self-center rounded-2xl bg-brand-600 text-sm font-bold text-white shadow-[0_12px_24px_-12px_rgba(31,87,240,0.9)] transition hover:bg-brand-700 lg:col-span-1 lg:size-14 lg:rounded-full"
          >
            <FiSearch className="text-xl" />
            <span className="lg:sr-only">Search {tab.label.toLowerCase()}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
