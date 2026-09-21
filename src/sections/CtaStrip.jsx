import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import { MdFlight } from "react-icons/md";
import Banner from "../components/Banner";
import Reveal from "../components/Reveal";
import { IMG } from "../data";
import { button, wrap } from "../lib/ui";

export default function CtaStrip() {
  return (
    <section className={`${wrap} space-y-4 pt-16 pb-16 sm:pt-20 sm:pb-20`}>
      <Banner
        eyebrow="Travel inspiration"
        title="Turn Your Dreams Into Destinations"
        text="Get inspired with travel tips, destination guides and exclusive offers."
        cta={{ to: "/destinations", label: "Explore destinations" }}
        image={IMG.inspire}
        position="object-[60%_center]"
      />

      <Reveal className="relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-navy-900 px-6 py-8 text-center text-white sm:flex-row sm:px-10 sm:text-left">
        <div className="pointer-events-none absolute -top-16 -left-10 size-56 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="relative flex flex-col items-center gap-4 sm:flex-row">
          <MdFlight className="text-4xl text-white/90" />
          <div>
            <h3 className="text-xl font-extrabold sm:text-2xl">Ready to Book Your Next Flight?</h3>
            <p className="mt-1 text-sm text-white/75">
              Join millions of travellers and find the best deals today.
            </p>
          </div>
        </div>
        <Link to="/flights" className={`${button("sun")} relative`}>
          Search flights <FiArrowRight />
        </Link>
      </Reveal>
    </section>
  );
}
