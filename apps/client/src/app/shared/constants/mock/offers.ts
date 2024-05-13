import { OfferData } from "../../types/offer";

export const MockOffer: OfferData = {
  thumbSrc: "https://picsum.photos/285/192",
  category: {
    name: "Digital Assets",
    slug: "digital-assets",
    parent: {
      name: "Software Licenses",
      slug: "software_licenses",
      parent: {
        name: "Testing Category",
        slug: "test",
        parent: null,
      },
    },
  },
  price: 250000,
  shortDescription:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  title: "Minimalistic Logo Design",
  slug: "minimalistic_logo",
  seller: {
    avatar: "https://picsum.photos/80",
    slug: "Julie. T",
    starsAmount: {
      5: 60,
      4: 0,
      3: 4,
      2: 1,
      1: 40,
    },
    first_name: "Julie",
    lastName: "Tennyson",
  },
};
