export function generateAmazonAffiliateLink(productId: string) {
  const tag = process.env.AMAZON_AFFILIATE_TAG || "";
  const sanitized = productId.replace(/[^A-Za-z0-9]/g, "");
  return `https://www.amazon.com/dp/${sanitized}?tag=${encodeURIComponent(tag)}`;
}

