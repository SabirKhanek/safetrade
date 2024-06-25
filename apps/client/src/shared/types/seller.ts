import { getOverallRatings } from "../utils/ratings";

export interface SellerRatings {
  starsAmount: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  totalRating?: ReturnType<typeof getOverallRatings>;
}

export interface SellerData {
  avatar: string;
  isVerified?: boolean;
  slug: string;
  bio?: string;
  first_name: string;
  lastName: string;
}
