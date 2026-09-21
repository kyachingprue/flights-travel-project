// Shared class strings. Written out in full so Tailwind can always see them.
export const wrap = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 active:scale-[0.98]";

const sizes = {
  sm: "px-4 py-2.5",
  md: "px-5 py-3",
  lg: "px-7 py-3.5 text-base",
};

const variants = {
  sun: "bg-sun-400 text-navy-950 shadow-[0_10px_24px_-10px_rgba(247,181,0,0.9)] hover:-translate-y-0.5 hover:bg-sun-500",
  brand:
    "bg-brand-600 text-white shadow-[0_10px_24px_-10px_rgba(31,87,240,0.85)] hover:-translate-y-0.5 hover:bg-brand-700",
  navy: "bg-navy-900 text-white hover:-translate-y-0.5 hover:bg-navy-800",
  ghost:
    "border border-line bg-white text-navy-900 hover:border-brand-500 hover:text-brand-600",
  glass:
    "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
};

export const button = (variant = "brand", size = "md") =>
  `${base} ${sizes[size]} ${variants[variant]}`;
