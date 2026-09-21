import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiCheck } from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa6";
import Img from "../components/Img";
import { IMG } from "../data";
import { button } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

const perks = ["Save trips and get fare-drop alerts", "Manage bookings in one place", "Member-only prices on hotels"];

const inputWrap =
  "flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 transition focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-100";

export default function SignIn() {
  usePageTitle("Sign in");
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => navigate("/"), 1200);
  };

  return (
    <section className="grid min-h-[calc(100dvh-72px)] lg:grid-cols-2">
      <div className="flex items-center justify-center px-4 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold text-navy-950 sm:text-4xl">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-mute">
            {mode === "signin" ? "Sign in to see your trips and saved searches." : "It takes under a minute and it's free."}
          </p>

          <div role="tablist" aria-label="Account" className="relative mt-7 grid grid-cols-2 rounded-2xl bg-brand-50 p-1">
            {[["signin", "Sign in"], ["signup", "Create account"]].map(([id, label]) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={mode === id}
                onClick={() => setMode(id)}
                className={`relative rounded-xl py-2.5 text-sm font-bold transition-colors ${mode === id ? "text-navy-950" : "text-mute"}`}
              >
                {mode === id && (
                  <motion.span layoutId="auth-pill" className="absolute inset-0 rounded-xl bg-white shadow" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className="relative">{label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <AnimatePresence initial={false}>
              {mode === "signup" && (
                <motion.div
                  key="name"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <label className={inputWrap}>
                    <FiUser className="text-brand-600" />
                    <span className="sr-only">Full name</span>
                    <input required placeholder="Full name" autoComplete="name" className="w-full bg-transparent text-sm outline-none" />
                  </label>
                </motion.div>
              )}
            </AnimatePresence>

            <label className={inputWrap}>
              <FiMail className="text-brand-600" />
              <span className="sr-only">Email</span>
              <input type="email" required placeholder="Email address" autoComplete="email" className="w-full bg-transparent text-sm outline-none" />
            </label>

            <label className={inputWrap}>
              <FiLock className="text-brand-600" />
              <span className="sr-only">Password</span>
              <input
                type={show ? "text" : "password"}
                required
                minLength={6}
                placeholder="Password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                className="w-full bg-transparent text-sm outline-none"
              />
              <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} className="text-lg text-mute hover:text-brand-600">
                {show ? <FiEyeOff /> : <FiEye />}
              </button>
            </label>

            {mode === "signin" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-navy-900">
                  <input type="checkbox" className="size-4 accent-brand-600" /> Remember me
                </label>
                <Link to="/support" className="font-bold text-brand-600 hover:text-brand-800">Forgot password?</Link>
              </div>
            )}

            <button type="submit" disabled={done} className={`${button(done ? "navy" : "brand", "lg")} w-full`}>
              {done ? <><FiCheck /> {mode === "signin" ? "Signed in" : "Account created"}</> : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4 text-xs text-mute">
            <span className="h-px flex-1 bg-line" /> or continue with <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className={button("ghost")}><FaGoogle /> Google</button>
            <button type="button" className={button("ghost")}><FaApple className="text-lg" /> Apple</button>
          </div>
        </div>
      </div>

      <aside className="relative hidden overflow-hidden bg-navy-900 text-white lg:block">
        <Img src={IMG.inspire} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/95 via-navy-900/50 to-navy-900/20" />
        <div className="absolute inset-x-0 bottom-0 p-12">
          <p className="max-w-md text-3xl leading-tight font-extrabold">Your next trip is easier to plan with an account.</p>
          <ul className="mt-6 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/90">
                <span className="grid size-6 place-items-center rounded-full bg-sun-400 text-xs text-navy-950"><FiCheck /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}
