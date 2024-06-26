import { MockOffer } from "@/shared/constants/mock/offers";
import { FadeInSection } from "../fadein_section";
import { OfferCard, OfferCardProps } from "../offer_card";
import { OfferSlide } from "./OfferSlide";
import { fetchOffers, fetchTrendingOffers } from "@/app/actions/fetchOffers";

export async function TrendingOffers() {
  const offers = await fetchOffers();

  return (
    <section className="bg-contrast py-24">
      <h2 className="container heading mb-3">
        Trending <span className="gradient-text">offers</span> from our sellers
      </h2>
      <OfferSlide
        fetchOfferAction={fetchTrendingOffers}
        offers={offers}
        OFFERS_PER_PAGE={5}
        options={{}}
      />
    </section>
  );
}
