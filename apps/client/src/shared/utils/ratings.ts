import { SellerRatings } from "../types/seller";

export function getOverallRatings(starsAmount: SellerRatings["starsAmount"]) {
  const totalRatings =
    5 * starsAmount[5] +
    4 * starsAmount[4] +
    3 * starsAmount[3] +
    2 * starsAmount[2] +
    1 * starsAmount[1];
  const totalReviews = Object.values(starsAmount).reduce(
    (acc, val) => acc + val,
    0
  );
  let rating;
  if (totalReviews === 0) {
    rating = 0;
  } else {
    rating = (totalRatings / totalReviews).toFixed(2);
  }
  return { total: totalReviews, rating: rating };
}
