import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { FiMenu, FiX, FiChevronDown, FiChevronRight, FiPhoneCall } from "react-icons/fi";
import Logo from "./Logo";
import { navLinks } from "../data";
import { button } from "../lib/ui";

const CURRENCIES = [
  ["🇺🇸", "USD"],
  ["🇪🇺", "EUR"],
  ["🇬🇧", "GBP"],
  ["🇦🇪", "AED"],
];

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.22 } },
};
const item = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const closeRef = useRef(null);

  // Close the drawer whenever the route changes (including browser back/forward)
  useEffect(() => setOpen(false), [pathname]);

  // Shadow appears after the page starts scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the drawer is open: lock page scroll, close on Esc / when resized to desktop
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b border-line/70 bg-white/90 backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "shadow-[0_12px_30px_-20px_rgba(10,42,107,0.5)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop links: hidden below lg */}
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive ? "text-brand-600" : "text-navy-900/80 hover:text-brand-600"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-600"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <label className="relative flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-navy-900 hover:bg-brand-50">
            <span className="sr-only">Currency</span>
            <select
              defaultValue="USD"
              className="cursor-pointer appearance-none bg-transparent pr-5 pl-1 outline-none"
            >
              {CURRENCIES.map(([flag, code]) => (
                <option key={code} value={code}>
                  {flag} {code}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-2 text-mute" />
          </label>
          <Link to="/signin" className={button("brand", "sm")}>
            Sign in
          </Link>
        </div>

        {/* Mobile: only the 3-bar icon */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="grid size-11 place-items-center rounded-xl border border-line text-2xl text-navy-900 transition hover:bg-brand-50 lg:hidden"
        >
          <FiMenu />
        </button>
      </div>

    </header>

      {/* Mobile drawer: slides in from the right */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-navy-950/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Main menu"
              className="fixed top-0 right-0 z-[70] flex h-dvh w-[88%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex h-16 items-center justify-between border-b border-line px-5">
                <Logo />
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-xl bg-brand-50 text-xl text-navy-900 transition hover:bg-brand-100"
                >
                  <FiX />
                </button>
              </div>

              <motion.ul
                variants={list}
                initial="hidden"
                animate="show"
                className="flex-1 space-y-1 overflow-y-auto px-3 py-4"
              >
                {navLinks.map(({ to, label, icon: Icon }) => (
                  <motion.li key={to} variants={item}>
                    <NavLink
                      to={to}
                      end={to === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-base font-bold transition-colors ${
                          isActive
                            ? "bg-brand-600 text-white shadow-[0_12px_24px_-14px_rgba(31,87,240,0.9)]"
                            : "text-navy-900 hover:bg-brand-50"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon className={`text-xl ${isActive ? "text-sun-400" : "text-brand-600"}`} />
                          <span className="flex-1">{label}</span>
                          <FiChevronRight className={isActive ? "text-white/70" : "text-mute"} />
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="space-y-3 border-t border-line p-5"
              >
                <Link to="/signin" className={`${button("sun")} w-full`}>
                  Sign in or create account
                </Link>
                <p className="flex items-center justify-center gap-2 text-sm text-mute">
                  <FiPhoneCall className="text-brand-600" /> Support is open 24/7
                </p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
