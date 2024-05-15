import { MockOffer } from "@/app/shared/constants/mock/offers";
import { FadeInSection } from "../components/fadein_section";
import { OfferCard, OfferCardProps } from "../components/offer_card";
import { OfferSlide } from "./OfferSlide";
import { fetchTrendingOffers } from "@/app/actions/fetchOffers";

export async function TrendingOffers() {
  const offers = await fetchTrendingOffers({});

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
