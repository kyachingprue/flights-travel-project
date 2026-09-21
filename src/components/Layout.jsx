import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import ScrollTopButton from "./ScrollTopButton";

// Every new page starts at the top (instantly, no long scroll animation).
function RouteScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip bg-white">
      <ScrollProgress />
      <RouteScrollReset />
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<div className="min-h-[70vh]" />}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </Suspense>
      </main>

      <Footer />
      <ScrollTopButton />
    </div>
  );
}
