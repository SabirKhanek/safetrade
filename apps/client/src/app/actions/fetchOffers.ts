"use server";

import { MockOffer } from "../../shared/constants/mock/offers";
import { OfferData } from "../../shared/types/offer";
import { sleep } from "../../shared/utils/misc";

export interface FetchTrendingOffersParams {
  take?: number;
  skip?: number;
  query?: string;
  throttle?: number;
}
export async function fetchTrendingOffers({
  take = 10,
  skip,
  query,
  throttle,
}: FetchTrendingOffersParams): Promise<OfferData[]> {
  throttle && (await sleep(throttle));
  return Array(take)
    .fill(0)
    .map(() => MockOffer);
}
