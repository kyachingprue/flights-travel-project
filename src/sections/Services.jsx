import { Link } from "react-router";
import Banner from "../components/Banner";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import { IMG } from "../data";
import { wrap } from "../lib/ui";

const tiles = [
  { to: "/hotels", title: "Hotels", text: "Find the perfect stay", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=70" },
  { to: "/cars", title: "Car rental", text: "Drive your adventure", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=700&q=70" },
  { to: "/holidays", title: "Holiday packages", text: "Curated experiences", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=700&q=70" },
];

export default function Services() {
  return (
    <section className={`${wrap} pt-16 sm:pt-20`}>
      <Banner
        title="More Than Just Flight Bookings"
        text="Plan your complete trip with hotels, cars, and holiday packages, all in one place."
        cta={{ to: "/holidays", label: "Explore more services" }}
        image={IMG.plane}
        position="object-[70%_center]"
      />
      <ul className="mt-4 grid gap-4 sm:grid-cols-3">
        {tiles.map((t, i) => (
          <Reveal as="li" key={t.to} delay={i * 0.08}>
            <Link
              to={t.to}
              className="group block overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <Img src={t.image} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-navy-950">{t.title}</h3>
                <p className="text-xs text-mute">{t.text}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
