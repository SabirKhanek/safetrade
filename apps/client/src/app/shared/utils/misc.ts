import { OfferCategory } from "../types/offer";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function getCategoryChain(
  category: OfferCategory,
  mutateSlug: boolean = false
): OfferCategory[] {
  const chain: OfferCategory[] = [];
  let currentCategory: OfferCategory | null = category;

  // Traverse up the hierarchy until reaching the root category (parent is null)
  while (currentCategory !== null) {
    chain.unshift(currentCategory); // Add current category to the beginning of the chain
    currentCategory = currentCategory.parent; // Move to the parent category
  }

  if (mutateSlug) {
    // Mutate the slugs to include the category chain
    chain.reduce((accumulatedSlug, category) => {
      category.slug = `${accumulatedSlug}/${category.slug}`;
      return category.slug; // Pass the current slug to the next iteration
    }, "");
  }

  return chain;
}
