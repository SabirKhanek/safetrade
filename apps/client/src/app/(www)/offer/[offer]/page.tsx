import { fetchOffers } from "@/app/actions/fetchOffers";
import { getOverallRatings } from "@/shared/utils/ratings";
import { notFound } from "next/navigation";

export default async function OfferPage({
  params,
}: {
  params: { offer: string };
}) {
  const path = params.offer;
  const offers = await fetchOffers();
  const offer = offers.find((o) => o.slug === path);
  if (!offer) return notFound();

  return (
    <div className="container mt-16 min-h-10">
      <style>{`.container {
  padding: 20px;
}

.offer {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

.offer-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.offer-thumb {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
}

.offer-description {
  font-size: 16px;
  margin-bottom: 10px;
}

.offer-price {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.offer-category {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.seller-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 20px;
}

.seller-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
}

.seller-name {
  font-size: 18px;
  font-weight: bold;
}

.seller-slug,
.seller-bio,
.seller-verified,
.seller-rating {
  font-size: 14px;
  color: #666;
}

.seller-slug {
  margin-top: 5px;
}

.seller-bio {
  margin-top: 5px;
}

.seller-verified {
  margin-top: 5px;
  color: green;
}

.seller-rating {
  margin-top: 5px;
}
`}</style>
      <div className="offer">
        <h1 className="offer-title">{offer.title}</h1>
        <img src={offer.thumbSrc} alt={offer.title} className="offer-thumb" />
        <p className="offer-description">{offer.shortDescription}</p>
        <div className="offer-price">Price: ${offer.price / 100}</div>
        <div className="offer-category">Category: {offer.category.name}</div>
        <div className="seller-info">
          <img
            src={offer.seller.avatar}
            alt={`${offer.seller.first_name} ${offer.seller.lastName}`}
            className="seller-avatar"
          />
          <div className="seller-name">
            {offer.seller.first_name} {offer.seller.lastName}
          </div>
          <div className="seller-slug">Slug: {offer.seller.slug}</div>
          <div className="seller-bio">Bio: {offer.seller.bio}</div>
          <div className="seller-verified">
            Verified: {offer.seller.isVerified ? "Yes" : "No"}
          </div>
          <div className="seller-rating">
            Rating:{" "}
            {offer?.seller?.starsAmount &&
              getOverallRatings(offer.seller.starsAmount).rating}{" "}
            stars
          </div>
        </div>
      </div>
    </div>
  );
}
