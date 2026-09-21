import Hero from "../sections/Hero";
import TrustStrip from "../sections/TrustStrip";
import PopularDestinations from "../sections/PopularDestinations";
import AirlinesRow from "../sections/AirlinesRow";
import TopDeals from "../sections/TopDeals";
import WhyChoose from "../sections/WhyChoose";
import Services from "../sections/Services";
import Testimonials from "../sections/Testimonials";
import CtaStrip from "../sections/CtaStrip";
import SearchBox from "../components/SearchBox";
import Banner from "../components/Banner";
import { IMG } from "../data";
import { wrap } from "../lib/ui";
import usePageTitle from "../lib/usePageTitle";

export default function Home() {
  usePageTitle("Book flights easier, faster, smarter");

  return (
    <>
      <Hero />

      {/* Search card overlaps the bottom edge of the hero */}
      <div className={`${wrap} relative z-10 -mt-32 sm:-mt-36 lg:-mt-40`}>
        <SearchBox />
      </div>

      <TrustStrip />
      <PopularDestinations />

      <section className={`${wrap} pt-16 sm:pt-20`}>
        <Banner
          eyebrow="Limited time offer"
          title="Save Big on Your Next Flight"
          text="Exclusive deals, special discounts and more for your dream journey."
          cta={{ to: "/flights", label: "Explore offers" }}
          image={IMG.offer}
          badge="50%"
        />
      </section>

      <AirlinesRow />
      <TopDeals />

      <section className={`${wrap} pt-16 sm:pt-20`}>
        <Banner
          title="Your Next Journey Starts Here"
          text="More destinations. Better prices. Unforgettable experiences."
          cta={{ to: "/holidays", label: "Plan your trip" }}
          image={IMG.journey}
          position="object-[75%_center]"
          size="lg"
        />
      </section>

      <WhyChoose />
      <Services />
      <Testimonials />
      <CtaStrip />
    </>
  );
}
