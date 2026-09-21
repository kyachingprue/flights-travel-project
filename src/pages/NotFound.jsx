import { Link } from "react-router";
import { motion } from "motion/react";
import { MdFlight } from "react-icons/md";
import { button, wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

export default function NotFound() {
  usePageTitle("Page not found");
  return (
    <section className={`${wrap} relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center`}>
      <div className="relative w-full max-w-md" aria-hidden>
        <div className="absolute top-1/2 right-0 left-0 border-t-2 border-dashed border-brand-200" />
        <motion.div
          animate={{ x: ["-8%", "88%"], y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}
          className="relative w-fit"
        >
          <MdFlight className="rotate-90 text-5xl text-brand-600" />
        </motion.div>
      </div>

      <p className="mt-6 text-7xl font-extrabold text-navy-900 sm:text-8xl">404</p>
      <h1 className="mt-2 text-2xl font-extrabold text-navy-950 sm:text-3xl">We can't find that page</h1>
      <p className="mt-2 max-w-md text-mute">
        The link may be old or mistyped. Head back home or start a new search.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link to="/" className={button("brand", "lg")}>Back to home</Link>
        <Link to="/flights" className={button("ghost", "lg")}>Search flights</Link>
      </div>
    </section>
  );
}
