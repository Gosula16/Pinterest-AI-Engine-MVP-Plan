import { filterAffiliateProducts, type AffiliateCandidate } from "./affiliateFilters.js";

const fallbackProducts: AffiliateCandidate[] = [
  {
    asin: "AMZ-001",
    title: "Anker Power Bank",
    price: "₹1,999",
    rating: 4.5,
    reviews: 1420,
    affiliateUrl: "https://example.com/affiliate/anker",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80"
  },
  {
    asin: "AMZ-002",
    title: "Kindle Paperwhite",
    price: "₹12,999",
    rating: 4.8,
    reviews: 9820,
    affiliateUrl: "https://example.com/affiliate/kindle",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  }
];

export async function searchAffiliateProducts(keyword: string): Promise<AffiliateCandidate[]> {
  return filterAffiliateProducts(
    fallbackProducts.map((product, index) => ({
      ...product,
      asin: `${product.asin}-${index + 1}`,
      title: `${product.title} for ${keyword}`
    }))
  );
}

