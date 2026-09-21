import { lazy } from "react";
import { Route, Routes } from "react-router";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";

// Every route except Home is code-split, so the first load stays light.
const Flights = lazy(() => import("./pages/Flights.jsx"));
const Hotels = lazy(() => import("./pages/Hotels.jsx"));
const Cars = lazy(() => import("./pages/Cars.jsx"));
const Holidays = lazy(() => import("./pages/Holidays.jsx"));
const Destinations = lazy(() => import("./pages/Destinations.jsx"));
const Support = lazy(() => import("./pages/Support.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const SignIn = lazy(() => import("./pages/SignIn.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="flights" element={<Flights />} />
        <Route path="hotels" element={<Hotels />} />
        <Route path="cars" element={<Cars />} />
        <Route path="holidays" element={<Holidays />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="support" element={<Support />} />
        <Route path="about" element={<About />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
