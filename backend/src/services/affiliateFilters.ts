export type AffiliateCandidate = {
  asin: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
  affiliateUrl: string;
  imageUrl: string;
};

export function filterAffiliateProducts(items: AffiliateCandidate[]) {
  return items
    .filter((item) => item.rating >= 4.0 && item.reviews >= 500)
    .sort((left, right) => {
      const leftScore = left.rating * 100 + left.reviews / 20;
      const rightScore = right.rating * 100 + right.reviews / 20;
      return rightScore - leftScore;
    })
    .slice(0, 3);
}

