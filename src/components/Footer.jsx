import { useState } from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { FiCheck } from "react-icons/fi";
import Logo from "./Logo";
import { wrap } from "../lib/ui";

const social = [
  { label: "Facebook", icon: FaFacebookF },
  { label: "X", icon: FaXTwitter },
  { label: "Instagram", icon: FaInstagram },
  { label: "LinkedIn", icon: FaLinkedinIn },
  { label: "YouTube", icon: FaYoutube },
];

const quick = [
  { to: "/flights", label: "Flights" },
  { to: "/hotels", label: "Hotels" },
  { to: "/cars", label: "Cars" },
  { to: "/holidays", label: "Holidays" },
];

const company = [
  { to: "/about", label: "About us" },
  { to: "/destinations", label: "Destinations" },
  { to: "/support", label: "Help centre" },
  { to: "/signin", label: "Sign in" },
];

const heading = "mb-4 text-sm font-extrabold text-navy-950";
const linkCls = "text-sm text-mute transition-colors hover:text-brand-600";

export default function Footer() {
  const [done, setDone] = useState(false);

  return (
    <footer className="border-t border-line bg-white">
      <div className={`${wrap} grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.3fr] lg:gap-x-10`}>
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
            Compare hundreds of airlines and book flights, hotels, cars and holidays in one place.
          </p>
          <ul className="mt-5 flex gap-2">
            {social.map(({ label, icon: Icon }) => (
              <li key={label}>
                <a
                  href="#top-banner"
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full bg-brand-600 text-sm text-white transition hover:-translate-y-0.5 hover:bg-navy-900"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Quick links">
          <h3 className={heading}>Quick links</h3>
          <ul className="space-y-2.5">
            {quick.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h3 className={heading}>Company</h3>
          <ul className="space-y-2.5">
            {company.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkCls}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-1">
          <h3 className={heading}>Newsletter</h3>
          <p className="mb-3 text-sm text-mute">Get the latest deals and travel news in your inbox.</p>
          {done ? (
            <p className="flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700">
              <FiCheck /> Thanks, you're on the list.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="space-y-2.5"
            >
              <label className="sr-only" htmlFor="newsletter-email">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email address"
                className="w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-brand-700"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className={`${wrap} flex flex-col items-center justify-between gap-2 py-5 text-xs text-mute sm:flex-row`}>
          <p>&copy; {new Date().getFullYear()} flights.com. All rights reserved.</p>
          <p className="flex gap-4">
            <Link to="/support" className="hover:text-brand-600">Privacy Policy</Link>
            <Link to="/support" className="hover:text-brand-600">Terms and Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
