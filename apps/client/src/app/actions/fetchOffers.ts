"use server";

import { db } from "@/shared/utils/db";
import { MockOffer } from "../../shared/constants/mock/offers";
import { OfferData } from "../../shared/types/offer";
import { sleep } from "../../shared/utils/misc";
import { getPoolConnection } from "db-schema";
import { InferSelectModel, eq, ilike } from "drizzle-orm";
import { AuthGuardNullable } from "@/shared/utils/authguard";
import { schema } from "db-schema";
import { GetPublicUrl } from "@/shared/utils";

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
  throw new Error();
  // throttle && (await sleep(throttle));
  // return Array(take)
  //   .fill(0)
  //   .map(() => MockOffer);
}

export async function fetchOffers(slug?: string): Promise<OfferData[]> {
  const { db } = await getPoolConnection({
    logging: true,
    timeout: 2 * 60 * 1000,
  });
  const data = await db
    .select()
    .from(schema.sell_offer)
    .innerJoin(
      schema.user,
      eq(schema.sell_offer.seller_profile, schema.user.uid)
    )
    .where(ilike(schema.sell_offer.slug, `%${slug || ""}%`));

  const data_to_return: OfferData[] = data.map((d) => ({
    category: { name: d.sell_offer.category, parent: null, slug: "#" },
    price: d.sell_offer.price,
    seller: {
      avatar: MockOffer.seller.avatar,
      first_name: d.user.first_name,
      lastName: d.user.last_name,
      slug: d.sell_offer.slug || "",
      starsAmount: { "1": 5, "2": 3, "3": 4, "5": 6, "4": 5 },
      bio: "No bio set",
      isVerified: d.user.is_verified || false,
    },
    slug: d.sell_offer.slug || "#",
    thumbSrc: GetPublicUrl((d.sell_offer.attachments as any) || ""),
    title: d.sell_offer.title,
    shortDescription: d.sell_offer.short_description || "",
  }));
  return data_to_return;
}

export async function fetchUserOffers() {
  const auth = AuthGuardNullable();
  if (!auth) throw new Error("unauthorized");
  const { db } = await getPoolConnection({
    logging: true,
    timeout: 2 * 60 * 1000,
  });

  const offers = db
    .select()
    .from(schema.sell_offer)
    .where(eq(schema.sell_offer.seller_profile, auth.user_uid));
  return offers;
}
export type OfferTableData = InferSelectModel<typeof schema.sell_offer>;
