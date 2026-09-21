import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import Img from "../components/Img";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { destinations } from "../data";
import { wrap } from "../lib/ui";

export default function PopularDestinations() {
  return (
    <section className={`${wrap} pt-16 sm:pt-20`}>
      <SectionHeading
        eyebrow="Top destinations"
        title="Explore Popular"
        accent="Destinations"
        subtitle="From bustling cities to tranquil islands, find your next adventure with us."
        to="/destinations"
        linkLabel="View all destinations"
      />

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {destinations.slice(0, 8).map((d, i) => (
          <Reveal as="li" key={d.slug} delay={(i % 4) * 0.07}>
            <Link
              to="/destinations"
              className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-navy-900 shadow-card sm:aspect-[3/4]"
            >
              <Img
                src={d.image}
                alt={`${d.city}, ${d.country}`}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 text-white sm:p-4">
                <div className="leading-tight">
                  <p className="text-base font-bold sm:text-lg">{d.city}</p>
                  <p className="text-xs text-white/75">{d.country}</p>
                </div>
                <span className="grid size-9 place-items-center rounded-full bg-white text-navy-900 transition group-hover:bg-sun-400 group-hover:-rotate-45">
                  <FiArrowRight />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
