"use client";
import Image from "next/image";
import { OfferData } from "../shared/types/offer";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa6";
import { useMemo, useState } from "react";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import { getOverallRatings } from "../shared/utils/ratings";
import { getCategoryChain } from "../shared/utils/misc";
import { ChainedLinks } from "./chainedlinks";

export interface OfferCardProps extends OfferData {}

export function OfferCard({
  price,
  seller: {
    first_name,
    avatar,
    slug: sellerSlug,
    lastName,
    totalRating: _totalRating,
    starsAmount,
  },
  slug: offerSlug,
  thumbSrc,
  shortDescription,
  title,
  category,
  isSaved,
}: OfferCardProps) {
  const [isLiked, setIsLiked] = useState(isSaved || false);
  const offerPrice = useMemo(() => {
    if (price === 0) return price.toFixed(2);
    return (price / 100).toFixed(2);
  }, [price]);
  const totalRating = useMemo(() => {
    if (_totalRating) return _totalRating;
    return getOverallRatings(starsAmount);
  }, [_totalRating]);
  const categoryArray = useMemo(() => {
    return getCategoryChain(category, true);
  }, [category]);
  return (
    <div className="overflow-hidden box-border gap-3 flex flex-col shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full max-w-[350px] aspect-[285/409] rounded-lg">
      {/* Card Image Setion */}
      <div className="w-full aspect-[285/192]  rounded-lg overflow-hidden relative">
        {/** Like toggle */}
        <div
          className="card-like-toggle cursor-pointer absolute right-2 top-2 text-xl"
          onClick={() => setIsLiked(!isLiked)}
        >
          {isLiked ? (
            <FaHeart className="hover:scale-110 text-red-500"></FaHeart>
          ) : (
            <FaRegHeart className="text-red-500 hover:scale-110"></FaRegHeart>
          )}{" "}
        </div>
        <Image
          src={thumbSrc}
          alt={title + " thumbnail"}
          loading="lazy"
          width={285}
          height={192}
          className="!object-cover !w-full h-auto !object-center"
        ></Image>
      </div>

      {/* Card Body Section */}
      <div className=" flex grow flex-col justify-between pb-3">
        <div className="relative">
          {/* transparent gradient */}
          <div
            style={{
              background: "linear-gradient(180deg, transparent, var(--white))",
            }}
            className="absolute bottom-0 w-full h-5 z-[2]"
          ></div>
          {/* Seller Info Tag */}
          <div className="flex justify-between items-center">
            <div className="seller-profile pl-3 flex gap-2 items-center">
              <Image
                src={avatar}
                loading="lazy"
                className="rounded-full"
                alt={first_name + "'s Avatar"}
                width={40}
                height={40}
              />
              <div className=" flex flex-col justify-between">
                <Link
                  href={`/profile/${sellerSlug}`}
                  className="font-inter font-semibold text-sm hover:underline text-black"
                >
                  {first_name} {lastName.at(0)}.
                </Link>
                <div className="flex items-center gap-1">
                  <FaStar className="text-accent" />
                  <Link
                    href={`/profile/${sellerSlug}?tab=ratings`}
                    className="text-sm hover:underline"
                  >
                    {totalRating.rating.toString()} (
                    {totalRating.total.toString()})
                  </Link>
                </div>
              </div>
            </div>
            <div className="seller-profile-tag flex items-center py-0.5 gap-2 rounded-tl-xl text-sm font-semibold px-3  bg-black w-fit text-white">
              <MdVerified className=""></MdVerified>
              Verified
            </div>
          </div>

          {/* Offer Metadata */}
          <div className="font-inter mt-2 px-3  font-bold hover:underline">
            <Link className="line-clamp-2" href={`/offer/${offerSlug}`}>
              {title}
            </Link>
          </div>
          <div className=" px-3 text-sm mt-0.5 mb-2">
            <ChainedLinks
              limit={2}
              chain={categoryArray}
              linkClass="text-black-300 hover:underline hover:text-black transition-colors duration-150"
            />
          </div>
          <p className="text-sm min-h-20 line-clamp-4 px-3">
            {shortDescription}
          </p>
        </div>

        {/* Card Price Tag */}
        <div className="offer-price-tag font-bold font-inter px-4">
          ${offerPrice}
        </div>
      </div>
    </div>
  );
}
