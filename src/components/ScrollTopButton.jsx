import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { FiArrowUp } from "react-icons/fi";

// Shows at the bottom-right once the visitor scrolls past the hero banner.
// A progress ring around the arrow shows how far down the page they are.
export default function ScrollTopButton() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  const limit = () => Math.min(window.innerHeight * 0.75, 600);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > limit()));
  useEffect(() => setVisible(window.scrollY > limit()), []);

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={goTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 28, scale: 0.6 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.92 }}
          className="group fixed right-4 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-navy-900 text-white shadow-lift sm:right-8 sm:bottom-8"
        >
          <svg
            viewBox="0 0 56 56"
            className="absolute inset-0 size-full -rotate-90"
            aria-hidden
          >
            <circle cx="28" cy="28" r="25" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" />
            <motion.circle
              cx="28"
              cy="28"
              r="25"
              fill="none"
              stroke="#ffc629"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <FiArrowUp className="relative text-xl transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
