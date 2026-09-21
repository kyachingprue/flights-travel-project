import { Link } from "react-router";
import { MdFlight } from "react-icons/md";

export default function Logo({ light = false, className = "" }) {
  return (
    <Link
      to="/"
      aria-label="flights.com home"
      className={`inline-flex items-center gap-2 text-xl font-extrabold tracking-tight ${
        light ? "text-white" : "text-navy-900"
      } ${className}`}
    >
      <span
        className={`grid size-8 place-items-center rounded-lg ${
          light ? "bg-white/15 text-white" : "bg-brand-600 text-white"
        }`}
      >
        <MdFlight className="rotate-45 text-lg" />
      </span>
      <span>
        flights
        <span className={light ? "text-sun-400" : "text-brand-600"}>.com</span>
      </span>
    </Link>
  );
}
