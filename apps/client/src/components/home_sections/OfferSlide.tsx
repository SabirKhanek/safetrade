"use client";
import { OfferData } from "@/shared/types/offer";
import "./css/offer_slide.css";
import { OfferCard } from "../offer_card";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaLeftLong,
  FaRightLong,
} from "react-icons/fa6";
import { fetchTrendingOffers } from "@/app/actions/fetchOffers";
export function OfferSlide({
  offers: _offers,
  options,
  fetchOfferAction,
  OFFERS_PER_PAGE: _OFFERS_PER_PAGE,
}: {
  offers: OfferData[];
  fetchOfferAction: typeof fetchTrendingOffers;
  options?: EmblaOptionsType;
  OFFERS_PER_PAGE?: number;
}) {
  const OFFERS_PER_PAGE = _OFFERS_PER_PAGE || _offers.length;
  const [offers, setOffers] = useState(_offers);
  const [page, setPage] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true);
  const listenForScrollRef = useRef(true);
  const hasMoreToLoadRef = useRef(true);
  const scrollListenerRef = useRef<() => void>(() => undefined);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      watchSlides: (emblaApi) => {
        const reloadEmbla = (): void => {
          const oldEngine = emblaApi.internalEngine();

          emblaApi.reInit();
          const newEngine = emblaApi.internalEngine();
          const copyEngineModules: any = ["location", "target", "scrollBody"];
          copyEngineModules.forEach((engineModule: any) => {
            // @ts-ignore
            Object.assign(newEngine[engineModule], oldEngine[engineModule]);
          });

          newEngine.translate.to(oldEngine.location.get());
          const { index } = newEngine.scrollTarget.byDistance(0, false);
          newEngine.index.set(index);
          newEngine.animation.start();

          setLoadingMore(false);
          listenForScrollRef.current = true;
        };

        const reloadAfterPointerUp = (): void => {
          emblaApi.off("pointerUp", reloadAfterPointerUp);
          reloadEmbla();
        };
        const engine = emblaApi.internalEngine();

        if (hasMoreToLoadRef.current && engine.dragHandler.pointerDown()) {
          const boundsActive = engine.limit.reachedMax(engine.target.get());
          engine.scrollBounds.toggleActive(boundsActive);
          emblaApi.on("pointerUp", reloadAfterPointerUp);
        } else {
          reloadEmbla();
        }
      },
      skipSnaps: true,
      ...options,
    },
    [
      // WheelGesturesPlugin(),
    ]
  );

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    if (!listenForScrollRef.current) return;

    setLoadingMore((loadingMore) => {
      const lastSlide = emblaApi.slideNodes().length - 1;
      const lastSlideInView = emblaApi.slidesInView().includes(lastSlide);
      const loadMore = !loadingMore && lastSlideInView;
      if (loadMore) {
        listenForScrollRef.current = false;

        fetchOfferAction({
          take: OFFERS_PER_PAGE,
          skip: offers.length * page,
          throttle: 1000,
        })
          .then((newOffers) => {
            setOffers((prevOffers) => {
              if (prevOffers.length === 0) {
                setHasMoreToLoad(false);
                return prevOffers;
              }
              setPage((prev) => prev + 1);
              return [...prevOffers, ...newOffers];
            });
          })
          .catch(() => {
            console.error("couldn't load more offers");
            setLoadingMore(false);
            listenForScrollRef.current = true;
          });
      }

      return loadingMore || lastSlideInView;
    });
  }, []);

  useEffect(() => {
    hasMoreToLoadRef.current = hasMoreToLoad;
  }, [hasMoreToLoad]);

  // Callback to attach scroll listener for infinte scrolling
  const addScrollListener = useCallback(
    (emblaApi: EmblaCarouselType) => {
      scrollListenerRef.current = () => onScroll(emblaApi);
      emblaApi.on("scroll", scrollListenerRef.current);
    },
    [onScroll]
  );

  // Callback to handle change in scroll progress
  const onScrollUpdateProgress = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll(emblaApi);
    emblaApi.on("reInit", onScrollUpdateProgress);
    emblaApi.on("scroll", onScrollUpdateProgress);

    addScrollListener(emblaApi);

    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    emblaApi.on("destroy", () =>
      window.removeEventListener("resize", onResize)
    );
  }, [emblaApi, onScroll, addScrollListener]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className="embla container">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {offers.map((offer, index) => (
            <div className="embla__slide rounded-lg min-w-fit " key={index}>
              <OfferCard {...offer} />
            </div>
          ))}
          {hasMoreToLoad && (
            <div
              className={"embla-infinite-scroll".concat(
                loadingMore ? " embla-infinite-scroll--loading-more" : ""
              )}
            >
              <span className="embla-infinite-scroll__spinner" />
            </div>
          )}
        </div>
      </div>
      {/* Slide Controls */}
      <div className="embla-slide-controls mt-2 flex gap-4 justify-between items-center">
        <div className="embla-slide-nav flex items-center gap-1">
          <button
            className="w-10 h-10 flex justify-center disabled:cursor-not-allowed  items-center border border-black rounded-full hover:text-white hover:bg-black transition-all duration-300"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
          >
            <FaArrowLeft />
          </button>
          <button
            className="w-10 h-10 flex justify-center disabled:cursor-blocked  items-center border border-black rounded-full hover:text-white hover:bg-black transition-all duration-300"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
          >
            <FaArrowRight />
          </button>
        </div>
        <div className="embla-scroll-progress w-full max-w-sm h-2 rounded-3xl border border-black">
          <div
            className="rounded-3xl"
            style={{
              width: `${scrollProgress}%`,
              height: "100%",
              background: "var(--black)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  }, [emblaApi, onButtonClick]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
