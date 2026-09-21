import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { IMG } from "../data";
import { wrap } from "../lib/ui";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } } };
const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

// The main banner. Its id is what "back to top" returns to.
export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <section
      id="top-banner"
      ref={ref}
      className="relative isolate overflow-hidden bg-navy-900 pt-14 pb-44 sm:pt-20 sm:pb-52 lg:pt-24 lg:pb-56"
    >
      {/* Parallax background: sunset glow, plane-wing photo, navy overlays */}
      <motion.div aria-hidden style={{ y: bgY }} className="absolute inset-x-0 -top-16 -bottom-16 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_38%,#ffb26b_0%,#6b8fd8_36%,#0a2a6b_78%)]" />
        <img
          src={IMG.hero}
          alt=""
          onError={(e) => (e.currentTarget.style.display = "none")}
          className="absolute inset-0 size-full object-cover object-[65%_center]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-navy-950/95 via-navy-900/60 to-navy-900/5" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-navy-950/70 to-transparent" />
      </motion.div>

      <div className={wrap}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={{ y: textY }}
          className="max-w-xl"
        >
          <motion.p variants={rise} className="text-xs font-semibold tracking-[0.28em] text-white/80 uppercase">
            Discover the world
          </motion.p>

          <h1 className="mt-4 text-[2.75rem] leading-[1.06] font-extrabold text-white sm:text-6xl lg:text-7xl">
            <motion.span variants={rise} className="block">Book Flights</motion.span>
            <motion.span variants={rise} className="block">
              Easier, <span className="text-brand-400">Faster,</span>
            </motion.span>
            <motion.span
              variants={rise}
              className="-mt-1 block font-script text-6xl font-normal text-sun-300 sm:text-7xl lg:text-8xl"
            >
              Smarter
            </motion.span>
          </h1>

          <motion.p variants={rise} className="mt-6 max-w-md text-base text-white/85 sm:text-lg">
            Compare hundreds of airlines, find the best prices, and turn your travel dreams into reality.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
