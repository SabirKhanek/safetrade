import { MockOffer } from "@/shared/constants/mock/offers";
import { FadeInSection } from "../fadein_section";
import { OfferCard, OfferCardProps } from "../offer_card";
import { OfferSlide } from "./OfferSlide";
import { fetchOffers, fetchTrendingOffers } from "@/app/actions/fetchOffers";

export async function InterestBasedOffers() {
  const offers = await fetchOffers();

  return (
    <section className=" py-24">
      <h2 className="container heading mb-3">
        Offers you may be <span className="gradient-text">interested</span> in
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
