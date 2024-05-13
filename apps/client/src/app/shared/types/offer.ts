import { SellerData, SellerRatings } from "./seller";

export interface OfferCategory {
  name: string;
  slug: string;
  parent: OfferCategory | null;
}

export interface OfferData {
  thumbSrc: string;
  category: OfferCategory;
  isSaved?: boolean;
  price: number;
  beforeDiscountPrice?: number;
  title: string;
  shortDescription?: string;
  slug: string;
  seller: SellerData & SellerRatings;
}
